import React from 'react'
import { Spinner } from './ui/primitives.jsx'
import { useSession, signOut } from './lib/auth.js'
import { getMyBrand, getProducts } from './lib/data.js'
import SignIn from './screens/SignIn.jsx'
import Home from './screens/Home.jsx'
import Pricing from './screens/Pricing.jsx'
import FAQ from './screens/FAQ.jsx'
import About from './screens/About.jsx'
import Privacy from './screens/Privacy.jsx'
import Terms from './screens/Terms.jsx'
import Connect from './screens/Connect.jsx'
import Studio from './studio/Studio.jsx'

function Splash() {
  return (
    <div style={{ minHeight: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 18 }}>
      <img src="/logo-mark.svg" width="44" height="44" alt="Marlow" style={{ animation: 'mpulse 1.4s ease-in-out infinite' }} />
      <Spinner size={20} />
      <style>{'@keyframes mpulse{0%,100%{opacity:1}50%{opacity:.45}}'}</style>
    </div>
  )
}

export default function App() {
  const session = useSession()
  const userId = session?.user?.id ?? null
  const [brand, setBrand] = React.useState(undefined) // undefined = loading
  const [products, setProducts] = React.useState([])
  const [editing, setEditing] = React.useState(false)

  // Load this user's brand + products. Keyed on the user id (not the session
  // object) so frequent Supabase auth events (token refresh, tab focus) don't
  // re-trigger the load and bounce the UI back to the loading splash.
  React.useEffect(() => {
    let active = true
    if (!userId) { setBrand(undefined); setProducts([]); return }
    setBrand(undefined)
    getMyBrand()
      .then(async (b) => {
        if (!active) return
        setBrand(b ?? null)
        if (b) {
          try { const ps = await getProducts(b.id); if (active) setProducts(ps) }
          catch { if (active) setProducts([]) }
        }
      })
      .catch(() => { if (active) setBrand(null) })
    return () => { active = false }
  }, [userId])

  if (session === undefined) return <Splash />
  if (session === null) return <PublicSite />
  if (brand === undefined) return <Splash />

  // Editing the brand opens the full-screen editor. This is also the "set it up
  // by hand" path when no brand exists yet (existing is null -> input phase).
  if (editing) {
    return (
      <Connect
        existing={brand}
        onCancel={() => setEditing(false)}
        onDone={(b, ps) => { setBrand(b); if (ps) setProducts(ps); setEditing(false) }}
      />
    )
  }

  // Signed in -> the Studio. A brand-new account (no brand row yet) lands on the
  // Brand stage's onboarding empty state inside the flow, not a separate screen.
  return (
    <Studio
      user={session.user}
      brand={brand}
      products={products}
      onSignOut={signOut}
      onEditBrand={() => setEditing(true)}
      onBrandConnected={(b, ps) => { setBrand(b); if (ps) setProducts(ps) }}
    />
  )
}

// Public, logged-out marketing area: Home / Pricing / FAQ, plus the sign-in screen.
function PublicSite() {
  const [page, setPage] = React.useState('home') // home | pricing | faq | signin
  const [anchor, setAnchor] = React.useState(null)

  const go = (p, a = null) => { setAnchor(a); setPage(p) }
  const onSignIn = () => go('signin')

  React.useEffect(() => {
    if (page === 'home' && anchor) {
      const el = document.getElementById(anchor)
      if (el) { el.scrollIntoView({ behavior: 'smooth' }); return }
    }
    window.scrollTo(0, 0)
  }, [page, anchor])

  if (page === 'pricing') return <Pricing go={go} onSignIn={onSignIn} />
  if (page === 'faq') return <FAQ go={go} onSignIn={onSignIn} />
  if (page === 'about') return <About go={go} onSignIn={onSignIn} />
  if (page === 'privacy') return <Privacy go={go} onSignIn={onSignIn} />
  if (page === 'terms') return <Terms go={go} onSignIn={onSignIn} />
  if (page === 'signin') return <SignIn onOpenFAQ={() => go('faq')} onHome={() => go('home')} />
  return <Home go={go} onSignIn={onSignIn} />
}
