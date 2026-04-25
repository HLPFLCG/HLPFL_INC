import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase'

// Allow any origin — this endpoint is intentionally public.
// It returns only date ranges, never personal data.
const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=120',
}

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: CORS })
}

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params

  try {
    const db = createServerClient()

    // Resolve property
    const { data: property, error: propErr } = await db
      .from('properties')
      .select('id, name, slug, max_guests, base_rate_cents, cleaning_fee_cents')
      .eq('slug', slug)
      .eq('published', true)
      .single()

    if (propErr || !property) {
      return NextResponse.json({ error: 'Property not found' }, { status: 404, headers: CORS })
    }

    // Fetch confirmed bookings
    const { data: bookings } = await db
      .from('bookings')
      .select('check_in, check_out')
      .eq('property_id', property.id)
      .eq('status', 'confirmed')

    // Fetch availability blocks
    const { data: blocks } = await db
      .from('availability_blocks')
      .select('start_date, end_date')
      .eq('property_id', property.id)

    const unavailable = [
      ...(bookings ?? []).map(b => ({ start: b.check_in, end: b.check_out })),
      ...(blocks ?? []).map(b => ({ start: b.start_date, end: b.end_date })),
    ]

    return NextResponse.json(
      {
        property: {
          slug: property.slug,
          name: property.name,
          max_guests: property.max_guests,
          base_rate_cents: property.base_rate_cents,
          cleaning_fee_cents: property.cleaning_fee_cents,
        },
        unavailable,
        generated_at: new Date().toISOString(),
      },
      { headers: CORS }
    )
  } catch (err) {
    console.error('Availability API error:', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500, headers: CORS })
  }
}
