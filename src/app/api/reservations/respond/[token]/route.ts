// GET /api/reservations/respond/[token]?action=confirm|decline
// No login required — restaurant taps this link from the email.
// Updates the reservation status and sends a confirmation email to the guest.

import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { createSupabaseAdminClient } from '@/lib/portal/supabase-server'

export const runtime = 'edge'

const FROM_EMAIL = process.env.RESEND_FROM_EMAIL ?? 'portal@hlpfl.org'
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://hlpfl.org'

function getResend() {
  return new Resend(process.env.RESEND_API_KEY!)
}

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ token: string }> }
) {
  const { token } = await params
  const action = req.nextUrl.searchParams.get('action')

  if (!token || !['confirm', 'decline'].includes(action ?? '')) {
    return new NextResponse('Invalid link.', { status: 400 })
  }

  const db = createSupabaseAdminClient()

  // ── Look up reservation by token ──────────────────────────────────────────
  const { data: reservation, error: findErr } = await db
    .from('dinner_reservations')
    .select('*,dinner_venues(name,contact_email)')
    .eq('confirm_token', token)
    .single()

  if (findErr || !reservation) {
    return new NextResponse(buildResponsePage('error', 'Reservation not found or link expired.', SITE_URL), {
      status: 404,
      headers: { 'Content-Type': 'text/html' },
    })
  }

  // ── Check token expiry ────────────────────────────────────────────────────
  if (new Date(reservation.token_expires_at as string) < new Date()) {
    return new NextResponse(buildResponsePage('error', 'This link has expired.', SITE_URL), {
      status: 410,
      headers: { 'Content-Type': 'text/html' },
    })
  }

  // ── Already responded? ────────────────────────────────────────────────────
  if (reservation.status !== 'pending') {
    return new NextResponse(
      buildResponsePage(
        reservation.status === 'confirmed' ? 'already_confirmed' : 'already_declined',
        `This reservation was already ${reservation.status}.`,
        SITE_URL
      ),
      { headers: { 'Content-Type': 'text/html' } }
    )
  }

  const newStatus = action === 'confirm' ? 'confirmed' : 'declined'
  const now = new Date().toISOString()

  // ── Update reservation ────────────────────────────────────────────────────
  const { error: updateErr } = await db
    .from('dinner_reservations')
    .update({
      status: newStatus,
      ...(newStatus === 'confirmed' ? { confirmed_at: now } : { declined_at: now }),
    })
    .eq('id', reservation.id)

  if (updateErr) {
    console.error('reservation respond update error:', updateErr)
    return new NextResponse(buildResponsePage('error', 'Could not update reservation. Please try again.', SITE_URL), {
      status: 500,
      headers: { 'Content-Type': 'text/html' },
    })
  }

  // ── Email the guest ───────────────────────────────────────────────────────
  const venueName = (reservation as { dinner_venues: { name: string } }).dinner_venues?.name ?? 'the restaurant'

  try {
    const resend = getResend()
    if (newStatus === 'confirmed') {
      await resend.emails.send({
        from: FROM_EMAIL,
        to: reservation.guest_email as string,
        subject: `Your table is confirmed — ${venueName}`,
        html: buildGuestConfirmEmail({
          guestName: reservation.guest_name as string,
          venueName,
          date: reservation.reservation_date as string,
          time: reservation.reservation_time as string,
          partySize: reservation.party_size as number,
          portalUrl: `${SITE_URL}/portal/reservations/${reservation.id}`,
        }),
      })
    } else {
      await resend.emails.send({
        from: FROM_EMAIL,
        to: reservation.guest_email as string,
        subject: `Reservation update — ${venueName}`,
        html: buildGuestDeclineEmail({
          guestName: reservation.guest_name as string,
          venueName,
          date: reservation.reservation_date as string,
          portalUrl: `${SITE_URL}/portal/reservations/new`,
        }),
      })
    }
  } catch (emailErr) {
    console.error('reservation guest email failed:', emailErr)
  }

  return new NextResponse(
    buildResponsePage(
      newStatus === 'confirmed' ? 'confirmed' : 'declined',
      newStatus === 'confirmed'
        ? 'Reservation confirmed! The guest has been notified.'
        : 'Reservation declined. The guest has been notified.',
      SITE_URL
    ),
    { headers: { 'Content-Type': 'text/html' } }
  )
}

// ── HTML response pages (minimal, no JS needed) ───────────────────────────────

