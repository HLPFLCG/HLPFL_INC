// src/lib/portal/auth.ts
// Auth helpers for portal Server Components and Route Handlers.

import { redirect } from 'next/navigation'
import { createSupabaseServerClient } from './supabase-server'

/**
 * Returns the current session, or redirects to /portal/login if not
 * authenticated. Use at the top of protected Server Components.
 */
export async function requireAuth() {
  const supabase = await createSupabaseServerClient()
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    redirect('/portal/login')
  }

  return session
}

/**
 * Returns the current session or null without redirecting.
 */
export async function getSession() {
  const supabase = await createSupabaseServerClient()
  const {
    data: { session },
  } = await supabase.auth.getSession()
  return session
}
