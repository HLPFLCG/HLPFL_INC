'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { supabase, formatCents } from '@/lib/supabase'
import { useDashboard } from '../DashboardLayoutClient'
import type { Property } from '@/lib/supabase'

export default function DashboardPropertiesPage() {
  const { client } = useDashboard()
  const [properties, setProperties] = useState<Property[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      if (!client) { setLoading(false); return }
      const { data } = await supabase.from('properties').select('*').eq('client_id', client.id).order('created_at')
      setProperties(data ?? [])
      setLoading(false)
    }
    load()
  }, [client])

  async function togglePublished(id: string, current: boolean) {
    await supabase.from('properties').update({ published: !current }).eq('id', id).eq('client_id', client!.id)
    setProperties(prev => prev.map(p => p.id === id ? { ...p, published: !current } : p))
  }

  // Embed snippet for a property
  function embedSnippet(slug: string) {
    return `<script src="https://hlpfl.org/embed/booking.js" data-property="${slug}" defer></script>`
  }

  return (
    <div className="max-w-4xl">
      <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
        <div>
          <p className="text-gold uppercase tracking-[0.25em] text-xs mb-1">Properties</p>
          <h1 className="font-display text-3xl tracking-wider text-white">YOUR PROPERTIES</h1>
        </div>
      </div>

      {/* Info about adding properties */}
      <div className="border border-gold/15 bg-gold/[0.03] px-5 py-4 mb-6 text-sm">
        <p className="text-gold font-semibold text-xs uppercase tracking-wider mb-2">Adding a New Property</p>
        <p className="text-white/50 text-xs leading-relaxed">
          To add a new property, contact{' '}
          <a href="mailto:hello@hlpfl.com" className="text-gold/80 hover:text-gold transition-colors">
            hello@hlpfl.com
          </a>
          {' '}— HLPFL will create it and link it to your account.
          You can toggle visibility and copy the embed code from here.
        </p>
      </div>

      {loading ? (
        <p className="text-white/30 text-sm">Loading...</p>
      ) : properties.length === 0 ? (
        <div className="border border-void-lighter bg-void-light p-10 text-center">
          <p className="text-white/30 text-sm">No properties linked to your account yet.</p>
          <a href="mailto:hello@hlpfl.com"
            className="inline-block mt-4 text-xs text-gold/60 hover:text-gold transition-colors">
            Contact HLPFL to get started →
          </a>
        </div>
      ) : (
        <div className="space-y-6">
          {properties.map(p => (
            <div key={p.id} className="border border-void-lighter bg-void-light">
              {/* Header */}
              <div className="p-5 flex flex-wrap items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 border ${
                      p.published
                        ? 'text-green-400 border-green-400/30 bg-green-400/10'
                        : 'text-white/30 border-white/10'
                    }`}>
                      {p.published ? 'Published' : 'Draft'}
                    </span>
                    <span className="text-white/30 text-xs">/stays/{p.slug}/</span>
                  </div>
                  <p className="font-display text-xl tracking-wider text-white">{p.name}</p>
                  <p className="text-white/40 text-sm">{p.location}</p>
                  <p className="text-white/60 text-sm mt-1">
                    {p.bedrooms}bd · {p.bathrooms}ba · {p.max_guests} guests ·{' '}
                    <span className="text-gold">{formatCents(p.base_rate_cents)}/night</span>
                  </p>
                </div>

                <div className="flex gap-3 flex-wrap">
                  <Link href={`/stays/${p.slug}/`}
                    className="text-xs text-gold/60 hover:text-gold border border-gold/20 px-3 py-1.5 transition-colors">
                    Preview →
                  </Link>
                  <button onClick={() => togglePublished(p.id, p.published)}
                    className="text-xs text-white/40 hover:text-white border border-void-lighter px-3 py-1.5 transition-colors">
                    {p.published ? 'Unpublish' : 'Publish'}
                  </button>
                </div>
              </div>

              {/* Amenities */}
              {(p.amenities as string[]).length > 0 && (
                <div className="px-5 pb-4 flex flex-wrap gap-1.5">
                  {(p.amenities as string[]).slice(0, 6).map(a => (
                    <span key={a} className="text-[10px] text-gold tracking-wider uppercase px-2 py-0.5 border border-gold/20 bg-gold/[0.04]">
                      {a}
                    </span>
                  ))}
                  {(p.amenities as string[]).length > 6 && (
                    <span className="text-[10px] text-white/30 px-2 py-0.5">+{(p.amenities as string[]).length - 6}</span>
                  )}
                </div>
              )}

              {/* Embed snippet */}
              <div className="border-t border-void-lighter px-5 py-4">
                <p className="text-xs text-white/40 uppercase tracking-wider mb-2">
                  Embed on Your Site
                  <span className="ml-2 text-white/20 normal-case tracking-normal">— paste before &lt;/body&gt;</span>
                </p>
                <div className="bg-void font-mono text-xs text-gold/70 px-4 py-3 overflow-x-auto border border-void-lighter flex items-center gap-3">
                  <code className="flex-1 whitespace-nowrap">{embedSnippet(p.slug)}</code>
                  <button
                    onClick={() => navigator.clipboard.writeText(embedSnippet(p.slug))}
                    className="shrink-0 text-[10px] text-white/30 hover:text-white border border-void-lighter px-2 py-1 transition-colors">
                    Copy
                  </button>
                </div>
                <p className="text-white/25 text-xs mt-2">
                  This embeds a booking widget that syncs availability in real-time with your calendar above.
                  No double bookings — all reservations share the same availability database.
                </p>
              </div>

              {/* API endpoint info */}
              <div className="border-t border-void-lighter px-5 py-4">
                <p className="text-xs text-white/40 uppercase tracking-wider mb-2">Direct Booking API</p>
                <div className="space-y-1 font-mono text-xs text-white/40">
                  <p><span className="text-green-400/70">GET</span>  /api/v1/{p.slug}/availability</p>
                  <p><span className="text-gold/70">POST</span> /api/v1/{p.slug}/book</p>
                </div>
                <p className="text-white/25 text-xs mt-2">
                  These endpoints are public and CORS-enabled — call them from any domain.
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
