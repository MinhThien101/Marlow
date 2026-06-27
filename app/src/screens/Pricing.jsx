import React from 'react'
import { Button } from '../ui/primitives.jsx'
import { SiteNav, SiteFooterSlim } from '../ui/SiteChrome.jsx'

// Public pricing page. Recreated from Pricing.dc.html.

const ArrowR = ({ size = 17 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
)

const PLANS = [
  {
    name: 'Starter', tagline: 'For your first campaigns', price: '$29', billednote: 'Billed monthly',
    popular: false, border: '1px solid var(--border-subtle)', shadow: 'var(--shadow-sm)',
    cta: 'Start with Starter', ctaVariant: 'secondary', includesLabel: 'Includes',
    features: ['8 campaign emails a month', 'Connect one brand', 'All four campaign types', 'Inline editing & section regenerate', 'Export to any ESP'],
  },
  {
    name: 'Studio', tagline: 'For founders sending weekly', price: '$59', billednote: 'Billed monthly',
    popular: true, border: '1.5px solid var(--ember-300)', shadow: 'var(--shadow-lg)',
    cta: 'Choose Studio', ctaVariant: 'primary', includesLabel: 'Everything in Starter, plus',
    features: ['30 campaign emails a month', 'Priority generation', 'Saved brand voice notes', 'Reuse & duplicate past emails', 'Early access to new features'],
  },
  {
    name: 'Pro', tagline: 'For your busiest seasons', price: '$99', billednote: 'Billed monthly',
    popular: false, border: '1px solid var(--border-subtle)', shadow: 'var(--shadow-sm)',
    cta: 'Choose Pro', ctaVariant: 'secondary', includesLabel: 'Everything in Studio, plus',
    features: ['Unlimited campaign emails', 'Fastest turnaround', 'Multiple product features per email', 'Priority support', 'Locked-in beta pricing'],
  },
]
const PFAQS = [
  { q: 'Is there a free trial?', a: 'You can generate emails in the demo for free. A plan is needed to export the finished HTML to your ESP.' },
  { q: 'Can I change plans later?', a: 'Yes. Upgrade or downgrade anytime — changes apply on your next billing cycle. No long-term contract.' },
  { q: 'What counts as one email?', a: 'One generated campaign you export. Regenerating sections and editing while you refine a single email does not count extra.' },
  { q: 'Why is it priced monthly?', a: 'Marlow is a subscription so your brand stays connected and ready. During beta, early founders keep this pricing as we grow.' },
]

const COMPARE = [
  { name: 'DIY — ChatGPT + Canva', price: 'Free', meta: '~1 hour per email · looks amateur', body: "Two tools, lots of copy-paste, and you still can't tell if it looks right.", highlight: false },
  { name: 'Marlow', price: '$29–$99', meta: '~5 min per email · looks pro', body: 'One prompt, finished on-brand email, clean HTML you can send today.', highlight: true },
  { name: 'Agency / freelancer', price: '$2,500+', meta: 'Days of turnaround · monthly retainer', body: 'Great work, but slow and far out of reach for a one-person store.', highlight: false },
]

export default function Pricing({ go, onSignIn }) {
  return (
    <div style={{ minHeight: '100%', background: 'var(--surface-page)', overflowX: 'hidden' }}>
      <SiteNav active="pricing" go={go} onSignIn={onSignIn} cta="Try the demo" />

      {/* ---- Header ---- */}
      <section style={{ maxWidth: 1140, margin: '0 auto', padding: '84px 24px 48px', textAlign: 'center' }}>
        <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--accent-text)', marginBottom: 16 }}>Pricing</div>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(36px, 8vw, 54px)', fontWeight: 500, lineHeight: 1.04, letterSpacing: '-0.025em', color: 'var(--text-strong)', margin: '0 auto 20px', maxWidth: 680, textWrap: 'balance' }}>Simple pricing. One job, done well.</h1>
        <p style={{ fontSize: 18, lineHeight: 1.55, color: 'var(--text-muted)', margin: '0 auto', maxWidth: 520 }}>Above a $10 gig, far below a $2,500 agency. One flat plan, cancel anytime. No per-email surprises.</p>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginTop: 24, height: 32, padding: '0 14px', borderRadius: 'var(--radius-pill)', background: 'var(--ember-50)', border: '1px solid var(--ember-100)' }}>
          <span style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--ember-500)' }} />
          <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--ember-700)' }}>Beta pricing — locked in for early founders</span>
        </div>
      </section>

      {/* ---- Tiers ---- */}
      <section style={{ maxWidth: 1080, margin: '0 auto', padding: '16px 24px 40px' }}>
        <div className="pricing-3col" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 22, alignItems: 'stretch' }}>
          {PLANS.map((p) => (
            <div key={p.name} style={{ position: 'relative', border: p.border, borderRadius: 'var(--radius-xl)', padding: '34px 30px', background: 'var(--surface-card)', boxShadow: p.shadow, display: 'flex', flexDirection: 'column' }}>
              {p.popular && (
                <span style={{ position: 'absolute', top: -13, left: '50%', transform: 'translateX(-50%)', display: 'inline-flex', alignItems: 'center', height: 26, padding: '0 14px', borderRadius: 'var(--radius-pill)', background: 'var(--ember-500)', color: '#fff', fontSize: 12, fontWeight: 600, letterSpacing: '0.02em', boxShadow: 'var(--shadow-ember)' }}>Most popular</span>
              )}
              <div style={{ fontSize: 15, fontWeight: 600, color: 'var(--text-strong)', marginBottom: 4 }}>{p.name}</div>
              <div style={{ fontSize: 13.5, color: 'var(--text-subtle)', marginBottom: 18 }}>{p.tagline}</div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 5, marginBottom: 6 }}>
                <span style={{ fontFamily: 'var(--font-display)', fontSize: 46, fontWeight: 500, letterSpacing: '-0.02em', color: 'var(--text-strong)' }}>{p.price}</span>
                <span style={{ fontSize: 15, color: 'var(--text-subtle)' }}>/mo</span>
              </div>
              <div style={{ fontSize: 13, color: 'var(--text-subtle)', marginBottom: 24 }}>{p.billednote}</div>
              <Button variant={p.ctaVariant} fullWidth onClick={onSignIn} style={{ height: 46, marginBottom: 26 }}>{p.cta}</Button>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10.5, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--text-subtle)', marginBottom: 14 }}>{p.includesLabel}</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {p.features.map((f) => (
                  <div key={f} style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="var(--ember-600)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ flex: 'none', marginTop: 1 }}><polyline points="20 6 9 17 4 12" /></svg>
                    <span style={{ fontSize: 14, lineHeight: 1.45, color: 'var(--text-body)' }}>{f}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <p style={{ textAlign: 'center', fontSize: 13.5, color: 'var(--text-subtle)', margin: '28px auto 0', maxWidth: 560 }}>Every plan exports clean HTML to Klaviyo, Shopify Email, and Mailchimp. Sending, list management, and analytics live in your ESP — Marlow makes the email.</p>
      </section>

      {/* ---- Compare strip ---- */}
      <section style={{ background: 'var(--surface-card)', borderTop: '1px solid var(--border-subtle)', borderBottom: '1px solid var(--border-subtle)' }}>
        <div style={{ maxWidth: 1080, margin: '0 auto', padding: '64px 24px' }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 32, fontWeight: 500, letterSpacing: '-0.015em', color: 'var(--text-strong)', margin: '0 0 8px', textAlign: 'center' }}>How it compares</h2>
          <p style={{ fontSize: 15.5, color: 'var(--text-muted)', margin: '0 0 40px', textAlign: 'center' }}>The same campaign email, three ways.</p>
          <div className="pricing-3col" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 22 }}>
            {COMPARE.map((c) => (
              <div key={c.name} style={{ border: c.highlight ? '1.5px solid var(--ember-200)' : '1px solid var(--border-subtle)', borderRadius: 'var(--radius-lg)', padding: 26, background: c.highlight ? 'var(--ember-50)' : 'var(--surface-page)' }}>
                <div style={{ fontSize: 14, fontWeight: 600, color: c.highlight ? 'var(--ember-700)' : 'var(--text-strong)', marginBottom: 6 }}>{c.name}</div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 30, fontWeight: 500, color: 'var(--text-strong)', marginBottom: 4 }}>{c.price}</div>
                <div style={{ fontSize: 13, color: c.highlight ? 'var(--ember-700)' : 'var(--text-subtle)', marginBottom: 18 }}>{c.meta}</div>
                <div style={{ fontSize: 13.5, lineHeight: 1.6, color: c.highlight ? 'var(--text-body)' : 'var(--text-muted)' }}>{c.body}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---- Pricing FAQ ---- */}
      <section style={{ maxWidth: 760, margin: '0 auto', padding: '80px 24px' }}>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 32, fontWeight: 500, letterSpacing: '-0.015em', color: 'var(--text-strong)', margin: '0 0 36px', textAlign: 'center' }}>Pricing questions</h2>
        <div>
          {PFAQS.map((f) => (
            <div key={f.q} style={{ borderBottom: '1px solid var(--border-subtle)', padding: '22px 0' }}>
              <div style={{ fontSize: 16.5, fontWeight: 600, color: 'var(--text-strong)', marginBottom: 7 }}>{f.q}</div>
              <div style={{ fontSize: 14.5, lineHeight: 1.6, color: 'var(--text-muted)' }}>{f.a}</div>
            </div>
          ))}
        </div>
        <div style={{ textAlign: 'center', marginTop: 32 }}>
          <button type="button" onClick={() => go('faq')} style={{ display: 'inline-flex', alignItems: 'center', gap: 7, border: 'none', background: 'transparent', cursor: 'pointer', fontFamily: 'var(--font-sans)', fontSize: 15, fontWeight: 600, color: 'var(--accent-text)' }}>
            See all questions <ArrowR />
          </button>
        </div>
      </section>

      {/* ---- Final CTA ---- */}
      <section style={{ maxWidth: 1140, margin: '0 auto', padding: '24px 24px 84px' }}>
        <div style={{ background: 'var(--surface-inverse)', borderRadius: 'var(--radius-2xl)', padding: '64px 48px', textAlign: 'center' }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 42, fontWeight: 500, lineHeight: 1.06, letterSpacing: '-0.02em', color: 'var(--neutral-50)', margin: '0 auto 16px', maxWidth: 520, textWrap: 'balance' }}>Start with your next campaign.</h2>
          <p style={{ fontSize: 17, lineHeight: 1.55, color: 'var(--neutral-400)', margin: '0 auto 30px', maxWidth: 420 }}>Try the generator free, pick a plan when you're ready to export.</p>
          <Button size="lg" onClick={onSignIn} iconRight={<ArrowR size={19} />} style={{ height: 52, fontSize: 16.5 }}>Try the demo</Button>
        </div>
      </section>

      <SiteFooterSlim go={go} />
    </div>
  )
}
