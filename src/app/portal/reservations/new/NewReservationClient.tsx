'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createSupabaseBrowserClient } from '@/lib/portal/supabase-client'
import { usePortal } from '../../PortalLayoutClient'

interface Venue {
  id: string
  name: string
  location: string | null
  cuisine: string | null
  max_party_size: number
}

export default function NewReservationClient() {
  const { user } = usePortal()
  const [venues, setVenues] = useState<Venue[]>([])
  const [form, setForm] = useState({
    venue_id: '',
    guest_name: '',
    guest_email: '',
    party_size: 2,
    reservation_date: '',
    reservation_time: '19:00',
    special_requests: '',
  })
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const router = useRouter()
  const supabase = createSupabaseBrowserClient()

  useEffect(() => {
    supabase
      .from('dinner_venues')
      .select('id,name,location,cuisine,max_party_size')
      .eq('active', true)
      .then(({ data }) => setVenues((data as Venue[]) ?? []))

    // Pre-fill with user email
    if (user?.email) {
      setForm((f) => ({ ...f, guest_email: user.email ?? '' }))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])

  const set =
    (key: string) =>
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >
    ) =>
      setForm((f) => ({ ...f, [key]: e.target.value }))

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    if (!form.venue_id) { setError('Please select a restaurant.'); return }
    if (!form.guest_name.trim()) { setError('Name is required.'); return }
    if (!form.reservation_date) { setError('Date is required.'); return }

    setSubmitting(true)

    const res = await fetch('/api/reservations/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        venue_id: form.venue_id,
        guest_name: form.guest_name.trim(),
        guest_email: form.guest_email.trim(),
        party_size: Number(form.party_size),
        reservation_date: form.reservation_date,
        reservation_time: form.reservation_time,
        special_requests: form.special_requests.trim() || null,
      }),
    })

    if (!res.ok) {
      const err = await res.json().catch(() => ({ error: 'Request failed.' })) as { error?: string }
      setError(err.error ?? 'Could not submit reservation.')
      setSubmitting(false)
      return
    }

    const json = await res.json() as { reservation_id: string }
    router.push(`/portal/reservations/${json.reservation_id}`)
  }

  // Minimum date: tomorrow
  const minDate = new Date()
  minDate.setDate(minDate.getDate() + 1)
  const minDateStr = minDate.toISOString().split('T')[0]

  const selectedVenue = venues.find((v) => v.id === form.venue_id)

  return (
    <div className="max-w-xl">
      <Link
        href="/portal/reservations"
        className="text-xs text-gold/60 hover:text-gold transition-colors mb-6 block"
      >
        ← Back to reservations
      </Link>

      <div className="mb-8">
        <p className="text-gold uppercase tracking-[0.25em] text-xs mb-1">
          Book a Table
        </p>
        <h1 className="font-display text-3xl tracking-wider text-white">
          New Reservation
        </h1>
        <p className="text-white/40 text-sm mt-2">
          We notify the restaurant instantly. You&apos;ll get confirmation in under
          30 seconds.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Restaurant */}
        <label className="block">
          <span className="text-xs text-white/40 uppercase tracking-wider block mb-1.5">
            Restaurant *
          </span>
          <select
            value={form.venue_id}
            onChange={set('venue_id')}
            required
            className="w-full bg-void-light border border-void-lighter focus:border-gold/50 outline-none px-4 py-3 text-sm text-white"
          >
            <option value="">Select a restaurant…</option>
            {venues.map((v) => (
              <option key={v.id} value={v.id}>
                {v.name}
                {v.cuisine ? ` — ${v.cuisine}` : ''}
                {v.location ? ` (${v.location})` : ''}
              </option>
            ))}
          </select>
          {selectedVenue && (
            <p className="text-white/25 text-xs mt-1">
              Max party size: {selectedVenue.max_party_size}
            </p>
          )}
        </label>

        {/* Guest info */}
        <div className="grid grid-cols-2 gap-4">
          <label className="block col-span-2 sm:col-span-1">
            <span className="text-xs text-white/40 uppercase tracking-wider block mb-1.5">
              Your Name *
            </span>
            <input
              type="text"
              value={form.guest_name}
              onChange={set('guest_name')}
              required
              className="w-full bg-void-light border border-void-lighter focus:border-gold/50 outline-none px-4 py-3 text-sm text-white"
              style={{ fontSize: '16px' }}
            />
          </label>
          <label className="block col-span-2 sm:col-span-1">
            <span className="text-xs text-white/40 uppercase tracking-wider block mb-1.5">
              Confirmation Email *
            </span>
            <input
              type="email"
              value={form.guest_email}
              onChange={set('guest_email')}
              required
              className="w-full bg-void-light border border-void-lighter focus:border-gold/50 outline-none px-4 py-3 text-sm text-white"
              style={{ fontSize: '16px' }}
            />
          </label>
        </div>

        {/* Date / Time / Party */}
        <div className="grid grid-cols-3 gap-4">
          <label className="block col-span-3 sm:col-span-1">
            <span className="text-xs text-white/40 uppercase tracking-wider block mb-1.5">
              Date *
            </span>
            <input
              type="date"
              value={form.reservation_date}
              onChange={set('reservation_date')}
              min={minDateStr}
              required
              className="w-full bg-void-light border border-void-lighter focus:border-gold/50 outline-none px-4 py-3 text-sm text-white"
            />
          </label>
          <label className="block col-span-3 sm:col-span-1">
            <span className="text-xs text-white/40 uppercase tracking-wider block mb-1.5">
              Time *
            </span>
            <input
              type="time"
              value={form.reservation_time}
              onChange={set('reservation_time')}
              required
              className="w-full bg-void-light border border-void-lighter focus:border-gold/50 outline-none px-4 py-3 text-sm text-white"
            />
          </label>
          <label className="block col-span-3 sm:col-span-1">
            <span className="text-xs text-white/40 uppercase tracking-wider block mb-1.5">
              Party Size *
            </span>
            <input
              type="number"
              min={1}
              max={selectedVenue?.max_party_size ?? 50}
              value={form.party_size}
              onChange={(e) =>
                setForm((f) => ({ ...f, party_size: Number(e.target.value) }))
              }
              required
              className="w-full bg-void-light border border-void-lighter focus:border-gold/50 outline-none px-4 py-3 text-sm text-white"
            />
          </label>
        </div>

        {/* Special requests */}
        <label className="block">
          <span className="text-xs text-white/40 uppercase tracking-wider block mb-1.5">
            Special Requests (optional)
          </span>
          <textarea
            value={form.special_requests}
            onChange={set('special_requests')}
            rows={3}
            placeholder="Dietary restrictions, occasion, seating preference…"
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
          {submitting ? 'Submitting…' : 'Request Reservation'}
        </button>
      </form>
    </div>
  )
}
