import React from 'react'
import { Button } from '../ui/primitives.jsx'
import { SiteNav, SiteFooterSlim } from '../ui/SiteChrome.jsx'

// Public help/FAQ page. Recreated from the "SaaS product website best practices"
// handoff design (FAQ.dc.html) in React. Reachable before sign-in.

const GROUPS = [
  {
    num: '01',
    title: 'Getting started',
    items: [
      { q: 'Do I need to connect my Shopify account?', a: 'No login or OAuth required. You paste your store URL and Marlow reads your logo, colors, fonts, and a few products from your public site. You can also upload brand assets manually if you prefer.' },
      { q: 'How long does setup take?', a: 'About a minute. You connect your brand once, confirm what Marlow pulled, and from then on you land straight on the generator.' },
      { q: 'Which stores does Marlow work with?', a: 'It is built for Shopify stores in the $10k–$80k a month range, run by a single founder. Other platforms may work but are not the focus during beta.' },
    ],
  },
  {
    num: '02',
    title: 'Brand & content',
    items: [
      { q: 'Will the emails actually look on-brand?', a: 'That is the entire point. Marlow designs with your real brand — your colors, fonts, and products — not a generic template, so the result looks like you, not like AI.' },
      { q: 'What kinds of emails can it make?', a: 'Campaign emails: promos, launches, holiday sends, and newsletters. You give a short prompt and pick a type, and Marlow writes the subject, preview text, and designed body together.' },
      { q: 'Can I control the tone of voice?', a: 'Yes. Describe the tone in your prompt — warm, playful, minimal — and Marlow writes to match. You can regenerate any section until it sounds right.' },
      { q: 'Does it write the copy too?', a: 'Copy and design arrive together. Marlow drafts the headline, body, and call to action, then lets you edit any line in place.' },
    ],
  },
  {
    num: '03',
    title: 'Editing & exporting',
    items: [
      { q: 'How much can I edit?', a: 'Light-touch by design: click any text to edit it, swap a featured product, or regenerate a single section. It keeps you fast instead of dropping you into a full email builder.' },
      { q: 'How do I get the email into my ESP?', a: 'Export gives you clean, tested HTML. Copy it to your clipboard or download the file, then paste it into Klaviyo, Shopify Email, or Mailchimp and send.' },
      { q: 'Does Marlow send the emails for me?', a: 'Not in beta. Marlow makes the email; your ESP handles sending, lists, and analytics. That keeps deliverability and your subscriber data where they already live.' },
    ],
  },
  {
    num: '04',
    title: 'Pricing & beta',
    items: [
      { q: 'What does it cost?', a: 'Plans run $29 to $99 a month flat. Above a $10 gig so you know it is real, far below a $2,500 agency retainer. See the pricing page for what each plan includes.' },
      { q: 'What is included in the beta?', a: 'The full core flow: connect your brand, generate campaign emails, edit, and export. Automated flows, SMS, and ESP integrations are not part of the beta.' },
      { q: 'Will beta pricing change?', a: 'Early founders keep their beta pricing as Marlow grows. You can cancel anytime — there is no contract.' },
    ],
  },
]

function Chevron({ open }) {
  return (
    <svg
      width="20" height="20" viewBox="0 0 24 24" fill="none"
      stroke="var(--text-subtle)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      style={{ flex: 'none', transition: 'transform 200ms cubic-bezier(0.22,1,0.36,1)', transform: open ? 'rotate(180deg)' : 'none' }}
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  )
}

function FaqItem({ q, a }) {
  const [open, setOpen] = React.useState(false)
  return (
    <div style={{ borderBottom: '1px solid var(--border-subtle)' }}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16,
          width: '100%', padding: '20px 4px', border: 'none', background: 'transparent',
          cursor: 'pointer', textAlign: 'left', fontFamily: 'var(--font-sans)',
        }}
      >
        <span style={{ fontSize: 16.5, fontWeight: 600, color: open ? 'var(--text-strong)' : 'var(--text-body)', transition: 'color 140ms' }}>{q}</span>
        <Chevron open={open} />
      </button>
      {open && (
        <div style={{ padding: '0 4px 22px', maxWidth: 680 }}>
          <p style={{ fontSize: 15, lineHeight: 1.62, color: 'var(--text-muted)', margin: 0 }}>{a}</p>
        </div>
      )}
    </div>
  )
}

export default function FAQ({ go, onSignIn }) {
  return (
    <div style={{ minHeight: '100%', background: 'var(--surface-page)', overflowX: 'hidden' }}>
      <SiteNav active="faq" go={go} onSignIn={onSignIn} />

      {/* ---- Header ---- */}
      <section style={{ maxWidth: 1140, margin: '0 auto', padding: '84px 24px 40px', textAlign: 'center' }}>
        <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--accent-text)', marginBottom: 16 }}>Help &amp; FAQ</div>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(36px, 8vw, 54px)', fontWeight: 500, lineHeight: 1.04, letterSpacing: '-0.025em', color: 'var(--text-strong)', margin: '0 auto 20px', maxWidth: 640, textWrap: 'balance' }}>Questions, answered.</h1>
        <p style={{ fontSize: 18, lineHeight: 1.55, color: 'var(--text-muted)', margin: '0 auto', maxWidth: 500 }}>Everything about connecting your brand, generating emails, and exporting to your ESP.</p>
      </section>

      {/* ---- FAQ groups ---- */}
      <section style={{ maxWidth: 820, margin: '0 auto', padding: '24px 24px 40px' }}>
        {GROUPS.map((g) => (
          <div key={g.num} style={{ marginBottom: 48 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8, paddingBottom: 14, borderBottom: '1px solid var(--border-default)' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-subtle)' }}>{g.num}</span>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 24, fontWeight: 500, letterSpacing: '-0.01em', color: 'var(--text-strong)', margin: 0 }}>{g.title}</h2>
            </div>
            {g.items.map((f) => <FaqItem key={f.q} q={f.q} a={f.a} />)}
          </div>
        ))}
      </section>

      {/* ---- Still stuck ---- */}
      <section style={{ maxWidth: 820, margin: '0 auto', padding: '0 24px 84px' }}>
        <div style={{ border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-xl)', background: 'var(--surface-card)', boxShadow: 'var(--shadow-sm)', padding: 40, textAlign: 'center' }}>
          <img src="/logo-mark.svg" width="36" height="36" alt="" style={{ marginBottom: 18 }} />
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 26, fontWeight: 500, letterSpacing: '-0.01em', color: 'var(--text-strong)', margin: '0 0 10px' }}>Still have a question?</h2>
          <p style={{ fontSize: 15.5, lineHeight: 1.55, color: 'var(--text-muted)', margin: '0 auto 26px', maxWidth: 380 }}>The fastest way to understand Marlow is to try it. Generate an email in the demo — no account needed.</p>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, flexWrap: 'wrap' }}>
            <Button size="lg" onClick={onSignIn}>Try the demo</Button>
            <Button variant="secondary" size="lg" onClick={() => { window.location.href = 'mailto:support@marlow.app' }}>Email support</Button>
          </div>
        </div>
      </section>

      <SiteFooterSlim go={go} />
    </div>
  )
}
