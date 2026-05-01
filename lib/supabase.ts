import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type UserTier = 'free' | 'pro' | 'brand' | 'retailer'

export async function getSession() {
  const { data: { session } } = await supabase.auth.getSession()
  return session
}

export async function getUserTierFromApi(): Promise<{ tier: UserTier; scansRemaining: number | null } | null> {
  const session = await getSession()
  if (!session) return null

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/stripe/subscription`, {
    headers: { Authorization: `Bearer ${session.access_token}` },
  })
  if (!res.ok) return null
  const data = await res.json()
  return { tier: data.data?.tier ?? 'free', scansRemaining: data.data?.scansRemaining ?? null }
}
