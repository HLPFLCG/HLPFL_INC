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

// ─── Login form ───────────────────────────────────────────────────────────────

function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
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
            <button type="submit" disabled={loading}
              className="w-full bg-gold hover:bg-gold-light disabled:opacity-50 text-white font-semibold py-3 text-sm tracking-wide transition-colors">
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
            <button type="button" onClick={() => setMode('reset')}
              className="text-xs text-white/40 hover:text-white transition-colors w-full text-center">
              Forgot password?
            </button>
          </form>
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
