'use client'

// Placeholder — full calendar widget comes in a later build phase.
// Shows a simple list of upcoming bookings for the current month.

interface Booking {
  id: string
  time_range: string
  status: string
  booking_resources?: { name: string } | null
}

interface Props {
  bookings: Booking[]
}

function parseRangeStart(range: string): Date | null {
  const match = range.match(/\["?([^",)]+)/)
  if (!match) return null
  return new Date(match[1])
}

export default function BookingCalendar({ bookings }: Props) {
  const now = new Date()
  const upcoming = bookings
    .filter((b) => {
      if (!['pending', 'confirmed'].includes(b.status)) return false
      const start = parseRangeStart(b.time_range)
      return start && start >= now
    })
    .sort((a, b) => {
      const as = parseRangeStart(a.time_range)?.getTime() ?? 0
      const bs = parseRangeStart(b.time_range)?.getTime() ?? 0
      return as - bs
    })

  if (upcoming.length === 0) {
    return (
      <p className="text-white/30 text-sm">No upcoming bookings.</p>
    )
  }

  return (
    <div className="space-y-2">
      {upcoming.map((b) => {
        const start = parseRangeStart(b.time_range)
        return (
          <div
            key={b.id}
            className="border border-void-lighter bg-void-light px-4 py-3 flex items-center justify-between gap-4"
          >
            <div>
              <p className="text-white text-sm">
                {b.booking_resources?.name ?? 'Resource'}
              </p>
              {start && (
                <p className="text-white/40 text-xs">
                  {start.toLocaleDateString(undefined, {
                    weekday: 'short',
                    month: 'short',
                    day: 'numeric',
                  })}
                </p>
              )}
            </div>
            <span
              className={`text-[10px] font-bold uppercase tracking-wider ${
                b.status === 'confirmed'
                  ? 'text-green-400'
                  : 'text-yellow-400'
              }`}
            >
              {b.status}
            </span>
          </div>
        )
      })}
    </div>
  )
}
