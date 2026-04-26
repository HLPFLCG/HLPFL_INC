'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createSupabaseBrowserClient } from '@/lib/portal/supabase-client'

export default function PortalLoginPage() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const supabase = createSupabaseBrowserClient()

  async function handleMagicLink(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)

    const redirectTo =
      typeof window !== 'undefined'
        ? `${window.location.origin}/portal`
        : 'https://portal.hlpfl.org/portal'

    const { error: err } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: redirectTo,
        shouldCreateUser: true,
      },
    })

    if (err) {
      setError(err.message)
    } else {
      setSent(true)
    }
    setLoading(false)
  }

  // If already logged in the layout will redirect — no extra check needed.

  return (
    <div className="min-h-screen bg-void flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <Link
          href="/"
          className="font-display text-3xl tracking-wider text-white block mb-1"
        >
          HLPFL<span className="text-gold">.</span>
        </Link>
        <p className="text-white/40 text-xs uppercase tracking-wider mb-10">
          Customer Portal
        </p>

        {sent ? (
          <div className="border border-gold/25 bg-gold/[0.06] px-5 py-6 text-center">
            <p className="text-gold font-semibold mb-2">Check your email</p>
            <p className="text-white/60 text-sm leading-relaxed">
              We sent a magic link to <span className="text-white">{email}</span>.
              Click it to sign in — no password needed.
            </p>
            <button
              type="button"
              onClick={() => { setSent(false); setEmail('') }}
              className="mt-4 text-xs text-white/30 hover:text-white transition-colors"
            >
              Use a different email
            </button>
          </div>
        ) : (
          <form onSubmit={handleMagicLink} className="space-y-4">
            <label className="block">
              <span className="text-xs text-white/40 uppercase tracking-wider block mb-1.5">
                Email
              </span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="you@example.com"
                className="w-full bg-void-light border border-void-lighter focus:border-gold/50 outline-none px-4 py-3 text-sm text-white"
                style={{ fontSize: '16px' }}
              />
            </label>

            {error && <p className="text-red-400 text-xs">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gold hover:bg-gold-light disabled:opacity-50 text-white font-semibold py-3 text-sm tracking-wide transition-colors"
            >
              {loading ? 'Sending…' : 'Send Magic Link'}
            </button>
          </form>
        )}

        <p className="mt-8 text-white/20 text-xs text-center">
          New customer?{' '}
          <Link
            href="/contact/"
            className="text-gold/60 hover:text-gold transition-colors"
          >
            Contact HLPFL
          </Link>
        </p>
      </div>
    </div>
  )
}
