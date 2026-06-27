import React from 'react'
import { Button } from '../ui/primitives.jsx'
import { SiteNav, SiteFooter } from '../ui/SiteChrome.jsx'

// Public marketing homepage. Recreated from Marlow Website.dc.html.
// `go(page, anchor)` navigates the public area; `onSignIn` opens sign-in.

const Eyebrow = ({ children }) => (
  <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--accent-text)', marginBottom: 14 }}>{children}</div>
)

const ArrowR = ({ size = 19 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
)

const SAMPLES = [
  { type: 'Promo', meta: '20% off', headline: 'A little warmth for the long nights', bg: 'linear-gradient(160deg,#3a4a3a,#1f3a2e)' },
  { type: 'Launch', meta: 'New', headline: 'The linen throw, a year in the making', bg: 'linear-gradient(160deg,#cdbfa3,#a98f63)' },
  { type: 'Holiday', meta: 'Gift guide', headline: 'Five quiet gifts for a slow home', bg: 'linear-gradient(160deg,#b5452f,#7e2f20)' },
  { type: 'Newsletter', meta: 'Monthly', headline: 'A note from the studio this month', bg: 'linear-gradient(160deg,#9a8e7d,#6c6256)' },
]
const QUOTES = [
  { quote: 'It genuinely looks like I hired a designer. I sent my first one in ten minutes.', initials: 'AR', name: 'Ava Reyes', brand: 'Northbound Co' },
  { quote: 'I used to skip sending because it took all day. Now I run a campaign every week.', initials: 'JM', name: 'Jonah Mills', brand: 'Field & Fold' },
  { quote: 'The copy actually sounds like my brand. That was the part I was most worried about.', initials: 'SK', name: 'Sana Kapoor', brand: 'Bright Hours' },
]
const PLANS = [
  { name: 'Starter', price: '$29', note: 'For your first campaigns. A handful of emails a month, every core feature.' },
  { name: 'Studio', price: '$59', note: 'For founders sending weekly. More emails, priority generation.' },
  { name: 'Pro', price: '$99', note: 'For your busiest seasons. Unlimited emails and faster turnaround.' },
]
const FAQS = [
  { q: 'Does Marlow send the emails for me?', a: 'Not in beta. Marlow writes and designs the email, then exports clean HTML you paste into your own ESP — Klaviyo, Shopify Email, or Mailchimp.' },
  { q: 'Do I need to connect my Shopify account?', a: 'No login or OAuth. You paste your store URL and Marlow reads your logo, colors, fonts, and a few products. You can also upload assets manually.' },
  { q: 'Will the emails actually look on-brand?', a: 'That is the whole point. Marlow designs with your real brand — your colors, fonts, and products — not a generic template.' },
  { q: 'What kinds of emails can it make?', a: 'Campaigns: promos, launches, holiday sends, and newsletters. Automated flows and SMS are not part of the beta.' },
]

const STEPS = [
  { num: '01', title: 'Connect your brand', body: "Paste your store URL. Marlow pulls your logo, colors, fonts, and products — automatically. One time, then it's saved.",
    icon: <><circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /></> },
  { num: '02', title: 'Describe the email', body: 'One line about the campaign and a type — promo, launch, holiday, or newsletter. Pick a product to feature if you like.',
    icon: <><path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z" /><path d="M20 3v4" /><path d="M22 5h-4" /></> },
  { num: '03', title: 'Review & export', body: 'Tweak any section in place, then copy clean HTML straight into your ESP. Subject, preview text, and design — all done.',
    icon: <><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></> },
]
const OLD_WAY = [
  'Prompt ChatGPT for copy, paste it around',
  'Rebuild the layout in Canva from a template',
  'Wrestle it into your ESP, hope it renders',
  'It looks a little amateur — and you can tell',
]
const NEW_WAY = [
  'Describe the campaign in one sentence',
  'Copy and design arrive together, on-brand',
  'Tweak a line, swap a product, regenerate a section',
  'Export clean HTML — it looks like you hired someone',
]

const heading2 = { fontFamily: 'var(--font-display)', fontSize: 'clamp(30px, 6vw, 42px)', fontWeight: 500, lineHeight: 1.08, letterSpacing: '-0.02em', color: 'var(--text-strong)', margin: 0, textWrap: 'balance' }

function SampleCard({ s }) {
  const [hover, setHover] = React.useState(false)
  return (
    <div onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{ border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-lg)', overflow: 'hidden', background: 'var(--surface-card)', boxShadow: hover ? 'var(--shadow-lg)' : 'var(--shadow-sm)', transition: 'box-shadow 200ms, transform 200ms', transform: hover ? 'translateY(-3px)' : 'none' }}>
      <div style={{ aspectRatio: '3 / 4', background: s.bg, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: 16 }}>
        <div style={{ background: 'rgba(251,248,242,0.92)', borderRadius: 'var(--radius-sm)', padding: '12px 13px' }}>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 13.5, fontWeight: 500, color: '#22201C', lineHeight: 1.2, marginBottom: 4 }}>{s.headline}</div>
          <div style={{ height: 5, width: '80%', background: 'var(--neutral-200)', borderRadius: 3, marginBottom: 4 }} />
          <div style={{ height: 5, width: '60%', background: 'var(--neutral-200)', borderRadius: 3 }} />
        </div>
      </div>
      <div style={{ padding: '13px 15px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontSize: 13.5, fontWeight: 600, color: 'var(--text-strong)' }}>{s.type}</span>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10.5, color: 'var(--text-subtle)' }}>{s.meta}</span>
      </div>
    </div>
  )
}

export default function Home({ go, onSignIn }) {
  return (
    <div style={{ minHeight: '100%', background: 'var(--surface-page)', overflowX: 'hidden' }}>
      <SiteNav active="home" go={go} onSignIn={onSignIn} />

      {/* ---- Hero ---- */}
      <section style={{ maxWidth: 1140, margin: '0 auto', padding: '84px 24px 72px' }}>
        <div className="home-hero-grid" style={{ display: 'grid', gridTemplateColumns: '1.05fr 1fr', gap: 56, alignItems: 'center' }}>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, height: 30, padding: '0 12px 0 10px', borderRadius: 'var(--radius-pill)', border: '1px solid var(--border-default)', background: 'var(--surface-card)', marginBottom: 24 }}>
              <span style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--ember-500)', boxShadow: '0 0 0 3px var(--ember-50)' }} />
              <span style={{ fontSize: 12.5, fontWeight: 600, color: 'var(--text-muted)' }}>Now in private beta</span>
            </div>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(40px, 8.5vw, 60px)', fontWeight: 500, lineHeight: 1.04, letterSpacing: '-0.025em', color: 'var(--text-strong)', margin: '0 0 22px', textWrap: 'balance' }}>Marketing emails that look like a pro made them.</h1>
            <p style={{ fontSize: 19, lineHeight: 1.55, color: 'var(--text-muted)', margin: '0 0 32px', maxWidth: 480 }}>Paste your store, describe the campaign, and Marlow writes and designs a finished, on-brand email in minutes. No agency. No template wrestling.</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap' }}>
              <Button size="lg" onClick={onSignIn} iconRight={<ArrowR />} style={{ height: 52, fontSize: 16.5 }}>Join the beta</Button>
              <Button variant="secondary" size="lg" onClick={onSignIn} style={{ height: 52, fontSize: 16.5 }}>See it in action</Button>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 9, marginTop: 26, color: 'var(--text-subtle)' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></svg>
              <span style={{ fontSize: 13.5 }}>Built for Shopify · exports to Klaviyo, Mailchimp &amp; Shopify Email</span>
            </div>
          </div>

          {/* product preview frame */}
          <div>
            <div style={{ borderRadius: 'var(--radius-xl)', background: 'var(--surface-card)', border: '1px solid var(--border-subtle)', boxShadow: 'var(--shadow-xl)', overflow: 'hidden' }}>
              <div style={{ height: 42, display: 'flex', alignItems: 'center', gap: 8, padding: '0 16px', borderBottom: '1px solid var(--border-subtle)', background: 'var(--neutral-100)' }}>
                <span style={{ width: 11, height: 11, borderRadius: '50%', background: 'var(--neutral-300)' }} />
                <span style={{ width: 11, height: 11, borderRadius: '50%', background: 'var(--neutral-300)' }} />
                <span style={{ width: 11, height: 11, borderRadius: '50%', background: 'var(--neutral-300)' }} />
                <span style={{ marginLeft: 12, flex: 1, maxWidth: 220, height: 22, borderRadius: 'var(--radius-pill)', background: 'var(--surface-card)', border: '1px solid var(--border-subtle)', display: 'flex', alignItems: 'center', padding: '0 12px', fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-subtle)' }}>marlow.studio</span>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, height: 26, padding: '0 12px', borderRadius: 'var(--radius-sm)', background: 'var(--ember-500)', color: '#fff', fontSize: 11.5, fontWeight: 600 }}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></svg>
                  Export
                </span>
              </div>
              <div style={{ padding: 22, background: 'var(--neutral-100)' }}>
                <div style={{ background: 'var(--surface-card)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)', padding: '11px 14px', marginBottom: 16 }}>
                  <div style={{ display: 'flex', gap: 12, alignItems: 'baseline', padding: '3px 0' }}>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9.5, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--text-subtle)', width: 64, flex: 'none' }}>Subject</span>
                    <span style={{ fontSize: 13.5, fontWeight: 600, color: 'var(--text-strong)' }}>A little warmth for the long nights</span>
                  </div>
                  <div style={{ display: 'flex', gap: 12, alignItems: 'baseline', padding: '3px 0' }}>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9.5, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--text-subtle)', width: 64, flex: 'none' }}>Preview</span>
                    <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>The winter candles are back — 20% off through Sunday.</span>
                  </div>
                </div>
                <div style={{ background: '#F4EFE4', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)', overflow: 'hidden', boxShadow: 'var(--shadow-sm)' }}>
                  <div style={{ textAlign: 'center', padding: '16px 0 13px', borderBottom: '1px solid rgba(31,58,46,0.14)' }}>
                    <span style={{ fontFamily: 'var(--font-display)', fontSize: 14, fontWeight: 500, letterSpacing: '0.08em', color: '#1F3A2E' }}>NORTHBOUND CO</span>
                  </div>
                  <div style={{ padding: '24px 28px 26px', textAlign: 'center' }}>
                    <div style={{ fontSize: 9.5, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#C19A53', marginBottom: 10 }}>The candles are back</div>
                    <div style={{ fontFamily: 'var(--font-display)', fontSize: 25, fontWeight: 500, lineHeight: 1.1, letterSpacing: '-0.01em', color: '#22201C', marginBottom: 12 }}>A little warmth for the long nights.</div>
                    <div style={{ aspectRatio: '3 / 2', borderRadius: 8, background: 'linear-gradient(150deg,#3a4a3a,#1f3a2e)', margin: '0 0 16px' }} />
                    <div style={{ fontFamily: 'var(--font-display)', fontSize: 16, fontWeight: 500, color: '#22201C', marginBottom: 3 }}>Cedar + Moss candle</div>
                    <div style={{ fontSize: 12, color: '#22201Caa', marginBottom: 14 }}>$28 · burns 50+ hours</div>
                    <span style={{ display: 'inline-block', background: '#1F3A2E', color: '#F4EFE4', fontSize: 12.5, fontWeight: 600, padding: '10px 22px', borderRadius: 6 }}>Shop the candle</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---- Trust strip ---- */}
      <section style={{ borderTop: '1px solid var(--border-subtle)', borderBottom: '1px solid var(--border-subtle)', background: 'var(--surface-card)' }}>
        <div style={{ maxWidth: 1140, margin: '0 auto', padding: '26px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24, flexWrap: 'wrap' }}>
          <span style={{ fontSize: 13.5, color: 'var(--text-subtle)', maxWidth: 280 }}>Made for one-person stores doing $10k–$80k a month.</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: 34, flexWrap: 'wrap', opacity: 0.72 }}>
            {['Shopify', 'Klaviyo', 'Mailchimp', 'Shopify Email'].map((n) => (
              <span key={n} style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 500, color: 'var(--text-muted)' }}>{n}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ---- How it works ---- */}
      <section id="how" style={{ maxWidth: 1140, margin: '0 auto', padding: '96px 24px', scrollMarginTop: 70 }}>
        <div style={{ textAlign: 'center', maxWidth: 620, margin: '0 auto 60px' }}>
          <Eyebrow>How it works</Eyebrow>
          <h2 style={{ ...heading2, marginBottom: 16 }}>From store URL to send-ready email in three steps.</h2>
          <p style={{ fontSize: 17, lineHeight: 1.55, color: 'var(--text-muted)', margin: 0 }}>Connect once. After that, every campaign starts from a single prompt.</p>
        </div>
        <div className="home-3col" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 24 }}>
          {STEPS.map((s) => (
            <div key={s.num} style={{ background: 'var(--surface-card)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-lg)', padding: '30px 28px', boxShadow: 'var(--shadow-sm)' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 22 }}>
                <span style={{ width: 46, height: 46, borderRadius: 'var(--radius-md)', background: 'var(--ember-50)', color: 'var(--ember-600)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">{s.icon}</svg>
                </span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--text-subtle)' }}>{s.num}</span>
              </div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 21, fontWeight: 500, color: 'var(--text-strong)', margin: '0 0 9px' }}>{s.title}</h3>
              <p style={{ fontSize: 14.5, lineHeight: 1.55, color: 'var(--text-muted)', margin: 0 }}>{s.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ---- Before / after ---- */}
      <section style={{ background: 'var(--surface-card)', borderTop: '1px solid var(--border-subtle)', borderBottom: '1px solid var(--border-subtle)' }}>
        <div style={{ maxWidth: 1140, margin: '0 auto', padding: '96px 24px' }}>
          <div style={{ maxWidth: 620, margin: '0 auto 56px', textAlign: 'center' }}>
            <Eyebrow>The difference</Eyebrow>
            <h2 style={{ ...heading2, marginBottom: 16 }}>Stop duct-taping ChatGPT and Canva.</h2>
            <p style={{ fontSize: 17, lineHeight: 1.55, color: 'var(--text-muted)', margin: 0 }}>The DIY combo is free, but it's an hour of fiddling and it still looks off. Marlow gets you to "I'd send this" in one pass.</p>
          </div>
          <div className="home-2col" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, alignItems: 'stretch' }}>
            {/* old way */}
            <div style={{ border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-lg)', padding: 30, background: 'var(--surface-page)' }}>
              <div style={{ marginBottom: 20 }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--text-subtle)' }}>The old way</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                {OLD_WAY.map((t) => (
                  <div key={t} style={{ display: 'flex', alignItems: 'flex-start', gap: 11 }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--text-subtle)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" style={{ flex: 'none', marginTop: 1 }}><circle cx="12" cy="12" r="10" /><line x1="15" y1="9" x2="9" y2="15" /><line x1="9" y1="9" x2="15" y2="15" /></svg>
                    <span style={{ fontSize: 15, lineHeight: 1.5, color: 'var(--text-muted)' }}>{t}</span>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: 24, paddingTop: 18, borderTop: '1px solid var(--border-subtle)', display: 'flex', alignItems: 'center', gap: 8, fontSize: 13.5, color: 'var(--text-subtle)' }}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></svg>
                ~60 minutes, two tools, three tabs
              </div>
            </div>
            {/* marlow */}
            <div style={{ border: '1.5px solid var(--ember-200)', borderRadius: 'var(--radius-lg)', padding: 30, background: 'var(--ember-50)', position: 'relative' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 9, marginBottom: 20 }}>
                <img src="/logo-mark.svg" width="18" height="18" alt="" />
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--ember-700)' }}>With Marlow</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                {NEW_WAY.map((t) => (
                  <div key={t} style={{ display: 'flex', alignItems: 'flex-start', gap: 11 }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--ember-600)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flex: 'none', marginTop: 1 }}><polyline points="20 6 9 17 4 12" /></svg>
                    <span style={{ fontSize: 15, lineHeight: 1.5, color: 'var(--text-body)' }}>{t}</span>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: 24, paddingTop: 18, borderTop: '1px solid var(--ember-200)', display: 'flex', alignItems: 'center', gap: 8, fontSize: 13.5, fontWeight: 600, color: 'var(--ember-700)' }}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></svg>
                Under 5 minutes, one screen
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---- Sample emails ---- */}
      <section id="samples" style={{ maxWidth: 1140, margin: '0 auto', padding: '96px 24px', scrollMarginTop: 70 }}>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 24, marginBottom: 48, flexWrap: 'wrap' }}>
          <div style={{ maxWidth: 560 }}>
            <Eyebrow>Examples</Eyebrow>
            <h2 style={heading2}>Emails you'd actually send.</h2>
          </div>
          <button type="button" onClick={onSignIn} style={{ display: 'inline-flex', alignItems: 'center', gap: 7, border: 'none', background: 'transparent', cursor: 'pointer', fontFamily: 'var(--font-sans)', fontSize: 15, fontWeight: 600, color: 'var(--accent-text)' }}>
            Try the generator <ArrowR size={17} />
          </button>
        </div>
        <div className="home-4col" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 20 }}>
          {SAMPLES.map((s) => <SampleCard key={s.type} s={s} />)}
        </div>
      </section>

      {/* ---- Testimonials ---- */}
      <section style={{ background: 'var(--surface-card)', borderTop: '1px solid var(--border-subtle)', borderBottom: '1px solid var(--border-subtle)' }}>
        <div style={{ maxWidth: 1140, margin: '0 auto', padding: '96px 24px' }}>
          <div style={{ maxWidth: 620, margin: '0 auto 56px', textAlign: 'center' }}>
            <Eyebrow>From the beta</Eyebrow>
            <h2 style={heading2}>Founders who stopped under-sending.</h2>
          </div>
          <div className="home-3col" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 24 }}>
            {QUOTES.map((q) => (
              <div key={q.name} style={{ border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-lg)', padding: 28, background: 'var(--surface-page)', display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', gap: 3, marginBottom: 16 }}>
                  {[0, 1, 2, 3, 4].map((i) => (
                    <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="var(--ember-500)" stroke="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
                  ))}
                </div>
                <p style={{ fontFamily: 'var(--font-display)', fontSize: 18, lineHeight: 1.5, color: 'var(--text-strong)', margin: '0 0 22px', flex: 1 }}>{q.quote}</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 11 }}>
                  <span style={{ width: 38, height: 38, borderRadius: '50%', background: 'var(--neutral-200)', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 600, fontSize: 14 }}>{q.initials}</span>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-strong)' }}>{q.name}</div>
                    <div style={{ fontSize: 12.5, color: 'var(--text-subtle)' }}>{q.brand}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---- Pricing teaser ---- */}
      <section style={{ maxWidth: 1140, margin: '0 auto', padding: '96px 24px' }}>
        <div style={{ maxWidth: 620, margin: '0 auto 56px', textAlign: 'center' }}>
          <Eyebrow>Pricing</Eyebrow>
          <h2 style={{ ...heading2, marginBottom: 16 }}>One job, done well — from $29 a month.</h2>
          <p style={{ fontSize: 17, lineHeight: 1.55, color: 'var(--text-muted)', margin: 0 }}>Above a $10 gig, far below a $2,500 agency. Pick a plan and start sending.</p>
        </div>
        <div className="home-3col" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 20, alignItems: 'stretch' }}>
          {PLANS.map((p) => (
            <div key={p.name} style={{ border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-lg)', padding: 28, background: 'var(--surface-card)', boxShadow: 'var(--shadow-sm)', display: 'flex', flexDirection: 'column' }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-strong)', marginBottom: 6 }}>{p.name}</div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginBottom: 8 }}>
                <span style={{ fontFamily: 'var(--font-display)', fontSize: 38, fontWeight: 500, color: 'var(--text-strong)' }}>{p.price}</span>
                <span style={{ fontSize: 14, color: 'var(--text-subtle)' }}>/mo</span>
              </div>
              <p style={{ fontSize: 13.5, lineHeight: 1.5, color: 'var(--text-muted)', margin: '0 0 18px' }}>{p.note}</p>
              <Button variant="secondary" onClick={() => go('pricing')} style={{ marginTop: 'auto' }}>Choose {p.name}</Button>
            </div>
          ))}
        </div>
        <div style={{ textAlign: 'center', marginTop: 32 }}>
          <button type="button" onClick={() => go('pricing')} style={{ display: 'inline-flex', alignItems: 'center', gap: 7, border: 'none', background: 'transparent', cursor: 'pointer', fontFamily: 'var(--font-sans)', fontSize: 15, fontWeight: 600, color: 'var(--accent-text)' }}>
            See full pricing &amp; what's included <ArrowR size={17} />
          </button>
        </div>
      </section>

      {/* ---- FAQ teaser ---- */}
      <section style={{ background: 'var(--surface-card)', borderTop: '1px solid var(--border-subtle)' }}>
        <div style={{ maxWidth: 880, margin: '0 auto', padding: '96px 24px' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <Eyebrow>FAQ</Eyebrow>
            <h2 style={heading2}>Questions, answered.</h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {FAQS.map((f) => (
              <div key={f.q} style={{ borderBottom: '1px solid var(--border-subtle)', padding: '24px 0' }}>
                <div style={{ fontSize: 17, fontWeight: 600, color: 'var(--text-strong)', marginBottom: 8 }}>{f.q}</div>
                <div style={{ fontSize: 15, lineHeight: 1.6, color: 'var(--text-muted)' }}>{f.a}</div>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: 36 }}>
            <button type="button" onClick={() => go('faq')} style={{ display: 'inline-flex', alignItems: 'center', gap: 7, border: 'none', background: 'transparent', cursor: 'pointer', fontFamily: 'var(--font-sans)', fontSize: 15, fontWeight: 600, color: 'var(--accent-text)' }}>
              See all questions <ArrowR size={17} />
            </button>
          </div>
        </div>
      </section>

      {/* ---- Final CTA ---- */}
      <section style={{ maxWidth: 1140, margin: '0 auto', padding: '84px 24px' }}>
        <div style={{ background: 'var(--surface-inverse)', borderRadius: 'var(--radius-2xl)', padding: '72px 48px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
          <img src="/logo-mark.svg" width="44" height="44" alt="" style={{ marginBottom: 24 }} />
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(32px, 7vw, 46px)', fontWeight: 500, lineHeight: 1.06, letterSpacing: '-0.02em', color: 'var(--neutral-50)', margin: '0 auto 18px', maxWidth: 560, textWrap: 'balance' }}>Your next campaign is one prompt away.</h2>
          <p style={{ fontSize: 18, lineHeight: 1.55, color: 'var(--neutral-400)', margin: '0 auto 34px', maxWidth: 440 }}>Join the beta and send your first on-brand email today.</p>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 14, flexWrap: 'wrap' }}>
            <Button size="lg" onClick={onSignIn} iconRight={<ArrowR />} style={{ height: 52, fontSize: 16.5 }}>Join the beta</Button>
            <button type="button" onClick={onSignIn} style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', height: 52, padding: '0 26px', borderRadius: 'var(--radius-md)', background: 'transparent', border: '1px solid var(--neutral-700)', color: 'var(--neutral-50)', fontWeight: 600, fontSize: 16.5, fontFamily: 'var(--font-sans)', cursor: 'pointer' }}>See it in action</button>
          </div>
        </div>
      </section>

      <SiteFooter go={go} onSignIn={onSignIn} />
    </div>
  )
}
