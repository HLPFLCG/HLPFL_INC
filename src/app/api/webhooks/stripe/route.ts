import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { Resend } from 'resend'
import { createServerClient } from '@/lib/supabase'

let _stripe: Stripe | null = null
function getStripe(): Stripe {
  if (!_stripe) _stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2026-03-25.dahlia' })
  return _stripe
}

let _resend: Resend | null = null
function getResend(): Resend {
  if (!_resend) _resend = new Resend(process.env.RESEND_API_KEY!)
  return _resend
}

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://hlpfl.org'
const FROM_EMAIL = process.env.RESEND_FROM_EMAIL ?? 'stays@hlpfl.org'

export async function POST(req: NextRequest) {
  const stripe = getStripe()
  const resend = getResend()

  const body = await req.text()
  const signature = req.headers.get('stripe-signature')

  if (!signature) {
    return NextResponse.json({ error: 'Missing stripe-signature header' }, { status: 400 })
  }

  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (err) {
    console.error('Webhook signature verification failed:', err)
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  // Handle checkout session completed
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session
    const bookingId = session.metadata?.booking_id
    const paymentIntentId = typeof session.payment_intent === 'string'
      ? session.payment_intent
      : session.payment_intent?.id ?? null

    if (!bookingId) {
      console.error('Webhook: no booking_id in metadata', session.id)
      return NextResponse.json({ received: true })
    }

    const db = createServerClient()

    // ── Confirm the booking ──────────────────────────────────────────────────
    const { data: booking, error: updateErr } = await db
      .from('bookings')
      .update({
        status: 'confirmed',
        stripe_payment_intent_id: paymentIntentId,
      })
      .eq('id', bookingId)
      .select('*, properties(*)')
      .single()

    if (updateErr || !booking) {
      console.error('Webhook: could not update booking', updateErr)
      return NextResponse.json({ error: 'Booking update failed' }, { status: 500 })
    }

    // ── Block the dates ──────────────────────────────────────────────────────
    await db.from('availability_blocks').insert({
      property_id: booking.property_id,
      start_date: booking.check_in,
      end_date: booking.check_out,
      reason: `Booking ${bookingId}`,
    })

    // ── Send confirmation email ──────────────────────────────────────────────
    const property = (booking as { properties: { name: string; location: string } }).properties
    const totalFormatted = '$' + (booking.total_cents / 100).toFixed(0)
    const confirmationUrl = `${SITE_URL}/stays/confirmation/${bookingId}/`

    try {
      await resend.emails.send({
        from: FROM_EMAIL,
        to: booking.guest_email,
        subject: `Booking Confirmed — ${property?.name ?? 'Your Stay'}`,
        html: buildConfirmationEmail({
          guestName: booking.guest_name,
          propertyName: property?.name ?? 'Your Property',
          location: property?.location ?? '',
          checkIn: booking.check_in,
          checkOut: booking.check_out,
          guestCount: booking.guest_count,
          total: totalFormatted,
          bookingId,
          confirmationUrl,
        }),
      })
    } catch (emailErr) {
      // Email failure should not fail the webhook response
      console.error('Webhook: email send failed', emailErr)
    }
  }

  return NextResponse.json({ received: true })
}

