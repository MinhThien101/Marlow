import Anthropic from '@anthropic-ai/sdk'
import { SYSTEM_PROMPT } from '../../src/lib/knowledge.js'

// Marlow's AI writer. Served at /api/generate-email in production.
// Takes a brand + brief + campaign type + featured products and asks Claude to
// write a finished, on-brand email (subject, preview, hero copy, CTA labels).
// Factual data (product prices, images, URLs) is assembled client-side from the
// brand's own catalog — the model only writes copy, never invents products.

// The shape Claude must return. Structured outputs guarantee valid JSON.
const SCHEMA = {
  type: 'object',
  additionalProperties: false,
  properties: {
    subject: { type: 'string', description: 'Subject line, ~3-7 words, one specific benefit or a resolved curiosity gap.' },
    preview_text: { type: 'string', description: 'Inbox preview text, ~6-12 words. Complements the subject, never repeats it.' },
    hero: {
      type: 'object',
      additionalProperties: false,
      properties: {
        eyebrow: { type: 'string', description: 'Short kicker above the headline, 1-4 words, sentence case.' },
        headline: { type: 'string', description: 'The single loudest line. Sentence case. A skimmer reading only this should get the point.' },
        body: { type: 'string', description: 'One or two tight lines under the headline. Open inside the reader’s head.' },
        cta: { type: 'string', description: 'Above-the-fold button label. Verb-first, ~2-4 words. e.g. "Shop the sale".' },
      },
      required: ['eyebrow', 'headline', 'body', 'cta'],
    },
    feature_cta: { type: 'string', description: 'Button label for the featured-product section. Verb-first, ~2-4 words.' },
    code: {
      type: 'object',
      additionalProperties: false,
      description: 'Discount code block. Include ONLY if the brief states a code or offer; otherwise omit.',
      properties: {
        label: { type: 'string', description: 'e.g. "Use code at checkout".' },
        code: { type: 'string', description: 'The literal code, e.g. SAVE20. Only from the brief.' },
      },
      required: ['label', 'code'],
    },
  },
  required: ['subject', 'preview_text', 'hero', 'feature_cta'],
}

function buildUserMessage({ brand, products, type, prompt, featured }) {
  const featuredTitles = (featured || [])
    .map((id) => products.find((p) => p.id === id || p.title === id)?.title)
    .filter(Boolean)
  const catalog = (products || []).map((p) => `- ${p.title}${p.price ? ` (${p.price})` : ''}`).join('\n')

  return `Write one ${type} campaign email for this brand.

BRAND
Name: ${brand.name || '(unnamed store)'}
${brand.store_url ? `Store: ${brand.store_url}` : ''}

BRAND PROFILE (learned from the store's own words — this is who you write as)
${brand.voice_notes ? brand.voice_notes : '(no profile captured — infer a clean, on-brand voice from the name and products; do not fabricate facts)'}

Write in this brand's voice and to this audience. Follow the voice rules above. You may use the PROOF points as facts, but never add proof that is not listed.

THE FOUNDER'S BRIEF
${prompt?.trim() || '(no brief — write a sensible ' + type + ' email for this brand)'}

FEATURED PRODUCT(S) TO LEAD WITH
${featuredTitles.length ? featuredTitles.map((t) => `- ${t}`).join('\n') : '(none selected — write around the brand, do not invent a product)'}

FULL CATALOG (for reference only — never mention a product not in this list)
${catalog || '(no catalog available)'}

Write the copy now. Honor the brief above the campaign type. If the brief names no offer, write without a discount or code.`
}

export default async (req) => {
  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey) {
    return Response.json({ ok: false, error: 'AI is not configured.' }, { status: 503 })
  }

  let body
  try {
    body = await req.json()
  } catch {
    return Response.json({ ok: false, error: 'Bad request.' }, { status: 400 })
  }

  const { brand, products = [], type = 'promo', prompt = '', featured = [] } = body || {}
  if (!brand) {
    return Response.json({ ok: false, error: 'Missing brand.' }, { status: 400 })
  }

  const client = new Anthropic({ apiKey })

  try {
    const message = await client.messages.create({
      model: 'claude-opus-4-8',
      max_tokens: 3000,
      thinking: { type: 'adaptive' },
      output_config: {
        effort: 'low',
        format: { type: 'json_schema', schema: SCHEMA },
      },
      system: [{ type: 'text', text: SYSTEM_PROMPT, cache_control: { type: 'ephemeral' } }],
      messages: [{ role: 'user', content: buildUserMessage({ brand, products, type, prompt, featured }) }],
    })

    if (message.stop_reason === 'refusal') {
      return Response.json({ ok: false, error: 'Could not write this one.' }, { status: 422 })
    }

    const text = message.content.find((b) => b.type === 'text')?.text
    if (!text) return Response.json({ ok: false, error: 'Empty response.' }, { status: 502 })

    const content = JSON.parse(text)
    return Response.json({ ok: true, content })
  } catch (e) {
    const status = e?.status && e.status >= 400 && e.status < 600 ? e.status : 502
    return Response.json({ ok: false, error: 'Generation failed.' }, { status })
  }
}

export const config = {
  path: '/api/generate-email',
}
