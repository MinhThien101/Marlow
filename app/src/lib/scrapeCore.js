// Best-effort brand reader. Runs in Node (Netlify function + Vite dev middleware).
// Fetches a store's homepage and pulls out: name, logo, theme colors, and a few
// product images. Never throws for "couldn't find it" — returns whatever it got.

function abs(base, url) {
  if (!url) return null
  try { return new URL(url, base).href } catch { return null }
}

function pick(re, html) {
  const m = html.match(re)
  return m ? m[1].trim() : null
}
function pickAll(re, html, limit = 20) {
  const out = []
  let m
  const r = new RegExp(re.source, re.flags.includes('g') ? re.flags : re.flags + 'g')
  while ((m = r.exec(html)) && out.length < limit) out.push(m[1].trim())
  return out
}

function decodeEntities(s) {
  if (!s) return s
  const named = { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ', '#39': "'", '#x27': "'" }
  return s
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(parseInt(n, 10)))
    .replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCodePoint(parseInt(n, 16)))
    .replace(/&([a-z0-9#]+);/gi, (m, n) => (named[n] !== undefined ? named[n] : m))
    .trim()
}

function normalizeUrl(input) {
  let u = (input || '').trim()
  if (!u) return null
  if (!/^https?:\/\//i.test(u)) u = 'https://' + u
  try { return new URL(u).href } catch { return null }
}

const HEX = /#[0-9a-fA-F]{6}\b/g

// Strip a page down to the readable words a human would see. Drops script/style/
// nav/footer noise, collapses whitespace, decodes entities. This is the raw
// material the brand-research pass reads to learn voice, positioning, audience.
function htmlToText(html) {
  if (!html) return ''
  let s = html
  s = s.replace(/<script[\s\S]*?<\/script>/gi, ' ')
  s = s.replace(/<style[\s\S]*?<\/style>/gi, ' ')
  s = s.replace(/<noscript[\s\S]*?<\/noscript>/gi, ' ')
  s = s.replace(/<svg[\s\S]*?<\/svg>/gi, ' ')
  s = s.replace(/<!--[\s\S]*?-->/g, ' ')
  // keep meta description / og:description — strong positioning signal
  const metaDesc =
    pick(/<meta[^>]+name=["']description["'][^>]+content=["']([^"']+)["']/i, html) ||
    pick(/<meta[^>]+property=["']og:description["'][^>]+content=["']([^"']+)["']/i, html) || ''
  s = s.replace(/<[^>]+>/g, ' ')
  s = decodeEntities(s)
  s = s.replace(/\s+/g, ' ').trim()
  return (metaDesc ? decodeEntities(metaDesc) + '\n\n' : '') + s
}

// Find likely About / story / FAQ links on the homepage so we can read the
// brand's own words, not just the storefront grid.
function findStoryLinks(html, origin) {
  const links = pickAll(/<a[^>]+href=["']([^"'#?]+)["'][^>]*>/gi, html, 200)
  const wanted = /(about|our-story|story|who-we-are|mission|values|founder|why|faq)/i
  const out = []
  const seen = new Set()
  for (const href of links) {
    if (!wanted.test(href)) continue
    const a = abs(origin, href)
    if (!a) continue
    const key = a.split('?')[0].replace(/\/$/, '')
    if (seen.has(key)) continue
    seen.add(key)
    out.push(a)
    if (out.length >= 2) break
  }
  return out
}

async function fetchText(url) {
  try {
    const res = await fetch(url, {
      redirect: 'follow',
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; MarlowBot/1.0; +https://marlow.app)',
        'Accept': 'text/html,application/xhtml+xml',
      },
    })
    return await res.text()
  } catch { return '' }
}

export async function scrapeBrand(rawUrl) {
  const url = normalizeUrl(rawUrl)
  if (!url) return { ok: false, error: 'That doesn’t look like a web address.' }

  let html = ''
  let finalUrl = url
  try {
    const res = await fetch(url, {
      redirect: 'follow',
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; MarlowBot/1.0; +https://marlow.app)',
        'Accept': 'text/html,application/xhtml+xml',
      },
    })
    finalUrl = res.url || url
    html = await res.text()
  } catch (e) {
    return { ok: false, error: 'Couldn’t reach that site. You can still set things up by hand below.' }
  }

  const origin = (() => { try { return new URL(finalUrl).origin } catch { return url } })()
  const host = (() => { try { return new URL(finalUrl).hostname.replace(/^www\./, '') } catch { return rawUrl } })()

  // --- name ---
  const siteName =
    pick(/<meta[^>]+property=["']og:site_name["'][^>]+content=["']([^"']+)["']/i, html) ||
    pick(/<meta[^>]+name=["']application-name["'][^>]+content=["']([^"']+)["']/i, html) ||
    (() => {
      const t = pick(/<title[^>]*>([^<]+)<\/title>/i, html)
      if (!t) return null
      return t.split(/[|–—\-·:]/)[0].trim()
    })() ||
    host.split('.')[0]

  // --- logo ---
  let logo =
    pick(/<link[^>]+rel=["'][^"']*apple-touch-icon[^"']*["'][^>]+href=["']([^"']+)["']/i, html) ||
    pick(/<meta[^>]+property=["']og:logo["'][^>]+content=["']([^"']+)["']/i, html) ||
    pick(/<link[^>]+rel=["'](?:icon|shortcut icon)["'][^>]+href=["']([^"']+)["']/i, html)
  logo = abs(origin, logo)

  // --- colors ---
  const colors = new Set()
  const theme = pick(/<meta[^>]+name=["']theme-color["'][^>]+content=["']([^"']+)["']/i, html)
  if (theme && /^#[0-9a-fA-F]{6}$/.test(theme.trim())) colors.add(theme.trim().toUpperCase())
  // sample hex colors that appear most often in inline styles / CSS vars
  const counts = {}
  let mm
  HEX.lastIndex = 0
  while ((mm = HEX.exec(html))) {
    const c = mm[0].toUpperCase()
    if (c === '#FFFFFF' || c === '#000000') continue
    counts[c] = (counts[c] || 0) + 1
  }
  Object.entries(counts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6)
    .forEach(([c]) => colors.add(c))
  const palette = Array.from(colors).slice(0, 5)

  // --- fonts ---
  const fonts = []
  const famMatches = pickAll(/font-family\s*:\s*["']?([A-Za-z][A-Za-z0-9 \-]+?)["']?[;,"']/gi, html, 30)
  const generic = /^(inherit|initial|sans-serif|serif|monospace|system-ui|ui-sans-serif|ui-serif|ui-monospace|-apple-system|blinkmacsystemfont|arial|helvetica|times|georgia|var)/i
  for (const f of famMatches) {
    const name = f.replace(/\s+/g, ' ').trim()
    if (name.length < 2 || generic.test(name)) continue
    if (!fonts.find((x) => x.toLowerCase() === name.toLowerCase())) fonts.push(name)
    if (fonts.length >= 2) break
  }
  // Google Fonts links are a strong signal
  const gfonts = pickAll(/fonts\.googleapis\.com\/css2?\?family=([^"'&]+)/gi, html, 4)
  for (const g of gfonts) {
    const name = decodeURIComponent(g).replace(/\+/g, ' ').split(':')[0].trim()
    if (name && !fonts.find((x) => x.toLowerCase() === name.toLowerCase())) fonts.unshift(name)
  }

  // --- products (images) ---
  const products = []
  const seen = new Set()
  const ogImg = abs(origin, pick(/<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["']/i, html))
  // Shopify product images are a common, recognizable pattern
  const imgs = pickAll(/<img[^>]+src=["']([^"']+)["']/gi, html, 80)
  const candidates = []
  if (ogImg) candidates.push(ogImg)
  for (const src of imgs) {
    const a = abs(origin, src)
    if (!a) continue
    if (/\.(svg)(\?|$)/i.test(a)) continue
    if (/(logo|icon|sprite|placeholder|badge|payment|flag|avatar)/i.test(a)) continue
    if (/cdn\.shopify\.com\/s\/files|\/products?\//i.test(a) || /\.(jpg|jpeg|png|webp)(\?|$)/i.test(a)) {
      candidates.push(a)
    }
  }
  for (const a of candidates) {
    const key = a.split('?')[0]
    if (seen.has(key)) continue
    seen.add(key)
    products.push({ title: '', price: '', image_url: a, url: finalUrl })
    if (products.length >= 4) break
  }

  // --- brand text (homepage + up to 2 story pages) ---
  // This is what the brand-research pass reads. Capped so the prompt stays lean.
  let brandText = htmlToText(html)
  try {
    const storyUrls = findStoryLinks(html, origin)
    for (const su of storyUrls) {
      const extra = htmlToText(await fetchText(su))
      if (extra) brandText += `\n\n--- ${su} ---\n${extra}`
    }
  } catch { /* best-effort */ }
  brandText = brandText.slice(0, 9000)

  return {
    ok: true,
    brand: {
      name: decodeEntities(siteName),
      store_url: host,
      logo_url: logo,
      palette,
      fonts: fonts.slice(0, 2),
    },
    products,
    text: brandText,
    pageUrl: finalUrl,
  }
}
