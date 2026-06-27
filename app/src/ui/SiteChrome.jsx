// Shared marketing-site chrome: top nav + footer. Used by the public Home,
// Pricing, and FAQ pages so they share one consistent header/footer.
// Recreated from the "SaaS product website best practices" handoff designs.
import React from 'react'
import { Button } from './primitives.jsx'

function NavLink({ onClick, active, children }) {
  const [hover, setHover] = React.useState(false)
  return (
    <button
      type="button" onClick={onClick}
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{
        border: 'none', background: 'transparent', cursor: 'pointer', padding: 0,
        fontFamily: 'var(--font-sans)', fontSize: 14.5,
        fontWeight: active ? 600 : 500,
        color: active || hover ? 'var(--text-strong)' : 'var(--text-muted)',
        transition: 'color 140ms',
      }}
    >{children}</button>
  )
}

// active: 'home' | 'pricing' | 'faq' | null
// go(page, anchor?) navigates the public area. onSignIn opens the sign-in screen.
export function SiteNav({ active, go, onSignIn, cta = 'Join the beta' }) {
  const [menu, setMenu] = React.useState(false)
  const close = () => setMenu(false)
  const links = [
    { label: 'How it works', onClick: () => go('home', 'how') },
    { label: 'Examples', onClick: () => go('home', 'samples') },
    { label: 'Pricing', active: active === 'pricing', onClick: () => go('pricing') },
    { label: 'FAQ', active: active === 'faq', onClick: () => go('faq') },
  ]
  return (
    <header style={{ position: 'sticky', top: 0, zIndex: 50, background: 'color-mix(in srgb, var(--surface-page) 86%, transparent)', backdropFilter: 'blur(12px)', borderBottom: '1px solid var(--border-subtle)' }}>
      <nav style={{ maxWidth: 1140, margin: '0 auto', height: 70, padding: '0 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24 }}>
        <button type="button" onClick={() => go('home')} style={{ display: 'flex', alignItems: 'center', gap: 10, border: 'none', background: 'transparent', cursor: 'pointer', padding: 0 }}>
          <img src="/logo-mark.svg" width="30" height="30" alt="Marlow" />
          <span style={{ fontFamily: 'var(--font-display)', fontSize: 23, fontWeight: 500, letterSpacing: '-0.01em', color: 'var(--text-strong)' }}>Marlow</span>
        </button>
        <div style={{ display: 'flex', alignItems: 'center', gap: 30 }} className="site-nav-links">
          {links.map((l) => <NavLink key={l.label} active={l.active} onClick={l.onClick}>{l.label}</NavLink>)}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <span className="site-nav-signin"><NavLink onClick={onSignIn}>Sign in</NavLink></span>
          <Button size="md" onClick={onSignIn}>{cta}</Button>
          <button
            type="button" className="site-nav-burger" aria-label="Menu" aria-expanded={menu}
            onClick={() => setMenu((m) => !m)}
            style={{ display: 'none', alignItems: 'center', justifyContent: 'center', width: 40, height: 40, border: '1px solid var(--border-default)', background: 'var(--surface-card)', borderRadius: 'var(--radius-md)', cursor: 'pointer', flex: 'none' }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--text-strong)" strokeWidth="2" strokeLinecap="round">
              {menu ? <><line x1="6" y1="6" x2="18" y2="18" /><line x1="6" y1="18" x2="18" y2="6" /></> : <><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" /></>}
            </svg>
          </button>
        </div>
      </nav>

      {menu && (
        <div className="site-nav-burger-panel" style={{ borderTop: '1px solid var(--border-subtle)', background: 'var(--surface-page)', padding: '10px 16px 18px' }}>
          {links.map((l) => (
            <button key={l.label} type="button" onClick={() => { close(); l.onClick() }}
              style={{ display: 'block', width: '100%', textAlign: 'left', padding: '13px 8px', border: 'none', borderBottom: '1px solid var(--border-subtle)', background: 'transparent', cursor: 'pointer', fontFamily: 'var(--font-sans)', fontSize: 16, fontWeight: l.active ? 600 : 500, color: l.active ? 'var(--text-strong)' : 'var(--text-body)' }}>
              {l.label}
            </button>
          ))}
          <button type="button" onClick={() => { close(); onSignIn() }}
            style={{ display: 'block', width: '100%', textAlign: 'left', padding: '13px 8px 4px', border: 'none', background: 'transparent', cursor: 'pointer', fontFamily: 'var(--font-sans)', fontSize: 16, fontWeight: 500, color: 'var(--text-body)' }}>
            Sign in
          </button>
        </div>
      )}
    </header>
  )
}

function FootLink({ onClick, children }) {
  const [hover, setHover] = React.useState(false)
  return (
    <button type="button" onClick={onClick} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{ border: 'none', background: 'transparent', cursor: 'pointer', padding: 0, textAlign: 'left', fontFamily: 'var(--font-sans)', fontSize: 14, color: hover ? 'var(--text-strong)' : 'var(--text-muted)', transition: 'color 140ms' }}>
      {children}
    </button>
  )
}

// Full multi-column footer (homepage). For the slim footer use SiteFooterSlim.
export function SiteFooter({ go, onSignIn }) {
  return (
    <footer style={{ borderTop: '1px solid var(--border-subtle)', background: 'var(--surface-page)' }}>
      <div style={{ maxWidth: 1140, margin: '0 auto', padding: '56px 24px 40px' }}>
        <div className="site-footer-grid" style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr 1fr 1fr', gap: 40, marginBottom: 48 }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
              <img src="/logo-mark.svg" width="28" height="28" alt="" />
              <span style={{ fontFamily: 'var(--font-display)', fontSize: 21, fontWeight: 500, color: 'var(--text-strong)' }}>Marlow</span>
            </div>
            <p style={{ fontSize: 14, lineHeight: 1.55, color: 'var(--text-muted)', margin: 0, maxWidth: 260 }}>Your brand's email studio. On-brand marketing emails in minutes — without hiring an agency.</p>
          </div>
          <div>
            <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--text-subtle)', marginBottom: 16 }}>Product</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 11 }}>
              <FootLink onClick={() => go('home', 'how')}>How it works</FootLink>
              <FootLink onClick={() => go('home', 'samples')}>Examples</FootLink>
              <FootLink onClick={() => go('pricing')}>Pricing</FootLink>
              <FootLink onClick={onSignIn}>Open the app</FootLink>
            </div>
          </div>
          <div>
            <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--text-subtle)', marginBottom: 16 }}>Company</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 11 }}>
              <FootLink onClick={() => go('about')}>About</FootLink>
              <FootLink onClick={() => { window.location.href = 'mailto:support@marlow.app' }}>Contact</FootLink>
            </div>
          </div>
          <div>
            <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--text-subtle)', marginBottom: 16 }}>Support</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 11 }}>
              <FootLink onClick={() => go('faq')}>FAQ</FootLink>
              <FootLink onClick={() => go('privacy')}>Privacy</FootLink>
              <FootLink onClick={() => go('terms')}>Terms</FootLink>
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, paddingTop: 24, borderTop: '1px solid var(--border-subtle)', flexWrap: 'wrap' }}>
          <span style={{ fontSize: 13, color: 'var(--text-subtle)' }}>© 2026 Marlow. All rights reserved.</span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11.5, color: 'var(--text-subtle)' }}>Made for solo founders.</span>
        </div>
      </div>
    </footer>
  )
}

