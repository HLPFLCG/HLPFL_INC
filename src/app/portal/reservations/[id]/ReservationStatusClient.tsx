'use client'

import { useState, useEffect, use, useRef } from 'react'
import Link from 'next/link'
import { createSupabaseBrowserClient } from '@/lib/portal/supabase-client'

interface Reservation {
  id: string
  guest_name: string
  party_size: number
  reservation_date: string
  reservation_time: string
  status: string
  special_requests: string | null
  created_at: string
  escalated_at: string | null
  dinner_venues: { name: string; location: string | null; cuisine: string | null } | null
}

const TIMEOUT_SECONDS = 30
const ESCALATE_AT_SECONDS = 25

export default function ReservationStatusClient({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = use(params)
  const [reservation, setReservation] = useState<Reservation | null>(null)
  const [loading, setLoading] = useState(true)
  const [elapsed, setElapsed] = useState(0)
  const [escalated, setEscalated] = useState(false)
  const [timedOut, setTimedOut] = useState(false)
  const supabase = createSupabaseBrowserClient()
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const startedAt = useRef<number>(Date.now())

  // Load reservation
  useEffect(() => {
    supabase
      .from('dinner_reservations')
      .select('*,dinner_venues(name,location,cuisine)')
      .eq('id', id)
      .single()
      .then(({ data }) => {
        setReservation((data as Reservation) ?? null)
        setLoading(false)
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  // Supabase Realtime — subscribe to status changes
  useEffect(() => {
    const channel = supabase
      .channel(`reservation-${id}`)
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'dinner_reservations',
          filter: `id=eq.${id}`,
        },
        (payload) => {
          setReservation((prev) =>
            prev ? { ...prev, ...(payload.new as Partial<Reservation>) } : prev
          )
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  // Countdown timer — only runs while status = 'pending'
  useEffect(() => {
    if (!reservation || reservation.status !== 'pending') return

    startedAt.current = Date.now()

    timerRef.current = setInterval(() => {
      const secs = Math.floor((Date.now() - startedAt.current) / 1000)
      setElapsed(secs)

      // At 25 seconds → fire escalation
      if (secs >= ESCALATE_AT_SECONDS && !escalated) {
        setEscalated(true)
        fetch(`/api/reservations/${id}/escalate`, { method: 'POST' }).catch(
          () => {}
        )
      }

      // At 30 seconds → show timeout message
      if (secs >= TIMEOUT_SECONDS) {
        setTimedOut(true)
        if (timerRef.current) clearInterval(timerRef.current)
      }
    }, 1000)

    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reservation?.status, id])

  if (loading) {
    return <p className="text-white/30 text-sm">Loading…</p>
  }

  if (!reservation) {
    return (
      <div className="max-w-xl">
        <p className="text-white/40">Reservation not found.</p>
        <Link href="/portal/reservations" className="text-gold/60 hover:text-gold text-sm mt-4 block">
          ← Back to reservations
        </Link>
      </div>
    )
  }

  const isPending = reservation.status === 'pending'
  const isConfirmed = reservation.status === 'confirmed'
  const isDeclined = reservation.status === 'declined'
  const remaining = Math.max(0, TIMEOUT_SECONDS - elapsed)

  return (
    <div className="max-w-xl">
      <Link
        href="/portal/reservations"
        className="text-xs text-gold/60 hover:text-gold transition-colors mb-6 block"
      >
        ← All reservations
      </Link>

      {/* Venue + details */}
      <div className="border border-void-lighter bg-void-light p-6 mb-6">
        <p className="text-xs text-white/30 uppercase tracking-wider mb-1">
          {reservation.dinner_venues?.cuisine ?? 'Restaurant'}
        </p>
        <h1 className="font-display text-2xl tracking-wider text-white mb-1">
          {reservation.dinner_venues?.name ?? 'Restaurant'}
        </h1>
        {reservation.dinner_venues?.location && (
          <p className="text-white/40 text-xs mb-4">
            {reservation.dinner_venues.location}
          </p>
        )}
        <div className="grid grid-cols-3 gap-4 text-center mt-4">
          {[
            { label: 'Date', value: reservation.reservation_date },
            { label: 'Time', value: reservation.reservation_time },
            { label: 'Guests', value: String(reservation.party_size) },
          ].map((f) => (
            <div key={f.label}>
              <p className="text-[10px] text-white/30 uppercase tracking-wider mb-1">
                {f.label}
              </p>
              <p className="text-white font-medium text-sm">{f.value}</p>
            </div>
          ))}
        </div>
        {reservation.special_requests && (
          <p className="text-white/30 text-xs mt-4 border-t border-void-lighter pt-4">
            Note: {reservation.special_requests}
          </p>
        )}
      </div>

      {/* Status panel */}
      {isConfirmed && (
        <div className="border border-green-400/30 bg-green-400/[0.06] p-6 text-center">
          <div className="text-4xl mb-3">✓</div>
          <p className="font-display text-2xl tracking-wider text-green-400 mb-2">
            Confirmed!
          </p>
          <p className="text-white/60 text-sm">
            Your table is reserved. See you there!
          </p>
        </div>
      )}

      {isDeclined && (
        <div className="border border-red-400/30 bg-red-400/[0.06] p-6 text-center">
          <p className="font-display text-xl tracking-wider text-red-400 mb-2">
            Reservation Declined
          </p>
          <p className="text-white/60 text-sm mb-4">
            Unfortunately the restaurant could not accommodate this request.
          </p>
          <Link
            href="/portal/reservations/new"
            className="text-xs text-gold/60 hover:text-gold transition-colors"
          >
            Try a different date or restaurant →
          </Link>
        </div>
      )}

      {isPending && !timedOut && (
        <div className="border border-gold/20 bg-gold/[0.04] p-6 text-center">
          {/* Animated spinner */}
          <div className="flex justify-center mb-4">
            <div className="w-8 h-8 border-2 border-gold/30 border-t-gold rounded-full animate-spin" />
          </div>
          <p className="font-display text-xl tracking-wider text-gold mb-2">
            Awaiting Confirmation
          </p>
          <p className="text-white/50 text-sm mb-4">
            We&apos;ve notified the restaurant. Waiting for their response…
          </p>
          <div className="flex items-center justify-center gap-3">
            <div className="w-32 h-1.5 bg-void-lighter rounded-full overflow-hidden">
              <div
                className="h-full bg-gold/60 transition-all duration-1000"
                style={{ width: `${(elapsed / TIMEOUT_SECONDS) * 100}%` }}
              />
            </div>
            <span className="text-white/30 text-xs tabular-nums">
              {remaining}s
            </span>
          </div>
          {escalated && (
            <p className="text-white/30 text-xs mt-3">
              Following up with the restaurant…
            </p>
          )}
        </div>
      )}

      {isPending && timedOut && (
        <div className="border border-void-lighter bg-void-light p-6 text-center">
          <p className="font-display text-xl tracking-wider text-white mb-2">
            We&apos;re Confirming Your Table
          </p>
          <p className="text-white/50 text-sm mb-2">
            The restaurant is taking a bit longer than usual to respond.
          </p>
          <p className="text-white/40 text-sm">
            We&apos;ll send you a confirmation email as soon as they reply — usually
            within 2 minutes.
          </p>
          <p className="text-white/20 text-xs mt-4">
            This page will update automatically if they respond.
          </p>
        </div>
      )}

      {(reservation.status === 'expired') && (
        <div className="border border-void-lighter bg-void-light p-6 text-center">
          <p className="font-display text-xl tracking-wider text-white/50 mb-2">
            Reservation Expired
          </p>
          <p className="text-white/40 text-sm">
            The restaurant did not respond in time.
          </p>
          <Link
            href="/portal/reservations/new"
            className="text-gold/60 hover:text-gold text-xs mt-4 inline-block transition-colors"
          >
            Book again →
          </Link>
        </div>
      )}
    </div>
  )
}
