import type { Metadata } from 'next'
import { createServerClient } from '@/lib/supabase'
import ConfirmationClient from './ConfirmationClient'
import type { Booking, Property } from '@/lib/supabase'

export const metadata: Metadata = {
  title: 'Booking Confirmed — Stays',
  description: 'Your booking is confirmed.',
  robots: { index: false, follow: false },
}

export const dynamic = 'force-dynamic'

export default async function ConfirmationPage({ params }: { params: Promise<{ bookingId: string }> }) {
  const { bookingId } = await params

  let booking: Booking | null = null
  let property: Property | null = null

  try {
    const db = createServerClient()
    const { data: bookingData } = await db
      .from('bookings')
      .select('*')
      .eq('id', bookingId)
      .single()

    booking = bookingData

    if (booking) {
      const { data: propData } = await db
        .from('properties')
        .select('*')
        .eq('id', booking.property_id)
        .single()
      property = propData
    }
  } catch {}

  return <ConfirmationClient booking={booking} property={property} />
}
