import { createServerClient } from './supabase'

export interface DateRange {
  checkIn: string  // YYYY-MM-DD
  checkOut: string // YYYY-MM-DD
}

/**
 * Returns true if the property is available for the given date range.
 * Checks both confirmed bookings and manual availability blocks.
 * A property is unavailable if any confirmed booking or block overlaps the range.
 *
 * Overlap condition: existing.start < requested.end AND existing.end > requested.start
 */
export async function isAvailable(
  propertyId: string,
  { checkIn, checkOut }: DateRange
): Promise<boolean> {
  const db = createServerClient()

  const [{ data: bookings, error: bErr }, { data: blocks, error: blErr }] =
    await Promise.all([
      db
        .from('bookings')
        .select('check_in, check_out')
        .eq('property_id', propertyId)
        .eq('status', 'confirmed')
        .lt('check_in', checkOut)
        .gt('check_out', checkIn),
      db
        .from('availability_blocks')
        .select('start_date, end_date')
        .eq('property_id', propertyId)
        .lt('start_date', checkOut)
        .gt('end_date', checkIn),
    ])

  if (bErr || blErr) {
    throw new Error(`Availability check failed: ${bErr?.message ?? blErr?.message}`)
  }

  return (bookings?.length ?? 0) === 0 && (blocks?.length ?? 0) === 0
}

/**
 * Returns all booked date ranges for a property (for calendar display).
 * Includes confirmed bookings and manual blocks.
 */
export async function getUnavailableDateRanges(
  propertyId: string
): Promise<{ start: string; end: string; type: 'booking' | 'block' }[]> {
  const db = createServerClient()

  const [{ data: bookings }, { data: blocks }] = await Promise.all([
    db
      .from('bookings')
      .select('check_in, check_out')
      .eq('property_id', propertyId)
      .eq('status', 'confirmed'),
    db
      .from('availability_blocks')
      .select('start_date, end_date')
      .eq('property_id', propertyId),
  ])

  return [
    ...(bookings ?? []).map(b => ({ start: b.check_in, end: b.check_out, type: 'booking' as const })),
    ...(blocks ?? []).map(b => ({ start: b.start_date, end: b.end_date, type: 'block' as const })),
  ]
}

/**
 * Calculate total price in cents for a booking.
 * base_rate_cents × nights + cleaning_fee_cents
 */
export function calculateTotal(
  baseRateCents: number,
  cleaningFeeCents: number,
  checkIn: string,
  checkOut: string
): number {
  const nights = Math.round(
    (new Date(checkOut).getTime() - new Date(checkIn).getTime()) /
      (1000 * 60 * 60 * 24)
  )
  return baseRateCents * nights + cleaningFeeCents
}
