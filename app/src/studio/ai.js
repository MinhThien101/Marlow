// Marlow Studio AI client. Three calls go to /api/studio-ai (Claude, grounded in
// the MX skill + email design standards). Each call sends the connected brand's
// context block and has a scripted fallback so the flow works with or without
// the model (e.g. under plain `vite dev`, where /api/studio-ai is not served).
import { pillarOf } from './data.jsx'
import { buildBrandBlock } from './studioBrand.js'

async function callStudio(action, payload) {
  try {
    const res = await fetch('/api/studio-ai', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ action, ...payload }),
    })
    if (!res.ok) return null
    const data = await res.json()
    return data && data.ok ? data.result : null
  } catch {
    return null
  }
}

/* ----------------------------------------------------------------- brief */

function briefFallback(sb, { type, pillar, ask, offer }) {
  const p = pillarOf(pillar)
  const askText = (ask || '').trim()
  // Anti-fabrication: ground Product Focus in the user's ask or a named product.
  // Never default to the first product in the catalog — flag it as missing instead.
  const named = askText && sb.products.find((x) => askText.toLowerCase().includes(x.title.toLowerCase().split(',')[0]))
  const productFocus = named ? named.title : (askText || 'missing info: which product, collection, or content this campaign features')
  return {
    title: askText ? askText.replace(/^(a |an )/i, '').replace(/\.$/, '').slice(0, 60) : `${p.label} send`,
    direction: type === 'SMS'
      ? `Tell engaged subscribers about ${askText || p.label.toLowerCase()} in one direct text.`
      : `${p.job.toLowerCase().replace('the reader', 'Get the reader to').replace('the campaign sells', 'Sell')} around ${askText || p.label.toLowerCase()}.`,
    productFocus,
    offer: (offer || '').trim() || 'No offer',
  }
}

// Clean the AI-selected stack into a safe, lockable structure. DESIGNED leads
// with Hero Section and stays within the 2-4 cap; TEXT_BASED/SMS are a single
// label. Falls back to the offline pillar stack when the selection is unusable.
function normalizeStructure(type, selected, fallback) {
  const clean = Array.isArray(selected)
    ? selected.filter((s) => typeof s === 'string' && s.trim()).map((s) => s.trim())
    : []
  if (type !== 'DESIGNED') return [clean[0] || fallback[0]]
  let stack = clean.length ? clean : fallback.slice()
  if (stack[0] !== 'Hero Section') stack = ['Hero Section', ...stack.filter((s) => s !== 'Hero Section')]
  // Dedupe while preserving order, then enforce the 4-section cap.
  stack = stack.filter((s, i) => stack.indexOf(s) === i).slice(0, 4)
  return stack
}

export async function draftBrief(sb, { type, pillar, ask, offer, requiredLanguage, clientNotes }) {
  const fallback = briefFallback(sb, { type, pillar, ask, offer })
  const gen = await callStudio('brief', { type, pillar, ask, offer, requiredLanguage, clientNotes, brandBlock: buildBrandBlock(sb) })
  const b = gen || fallback
  const p = pillarOf(pillar)
  // Structure is SELECTED by the brief action from the campaign job. The data.jsx
  // pillar stacks are only the offline fallback (plain `vite dev`, no /api).
  const fallbackStructure = type === 'DESIGNED' ? p.designed : type === 'TEXT_BASED' ? [p.framework] : [p.sms]
  const structure = normalizeStructure(type, gen && gen.structure, fallbackStructure)
  // Links are grounded in the brand's real shop link; never invent one.
  const links = sb.shopUrl || sb.url || 'No required links'
  return {
    title: b.title || fallback.title,
    direction: b.direction || fallback.direction,
    productFocus: b.productFocus || fallback.productFocus,
    offer: b.offer || fallback.offer,
    links,
    requiredLanguage: (requiredLanguage || '').trim() || null,
    clientNotes: (clientNotes || '').trim() || null,
    structure, type, pillar,
  }
}

/* ------------------------------------------------------------------ copy */

