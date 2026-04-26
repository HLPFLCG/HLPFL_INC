'use client'

import { useState, useEffect } from 'react'
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

const STATUS_LABEL: Record<string, string> = {
  intake: 'Intake',
  planning: 'Planning',
  in_progress: 'In Progress',
  review: 'Review',
  delivered: 'Delivered',
  closed: 'Closed',
}

const STATUS_COLORS: Record<string, string> = {
  intake: 'text-white/40 border-white/10',
  planning: 'text-turquoise border-turquoise/30 bg-turquoise/10',
  in_progress: 'text-gold border-gold/30 bg-gold/10',
  review: 'text-yellow-400 border-yellow-400/30 bg-yellow-400/10',
  delivered: 'text-green-400 border-green-400/30 bg-green-400/10',
  closed: 'text-white/20 border-white/10',
}

export default function ProjectsPageClient() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const supabase = createSupabaseBrowserClient()

  useEffect(() => {
    async function load() {
      const { data } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false })
      setProjects((data as Project[]) ?? [])
      setLoading(false)
    }
    load()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="max-w-4xl">
      <div className="mb-8">
        <p className="text-gold uppercase tracking-[0.25em] text-xs mb-1">
          Your Work
        </p>
        <h1 className="font-display text-3xl tracking-wider text-white">
          Projects
        </h1>
      </div>

      {loading ? (
        <p className="text-white/30 text-sm">Loading…</p>
      ) : projects.length === 0 ? (
        <div className="border border-void-lighter bg-void-light p-8 text-center">
          <p className="text-white/30 text-sm">No projects yet.</p>
          <p className="text-white/20 text-xs mt-1">
            <Link href="/contact/" className="text-gold/50 hover:text-gold">
              Contact us
            </Link>{' '}
            to kick off your first project.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {projects.map((proj) => (
            <Link
              key={proj.id}
              href={`/portal/projects/${proj.id}`}
              className="border border-void-lighter bg-void-light px-5 py-5 flex flex-wrap items-start justify-between gap-4 hover:border-gold/20 transition-colors block"
            >
              <div>
                <p className="text-white font-medium">{proj.title}</p>
                {proj.description && (
                  <p className="text-white/40 text-xs mt-1 line-clamp-2">
                    {proj.description}
                  </p>
                )}
                {proj.service_type && (
                  <p className="text-white/30 text-xs mt-1">
                    {proj.service_type}
                  </p>
                )}
              </div>
              <div className="flex flex-col items-end gap-2 shrink-0">
                <span
                  className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 border ${
                    STATUS_COLORS[proj.status] ?? 'text-white/30 border-white/10'
                  }`}
                >
                  {STATUS_LABEL[proj.status] ?? proj.status}
                </span>
                {proj.estimated_delivery_date && (
                  <p className="text-white/25 text-xs">
                    Est. {proj.estimated_delivery_date}
                  </p>
                )}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
