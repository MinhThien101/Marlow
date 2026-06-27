// The 600px on-brand email renderer (stage 4). Renders the approved copy in the
// connected brand's own colors, fonts, products, and logo (per the email design
// standards). Brand theming comes from the studio brand in context.
import React from 'react'
import { Icon } from '../ui/primitives.jsx'
import { useStudioBrand } from './brandContext.jsx'

const SANS = "'Hanken Grotesk', Helvetica, Arial, sans-serif"

const sectionTheme = (label, T, accent) => {
  const dark = { bg: T.accent, fg: T.paper, sub: T.paperSoft, accent: T.oat }
  const cream = { bg: T.paper, fg: T.ink, sub: T.inkSoft, accent }
  const ink = { bg: T.ink, fg: T.paper, sub: T.paperSoft, accent: T.accent2 }
  if (label === 'Educational Content' || label === 'Brand Story') return dark
  if (label === 'Discount Offer') return ink
  return cream
}

const EButton = ({ children, bg, fg }) => (
  <span style={{ display: 'inline-block', padding: '16px 34px', borderRadius: 6, background: bg, color: fg, fontFamily: SANS, fontSize: 14, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase' }}>{children}</span>
)

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

export function DesignedEmail({ copy, accent, density, EmailSection }) {
  const sb = useStudioBrand()
  const T = sb.emailTheme
  const EM = { display: T.serif }
  const products = sb.products.length ? sb.products : [{ title: sb.name, price: '', bg: T.accent }]
  const sections = copy.sections || []
  const hero = sections.find((s) => s.label === 'Hero Section') || sections[0] || {}
  const rest = sections.filter((s) => s !== hero)
  const pillarLabel = (copy._pillarLabel || 'Featured')
  return (
    <React.Fragment>
      <EmailSection id="logo" style={{ background: T.paper, padding: '24px 40px', textAlign: 'center', borderBottom: `1px solid ${T.inkSoft}22` }}>
        <Wordmark sb={sb} color={T.accent} />
      </EmailSection>

      <EmailSection id="hero" style={{ background: T.paper, padding: density === 'roomy' ? '64px 40px 56px' : '52px 40px 44px', textAlign: 'center' }}>
        <div style={{ fontFamily: SANS, fontSize: 12, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: accent, marginBottom: 18 }}>{pillarLabel}</div>
        <h1 style={{ fontFamily: EM.display, fontSize: 52, lineHeight: 1.02, fontWeight: 500, color: T.ink, margin: 0, letterSpacing: '-0.015em' }}>{hero.headline}</h1>
        {hero.body && <p style={{ fontFamily: SANS, fontSize: 18, lineHeight: 1.5, color: T.inkSoft, maxWidth: 420, margin: '20px auto 0' }}>{hero.body}</p>}
        <div style={{ marginTop: 32 }}><EButton bg={accent} fg={T.paper}>{hero.cta || 'Shop now'}</EButton></div>
        <div style={{ marginTop: 36 }}><ProductImage p={products[0]} height={220} radius={6} /></div>
      </EmailSection>

      {rest.map((s, i) => {
        const t = sectionTheme(s.label, T, accent)
        const pad = density === 'roomy' ? '60px 44px' : '48px 40px'
        if (s.label === 'Product Grid') {
          return (
            <EmailSection key={i} id={'s' + i} style={{ background: t.bg, padding: pad }}>
              {s.headline && <h2 style={{ fontFamily: EM.display, fontSize: 30, fontWeight: 500, color: t.fg, textAlign: 'center', margin: '0 0 8px' }}>{s.headline}</h2>}
              {s.body && <p style={{ fontFamily: SANS, fontSize: 15, color: t.sub, textAlign: 'center', margin: '0 auto 32px', maxWidth: 380 }}>{s.body}</p>}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 26 }}>
                {products.slice(0, 4).map((p) => <ProductBlock key={p.title} p={p} EM={EM} T={T} />)}
              </div>
            </EmailSection>
          )
        }
        if (s.label === 'Product Spotlight') {
          const prod = products.find((x) => s.headline && s.headline.toLowerCase().includes(x.title.toLowerCase().split(',')[0])) || products[0]
          return (
            <EmailSection key={i} id={'s' + i} style={{ background: t.bg, padding: pad }}>
              <ProductImage p={prod} height={300} radius={6} />
              <h2 style={{ fontFamily: EM.display, fontSize: 32, fontWeight: 500, color: t.fg, margin: '28px 0 12px', letterSpacing: '-0.01em' }}>{s.headline}</h2>
              <p style={{ fontFamily: SANS, fontSize: 16, lineHeight: 1.6, color: t.sub, margin: '0 0 24px' }}>{s.body}</p>
              {s.cta && <EButton bg={t.accent} fg={t.bg === T.paper ? T.paper : T.ink}>{s.cta}</EButton>}
            </EmailSection>
          )
        }
        if (s.label === 'Benefit List') {
          let items = (s.body || '').split('\n').map((x) => x.trim()).filter(Boolean)
          if (items.length <= 1) items = (s.body || '').split(/(?<=[.!?])\s+/).map((x) => x.trim()).filter(Boolean)
          items = items.slice(0, 4)
          return (
            <EmailSection key={i} id={'s' + i} style={{ background: t.bg, padding: pad }}>
              <h2 style={{ fontFamily: EM.display, fontSize: 28, fontWeight: 500, color: t.fg, textAlign: 'center', margin: '0 0 28px' }}>{s.headline}</h2>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '18px 22px' }}>
                {items.map((it, k) => (
                  <div key={k} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                    <span style={{ flex: 'none', width: 30, height: 30, borderRadius: '50%', background: accent, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Icon name="Check" size={15} stroke={2.5} color={T.paper} /></span>
                    <span style={{ fontFamily: SANS, fontSize: 15, lineHeight: 1.4, color: t.fg, paddingTop: 4 }}>{it}</span>
                  </div>
                ))}
              </div>
            </EmailSection>
          )
        }
        if (s.label === 'Discount Offer') {
          return (
            <EmailSection key={i} id={'s' + i} style={{ background: t.bg, padding: density === 'roomy' ? '64px 44px' : '52px 40px', textAlign: 'center' }}>
              <h2 style={{ fontFamily: EM.display, fontSize: 40, fontWeight: 500, color: t.fg, margin: '0 0 12px', letterSpacing: '-0.01em' }}>{s.headline}</h2>
              <p style={{ fontFamily: SANS, fontSize: 16, lineHeight: 1.55, color: t.sub, margin: '0 auto 28px', maxWidth: 360 }}>{s.body}</p>
              {s.cta && <EButton bg={t.accent} fg={T.paper}>{s.cta}</EButton>}
            </EmailSection>
          )
        }
        if (s.label === 'Social Proof') {
          return (
            <EmailSection key={i} id={'s' + i} style={{ background: t.bg, padding: pad, textAlign: 'center' }}>
              <div style={{ fontFamily: SANS, fontSize: 18, letterSpacing: '0.3em', color: accent, marginBottom: 18 }}>★★★★★</div>
              <p style={{ fontFamily: EM.display, fontSize: 24, fontStyle: 'italic', lineHeight: 1.4, color: t.fg, margin: '0 auto 18px', maxWidth: 440 }}>{(s.body || '').split('"')[0].replace(/^["']/, '')}"</p>
              <p style={{ fontFamily: SANS, fontSize: 14, color: t.sub, margin: 0 }}>{(s.body || '').split('"')[1] || ''}</p>
            </EmailSection>
          )
        }
        // Educational Content, Brand Story, generic
        return (
          <EmailSection key={i} id={'s' + i} style={{ background: t.bg, padding: density === 'roomy' ? '60px 48px' : '50px 44px' }}>
            <h2 style={{ fontFamily: EM.display, fontSize: 30, fontWeight: 500, color: t.fg, margin: '0 0 18px', letterSpacing: '-0.01em', lineHeight: 1.15 }}>{s.headline}</h2>
            <p style={{ fontFamily: SANS, fontSize: 16, lineHeight: 1.68, color: t.sub, margin: 0, whiteSpace: 'pre-wrap' }}>{s.body}</p>
            {s.label === 'Brand Story' && sb.founder && <p style={{ fontFamily: EM.display, fontStyle: 'italic', fontSize: 18, color: t.accent, margin: '20px 0 0' }}>- {sb.founder}</p>}
            {s.cta && <div style={{ marginTop: 26 }}><EButton bg={t.accent} fg={t.bg === T.paper ? T.paper : T.ink}>{s.cta}</EButton></div>}
          </EmailSection>
        )
      })}
    </React.Fragment>
  )
}

export function TextEmail({ copy, accent, EmailSection }) {
  const sb = useStudioBrand()
  const T = sb.emailTheme
  const paras = (copy.body || '').split('\n\n')
  return (
    <React.Fragment>
      <EmailSection id="logo" style={{ background: T.paper, padding: '28px 48px 0', textAlign: 'center' }}>
        <Wordmark sb={sb} size={20} color={T.accent} />
      </EmailSection>
      <EmailSection id="body" style={{ background: T.paper, padding: '40px 56px 56px' }}>
        <h1 style={{ fontFamily: T.serif, fontSize: 34, lineHeight: 1.15, fontWeight: 500, color: T.ink, margin: '0 0 28px', letterSpacing: '-0.01em' }}>{copy.subject}</h1>
        {paras.map((p, i) => {
          const sig = p.trim().startsWith('-')
          return <p key={i} style={{ fontFamily: sig ? T.serif : SANS, fontStyle: sig ? 'italic' : 'normal', fontSize: sig ? 19 : 16.5, lineHeight: 1.7, color: sig ? accent : T.inkSoft, margin: '0 0 18px' }}>{p}</p>
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
        <div style={{ background: '#26262b', color: '#fff', padding: '13px 16px', borderRadius: 20, borderBottomLeftRadius: 6, fontFamily: SANS, fontSize: 15.5, lineHeight: 1.45 }}>{copy.message}</div>
        <div style={{ fontFamily: SANS, fontSize: 11, color: '#6c6c72', marginTop: 6, paddingLeft: 4 }}>Delivered</div>
      </div>
    </div>
  )
}

export const Footer = ({ EmailSection }) => {
  const sb = useStudioBrand()
  const T = sb.emailTheme
  return (
    <EmailSection id="footer" style={{ background: T.ink, padding: '44px 40px 38px', textAlign: 'center' }}>
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
