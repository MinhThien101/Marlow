// Marlow's built-in writer. Turns a brand + brief + campaign type + featured
// products into a finished, on-brand email: subject, preview text, a structured
// "doc" the editor renders, and export-ready HTML.
//
// This is deliberately self-contained (no external API) so the live link works
// with zero cost. It's structured so a smarter AI can replace `composeContent`
// later without touching the screens or the HTML renderer.

/* ----------------------------------------------------------- tiny helpers */
function seededRandom(seed) {
  let s = 0
  for (let i = 0; i < seed.length; i++) s = (s * 31 + seed.charCodeAt(i)) >>> 0
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0
    return s / 4294967296
  }
}
const pick = (rng, arr) => arr[Math.floor(rng() * arr.length)]
const uid = () => Math.random().toString(36).slice(2, 9)
const titleCase = (s) => s.replace(/\b\w/g, (c) => c.toUpperCase())

function firstSentence(text) {
  if (!text) return ''
  const m = text.split(/[.!?\n]/).map((x) => x.trim()).filter(Boolean)
  return m[0] || ''
}

// Pull useful signals out of the founder's brief.
function readBrief(prompt) {
  const p = (prompt || '').toLowerCase()
  const pct = (prompt || '').match(/(\d{1,2})\s*%/)
  return {
    discount: pct ? pct[1] : null,
    freeShip: /free ship/.test(p),
    deadline: /(sunday|monday|tuesday|wednesday|thursday|friday|saturday|today|tonight|weekend|midnight|this week|ends)/.exec(p)?.[0] || null,
    cozy: /(cozy|warm|slow|calm|quiet|gentle|soft)/.test(p),
    newArrival: /(new|launch|introduc|drop|arriv|restock|back)/.test(p),
    gift: /(gift|holiday|christmas|season|present)/.test(p),
  }
}

