'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { createSupabaseBrowserClient } from '@/lib/portal/supabase-client'
import { usePortal } from './PortalLayoutClient'

interface Purchase {
  id: string
  product_sku: string
  amount_cents: number
  currency: string
  status: string
  created_at: string
}

interface Project {
  id: string
  title: string
  status: string
  created_at: string
}

interface Suggestion {
  id: string
  title: string
  reason: string
  suggested_sku: string
  estimated_value_cents: number | null
}

function formatCents(cents: number, currency = 'usd') {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency.toUpperCase(),
    minimumFractionDigits: 0,
  }).format(cents / 100)
}

const STATUS_COLORS: Record<string, string> = {
  intake: 'text-white/40 border-white/10',
  planning: 'text-turquoise border-turquoise/30 bg-turquoise/10',
  in_progress: 'text-gold border-gold/30 bg-gold/10',
  review: 'text-yellow-400 border-yellow-400/30 bg-yellow-400/10',
  delivered: 'text-green-400 border-green-400/30 bg-green-400/10',
  closed: 'text-white/20 border-white/10',
}

export default function PortalDashboardPage() {
  const { user } = usePortal()
  const [purchases, setPurchases] = useState<Purchase[]>([])
  const [projects, setProjects] = useState<Project[]>([])
  const [suggestions, setSuggestions] = useState<Suggestion[]>([])
  const [loading, setLoading] = useState(true)
  const supabase = createSupabaseBrowserClient()

  useEffect(() => {
    if (!user) return
    async function load() {
      const [p, pr, s] = await Promise.all([
        supabase
          .from('purchases')
          .select('id,product_sku,amount_cents,currency,status,created_at')
          .order('created_at', { ascending: false })
          .limit(5),
        supabase
          .from('projects')
          .select('id,title,status,created_at')
          .order('created_at', { ascending: false })
          .limit(5),
        supabase
          .from('upgrade_suggestions')
          .select('id,title,reason,suggested_sku,estimated_value_cents')
          .is('dismissed_at', null)
          .is('acted_on_at', null)
          .limit(3),
      ])
      setPurchases((p.data as Purchase[]) ?? [])
      setProjects((pr.data as Project[]) ?? [])
      setSuggestions((s.data as Suggestion[]) ?? [])
      setLoading(false)
    }
    load()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])

  const totalSpend = purchases
    .filter((p) => p.status === 'paid')
    .reduce((sum, p) => sum + p.amount_cents, 0)

  const activeProjects = projects.filter(
    (p) => !['closed', 'delivered'].includes(p.status)
  ).length

  async function dismissSuggestion(id: string) {
    await supabase
      .from('upgrade_suggestions')
      .update({ dismissed_at: new Date().toISOString() })
      .eq('id', id)
    setSuggestions((prev) => prev.filter((s) => s.id !== id))
  }

  return (
    <div className="max-w-5xl">
      {/* Header */}
      <div className="mb-8">
        <p className="text-gold uppercase tracking-[0.25em] text-xs mb-1">
          Overview
        </p>
        <h1 className="font-display text-3xl tracking-wider text-white">
          Welcome back
          {user?.email ? (
            <span className="text-white/40 text-lg font-body normal-case tracking-normal ml-2">
              — {user.email}
            </span>
          ) : null}
        </h1>
      </div>

      {loading ? (
        <div className="h-24 flex items-center">
          <span className="text-white/30 text-sm">Loading…</span>
        </div>
      ) : (
        <>
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
            {[
              {
                label: 'Total Spend',
                value: formatCents(totalSpend),
                sub: `${purchases.filter((p) => p.status === 'paid').length} purchase${purchases.filter((p) => p.status === 'paid').length !== 1 ? 's' : ''}`,
              },
              {
                label: 'Active Projects',
                value: String(activeProjects),
                sub: `${projects.length} total`,
              },
              {
                label: 'Messages',
                value: '—',
                sub: 'check inbox',
              },
            ].map((stat) => (
              <div
                key={stat.label}
                className="bg-void-light border border-void-lighter p-5"
              >
                <p className="text-xs text-white/40 uppercase tracking-wider mb-2">
                  {stat.label}
                </p>
                <p className="font-display text-3xl text-gold tracking-wider">
                  {stat.value}
                </p>
                <p className="text-xs text-white/30 mt-1">{stat.sub}</p>
              </div>
            ))}
          </div>

          {/* Upgrade suggestions */}
          {suggestions.length > 0 && (
            <div className="mb-8">
              <p className="text-xs font-semibold uppercase tracking-widest text-white/40 mb-4">
                Recommended for You
              </p>
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
                      <Link
                        href={`/contact/?sku=${s.suggested_sku}`}
                        className="text-xs bg-gold hover:bg-gold-light text-white px-3 py-1.5 transition-colors"
                      >
                        Learn more
                      </Link>
                      <button
                        onClick={() => dismissSuggestion(s.id)}
                        className="text-xs text-white/20 hover:text-white/60 transition-colors"
                        aria-label="Dismiss suggestion"
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Recent projects */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <p className="text-xs font-semibold uppercase tracking-widest text-white/40">
                Projects
              </p>
              <Link
                href="/portal/projects"
                className="text-xs text-gold/60 hover:text-gold transition-colors"
              >
                View all →
              </Link>
            </div>
            {projects.length === 0 ? (
              <div className="border border-void-lighter bg-void-light p-8 text-center">
                <p className="text-white/30 text-sm">No projects yet.</p>
                <p className="text-white/20 text-xs mt-1">
                  <Link href="/contact/" className="text-gold/50 hover:text-gold">
                    Contact us
                  </Link>{' '}
                  to get started.
                </p>
              </div>
            ) : (
              <div className="space-y-2">
                {projects.map((proj) => (
                  <Link
                    key={proj.id}
                    href={`/portal/projects/${proj.id}`}
                    className="border border-void-lighter bg-void-light px-5 py-4 flex items-center justify-between gap-3 hover:border-gold/20 transition-colors block"
                  >
                    <p className="text-white text-sm font-medium">{proj.title}</p>
                    <span
                      className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 border ${
                        STATUS_COLORS[proj.status] ??
                        'text-white/30 border-white/10'
                      }`}
                    >
                      {proj.status.replace('_', ' ')}
                    </span>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Recent purchases */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <p className="text-xs font-semibold uppercase tracking-widest text-white/40">
                Recent Purchases
              </p>
              <Link
                href="/portal/purchases"
                className="text-xs text-gold/60 hover:text-gold transition-colors"
              >
                View all →
              </Link>
            </div>
            {purchases.length === 0 ? (
              <div className="border border-void-lighter bg-void-light p-8 text-center">
                <p className="text-white/30 text-sm">No purchases yet.</p>
              </div>
            ) : (
              <div className="space-y-2">
                {purchases.map((p) => (
                  <div
                    key={p.id}
                    className="border border-void-lighter bg-void-light px-5 py-4 flex items-center justify-between gap-3"
                  >
                    <div>
                      <p className="text-white text-sm font-medium">
                        {p.product_sku}
                      </p>
                      <p className="text-white/40 text-xs">
                        {new Date(p.created_at).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-gold font-semibold text-sm">
                        {formatCents(p.amount_cents, p.currency)}
                      </p>
                      <p
                        className={`text-[10px] capitalize ${
                          p.status === 'paid'
                            ? 'text-green-400'
                            : p.status === 'refunded'
                              ? 'text-yellow-400'
                              : 'text-white/30'
                        }`}
                      >
                        {p.status}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  )
}