function buildResponsePage(type: string, message: string, siteUrl: string) {
  const colors: Record<string, string> = {
    confirmed: '#22c55e',
    already_confirmed: '#22c55e',
    declined: '#ef4444',
    already_declined: '#ef4444',
    error: '#f59e0b',
  }
  const color = colors[type] ?? '#c87941'

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>HLPFL — Reservation</title>
</head>
<body style="margin:0;padding:0;background:#0a0a0a;font-family:Arial,sans-serif;color:#fff;min-height:100vh;display:flex;align-items:center;justify-content:center;">
  <div style="max-width:480px;padding:48px 32px;text-align:center;">
    <p style="font-size:24px;font-weight:700;letter-spacing:0.1em;margin:0 0 4px;">
      HLPFL<span style="color:#c87941;">.</span>
    </p>
    <p style="font-size:11px;text-transform:uppercase;letter-spacing:0.25em;color:#c87941;margin:0 0 40px;">Reservations</p>

    <p style="font-size:48px;margin:0 0 20px;">${type === 'confirmed' || type === 'already_confirmed' ? '✓' : type === 'error' ? '⚠' : '✕'}</p>

    <p style="font-size:20px;font-weight:700;color:${color};margin:0 0 12px;">${message}</p>
    <p style="font-size:13px;color:rgba(255,255,255,0.4);margin:0 0 32px;">You can close this window.</p>

    <a href="${siteUrl}" style="color:rgba(255,255,255,0.3);font-size:12px;text-decoration:none;">
      ← Return to hlpfl.org
    </a>
  </div>
</body>
</html>`
}

function buildGuestConfirmEmail(data: {
  guestName: string
  venueName: string
  date: string
  time: string
  partySize: number
  portalUrl: string
}) {
  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#0a0a0a;font-family:Arial,sans-serif;color:#fff;">
  <div style="max-width:560px;margin:0 auto;padding:40px 24px;">
    <p style="font-size:24px;font-weight:700;letter-spacing:0.1em;margin:0 0 4px;">HLPFL<span style="color:#c87941;">.</span></p>
    <p style="font-size:11px;text-transform:uppercase;letter-spacing:0.25em;color:#c87941;margin:0 0 36px;">Reservation Confirmed</p>

    <h1 style="font-size:28px;font-weight:700;color:#22c55e;margin:0 0 8px;">Your table is confirmed! ✓</h1>
    <p style="color:rgba(255,255,255,0.6);font-size:14px;margin:0 0 28px;">Hi ${data.guestName}, see you at <strong style="color:#fff;">${data.venueName}</strong>.</p>

    <div style="background:#111111;border:1px solid rgba(34,197,94,0.15);padding:24px;margin-bottom:32px;">
      <table style="width:100%;border-collapse:collapse;">
        <tr><td style="padding:7px 0;border-bottom:1px solid rgba(255,255,255,0.06);color:rgba(255,255,255,0.4);font-size:13px;">Restaurant</td><td style="padding:7px 0;border-bottom:1px solid rgba(255,255,255,0.06);color:#fff;font-size:13px;text-align:right;font-weight:600;">${data.venueName}</td></tr>
        <tr><td style="padding:7px 0;border-bottom:1px solid rgba(255,255,255,0.06);color:rgba(255,255,255,0.4);font-size:13px;">Date</td><td style="padding:7px 0;border-bottom:1px solid rgba(255,255,255,0.06);color:#fff;font-size:13px;text-align:right;">${data.date}</td></tr>
        <tr><td style="padding:7px 0;border-bottom:1px solid rgba(255,255,255,0.06);color:rgba(255,255,255,0.4);font-size:13px;">Time</td><td style="padding:7px 0;border-bottom:1px solid rgba(255,255,255,0.06);color:#fff;font-size:13px;text-align:right;">${data.time}</td></tr>
        <tr><td style="padding:7px 0;color:rgba(255,255,255,0.4);font-size:13px;">Guests</td><td style="padding:7px 0;color:#c87941;font-size:14px;text-align:right;font-weight:700;">${data.partySize}</td></tr>
      </table>
    </div>

    <a href="${data.portalUrl}" style="display:inline-block;background:#c87941;color:#fff;padding:14px 28px;font-size:13px;font-weight:600;letter-spacing:0.08em;text-decoration:none;text-transform:uppercase;margin-bottom:40px;">
      View in Portal →
    </a>

    <p style="color:rgba(255,255,255,0.2);font-size:11px;">
      Questions? <a href="mailto:hello@hlpfl.com" style="color:#c87941;">hello@hlpfl.com</a>
    </p>
  </div>
</body>
</html>`
}

function buildGuestDeclineEmail(data: {
  guestName: string
  venueName: string
  date: string
  portalUrl: string
}) {
  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#0a0a0a;font-family:Arial,sans-serif;color:#fff;">
  <div style="max-width:560px;margin:0 auto;padding:40px 24px;">
    <p style="font-size:24px;font-weight:700;letter-spacing:0.1em;margin:0 0 4px;">HLPFL<span style="color:#c87941;">.</span></p>
    <p style="font-size:11px;text-transform:uppercase;letter-spacing:0.25em;color:#c87941;margin:0 0 36px;">Reservation Update</p>

    <h1 style="font-size:24px;font-weight:700;color:rgba(255,255,255,0.7);margin:0 0 8px;">Reservation Unavailable</h1>
    <p style="color:rgba(255,255,255,0.6);font-size:14px;margin:0 0 20px;">
      Hi ${data.guestName}, unfortunately <strong style="color:#fff;">${data.venueName}</strong> is unable to accommodate your reservation for ${data.date}.
    </p>
    <p style="color:rgba(255,255,255,0.5);font-size:14px;margin:0 0 32px;">
      Try a different date, time, or restaurant — we have more options available.
    </p>

    <a href="${data.portalUrl}" style="display:inline-block;background:#c87941;color:#fff;padding:14px 28px;font-size:13px;font-weight:600;letter-spacing:0.08em;text-decoration:none;text-transform:uppercase;">
      Book Again →
    </a>
  </div>
</body>
</html>`
}
