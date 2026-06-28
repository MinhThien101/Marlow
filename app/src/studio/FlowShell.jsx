// The 4-stage flow (replaces the sidebar while open). A stepper rail at the top
// is the backbone; a campaign object is threaded through every stage. The rail is
// a map you can click around freely: any stage whose data exists is reachable in
// any direction. Editing an upstream stage flags downstream work stale (it is
// never silently wiped) so you can change a thing and come forward without loss.
import React from 'react'
import { Icon } from '../ui/primitives.jsx'
import { briefSig, copySig } from './ai.js'
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

const FlowRail = ({ stage, reach, done, stale, onJump }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 0 }}>
    {FLOW_STAGES.map((s, i) => {
      const isDone = done[i], active = i === stage, reachable = reach[i], isStale = stale[i]
      const filled = isDone || active
      return (
        <React.Fragment key={s.key}>
          {i > 0 && <div style={{ width: 28, height: 2, background: done[i - 1] ? 'var(--ember-500)' : 'var(--border-default)', margin: '0 4px' }} />}
          <button onClick={() => reachable && onJump(i)} disabled={!reachable} title={isStale ? 'Needs a refresh after an upstream change' : undefined}
            style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '6px 12px 6px 7px', borderRadius: 'var(--radius-pill)', border: 'none', background: active ? 'var(--accent-soft)' : 'transparent', cursor: reachable ? 'pointer' : 'default', opacity: reachable ? 1 : 0.45 }}>
            <span style={{ position: 'relative', width: 24, height: 24, flex: 'none', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: filled ? 'var(--ember-500)' : 'var(--surface-sunken)', border: filled ? 'none' : '1px solid var(--border-default)', color: filled ? '#fff' : 'var(--text-subtle)' }}>
              {isDone && !active ? <Icon name="Check" size={13} stroke={2.5} color="#fff" /> : <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 700 }}>{i + 1}</span>}
              {isStale && <span title="Out of date" style={{ position: 'absolute', top: -2, right: -2, width: 9, height: 9, borderRadius: '50%', background: 'var(--warning, #C98A2B)', border: '1.5px solid var(--surface-card)' }} />}
            </span>
            <span style={{ fontSize: 13.5, fontWeight: active ? 600 : 500, color: active ? 'var(--accent-text)' : isDone ? 'var(--text-strong)' : 'var(--text-muted)' }}>{s.label}</span>
          </button>
        </React.Fragment>
      )
    })}
  </div>
)

export default function FlowShell({ onExit, skipBrand = false, initialCampaign = null, initialStage = null, onSaveCampaign, onEditBrand, onBrandConnected, existingBrandId, brandComplete = false }) {
  // Reopened campaign -> its saved stage. New campaign -> skip Brand if complete.
  const start = initialStage != null ? initialStage : (skipBrand ? 1 : 0)
  const [stage, setStage] = React.useState(start)
  const [campaign, setCampaign] = React.useState(initialCampaign || { type: 'DESIGNED', pillar: null, ask: '', brief: null, copy: null, design: null, name: 'New campaign' })
  const savedId = React.useRef(initialCampaign?._id || null)
  const saveChain = React.useRef(Promise.resolve())
  const firstRun = React.useRef(true)
  const go = (i) => setStage(i)
  const next = () => go(Math.min(stage + 1, 3))
  const back = () => go(Math.max(stage - 1, 0))

  // A stage is reachable when its prerequisite DATA exists, in any direction —
  // not gated on how far you have progressed. Brand and Brief are always open;
  // Copy needs a brief; Design needs copy.
  const reach = [true, true, !!campaign.brief, !!campaign.copy]
  const done = [brandComplete, !!campaign.brief, !!campaign.copy, !!campaign.design]
  // Stale = the downstream artifact was built from an older version of its input.
  // Derived from signatures recorded when copy/design were last generated; a null
  // signature (legacy campaigns) is treated as not-stale to avoid false alarms.
  const copyStale = !!campaign.copy && campaign.copyBriefSig != null && campaign.copyBriefSig !== briefSig(campaign.brief)
  const designStale = !!campaign.design && campaign.designCopySig != null && campaign.designCopySig !== copySig(campaign.copy)
  const stale = [false, false, copyStale, designStale]

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
        <FlowRail stage={stage} reach={reach} done={done} stale={stale} onJump={go} />
        <div style={{ width: 56, fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-subtle)', textAlign: 'right' }}>{stage + 1}/4</div>
      </header>
      <main style={{ flex: 1, overflow: stage === 3 ? 'hidden' : 'auto', padding: stage === 3 ? 0 : (stage === 2 ? '20px 32px' : '32px') }}>
        {stage === 0 && <BrandStage onNext={next} onEdit={onEditBrand} onBrandConnected={onBrandConnected} existingBrandId={existingBrandId} brandComplete={brandComplete} />}
        {stage === 1 && <BriefStage campaign={campaign} setCampaign={setCampaign} onBack={back} onNext={next} />}
        {stage === 2 && campaign.brief && <CopyStage campaign={campaign} setCampaign={setCampaign} onBack={back} onNext={next} copyStale={copyStale} />}
        {stage === 3 && campaign.copy && <DesignStage campaign={campaign} setCampaign={setCampaign} onBack={back} onDone={onExit} designStale={designStale} />}
      </main>
    </div>
  )
}
