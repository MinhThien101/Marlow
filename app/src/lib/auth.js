import React from 'react'
import { supabase } from './supabase.js'

// useSession — tracks the signed-in user across the app.
export function useSession() {
  const [session, setSession] = React.useState(undefined) // undefined = loading

  React.useEffect(() => {
    let active = true
    supabase.auth.getSession().then(({ data }) => {
      if (active) setSession(data.session ?? null)
    })
    const { data: sub } = supabase.auth.onAuthStateChange((_event, s) => {
      setSession(s ?? null)
    })
    return () => { active = false; sub.subscription.unsubscribe() }
  }, [])

  return session
}

export async function signInWithGoogle() {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: window.location.origin,
      queryParams: { prompt: 'select_account' },
    },
  })
  if (error) throw error
}

// Dev-only convenience so the team can exercise the app on localhost
// before Google is switched on. Hidden in production.
export async function signInForPreview() {
  const { error } = await supabase.auth.signInAnonymously()
  if (error) throw error
}

export async function signOut() {
  await supabase.auth.signOut()
}

export const isLocalhost =
  typeof window !== 'undefined' &&
  /^(localhost|127\.0\.0\.1)$/.test(window.location.hostname)