/* ------------------------------------------------------ content by campaign */
function composeContent(brand, featured, opts) {
  const rng = seededRandom((opts.prompt || '') + opts.type + (opts.seed || ''))
  const b = readBrief(opts.prompt)
  const name = brand.name || 'your store'
  const product = featured?.title?.trim() || null
  const discount = b.discount
  const deadline = b.deadline ? titleCase(b.deadline) : null
  const code = discount ? `SAVE${discount}` : (b.freeShip ? 'FREESHIP' : null)

  const briefLine = firstSentence(opts.prompt)

  // Hero eyebrow / headline / body, per type.
  const T = {
    promo: {
      eyebrow: discount ? [`${discount}% off — this week`, 'A little treat', 'For you, this week'] : ['A little treat', 'This week only', 'Just for you'],
      headline: [
        discount ? `Take ${discount}% off, ${b.deadline ? 'through ' + titleCase(b.deadline) : 'this week'}.` : 'Something good, just for you.',
        product ? `The ${product}, now a little lighter on the wallet.` : 'A reason to treat yourself.',
        b.cozy ? 'A little warmth for the days ahead.' : 'Good things, gently discounted.',
      ],
      body: [
        `${product ? `Our ${product} is` : 'The pieces you’ve had your eye on are'} ${discount ? `${discount}% off` : 'on offer'}${deadline ? ` through ${deadline}` : ' this week'} — no fuss, no code-juggling. Just a quiet little window to get the thing you wanted.`,
        `We don’t run sales often, so when we do, we keep it simple. ${discount ? `${discount}% off` : 'A gentle discount'}${deadline ? `, ending ${deadline}` : ''}. That’s it.`,
      ],
      cta: product ? `Shop the ${product.split(' ').slice(0, 3).join(' ')}` : 'Shop the sale',
    },
    launch: {
      eyebrow: ['New arrival', 'Just landed', 'Say hello'],
      headline: [
        product ? `Meet the ${product}.` : 'Something new, finally here.',
        'It took a while. It was worth it.',
        product ? `The ${product} is here.` : 'Worth the wait.',
      ],
      body: [
        `${product ? `The ${product} is` : 'This is'} the kind of thing we make slowly and only when it’s right. ${b.cozy ? 'Made to live with, not just to look at.' : 'Built to last, made to be used.'} We think you’ll love it.`,
        `We’ve been quietly working on ${product ? `the ${product}` : 'this'} for a while now. Today it’s ready — and we couldn’t wait to show you.`,
      ],
      cta: product ? `Shop the ${product.split(' ').slice(0, 3).join(' ')}` : 'See what’s new',
    },
    holiday: {
      eyebrow: ['A little gift guide', 'For the season', 'Give something good'],
      headline: [
        'Gifts that feel like you meant it.',
        b.cozy ? 'For the people who make winter warmer.' : 'A few good things, for the people you love.',
        'The easy answer to “what should I get them?”',
      ],
      body: [
        `We pulled together a few favorites that make easy, lovely gifts${product ? `, starting with the ${product}` : ''}. ${b.freeShip ? 'Free shipping, ' : ''}${deadline ? `order by ${deadline} to get it there in time.` : 'order early so it arrives in time.'}`,
        `No overthinking required. A short list of things people are genuinely happy to unwrap${product ? `, led by the ${product}` : ''}.`,
      ],
      cta: 'Shop the gift guide',
    },
    newsletter: {
      eyebrow: ['From the studio', 'A quick note', 'This month'],
      headline: [
        'A quiet note from us.',
        product ? `What we’ve been making — and the ${product}.` : 'What we’ve been up to.',
        'Small things, worth a second look.',
      ],
      body: [
        `A short hello from ${name}. We’ve been heads-down making things we’re proud of${product ? `, like the ${product}` : ''} — and wanted to share where we’re at. No sale, no rush. Just a note.`,
        `Every so often we like to step back and share what we’re working on${product ? `, starting with the ${product}` : ''}. Thanks for reading.`,
      ],
      cta: product ? `Have a look` : 'Visit the shop',
    },
  }

  const t = T[opts.type] || T.promo
  const eyebrow = pick(rng, t.eyebrow)
  const headline = briefLine && rng() > 0.6 ? capFirst(briefLine) : pick(rng, t.headline)
  const body = pick(rng, t.body)
  const ctaText = t.cta

  // Subject + preview, per type.
  const subjects = {
    promo: [
      discount ? `${discount}% off — quietly, this week` : 'A little something, this week',
      product ? `The ${product}, now ${discount ? `${discount}% off` : 'on offer'}` : 'A reason to treat yourself',
      headlineToSubject(headline),
    ],
    launch: [
      product ? `Meet the ${product}` : 'Something new just landed',
      'It’s here (finally)',
      product ? `New: the ${product}` : 'Worth the wait',
    ],
    holiday: [
      'A little gift guide for you',
      product ? `Gift idea: the ${product}` : 'Gifts they’ll actually love',
      deadline ? `Order by ${deadline} for the holidays` : 'The easy gift answer',
    ],
    newsletter: [
      `A quick note from ${name}`,
      'What we’ve been making',
      'Small things worth a look',
    ],
  }
  const subject = pick(rng, subjects[opts.type] || subjects.promo)

  const previews = {
    promo: discount ? `${discount}% off${deadline ? ` through ${deadline}` : ' this week'} — no code gymnastics.` : 'A quiet little offer, just for you.',
    launch: product ? `The ${product} is finally here.` : 'The thing we’ve been working on is ready.',
    holiday: `A short, lovely list${b.freeShip ? ' — with free shipping' : ''}.`,
    newsletter: `A note from the studio. No rush, no sale.`,
  }
  const preview = previews[opts.type] || previews.promo

  return { eyebrow, headline, body, ctaText, code, subject, preview, discount, deadline }
}

function capFirst(s) { return s ? s.charAt(0).toUpperCase() + s.slice(1) : s }
function headlineToSubject(h) { return h.replace(/\.$/, '') }

/* ------------------------------------------------------- shared assembly */
// Turn a normalized content object `c` (from the template writer OR the AI) plus
// the brand's own product data into a finished doc + export HTML. Factual data
// (price, image, url) always comes from the catalog, never from copy.
function storeHref(brand) {
  if (!brand.store_url) return '#'
  return /^https?:\/\//.test(brand.store_url) ? brand.store_url : `https://${brand.store_url}`
}

