'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

interface Customer {
  id: string
  email: string
  display_name: string | null
  business_name: string | null
}

const STATUSES = ['intake', 'planning', 'in_progress', 'review', 'delivered', 'closed']

export default function AdminNewProjectClient() {
  const [customers, setCustomers] = useState<Customer[]>([])
  const [form, setForm] = useState({
    customer_id: '',
    title: '',
    description: '',
    status: 'intake',
    service_type: '',
    estimated_delivery_date: '',
  })
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const router = useRouter()

  useEffect(() => {
    supabase
      .from('customers')
      .select('id,email,display_name,business_name')
      .order('email')
      .then(({ data }) => setCustomers((data as Customer[]) ?? []))
  }, [])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    if (!form.customer_id) { setError('Please select a customer.'); return }
    if (!form.title.trim()) { setError('Title is required.'); return }

    setSubmitting(true)
    const { error: err } = await supabase.from('projects').insert({
      customer_id: form.customer_id,
      title: form.title.trim(),
      description: form.description.trim() || null,
      status: form.status,
      service_type: form.service_type.trim() || null,
      estimated_delivery_date: form.estimated_delivery_date || null,
    })

    if (err) {
      setError(err.message)
      setSubmitting(false)
      return
    }

    router.push('/admin/projects')
  }

  const set = (key: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((f) => ({ ...f, [key]: e.target.value }))

  return (
    <div className="max-w-xl">
      <Link
        href="/admin/projects"
        className="text-xs text-gold/60 hover:text-gold transition-colors mb-6 block"
      >
        ← Back to projects
      </Link>

      <h1 className="font-display text-3xl tracking-wider text-white mb-8">
        New Project
      </h1>

      <form onSubmit={handleSubmit} className="space-y-5">
        <label className="block">
          <span className="text-xs text-white/40 uppercase tracking-wider block mb-1.5">
            Customer *
          </span>
          <select
            value={form.customer_id}
            onChange={set('customer_id')}
            required
            className="w-full bg-void-light border border-void-lighter focus:border-gold/50 outline-none px-4 py-3 text-sm text-white"
          >
            <option value="">Select customer…</option>
            {customers.map((c) => (
              <option key={c.id} value={c.id}>
                {c.display_name ?? c.email}
                {c.business_name ? ` — ${c.business_name}` : ''}
              </option>
            ))}
          </select>
        </label>

        <label className="block">
          <span className="text-xs text-white/40 uppercase tracking-wider block mb-1.5">
            Project Title *
          </span>
          <input
            type="text"
            value={form.title}
            onChange={set('title')}
            required
            className="w-full bg-void-light border border-void-lighter focus:border-gold/50 outline-none px-4 py-3 text-sm text-white"
            style={{ fontSize: '16px' }}
          />
        </label>

        <label className="block">
          <span className="text-xs text-white/40 uppercase tracking-wider block mb-1.5">
            Description
          </span>
          <textarea
            value={form.description}
            onChange={set('description')}
            rows={3}
            className="w-full bg-void-light border border-void-lighter focus:border-gold/50 outline-none px-4 py-3 text-sm text-white resize-none"
            style={{ fontSize: '16px' }}
          />
        </label>

        <div className="grid grid-cols-2 gap-4">
          <label className="block">
            <span className="text-xs text-white/40 uppercase tracking-wider block mb-1.5">
              Status
            </span>
            <select
              value={form.status}
              onChange={set('status')}
              className="w-full bg-void-light border border-void-lighter focus:border-gold/50 outline-none px-4 py-3 text-sm text-white"
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
              Service Type
            </span>
            <input
              type="text"
              value={form.service_type}
              onChange={set('service_type')}
              placeholder="e.g. Social Media"
              className="w-full bg-void-light border border-void-lighter focus:border-gold/50 outline-none px-4 py-3 text-sm text-white"
              style={{ fontSize: '16px' }}
            />
          </label>
        </div>

        <label className="block">
          <span className="text-xs text-white/40 uppercase tracking-wider block mb-1.5">
            Estimated Delivery Date
          </span>
          <input
            type="date"
            value={form.estimated_delivery_date}
            onChange={set('estimated_delivery_date')}
            className="w-full bg-void-light border border-void-lighter focus:border-gold/50 outline-none px-4 py-3 text-sm text-white"
          />
        </label>

        {error && (
          <p className="text-red-400 text-sm border border-red-400/20 bg-red-400/5 px-4 py-3">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={submitting}
          className="w-full bg-gold hover:bg-gold-light disabled:opacity-50 text-white font-semibold py-3 text-sm tracking-wide transition-colors"
        >
          {submitting ? 'Creating…' : 'Create Project'}
        </button>
      </form>
    </div>
  )
}
