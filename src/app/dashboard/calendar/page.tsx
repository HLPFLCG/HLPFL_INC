'use client'

import { useState, useEffect, useMemo } from 'react'
import { supabase, formatCents, nightsBetween } from '@/lib/supabase'
import { useDashboard } from '../DashboardLayoutClient'
import type { Booking, Property } from '@/lib/supabase'

type CalEvent = {
  id: string
  propertyId: string
  propertyName: string
  propertySlug: string
  guestName: string
  checkIn: string
  checkOut: string
  nights: number
  totalCents: number
  status: Booking['status']
  type: 'booking' | 'block'
}

const MONTH_NAMES = ['January','February','March','April','May','June',
  'July','August','September','October','November','December']

const DAY_LABELS = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat']

const STATUS_COLORS: Record<string, string> = {
  pending:   '#ca8a04',   // yellow
  confirmed: '#22c55e',   // green
  cancelled: '#ef4444',   // red
  completed: '#6b7280',   // gray
  block:     '#9333ea',   // purple for manual blocks
}

function toLocal(iso: string): Date {
  const [y, m, d] = iso.split('-').map(Number)
  return new Date(y, m - 1, d)
}

function toIso(d: Date): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

export default function DashboardCalendarPage() {
  const { client } = useDashboard()
  const [events, setEvents] = useState<CalEvent[]>([])
  const [properties, setProperties] = useState<Property[]>([])
  const [selectedPropertyId, setSelectedPropertyId] = useState<string>('all')
  const [year, setYear] = useState(new Date().getFullYear())
  const [month, setMonth] = useState(new Date().getMonth())
  const [selectedEvent, setSelectedEvent] = useState<CalEvent | null>(null)
  const [loading, setLoading] = useState(true)

  // New block form
  const [blockForm, setBlockForm] = useState({ start: '', end: '', reason: '' })
  const [addingBlock, setAddingBlock] = useState(false)
  const [blockSaving, setBlockSaving] = useState(false)

  useEffect(() => {
    async function init() {
      if (!client) { setLoading(false); return }
      await loadAll()
    }
    init()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [client])

  async function loadAll() {
    setLoading(true)
    const [propsRes, bookingsRes, blocksRes] = await Promise.all([
      supabase.from('properties').select('*').eq('client_id', client!.id),
      supabase.from('bookings')
        .select('*, properties!inner(name, slug, client_id)')
        .eq('properties.client_id', client!.id)
        .in('status', ['pending', 'confirmed', 'completed']),
      supabase.from('availability_blocks')
        .select('*, properties!inner(name, slug, client_id)')
        .eq('properties.client_id', client!.id),
    ])

    const props = propsRes.data ?? []
    setProperties(props as Property[])

    const calEvents: CalEvent[] = []

    // Bookings
    for (const b of (bookingsRes.data ?? []) as (Booking & { properties: { name: string; slug: string } })[]) {
      calEvents.push({
        id: b.id,
        propertyId: b.property_id,
        propertyName: b.properties?.name ?? '',
        propertySlug: b.properties?.slug ?? '',
        guestName: b.guest_name,
        checkIn: b.check_in,
        checkOut: b.check_out,
        nights: nightsBetween(b.check_in, b.check_out),
        totalCents: b.total_cents,
        status: b.status,
        type: 'booking',
      })
    }

    // Blocks
    for (const bl of (blocksRes.data ?? []) as { id: string; property_id: string; start_date: string; end_date: string; reason: string | null; properties: { name: string; slug: string } }[]) {
      calEvents.push({
        id: bl.id,
        propertyId: bl.property_id,
        propertyName: bl.properties?.name ?? '',
        propertySlug: bl.properties?.slug ?? '',
        guestName: bl.reason ?? 'Blocked',
        checkIn: bl.start_date,
        checkOut: bl.end_date,
        nights: nightsBetween(bl.start_date, bl.end_date),
        totalCents: 0,
        status: 'cancelled',
        type: 'block',
      })
    }

    setEvents(calEvents)
    setLoading(false)
  }

  // Build calendar grid
  const firstOfMonth = new Date(year, month, 1)
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const startOffset = firstOfMonth.getDay()

  // Filter events for selected property and month
  const visibleEvents = useMemo(() => {
    return events.filter(e => {
      if (selectedPropertyId !== 'all' && e.propertyId !== selectedPropertyId) return false
      const start = toLocal(e.checkIn)
      const end = toLocal(e.checkOut)
      // Show if event overlaps this month
      const monthStart = new Date(year, month, 1)
      const monthEnd = new Date(year, month + 1, 0)
      return start <= monthEnd && end >= monthStart
    })
  }, [events, selectedPropertyId, year, month])

  // For each day, find which events cover it
  function getEventsForDay(day: number): CalEvent[] {
    const dateIso = toIso(new Date(year, month, day))
    return visibleEvents.filter(e => dateIso >= e.checkIn && dateIso < e.checkOut)
  }

  function prevMonth() {
    if (month === 0) { setYear(y => y - 1); setMonth(11) }
    else setMonth(m => m - 1)
  }
  function nextMonth() {
    if (month === 11) { setYear(y => y + 1); setMonth(0) }
    else setMonth(m => m + 1)
  }

  async function saveBlock() {
    if (!blockForm.start || !blockForm.end || !client) return
    setBlockSaving(true)
    const propId = selectedPropertyId !== 'all' ? selectedPropertyId : properties[0]?.id
    if (!propId) { setBlockSaving(false); return }
    await supabase.from('availability_blocks').insert({
      property_id: propId,
      start_date: blockForm.start,
      end_date: blockForm.end,
      reason: blockForm.reason || null,
    })
    setBlockForm({ start: '', end: '', reason: '' })
    setAddingBlock(false)
    setBlockSaving(false)
    await loadAll()
  }

  const cells = Array.from({ length: startOffset + daysInMonth }, (_, i) => {
    if (i < startOffset) return null
    return i - startOffset + 1
  })

  return (
    <div className="max-w-5xl">
      <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
        <div>
          <p className="text-gold uppercase tracking-[0.25em] text-xs mb-1">Calendar</p>
          <h1 className="font-display text-3xl tracking-wider text-white">AVAILABILITY</h1>
        </div>
        <div className="flex items-center gap-3 flex-wrap">
          {/* Property filter */}
          {properties.length > 1 && (
            <select value={selectedPropertyId} onChange={e => setSelectedPropertyId(e.target.value)}
              className="bg-void-light border border-void-lighter text-sm text-white px-3 py-2 outline-none focus:border-gold/50 appearance-none">
              <option value="all">All properties</option>
              {properties.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
            </select>
          )}
          <button onClick={() => setAddingBlock(!addingBlock)}
            className={`text-xs font-semibold px-4 py-2 border transition-colors ${
              addingBlock ? 'bg-void-lighter border-void-lighter text-white/60' : 'bg-gold border-gold text-white hover:bg-gold-light'
            }`}>
            {addingBlock ? 'Cancel' : '+ Block Dates'}
          </button>
        </div>
      </div>

      {/* Block dates form */}
      {addingBlock && (
        <div className="border border-gold/20 bg-gold/[0.04] p-5 mb-6 flex flex-wrap gap-4 items-end">
          <label className="block">
            <span className="text-xs text-white/40 uppercase tracking-wider block mb-1">Start</span>
            <input type="date" value={blockForm.start} onChange={e => setBlockForm(f => ({ ...f, start: e.target.value }))}
              className="bg-void-light border border-void-lighter focus:border-gold/50 outline-none px-3 py-2 text-sm text-white" />
          </label>
          <label className="block">
            <span className="text-xs text-white/40 uppercase tracking-wider block mb-1">End</span>
            <input type="date" value={blockForm.end} min={blockForm.start}
              onChange={e => setBlockForm(f => ({ ...f, end: e.target.value }))}
              className="bg-void-light border border-void-lighter focus:border-gold/50 outline-none px-3 py-2 text-sm text-white" />
          </label>
          <label className="block flex-1 min-w-[160px]">
            <span className="text-xs text-white/40 uppercase tracking-wider block mb-1">Reason (optional)</span>
            <input type="text" value={blockForm.reason} placeholder="Owner stay, maintenance…"
              onChange={e => setBlockForm(f => ({ ...f, reason: e.target.value }))}
              className="w-full bg-void-light border border-void-lighter focus:border-gold/50 outline-none px-3 py-2 text-sm text-white placeholder:text-white/20" />
          </label>
          <button onClick={saveBlock} disabled={blockSaving || !blockForm.start || !blockForm.end}
            className="bg-gold hover:bg-gold-light disabled:opacity-40 text-white font-semibold px-5 py-2 text-sm transition-colors">
            {blockSaving ? 'Saving…' : 'Block'}
          </button>
        </div>
      )}

      {loading ? (
        <p className="text-white/30 text-sm">Loading calendar...</p>
      ) : (
        <>
          {/* Month nav */}
          <div className="flex items-center justify-between mb-4">
            <button onClick={prevMonth}
              className="text-white/40 hover:text-white transition-colors p-2 -ml-2">
              ← Prev
            </button>
            <h2 className="font-display text-2xl tracking-wider text-white">
              {MONTH_NAMES[month]} {year}
            </h2>
            <button onClick={nextMonth}
              className="text-white/40 hover:text-white transition-colors p-2 -mr-2">
              Next →
            </button>
          </div>

          {/* Legend */}
          <div className="flex flex-wrap gap-4 mb-4 text-xs">
            {[
              { label: 'Pending', color: STATUS_COLORS.pending },
              { label: 'Confirmed', color: STATUS_COLORS.confirmed },
              { label: 'Completed', color: STATUS_COLORS.completed },
              { label: 'Manual Block', color: STATUS_COLORS.block },
            ].map(l => (
              <span key={l.label} className="flex items-center gap-1.5 text-white/50">
                <span className="w-3 h-3 rounded-sm inline-block" style={{ backgroundColor: l.color, opacity: 0.7 }} />
                {l.label}
              </span>
            ))}
          </div>

          {/* Calendar grid */}
          <div className="border border-void-lighter overflow-hidden">
            {/* Day headers */}
            <div className="grid grid-cols-7 bg-void-dark">
              {DAY_LABELS.map(d => (
                <div key={d} className="text-center text-[10px] text-white/30 uppercase tracking-wider py-2">
                  {d}
                </div>
              ))}
            </div>

            {/* Cells */}
            <div className="grid grid-cols-7">
              {cells.map((day, i) => {
                if (day === null) {
                  return <div key={`empty-${i}`} className="border-t border-void-lighter min-h-[72px] bg-void-dark/30" />
                }
                const dayEvents = getEventsForDay(day)
                const isToday = toIso(new Date(year, month, day)) === toIso(new Date())
                return (
                  <div key={day}
                    className={`border-t border-void-lighter min-h-[72px] p-1.5 relative ${
                      isToday ? 'bg-gold/[0.06]' : 'bg-void'
                    }`}>
                    <span className={`text-xs font-medium mb-1 block ${isToday ? 'text-gold' : 'text-white/40'}`}>
                      {day}
                    </span>
                    <div className="space-y-0.5">
                      {dayEvents.slice(0, 3).map(ev => (
                        <button key={ev.id} onClick={() => setSelectedEvent(ev)}
                          title={`${ev.guestName} · ${ev.checkIn} → ${ev.checkOut}`}
                          className="w-full text-left text-[9px] leading-tight px-1 py-0.5 truncate rounded-sm font-medium transition-opacity hover:opacity-80"
                          style={{
                            backgroundColor: ev.type === 'block'
                              ? STATUS_COLORS.block + '33'
                              : STATUS_COLORS[ev.status] + '33',
                            color: ev.type === 'block'
                              ? STATUS_COLORS.block
                              : STATUS_COLORS[ev.status],
                            borderLeft: `2px solid ${ev.type === 'block' ? STATUS_COLORS.block : STATUS_COLORS[ev.status]}`,
                          }}>
                          {ev.type === 'block' ? '⊗ ' : ''}{ev.guestName}
                        </button>
                      ))}
                      {dayEvents.length > 3 && (
                        <span className="text-[9px] text-white/30 px-1">+{dayEvents.length - 3} more</span>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Event detail panel */}
          {selectedEvent && (
            <div className="mt-6 border border-gold/20 bg-void-light p-6 relative">
              <button onClick={() => setSelectedEvent(null)}
                className="absolute top-4 right-4 text-white/30 hover:text-white transition-colors text-lg leading-none">
                ×
              </button>
              <p className="text-xs text-gold uppercase tracking-wider mb-3">
                {selectedEvent.type === 'block' ? 'Availability Block' : 'Booking Detail'}
              </p>
              <p className="font-display text-2xl tracking-wider text-white mb-4">
                {selectedEvent.guestName.toUpperCase()}
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <p className="text-white/40 text-xs uppercase tracking-wider mb-1">Check-in</p>
                  <p className="text-white">{selectedEvent.checkIn}</p>
                </div>
                <div>
                  <p className="text-white/40 text-xs uppercase tracking-wider mb-1">Check-out</p>
                  <p className="text-white">{selectedEvent.checkOut}</p>
                </div>
                <div>
                  <p className="text-white/40 text-xs uppercase tracking-wider mb-1">Nights</p>
                  <p className="text-white">{selectedEvent.nights}</p>
                </div>
                {selectedEvent.type === 'booking' && (
                  <div>
                    <p className="text-white/40 text-xs uppercase tracking-wider mb-1">Total</p>
                    <p className="text-gold font-semibold">{formatCents(selectedEvent.totalCents)}</p>
                  </div>
                )}
              </div>
              <p className="text-white/40 text-xs mt-3">{selectedEvent.propertyName}</p>
            </div>
          )}
        </>
      )}
    </div>
  )
}
