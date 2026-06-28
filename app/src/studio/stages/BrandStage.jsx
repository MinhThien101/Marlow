// Stage 1 — Brand. Read-only recap of the connected brand. Who Marlow writes as.
// Renders the real connected brand; the action button opens the real Connect editor.
import React from 'react'
import { Button, Badge, Icon, Input, Spinner } from '../../ui/primitives.jsx'
import { Eyebrow, Panel } from '../data.jsx'
import { useStudioBrand } from '../brandContext.jsx'
import { onboardFromUrl, stripScheme } from '../brandOnboard.js'

export default function BrandStage({ onNext, onEdit, onBrandConnected, existingBrandId, brandComplete = false }) {
  const sb = useStudioBrand()
  // No brand connected yet (or too thin to use) — onboard right here in the flow,
  // reusing the same scrape → research → save pipeline as the Connect screen.
  if (!brandComplete) {
    return <BrandEmptyState existingBrandId={existingBrandId} onConnected={onBrandConnected} onEdit={onEdit} />
  }
  const T = sb.emailTheme
  const sub = sb.positioning + (sb.founder ? ` Founded by ${sb.founder}${sb.city ? ' in ' + sb.city : ''}.` : '')
  return (
    <div style={{ maxWidth: 760, margin: '0 auto', animation: 'mfade 280ms var(--ease-out, ease) both' }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16, marginBottom: 18 }}>
        {sb.logoUrl
          ? <img src={sb.logoUrl} alt="" style={{ width: 56, height: 56, flex: 'none', borderRadius: 'var(--radius-md)', objectFit: 'contain', background: 'var(--surface-sunken)' }} />
          : <span style={{ width: 56, height: 56, flex: 'none', borderRadius: 'var(--radius-md)', background: T.accent, color: T.paper, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 500 }}>{(sb.short || 'B')[0].toUpperCase()}</span>}
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 24, fontWeight: 500, color: 'var(--text-strong)', lineHeight: 1.1, marginRight: 2 }}>{sb.name}</div>
            <Badge tone="success" dot>Website connected</Badge>
            <Badge tone="neutral" dot>Klaviyo not connected</Badge>
          </div>
          <p style={{ fontSize: 14, lineHeight: 1.55, color: 'var(--text-muted)', margin: '6px 0 0', maxWidth: 560 }}>{sub}</p>
        </div>
        {onEdit && <button onClick={onEdit} style={{ flex: 'none', display: 'inline-flex', alignItems: 'center', gap: 7, border: '1px solid var(--border-default)', background: 'var(--surface-card)', color: 'var(--text-muted)', borderRadius: 'var(--radius-md)', padding: '8px 12px', fontFamily: 'var(--font-sans)', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>
          <Icon name="Pencil" size={15} /> Edit brand
        </button>}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
        <Panel>
          <Eyebrow style={{ marginBottom: 12 }}>Palette</Eyebrow>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            {sb.palette.map((c, i) => (
              <div key={c + i} style={{ textAlign: 'center' }}>
                <span style={{ display: 'block', width: 38, height: 38, borderRadius: 'var(--radius-sm)', background: c, border: '1px solid rgba(0,0,0,0.08)' }} />
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--text-subtle)', marginTop: 4, display: 'block' }}>{c}</span>
              </div>
            ))}
          </div>
          <div style={{ height: 1, background: 'var(--border-subtle)', margin: '16px 0' }} />
          <Eyebrow style={{ marginBottom: 12 }}>Fonts</Eyebrow>
          <div style={{ display: 'flex', gap: 22 }}>
            {sb.fonts.map((f, i) => (
              <div key={f + i} style={{ display: 'flex', alignItems: 'center', gap: 11 }}>
                <span style={{ fontFamily: i ? 'var(--font-sans)' : 'var(--font-display)', fontSize: 26, fontWeight: 500, color: 'var(--text-strong)' }}>Aa</span>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-strong)' }}>{f}</div>
                  <div style={{ fontSize: 11, color: 'var(--text-subtle)' }}>{i ? 'Body & UI' : 'Display'}</div>
                </div>
              </div>
            ))}
          </div>
        </Panel>
        <Panel>
          <Eyebrow style={{ marginBottom: 12 }}>Audience</Eyebrow>
          <p style={{ fontSize: 13.5, lineHeight: 1.6, color: 'var(--text-body)', margin: 0 }}>{sb.audience}</p>
          <div style={{ height: 1, background: 'var(--border-subtle)', margin: '16px 0' }} />
          <Eyebrow style={{ marginBottom: 10 }}>{sb.products.length} products Marlow can feature</Eyebrow>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
            {(sb.products.length ? sb.products.slice(0, 4) : [{ title: 'No products yet — add them in Edit brand' }]).map((p, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 9, fontSize: 13, color: 'var(--text-muted)' }}>
                <Icon name="Package" size={14} color="var(--text-subtle)" /> {p.title}{p.price ? ` · ${p.price}` : ''}
              </div>
            ))}
          </div>
        </Panel>
      </div>

      <Panel style={{ marginBottom: 18 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
          <Eyebrow>Voice rules{sb.founder ? ` · in ${sb.founder}'s voice` : ''}</Eyebrow>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-subtle)' }}>{sb.voiceRules.length} rules</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px 22px' }}>
          {sb.voiceRules.map((r, i) => (
            <div key={r.n + i} style={{ display: 'flex', gap: 11 }}>
              <span style={{ flex: 'none', width: 22, height: 22, borderRadius: '50%', background: 'var(--accent-soft)', color: 'var(--ember-600)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 700 }}>{i + 1}</span>
              <div>
                <div style={{ fontSize: 13.5, fontWeight: 600, color: 'var(--text-strong)', marginBottom: 2 }}>{r.n}</div>
                {r.d && <div style={{ fontSize: 12.5, lineHeight: 1.5, color: 'var(--text-muted)' }}>{r.d}</div>}
              </div>
            </div>
          ))}
        </div>
      </Panel>

      <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 16px', borderRadius: 'var(--radius-md)', background: 'var(--surface-inverse)', color: 'var(--neutral-50)' }}>
        <Icon name="Sparkle" size={18} color="#F0A88E" />
        <span style={{ flex: 1, fontSize: 13.5, lineHeight: 1.5 }}>Marlow will write every campaign as {sb.short} — these rules, this palette, your voice.</span>
        {onNext && <Button variant="inverse" onClick={onNext} iconRight={<Icon name="ArrowRight" size={17} />}>Start a campaign</Button>}
      </div>
    </div>
  )
}

