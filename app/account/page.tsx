'use client'
export const dynamic = 'force-dynamic'
import { useState, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'

const API = process.env.NEXT_PUBLIC_API_URL ?? 'https://bhvd-signal-api.fly.dev'

const TIER_LABELS: Record<string, string> = {
  free: 'Free',
  pro: 'Pro',
  brand: 'Brand',
  retailer: 'Retailer',
}

function AccountContent() {
  const router = useRouter()
  const params = useSearchParams()
  const [user, setUser] = useState<any>(null)
  const [sub, setSub] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [portalLoading, setPortalLoading] = useState(false)
  const upgraded = params.get('upgraded') === 'true'

  useEffect(() => {
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      if (!session) { router.replace('/login?next=/account'); return }
      setUser(session.user)

      const res = await fetch(`${API}/api/stripe/subscription`, {
        headers: { Authorization: `Bearer ${session.access_token}` },
      })
      if (res.ok) {
        const data = await res.json()
        setSub(data.data)
      }
      setLoading(false)
    })
  }, [])

  async function handleUpgrade() {
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) return
    const res = await fetch(`${API}/api/stripe/checkout`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${session.access_token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ tier: 'pro_monthly' }),
    })
    const data = await res.json()
    if (data.url) window.location.href = data.url
  }

  async function handlePortal() {
    setPortalLoading(true)
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) return
    const res = await fetch(`${API}/api/stripe/portal`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${session.access_token}` },
    })
    const data = await res.json()
    if (data.url) window.location.href = data.url
    setPortalLoading(false)
  }

  async function handleSignOut() {
    await supabase.auth.signOut()
    router.replace('/')
  }

  if (loading) return <div className="page-wrap"><div className="state-center"><div className="spinner" /></div></div>

  const tier = sub?.tier ?? 'free'
  const isPro = tier !== 'free'

  return (
    <div className="page-wrap">
      <div className="page-header">
        <div className="section-label">Account</div>
        <h1 className="page-h1">Your account</h1>
      </div>

      {upgraded && (
        <div style={{ margin: '0 0 24px', padding: '14px 20px', background: 'rgba(30,148,89,0.1)', border: '1px solid rgba(30,148,89,0.25)', borderRadius: 10, color: '#3ecf82', fontSize: 14 }}>
          You're now on Pro. Welcome.
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, maxWidth: 720 }}>
        <div className="plan-card" style={{ background: 'var(--bg2)', border: '1px solid var(--b1)', borderRadius: 12, padding: '24px' }}>
          <div style={{ fontSize: 11, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--t3)', fontFamily: 'var(--mono)', marginBottom: 8 }}>Account</div>
          <div style={{ fontSize: 14, color: 'var(--t1)', marginBottom: 4 }}>{user?.email}</div>
          <div style={{ fontSize: 12, color: 'var(--t3)', fontFamily: 'var(--mono)' }}>
            Member since {new Date(user?.created_at).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
          </div>
          <button onClick={handleSignOut} style={{ marginTop: 20, background: 'none', border: '1px solid var(--b2)', borderRadius: 6, padding: '7px 14px', fontSize: 12, color: 'var(--t2)', cursor: 'pointer' }}>
            Sign out
          </button>
        </div>

        <div className="plan-card" style={{ background: 'var(--bg2)', border: `1px solid ${isPro ? 'rgba(74,120,240,0.3)' : 'var(--b1)'}`, borderRadius: 12, padding: '24px' }}>
          <div style={{ fontSize: 11, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--t3)', fontFamily: 'var(--mono)', marginBottom: 8 }}>Plan</div>
          <div style={{ fontSize: 22, fontWeight: 600, fontFamily: 'var(--mono)', color: isPro ? 'var(--acc)' : 'var(--t1)', marginBottom: 4 }}>
            {TIER_LABELS[tier] ?? tier}
          </div>
          {sub?.scansRemaining != null && (
            <div style={{ fontSize: 12, color: 'var(--t2)', marginBottom: 16 }}>{sub.scansRemaining} scans remaining this month</div>
          )}
          {isPro ? (
            <button onClick={handlePortal} disabled={portalLoading}
              style={{ background: 'none', border: '1px solid var(--b2)', borderRadius: 6, padding: '7px 14px', fontSize: 12, color: 'var(--t2)', cursor: 'pointer', opacity: portalLoading ? 0.6 : 1 }}>
              {portalLoading ? 'Loading…' : 'Manage subscription'}
            </button>
          ) : (
            <button onClick={handleUpgrade}
              style={{ background: 'var(--acc)', border: 'none', borderRadius: 6, padding: '9px 18px', fontSize: 13, fontWeight: 500, color: '#fff', cursor: 'pointer' }}>
              Upgrade to Pro — $6/mo
            </button>
          )}
        </div>
      </div>

      {isPro && (
        <div style={{ marginTop: 32 }}>
          <div style={{ fontSize: 11, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--t3)', fontFamily: 'var(--mono)', marginBottom: 16 }}>Pro features</div>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <Link href="/leaderboard" className="btn">Leaderboard</Link>
            <Link href="/compare" className="btn">Brand Compare</Link>
          </div>
        </div>
      )}
    </div>
  )
}

export default function AccountPage() {
  return <Suspense><AccountContent /></Suspense>
}
