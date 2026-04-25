'use client'

import { useState, useEffect, createContext, useContext } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { supabase, type Client } from '@/lib/supabase'
import type { User } from '@supabase/supabase-js'

// ─── Context ──────────────────────────────────────────────────────────────────

interface DashboardCtx {
  user: User | null
  client: Client | null
  refreshClient: () => Promise<void>
}

export const DashboardContext = createContext<DashboardCtx>({
  user: null, client: null, refreshClient: async () => {},
})

export function useDashboard() {
  return useContext(DashboardContext)
}

// ─── Nav ──────────────────────────────────────────────────────────────────────

const NAV = [
  { href: '/dashboard', label: 'Overview', exact: true },
  { href: '/dashboard/bookings', label: 'Bookings' },
  { href: '/dashboard/calendar', label: 'Calendar' },
  { href: '/dashboard/earnings', label: 'Earnings' },
  { href: '/dashboard/properties', label: 'Properties' },
  { href: '/dashboard/settings', label: 'Settings' },
]

// ─── OAuth provider icons ──────────────────────────────────────────────────────

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
      <path fill="#4285F4" d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844a4.14 4.14 0 0 1-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615Z"/>
      <path fill="#34A853" d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18Z"/>
      <path fill="#FBBC05" d="M3.964 10.706A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.706V4.962H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.038l3.007-2.332Z"/>
      <path fill="#EA4335" d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.962L3.964 7.294C4.672 5.163 6.656 3.58 9 3.58Z"/>
    </svg>
  )
}

function FacebookIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true" fill="#1877F2">
      <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.97h-1.513c-1.491 0-1.956.93-1.956 1.883v2.25h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073Z"/>
    </svg>
  )
}

// ─── Login form ───────────────────────────────────────────────────────────────

