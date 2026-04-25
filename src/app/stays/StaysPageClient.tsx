'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { ScrollReveal } from '@/components/ui'
import type { Property } from '@/lib/supabase'

const PLACEHOLDER_PROPERTY: Property = {
  id: 'placeholder',
  slug: 'villa-caribe-azul',
  name: 'Villa Caribe Azul',
  description: 'Waking up 30 meters from the Caribbean Sea is exactly what this villa was built for. Two bedrooms, a wraparound porch, and the sound of howler monkeys at sunrise.',
  location: 'Puerto Viejo de Talamanca, Costa Rica',
  bedrooms: 2,
  bathrooms: 2,
  max_guests: 6,
  base_rate_cents: 18500,
  cleaning_fee_cents: 12000,
  amenities: ['Oceanfront', 'Private porch', 'Free WiFi', 'Air conditioning', 'Fully equipped kitchen'],
  photos: [{ url: '/stays/placeholder-villa.jpg', alt: 'Villa Caribe Azul — Puerto Viejo' }],
  published: true,
  client_id: null,
  created_at: '',
}

function formatNightlyRate(cents: number) {
  return '$' + (cents / 100).toFixed(0)
}

function PropertyCard({ property }: { property: Property }) {
  const photo = property.photos[0]
  const [imgError, setImgError] = useState(false)
  return (
    <Link
      href={`/stays/${property.slug}/`}
      className="group block bg-void-light border border-void-lighter hover:border-gold/25 transition-all duration-300 hover:-translate-y-1 overflow-hidden"
    >
      {/* Photo */}
      <div className="relative aspect-[4/3] bg-void-dark overflow-hidden">
        {photo && !imgError ? (
          <Image
            src={photo.url}
            alt={photo.alt}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-gold/40 text-sm">No photo</span>
          </div>
        )}
        {/* Nightly rate badge */}
        <div className="absolute bottom-3 right-3 bg-void-dark/90 backdrop-blur-sm border border-gold/25 px-3 py-1.5">
          <span className="font-display text-xl text-gold tracking-wider">
            {formatNightlyRate(property.base_rate_cents)}
          </span>
          <span className="text-white/50 text-xs ml-1">/night</span>
        </div>
      </div>

      {/* Info */}
      <div className="p-6">
        <h3 className="font-display text-xl tracking-wider text-white mb-1 group-hover:text-gold transition-colors">
          {property.name}
        </h3>
        <p className="text-white/40 text-xs mb-3 tracking-wide">{property.location}</p>
        <p className="text-white/60 text-sm leading-relaxed mb-5 line-clamp-2">
          {property.description}
        </p>

        {/* Stats row */}
        <div className="flex items-center gap-5 text-xs text-white/40 mb-5">
          <span className="flex items-center gap-1.5">
            <span className="text-gold">◆</span>
            {property.bedrooms} bed{property.bedrooms !== 1 ? 's' : ''}
          </span>
          <span className="flex items-center gap-1.5">
            <span className="text-gold">◆</span>
            {property.bathrooms} bath{property.bathrooms !== 1 ? 's' : ''}
          </span>
          <span className="flex items-center gap-1.5">
            <span className="text-gold">◆</span>
            Up to {property.max_guests} guests
          </span>
        </div>

        {/* Top amenities */}
        <div className="flex flex-wrap gap-1.5">
          {(property.amenities as string[]).slice(0, 3).map(a => (
            <span
              key={a}
              className="text-[10px] text-gold tracking-wider uppercase px-2 py-1 border border-gold/20 bg-gold/[0.04]"
            >
              {a}
            </span>
          ))}
          {(property.amenities as string[]).length > 3 && (
            <span className="text-[10px] text-white/30 px-2 py-1">
              +{(property.amenities as string[]).length - 3} more
            </span>
          )}
        </div>
      </div>
    </Link>
  )
}

