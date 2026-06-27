import React from 'react'
import { Button, Textarea, SegmentedControl, Card, Badge, Icon } from '../ui/primitives.jsx'
import AppHeader from '../ui/AppHeader.jsx'
import { getProducts, getEmails, createEmail, logEvent } from '../lib/data.js'
import { generateEmailAI } from '../lib/generator.js'

const IDEAS = {
  promo: 'Weekend sale — 20% off through Sunday. Warm and low-pressure, lead with a bestseller.',
  launch: 'Introduce our newest product — the story behind it, why it took a while to get right, and an early look.',
  holiday: 'A short gift guide for the season — a few favorites, cozy and unhurried, with a gentle shipping-deadline nudge.',
  newsletter: 'A monthly note from the studio — what we made, what we are into, and one product worth a second look.',
}

const TYPES = [
  { value: 'promo', label: 'Promo' },
  { value: 'launch', label: 'Launch' },
  { value: 'holiday', label: 'Holiday' },
  { value: 'newsletter', label: 'Newsletter' },
]

function Generating() {
  const steps = ['Studying your brand…', 'Writing the subject line…', 'Designing the layout…', 'Placing your products…']
  const [i, setI] = React.useState(0)
  React.useEffect(() => {
    const t = setInterval(() => setI((x) => Math.min(x + 1, steps.length - 1)), 620)
    return () => clearInterval(t)
  }, [])
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 300, background: 'var(--surface-inverse)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 28 }}>
      <svg width="52" height="52" viewBox="0 0 24 24" style={{ animation: 'mspin 0.8s linear infinite' }}>
        <circle cx="12" cy="12" r="9" fill="none" stroke="#ffffff" strokeWidth="2" style={{ opacity: 0.16 }} />
        <path d="M12 3 a9 9 0 0 1 9 9" fill="none" stroke="var(--ember-500)" strokeWidth="2" strokeLinecap="round" />
      </svg>
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: 26, fontWeight: 500, color: 'var(--neutral-50)', marginBottom: 8 }}>Writing your email</div>
        <div key={i} style={{ fontSize: 14.5, color: 'var(--neutral-400)', animation: 'mfade 300ms ease' }}>{steps[i]}</div>
      </div>
    </div>
  )
}

