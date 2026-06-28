// Stage 2 — Brief. Pick a campaign type + content pillar (the structure locks),
// say what the send is about, and Marlow drafts a brief (guardrails, not copy).
import React from 'react'
import { Button, Input, Textarea, Spinner, Icon } from '../../ui/primitives.jsx'
import { Eyebrow, Panel, PILLARS, TYPES, pillarOf, CANONICAL_SECTIONS, FRAMEWORKS, MESSAGE_TYPES } from '../data.jsx'
import { draftBrief, suggestSends, refineBrief } from '../ai.js'
import { useStudioBrand } from '../brandContext.jsx'
import ChangeBar from '../ChangeBar.jsx'

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

// A pickable suggested send — pillar + type tag, a specific title, and the angle
// that becomes the "what's this about" line.
const SuggestionCard = ({ s, disabled, onClick }) => {
  const p = pillarOf(s.pillar)
  const [hover, setHover] = React.useState(false)
  return (
    <button onClick={onClick} disabled={disabled} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{ textAlign: 'left', cursor: disabled ? 'default' : 'pointer', opacity: disabled ? 0.6 : 1, padding: 14, borderRadius: 'var(--radius-md)', border: '1px solid ' + (hover && !disabled ? 'var(--border-ember, var(--ember-500))' : 'var(--border-subtle)'), background: 'var(--surface-card)', boxShadow: hover && !disabled ? 'var(--shadow-md)' : 'var(--shadow-sm)', display: 'flex', flexDirection: 'column', gap: 7, transition: 'border-color 120ms, box-shadow 120ms' }}>
      <span style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
        <span style={{ width: 26, height: 26, flex: 'none', borderRadius: 'var(--radius-sm)', background: 'var(--surface-sunken)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Icon name={p.icon} size={14} color="var(--ember-600)" /></span>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.04em', color: 'var(--text-subtle)', textTransform: 'uppercase' }}>{p.label} · {s.type}</span>
      </span>
      <span style={{ fontFamily: 'var(--font-display)', fontSize: 15, fontWeight: 500, color: 'var(--text-strong)', lineHeight: 1.25 }}>{s.title}</span>
      <span style={{ fontSize: 12.5, lineHeight: 1.45, color: 'var(--text-muted)' }}>{s.angle}</span>
    </button>
  )
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

const selectStyle = {
  width: '100%', padding: '9px 11px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-default)',
  background: 'var(--surface-card)', color: 'var(--text-body)', fontFamily: 'var(--font-sans)', fontSize: 13.5, cursor: 'pointer',
}
const rowBtn = (disabled) => ({
  width: 28, height: 28, flex: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center',
  borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)', background: 'var(--surface-card)',
  color: 'var(--text-muted)', cursor: disabled ? 'default' : 'pointer', opacity: disabled ? 0.4 : 1,
})

