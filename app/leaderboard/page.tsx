'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { fetchLeaderboard, fetchMovers, SIG_COLOR, VERDICT_SHORT, timeAgo } from '@/lib/api'

const CATEGORIES = ['all', 'supplements', 'wearables', 'recovery_devices', 'sleep_aids', 'functional_food', 'mental_wellness', 'neurotech']

const CATEGORY_LABELS: Record<string, string> = {
  all: 'All',
  supplements: 'Supplements',
  wearables: 'Wearables',
  recovery_devices: 'Recovery',
  sleep_aids: 'Sleep',
  functional_food: 'Functional Food',
  mental_wellness: 'Mental Wellness',
  neurotech: 'Neurotech',
}

interface BrandRow {
  rank: number
  domain: string
  brand_name?: string
  score: number
  signal: string
  verdict: string
  category?: string
  updated_at?: string
  rank_change?: number
}

export default function LeaderboardPage() {
  const [category, setCategory] = useState('all')
  const [brands, setBrands] = useState<BrandRow[]>([])
  const [movers, setMovers] = useState<BrandRow[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    Promise.all([fetchLeaderboard(category), fetchMovers()])
      .then(([lb, mv]) => {
        const entries = lb?.data?.entries ?? lb?.entries ?? lb?.brands ?? []
        setBrands(entries.map((e: any, i: number) => ({
          rank: e.rank_number ?? i + 1,
          domain: e.domain,
          brand_name: e.brand_name,
          score: e.leaderboard_data?.total_score ?? e.evidence_gap_score ?? 0,
          signal: e.signal_color ?? 'red',
          verdict: e.leaderboard_data?.bhvd_verdict ?? e.verdict ?? e.verdict_label ?? '',
          category: e.category,
          updated_at: e.last_scanned_at,
        })))
        const moversArr = mv?.data?.leading ?? mv?.leading ?? mv?.movers ?? []
        setMovers(moversArr.map((e: any) => ({
          rank: 0,
          domain: e.domain,
          brand_name: e.brand_name,
          score: e.claim_support_risk ?? 0,
          signal: e.signal_color ?? 'green',
          verdict: '',
          rank_change: e.rank_change,
        })))
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [category])

  return (
    <div className="page-wrap">
      <div className="page-header">
        <div className="section-label">Rankings</div>
        <h1 className="page-h1">Brand Leaderboard</h1>
        <p className="page-sub">Editorial scores for wellness brand marketing claims. Payment never influences ranking.</p>
      </div>

      <div className="filter-bar">
        {CATEGORIES.map(c => (
          <button
            key={c}
            className={`filter-btn${category === c ? ' active' : ''}`}
            onClick={() => setCategory(c)}
          >
            {CATEGORY_LABELS[c] ?? c}
          </button>
        ))}
      </div>

      {movers.length > 0 && (
        <div className="movers-strip">
          <span className="movers-label">Recent movers</span>
          {movers.slice(0, 4).map(m => (
            <Link key={m.domain} href={`/brand?domain=${m.domain}`} className="mover-chip">
              <span>{m.brand_name ?? m.domain}</span>
              {m.rank_change != null && (
                <span className={`mover-delta ${m.rank_change > 0 ? 'up' : 'down'}`}>
                  {m.rank_change > 0 ? '▲' : '▼'}{Math.abs(m.rank_change)}
                </span>
              )}
            </Link>
          ))}
        </div>
      )}

      {loading ? (
        <div className="state-center"><div className="spinner" /></div>
      ) : (
        <div className="lb-table">
          <div className="lb-thead">
            <span className="lb-col-rank">#</span>
            <span className="lb-col-brand">Brand</span>
            <span className="lb-col-cat">Category</span>
            <span className="lb-col-score">Score</span>
            <span className="lb-col-verdict">Verdict</span>
            <span className="lb-col-updated">Updated</span>
          </div>
          {brands.map(b => (
            <Link key={b.domain} href={`/brand?domain=${b.domain}`} className="lb-row">
              <span className="lb-col-rank lb-rank">{b.rank}</span>
              <span className="lb-col-brand lb-name">{b.brand_name ?? b.domain}</span>
              <span className="lb-col-cat lb-cat">{b.category ?? '—'}</span>
              <span
                className="lb-col-score lb-score"
                style={{ color: SIG_COLOR[b.signal] ?? 'var(--t2)' }}
              >
                {b.score}
              </span>
              <span
                className="lb-col-verdict lb-verdict"
                style={{ color: SIG_COLOR[b.signal] ?? 'var(--t2)' }}
              >
                {VERDICT_SHORT[b.verdict] ?? b.verdict}
              </span>
              <span className="lb-col-updated lb-updated">
                {b.updated_at ? timeAgo(b.updated_at) : '—'}
              </span>
            </Link>
          ))}
          {brands.length === 0 && (
            <div className="state-center">
              <p className="state-label t2">No brands scored in this category yet.</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