export default function Create({ brand, onOpenEmail, onEditBrand }) {
  const [prompt, setPrompt] = React.useState('')
  const [type, setType] = React.useState('promo')
  const [products, setProducts] = React.useState([])
  const [selected, setSelected] = React.useState([])
  const [recents, setRecents] = React.useState([])
  const [generating, setGenerating] = React.useState(false)
  const [error, setError] = React.useState(null)

  React.useEffect(() => {
    getProducts(brand.id).then((p) => {
      setProducts(p)
      if (p.length) setSelected([p[0].id])
    }).catch(() => {})
    getEmails().then(setRecents).catch(() => {})
  }, [brand.id])

  const toggle = (id) => setSelected((s) => s.includes(id) ? s.filter((x) => x !== id) : [...s, id])

  const generate = async () => {
    setError(null); setGenerating(true)
    try {
      const result = await generateEmailAI(brand, products, { prompt, type, featured: selected, seed: String(Date.now()) })
      const email = await createEmail({
        brand_id: brand.id, name: result.name, campaign_type: type,
        prompt, subject: result.subject, preview_text: result.preview_text,
        body_html: result.body_html, doc: result.doc, featured: selected, status: 'draft',
      })
      logEvent(email.id, 'generate')
      onOpenEmail(email.id)
    } catch (e) {
      setGenerating(false)
      setError(e.message || 'Could not generate. Please try again.')
    }
  }

  return (
    <div style={{ minHeight: '100%', background: 'var(--surface-page)' }}>
      <AppHeader brand={brand} onEditBrand={onEditBrand} />

      <div style={{ maxWidth: 680, margin: '0 auto', padding: '52px 24px 80px' }}>
        <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--accent-text)', marginBottom: 12 }}>New campaign</div>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 40, fontWeight: 500, letterSpacing: '-0.02em', lineHeight: 1.05, color: 'var(--text-strong)', margin: '0 0 32px' }}>
          What are we sending?
        </h1>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10, gap: 12 }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-subtle)' }}>Your brief</div>
          <button onClick={() => setPrompt(IDEAS[type])}
            style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '5px 12px', borderRadius: 'var(--radius-pill)', border: '1px solid var(--border-default)', background: 'var(--surface-card)', color: 'var(--accent-text)', fontFamily: 'var(--font-sans)', fontSize: 12.5, fontWeight: 600, cursor: 'pointer' }}>
            <Icon name="Sparkles" size={14} />Suggest a {type} idea
          </button>
        </div>
        <Textarea value={prompt} onChange={(e) => setPrompt(e.target.value)} rows={3} maxLength={320}
          placeholder="e.g. Weekend sale — 20% off the winter collection through Sunday. Warm and low-pressure."
          style={{ marginBottom: 26 }} />

        <div style={{ marginBottom: 26 }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-subtle)', marginBottom: 10 }}>Campaign type</div>
          <SegmentedControl fullWidth value={type} onChange={setType} options={TYPES} />
        </div>

        {products.length > 0 && (
          <div style={{ marginBottom: 34 }}>
            <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 10 }}>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-subtle)' }}>Feature products</div>
              <span style={{ fontSize: 12.5, color: 'var(--text-subtle)' }}>{selected.length ? selected.length + ' selected' : 'Optional · none selected'}</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: 12 }}>
              {products.map((p) => {
                const on = selected.includes(p.id)
                return (
                  <Card key={p.id} padding="none" interactive selected={on} onClick={() => toggle(p.id)} style={{ overflow: 'hidden' }}>
                    <div style={{ aspectRatio: '1', background: p.image_url ? `center/cover no-repeat url(${p.image_url})` : 'var(--surface-sunken)', position: 'relative' }}>
                      {on && (
                        <span style={{ position: 'absolute', top: 8, right: 8, width: 22, height: 22, borderRadius: '50%', background: 'var(--ember-500)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <Icon name="Check" size={14} stroke={2.4} color="#fff" />
                        </span>
                      )}
                    </div>
                    <div style={{ padding: '8px 9px 10px' }}>
                      <div style={{ fontSize: 11.5, fontWeight: 600, color: 'var(--text-strong)', lineHeight: 1.2, marginBottom: 2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{p.title || 'Product'}</div>
                      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-muted)' }}>{p.price || '—'}</div>
                    </div>
                  </Card>
                )
              })}
            </div>
          </div>
        )}

        {error && <p style={{ fontSize: 13, color: 'var(--danger)', margin: '0 0 14px' }}>{error}</p>}

        <Button variant="primary" size="lg" fullWidth onClick={generate} iconLeft={<Icon name="Sparkles" size={19} />}>
          Generate email
        </Button>

        {recents.length > 0 && (
          <div style={{ marginTop: 56 }}>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-subtle)', marginBottom: 14 }}>Recent</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {recents.slice(0, 6).map((r) => (
                <Card key={r.id} interactive padding="md" onClick={() => onOpenEmail(r.id)} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 14, minWidth: 0 }}>
                    <span style={{ width: 36, height: 36, borderRadius: 'var(--radius-md)', background: 'var(--surface-sunken)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)', flex: 'none' }}>
                      <Icon name="Mail" size={18} />
                    </span>
                    <div style={{ minWidth: 0 }}>
                      <div style={{ fontSize: 15, fontWeight: 600, color: 'var(--text-strong)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{r.name}</div>
                      <div style={{ fontSize: 12.5, color: 'var(--text-subtle)' }}>{statusLabel(r)}</div>
                    </div>
                  </div>
                  <Badge tone={r.status === 'exported' ? 'success' : 'ember'}>{titleType(r.campaign_type)}</Badge>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>

      {generating && <Generating />}
    </div>
  )
}

function titleType(t) { return ({ promo: 'Promo', launch: 'Launch', holiday: 'Holiday', newsletter: 'Newsletter' })[t] || 'Campaign' }
function statusLabel(r) {
  const d = new Date(r.created_at)
  const when = d.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })
  return `${r.status === 'exported' ? 'Exported' : 'Draft'} · ${when}`
}
