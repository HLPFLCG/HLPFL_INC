import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { createServerClient } from '@/lib/supabase'

let _stripe: Stripe | null = null
function getStripe() {
  if (!_stripe) _stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2026-03-25.dahlia' })
  return _stripe
}

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://hlpfl.org'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const code = searchParams.get('code')
  const state = searchParams.get('state')
  const error = searchParams.get('error')
  const errorDescription = searchParams.get('error_description')

  if (error) {
    console.error('Stripe Connect error:', error, errorDescription)
    return NextResponse.redirect(`${SITE_URL}/dashboard/settings/?stripe_error=${encodeURIComponent(errorDescription ?? error)}`)
  }

  if (!code || !state) {
    return NextResponse.redirect(`${SITE_URL}/dashboard/settings/?stripe_error=missing_params`)
  }

  try {
    const stripe = getStripe()

    // Exchange the authorization code for an access token
    const response = await stripe.oauth.token({ grant_type: 'authorization_code', code })
    const stripeAccountId = response.stripe_user_id

    if (!stripeAccountId) {
      return NextResponse.redirect(`${SITE_URL}/dashboard/settings/?stripe_error=no_account_id`)
    }

    // Update the client record
    const db = createServerClient()
    const clientId = decodeURIComponent(state)
    await db
      .from('clients')
      .update({
        stripe_account_id: stripeAccountId,
        stripe_onboarded: true,
      })
      .eq('id', clientId)

    return NextResponse.redirect(`${SITE_URL}/dashboard/settings/?stripe_connected=1`)
  } catch (err) {
    console.error('Stripe Connect callback error:', err)
    return NextResponse.redirect(`${SITE_URL}/dashboard/settings/?stripe_error=exchange_failed`)
  }
}
