// POST /api/admin/projects/[id]/updates
// Protected by ADMIN_API_KEY header.
// Creates a project_update (author_role = 'admin') and emails the customer via Resend.

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
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  // ── Auth ─────────────────────────────────────────────────────────────────
  const apiKey = req.headers.get('x-admin-api-key')
  if (!apiKey || apiKey !== process.env.ADMIN_API_KEY) {
    return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 })
  }

  const { id: projectId } = await params

  // ── Parse body ────────────────────────────────────────────────────────────
  let body: string
  try {
    const json = await req.json() as { body?: string }
    body = (json.body ?? '').trim()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body.' }, { status: 400 })
  }

  if (!body) {
    return NextResponse.json({ error: 'body is required.' }, { status: 400 })
  }

  const db = createSupabaseAdminClient()

  // ── Fetch project + customer ───────────────────────────────────────────────
  const { data: project, error: projErr } = await db
    .from('projects')
    .select('id,title,customer_id,customers(email,display_name,preferred_language)')
    .eq('id', projectId)
    .single()

  if (projErr || !project) {
    return NextResponse.json({ error: 'Project not found.' }, { status: 404 })
  }

  // ── Insert project update ─────────────────────────────────────────────────
  const { data: update, error: insertErr } = await db
    .from('project_updates')
    .insert({ project_id: projectId, author_role: 'admin', body })
    .select()
    .single()

  if (insertErr || !update) {
    console.error('project update insert error:', insertErr)
    return NextResponse.json({ error: 'Could not save update.' }, { status: 500 })
  }

  // ── Send email notification ────────────────────────────────────────────────
  const customer = (project as unknown as { customers: { email: string; display_name: string | null; preferred_language: string } }).customers
  const portalUrl = `${SITE_URL}/portal/projects/${projectId}`

  try {
    const resend = getResend()
    await resend.emails.send({
      from: FROM_EMAIL,
      to: customer.email,
      subject: `Update on "${project.title}"`,
      html: buildUpdateEmail({
        displayName: customer.display_name ?? customer.email,
        projectTitle: project.title as string,
        updateBody: body,
        portalUrl,
      }),
    })
  } catch (emailErr) {
    console.error('project update email failed:', emailErr)
    // Non-fatal — update is already saved
  }

  return NextResponse.json({ success: true, update_id: update.id })
}

function buildUpdateEmail(data: {
  displayName: string
  projectTitle: string
  updateBody: string
  portalUrl: string
}) {
  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#0a0a0a;font-family:Arial,sans-serif;color:#ffffff;">
  <div style="max-width:580px;margin:0 auto;padding:40px 24px;">
    <p style="font-size:28px;font-weight:700;letter-spacing:0.1em;color:#ffffff;margin:0 0 4px;">
      HLPFL<span style="color:#c87941;">.</span>
    </p>
    <p style="font-size:11px;text-transform:uppercase;letter-spacing:0.25em;color:#c87941;margin:0 0 40px;">Portal</p>

    <h1 style="font-size:22px;font-weight:700;color:#ffffff;margin:0 0 6px;">
      New update on your project
    </h1>
    <p style="color:rgba(255,255,255,0.5);font-size:14px;margin:0 0 32px;">
      Hi ${data.displayName}, there's a new update on <strong style="color:#fff;">${data.projectTitle}</strong>.
    </p>

    <div style="background:#111111;border:1px solid rgba(200,121,65,0.15);padding:24px;margin-bottom:32px;border-radius:2px;">
      <p style="color:rgba(255,255,255,0.7);font-size:14px;line-height:1.7;margin:0;white-space:pre-wrap;">${data.updateBody}</p>
    </div>

    <a href="${data.portalUrl}"
       style="display:inline-block;background:#c87941;color:#ffffff;padding:14px 28px;font-size:13px;font-weight:600;letter-spacing:0.08em;text-decoration:none;text-transform:uppercase;">
      View Project →
    </a>

    <hr style="border:none;border-top:1px solid rgba(255,255,255,0.06);margin:40px 0 24px;">
    <p style="color:rgba(255,255,255,0.2);font-size:11px;margin:0;">
      HLPFL INC · Caribbean Coast, Costa Rica ·
      <a href="mailto:hello@hlpfl.com" style="color:#c87941;">hello@hlpfl.com</a>
    </p>
  </div>
</body>
</html>`
}
