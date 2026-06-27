// Adapts a connected Supabase brand (+ its products) into the shape the studio
// components and the 600px email renderer consume. When the real brand is thin,
// fields fall back to the demo brand so the studio always renders something good.

function hexToRgb(h) {
  const m = /^#?([0-9a-f]{3}|[0-9a-f]{6})$/i.exec((h || '').trim())
  if (!m) return null
  let s = m[1]
  if (s.length === 3) s = s.split('').map((c) => c + c).join('')
  const n = parseInt(s, 16)
  return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 }
}
export function rgba(hex, a) {
  const c = hexToRgb(hex)
  if (!c) return `rgba(0,0,0,${a})`
  return `rgba(${c.r},${c.g},${c.b},${a})`
}
function luminance(h) {
  const c = hexToRgb(h); if (!c) return 0.5
  return (0.299 * c.r + 0.587 * c.g + 0.114 * c.b) / 255
}
function gradientFor(hex) {
  const c = hexToRgb(hex) || { r: 60, g: 100, b: 80 }
  const d = (x, f) => Math.max(0, Math.min(255, Math.round(x * f)))
  return `linear-gradient(155deg,rgb(${d(c.r, 1.25)},${d(c.g, 1.25)},${d(c.b, 1.25)}),rgb(${d(c.r, 0.7)},${d(c.g, 0.7)},${d(c.b, 0.7)}))`
}

// ----- the demo brand (Spruce Coffee Co.) — used as a fallback ------------
export const DEMO_BRAND = {
  name: 'Spruce Coffee Co.', short: 'Spruce', url: 'sprucecoffee.co', founder: 'Mara Ellis', city: 'Portland, Oregon',
  positioning: 'Specialty coffee for home brewers who want better than the supermarket without learning a new language to buy a bag.',
  audience: 'Daily home brewers, 28-45. Pour-over or French press. Skeptical of grocery coffee, not yet committed to high-end gear.',
  shopUrl: 'sprucecoffee.co/shop',
  palette: ['#274A3D', '#C2562E', '#E7D9BB', '#7C8B6B', '#211A14'],
  fonts: ['Spectral', 'Hanken Grotesk'],
  recentSends: ['The Oaxaca is roasting Thursday', 'A better decaf, honestly', 'Subscription pause is one tap now'],
  emailTheme: {
    paper: '#F2EAD9', ink: '#211A14', accent: '#274A3D', accent2: '#C2562E',
    oat: '#E7D9BB', gold: '#9a7b3c', inkSoft: '#5b5043', paperSoft: 'rgba(242,234,217,0.82)',
    serif: "'Spectral', Georgia, 'Times New Roman', serif",
  },
  products: [
    { title: 'Huila, Colombia', price: '$22', note: 'Bright acidity, stone fruit, clean finish', bg: 'linear-gradient(155deg,#3c6450,#21412f)' },
    { title: 'Oaxaca, Mexico', price: '$20', note: 'Chocolate-forward, low acidity', bg: 'linear-gradient(155deg,#6e4a30,#3a261a)' },
    { title: 'Ethiopia Yirgacheffe', price: '$22', note: 'Blueberry, jasmine, wine-like finish', bg: 'linear-gradient(155deg,#7c5a7a,#46324f)' },
    { title: 'West Java, Indonesia', price: '$24', note: 'Earthy, herbal, full body', bg: 'linear-gradient(155deg,#5d6b46,#39472d)' },
    { title: 'Morning Standard', price: '$16', note: "The everyday blend. Spruce's top seller.", bg: 'linear-gradient(155deg,#b58d54,#7c5d31)' },
    { title: 'Starter Kit', price: '$48', note: 'One blend, one single-origin, filters, a brewing guide', bg: 'linear-gradient(155deg,#9c8f7c,#6b6155)' },
  ],
  voiceRules: [
    { n: 'Specificity over superlatives', d: 'Name the thing, skip the adjective.' },
    { n: 'Calm confidence, not hype', d: 'No all-caps. One exclamation point max, only in a subject or preview.' },
    { n: 'Jargon is audience-dependent', d: 'Explain terms for new buyers; use shorthand with subscribers.' },
    { n: "Founder voice, present but not constant", d: 'First-person "I" only when the founder signs the email.' },
    { n: 'Honest about limitations', d: "If something isn't for everyone, say so. It builds trust." },
    { n: 'No forced urgency', d: 'Never manufacture scarcity.' },
    { n: 'Short is default', d: "Cut any sentence the reader doesn't need to act." },
  ],
  isDemo: true,
}

const DEFAULT_VOICE = [
  { n: 'Specificity over superlatives', d: 'Name the thing, skip the adjective.' },
  { n: 'Calm confidence, not hype', d: 'No all-caps, no manufactured urgency.' },
  { n: 'Write to one person', d: 'Second person, like a note from the founder.' },
  { n: 'Honest about limitations', d: 'Say what something is and is not. Trust over polish.' },
  { n: 'Short is default', d: "Cut any sentence the reader doesn't need to act." },
]

function shortName(name) {
  if (!name) return 'your brand'
  return name.replace(/\b(co\.?|inc\.?|llc|ltd\.?|company|coffee|studio|shop|store)\b/gi, '').replace(/[.,]/g, '').trim().split(/\s+/)[0] || name
}

// Turn free-text voice notes into a few displayable rules.
function voiceRulesFrom(notes) {
  if (!notes || !notes.trim()) return DEFAULT_VOICE
  const parts = notes.split(/\n+|(?<=[.!?])\s+/).map((s) => s.trim()).filter((s) => s.length > 3).slice(0, 6)
  if (!parts.length) return DEFAULT_VOICE
  return parts.map((p) => {
    const [head, ...rest] = p.split(/[:.]\s*/)
    return rest.length ? { n: head.slice(0, 48), d: rest.join('. ') } : { n: p.length > 46 ? p.slice(0, 44) + '…' : p, d: '' }
  })
}