function assembleDoc(brand, products, opts, c) {
  const featuredList = (opts.featured || [])
    .map((id) => products.find((p) => p.id === id || p.title === id))
    .filter(Boolean)
  const featured = featuredList[0] || products[0] || null
  const heroUrl = featured?.url || storeHref(brand)

  const blocks = []
  // Hero carries an above-the-fold button (design.md: every reader can act without scrolling).
  blocks.push({ id: 'hero', type: 'hero', eyebrow: c.eyebrow, headline: c.headline, body: c.body, cta: c.heroCta || c.ctaText, url: heroUrl })

  if (featured) {
    blocks.push({
      id: 'feature', type: 'feature',
      title: featured.title || brand.name,
      price: featured.price || '',
      image_url: featured.image_url || null,
      cta: c.ctaText,
      url: featured.url || storeHref(brand),
    })
  } else {
    blocks.push({ id: 'feature', type: 'cta', cta: c.ctaText, url: storeHref(brand) })
  }

  // extra featured products (up to 2 more) as a small grid
  if (featuredList.length > 1) {
    blocks.push({ id: 'more', type: 'grid', items: featuredList.slice(1, 3).map((p) => ({ title: p.title, price: p.price, image_url: p.image_url, url: p.url })) })
  }

  if (c.code) {
    blocks.push({ id: 'code', type: 'code', label: c.codeLabel || 'Use code at checkout', code: c.code })
  }

  const doc = {
    brandName: brand.name || 'Your store',
    accent: brand.accent || '#1F3A2E',
    accent2: brand.accent2 || '#C19A53',
    paper: brand.paper || '#F4EFE4',
    ink: brand.ink || '#22201C',
    logo_url: brand.logo_url || null,
    storeUrl: brand.store_url || '',
    blocks,
  }

  return {
    name: defaultName(opts, featured),
    subject: c.subject,
    preview_text: c.preview,
    doc,
    body_html: renderEmailHtml(doc, c),
  }
}

/* ----------------------------------------------- built-in template writer */
export function generateEmail(brand, products, opts) {
  const featuredList = (opts.featured || [])
    .map((id) => products.find((p) => p.id === id || p.title === id))
    .filter(Boolean)
  const featured = featuredList[0] || products[0] || null
  const c = composeContent(brand, featured, opts)
  return assembleDoc(brand, products, opts, c)
}

/* ------------------------------------------------------------- AI writer */
// Calls the Claude-backed serverless function and assembles the result. Falls
// back to the built-in template writer on any error so the live link never dies.
export async function generateEmailAI(brand, products, opts) {
  try {
    const res = await fetch('/api/generate-email', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        brand, products, type: opts.type, prompt: opts.prompt, featured: opts.featured || [],
      }),
    })
    if (!res.ok) throw new Error('ai-unavailable')
    const data = await res.json()
    if (!data?.ok || !data.content?.hero) throw new Error('ai-bad-shape')

    const ai = data.content
    const c = {
      eyebrow: ai.hero.eyebrow,
      headline: ai.hero.headline,
      body: ai.hero.body,
      heroCta: ai.hero.cta,
      ctaText: ai.feature_cta || ai.hero.cta,
      code: ai.code?.code || null,
      codeLabel: ai.code?.label || null,
      subject: ai.subject,
      preview: ai.preview_text,
    }
    return assembleDoc(brand, products, opts, c)
  } catch {
    return generateEmail(brand, products, opts)
  }
}

function defaultName(opts, featured) {
  const f = firstSentence(opts.prompt)
  if (f) return capFirst(f).slice(0, 60)
  const typeName = { promo: 'Promo', launch: 'Launch', holiday: 'Holiday', newsletter: 'Newsletter' }[opts.type] || 'Campaign'
  return featured?.title ? `${typeName} — ${featured.title}` : `${typeName} campaign`
}

