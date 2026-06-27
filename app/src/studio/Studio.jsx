// Marlow Studio — the signed-in app shell. Sidebar (Campaigns / Brand) + the
// 4-stage campaign flow. Built on the live primitives + design tokens, wired to
// the /api/studio-ai backend, and themed to the connected brand.
import React from 'react'
import { Badge, Avatar, Button, Spinner, Icon } from '../ui/primitives.jsx'
import { Eyebrow, Panel, PillarChip, STAGE_LABEL, SAMPLES } from './data.jsx'
import { buildStudioBrand, isBrandComplete } from './studioBrand.js'
import { StudioBrandProvider, useStudioBrand } from './brandContext.jsx'
import { listStudioCampaigns, saveStudioCampaign, statusOf, stageForStatus } from './campaigns.js'
import FlowShell from './FlowShell.jsx'
import BrandStage from './stages/BrandStage.jsx'

/* ===================================================== home: campaigns */

const CampaignsHome = ({ campaigns, loading, onNew, onOpen }) => {
  const [hover, setHover] = React.useState(null)
  return (
    <div style={{ maxWidth: 860, margin: '0 auto' }}>
      <button onClick={onNew}
        style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 16, padding: '18px 22px', marginBottom: 18, borderRadius: 'var(--radius-lg)', border: 'none', background: 'var(--surface-inverse)', color: 'var(--neutral-50)', cursor: 'pointer', textAlign: 'left', boxShadow: 'var(--shadow-sm)' }}>
        <span style={{ width: 44, height: 44, flex: 'none', borderRadius: 'var(--radius-md)', background: 'var(--ember-500)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: 'var(--shadow-ember)' }}><Icon name="Plus" size={22} color="#fff" /></span>
        <span style={{ flex: 1 }}>
          <span style={{ display: 'block', fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 500 }}>Start a campaign</span>
          <span style={{ display: 'block', fontSize: 13, color: 'rgba(242,234,217,0.7)', marginTop: 1 }}>Brand → brief → copy → design. About two minutes.</span>
        </span>
        <Icon name="ArrowRight" size={20} color="rgba(242,234,217,0.7)" />
      </button>

      {loading ? (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, padding: '40px 0', color: 'var(--text-subtle)', fontSize: 13.5 }}>
          <Spinner size={18} /> Loading your campaigns…
        </div>
      ) : campaigns.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '48px 24px', border: '1px dashed var(--border-default)', borderRadius: 'var(--radius-lg)', background: 'var(--surface-card)' }}>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 500, color: 'var(--text-strong)', marginBottom: 6 }}>No campaigns yet</div>
          <div style={{ fontSize: 13.5, color: 'var(--text-muted)' }}>Start your first one above. It'll show up here once you draft a brief.</div>
        </div>
      ) : (
        <>
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 12 }}>
            <Eyebrow>{campaigns.length} campaign{campaigns.length === 1 ? '' : 's'}</Eyebrow>
            <span style={{ fontSize: 12.5, color: 'var(--text-subtle)' }}>Sorted by last edited</span>
          </div>
          <div style={{ background: 'var(--surface-card)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-lg)', overflow: 'hidden', boxShadow: 'var(--shadow-sm)' }}>
            {campaigns.map((c, i) => (
              <div key={c.id} onMouseEnter={() => setHover(i)} onMouseLeave={() => setHover(null)} onClick={() => onOpen(c)}
                style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '14px 20px', cursor: 'pointer', borderTop: i ? '1px solid var(--border-subtle)' : 'none', background: hover === i ? 'var(--surface-hover)' : 'transparent', transition: 'background 120ms' }}>
                <span style={{ width: 44, height: 44, borderRadius: 'var(--radius-md)', background: c.bg, flex: 'none', boxShadow: 'inset 0 0 0 1px rgba(0,0,0,0.06)' }} />
                <div style={{ minWidth: 0, flex: 1 }}>
                  <div style={{ fontSize: 15, fontWeight: 600, color: 'var(--text-strong)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{c.name}</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 4 }}>
                    <PillarChip pk={c.pillar} />
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10.5, color: 'var(--text-subtle)' }}>{c.type}</span>
                    <span style={{ fontSize: 12, color: 'var(--text-subtle)' }}>· {c.when}</span>
                  </div>
                </div>
                <Badge tone={c.stage === 'exported' ? 'success' : 'ember'} dot>{STAGE_LABEL[c.stage] || c.stage}</Badge>
                <Icon name="ChevronRight" size={18} color="var(--text-subtle)" style={{ opacity: hover === i ? 1 : 0.4 }} />
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

/* ----- Brand reference section (sidebar tab) ------------------------- */

const BrandReference = ({ onEdit }) => {
  const sb = useStudioBrand()
  const [subtab, setSubtab] = React.useState('identity')
  return (
    <div style={{ maxWidth: 760, margin: '0 auto' }}>
      <div style={{ display: 'flex', gap: 2, marginBottom: 18 }}>
        {[['identity', 'Identity'], ['samples', 'Samples'], ['assets', 'Assets']].map(([v, l]) => (
          <button key={v} onClick={() => setSubtab(v)} style={{ padding: '6px 14px', borderRadius: 'var(--radius-pill)', border: 'none', background: subtab === v ? 'var(--surface-active)' : 'transparent', color: subtab === v ? 'var(--text-strong)' : 'var(--text-muted)', fontFamily: 'var(--font-sans)', fontSize: 13, fontWeight: 500, cursor: 'pointer' }}>{l}</button>
        ))}
      </div>
      {subtab === 'identity' && <BrandStage onEdit={onEdit} />}
      {subtab === 'samples' && (
        <Panel style={{ padding: 0, overflow: 'hidden' }}>
          <div style={{ padding: '18px 22px', borderBottom: '1px solid var(--border-subtle)' }}>
            <Eyebrow>Emails {sb.short} admires</Eyebrow>
            <p style={{ fontSize: 13, color: 'var(--text-muted)', margin: '6px 0 0', lineHeight: 1.5 }}>Marlow studies the rhythm and voice — never copies the words.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 16, padding: 22 }}>
            {SAMPLES.map((s) => (
              <div key={s.subject} style={{ display: 'flex', gap: 14, padding: 14, borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)', background: 'var(--surface-card)' }}>
                <span style={{ flex: 'none', width: 58, height: 72, borderRadius: 'var(--radius-sm)', background: s.bg, boxShadow: 'inset 0 0 0 1px rgba(0,0,0,0.06)' }} />
                <div style={{ minWidth: 0, flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
                    <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-strong)' }}>{s.from}</span>
                    {s.studied ? <Badge tone="success" size="sm">Studied</Badge> : <Badge tone="neutral" size="sm">Queued</Badge>}
                  </div>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: 14, color: 'var(--text-strong)', margin: '5px 0 6px', lineHeight: 1.3 }}>{s.subject}</div>
                  <div style={{ fontSize: 12, color: 'var(--text-muted)', display: 'flex', gap: 5 }}><Icon name="Quote" size={12} color="var(--text-subtle)" style={{ marginTop: 2, flex: 'none' }} />{s.note}</div>
                </div>
              </div>
            ))}
          </div>
        </Panel>
      )}
      {subtab === 'assets' && (
        <Panel>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
            <div>
              <Eyebrow>Logo &amp; product photos</Eyebrow>
              <p style={{ fontSize: 12.5, color: 'var(--text-subtle)', margin: '6px 0 0' }}>Marlow uses these in your emails. Add or change them in Edit brand.</p>
            </div>
            <Button variant="secondary" size="sm" onClick={onEdit} iconLeft={<Icon name="Pencil" size={14} />}>Edit brand</Button>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 14 }}>
            <AssetTile label="Logo" img={sb.logoUrl} fallback={(sb.short || 'B')[0].toUpperCase()} accent={sb.emailTheme.accent} paper={sb.emailTheme.paper} />
            {sb.products.map((p, i) => (
              <AssetTile key={i} label={p.title} img={p.image_url} bg={p.bg} />
            ))}
            {!sb.products.length && (
              <div style={{ gridColumn: 'span 3', alignSelf: 'center', fontSize: 13, color: 'var(--text-subtle)' }}>No product photos yet. Add them in Edit brand.</div>
            )}
          </div>
        </Panel>
      )}
    </div>
  )
}

