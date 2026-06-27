import React from 'react'
import { Avatar, Icon } from './primitives.jsx'
import { signOut } from '../lib/auth.js'
import { supabase } from '../lib/supabase.js'

export default function AppHeader({ brand, right, onEditBrand }) {
  const [menu, setMenu] = React.useState(false)
  const [user, setUser] = React.useState(null)
  React.useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user))
  }, [])

  const accent = brand?.accent || 'var(--ember-500)'
  const initial = (brand?.name || 'B').trim()[0]?.toUpperCase() || 'B'
  const fullName = user?.user_metadata?.full_name
  const avatarUrl = user?.user_metadata?.avatar_url

  return (
    <header style={{ height: 60, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 22px', background: 'var(--surface-card)', borderBottom: '1px solid var(--border-subtle)', position: 'sticky', top: 0, zIndex: 20 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
        <img src="/logo-mark.svg" width="28" height="28" alt="" />
        <span style={{ fontFamily: 'var(--font-display)', fontSize: 21, fontWeight: 500, letterSpacing: '-0.01em', color: 'var(--text-strong)' }}>Marlow</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
        {right}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, paddingLeft: 14, borderLeft: '1px solid var(--border-subtle)' }}>
          {brand?.logo_url
            ? <img src={brand.logo_url} width="26" height="26" alt="" style={{ borderRadius: 'var(--radius-sm)', objectFit: 'contain', background: 'var(--surface-sunken)' }} />
            : <span style={{ width: 26, height: 26, borderRadius: 'var(--radius-sm)', background: accent, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-display)', fontSize: 14, fontWeight: 500 }}>{initial}</span>}
          <span style={{ fontSize: 13.5, fontWeight: 500, color: 'var(--text-body)', maxWidth: 160, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{brand?.name || 'My brand'}</span>
        </div>
        <div style={{ position: 'relative' }}>
          <button onClick={() => setMenu((m) => !m)} style={{ border: 'none', background: 'transparent', cursor: 'pointer', padding: 0, display: 'flex' }}>
            <Avatar name={fullName || ''} src={avatarUrl} size="sm" />
          </button>
          {menu && (
            <>
              <div onClick={() => setMenu(false)} style={{ position: 'fixed', inset: 0, zIndex: 30 }} />
              <div style={{ position: 'absolute', top: 40, right: 0, zIndex: 31, width: 200, background: 'var(--surface-card)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-lg)', padding: 6 }}>
                {fullName && <div style={{ padding: '8px 10px 6px', fontSize: 12.5, color: 'var(--text-subtle)' }}>{fullName}</div>}
                <MenuItem icon="Palette" label="Edit brand" onClick={() => { setMenu(false); onEditBrand && onEditBrand() }} />
                <MenuItem icon="LogOut" label="Sign out" onClick={() => signOut()} />
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  )
}

function MenuItem({ icon, label, onClick }) {
  const [h, setH] = React.useState(false)
  return (
    <button onClick={onClick} onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{ display: 'flex', alignItems: 'center', gap: 10, width: '100%', padding: '9px 10px', border: 'none', background: h ? 'var(--surface-hover)' : 'transparent', borderRadius: 'var(--radius-sm)', cursor: 'pointer', fontFamily: 'var(--font-sans)', fontSize: 14, color: 'var(--text-body)', textAlign: 'left' }}>
      <Icon name={icon} size={16} color="var(--text-muted)" />{label}
    </button>
  )
}
