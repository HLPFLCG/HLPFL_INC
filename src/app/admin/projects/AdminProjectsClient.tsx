'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'

interface Project {
  id: string
  title: string
  status: string
  service_type: string | null
  created_at: string
  customers: { email: string; display_name: string | null } | null
}

const STATUS_COLORS: Record<string, string> = {
  intake: 'text-white/40',
  planning: 'text-blue-400',
  in_progress: 'text-gold',
  review: 'text-yellow-400',
  delivered: 'text-green-400',
  closed: 'text-white/20',
}

export default function AdminProjectsClient() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [statusFilter, setStatusFilter] = useState('all')

  useEffect(() => {
    async function load() {
      const query = supabase
        .from('projects')
        .select('id,title,status,service_type,created_at,customers(email,display_name)')
        .order('created_at', { ascending: false })

      const { data } = await query
      setProjects((data as unknown as Project[]) ?? [])
      setLoading(false)
    }
    load()
  }, [])

  const filtered =
    statusFilter === 'all'
      ? projects
      : projects.filter((p) => p.status === statusFilter)

  return (
    <div className="max-w-5xl">
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-display text-3xl tracking-wider text-white">
          Projects
        </h1>
        <Link
          href="/admin/projects/new"
          className="bg-gold hover:bg-gold-light text-white text-xs font-semibold px-4 py-2.5 tracking-wide transition-colors"
        >
          + New Project
        </Link>
      </div>

      {/* Status filter */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {['all', 'intake', 'planning', 'in_progress', 'review', 'delivered', 'closed'].map(
          (s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`text-xs px-3 py-1.5 border transition-colors ${
                statusFilter === s
                  ? 'border-gold/50 text-gold bg-gold/10'
                  : 'border-void-lighter text-white/40 hover:text-white'
              }`}
            >
              {s.replace('_', ' ')}
            </button>
          )
        )}
      </div>

      {loading ? (
        <p className="text-white/30 text-sm">Loading…</p>
      ) : filtered.length === 0 ? (
        <div className="border border-void-lighter bg-void-light p-8 text-center">
          <p className="text-white/30 text-sm">No projects.</p>
        </div>
      ) : (
        <div className="space-y-2">
          {filtered.map((proj) => (
            <Link
              key={proj.id}
              href={`/admin/projects/${proj.id}`}
              className="border border-void-lighter bg-void-light px-5 py-4 flex flex-wrap items-center justify-between gap-4 hover:border-gold/20 transition-colors block"
            >
              <div>
                <p className="text-white font-medium text-sm">{proj.title}</p>
                <p className="text-white/40 text-xs mt-0.5">
                  {proj.customers?.display_name ?? proj.customers?.email ?? 'Unknown'}
                  {proj.service_type ? ` · ${proj.service_type}` : ''}
                </p>
              </div>
              <div className="flex items-center gap-4">
                <span
                  className={`text-[10px] font-bold uppercase tracking-wider ${
                    STATUS_COLORS[proj.status] ?? 'text-white/30'
                  }`}
                >
                  {proj.status.replace('_', ' ')}
                </span>
                <span className="text-white/25 text-xs">
                  {new Date(proj.created_at).toLocaleDateString()}
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
