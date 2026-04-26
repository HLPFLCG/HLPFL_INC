'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'

interface Customer {
  id: string
  email: string
  display_name: string | null
  business_name: string | null
  business_type: string | null
  plan: string
  onboarded_at: string | null
  intake_completed: boolean
  created_at: string
}

export default function AdminCustomersClient() {
  const [customers, setCustomers] = useState<Customer[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')

  useEffect(() => {
    supabase
      .from('customers')
      .select('*')
      .order('created_at', { ascending: false })
      .then(({ data }) => {
        setCustomers((data as Customer[]) ?? [])
        setLoading(false)
      })
  }, [])

  const filtered = customers.filter(
    (c) =>
      search.trim() === '' ||
      c.email.toLowerCase().includes(search.toLowerCase()) ||
      (c.display_name ?? '').toLowerCase().includes(search.toLowerCase()) ||
      (c.business_name ?? '').toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="max-w-5xl">
      <div className="mb-8">
        <h1 className="font-display text-3xl tracking-wider text-white">
          Customers
        </h1>
        <p className="text-white/40 text-sm mt-1">
          {customers.length} total
        </p>
      </div>

      <input
        type="search"
        placeholder="Search by email or name…"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full mb-6 bg-void-light border border-void-lighter focus:border-gold/50 outline-none px-4 py-3 text-sm text-white"
        style={{ fontSize: '16px' }}
      />

      {loading ? (
        <p className="text-white/30 text-sm">Loading…</p>
      ) : filtered.length === 0 ? (
        <p className="text-white/30 text-sm">No customers found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-void-lighter text-left">
                {['Email', 'Name', 'Business', 'Plan', 'Onboarded', 'Joined'].map(
                  (h) => (
                    <th
                      key={h}
                      className="text-[10px] text-white/30 uppercase tracking-wider pb-3 pr-4 font-normal whitespace-nowrap"
                    >
                      {h}
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody>
              {filtered.map((c) => (
                <tr
                  key={c.id}
                  className="border-b border-void-lighter hover:bg-void-light transition-colors"
                >
                  <td className="py-3 pr-4 text-white truncate max-w-[200px]">
                    {c.email}
                  </td>
                  <td className="py-3 pr-4 text-white/60">
                    {c.display_name ?? '—'}
                  </td>
                  <td className="py-3 pr-4 text-white/60">
                    {c.business_name ?? '—'}
                  </td>
                  <td className="py-3 pr-4">
                    <span
                      className={`text-[10px] font-bold uppercase tracking-wider ${
                        c.plan === 'pro'
                          ? 'text-gold'
                          : 'text-white/30'
                      }`}
                    >
                      {c.plan}
                    </span>
                  </td>
                  <td className="py-3 pr-4">
                    {c.intake_completed ? (
                      <span className="text-green-400 text-xs">✓</span>
                    ) : (
                      <span className="text-white/20 text-xs">—</span>
                    )}
                  </td>
                  <td className="py-3 text-white/30 text-xs whitespace-nowrap">
                    {new Date(c.created_at).toLocaleDateString()}
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