// ---- Brand profile <-> voice_notes serialization --------------------------
// The brand-research pass returns a structured profile. We store it in the
// existing brands.voice_notes column (no schema change) as a labeled text block
// that reads cleanly for humans and for the email writer. These helpers keep the
// write side (Connect) and the read side (studio + generator) in agreement.
export function serializeProfile(p) {
  if (!p) return null
  const lines = []
  if (p.positioning) lines.push(`POSITIONING: ${p.positioning}`)
  if (p.audience) lines.push(`AUDIENCE: ${p.audience}`)
  if (p.founder) lines.push(`FOUNDER: ${p.founder}`)
  if (Array.isArray(p.proof_points) && p.proof_points.length) lines.push(`PROOF: ${p.proof_points.join(' | ')}`)
  if (Array.isArray(p.voice_rules) && p.voice_rules.length) {
    lines.push('VOICE RULES:')
    p.voice_rules.forEach((r, i) => {
      const rule = (r.rule || '').trim()
      const why = (r.why || '').trim()
      lines.push((i + 1) + '. ' + rule + (why ? ' :: ' + why : ''))
    })
  }
  return lines.join('\n')
}

export function parseProfile(notes) {
  if (!notes || !/^POSITIONING:/m.test(notes)) return null
  const grab = (re) => { const m = notes.match(re); return m ? m[1].trim() : '' }
  const proofLine = grab(/^PROOF:\s*(.+)$/m)
  const rules = []
  const rulesIdx = notes.indexOf('VOICE RULES:')
  if (rulesIdx !== -1) {
    notes.slice(rulesIdx).split(/\n/).forEach((ln) => {
      const m = ln.match(/^\s*\d+\.\s*(.+)$/)
      if (!m) return
      const [n, ...d] = m[1].split(' :: ')
      rules.push({ n: n.trim(), d: d.join(' :: ').trim() })
    })
  }
  return {
    positioning: grab(/^POSITIONING:\s*(.+)$/m),
    audience: grab(/^AUDIENCE:\s*(.+)$/m),
    founder: grab(/^FOUNDER:\s*(.+)$/m),
    proof: proofLine ? proofLine.split('|').map((s) => s.trim()).filter(Boolean) : [],
    voiceRules: rules,
  }
}

export function buildStudioBrand(brand, products) {
  if (!brand) return DEMO_BRAND
  const prof = parseProfile(brand.voice_notes)
  const paper = brand.paper || '#F4EFE4'
  const ink = brand.ink || '#22201C'
  const accent = brand.accent || '#1F3A2E'
  const accent2 = brand.accent2 || '#C19A53'
  const list = (products || []).filter((p) => p && (p.title || p.image_url)).map((p) => ({
    title: p.title || 'Product',
    price: p.price || '',
    note: '',
    image_url: p.image_url || null,
    url: p.url || null,
    bg: gradientFor(accent),
  }))
  const url = (brand.store_url || '').replace(/^https?:\/\//, '').replace(/\/$/, '')
  return {
    name: brand.name || url || 'My brand',
    short: shortName(brand.name) || 'your brand',
    url: url || '',
    founder: (prof && prof.founder) || brand.founder || '',
    city: brand.city || '',
    positioning: (prof && prof.positioning) || brand.positioning || `On-brand marketing emails for ${brand.name || 'your store'}.`,
    audience: (prof && prof.audience) || brand.audience || 'Your subscribers and recent customers.',
    proof: (prof && prof.proof) || [],
    shopUrl: url ? `${url}/shop` : '',
    logoUrl: brand.logo_url || null,
    palette: (brand.palette && brand.palette.length ? brand.palette : [accent, accent2, paper, ink]).slice(0, 6),
    fonts: (brand.fonts && brand.fonts.length ? brand.fonts : ['Newsreader', 'Hanken Grotesk']).slice(0, 2),
    recentSends: [],
    emailTheme: {
      paper, ink, accent, accent2,
      oat: rgba(paper, 0.92), gold: '#9a7b3c',
      inkSoft: rgba(ink, 0.66), paperSoft: rgba(paper, 0.82),
      serif: 'var(--font-display)',
    },
    products: list,
    voiceRules: (prof && prof.voiceRules && prof.voiceRules.length) ? prof.voiceRules : voiceRulesFrom(brand.voice_notes),
    isDemo: false,
  }
}

// The brand-specific context block sent to the AI (prefixes the system prompt's work).
export function buildBrandBlock(sb) {
  const prod = sb.products.length
    ? sb.products.map((p) => `${p.title}${p.price ? ` (${p.price})` : ''}`).join('; ')
    : '(no product list provided)'
  const voice = sb.voiceRules.map((r, i) => `${i + 1}. ${r.n}${r.d ? ': ' + r.d : ''}`).join('\n')
  return `Brand: ${sb.name}${sb.url ? ` (${sb.url})` : ''}${sb.founder ? `, founded by ${sb.founder}` : ''}${sb.city ? ` in ${sb.city}` : ''}.
Positioning: ${sb.positioning}
Audience: ${sb.audience}
Products: ${prod}.
Shop link: ${sb.shopUrl || sb.url}
Voice rules:
${voice}`
}

// Has the founder filled in enough that we can skip the Brand step in the flow?
export function isBrandComplete(brand, products) {
  if (!brand) return false
  const hasName = !!(brand.name && brand.name.trim())
  const hasPalette = Array.isArray(brand.palette) && brand.palette.length >= 2
  const hasProducts = Array.isArray(products) && products.length >= 1
  return hasName && hasPalette && hasProducts
}
