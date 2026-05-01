'use client'
export const dynamic = 'force-dynamic'
import { useState, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { supabase } from '@/lib/supabase'

function LoginForm() {
  const router = useRouter()
  const params = useSearchParams()
  const [mode, setMode] = useState<'login' | 'signup'>('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [sent, setSent] = useState(false)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) router.replace(params.get('next') ?? '/account')
    })
  }, [])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)

    if (mode === 'signup') {
      const { error } = await supabase.auth.signUp({ email, password })
      if (error) { setError(error.message); setLoading(false); return }
      setSent(true)
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) { setError(error.message); setLoading(false); return }
      router.replace(params.get('next') ?? '/account')
    }
    setLoading(false)
  }

  if (sent) return (
    <div className="page-wrap" style={{ maxWidth: 420, margin: '120px auto', textAlign: 'center' }}>
      <div className="section-label">Check your email</div>
      <h1 className="page-h1" style={{ fontSize: 24, marginBottom: 12 }}>Confirm your account</h1>
      <p className="t2">We sent a confirmation link to <strong>{email}</strong>. Click it to activate your account.</p>
    </div>
  )

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 20px' }}>
      <div style={{ width: '100%', maxWidth: 400 }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div className="section-label" style={{ marginBottom: 8 }}>Sigñal</div>
          <h1 style={{ fontFamily: 'var(--serif)', fontSize: 26, fontWeight: 400 }}>
            {mode === 'login' ? 'Sign in' : 'Create account'}
          </h1>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            style={{ background: 'var(--bg3)', border: '1px solid var(--b1)', borderRadius: 8, padding: '11px 14px', fontSize: 14, color: 'var(--t1)', fontFamily: 'var(--sans)', outline: 'none' }}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            minLength={8}
            style={{ background: 'var(--bg3)', border: '1px solid var(--b1)', borderRadius: 8, padding: '11px 14px', fontSize: 14, color: 'var(--t1)', fontFamily: 'var(--sans)', outline: 'none' }}
          />
          {error && <p style={{ fontSize: 13, color: 'var(--red)', margin: 0 }}>{error}</p>}
          <button
            type="submit"
            disabled={loading}
            style={{ background: 'var(--acc)', border: 'none', borderRadius: 8, padding: '12px', fontSize: 14, fontWeight: 500, color: '#fff', cursor: 'pointer', opacity: loading ? 0.6 : 1 }}
          >
            {loading ? 'Please wait…' : mode === 'login' ? 'Sign in' : 'Create account'}
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: 20, fontSize: 13, color: 'var(--t2)' }}>
          {mode === 'login' ? "Don't have an account? " : 'Already have an account? '}
          <button onClick={() => { setMode(mode === 'login' ? 'signup' : 'login'); setError('') }}
            style={{ background: 'none', border: 'none', color: 'var(--acc)', cursor: 'pointer', fontSize: 13 }}>
            {mode === 'login' ? 'Sign up' : 'Sign in'}
          </button>
        </p>
      </div>
    </div>
  )
}

export default function LoginPage() {
  return <Suspense><LoginForm /></Suspense>
}