function buildConfirmationEmail(data: {
  guestName: string
  propertyName: string
  location: string
  checkIn: string
  checkOut: string
  guestCount: number
  total: string
  bookingId: string
  confirmationUrl: string
}) {
  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#273856;font-family:'Space Grotesk',Arial,sans-serif;color:#ffffff;">
  <div style="max-width:600px;margin:0 auto;padding:40px 24px;">

    <p style="font-family:serif;font-size:32px;font-weight:700;letter-spacing:0.1em;color:#ffffff;margin:0 0 4px;">
      HLPFL<span style="color:#ab6c3d;">.</span>
    </p>
    <p style="font-size:11px;text-transform:uppercase;letter-spacing:0.25em;color:#ab6c3d;margin:0 0 40px;">Stays</p>

    <h1 style="font-family:serif;font-size:40px;font-weight:700;letter-spacing:0.05em;color:#ffffff;margin:0 0 8px;text-transform:uppercase;">
      You&rsquo;re Booked.
    </h1>
    <p style="color:rgba(255,255,255,0.6);font-size:15px;margin:0 0 40px;">
      Hi ${data.guestName}, your reservation is confirmed.
    </p>

    <div style="background:#3e5578;border:1px solid rgba(171,108,61,0.2);padding:32px;margin-bottom:32px;">
      <p style="font-size:11px;text-transform:uppercase;letter-spacing:0.25em;color:#ab6c3d;margin:0 0 16px;">Your Reservation</p>
      <h2 style="font-family:serif;font-size:24px;font-weight:700;letter-spacing:0.05em;color:#ffffff;margin:0 0 4px;text-transform:uppercase;">${data.propertyName}</h2>
      <p style="color:rgba(255,255,255,0.4);font-size:13px;margin:0 0 24px;">${data.location}</p>

      <table style="width:100%;border-collapse:collapse;">
        <tr><td style="padding:8px 0;border-bottom:1px solid rgba(255,255,255,0.08);color:rgba(255,255,255,0.5);font-size:13px;">Check-in</td><td style="padding:8px 0;border-bottom:1px solid rgba(255,255,255,0.08);color:#ffffff;font-size:13px;text-align:right;">${data.checkIn}</td></tr>
        <tr><td style="padding:8px 0;border-bottom:1px solid rgba(255,255,255,0.08);color:rgba(255,255,255,0.5);font-size:13px;">Check-out</td><td style="padding:8px 0;border-bottom:1px solid rgba(255,255,255,0.08);color:#ffffff;font-size:13px;text-align:right;">${data.checkOut}</td></tr>
        <tr><td style="padding:8px 0;border-bottom:1px solid rgba(255,255,255,0.08);color:rgba(255,255,255,0.5);font-size:13px;">Guests</td><td style="padding:8px 0;border-bottom:1px solid rgba(255,255,255,0.08);color:#ffffff;font-size:13px;text-align:right;">${data.guestCount}</td></tr>
        <tr><td style="padding:12px 0 0;color:rgba(255,255,255,0.5);font-size:13px;font-weight:600;">Total Paid</td><td style="padding:12px 0 0;color:#ab6c3d;font-size:16px;font-weight:700;text-align:right;">${data.total}</td></tr>
      </table>
    </div>

    <div style="background:#3e5578;border:1px solid rgba(74,100,132,1);padding:24px;margin-bottom:32px;">
      <p style="font-size:11px;text-transform:uppercase;letter-spacing:0.25em;color:#ab6c3d;margin:0 0 12px;">What Happens Next</p>
      <ul style="margin:0;padding:0;list-style:none;">
        <li style="color:rgba(255,255,255,0.6);font-size:13px;line-height:1.6;padding:4px 0;">&#9670; The host will contact you via WhatsApp within 24 hours with arrival details.</li>
        <li style="color:rgba(255,255,255,0.6);font-size:13px;line-height:1.6;padding:4px 0;">&#9670; Standard check-in is 3:00 PM local time (Costa Rica).</li>
        <li style="color:rgba(255,255,255,0.6);font-size:13px;line-height:1.6;padding:4px 0;">&#9670; Free cancellation up to 48 hours before check-in. Contact hello@hlpfl.com to cancel.</li>
      </ul>
    </div>

    <a href="${data.confirmationUrl}" style="display:block;background:#ab6c3d;color:#ffffff;text-align:center;padding:16px 24px;font-size:13px;font-weight:600;letter-spacing:0.1em;text-decoration:none;text-transform:uppercase;margin-bottom:40px;">
      View Booking Details &rarr;
    </a>

    <hr style="border:none;border-top:1px solid rgba(255,255,255,0.08);margin:0 0 24px;">
    <p style="color:rgba(255,255,255,0.25);font-size:11px;line-height:1.6;margin:0;">
      Booking ID: ${data.bookingId}<br>
      Questions? Reply to this email or contact <a href="mailto:hello@hlpfl.com" style="color:#ab6c3d;">hello@hlpfl.com</a><br>
      HLPFL INC &mdash; Caribbean Coast, Costa Rica
    </p>
  </div>
</body>
</html>`
}
