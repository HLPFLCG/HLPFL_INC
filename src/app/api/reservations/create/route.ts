// POST /api/reservations/create
// Creates a dinner reservation and immediately emails the restaurant.
// Requires an authenticated portal session (Authorization: Bearer <token>).

import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { createSupabaseAdminClient } from '@/lib/portal/supabase-server'

export const runtime = 'edge'

const FROM_EMAIL = process.env.RESEND_FROM_EMAIL ?? 'portal@hlpfl.org'
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://hlpfl.org'

function getResend() {
  return new Resend(process.env.RESEND_API_KEY!)
}

export async function POST(req: NextRequest) {
  // ── Auth ──────────────────────────────────────────────────────────────────
  const authHeader = req.headers.get('authorization')
  const token = authHeader?.startsWith('Bearer ') ? authHeader.slice(7) : null

  if (!token) {
    return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 })
  }

  const db = createSupabaseAdminClient()
  const { data: { user }, error: authErr } = await db.auth.getUser(token)

  if (authErr || !user) {
    return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 })
  }

  // ── Parse body ────────────────────────────────────────────────────────────
  interface ReqBody {
    venue_id?: string
    guest_name?: string
    guest_email?: string
    party_size?: number
    reservation_date?: string
    reservation_time?: string
    special_requests?: string | null
  }
  let body: ReqBody
  try {
    body = await req.json() as ReqBody
  } catch {
    return NextResponse.json({ error: 'Invalid JSON.' }, { status: 400 })
  }

  const { venue_id, guest_name, guest_email, party_size, reservation_date, reservation_time, special_requests } = body

  if (!venue_id || !guest_name || !guest_email || !party_size || !reservation_date || !reservation_time) {
    return NextResponse.json({ error: 'Missing required fields.' }, { status: 400 })
  }

  // ── Fetch venue ───────────────────────────────────────────────────────────
  const { data: venue, error: venueErr } = await db
    .from('dinner_venues')
    .select('*')
    .eq('id', venue_id)
    .eq('active', true)
    .single()

  if (venueErr || !venue) {
    return NextResponse.json({ error: 'Venue not found.' }, { status: 404 })
  }

  if (party_size > venue.max_party_size) {
    return NextResponse.json(
      { error: `Maximum party size for this venue is ${venue.max_party_size}.` },
      { status: 400 }
    )
  }

  // ── Create reservation ────────────────────────────────────────────────────
  const { data: reservation, error: insertErr } = await db
    .from('dinner_reservations')
    .insert({
      customer_id: user.id,
      venue_id,
      guest_name,
      guest_email,
      party_size,
      reservation_date,
      reservation_time,
      special_requests: special_requests ?? null,
      status: 'pending',
    })
    .select()
    .single()

  if (insertErr || !reservation) {
    console.error('reservation insert error:', insertErr)
    return NextResponse.json({ error: 'Could not create reservation.' }, { status: 500 })
  }

  const confirmToken = (reservation as { confirm_token: string }).confirm_token
  const confirmUrl = `${SITE_URL}/api/reservations/respond/${confirmToken}?action=confirm`
  const declineUrl = `${SITE_URL}/api/reservations/respond/${confirmToken}?action=decline`

  // ── Email the restaurant ──────────────────────────────────────────────────
  try {
    const resend = getResend()
    await resend.emails.send({
      from: FROM_EMAIL,
      to: venue.contact_email as string,
      subject: `Reservation Request — ${guest_name}, party of ${party_size} on ${reservation_date}`,
      html: buildRestaurantEmail({
        venueName: venue.name as string,
        guestName: guest_name,
        guestEmail: guest_email,
        partySize: party_size,
        date: reservation_date,
        time: reservation_time,
        specialRequests: special_requests ?? null,
        confirmUrl,
        declineUrl,
      }),
    })
  } catch (emailErr) {
    console.error('reservation restaurant email failed:', emailErr)
  }

  return NextResponse.json({ reservation_id: reservation.id })
}

