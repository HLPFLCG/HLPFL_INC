'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import type { User } from '@supabase/supabase-js'

const NAV = [
  { href: '/admin/bookings', label: 'Bookings' },
  { href: '/admin/properties', label: 'Properties' },
  { href: '/admin/blocks', label: 'Availability Blocks' },
  { href: '/admin/projects', label: 'Projects' },
  { href: '/admin/customers', label: 'Customers' },
  { href: '/admin/reservations', label: 'Reservations' },
]

export default function AdminLayoutClient({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [authError, setAuthError] = useState('')
  const [loading, setLoading] = useState(true)
  const [loggingIn, setLoggingIn] = useState(false)
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setUser(data.session?.user ?? null)
      setLoading(false)
    })
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_evt, session) => {
      setUser(session?.user ?? null)
    })
    return () => subscription.unsubscribe()
  }, [])

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setAuthError('')
    setLoggingIn(true)
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) setAuthError(error.message)
    setLoggingIn(false)
  }

  async function handleLogout() {
    await supabase.auth.signOut()
    router.push('/admin/')
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-void flex items-center justify-center">
        <span className="text-gold/40 text-sm tracking-wider">Loading...</span>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-void flex items-center justify-center px-4">
        <div className="w-full max-w-sm">
          <Link href="/" className="font-display text-3xl tracking-wider text-white block mb-2">
            HLPFL<span className="text-gold">.</span>
          </Link>
          <p className="text-white/40 text-xs uppercase tracking-wider mb-10">Admin</p>

          <form onSubmit={handleLogin} className="space-y-4">
            <label className="block">
              <span className="text-xs text-white/40 uppercase tracking-wider block mb-1.5">Email</span>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                className="w-full bg-void-light border border-void-lighter focus:border-gold/50 outline-none px-4 py-3 text-sm text-white transition-colors"
                placeholder="admin@hlpfl.com"
              />
            </label>
            <label className="block">
              <span className="text-xs text-white/40 uppercase tracking-wider block mb-1.5">Password</span>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                className="w-full bg-void-light border border-void-lighter focus:border-gold/50 outline-none px-4 py-3 text-sm text-white transition-colors"
              />
            </label>
            {authError && (
              <p className="text-red-400 text-xs">{authError}</p>
            )}
            <button
              type="submit"
              disabled={loggingIn}
              className="w-full bg-gold hover:bg-gold-light disabled:opacity-50 text-white font-semibold py-3 text-sm tracking-wide transition-colors"
            >
              {loggingIn ? 'Signing in...' : 'Sign In'}
            </button>
          </form>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-void flex flex-col">
      {/* Admin header */}
      <header className="bg-void-dark border-b border-gold/10 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/" className="font-display text-xl tracking-wider text-white">
            HLPFL<span className="text-gold">.</span>
          </Link>
          <span className="text-white/20">/</span>
          <span className="text-xs text-gold uppercase tracking-wider">Admin</span>
        </div>

        <nav className="hidden md:flex items-center gap-6">
          {NAV.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-colors tracking-wide ${
                pathname.startsWith(link.href)
                  ? 'text-gold'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <span className="text-white/30 text-xs hidden md:block">{user.email}</span>
          <button
            onClick={handleLogout}
            className="text-xs text-white/40 hover:text-white transition-colors"
          >
            Sign out
          </button>
        </div>
      </header>

      {/* Mobile nav */}
      <div className="md:hidden bg-void-dark border-b border-gold/10 px-6 py-3 flex gap-5 overflow-x-auto">
        {NAV.map(link => (
          <Link
            key={link.href}
            href={link.href}
            className={`text-sm whitespace-nowrap transition-colors ${
              pathname.startsWith(link.href) ? 'text-gold' : 'text-white/50'
            }`}
          >
            {link.label}
          </Link>
        ))}
      </div>

      <main className="flex-1 p-6 md:p-10">
        {children}
      </main>
    </div>
  )
}