// The AI selects the section stack from the campaign job; the founder can edit,
// reorder, add, or remove sections before locking the brief. Hero Section is
// pinned first and the stack is capped at 4 (brief-structure-selection.md).
function StructureEditor({ type, structure, onChange }) {
  if (type !== 'DESIGNED') {
    const options = type === 'TEXT_BASED' ? FRAMEWORKS : MESSAGE_TYPES
    const cur = structure[0] || options[0]
    const opts = options.includes(cur) ? options : [cur, ...options]
    return (
      <select value={cur} onChange={(e) => onChange([e.target.value])} style={{ ...selectStyle, maxWidth: 320 }}>
        {opts.map((o) => <option key={o} value={o}>{o}</option>)}
      </select>
    )
  }
  const move = (i, dir) => {
    const j = i + dir
    if (j < 1 || j >= structure.length) return // Hero Section stays pinned at index 0
    const next = structure.slice()
    ;[next[i], next[j]] = [next[j], next[i]]
    onChange(next)
  }
  const remove = (i) => { if (i === 0) return; onChange(structure.filter((_, k) => k !== i)) }
  const add = (label) => { if (!label || structure.length >= 4 || structure.includes(label)) return; onChange([...structure, label]) }
  const available = CANONICAL_SECTIONS.filter((s) => s !== 'Hero Section' && !structure.includes(s))
  return (
    <div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        {structure.map((s, i) => (
          <div key={s + i} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '7px 9px', borderRadius: 'var(--radius-sm)', background: 'var(--surface-sunken)', border: '1px solid var(--border-subtle)' }}>
            <Icon name="GripVertical" size={14} color="var(--text-subtle)" />
            <span style={{ flex: 1, fontSize: 13, color: 'var(--text-strong)' }}>{s}</span>
            {i === 0 ? (
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9.5, letterSpacing: '0.05em', textTransform: 'uppercase', color: 'var(--text-subtle)', padding: '2px 7px', borderRadius: 'var(--radius-pill)', border: '1px solid var(--border-subtle)' }}>Pinned</span>
            ) : (
              <span style={{ display: 'flex', gap: 4 }}>
                <button title="Move up" onClick={() => move(i, -1)} disabled={i <= 1} style={rowBtn(i <= 1)}><Icon name="ArrowUp" size={14} /></button>
                <button title="Move down" onClick={() => move(i, 1)} disabled={i >= structure.length - 1} style={rowBtn(i >= structure.length - 1)}><Icon name="ArrowDown" size={14} /></button>
                <button title="Remove" onClick={() => remove(i)} style={rowBtn(false)}><Icon name="X" size={14} /></button>
              </span>
            )}
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 10 }}>
        {structure.length < 4 && available.length > 0 && (
          <select value="" onChange={(e) => add(e.target.value)} style={{ ...selectStyle, maxWidth: 260 }}>
            <option value="" disabled>+ Add a section…</option>
            {available.map((o) => <option key={o} value={o}>{o}</option>)}
          </select>
        )}
        <span style={{ fontSize: 11.5, color: 'var(--text-subtle)' }}>Hero leads · 2-4 sections · {structure.length}/4</span>
      </div>
    </div>
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
  // Suggested sends: only for a fresh brief (skip when reopening a saved campaign).
  const [suggestions, setSuggestions] = React.useState(null)
  const [loadingSug, setLoadingSug] = React.useState(!campaign.brief)

  React.useEffect(() => {
    if (campaign.brief) return
    let live = true
    suggestSends(sb)
      .then((s) => { if (live) setSuggestions(s) })
      .catch(() => { if (live) setSuggestions([]) })
      .finally(() => { if (live) setLoadingSug(false) })
    return () => { live = false }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const p = pillar ? pillarOf(pillar) : null
  const structure = p ? (type === 'DESIGNED' ? p.designed : type === 'TEXT_BASED' ? [p.framework] : [p.sms]) : []
  const flags = missingFlags(brief)
  const blocked = flags.length > 0 && !accepted

  const resetBrief = () => { setBrief(null); setAccepted(false) }

  // Draft the brief from current state, with optional overrides so a picked
  // suggestion can draft immediately (before its setState has flushed).
  const runDraft = async (over = {}) => {
    const args = { type, pillar, ask, offer, requiredLanguage: reqLang, clientNotes, ...over }
    if (!args.pillar) return
    setBusy(true); setAccepted(false)
    const built = await draftBrief(sb, args)
    setBrief(built)
    setBusy(false)
  }

  const draft = () => runDraft()

  // Picking a suggestion pre-fills type/pillar/ask, then drafts the brief so the
  // user lands in an editable brief. The manual path below stays fully available.
  const pickSuggestion = (s) => {
    setType(s.type); setPillar(s.pillar); setAsk(s.angle)
    resetBrief()
    runDraft({ type: s.type, pillar: s.pillar, ask: s.angle })
  }

  // Conversational edit: apply a plain-language change to the drafted brief.
  const changeBrief = async (text) => {
    if (!brief) return
    setBusy(true)
    const next = await refineBrief(sb, brief, text)
    setBrief(next)
    setBusy(false)
  }

  const proceed = () => {
    const safeName = brief.title && !MISSING_RE.test(brief.title) ? brief.title : (ask.trim() || 'New campaign')
    // Non-destructive: keep any downstream copy/design. If this brief changed,
    // they are flagged stale (in FlowShell) and offered for regeneration, not wiped.
    setCampaign((c) => ({ ...c, type, pillar, ask, offerInput: offer, reqLangInput: reqLang, clientNotesInput: clientNotes, brief, name: safeName }))
    onNext()
  }

  return (
    <div style={{ maxWidth: 760, margin: '0 auto', animation: 'mfade 280ms var(--ease-out, ease) both' }}>
      {!brief && (loadingSug || (suggestions && suggestions.length > 0)) && (
        <>
          <Panel style={{ marginBottom: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
              <Icon name="Sparkles" size={16} color="var(--ember-600)" />
              <Eyebrow>Suggested sends for {sb.short}</Eyebrow>
            </div>
            <p style={{ fontSize: 12.5, color: 'var(--text-muted)', margin: '0 0 14px' }}>Pick one to start a brief you can tweak. Built from your products and voice.</p>
            {loadingSug ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '18px 0', color: 'var(--text-subtle)', fontSize: 13 }}>
                <Spinner size={16} /> Reading {sb.short} for ideas…
              </div>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                {suggestions.map((s, i) => <SuggestionCard key={i} s={s} disabled={busy} onClick={() => pickSuggestion(s)} />)}
              </div>
            )}
          </Panel>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, margin: '0 0 16px' }}>
            <div style={{ flex: 1, height: 1, background: 'var(--border-subtle)' }} />
            <span style={{ fontSize: 12, color: 'var(--text-subtle)' }}>or start from scratch</span>
            <div style={{ flex: 1, height: 1, background: 'var(--border-subtle)' }} />
          </div>
        </>
      )}

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
            <span><b style={{ color: 'var(--text-strong)' }}>Starting point</b> · {type === 'DESIGNED' ? structure.join(' → ') : type === 'TEXT_BASED' ? `${p.framework} framework` : `${p.sms} message`} <span style={{ color: 'var(--text-subtle)' }}>· Marlow selects the final structure from the campaign when you draft</span></span>
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
          <Textarea value={clientNotes} onChange={(e) => setClientNotes(e.target.value)} rows={2} placeholder="Hard constraints to honor, e.g. no discounts this month, link to the gift guide, mention the new size" />
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
            <StructureEditor type={type} structure={brief.structure || []} onChange={(next) => setBrief((b) => ({ ...b, structure: next }))} />
          </BriefField>
          <div style={{ marginTop: 16, paddingTop: 16, borderTop: '1px solid var(--border-subtle)' }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-strong)', marginBottom: 8 }}>Tell Marlow what to change</div>
            <ChangeBar placeholder="e.g. tighten the direction, lead with the offer, swap the product…" onSubmit={changeBrief} busy={busy}
              suggestions={['Tighten it', 'More specific', 'Different angle']} />
          </div>
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
            {accepted ? 'Accepted, writing with gaps noted' : 'Accept and write anyway'}
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
