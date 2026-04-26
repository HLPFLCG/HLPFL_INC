'use client'

import { useState, useEffect, use } from 'react'
import Link from 'next/link'
import { createSupabaseBrowserClient } from '@/lib/portal/supabase-client'

interface Project {
  id: string
  title: string
  description: string | null
  status: string
  service_type: string | null
  estimated_delivery_date: string | null
  created_at: string
}

interface ProjectUpdate {
  id: string
  author_role: string
  body: string
  created_at: string
}

const STATUS_STEPS = [
  'intake',
  'planning',
  'in_progress',
  'review',
  'delivered',
]

export default function ProjectDetailClient({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = use(params)
  const [project, setProject] = useState<Project | null>(null)
  const [updates, setUpdates] = useState<ProjectUpdate[]>([])
  const [newMessage, setNewMessage] = useState('')
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const supabase = createSupabaseBrowserClient()

  useEffect(() => {
    async function load() {
      const [pRes, uRes] = await Promise.all([
        supabase.from('projects').select('*').eq('id', id).single(),
        supabase
          .from('project_updates')
          .select('*')
          .eq('project_id', id)
          .order('created_at', { ascending: true }),
      ])
      setProject((pRes.data as Project) ?? null)
      setUpdates((uRes.data as ProjectUpdate[]) ?? [])
      setLoading(false)
    }
    load()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  async function sendMessage(e: React.FormEvent) {
    e.preventDefault()
    if (!newMessage.trim()) return
    setSubmitting(true)
    await supabase.from('project_updates').insert({
      project_id: id,
      author_role: 'customer',
      body: newMessage.trim(),
    })
    const { data } = await supabase
      .from('project_updates')
      .select('*')
      .eq('project_id', id)
      .order('created_at', { ascending: true })
    setUpdates((data as ProjectUpdate[]) ?? [])
    setNewMessage('')
    setSubmitting(false)
  }

  if (loading) {
    return <p className="text-white/30 text-sm">Loading…</p>
  }

  if (!project) {
    return (
      <div className="max-w-2xl">
        <p className="text-white/40">Project not found.</p>
        <Link href="/portal/projects" className="text-gold/60 hover:text-gold text-sm mt-4 block">
          ← Back to projects
        </Link>
      </div>
    )
  }

  const stepIndex = STATUS_STEPS.indexOf(project.status)

  return (
    <div className="max-w-3xl">
      <Link
        href="/portal/projects"
        className="text-xs text-gold/60 hover:text-gold transition-colors mb-6 block"
      >
        ← All projects
      </Link>

      <h1 className="font-display text-3xl tracking-wider text-white mb-1">
        {project.title}
      </h1>
      {project.service_type && (
        <p className="text-white/40 text-xs uppercase tracking-wider mb-6">
          {project.service_type}
        </p>
      )}

      {/* Status timeline */}
      <div className="mb-8">
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

      {project.description && (
        <div className="border border-void-lighter bg-void-light p-5 mb-8">
          <p className="text-white/60 text-sm leading-relaxed">
            {project.description}
          </p>
        </div>
      )}

      {/* Updates thread */}
      <div className="mb-6">
        <p className="text-xs font-semibold uppercase tracking-widest text-white/40 mb-4">
          Updates
        </p>
        {updates.length === 0 ? (
          <p className="text-white/20 text-sm">No updates yet.</p>
        ) : (
          <div className="space-y-3">
            {updates.map((u) => (
              <div
                key={u.id}
                className={`px-4 py-3 text-sm leading-relaxed ${
                  u.author_role === 'customer'
                    ? 'bg-gold/[0.06] border border-gold/15 ml-8 text-white/80'
                    : 'bg-void-light border border-void-lighter mr-8 text-white/70'
                }`}
              >
                <p className="text-[10px] uppercase tracking-wider mb-1 text-white/30">
                  {u.author_role === 'customer' ? 'You' : 'HLPFL'} ·{' '}
                  {new Date(u.created_at).toLocaleDateString()}
                </p>
                <p>{u.body}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Reply form */}
      <form onSubmit={sendMessage} className="flex gap-3">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Add a note or question…"
          className="flex-1 bg-void-light border border-void-lighter focus:border-gold/50 outline-none px-4 py-2.5 text-sm text-white"
          style={{ fontSize: '16px' }}
        />
        <button
          type="submit"
          disabled={submitting || !newMessage.trim()}
          className="bg-gold hover:bg-gold-light disabled:opacity-40 text-white text-xs font-semibold px-4 py-2.5 transition-colors"
        >
          Send
        </button>
      </form>
    </div>
  )
}
