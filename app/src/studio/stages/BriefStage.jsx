// Stage 2 — Brief. Pick a campaign type + content pillar (the structure locks),
// say what the send is about, and Marlow drafts a brief (guardrails, not copy).
import React from 'react'
import { Button, Input, Textarea, Spinner, Icon } from '../../ui/primitives.jsx'
import { Eyebrow, Panel, PILLARS, TYPES, pillarOf } from '../data.jsx'
import { draftBrief } from '../ai.js'
import { useStudioBrand } from '../brandContext.jsx'

// A field is unresolved when the writer left a `missing info:` flag on it. The
// brief cannot proceed to copy until each flag is filled or explicitly accepted.
const MISSING_RE = /^\s*missing info:/i
function missingFlags(brief) {
  if (!brief) return []
  const out = []
  const check = (label, val) => { if (val && MISSING_RE.test(String(val))) out.push({ label, what: String(val).replace(MISSING_RE, '').trim() }) }
  check('Title', brief.title)
  check('Campaign Direction', brief.direction)
  check('Product Focus', brief.productFocus)
  check('Offer', brief.offer)
  check('Links', brief.links)
  return out
}

const PillarCard = ({ p, on, onClick }) => (
  <button onClick={onClick}
    style={{ textAlign: 'left', cursor: 'pointer', padding: 16, borderRadius: 'var(--radius-md)', border: '1.5px solid ' + (on ? 'var(--ember-500)' : 'var(--border-subtle)'), background: on ? 'var(--accent-soft)' : 'var(--surface-card)', boxShadow: on ? 'none' : 'var(--shadow-sm)', transition: 'border-color 120ms, background 120ms' }}>
    <span style={{ display: 'flex', alignItems: 'center', gap: 9, marginBottom: 8 }}>
      <span style={{ width: 32, height: 32, borderRadius: 'var(--radius-sm)', background: on ? 'var(--ember-500)' : 'var(--surface-sunken)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Icon name={p.icon} size={17} color={on ? '#fff' : 'var(--text-muted)'} />
      </span>
      <span style={{ fontSize: 14.5, fontWeight: 600, color: 'var(--text-strong)' }}>{p.label}</span>
    </span>
    <span style={{ display: 'block', fontSize: 12.5, lineHeight: 1.45, color: 'var(--text-muted)' }}>{p.blurb}</span>
  </button>
)

const BriefField = ({ label, children, mono }) => (
  <div style={{ display: 'flex', gap: 14, padding: '11px 0', borderTop: '1px solid var(--border-subtle)' }}>
    <span style={{ flex: 'none', width: 130, fontSize: 12, fontWeight: 700, color: 'var(--text-strong)', paddingTop: 1 }}>{label}</span>
    <span style={{ flex: 1, fontSize: 13.5, lineHeight: 1.5, color: 'var(--text-body)', fontFamily: mono ? 'var(--font-mono)' : 'var(--font-sans)' }}>{children}</span>
  </div>
)

// A brief value that may carry a `missing info:` flag — shown muted + tagged.
const FieldValue = ({ children }) => {
  const flagged = MISSING_RE.test(String(children || ''))
  if (!flagged) return children
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 7, color: 'var(--text-subtle)', fontStyle: 'italic' }}>
      <Icon name="AlertCircle" size={14} color="var(--ember-600)" />{children}
    </span>
  )
}

