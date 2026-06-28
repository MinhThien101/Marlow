// Stage 3 — Copy. Chat to draft and refine the email copy (no design yet).
// Auto-posts a first draft on mount, then revises on each instruction.
import React from 'react'
import { Button, Icon } from '../../ui/primitives.jsx'
import { PillarChip } from '../data.jsx'
import { generateCopy, briefSig } from '../ai.js'
import { useStudioBrand } from '../brandContext.jsx'

const CopyPreview = ({ copy, type }) => {
  if (!copy) return null
  if (type === 'SMS') {
    return (
      <div style={{ border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)', overflow: 'hidden', background: 'var(--surface-card)' }}>
        <div style={{ padding: '10px 14px', borderBottom: '1px solid var(--border-subtle)', background: 'var(--surface-sunken)', fontFamily: 'var(--font-mono)', fontSize: 10.5, color: 'var(--text-subtle)', letterSpacing: '0.04em' }}>SMS · {(copy.message || '').length}/160 CHARS</div>
        <div style={{ padding: 16 }}>
          <div style={{ maxWidth: '85%', padding: '11px 14px', borderRadius: 16, borderBottomLeftRadius: 5, background: 'var(--surface-sunken)', fontSize: 14, lineHeight: 1.45, color: 'var(--text-body)' }}>{copy.message}</div>
        </div>
      </div>
    )
  }
  return (
    <div style={{ border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)', overflow: 'hidden', background: 'var(--surface-card)' }}>
      <div style={{ padding: '12px 14px', borderBottom: '1px solid var(--border-subtle)', background: 'var(--surface-sunken)' }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-subtle)', letterSpacing: '0.05em', marginBottom: 4 }}>SUBJECT</div>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: 16, fontWeight: 500, color: 'var(--text-strong)', lineHeight: 1.25 }}>{copy.subject}</div>
        {copy.preview && <div style={{ fontSize: 12.5, color: 'var(--text-muted)', marginTop: 5 }}>{copy.preview}</div>}
      </div>
      <div style={{ padding: 14 }}>
        {type === 'TEXT_BASED'
          ? <div style={{ fontSize: 13.5, lineHeight: 1.62, color: 'var(--text-body)', whiteSpace: 'pre-wrap' }}>{copy.body}</div>
          : (copy.sections || []).map((s, i) => (
            <div key={i} style={{ padding: '9px 0', borderTop: i ? '1px dashed var(--border-subtle)' : 'none' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9.5, color: 'var(--text-subtle)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 5 }}>{s.label}</div>
              {s.headline && <div style={{ fontFamily: 'var(--font-display)', fontSize: 15, fontWeight: 500, color: 'var(--text-strong)', marginBottom: 4, lineHeight: 1.25 }}>{s.headline}</div>}
              {s.body && <div style={{ fontSize: 13, lineHeight: 1.55, color: 'var(--text-body)', whiteSpace: 'pre-wrap' }}>{s.body}</div>}
              {s.cta && <div style={{ display: 'inline-block', marginTop: 8, fontSize: 12.5, fontWeight: 600, color: 'var(--accent-text)' }}>[ {s.cta} ]</div>}
            </div>
          ))}
      </div>
    </div>
  )
}

// Surfaces the copy self-review (the six lenses + anti-AI scan from ai.js).
// Green dot = the lens is clean; ember dot = the founder should look. "Worth a
// look" lists anything flagged, e.g. an unresolved [missing: ...] gap.
const LENSES = [['brief', 'Brief'], ['facts', 'Facts'], ['type', 'Type'], ['voice', 'Voice'], ['format', 'Format'], ['language', 'Language']]
const ReviewPanel = ({ review }) => {
  if (!review || !review.checks) return null
  const { checks, flags = [] } = review
  return (
    <div style={{ marginTop: 10, border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)', background: 'var(--surface-sunken)', padding: '10px 12px' }}>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9.5, letterSpacing: '0.05em', color: 'var(--text-subtle)', marginBottom: 8 }}>SELF-REVIEW</div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
        {LENSES.map(([k, label]) => {
          const ok = checks[k] !== false
          return (
            <span key={k} style={{ display: 'inline-flex', alignItems: 'center', gap: 5, padding: '3px 8px', borderRadius: 'var(--radius-pill)', fontSize: 11, fontWeight: 600, background: 'var(--surface-card)', border: '1px solid var(--border-subtle)', color: ok ? 'var(--text-muted)' : 'var(--ember-600)' }}>
              <span style={{ width: 7, height: 7, borderRadius: '50%', background: ok ? '#3f9d6b' : 'var(--ember-500)' }} />{label}
            </span>
          )
        })}
      </div>
      {flags.length > 0 && (
        <div style={{ marginTop: 9 }}>
          <div style={{ fontSize: 11.5, fontWeight: 700, color: 'var(--text-strong)', marginBottom: 4 }}>Worth a look</div>
          {flags.map((f, i) => (
            <div key={i} style={{ display: 'flex', gap: 6, fontSize: 12, lineHeight: 1.45, color: 'var(--text-muted)', marginBottom: 3 }}>
              <span style={{ color: 'var(--ember-500)', flex: 'none' }}>&bull;</span><span>{f}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

const QUICK = ['Make it warmer', 'Shorter', 'More specific', 'Try a different subject', 'Less salesy']

export default function CopyStage({ campaign, setCampaign, onBack, onNext, copyStale = false }) {
  const sb = useStudioBrand()
  const brief = campaign.brief
  const [msgs, setMsgs] = React.useState([])
  const [input, setInput] = React.useState('')
  const [typing, setTyping] = React.useState(false)
  const [copy, setCopy] = React.useState(campaign.copy || null)
  const [staleOpen, setStaleOpen] = React.useState(false)
  const scrollRef = React.useRef(null)
  const started = React.useRef(false)

  // Surface the stale banner when the brief changed under an existing draft.
  React.useEffect(() => { if (copyStale) setStaleOpen(true) }, [copyStale])

  const regenerateFromBrief = () => {
    if (typing) return
    setStaleOpen(false)
    setMsgs((m) => [...m, { from: 'marlow', text: 'The brief changed, so I rewrote the copy to match it.' }])
    setTyping(true)
    generateCopy(brief, undefined, sb).then((c) => {
      setCopy(c)
      setMsgs((m) => [...m, { from: 'marlow', text: 'Rewritten from the updated brief.', copy: c }])
      setTyping(false)
    })
  }

  React.useEffect(() => { if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight }, [msgs, typing])

  // First draft on mount
  React.useEffect(() => {
    if (started.current || campaign.copy) { if (campaign.copy && !copy) setCopy(campaign.copy); return }
    started.current = true
    setMsgs([{ from: 'marlow', text: `Drafting the copy for "${brief.title}" — ${brief.type === 'DESIGNED' ? brief.structure.length + ' sections' : brief.type === 'TEXT_BASED' ? brief.structure[0] : 'one SMS'}, in ${sb.short}'s voice.` }])
    setTyping(true)
    generateCopy(brief, undefined, sb).then((c) => {
      setCopy(c)
      setMsgs((m) => [...m, { from: 'marlow', text: "Here's a first pass. Read it, then tell me what to change — tone, length, the subject, any line.", copy: c }])
      setTyping(false)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const send = (text) => {
    if (typing || !text.trim()) return
    setMsgs((m) => [...m, { from: 'you', text }])
    setInput('')
    setTyping(true)
    generateCopy(brief, text, sb).then((c) => {
      setCopy(c)
      setMsgs((m) => [...m, { from: 'marlow', text: 'Updated.', copy: c }])
      setTyping(false)
    })
  }

  // Non-destructive forward: record which brief this copy was built from (so a
  // later brief edit flags it stale) and keep any downstream design.
  const proceed = () => { setCampaign((c) => ({ ...c, copy, copyBriefSig: briefSig(brief) })); onNext() }

  const Bubble = ({ m }) => {
    const mine = m.from === 'you'
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: mine ? 'flex-end' : 'flex-start', animation: 'mfade 240ms var(--ease-out, ease) both' }}>
        {!mine && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 6 }}>
            <span style={{ width: 20, height: 20, borderRadius: 'var(--radius-sm)', background: 'var(--ember-500)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Icon name="Sparkle" size={12} color="#fff" /></span>
            <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-strong)' }}>Marlow</span>
          </div>
        )}
        <div style={{ maxWidth: '92%', padding: '11px 14px', borderRadius: 14, borderTopRightRadius: mine ? 4 : 14, borderTopLeftRadius: mine ? 14 : 4, background: mine ? 'var(--surface-inverse)' : 'var(--surface-card)', color: mine ? 'var(--neutral-50)' : 'var(--text-body)', border: mine ? 'none' : '1px solid var(--border-subtle)', boxShadow: mine ? 'none' : 'var(--shadow-sm)', fontSize: 14, lineHeight: 1.5 }}>
          {m.text}
          {m.copy && <div style={{ marginTop: 11 }}><CopyPreview copy={m.copy} type={brief.type} /><ReviewPanel review={m.copy.review} /></div>}
        </div>
      </div>
    )
  }

  return (
    <div style={{ maxWidth: 720, margin: '0 auto', display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div style={{ flex: 'none', display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14, padding: '8px 12px', borderRadius: 'var(--radius-md)', background: 'var(--surface-sunken)', border: '1px solid var(--border-subtle)' }}>
        <PillarChip pk={brief.pillar} />
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-subtle)' }}>{brief.type}</span>
        <span style={{ flex: 1, fontSize: 12.5, color: 'var(--text-muted)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{brief.direction}</span>
      </div>

      {staleOpen && (
        <div style={{ flex: 'none', display: 'flex', alignItems: 'center', gap: 10, padding: '11px 14px', marginBottom: 12, borderRadius: 'var(--radius-md)', background: 'var(--warning-bg, var(--accent-soft))', border: '1px solid var(--warning, var(--border-default))' }}>
          <Icon name="AlertCircle" size={18} color="var(--warning, var(--ember-600))" />
          <span style={{ flex: 1, fontSize: 13, color: 'var(--text-strong)' }}>The brief changed since this copy was written.</span>
          <Button variant="secondary" size="sm" onClick={() => setStaleOpen(false)}>Keep current</Button>
          <Button variant="primary" size="sm" onClick={regenerateFromBrief} iconLeft={<Icon name="RefreshCw" size={14} />}>Regenerate</Button>
        </div>
      )}

      <div ref={scrollRef} style={{ flex: 1, overflow: 'auto', display: 'flex', flexDirection: 'column', gap: 18, paddingBottom: 8 }}>
        {msgs.map((m, i) => <Bubble key={i} m={m} />)}
        {typing && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 7, color: 'var(--text-subtle)', fontSize: 13 }}>
            <span style={{ width: 20, height: 20, borderRadius: 'var(--radius-sm)', background: 'var(--ember-500)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Icon name="Sparkle" size={12} color="#fff" /></span>
            Marlow is writing…
          </div>
        )}
      </div>

      <div style={{ flex: 'none', paddingTop: 14 }}>
        {copy && !typing && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 14px', marginBottom: 12, borderRadius: 'var(--radius-md)', background: 'var(--accent-soft)', border: '1px solid var(--border-default)' }}>
            <Icon name="Check" size={18} color="var(--ember-600)" />
            <span style={{ flex: 1, fontSize: 13.5, color: 'var(--text-strong)' }}>Happy with the words? Marlow lays them out next.</span>
            <Button variant="primary" onClick={proceed} iconRight={<Icon name="ArrowRight" size={17} />}>Design it</Button>
          </div>
        )}
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 10 }}>
          {QUICK.map((q) => (
            <button key={q} onClick={() => send(q)} disabled={typing} style={{ padding: '6px 12px', borderRadius: 'var(--radius-pill)', border: '1px solid var(--border-default)', background: 'var(--surface-card)', color: 'var(--text-muted)', fontFamily: 'var(--font-sans)', fontSize: 12.5, fontWeight: 500, cursor: typing ? 'default' : 'pointer', opacity: typing ? 0.5 : 1 }}>{q}</button>
          ))}
        </div>
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 10, padding: 8, borderRadius: 'var(--radius-md)', border: '1px solid var(--border-default)', background: 'var(--surface-card)', boxShadow: 'var(--shadow-sm)' }}>
          <textarea value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(input) } }}
            placeholder="Tell Marlow what to change…" rows={1}
            style={{ flex: 1, resize: 'none', border: 'none', outline: 'none', background: 'transparent', fontFamily: 'var(--font-sans)', fontSize: 14, lineHeight: 1.5, color: 'var(--text-body)', padding: '6px', maxHeight: 120 }} />
          <button onClick={() => onBack()} title="Back to brief" style={{ flex: 'none', width: 38, height: 38, borderRadius: 'var(--radius-md)', border: '1px solid var(--border-default)', background: 'var(--surface-card)', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
            <Icon name="ArrowLeft" size={18} />
          </button>
          <button onClick={() => send(input)} disabled={typing} style={{ flex: 'none', width: 38, height: 38, borderRadius: 'var(--radius-md)', border: 'none', background: 'var(--ember-500)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: typing ? 'default' : 'pointer', boxShadow: 'var(--shadow-ember)' }}>
            <Icon name="ArrowUp" size={19} color="#fff" stroke={2.2} />
          </button>
        </div>
      </div>
    </div>
  )
}
