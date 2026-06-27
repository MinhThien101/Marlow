// Persisting studio campaigns. We reuse the existing `emails` table: the full
// V2 campaign object (type, pillar, ask, brief, copy, design, name) is stored in
// the `doc` jsonb column, with status = the stage reached. RLS + user_id default
// (auth.uid()) are already in place.
import { createEmail, updateEmail, getEmails } from '../lib/data.js'

const PILLAR_GRADIENT = {
  educational: 'linear-gradient(150deg,#7c5a7a,#46324f)',
  sales: 'linear-gradient(150deg,#b5603a,#7e3c22)',
  'social-proof': 'linear-gradient(150deg,#9c8f7c,#6b6155)',
  product: 'linear-gradient(150deg,#3c6450,#21412f)',
  community: 'linear-gradient(150deg,#274A3D,#1a3329)',
}

// status reached, derived from how far the campaign got.
export function statusOf(campaign) {
  if (campaign.design) return 'exported'
  if (campaign.copy) return 'design'
  if (campaign.brief) return 'copy'
  return 'brief'
}

// Which flow stage to reopen a saved campaign at.
export function stageForStatus(status) {
  if (status === 'copy') return 2
  if (status === 'design' || status === 'exported') return 3
  return 1
}

function relTime(iso) {
  if (!iso) return ''
  const then = new Date(iso).getTime()
  const mins = Math.max(0, Math.round((Date.now() - then) / 60000))
  if (mins < 1) return 'Edited just now'
  if (mins < 60) return `Edited ${mins} minute${mins === 1 ? '' : 's'} ago`
  const hrs = Math.round(mins / 60)
  if (hrs < 24) return `Edited ${hrs} hour${hrs === 1 ? '' : 's'} ago`
  const days = Math.round(hrs / 24)
  if (days === 1) return 'Edited yesterday'
  if (days < 14) return `Edited ${days} days ago`
  const wks = Math.round(days / 7)
  return `Edited ${wks} week${wks === 1 ? '' : 's'} ago`
}

// Create or update the campaign row. Returns the saved row.
export async function saveStudioCampaign({ brandId, campaign, id }) {
  const status = statusOf(campaign)
  const copy = campaign.copy || {}
  const patch = {
    brand_id: brandId,
    name: campaign.name || campaign.brief?.title || 'Untitled campaign',
    campaign_type: campaign.type || 'DESIGNED',
    prompt: campaign.ask || null,
    subject: copy.subject || null,
    preview_text: copy.preview || null,
    status,
    doc: { v: 2, ...campaign },
  }
  if (id) return updateEmail(id, patch)
  return createEmail(patch)
}

// Load this user's saved studio campaigns, newest first, as home-card data.
export async function listStudioCampaigns() {
  const rows = await getEmails()
  return (rows || [])
    .filter((r) => r.doc && r.doc.v === 2)
    .map((r) => {
      const c = r.doc
      return {
        id: r.id,
        name: r.name,
        pillar: c.pillar || 'product',
        type: r.campaign_type || c.type || 'DESIGNED',
        stage: r.status || statusOf(c),
        when: relTime(r.updated_at || r.created_at),
        bg: PILLAR_GRADIENT[c.pillar] || PILLAR_GRADIENT.product,
        campaign: { ...c, _id: r.id },
      }
    })
}