// Empty state — shown when no usable brand is connected. A single prominent URL
// input runs the scrape → research → save pipeline in place, then the parent
// re-renders with the connected brand and this stage swaps to the recap above.
function BrandEmptyState({ existingBrandId, onConnected, onEdit }) {
  const [url, setUrl] = React.useState('')
  const [phase, setPhase] = React.useState('idle') // idle | working | error
  const [step, setStep] = React.useState('scraping') // scraping | researching | saving
  const [error, setError] = React.useState(null)
  const working = phase === 'working'

  const pull = async () => {
    if (!url.trim() || working) return
    setError(null); setPhase('working'); setStep('scraping')
    try {
      const { brand, products } = await onboardFromUrl(url, { id: existingBrandId, onPhase: setStep })
      onConnected?.(brand, products)
      // Leave the spinner up — the parent re-render swaps this view for the recap.
    } catch (e) {
      setPhase('error')
      setError("Couldn't read that store. Check the URL and try again, or set your brand up by hand.")
    }
  }

  const progress = {
    scraping: `Reading ${stripScheme(url) || 'your store'}…`,
    researching: 'Learning your voice…',
    saving: 'Saving your brand…',
  }[step] || 'Working…'

  return (
    <div style={{ maxWidth: 540, margin: '0 auto', animation: 'mfade 280ms var(--ease-out, ease) both' }}>
      <div style={{ textAlign: 'center', marginBottom: 22 }}>
        <span style={{ display: 'inline-flex', width: 52, height: 52, borderRadius: 'var(--radius-lg)', background: 'var(--accent-soft)', alignItems: 'center', justifyContent: 'center', marginBottom: 14 }}>
          <Icon name="Sprout" size={26} color="var(--ember-600)" />
        </span>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 500, letterSpacing: '-0.015em', color: 'var(--text-strong)', margin: '0 0 8px' }}>Connect your brand</h1>
        <p style={{ fontSize: 14.5, lineHeight: 1.55, color: 'var(--text-muted)', margin: '0 auto', maxWidth: 420 }}>
          Paste your store URL. Marlow reads your logo, colors, fonts, products, and voice — automatically. You can fix anything after.
        </p>
      </div>

      <Panel>
        <Input
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          size="lg"
          placeholder="yourstore.com"
          disabled={working}
          onKeyDown={(e) => { if (e.key === 'Enter' && url.trim()) pull() }}
          prefix={<span style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--text-subtle)' }}>https://</span>}
        />
        <div style={{ height: 14 }} />
        <Button variant="primary" size="lg" fullWidth disabled={working || !url.trim()} onClick={pull}
          iconLeft={working ? <Spinner size={18} color="#fff" /> : null}
          iconRight={!working ? <Icon name="ArrowRight" size={18} /> : null}>
          {working ? progress : 'Pull my brand'}
        </Button>

        {error && <p style={{ fontSize: 13, color: 'var(--danger)', margin: '14px 0 0', lineHeight: 1.5 }}>{error}</p>}

        <div style={{ display: 'flex', alignItems: 'center', gap: 12, margin: '20px 0' }}>
          <div style={{ flex: 1, height: 1, background: 'var(--border-subtle)' }} />
          <span style={{ fontSize: 12, color: 'var(--text-subtle)' }}>or</span>
          <div style={{ flex: 1, height: 1, background: 'var(--border-subtle)' }} />
        </div>
        <button onClick={onEdit} disabled={working}
          style={{ display: 'flex', width: '100%', alignItems: 'center', gap: 13, padding: '14px 16px', border: '1.5px dashed var(--border-default)', borderRadius: 'var(--radius-lg)', cursor: working ? 'default' : 'pointer', background: 'var(--surface-card)', textAlign: 'left', opacity: working ? 0.6 : 1 }}>
          <span style={{ width: 38, height: 38, flex: 'none', borderRadius: 'var(--radius-md)', background: 'var(--surface-sunken)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)' }}>
            <Icon name="Pencil" size={18} />
          </span>
          <span>
            <span style={{ display: 'block', fontSize: 14.5, fontWeight: 600, color: 'var(--text-strong)' }}>Set it up by hand</span>
            <span style={{ display: 'block', fontSize: 12.5, color: 'var(--text-subtle)' }}>Enter your name, colors &amp; upload a logo yourself</span>
          </span>
        </button>
      </Panel>

      <p style={{ fontSize: 12.5, color: 'var(--text-subtle)', textAlign: 'center', margin: '16px 0 0' }}>
        Nothing to connect — Marlow only reads what’s public on your site.
      </p>
    </div>
  )
}
