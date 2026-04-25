import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { createServerClient } from '@/lib/supabase'
import { isAvailable, calculateTotal } from '@/lib/availability'

let _stripe: Stripe | null = null
function getStripe() {
  if (!_stripe) _stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2026-03-25.dahlia' })
  return _stripe
}

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://hlpfl.org'

// Allow any origin — bookings come from client sites on other domains.
const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
}

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: CORS })
}

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params

  try {
    const body = await req.json()
    const { check_in, check_out, guest_count, guest_name, guest_email, guest_phone } = body

    // ── Validate ─────────────────────────────────────────────────────────────
    if (!check_in || !check_out || !guest_name || !guest_email || !guest_phone) {
      return NextResponse.json({ error: 'Missing required fields.' }, { status: 400, headers: CORS })
    }
    if (new Date(check_out) <= new Date(check_in)) {
      return NextResponse.json({ error: 'Check-out must be after check-in.' }, { status: 400, headers: CORS })
    }

    const db = createServerClient()

    // ── Fetch property ────────────────────────────────────────────────────────
    const { data: property, error: propErr } = await db
      .from('properties')
      .select('id, name, slug, location, max_guests, base_rate_cents, cleaning_fee_cents, client_id')
      .eq('slug', slug)
      .eq('published', true)
      .single()

    if (propErr || !property) {
      return NextResponse.json({ error: 'Property not found.' }, { status: 404, headers: CORS })
    }

    const guestCountNum = Number(guest_count) || 1
    if (guestCountNum > property.max_guests) {
      return NextResponse.json(
        { error: `Maximum ${property.max_guests} guests allowed.` },
        { status: 400, headers: CORS }
      )
    }

    // ── Availability check (double-booking prevention) ────────────────────────
    const available = await isAvailable(property.id, { checkIn: check_in, checkOut: check_out })
    if (!available) {
      return NextResponse.json({ error: 'Selected dates are not available.' }, { status: 409, headers: CORS })
    }

    // ── Calculate total ───────────────────────────────────────────────────────
    const total_cents = calculateTotal(
      property.base_rate_cents,
      property.cleaning_fee_cents,
      check_in,
      check_out
    )

    // ── Create pending booking ────────────────────────────────────────────────
    const { data: booking, error: bookingErr } = await db
      .from('bookings')
      .insert({
        property_id: property.id,
        guest_name,
        guest_email,
        guest_phone,
        check_in,
        check_out,
        guest_count: guestCountNum,
        total_cents,
        status: 'pending',
      })
      .select()
      .single()

    if (bookingErr || !booking) {
      return NextResponse.json({ error: 'Could not create booking.' }, { status: 500, headers: CORS })
    }

    // ── Fetch client's Stripe account (for Stripe Connect) ────────────────────
    let stripeAccountId: string | undefined
    if (property.client_id) {
      const { data: client } = await db
        .from('clients')
        .select('stripe_account_id, stripe_onboarded')
        .eq('id', property.client_id)
        .single()
      if (client?.stripe_onboarded && client.stripe_account_id) {
        stripeAccountId = client.stripe_account_id
      }
    }

    // ── Create Stripe Payment Link ────────────────────────────────────────────
    const stripe = getStripe()
    const paymentLinkOptions: Stripe.PaymentLinkCreateParams = {
      line_items: [
        {
          price_data: {
            currency: 'usd',
            unit_amount: total_cents,
            product_data: {
              name: `${property.name} — ${check_in} to ${check_out}`,
              description: `${guestCountNum} guest${guestCountNum !== 1 ? 's' : ''} · ${property.location}`,
            },
          },
          quantity: 1,
        },
      ],
      after_completion: {
        type: 'redirect',
        redirect: { url: `${SITE_URL}/stays/confirmation/${booking.id}/` },
      },
      metadata: { booking_id: booking.id, property_id: property.id, guest_email },
    }

    // Route payment to the property owner's Stripe account if connected
    const paymentLink = stripeAccountId
      ? await stripe.paymentLinks.create(paymentLinkOptions, { stripeAccount: stripeAccountId })
      : await stripe.paymentLinks.create(paymentLinkOptions)

    // Update booking with payment link
    await db.from('bookings')
      .update({ stripe_payment_link_id: paymentLink.id })
      .eq('id', booking.id)

    return NextResponse.json(
      { payment_url: paymentLink.url, booking_id: booking.id },
      { headers: CORS }
    )
  } catch (err) {
    console.error('v1/book error:', err)
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500, headers: CORS })
  }
}
