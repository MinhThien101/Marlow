// Stage 4 — Design. For DESIGNED sends Marlow generates a real, responsive,
// email-safe HTML email (Opus -> MJML -> compiled HTML via /api/design-email)
// and previews it in an iframe. Accent and density re-influence generation, and
// per-section regenerate re-calls the model for one section. TEXT_BASED stays the
// simple founder-letter layout and SMS the phone preview (the existing React
// renderers, which also serve as the offline fallback for DESIGNED). Export emits
// the compiled, Klaviyo-ready HTML (clipboard + download).
import React from 'react'
import { Button, IconButton, SegmentedControl, Spinner, Icon } from '../../ui/primitives.jsx'
import { pillarOf } from '../data.jsx'
import { DesignedEmail, TextEmail, SmsEmail, Footer } from '../email.jsx'
import { designNotes, reviewDesign, designEmail, regenerateSection, copySig } from '../ai.js'
import { textEmailHtml } from '../exportHtml.js'
import { useStudioBrand } from '../brandContext.jsx'
import ChangeBar from '../ChangeBar.jsx'

const DESIGN_LENSES = [['canvas', 'Canvas'], ['palette', 'Palette'], ['type', 'Type'], ['cta', 'CTAs'], ['imagery', 'Imagery'], ['footer', 'Footer']]
const DesignReview = ({ review }) => {
  if (!review || !review.checks) return null
  const { checks, flags = [] } = review
  return (
    <div style={{ marginBottom: 18, border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)', background: 'var(--surface-sunken)', padding: '10px 12px' }}>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9.5, letterSpacing: '0.05em', color: 'var(--text-subtle)', marginBottom: 8 }}>DESIGN CHECK</div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
        {DESIGN_LENSES.map(([k, label]) => {
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

// In the offline/fallback React render there is no per-section regenerate, so the
// section wrapper is a plain passthrough.
const PlainSection = ({ style, children }) => <div style={style}>{children}</div>

export default function DesignStage({ campaign, setCampaign, onBack, onDone, designStale = false }) {
  const sb = useStudioBrand()
  const T = sb.emailTheme
  const brief = campaign.brief
  const isDesigned = brief.type === 'DESIGNED'
  // Lay out the approved copy and self-review it against the design anti-patterns.
  const { designCopy, review } = React.useMemo(() => {
    const base = { ...campaign.copy, _pillar: brief.pillar, _pillarLabel: pillarOf(brief.pillar).label }
    return reviewDesign(base, brief, sb)
  }, [campaign.copy, brief, sb])
  const copy = designCopy
  const ACCENTS = [T.accent, T.accent2, T.gold, T.ink]
  const [accent, setAccent] = React.useState(campaign.design?.accent || (brief.pillar === 'sales' ? T.accent2 : T.accent))
  const [density, setDensity] = React.useState(campaign.design?.density || 'standard')
  const [exported, setExported] = React.useState(false)
  const [notes, setNotes] = React.useState(null)

  // --- real generation (DESIGNED only) ---
  const [genHtml, setGenHtml] = React.useState(campaign.design?.html || null)
  const [genSections, setGenSections] = React.useState(campaign.design?.sections || null)
  const [generating, setGenerating] = React.useState(false)
  const [genFailed, setGenFailed] = React.useState(false)
  const [regenIdx, setRegenIdx] = React.useState(null)
  const [staleOpen, setStaleOpen] = React.useState(false)
  const [iframeH, setIframeH] = React.useState(900)
  const didInit = React.useRef(false)

  React.useEffect(() => { if (designStale) setStaleOpen(true) }, [designStale])

  React.useEffect(() => {
    let live = true
    designNotes(brief, sb).then((n) => { if (live) setNotes(n) }).catch(() => {})
    return () => { live = false }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const runGenerate = React.useCallback((instruction) => {
    let live = true
    setGenerating(true); setGenFailed(false)
    designEmail({ sb, brief, copy, accent, density, instruction }).then((r) => {
      if (!live) return
      if (r) { setGenHtml(r.html); setGenSections(r.sections) } else setGenFailed(true)
      setGenerating(false)
    })
    return () => { live = false }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sb, brief, copy, accent, density])

  // Generate on first entry (unless a saved design is already attached), and
  // regenerate whenever accent or density changes so the tweaks really re-design.
  React.useEffect(() => {
    if (!isDesigned) return
    if (!didInit.current) { didInit.current = true; if (genHtml) return }
    return runGenerate()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accent, density])

  const regenSection = (i) => {
    if (generating || regenIdx != null || !genSections) return
    setRegenIdx(i)
    regenerateSection({ sb, brief, copy, accent, density, sections: genSections, index: i }).then((r) => {
      if (r) { setGenHtml(r.html); setGenSections(r.sections) }
      setRegenIdx(null)
    })
  }
  const changeDesign = (text) => { if (!generating) runGenerate(text) }
  const regenerateFromCopy = () => { setStaleOpen(false); runGenerate() }

  const fitIframe = (e) => {
    try { const d = e.target.contentDocument; if (d && d.body) setIframeH(Math.max(420, d.body.scrollHeight + 24)) } catch {}
  }

  // --- export ---
  const exportHtml = isDesigned ? genHtml : (brief.type === 'TEXT_BASED' ? textEmailHtml(copy, sb, accent) : null)
  const exportPayload = brief.type === 'SMS' ? (copy.message || '') : exportHtml
  const canExport = !!exportPayload && !(isDesigned && (generating || !genHtml))

  const finish = async () => {
    if (!canExport) return
    try { await navigator.clipboard.writeText(exportPayload) } catch {}
    setCampaign((c) => ({
      ...c,
      design: { accent, density, html: exportHtml || null, sections: isDesigned ? genSections : null },
      designCopySig: copySig(campaign.copy),
    }))
    setExported(true)
  }

  const downloadHtml = () => {
    if (!exportHtml) return
    const blob = new Blob([exportHtml], { type: 'text/html;charset=utf-8' })
    const a = document.createElement('a')
    a.href = URL.createObjectURL(blob)
    a.download = `${(campaign.name || 'email').replace(/[^a-z0-9]+/gi, '-').replace(/^-|-$/g, '').toLowerCase() || 'email'}.html`
    document.body.appendChild(a); a.click(); document.body.removeChild(a)
    setTimeout(() => URL.revokeObjectURL(a.href), 1000)
  }

  // --- preview ---
  let preview
  if (isDesigned) {
    if (genHtml && !genFailed) {
      preview = <iframe title="Email preview" srcDoc={genHtml} onLoad={fitIframe} style={{ width: '100%', height: iframeH, border: 'none', display: 'block', background: '#fff' }} />
    } else if (generating) {
      preview = (
        <div style={{ padding: '90px 20px', textAlign: 'center', background: 'var(--surface-card)' }}>
          <Spinner size={22} />
          <div style={{ marginTop: 12, fontSize: 13.5, color: 'var(--text-muted)' }}>Designing your email…</div>
        </div>
      )
    } else {
      preview = <React.Fragment><DesignedEmail copy={copy} accent={accent} density={density} EmailSection={PlainSection} /><Footer EmailSection={PlainSection} /></React.Fragment>
    }
  } else if (brief.type === 'TEXT_BASED') {
    preview = <React.Fragment><TextEmail copy={copy} accent={accent} EmailSection={PlainSection} /><Footer EmailSection={PlainSection} /></React.Fragment>
  } else {
    preview = <SmsEmail copy={copy} />
  }

  const sectionRows = isDesigned && genSections && genSections.length
    ? genSections.map((s) => ({ label: s.label }))
    : (isDesigned ? brief.structure : [brief.structure[0]]).map((l) => ({ label: l }))

  return (
    <div style={{ display: 'flex', height: '100%', background: 'var(--surface-page)' }}>
      <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column' }}>
        <div style={{ flex: 1, overflow: 'auto', padding: '28px 24px', display: 'flex', justifyContent: 'center' }}>
          <div style={{ width: 600, maxWidth: '100%' }}>
            <div style={{ display: 'flex', gap: 10, marginBottom: 12, fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-subtle)' }}>
              <span style={{ fontWeight: 700 }}>SUBJ</span>
              <span style={{ color: 'var(--text-body)' }}>{copy.subject || brief.title}</span>
            </div>
            <div style={{ position: 'relative', borderRadius: 'var(--radius-lg)', overflow: 'hidden', border: '1px solid var(--border-subtle)', boxShadow: 'var(--shadow-md)', background: '#fff' }}>
              {preview}
              {isDesigned && generating && genHtml && (
                <div style={{ position: 'absolute', inset: 0, background: 'rgba(246,241,231,0.72)', backdropFilter: 'blur(2px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 4 }}>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 9, fontFamily: 'var(--font-mono)', fontSize: 12, color: T.ink }}><Spinner size={16} /> redesigning…</span>
                </div>
              )}
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
          <p style={{ fontSize: 12, color: 'var(--text-subtle)', margin: '4px 0 0' }}>{isDesigned ? 'Marlow designs this for real. Change the accent, density, or any section.' : 'Adjust without starting over.'}</p>
        </div>
        <div style={{ flex: 1, overflow: 'auto', padding: '18px 20px' }}>
          {staleOpen && isDesigned && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, padding: '11px 12px', marginBottom: 18, borderRadius: 'var(--radius-md)', background: 'var(--warning-bg, var(--accent-soft))', border: '1px solid var(--warning, var(--border-default))' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12.5, fontWeight: 600, color: 'var(--text-strong)' }}><Icon name="AlertCircle" size={16} color="var(--warning, var(--ember-600))" />The copy changed since this design.</div>
              <div style={{ display: 'flex', gap: 8 }}>
                <Button variant="secondary" size="sm" onClick={() => setStaleOpen(false)}>Keep</Button>
                <Button variant="primary" size="sm" onClick={regenerateFromCopy} iconLeft={<Icon name="RefreshCw" size={14} />}>Redesign</Button>
              </div>
            </div>
          )}
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 9, padding: '11px 12px', marginBottom: 18, borderRadius: 'var(--radius-md)', background: 'var(--surface-inverse)', color: 'var(--neutral-50)' }}>
            <Icon name="Sparkle" size={15} color="#F0A88E" style={{ marginTop: 1, flex: 'none' }} />
            <span style={{ fontSize: 12, lineHeight: 1.5 }}>{notes || 'Reading the copy…'}</span>
          </div>
          {isDesigned && genFailed && (
            <div style={{ marginBottom: 18, padding: '10px 12px', borderRadius: 'var(--radius-md)', background: 'var(--surface-sunken)', border: '1px solid var(--border-subtle)', fontSize: 12, color: 'var(--text-muted)', display: 'flex', gap: 8 }}>
              <Icon name="AlertCircle" size={15} color="var(--text-subtle)" style={{ flex: 'none', marginTop: 1 }} />
              <span>Showing a preview render. Live generation is unavailable right now, so export is paused.</span>
            </div>
          )}
          {brief.type !== 'SMS' && <DesignReview review={review} />}
          {brief.type !== 'SMS' && (
            <div style={{ marginBottom: 18 }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-strong)', marginBottom: 8 }}>Accent color</div>
              <div style={{ display: 'flex', gap: 9 }}>
                {ACCENTS.map((c, i) => (
                  <button key={c + i} onClick={() => setAccent(c)} disabled={generating} style={{ width: 34, height: 34, borderRadius: 'var(--radius-sm)', background: c, cursor: generating ? 'default' : 'pointer', border: accent === c ? '2px solid var(--text-strong)' : '1px solid rgba(0,0,0,0.1)', outline: accent === c ? '2px solid var(--surface-card)' : 'none', outlineOffset: -3, opacity: generating ? 0.7 : 1 }} />
                ))}
              </div>
            </div>
          )}
          {isDesigned && (
            <div style={{ marginBottom: 18 }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-strong)', marginBottom: 8 }}>Density</div>
              <SegmentedControl fullWidth value={density} onChange={setDensity} options={[{ value: 'standard', label: 'Standard' }, { value: 'roomy', label: 'Roomy' }]} />
            </div>
          )}
          <div style={{ marginBottom: 18 }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-strong)', marginBottom: 8 }}>Sections{isDesigned && genSections ? ' · hover to regenerate' : ''}</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {sectionRows.map((s, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 9, padding: '7px 10px', borderRadius: 'var(--radius-sm)', background: 'var(--surface-sunken)', fontSize: 12.5, color: 'var(--text-muted)' }}>
                  <Icon name="GripVertical" size={14} color="var(--text-subtle)" />
                  <span style={{ flex: 1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{s.label}</span>
                  {isDesigned && genSections && !genFailed && (
                    <IconButton size="sm" variant="ghost" label="Regenerate this section" onClick={() => regenSection(i)} disabled={generating || regenIdx != null}>
                      {regenIdx === i ? <Spinner size={13} /> : <Icon name="RefreshCw" size={13} />}
                    </IconButton>
                  )}
                </div>
              ))}
            </div>
          </div>
          {isDesigned && (
            <div style={{ marginBottom: 8 }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-strong)', marginBottom: 8 }}>Tell Marlow what to change</div>
              <ChangeBar placeholder="e.g. make the hero bolder, warmer palette, bigger product shots…" onSubmit={changeDesign} busy={generating}
                suggestions={['Bolder hero', 'More whitespace', 'Punchier CTAs']} />
            </div>
          )}
        </div>
        <div style={{ flex: 'none', padding: 16, borderTop: '1px solid var(--border-subtle)' }}>
          {exported ? (
            <Button variant="primary" size="lg" fullWidth onClick={() => onDone && onDone()} iconLeft={<Icon name="Check" size={18} />}>Done</Button>
          ) : (
            <Button variant="primary" size="lg" fullWidth onClick={finish} disabled={!canExport} iconLeft={<Icon name="Copy" size={18} />}>
              {brief.type === 'SMS' ? 'Copy message' : 'Export email'}
            </Button>
          )}
          {exported && <div style={{ fontSize: 11.5, color: 'var(--text-subtle)', textAlign: 'center', margin: '8px 0 0' }}>{brief.type === 'SMS' ? 'Message copied to clipboard.' : 'HTML copied to clipboard.'}</div>}
          <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
            <button onClick={onBack} style={{ flex: 1, padding: '8px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-default)', background: 'transparent', color: 'var(--text-muted)', fontFamily: 'var(--font-sans)', fontSize: 12.5, fontWeight: 500, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}><Icon name="ArrowLeft" size={14} /> Copy</button>
            <button onClick={downloadHtml} disabled={!exportHtml} style={{ flex: 1, padding: '8px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-default)', background: 'transparent', color: 'var(--text-muted)', fontFamily: 'var(--font-sans)', fontSize: 12.5, fontWeight: 500, cursor: exportHtml ? 'pointer' : 'default', opacity: exportHtml ? 1 : 0.5, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}><Icon name="Download" size={14} /> .html</button>
          </div>
        </div>
      </aside>
    </div>
  )
}
