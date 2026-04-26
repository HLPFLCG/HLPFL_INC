'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { createSupabaseBrowserClient } from '@/lib/portal/supabase-client'
import { usePortal } from '../PortalLayoutClient'

interface Invoice {
  id: string
  number: string | null
  amount_due: number
  amount_paid: number
  currency: string
  status: string
  hosted_invoice_url: string | null
  pdf: string | null
  created: number
  due_date: number | null
}

interface Subscription {
  id: string
  status: string
  current_period_end: number
  cancel_at_period_end: boolean
  plan_name: string
  amount: number
  currency: string
  interval: string
}

interface BillingData {
  invoices: Invoice[]
  subscriptions: Subscription[]
}

function formatCents(amount: number, currency = 'usd') {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency.toUpperCase(),
    minimumFractionDigits: 0,
  }).format(amount / 100)
}

const INVOICE_STATUS_COLOR: Record<string, string> = {
  paid: 'text-green-400',
  open: 'text-yellow-400',
  void: 'text-white/20',
  uncollectible: 'text-red-400',
  draft: 'text-white/30',
}

export default function BillingPageClient() {
  const { user } = usePortal()
  const [data, setData] = useState<BillingData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const supabase = createSupabaseBrowserClient()

  useEffect(() => {
    if (!user) return

    async function load() {
      // Get the session token to authenticate the API call
      const {
        data: { session },
      } = await supabase.auth.getSession()

      if (!session) {
        setError('Session expired. Please sign in again.')
        setLoading(false)
        return
      }

      const res = await fetch('/api/portal/billing', {
        headers: { Authorization: `Bearer ${session.access_token}` },
      })

      if (!res.ok) {
        const err = await res.json().catch(() => ({ error: 'Failed to load billing.' }))
        setError((err as { error?: string }).error ?? 'Failed to load billing data.')
        setLoading(false)
        return
      }

      const json = await res.json() as BillingData
      setData(json)
      setLoading(false)
    }

    load()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])

  return (
    <div className="max-w-4xl">
      <div className="mb-8">
        <p className="text-gold uppercase tracking-[0.25em] text-xs mb-1">
          Account
        </p>
        <h1 className="font-display text-3xl tracking-wider text-white">
          Billing
        </h1>
      </div>

      {loading ? (
        <p className="text-white/30 text-sm">Loading billing data…</p>
      ) : error ? (
        <div className="border border-red-400/20 bg-red-400/5 px-5 py-4">
          <p className="text-red-400 text-sm">{error}</p>
          {error.toLowerCase().includes('stripe') || error.toLowerCase().includes('account') ? (
            <p className="text-white/40 text-xs mt-2">
              Your billing profile will appear here after your first payment.
            </p>
          ) : null}
        </div>
      ) : data ? (
        <>
          {/* Active subscriptions */}
          {data.subscriptions.length > 0 && (
            <div className="mb-8">
              <p className="text-xs font-semibold uppercase tracking-widest text-white/40 mb-4">
                Active Subscriptions
              </p>
              <div className="space-y-3">
                {data.subscriptions.map((sub) => (
                  <div
                    key={sub.id}
                    className="border border-void-lighter bg-void-light px-5 py-4 flex flex-wrap items-center justify-between gap-4"
                  >
                    <div>
                      <p className="text-white font-medium text-sm">
                        {sub.plan_name}
                      </p>
                      <p className="text-white/40 text-xs mt-0.5">
                        {formatCents(sub.amount, sub.currency)}/{sub.interval} ·{' '}
                        {sub.cancel_at_period_end
                          ? `Cancels ${new Date(sub.current_period_end * 1000).toLocaleDateString()}`
                          : `Renews ${new Date(sub.current_period_end * 1000).toLocaleDateString()}`}
                      </p>
                    </div>
                    <span
                      className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 border ${
                        sub.status === 'active'
                          ? 'text-green-400 border-green-400/30 bg-green-400/10'
                          : 'text-white/30 border-white/10'
                      }`}
                    >
                      {sub.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Invoice history */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-white/40 mb-4">
              Invoice History
            </p>
            {data.invoices.length === 0 ? (
              <div className="border border-void-lighter bg-void-light p-8 text-center">
                <p className="text-white/30 text-sm">No invoices yet.</p>
              </div>
            ) : (
              <div className="space-y-2">
                {data.invoices.map((inv) => (
                  <div
                    key={inv.id}
                    className="border border-void-lighter bg-void-light px-5 py-4 flex flex-wrap items-center justify-between gap-4"
                  >
                    <div>
                      <p className="text-white text-sm font-medium">
                        {inv.number ?? inv.id}
                      </p>
                      <p className="text-white/40 text-xs mt-0.5">
                        {new Date(inv.created * 1000).toLocaleDateString()}
                        {inv.due_date
                          ? ` · Due ${new Date(inv.due_date * 1000).toLocaleDateString()}`
                          : ''}
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      <p className="text-gold font-semibold text-sm">
                        {formatCents(inv.amount_due, inv.currency)}
                      </p>
                      <span
                        className={`text-[10px] font-bold uppercase tracking-wider ${
                          INVOICE_STATUS_COLOR[inv.status] ?? 'text-white/30'
                        }`}
                      >
                        {inv.status}
                      </span>
                      {inv.status === 'open' && inv.hosted_invoice_url && (
                        <a
                          href={inv.hosted_invoice_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs bg-gold hover:bg-gold-light text-white px-3 py-1.5 transition-colors"
                        >
                          Pay now
                        </a>
                      )}
                      {inv.pdf && (
                        <a
                          href={inv.pdf}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-gold/60 hover:text-gold border border-gold/20 hover:border-gold/40 px-3 py-1.5 transition-colors"
                        >
                          PDF
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="mt-8 text-center">
            <p className="text-white/20 text-xs">
              Questions about your invoice?{' '}
              <Link href="/contact/" className="text-gold/50 hover:text-gold">
                Contact us
              </Link>
            </p>
          </div>
        </>
      ) : null}
    </div>
  )
}
