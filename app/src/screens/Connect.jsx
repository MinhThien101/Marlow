import React from 'react'
import { Card, Button, Input, Badge, Icon, Spinner } from '../ui/primitives.jsx'
import { uploadBrandAsset, getProducts } from '../lib/data.js'
import { parseProfile } from '../studio/studioBrand.js'
import { DEFAULT_PALETTE, scrapeBrand, researchBrand, saveOnboardedBrand, stripScheme } from '../studio/brandOnboard.js'

function LogoTile({ name, logoUrl, size = 52 }) {
  if (logoUrl) {
    return <img src={logoUrl} width={size} height={size} alt="" style={{ borderRadius: 'var(--radius-md)', objectFit: 'contain', background: 'var(--surface-sunken)', flex: 'none' }} />
  }
  const letter = (name || 'B').trim()[0]?.toUpperCase() || 'B'
  return (
    <span style={{ width: size, height: size, borderRadius: 'var(--radius-md)', background: 'var(--ember-500)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-display)', fontSize: size * 0.46, fontWeight: 500, flex: 'none' }}>{letter}</span>
  )
}

export default function Connect({ onDone, existing = null, onCancel }) {
  const editing = !!existing
  const [phase, setPhase] = React.useState(editing ? 'review' : 'input') // input | loading | review
  const [url, setUrl] = React.useState('')
  const [error, setError] = React.useState(null)

  const [name, setName] = React.useState(existing?.name || '')
  const [storeUrl, setStoreUrl] = React.useState(existing?.store_url || '')
  const [logoUrl, setLogoUrl] = React.useState(existing?.logo_url || null)
  const [palette, setPalette] = React.useState(existing?.palette?.length ? existing.palette : DEFAULT_PALETTE)
  const [fonts, setFonts] = React.useState(existing?.fonts || [])
  const [products, setProducts] = React.useState([])
  const [profile, setProfile] = React.useState(() => parseProfile(existing?.voice_notes))
  const [voiceNotes, setVoiceNotes] = React.useState(existing?.voice_notes || null)
  const [analyzing, setAnalyzing] = React.useState(false)
  const [saving, setSaving] = React.useState(false)
  const logoInputRef = React.useRef(null)

  // When editing an existing brand, load its saved products into the editor.
  React.useEffect(() => {
    if (!existing?.id) return
    let active = true
    getProducts(existing.id)
      .then((ps) => { if (active) setProducts(ps.map((p) => ({ ...p, title: p.title || '', price: p.price || '' }))) })
      .catch(() => {})
    return () => { active = false }
  }, [existing?.id])

  const pull = async () => {
    setError(null); setPhase('loading')
    try {
      const s = await scrapeBrand(url)
      setName(s.name)
      setStoreUrl(s.store_url)
      setLogoUrl(s.logo_url)
      setPalette(s.palette)
      setFonts(s.fonts)
      setProducts(s.products)
      setPhase('review')
      // Brand research: read the brand's own words and learn its voice. Best-effort
      // and non-blocking — if it fails, onboarding still works, just without voice.
      runResearch({ name: s.name, url: s.store_url, text: s.text, products: s.products })
    } catch (e) {
      // Network failed entirely — let them set up by hand.
      setStoreUrl(stripScheme(url))
      setPalette(DEFAULT_PALETTE)
      setProducts([])
      setPhase('review')
    }
  }

  const runResearch = async ({ name, url, text, products }) => {
    setAnalyzing(true)
    try {
      const notes = await researchBrand({ name, url, text, products })
      if (notes) {
        setVoiceNotes(notes)
        setProfile(parseProfile(notes))
      }
    } finally {
      setAnalyzing(false)
    }
  }

  const setupByHand = () => {
    setName(''); setStoreUrl(url.replace(/^https?:\/\//, '')); setLogoUrl(null)
    setPalette(DEFAULT_PALETTE); setFonts([]); setProducts([])
    setPhase('review')
  }

  const onLogoFile = async (e) => {
    const file = e.target.files?.[0]; if (!file) return
    try { const u = await uploadBrandAsset(file, 'logo'); setLogoUrl(u) }
    catch (err) { setError('Could not upload that logo.') }
  }

  const onProductFile = async (idx, e) => {
    const file = e.target.files?.[0]; if (!file) return
    setProducts((ps) => ps.map((p, i) => i === idx ? { ...p, _uploading: true } : p))
    try {
      const u = await uploadBrandAsset(file, 'products')
      setProducts((ps) => ps.map((p, i) => i === idx ? { ...p, image_url: u, _uploading: false } : p))
    } catch (err) {
      setProducts((ps) => ps.map((p, i) => i === idx ? { ...p, _uploading: false } : p))
      setError('Could not upload that photo.')
    }
  }

  const addProduct = () => setProducts((ps) => [...ps, { title: '', price: '', image_url: null, url: storeUrl }])
  const removeProduct = (idx) => setProducts((ps) => ps.filter((_, i) => i !== idx))
  const setProduct = (idx, patch) => setProducts((ps) => ps.map((p, i) => i === idx ? { ...p, ...patch } : p))

  const save = async () => {
    setSaving(true); setError(null)
    try {
      const { brand, products: saved } = await saveOnboardedBrand({
        id: existing?.id,
        name, storeUrl, logoUrl, palette, fonts, products,
        voiceNotes: voiceNotes ?? existing?.voice_notes ?? null,
      })
      onDone(brand, saved)
    } catch (e) {
      setSaving(false)
      setError(e.message || 'Could not save your brand. Please try again.')
    }
  }

  /* ----- header logo ----- */
  const Header = (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, justifyContent: 'center', marginBottom: 26 }}>
      <img src="/logo-mark.svg" width="34" height="34" alt="" />
      <span style={{ fontFamily: 'var(--font-display)', fontSize: 26, fontWeight: 500, letterSpacing: '-0.01em', color: 'var(--text-strong)' }}>Marlow</span>
    </div>
  )

  /* =================================================== INPUT / LOADING */
  if (phase !== 'review') {
    const loading = phase === 'loading'
    return (
      <div style={{ minHeight: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '48px 24px' }}>
        <div style={{ width: '100%', maxWidth: 460 }}>
          {Header}
          <Card padding="lg" style={{ boxShadow: 'var(--shadow-md)' }}>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 30, fontWeight: 500, letterSpacing: '-0.015em', color: 'var(--text-strong)', margin: '0 0 8px' }}>Set up your brand</h1>
            <p style={{ fontSize: 15, lineHeight: 1.5, color: 'var(--text-muted)', margin: '0 0 22px' }}>
              Paste your store URL. Marlow reads your logo, colors, fonts, and a few products — automatically. You can fix anything after.
            </p>
            <Input
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              size="lg"
              placeholder="yourstore.com"
              disabled={loading}
              onKeyDown={(e) => { if (e.key === 'Enter' && url.trim()) pull() }}
              prefix={<span style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--text-subtle)' }}>https://</span>}
            />
            <div style={{ height: 16 }} />
            <Button variant="primary" size="lg" fullWidth disabled={loading || !url.trim()} onClick={pull}
              iconLeft={loading ? <Spinner size={18} color="#fff" /> : null}
              iconRight={!loading ? <Icon name="ArrowRight" size={18} /> : null}>
              {loading ? `Reading ${url.replace(/^https?:\/\//, '')}…` : 'Pull my brand'}
            </Button>

            <div style={{ display: 'flex', alignItems: 'center', gap: 12, margin: '20px 0' }}>
              <div style={{ flex: 1, height: 1, background: 'var(--border-subtle)' }} />
              <span style={{ fontSize: 12, color: 'var(--text-subtle)' }}>or</span>
              <div style={{ flex: 1, height: 1, background: 'var(--border-subtle)' }} />
            </div>
            <button onClick={setupByHand} disabled={loading}
              style={{ display: 'flex', width: '100%', alignItems: 'center', gap: 13, padding: '14px 16px', border: '1.5px dashed var(--border-default)', borderRadius: 'var(--radius-lg)', cursor: 'pointer', background: 'var(--surface-card)', textAlign: 'left' }}>
              <span style={{ width: 38, height: 38, flex: 'none', borderRadius: 'var(--radius-md)', background: 'var(--surface-sunken)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)' }}>
                <Icon name="Pencil" size={18} />
              </span>
              <span>
                <span style={{ display: 'block', fontSize: 14.5, fontWeight: 600, color: 'var(--text-strong)' }}>Set it up by hand</span>
                <span style={{ display: 'block', fontSize: 12.5, color: 'var(--text-subtle)' }}>Enter your name, colors &amp; upload a logo yourself</span>
              </span>
            </button>
            <p style={{ fontSize: 12.5, color: 'var(--text-subtle)', textAlign: 'center', margin: '16px 0 0' }}>
              Nothing to connect — Marlow only reads what’s public on your site.
            </p>
          </Card>
        </div>
      </div>
    )
  }

  /* =========================================================== REVIEW */
  return (
    <div style={{ minHeight: '100%', display: 'flex', alignItems: 'flex-start', justifyContent: 'center', padding: '48px 24px' }}>
      <div style={{ width: '100%', maxWidth: 620 }}>
        {Header}
        <Card padding="lg" style={{ boxShadow: 'var(--shadow-md)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 18 }}>
            <Badge tone="success" dot>{editing ? 'Your brand' : 'Ready'}</Badge>
            <span style={{ fontSize: 13, color: 'var(--text-subtle)' }}>{editing ? 'Change anything — logo, colors, products — then save.' : 'Here’s what Marlow found. Fix anything that’s off.'}</span>
          </div>

          {/* identity */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, paddingBottom: 18, borderBottom: '1px solid var(--border-subtle)' }}>
            <button onClick={() => logoInputRef.current?.click()} title="Replace logo"
              style={{ border: 'none', background: 'transparent', padding: 0, cursor: 'pointer', position: 'relative' }}>
              <LogoTile name={name} logoUrl={logoUrl} />
            </button>
            <input ref={logoInputRef} type="file" accept="image/*" onChange={onLogoFile} style={{ display: 'none' }} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Brand name"
                style={{ width: '100%', border: 'none', outline: 'none', background: 'transparent', fontFamily: 'var(--font-display)', fontSize: 21, fontWeight: 500, color: 'var(--text-strong)' }} />
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12.5, color: 'var(--text-muted)' }}>{storeUrl}</div>
            </div>
            <button onClick={() => logoInputRef.current?.click()} style={{ border: '1px solid var(--border-default)', background: 'var(--surface-card)', color: 'var(--text-muted)', borderRadius: 'var(--radius-md)', padding: '7px 12px', fontSize: 12.5, fontWeight: 600, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 6 }}>
              <Icon name="Upload" size={14} />Logo
            </button>
          </div>

          {/* palette + fonts */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 22, padding: '18px 0', borderBottom: '1px solid var(--border-subtle)' }}>
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-subtle)', marginBottom: 10 }}>Palette</div>
              <div style={{ display: 'flex', gap: 9, flexWrap: 'wrap' }}>
                {palette.map((c, i) => (
                  <span key={c + i} style={{ position: 'relative', width: 28, height: 28, borderRadius: 'var(--radius-sm)', background: c, border: '1px solid rgba(0,0,0,0.08)' }}>
                    <button onClick={() => setPalette(palette.filter((_, j) => j !== i))} title="Remove"
                      style={{ position: 'absolute', top: -7, right: -7, width: 16, height: 16, borderRadius: '50%', border: '1px solid var(--border-default)', background: 'var(--surface-card)', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', padding: 0 }}>
                      <Icon name="X" size={10} stroke={2.4} />
                    </button>
                  </span>
                ))}
                <label title="Add color" style={{ width: 28, height: 28, borderRadius: 'var(--radius-sm)', border: '1.5px dashed var(--border-default)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'var(--text-subtle)', position: 'relative', overflow: 'hidden' }}>
                  <Icon name="Plus" size={13} />
                  <input type="color" onChange={(e) => setPalette([...palette, e.target.value.toUpperCase()])} style={{ position: 'absolute', inset: 0, opacity: 0, cursor: 'pointer' }} />
                </label>
              </div>
            </div>
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-subtle)', marginBottom: 10 }}>Fonts</div>
              <div style={{ display: 'flex', gap: 7, flexWrap: 'wrap' }}>
                {fonts.map((f, i) => (
                  <span key={f + i} style={{ display: 'inline-flex', alignItems: 'center', gap: 7, padding: '4px 8px 4px 11px', borderRadius: 'var(--radius-pill)', border: '1px solid var(--border-default)', fontSize: 13, color: 'var(--text-body)' }}>
                    <span style={{ fontFamily: 'var(--font-display)', fontSize: 15, fontWeight: 500 }}>Aa</span>{f}
                    <button onClick={() => setFonts(fonts.filter((_, j) => j !== i))} title="Remove"
                      style={{ width: 15, height: 15, borderRadius: '50%', border: 'none', background: 'var(--surface-sunken)', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', padding: 0 }}>
                      <Icon name="X" size={9} stroke={2.4} />
                    </button>
                  </span>
                ))}
                {fonts.length < 2 && (
                  <AddFont onAdd={(f) => setFonts([...fonts, f])} />
                )}
              </div>
            </div>
          </div>

          {/* products */}
          <div style={{ padding: '18px 0 4px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-subtle)' }}>Products · {products.length}</div>
              <span style={{ fontSize: 12, color: 'var(--text-subtle)' }}>Add real photos so emails look legit</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(124px, 1fr))', gap: 12 }}>
              {products.map((p, i) => (
                <div key={i} style={{ position: 'relative', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)', overflow: 'hidden', background: 'var(--surface-card)' }}>
                  <button onClick={() => removeProduct(i)} title="Remove"
                    style={{ position: 'absolute', top: 5, right: 5, width: 20, height: 20, borderRadius: '50%', border: '1px solid var(--border-subtle)', background: 'var(--surface-card)', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', padding: 0, zIndex: 2 }}>
                    <Icon name="X" size={12} stroke={2.2} />
                  </button>
                  <label style={{ display: 'block', aspectRatio: '1', background: p.image_url ? `center/cover no-repeat url(${p.image_url})` : 'var(--surface-sunken)', cursor: 'pointer', position: 'relative' }}>
                    <input type="file" accept="image/*" onChange={(e) => onProductFile(i, e)} style={{ display: 'none' }} />
                    {!p.image_url && (
                      <span style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 4, color: 'var(--text-subtle)', fontSize: 11 }}>
                        {p._uploading ? <Spinner size={16} /> : <><Icon name="ImagePlus" size={18} />Add photo</>}
                      </span>
                    )}
                  </label>
                  <div style={{ padding: '7px 8px 9px' }}>
                    <input value={p.title} onChange={(e) => setProduct(i, { title: e.target.value })} placeholder="Product name"
                      style={{ width: '100%', border: 'none', outline: 'none', background: 'transparent', fontSize: 12, fontWeight: 600, color: 'var(--text-strong)' }} />
                    <input value={p.price} onChange={(e) => setProduct(i, { price: e.target.value })} placeholder="$ price"
                      style={{ width: '100%', border: 'none', outline: 'none', background: 'transparent', fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-muted)' }} />
                  </div>
                </div>
              ))}
              <button onClick={addProduct} style={{ aspectRatio: '1', borderRadius: 'var(--radius-md)', border: '1.5px dashed var(--border-default)', background: 'transparent', color: 'var(--text-subtle)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 4, cursor: 'pointer', fontSize: 11 }}>
                <Icon name="Plus" size={16} />Add product
              </button>
            </div>
          </div>

          {/* voice — what the brand-research pass learned from the site's own words */}
          {(analyzing || profile) && (
            <div style={{ marginTop: 18, paddingTop: 18, borderTop: '1px solid var(--border-subtle)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-subtle)' }}>Voice Marlow learned</div>
                {analyzing && <Spinner size={13} />}
                {analyzing && <span style={{ fontSize: 12, color: 'var(--text-subtle)' }}>reading your site…</span>}
              </div>
              {profile && (
                <div style={{ background: 'var(--surface-sunken)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)', padding: '14px 16px' }}>
                  {profile.positioning && <p style={{ fontSize: 13.5, lineHeight: 1.55, color: 'var(--text-body)', margin: '0 0 10px' }}>{profile.positioning}</p>}
                  {profile.voiceRules?.length > 0 && (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7 }}>
                      {profile.voiceRules.slice(0, 6).map((r, i) => (
                        <span key={i} title={r.d} style={{ fontSize: 12, color: 'var(--text-body)', background: 'var(--surface-card)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-pill)', padding: '4px 11px' }}>{r.n}</span>
                      ))}
                    </div>
                  )}
                  <p style={{ fontSize: 11.5, color: 'var(--text-subtle)', margin: '11px 0 0' }}>Marlow writes every email to these. Edit anytime from your brand.</p>
                </div>
              )}
            </div>
          )}

          {error && <p style={{ fontSize: 13, color: 'var(--danger)', margin: '14px 0 0' }}>{error}</p>}

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, marginTop: 22 }}>
            <button onClick={() => (editing ? onCancel && onCancel() : setPhase('input'))} style={{ border: 'none', background: 'transparent', color: 'var(--text-muted)', fontFamily: 'var(--font-sans)', fontSize: 14, fontWeight: 500, cursor: 'pointer' }}>{editing ? 'Cancel' : 'Start over'}</button>
            <Button variant="primary" onClick={save} disabled={saving}
              iconLeft={saving ? <Spinner size={18} color="#fff" /> : null}
              iconRight={!saving ? <Icon name="ArrowRight" size={18} /> : null}>
              {saving ? 'Saving…' : editing ? 'Save changes' : 'Looks right'}
            </Button>
          </div>
        </Card>
      </div>
    </div>
  )
}

function AddFont({ onAdd }) {
  const [open, setOpen] = React.useState(false)
  const [val, setVal] = React.useState('')
  if (!open) {
    return (
      <button onClick={() => setOpen(true)} style={{ display: 'inline-flex', alignItems: 'center', gap: 5, padding: '4px 11px', borderRadius: 'var(--radius-pill)', border: '1.5px dashed var(--border-default)', background: 'transparent', fontSize: 12.5, color: 'var(--text-subtle)', cursor: 'pointer' }}>
        <Icon name="Plus" size={12} />Add
      </button>
    )
  }
  return (
    <input autoFocus value={val} onChange={(e) => setVal(e.target.value)}
      onKeyDown={(e) => { if (e.key === 'Enter' && val.trim()) { onAdd(val.trim()); setVal(''); setOpen(false) } if (e.key === 'Escape') setOpen(false) }}
      onBlur={() => { if (val.trim()) onAdd(val.trim()); setVal(''); setOpen(false) }}
      placeholder="Font name"
      style={{ padding: '5px 11px', borderRadius: 'var(--radius-pill)', border: '1px solid var(--border-default)', fontSize: 13, outline: 'none', width: 110 }} />
  )
}
