// POST /api/reservations/[id]/escalate
// Called by the guest's browser at the 25-second mark.
// Sends a follow-up email to the venue's backup contact.

import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { createSupabaseAdminClient } from '@/lib/portal/supabase-server'

export const runtime = 'edge'

const FROM_EMAIL = process.env.RESEND_FROM_EMAIL ?? 'portal@hlpfl.org'
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://hlpfl.org'

function getResend() {
  return new Resend(process.env.RESEND_API_KEY!)
}

export async function POST(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const db = createSupabaseAdminClient()

  // ── Fetch reservation ─────────────────────────────────────────────────────
  const { data: reservation, error: findErr } = await db
    .from('dinner_reservations')
    .select('*,dinner_venues(name,contact_email,backup_email)')
    .eq('id', id)
    .single()

  if (findErr || !reservation) {
    return NextResponse.json({ error: 'Not found.' }, { status: 404 })
  }

  // Only escalate if still pending and not already escalated
  if (reservation.status !== 'pending' || reservation.escalated_at) {
    return NextResponse.json({ skipped: true })
  }

  // Mark as escalated
  await db
    .from('dinner_reservations')
    .update({ escalated_at: new Date().toISOString() })
    .eq('id', id)

  const venue = (reservation as {
    dinner_venues: { name: string; contact_email: string; backup_email: string | null }
  }).dinner_venues
  const confirmToken = (reservation as { confirm_token: string }).confirm_token
  const confirmUrl = `${SITE_URL}/api/reservations/respond/${confirmToken}?action=confirm`
  const declineUrl = `${SITE_URL}/api/reservations/respond/${confirmToken}?action=decline`

  // Determine escalation recipients
  const escalationTo: string[] = []
  if (venue.backup_email) escalationTo.push(venue.backup_email)
  // Also re-send to primary if no backup
  if (escalationTo.length === 0) escalationTo.push(venue.contact_email)

  try {
    const resend = getResend()
    await resend.emails.send({
      from: FROM_EMAIL,
      to: escalationTo,
      subject: `URGENT: Reservation Awaiting Response — ${reservation.guest_name}, party of ${reservation.party_size}`,
      html: buildEscalationEmail({
        venueName: venue.name,
        guestName: reservation.guest_name as string,
        guestEmail: reservation.guest_email as string,
        partySize: reservation.party_size as number,
        date: reservation.reservation_date as string,
        time: reservation.reservation_time as string,
        confirmUrl,
        declineUrl,
      }),
    })
  } catch (emailErr) {
    console.error('reservation escalation email failed:', emailErr)
  }

  return NextResponse.json({ escalated: true })
}

function buildEscalationEmail(data: {
  venueName: string
  guestName: string
  guestEmail: string
  partySize: number
  date: string
  time: string
  confirmUrl: string
  declineUrl: string
}) {
  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#0a0a0a;font-family:Arial,sans-serif;color:#ffffff;">
  <div style="max-width:580px;margin:0 auto;padding:40px 24px;">
    <p style="font-size:24px;font-weight:700;letter-spacing:0.1em;margin:0 0 4px;">
      HLPFL<span style="color:#c87941;">.</span>
    </p>
    <p style="font-size:11px;text-transform:uppercase;letter-spacing:0.25em;color:#ef4444;margin:0 0 32px;">⚡ Follow-Up Required</p>

    <p style="color:rgba(255,255,255,0.7);font-size:14px;margin:0 0 24px;">
      A guest is still waiting for a response on their reservation request at
      <strong style="color:#fff;">${data.venueName}</strong>.
      Please respond immediately.
    </p>

    <div style="background:#111111;border:1px solid rgba(239,68,68,0.2);padding:24px;margin-bottom:32px;">
      <table style="width:100%;border-collapse:collapse;">
        <tr><td style="padding:8px 0;border-bottom:1px solid rgba(255,255,255,0.06);color:rgba(255,255,255,0.4);font-size:13px;">Guest</td><td style="padding:8px 0;border-bottom:1px solid rgba(255,255,255,0.06);color:#fff;font-size:13px;text-align:right;font-weight:600;">${data.guestName}</td></tr>
        <tr><td style="padding:8px 0;border-bottom:1px solid rgba(255,255,255,0.06);color:rgba(255,255,255,0.4);font-size:13px;">Date</td><td style="padding:8px 0;border-bottom:1px solid rgba(255,255,255,0.06);color:#fff;font-size:13px;text-align:right;">${data.date} at ${data.time}</td></tr>
        <tr><td style="padding:8px 0;color:rgba(255,255,255,0.4);font-size:13px;">Party Size</td><td style="padding:8px 0;color:#ef4444;font-size:14px;text-align:right;font-weight:700;">${data.partySize} guests</td></tr>
      </table>
    </div>

    <div style="display:flex;gap:16px;margin-bottom:32px;">
      <a href="${data.confirmUrl}" style="flex:1;display:block;background:#22c55e;color:#fff;text-align:center;padding:16px;font-size:14px;font-weight:700;text-decoration:none;text-transform:uppercase;">✓ Confirm</a>
      <a href="${data.declineUrl}" style="flex:1;display:block;background:#ef4444;color:#fff;text-align:center;padding:16px;font-size:14px;font-weight:700;text-decoration:none;text-transform:uppercase;">✕ Decline</a>
    </div>

    <p style="color:rgba(255,255,255,0.2);font-size:11px;">
      The guest is waiting on their confirmation page. Please respond as soon as possible.
    </p>
  </div>
</body>
</html>`
}
