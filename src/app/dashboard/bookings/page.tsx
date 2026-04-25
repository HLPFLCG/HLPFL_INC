'use client'

import { useState, useEffect } from 'react'
import { supabase, formatCents, nightsBetween } from '@/lib/supabase'
import { useDashboard } from '../DashboardLayoutClient'
import type { Booking, Property } from '@/lib/supabase'

type BookingWithProperty = Booking & { properties?: { name: string; slug: string } | null }

const STATUS_COLORS: Record<string, string> = {
  pending:   'text-yellow-400 border-yellow-400/30 bg-yellow-400/10',
  confirmed: 'text-green-400  border-green-400/30  bg-green-400/10',
  cancelled: 'text-red-400    border-red-400/30    bg-red-400/10',
  completed: 'text-white/40   border-white/10      bg-white/5',
}

export default function DashboardBookingsPage() {
  const { client } = useDashboard()
  const [bookings, setBookings] = useState<BookingWithProperty[]>([])
  const [properties, setProperties] = useState<Property[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')
  const [propertyFilter, setPropertyFilter] = useState('all')

  useEffect(() => {
    if (!client) { setLoading(false); return }
    Promise.all([
      supabase
        .from('bookings')
        .select('*, properties!inner(name, slug, client_id)')
        .eq('properties.client_id', client.id)
        .order('check_in', { ascending: false }),
      supabase.from('properties').select('id, name, slug').eq('client_id', client.id),
    ]).then(([b, p]) => {
      setBookings((b.data as BookingWithProperty[]) ?? [])
      setProperties((p.data as Property[]) ?? [])
      setLoading(false)
    })
  }, [client])

  async function updateStatus(id: string, status: string) {
    await supabase.from('bookings').update({ status }).eq('id', id)
    setBookings(prev => prev.map(b => b.id === id ? { ...b, status: status as Booking['status'] } : b))
  }

  const filtered = bookings.filter(b => {
    if (filter !== 'all' && b.status !== filter) return false
    if (propertyFilter !== 'all' && b.property_id !== propertyFilter) return false
    return true
  })

  const total = filtered.filter(b => b.status === 'confirmed').reduce((s, b) => s + b.total_cents, 0)

  return (
    <div className="max-w-5xl">
      <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
        <div>
          <p className="text-gold uppercase tracking-[0.25em] text-xs mb-1">Bookings</p>
          <h1 className="font-display text-3xl tracking-wider text-white">ALL BOOKINGS</h1>
        </div>
        {total > 0 && (
          <div className="text-right">
            <p className="text-xs text-white/40 uppercase tracking-wider">Filtered earnings</p>
            <p className="font-display text-2xl text-gold tracking-wider">{formatCents(total)}</p>
          </div>
        )}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2 mb-5">
        <div className="flex flex-wrap gap-1">
          {['all', 'pending', 'confirmed', 'cancelled', 'completed'].map(s => (
            <button key={s} onClick={() => setFilter(s)}
              className={`px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider border transition-colors ${
                filter === s ? 'bg-gold border-gold text-white' : 'border-void-lighter text-white/40 hover:border-gold/40'
              }`}>
              {s}
            </button>
          ))}
        </div>
        {properties.length > 1 && (
          <select value={propertyFilter} onChange={e => setPropertyFilter(e.target.value)}
            className="bg-void-light border border-void-lighter text-sm text-white px-3 py-1.5 outline-none focus:border-gold/50 appearance-none">
            <option value="all">All properties</option>
            {properties.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
          </select>
        )}
      </div>

      {loading ? (
        <p className="text-white/30 text-sm">Loading...</p>
      ) : filtered.length === 0 ? (
        <div className="border border-void-lighter bg-void-light p-10 text-center">
          <p className="text-white/30 text-sm">No bookings match this filter.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map(b => (
            <div key={b.id}
              className="border border-void-lighter bg-void-light p-5 hover:border-gold/20 transition-colors">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 border ${STATUS_COLORS[b.status] ?? ''}`}>
                      {b.status}
                    </span>
                    {b.properties?.name && (
                      <span className="text-xs text-white/40">{b.properties.name}</span>
                    )}
                  </div>
                  <p className="text-white font-medium">{b.guest_name}</p>
                  <p className="text-white/40 text-xs">{b.guest_email} · {b.guest_phone}</p>
                  <p className="text-white/60 text-sm mt-1">
                    {b.check_in} → {b.check_out} ·{' '}
                    {nightsBetween(b.check_in, b.check_out)} nights ·{' '}
                    {b.guest_count} guest{b.guest_count !== 1 ? 's' : ''}
                  </p>
                </div>

                <div className="text-right shrink-0">
                  <p className="font-display text-2xl text-gold tracking-wider">{formatCents(b.total_cents)}</p>
                  <p className="text-white/25 text-[10px] font-mono mt-1">{b.id.slice(0, 8)}…</p>
                  <div className="flex gap-2 mt-3 justify-end flex-wrap">
                    {b.status === 'pending' && (
                      <>
                        <button onClick={() => updateStatus(b.id, 'confirmed')}
                          className="text-[10px] uppercase tracking-wider text-green-400 border border-green-400/30 px-2 py-1 hover:bg-green-400/10 transition-colors">
                          Confirm
                        </button>
                        <button onClick={() => updateStatus(b.id, 'cancelled')}
                          className="text-[10px] uppercase tracking-wider text-red-400 border border-red-400/30 px-2 py-1 hover:bg-red-400/10 transition-colors">
                          Cancel
                        </button>
                      </>
                    )}
                    {b.status === 'confirmed' && (
                      <button onClick={() => updateStatus(b.id, 'completed')}
                        className="text-[10px] uppercase tracking-wider text-white/40 border border-white/10 px-2 py-1 hover:bg-white/5 transition-colors">
                        Complete
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
