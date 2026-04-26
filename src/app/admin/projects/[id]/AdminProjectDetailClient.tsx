'use client'

import { useState, useEffect, use } from 'react'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'

interface Project {
  id: string
  title: string
  description: string | null
  status: string
  service_type: string | null
  estimated_delivery_date: string | null
  created_at: string
  customers: { email: string; display_name: string | null } | null
}

interface ProjectUpdate {
  id: string
  author_role: string
  body: string
  created_at: string
}

const STATUSES = ['intake', 'planning', 'in_progress', 'review', 'delivered', 'closed']

export default function AdminProjectDetailClient({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = use(params)
  const [project, setProject] = useState<Project | null>(null)
  const [updates, setUpdates] = useState<ProjectUpdate[]>([])
  const [newNote, setNewNote] = useState('')
  const [loading, setLoading] = useState(true)
  const [posting, setPosting] = useState(false)
  const [saving, setSaving] = useState(false)
  const [editStatus, setEditStatus] = useState('')
  const [editDelivery, setEditDelivery] = useState('')
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    async function load() {
      const [pRes, uRes] = await Promise.all([
        supabase
          .from('projects')
          .select('*,customers(email,display_name)')
          .eq('id', id)
          .single(),
        supabase
          .from('project_updates')
          .select('*')
          .eq('project_id', id)
          .order('created_at', { ascending: false }),
      ])
      const p = pRes.data as Project
      setProject(p ?? null)
      setEditStatus(p?.status ?? 'intake')
      setEditDelivery(p?.estimated_delivery_date ?? '')
      setUpdates((uRes.data as ProjectUpdate[]) ?? [])
      setLoading(false)
    }
    load()
  }, [id])

  async function postUpdate(e: React.FormEvent) {
    e.preventDefault()
    if (!newNote.trim()) return
    setPosting(true)
    const { data } = await supabase
      .from('project_updates')
      .insert({ project_id: id, author_role: 'admin', body: newNote.trim() })
      .select()
      .single()
    if (data) setUpdates((prev) => [data as ProjectUpdate, ...prev])
    setNewNote('')
    setPosting(false)
  }

  async function saveProjectMeta(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    await supabase
      .from('projects')
      .update({
        status: editStatus,
        estimated_delivery_date: editDelivery || null,
        updated_at: new Date().toISOString(),
        ...(editStatus === 'delivered' ? { delivered_at: new Date().toISOString() } : {}),
      })
      .eq('id', id)
    setProject((p) => p ? { ...p, status: editStatus, estimated_delivery_date: editDelivery || null } : p)
    setSaving(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  if (loading) return <p className="text-white/30 text-sm">Loading…</p>
  if (!project) {
    return (
      <div>
        <p className="text-white/40">Project not found.</p>
        <Link href="/admin/projects" className="text-gold/60 hover:text-gold text-sm mt-4 block">
          ← Back
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-3xl">
      <Link
        href="/admin/projects"
        className="text-xs text-gold/60 hover:text-gold transition-colors mb-6 block"
      >
        ← All projects
      </Link>

      <h1 className="font-display text-3xl tracking-wider text-white mb-1">
        {project.title}
      </h1>
      <p className="text-white/40 text-xs mb-6">
        {project.customers?.display_name ?? project.customers?.email ?? '—'}
        {project.service_type ? ` · ${project.service_type}` : ''}
      </p>

      {/* Project meta editor */}
      <form
        onSubmit={saveProjectMeta}
        className="border border-void-lighter bg-void-light p-5 mb-8 space-y-4"
      >
        <p className="text-xs font-semibold uppercase tracking-widest text-white/30 mb-2">
          Project Settings
        </p>
        <div className="grid grid-cols-2 gap-4">
          <label className="block">
            <span className="text-xs text-white/40 uppercase tracking-wider block mb-1.5">
              Status
            </span>
            <select
              value={editStatus}
              onChange={(e) => setEditStatus(e.target.value)}
              className="w-full bg-void border border-void-lighter focus:border-gold/50 outline-none px-3 py-2.5 text-sm text-white"
            >
              {STATUSES.map((s) => (
                <option key={s} value={s}>
                  {s.replace('_', ' ')}
                </option>
              ))}
            </select>
          </label>
          <label className="block">
            <span className="text-xs text-white/40 uppercase tracking-wider block mb-1.5">
              Est. Delivery
            </span>
            <input
              type="date"
              value={editDelivery}
              onChange={(e) => setEditDelivery(e.target.value)}
              className="w-full bg-void border border-void-lighter focus:border-gold/50 outline-none px-3 py-2.5 text-sm text-white"
            />
          </label>
        </div>
        <div className="flex items-center gap-4">
          <button
            type="submit"
            disabled={saving}
            className="bg-gold hover:bg-gold-light disabled:opacity-50 text-white text-xs font-semibold px-4 py-2 transition-colors"
          >
            {saving ? 'Saving…' : 'Save'}
          </button>
          {saved && <span className="text-green-400 text-xs">Saved.</span>}
        </div>
      </form>

      {/* Post admin update */}
      <div className="mb-8">
        <p className="text-xs font-semibold uppercase tracking-widest text-white/30 mb-4">
          Post Update to Client
        </p>
        <form onSubmit={postUpdate} className="flex gap-3">
          <textarea
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
            placeholder="Write a project update visible to the client…"
            rows={3}
            className="flex-1 bg-void-light border border-void-lighter focus:border-gold/50 outline-none px-4 py-2.5 text-sm text-white resize-none"
            style={{ fontSize: '16px' }}
          />
          <button
            type="submit"
            disabled={posting || !newNote.trim()}
            className="self-end bg-gold hover:bg-gold-light disabled:opacity-40 text-white text-xs font-semibold px-4 py-2.5 transition-colors whitespace-nowrap"
          >
            Post
          </button>
        </form>
      </div>

      {/* Update thread */}
      <div>
        <p className="text-xs font-semibold uppercase tracking-widest text-white/30 mb-4">
          Update History
        </p>
        {updates.length === 0 ? (
          <p className="text-white/20 text-sm">No updates yet.</p>
        ) : (
          <div className="space-y-3">
            {updates.map((u) => (
              <div
                key={u.id}
                className={`px-4 py-3 text-sm leading-relaxed border ${
                  u.author_role === 'admin'
                    ? 'bg-void-light border-void-lighter'
                    : 'bg-gold/[0.04] border-gold/15'
                }`}
              >
                <p className="text-[10px] uppercase tracking-wider mb-1 text-white/30">
                  {u.author_role === 'admin' ? 'HLPFL (you)' : 'Client'} ·{' '}
                  {new Date(u.created_at).toLocaleString()}
                </p>
                <p className="text-white/70">{u.body}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
