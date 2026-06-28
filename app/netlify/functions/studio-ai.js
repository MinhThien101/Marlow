import Anthropic from '@anthropic-ai/sdk'
import { STUDIO_SYSTEM_PROMPT, copyPlaybook } from '../../src/lib/studioKnowledge.js'

// Marlow Studio AI — three actions, all grounded in the MX skill + email design
// standards (the system prompt backbone in src/lib/studioKnowledge.js):
//   brief        -> draft a campaign brief (JSON)
//   copy         -> write / revise email copy (JSON)
//   design-notes -> one-sentence design rationale (text)
// The brand-specific context block comes from the request (the connected brand);
// if absent we fall back to the demo brand so the flow always works.

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

const DEFAULT_BRAND_BLOCK = `Brand: Spruce Coffee Co. (sprucecoffee.co), a Portland specialty coffee roaster founded by Mara Ellis.
Positioning: Specialty coffee for home brewers who want better than the supermarket without learning a new language to buy a bag.
Audience: Daily home brewers, 28-45. Pour-over or French press. Skeptical of grocery coffee, not yet committed to high-end gear.
Products: Huila, Colombia ($22) - Bright acidity, stone fruit, clean finish; Oaxaca, Mexico ($20) - Chocolate-forward, low acidity; Ethiopia Yirgacheffe ($22) - Blueberry, jasmine, wine-like finish; West Java, Indonesia ($24) - Earthy, herbal, full body; Morning Standard ($16) - The everyday blend; Starter Kit ($48) - One blend, one single-origin, filters, a brewing guide.
Voice rules:
1. Specificity over superlatives.
2. Calm confidence, not hype.
3. Jargon is audience-dependent.
4. Founder voice present but not constant.
5. Honest about limitations.
6. No forced urgency.
7. Short is default.`

const PILLAR_JOBS = {
  educational: 'The reader needs to understand before they buy.',
  sales: 'The reader needs to act on an offer.',
  'social-proof': "The reader's blocker is skepticism.",
  product: 'Concentration on one hero product over assortment.',
  community: 'The campaign sells the brand world, not a product.',
}

function brandBlockOf(body) {
  return (body && typeof body.brandBlock === 'string' && body.brandBlock.trim())
    ? body.brandBlock.trim()
    : DEFAULT_BRAND_BLOCK
}

async function complete({ user, maxTokens, model = 'claude-opus-4-8' }) {
  const msg = await client.messages.create({
    model,
    max_tokens: maxTokens,
    system: [{ type: 'text', text: STUDIO_SYSTEM_PROMPT, cache_control: { type: 'ephemeral' } }],
    messages: [{ role: 'user', content: user }],
  })
  // Find the text block (robust to a leading thinking block on stronger models).
  return msg.content.find((b) => b.type === 'text')?.text || ''
}

function parseJSON(raw) {
  const m = raw.match(/\{[\s\S]*\}/)
  if (!m) throw new Error('no-json')
  return JSON.parse(m[0])
}

