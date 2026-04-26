'use client'

interface Suggestion {
  id: string
  title: string
  reason: string
  suggested_sku: string
  estimated_value_cents: number | null
}

interface Props {
  suggestions: Suggestion[]
  onDismiss: (id: string) => void
}

function formatCents(cents: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
  }).format(cents / 100)
}

export default function UpgradeSuggestionsCard({ suggestions, onDismiss }: Props) {
  if (suggestions.length === 0) return null

  return (
    <div className="space-y-3">
      {suggestions.map((s) => (
        <div
          key={s.id}
          className="border border-gold/20 bg-gold/[0.04] px-5 py-4 flex flex-wrap items-center justify-between gap-4"
        >
          <div>
            <p className="text-white font-medium text-sm">{s.title}</p>
            <p className="text-white/50 text-xs mt-0.5">{s.reason}</p>
          </div>
          <div className="flex items-center gap-3">
            {s.estimated_value_cents && (
              <span className="text-gold text-sm font-semibold">
                {formatCents(s.estimated_value_cents)}
              </span>
            )}
            <a
              href={`/contact/?sku=${s.suggested_sku}`}
              className="text-xs bg-gold hover:bg-gold-light text-white px-3 py-1.5 transition-colors"
            >
              Learn more
            </a>
            <button
              onClick={() => onDismiss(s.id)}
              className="text-xs text-white/20 hover:text-white/60 transition-colors"
              aria-label="Dismiss suggestion"
            >
              ✕
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}
