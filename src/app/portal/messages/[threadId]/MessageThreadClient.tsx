'use client'

import { useState, useEffect, useRef, use } from 'react'
import Link from 'next/link'
import { createSupabaseBrowserClient } from '@/lib/portal/supabase-client'

interface Message {
  id: string
  sender_role: string
  body: string
  created_at: string
}

export default function MessageThreadClient({
  params,
}: {
  params: Promise<{ threadId: string }>
}) {
  const { threadId } = use(params)
  const [messages, setMessages] = useState<Message[]>([])
  const [subject, setSubject] = useState<string | null>(null)
  const [body, setBody] = useState('')
  const [loading, setLoading] = useState(true)
  const [sending, setSending] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)
  const supabase = createSupabaseBrowserClient()

  useEffect(() => {
    async function load() {
      const [tRes, mRes] = await Promise.all([
        supabase
          .from('message_threads')
          .select('subject')
          .eq('id', threadId)
          .single(),
        supabase
          .from('messages')
          .select('*')
          .eq('thread_id', threadId)
          .order('created_at', { ascending: true }),
      ])
      setSubject(tRes.data?.subject ?? null)
      setMessages((mRes.data as Message[]) ?? [])
      setLoading(false)
    }
    load()

    // Realtime subscription
    const channel = supabase
      .channel(`messages:${threadId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'messages',
          filter: `thread_id=eq.${threadId}`,
        },
        (payload) => {
          setMessages((prev) => [...prev, payload.new as Message])
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [threadId])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  async function send(e: React.FormEvent) {
    e.preventDefault()
    if (!body.trim()) return
    setSending(true)
    await supabase.from('messages').insert({
      thread_id: threadId,
      sender_role: 'customer',
      body: body.trim(),
    })
    // Also bump last_message_at on thread
    await supabase
      .from('message_threads')
      .update({ last_message_at: new Date().toISOString() })
      .eq('id', threadId)
    setBody('')
    setSending(false)
  }

  return (
    <div className="max-w-3xl flex flex-col" style={{ height: 'calc(100vh - 140px)' }}>
      <Link
        href="/portal/messages"
        className="text-xs text-gold/60 hover:text-gold transition-colors mb-4 block"
      >
        ← All messages
      </Link>
      <h1 className="font-display text-2xl tracking-wider text-white mb-6">
        {subject ?? 'General inquiry'}
      </h1>

      {/* Message list */}
      <div className="flex-1 overflow-y-auto space-y-3 mb-4 min-h-0">
        {loading ? (
          <p className="text-white/30 text-sm">Loading…</p>
        ) : messages.length === 0 ? (
          <p className="text-white/20 text-sm">No messages yet. Start the conversation below.</p>
        ) : (
          messages.map((m) => (
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
          ))
        )}
        <div ref={bottomRef} />
      </div>

      {/* Compose */}
      <form onSubmit={send} className="flex gap-3 shrink-0">
        <input
          type="text"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Type a message…"
          className="flex-1 bg-void-light border border-void-lighter focus:border-gold/50 outline-none px-4 py-2.5 text-sm text-white"
          style={{ fontSize: '16px' }}
        />
        <button
          type="submit"
          disabled={sending || !body.trim()}
          className="bg-gold hover:bg-gold-light disabled:opacity-40 text-white text-xs font-semibold px-4 py-2.5 transition-colors"
        >
          Send
        </button>
      </form>
    </div>
  )
}
