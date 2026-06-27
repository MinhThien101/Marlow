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
  // Carry a flagged gap forward instead of defaulting to the first SKU (anti-fabrication).
  const missingProduct = /^missing info/i.test((brief.productFocus || '').trim())
  const prod = missingProduct
    ? null
    : (sb.products.find((x) => brief.productFocus && brief.productFocus.toLowerCase().includes(x.title.toLowerCase().split(',')[0])) || sb.products[0] || null)
  const hasOffer = brief.offer && !/^no offer/i.test(brief.offer) && !/^missing info/i.test(brief.offer)
  const shop = sb.shopUrl || sb.url || ''
  const founder = sb.founder
  // Required language is a hard constraint: make sure it lands verbatim.
  const reqd = (brief.requiredLanguage || '').trim()
  if (brief.type === 'SMS') {
    const prodName = prod ? prod.title : '[missing: product]'
    let m = brief.pillar === 'sales'
      ? `${sb.short}: ${hasOffer ? brief.offer + '. ' : ''}Shop the lineup. ${shop}`
      : brief.pillar === 'community'
      ? `${sb.short}: A quick note from ${founder || 'the team'}. Something new is up, take a look: ${shop}`
      : `${sb.short}: ${prod ? prodName + ' is back. ' : ''}While it lasts: ${shop}`
    // Only fold in required language if it still fits the 160-char budget.
    if (reqd && (m.length + reqd.length + 1) <= 160) m = `${sb.short}: ${reqd} ${shop}`
    return { message: m.slice(0, 160) }
  }
  if (brief.type === 'TEXT_BASED') {
    const body = brief.pillar === 'community'
      ? `Wanted to send a quick note.\n\nWe have been working on a few things, and ${prod ? `the ${prod.title} is part of it` : 'wanted to share where we are'}. Same care, same standards as always.\n\nTake a look when you have a minute.${founder ? `\n\n- ${founder}` : ''}`
      : `Here is something worth knowing before your next order.\n\n${brief.direction}\n\nIf you have questions, just reply. No rush.`
    return { subject: brief.title, preview: brief.direction, body: reqd ? `${body}\n\n${reqd}` : body }
  }
  // DESIGNED
  const missingOffer = /^missing info/i.test((brief.offer || '').trim())
  const sections = brief.structure.map((label) => {
    if (label === 'Hero Section') return { label, headline: brief.title, body: reqd ? `${brief.direction}\n\n${reqd}` : brief.direction, cta: hasOffer ? 'Shop the offer' : 'Shop now' }
    if (label === 'Discount Offer') return { label, headline: hasOffer ? brief.offer : (missingOffer ? '[missing: offer terms]' : 'A little something'), body: hasOffer ? 'It applies at checkout.' : '[missing: offer details]', cta: 'Shop now' }
    if (label === 'Product Grid') return { label, headline: "What's in the shop", body: 'A few of our best.' }
    if (label === 'Product Spotlight') return { label, headline: prod ? prod.title : '[missing: product name]', body: prod ? `${prod.title}${prod.price ? `, ${prod.price}` : ''}. ${prod.note || ''}`.trim() : '[missing: which product this spotlight features]', cta: prod ? `Shop ${prod.title.split(',')[0]}` : 'Shop now' }
    if (label === 'Benefit List') return { label, headline: "Why it's worth it", body: 'Made with care\nShips fast\nEasy returns\nReal support when you need it' }
    if (label === 'Educational Content') return { label, headline: 'The short version', body: brief.direction }
    if (label === 'Social Proof') return { label, headline: 'What customers say', body: '"One of the best I have tried." Real reviews from people who reorder.' }
    if (label === 'Brand Story') return { label, headline: 'A bit about us', body: brief.direction }
    return { label, headline: brief.title, body: brief.direction }
  })
  return { subject: brief.title, preview: brief.direction, sections }
}

/* -------------------------------------------------- self-review / QA pass */
// A deterministic guardrail that runs on EVERY draft (model OR offline fallback):
// it guarantees ASCII punctuation, scans for the anti-AI hard tells, unresolved
// gaps, and length/structure problems, and produces the review CopyStage shows.
// When the server returned a model review (the writer-then-reviewer split), we
// keep its six-lens verdict and let this scan override the hard writing rules.

const BANNED_WORDS = ['delve', 'realm', 'harness', 'unlock', 'tapestry', 'elevate', 'crucial', 'pivotal', 'seamless', 'effortless', 'curated', 'vibrant', 'unparalleled', 'leverage', 'robust', 'game-changer', 'game-changing', 'testament', 'meticulous', 'captivate', 'indulge', 'nestled', 'boasts', 'transformative', 'supercharge', 'redefine', 'reimagine', 'embark', 'elixir', 'timeless', 'exquisite', 'bespoke', 'artisanal', 'revolutionary', 'cutting-edge', 'unleash']

