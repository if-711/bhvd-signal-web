export const API = process.env.NEXT_PUBLIC_API_URL ?? 'https://bhvd-signal-api.fly.dev'

export function esc(str: unknown): string {
  return String(str ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

export const SIG_COLOR: Record<string, string> = {
  green: '#1e9459',
  yellow: '#c07718',
  red: '#9e3028',
}

export const VERDICT_COLOR: Record<string, string> = {
  ALIGNED: '#1e9459',
  VALIDATED: '#1e9459',
  'GENERALLY ALIGNED': '#c07718',
  'PARTIALLY ALIGNED': '#b06a10',
  OVEREXTENDED: '#9e3028',
  INFLATED: '#9e3028',
  'EVIDENCE GAP': '#7a2018',
}

export const VERDICT_SHORT: Record<string, string> = {
  ALIGNED: 'Aligned',
  VALIDATED: 'Validated',
  'GENERALLY ALIGNED': 'Generally Aligned',
  'PARTIALLY ALIGNED': 'Partially Aligned',
  OVEREXTENDED: 'Overextended',
  INFLATED: 'Inflated',
  'EVIDENCE GAP': 'Evidence Gap',
}

export const SIGNAL_COLORS: Record<string, string> = SIG_COLOR

export function signalColor(sig: string | null | undefined) {
  return SIG_COLOR[sig ?? ''] ?? '#8b93b0'
}

export function timeAgo(iso: string | null | undefined): string {
  if (!iso) return ''
  const diff = Date.now() - new Date(iso).getTime()
  const days = Math.floor(diff / 86400000)
  if (days < 1) return 'today'
  if (days === 1) return 'yesterday'
  if (days < 7) return `${days}d ago`
  const wks = Math.floor(days / 7)
  if (wks < 5) return `${wks}w ago`
  return `${Math.floor(days / 30)}mo ago`
}

export async function fetchDomain(domain: string) {
  const r = await fetch(`${API}/api/domain/${encodeURIComponent(domain)}`)
  if (!r.ok) throw new Error(`API ${r.status}`)
  return r.json()
}

export async function fetchLeaderboard(category = 'all') {
  const r = await fetch(`${API}/api/leaderboard/${encodeURIComponent(category)}`)
  if (!r.ok) throw new Error(`API ${r.status}`)
  return r.json()
}

export async function fetchMovers() {
  const r = await fetch(`${API}/api/leaderboard/movers`)
  if (!r.ok) throw new Error(`API ${r.status}`)
  return r.json()
}

export async function fetchCategoryRankings() {
  const r = await fetch(`${API}/api/leaderboard/category-rankings`)
  if (!r.ok) throw new Error(`API ${r.status}`)
  return r.json()
}

export async function fetchDemand(domain?: string) {
  const url = domain ? `${API}/api/demand/${encodeURIComponent(domain)}` : `${API}/api/demand`
  const r = await fetch(url)
  if (!r.ok) throw new Error(`API ${r.status}`)
  return r.json()
}

export async function postDemand(domain: string) {
  await fetch(`${API}/api/demand`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ domain }),
  }).catch(() => {})
}

export async function capture(type: string, opts: {
  email?: string
  domain?: string
  brand_name?: string
  meta?: Record<string, unknown>
}) {
  await fetch(`${API}/api/capture`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ type, ...opts }),
  }).catch(() => {})
}

export async function track(event_name: string, meta?: Record<string, unknown>) {
  await fetch(`${API}/api/event`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ event: event_name, meta: meta ?? null }),
  }).catch(() => {})
}
