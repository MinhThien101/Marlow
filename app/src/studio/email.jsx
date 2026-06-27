// The 600px on-brand email renderer (stage 4). Lays the approved copy out per the
// EMAIL_DESIGN standards: a single-column 600px canvas, logo bar -> hero -> the
// brief's sections in order (each in its real block shape) -> a reinforcement CTA
// -> footer. Brand theming (palette, paired fonts, products, logo) comes from the
// studio brand in context. Step-3 gaps ([missing: ...]) and image directions
// ([image: ...]) render as visible placeholder blocks, never invented away.
import React from 'react'
import { Icon } from '../ui/primitives.jsx'
import { useStudioBrand } from './brandContext.jsx'

const SANS = "'Hanken Grotesk', Helvetica, Arial, sans-serif"

// --- canvas guard ----------------------------------------------------------
// The design standards forbid a pure-white or pure-black canvas. Nudge a near-
// white paper to warm cream and a near-black ink to a soft near-black so the
// email never reads as "white + black Helvetica".
function lum(hex) {
  const m = /^#?([0-9a-f]{6})$/i.exec((hex || '').trim())
  if (!m) return 0.5
  const n = parseInt(m[1], 16)
  return (0.299 * ((n >> 16) & 255) + 0.587 * ((n >> 8) & 255) + 0.114 * (n & 255)) / 255
}
export function safePaper(hex) { return lum(hex) > 0.95 ? '#F6F1E7' : hex }
export function safeInk(hex) { return lum(hex) < 0.05 ? '#1A1714' : hex }

// --- placeholders ----------------------------------------------------------
// A [missing: ...] gap or an [image: ...] direction carried from Step 3 renders
// as a visible block so the founder can see it; it is never hidden or invented.
const SPLIT = /(\[(?:missing|image):[^\]]*\])/gi
const TOKEN = /^\[(missing|image):\s*([^\]]*)\]$/i
export function hasGap(s) { return typeof s === 'string' && /\[(?:missing|image):/i.test(s) }

const Placeholder = ({ kind, label, theme, big }) => {
  const img = kind === 'image'
  return (
    <div style={{ border: `1.5px dashed ${theme.fg}`, opacity: 0.8, borderRadius: 6, padding: big ? '34px 18px' : '12px 14px', margin: '8px 0', display: 'flex', flexDirection: big ? 'column' : 'row', alignItems: 'center', justifyContent: 'center', gap: 9, textAlign: 'center' }}>
      <Icon name={img ? 'ImagePlus' : 'AlertCircle'} size={big ? 26 : 16} color={theme.fg} />
      <span style={{ fontFamily: SANS, fontSize: big ? 13 : 12.5, fontWeight: 600, letterSpacing: '0.02em', color: theme.fg }}>{img ? 'Image: ' : 'Missing: '}{label}</span>
    </div>
  )
}

// Block-level: text becomes <p>, tokens become Placeholder blocks.
const RichBody = ({ text, theme, style }) => {
  if (typeof text !== 'string' || !text) return null
  return (
    <React.Fragment>
      {text.split(SPLIT).map((seg, i) => {
        const m = TOKEN.exec(seg)
        if (m) return <Placeholder key={i} kind={m[1].toLowerCase()} label={(m[2] || '').trim() || 'to fill'} theme={theme} />
        const t = seg.replace(/^\n+|\n+$/g, '')
        return t.trim() ? <p key={i} style={style}>{t}</p> : null
      })}
    </React.Fragment>
  )
}

// Inline: for headlines and CTAs, tokens render as a small dashed chip.
const InlineText = ({ text, theme }) => {
  if (typeof text !== 'string') return text || null
  return text.split(SPLIT).map((seg, i) => {
    const m = TOKEN.exec(seg)
    if (!m) return <React.Fragment key={i}>{seg}</React.Fragment>
    return (
      <span key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: 4, padding: '1px 7px', margin: '0 2px', borderRadius: 4, border: `1.5px dashed ${theme.fg}`, fontFamily: SANS, fontSize: '0.6em', fontWeight: 700, letterSpacing: '0.04em', textTransform: 'uppercase', verticalAlign: 'middle', opacity: 0.85 }}>
        {m[1].toLowerCase() === 'image' ? 'Image' : 'Missing'}: {(m[2] || '').trim() || 'to fill'}
      </span>
    )
  })
}

