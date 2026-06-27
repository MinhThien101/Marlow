import Anthropic from '@anthropic-ai/sdk'

// Marlow's brand-research pass. Served at /api/analyze-brand in production.
// Takes the readable text the scraper pulled from a store (homepage + about +
// story pages) and turns it into a structured brand profile: positioning,
// audience, founder, and 5-7 voice rules — each grounded in a real quote from
// the site. This is the difference between generic output and on-brand output:
// the email writer can only sound like a brand if it knows the brand.
//
// Method mirrors knowledge/mx/references/methods/voice-analysis-method.md and
// brand-research-method.md: evidence over inference, never invent.

const SCHEMA = {
  type: 'object',
  additionalProperties: false,
  properties: {
    positioning: {
      type: 'string',
      description: 'One or two sentences: what this brand sells, to whom, and the specific angle that makes it different. In the brand’s own terms, grounded in the page text. No category cliches.',
    },
    audience: {
      type: 'string',
      description: 'One or two sentences describing the actual customer the brand speaks to (who they are, what they care about, what they are skeptical of). Grounded in the text, not a demographic guess.',
    },
    founder: {
      type: 'string',
      description: 'Founder first name or "we"/team signal if the brand writes in first person, else empty string. Only if it appears in the text.',
    },
    confidence: {
      type: 'string',
      enum: ['high', 'medium', 'low'],
      description: 'high = rich founder/story copy; medium = decent homepage copy; low = thin storefront text only.',
    },
    voice_rules: {
      type: 'array',
      minItems: 3,
      maxItems: 7,
      description: '5-7 atomic, enforceable voice rules a copywriter could check in one scan. Each grounded in a real quote from the provided text. Fewer rules if evidence is thin. Never invent a pattern from a single line or from the brand’s category.',
      items: {
        type: 'object',
        additionalProperties: false,
        properties: {
          rule: { type: 'string', description: 'The durable behavior in one short sentence (e.g. "Sentence case in subject lines and openers, no title case").' },
          why: { type: 'string', description: 'One short line on what this does for the brand voice.' },
          evidence: { type: 'string', description: 'A short exact quote from the provided text that shows the pattern. No invented quotes.' },
        },
        required: ['rule', 'why', 'evidence'],
      },
    },
    proof_points: {
      type: 'array',
      maxItems: 5,
      description: 'Concrete factual proof found in the text only (e.g. "Roasted in Brooklyn since 2018", "4.8 stars from 2,000+ reviews"). Empty array if none appear. Never fabricate.',
      items: { type: 'string' },
    },
  },
  required: ['positioning', 'audience', 'founder', 'confidence', 'voice_rules', 'proof_points'],
}

const SYSTEM_PROMPT = `You are Marlow's brand researcher: a senior DTC strategist who reads a store's own words and extracts the brand profile an email copywriter needs to sound like that brand, not like generic AI.

You are given the readable text Marlow pulled from a store (homepage, About/story pages, sometimes FAQ). Work only from that text.

METHOD (evidence over inference):
- Positioning and audience come from what the brand actually says about itself and its customer. Quote-backed, specific. No category stereotypes ("skincare brands are clean and minimal" is banned reasoning).
- Voice rules are atomic and enforceable: a copywriter could check each in a single scan. Each rule must be grounded in a real pattern you can see in the text, with a short exact quote as evidence.
- Repetition is the signal. If a pattern shows once, it is a weak guess, not a rule. Prefer 5 strong rules over 7 padded ones.
- If the text is thin (storefront grid, little prose), return fewer rules and set confidence "low". Do not promote thin evidence to a hard rule.

HARD RULES:
- Never invent products, prices, founder names, claims, metrics, reviews, awards, dates, or quotes. If it is not in the text, it does not exist.
- Evidence quotes must be copied from the provided text, not paraphrased into something cleaner.
- Write positioning/audience/why fields in plain ASCII. No em dashes or en dashes, no curly quotes. Use commas, periods, parentheses.
- Do not write aspirational fluff ("warm and human", "authentic and bold"). Describe observable behavior.

Return only the structured fields.`

function buildUserMessage({ name, url, text, products }) {
  const catalog = (products || []).map((p) => `- ${p.title || '(untitled)'}${p.price ? ` (${p.price})` : ''}`).filter((l) => l !== '- (untitled)').join('\n')
  return `Brand: ${name || '(name unknown)'}${url ? ` (${url})` : ''}

PRODUCTS THE SCRAPER FOUND (titles only, may be incomplete):
${catalog || '(none detected)'}

READABLE TEXT FROM THE STORE (homepage + story pages):
"""
${(text || '').slice(0, 9000) || '(no readable text was found on the site)'}
"""

Extract the brand profile now. Ground every voice rule in a quote from the text above. If the text is too thin to support a rule, return fewer rules and lower confidence.`
}

export default async (req) => {
  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey) {
    // Fail-safe: onboarding proceeds without research rather than breaking.
    return Response.json({ ok: false, error: 'AI is not configured.' }, { status: 503 })
  }

  let body
  try { body = await req.json() } catch { return Response.json({ ok: false, error: 'Bad request.' }, { status: 400 }) }

  const { name = '', url = '', text = '', products = [] } = body || {}
  if (!text || text.trim().length < 40) {
    return Response.json({ ok: false, error: 'Not enough site text to analyze.' }, { status: 422 })
  }

  const client = new Anthropic({ apiKey })

  try {
    const message = await client.messages.create({
      model: 'claude-opus-4-8',
      max_tokens: 2000,
      thinking: { type: 'adaptive' },
      output_config: {
        effort: 'low',
        format: { type: 'json_schema', schema: SCHEMA },
      },
      system: [{ type: 'text', text: SYSTEM_PROMPT, cache_control: { type: 'ephemeral' } }],
      messages: [{ role: 'user', content: buildUserMessage({ name, url, text, products }) }],
    })

    if (message.stop_reason === 'refusal') {
      return Response.json({ ok: false, error: 'Could not analyze this site.' }, { status: 422 })
    }
    const out = message.content.find((b) => b.type === 'text')?.text
    if (!out) return Response.json({ ok: false, error: 'Empty response.' }, { status: 502 })

    return Response.json({ ok: true, profile: JSON.parse(out) })
  } catch (e) {
    const status = e?.status && e.status >= 400 && e.status < 600 ? e.status : 502
    return Response.json({ ok: false, error: 'Analysis failed.' }, { status })
  }
}

export const config = {
  path: '/api/analyze-brand',
}