export default function StaysPageClient({ properties }: { properties: Property[] }) {
  const displayProperties = properties.length > 0 ? properties : [PLACEHOLDER_PROPERTY]
  const isPlaceholder = properties.length === 0

  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative pt-32 pb-20 bg-void-dark overflow-hidden">
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] pointer-events-none"
          style={{ background: 'radial-gradient(ellipse, rgba(171,108,61,0.07) 0%, transparent 70%)' }}
        />
        <div className="absolute inset-0 overflow-hidden">
          <div
            className="absolute top-0 right-0 w-[300px] h-full opacity-[0.025] pointer-events-none"
            style={{ background: 'repeating-linear-gradient(45deg, transparent, transparent 40px, #fff 40px, #fff 41px)' }}
          />
        </div>

        <div className="container-custom relative">
          <ScrollReveal>
            <span className="text-gold uppercase tracking-[0.25em] text-xs mb-4 block">
              Book Direct. No Middleman.
            </span>
            <h1 className="font-display text-[clamp(3rem,9vw,7rem)] leading-none tracking-wider text-white mb-6">
              CARIBBEAN<br />
              <span className="text-gradient">STAYS.</span>
            </h1>
            <p className="text-white/60 text-base md:text-lg leading-relaxed max-w-xl mb-4">
              Vacation rentals on Costa Rica&apos;s Caribbean coast. Book directly with the owner — no
              Airbnb fees, no VRBO markup. What you see is what you pay.
            </p>
            <p className="text-white/30 text-sm">
              Airbnb takes ~15%. Stripe takes 3%. Math is simple.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ── TRUST BAR ─────────────────────────────────────────────────── */}
      <div className="bg-void border-y border-gold/10 py-3">
        <div className="container-custom flex flex-wrap gap-6 justify-center md:justify-start">
          {[
            'No Airbnb fees',
            'Direct owner contact',
            'Stripe-secured payments',
            'Instant booking confirmation',
            'Costa Rica Caribbean coast',
          ].map(item => (
            <span key={item} className="inline-flex items-center gap-2 text-xs text-white/40">
              <span className="text-gold">◆</span>
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* ── PROPERTY GRID ─────────────────────────────────────────────── */}
      <section className="section bg-void">
        <div className="container-custom">
          {isPlaceholder && (
            <ScrollReveal>
              <div className="border border-gold/25 bg-gold/[0.04] px-6 py-4 mb-10 text-sm text-gold/80 flex items-start gap-3">
                <span className="text-gold mt-0.5">◆</span>
                <span>
                  Supabase not connected yet. This is placeholder data — connect your database and run the migration to show real properties.
                </span>
              </div>
            </ScrollReveal>
          )}

          <ScrollReveal>
            <span className="text-gold uppercase tracking-[0.25em] text-xs mb-4 block">
              {displayProperties.length === 1 ? '1 Property' : `${displayProperties.length} Properties`}
            </span>
            <h2 className="font-display text-[clamp(2rem,5vw,3.5rem)] tracking-wider leading-none mb-12">
              AVAILABLE<br />
              <span className="text-gradient">NOW.</span>
            </h2>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayProperties.map((property, i) => (
              <ScrollReveal key={property.id} delay={i * 0.08}>
                <PropertyCard property={property} />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY BOOK DIRECT ───────────────────────────────────────────── */}
      <section className="section bg-void-dark border-t border-gold/10">
        <div className="container-custom">
          <ScrollReveal>
            <span className="text-gold uppercase tracking-[0.25em] text-xs mb-4 block">Why Book Direct</span>
            <h2 className="font-display text-[clamp(2rem,5vw,3.5rem)] tracking-wider leading-none mb-16">
              LESS FEES.
              <br />
              <span className="text-gradient">MORE HOST.</span>
            </h2>
          </ScrollReveal>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                num: '01',
                title: 'You Pay Less',
                desc: 'Airbnb adds 13–17% in guest service fees. We don\'t. Your payment goes to the property owner, minus a 3% Stripe processing fee.',
              },
              {
                num: '02',
                title: 'Owner Gets More',
                desc: 'Hosts on Airbnb lose another 3% to the platform. Direct bookings mean the owner keeps more — and that usually means better care for the property.',
              },
              {
                num: '03',
                title: 'Real Communication',
                desc: 'WhatsApp the owner directly. Ask about tide conditions. Request extra beach chairs. Talk to a human, not a support ticket.',
              },
            ].map((item, i) => (
              <ScrollReveal key={item.num} delay={i * 0.1}>
                <div className="relative bg-void-light border border-void-lighter p-8 overflow-hidden group transition-all duration-300 hover:border-gold/25 hover:-translate-y-1">
                  <div className="absolute top-3 right-4 font-display text-7xl text-gold/[0.06] select-none leading-none">
                    {item.num}
                  </div>
                  <div className="font-display text-3xl text-gold/30 tracking-wider mb-4">{item.num}</div>
                  <h3 className="font-body font-semibold text-white text-lg mb-3">{item.title}</h3>
                  <p className="text-white/50 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── ARE YOU A HOST? ───────────────────────────────────────────── */}
      <section className="section bg-void border-t border-gold/10">
        <div className="container-custom">
          <div className="border border-gold/15 bg-gold/[0.03] p-10 md:p-14 relative overflow-hidden">
            <div
              className="absolute top-0 right-0 w-[300px] h-full opacity-[0.03] pointer-events-none"
              style={{ background: 'repeating-linear-gradient(45deg, transparent, transparent 40px, #fff 40px, #fff 41px)' }}
            />
            <ScrollReveal>
              <span className="text-gold uppercase tracking-[0.25em] text-xs mb-4 block">For Property Owners</span>
              <h2 className="font-display text-[clamp(1.8rem,4vw,3rem)] tracking-wider leading-none mb-4 text-white">
                OWN A RENTAL IN COSTA RICA?
              </h2>
              <p className="text-white/60 text-base leading-relaxed max-w-2xl mb-8">
                We build direct-booking platforms for vacation rental owners targeting American travelers.
                Wyoming LLC formation, EIN, Stripe setup, booking site — the whole stack. $499 setup, $29/month.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/services#travel-agency-launch"
                  className="inline-flex items-center justify-center bg-gold hover:bg-gold-light text-white font-semibold px-8 py-4 text-sm tracking-wide transition-colors"
                >
                  See Travel Agency Package — $499
                </Link>
                <Link
                  href="/contact/"
                  className="inline-flex items-center justify-center border border-white/20 hover:border-white/50 text-white/70 hover:text-white font-medium px-8 py-4 text-sm tracking-wide transition-colors"
                >
                  Ask a Question
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </>
  )
}
