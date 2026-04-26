'use client'

import { useState, useEffect } from 'react'
import { createSupabaseBrowserClient } from '@/lib/portal/supabase-client'

interface Purchase {
  id: string
  product_sku: string
  amount_cents: number
  currency: string
  status: string
  stripe_payment_intent_id: string | null
  stripe_checkout_session_id: string | null
  created_at: string
}

function formatCents(cents: number, currency = 'usd') {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency.toUpperCase(),
    minimumFractionDigits: 0,
  }).format(cents / 100)
}

const STATUS_COLORS: Record<string, string> = {
  pending: 'text-yellow-400',
  paid: 'text-green-400',
  refunded: 'text-orange-400',
  failed: 'text-red-400',
}

export default function PurchasesPageClient() {
  const [purchases, setPurchases] = useState<Purchase[]>([])
  const [loading, setLoading] = useState(true)
  const supabase = createSupabaseBrowserClient()

  useEffect(() => {
    async function load() {
      const { data } = await supabase
        .from('purchases')
        .select('*')
        .order('created_at', { ascending: false })
      setPurchases((data as Purchase[]) ?? [])
      setLoading(false)
    }
    load()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const total = purchases
    .filter((p) => p.status === 'paid')
    .reduce((sum, p) => sum + p.amount_cents, 0)

  return (
    <div className="max-w-4xl">
      <div className="mb-8">
        <p className="text-gold uppercase tracking-[0.25em] text-xs mb-1">
          History
        </p>
        <h1 className="font-display text-3xl tracking-wider text-white">
          Purchases
        </h1>
        {total > 0 && (
          <p className="text-white/40 text-sm mt-1">
            Total spent: {formatCents(total)}
          </p>
        )}
      </div>

      {loading ? (
        <p className="text-white/30 text-sm">Loading…</p>
      ) : purchases.length === 0 ? (
        <div className="border border-void-lighter bg-void-light p-8 text-center">
          <p className="text-white/30 text-sm">No purchases yet.</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-void-lighter text-left">
                <th className="text-[10px] text-white/30 uppercase tracking-wider pb-3 pr-4 font-normal">
                  Product
                </th>
                <th className="text-[10px] text-white/30 uppercase tracking-wider pb-3 pr-4 font-normal">
                  Amount
                </th>
                <th className="text-[10px] text-white/30 uppercase tracking-wider pb-3 pr-4 font-normal">
                  Status
                </th>
                <th className="text-[10px] text-white/30 uppercase tracking-wider pb-3 font-normal">
                  Date
                </th>
              </tr>
            </thead>
            <tbody>
              {purchases.map((p) => (
                <tr
                  key={p.id}
                  className="border-b border-void-lighter hover:bg-void-light transition-colors"
                >
                  <td className="py-3 pr-4 text-white">
                    <p>{p.product_sku}</p>
                    {p.stripe_payment_intent_id && (
                      <p className="text-white/20 text-xs font-mono truncate max-w-[200px]">
                        {p.stripe_payment_intent_id}
                      </p>
                    )}
                  </td>
                  <td className="py-3 pr-4 text-gold font-semibold">
                    {formatCents(p.amount_cents, p.currency)}
                  </td>
                  <td className={`py-3 pr-4 text-xs font-bold uppercase tracking-wider ${STATUS_COLORS[p.status] ?? 'text-white/30'}`}>
                    {p.status}
                  </td>
                  <td className="py-3 text-white/40 text-xs">
                    {new Date(p.created_at).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
