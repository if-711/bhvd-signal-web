'use client'
import { useState } from 'react'
import Link from 'next/link'
import { capture } from '@/lib/api'

export default function PricingPage() {
  const [consumerEmail, setConsumerEmail] = useState('')
  const [consumerSent, setConsumerSent] = useState(false)
  const [brandEmail, setBrandEmail] = useState('')
  const [brandDomain, setBrandDomain] = useState('')
  const [brandSent, setBrandSent] = useState(false)

  async function handleConsumer(e: React.FormEvent) {
    e.preventDefault()
    await capture('consumer_pro_interest', { email: consumerEmail.trim() })
    setConsumerSent(true)
  }

  async function handleBrand(e: React.FormEvent) {
    e.preventDefault()
    await capture('brand_pro_interest', { email: brandEmail.trim(), domain: brandDomain.trim() })
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
            <li>Full scores for all published brands</li>
            <li>Dimension breakdowns</li>
            <li>Leaderboard access</li>
            <li>Brand comparison</li>
            <li>Browser extension</li>
          </ul>
          <Link href="/leaderboard" className="plan-cta btn-secondary">View Leaderboard</Link>
        </div>

        <div className="plan-card plan-featured">
          <div className="plan-badge">Coming soon</div>
          <div className="plan-tier">Consumer Pro</div>
          <div className="plan-price">$4<span className="plan-price-mo">/mo</span></div>
          <div className="plan-price-sub">billed monthly</div>
          <ul className="plan-features">
            <li>Everything in Free</li>
            <li>Full evidence gap analysis</li>
            <li>Claim-by-claim breakdown</li>
            <li>Score history and trend tracking</li>
            <li>Early access to new brand scores</li>
            <li>Email alerts when followed brands are re-scored</li>
          </ul>
          {consumerSent ? (
            <div className="plan-sent">You&apos;re on the list — we&apos;ll notify you at launch.</div>
          ) : (
            <form onSubmit={handleConsumer} className="plan-form">
              <input
                className="form-input"
                type="email"
                placeholder="your@email.com"
                value={consumerEmail}
                onChange={e => setConsumerEmail(e.target.value)}
                required
              />
              <button type="submit" className="plan-cta btn-primary">Notify Me at Launch</button>
            </form>
          )}
        </div>

        <div className="plan-card">
          <div className="plan-tier">Brand Pro</div>
          <div className="plan-price">$49<span className="plan-price-mo">/mo</span></div>
          <div className="plan-price-sub">per brand</div>
          <ul className="plan-features">
            <li>Everything in Consumer Pro</li>
            <li>Structured delivery with data provenance documentation</li>
            <li>Verified score badge for your website</li>
            <li>Claim submission portal</li>
            <li>Re-score request (1/quarter)</li>
            <li>Editorial independence guaranteed</li>
          </ul>
          {brandSent ? (
            <div className="plan-sent">Request received — we&apos;ll be in touch.</div>
          ) : (
            <form onSubmit={handleBrand} className="plan-form">
              <input
                className="form-input"
                type="text"
                placeholder="yourbrand.com"
                value={brandDomain}
                onChange={e => setBrandDomain(e.target.value)}
              />
              <input
                className="form-input"
                type="email"
                placeholder="your@email.com"
                value={brandEmail}
                onChange={e => setBrandEmail(e.target.value)}
                required
              />
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
