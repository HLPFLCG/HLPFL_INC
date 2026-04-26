'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createSupabaseBrowserClient } from '@/lib/portal/supabase-client'
import { hasBookingConflict } from '@/lib/portal/booking-conflicts'

interface Resource {
  id: string
  name: string
  resource_type: string
  description: string | null
}

export default function NewBookingClient() {
  const [resources, setResources] = useState<Resource[]>([])
  const [resourceId, setResourceId] = useState('')
  const [startDate, setStartDate] = useState('')
  const [startTime, setStartTime] = useState('10:00')
  const [endDate, setEndDate] = useState('')
  const [endTime, setEndTime] = useState('10:00')
  const [guestCount, setGuestCount] = useState(1)
  const [notes, setNotes] = useState('')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const router = useRouter()
  const supabase = createSupabaseBrowserClient()

  useEffect(() => {
    supabase
      .from('booking_resources')
      .select('*')
      .eq('active', true)
      .then(({ data }) => setResources((data as Resource[]) ?? []))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')

    if (!resourceId) { setError('Please select a resource.'); return }
    if (!startDate || !endDate) { setError('Please set start and end dates.'); return }

    const startISO = `${startDate}T${startTime}:00+00:00`
    const endISO = `${endDate}T${endTime}:00+00:00`

    if (new Date(startISO) >= new Date(endISO)) {
      setError('End time must be after start time.')
      return
    }

    setSubmitting(true)

    // Client-side conflict pre-check (not authoritative — DB constraint is)
    const conflict = await hasBookingConflict(supabase, resourceId, startISO, endISO)
    if (conflict) {
      setError('That time slot is already booked. Please choose different dates.')
      setSubmitting(false)
      return
    }

    const { error: insertErr } = await supabase.from('bookings').insert({
      resource_id: resourceId,
      time_range: `[${startISO},${endISO})`,
      status: 'pending',
      guest_count: guestCount,
      notes: notes.trim() || null,
    })

    if (insertErr) {
      // Surface the DB constraint violation as a friendly message
      if (insertErr.code === '23P01') {
        setError('That time slot is already booked. Please choose different dates.')
      } else {
        setError(insertErr.message)
      }
      setSubmitting(false)
      return
    }

    router.push('/portal/bookings')
  }

  return (
    <div className="max-w-xl">
      <Link
        href="/portal/bookings"
        className="text-xs text-gold/60 hover:text-gold transition-colors mb-6 block"
      >
        ← Back to bookings
      </Link>

      <div className="mb-8">
        <p className="text-gold uppercase tracking-[0.25em] text-xs mb-1">
          Reserve
        </p>
        <h1 className="font-display text-3xl tracking-wider text-white">
          New Booking
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Resource */}
        <label className="block">
          <span className="text-xs text-white/40 uppercase tracking-wider block mb-1.5">
            Resource
          </span>
          <select
            value={resourceId}
            onChange={(e) => setResourceId(e.target.value)}
            required
            className="w-full bg-void-light border border-void-lighter focus:border-gold/50 outline-none px-4 py-3 text-sm text-white"
          >
            <option value="">Select…</option>
            {resources.map((r) => (
              <option key={r.id} value={r.id}>
                {r.name} ({r.resource_type})
              </option>
            ))}
          </select>
        </label>

        {/* Start */}
        <div className="grid grid-cols-2 gap-4">
          <label className="block">
            <span className="text-xs text-white/40 uppercase tracking-wider block mb-1.5">
              Start Date
            </span>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              required
              className="w-full bg-void-light border border-void-lighter focus:border-gold/50 outline-none px-4 py-3 text-sm text-white"
            />
          </label>
          <label className="block">
            <span className="text-xs text-white/40 uppercase tracking-wider block mb-1.5">
              Start Time
            </span>
            <input
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              className="w-full bg-void-light border border-void-lighter focus:border-gold/50 outline-none px-4 py-3 text-sm text-white"
            />
          </label>
        </div>

        {/* End */}
        <div className="grid grid-cols-2 gap-4">
          <label className="block">
            <span className="text-xs text-white/40 uppercase tracking-wider block mb-1.5">
              End Date
            </span>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              required
              className="w-full bg-void-light border border-void-lighter focus:border-gold/50 outline-none px-4 py-3 text-sm text-white"
            />
          </label>
          <label className="block">
            <span className="text-xs text-white/40 uppercase tracking-wider block mb-1.5">
              End Time
            </span>
            <input
              type="time"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              className="w-full bg-void-light border border-void-lighter focus:border-gold/50 outline-none px-4 py-3 text-sm text-white"
            />
          </label>
        </div>

        {/* Guests */}
        <label className="block">
          <span className="text-xs text-white/40 uppercase tracking-wider block mb-1.5">
            Guests
          </span>
          <input
            type="number"
            min={1}
            max={50}
            value={guestCount}
            onChange={(e) => setGuestCount(Number(e.target.value))}
            className="w-full bg-void-light border border-void-lighter focus:border-gold/50 outline-none px-4 py-3 text-sm text-white"
          />
        </label>

        {/* Notes */}
        <label className="block">
          <span className="text-xs text-white/40 uppercase tracking-wider block mb-1.5">
            Notes (optional)
          </span>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={3}
            className="w-full bg-void-light border border-void-lighter focus:border-gold/50 outline-none px-4 py-3 text-sm text-white resize-none"
            style={{ fontSize: '16px' }}
          />
        </label>

        {error && (
          <p className="text-red-400 text-sm border border-red-400/20 bg-red-400/5 px-4 py-3">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={submitting}
          className="w-full bg-gold hover:bg-gold-light disabled:opacity-50 text-white font-semibold py-3 text-sm tracking-wide transition-colors"
        >
          {submitting ? 'Checking availability…' : 'Request Booking'}
        </button>
      </form>
    </div>
  )
}
