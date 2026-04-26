'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { createSupabaseBrowserClient } from '@/lib/portal/supabase-client'

interface Booking {
  id: string
  time_range: string
  status: string
  guest_count: number
  notes: string | null
  amount_cents: number | null
  created_at: string
  booking_resources: { name: string; resource_type: string } | null
}

const STATUS_COLORS: Record<string, string> = {
  pending: 'text-yellow-400 border-yellow-400/30 bg-yellow-400/10',
  confirmed: 'text-green-400 border-green-400/30 bg-green-400/10',
  cancelled: 'text-red-400 border-red-400/30 bg-red-400/10',
  completed: 'text-white/30 border-white/10',
}

function formatRange(range: string) {
  // tstzrange format: ["2024-01-01T10:00:00+00","2024-01-03T10:00:00+00")
  const match = range.match(/\["?([^",]+)"?,"?([^")\]]+)"?/)
  if (!match) return range
  const fmt = (s: string) =>
    new Date(s).toLocaleDateString(undefined, {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    })
  return `${fmt(match[1])} → ${fmt(match[2])}`
}

export default function BookingsPageClient() {
  const [bookings, setBookings] = useState<Booking[]>([])
  const [loading, setLoading] = useState(true)
  const supabase = createSupabaseBrowserClient()

  useEffect(() => {
    async function load() {
      const { data } = await supabase
        .from('bookings')
        .select('*, booking_resources(name, resource_type)')
        .order('created_at', { ascending: false })
      setBookings((data as Booking[]) ?? [])
      setLoading(false)
    }
    load()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="max-w-4xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <p className="text-gold uppercase tracking-[0.25em] text-xs mb-1">
            Your Reservations
          </p>
          <h1 className="font-display text-3xl tracking-wider text-white">
            Bookings
          </h1>
        </div>
        <Link
          href="/portal/bookings/new"
          className="bg-gold hover:bg-gold-light text-white text-xs font-semibold px-4 py-2.5 tracking-wide transition-colors"
        >
          + New Booking
        </Link>
      </div>

      {loading ? (
        <p className="text-white/30 text-sm">Loading…</p>
      ) : bookings.length === 0 ? (
        <div className="border border-void-lighter bg-void-light p-8 text-center">
          <p className="text-white/30 text-sm">No bookings yet.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {bookings.map((b) => (
            <div
              key={b.id}
              className="border border-void-lighter bg-void-light px-5 py-4 flex flex-wrap items-center justify-between gap-4"
            >
              <div>
                <p className="text-white font-medium text-sm">
                  {b.booking_resources?.name ?? 'Resource'}
                </p>
                <p className="text-white/40 text-xs mt-0.5">
                  {formatRange(b.time_range)} · {b.guest_count} guest
                  {b.guest_count !== 1 ? 's' : ''}
                </p>
              </div>
              <div className="flex items-center gap-4">
                {b.amount_cents && (
                  <p className="text-gold text-sm font-semibold">
                    ${(b.amount_cents / 100).toFixed(0)}
                  </p>
                )}
                <span
                  className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 border ${
                    STATUS_COLORS[b.status] ?? 'text-white/30 border-white/10'
                  }`}
                >
                  {b.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