export function fallbackCopy(brief, sb) {
  const prod = sb.products.find((x) => brief.productFocus && brief.productFocus.toLowerCase().includes(x.title.toLowerCase().split(',')[0])) || sb.products[0] || null
  const hasOffer = brief.offer && !/^no offer/i.test(brief.offer)
  const shop = sb.shopUrl || sb.url || ''
  const founder = sb.founder
  if (brief.type === 'SMS') {
    const m = brief.pillar === 'sales'
      ? `${sb.short}: ${hasOffer ? brief.offer + '. ' : ''}Shop the lineup. ${shop}`
      : brief.pillar === 'community'
      ? `${sb.short}: A quick note from ${founder || 'the team'}. Something new is up, take a look: ${shop}`
      : `${sb.short}: ${prod ? prod.title + ' is back. ' : ''}While it lasts: ${shop}`
    return { message: m.slice(0, 160) }
  }
  if (brief.type === 'TEXT_BASED') {
    const body = brief.pillar === 'community'
      ? `Wanted to send a quick note.\n\nWe have been working on a few things, and ${prod ? `the ${prod.title} is part of it` : 'wanted to share where we are'}. Same care, same standards as always.\n\nTake a look when you have a minute.${founder ? `\n\n- ${founder}` : ''}`
      : `Here is something worth knowing before your next order.\n\n${brief.direction}\n\nIf you have questions, just reply. No rush.`
    return { subject: brief.title, preview: brief.direction, body }
  }
  // DESIGNED
  const sections = brief.structure.map((label) => {
    if (label === 'Hero Section') return { label, headline: brief.title, body: brief.direction, cta: hasOffer ? 'Shop the offer' : 'Shop now' }
    if (label === 'Discount Offer') return { label, headline: hasOffer ? brief.offer : 'A little offer', body: 'It applies at checkout.', cta: 'Shop now' }
    if (label === 'Product Grid') return { label, headline: "What's in the shop", body: 'A few of our best.' }
    if (label === 'Product Spotlight') return { label, headline: prod ? prod.title : brief.title, body: prod ? `${prod.title}${prod.price ? `, ${prod.price}` : ''}. ${prod.note || ''}`.trim() : brief.direction, cta: prod ? `Shop ${prod.title.split(',')[0]}` : 'Shop now' }
    if (label === 'Benefit List') return { label, headline: "Why it's worth it", body: 'Made with care\nShips fast\nEasy returns\nReal support when you need it' }
    if (label === 'Educational Content') return { label, headline: 'The short version', body: brief.direction }
    if (label === 'Social Proof') return { label, headline: 'What customers say', body: '"One of the best I have tried." Real reviews from people who reorder.' }
    if (label === 'Brand Story') return { label, headline: 'A bit about us', body: brief.direction }
    return { label, headline: brief.title, body: brief.direction }
  })
  return { subject: brief.title, preview: brief.direction, sections }
}

export async function generateCopy(brief, instruction, sb) {
  const gen = await callStudio('copy', { brief, instruction, brandBlock: buildBrandBlock(sb) })
  if (!gen) return fallbackCopy(brief, sb)
  if (brief.type === 'SMS' && gen.message) return { message: String(gen.message).slice(0, 160) }
  return gen
}

/* ---------------------------------------------------------- design notes */

export async function designNotes(brief, sb) {
  const fb = brief.type === 'SMS'
    ? 'One bubble, one link, under 160 characters. The brand name leads so it reads as you before the ask.'
    : brief.type === 'TEXT_BASED'
    ? 'Set as a quiet letter: one serif headline, generous line height, no buttons competing with the voice.'
    : `${brief.pillar === 'sales' ? 'A bright accent for the offer.' : 'A calm brand accent.'} Heavy sections drop to a dark panel for rhythm; one hero image, one clear button per block.`
  const r = await callStudio('design-notes', { title: brief.title, type: brief.type, brandBlock: buildBrandBlock(sb) })
  return (r && String(r).trim()) || fb
}
