'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { supabase, formatCents, nightsBetween } from '@/lib/supabase'
import { useDashboard } from '../DashboardLayoutClient'
import type { Booking } from '@/lib/supabase'

type BookingWithProperty = Booking & { properties?: { name: string; slug: string } | null }

function monthLabel(iso: string) {
  const [y, m] = iso.split('-')
  const d = new Date(Number(y), Number(m) - 1, 1)
  return d.toLocaleString('en-US', { month: 'long', year: 'numeric' })
}

export default function DashboardEarningsPage() {
  const { client } = useDashboard()
  const [bookings, setBookings] = useState<BookingWithProperty[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      if (!client) { setLoading(false); return }
      const { data } = await supabase
        .from('bookings')
        .select('*, properties!inner(name, slug, client_id)')
        .eq('properties.client_id', client.id)
        .eq('status', 'confirmed')
        .order('check_in', { ascending: false })
      setBookings((data as BookingWithProperty[]) ?? [])
      setLoading(false)
    }
    load()
  }, [client])

  // Group by YYYY-MM
  const byMonth: Record<string, BookingWithProperty[]> = {}
  for (const b of bookings) {
    const key = b.check_in.slice(0, 7)
    if (!byMonth[key]) byMonth[key] = []
    byMonth[key].push(b)
  }
  const months = Object.keys(byMonth).sort().reverse()

  const totalAllTime = bookings.reduce((s, b) => s + b.total_cents, 0)
  const thisMonthKey = new Date().toISOString().slice(0, 7)
  const thisMonthTotal = (byMonth[thisMonthKey] ?? []).reduce((s, b) => s + b.total_cents, 0)
  const avgPerBooking = bookings.length > 0 ? Math.round(totalAllTime / bookings.length) : 0

  const stripeConnected = client?.stripe_onboarded && client?.stripe_account_id

  return (
    <div className="max-w-4xl">
      <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
        <div>
          <p className="text-gold uppercase tracking-[0.25em] text-xs mb-1">Earnings</p>
          <h1 className="font-display text-3xl tracking-wider text-white">REVENUE</h1>
        </div>
        {/* Stripe Connect CTA */}
        {!stripeConnected ? (
          <Link href="/api/v1/stripe/connect"
            className="flex items-center gap-2 bg-[#6772e5] hover:bg-[#7c85ed] text-white text-xs font-semibold px-5 py-2.5 tracking-wide transition-colors">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
              <path d="M13.976 9.15c-2.172-.806-3.356-1.426-3.356-2.409 0-.831.683-1.305 1.901-1.305 2.227 0 4.515.858 6.09 1.631l.89-5.494C18.252.975 15.697 0 12.165 0 9.667 0 7.589.654 6.104 1.872 4.56 3.147 3.757 4.992 3.757 7.218c0 4.039 2.467 5.76 6.476 7.219 2.585.92 3.445 1.574 3.445 2.583 0 .98-.84 1.545-2.354 1.545-1.875 0-4.965-.921-6.99-2.109l-.9 5.555C5.175 22.99 8.385 24 11.714 24c2.641 0 4.843-.624 6.328-1.813 1.664-1.305 2.525-3.236 2.525-5.732 0-4.128-2.524-5.851-6.591-7.305z"/>
            </svg>
            Connect Stripe Account
          </Link>
        ) : (
          <a href={`https://dashboard.stripe.com/${client.stripe_account_id}`}
            target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-2 border border-[#6772e5]/40 text-[#a0a8f8] hover:text-white text-xs font-semibold px-5 py-2.5 tracking-wide transition-colors">
            Open Stripe Dashboard →
          </a>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
        {[
          { label: 'All-time Earnings', value: formatCents(totalAllTime), sub: `${bookings.length} confirmed bookings` },
          { label: 'This Month', value: formatCents(thisMonthTotal), sub: `${byMonth[thisMonthKey]?.length ?? 0} bookings` },
          { label: 'Avg Per Booking', value: formatCents(avgPerBooking), sub: 'before Stripe fees' },
        ].map(s => (
          <div key={s.label} className="bg-void-light border border-void-lighter p-5">
            <p className="text-xs text-white/40 uppercase tracking-wider mb-2">{s.label}</p>
            <p className="font-display text-3xl text-gold tracking-wider">{s.value}</p>
            <p className="text-xs text-white/30 mt-1">{s.sub}</p>
          </div>
        ))}
      </div>

      {/* Stripe fee note */}
      <div className="border border-gold/10 bg-gold/[0.03] px-5 py-4 mb-8 flex items-start gap-3 text-sm">
        <span className="text-gold mt-0.5 shrink-0">◆</span>
        <div className="text-white/50 text-xs leading-relaxed">
          These figures are gross booking totals. Stripe charges ~3% per transaction.
          {stripeConnected
            ? ' Your net payouts are visible in your Stripe dashboard.'
            : ' Connect your Stripe account above to see net payouts and transfer history.'}
        </div>
      </div>

      {/* Monthly breakdown */}
      {loading ? (
        <p className="text-white/30 text-sm">Loading...</p>
      ) : months.length === 0 ? (
        <div className="border border-void-lighter bg-void-light p-10 text-center">
          <p className="text-white/30 text-sm">No confirmed bookings yet.</p>
        </div>
      ) : (
        <div className="space-y-8">
          {months.map(key => {
            const mBookings = byMonth[key]
            const mTotal = mBookings.reduce((s, b) => s + b.total_cents, 0)
            const mNights = mBookings.reduce((s, b) => s + nightsBetween(b.check_in, b.check_out), 0)
            return (
              <div key={key}>
                <div className="flex items-baseline justify-between mb-3 pb-2 border-b border-void-lighter">
                  <p className="font-display text-xl tracking-wider text-white">{monthLabel(key + '-01')}</p>
                  <div className="text-right">
                    <p className="font-display text-xl text-gold tracking-wider">{formatCents(mTotal)}</p>
                    <p className="text-white/30 text-xs">{mNights} nights booked</p>
                  </div>
                </div>
                <div className="space-y-2">
                  {mBookings.map(b => (
                    <div key={b.id} className="flex items-center justify-between px-4 py-3 bg-void-light border border-void-lighter hover:border-gold/20 transition-colors text-sm">
                      <div>
                        <p className="text-white font-medium">{b.guest_name}</p>
                        <p className="text-white/40 text-xs">
                          {b.check_in} → {b.check_out} ·{' '}
                          {nightsBetween(b.check_in, b.check_out)} nights
                          {b.properties?.name ? ` · ${b.properties.name}` : ''}
                        </p>
                      </div>
                      <p className="text-gold font-semibold shrink-0">{formatCents(b.total_cents)}</p>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