/* ----------------------------------------------- export-ready email HTML */
// Table-based, inline-styled, safe to paste into Klaviyo / Shopify / Mailchimp.
export function renderEmailHtml(doc, c) {
  const { paper, ink, accent, accent2, brandName } = doc
  const esc = (s) => String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
  const serif = "'Newsreader', Georgia, 'Times New Roman', serif"
  const sans = "'Hanken Grotesk', -apple-system, Segoe UI, Helvetica, Arial, sans-serif"

  const blocksHtml = doc.blocks.map((blk) => {
    if (blk.type === 'hero') {
      const heroBtn = blk.cta
        ? `<div style="margin-top:24px;"><a href="${esc(blk.url || '#')}" style="display:inline-block;background:${accent};color:${paper};font-family:${sans};font-size:14px;font-weight:600;padding:13px 32px;border-radius:6px;text-decoration:none;">${esc(blk.cta)}</a></div>`
        : ''
      return `
      <tr><td style="padding:34px 44px 8px;text-align:center;">
        <div style="font-family:${sans};font-size:11px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:${accent2};margin-bottom:16px;">${esc(blk.eyebrow)}</div>
        <h1 style="font-family:${serif};font-size:34px;line-height:1.12;font-weight:500;color:${ink};margin:0 0 16px;">${esc(blk.headline)}</h1>
        <p style="font-family:${sans};font-size:16px;line-height:1.6;color:${ink};opacity:0.82;margin:0 auto;max-width:420px;">${esc(blk.body)}</p>
        ${heroBtn}
      </td></tr>`
    }
    if (blk.type === 'feature') {
      const img = blk.image_url
        ? `<img src="${esc(blk.image_url)}" width="468" alt="${esc(blk.title)}" style="width:100%;max-width:468px;border-radius:10px;display:block;margin:0 auto 18px;" />`
        : `<div style="width:100%;height:240px;border-radius:10px;background:${accent};opacity:0.12;margin:0 auto 18px;"></div>`
      return `
      <tr><td style="padding:26px 44px 8px;text-align:center;">
        ${img}
        <div style="font-family:${serif};font-size:22px;font-weight:500;color:${ink};margin-bottom:4px;">${esc(blk.title)}</div>
        ${blk.price ? `<div style="font-family:${sans};font-size:14px;color:${ink};opacity:0.7;margin-bottom:18px;">${esc(blk.price)}</div>` : '<div style="height:10px;"></div>'}
        <a href="${esc(blk.url)}" style="display:inline-block;background:${accent};color:${paper};font-family:${sans};font-size:14px;font-weight:600;padding:13px 30px;border-radius:6px;text-decoration:none;">${esc(blk.cta)}</a>
      </td></tr>`
    }
    if (blk.type === 'cta') {
      return `
      <tr><td style="padding:26px 44px;text-align:center;">
        <a href="${esc(blk.url)}" style="display:inline-block;background:${accent};color:${paper};font-family:${sans};font-size:14px;font-weight:600;padding:13px 30px;border-radius:6px;text-decoration:none;">${esc(blk.cta)}</a>
      </td></tr>`
    }
    if (blk.type === 'grid') {
      const cells = blk.items.map((it) => `
        <td width="50%" style="padding:8px;text-align:center;vertical-align:top;">
          ${it.image_url ? `<img src="${esc(it.image_url)}" width="220" alt="${esc(it.title)}" style="width:100%;border-radius:8px;display:block;margin-bottom:8px;" />` : ''}
          <div style="font-family:${sans};font-size:13px;font-weight:600;color:${ink};">${esc(it.title || '')}</div>
          ${it.price ? `<div style="font-family:${sans};font-size:12px;color:${ink};opacity:0.65;">${esc(it.price)}</div>` : ''}
        </td>`).join('')
      return `<tr><td style="padding:14px 36px;"><table width="100%" cellpadding="0" cellspacing="0"><tr>${cells}</tr></table></td></tr>`
    }
    if (blk.type === 'code') {
      return `
      <tr><td style="padding:18px 44px;">
        <div style="border:1.5px dashed ${accent2};border-radius:10px;padding:18px 20px;text-align:center;">
          <div style="font-family:${sans};font-size:13px;color:${ink};opacity:0.7;margin-bottom:6px;">${esc(blk.label)}</div>
          <div style="font-family:'JetBrains Mono',monospace;font-size:22px;font-weight:600;letter-spacing:0.12em;color:${accent};">${esc(blk.code)}</div>
        </div>
      </td></tr>`
    }
    return ''
  }).join('')

  return `<!doctype html>
<html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${esc(brandName)}</title></head>
<body style="margin:0;padding:0;background:${paper};">
<table width="100%" cellpadding="0" cellspacing="0" style="background:${paper};padding:28px 0;">
  <tr><td align="center">
    <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:${paper};border-radius:14px;overflow:hidden;border:1px solid rgba(0,0,0,0.06);">
      <tr><td style="text-align:center;padding:22px 0 18px;border-bottom:1px solid ${accent}22;">
        <span style="font-family:${serif};font-size:20px;font-weight:500;letter-spacing:0.04em;color:${accent};text-transform:uppercase;">${esc(brandName)}</span>
      </td></tr>
      ${blocksHtml}
      <tr><td style="padding:24px 44px 30px;border-top:1px solid ${accent}22;text-align:center;">
        <div style="font-family:${sans};font-size:12px;color:${ink};opacity:0.55;line-height:1.6;">
          ${esc(brandName)}<br/>
          You’re receiving this because you signed up or bought something lovely.<br/>
          <a href="#" style="color:${ink};text-decoration:underline;">Unsubscribe</a> · <a href="#" style="color:${ink};text-decoration:underline;">View in browser</a>
        </div>
      </td></tr>
    </table>
  </td></tr>
</table>
</body></html>`
}