const AssetTile = ({ label, img, bg, fallback, accent, paper }) => (
  <div>
    <div style={{ aspectRatio: '1', borderRadius: 'var(--radius-md)', background: img ? `center/cover no-repeat url(${img})` : (bg || accent || 'var(--surface-sunken)'), position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: 'inset 0 0 0 1px rgba(0,0,0,0.06)' }}>
      {!img && fallback && <span style={{ fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 500, color: paper || '#fff' }}>{fallback}</span>}
    </div>
    <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-strong)', marginTop: 7, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{label}</div>
  </div>
)

/* ============================================================ app shell */

const NAV = [
  { key: 'campaigns', label: 'Campaigns', icon: 'LayoutGrid' },
  { key: 'brand', label: 'Brand', icon: 'Sprout' },
]

const BrandChip = () => {
  const sb = useStudioBrand()
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 9, padding: '8px 10px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)', background: 'var(--surface-card)', cursor: 'pointer' }}>
      {sb.logoUrl
        ? <img src={sb.logoUrl} alt="" style={{ width: 26, height: 26, flex: 'none', borderRadius: 'var(--radius-sm)', objectFit: 'contain', background: 'var(--surface-sunken)' }} />
        : <span style={{ width: 26, height: 26, flex: 'none', borderRadius: 'var(--radius-sm)', background: sb.emailTheme.accent, color: sb.emailTheme.paper, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-display)', fontSize: 14, fontWeight: 500 }}>{(sb.short || 'B')[0].toUpperCase()}</span>}
      <span style={{ flex: 1, minWidth: 0 }}>
        <span style={{ display: 'block', fontSize: 13, fontWeight: 600, color: 'var(--text-strong)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{sb.name}</span>
        <span style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: 10.5, color: 'var(--text-subtle)' }}>{sb.url || 'no store url'}</span>
      </span>
      <Icon name="ChevronsUpDown" size={15} color="var(--text-subtle)" />
    </div>
  )
}

