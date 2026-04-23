'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ScrollReveal } from '@/components/ui'
import type { Property } from '@/lib/supabase'

interface Props {
  property: Property
  unavailableDates: { start: string; end: string; type: 'booking' | 'block' }[]
}

function formatPrice(cents: number) {
  return '$' + (cents / 100).toFixed(0)
}

function isoToLocal(iso: string) {
  // parse YYYY-MM-DD without timezone shift
  const [y, m, d] = iso.split('-').map(Number)
  return new Date(y, m - 1, d)
}

function isDateUnavailable(
  date: Date,
  unavailableDates: { start: string; end: string }[]
): boolean {
  return unavailableDates.some(range => {
    const start = isoToLocal(range.start)
    const end = isoToLocal(range.end)
    return date >= start && date < end
  })
}

function CalendarMonth({
  year,
  month,
  unavailableDates,
  checkIn,
  checkOut,
  onSelectDate,
}: {
  year: number
  month: number
  unavailableDates: { start: string; end: string }[]
  checkIn: string
  checkOut: string
  onSelectDate: (iso: string) => void
}) {
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const firstDay = new Date(year, month, 1)
  const lastDay = new Date(year, month + 1, 0)
  const startOffset = firstDay.getDay() // 0=Sun
  const daysInMonth = lastDay.getDate()

  const MONTH_NAMES = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December']

  const cells: (Date | null)[] = [
    ...Array(startOffset).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => new Date(year, month, i + 1)),
  ]

  function toIso(d: Date) {
    return d.toISOString().split('T')[0]
  }

  return (
    <div>
      <p className="font-display tracking-wider text-white text-lg mb-4">
        {MONTH_NAMES[month]} {year}
      </p>
      <div className="grid grid-cols-7 gap-px text-center">
        {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(d => (
          <div key={d} className="text-[10px] text-white/30 uppercase tracking-wider pb-2">{d}</div>
        ))}
        {cells.map((date, i) => {
          if (!date) return <div key={`empty-${i}`} />
          const iso = toIso(date)
          const isPast = date < today
          const unavailable = isDateUnavailable(date, unavailableDates)
          const isCheckIn = iso === checkIn
          const isCheckOut = iso === checkOut
          const isSelected = isCheckIn || isCheckOut
          const isInRange = checkIn && checkOut && iso > checkIn && iso < checkOut

          let cellClass = 'text-xs py-2 cursor-pointer transition-colors '
          if (isPast || unavailable) {
            cellClass += 'text-white/20 line-through cursor-not-allowed '
            if (unavailable && !isPast) cellClass += 'bg-red-900/20 '
          } else if (isSelected) {
            cellClass += 'bg-gold text-white font-semibold '
          } else if (isInRange) {
            cellClass += 'bg-gold/20 text-gold '
          } else {
            cellClass += 'text-white/70 hover:text-gold hover:bg-gold/10 '
          }

          return (
            <button
              key={iso}
              className={cellClass}
              disabled={isPast || unavailable}
              onClick={() => onSelectDate(iso)}
              aria-label={iso}
            >
              {date.getDate()}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default function PropertyPageClient({ property, unavailableDates }: Props) {
  const [activePhoto, setActivePhoto] = useState(0)
  const [checkIn, setCheckIn] = useState('')
  const [checkOut, setCheckOut] = useState('')
  const [selectingCheckOut, setSelectingCheckOut] = useState(false)

  const photos = property.photos as { url: string; alt: string }[]
  const amenities = property.amenities as string[]

  const today = new Date()
  const calMonth0 = today.getMonth()
  const calYear0 = today.getFullYear()
  const nextMonth = calMonth0 === 11 ? 0 : calMonth0 + 1
  const nextYear = calMonth0 === 11 ? calYear0 + 1 : calYear0

  function handleSelectDate(iso: string) {
    if (!checkIn || (checkIn && checkOut)) {
      setCheckIn(iso)
      setCheckOut('')
      setSelectingCheckOut(true)
      return
    }
    if (selectingCheckOut && iso > checkIn) {
      setCheckOut(iso)
      setSelectingCheckOut(false)
    } else {
      setCheckIn(iso)
      setCheckOut('')
      setSelectingCheckOut(true)
    }
  }

  function calculateNights() {
    if (!checkIn || !checkOut) return 0
    const msPerDay = 1000 * 60 * 60 * 24
    return Math.round((new Date(checkOut).getTime() - new Date(checkIn).getTime()) / msPerDay)
  }

  const nights = calculateNights()
  const total = nights * property.base_rate_cents + property.cleaning_fee_cents

  const bookingHref = checkIn && checkOut
    ? `/stays/book/${property.slug}/?checkIn=${checkIn}&checkOut=${checkOut}`
    : `/stays/book/${property.slug}/`

  return (
    <>
      {/* ── PHOTO GALLERY ─────────────────────────────────────────── */}
      <section className="pt-20 bg-void-dark">
        <div className="max-w-6xl mx-auto px-4">
          {/* Main photo */}
          <div className="relative aspect-[16/9] bg-void overflow-hidden">
            {photos[activePhoto] ? (
              <img
                src={photos[activePhoto].url}
                alt={photos[activePhoto].alt}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYwMCIgaGVpZ2h0PSI5MDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjE2MDAiIGhlaWdodD0iOTAwIiBmaWxsPSIjM2U1NTc4Ii8+PHRleHQgeD0iODAwIiB5PSI0NjAiIGZvbnQtc2l6ZT0iMzIiIGZpbGw9IiNhYjZjM2QiIHRleHQtYW5jaG9yPSJtaWRkbGUiPk9jZWFuZnJvbnQgVmlsbGE8L3RleHQ+PC9zdmc+'
                }}
              />
            ) : (
              <div className="w-full h-full bg-void-light flex items-center justify-center">
                <span className="text-gold/40">Photo coming soon</span>
              </div>
            )}
          </div>

          {/* Thumbnails */}
          {photos.length > 1 && (
            <div className="flex gap-2 mt-2 overflow-x-auto pb-2">
              {photos.map((photo, i) => (
                <button
                  key={i}
                  onClick={() => setActivePhoto(i)}
                  className={`shrink-0 w-24 h-16 overflow-hidden border-2 transition-colors ${
                    i === activePhoto ? 'border-gold' : 'border-transparent opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={photo.url} alt={photo.alt} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── MAIN CONTENT ──────────────────────────────────────────── */}
      <section className="section bg-void">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid lg:grid-cols-[1fr_380px] gap-12">

            {/* Left: Details */}
            <div>
              <ScrollReveal>
                <span className="text-gold uppercase tracking-[0.25em] text-xs mb-2 block">
                  {property.location}
                </span>
                <h1 className="font-display text-[clamp(2.5rem,7vw,5rem)] leading-none tracking-wider text-white mb-6">
                  {property.name.toUpperCase()}
                </h1>

                {/* Quick stats */}
                <div className="flex flex-wrap gap-6 mb-8 pb-8 border-b border-void-lighter">
                  {[
                    { label: 'Bedrooms', value: property.bedrooms },
                    { label: 'Bathrooms', value: property.bathrooms },
                    { label: 'Max guests', value: property.max_guests },
                    { label: 'Per night', value: formatPrice(property.base_rate_cents) },
                  ].map(stat => (
                    <div key={stat.label}>
                      <p className="font-display text-2xl text-gold tracking-wider">{stat.value}</p>
                      <p className="text-xs text-white/40 uppercase tracking-wider">{stat.label}</p>
                    </div>
                  ))}
                </div>

                <p className="text-white/70 text-base leading-relaxed mb-10">
                  {property.description}
                </p>
              </ScrollReveal>

              {/* Amenities */}
              <ScrollReveal delay={0.1}>
                <h2 className="font-display text-2xl tracking-wider text-white mb-6">AMENITIES</h2>
                <div className="grid grid-cols-2 gap-3 mb-12">
                  {amenities.map(amenity => (
                    <div key={amenity} className="flex items-start gap-3 text-sm text-white/60">
                      <span className="text-gold mt-0.5 shrink-0">◆</span>
                      {amenity}
                    </div>
                  ))}
                </div>
              </ScrollReveal>

              {/* Calendar */}
              <ScrollReveal delay={0.15}>
                <h2 className="font-display text-2xl tracking-wider text-white mb-2">AVAILABILITY</h2>
                <p className="text-white/40 text-sm mb-6">
                  {selectingCheckOut
                    ? 'Now select your check-out date.'
                    : 'Select your check-in date.'}
                </p>
                <div className="border border-void-lighter p-6 bg-void-light">
                  {/* Legend */}
                  <div className="flex flex-wrap gap-4 mb-6 text-xs">
                    <span className="flex items-center gap-2">
                      <span className="w-4 h-4 bg-gold inline-block" /> Selected
                    </span>
                    <span className="flex items-center gap-2">
                      <span className="w-4 h-4 bg-red-900/30 border border-red-800/30 inline-block" /> Unavailable
                    </span>
                    <span className="flex items-center gap-2 text-white/30">
                      <span className="w-4 h-4 bg-void-light border border-void-lighter inline-block opacity-40" /> Past
                    </span>
                  </div>

                  <div className="grid md:grid-cols-2 gap-8">
                    <CalendarMonth
                      year={calYear0}
                      month={calMonth0}
                      unavailableDates={unavailableDates}
                      checkIn={checkIn}
                      checkOut={checkOut}
                      onSelectDate={handleSelectDate}
                    />
                    <CalendarMonth
                      year={nextYear}
                      month={nextMonth}
                      unavailableDates={unavailableDates}
                      checkIn={checkIn}
                      checkOut={checkOut}
                      onSelectDate={handleSelectDate}
                    />
                  </div>
                </div>
              </ScrollReveal>
            </div>

            {/* Right: Booking card */}
            <div className="lg:sticky lg:top-24 self-start">
              <ScrollReveal>
                <div className="bg-void-light border border-void-lighter p-8">
                  <div className="flex items-baseline gap-2 mb-6 pb-6 border-b border-void-lighter">
                    <span className="font-display text-4xl text-gold tracking-wider">
                      {formatPrice(property.base_rate_cents)}
                    </span>
                    <span className="text-white/40 text-sm">/night</span>
                  </div>

                  {/* Date inputs */}
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div>
                      <label className="block text-[10px] text-white/40 uppercase tracking-wider mb-1.5">
                        Check-in
                      </label>
                      <div className="border border-void-lighter bg-void px-3 py-2.5 text-sm text-white/80">
                        {checkIn || <span className="text-white/30">Select date</span>}
                      </div>
                    </div>
                    <div>
                      <label className="block text-[10px] text-white/40 uppercase tracking-wider mb-1.5">
                        Check-out
                      </label>
                      <div className="border border-void-lighter bg-void px-3 py-2.5 text-sm text-white/80">
                        {checkOut || <span className="text-white/30">Select date</span>}
                      </div>
                    </div>
                  </div>

                  {/* Price breakdown */}
                  {nights > 0 && (
                    <div className="border border-void-lighter bg-void p-4 mb-4 text-sm">
                      <div className="flex justify-between mb-2">
                        <span className="text-white/60">
                          {formatPrice(property.base_rate_cents)} × {nights} night{nights !== 1 ? 's' : ''}
                        </span>
                        <span className="text-white/80">
                          {formatPrice(property.base_rate_cents * nights)}
                        </span>
                      </div>
                      <div className="flex justify-between mb-3 pb-3 border-b border-void-lighter">
                        <span className="text-white/60">Cleaning fee</span>
                        <span className="text-white/80">{formatPrice(property.cleaning_fee_cents)}</span>
                      </div>
                      <div className="flex justify-between font-semibold">
                        <span className="text-white">Total</span>
                        <span className="text-gold">{formatPrice(total)}</span>
                      </div>
                    </div>
                  )}

                  <Link
                    href={bookingHref}
                    className="block w-full text-center bg-gold hover:bg-gold-light text-white font-semibold py-4 text-sm tracking-wide transition-colors"
                  >
                    {checkIn && checkOut ? 'Request to Book' : 'Check Availability'}
                  </Link>

                  <p className="text-center text-white/30 text-xs mt-4">
                    No charge until confirmed. Free cancellation 48+ hours before check-in.
                  </p>
                </div>

                {/* Pricing note */}
                <div className="mt-4 border border-gold/15 bg-gold/[0.04] p-5 text-sm">
                  <p className="text-gold font-semibold mb-1 text-xs uppercase tracking-wider">
                    Direct Booking — No Platform Fees
                  </p>
                  <p className="text-white/40 text-xs leading-relaxed">
                    Stripe charges 3% to process your payment. That&apos;s it. No Airbnb service fee, no VRBO markup.
                  </p>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* ── BACK ──────────────────────────────────────────────────── */}
      <section className="pb-12 bg-void border-t border-gold/10">
        <div className="container-custom pt-10">
          <Link href="/stays/" className="text-gold hover:text-gold-light text-sm font-medium transition-colors">
            ← Back to all properties
          </Link>
        </div>
      </section>
    </>
  )
}