async function draftBrief(body) {
  const { pillar, type, ask, offer, requiredLanguage, clientNotes } = body
  const job = PILLAR_JOBS[pillar] || PILLAR_JOBS.educational

  // Structure is the load-bearing decision: SELECT it from the campaign job using
  // STRUCTURE SELECTION (not a fixed pillar stack), and return it.
  const structureAsk = type === 'DESIGNED'
    ? `SELECT THE SECTION STACK from the campaign job using STRUCTURE SELECTION. Hero Section is always first. Pick the smallest stack that supports the one direction: 2-3 sections is typical, a 4th only if it is scan-first, never more than 4. Respect section weight (one heavy plus one heavy is the cap; one heavy plus scan-first is the safe extension). Use only the canonical section labels.`
    : type === 'TEXT_BASED'
    ? `SELECT ONE TEXT_BASED FRAMEWORK from the framework chooser that matches the single direction. Never mix frameworks. Use a canonical framework label.`
    : `SELECT ONE SMS MESSAGE TYPE from the message-type chooser, from the single clearest reason this message exists. Use a canonical message-type label.`

  const shapeJSON = type === 'DESIGNED'
    ? `"structure":["Hero Section","<canonical section label>", ... 2 to 4 labels in order]`
    : `"structure":["<one canonical ${type === 'TEXT_BASED' ? 'framework' : 'message type'} label>"]`

  const user = `${brandBlockOf(body)}

Write a campaign BRIEF (guardrails for a copywriter, not creative direction). State the single goal, product focus, and offer, and SELECT the structure. No voice notes, no sample copy.

Content pillar (a prior, not a lock): ${pillar} - ${job}
Campaign type: ${type}
What this send is about: "${ask || '(not specified)'}"
Offer the user named: "${offer || '(none)'}"${requiredLanguage ? `\nRequired language (must appear word-for-word in the copy): "${requiredLanguage}"` : ''}${clientNotes ? `\nClient specifications / hard constraints: "${clientNotes}"` : ''}

${structureAsk}

ANTI-FABRICATION (hard rule): never invent a Product Focus, Offer, or Link.
- Product Focus must be grounded in the brand's product list or the user's ask above. Never default to the first product in the catalog. If you cannot ground it, output exactly "missing info: <what is missing>".
- Offer: use only what the user named. If the user named no offer, output "No offer". Never invent a discount, code, percentage, or deadline.
- Links: use only the brand's real shop link. If none is available, output "No required links". Never invent a URL.

SELF-CHECK before answering: for Product Focus and Campaign Direction, privately name three concrete specifics grounded in the brand context or the ask. If you cannot name three, mark that field "missing info: <what is missing>" instead of padding it with generic language. For the structure, confirm it supports ONE direction and is not overbuilt. Do not print the reasoning; output only the JSON.

Return JSON: {"title":"<short campaign title, sentence case, under 8 words, or 'missing info: campaign title'>","direction":"<one sentence stating the single goal of this send>","productFocus":"<the product or collection this is about, real products only, or 'missing info: ...'>","offer":"<discount/code/expiration, or 'No offer', or 'missing info: ...'>",${shapeJSON}}`

  // Conversational refine: revise an existing brief in place per the instruction,
  // keeping everything the change does not touch (structure included).
  let revised = user
  if (body.instruction && body.prior) {
    revised += `\n\nThis is a REVISION, not a new brief. Current brief JSON:\n${JSON.stringify(body.prior)}\n\nApply this change and nothing more: "${body.instruction}". Keep every other field as-is, including the structure unless the change requires altering it. Re-output the full brief JSON in the same shape, still honoring the ANTI-FABRICATION rules.`
  }
  return parseJSON(await complete({ user: revised, maxTokens: 900, model: 'claude-opus-4-8' }))
}