export default function BriefStage({ campaign, setCampaign, onBack, onNext }) {
  const sb = useStudioBrand()
  const [type, setType] = React.useState(campaign.type || 'DESIGNED')
  const [pillar, setPillar] = React.useState(campaign.pillar || null)
  const [ask, setAsk] = React.useState(campaign.ask || '')
  const [offer, setOffer] = React.useState(campaign.offerInput || '')
  const [reqLang, setReqLang] = React.useState(campaign.reqLangInput || '')
  const [clientNotes, setClientNotes] = React.useState(campaign.clientNotesInput || '')
  const [brief, setBrief] = React.useState(campaign.brief || null)
  const [accepted, setAccepted] = React.useState(false)
  const [busy, setBusy] = React.useState(false)

  const p = pillar ? pillarOf(pillar) : null
  const structure = p ? (type === 'DESIGNED' ? p.designed : type === 'TEXT_BASED' ? [p.framework] : [p.sms]) : []
  const flags = missingFlags(brief)
  const blocked = flags.length > 0 && !accepted

  const resetBrief = () => { setBrief(null); setAccepted(false) }

  const draft = async () => {
    if (!p) return
    setBusy(true)
    setAccepted(false)
    const built = await draftBrief(sb, { type, pillar, ask, offer, requiredLanguage: reqLang, clientNotes })
    setBrief(built)
    setBusy(false)
  }

  const proceed = () => {
    const safeName = brief.title && !MISSING_RE.test(brief.title) ? brief.title : (ask.trim() || 'New campaign')
    setCampaign((c) => ({ ...c, type, pillar, ask, offerInput: offer, reqLangInput: reqLang, clientNotesInput: clientNotes, brief, name: safeName, copy: null, design: null }))
    onNext()
  }

  return (
    <div style={{ maxWidth: 760, margin: '0 auto', animation: 'mfade 280ms var(--ease-out, ease) both' }}>
      <Panel style={{ marginBottom: 16 }}>
        <Eyebrow style={{ marginBottom: 10 }}>Campaign type</Eyebrow>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10 }}>
          {TYPES.map((t) => {
            const on = type === t.value
            return (
              <button key={t.value} onClick={() => { setType(t.value); resetBrief() }}
                style={{ textAlign: 'left', cursor: 'pointer', padding: '12px 13px', borderRadius: 'var(--radius-md)', border: '1.5px solid ' + (on ? 'var(--ember-500)' : 'var(--border-subtle)'), background: on ? 'var(--accent-soft)' : 'var(--surface-card)', transition: 'border-color 120ms, background 120ms' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 5 }}>
                  <Icon name={t.icon} size={16} color={on ? 'var(--ember-600)' : 'var(--text-muted)'} />
                  <span style={{ fontSize: 13.5, fontWeight: 600, color: 'var(--text-strong)' }}>{t.label}</span>
                </span>
                <span style={{ display: 'block', fontSize: 11.5, lineHeight: 1.4, color: 'var(--text-muted)' }}>{t.desc}</span>
              </button>
            )
          })}
        </div>
      </Panel>

      <Panel style={{ marginBottom: 16 }}>
        <Eyebrow style={{ marginBottom: 12 }}>Content pillar</Eyebrow>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 10 }}>
          {PILLARS.map((pp) => <PillarCard key={pp.key} p={pp} on={pillar === pp.key} onClick={() => { setPillar(pp.key); resetBrief() }} />)}
        </div>
        {p && (
          <div style={{ marginTop: 14, padding: '11px 14px', borderRadius: 'var(--radius-md)', background: 'var(--surface-sunken)', display: 'flex', alignItems: 'center', gap: 10, fontSize: 12.5, color: 'var(--text-muted)' }}>
            <Icon name="GitBranch" size={15} color="var(--text-subtle)" />
            <span><b style={{ color: 'var(--text-strong)' }}>Structure</b> · {type === 'DESIGNED' ? structure.join(' → ') : type === 'TEXT_BASED' ? `${p.framework} framework` : `${p.sms} message`}</span>
          </div>
        )}
      </Panel>

      <Panel style={{ marginBottom: 16 }}>
        <Eyebrow style={{ marginBottom: 10 }}>What's this send about?</Eyebrow>
        <Textarea value={ask} onChange={(e) => setAsk(e.target.value)} rows={2} placeholder="e.g. The Huila single-origin is back in stock for the season" />
        <div style={{ marginTop: 12, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <div>
            <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-strong)', marginBottom: 6 }}>Offer <span style={{ color: 'var(--text-subtle)', fontWeight: 400 }}>· optional</span></div>
            <Input value={offer} onChange={(e) => setOffer(e.target.value)} placeholder="Free shipping over $40 · no code" prefix={<Icon name="Tag" size={14} color="var(--text-subtle)" />} />
          </div>
          <div>
            <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-strong)', marginBottom: 6 }}>Required language <span style={{ color: 'var(--text-subtle)', fontWeight: 400 }}>· optional</span></div>
            <Input value={reqLang} onChange={(e) => setReqLang(e.target.value)} placeholder="Exact phrase the copy must use" prefix={<Icon name="Quote" size={14} color="var(--text-subtle)" />} />
          </div>
        </div>
        <div style={{ marginTop: 12 }}>
          <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-strong)', marginBottom: 6 }}>Client specs / notes <span style={{ color: 'var(--text-subtle)', fontWeight: 400 }}>· optional</span></div>
          <Textarea value={clientNotes} onChange={(e) => setClientNotes(e.target.value)} rows={2} placeholder="Hard constraints to honor — e.g. no discounts this month, link to the gift guide, mention the new size" />
        </div>
        <div style={{ marginTop: 14, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10 }}>
          {!p ? <span style={{ fontSize: 12, color: 'var(--text-subtle)' }}>Pick a pillar to draft the brief.</span> : <span />}
          <Button variant="primary" onClick={draft} disabled={!p || busy} iconLeft={busy ? <Spinner size={16} color="#fff" /> : <Icon name="FileText" size={17} />}>
            {busy ? 'Drafting…' : brief ? 'Redraft brief' : 'Draft the brief'}
          </Button>
        </div>
      </Panel>

      {brief && (
        <Panel style={{ marginBottom: 16, animation: 'mfade 300ms var(--ease-out, ease) both' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 19, fontWeight: 500, color: 'var(--text-strong)' }}><FieldValue>{brief.title}</FieldValue></div>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10.5, color: 'var(--text-subtle)', padding: '3px 9px', borderRadius: 'var(--radius-pill)', border: '1px solid var(--border-subtle)' }}>{type}</span>
          </div>
          <BriefField label="Campaign Direction"><FieldValue>{brief.direction}</FieldValue></BriefField>
          <BriefField label="Product Focus"><FieldValue>{brief.productFocus}</FieldValue></BriefField>
          <BriefField label="Offer"><FieldValue>{brief.offer}</FieldValue></BriefField>
          {brief.requiredLanguage && <BriefField label="Required Language">{brief.requiredLanguage}</BriefField>}
          {brief.clientNotes && <BriefField label="Client Specs / Notes">{brief.clientNotes}</BriefField>}
          <BriefField label="Links" mono><FieldValue>{brief.links}</FieldValue></BriefField>
          <BriefField label={type === 'DESIGNED' ? 'Email Sections' : type === 'TEXT_BASED' ? 'Framework' : 'Message Type'}>
            {type === 'DESIGNED'
              ? <ol style={{ margin: 0, paddingLeft: 18 }}>{structure.map((s) => <li key={s} style={{ marginBottom: 2 }}>{s}</li>)}</ol>
              : structure[0]}
          </BriefField>
        </Panel>
      )}

      {brief && flags.length > 0 && (
        <Panel style={{ marginBottom: 16, border: '1px solid var(--ember-300, var(--border-default))', background: 'var(--accent-soft)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 9, marginBottom: 10 }}>
            <Icon name="AlertCircle" size={18} color="var(--ember-600)" />
            <span style={{ fontSize: 14.5, fontWeight: 600, color: 'var(--text-strong)' }}>Needs your input</span>
          </div>
          <p style={{ fontSize: 12.5, color: 'var(--text-muted)', margin: '0 0 12px' }}>
            Marlow won't invent these. Add the detail above and redraft, or accept and write with the gaps noted.
          </p>
          <ul style={{ margin: '0 0 14px', paddingLeft: 18 }}>
            {flags.map((f) => (
              <li key={f.label} style={{ fontSize: 13, color: 'var(--text-body)', marginBottom: 4 }}>
                <b style={{ color: 'var(--text-strong)' }}>{f.label}:</b> {f.what}
              </li>
            ))}
          </ul>
          <Button variant="secondary" onClick={() => setAccepted(true)} disabled={accepted} iconLeft={<Icon name={accepted ? 'Check' : 'PenLine'} size={15} />}>
            {accepted ? 'Accepted — writing with gaps noted' : 'Accept and write anyway'}
          </Button>
        </Panel>
      )}

      <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12 }}>
        <Button variant="ghost" onClick={onBack} iconLeft={<Icon name="ArrowLeft" size={16} />}>Brand</Button>
        <Button variant="primary" onClick={proceed} disabled={!brief || blocked} iconRight={<Icon name="ArrowRight" size={17} />}>Write the copy</Button>
      </div>
    </div>
  )
}
