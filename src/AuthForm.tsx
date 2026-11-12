import { useState, type FormEvent } from 'react'
import { supabase } from './lib/supabase'

type Mode = 'sign-in' | 'sign-up'

export function AuthForm() {
  const [mode, setMode] = useState<Mode>('sign-in')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [notice, setNotice] = useState<string | null>(null)

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setNotice(null)

    if (mode === 'sign-in') {
      const { error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) setError(error.message)
    } else {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: { emailRedirectTo: window.location.origin },
      })
      if (error) setError(error.message)
      // With email confirmation enabled, sign-up succeeds but returns no session.
      else if (!data.session) setNotice('Check your email for a confirmation link, then sign in.')
    }

    setLoading(false)
  }

  function switchMode() {
    setMode(mode === 'sign-in' ? 'sign-up' : 'sign-in')
    setError(null)
    setNotice(null)
  }

  const isSignIn = mode === 'sign-in'

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <h2>{isSignIn ? 'Sign in' : 'Create an account'}</h2>

      <label>
        Email
        <input
          type="email"
          autoComplete="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>

      <label>
        Password
        <input
          type="password"
          autoComplete={isSignIn ? 'current-password' : 'new-password'}
          required
          minLength={6}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>

      {error && <p className="auth-error" role="alert">{error}</p>}
      {notice && <p className="auth-notice" role="status">{notice}</p>}

      <button type="submit" disabled={loading}>
        {loading ? 'Please wait…' : isSignIn ? 'Sign in' : 'Sign up'}
      </button>

      <p className="auth-switch">
        {isSignIn ? "Don't have an account?" : 'Already have an account?'}{' '}
        <button type="button" className="link-button" onClick={switchMode}>
          {isSignIn ? 'Sign up' : 'Sign in'}
        </button>
      </p>
    </form>
  )
}
