'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { supabase, formatCents, nightsBetween } from '@/lib/supabase'
import { useDashboard } from './DashboardLayoutClient'
import type { Booking, Property } from '@/lib/supabase'

type BookingWithProperty = Booking & { properties?: { name: string; slug: string } | null }

export default function DashboardOverviewPage() {
  const { client } = useDashboard()
  const [bookings, setBookings] = useState<BookingWithProperty[]>([])
  const [properties, setProperties] = useState<Property[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!client) { setLoading(false); return }
    Promise.all([
      supabase
        .from('bookings')
        .select('*, properties!inner(name, slug, client_id)')
        .eq('properties.client_id', client.id)
        .order('created_at', { ascending: false })
        .limit(50),
      supabase
        .from('properties')
        .select('*')
        .eq('client_id', client.id),
    ]).then(([b, p]) => {
      setBookings((b.data as BookingWithProperty[]) ?? [])
      setProperties(p.data ?? [])
      setLoading(false)
    })
  }, [client])

  const confirmed = bookings.filter(b => b.status === 'confirmed')
  const pending = bookings.filter(b => b.status === 'pending')
  const totalEarnings = confirmed.reduce((sum, b) => sum + b.total_cents, 0)
  const thisMonth = confirmed.filter(b => b.created_at?.slice(0, 7) === new Date().toISOString().slice(0, 7))
  const monthlyEarnings = thisMonth.reduce((sum, b) => sum + b.total_cents, 0)

  const recentBookings = [...bookings].slice(0, 5)

  // Next upcoming check-in
  const today = new Date().toISOString().split('T')[0]
  const upcoming = confirmed
    .filter(b => b.check_in >= today)
    .sort((a, b) => a.check_in.localeCompare(b.check_in))[0]

  const STATUS_DOT: Record<string, string> = {
    pending: 'bg-yellow-400',
    confirmed: 'bg-green-400',
    cancelled: 'bg-red-400',
    completed: 'bg-white/20',
  }

  if (!client) {
    return (
      <div className="max-w-lg">
        <h1 className="font-display text-3xl tracking-wider text-white mb-4">DASHBOARD</h1>
        <div className="border border-gold/25 bg-gold/[0.04] p-6">
          <p className="text-gold font-semibold text-sm mb-2">Account Pending</p>
          <p className="text-white/60 text-sm leading-relaxed">
            Your HLPFL client account is being set up. You&apos;ll receive an email once you&apos;re activated.
            In the meantime, reach out at{' '}
            <a href="mailto:hello@hlpfl.com" className="text-gold hover:text-gold-light transition-colors">
              hello@hlpfl.com
            </a>
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-5xl">
      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-4 mb-8">
        <div>
          <p className="text-gold uppercase tracking-[0.25em] text-xs mb-1">Overview</p>
          <h1 className="font-display text-3xl tracking-wider text-white">
            {client.business_name ?? client.name}
          </h1>
        </div>
        <Link href="/dashboard/properties"
          className="bg-gold hover:bg-gold-light text-white text-xs font-semibold px-5 py-2.5 tracking-wide transition-colors">
          + Add Property
        </Link>
      </div>

      {/* Stats row */}
      {loading ? (
        <div className="h-24 flex items-center">
          <span className="text-white/30 text-sm">Loading...</span>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {[
              { label: 'Total Earnings', value: formatCents(totalEarnings), sub: 'all confirmed' },
              { label: 'This Month', value: formatCents(monthlyEarnings), sub: `${thisMonth.length} booking${thisMonth.length !== 1 ? 's' : ''}` },
              { label: 'Pending', value: String(pending.length), sub: 'awaiting payment' },
              { label: 'Properties', value: String(properties.length), sub: `${properties.filter(p => p.published).length} published` },
            ].map(stat => (
              <div key={stat.label} className="bg-void-light border border-void-lighter p-5">
                <p className="text-xs text-white/40 uppercase tracking-wider mb-2">{stat.label}</p>
                <p className="font-display text-3xl text-gold tracking-wider">{stat.value}</p>
                <p className="text-xs text-white/30 mt-1">{stat.sub}</p>
              </div>
            ))}
          </div>

          {/* Upcoming check-in callout */}
          {upcoming && (
            <div className="border border-gold/25 bg-gold/[0.04] px-6 py-5 mb-8 flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-xs text-gold uppercase tracking-wider mb-1">Next Check-in</p>
                <p className="text-white font-semibold">{upcoming.guest_name}</p>
                <p className="text-white/50 text-sm">
                  {upcoming.check_in} → {upcoming.check_out} ·{' '}
                  {nightsBetween(upcoming.check_in, upcoming.check_out)} nights ·{' '}
                  {upcoming.guest_count} guest{upcoming.guest_count !== 1 ? 's' : ''}
                </p>
              </div>
              <p className="font-display text-2xl text-gold tracking-wider">{formatCents(upcoming.total_cents)}</p>
            </div>
          )}

          {/* Recent bookings */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <p className="text-xs font-semibold uppercase tracking-widest text-white/40">Recent Bookings</p>
              <Link href="/dashboard/bookings" className="text-xs text-gold/60 hover:text-gold transition-colors">
                View all →
              </Link>
            </div>

            {recentBookings.length === 0 ? (
              <div className="border border-void-lighter bg-void-light p-8 text-center">
                <p className="text-white/30 text-sm">No bookings yet.</p>
                <p className="text-white/20 text-xs mt-2">Share your booking link to get started.</p>
              </div>
            ) : (
              <div className="space-y-2">
                {recentBookings.map(b => (
                  <div key={b.id} className="border border-void-lighter bg-void-light px-5 py-4 flex flex-wrap items-center justify-between gap-3 hover:border-gold/20 transition-colors">
                    <div className="flex items-center gap-3">
                      <span className={`w-2 h-2 rounded-full shrink-0 ${STATUS_DOT[b.status]}`} />
                      <div>
                        <p className="text-white text-sm font-medium">{b.guest_name}</p>
                        <p className="text-white/40 text-xs">
                          {b.check_in} → {b.check_out}
                          {b.properties?.name ? ` · ${b.properties.name}` : ''}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-gold font-semibold text-sm">{formatCents(b.total_cents)}</p>
                      <p className="text-white/30 text-[10px] capitalize">{b.status}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Properties quick view */}
          {properties.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <p className="text-xs font-semibold uppercase tracking-widest text-white/40">Your Properties</p>
                <Link href="/dashboard/properties" className="text-xs text-gold/60 hover:text-gold transition-colors">
                  Manage →
                </Link>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                {properties.map(p => (
                  <div key={p.id} className="border border-void-lighter bg-void-light p-5 flex items-center justify-between gap-4">
                    <div>
                      <p className="text-white font-medium">{p.name}</p>
                      <p className="text-white/40 text-xs">{p.location}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 border ${
                        p.published ? 'text-green-400 border-green-400/30 bg-green-400/10' : 'text-white/30 border-white/10'
                      }`}>
                        {p.published ? 'Live' : 'Draft'}
                      </span>
                      <Link href={`/stays/${p.slug}/`}
                        className="text-xs text-gold/50 hover:text-gold transition-colors">
                        View →
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  )
}
