// A compact "tell Marlow what to change" input shared across the flow stages.
// Plain-language edits route to the stage's own AI action (refine the brief,
// reword the copy, restyle the design). This is the "talk to it" affordance the
// flow exposes everywhere, not another form to refill.
import React from 'react'
import { Icon, Spinner } from '../ui/primitives.jsx'

export default function ChangeBar({ placeholder = 'Tell Marlow what to change…', onSubmit, busy = false, suggestions = [], style }) {
  const [text, setText] = React.useState('')
  const submit = (t) => {
    const v = (t ?? text).trim()
    if (!v || busy) return
    setText('')
    onSubmit(v)
  }
  return (
    <div style={style}>
      {suggestions.length > 0 && (
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 10 }}>
          {suggestions.map((q) => (
            <button key={q} onClick={() => submit(q)} disabled={busy}
              style={{ padding: '6px 12px', borderRadius: 'var(--radius-pill)', border: '1px solid var(--border-default)', background: 'var(--surface-card)', color: 'var(--text-muted)', fontFamily: 'var(--font-sans)', fontSize: 12.5, fontWeight: 500, cursor: busy ? 'default' : 'pointer', opacity: busy ? 0.5 : 1 }}>{q}</button>
          ))}
        </div>
      )}
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: 10, padding: 8, borderRadius: 'var(--radius-md)', border: '1px solid var(--border-default)', background: 'var(--surface-card)', boxShadow: 'var(--shadow-sm)' }}>
        <textarea value={text} onChange={(e) => setText(e.target.value)} disabled={busy}
          onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); submit() } }}
          placeholder={placeholder} rows={1}
          style={{ flex: 1, resize: 'none', border: 'none', outline: 'none', background: 'transparent', fontFamily: 'var(--font-sans)', fontSize: 14, lineHeight: 1.5, color: 'var(--text-body)', padding: '6px', maxHeight: 120 }} />
        <button onClick={() => submit()} disabled={busy} title="Send"
          style={{ flex: 'none', width: 38, height: 38, borderRadius: 'var(--radius-md)', border: 'none', background: 'var(--ember-500)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: busy ? 'default' : 'pointer', boxShadow: 'var(--shadow-ember)' }}>
          {busy ? <Spinner size={18} color="#fff" /> : <Icon name="ArrowUp" size={19} color="#fff" stroke={2.2} />}
        </button>
      </div>
    </div>
  )
}
