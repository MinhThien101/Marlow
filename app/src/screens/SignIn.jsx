import React from 'react'
import { Card, Button, Spinner } from '../ui/primitives.jsx'
import { signInWithGoogle, signInForPreview, isLocalhost } from '../lib/auth.js'

function GoogleGlyph() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden style={{ display: 'block' }}>
      <path fill="#4285F4" d="M17.64 9.2c0-.64-.06-1.25-.16-1.84H9v3.48h4.84a4.14 4.14 0 0 1-1.8 2.72v2.26h2.92c1.7-1.57 2.68-3.88 2.68-6.62z" />
      <path fill="#34A853" d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.92-2.26c-.8.54-1.84.86-3.04.86-2.34 0-4.32-1.58-5.02-3.7H.96v2.34A9 9 0 0 0 9 18z" />
      <path fill="#FBBC05" d="M3.98 10.72a5.4 5.4 0 0 1 0-3.44V4.94H.96a9 9 0 0 0 0 8.12l3.02-2.34z" />
      <path fill="#EA4335" d="M9 3.58c1.32 0 2.5.46 3.44 1.35l2.58-2.58C13.47.9 11.43 0 9 0A9 9 0 0 0 .96 4.94l3.02 2.34C4.68 5.16 6.66 3.58 9 3.58z" />
    </svg>
  )
}

export default function SignIn({ onOpenFAQ, onHome }) {
  const [busy, setBusy] = React.useState(false)
  const [err, setErr] = React.useState(null)

  const go = async () => {
    setBusy(true); setErr(null)
    try { await signInWithGoogle() }
    catch (e) { setErr(e.message || 'Could not start sign-in.'); setBusy(false) }
  }
  const preview = async () => {
    setBusy(true); setErr(null)
    try { await signInForPreview() }
    catch (e) { setErr(e.message || 'Preview sign-in unavailable.'); setBusy(false) }
  }

  return (
    <div style={{ minHeight: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '48px 24px' }}>
      <div style={{ width: '100%', maxWidth: 440 }}>
        <button type="button" onClick={onHome} disabled={!onHome}
          style={{ display: 'flex', alignItems: 'center', gap: 11, justifyContent: 'center', marginBottom: 26, width: '100%', border: 'none', background: 'transparent', cursor: onHome ? 'pointer' : 'default', padding: 0 }}>
          <img src="/logo-mark.svg" width="36" height="36" alt="" />
          <span style={{ fontFamily: 'var(--font-display)', fontSize: 27, fontWeight: 500, letterSpacing: '-0.01em', color: 'var(--text-strong)' }}>Marlow</span>
        </button>

        <Card padding="lg" style={{ boxShadow: 'var(--shadow-md)', textAlign: 'center' }}>
          <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--accent-text)', marginBottom: 14 }}>For solo store founders</div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 33, fontWeight: 500, letterSpacing: '-0.015em', lineHeight: 1.08, color: 'var(--text-strong)', margin: '0 0 12px' }}>
            On-brand emails,<br />without the agency.
          </h1>
          <p style={{ fontSize: 15, lineHeight: 1.55, color: 'var(--text-muted)', margin: '0 auto 26px', maxWidth: 340 }}>
            Describe the email, and Marlow writes and designs a finished campaign in your brand — ready to send in minutes.
          </p>

          <Button variant="secondary" size="lg" fullWidth onClick={go} disabled={busy}
            iconLeft={busy ? <Spinner size={18} /> : <GoogleGlyph />}
            style={{ borderColor: 'var(--border-default)' }}>
            {busy ? 'Opening Google…' : 'Continue with Google'}
          </Button>

          {err && <p style={{ fontSize: 13, color: 'var(--danger)', margin: '14px 0 0' }}>{err}</p>}

          <p style={{ fontSize: 12.5, color: 'var(--text-subtle)', margin: '18px auto 0', maxWidth: 320, lineHeight: 1.5 }}>
            We only use your Google account to sign you in. Your brand and emails stay private to you.
          </p>

          {isLocalhost && (
            <button onClick={preview} disabled={busy}
              style={{ marginTop: 20, border: 'none', background: 'transparent', color: 'var(--text-subtle)', fontSize: 12.5, fontFamily: 'var(--font-sans)', cursor: 'pointer', textDecoration: 'underline' }}>
              Preview without signing in (local only)
            </button>
          )}
        </Card>

        {onOpenFAQ && (
          <p style={{ textAlign: 'center', fontSize: 13.5, color: 'var(--text-subtle)', margin: '20px 0 0' }}>
            New to Marlow?{' '}
            <button onClick={onOpenFAQ}
              style={{ border: 'none', background: 'transparent', color: 'var(--accent-text)', fontSize: 13.5, fontWeight: 600, fontFamily: 'var(--font-sans)', cursor: 'pointer', padding: 0 }}>
              Read the FAQ
            </button>
          </p>
        )}
      </div>
    </div>
  )
}
