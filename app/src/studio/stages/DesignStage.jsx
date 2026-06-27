// Stage 4 — Design. Lay the approved copy out as a 600px on-brand email, with a
// tweak panel (accent, density, structure) and a simulated per-section regenerate.
import React from 'react'
import { Button, IconButton, SegmentedControl, Spinner, Icon } from '../../ui/primitives.jsx'
import { pillarOf } from '../data.jsx'
import { DesignedEmail, TextEmail, SmsEmail, Footer } from '../email.jsx'
import { designNotes } from '../ai.js'
import { useStudioBrand } from '../brandContext.jsx'

export default function DesignStage({ campaign, setCampaign, onBack, onDone }) {
  const sb = useStudioBrand()
  const T = sb.emailTheme
  const brief = campaign.brief
  const copy = { ...campaign.copy, _pillar: brief.pillar, _pillarLabel: pillarOf(brief.pillar).label }
  const ACCENTS = [T.accent, T.accent2, T.gold, T.ink]
  const [accent, setAccent] = React.useState(campaign.design?.accent || (brief.pillar === 'sales' ? T.accent2 : T.accent))
  const [density, setDensity] = React.useState(campaign.design?.density || 'standard')
  const [hoverSec, setHoverSec] = React.useState(null)
  const [regen, setRegen] = React.useState(null)
  const [exported, setExported] = React.useState(false)
  const [notes, setNotes] = React.useState(null)

  React.useEffect(() => {
    let live = true
    designNotes(brief, sb).then((n) => { if (live) setNotes(n) })
    return () => { live = false }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const EmailSection = ({ id, style, children }) => (
    <div onMouseEnter={() => setHoverSec(id)} onMouseLeave={() => setHoverSec(null)}
      style={{ position: 'relative', outline: hoverSec === id ? '2px solid var(--ember-500)' : '2px solid transparent', outlineOffset: -2, transition: 'outline-color 120ms', ...style }}>
      {hoverSec === id && id !== 'logo' && (
        <div style={{ position: 'absolute', top: 8, right: 8, display: 'flex', gap: 4, zIndex: 4 }}>
          <IconButton size="sm" variant="secondary" label="Regenerate" onClick={() => { setRegen(id); setTimeout(() => setRegen(null), 1000) }}><Icon name="RefreshCw" size={14} /></IconButton>
        </div>
      )}
      {regen === id && (
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(242,234,217,0.7)', backdropFilter: 'blur(2px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 5 }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontFamily: 'var(--font-mono)', fontSize: 11.5, color: T.ink }}><Spinner size={15} /> regenerating…</span>
        </div>
      )}
      {children}
    </div>
  )

  const finish = () => { setCampaign((c) => ({ ...c, design: { accent, density } })); setExported(true); setTimeout(() => onDone && onDone(), 1100) }

  return (
    <div style={{ display: 'flex', height: '100%', background: 'var(--surface-page)' }}>
      <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column' }}>
        <div style={{ flex: 1, overflow: 'auto', padding: '28px 24px', display: 'flex', justifyContent: 'center' }}>
          <div style={{ width: 600, maxWidth: '100%' }}>
            <div style={{ display: 'flex', gap: 10, marginBottom: 12, fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-subtle)' }}>
              <span style={{ fontWeight: 700 }}>SUBJ</span>
              <span style={{ color: 'var(--text-body)' }}>{copy.subject || brief.title}</span>
            </div>
            <div style={{ borderRadius: 'var(--radius-lg)', overflow: 'hidden', border: '1px solid var(--border-subtle)', boxShadow: 'var(--shadow-md)' }}>
              {brief.type === 'DESIGNED' && <DesignedEmail copy={copy} accent={accent} density={density} EmailSection={EmailSection} />}
              {brief.type === 'TEXT_BASED' && <TextEmail copy={copy} accent={accent} EmailSection={EmailSection} />}
              {brief.type === 'SMS' && <SmsEmail copy={copy} />}
              {brief.type !== 'SMS' && <Footer EmailSection={EmailSection} />}
            </div>
          </div>
        </div>
      </div>

      <aside style={{ width: 312, flex: 'none', borderLeft: '1px solid var(--border-subtle)', background: 'var(--surface-card)', display: 'flex', flexDirection: 'column' }}>
        <div style={{ flex: 'none', padding: '18px 20px 14px', borderBottom: '1px solid var(--border-subtle)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Icon name="SlidersHorizontal" size={17} color="var(--text-muted)" />
            <span style={{ fontFamily: 'var(--font-display)', fontSize: 17, fontWeight: 500, color: 'var(--text-strong)' }}>Tweak</span>
          </div>
          <p style={{ fontSize: 12, color: 'var(--text-subtle)', margin: '4px 0 0' }}>Adjust without starting over. Hover a section to regenerate it.</p>
        </div>
        <div style={{ flex: 1, overflow: 'auto', padding: '18px 20px' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 9, padding: '11px 12px', marginBottom: 18, borderRadius: 'var(--radius-md)', background: 'var(--surface-inverse)', color: 'var(--neutral-50)' }}>
            <Icon name="Sparkle" size={15} color="#F0A88E" style={{ marginTop: 1, flex: 'none' }} />
            <span style={{ fontSize: 12, lineHeight: 1.5 }}>{notes || 'Reading the copy…'}</span>
          </div>
          {brief.type !== 'SMS' && (
            <div style={{ marginBottom: 18 }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-strong)', marginBottom: 8 }}>Accent color</div>
              <div style={{ display: 'flex', gap: 9 }}>
                {ACCENTS.map((c, i) => (
                  <button key={c + i} onClick={() => setAccent(c)} style={{ width: 34, height: 34, borderRadius: 'var(--radius-sm)', background: c, cursor: 'pointer', border: accent === c ? '2px solid var(--text-strong)' : '1px solid rgba(0,0,0,0.1)', outline: accent === c ? '2px solid var(--surface-card)' : 'none', outlineOffset: -3 }} />
                ))}
              </div>
            </div>
          )}
          {brief.type === 'DESIGNED' && (
            <div style={{ marginBottom: 18 }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-strong)', marginBottom: 8 }}>Density</div>
              <SegmentedControl fullWidth value={density} onChange={setDensity} options={[{ value: 'standard', label: 'Standard' }, { value: 'roomy', label: 'Roomy' }]} />
            </div>
          )}
          <div style={{ marginBottom: 8 }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-strong)', marginBottom: 8 }}>Structure</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {(brief.type === 'DESIGNED' ? brief.structure : [brief.structure[0]]).map((s, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 9, padding: '8px 10px', borderRadius: 'var(--radius-sm)', background: 'var(--surface-sunken)', fontSize: 12.5, color: 'var(--text-muted)' }}>
                  <Icon name="GripVertical" size={14} color="var(--text-subtle)" /> {s}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div style={{ flex: 'none', padding: 16, borderTop: '1px solid var(--border-subtle)' }}>
          <Button variant="primary" size="lg" fullWidth onClick={finish} iconLeft={<Icon name={exported ? 'Check' : 'Copy'} size={18} />}>
            {exported ? 'Copied. Looks ready to send.' : 'Export email'}
          </Button>
          <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
            <button onClick={onBack} style={{ flex: 1, padding: '8px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-default)', background: 'transparent', color: 'var(--text-muted)', fontFamily: 'var(--font-sans)', fontSize: 12.5, fontWeight: 500, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}><Icon name="ArrowLeft" size={14} /> Copy</button>
            <button style={{ flex: 1, padding: '8px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-default)', background: 'transparent', color: 'var(--text-muted)', fontFamily: 'var(--font-sans)', fontSize: 12.5, fontWeight: 500, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}><Icon name="CodeXml" size={14} /> HTML</button>
          </div>
        </div>
      </aside>
    </div>
  )
}
