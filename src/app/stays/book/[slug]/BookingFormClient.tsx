'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ScrollReveal } from '@/components/ui'
import type { Property } from '@/lib/supabase'

interface Props {
  property: Property
  checkIn: string
  checkOut: string
}

function formatPrice(cents: number) {
  return '$' + (cents / 100).toFixed(0)
}

function nightsBetween(a: string, b: string) {
  if (!a || !b) return 0
  return Math.round((new Date(b).getTime() - new Date(a).getTime()) / (1000 * 60 * 60 * 24))
}

export default function BookingFormClient({ property, checkIn: initCheckIn, checkOut: initCheckOut }: Props) {
  const [checkIn, setCheckIn] = useState(initCheckIn)
  const [checkOut, setCheckOut] = useState(initCheckOut)
  const [form, setForm] = useState({
    guest_name: '',
    guest_email: '',
    guest_phone: '',
    guest_count: 1,
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const nights = nightsBetween(checkIn, checkOut)
  const totalCents = nights * property.base_rate_cents + property.cleaning_fee_cents

  function set(key: keyof typeof form, value: string | number) {
    setForm(f => ({ ...f, [key]: value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')

    if (!checkIn || !checkOut) {
      setError('Please select check-in and check-out dates.')
      return
    }
    if (nights < 1) {
      setError('Check-out must be after check-in.')
      return
    }
    if (!form.guest_name || !form.guest_email || !form.guest_phone) {
      setError('Please fill in all required fields.')
      return
    }

    setLoading(true)
    try {
      const res = await fetch('/api/bookings/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          property_id: property.id,
          check_in: checkIn,
          check_out: checkOut,
          guest_count: form.guest_count,
          guest_name: form.guest_name,
          guest_email: form.guest_email,
          guest_phone: form.guest_phone,
        }),
      })
      const data = await res.json()
      if (!res.ok) {
        setError(data.error ?? 'Something went wrong. Please try again.')
        setLoading(false)
        return
      }
      // Redirect to Stripe Payment Link
      window.location.href = data.payment_url
    } catch {
      setError('Network error. Please try again.')
      setLoading(false)
    }
  }

  return (
    <div className="pt-24 min-h-screen bg-void">
      <section className="section">
        <div className="max-w-4xl mx-auto px-4">
          <ScrollReveal>
            <Link href={`/stays/${property.slug}/`} className="text-gold/60 hover:text-gold text-sm transition-colors mb-8 block">
              ← Back to {property.name}
            </Link>
            <span className="text-gold uppercase tracking-[0.25em] text-xs mb-4 block">Step 2 of 2</span>
            <h1 className="font-display text-[clamp(2rem,6vw,4rem)] leading-none tracking-wider text-white mb-10">
              REQUEST TO BOOK
            </h1>
          </ScrollReveal>

          <div className="grid md:grid-cols-[1fr_340px] gap-10">

            {/* Form */}
            <ScrollReveal>
              <form onSubmit={handleSubmit} className="space-y-6">

                {/* Dates */}
                <div>
                  <p className="text-xs font-semibold tracking-widest text-gold/60 uppercase mb-4">Your Dates</p>
                  <div className="grid grid-cols-2 gap-4">
                    <label className="block">
                      <span className="text-xs text-white/40 uppercase tracking-wider block mb-1.5">Check-in *</span>
                      <input
                        type="date"
                        value={checkIn}
                        min={new Date().toISOString().split('T')[0]}
                        onChange={e => setCheckIn(e.target.value)}
                        required
                        className="w-full bg-void-light border border-void-lighter focus:border-gold/50 outline-none px-4 py-3 text-sm text-white transition-colors"
                      />
                    </label>
                    <label className="block">
                      <span className="text-xs text-white/40 uppercase tracking-wider block mb-1.5">Check-out *</span>
                      <input
                        type="date"
                        value={checkOut}
                        min={checkIn || new Date().toISOString().split('T')[0]}
                        onChange={e => setCheckOut(e.target.value)}
                        required
                        className="w-full bg-void-light border border-void-lighter focus:border-gold/50 outline-none px-4 py-3 text-sm text-white transition-colors"
                      />
                    </label>
                  </div>
                </div>

                {/* Guests */}
                <div>
                  <p className="text-xs font-semibold tracking-widest text-gold/60 uppercase mb-4">Guests</p>
                  <label className="block">
                    <span className="text-xs text-white/40 uppercase tracking-wider block mb-1.5">
                      Number of guests * (max {property.max_guests})
                    </span>
                    <select
                      value={form.guest_count}
                      onChange={e => set('guest_count', parseInt(e.target.value))}
                      required
                      className="w-full bg-void-light border border-void-lighter focus:border-gold/50 outline-none px-4 py-3 text-sm text-white transition-colors appearance-none"
                    >
                      {Array.from({ length: property.max_guests }, (_, i) => i + 1).map(n => (
                        <option key={n} value={n}>{n} guest{n !== 1 ? 's' : ''}</option>
                      ))}
                    </select>
                  </label>
                </div>

                {/* Contact info */}
                <div>
                  <p className="text-xs font-semibold tracking-widest text-gold/60 uppercase mb-4">Contact Info</p>
                  <div className="space-y-4">
                    <label className="block">
                      <span className="text-xs text-white/40 uppercase tracking-wider block mb-1.5">Full name *</span>
                      <input
                        type="text"
                        value={form.guest_name}
                        onChange={e => set('guest_name', e.target.value)}
                        placeholder="Jane Smith"
                        required
                        className="w-full bg-void-light border border-void-lighter focus:border-gold/50 outline-none px-4 py-3 text-sm text-white placeholder:text-white/20 transition-colors"
                      />
                    </label>
                    <label className="block">
                      <span className="text-xs text-white/40 uppercase tracking-wider block mb-1.5">Email *</span>
                      <input
                        type="email"
                        value={form.guest_email}
                        onChange={e => set('guest_email', e.target.value)}
                        placeholder="jane@example.com"
                        required
                        className="w-full bg-void-light border border-void-lighter focus:border-gold/50 outline-none px-4 py-3 text-sm text-white placeholder:text-white/20 transition-colors"
                      />
                    </label>
                    <label className="block">
                      <span className="text-xs text-white/40 uppercase tracking-wider block mb-1.5">Phone / WhatsApp *</span>
                      <input
                        type="tel"
                        value={form.guest_phone}
                        onChange={e => set('guest_phone', e.target.value)}
                        placeholder="+1 (555) 000-0000"
                        required
                        className="w-full bg-void-light border border-void-lighter focus:border-gold/50 outline-none px-4 py-3 text-sm text-white placeholder:text-white/20 transition-colors"
                      />
                    </label>
                  </div>
                </div>

                {error && (
                  <div className="border border-red-500/30 bg-red-900/20 px-4 py-3 text-sm text-red-300">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gold hover:bg-gold-light disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-4 text-sm tracking-wide transition-colors"
                >
                  {loading ? 'Creating booking...' : 'Continue to Payment →'}
                </button>

                <p className="text-center text-white/30 text-xs">
                  You&apos;ll be taken to Stripe to complete payment securely.
                  No card stored. Cancel free 48+ hours before check-in.
                </p>
              </form>
            </ScrollReveal>

            {/* Booking summary */}
            <ScrollReveal delay={0.1}>
              <div className="bg-void-light border border-void-lighter p-6 sticky top-24">
                <p className="text-xs font-semibold tracking-widest text-gold/60 uppercase mb-5">Your Booking</p>

                {property.photos[0] && (
                  <div className="relative aspect-video overflow-hidden mb-5">
                    <Image
                      src={(property.photos as { url: string; alt: string }[])[0].url}
                      alt={(property.photos as { url: string; alt: string }[])[0].alt}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}

                <p className="font-display text-xl tracking-wider text-white mb-1">{property.name}</p>
                <p className="text-white/40 text-xs mb-5">{property.location}</p>

                {checkIn && checkOut && nights > 0 ? (
                  <div className="border-t border-void-lighter pt-5 space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-white/60">Check-in</span>
                      <span className="text-white">{checkIn}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/60">Check-out</span>
                      <span className="text-white">{checkOut}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/60">{nights} night{nights !== 1 ? 's' : ''}</span>
                      <span className="text-white">{formatPrice(property.base_rate_cents * nights)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/60">Cleaning fee</span>
                      <span className="text-white">{formatPrice(property.cleaning_fee_cents)}</span>
                    </div>
                    <div className="flex justify-between font-semibold pt-3 border-t border-void-lighter">
                      <span className="text-white">Total</span>
                      <span className="text-gold">{formatPrice(totalCents)}</span>
                    </div>
                  </div>
                ) : (
                  <p className="text-white/30 text-sm border-t border-void-lighter pt-5">
                    Select dates to see total.
                  </p>
                )}

                <div className="mt-5 pt-5 border-t border-void-lighter">
                  <div className="flex items-start gap-2 text-xs text-white/40">
                    <span className="text-gold mt-0.5 shrink-0">◆</span>
                    Free cancellation 48+ hours before check-in
                  </div>
                  <div className="flex items-start gap-2 text-xs text-white/40 mt-2">
                    <span className="text-gold mt-0.5 shrink-0">◆</span>
                    Secure payment via Stripe
                  </div>
                </div>
              </div>
            </ScrollReveal>

          </div>
        </div>
      </section>
    </div>
  )
}
