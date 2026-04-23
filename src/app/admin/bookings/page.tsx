'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import type { Booking } from '@/lib/supabase'

type BookingWithProperty = Booking & {
  properties?: { name: string; slug: string } | null
}

const STATUS_COLORS: Record<string, string> = {
  pending: 'text-yellow-400 border-yellow-400/30 bg-yellow-400/10',
  confirmed: 'text-green-400 border-green-400/30 bg-green-400/10',
  cancelled: 'text-red-400 border-red-400/30 bg-red-400/10',
  completed: 'text-white/50 border-white/10 bg-white/5',
}

export default function AdminBookingsPage() {
  const [bookings, setBookings] = useState<BookingWithProperty[]>([])
  const [filter, setFilter] = useState<string>('all')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadBookings()
  }, [])

  async function loadBookings() {
    setLoading(true)
    const { data } = await supabase
      .from('bookings')
      .select('*, properties(name, slug)')
      .order('created_at', { ascending: false })
    setBookings((data as BookingWithProperty[]) ?? [])
    setLoading(false)
  }

  const filtered = filter === 'all' ? bookings : bookings.filter(b => b.status === filter)

  function formatPrice(cents: number) {
    return '$' + (cents / 100).toFixed(0)
  }

  async function updateStatus(bookingId: string, status: string) {
    await supabase.from('bookings').update({ status }).eq('id', bookingId)
    await loadBookings()
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-3xl tracking-wider text-white">BOOKINGS</h1>
          <p className="text-white/40 text-sm mt-1">{bookings.length} total</p>
        </div>
      </div>

      {/* Filter tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {['all', 'pending', 'confirmed', 'cancelled', 'completed'].map(status => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-4 py-1.5 text-xs font-semibold uppercase tracking-wider border transition-colors ${
              filter === status
                ? 'bg-gold border-gold text-white'
                : 'border-void-lighter text-white/40 hover:border-gold/40 hover:text-white/60'
            }`}
          >
            {status}
          </button>
        ))}
      </div>

      {loading ? (
        <p className="text-white/30 text-sm">Loading...</p>
      ) : filtered.length === 0 ? (
        <div className="border border-void-lighter bg-void-light p-10 text-center">
          <p className="text-white/30 text-sm">No bookings found.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map(booking => (
            <div
              key={booking.id}
              className="border border-void-lighter bg-void-light p-5 hover:border-gold/25 transition-colors"
            >
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 border ${STATUS_COLORS[booking.status] ?? ''}`}>
                      {booking.status}
                    </span>
                    {booking.properties && (
                      <Link
                        href={`/stays/${booking.properties.slug}/`}
                        className="text-xs text-gold/60 hover:text-gold transition-colors"
                      >
                        {booking.properties.name}
                      </Link>
                    )}
                  </div>
                  <p className="text-white font-medium">{booking.guest_name}</p>
                  <p className="text-white/40 text-xs">{booking.guest_email} · {booking.guest_phone}</p>
                  <p className="text-white/60 text-sm mt-1">
                    {booking.check_in} → {booking.check_out} · {booking.guest_count} guest{booking.guest_count !== 1 ? 's' : ''}
                  </p>
                </div>

                <div className="text-right">
                  <p className="font-display text-2xl text-gold tracking-wider">
                    {formatPrice(booking.total_cents)}
                  </p>
                  <p className="text-white/30 text-xs mt-1 font-mono">{booking.id.slice(0, 8)}…</p>

                  {/* Quick status update */}
                  {booking.status === 'pending' && (
                    <div className="flex gap-2 mt-3">
                      <button
                        onClick={() => updateStatus(booking.id, 'confirmed')}
                        className="text-[10px] uppercase tracking-wider text-green-400 border border-green-400/30 px-2 py-1 hover:bg-green-400/10 transition-colors"
                      >
                        Confirm
                      </button>
                      <button
                        onClick={() => updateStatus(booking.id, 'cancelled')}
                        className="text-[10px] uppercase tracking-wider text-red-400 border border-red-400/30 px-2 py-1 hover:bg-red-400/10 transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  )}
                  {booking.status === 'confirmed' && (
                    <button
                      onClick={() => updateStatus(booking.id, 'completed')}
                      className="mt-3 text-[10px] uppercase tracking-wider text-white/40 border border-white/10 px-2 py-1 hover:bg-white/5 transition-colors"
                    >
                      Mark Completed
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
