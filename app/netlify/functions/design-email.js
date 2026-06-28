import Anthropic from '@anthropic-ai/sdk'
import mjml2html from 'mjml'
import { EMAIL_DESIGN } from '../../src/lib/studioKnowledge.js'

// Real generated email design. Served at /api/design-email.
//
// Opus generates the email FREE-FORM as MJML (a markup language, not a template
// library — the model still designs the layout, section treatments, palette and
// type itself), grounded in the EMAIL_DESIGN standards. We compile the MJML to
// bulletproof, email-client-safe HTML server-side with the `mjml` package: table
// layout, inline CSS, 600px, web-safe font fallbacks. Real product data (names,
// prices, image URLs, links) is injected from the brand's own catalog; the model
// never invents a product, and [missing: ...] / [image: ...] gaps are carried
// through as visible placeholder blocks.
//
//   mode 'full'    -> generate the whole email (logo -> hero -> brief sections -> close)
//   mode 'section' -> regenerate ONE section and swap it back into the document

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

// The design standards forbid a pure-white or pure-black canvas.
function lum(hex) {
  const m = /^#?([0-9a-f]{6})$/i.exec((hex || '').trim())
  if (!m) return 0.5
  const n = parseInt(m[1], 16)
  return (0.299 * ((n >> 16) & 255) + 0.587 * ((n >> 8) & 255) + 0.114 * (n & 255)) / 255
}
const safePaper = (h) => (lum(h) > 0.95 || !/^#?[0-9a-f]{6}$/i.test(h || '') ? '#F6F1E7' : h)
const safeInk = (h) => (lum(h) < 0.05 || !/^#?[0-9a-f]{6}$/i.test(h || '') ? '#1A1714' : h)

function rolesOf(assets) {
  const r = (assets && assets.roles) || {}
  return {
    paper: safePaper(r.paper || '#F4EFE4'),
    ink: safeInk(r.ink || '#22201C'),
    accent: /^#?[0-9a-f]{6}$/i.test(r.accent || '') ? r.accent : '#DD5530',
    accent2: /^#?[0-9a-f]{6}$/i.test(r.accent2 || '') ? r.accent2 : '#C19A53',
  }
}

function googleFont(name) {
  const fam = encodeURIComponent(name).replace(/%20/g, '+')
  return `<mj-font name="${name}" href="https://fonts.googleapis.com/css2?family=${fam}:wght@400;500;600;700&display=swap" />`
}

function buildHead(assets, roles) {
  const fonts = Array.isArray(assets.fonts) ? assets.fonts.filter(Boolean) : []
  const display = fonts[0]
  const body = fonts[1] || fonts[0]
  const fontTags = []
  if (display) fontTags.push(googleFont(display))
  if (body && body !== display) fontTags.push(googleFont(body))
  const bodyStack = `${body ? `'${body}', ` : ''}Helvetica, Arial, sans-serif`
  return `<mj-head>
    ${fontTags.join('\n    ')}
    <mj-attributes>
      <mj-all font-family="${bodyStack}" />
      <mj-text color="${roles.ink}" font-size="16px" line-height="1.6" />
      <mj-button background-color="${roles.accent}" color="${roles.paper}" font-size="14px" font-weight="700" letter-spacing="1px" inner-padding="16px 34px" border-radius="6px" />
    </mj-attributes>
  </mj-head>`
}

// A complete, compliant footer built in code so the email always ends with the
// full block (logo, social row, link grid, legal, unsubscribe + preferences).
function buildFooter(assets, roles) {
  const display = (Array.isArray(assets.fonts) && assets.fonts[0]) || 'Georgia'
  const name = assets.name || assets.short || 'Your brand'
  const wordmark = assets.logoUrl
    ? `<mj-image src="${assets.logoUrl}" alt="${name}" width="150px" align="center" padding="0 0 16px" />`
    : `<mj-text align="center" font-family="'${display}', Georgia, serif" font-size="22px" font-weight="600" letter-spacing="3px" text-transform="uppercase" color="${roles.paper}" padding="0 0 16px">${assets.short || name}</mj-text>`
  const year = new Date().getFullYear()
  return `<mj-section background-color="${roles.ink}" padding="44px 24px 38px">
    <mj-column>
      ${wordmark}
      <mj-text align="center" color="${roles.paper}" font-size="12px" letter-spacing="2px" padding="0 0 16px">INSTAGRAM   ·   YOUTUBE   ·   EMAIL</mj-text>
      <mj-text align="center" color="${roles.paper}" font-size="12px" letter-spacing="1px" padding="0 0 18px">Shop   ·   About   ·   Contact   ·   Subscribe</mj-text>
      <mj-text align="center" color="${roles.paper}" font-size="11px" line-height="1.6" padding="0">© ${year} ${name}. All rights reserved.<br /><a href="#" style="color:${roles.paper};text-decoration:underline">Unsubscribe</a> · <a href="#" style="color:${roles.paper};text-decoration:underline">Preferences</a></mj-text>
    </mj-column>
  </mj-section>`
}

function assetsBlock(assets, roles) {
  const products = (assets.products || []).map((p) => {
    const bits = [p.title]
    if (p.price) bits.push(`price ${p.price}`)
    bits.push(p.image_url ? `image ${p.image_url}` : 'image NONE (use a labeled placeholder)')
    if (p.url) bits.push(`link ${p.url}`)
    if (p.note) bits.push(`note: ${p.note}`)
    return `- ${bits.join(' | ')}`
  }).join('\n')
  return `BRAND ASSETS (use these EXACT values; never invent a product, price, image, or link):
Name: ${assets.name || ''}${assets.founder ? ` | Founder: ${assets.founder}` : ''}
Shop link: ${assets.shopUrl || ''}
Logo URL: ${assets.logoUrl || '(none — render the brand name as a wordmark)'}
Palette roles: canvas/paper ${roles.paper}, text/ink ${roles.ink}, accent ${roles.accent}, secondary accent ${roles.accent2}
Fonts: display "${(assets.fonts || [])[0] || 'serif'}", body "${(assets.fonts || [])[1] || (assets.fonts || [])[0] || 'sans-serif'}"
Products:
${products || '(no products provided)'}`
}

function copyBlock(copy) {
  const secs = (copy.sections || []).map((s, i) => {
    return `[${i + 1}] ${s.label}\n  headline: ${s.headline || ''}\n  body: ${s.body || ''}\n  cta: ${s.cta || '(none)'}`
  }).join('\n')
  return `APPROVED COPY (subject: ${copy.subject || ''} | preview: ${copy.preview || ''}). Lay these sections out IN THIS ORDER, one mj-section per copy section:
${secs}`
}

const MJML_RULES = `OUTPUT CONTRACT — generate MJML, not website HTML:
- Use only MJML 4 components: mj-section, mj-column, mj-group, mj-text, mj-image, mj-button, mj-divider, mj-spacer, mj-table. Put all styling in attributes (background-color, color, padding, font-size, font-weight, align, etc.). Do not emit <mjml>, <mj-head>, or <mj-body> wrappers; return body sections only.
- Each returned item is one or more complete <mj-section> blocks for that part of the email. The "label" is the copy section label (or "Logo" / "Closing").
- LAYOUT (free-form within the order): first a Logo section (wordmark or the logo image, on the canvas color), then a Hero section (one large display headline, short subhead, one mj-button, and the first product image if one exists), then each approved copy section in order, then a Closing section with the wordmark and one final mj-button. You choose the treatment of each section.
- COLOR: alternate section backgrounds for rhythm (canvas hero -> a dark accent or ink panel -> canvas -> ...). Use the provided palette roles only. The canvas and ink values given are already safe (never pure white or black). One accent only, for buttons and dark panels.
- TYPE: headings use the display font and a tight line-height; body uses the body font at 16px+. Always include the email-safe fallback already set in the head.
- CTAs: mj-button, UPPERCASE verb-led label taken from the copy's cta, href = the shop link (or a product's link when the section is about one product). Generous padding around it.
- IMAGERY: use mj-image with src set ONLY to a provided image URL. If a product has no image, or the copy contains an [image: ...] or [missing: ...] token, render a VISIBLE placeholder instead: an mj-text inside a dashed border (border:1.5px dashed <accent>; padding:18px; text-align:center) reading "Image: <what>" or "Missing: <what>". Never invent or hotlink an image that was not provided.
- FACTS: every product name, price, and link must come verbatim from BRAND ASSETS. Never invent one.`

async function generate({ system, user, schema, maxTokens = 4000 }) {
  const message = await client.messages.create({
    model: 'claude-opus-4-8',
    max_tokens: maxTokens,
    thinking: { type: 'adaptive' },
    output_config: { effort: 'medium', format: { type: 'json_schema', schema } },
    system: [{ type: 'text', text: system, cache_control: { type: 'ephemeral' } }],
    messages: [{ role: 'user', content: user }],
  })
  if (message.stop_reason === 'refusal') throw new Error('refusal')
  const out = message.content.find((b) => b.type === 'text')?.text
  if (!out) throw new Error('empty')
  return JSON.parse(out)
}

const FULL_SCHEMA = {
  type: 'object',
  additionalProperties: false,
  properties: {
    sections: {
      type: 'array', minItems: 3, maxItems: 9,
      items: {
        type: 'object', additionalProperties: false,
        properties: {
          label: { type: 'string', description: 'The copy section label, or "Logo" / "Closing".' },
          mjml: { type: 'string', description: 'One or more complete <mj-section> blocks for this part of the email.' },
        },
        required: ['label', 'mjml'],
      },
    },
  },
  required: ['sections'],
}

const SECTION_SCHEMA = {
  type: 'object', additionalProperties: false,
  properties: { mjml: { type: 'string', description: 'One or more complete <mj-section> blocks for this single section.' } },
  required: ['mjml'],
}

function compile(assets, roles, sections) {
  const head = buildHead(assets, roles)
  const body = sections.map((s) => s.mjml).join('\n')
  const footer = buildFooter(assets, roles)
  const doc = `<mjml>${head}<mj-body background-color="${roles.paper}" width="600px">${body}${footer}</mj-body></mjml>`
  const { html, errors } = mjml2html(doc, { validationLevel: 'soft', minify: false })
  return { html, mjml: doc, errors: errors || [] }
}

async function doFull(body) {
  const { assets = {}, copy = {}, accent, density, instruction } = body
  const roles = rolesOf(assets)
  if (accent && /^#?[0-9a-f]{6}$/i.test(accent)) roles.accent = accent
  const system = `${EMAIL_DESIGN}\n\n${MJML_RULES}`
  const user = `${assetsBlock(assets, roles)}

${copyBlock(copy)}

Accent to commit to: ${roles.accent}. Density: ${density === 'roomy' ? 'roomy (extra vertical breathing room, 64-120px between blocks)' : 'standard (48-72px between blocks)'}.${instruction ? `\n\nApply this art-direction change to the whole email: "${instruction}".` : ''}

Design the full email now as MJML body sections, in order: Logo, Hero Section, then the approved copy sections in their given order, then Closing. Return the JSON.`
  const gen = await generate({ system, user, schema: FULL_SCHEMA, maxTokens: 5000 })
  const sections = Array.isArray(gen.sections) ? gen.sections.filter((s) => s && s.mjml) : []
  if (!sections.length) throw new Error('no-sections')
  const { html } = compile(assets, roles, sections)
  if (!html) throw new Error('compile-failed')
  return { sections, html }
}

async function doSection(body) {
  const { assets = {}, copy = {}, accent, density, sections = [], index, instruction } = body
  const roles = rolesOf(assets)
  if (accent && /^#?[0-9a-f]{6}$/i.test(accent)) roles.accent = accent
  const list = Array.isArray(sections) ? sections.slice() : []
  const i = Number(index)
  if (!list[i]) throw new Error('bad-index')
  const target = list[i]
  const system = `${EMAIL_DESIGN}\n\n${MJML_RULES}`
  const user = `${assetsBlock(assets, roles)}

${copyBlock(copy)}

Accent: ${roles.accent}. Density: ${density === 'roomy' ? 'roomy' : 'standard'}.

Regenerate ONLY the "${target.label}" section with a fresh visual treatment${instruction ? `, applying this change: "${instruction}"` : ''}. Keep the same content and copy for this section; change the layout/treatment. Return one or more <mj-section> blocks for just this section.`
  const gen = await generate({ system, user, schema: SECTION_SCHEMA, maxTokens: 2000 })
  if (!gen.mjml) throw new Error('empty-section')
  list[i] = { ...target, mjml: gen.mjml }
  const { html } = compile(assets, roles, list)
  if (!html) throw new Error('compile-failed')
  return { sections: list, html }
}

export default async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers': 'content-type' } })
  }
  if (req.method !== 'POST') return new Response('method not allowed', { status: 405 })
  if (!process.env.ANTHROPIC_API_KEY) {
    return Response.json({ ok: false, error: 'AI is not configured.' }, { status: 503 })
  }
  let body
  try { body = await req.json() } catch { return Response.json({ ok: false, error: 'Bad request.' }, { status: 400 }) }

  try {
    const result = body.mode === 'section' ? await doSection(body) : await doFull(body)
    return Response.json({ ok: true, ...result })
  } catch (e) {
    console.error('design-email error', e)
    const status = e?.status && e.status >= 400 && e.status < 600 ? e.status : 502
    return Response.json({ ok: false, error: 'Design generation failed.' }, { status })
  }
}

export const config = {
  path: '/api/design-email',
}
