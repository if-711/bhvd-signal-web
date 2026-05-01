'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'

const API = process.env.NEXT_PUBLIC_API_URL ?? 'https://bhvd-signal-api.fly.dev'

export default function PricingPage() {
  const [session, setSession] = useState<any>(null)
  const [loadingCheckout, setLoadingCheckout] = useState(false)
  const [brandEmail, setBrandEmail] = useState('')
  const [brandDomain, setBrandDomain] = useState('')
  const [brandSent, setBrandSent] = useState(false)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => setSession(session))
  }, [])

  async function handleProUpgrade() {
    if (!session) {
      window.location.href = '/login?next=/pricing'
      return
    }
    setLoadingCheckout(true)
    const res = await fetch(`${API}/api/stripe/checkout`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${session.access_token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ tier: 'pro_monthly' }),
    })
    const data = await res.json()
    if (data.url) window.location.href = data.url
    else setLoadingCheckout(false)
  }

  async function handleBrand(e: React.FormEvent) {
    e.preventDefault()
    await fetch(`${API}/api/capture`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ event: 'brand_pro_interest', email: brandEmail.trim(), domain: brandDomain.trim() }),
    })
    setBrandSent(true)
  }

  return (
    <div className="page-wrap">
      <div className="page-header">
        <div className="section-label">Plans</div>
        <h1 className="page-h1">Simple, transparent pricing</h1>
        <p className="page-sub">Payment never influences scores. Plans add access and tools — not score outcomes.</p>
      </div>

      <div className="plan-grid">
        <div className="plan-card">
          <div className="plan-tier">Free</div>
          <div className="plan-price">$0</div>
          <div className="plan-price-sub">forever</div>
          <ul className="plan-features">
            <li>Signal scores for all published brands</li>
            <li>Leaderboard access</li>
            <li>Brand comparison</li>
            <li>Browser extension</li>
            <li>25 new brand scans / month</li>
          </ul>
          <Link href="/leaderboard" className="plan-cta btn-secondary">View Leaderboard</Link>
        </div>

        <div className="plan-card plan-featured">
          <div className="plan-tier">Pro</div>
          <div className="plan-price">$6<span className="plan-price-mo">/mo</span></div>
          <div className="plan-price-sub">14-day free trial</div>
          <ul className="plan-features">
            <li>Everything in Free</li>
            <li>Full evidence gap analysis</li>
            <li>Claim-by-claim breakdown</li>
            <li>Score history and trend tracking</li>
            <li>Unlimited brand scans</li>
            <li>Embed badge for your site</li>
            <li>Email alerts on score changes</li>
          </ul>
          <button
            onClick={handleProUpgrade}
            disabled={loadingCheckout}
            className="plan-cta btn-primary"
            style={{ opacity: loadingCheckout ? 0.6 : 1 }}
          >
            {loadingCheckout ? 'Redirecting…' : session ? 'Start free trial' : 'Sign up & start trial'}
          </button>
        </div>

        <div className="plan-card">
          <div className="plan-tier">Brand</div>
          <div className="plan-price">$199<span className="plan-price-mo">/mo</span></div>
          <div className="plan-price-sub">per brand</div>
          <ul className="plan-features">
            <li>Verified score badge</li>
            <li>Claim submission portal</li>
            <li>Re-score request (1/quarter)</li>
            <li>Evidence documentation package</li>
            <li>Editorial independence guaranteed</li>
          </ul>
          {brandSent ? (
            <div className="plan-sent">Request received — we&apos;ll be in touch.</div>
          ) : (
            <form onSubmit={handleBrand} className="plan-form">
              <input className="form-input" type="text" placeholder="yourbrand.com" value={brandDomain} onChange={e => setBrandDomain(e.target.value)} />
              <input className="form-input" type="email" placeholder="your@email.com" value={brandEmail} onChange={e => setBrandEmail(e.target.value)} required />
              <button type="submit" className="plan-cta btn-primary">Get in Touch</button>
            </form>
          )}
        </div>
      </div>

      <div className="pricing-note">
        <strong>Editorial independence guarantee:</strong> Your subscription, plan level, or payment
        status has zero influence on your Sigñal score. Scores are determined entirely by editorial
        review of publicly visible marketing claims. This is a firm policy, not a preference.
        <br /><br />
        <Link href="/methodology">Read our full methodology →</Link>
      </div>
    </div>
  )
}
