// POST /api/admin/documents/upload
// Admin uploads a document on behalf of a customer.
// Expects multipart/form-data: file, customer_id, name?, project_id?, visibility?
// Protected by x-admin-api-key header.

import { NextRequest, NextResponse } from 'next/server'
import { createSupabaseAdminClient } from '@/lib/portal/supabase-server'

export const runtime = 'edge'

export async function POST(req: NextRequest) {
  const apiKey = req.headers.get('x-admin-api-key')
  if (!apiKey || apiKey !== process.env.ADMIN_API_KEY) {
    return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 })
  }

  let formData: FormData
  try {
    formData = await req.formData()
  } catch {
    return NextResponse.json({ error: 'Invalid multipart form data.' }, { status: 400 })
  }

  const file = formData.get('file') as File | null
  const customerId = (formData.get('customer_id') as string | null)?.trim()
  const projectId = (formData.get('project_id') as string | null)?.trim() || null
  const visibility = (formData.get('visibility') as string | null) ?? 'client'
  const nameOverride = (formData.get('name') as string | null)?.trim() || null

  if (!file || !customerId) {
    return NextResponse.json(
      { error: 'file and customer_id are required.' },
      { status: 400 }
    )
  }

  if (!['client', 'internal'].includes(visibility)) {
    return NextResponse.json(
      { error: 'visibility must be client or internal.' },
      { status: 400 }
    )
  }

  const db = createSupabaseAdminClient()

  // Verify customer exists
  const { data: customer, error: custErr } = await db
    .from('customers')
    .select('id')
    .eq('id', customerId)
    .single()

  if (custErr || !customer) {
    return NextResponse.json({ error: 'Customer not found.' }, { status: 404 })
  }

  const fileName = nameOverride ?? file.name
  // Use a UUID-based storage path to prevent any path traversal from user-provided filenames
  const ext = fileName.includes('.') ? `.${fileName.split('.').pop()!.replace(/[^a-z0-9]/gi, '')}` : ''
  const storageName = `${crypto.randomUUID()}${ext}`
  const path = `${customerId}/${storageName}`

  // Upload to Supabase Storage using admin service role
  const fileBuffer = await file.arrayBuffer()
  const { error: storageErr } = await db.storage
    .from('documents')
    .upload(path, fileBuffer, {
      contentType: file.type || 'application/octet-stream',
      upsert: false,
    })

  if (storageErr) {
    console.error('admin doc upload storage error:', storageErr)
    return NextResponse.json(
      { error: `Storage error: ${storageErr.message}` },
      { status: 500 }
    )
  }

  const { data: doc, error: dbErr } = await db.from('documents').insert({
    customer_id: customerId,
    project_id: projectId,
    name: fileName,
    storage_path: path,
    file_type: file.type || null,
    file_size: file.size,
    visibility,
    uploaded_by: 'admin',
  }).select().single()

  if (dbErr || !doc) {
    console.error('admin doc insert error:', dbErr)
    return NextResponse.json({ error: 'Could not save document record.' }, { status: 500 })
  }

  return NextResponse.json({ success: true, document_id: doc.id })
}
