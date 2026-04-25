'use client'

import { useState } from 'react'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import { useDashboard } from '../DashboardLayoutClient'

export default function DashboardSettingsPage() {
  const { client, refreshClient } = useDashboard()
  const [form, setForm] = useState({
    name: client?.name ?? '',
    business_name: client?.business_name ?? '',
    whatsapp_number: client?.whatsapp_number ?? '',
  })
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [pwForm, setPwForm] = useState({ current: '', next: '', confirm: '' })
  const [pwError, setPwError] = useState('')
  const [pwSaved, setPwSaved] = useState(false)
  const [pwSaving, setPwSaving] = useState(false)
  const [apiKeyCopied, setApiKeyCopied] = useState(false)

  async function saveProfile(e: React.FormEvent) {
    e.preventDefault()
    if (!client) return
    setSaving(true)
    await supabase.from('clients').update({
      name: form.name,
      business_name: form.business_name || null,
      whatsapp_number: form.whatsapp_number || null,
    }).eq('id', client.id)
    await refreshClient()
    setSaving(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  async function changePassword(e: React.FormEvent) {
    e.preventDefault()
    setPwError('')
    if (pwForm.next !== pwForm.confirm) { setPwError('Passwords do not match.'); return }
    if (pwForm.next.length < 8) { setPwError('Password must be at least 8 characters.'); return }
    setPwSaving(true)
    const { error } = await supabase.auth.updateUser({ password: pwForm.next })
    if (error) setPwError(error.message)
    else { setPwSaved(true); setPwForm({ current: '', next: '', confirm: '' }); setTimeout(() => setPwSaved(false), 3000) }
    setPwSaving(false)
  }

  async function copyApiKey() {
    if (!client) return
    await navigator.clipboard.writeText(client.api_key)
    setApiKeyCopied(true)
    setTimeout(() => setApiKeyCopied(false), 2000)
  }

  const stripeConnected = client?.stripe_onboarded && client?.stripe_account_id

  return (
    <div className="max-w-2xl space-y-10">
      <div>
        <p className="text-gold uppercase tracking-[0.25em] text-xs mb-1">Settings</p>
        <h1 className="font-display text-3xl tracking-wider text-white">ACCOUNT</h1>
      </div>

      {/* Profile */}
      <form onSubmit={saveProfile} className="border border-void-lighter bg-void-light p-6 space-y-5">
        <p className="font-display text-xl tracking-wider text-white mb-2">PROFILE</p>
        {[
          { key: 'name', label: 'Your Name', placeholder: 'Jane Smith' },
          { key: 'business_name', label: 'Business Name (shown in dashboard)', placeholder: 'Caribe Azul Properties' },
          { key: 'whatsapp_number', label: 'WhatsApp Number (for guest comms)', placeholder: '+1 (506) 000-0000' },
        ].map(({ key, label, placeholder }) => (
          <label key={key} className="block">
            <span className="text-xs text-white/40 uppercase tracking-wider block mb-1.5">{label}</span>
            <input type="text"
              value={(form as Record<string, string>)[key]}
              onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
              placeholder={placeholder}
              className="w-full bg-void border border-void-lighter focus:border-gold/50 outline-none px-4 py-3 text-sm text-white placeholder:text-white/20 transition-colors" />
          </label>
        ))}
        <div className="flex items-center gap-4">
          <button type="submit" disabled={saving}
            className="bg-gold hover:bg-gold-light disabled:opacity-50 text-white font-semibold px-6 py-2.5 text-sm tracking-wide transition-colors">
            {saving ? 'Saving...' : 'Save Profile'}
          </button>
          {saved && <span className="text-green-400 text-xs">Saved ✓</span>}
        </div>
      </form>

      {/* API Key */}
      <div className="border border-void-lighter bg-void-light p-6">
        <p className="font-display text-xl tracking-wider text-white mb-2">API KEY</p>
        <p className="text-white/50 text-sm mb-4">
          Used by the booking embed widget on your site. Keep this private — don&apos;t share it publicly.
        </p>
        <div className="bg-void border border-void-lighter px-4 py-3 font-mono text-xs text-gold/70 flex items-center gap-3">
          <code className="flex-1 break-all">{client?.api_key ?? '—'}</code>
          <button onClick={copyApiKey}
            className="shrink-0 text-[10px] text-white/30 hover:text-white border border-void-lighter px-2 py-1 transition-colors">
            {apiKeyCopied ? 'Copied!' : 'Copy'}
          </button>
        </div>
      </div>

      {/* Stripe Connect */}
      <div className="border border-void-lighter bg-void-light p-6">
        <p className="font-display text-xl tracking-wider text-white mb-2">STRIPE</p>
        {stripeConnected ? (
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="w-2 h-2 rounded-full bg-green-400" />
                <span className="text-green-400 text-sm font-medium">Connected</span>
              </div>
              <p className="text-white/40 text-xs font-mono">{client.stripe_account_id}</p>
            </div>
            <a href={`https://dashboard.stripe.com/${client.stripe_account_id}`}
              target="_blank" rel="noopener noreferrer"
              className="text-xs text-[#a0a8f8] hover:text-white border border-[#6772e5]/40 px-4 py-2 transition-colors">
              Open Stripe Dashboard →
            </a>
          </div>
        ) : (
          <div>
            <p className="text-white/50 text-sm mb-4">
              Connect your Stripe account to receive payments directly to your bank account.
              Guests pay via Stripe — you get the funds, minus Stripe&apos;s ~3% processing fee.
            </p>
            <Link href="/api/v1/stripe/connect"
              className="inline-flex items-center gap-2 bg-[#6772e5] hover:bg-[#7c85ed] text-white text-sm font-semibold px-6 py-3 transition-colors">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M13.976 9.15c-2.172-.806-3.356-1.426-3.356-2.409 0-.831.683-1.305 1.901-1.305 2.227 0 4.515.858 6.09 1.631l.89-5.494C18.252.975 15.697 0 12.165 0 9.667 0 7.589.654 6.104 1.872 4.56 3.147 3.757 4.992 3.757 7.218c0 4.039 2.467 5.76 6.476 7.219 2.585.92 3.445 1.574 3.445 2.583 0 .98-.84 1.545-2.354 1.545-1.875 0-4.965-.921-6.99-2.109l-.9 5.555C5.175 22.99 8.385 24 11.714 24c2.641 0 4.843-.624 6.328-1.813 1.664-1.305 2.525-3.236 2.525-5.732 0-4.128-2.524-5.851-6.591-7.305z"/>
              </svg>
              Connect with Stripe
            </Link>
          </div>
        )}
      </div>

      {/* Change password */}
      <form onSubmit={changePassword} className="border border-void-lighter bg-void-light p-6 space-y-4">
        <p className="font-display text-xl tracking-wider text-white mb-2">CHANGE PASSWORD</p>
        {[
          { key: 'next', label: 'New Password', placeholder: 'At least 8 characters' },
          { key: 'confirm', label: 'Confirm New Password', placeholder: 'Repeat password' },
        ].map(({ key, label, placeholder }) => (
          <label key={key} className="block">
            <span className="text-xs text-white/40 uppercase tracking-wider block mb-1.5">{label}</span>
            <input type="password"
              value={(pwForm as Record<string, string>)[key]}
              onChange={e => setPwForm(f => ({ ...f, [key]: e.target.value }))}
              placeholder={placeholder}
              required
              className="w-full bg-void border border-void-lighter focus:border-gold/50 outline-none px-4 py-3 text-sm text-white placeholder:text-white/20 transition-colors" />
          </label>
        ))}
        {pwError && <p className="text-red-400 text-xs">{pwError}</p>}
        {pwSaved && <p className="text-green-400 text-xs">Password updated ✓</p>}
        <button type="submit" disabled={pwSaving}
          className="bg-void-lighter hover:bg-void-light border border-void-lighter text-white font-semibold px-6 py-2.5 text-sm tracking-wide transition-colors">
          {pwSaving ? 'Updating...' : 'Update Password'}
        </button>
      </form>
    </div>
  )
}