function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [oauthLoading, setOauthLoading] = useState<'google' | 'facebook' | null>(null)
  const [mode, setMode] = useState<'login' | 'reset'>('login')
  const [resetSent, setResetSent] = useState(false)

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setError(''); setLoading(true)
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) setError(error.message)
    setLoading(false)
  }

  async function handleReset(e: React.FormEvent) {
    e.preventDefault()
    setError(''); setLoading(true)
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/dashboard/settings`,
    })
    if (error) setError(error.message)
    else setResetSent(true)
    setLoading(false)
  }

  async function handleOAuth(provider: 'google' | 'facebook') {
    setError('')
    setOauthLoading(provider)
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: { redirectTo: `${window.location.origin}/dashboard` },
    })
    if (error) {
      setError(error.message)
      setOauthLoading(null)
    }
    // On success the browser redirects — no need to clear loading state
  }

  return (
    <div className="min-h-screen bg-void flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <Link href="/" className="font-display text-3xl tracking-wider text-white block mb-1">
          HLPFL<span className="text-gold">.</span>
        </Link>
        <p className="text-white/40 text-xs uppercase tracking-wider mb-10">Client Dashboard</p>

        {mode === 'reset' ? (
          <form onSubmit={handleReset} className="space-y-4">
            <p className="text-white/60 text-sm mb-4">
              Enter your email and we&apos;ll send a password reset link.
            </p>
            {resetSent ? (
              <div className="border border-gold/25 bg-gold/[0.06] px-4 py-3 text-sm text-gold">
                Check your email for a reset link.
              </div>
            ) : (
              <>
                <label className="block">
                  <span className="text-xs text-white/40 uppercase tracking-wider block mb-1.5">Email</span>
                  <input type="email" value={email} onChange={e => setEmail(e.target.value)} required
                    className="w-full bg-void-light border border-void-lighter focus:border-gold/50 outline-none px-4 py-3 text-sm text-white" />
                </label>
                {error && <p className="text-red-400 text-xs">{error}</p>}
                <button type="submit" disabled={loading}
                  className="w-full bg-gold hover:bg-gold-light disabled:opacity-50 text-white font-semibold py-3 text-sm tracking-wide transition-colors">
                  {loading ? 'Sending...' : 'Send Reset Link'}
                </button>
              </>
            )}
            <button type="button" onClick={() => setMode('login')}
              className="text-xs text-white/40 hover:text-white transition-colors">
              ← Back to sign in
            </button>
          </form>
        ) : (
          <>
            {/* Social login */}
            <div className="space-y-3 mb-6">
              <button
                type="button"
                onClick={() => handleOAuth('google')}
                disabled={oauthLoading !== null}
                className="w-full flex items-center justify-center gap-3 bg-white hover:bg-white/90 disabled:opacity-50 text-gray-800 font-semibold py-3 text-sm tracking-wide transition-colors"
              >
                <GoogleIcon />
                {oauthLoading === 'google' ? 'Redirecting…' : 'Continue with Google'}
              </button>
              <button
                type="button"
                onClick={() => handleOAuth('facebook')}
                disabled={oauthLoading !== null}
                className="w-full flex items-center justify-center gap-3 bg-[#1877F2] hover:bg-[#166FE5] disabled:opacity-50 text-white font-semibold py-3 text-sm tracking-wide transition-colors"
              >
                <FacebookIcon />
                {oauthLoading === 'facebook' ? 'Redirecting…' : 'Continue with Facebook'}
              </button>
            </div>

            {/* Divider */}
            <div className="flex items-center gap-3 mb-6">
              <div className="flex-1 h-px bg-void-lighter" />
              <span className="text-white/20 text-xs uppercase tracking-wider">or</span>
              <div className="flex-1 h-px bg-void-lighter" />
            </div>

            {/* Email / password */}
            <form onSubmit={handleLogin} className="space-y-4">
              <label className="block">
                <span className="text-xs text-white/40 uppercase tracking-wider block mb-1.5">Email</span>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} required
                  className="w-full bg-void-light border border-void-lighter focus:border-gold/50 outline-none px-4 py-3 text-sm text-white"
                  placeholder="you@example.com" />
              </label>
              <label className="block">
                <span className="text-xs text-white/40 uppercase tracking-wider block mb-1.5">Password</span>
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} required
                  className="w-full bg-void-light border border-void-lighter focus:border-gold/50 outline-none px-4 py-3 text-sm text-white" />
              </label>
              {error && <p className="text-red-400 text-xs">{error}</p>}
              <button type="submit" disabled={loading || oauthLoading !== null}
                className="w-full bg-gold hover:bg-gold-light disabled:opacity-50 text-white font-semibold py-3 text-sm tracking-wide transition-colors">
                {loading ? 'Signing in...' : 'Sign In with Email'}
              </button>
              <button type="button" onClick={() => setMode('reset')}
                className="text-xs text-white/40 hover:text-white transition-colors w-full text-center">
                Forgot password?
              </button>
            </form>
          </>
        )}

        <p className="mt-8 text-white/20 text-xs text-center">
          Don&apos;t have an account?{' '}
          <Link href="/contact/" className="text-gold/60 hover:text-gold transition-colors">
            Contact HLPFL
          </Link>
        </p>
      </div>
    </div>
  )
}

// ─── Layout ───────────────────────────────────────────────────────────────────

export default function DashboardLayoutClient({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [client, setClient] = useState<Client | null>(null)
  const [loading, setLoading] = useState(true)
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()

  async function loadClient(userId: string) {
    const { data } = await supabase.from('clients').select('*').eq('user_id', userId).single()
    setClient(data ?? null)
  }

  async function refreshClient() {
    if (user) await loadClient(user.id)
  }

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      const u = data.session?.user ?? null
      setUser(u)
      if (u) loadClient(u.id).finally(() => setLoading(false))
      else setLoading(false)
    })
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, session) => {
      const u = session?.user ?? null
      setUser(u)
      if (u) loadClient(u.id)
      else setClient(null)
    })
    return () => subscription.unsubscribe()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  async function signOut() {
    await supabase.auth.signOut()
    router.push('/')
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-void flex items-center justify-center">
        <span className="text-gold/40 text-sm tracking-wider uppercase">Loading...</span>
      </div>
    )
  }

  if (!user) return <LoginForm />

  const isActive = (href: string, exact = false) =>
    exact ? pathname === href : pathname.startsWith(href)

  return (
    <DashboardContext.Provider value={{ user, client, refreshClient }}>
      <div className="min-h-screen bg-void flex flex-col">

        {/* Top bar */}
        <header className="bg-void-dark border-b border-gold/10 px-5 py-3 flex items-center justify-between gap-4 sticky top-0 z-40">
          <div className="flex items-center gap-5">
            <Link href="/" className="font-display text-xl tracking-wider text-white shrink-0">
              HLPFL<span className="text-gold">.</span>
            </Link>
            <span className="hidden md:block text-white/15 select-none">/</span>
            <span className="hidden md:block text-xs text-gold uppercase tracking-[0.2em]">
              {client?.business_name ?? 'Dashboard'}
            </span>
          </div>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {NAV.map(link => (
              <Link key={link.href} href={link.href}
                className={`px-3 py-1.5 text-xs font-medium tracking-wide transition-colors rounded ${
                  isActive(link.href, link.exact)
                    ? 'text-gold bg-gold/10'
                    : 'text-white/50 hover:text-white hover:bg-white/5'
                }`}>
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            {/* Plan badge */}
            <span className={`hidden md:block text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 border ${
              client?.plan === 'pro'
                ? 'text-gold border-gold/30 bg-gold/10'
                : 'text-white/30 border-white/10'
            }`}>
              {client?.plan ?? 'free'}
            </span>
            <span className="hidden md:block text-white/30 text-xs truncate max-w-[160px]">{user.email}</span>
            <button onClick={signOut}
              className="text-xs text-white/30 hover:text-white transition-colors">
              Sign out
            </button>
            {/* Mobile toggle */}
            <button onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden text-white/50 hover:text-white p-1"
              aria-label="Toggle menu">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                {mobileOpen
                  ? <><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></>
                  : <><line x1="4" y1="6" x2="20" y2="6"/><line x1="4" y1="12" x2="20" y2="12"/><line x1="4" y1="18" x2="20" y2="18"/></>
                }
              </svg>
            </button>
          </div>
        </header>

        {/* Mobile nav */}
        {mobileOpen && (
          <div className="lg:hidden bg-void-dark border-b border-gold/10 px-5 py-3 flex flex-wrap gap-2">
            {NAV.map(link => (
              <Link key={link.href} href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`px-3 py-1.5 text-xs font-medium transition-colors ${
                  isActive(link.href, link.exact) ? 'text-gold' : 'text-white/50'
                }`}>
                {link.label}
              </Link>
            ))}
          </div>
        )}

        {/* No client record warning */}
        {!client && (
          <div className="bg-gold/10 border-b border-gold/20 px-5 py-3 text-sm text-gold/80 flex items-center gap-2">
            <span className="text-gold">◆</span>
            Your account is pending setup. Contact{' '}
            <a href="mailto:hello@hlpfl.com" className="underline">hello@hlpfl.com</a>
            {' '}to get activated.
          </div>
        )}

        <main className="flex-1 p-5 md:p-8">
          {children}
        </main>
      </div>
    </DashboardContext.Provider>
  )
}