// Shared layout for text-heavy legal pages (Privacy, Terms).
// `sections` is [{ h, p?: string[], bullets?: string[] }].
export function LegalLayout({ active, go, onSignIn, title, updated, intro, sections }) {
  return (
    <div style={{ minHeight: '100%', background: 'var(--surface-page)', overflowX: 'hidden' }}>
      <SiteNav active={active} go={go} onSignIn={onSignIn} />

      <section style={{ maxWidth: 760, margin: '0 auto', padding: '72px 24px 16px' }}>
        <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--accent-text)', marginBottom: 16 }}>Legal</div>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(34px, 7vw, 46px)', fontWeight: 500, lineHeight: 1.06, letterSpacing: '-0.025em', color: 'var(--text-strong)', margin: '0 0 14px', textWrap: 'balance' }}>{title}</h1>
        {updated && <p style={{ fontSize: 13.5, color: 'var(--text-subtle)', margin: 0 }}>Last updated {updated}</p>}
      </section>

      <section style={{ maxWidth: 760, margin: '0 auto', padding: '24px 24px 72px' }}>
        {intro && <p style={{ fontSize: 16.5, lineHeight: 1.65, color: 'var(--text-muted)', margin: '0 0 32px' }}>{intro}</p>}
        {sections.map((s, i) => (
          <div key={i} style={{ marginBottom: 36 }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 23, fontWeight: 500, letterSpacing: '-0.01em', color: 'var(--text-strong)', margin: '0 0 12px' }}>{s.h}</h2>
            {(s.p || []).map((para, j) => (
              <p key={j} style={{ fontSize: 15.5, lineHeight: 1.65, color: 'var(--text-muted)', margin: '0 0 12px' }}>{para}</p>
            ))}
            {s.bullets && (
              <ul style={{ margin: '4px 0 0', padding: '0 0 0 4px', listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
                {s.bullets.map((b, j) => (
                  <li key={j} style={{ display: 'flex', alignItems: 'flex-start', gap: 11 }}>
                    <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--ember-500)', flex: 'none', marginTop: 9 }} />
                    <span style={{ fontSize: 15.5, lineHeight: 1.6, color: 'var(--text-muted)' }}>{b}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </section>

      <SiteFooterSlim go={go} />
    </div>
  )
}

// Slim single-row footer (Pricing & FAQ pages).
export function SiteFooterSlim({ go }) {
  return (
    <footer style={{ borderTop: '1px solid var(--border-subtle)', background: 'var(--surface-page)' }}>
      <div style={{ maxWidth: 1140, margin: '0 auto', padding: '48px 24px 36px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap' }}>
        <button type="button" onClick={() => go('home')} style={{ display: 'flex', alignItems: 'center', gap: 10, border: 'none', background: 'transparent', cursor: 'pointer', padding: 0 }}>
          <img src="/logo-mark.svg" width="26" height="26" alt="" />
          <span style={{ fontFamily: 'var(--font-display)', fontSize: 19, fontWeight: 500, color: 'var(--text-strong)' }}>Marlow</span>
        </button>
        <span style={{ fontSize: 13, color: 'var(--text-subtle)' }}>© 2026 Marlow. Made for solo founders.</span>
      </div>
    </footer>
  )
}
