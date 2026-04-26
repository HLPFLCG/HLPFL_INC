'use client'

// Reusable message thread display component.

interface Message {
  id: string
  sender_role: string
  body: string
  created_at: string
}

interface Props {
  messages: Message[]
  bottomRef?: React.RefObject<HTMLDivElement>
}

export default function MessageThread({ messages, bottomRef }: Props) {
  if (messages.length === 0) {
    return (
      <p className="text-white/20 text-sm">
        No messages yet. Start the conversation.
      </p>
    )
  }

  return (
    <div className="space-y-3">
      {messages.map((m) => (
        <div
          key={m.id}
          className={`px-4 py-3 text-sm leading-relaxed max-w-lg ${
            m.sender_role === 'customer'
              ? 'ml-auto bg-gold/[0.08] border border-gold/15 text-white/80'
              : 'bg-void-light border border-void-lighter text-white/70'
          }`}
        >
          <p className="text-[10px] uppercase tracking-wider mb-1 text-white/30">
            {m.sender_role === 'customer' ? 'You' : 'HLPFL'} ·{' '}
            {new Date(m.created_at).toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            })}
          </p>
          <p>{m.body}</p>
        </div>
      ))}
      {bottomRef && <div ref={bottomRef} />}
    </div>
  )
}
