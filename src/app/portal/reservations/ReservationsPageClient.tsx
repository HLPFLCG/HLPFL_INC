'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { createSupabaseBrowserClient } from '@/lib/portal/supabase-client'

interface Reservation {
  id: string
  guest_name: string
  party_size: number
  reservation_date: string
  reservation_time: string
  status: string
  created_at: string
  dinner_venues: { name: string } | null
}

const STATUS_COLORS: Record<string, string> = {
  pending: 'text-yellow-400 border-yellow-400/30 bg-yellow-400/10',
  confirmed: 'text-green-400 border-green-400/30 bg-green-400/10',
  declined: 'text-red-400 border-red-400/30 bg-red-400/10',
  expired: 'text-white/20 border-white/10',
}

export default function ReservationsPageClient() {
  const [reservations, setReservations] = useState<Reservation[]>([])
  const [loading, setLoading] = useState(true)
  const supabase = createSupabaseBrowserClient()

  useEffect(() => {
    supabase
      .from('dinner_reservations')
      .select('id,guest_name,party_size,reservation_date,reservation_time,status,created_at,dinner_venues(name)')
      .order('reservation_date', { ascending: false })
      .then(({ data }) => {
        setReservations((data as unknown as Reservation[]) ?? [])
        setLoading(false)
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="max-w-4xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <p className="text-gold uppercase tracking-[0.25em] text-xs mb-1">
            Dining
          </p>
          <h1 className="font-display text-3xl tracking-wider text-white">
            Reservations
          </h1>
        </div>
        <Link
          href="/portal/reservations/new"
          className="bg-gold hover:bg-gold-light text-white text-xs font-semibold px-4 py-2.5 tracking-wide transition-colors"
        >
          + New Reservation
        </Link>
      </div>

      {loading ? (
        <p className="text-white/30 text-sm">Loading…</p>
      ) : reservations.length === 0 ? (
        <div className="border border-void-lighter bg-void-light p-8 text-center">
          <p className="text-white/30 text-sm">No reservations yet.</p>
          <p className="text-white/20 text-xs mt-1">
            Book a table at one of our partner restaurants.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {reservations.map((r) => (
            <Link
              key={r.id}
              href={`/portal/reservations/${r.id}`}
              className="border border-void-lighter bg-void-light px-5 py-4 flex flex-wrap items-center justify-between gap-4 hover:border-gold/20 transition-colors block"
            >
              <div>
                <p className="text-white font-medium text-sm">
                  {r.dinner_venues?.name ?? 'Restaurant'}
                </p>
                <p className="text-white/40 text-xs mt-0.5">
                  {r.reservation_date} at {r.reservation_time} ·{' '}
                  {r.party_size} guest{r.party_size !== 1 ? 's' : ''}
                </p>
              </div>
              <span
                className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 border ${
                  STATUS_COLORS[r.status] ?? 'text-white/30 border-white/10'
                }`}
              >
                {r.status}
              </span>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
