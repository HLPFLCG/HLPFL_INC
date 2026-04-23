import type { Metadata } from 'next'
import { createServerClient } from '@/lib/supabase'
import StaysPageClient from './StaysPageClient'
import type { Property } from '@/lib/supabase'

export const metadata: Metadata = {
  title: 'Stays — Direct-Booking Caribbean Villas',
  description: 'Book direct. No Airbnb middleman. Oceanfront villas and vacation rentals on Costa Rica\'s Caribbean coast.',
  alternates: { canonical: 'https://hlpfl.org/stays/' },
}

export const revalidate = 60

export default async function StaysPage() {
  let properties: Property[] = []
  try {
    const db = createServerClient()
    const { data } = await db
      .from('properties')
      .select('*')
      .eq('published', true)
      .order('created_at', { ascending: true })
    properties = data ?? []
  } catch {
    // Supabase not configured yet — show placeholder
  }

  return <StaysPageClient properties={properties} />
}
