import Anthropic from '@anthropic-ai/sdk'
import { STUDIO_SYSTEM_PROMPT } from '../../src/lib/studioKnowledge.js'

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

async function complete({ user, maxTokens }) {
  const msg = await client.messages.create({
    model: 'claude-haiku-4-5-20251001',
    max_tokens: maxTokens,
    system: [{ type: 'text', text: STUDIO_SYSTEM_PROMPT, cache_control: { type: 'ephemeral' } }],
    messages: [{ role: 'user', content: user }],
  })
  return msg.content[0]?.text || ''
}

function parseJSON(raw) {
  const m = raw.match(/\{[\s\S]*\}/)
  if (!m) throw new Error('no-json')
  return JSON.parse(m[0])
}

async function draftBrief(body) {
  const { pillar, type, ask, offer, requiredLanguage, clientNotes } = body
  const job = PILLAR_JOBS[pillar] || PILLAR_JOBS.educational
  const user = `${brandBlockOf(body)}

Write a campaign BRIEF (guardrails for a copywriter, not creative direction). State the single goal, product focus, and offer. No voice notes, no sample copy.

Content pillar: ${pillar} - ${job}
Campaign type: ${type}
What this send is about: "${ask || '(not specified)'}"
Offer the user named: "${offer || '(none)'}"${requiredLanguage ? `\nRequired language (must appear word-for-word in the copy): "${requiredLanguage}"` : ''}${clientNotes ? `\nClient specifications / hard constraints: "${clientNotes}"` : ''}

ANTI-FABRICATION (hard rule): never invent a Product Focus, Offer, or Link.
- Product Focus must be grounded in the brand's product list or the user's ask above. Never default to the first product in the catalog. If you cannot ground it, output exactly "missing info: <what is missing>".
- Offer: use only what the user named. If the user named no offer, output "No offer". Never invent a discount, code, percentage, or deadline.
- Links: use only the brand's real shop link. If none is available, output "No required links". Never invent a URL.

SELF-CHECK before answering: for Product Focus and Campaign Direction, privately name three concrete specifics grounded in the brand context or the ask. If you cannot name three, mark that field "missing info: <what is missing>" instead of padding it with generic language. Do not print the specifics; output only the JSON fields.

Return JSON: {"title":"<short campaign title, sentence case, under 8 words, or 'missing info: campaign title'>","direction":"<one sentence stating the single goal of this send>","productFocus":"<the product or collection this is about, real products only, or 'missing info: ...'>","offer":"<discount/code/expiration, or 'No offer', or 'missing info: ...'>"}`
  return parseJSON(await complete({ user, maxTokens: 500 }))
}

async function generateCopy(body) {
  const { brief, instruction } = body
  let user = `${brandBlockOf(body)}

Write final email copy from this brief. Apply the brand voice rules and the copy doctrine. For DESIGNED emails, one job per section, no printed section labels in the body text. Keep it short.

BRIEF:
Title: ${brief.title}
Direction: ${brief.direction}
Product focus: ${brief.productFocus}
Offer: ${brief.offer}
Type: ${brief.type}${brief.requiredLanguage ? `\nRequired language (use these phrases word-for-word): "${brief.requiredLanguage}"` : ''}${brief.clientNotes ? `\nClient specifications / hard constraints: "${brief.clientNotes}"` : ''}
`
  if (brief.type === 'DESIGNED') {
    user += `Sections (in order): ${brief.structure.join(', ')}

Return JSON: {"subject":"...","preview":"...","sections":[{"label":"<exact section label>","headline":"...","body":"...","cta":"<2-3 word button, omit if none>"}]}`
  } else if (brief.type === 'TEXT_BASED') {
    user += `Framework: ${brief.structure[0]}

Return JSON: {"subject":"...","preview":"...","body":"<the full email as plain prose with \\n\\n between paragraphs, signed with the founder name only if a founder letter>"}`
  } else {
    user += `Message type: ${brief.structure[0]}

Return JSON: {"message":"<one SMS under 160 characters, include the brand shop link>"}`
  }
  if (instruction) {
    user += `\n\nRevise the previous draft with this instruction: "${instruction}". Keep everything else.`
  }
  return parseJSON(await complete({ user, maxTokens: 1200 }))
}

async function designNotes(body) {
  const { title, type } = body
  const user = `${brandBlockOf(body)}

In one sentence (under 28 words, ASCII punctuation, no em-dash), explain the design choice for a ${type} email titled "${title}", grounded in the email design standards. Plain, confident.`
  return (await complete({ user, maxTokens: 90 })).trim()
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
    else return new Response('unknown action', { status: 400 })
    return Response.json({ ok: true, result })
  } catch (err) {
    console.error('studio-ai error', err)
    return Response.json({ ok: false, error: String(err) }, { status: 500 })
  }
}

export const config = { path: '/api/studio-ai' }
