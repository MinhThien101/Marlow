// Stage 2 — Brief. Pick a campaign type + content pillar (the structure locks),
// say what the send is about, and Marlow drafts a brief (guardrails, not copy).
import React from 'react'
import { Button, Input, Textarea, Spinner, Icon } from '../../ui/primitives.jsx'
import { Eyebrow, Panel, PILLARS, TYPES, pillarOf } from '../data.jsx'
import { draftBrief } from '../ai.js'
import { useStudioBrand } from '../brandContext.jsx'

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

export default function BriefStage({ campaign, setCampaign, onBack, onNext }) {
  const sb = useStudioBrand()
  const [type, setType] = React.useState(campaign.type || 'DESIGNED')
  const [pillar, setPillar] = React.useState(campaign.pillar || null)
  const [ask, setAsk] = React.useState(campaign.ask || '')
  const [offer, setOffer] = React.useState(campaign.offerInput || '')
  const [brief, setBrief] = React.useState(campaign.brief || null)
  const [busy, setBusy] = React.useState(false)

  const p = pillar ? pillarOf(pillar) : null
  const structure = p ? (type === 'DESIGNED' ? p.designed : type === 'TEXT_BASED' ? [p.framework] : [p.sms]) : []

  const draft = async () => {
    if (!p) return
    setBusy(true)
    const built = await draftBrief(sb, { type, pillar, ask, offer })
    setBrief(built)
    setBusy(false)
  }

  const proceed = () => {
    setCampaign((c) => ({ ...c, type, pillar, ask, offerInput: offer, brief, name: brief.title, copy: null, design: null }))
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
              <button key={t.value} onClick={() => { setType(t.value); setBrief(null) }}
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
          {PILLARS.map((pp) => <PillarCard key={pp.key} p={pp} on={pillar === pp.key} onClick={() => { setPillar(pp.key); setBrief(null) }} />)}
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
        <div style={{ marginTop: 12, display: 'grid', gridTemplateColumns: '1fr auto', gap: 10, alignItems: 'end' }}>
          <div>
            <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-strong)', marginBottom: 6 }}>Offer <span style={{ color: 'var(--text-subtle)', fontWeight: 400 }}>· optional</span></div>
            <Input value={offer} onChange={(e) => setOffer(e.target.value)} placeholder="Free shipping over $40 · no code" prefix={<Icon name="Tag" size={14} color="var(--text-subtle)" />} />
          </div>
          <Button variant="primary" onClick={draft} disabled={!p || busy} iconLeft={busy ? <Spinner size={16} color="#fff" /> : <Icon name="FileText" size={17} />}>
            {busy ? 'Drafting…' : brief ? 'Redraft brief' : 'Draft the brief'}
          </Button>
        </div>
        {!p && <div style={{ marginTop: 10, fontSize: 12, color: 'var(--text-subtle)' }}>Pick a pillar to draft the brief.</div>}
      </Panel>

      {brief && (
        <Panel style={{ marginBottom: 16, animation: 'mfade 300ms var(--ease-out, ease) both' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 19, fontWeight: 500, color: 'var(--text-strong)' }}>{brief.title}</div>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10.5, color: 'var(--text-subtle)', padding: '3px 9px', borderRadius: 'var(--radius-pill)', border: '1px solid var(--border-subtle)' }}>{type}</span>
          </div>
          <BriefField label="Campaign Direction">{brief.direction}</BriefField>
          <BriefField label="Product Focus">{brief.productFocus}</BriefField>
          <BriefField label="Offer">{brief.offer}</BriefField>
          <BriefField label="Links" mono>{brief.links}</BriefField>
          <BriefField label={type === 'DESIGNED' ? 'Email Sections' : type === 'TEXT_BASED' ? 'Framework' : 'Message Type'}>
            {type === 'DESIGNED'
              ? <ol style={{ margin: 0, paddingLeft: 18 }}>{structure.map((s) => <li key={s} style={{ marginBottom: 2 }}>{s}</li>)}</ol>
              : structure[0]}
          </BriefField>
        </Panel>
      )}

      <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12 }}>
        <Button variant="ghost" onClick={onBack} iconLeft={<Icon name="ArrowLeft" size={16} />}>Brand</Button>
        <Button variant="primary" onClick={proceed} disabled={!brief} iconRight={<Icon name="ArrowRight" size={17} />}>Write the copy</Button>
      </div>
    </div>
  )
}