async function generateCopy(body) {
  const { brief, instruction } = body
  const structure = Array.isArray(brief.structure) ? brief.structure : []
  const playbook = copyPlaybook(brief.type, structure)
  const unit = brief.type === 'DESIGNED' ? 'section' : brief.type === 'TEXT_BASED' ? 'framework' : 'message type'

  let user = `${brandBlockOf(body)}

Write the FINAL email copy from this brief. Draft in the brand's voice: apply the brand voice rules and their evidence quotes above so it sounds like this brand, not generic DTC. On any conflict between a voice rule and a tactical brief instruction, the voice rule wins.

BRIEF (the guardrails; do not widen its scope):
Title: ${brief.title}
Direction: ${brief.direction}
Product focus: ${brief.productFocus}
Offer: ${brief.offer}
Links: ${brief.links || 'No required links'}
Type: ${brief.type}${brief.requiredLanguage ? `\nRequired language (must appear word-for-word, unaltered): "${brief.requiredLanguage}"` : ''}${brief.clientNotes ? `\nClient specifications / notes (hard constraints, not suggestions): "${brief.clientNotes}"` : ''}

PLAYBOOK (apply the shape, length, and "do not" rules for each named ${unit}):
${playbook}

HARD CONSTRAINTS:
- Facts: use ONLY the brand context and this brief. Never invent a product, price, offer, code, percentage, deadline, URL, statistic, testimonial, review, or claim. Reference a product only by a name in the product list, and use only the shop link above.
- Required language, if present, appears word-for-word and unaltered.
- Client specifications / notes, if present, are hard constraints.
- Carry gaps forward: if Product Focus, Offer, Links, or any briefed field still reads "missing info: ...", do NOT invent a value to fill it. Leave a short visible placeholder in square brackets where that fact belongs (for example [missing: product name] or [missing: offer code]) so the founder can fill it before ship.
- Writing style: ASCII punctuation only (no em-dash, en-dash, or curly quotes; compound-word hyphens are fine). No negative-parallelism or reframe constructions ("not X, but Y" and every variant). No banned AI words (delve, elevate, seamless, curated, unlock, etc.). Sentence-case headlines and eyebrows. Every line earns the next; cut padding.
`
  if (brief.type === 'DESIGNED') {
    user += `\nReturn JSON: {"subject":"...","preview":"...","sections":[{"label":"<exact section label, in the brief order>","headline":"...","body":"...","cta":"<2-3 word button, omit if the section has no CTA>"}]}. One job per section, no printed section labels inside the body text.`
  } else if (brief.type === 'TEXT_BASED') {
    user += `\nReturn JSON: {"subject":"...","preview":"...","body":"<the full email as plain prose with \\n\\n between paragraphs, signed with the founder name only if it is a founder letter>"}`
  } else {
    user += `\nReturn JSON: {"message":"<one SMS under 160 characters including the shop link>"}`
  }
  if (instruction) {
    user += `\n\nRevise the previous draft with this instruction: "${instruction}". Keep everything else, and keep honoring the playbook and the hard constraints above.`
  }
  const draft = parseJSON(await complete({ user, maxTokens: 1200 }))
  return reviewCopy(body, brief, draft)
}

// Phase 2: an independent, skeptical reviewer pass (copy-review-checklist.md).
// The writer-then-reviewer split is load-bearing, so this is a SEPARATE model
// call: it runs the six lenses plus the anti-AI writing rules, fixes violations,
// and returns the corrected copy plus a review report the UI surfaces. If the
// reviewer ever returns unusable JSON, we fall back to the writer's draft.
async function reviewCopy(body, brief, draft) {
  const shape = brief.type === 'DESIGNED'
    ? '"subject":"...","preview":"...","sections":[{"label":"...","headline":"...","body":"...","cta":"..."}]'
    : brief.type === 'TEXT_BASED'
    ? '"subject":"...","preview":"...","body":"..."'
    : '"message":"..."'
  const user = `${brandBlockOf(body)}

You are the REVIEWER, working independently from the writer. Posture is skeptical: if you find no issues, you did not look hard enough. Review the DRAFT against the brief, fix every violation, and return corrected copy plus a review report.

BRIEF:
Title: ${brief.title}
Direction: ${brief.direction}
Product focus: ${brief.productFocus}
Offer: ${brief.offer}
Links: ${brief.links || 'No required links'}
Type: ${brief.type}${brief.requiredLanguage ? `\nRequired language (must appear word-for-word): "${brief.requiredLanguage}"` : ''}${brief.clientNotes ? `\nClient specifications / notes (hard constraints): "${brief.clientNotes}"` : ''}

DRAFT (JSON):
${JSON.stringify(draft)}

Run the SIX LENSES in order, each an independent pass:
1. Brief alignment: same product, same offer, same single direction as the brief.
2. Factual integrity: every claim grounded in the brand context or brief; required language present word-for-word; no invented product, price, code, URL, statistic, or testimonial. An unresolved "missing info" stays a visible [missing: ...] placeholder; never invent it away.
3. Type alignment: DESIGNED keeps the ordered sections, TEXT_BASED keeps the one framework, SMS matches the type and stays under 160 characters.
4. Voice and brand rules: the brand voice rules win over tactical instructions.
5. Format and length: hero leads, one job per section, no printed section labels, copy stays short.
6. Language quality: every sentence earns its place; no padding, no AI patterning.

Also enforce the WRITING STYLE hard rules (a single violation fails the copy): ASCII punctuation only (no em-dash, en-dash, or curly quotes), NO negative-parallelism or reframe constructions ("not X, but Y" and every variant), and none of the banned AI words.

Fix every violation by revising only the offending lines; keep what already works. Return JSON only:
{ ${shape}, "review": { "checks": { "brief": true, "facts": true, "type": true, "voice": true, "format": true, "language": true }, "flags": [] } }
Set a check to false only if that lens still has a problem you could not fully resolve. Put a short, specific note in "flags" for anything the founder should eyeball (an unresolved [missing: ...] gap, a voice-versus-brief tension, a fact that needs confirming). Empty array if none.`
  try {
    const out = parseJSON(await complete({ user, maxTokens: 1400 }))
    const hasCopy = brief.type === 'SMS' ? out.message : brief.type === 'TEXT_BASED' ? out.body : Array.isArray(out.sections)
    if (hasCopy) return out
    return { ...draft, review: out.review || null }
  } catch {
    return draft
  }
}

