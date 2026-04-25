import { NextRequest, NextResponse } from 'next/server'
import { createServerClient, supabase } from '@/lib/supabase'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://hlpfl.org'

export async function GET(_req: NextRequest) {
  // Verify the user is authenticated
  const { data: { session } } = await supabase.auth.getSession()
  if (!session) {
    return NextResponse.redirect(`${SITE_URL}/dashboard/`)
  }

  const db = createServerClient()
  const { data: client } = await db
    .from('clients')
    .select('id, stripe_account_id')
    .eq('user_id', session.user.id)
    .single()

  if (!client) {
    return NextResponse.redirect(`${SITE_URL}/dashboard/`)
  }

  const clientId = process.env.STRIPE_CLIENT_ID
  const redirectUri = encodeURIComponent(`${SITE_URL}/api/v1/stripe/callback`)
  const state = encodeURIComponent(client.id) // use client ID as CSRF state

  // Build Stripe Connect OAuth URL
  const connectUrl =
    `https://connect.stripe.com/oauth/authorize` +
    `?response_type=code` +
    `&client_id=${clientId}` +
    `&scope=read_write` +
    `&redirect_uri=${redirectUri}` +
    `&state=${state}` +
    `&stripe_user[email]=${encodeURIComponent(session.user.email ?? '')}` +
    `&suggested_capabilities[]=transfers`

  return NextResponse.redirect(connectUrl)
}