function buildRestaurantEmail(data: {
  venueName: string
  guestName: string
  guestEmail: string
  partySize: number
  date: string
  time: string
  specialRequests: string | null
  confirmUrl: string
  declineUrl: string
}) {
  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#0a0a0a;font-family:Arial,sans-serif;color:#ffffff;">
  <div style="max-width:580px;margin:0 auto;padding:40px 24px;">
    <p style="font-size:24px;font-weight:700;letter-spacing:0.1em;color:#ffffff;margin:0 0 4px;">
      HLPFL<span style="color:#c87941;">.</span>
    </p>
    <p style="font-size:11px;text-transform:uppercase;letter-spacing:0.25em;color:#c87941;margin:0 0 32px;">New Reservation Request</p>

    <p style="color:rgba(255,255,255,0.6);font-size:14px;margin:0 0 24px;">
      You have a new reservation request for <strong style="color:#fff;">${data.venueName}</strong>.
      Please confirm or decline using the buttons below.
    </p>

    <div style="background:#111111;border:1px solid rgba(200,121,65,0.15);padding:24px;margin-bottom:32px;">
      <table style="width:100%;border-collapse:collapse;">
        <tr><td style="padding:8px 0;border-bottom:1px solid rgba(255,255,255,0.06);color:rgba(255,255,255,0.4);font-size:13px;">Guest</td><td style="padding:8px 0;border-bottom:1px solid rgba(255,255,255,0.06);color:#fff;font-size:13px;text-align:right;font-weight:600;">${data.guestName}</td></tr>
        <tr><td style="padding:8px 0;border-bottom:1px solid rgba(255,255,255,0.06);color:rgba(255,255,255,0.4);font-size:13px;">Email</td><td style="padding:8px 0;border-bottom:1px solid rgba(255,255,255,0.06);color:#fff;font-size:13px;text-align:right;">${data.guestEmail}</td></tr>
        <tr><td style="padding:8px 0;border-bottom:1px solid rgba(255,255,255,0.06);color:rgba(255,255,255,0.4);font-size:13px;">Date</td><td style="padding:8px 0;border-bottom:1px solid rgba(255,255,255,0.06);color:#fff;font-size:13px;text-align:right;">${data.date}</td></tr>
        <tr><td style="padding:8px 0;border-bottom:1px solid rgba(255,255,255,0.06);color:rgba(255,255,255,0.4);font-size:13px;">Time</td><td style="padding:8px 0;border-bottom:1px solid rgba(255,255,255,0.06);color:#fff;font-size:13px;text-align:right;">${data.time}</td></tr>
        <tr><td style="padding:8px 0;color:rgba(255,255,255,0.4);font-size:13px;">Party Size</td><td style="padding:8px 0;color:#c87941;font-size:14px;text-align:right;font-weight:700;">${data.partySize} ${data.partySize === 1 ? 'guest' : 'guests'}</td></tr>
        ${data.specialRequests ? `<tr><td style="padding:12px 0 0;color:rgba(255,255,255,0.4);font-size:13px;vertical-align:top;">Notes</td><td style="padding:12px 0 0;color:rgba(255,255,255,0.7);font-size:13px;text-align:right;">${data.specialRequests}</td></tr>` : ''}
      </table>
    </div>

    <div style="display:flex;gap:16px;margin-bottom:32px;">
      <a href="${data.confirmUrl}"
         style="flex:1;display:block;background:#22c55e;color:#ffffff;text-align:center;padding:16px 20px;font-size:14px;font-weight:700;letter-spacing:0.06em;text-decoration:none;text-transform:uppercase;">
        ✓ Confirm
      </a>
      <a href="${data.declineUrl}"
         style="flex:1;display:block;background:#ef4444;color:#ffffff;text-align:center;padding:16px 20px;font-size:14px;font-weight:700;letter-spacing:0.06em;text-decoration:none;text-transform:uppercase;">
        ✕ Decline
      </a>
    </div>

    <p style="color:rgba(255,255,255,0.2);font-size:11px;margin:0;">
      This request was made via HLPFL Portal. The guest will be notified immediately upon your response.
      If you have questions, reply to this email or contact
      <a href="mailto:hello@hlpfl.com" style="color:#c87941;">hello@hlpfl.com</a>
    </p>
  </div>
</body>
</html>`
}
