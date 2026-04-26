// src/lib/portal/supabase-server.ts
// Server-side Supabase clients for portal pages and webhook handlers.
// NEVER import this file in browser/client components.

import { createServerClient as createSSRServerClient } from '@supabase/ssr'
import { createClient } from '@supabase/supabase-js'
import { cookies } from 'next/headers'

const COOKIE_DOMAIN =
  process.env.NEXT_PUBLIC_PORTAL_COOKIE_DOMAIN ?? '.hlpfl.org'

/**
 * Session-aware server client — reads/writes the auth cookie.
 * Use inside Server Components and Route Handlers that need the user's session.
 */
export async function createSupabaseServerClient() {
  const cookieStore = await cookies()
  return createSSRServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, {
                ...options,
                domain: COOKIE_DOMAIN,
                sameSite: 'lax',
                secure: true,
                path: '/',
              })
            )
          } catch {
            // setAll may throw in read-only cookie contexts (e.g. Server Components).
            // Auth middleware handles refresh in those cases.
          }
        },
      },
    }
  )
}

/**
 * Admin client — uses service role key, bypasses RLS.
 * Use ONLY inside server-side handlers (webhooks, cron jobs, admin routes).
 */
export function createSupabaseAdminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false } }
  )
}
