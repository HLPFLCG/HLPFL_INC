'use client'

const STATUS_STEPS = [
  'intake',
  'planning',
  'in_progress',
  'review',
  'delivered',
] as const

type Status = (typeof STATUS_STEPS)[number]

interface Props {
  status: string
}

export default function ProjectStatusTimeline({ status }: Props) {
  const stepIndex = STATUS_STEPS.indexOf(status as Status)

  return (
    <div>
      <div className="flex items-center gap-0">
        {STATUS_STEPS.map((step, i) => {
          const done = i <= stepIndex
          const active = i === stepIndex
          return (
            <div key={step} className="flex items-center flex-1">
              <div
                className={`w-3 h-3 rounded-full shrink-0 border ${
                  active
                    ? 'bg-gold border-gold'
                    : done
                      ? 'bg-gold/40 border-gold/40'
                      : 'bg-transparent border-white/20'
                }`}
              />
              {i < STATUS_STEPS.length - 1 && (
                <div
                  className={`flex-1 h-px ${
                    i < stepIndex ? 'bg-gold/40' : 'bg-white/10'
                  }`}
                />
              )}
            </div>
          )
        })}
      </div>
      <div className="flex justify-between mt-1">
        {STATUS_STEPS.map((step) => (
          <span
            key={step}
            className="text-[9px] text-white/30 uppercase tracking-wider text-center"
            style={{ flex: 1 }}
          >
            {step.replace('_', ' ')}
          </span>
        ))}
      </div>
    </div>
  )
}
