// src/lib/portal/supabase-client.ts
// Browser Supabase client for portal pages.
// Cookie is scoped to .hlpfl.org so the same session works on all subdomains.

import { createBrowserClient } from '@supabase/ssr'

const COOKIE_DOMAIN =
  process.env.NEXT_PUBLIC_PORTAL_COOKIE_DOMAIN ?? '.hlpfl.org'

export function createSupabaseBrowserClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookieOptions: {
        domain: COOKIE_DOMAIN,
        sameSite: 'lax',
        secure: true,
        path: '/',
      },
    }
  )
}
