'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import type { AvailabilityBlock, Property } from '@/lib/supabase'

type BlockWithProperty = AvailabilityBlock & {
  properties?: { name: string } | null
}

export default function AdminBlocksPage() {
  const [blocks, setBlocks] = useState<BlockWithProperty[]>([])
  const [properties, setProperties] = useState<Property[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState({
    property_id: '',
    start_date: '',
    end_date: '',
    reason: '',
  })

  useEffect(() => {
    Promise.all([loadBlocks(), loadProperties()])
  }, [])

  async function loadBlocks() {
    setLoading(true)
    const { data } = await supabase
      .from('availability_blocks')
      .select('*, properties(name)')
      .order('start_date', { ascending: true })
    setBlocks((data as BlockWithProperty[]) ?? [])
    setLoading(false)
  }

  async function loadProperties() {
    const { data } = await supabase.from('properties').select('id, name, slug, location').order('name')
    setProperties((data as Property[]) ?? [])
  }

  function setField(key: keyof typeof form, value: string) {
    setForm(f => ({ ...f, [key]: value }))
  }

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    if (!form.property_id) { setError('Select a property.'); return }
    if (form.end_date <= form.start_date) { setError('End date must be after start date.'); return }
    setSaving(true)
    const { error: err } = await supabase.from('availability_blocks').insert({
      property_id: form.property_id,
      start_date: form.start_date,
      end_date: form.end_date,
      reason: form.reason || null,
    })
    if (err) {
      setError(err.message)
    } else {
      setForm({ property_id: '', start_date: '', end_date: '', reason: '' })
      await loadBlocks()
    }
    setSaving(false)
  }

  async function deleteBlock(id: string) {
    if (!confirm('Delete this block?')) return
    await supabase.from('availability_blocks').delete().eq('id', id)
    await loadBlocks()
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-display text-3xl tracking-wider text-white">AVAILABILITY BLOCKS</h1>
        <p className="text-white/40 text-sm mt-1">Manually block dates for owner stays, maintenance, etc.</p>
      </div>

      {/* Create form */}
      <form onSubmit={handleCreate} className="border border-void-lighter bg-void-light p-8 mb-8">
        <p className="font-display text-xl tracking-wider text-white mb-5">BLOCK DATES</p>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          <label className="block">
            <span className="text-xs text-white/40 uppercase tracking-wider block mb-1.5">Property</span>
            <select
              value={form.property_id}
              onChange={e => setField('property_id', e.target.value)}
              required
              className="w-full bg-void border border-void-lighter focus:border-gold/50 outline-none px-4 py-2.5 text-sm text-white appearance-none"
            >
              <option value="">Select property</option>
              {properties.map(p => (
                <option key={p.id} value={p.id}>{p.name}</option>
              ))}
            </select>
          </label>
          <label className="block">
            <span className="text-xs text-white/40 uppercase tracking-wider block mb-1.5">Start date</span>
            <input
              type="date"
              value={form.start_date}
              onChange={e => setField('start_date', e.target.value)}
              required
              className="w-full bg-void border border-void-lighter focus:border-gold/50 outline-none px-4 py-2.5 text-sm text-white"
            />
          </label>
          <label className="block">
            <span className="text-xs text-white/40 uppercase tracking-wider block mb-1.5">End date</span>
            <input
              type="date"
              value={form.end_date}
              onChange={e => setField('end_date', e.target.value)}
              required
              className="w-full bg-void border border-void-lighter focus:border-gold/50 outline-none px-4 py-2.5 text-sm text-white"
            />
          </label>
          <label className="block">
            <span className="text-xs text-white/40 uppercase tracking-wider block mb-1.5">Reason (optional)</span>
            <input
              type="text"
              value={form.reason}
              onChange={e => setField('reason', e.target.value)}
              placeholder="Owner stay, maintenance…"
              className="w-full bg-void border border-void-lighter focus:border-gold/50 outline-none px-4 py-2.5 text-sm text-white placeholder:text-white/20"
            />
          </label>
        </div>
        {error && <p className="text-red-400 text-xs mb-4">{error}</p>}
        <button
          type="submit"
          disabled={saving}
          className="bg-gold hover:bg-gold-light disabled:opacity-50 text-white font-semibold px-8 py-3 text-sm tracking-wide transition-colors"
        >
          {saving ? 'Saving...' : 'Block Dates'}
        </button>
      </form>

      {/* Blocks list */}
      {loading ? (
        <p className="text-white/30 text-sm">Loading...</p>
      ) : blocks.length === 0 ? (
        <div className="border border-void-lighter bg-void-light p-10 text-center">
          <p className="text-white/30 text-sm">No blocks yet.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {blocks.map(block => (
            <div key={block.id} className="border border-void-lighter bg-void-light px-5 py-4 flex items-center justify-between gap-4">
              <div>
                <p className="text-white font-medium">
                  {block.start_date} → {block.end_date}
                </p>
                <p className="text-white/40 text-xs mt-0.5">
                  {block.properties?.name ?? 'Unknown property'}
                  {block.reason ? ` · ${block.reason}` : ''}
                </p>
              </div>
              <button
                onClick={() => deleteBlock(block.id)}
                className="text-xs text-red-400/60 hover:text-red-400 border border-red-400/20 hover:border-red-400/40 px-3 py-1.5 transition-colors"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
