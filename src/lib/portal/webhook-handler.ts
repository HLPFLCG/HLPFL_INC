// src/lib/portal/webhook-handler.ts
// Extension for the existing Stripe webhook at /api/webhooks/stripe/route.ts.
// Writes portal customers and purchases to Supabase when Stripe events fire.

import type Stripe from 'stripe'
import { createSupabaseAdminClient } from './supabase-server'

/**
 * Handle checkout.session.completed — upsert customer + insert purchase.
 */
export async function handleCheckoutCompleted(
  session: Stripe.Checkout.Session
): Promise<void> {
  const supabase = createSupabaseAdminClient()

  const email = session.customer_email ?? session.customer_details?.email
  if (!email) {
    console.warn('portal-webhook: no email on checkout session', session.id)
    return
  }

  const stripeCustomerId =
    typeof session.customer === 'string' ? session.customer : null

  const paymentIntentId =
    typeof session.payment_intent === 'string'
      ? session.payment_intent
      : session.payment_intent?.id ?? null

  // 1. Upsert the portal customer record (keyed on email).
  //    If the user hasn't signed up yet this creates a stub; the auth trigger
  //    (migration 0004) will fill in the full row when they first sign in.
  const { data: customer, error: upsertErr } = await supabase
    .from('customers')
    .upsert(
      {
        // id is auth.users FK — omit here so it's filled by the auth trigger.
        // Instead we match on email and only backfill stripe_customer_id.
        email,
        stripe_customer_id: stripeCustomerId,
      },
      { onConflict: 'email', ignoreDuplicates: false }
    )
    .select('id')
    .maybeSingle()

  if (upsertErr) {
    console.error('portal-webhook: customer upsert error', upsertErr.message)
    return
  }

  if (!customer) {
    // Customer row doesn't exist yet (user hasn't signed up).
    // The purchase will be recorded once they complete signup via the auth trigger.
    console.info(
      'portal-webhook: no customer row for email yet (pre-signup purchase)',
      email
    )
    return
  }

  // 2. Insert the purchase record.
  const { error: insertErr } = await supabase.from('purchases').insert({
    customer_id: customer.id,
    stripe_payment_intent_id: paymentIntentId,
    stripe_checkout_session_id: session.id,
    product_sku: session.metadata?.sku ?? 'unknown',
    amount_cents: session.amount_total ?? 0,
    currency: session.currency ?? 'usd',
    status: 'paid' as const,
    metadata: session.metadata ?? null,
  })

  if (insertErr) {
    console.error('portal-webhook: purchase insert error', insertErr.message)
  }
}

/**
 * Handle charge.refunded — mark the matching purchase as refunded.
 */
export async function handleChargeRefunded(
  charge: Stripe.Charge
): Promise<void> {
  if (!charge.payment_intent) return
  const supabase = createSupabaseAdminClient()

  const paymentIntentId =
    typeof charge.payment_intent === 'string'
      ? charge.payment_intent
      : charge.payment_intent.id

  const { error } = await supabase
    .from('purchases')
    .update({ status: 'refunded' as const })
    .eq('stripe_payment_intent_id', paymentIntentId)

  if (error) {
    console.error('portal-webhook: refund update error', error.message)
  }
}
