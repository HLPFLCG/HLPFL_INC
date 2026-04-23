'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import type { Property } from '@/lib/supabase'

export default function AdminPropertiesPage() {
  const [properties, setProperties] = useState<Property[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [saving, setSaving] = useState(false)
  const [formError, setFormError] = useState('')

  const [form, setForm] = useState({
    slug: '',
    name: '',
    description: '',
    location: '',
    bedrooms: 1,
    bathrooms: 1,
    max_guests: 2,
    base_rate_cents: 0,
    cleaning_fee_cents: 0,
    amenities: '',
    published: false,
  })

  useEffect(() => { loadProperties() }, [])

  async function loadProperties() {
    setLoading(true)
    const { data } = await supabase.from('properties').select('*').order('created_at', { ascending: false })
    setProperties(data ?? [])
    setLoading(false)
  }

  function setField<K extends keyof typeof form>(key: K, value: typeof form[K]) {
    setForm(f => ({ ...f, [key]: value }))
  }

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault()
    setFormError('')
    setSaving(true)
    const amenitiesArr = form.amenities.split('\n').map(s => s.trim()).filter(Boolean)
    const { error } = await supabase.from('properties').insert({
      slug: form.slug,
      name: form.name,
      description: form.description,
      location: form.location,
      bedrooms: form.bedrooms,
      bathrooms: form.bathrooms,
      max_guests: form.max_guests,
      base_rate_cents: Math.round(form.base_rate_cents * 100),
      cleaning_fee_cents: Math.round(form.cleaning_fee_cents * 100),
      amenities: amenitiesArr,
      photos: [],
      published: form.published,
    })
    if (error) {
      setFormError(error.message)
    } else {
      setShowForm(false)
      await loadProperties()
    }
    setSaving(false)
  }

  async function togglePublished(id: string, current: boolean) {
    await supabase.from('properties').update({ published: !current }).eq('id', id)
    await loadProperties()
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-3xl tracking-wider text-white">PROPERTIES</h1>
          <p className="text-white/40 text-sm mt-1">{properties.length} total</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-gold hover:bg-gold-light text-white font-semibold px-6 py-3 text-sm tracking-wide transition-colors"
        >
          {showForm ? 'Cancel' : '+ Add Property'}
        </button>
      </div>

      {/* Create form */}
      {showForm && (
        <form onSubmit={handleCreate} className="border border-gold/25 bg-void-light p-8 mb-8 space-y-5">
          <p className="font-display text-xl tracking-wider text-white mb-2">NEW PROPERTY</p>
          <div className="grid md:grid-cols-2 gap-5">
            {[
              { key: 'name', label: 'Name', type: 'text', placeholder: 'Villa Caribe Azul' },
              { key: 'slug', label: 'Slug (URL)', type: 'text', placeholder: 'villa-caribe-azul' },
              { key: 'location', label: 'Location', type: 'text', placeholder: 'Puerto Viejo, Costa Rica' },
            ].map(({ key, label, type, placeholder }) => (
              <label key={key} className="block">
                <span className="text-xs text-white/40 uppercase tracking-wider block mb-1.5">{label}</span>
                <input
                  type={type}
                  value={(form as Record<string, string | number | boolean>)[key] as string}
                  onChange={e => setField(key as keyof typeof form, e.target.value as never)}
                  placeholder={placeholder}
                  required
                  className="w-full bg-void border border-void-lighter focus:border-gold/50 outline-none px-4 py-2.5 text-sm text-white"
                />
              </label>
            ))}
            {(
              [
                { key: 'bedrooms' as const, label: 'Bedrooms' },
                { key: 'bathrooms' as const, label: 'Bathrooms' },
                { key: 'max_guests' as const, label: 'Max Guests' },
                { key: 'base_rate_cents' as const, label: 'Nightly Rate (USD)', placeholder: '185' },
                { key: 'cleaning_fee_cents' as const, label: 'Cleaning Fee (USD)', placeholder: '120' },
              ] as { key: 'bedrooms' | 'bathrooms' | 'max_guests' | 'base_rate_cents' | 'cleaning_fee_cents'; label: string; placeholder?: string }[]
            ).map(({ key, label, placeholder }) => (
              <label key={key} className="block">
                <span className="text-xs text-white/40 uppercase tracking-wider block mb-1.5">{label}</span>
                <input
                  type="number"
                  value={form[key]}
                  onChange={e => setField(key, parseFloat(e.target.value) as never)}
                  placeholder={placeholder}
                  required
                  min={0}
                  className="w-full bg-void border border-void-lighter focus:border-gold/50 outline-none px-4 py-2.5 text-sm text-white"
                />
              </label>
            ))}
          </div>

          <label className="block">
            <span className="text-xs text-white/40 uppercase tracking-wider block mb-1.5">Description</span>
            <textarea
              value={form.description}
              onChange={e => setField('description', e.target.value)}
              rows={4}
              required
              className="w-full bg-void border border-void-lighter focus:border-gold/50 outline-none px-4 py-2.5 text-sm text-white"
            />
          </label>

          <label className="block">
            <span className="text-xs text-white/40 uppercase tracking-wider block mb-1.5">
              Amenities (one per line)
            </span>
            <textarea
              value={form.amenities}
              onChange={e => setField('amenities', e.target.value)}
              rows={5}
              placeholder="Oceanfront&#10;Free WiFi&#10;Air conditioning"
              className="w-full bg-void border border-void-lighter focus:border-gold/50 outline-none px-4 py-2.5 text-sm text-white"
            />
          </label>

          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={form.published}
              onChange={e => setField('published', e.target.checked)}
              className="w-4 h-4 accent-gold"
            />
            <span className="text-sm text-white/70">Published (visible on /stays/)</span>
          </label>

          {formError && <p className="text-red-400 text-xs">{formError}</p>}

          <button
            type="submit"
            disabled={saving}
            className="bg-gold hover:bg-gold-light disabled:opacity-50 text-white font-semibold px-8 py-3 text-sm tracking-wide transition-colors"
          >
            {saving ? 'Saving...' : 'Create Property'}
          </button>
        </form>
      )}

      {/* Properties list */}
      {loading ? (
        <p className="text-white/30 text-sm">Loading...</p>
      ) : properties.length === 0 ? (
        <div className="border border-void-lighter bg-void-light p-10 text-center">
          <p className="text-white/30 text-sm">No properties yet. Add your first one above.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {properties.map(property => (
            <div key={property.id} className="border border-void-lighter bg-void-light p-5 flex flex-wrap items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 border ${
                    property.published
                      ? 'text-green-400 border-green-400/30 bg-green-400/10'
                      : 'text-white/30 border-white/10 bg-white/5'
                  }`}>
                    {property.published ? 'Published' : 'Draft'}
                  </span>
                  <span className="text-white/30 text-xs font-mono">/stays/{property.slug}/</span>
                </div>
                <p className="font-display text-xl tracking-wider text-white">{property.name}</p>
                <p className="text-white/40 text-sm">{property.location}</p>
                <p className="text-white/60 text-sm mt-1">
                  {property.bedrooms}bd · {property.bathrooms}ba · {property.max_guests} guests ·{' '}
                  <span className="text-gold">${(property.base_rate_cents / 100).toFixed(0)}/night</span>
                </p>
              </div>
              <div className="flex gap-3">
                <Link
                  href={`/stays/${property.slug}/`}
                  className="text-xs text-gold/60 hover:text-gold border border-gold/20 px-3 py-1.5 transition-colors"
                >
                  View
                </Link>
                <button
                  onClick={() => togglePublished(property.id, property.published)}
                  className="text-xs text-white/40 hover:text-white border border-void-lighter px-3 py-1.5 transition-colors"
                >
                  {property.published ? 'Unpublish' : 'Publish'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
