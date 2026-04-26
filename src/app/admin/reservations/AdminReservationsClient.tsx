'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'

interface Reservation {
  id: string
  guest_name: string
  guest_email: string
  party_size: number
  reservation_date: string
  reservation_time: string
  status: string
  special_requests: string | null
  escalated_at: string | null
  confirmed_at: string | null
  declined_at: string | null
  created_at: string
  dinner_venues: { name: string } | null
  customers: { email: string; display_name: string | null } | null
}

const STATUS_COLORS: Record<string, string> = {
  pending: 'text-yellow-400 border-yellow-400/30 bg-yellow-400/10',
  confirmed: 'text-green-400 border-green-400/30 bg-green-400/10',
  declined: 'text-red-400 border-red-400/30 bg-red-400/10',
  expired: 'text-white/20 border-white/10',
}

export default function AdminReservationsClient() {
  const [reservations, setReservations] = useState<Reservation[]>([])
  const [loading, setLoading] = useState(true)
  const [statusFilter, setStatusFilter] = useState('all')

  useEffect(() => {
    supabase
      .from('dinner_reservations')
      .select('*,dinner_venues(name),customers(email,display_name)')
      .order('reservation_date', { ascending: false })
      .then(({ data }) => {
        setReservations((data as unknown as Reservation[]) ?? [])
        setLoading(false)
      })
  }, [])

  const filtered =
    statusFilter === 'all'
      ? reservations
      : reservations.filter((r) => r.status === statusFilter)

  return (
    <div className="max-w-5xl">
      <div className="mb-8">
        <h1 className="font-display text-3xl tracking-wider text-white">
          Dinner Reservations
        </h1>
        <p className="text-white/40 text-sm mt-1">
          {reservations.filter((r) => r.status === 'pending').length} pending
        </p>
      </div>

      {/* Status filter */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {['all', 'pending', 'confirmed', 'declined', 'expired'].map((s) => (
          <button
            key={s}
            onClick={() => setStatusFilter(s)}
            className={`text-xs px-3 py-1.5 border transition-colors ${
              statusFilter === s
                ? 'border-gold/50 text-gold bg-gold/10'
                : 'border-void-lighter text-white/40 hover:text-white'
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      {loading ? (
        <p className="text-white/30 text-sm">Loading…</p>
      ) : filtered.length === 0 ? (
        <div className="border border-void-lighter bg-void-light p-8 text-center">
          <p className="text-white/30 text-sm">No reservations.</p>
        </div>
      ) : (
        <div className="space-y-2">
          {filtered.map((r) => (
            <div
              key={r.id}
              className="border border-void-lighter bg-void-light px-5 py-4"
            >
              <div className="flex flex-wrap items-center justify-between gap-4 mb-2">
                <div>
                  <p className="text-white font-medium text-sm">
                    {r.dinner_venues?.name ?? 'Unknown venue'} —{' '}
                    {r.guest_name}
                  </p>
                  <p className="text-white/40 text-xs mt-0.5">
                    {r.reservation_date} at {r.reservation_time} ·{' '}
                    {r.party_size} guest{r.party_size !== 1 ? 's' : ''} ·{' '}
                    {r.customers?.display_name ?? r.customers?.email ?? r.guest_email}
                  </p>
                </div>
                <span
                  className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 border ${
                    STATUS_COLORS[r.status] ?? 'text-white/30 border-white/10'
                  }`}
                >
                  {r.status}
                  {r.escalated_at ? ' ⚡' : ''}
                </span>
              </div>
              {r.special_requests && (
                <p className="text-white/30 text-xs border-t border-void-lighter pt-2 mt-2">
                  Note: {r.special_requests}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
