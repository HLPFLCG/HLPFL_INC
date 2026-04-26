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

  // Look up an existing portal customer by email.
  // The customers.id is a FK to auth.users (no default), so we cannot INSERT
  // a row without a corresponding auth.users entry — that's done by the auth
  // trigger (migration 0004) when the user first signs up.
  // Here we only backfill stripe_customer_id if the row already exists.
  const { data: existing } = await supabase
    .from('customers')
    .select('id')
    .eq('email', email)
    .maybeSingle()

  if (!existing) {
    console.info(
      'portal-webhook: customer not signed up yet — stripe_customer_id will be set on first login',
      email
    )
    return
  }

  // Backfill stripe_customer_id if needed
  if (stripeCustomerId) {
    await supabase
      .from('customers')
      .update({ stripe_customer_id: stripeCustomerId })
      .eq('id', existing.id)
      .is('stripe_customer_id', null)
  }

  // 2. Insert the purchase record.
  const { error: insertErr } = await supabase.from('purchases').insert({
    customer_id: existing.id,
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
