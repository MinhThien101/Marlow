// The guided 4-stage flow (replaces the sidebar while open). A stepper rail at
// the top; a campaign object threaded through every stage. Forward stages stay
// locked until their prerequisite data exists; you can jump back to any reached
// stage.
import React from 'react'
import { Icon } from '../ui/primitives.jsx'
import BrandStage from './stages/BrandStage.jsx'
import BriefStage from './stages/BriefStage.jsx'
import CopyStage from './stages/CopyStage.jsx'
import DesignStage from './stages/DesignStage.jsx'

const FLOW_STAGES = [
  { key: 'brand', label: 'Brand', icon: 'Sprout' },
  { key: 'brief', label: 'Brief', icon: 'FileText' },
  { key: 'copy', label: 'Copy', icon: 'PenLine' },
  { key: 'design', label: 'Design', icon: 'LayoutPanelTop' },
]

const FlowRail = ({ stage, maxStage, onJump }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 0 }}>
    {FLOW_STAGES.map((s, i) => {
      const done = i < stage, active = i === stage, reachable = i <= maxStage
      return (
        <React.Fragment key={s.key}>
          {i > 0 && <div style={{ width: 28, height: 2, background: i <= stage ? 'var(--ember-500)' : 'var(--border-default)', margin: '0 4px' }} />}
          <button onClick={() => reachable && onJump(i)} disabled={!reachable}
            style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '6px 12px 6px 7px', borderRadius: 'var(--radius-pill)', border: 'none', background: active ? 'var(--accent-soft)' : 'transparent', cursor: reachable ? 'pointer' : 'default', opacity: reachable ? 1 : 0.5 }}>
            <span style={{ width: 24, height: 24, flex: 'none', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: done || active ? 'var(--ember-500)' : 'var(--surface-sunken)', border: done || active ? 'none' : '1px solid var(--border-default)', color: done || active ? '#fff' : 'var(--text-subtle)' }}>
              {done ? <Icon name="Check" size={13} stroke={2.5} color="#fff" /> : <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 700 }}>{i + 1}</span>}
            </span>
            <span style={{ fontSize: 13.5, fontWeight: active ? 600 : 500, color: active ? 'var(--accent-text)' : done ? 'var(--text-strong)' : 'var(--text-muted)' }}>{s.label}</span>
          </button>
        </React.Fragment>
      )
    })}
  </div>
)

export default function FlowShell({ onExit, skipBrand = false, initialCampaign = null, initialStage = null, onSaveCampaign, onEditBrand }) {
  // Reopened campaign -> its saved stage. New campaign -> skip Brand if complete.
  const start = initialStage != null ? initialStage : (skipBrand ? 1 : 0)
  const [stage, setStage] = React.useState(start)
  const [maxStage, setMaxStage] = React.useState(start)
  const [campaign, setCampaign] = React.useState(initialCampaign || { type: 'DESIGNED', pillar: null, ask: '', brief: null, copy: null, design: null, name: 'New campaign' })
  const savedId = React.useRef(initialCampaign?._id || null)
  const saveChain = React.useRef(Promise.resolve())
  const firstRun = React.useRef(true)
  const go = (i) => { setStage(i); setMaxStage((m) => Math.max(m, i)) }
  const next = () => go(Math.min(stage + 1, 3))
  const back = () => go(Math.max(stage - 1, 0))

  // Persist the campaign whenever it reaches a new milestone (brief, copy, design).
  // Calls are chained so the first insert resolves an id before the next update.
  React.useEffect(() => {
    if (firstRun.current) { firstRun.current = false; if (initialCampaign) return }
    if (!onSaveCampaign || !campaign.brief) return
    const snapshot = campaign
    saveChain.current = saveChain.current
      .then(async () => { const row = await onSaveCampaign(snapshot, savedId.current); if (row && row.id) savedId.current = row.id })
      .catch(() => {})
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [campaign.brief, campaign.copy, campaign.design])

  return (
    <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', height: '100%' }}>
      <header style={{ height: 64, flex: 'none', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 24px', borderBottom: '1px solid var(--border-subtle)', background: 'var(--surface-card)' }}>
        <button onClick={onExit} style={{ display: 'inline-flex', alignItems: 'center', gap: 7, border: 'none', background: 'transparent', color: 'var(--text-muted)', fontFamily: 'var(--font-sans)', fontSize: 13.5, fontWeight: 500, cursor: 'pointer', padding: 0 }}>
          <Icon name="X" size={18} /> Exit
        </button>
        <FlowRail stage={stage} maxStage={maxStage} onJump={go} />
        <div style={{ width: 56, fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-subtle)', textAlign: 'right' }}>{stage + 1}/4</div>
      </header>
      <main style={{ flex: 1, overflow: stage === 3 ? 'hidden' : 'auto', padding: stage === 3 ? 0 : (stage === 2 ? '20px 32px' : '32px') }}>
        {stage === 0 && <BrandStage onNext={next} onEdit={onEditBrand} />}
        {stage === 1 && <BriefStage campaign={campaign} setCampaign={setCampaign} onBack={back} onNext={next} />}
        {stage === 2 && campaign.brief && <CopyStage campaign={campaign} setCampaign={setCampaign} onBack={back} onNext={next} />}
        {stage === 3 && campaign.copy && <DesignStage campaign={campaign} setCampaign={setCampaign} onBack={back} onDone={onExit} />}
      </main>
    </div>
  )
}
