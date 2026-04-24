import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { createServerClient } from '@/lib/supabase'
import BookingFormClient from './BookingFormClient'
import type { Property } from '@/lib/supabase'

export const metadata: Metadata = {
  title: 'Request to Book — Stays',
  description: 'Complete your booking request.',
  robots: { index: false, follow: false },
}

export const runtime = 'edge'
export const dynamic = 'force-dynamic'

const PLACEHOLDER: Property = {
  id: 'placeholder',
  slug: 'villa-caribe-azul',
  name: 'Villa Caribe Azul',
  description: 'Oceanfront villa in Puerto Viejo.',
  location: 'Puerto Viejo de Talamanca, Costa Rica',
  bedrooms: 2,
  bathrooms: 2,
  max_guests: 6,
  base_rate_cents: 18500,
  cleaning_fee_cents: 12000,
  amenities: [],
  photos: [{ url: '/stays/placeholder-villa.jpg', alt: 'Villa Caribe Azul' }],
  published: true,
  created_at: '',
}

export default async function BookPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ checkIn?: string; checkOut?: string }>
}) {
  const { slug } = await params
  const { checkIn, checkOut } = await searchParams

  let property: Property | null = null
  try {
    const db = createServerClient()
    const { data } = await db.from('properties').select('*').eq('slug', slug).eq('published', true).single()
    property = data
  } catch {}

  if (!property) {
    if (slug === 'villa-caribe-azul') {
      property = PLACEHOLDER
    } else {
      notFound()
    }
  }

  return (
    <BookingFormClient
      property={property}
      checkIn={checkIn ?? ''}
      checkOut={checkOut ?? ''}
    />
  )
}
