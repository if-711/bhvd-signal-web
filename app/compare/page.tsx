'use client'
import { useState, useEffect, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { fetchDomain, SIG_COLOR, VERDICT_SHORT } from '@/lib/api'

interface BrandData {
  domain: string
  brand_name?: string
  score: number
  signal: string
  verdict: string
  public_safe: boolean
  dimensions?: Array<{ name: string; score: number; signal: string }>
}

const DIM_LABELS: Record<string, string> = {
  claim_clarity: 'Claim Clarity',
  evidence_quality: 'Evidence Quality',
  mechanism_transparency: 'Mechanism Transparency',
  ingredient_dosage: 'Ingredient & Dosage',
  claim_scope: 'Claim Scope',
  comparative_claims: 'Comparative Claims',
  disclaimer_presence: 'Disclaimer Presence',
}

function CompareContent() {
  const params = useSearchParams()
  const router = useRouter()
  const [inputA, setInputA] = useState(params?.get('a') ?? '')
  const [inputB, setInputB] = useState(params?.get('b') ?? '')
  const [dataA, setDataA] = useState<BrandData | null>(null)
  const [dataB, setDataB] = useState<BrandData | null>(null)
  const [loadingA, setLoadingA] = useState(false)
  const [loadingB, setLoadingB] = useState(false)

  function loadBrand(domain: string, setter: typeof setDataA, loadSetter: typeof setLoadingA) {
    if (!domain) return
    loadSetter(true)
    fetchDomain(domain)
      .then((d: BrandData) => { if (d.public_safe) setter(d); else setter(null) })
      .catch(() => setter(null))
      .finally(() => loadSetter(false))
  }

  useEffect(() => {
    const a = params?.get('a')
    const b = params?.get('b')
    if (a) { setInputA(a); loadBrand(a, setDataA, setLoadingA) }
    if (b) { setInputB(b); loadBrand(b, setDataB, setLoadingB) }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function handleCompare(e: React.FormEvent) {
    e.preventDefault()
    const a = inputA.trim().toLowerCase().replace(/^https?:\/\//, '').replace(/\/$/, '')
    const b = inputB.trim().toLowerCase().replace(/^https?:\/\//, '').replace(/\/$/, '')
    if (!a || !b) return
    router.push(`/compare?a=${encodeURIComponent(a)}&b=${encodeURIComponent(b)}`)
    loadBrand(a, setDataA, setLoadingA)
    loadBrand(b, setDataB, setLoadingB)
  }

  const allDims = dataA?.dimensions?.map(d => d.name) ??
    dataB?.dimensions?.map(d => d.name) ?? []

  return (
    <div className="page-wrap">
      <div className="page-header">
        <div className="section-label">Compare</div>
        <h1 className="page-h1">Compare Two Brands</h1>
        <p className="page-sub">Side-by-side signal scores and dimension breakdown.</p>
      </div>

      <form className="compare-form" onSubmit={handleCompare}>
        <input
          className="search-input"
          type="text"
          placeholder="Brand A domain"
          value={inputA}
          onChange={e => setInputA(e.target.value)}
        />
        <span className="compare-vs">vs</span>
        <input
          className="search-input"
          type="text"
          placeholder="Brand B domain"
          value={inputB}
          onChange={e => setInputB(e.target.value)}
        />
        <button type="submit" className="search-btn">Compare</button>
      </form>

      {(dataA || dataB || loadingA || loadingB) && (
        <div className="compare-grid">
          <div className="compare-col">
            {loadingA ? (
              <div className="state-center"><div className="spinner" /></div>
            ) : dataA ? (
              <>
                <div className="compare-brand-name">{dataA.brand_name ?? dataA.domain}</div>
                <div className="compare-score" style={{ color: SIG_COLOR[dataA.signal] ?? 'var(--t1)' }}>
                  {dataA.score}
                </div>
                <div className="compare-verdict" style={{ color: SIG_COLOR[dataA.signal] ?? 'var(--t2)' }}>
                  {VERDICT_SHORT[dataA.verdict] ?? dataA.verdict}
                </div>
              </>
            ) : inputA ? (
              <div className="state-label t2">Not found</div>
            ) : null}
          </div>

          <div className="compare-col">
            {loadingB ? (
              <div className="state-center"><div className="spinner" /></div>
            ) : dataB ? (
              <>
                <div className="compare-brand-name">{dataB.brand_name ?? dataB.domain}</div>
                <div className="compare-score" style={{ color: SIG_COLOR[dataB.signal] ?? 'var(--t1)' }}>
                  {dataB.score}
                </div>
                <div className="compare-verdict" style={{ color: SIG_COLOR[dataB.signal] ?? 'var(--t2)' }}>
                  {VERDICT_SHORT[dataB.verdict] ?? dataB.verdict}
                </div>
              </>
            ) : inputB ? (
              <div className="state-label t2">Not found</div>
            ) : null}
          </div>
        </div>
      )}

      {dataA && dataB && allDims.length > 0 && (
        <div className="compare-dims">
          <div className="br-section-label">Dimension comparison</div>
          {allDims.map(dimName => {
            const da = dataA.dimensions?.find(d => d.name === dimName)
            const db = dataB.dimensions?.find(d => d.name === dimName)
            return (
              <div key={dimName} className="compare-dim-row">
                <span className="compare-dim-score" style={{ color: da ? SIG_COLOR[da.signal] ?? 'var(--t2)' : 'var(--t3)' }}>
                  {da?.score ?? '—'}
                </span>
                <span className="compare-dim-label">{DIM_LABELS[dimName] ?? dimName}</span>
                <span className="compare-dim-score" style={{ color: db ? SIG_COLOR[db.signal] ?? 'var(--t2)' : 'var(--t3)' }}>
                  {db?.score ?? '—'}
                </span>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default function ComparePage() {
  return (
    <Suspense>
      <CompareContent />
    </Suspense>
  )
}
