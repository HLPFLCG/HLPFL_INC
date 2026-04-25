import { createClient } from '@supabase/supabase-js'

// ─── DATABASE TYPES ───────────────────────────────────────────────────────────

export type BookingStatus = 'pending' | 'confirmed' | 'cancelled' | 'completed'

export interface Client {
  id: string
  user_id: string
  name: string
  email: string
  business_name: string | null
  stripe_account_id: string | null
  stripe_onboarded: boolean
  api_key: string
  plan: 'free' | 'pro'
  whatsapp_number: string | null
  created_at: string
}

export interface Property {
  id: string
  slug: string
  name: string
  description: string
  location: string
  bedrooms: number
  bathrooms: number
  max_guests: number
  base_rate_cents: number
  cleaning_fee_cents: number
  amenities: string[]
  photos: { url: string; alt: string }[]
  published: boolean
  client_id: string | null
  created_at: string
}

export interface Booking {
  id: string
  property_id: string
  guest_name: string
  guest_email: string
  guest_phone: string
  check_in: string
  check_out: string
  guest_count: number
  total_cents: number
  status: BookingStatus
  stripe_payment_link_id: string | null
  stripe_payment_intent_id: string | null
  created_at: string
}

export interface AvailabilityBlock {
  id: string
  property_id: string
  start_date: string
  end_date: string
  reason: string | null
  created_at: string
}

// ─── CLIENTS ──────────────────────────────────────────────────────────────────
// Fallback placeholder URLs prevent Supabase from throwing during Next.js build.
// Real env vars must be set before any actual Supabase calls execute at runtime.

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? 'https://placeholder.supabase.co'
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? 'placeholder-anon-key'
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY ?? 'placeholder-service-key'

/** Browser / client-side client — uses anon key, respects RLS */
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

/** Server-only client — uses service role key, bypasses RLS. Call inside request handlers only. */
export function createServerClient() {
  return createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY, {
    auth: { persistSession: false },
  })
}

// ─── HELPERS ──────────────────────────────────────────────────────────────────

/** Resolve the authenticated client record for the current user session.
 *  Returns null if not authenticated or no client record found. */
export async function getMyClient(): Promise<Client | null> {
  const { data: { session } } = await supabase.auth.getSession()
  if (!session) return null
  const { data } = await supabase.from('clients').select('*').eq('user_id', session.user.id).single()
  return data ?? null
}

/** Format cents → "$185" */
export function formatCents(cents: number): string {
  return '$' + (cents / 100).toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 2 })
}

/** Night count between two ISO date strings */
export function nightsBetween(checkIn: string, checkOut: string): number {
  return Math.round((new Date(checkOut).getTime() - new Date(checkIn).getTime()) / (1000 * 60 * 60 * 24))
}
