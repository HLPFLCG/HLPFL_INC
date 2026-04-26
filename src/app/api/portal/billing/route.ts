// GET /api/portal/billing
// Returns Stripe invoices + subscriptions for the authenticated portal customer.
// Auth: Bearer token (Supabase JWT) in Authorization header.

import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { createSupabaseAdminClient } from '@/lib/portal/supabase-server'
import { createSupabaseServerClient } from '@/lib/portal/supabase-server'

export const runtime = 'edge'

let _stripe: Stripe | null = null
function getStripe(): Stripe {
  if (!_stripe)
    _stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
      apiVersion: '2026-03-25.dahlia',
    })
  return _stripe
}

export async function GET(req: NextRequest) {
  // ── Authenticate via Supabase JWT ─────────────────────────────────────────
  const authHeader = req.headers.get('authorization')
  const token = authHeader?.startsWith('Bearer ') ? authHeader.slice(7) : null

  if (!token) {
    return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 })
  }

  const adminDb = createSupabaseAdminClient()

  // Verify the token and get the user
  const {
    data: { user },
    error: authErr,
  } = await adminDb.auth.getUser(token)

  if (authErr || !user) {
    return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 })
  }

  // ── Get stripe_customer_id ─────────────────────────────────────────────────
  const { data: customer, error: custErr } = await adminDb
    .from('customers')
    .select('stripe_customer_id')
    .eq('id', user.id)
    .single()

  if (custErr || !customer?.stripe_customer_id) {
    // No Stripe customer yet — return empty data
    return NextResponse.json({ invoices: [], subscriptions: [] })
  }

  const stripe = getStripe()
  const stripeCustomerId = customer.stripe_customer_id

  // ── Fetch invoices + subscriptions in parallel ─────────────────────────────
  const [invoicesRes, subsRes] = await Promise.allSettled([
    stripe.invoices.list({
      customer: stripeCustomerId,
      limit: 24,
      expand: ['data.subscription'],
    }),
    stripe.subscriptions.list({
      customer: stripeCustomerId,
      status: 'all',
      limit: 10,
      expand: ['data.items.data.price.product'],
    }),
  ])

  const invoices =
    invoicesRes.status === 'fulfilled'
      ? invoicesRes.value.data.map((inv) => ({
          id: inv.id,
          number: inv.number,
          amount_due: inv.amount_due,
          amount_paid: inv.amount_paid,
          currency: inv.currency,
          status: inv.status,
          hosted_invoice_url: inv.hosted_invoice_url,
          pdf: inv.invoice_pdf,
          created: inv.created,
          due_date: inv.due_date,
        }))
      : []

  const subscriptions =
    subsRes.status === 'fulfilled'
      ? subsRes.value.data.map((sub) => {
          const item = sub.items.data[0]
          const price = item?.price
          const product = price?.product
          const productName =
            typeof product === 'object' && product !== null && 'name' in product
              ? (product as Stripe.Product).name
              : 'Subscription'

          // current_period_end was moved in newer Stripe API versions;
          // fall back gracefully if not present.
          const subAny = sub as unknown as Record<string, unknown>
          const currentPeriodEnd =
            typeof subAny.current_period_end === 'number'
              ? subAny.current_period_end
              : 0

          return {
            id: sub.id,
            status: sub.status,
            current_period_end: currentPeriodEnd,
            cancel_at_period_end: sub.cancel_at_period_end,
            plan_name: productName,
            amount: price?.unit_amount ?? 0,
            currency: price?.currency ?? 'usd',
            interval: price?.recurring?.interval ?? 'month',
          }
        })
      : []

  return NextResponse.json({ invoices, subscriptions })
}
