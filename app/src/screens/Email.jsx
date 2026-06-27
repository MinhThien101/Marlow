import React from 'react'
import { Button, IconButton, Badge, Dialog, Spinner, Toast, Icon } from '../ui/primitives.jsx'
import { getEmail, updateEmail, logEvent, getProducts } from '../lib/data.js'
import { generateEmailAI, renderEmailHtml } from '../lib/generator.js'

export default function Email({ emailId, brand, onBack }) {
  const [email, setEmail] = React.useState(null)
  const [products, setProducts] = React.useState([])
  const [doc, setDoc] = React.useState(null)
  const [subject, setSubject] = React.useState('')
  const [preview, setPreview] = React.useState('')
  const [name, setName] = React.useState('')
  const [type, setType] = React.useState('promo')
  const [status, setStatus] = React.useState('draft')
  const [regenId, setRegenId] = React.useState(null)
  const [regenAll, setRegenAll] = React.useState(false)
  const [exportOpen, setExportOpen] = React.useState(false)
  const [toast, setToast] = React.useState(null)
  const [thumb, setThumb] = React.useState(null)

  React.useEffect(() => {
    let active = true
    getEmail(emailId).then((e) => {
      if (!active) return
      setEmail(e); setDoc(e.doc); setSubject(e.subject || ''); setPreview(e.preview_text || '')
      setName(e.name || ''); setType(e.campaign_type || 'promo'); setStatus(e.status || 'draft')
      setThumb(e.would_send === true ? 'up' : e.would_send === false ? 'down' : null)
    })
    getProducts(brand.id).then(setProducts).catch(() => {})
    return () => { active = false }
  }, [emailId, brand.id])

  const persist = React.useCallback((patch) => {
    updateEmail(emailId, patch).catch(() => {})
  }, [emailId])

  const saveDoc = (nextDoc) => {
    setDoc(nextDoc)
    persist({ doc: nextDoc, body_html: renderEmailHtml(nextDoc) })
  }

  const editBlock = (id, patch) => {
    const next = { ...doc, blocks: doc.blocks.map((b) => b.id === id ? { ...b, ...patch } : b) }
    saveDoc(next)
  }

  const regenerateSection = async (id) => {
    setRegenId(id)
    try {
      const fresh = await generateEmailAI(brand, products, {
        prompt: email.prompt, type, featured: email.featured || [], seed: String(Date.now()),
      })
      const replacement = fresh.doc.blocks.find((b) => b.id === id)
      if (replacement) {
        const next = { ...doc, blocks: doc.blocks.map((b) => b.id === id ? replacement : b) }
        saveDoc(next)
      }
    } finally {
      setRegenId(null)
    }
  }

  const regenerateAll = async () => {
    setRegenAll(true)
    try {
      const fresh = await generateEmailAI(brand, products, {
        prompt: email.prompt, type, featured: email.featured || [], seed: String(Date.now()),
      })
      setDoc(fresh.doc); setSubject(fresh.subject); setPreview(fresh.preview_text)
      persist({ doc: fresh.doc, subject: fresh.subject, preview_text: fresh.preview_text, body_html: fresh.body_html })
    } finally {
      setRegenAll(false)
    }
  }

  const exportHtml = (download) => {
    const html = renderEmailHtml(doc)
    if (download) {
      const blob = new Blob([html], { type: 'text/html' })
      const a = document.createElement('a')
      a.href = URL.createObjectURL(blob)
      a.download = `${(name || 'email').replace(/[^a-z0-9]+/gi, '-').toLowerCase()}.html`
      a.click()
    } else {
      navigator.clipboard?.writeText(html)
    }
    setStatus('exported')
    persist({ status: 'exported' })
    logEvent(emailId, 'export')
    setExportOpen(false)
    setToast(download ? { title: 'Downloaded.', desc: 'Import the .html into your ESP and send.' } : { title: 'Copied. Looks ready to send.', desc: 'Paste it into your ESP and hit send.' })
    setTimeout(() => setToast(null), 4000)
  }

  const setWouldSend = (val) => {
    const v = val === 'up'
    setThumb(val)
    persist({ would_send: v })
    logEvent(emailId, v ? 'thumbs_up' : 'thumbs_down')
  }

  if (!doc) {
    return <div style={{ minHeight: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Spinner size={24} /></div>
  }

  const { accent, accent2, paper, ink } = doc

  return (
    <div style={{ minHeight: '100%', background: 'var(--surface-page)', display: 'flex', flexDirection: 'column' }}>
      <header style={{ minHeight: 60, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 20px', background: 'var(--surface-card)', borderBottom: '1px solid var(--border-subtle)', position: 'sticky', top: 0, zIndex: 20, gap: 12, flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, minWidth: 0 }}>
          <IconButton label="Back" onClick={onBack}><Icon name="ArrowLeft" size={19} /></IconButton>
          <div style={{ minWidth: 0 }}>
            <div style={{ fontSize: 14.5, fontWeight: 600, color: 'var(--text-strong)', lineHeight: 1.1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '46vw' }}>{name}</div>
            <div style={{ fontSize: 12, color: 'var(--text-subtle)' }}>{titleType(type)} · {doc.brandName}</div>
          </div>
          <Badge tone={status === 'exported' ? 'success' : 'ember'} style={{ marginLeft: 4 }}>{status === 'exported' ? 'Exported' : 'Draft'}</Badge>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <Button variant="secondary" onClick={regenerateAll} disabled={regenAll}
            iconLeft={regenAll ? <Spinner size={16} /> : <Icon name="RotateCcw" size={16} />}>Regenerate</Button>
          <Button variant="primary" onClick={() => setExportOpen(true)} iconLeft={<Icon name="Code2" size={17} />}>Export email</Button>
        </div>
      </header>

      <div style={{ flex: 1, overflow: 'auto', padding: '28px 24px 64px' }}>
        {/* subject + preview */}
        <div style={{ maxWidth: 600, margin: '0 auto 18px', background: 'var(--surface-card)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-sm)', padding: '14px 18px' }}>
          {[['Subject', subject, (v) => { setSubject(v); persist({ subject: v }) }, true], ['Preview text', preview, (v) => { setPreview(v); persist({ preview_text: v }) }, false]].map(([label, val, set, strong]) => (
            <div key={label} style={{ display: 'flex', gap: 14, alignItems: 'baseline', padding: '5px 0' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10.5, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--text-subtle)', width: 92, flex: 'none' }}>{label}</span>
              <Editable value={val} onChange={set} style={{ fontSize: 14.5, fontWeight: strong ? 600 : 400, color: strong ? 'var(--text-strong)' : 'var(--text-muted)', flex: 1 }} />
            </div>
          ))}
        </div>

        {/* email body */}
        <div style={{ maxWidth: 600, margin: '0 auto', background: paper, borderRadius: 'var(--radius-lg)', overflow: 'hidden', boxShadow: 'var(--shadow-lg)', border: '1px solid var(--border-subtle)' }}>
          <div style={{ textAlign: 'center', padding: '22px 0 18px', borderBottom: `1px solid ${accent}22` }}>
            {doc.logo_url
              ? <img src={doc.logo_url} alt="" style={{ height: 30, objectFit: 'contain' }} />
              : <span style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 500, letterSpacing: '0.04em', color: accent, textTransform: 'uppercase' }}>{doc.brandName}</span>}
          </div>

          <div style={{ padding: '8px 0 12px' }}>
            {doc.blocks.map((blk) => (
              <Block key={blk.id} id={blk.id} busy={regenId === blk.id} onRegen={() => regenerateSection(blk.id)}>
                {renderBlock(blk, { accent, accent2, paper, ink, editBlock })}
              </Block>
            ))}
          </div>

          <div style={{ padding: '22px 44px 30px', borderTop: `1px solid ${accent}22`, textAlign: 'center' }}>
            <div style={{ fontFamily: 'var(--font-sans)', fontSize: 12, color: ink, opacity: 0.55, lineHeight: 1.6 }}>
              {doc.brandName}<br />
              You’re receiving this because you signed up or bought something lovely.<br />
              <span style={{ textDecoration: 'underline' }}>Unsubscribe</span> · <span style={{ textDecoration: 'underline' }}>View in browser</span>
            </div>
          </div>
        </div>

        <div style={{ textAlign: 'center', marginTop: 16, fontSize: 12.5, color: 'var(--text-subtle)' }}>
          Hover any section to regenerate it · click text to edit
        </div>
      </div>

      <Dialog open={exportOpen} onClose={() => setExportOpen(false)} title="Export this email"
        description="Marlow copies clean, tested HTML you can paste straight into Klaviyo, Shopify Email, or Mailchimp." width={460}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 4 }}>
          <Button variant="primary" size="lg" fullWidth iconLeft={<Icon name="Copy" size={18} />} onClick={() => exportHtml(false)}>Copy HTML to clipboard</Button>
          <Button variant="secondary" size="lg" fullWidth iconLeft={<Icon name="Download" size={18} />} onClick={() => exportHtml(true)}>Download .html</Button>
        </div>
        <div style={{ marginTop: 22, paddingTop: 18, borderTop: '1px solid var(--border-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
          <span style={{ fontSize: 14, color: 'var(--text-body)', fontWeight: 500 }}>Would you send this?</span>
          <div style={{ display: 'flex', gap: 8 }}>
            <IconButton variant={thumb === 'up' ? 'primary' : 'secondary'} label="Yes" onClick={() => setWouldSend('up')}><Icon name="ThumbsUp" size={18} color={thumb === 'up' ? '#fff' : 'currentColor'} /></IconButton>
            <IconButton variant="secondary" label="No" onClick={() => setWouldSend('down')} style={thumb === 'down' ? { borderColor: 'var(--danger)', color: 'var(--danger)' } : {}}><Icon name="ThumbsDown" size={18} /></IconButton>
          </div>
        </div>
      </Dialog>

      {toast && (
        <div style={{ position: 'fixed', bottom: 24, right: 24, zIndex: 200 }}>
          <Toast tone="success" icon={<Icon name="Check" size={18} />} title={toast.title} description={toast.desc} onClose={() => setToast(null)} />
        </div>
      )}
    </div>
  )
}

/* ----- a hoverable, regenerable block wrapper ----- */
function Block({ id, busy, onRegen, children }) {
  const [hover, setHover] = React.useState(false)
  return (
    <div
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{ position: 'relative', margin: '0 12px', borderRadius: 8, outline: hover && !busy ? '1.5px dashed var(--ember-300)' : '1.5px dashed transparent', outlineOffset: -2, transition: 'outline-color 120ms' }}
    >
      {children}
      {hover && !busy && (
        <div style={{ position: 'absolute', top: 6, right: 6, display: 'flex', gap: 4, background: 'var(--surface-card)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-md)', padding: 3, zIndex: 5 }}>
          <IconButton size="sm" label="Regenerate section" onClick={onRegen}><Icon name="RefreshCw" size={15} /></IconButton>
        </div>
      )}
      {busy && (
        <div style={{ position: 'absolute', inset: 0, borderRadius: 8, background: 'color-mix(in srgb, var(--neutral-50) 72%, transparent)', backdropFilter: 'blur(1px)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 9, zIndex: 6 }}>
          <Spinner size={16} /><span style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-muted)' }}>Rewriting…</span>
        </div>
      )}
    </div>
  )
}

/* ----- inline editable text ----- */
function Editable({ value, onChange, style }) {
  return (
    <span contentEditable suppressContentEditableWarning
      onBlur={(e) => { const t = e.currentTarget.textContent; if (t !== value) onChange(t) }}
      style={{ outline: 'none', borderRadius: 4, cursor: 'text', ...style }}>{value}</span>
  )
}

/* ----- render one block as on-brand React ----- */
function renderBlock(blk, ctx) {
  const { accent, accent2, paper, ink, editBlock } = ctx
  if (blk.type === 'hero') {
    return (
      <div style={{ padding: '26px 44px 8px', textAlign: 'center' }}>
        <Editable value={blk.eyebrow} onChange={(v) => editBlock(blk.id, { eyebrow: v })}
          style={{ display: 'inline-block', fontFamily: 'var(--font-sans)', fontSize: 11, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: accent2, marginBottom: 16 }} />
        <h1 style={{ margin: '0 0 16px' }}>
          <Editable value={blk.headline} onChange={(v) => editBlock(blk.id, { headline: v })}
            style={{ fontFamily: 'var(--font-display)', fontSize: 34, fontWeight: 500, lineHeight: 1.12, letterSpacing: '-0.01em', color: ink }} />
        </h1>
        <p style={{ margin: '0 auto', maxWidth: 420 }}>
          <Editable value={blk.body} onChange={(v) => editBlock(blk.id, { body: v })}
            style={{ fontFamily: 'var(--font-sans)', fontSize: 15.5, lineHeight: 1.6, color: ink, opacity: 0.82 }} />
        </p>
        {blk.cta && (
          <div style={{ marginTop: 22 }}>
            <span style={{ display: 'inline-block', background: accent, color: paper, fontFamily: 'var(--font-sans)', fontSize: 14.5, fontWeight: 600, padding: '13px 32px', borderRadius: 6 }}>
              <Editable value={blk.cta} onChange={(v) => editBlock(blk.id, { cta: v })} style={{ color: paper }} />
            </span>
          </div>
        )}
      </div>
    )
  }
  if (blk.type === 'feature') {
    return (
      <div style={{ padding: '26px 44px 14px' }}>
        {blk.image_url
          ? <img src={blk.image_url} alt="" style={{ width: '100%', borderRadius: 10, marginBottom: 18, display: 'block' }} />
          : <div style={{ aspectRatio: '3/2', borderRadius: 10, background: accent, opacity: 0.12, marginBottom: 18 }} />}
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 500, color: ink, marginBottom: 4 }}>
            <Editable value={blk.title} onChange={(v) => editBlock(blk.id, { title: v })} />
          </div>
          {blk.price ? <div style={{ fontFamily: 'var(--font-sans)', fontSize: 14, color: ink, opacity: 0.7, marginBottom: 18 }}>{blk.price}</div> : <div style={{ height: 12 }} />}
          <span style={{ display: 'inline-block', background: accent, color: paper, fontFamily: 'var(--font-sans)', fontSize: 14.5, fontWeight: 600, padding: '13px 30px', borderRadius: 6 }}>
            <Editable value={blk.cta} onChange={(v) => editBlock(blk.id, { cta: v })} style={{ color: paper }} />
          </span>
        </div>
      </div>
    )
  }
  if (blk.type === 'cta') {
    return (
      <div style={{ padding: '20px 44px', textAlign: 'center' }}>
        <span style={{ display: 'inline-block', background: accent, color: paper, fontFamily: 'var(--font-sans)', fontSize: 14.5, fontWeight: 600, padding: '13px 30px', borderRadius: 6 }}>
          <Editable value={blk.cta} onChange={(v) => editBlock(blk.id, { cta: v })} style={{ color: paper }} />
        </span>
      </div>
    )
  }
  if (blk.type === 'grid') {
    return (
      <div style={{ padding: '12px 36px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
        {blk.items.map((it, i) => (
          <div key={i} style={{ textAlign: 'center' }}>
            {it.image_url && <img src={it.image_url} alt="" style={{ width: '100%', borderRadius: 8, marginBottom: 8, display: 'block' }} />}
            <div style={{ fontFamily: 'var(--font-sans)', fontSize: 13, fontWeight: 600, color: ink }}>{it.title}</div>
            {it.price && <div style={{ fontFamily: 'var(--font-sans)', fontSize: 12, color: ink, opacity: 0.65 }}>{it.price}</div>}
          </div>
        ))}
      </div>
    )
  }
  if (blk.type === 'code') {
    return (
      <div style={{ padding: '18px 44px' }}>
        <div style={{ border: `1.5px dashed ${accent2}`, borderRadius: 10, padding: '18px 20px', textAlign: 'center', background: '#ffffff88' }}>
          <div style={{ fontFamily: 'var(--font-sans)', fontSize: 13, color: ink, opacity: 0.7, marginBottom: 6 }}>{blk.label}</div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 22, fontWeight: 600, letterSpacing: '0.12em', color: accent }}>
            <Editable value={blk.code} onChange={(v) => editBlock(blk.id, { code: v })} />
          </div>
        </div>
      </div>
    )
  }
  return null
}

function titleType(t) { return ({ promo: 'Promo', launch: 'Launch', holiday: 'Holiday', newsletter: 'Newsletter' })[t] || 'Campaign' }