async function designNotes(body) {
  const { title, type } = body
  const user = `${brandBlockOf(body)}

In one sentence (under 28 words, ASCII punctuation, no em-dash), explain the design choice for a ${type} email titled "${title}", grounded in the email design standards. Plain, confident.`
  return (await complete({ user, maxTokens: 90 })).trim()
}

// Suggested sends: read the connected brand and propose 4-6 specific campaigns the
// founder could ship soon. Grounded in the brand block; anti-fabrication applies.
async function suggestSends(body) {
  const now = new Date()
  const month = now.toLocaleString('en-US', { month: 'long' })
  const season = ['Winter', 'Winter', 'Spring', 'Spring', 'Spring', 'Summer', 'Summer', 'Summer', 'Fall', 'Fall', 'Fall', 'Winter'][now.getMonth()]
  const user = `${brandBlockOf(body)}

Suggest 4 to 6 specific campaign sends this brand could ship soon. You are proposing ideas a founder picks from, each grounded in THIS brand's real products, positioning, and audience above.

Timing: it is ${month} (${season}). Let the season lightly inform at most one idea. Do NOT invent a specific holiday, sale, date, or deadline.

For each suggestion choose:
- pillar: exactly one of educational, sales, social-proof, product, community
- type: exactly one of DESIGNED, TEXT_BASED, SMS
- title: a concrete send title in sentence case, under 9 words, naming the real thing ("Restock: the Huila single-origin is back", never "Send a sales email"). Reference products only by names in the brand context.
- angle: one sentence the founder could drop into a brief as "what this send is about".

Vary the pillars and types across the set. Be specific to this brand; an idea that would fit any store is a failure.

ANTI-FABRICATION (hard rule): never invent a product, price, offer, code, discount, percentage, or date. Use only product names from the brand context. Keep any offer generic ("a seasonal offer") unless the brand context names a real one.

Return JSON: {"suggestions":[{"pillar":"...","type":"...","title":"...","angle":"..."}]}`
  return parseJSON(await complete({ user, maxTokens: 800 }))
}

export default async function handler(req) {
  if (req.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers': 'content-type' } })
  }
  if (req.method !== 'POST') return new Response('method not allowed', { status: 405 })
  if (!process.env.ANTHROPIC_API_KEY) {
    return Response.json({ ok: false, error: 'AI is not configured.' }, { status: 503 })
  }

  let body
  try { body = await req.json() } catch { return new Response('bad json', { status: 400 }) }

  try {
    let result
    if (body.action === 'brief') result = await draftBrief(body)
    else if (body.action === 'copy') result = await generateCopy(body)
    else if (body.action === 'design-notes') result = await designNotes(body)
    else if (body.action === 'suggest-sends') result = await suggestSends(body)
    else return new Response('unknown action', { status: 400 })
    return Response.json({ ok: true, result })
  } catch (err) {
    console.error('studio-ai error', err)
    return Response.json({ ok: false, error: String(err) }, { status: 500 })
  }
}

export const config = { path: '/api/studio-ai' }