const NEG_PARALLEL = [
  /\bit'?s not\b[^.]*?\bit'?s\b/i,
  /n['’]?t\s+just\b[^.]*?\b(it'?s|that'?s|they'?re|but)\b/i,
  /\bnot just\b[^.]*?\b(but|it'?s|they'?re|that'?s)\b/i,
  /\bnot only\b[^.]*?\bbut\b/i,
  /\bless\s+\w+,?\s+more\s+\w+/i,
  /\bstop\s+\w+ing\b[^.]*?\bstart\s+\w+ing\b/i,
]

function asciiClean(str) {
  return str
    .replace(/[‘’‛]/g, "'")
    .replace(/[“”]/g, '"')
    .replace(/…/g, '...')
    .replace(/\s*[—–]\s*/g, ', ')
    .replace(/,\s*([.!?,;:])/g, '$1')
    .replace(/\s+,/g, ',')
}

function cleanCopy(copy) {
  const m = (v) => (typeof v === 'string' ? asciiClean(v) : v)
  const c = { ...copy }
  if (typeof c.subject === 'string') c.subject = m(c.subject)
  if (typeof c.preview === 'string') c.preview = m(c.preview)
  if (typeof c.body === 'string') c.body = m(c.body)
  if (typeof c.message === 'string') c.message = m(c.message)
  if (Array.isArray(c.sections)) c.sections = c.sections.map((s) => ({ ...s, headline: m(s.headline), body: m(s.body), cta: m(s.cta) }))
  return c
}

function copyStrings(c) {
  const out = []
  const push = (v) => { if (typeof v === 'string' && v) out.push(v) }
  push(c.subject); push(c.preview); push(c.body); push(c.message)
  if (Array.isArray(c.sections)) c.sections.forEach((s) => { push(s.headline); push(s.body); push(s.cta) })
  return out
}

export function auditCopy(copy, brief) {
  const serverReview = (copy && copy.review) || null
  const { review: _drop, ...rest } = copy || {}
  const c = cleanCopy(rest)
  if (brief.type === 'SMS' && typeof c.message === 'string') c.message = c.message.slice(0, 160)

  const blob = copyStrings(c).join('\n')
  const flags = []

  // Anti-AI hard rules (deterministic, authoritative for lens 6).
  const banned = BANNED_WORDS.filter((w) => new RegExp(`\\b${w.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&')}\\b`, 'i').test(blob))
  const negParallel = NEG_PARALLEL.some((re) => re.test(blob))
  const dashesLeft = /[—–]/.test(blob)
  const languageOk = !banned.length && !negParallel && !dashesLeft
  if (banned.length) flags.push(`Possible AI words to swap: ${banned.slice(0, 4).join(', ')}.`)
  if (negParallel) flags.push('A "not X, but Y" phrasing slipped in. Recast it as a plain statement.')

  // Type / format and length.
  let typeOk = true
  if (brief.type === 'SMS') {
    typeOk = (c.message || '').length > 0 && (c.message || '').length <= 160
  } else if (brief.type === 'DESIGNED') {
    const labels = (c.sections || []).map((s) => s.label)
    const want = brief.structure || []
    typeOk = labels.length === want.length && labels.every((l, i) => l === want[i])
    if (!typeOk) flags.push('Sections do not match the brief structure; check the order and labels.')
  }

  // Unresolved gaps carried into the copy (founder must fill before send).
  if (/\[missing:/i.test(blob)) flags.push('Copy still has a [missing: ...] placeholder. Fill that fact before you send.')

  // Required language present word-for-word.
  let factsOk = true
  const reqd = (brief.requiredLanguage || '').trim()
  if (reqd && !blob.includes(reqd)) { factsOk = false; flags.push('Required language is not present word-for-word.') }

  let checks
  if (serverReview && serverReview.checks) {
    const sc = serverReview.checks
    checks = {
      brief: sc.brief !== false,
      facts: sc.facts !== false && factsOk,
      type: sc.type !== false && typeOk,
      voice: sc.voice !== false,
      format: sc.format !== false && typeOk,
      language: languageOk,
    }
  } else {
    // Offline draft is built straight from the brief, so alignment and voice hold by construction.
    checks = { brief: true, facts: factsOk, type: typeOk, voice: true, format: typeOk, language: languageOk }
  }
  const allFlags = [...(serverReview && Array.isArray(serverReview.flags) ? serverReview.flags : []), ...flags]
    .filter((f, i, a) => f && a.indexOf(f) === i)

  c.review = { checks, flags: allFlags, source: serverReview ? 'model+auto' : 'auto' }
  return c
}

export async function generateCopy(brief, instruction, sb) {
  const gen = await callStudio('copy', { brief, instruction, brandBlock: buildBrandBlock(sb) })
  const raw = gen || fallbackCopy(brief, sb)
  return auditCopy(raw, brief)
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
