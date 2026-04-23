import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { createServerClient } from '@/lib/supabase'
import { isAvailable, calculateTotal } from '@/lib/availability'

let _stripe: Stripe | null = null
function getStripe(): Stripe {
  if (!_stripe) _stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2026-03-25.dahlia' })
  return _stripe
}

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://hlpfl.org'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { property_id, check_in, check_out, guest_count, guest_name, guest_email, guest_phone } = body

    // ── Validate inputs ──────────────────────────────────────────────────────
    if (!property_id || !check_in || !check_out || !guest_name || !guest_email || !guest_phone) {
      return NextResponse.json({ error: 'Missing required fields.' }, { status: 400 })
    }
    if (new Date(check_out) <= new Date(check_in)) {
      return NextResponse.json({ error: 'Check-out must be after check-in.' }, { status: 400 })
    }

    const db = createServerClient()

    // ── Fetch property ───────────────────────────────────────────────────────
    const { data: property, error: propErr } = await db
      .from('properties')
      .select('*')
      .eq('id', property_id)
      .eq('published', true)
      .single()

    if (propErr || !property) {
      return NextResponse.json({ error: 'Property not found.' }, { status: 404 })
    }

    if (guest_count > property.max_guests) {
      return NextResponse.json({ error: `Maximum ${property.max_guests} guests allowed.` }, { status: 400 })
    }

    // ── Availability check ───────────────────────────────────────────────────
    const available = await isAvailable(property_id, { checkIn: check_in, checkOut: check_out })
    if (!available) {
      return NextResponse.json({ error: 'Selected dates are not available.' }, { status: 409 })
    }

    // ── Calculate total ──────────────────────────────────────────────────────
    const total_cents = calculateTotal(
      property.base_rate_cents,
      property.cleaning_fee_cents,
      check_in,
      check_out
    )

    // ── Create pending booking ───────────────────────────────────────────────
    const { data: booking, error: bookingErr } = await db
      .from('bookings')
      .insert({
        property_id,
        guest_name,
        guest_email,
        guest_phone,
        check_in,
        check_out,
        guest_count,
        total_cents,
        status: 'pending',
      })
      .select()
      .single()

    if (bookingErr || !booking) {
      console.error('Booking insert error:', bookingErr)
      return NextResponse.json({ error: 'Could not create booking. Please try again.' }, { status: 500 })
    }

    // ── Create Stripe Payment Link ───────────────────────────────────────────
    const stripe = getStripe()
    const paymentLink = await stripe.paymentLinks.create({
      line_items: [
        {
          price_data: {
            currency: 'usd',
            unit_amount: total_cents,
            product_data: {
              name: `${property.name} — ${check_in} to ${check_out}`,
              description: `${guest_count} guest${guest_count !== 1 ? 's' : ''} · ${property.location}`,
            },
          },
          quantity: 1,
        },
      ],
      after_completion: {
        type: 'redirect',
        redirect: {
          url: `${SITE_URL}/stays/confirmation/${booking.id}/`,
        },
      },
      metadata: {
        booking_id: booking.id,
        property_id: property_id,
        guest_email,
      },
    })

    // ── Update booking with payment link ID ──────────────────────────────────
    await db
      .from('bookings')
      .update({ stripe_payment_link_id: paymentLink.id })
      .eq('id', booking.id)

    return NextResponse.json({ payment_url: paymentLink.url, booking_id: booking.id })
  } catch (err) {
    console.error('Create booking error:', err)
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 })
  }
}