export default function Studio({ user, brand, products, onSignOut, onEditBrand }) {
  const sb = React.useMemo(() => buildStudioBrand(brand, products), [brand, products])
  const brandComplete = React.useMemo(() => isBrandComplete(brand, products), [brand, products])
  const [active, setActive] = React.useState('campaigns') // campaigns | brand | flow
  const [campaigns, setCampaigns] = React.useState([])
  const [loadingCampaigns, setLoadingCampaigns] = React.useState(true)
  const [openCampaign, setOpenCampaign] = React.useState(null) // null = new campaign

  const loadCampaigns = React.useCallback(() => {
    setLoadingCampaigns(true)
    listStudioCampaigns()
      .then((rows) => setCampaigns(rows))
      .catch(() => setCampaigns([]))
      .finally(() => setLoadingCampaigns(false))
  }, [])

  // Load on mount and whenever we return to the campaigns view (e.g. after a flow).
  React.useEffect(() => { if (active === 'campaigns') loadCampaigns() }, [active, loadCampaigns])

  const startNew = () => { setOpenCampaign(null); setActive('flow') }
  const openExisting = (card) => { setOpenCampaign(card.campaign); setActive('flow') }
  const saveCampaign = React.useCallback((campaign, id) => saveStudioCampaign({ brandId: brand?.id, campaign, id }), [brand?.id])
  const meta = active === 'brand'
    ? { title: 'Brand', sub: sb.url || sb.name }
    : { title: 'Campaigns', sub: 'Everything you’ve made for ' + sb.short }

  const displayName = user?.user_metadata?.full_name || user?.user_metadata?.name || user?.email || 'You'
  const avatarUrl = user?.user_metadata?.avatar_url || user?.user_metadata?.picture

  const nav = (
    <aside style={{ width: 232, flex: 'none', background: 'var(--surface-card)', borderRight: '1px solid var(--border-subtle)', display: 'flex', flexDirection: 'column', padding: '20px 16px' }}>
      <img src="/logo-wordmark.svg" alt="Marlow" style={{ height: 26, width: 'auto', margin: '4px 6px 22px' }} />
      <BrandChip />
      <nav style={{ display: 'flex', flexDirection: 'column', gap: 3, marginTop: 22 }}>
        {NAV.map((n) => {
          const on = active === n.key
          return (
            <button key={n.key} onClick={() => setActive(n.key)} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 12px', borderRadius: 'var(--radius-md)', border: 'none', backgroundColor: on ? 'var(--accent-soft)' : 'transparent', color: on ? 'var(--accent-text)' : 'var(--text-muted)', fontFamily: 'var(--font-sans)', fontSize: 14.5, fontWeight: on ? 600 : 500, cursor: 'pointer', textAlign: 'left', transition: 'background-color 120ms, color 120ms' }}>
              <Icon name={n.icon} size={19} color={on ? 'var(--ember-600)' : 'currentColor'} />{n.label}
            </button>
          )
        })}
      </nav>
      <div style={{ flex: 1 }} />
      <button onClick={onSignOut} title="Sign out" style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '9px 12px', borderRadius: 'var(--radius-md)', border: 'none', background: 'transparent', color: 'var(--text-muted)', fontFamily: 'var(--font-sans)', fontSize: 14, fontWeight: 500, cursor: 'pointer', marginBottom: 4, textAlign: 'left' }}>
        <Icon name="LogOut" size={18} />Sign out
      </button>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 8px 0', borderTop: '1px solid var(--border-subtle)', marginTop: 6 }}>
        <Avatar name={displayName} src={avatarUrl} size="sm" />
        <span style={{ minWidth: 0 }}>
          <span style={{ display: 'block', fontSize: 13.5, fontWeight: 600, color: 'var(--text-strong)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: 150 }}>{displayName}</span>
          <span style={{ display: 'block', fontSize: 11.5, color: 'var(--text-subtle)' }}>Free beta</span>
        </span>
      </div>
    </aside>
  )

  return (
    <StudioBrandProvider brand={sb}>
      <div style={{ display: 'flex', height: '100%', background: 'var(--surface-page)', fontFamily: 'var(--font-sans)' }}>
        {active !== 'flow' && nav}
        {active === 'flow' ? (
          <FlowShell
            onExit={() => setActive('campaigns')}
            skipBrand={brandComplete && !openCampaign}
            initialCampaign={openCampaign}
            initialStage={openCampaign ? stageForStatus(statusOf(openCampaign)) : null}
            onSaveCampaign={saveCampaign}
            onEditBrand={onEditBrand}
          />
        ) : (
          <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column' }}>
            <header style={{ height: 72, flex: 'none', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 32px', borderBottom: '1px solid var(--border-subtle)', background: 'var(--surface-card)' }}>
              <div>
                <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 25, fontWeight: 500, letterSpacing: '-0.01em', color: 'var(--text-strong)', margin: 0, lineHeight: 1.1 }}>{meta.title}</h1>
                <div style={{ fontSize: 13, color: 'var(--text-subtle)', marginTop: 2 }}>{meta.sub}</div>
              </div>
            </header>
            <main style={{ flex: 1, overflow: 'auto', padding: '32px' }}>
              {active === 'campaigns' && <CampaignsHome campaigns={campaigns} loading={loadingCampaigns} onNew={startNew} onOpen={openExisting} />}
              {active === 'brand' && <BrandReference onEdit={onEditBrand} />}
            </main>
          </div>
        )}
      </div>
    </StudioBrandProvider>
  )
}
