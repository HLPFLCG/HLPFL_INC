// src/lib/portal/booking-conflicts.ts
// Client-side pre-check for booking conflicts.
// The authoritative check is the Postgres EXCLUDE constraint in migration 0003.
// This helper provides a fast early rejection in the UI before the INSERT hits the DB.

import type { SupabaseClient } from '@supabase/supabase-js'

/**
 * Returns true if the proposed time range overlaps any active booking for
 * the given resource.
 *
 * This is a best-effort client check only — it is NOT authoritative.
 * The database EXCLUDE constraint is the source of truth.
 */
export async function hasBookingConflict(
  supabase: SupabaseClient,
  resourceId: string,
  startISO: string,
  endISO: string
): Promise<boolean> {
  const range = `[${startISO},${endISO})`
  const { data, error } = await supabase
    .from('bookings')
    .select('id')
    .eq('resource_id', resourceId)
    .in('status', ['pending', 'confirmed'])
    .overlaps('time_range', range)
    .limit(1)

  if (error) {
    // On error, let the DB constraint decide — don't block the user.
    console.warn('booking-conflicts: query error', error.message)
    return false
  }
  return (data?.length ?? 0) > 0
}