// --- shared bits -----------------------------------------------------------
const EButton = ({ children, bg, fg }) => (
  <span style={{ display: 'inline-block', padding: '16px 34px', borderRadius: 6, background: bg, color: fg, fontFamily: SANS, fontSize: 14, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase' }}>{children}</span>
)
const CTA = ({ label, theme }) => (label ? <EButton bg={theme.accent} fg={theme.btnFg}>{label}</EButton> : null)

const Wordmark = ({ sb, size = 22, color }) => (
  sb.logoUrl
    ? <img src={sb.logoUrl} alt={sb.name} style={{ height: size + 8, width: 'auto', maxWidth: 200, objectFit: 'contain', display: 'inline-block' }} />
    : <span style={{ fontFamily: sb.emailTheme.serif, fontSize: size, fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color }}>{sb.short || sb.name}</span>
)

const ProductImage = ({ p, height, radius = 4 }) => (
  <div style={{ width: '100%', height: height || undefined, aspectRatio: height ? undefined : '4/5', background: p.image_url ? `center/cover no-repeat url(${p.image_url})` : p.bg, borderRadius: radius, position: 'relative', boxShadow: 'inset 0 0 0 1px rgba(0,0,0,0.07)' }}>
    {!p.image_url && <span style={{ position: 'absolute', left: 10, bottom: 10, fontFamily: SANS, fontSize: 9.5, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.82)' }}>{p.title.split(',')[0]}</span>}
  </div>
)

const ProductBlock = ({ p, EM, T }) => (
  <div style={{ width: '100%' }}>
    <ProductImage p={p} />
    <div style={{ fontFamily: EM.display, fontSize: 17, color: T.ink, marginTop: 10 }}>{p.title}</div>
    {p.note && <div style={{ fontFamily: SANS, fontSize: 13, color: T.inkSoft, marginTop: 2 }}>{p.note}</div>}
    {p.price && <div style={{ fontFamily: SANS, fontSize: 14, fontWeight: 700, color: T.accent, marginTop: 4 }}>{p.price}</div>}
  </div>
)

// --- section rhythm --------------------------------------------------------
// Three panel treatments. The hero is light (cream); supporting sections
// alternate cream/dark for vertical rhythm (cream hero -> dark -> cream -> dark
// footer). One accent only, used for buttons and the dark panels.
const makeThemes = (T, accent) => ({
  cream: { key: 'light', bg: safePaper(T.paper), fg: safeInk(T.ink), sub: T.inkSoft, accent, btnFg: T.paper },
  dark: { key: 'dark', bg: T.accent, fg: T.paper, sub: T.paperSoft, accent: T.oat, btnFg: T.accent },
  ink: { key: 'dark', bg: safeInk(T.ink), fg: T.paper, sub: T.paperSoft, accent: T.accent2, btnFg: T.paper },
})

// Discount Offer always lands on the deep ink panel so the code block pops;
// everything else flips from its neighbor.
function planSections(rest, TH) {
  let prevDark = false // hero is light
  return rest.map((s) => {
    if (s.label === 'Discount Offer') { prevDark = true; return TH.ink }
    const t = prevDark ? TH.cream : TH.dark
    prevDark = !prevDark
    return t
  })
}

// Pull rows out of a markdown-ish table body (pipe-delimited). Drops the --- row.
function parseTable(body) {
  return (body || '').split('\n').map((l) => l.trim()).filter((l) => l.includes('|'))
    .map((l) => l.replace(/^\||\|$/g, '').split('|').map((c) => c.trim()))
    .filter((cells) => cells.length >= 2 && !cells.every((c) => /^[-:\s]*$/.test(c)))
}

// Pull individual testimonials (quote + attribution) out of a Social Proof body.
function parseQuotes(body) {
  const out = []
  const re = /"([^"]+)"[\s]*([^\n"]*)/g
  let m
  while ((m = re.exec(body || ''))) out.push({ quote: m[1].trim(), who: (m[2] || '').replace(/^[\s\-–,]+/, '').trim() })
  if (!out.length && (body || '').trim()) out.push({ quote: body.replace(/"/g, '').trim(), who: '' })
  return out.slice(0, 4)
}

// Find a discount code: an explicit "code: X" or an alphanumeric token that mixes
// letters and digits (so a plain word like SALE is never mistaken for a code).
function findCode(...strs) {
  const blob = strs.filter(Boolean).join('  ')
  const explicit = blob.match(/\bcode[:\s]+([A-Z0-9][A-Z0-9-]{2,})/i)
  if (explicit) return explicit[1].toUpperCase()
  const mixed = blob.match(/\b([A-Z]+[0-9]+[A-Z0-9]*|[0-9]+[A-Z]{2,}[A-Z0-9]*)\b/)
  return mixed ? mixed[1].toUpperCase() : null
}

// --- DESIGNED renderer -----------------------------------------------------
export function DesignedEmail({ copy, accent, density, EmailSection }) {
  const sb = useStudioBrand()
  const T = sb.emailTheme
  const EM = { display: T.serif }
  const TH = makeThemes(T, accent)
  const products = sb.products.length ? sb.products : [{ title: sb.name, price: '', bg: T.accent }]
  const sections = copy.sections || []
  const hero = sections.find((s) => s.label === 'Hero Section') || sections[0] || {}
  const rest = sections.filter((s) => s !== hero)
  const themes = planSections(rest, TH)
  const pillarLabel = copy._pillarLabel || 'Featured'
  const roomy = density === 'roomy'
  const padBlock = roomy ? '60px 44px' : '48px 40px'
  const closingCta = (hero.cta && !hasGap(hero.cta) ? hero.cta : null) || 'Shop now'
  // The reinforcement band sits opposite the last section so rhythm holds into the footer.
  const lastDark = themes.length ? themes[themes.length - 1].key === 'dark' : false
  const closeTheme = lastDark ? TH.cream : TH.dark

  const heading = (text, t, { size = 30, center = false, mb = 18 } = {}) => (
    <h2 style={{ fontFamily: EM.display, fontSize: size, fontWeight: 500, color: t.fg, margin: `0 0 ${mb}px`, letterSpacing: '-0.01em', lineHeight: 1.15, textAlign: center ? 'center' : 'left' }}>
      <InlineText text={text} theme={t} />
    </h2>
  )

  const renderSection = (s, t, i) => {
    const id = 's' + i

    if (s.label === 'Product Grid') {
      return (
        <EmailSection key={i} id={id} style={{ background: t.bg, padding: padBlock }}>
          {s.headline && heading(s.headline, t, { center: true, mb: 8 })}
          {s.body && <p style={{ fontFamily: SANS, fontSize: 15, color: t.sub, textAlign: 'center', margin: '0 auto 32px', maxWidth: 380 }}><InlineText text={s.body} theme={t} /></p>}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 26 }}>
            {products.slice(0, 4).map((p) => <ProductBlock key={p.title} p={p} EM={EM} T={T} />)}
          </div>
          {s.cta && <div style={{ textAlign: 'center', marginTop: 30 }}><CTA label={s.cta} theme={t} /></div>}
        </EmailSection>
      )
    }

    if (s.label === 'Product Spotlight') {
      const prod = products.find((x) => s.headline && s.headline.toLowerCase().includes(x.title.toLowerCase().split(',')[0])) || products[0]
      return (
        <EmailSection key={i} id={id} style={{ background: t.bg, padding: padBlock }}>
          <ProductImage p={prod} height={300} radius={6} />
          {heading(s.headline, t, { size: 32, mb: 12 })}
          <RichBody text={s.body} theme={t} style={{ fontFamily: SANS, fontSize: 16, lineHeight: 1.6, color: t.sub, margin: '0 0 24px', whiteSpace: 'pre-wrap' }} />
          <CTA label={s.cta} theme={t} />
        </EmailSection>
      )
    }

    if (s.label === 'Benefit List') {
      let items = (s.body || '').split('\n').map((x) => x.trim()).filter(Boolean)
      if (items.length <= 1) items = (s.body || '').split(/(?<=[.!?])\s+/).map((x) => x.trim()).filter(Boolean)
      items = items.slice(0, 6)
      const tileBg = t.key === 'dark' ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.045)'
      return (
        <EmailSection key={i} id={id} style={{ background: t.bg, padding: padBlock }}>
          {s.headline && heading(s.headline, t, { size: 28, center: true, mb: 26 })}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            {items.map((it, k) => {
              const cut = !hasGap(it) && it.match(/^([^:]{2,38}):\s*(.+)$/)
              const lab = cut ? cut[1].trim() : ''
              const txt = cut ? cut[2].trim() : it
              return (
                <div key={k} style={{ background: tileBg, borderRadius: 8, padding: '16px 16px 18px' }}>
                  <span style={{ display: 'inline-flex', width: 30, height: 30, borderRadius: '50%', background: accent, alignItems: 'center', justifyContent: 'center', marginBottom: 11 }}><Icon name="Check" size={15} stroke={2.5} color={T.paper} /></span>
                  {lab && <div style={{ fontFamily: SANS, fontSize: 14, fontWeight: 700, color: t.fg, marginBottom: 3 }}>{lab}</div>}
                  <div style={{ fontFamily: SANS, fontSize: 13.5, lineHeight: 1.45, color: t.sub }}><InlineText text={txt} theme={t} /></div>
                </div>
              )
            })}
          </div>
          {s.cta && <div style={{ textAlign: 'center', marginTop: 28 }}><CTA label={s.cta} theme={t} /></div>}
        </EmailSection>
      )
    }

    if (s.label === 'Comparison Table') {
      const rows = parseTable(s.body)
      const cols = rows.length ? Math.max(...rows.map((r) => r.length)) : 0
      const line = `1px solid ${t.key === 'dark' ? 'rgba(255,255,255,0.16)' : 'rgba(0,0,0,0.12)'}`
      return (
        <EmailSection key={i} id={id} style={{ background: t.bg, padding: padBlock }}>
          {s.headline && heading(s.headline, t, { size: 28, center: true, mb: 22 })}
          {rows.length ? (
            <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: SANS }}>
              <tbody>
                {rows.map((r, ri) => (
                  <tr key={ri} style={{ borderTop: ri ? line : 'none' }}>
                    {Array.from({ length: cols }).map((_, ci) => {
                      const head = ri === 0
                      const rowLabel = ci === 0
                      return (
                        <td key={ci} style={{ padding: '12px 12px', fontSize: 14, lineHeight: 1.4, textAlign: ci === 0 ? 'left' : 'center', fontWeight: head || rowLabel ? 700 : 400, color: head || rowLabel ? t.fg : t.sub, width: ci === 0 ? '34%' : undefined }}>{r[ci] || ''}</td>
                      )
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <RichBody text={s.body} theme={t} style={{ fontFamily: SANS, fontSize: 16, lineHeight: 1.6, color: t.sub, margin: 0, whiteSpace: 'pre-wrap' }} />
          )}
          {s.cta && <div style={{ textAlign: 'center', marginTop: 24 }}><CTA label={s.cta} theme={t} /></div>}
        </EmailSection>
      )
    }

    if (s.label === 'Discount Offer') {
      const code = findCode(s.headline, s.body)
      const auto = !code && /auto[-\s]?appl/i.test(`${s.headline} ${s.body}`)
      return (
        <EmailSection key={i} id={id} style={{ background: t.bg, padding: roomy ? '64px 44px' : '52px 40px', textAlign: 'center' }}>
          {heading(s.headline, t, { size: 40, center: true, mb: 16 })}
          {code ? (
            <div style={{ display: 'inline-block', border: `2px dashed ${t.accent}`, borderRadius: 8, padding: '14px 26px', margin: '0 0 22px' }}>
              <div style={{ fontFamily: SANS, fontSize: 10.5, fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: t.sub, marginBottom: 5 }}>Use code</div>
              <div style={{ fontFamily: 'var(--font-mono, monospace)', fontSize: 26, fontWeight: 700, letterSpacing: '0.12em', color: t.accent }}>{code}</div>
            </div>
          ) : auto ? (
            <div style={{ display: 'inline-block', borderRadius: 'var(--radius-pill, 999px)', background: 'rgba(255,255,255,0.1)', padding: '8px 18px', margin: '0 0 22px', fontFamily: SANS, fontSize: 13, fontWeight: 600, letterSpacing: '0.04em', color: t.fg }}>Auto-applies at checkout</div>
          ) : null}
          {s.body && hasGap(s.body) && <div style={{ maxWidth: 380, margin: '0 auto 22px', textAlign: 'left' }}><RichBody text={s.body} theme={t} style={{ fontFamily: SANS, fontSize: 16, lineHeight: 1.55, color: t.sub, margin: 0 }} /></div>}
          {s.body && !hasGap(s.body) && (() => { const framing = s.body.replace(/use code[:\s]+[A-Z0-9-]+/i, '').trim(); return framing ? <p style={{ fontFamily: SANS, fontSize: 16, lineHeight: 1.55, color: t.sub, margin: '0 auto 28px', maxWidth: 360 }}>{framing}</p> : null })()}
          <CTA label={s.cta || 'Shop the sale'} theme={t} />
        </EmailSection>
      )
    }

    if (s.label === 'Social Proof') {
      const quotes = parseQuotes(s.body)
      return (
        <EmailSection key={i} id={id} style={{ background: t.bg, padding: padBlock }}>
          {s.headline && heading(s.headline, t, { size: 26, center: true, mb: 24 })}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {quotes.map((q, k) => (
              <div key={k} style={{ background: t.key === 'dark' ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.04)', borderRadius: 10, padding: '20px 22px' }}>
                <div style={{ fontFamily: SANS, fontSize: 14, letterSpacing: '0.28em', color: accent, marginBottom: 12 }}>★★★★★</div>
                <p style={{ fontFamily: EM.display, fontSize: 19, fontStyle: 'italic', lineHeight: 1.45, color: t.fg, margin: '0 0 10px' }}>"{q.quote}"</p>
                {q.who && <div style={{ fontFamily: SANS, fontSize: 13, color: t.sub }}>{q.who}</div>}
              </div>
            ))}
          </div>
          {s.cta && <div style={{ textAlign: 'center', marginTop: 26 }}><CTA label={s.cta} theme={t} /></div>}
        </EmailSection>
      )
    }

    if (s.label === 'Image Block') {
      const desc = (s.body && (s.body.match(/\[image:\s*([^\]]*)\]/i) || [])[1]) || s.headline || 'art for this block'
      const caption = (s.body || '').replace(/\[(?:image|missing):[^\]]*\]/gi, '').replace(/\s+/g, ' ').trim()
      return (
        <EmailSection key={i} id={id} style={{ background: t.bg, padding: padBlock }}>
          {s.headline && <div style={{ fontFamily: SANS, fontSize: 12, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: t.accent, marginBottom: 12, textAlign: 'center' }}>{s.headline}</div>}
          <Placeholder kind="image" label={desc.trim()} theme={t} big />
          {caption && <p style={{ fontFamily: SANS, fontSize: 14, lineHeight: 1.5, color: t.sub, textAlign: 'center', margin: '14px auto 0', maxWidth: 380 }}>{caption}</p>}
          {s.cta && <div style={{ textAlign: 'center', marginTop: 22 }}><CTA label={s.cta} theme={t} /></div>}
        </EmailSection>
      )
    }

    if (s.label === 'How It Works') {
      let steps = (s.body || '').split('\n').map((x) => x.trim()).filter(Boolean)
      if (steps.length <= 1) steps = (s.body || '').split(/(?<=[.!?])\s+/).map((x) => x.trim()).filter(Boolean)
      steps = steps.slice(0, 5)
      return (
        <EmailSection key={i} id={id} style={{ background: t.bg, padding: padBlock }}>
          {s.headline && heading(s.headline, t, { size: 28, center: true, mb: 26 })}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {steps.map((st, k) => {
              const bare = st.replace(/^\d+[.)]\s*/, '')
              const cut = !hasGap(bare) && bare.match(/^([^:]{2,38}):\s*(.+)$/)
              const lab = cut ? cut[1].trim() : ''
              const txt = cut ? cut[2].trim() : bare
              return (
                <div key={k} style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                  <span style={{ flex: 'none', width: 30, height: 30, borderRadius: '50%', background: accent, color: T.paper, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: SANS, fontSize: 14, fontWeight: 700 }}>{k + 1}</span>
                  <div style={{ paddingTop: 2 }}>
                    {lab && <div style={{ fontFamily: SANS, fontSize: 15, fontWeight: 700, color: t.fg, marginBottom: 2 }}>{lab}</div>}
                    <div style={{ fontFamily: SANS, fontSize: 14.5, lineHeight: 1.5, color: t.sub }}><InlineText text={txt} theme={t} /></div>
                  </div>
                </div>
              )
            })}
          </div>
          {s.cta && <div style={{ textAlign: 'center', marginTop: 26 }}><CTA label={s.cta} theme={t} /></div>}
        </EmailSection>
      )
    }

    if (s.label === 'Promo Banner' || s.label === 'Urgency Banner') {
      return (
        <EmailSection key={i} id={id} style={{ background: t.bg, padding: roomy ? '34px 40px' : '26px 36px', textAlign: 'center' }}>
          {s.headline && <div style={{ fontFamily: EM.display, fontSize: 22, fontWeight: 500, color: t.fg, marginBottom: s.body ? 6 : 0 }}><InlineText text={s.headline} theme={t} /></div>}
          {s.body && <div style={{ fontFamily: SANS, fontSize: 14.5, color: t.sub, marginBottom: s.cta ? 16 : 0 }}><InlineText text={s.body} theme={t} /></div>}
          <CTA label={s.cta} theme={t} />
        </EmailSection>
      )
    }

    // Educational Content, Brand Story, Lifestyle Content, Feature Highlight,
    // FAQ, Support Block, and any other heavy text section.
    return (
      <EmailSection key={i} id={id} style={{ background: t.bg, padding: roomy ? '60px 48px' : '50px 44px' }}>
        {heading(s.headline, t, { size: 30, mb: 18 })}
        <RichBody text={s.body} theme={t} style={{ fontFamily: SANS, fontSize: 16, lineHeight: 1.68, color: t.sub, margin: '0 0 8px', whiteSpace: 'pre-wrap' }} />
        {s.label === 'Brand Story' && sb.founder && <p style={{ fontFamily: EM.display, fontStyle: 'italic', fontSize: 18, color: t.accent, margin: '14px 0 0' }}>- {sb.founder}</p>}
        {s.cta && <div style={{ marginTop: 22 }}><CTA label={s.cta} theme={t} /></div>}
      </EmailSection>
    )
  }

  return (
    <React.Fragment>
      <EmailSection id="logo" style={{ background: TH.cream.bg, padding: '24px 40px', textAlign: 'center', borderBottom: `1px solid ${T.inkSoft}22` }}>
        <Wordmark sb={sb} color={accent} />
      </EmailSection>

      <EmailSection id="hero" style={{ background: TH.cream.bg, padding: roomy ? '64px 40px 56px' : '52px 40px 44px', textAlign: 'center' }}>
        <div style={{ fontFamily: SANS, fontSize: 12, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: accent, marginBottom: 18 }}>{pillarLabel}</div>
        <h1 style={{ fontFamily: EM.display, fontSize: 52, lineHeight: 1.02, fontWeight: 500, color: TH.cream.fg, margin: 0, letterSpacing: '-0.015em' }}><InlineText text={hero.headline} theme={TH.cream} /></h1>
        {hero.body && <p style={{ fontFamily: SANS, fontSize: 18, lineHeight: 1.5, color: T.inkSoft, maxWidth: 420, margin: '20px auto 0' }}><InlineText text={hero.body} theme={TH.cream} /></p>}
        <div style={{ marginTop: 32 }}><CTA label={hero.cta || 'Shop now'} theme={TH.cream} /></div>
        <div style={{ marginTop: 36 }}><ProductImage p={products[0]} height={220} radius={6} /></div>
      </EmailSection>

      {rest.map((s, i) => renderSection(s, themes[i], i))}

      <EmailSection id="close" style={{ background: closeTheme.bg, padding: roomy ? '56px 44px' : '46px 40px', textAlign: 'center' }}>
        <div style={{ marginBottom: 22 }}><Wordmark sb={sb} size={20} color={closeTheme.fg} /></div>
        <CTA label={closingCta} theme={closeTheme} />
      </EmailSection>
    </React.Fragment>
  )
}

export function TextEmail({ copy, accent, EmailSection }) {
  const sb = useStudioBrand()
  const T = sb.emailTheme
  const theme = { fg: safeInk(T.ink), sub: T.inkSoft }
  const paper = safePaper(T.paper)
  const paras = (copy.body || '').split('\n\n')
  return (
    <React.Fragment>
      <EmailSection id="logo" style={{ background: paper, padding: '28px 48px 0', textAlign: 'center' }}>
        <Wordmark sb={sb} size={20} color={accent} />
      </EmailSection>
      <EmailSection id="body" style={{ background: paper, padding: '40px 56px 56px' }}>
        <h1 style={{ fontFamily: T.serif, fontSize: 34, lineHeight: 1.15, fontWeight: 500, color: theme.fg, margin: '0 0 28px', letterSpacing: '-0.01em' }}><InlineText text={copy.subject} theme={theme} /></h1>
        {paras.map((p, i) => {
          const sig = p.trim().startsWith('-')
          return <p key={i} style={{ fontFamily: sig ? T.serif : SANS, fontStyle: sig ? 'italic' : 'normal', fontSize: sig ? 19 : 16.5, lineHeight: 1.7, color: sig ? accent : T.inkSoft, margin: '0 0 18px' }}><InlineText text={p} theme={theme} /></p>
        })}
        <div style={{ marginTop: 14 }}><EButton bg={accent} fg={T.paper}>Shop now</EButton></div>
      </EmailSection>
    </React.Fragment>
  )
}

export function SmsEmail({ copy }) {
  const sb = useStudioBrand()
  const T = sb.emailTheme
  return (
    <div style={{ background: '#0b0b0c', padding: '40px 28px 56px', minHeight: 460 }}>
      <div style={{ textAlign: 'center', marginBottom: 24 }}>
        <div style={{ width: 52, height: 52, borderRadius: '50%', background: T.accent, color: T.paper, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontFamily: T.serif, fontSize: 24, fontWeight: 600, overflow: 'hidden' }}>
          {sb.logoUrl ? <img src={sb.logoUrl} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : (sb.short || 'B')[0].toUpperCase()}
        </div>
        <div style={{ fontFamily: SANS, fontSize: 13, color: '#9b9ba0', marginTop: 8 }}>{sb.name}</div>
        <div style={{ fontFamily: SANS, fontSize: 11, color: '#6c6c72', marginTop: 1 }}>Text message · Today</div>
      </div>
      <div style={{ maxWidth: 320, margin: '0 auto' }}>
        <div style={{ background: '#26262b', color: '#fff', padding: '13px 16px', borderRadius: 20, borderBottomLeftRadius: 6, fontFamily: SANS, fontSize: 15.5, lineHeight: 1.45 }}><InlineText text={copy.message} theme={{ fg: '#fff' }} /></div>
        <div style={{ fontFamily: SANS, fontSize: 11, color: '#6c6c72', marginTop: 6, paddingLeft: 4 }}>Delivered</div>
      </div>
    </div>
  )
}

export const Footer = ({ EmailSection }) => {
  const sb = useStudioBrand()
  const T = sb.emailTheme
  return (
    <EmailSection id="footer" style={{ background: safeInk(T.ink), padding: '44px 40px 38px', textAlign: 'center' }}>
      <div style={{ marginBottom: 16 }}><Wordmark sb={sb} size={24} color={T.paper} /></div>
      <div style={{ display: 'flex', justifyContent: 'center', gap: 18, marginBottom: 22 }}>
        {['Instagram', 'Youtube', 'Mail'].map((n) => <Icon key={n} name={n} size={18} color={T.paperSoft} />)}
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', gap: 22, flexWrap: 'wrap', marginBottom: 22 }}>
        {['Shop', 'About', 'Contact', 'Subscribe'].map((n) => <span key={n} style={{ fontFamily: SANS, fontSize: 12.5, letterSpacing: '0.04em', color: T.paperSoft }}>{n}</span>)}
      </div>
      <div style={{ fontFamily: SANS, fontSize: 11.5, lineHeight: 1.6, color: T.paperSoft, opacity: 0.7 }}>
        © 2026 {sb.name}. All rights reserved.<br /><span style={{ textDecoration: 'underline' }}>Unsubscribe</span> · <span style={{ textDecoration: 'underline' }}>Preferences</span>
      </div>
    </EmailSection>
  )
}
