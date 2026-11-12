import { useEffect, useState } from 'react'
import type { Session } from '@supabase/supabase-js'
import { supabase } from './lib/supabase'
import './App.css'

function App() {
  const [session, setSession] = useState<Session | null>(null)
  const [status, setStatus] = useState('Checking connection…')

  useEffect(() => {
    supabase.auth.getSession().then(({ data, error }) => {
      setStatus(error ? `Error: ${error.message}` : 'Connected to Supabase')
      setSession(data.session)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
    return () => subscription.unsubscribe()
  }, [])

  return (
    <main>
      <h1>noomeroo</h1>
      <p>{status}</p>
      <p>{session ? `Signed in as ${session.user.email}` : 'Not signed in'}</p>
    </main>
  )
}

export default App
