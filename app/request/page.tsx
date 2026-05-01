'use client'
import { useState } from 'react'
import { postDemand, capture } from '@/lib/api'

export default function RequestPage() {
  const [domain, setDomain] = useState('')
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const d = domain.trim().toLowerCase().replace(/^https?:\/\//, '').replace(/\/$/, '')
    if (!d) { setError('Please enter a brand domain.'); return }
    await postDemand(d)
    await capture('brand_request', { domain: d, email: email.trim() || undefined })
    setSent(true)
  }

  return (
    <div className="page-wrap page-narrow">
      <div className="page-header">
        <div className="section-label">Coverage</div>
        <h1 className="page-h1">Request a Brand</h1>
        <p className="page-sub">
          We review brands editorially and prioritize based on demand. Submit a request and we&apos;ll
          add it to the queue.
        </p>
      </div>

      {sent ? (
        <div className="request-thanks">
          <div className="thanks-icon">✓</div>
          <h2>Request received</h2>
          <p>We&apos;ll prioritize <strong>{domain}</strong> in our review queue. If you left your email, we&apos;ll notify you when it&apos;s scored.</p>
        </div>
      ) : (
        <form className="request-form" onSubmit={handleSubmit}>
          <div className="form-field">
            <label className="form-label">Brand domain *</label>
            <input
              className="form-input"
              type="text"
              placeholder="e.g. ritual.com"
              value={domain}
              onChange={e => { setDomain(e.target.value); setError('') }}
              required
            />
            {error && <div className="form-error">{error}</div>}
          </div>
          <div className="form-field">
            <label className="form-label">Your email (optional)</label>
            <input
              className="form-input"
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
            <div className="form-hint">We&apos;ll notify you when this brand is scored. We don&apos;t send marketing email.</div>
          </div>
          <button type="submit" className="btn-primary">Submit Request</button>
        </form>
      )}

      <div className="request-note">
        <strong>Note:</strong> Submitting a request does not guarantee a score. All scores are editorial
        and independent. Payment never influences inclusion or score.
      </div>
    </div>
  )
}
