'use client'
import { useState, useEffect, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { fetchDomain, postDemand, SIG_COLOR, VERDICT_COLOR, VERDICT_SHORT, timeAgo, capture } from '@/lib/api'

interface DimScore {
  name: string
  score: number
  signal: string
  verdict: string
  note?: string
}

interface BrandData {
  domain: string
  brand_name?: string
  score: number
  signal: string
  verdict: string
  public_safe: boolean
  category?: string
  updated_at?: string
  valid_until?: string
  rank?: number
  dimensions?: DimScore[]
  claims_reviewed?: number
  summary?: string
  claim_receipts?: Array<{ claim: string; verdict: string; note?: string }>
  demand_count?: number
}

const VERDICT_WHAT: Record<string, string> = {
  ALIGNED: 'Claims are well-supported by visible evidence. The brand links claims to studies, dosages, or certifications in a transparent way.',
  VALIDATED: 'Claims are strongly supported with robust, verifiable evidence. Among the most transparent in its category.',
  'GENERALLY ALIGNED': 'Most claims have some supporting evidence but a few are vague or lack visible backing. Reasonable overall with room to improve.',
  'PARTIALLY ALIGNED': 'A mix of well-evidenced and unsupported claims. Worth asking more questions before deciding.',
  OVEREXTENDED: 'Claims consistently reach beyond what visible evidence supports. Marketing language outpaces the science shown.',
  INFLATED: 'Claims are significantly overstated relative to the evidence presented. High gap between promise and proof.',
  'EVIDENCE GAP': 'Very limited visible evidence for the claims made. The brand would need to substantially improve transparency to move the signal.',
}

const DIM_LABELS: Record<string, string> = {
  mechanism: 'Mechanism Transparency',
  specificity: 'Claim Specificity',
  effect_reality: 'Effect Reality',
  evidence_presence: 'Evidence Presence',
  evidence_strength: 'Evidence Strength',
  consumer_distortion: 'Consumer Distortion',
  claim_clarity: 'Claim Clarity',
  evidence_quality: 'Evidence Quality',
  mechanism_transparency: 'Mechanism Transparency',
  ingredient_dosage: 'Ingredient & Dosage',
  claim_scope: 'Claim Scope',
  comparative_claims: 'Comparative Claims',
  disclaimer_presence: 'Disclaimer Presence',
}

function ScoreRing({ score, signal }: { score: number; signal: string }) {
  const color = SIG_COLOR[signal] ?? '#4a5070'
  const r = 44
  const circ = 2 * Math.PI * r
  const dash = (score / 100) * circ
  return (
    <svg width="120" height="120" viewBox="0 0 120 120" className="score-ring">
      <circle cx="60" cy="60" r={r} fill="none" stroke="var(--b2)" strokeWidth="8"/>
      <circle
        cx="60" cy="60" r={r} fill="none"
        stroke={color} strokeWidth="8"
        strokeDasharray={`${dash} ${circ}`}
        strokeLinecap="round"
        transform="rotate(-90 60 60)"
      />
      <text x="60" y="56" textAnchor="middle" fill={color} fontSize="26" fontWeight="600" fontFamily="DM Mono, monospace">{score}</text>
      <text x="60" y="72" textAnchor="middle" fill="var(--t3)" fontSize="10" fontFamily="DM Sans, sans-serif">/100</text>
    </svg>
  )
}

function BrandContent() {
  const params = useSearchParams()
  const router = useRouter()
  const domain = params?.get('domain') ?? ''
  const source = params?.get('source') ?? ''

  const [data, setData] = useState<BrandData | null>(null)
  const [loading, setLoading] = useState(false)
  const [notFound, setNotFound] = useState(false)
  const [inputVal, setInputVal] = useState(domain ?? '')
  const [emailVal, setEmailVal] = useState('')
  const [emailSent, setEmailSent] = useState(false)

  useEffect(() => {
    if (!domain) return
    if (source === 'extension') {
      capture('extension_clickthrough', { domain })
    }
    setLoading(true)
    setNotFound(false)
    setData(null)
    fetchDomain(domain)
      .then((resp: any) => {
        const apiData = resp?.data
        if (!apiData || !apiData.products || apiData.products.length === 0) {
          setNotFound(true); return
        }
        const p = apiData.products[0]
        const ld = p.leaderboard_data || {}
        if (!ld.public_safe) { setNotFound(true); return }

        const dimScores: Record<string, number> = p.dimension_scores || {}
        const dimVals = Object.values(dimScores) as number[]
        const dimMax = Math.max(...dimVals, 1)
        const dimensions: DimScore[] = Object.entries(dimScores).map(([key, raw]) => {
          const pct = Math.round((raw / dimMax) * 100)
          return {
            name: key,
            score: pct,
            signal: pct >= 70 ? 'green' : pct >= 40 ? 'yellow' : 'red',
            verdict: '',
          }
        })

        setData({
          domain: apiData.domain,
          brand_name: apiData.brand_name || p.brand_name,
          score: ld.total_score ?? Math.round(100 - (p.claim_support_risk ?? 50)),
          signal: p.signal_color ?? apiData.overall_signal ?? 'red',
          verdict: ld.bhvd_verdict ?? p.verdict_label ?? p.verdict ?? '',
          public_safe: true,
          category: p.category,
          updated_at: p.last_scanned_at,
          valid_until: ld.valid_until,
          rank: p.rank_number,
          dimensions,
          claims_reviewed: (ld.claims_found || []).length,
          summary: ld.why_this_verdict || '',
          claim_receipts: (ld.claim_receipts || []).map((c: any) => ({
            claim: c.text_snippet || c.text || '',
            verdict: c.tier === 3 ? 'green' : c.tier === 2 ? 'yellow' : 'red',
            note: c.source_url ? c.source_url.split(' [')[0] : '',
          })),
        })
      })
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [domain])

  function handleSearch(e: React.FormEvent) {
    e.preventDefault()
    const d = inputVal.trim().toLowerCase().replace(/^https?:\/\//, '').replace(/\/$/, '')
    if (!d) return
    postDemand(d)
    router.push(`/brand?domain=${encodeURIComponent(d)}`)
  }

  async function handleDemand(e: React.FormEvent) {
    e.preventDefault()
    await postDemand(domain)
    await capture('demand', { email: emailVal, domain })
    setEmailSent(true)
  }

  return (
    <div className="page-wrap">
      <form className="brand-search-form" onSubmit={handleSearch}>
        <input
          className="search-input"
          type="text"
          placeholder="Enter brand domain (e.g. ritual.com)"
          value={inputVal}
          onChange={e => setInputVal(e.target.value)}
        />
        <button type="submit" className="search-btn">Check</button>
      </form>

      {loading && (
        <div className="state-center">
          <div className="spinner" />
          <p className="state-label">Looking up {domain}…</p>
        </div>
      )}

      {!loading && !data && !notFound && !domain && (
        <div className="state-center">
          <p className="state-label t2">Enter a brand domain above to see its Sigñal score.</p>
        </div>
      )}

      {!loading && notFound && (
        <div className="state-center">
          <div className="not-found-icon">?</div>
          <h2 className="not-found-title">{domain} hasn&apos;t been scored yet</h2>
          <p className="state-label t2">We review brands editorially. Add this brand to the queue:</p>
          {emailSent ? (
            <div className="demand-thanks">Request received — we&apos;ll prioritize {domain}.</div>
          ) : (
            <form className="demand-form" onSubmit={handleDemand}>
              <input
                className="waitlist-input"
                type="email"
                placeholder="your@email.com (optional)"
                value={emailVal}
                onChange={e => setEmailVal(e.target.value)}
              />
              <button type="submit" className="btn-primary">Request This Brand</button>
            </form>
          )}
        </div>
      )}

      {!loading && data && (
        <div className="brand-report">
          <div className="br-header">
            <div className="br-meta">
              <h1 className="br-name">{data.brand_name ?? data.domain}</h1>
              <div className="br-domain">{data.domain}</div>
              {data.category && <div className="br-category">{data.category}</div>}
              {data.updated_at && <div className="br-updated">Scored {timeAgo(data.updated_at)}</div>}
            </div>
            <div className="br-score-block">
              <ScoreRing score={data.score} signal={data.signal} />
              <div
                className="br-verdict"
                style={{ color: VERDICT_COLOR[data.verdict] ?? 'var(--t2)' }}
              >
                {VERDICT_SHORT[data.verdict] ?? data.verdict}
              </div>
              {data.rank && <div className="br-rank">#{data.rank} ranked</div>}
            </div>
          </div>

          {data.summary && (
            <div className="br-summary">
              <div className="br-section-label">Claim summary</div>
              <p>{data.summary}</p>
            </div>
          )}

          {VERDICT_WHAT[data.verdict] && (
            <div className="br-summary">
              <div className="br-section-label">What this means</div>
              <p>{VERDICT_WHAT[data.verdict]}</p>
            </div>
          )}

          {data.dimensions && data.dimensions.length > 0 && (
            <div className="br-dims">
              <div className="br-section-label">Evidence alignment</div>
              <div className="dim-grid">
                {data.dimensions.map((dim: DimScore) => (
                  <div key={dim.name} className="dim-card">
                    <div className="dim-top">
                      <span className="dim-label">{DIM_LABELS[dim.name] ?? dim.name}</span>
                      <span className="dim-score" style={{ color: SIG_COLOR[dim.signal] ?? 'var(--t2)' }}>
                        {dim.score}
                      </span>
                    </div>
                    <div className="dim-bar-track">
                      <div
                        className="dim-bar-fill"
                        style={{
                          width: `${dim.score}%`,
                          background: SIG_COLOR[dim.signal] ?? 'var(--t3)',
                        }}
                      />
                    </div>
                    {dim.note && <div className="dim-note">{dim.note}</div>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {data.claim_receipts && data.claim_receipts.length > 0 && (
            <div className="br-dims">
              <div className="br-section-label">Claim receipts</div>
              <div className="claim-receipt-list">
                {data.claim_receipts.map((cr, i) => (
                  <div key={i} className="claim-receipt-row">
                    <span className="claim-receipt-verdict" style={{ color: SIG_COLOR[cr.verdict] ?? 'var(--t2)' }}>
                      {cr.verdict}
                    </span>
                    <span className="claim-receipt-text">{cr.claim}</span>
                    {cr.note && <span className="claim-receipt-note">{cr.note}</span>}
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="br-meta-row">
            {data.updated_at && (
              <div className="br-meta-pill">
                <span className="br-meta-label">Last verified</span>
                <span className="br-meta-val">{timeAgo(data.updated_at)}</span>
              </div>
            )}
            {data.valid_until && (
              <div className="br-meta-pill">
                <span className="br-meta-label">Valid until</span>
                <span className="br-meta-val">{timeAgo(data.valid_until)}</span>
              </div>
            )}
            {data.demand_count != null && data.demand_count > 0 && (
              <div className="br-meta-pill">
                <span className="br-meta-label">Demand signal</span>
                <span className="br-meta-val">{data.demand_count} requesting</span>
              </div>
            )}
            {data.claims_reviewed != null && (
              <div className="br-meta-pill">
                <span className="br-meta-label">Claims reviewed</span>
                <span className="br-meta-val">{data.claims_reviewed}</span>
              </div>
            )}
          </div>

          <div className="br-method-link">
            <Link href="/methodology">How we score →</Link>
          </div>

          <div className="br-actions">
            <Link href={`/compare?a=${data.domain}`} className="btn-secondary">Compare with another brand →</Link>
          </div>
        </div>
      )}
    </div>
  )
}

export default function BrandPage() {
  return (
    <Suspense>
      <BrandContent />
    </Suspense>
  )
}
