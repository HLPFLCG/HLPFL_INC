import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { createServerClient } from '@/lib/supabase'
import { getUnavailableDateRanges } from '@/lib/availability'
import PropertyPageClient from './PropertyPageClient'
import type { Property } from '@/lib/supabase'

const PLACEHOLDER: Property = {
  id: 'placeholder',
  slug: 'villa-caribe-azul',
  name: 'Villa Caribe Azul',
  description: 'Waking up 30 meters from the Caribbean Sea is exactly what this villa was built for. Two bedrooms, a wraparound porch, and the sound of howler monkeys at sunrise. No hotel, no front desk, no checkout line. Just yours for the week.',
  location: 'Puerto Viejo de Talamanca, Limón, Costa Rica',
  bedrooms: 2,
  bathrooms: 2,
  max_guests: 6,
  base_rate_cents: 18500,
  cleaning_fee_cents: 12000,
  amenities: ['Oceanfront', 'Private porch', 'Fully equipped kitchen', 'Free WiFi', 'Air conditioning', 'Hot water', 'Outdoor shower', 'Beach chairs & towels', 'BBQ grill', 'Secure parking', 'Ceiling fans', 'Mosquito nets', 'Local host support'],
  photos: [
    { url: '/stays/placeholder-villa.jpg', alt: 'Villa Caribe Azul — Puerto Viejo' },
    { url: '/stays/placeholder-villa.jpg', alt: 'Living room with ocean view' },
    { url: '/stays/placeholder-villa.jpg', alt: 'Master bedroom' },
  ],
  published: true,
  client_id: null,
  created_at: '',
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  let name = 'Vacation Rental'
  let description = 'Direct-booking vacation rental on Costa Rica\'s Caribbean coast.'
  try {
    const db = createServerClient()
    const { data } = await db.from('properties').select('name, description').eq('slug', slug).single()
    if (data) { name = data.name; description = data.description.slice(0, 160) }
  } catch {}
  return {
    title: `${name} — Stays`,
    description,
    alternates: { canonical: `https://hlpfl.org/stays/${slug}/` },
  }
}

export const revalidate = 60
export const dynamicParams = true // allow slugs not returned by generateStaticParams

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  try {
    const db = createServerClient()
    const { data } = await db.from('properties').select('slug').eq('published', true)
    return (data ?? []).map(p => ({ slug: p.slug }))
  } catch {
    return [{ slug: 'villa-caribe-azul' }]
  }
}

export default async function PropertyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params

  let property: Property | null = null
  let unavailableDates: { start: string; end: string; type: 'booking' | 'block' }[] = []

  try {
    const db = createServerClient()
    const { data } = await db.from('properties').select('*').eq('slug', slug).eq('published', true).single()
    property = data
    if (property) {
      unavailableDates = await getUnavailableDateRanges(property.id)
    }
  } catch {}

  if (!property) {
    if (slug === 'villa-caribe-azul') {
      property = PLACEHOLDER
    } else {
      notFound()
    }
  }

  return <PropertyPageClient property={property} unavailableDates={unavailableDates} />
}
