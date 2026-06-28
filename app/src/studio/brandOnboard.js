// Brand onboarding pipeline — scrape a store URL, research its voice, and save
// the result. Extracted from Connect.jsx so the in-flow Brand stage and the
// full-screen Connect editor share ONE implementation (no duplicated scrape
// logic). These are pure network + transform helpers; React state stays in the
// callers. A failed scrape throws so callers can fall back to a manual path.
import { saveBrand, replaceProducts } from '../lib/data.js'
import { serializeProfile } from './studioBrand.js'

export const DEFAULT_PALETTE = ['#1F3A2E', '#C19A53', '#B5452F', '#22201C', '#F4EFE4']

export function stripScheme(url) {
  return (url || '').trim().replace(/^https?:\/\//, '')
}

/* ----- palette -> email roles -------------------------------------------
   Map a loose palette onto the email roles we need: a light paper, a dark ink,
   a readable accent (buttons / brand name), and a warm secondary (eyebrows). */
function hexToRgb(h) {
  const m = /^#?([0-9a-f]{6})$/i.exec((h || '').trim())
  if (!m) return null
  const n = parseInt(m[1], 16)
  return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 }
}
function luminance(h) {
  const c = hexToRgb(h); if (!c) return 0.5
  return (0.299 * c.r + 0.587 * c.g + 0.114 * c.b) / 255
}
function saturation(h) {
  const c = hexToRgb(h); if (!c) return 0
  const max = Math.max(c.r, c.g, c.b), min = Math.min(c.r, c.g, c.b)
  return max === 0 ? 0 : (max - min) / max
}
export function chooseRoles(palette) {
  const valid = (palette || []).filter((c) => hexToRgb(c))
  if (!valid.length) return { paper: '#F4EFE4', ink: '#22201C', accent: '#DD5530', accent2: '#C19A53' }
  const sorted = [...valid].sort((a, b) => luminance(a) - luminance(b))
  const light = sorted.filter((c) => luminance(c) >= 0.5)
  // accent: darkest reasonably-saturated colour, else darkest
  const accent = [...valid].filter((c) => luminance(c) < 0.62)
    .sort((a, b) => saturation(b) - saturation(a))[0] || sorted[0]
  const accent2 = [...valid].filter((c) => c !== accent && luminance(c) > 0.35 && luminance(c) < 0.85)
    .sort((a, b) => saturation(b) - saturation(a))[0] || '#C19A53'
  return {
    paper: light[light.length - 1] || '#F4EFE4',
    ink: sorted[0] || '#22201C',
    accent,
    accent2,
  }
}

/* ----- pipeline ---------------------------------------------------------- */

// Scrape the public store page. Returns a normalized brand shape. Throws on a
// hard network failure so callers can offer a manual path.
export async function scrapeBrand(url) {
  const res = await fetch('/api/scrape-brand', {
    method: 'POST', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ url }),
  })
  const data = await res.json()
  const b = data.brand || {}
  return {
    name: b.name || '',
    store_url: b.store_url || stripScheme(url),
    logo_url: b.logo_url || null,
    palette: (b.palette && b.palette.length ? b.palette : DEFAULT_PALETTE).slice(0, 6),
    fonts: (b.fonts || []).slice(0, 2),
    products: (data.products || []).map((p) => ({ ...p, title: p.title || '', price: p.price || '' })),
    text: data.text || '',
  }
}

// Read the brand's own words and learn its voice. Best-effort and non-blocking:
// returns the serialized voice_notes string, or null if research is unavailable
// or the page text is too thin to learn anything.
export async function researchBrand({ name, url, text, products }) {
  if (!text || text.trim().length < 40) return null
  try {
    const res = await fetch('/api/analyze-brand', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, url, text, products }),
    })
    const data = await res.json()
    if (data?.ok && data.profile) return serializeProfile(data.profile)
  } catch (_) { /* research is optional — silently skip on failure */ }
  return null
}

// Persist a brand + its products. Maps the palette onto email roles first.
// Pass `id` to update an existing brand in place (avoids creating a duplicate
// row when re-pulling an incomplete brand).
export async function saveOnboardedBrand({ id, name, storeUrl, logoUrl, palette, fonts, products, voiceNotes }) {
  const roles = chooseRoles(palette)
  const brand = await saveBrand({
    id,
    name: name || storeUrl || 'My brand',
    store_url: storeUrl, logo_url: logoUrl,
    palette, fonts,
    accent: roles.accent, accent2: roles.accent2, paper: roles.paper, ink: roles.ink,
    voice_notes: voiceNotes ?? null,
  })
  const cleaned = (products || []).filter((p) => p.image_url || p.title)
  const saved = await replaceProducts(brand.id, cleaned)
  return { brand, products: saved }
}

// One-shot onboarding for the in-flow Brand stage: scrape -> research -> save.
// onPhase('scraping' | 'researching' | 'saving') drives a progress label.
export async function onboardFromUrl(url, { id, onPhase } = {}) {
  onPhase?.('scraping')
  const s = await scrapeBrand(url)
  onPhase?.('researching')
  const voiceNotes = await researchBrand({ name: s.name, url: s.store_url || url, text: s.text, products: s.products })
  onPhase?.('saving')
  return saveOnboardedBrand({
    id,
    name: s.name, storeUrl: s.store_url, logoUrl: s.logo_url,
    palette: s.palette, fonts: s.fonts, products: s.products, voiceNotes,
  })
}
