'use client'

import { useState, useEffect } from 'react'
import { createSupabaseBrowserClient } from '@/lib/portal/supabase-client'
import { usePortal } from '../PortalLayoutClient'

interface Customer {
  display_name: string | null
  business_name: string | null
  business_type: string | null
  preferred_language: 'en' | 'es'
}

export default function SettingsPageClient() {
  const { user } = usePortal()
  const [form, setForm] = useState<Customer>({
    display_name: '',
    business_name: '',
    business_type: '',
    preferred_language: 'en',
  })
  const [saved, setSaved] = useState(false)
  const [saving, setSaving] = useState(false)
  const [loading, setLoading] = useState(true)
  const supabase = createSupabaseBrowserClient()

  useEffect(() => {
    if (!user) return
    async function load() {
      const { data } = await supabase
        .from('customers')
        .select(
          'display_name,business_name,business_type,preferred_language'
        )
        .eq('id', user!.id)
        .single()
      if (data) setForm(data as Customer)
      setLoading(false)
    }
    load()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])

  async function handleSave(e: React.FormEvent) {
    e.preventDefault()
    if (!user) return
    setSaving(true)
    await supabase
      .from('customers')
      .update({
        display_name: form.display_name || null,
        business_name: form.business_name || null,
        business_type: form.business_type || null,
        preferred_language: form.preferred_language,
        updated_at: new Date().toISOString(),
      })
      .eq('id', user.id)
    setSaved(true)
    setSaving(false)
    setTimeout(() => setSaved(false), 3000)
  }

  if (loading) {
    return <p className="text-white/30 text-sm">Loading…</p>
  }

  return (
    <div className="max-w-lg">
      <div className="mb-8">
        <p className="text-gold uppercase tracking-[0.25em] text-xs mb-1">
          Account
        </p>
        <h1 className="font-display text-3xl tracking-wider text-white">
          Settings
        </h1>
        <p className="text-white/40 text-sm mt-1">{user?.email}</p>
      </div>

      <form onSubmit={handleSave} className="space-y-5">
        <label className="block">
          <span className="text-xs text-white/40 uppercase tracking-wider block mb-1.5">
            Display Name
          </span>
          <input
            type="text"
            value={form.display_name ?? ''}
            onChange={(e) =>
              setForm((f) => ({ ...f, display_name: e.target.value }))
            }
            className="w-full bg-void-light border border-void-lighter focus:border-gold/50 outline-none px-4 py-3 text-sm text-white"
            placeholder="Your name"
            style={{ fontSize: '16px' }}
          />
        </label>

        <label className="block">
          <span className="text-xs text-white/40 uppercase tracking-wider block mb-1.5">
            Business Name
          </span>
          <input
            type="text"
            value={form.business_name ?? ''}
            onChange={(e) =>
              setForm((f) => ({ ...f, business_name: e.target.value }))
            }
            className="w-full bg-void-light border border-void-lighter focus:border-gold/50 outline-none px-4 py-3 text-sm text-white"
            placeholder="Your business"
            style={{ fontSize: '16px' }}
          />
        </label>

        <label className="block">
          <span className="text-xs text-white/40 uppercase tracking-wider block mb-1.5">
            Business Type
          </span>
          <input
            type="text"
            value={form.business_type ?? ''}
            onChange={(e) =>
              setForm((f) => ({ ...f, business_type: e.target.value }))
            }
            className="w-full bg-void-light border border-void-lighter focus:border-gold/50 outline-none px-4 py-3 text-sm text-white"
            placeholder="e.g. Restaurant, Hotel, Tour Operator"
            style={{ fontSize: '16px' }}
          />
        </label>

        <label className="block">
          <span className="text-xs text-white/40 uppercase tracking-wider block mb-1.5">
            Preferred Language
          </span>
          <select
            value={form.preferred_language}
            onChange={(e) =>
              setForm((f) => ({
                ...f,
                preferred_language: e.target.value as 'en' | 'es',
              }))
            }
            className="w-full bg-void-light border border-void-lighter focus:border-gold/50 outline-none px-4 py-3 text-sm text-white"
          >
            <option value="en">English</option>
            <option value="es">Español</option>
          </select>
        </label>

        {saved && (
          <p className="text-green-400 text-xs border border-green-400/20 bg-green-400/5 px-4 py-3">
            Settings saved.
          </p>
        )}

        <button
          type="submit"
          disabled={saving}
          className="w-full bg-gold hover:bg-gold-light disabled:opacity-50 text-white font-semibold py-3 text-sm tracking-wide transition-colors"
        >
          {saving ? 'Saving…' : 'Save Settings'}
        </button>
      </form>

      {/* Retainer SLA reference */}
      <div className="mt-10 border border-void-lighter bg-void-light p-6">
        <p className="text-xs font-semibold uppercase tracking-widest text-white/30 mb-4">
          Retainer Plans
        </p>
        <div className="space-y-4 text-sm">
          {[
            {
              name: 'Starter — $25/mo',
              items: [
                '2 hours of updates per month',
                '48-hour first response',
                'Work scheduled within 5 business days',
                'Hours don\'t roll over',
                'Overages quoted before work begins',
              ],
            },
            {
              name: 'Growth — $75/mo',
              items: [
                '4 hours of updates + 8 social posts/month',
                '24-hour first response',
                'Work scheduled within 3 business days',
                'Hours don\'t roll over',
              ],
            },
            {
              name: 'Partner — $149/mo',
              items: [
                '8 hours of updates + 16 social posts + 1 hr consulting',
                'Same-business-day first response',
                'Work scheduled within 2 business days',
                'Monthly performance report',
              ],
            },
          ].map((plan) => (
            <div key={plan.name}>
              <p className="text-gold text-xs font-semibold mb-1">{plan.name}</p>
              <ul className="space-y-0.5">
                {plan.items.map((item) => (
                  <li key={item} className="text-white/40 text-xs">
                    · {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
