// Marlow Studio — pillar/type taxonomy, seed campaigns, and shared building
// blocks for the 4-stage flow. Brand-specific data (palette, voice, products)
// now comes from the connected brand via studioBrand.js + brandContext.jsx.
import React from 'react'
import { Icon } from '../ui/primitives.jsx'

export const SAMPLES = [
  { from: 'Sey Coffee', subject: 'A quieter way to talk about origin', note: 'Editorial, never shouts', bg: 'linear-gradient(160deg,#2c3a3a,#1b2524)', studied: true },
  { from: 'Trade Coffee', subject: 'Your next bag, matched to your taste', note: 'Warm, helpful, specific', bg: 'linear-gradient(160deg,#b5603a,#7e3c22)', studied: true },
  { from: 'Onyx', subject: 'The harvest is in', note: 'Confident without hype', bg: 'linear-gradient(160deg,#3a382f,#23211b)', studied: true },
  { from: 'Blue Bottle', subject: 'How we think about freshness', note: 'Plain language, real detail', bg: 'linear-gradient(160deg,#46618a,#2c3d57)', studied: false },
]

/* ------ the five content pillars (drive every brief) ------------------ */
export const PILLARS = [
  { key: 'educational', label: 'Educational', icon: 'BookOpen',
    blurb: 'Teach something that makes the product make sense.',
    job: 'The reader needs to understand before they buy.',
    designed: ['Hero Section', 'Educational Content', 'Product Spotlight'],
    framework: 'Educational Guide', sms: 'Educational Tip' },
  { key: 'sales', label: 'Sales', icon: 'Tag',
    blurb: 'Move a live offer. The deal is the reason to open.',
    job: 'The reader needs to act on an offer.',
    designed: ['Hero Section', 'Discount Offer', 'Product Grid'],
    framework: 'Discount Push', sms: 'Flash Sale' },
  { key: 'social-proof', label: 'Social Proof', icon: 'Quote',
    blurb: 'Let customers and results carry the trust.',
    job: "The reader's blocker is skepticism.",
    designed: ['Hero Section', 'Social Proof', 'Product Spotlight'],
    framework: 'Review Request', sms: 'Social Proof' },
  { key: 'product', label: 'Product', icon: 'Package',
    blurb: 'Put one product, restock, or launch in the spotlight.',
    job: 'Concentration on one hero product over assortment.',
    designed: ['Hero Section', 'Product Spotlight', 'Benefit List'],
    framework: 'Problem-Solution', sms: 'New Product' },
  { key: 'community', label: 'Community / Brand', icon: 'Sprout',
    blurb: "Speak in the brand's voice. Often a note from the founder.",
    job: 'The campaign sells the brand world, not a product.',
    designed: ['Hero Section', 'Brand Story', 'Product Spotlight'],
    framework: 'Founder Letter', sms: 'Brand Update' },
]

export const TYPES = [
  { value: 'DESIGNED', label: 'Designed', icon: 'LayoutPanelTop', desc: 'Canonical sections, stacked. Visual, scannable.' },
  { value: 'TEXT_BASED', label: 'Text-based', icon: 'AlignLeft', desc: 'One long-form framework. Reads like a personal note.' },
  { value: 'SMS', label: 'SMS', icon: 'MessageSquare', desc: 'One message, under 160 characters, one ask.' },
]

export const pillarOf = (k) => PILLARS.find((p) => p.key === k) || PILLARS[0]

/* ------ campaigns shown on the home screen (demo seed) ---------------- */
export const CAMPAIGNS = [
  { name: 'The Huila lot is back', pillar: 'product', type: 'DESIGNED', stage: 'copy', when: 'Edited 2 hours ago', bg: 'linear-gradient(150deg,#3c6450,#21412f)' },
  { name: 'Free shipping over $40, no code', pillar: 'sales', type: 'DESIGNED', stage: 'design', when: 'Draft · yesterday', bg: 'linear-gradient(150deg,#b5603a,#7e3c22)' },
  { name: 'Why natural-process tastes like fruit', pillar: 'educational', type: 'TEXT_BASED', stage: 'exported', when: 'Exported · 6 days ago', bg: 'linear-gradient(150deg,#7c5a7a,#46324f)' },
  { name: 'What 1,900 subscribers reach for first', pillar: 'social-proof', type: 'DESIGNED', stage: 'exported', when: 'Exported · 2 weeks ago', bg: 'linear-gradient(150deg,#9c8f7c,#6b6155)' },
  { name: 'A note from the founder: spring rotation', pillar: 'community', type: 'TEXT_BASED', stage: 'brief', when: 'Draft · 3 weeks ago', bg: 'linear-gradient(150deg,#274A3D,#1a3329)' },
  { name: 'Best seller back in stock', pillar: 'product', type: 'SMS', stage: 'exported', when: 'Exported · Apr 2', bg: 'linear-gradient(150deg,#b58d54,#7c5d31)' },
]

export const STAGE_LABEL = { brief: 'Brief', copy: 'Copy', design: 'Design', exported: 'Exported' }

/* ============================================================== shared UI */

export const Eyebrow = ({ children, style }) => (
  <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.09em', textTransform: 'uppercase', color: 'var(--text-subtle)', ...style }}>{children}</div>
)

export const Panel = ({ children, style }) => (
  <div style={{ background: 'var(--surface-card)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-sm)', padding: 24, ...style }}>{children}</div>
)

export const Dropzone = ({ icon, title, hint, accept, onClick }) => {
  const [over, setOver] = React.useState(false)
  return (
    <label onClick={onClick} onDragOver={(e) => { e.preventDefault(); setOver(true) }} onDragLeave={() => setOver(false)} onDrop={(e) => { e.preventDefault(); setOver(false) }}
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '26px 20px', borderRadius: 'var(--radius-md)', border: '1.5px dashed ' + (over ? 'var(--ember-500)' : 'var(--border-default)'), background: over ? 'var(--accent-soft)' : 'var(--surface-sunken)', cursor: 'pointer', textAlign: 'center', transition: 'border-color 120ms, background 120ms' }}>
      <span style={{ width: 38, height: 38, borderRadius: 'var(--radius-md)', background: 'var(--surface-card)', border: '1px solid var(--border-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)' }}>
        <Icon name={icon} size={19} />
      </span>
      <span style={{ fontSize: 13.5, fontWeight: 600, color: 'var(--text-strong)' }}>{title}</span>
      <span style={{ fontSize: 12, color: 'var(--text-subtle)' }}>{hint}</span>
      {accept && <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10.5, color: 'var(--text-subtle)', marginTop: 2 }}>{accept}</span>}
    </label>
  )
}

export const PillarChip = ({ pk, size = 'sm' }) => {
  const p = pillarOf(pk)
  const s = size === 'sm'
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, padding: s ? '2px 8px' : '3px 10px', borderRadius: 'var(--radius-pill)', border: '1px solid var(--border-subtle)', background: 'var(--surface-card)', fontSize: s ? 11 : 12, fontWeight: 600, color: 'var(--text-muted)' }}>
      <Icon name={p.icon} size={s ? 12 : 13} color="var(--text-subtle)" />{p.label}
    </span>
  )
}
