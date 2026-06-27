import React from 'react'
import { Button } from '../ui/primitives.jsx'
import { SiteNav, SiteFooterSlim } from '../ui/SiteChrome.jsx'

// Public About page. Written in the Marlow voice, in the same site style.

const ArrowR = ({ size = 19 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
)

const BELIEFS = [
  { h: 'On-brand, not on-template', p: 'Marlow designs with your real colors, fonts, and products — so an email looks like your store, not like software.' },
  { h: 'Fast beats fancy', p: 'A finished email in five minutes you’ll actually send beats a perfect one you never get to. Light-touch editing keeps you moving.' },
  { h: 'You stay in control', p: 'Marlow drafts; you decide. Your data stays private, and your sending stays in the platform you already trust.' },
]

const STATS = [
  { n: '< 5 min', l: 'From prompt to send-ready email' },
  { n: '$29–$99', l: 'A month — far below an agency' },
  { n: '1', l: 'Founder it’s built for: you' },
]

export default function About({ go, onSignIn }) {
  return (
    <div style={{ minHeight: '100%', background: 'var(--surface-page)', overflowX: 'hidden' }}>
      <SiteNav active={null} go={go} onSignIn={onSignIn} />

      {/* ---- Header ---- */}
      <section style={{ maxWidth: 760, margin: '0 auto', padding: '84px 24px 24px', textAlign: 'center' }}>
        <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--accent-text)', marginBottom: 16 }}>About Marlow</div>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(34px, 7.5vw, 52px)', fontWeight: 500, lineHeight: 1.06, letterSpacing: '-0.025em', color: 'var(--text-strong)', margin: '0 auto 20px', maxWidth: 620, textWrap: 'balance' }}>Email help for the founder who does everything.</h1>
        <p style={{ fontSize: 18, lineHeight: 1.55, color: 'var(--text-muted)', margin: '0 auto', maxWidth: 540 }}>Marlow exists so a one-person store can send marketing emails that look professionally made — without an agency, a designer, or an afternoon lost to Canva.</p>
      </section>

      {/* ---- Story ---- */}
      <section style={{ maxWidth: 720, margin: '0 auto', padding: '40px 24px 16px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          {[
            'If you run a small Shopify store on your own, you already know the squeeze. Email is one of the best ways to bring people back — but doing it well means wrestling copy out of ChatGPT, rebuilding a layout in Canva, and praying it renders in your sending platform. So the email gets skipped, and the revenue with it.',
            'Marlow collapses that hour into one screen. Paste your store, describe the campaign in a sentence, and the copy and design arrive together, already in your brand. Tweak a line, swap a product, regenerate a section, then export clean HTML straight into Klaviyo, Shopify Email, or Mailchimp.',
            'We’re early — Marlow is in private beta, focused on doing one job genuinely well for solo founders doing $10k–$80k a month. That focus is the point: not a do-everything marketing suite, just on-brand campaign emails, fast.',
          ].map((para, i) => (
            <p key={i} style={{ fontSize: 16.5, lineHeight: 1.7, color: 'var(--text-body)', margin: 0 }}>{para}</p>
          ))}
        </div>
      </section>

      {/* ---- Stats ---- */}
      <section style={{ maxWidth: 1080, margin: '0 auto', padding: '48px 24px' }}>
        <div className="home-3col" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 20 }}>
          {STATS.map((s) => (
            <div key={s.l} style={{ border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-lg)', background: 'var(--surface-card)', boxShadow: 'var(--shadow-sm)', padding: '28px 26px', textAlign: 'center' }}>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 38, fontWeight: 500, letterSpacing: '-0.02em', color: 'var(--text-strong)', marginBottom: 6 }}>{s.n}</div>
              <div style={{ fontSize: 14, lineHeight: 1.5, color: 'var(--text-muted)' }}>{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ---- Beliefs ---- */}
      <section style={{ background: 'var(--surface-card)', borderTop: '1px solid var(--border-subtle)', borderBottom: '1px solid var(--border-subtle)' }}>
        <div style={{ maxWidth: 1080, margin: '0 auto', padding: '80px 24px' }}>
          <div style={{ textAlign: 'center', maxWidth: 560, margin: '0 auto 48px' }}>
            <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--accent-text)', marginBottom: 14 }}>What we believe</div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 36, fontWeight: 500, lineHeight: 1.1, letterSpacing: '-0.02em', color: 'var(--text-strong)', margin: 0, textWrap: 'balance' }}>A few principles we build by.</h2>
          </div>
          <div className="home-3col" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 24 }}>
            {BELIEFS.map((b, i) => (
              <div key={b.h} style={{ border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-lg)', background: 'var(--surface-page)', padding: '28px 26px' }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 36, height: 36, borderRadius: 'var(--radius-md)', background: 'var(--ember-50)', color: 'var(--ember-600)', fontFamily: 'var(--font-mono)', fontSize: 13, fontWeight: 600, marginBottom: 18 }}>{`0${i + 1}`}</span>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 500, color: 'var(--text-strong)', margin: '0 0 9px' }}>{b.h}</h3>
                <p style={{ fontSize: 14.5, lineHeight: 1.6, color: 'var(--text-muted)', margin: 0 }}>{b.p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---- CTA ---- */}
      <section style={{ maxWidth: 1140, margin: '0 auto', padding: '84px 24px' }}>
        <div style={{ background: 'var(--surface-inverse)', borderRadius: 'var(--radius-2xl)', padding: '64px 48px', textAlign: 'center' }}>
          <img src="/logo-mark.svg" width="44" height="44" alt="" style={{ marginBottom: 22 }} />
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(30px, 6.5vw, 40px)', fontWeight: 500, lineHeight: 1.08, letterSpacing: '-0.02em', color: 'var(--neutral-50)', margin: '0 auto 16px', maxWidth: 520, textWrap: 'balance' }}>Built for solo founders. Try it free.</h2>
          <p style={{ fontSize: 17, lineHeight: 1.55, color: 'var(--neutral-400)', margin: '0 auto 30px', maxWidth: 420 }}>Generate your first on-brand campaign in the demo — no account needed.</p>
          <Button size="lg" onClick={onSignIn} iconRight={<ArrowR />} style={{ height: 52, fontSize: 16.5 }}>Try the demo</Button>
        </div>
      </section>

      <SiteFooterSlim go={go} />
    </div>
  )
}
