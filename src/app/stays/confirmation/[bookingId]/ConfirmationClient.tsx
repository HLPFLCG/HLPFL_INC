'use client'

import Link from 'next/link'
import { ScrollReveal } from '@/components/ui'
import type { Booking, Property } from '@/lib/supabase'

interface Props {
  booking: Booking | null
  property: Property | null
}

function formatPrice(cents: number) {
  return '$' + (cents / 100).toFixed(0)
}

export default function ConfirmationClient({ booking, property }: Props) {
  if (!booking) {
    return (
      <div className="pt-32 min-h-screen bg-void flex items-center justify-center">
        <div className="text-center max-w-md px-4">
          <span className="text-gold text-4xl block mb-6">◆</span>
          <h1 className="font-display text-4xl tracking-wider text-white mb-4">BOOKING NOT FOUND</h1>
          <p className="text-white/50 text-sm mb-8">
            This booking ID doesn&apos;t exist or the link may have expired.
          </p>
          <Link href="/stays/" className="inline-block bg-gold hover:bg-gold-light text-white font-semibold px-8 py-4 text-sm tracking-wide transition-colors">
            Browse Properties
          </Link>
        </div>
      </div>
    )
  }

  const isPending = booking.status === 'pending'
  const isConfirmed = booking.status === 'confirmed'

  return (
    <div className="pt-24 min-h-screen bg-void">
      <section className="section">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <ScrollReveal>
            {/* Status icon */}
            <div className="mb-8 flex justify-center">
              {isConfirmed ? (
                <div className="w-20 h-20 border-2 border-gold flex items-center justify-center">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gold">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
              ) : (
                <div className="w-20 h-20 border-2 border-gold/40 flex items-center justify-center">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gold/60">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="8" x2="12" y2="12" />
                    <line x1="12" y1="16" x2="12.01" y2="16" />
                  </svg>
                </div>
              )}
            </div>

            <span className="text-gold uppercase tracking-[0.25em] text-xs mb-4 block">
              {isConfirmed ? 'Booking Confirmed' : 'Payment Pending'}
            </span>

            <h1 className="font-display text-[clamp(2.5rem,7vw,5rem)] leading-none tracking-wider text-white mb-6">
              {isConfirmed ? "YOU'RE BOOKED." : 'ALMOST THERE.'}
            </h1>

            <p className="text-white/60 text-base leading-relaxed mb-10">
              {isConfirmed
                ? `A confirmation has been sent to ${booking.guest_email}. The host will reach out via WhatsApp with arrival instructions.`
                : 'Payment is processing. Check your email for confirmation within a few minutes.'}
            </p>
          </ScrollReveal>

          {/* Booking details */}
          <ScrollReveal delay={0.1}>
            <div className="bg-void-light border border-void-lighter p-8 text-left mb-8">
              <p className="text-xs font-semibold tracking-widest text-gold/60 uppercase mb-6">Booking Summary</p>

              {property && (
                <div className="mb-6 pb-6 border-b border-void-lighter">
                  <p className="font-display text-2xl tracking-wider text-white mb-1">{property.name}</p>
                  <p className="text-white/40 text-sm">{property.location}</p>
                </div>
              )}

              <div className="grid grid-cols-2 gap-y-4 text-sm">
                <div>
                  <p className="text-white/40 text-xs uppercase tracking-wider mb-1">Guest</p>
                  <p className="text-white">{booking.guest_name}</p>
                </div>
                <div>
                  <p className="text-white/40 text-xs uppercase tracking-wider mb-1">Email</p>
                  <p className="text-white">{booking.guest_email}</p>
                </div>
                <div>
                  <p className="text-white/40 text-xs uppercase tracking-wider mb-1">Check-in</p>
                  <p className="text-white">{booking.check_in}</p>
                </div>
                <div>
                  <p className="text-white/40 text-xs uppercase tracking-wider mb-1">Check-out</p>
                  <p className="text-white">{booking.check_out}</p>
                </div>
                <div>
                  <p className="text-white/40 text-xs uppercase tracking-wider mb-1">Guests</p>
                  <p className="text-white">{booking.guest_count}</p>
                </div>
                <div>
                  <p className="text-white/40 text-xs uppercase tracking-wider mb-1">Total paid</p>
                  <p className="text-gold font-semibold">{formatPrice(booking.total_cents)}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-white/40 text-xs uppercase tracking-wider mb-1">Booking ID</p>
                  <p className="text-white/60 text-xs font-mono">{booking.id}</p>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* What's next */}
          <ScrollReveal delay={0.15}>
            <div className="bg-void-light border border-void-lighter p-8 text-left mb-10">
              <p className="text-xs font-semibold tracking-widest text-gold/60 uppercase mb-5">What Happens Next</p>
              <ul className="space-y-4">
                {[
                  'Check your email — a detailed confirmation with check-in instructions has been sent.',
                  'The host will contact you via WhatsApp within 24 hours to coordinate arrival.',
                  'Cancellation is free if done 48+ hours before check-in. Within 48 hours, 50% is retained.',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-white/60">
                    <span className="text-gold mt-0.5 shrink-0">◆</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/stays/" className="bg-gold hover:bg-gold-light text-white font-semibold px-8 py-4 text-sm tracking-wide transition-colors">
                Browse More Properties
              </Link>
              <Link href="/" className="border border-white/20 hover:border-white/50 text-white/70 hover:text-white font-medium px-8 py-4 text-sm tracking-wide transition-colors">
                Back to HLPFL
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  )
}
