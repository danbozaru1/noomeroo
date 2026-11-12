import { useEffect, useState } from 'react'
import type { Session } from '@supabase/supabase-js'
import { supabase } from './lib/supabase'
import { AuthForm } from './AuthForm'
import './App.css'

function App() {
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session)
      setLoading(false)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
    return () => subscription.unsubscribe()
  }, [])

  if (loading) return <main><p>Loading…</p></main>

  return (
    <main>
      <h1>noomeroo</h1>
      {session ? (
        <section className="signed-in">
          <p>Signed in as <strong>{session.user.email}</strong></p>
          <button onClick={() => supabase.auth.signOut()}>Sign out</button>
        </section>
      ) : (
        <AuthForm />
      )}
    </main>
  )
}

export default App
