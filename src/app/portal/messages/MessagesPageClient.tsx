'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { createSupabaseBrowserClient } from '@/lib/portal/supabase-client'

interface Thread {
  id: string
  subject: string | null
  last_message_at: string
  created_at: string
}

export default function MessagesPageClient() {
  const [threads, setThreads] = useState<Thread[]>([])
  const [loading, setLoading] = useState(true)
  const supabase = createSupabaseBrowserClient()

  useEffect(() => {
    async function load() {
      const { data } = await supabase
        .from('message_threads')
        .select('*')
        .order('last_message_at', { ascending: false })
      setThreads((data as Thread[]) ?? [])
      setLoading(false)
    }
    load()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  async function newThread() {
    const subject = prompt('Thread subject (optional):')
    const { data } = await supabase
      .from('message_threads')
      .insert({ subject: subject || null })
      .select()
      .single()
    if (data) setThreads((prev) => [data as Thread, ...prev])
  }

  return (
    <div className="max-w-3xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <p className="text-gold uppercase tracking-[0.25em] text-xs mb-1">
            Inbox
          </p>
          <h1 className="font-display text-3xl tracking-wider text-white">
            Messages
          </h1>
        </div>
        <button
          onClick={newThread}
          className="bg-gold hover:bg-gold-light text-white text-xs font-semibold px-4 py-2.5 tracking-wide transition-colors"
        >
          + New Thread
        </button>
      </div>

      {loading ? (
        <p className="text-white/30 text-sm">Loading…</p>
      ) : threads.length === 0 ? (
        <div className="border border-void-lighter bg-void-light p-8 text-center">
          <p className="text-white/30 text-sm">No messages yet.</p>
        </div>
      ) : (
        <div className="space-y-2">
          {threads.map((t) => (
            <Link
              key={t.id}
              href={`/portal/messages/${t.id}`}
              className="border border-void-lighter bg-void-light px-5 py-4 flex items-center justify-between gap-4 hover:border-gold/20 transition-colors block"
            >
              <p className="text-white text-sm font-medium">
                {t.subject ?? 'General inquiry'}
              </p>
              <p className="text-white/30 text-xs shrink-0">
                {new Date(t.last_message_at).toLocaleDateString()}
              </p>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
