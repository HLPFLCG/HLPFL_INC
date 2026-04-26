'use client'

import {
  useState,
  useEffect,
  createContext,
  useContext,
  useCallback,
} from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { createSupabaseBrowserClient } from '@/lib/portal/supabase-client'
import { translations, type Lang } from '@/lib/translations'
import { LanguageContext } from '@/contexts/LanguageContext'
import type { User } from '@supabase/supabase-js'

// ─── Portal context ────────────────────────────────────────────────────────────

interface PortalCtx {
  user: User | null
  signOut: () => Promise<void>
}

export const PortalContext = createContext<PortalCtx>({
  user: null,
  signOut: async () => {},
})

export function usePortal() {
  return useContext(PortalContext)
}

// ─── Navigation ───────────────────────────────────────────────────────────────

const NAV = [
  { href: '/portal', label: 'Dashboard', exact: true },
  { href: '/portal/projects', label: 'Projects' },
  { href: '/portal/messages', label: 'Messages' },
  { href: '/portal/bookings', label: 'Bookings' },
  { href: '/portal/purchases', label: 'Purchases' },
  { href: '/portal/apps', label: 'Apps' },
  { href: '/portal/settings', label: 'Settings' },
]

// ─── Portal layout client ─────────────────────────────────────────────────────

interface Props {
  children: React.ReactNode
  initialLang: Lang
}

export default function PortalLayoutClient({ children, initialLang }: Props) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [lang, setLangState] = useState<Lang>(() => {
    // Prefer stored preference; fall back to server-detected language
    if (typeof localStorage !== 'undefined') {
      const stored = localStorage.getItem('hlpfl-lang')
      if (stored === 'en' || stored === 'es') return stored as Lang
    }
    return initialLang
  })
  const pathname = usePathname()
  const router = useRouter()
  const supabase = createSupabaseBrowserClient()

  useEffect(() => {
    document.documentElement.lang = lang
  }, [lang])

  // Auth listener
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      const u = data.session?.user ?? null
      setUser(u)
      setLoading(false)
      if (!u && !pathname.startsWith('/portal/login')) {
        router.replace('/portal/login')
      }
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_e, session) => {
      const u = session?.user ?? null
      setUser(u)
      if (!u && !pathname.startsWith('/portal/login')) {
        router.replace('/portal/login')
      }
    })

    return () => subscription.unsubscribe()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const setLang = useCallback((newLang: Lang) => {
    setLangState(newLang)
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('hlpfl-lang', newLang)
    }
    document.documentElement.lang = newLang
  }, [])

  const t = useCallback(
    <S extends keyof typeof translations>(section: S) => {
      return translations[section][lang] as (typeof translations)[S]['en']
    },
    [lang]
  )

  const signOut = async () => {
    await supabase.auth.signOut()
    router.push('/')
  }

  // While checking session, render a minimal loading screen
  if (loading) {
    return (
      <div className="min-h-screen bg-void flex items-center justify-center">
        <span className="text-gold/40 text-sm tracking-wider uppercase">
          Loading…
        </span>
      </div>
    )
  }

  const isActive = (href: string, exact = false) =>
    exact ? pathname === href : pathname.startsWith(href)

  const isLoginPage = pathname.startsWith('/portal/login')

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      <PortalContext.Provider value={{ user, signOut }}>
        {/* Login pages render without the portal chrome */}
        {isLoginPage ? (
          <div className="min-h-screen bg-void">{children}</div>
        ) : (
          <div className="min-h-screen bg-void flex flex-col">
            {/* Top bar */}
            <header className="bg-void-dark border-b border-gold/10 px-5 py-3 flex items-center justify-between gap-4 sticky top-0 z-40">
              <div className="flex items-center gap-5">
                <Link
                  href="/"
                  className="font-display text-xl tracking-wider text-white shrink-0"
                >
                  HLPFL<span className="text-gold">.</span>
                </Link>
                <span className="hidden md:block text-white/15 select-none">
                  /
                </span>
                <span className="hidden md:block text-xs text-gold uppercase tracking-[0.2em]">
                  Portal
                </span>
              </div>

              {/* Desktop nav */}
              <nav className="hidden lg:flex items-center gap-1">
                {NAV.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`px-3 py-1.5 text-xs font-medium tracking-wide transition-colors rounded ${
                      isActive(link.href, link.exact)
                        ? 'text-gold bg-gold/10'
                        : 'text-white/50 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>

              <div className="flex items-center gap-3">
                <span className="hidden md:block text-white/30 text-xs truncate max-w-[160px]">
                  {user?.email}
                </span>
                <button
                  onClick={signOut}
                  className="text-xs text-white/30 hover:text-white transition-colors"
                >
                  Sign out
                </button>
                <button
                  onClick={() => setMobileOpen(!mobileOpen)}
                  className="lg:hidden text-white/50 hover:text-white p-1"
                  aria-label="Toggle menu"
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    {mobileOpen ? (
                      <>
                        <line x1="18" y1="6" x2="6" y2="18" />
                        <line x1="6" y1="6" x2="18" y2="18" />
                      </>
                    ) : (
                      <>
                        <line x1="4" y1="6" x2="20" y2="6" />
                        <line x1="4" y1="12" x2="20" y2="12" />
                        <line x1="4" y1="18" x2="20" y2="18" />
                      </>
                    )}
                  </svg>
                </button>
              </div>
            </header>

            {/* Mobile nav */}
            {mobileOpen && (
              <div className="lg:hidden bg-void-dark border-b border-gold/10 px-5 py-3 flex flex-wrap gap-2">
                {NAV.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={`px-3 py-1.5 text-xs font-medium transition-colors ${
                      isActive(link.href, link.exact)
                        ? 'text-gold'
                        : 'text-white/50'
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            )}

            <main className="flex-1 p-5 md:p-8">{children}</main>
          </div>
        )}
      </PortalContext.Provider>
    </LanguageContext.Provider>
  )
}
