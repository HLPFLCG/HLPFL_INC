-- HLPFL INC — Vacation Rental Platform
-- Migration: 001_initial_schema.sql
-- Run this in your Supabase SQL editor or via CLI: supabase db push

-- ─── EXTENSIONS ───────────────────────────────────────────────────────────────
create extension if not exists "pgcrypto";

-- ─── ENUMS ────────────────────────────────────────────────────────────────────
create type booking_status as enum ('pending', 'confirmed', 'cancelled', 'completed');

-- ─── PROPERTIES ───────────────────────────────────────────────────────────────
create table properties (
  id              uuid primary key default gen_random_uuid(),
  slug            text unique not null,
  name            text not null,
  description     text not null,
  location        text not null,
  bedrooms        integer not null default 1,
  bathrooms       integer not null default 1,
  max_guests      integer not null default 2,
  base_rate_cents integer not null,          -- nightly rate in cents (USD)
  cleaning_fee_cents integer not null default 0,
  amenities       jsonb not null default '[]',  -- string[]
  photos          jsonb not null default '[]',  -- {url: string, alt: string}[]
  published       boolean not null default false,
  created_at      timestamptz not null default now()
);

alter table properties enable row level security;
create policy "Public can read published properties"
  on properties for select
  using (published = true);
create policy "Service role can do anything"
  on properties for all
  using (auth.role() = 'service_role');

-- ─── BOOKINGS ─────────────────────────────────────────────────────────────────
create table bookings (
  id                      uuid primary key default gen_random_uuid(),
  property_id             uuid not null references properties(id) on delete restrict,
  guest_name              text not null,
  guest_email             text not null,
  guest_phone             text not null,
  check_in                date not null,
  check_out               date not null,
  guest_count             integer not null,
  total_cents             integer not null,
  status                  booking_status not null default 'pending',
  stripe_payment_link_id  text,
  stripe_payment_intent_id text,
  created_at              timestamptz not null default now(),

  constraint check_out_after_check_in check (check_out > check_in),
  constraint positive_guests check (guest_count > 0)
);

alter table bookings enable row level security;
-- Guests can only see their own booking (via bookingId in URL — no auth needed for confirmation page)
create policy "Anyone can insert a pending booking"
  on bookings for insert
  with check (status = 'pending');
create policy "Service role can do anything"
  on bookings for all
  using (auth.role() = 'service_role');

-- ─── AVAILABILITY BLOCKS ──────────────────────────────────────────────────────
create table availability_blocks (
  id          uuid primary key default gen_random_uuid(),
  property_id uuid not null references properties(id) on delete cascade,
  start_date  date not null,
  end_date    date not null,
  reason      text,
  created_at  timestamptz not null default now(),

  constraint end_after_start check (end_date > start_date)
);

alter table availability_blocks enable row level security;
create policy "Public can read blocks"
  on availability_blocks for select
  using (true);
create policy "Service role can do anything"
  on availability_blocks for all
  using (auth.role() = 'service_role');

-- ─── INDEXES ──────────────────────────────────────────────────────────────────
create index bookings_property_dates on bookings(property_id, check_in, check_out);
create index bookings_status on bookings(status);
create index blocks_property_dates on availability_blocks(property_id, start_date, end_date);

-- ─── SEED: Puerto Viejo Oceanfront Villa ──────────────────────────────────────
insert into properties (
  slug,
  name,
  description,
  location,
  bedrooms,
  bathrooms,
  max_guests,
  base_rate_cents,
  cleaning_fee_cents,
  amenities,
  photos,
  published
) values (
  'villa-caribe-azul',
  'Villa Caribe Azul',
  'Waking up 30 meters from the Caribbean Sea is exactly what this villa was built for. Two bedrooms, a wraparound porch, and the sound of howler monkeys at sunrise. No hotel, no front desk, no checkout line. Just yours for the week.',
  'Puerto Viejo de Talamanca, Limón, Costa Rica',
  2,
  2,
  6,
  18500,   -- $185/night
  12000,   -- $120 cleaning fee
  '["Oceanfront","Private porch","Fully equipped kitchen","Free WiFi","Air conditioning","Hot water","Outdoor shower","Beach chairs & towels","BBQ grill","Secure parking","Ceiling fans","Mosquito nets","Local host support"]',
  '[
    {"url": "/stays/villa-caribe-azul/photo-1.jpg", "alt": "Oceanfront view from wraparound porch"},
    {"url": "/stays/villa-caribe-azul/photo-2.jpg", "alt": "Living room with ocean view"},
    {"url": "/stays/villa-caribe-azul/photo-3.jpg", "alt": "Master bedroom with king bed"},
    {"url": "/stays/villa-caribe-azul/photo-4.jpg", "alt": "Second bedroom with two singles"},
    {"url": "/stays/villa-caribe-azul/photo-5.jpg", "alt": "Fully equipped kitchen"},
    {"url": "/stays/villa-caribe-azul/photo-6.jpg", "alt": "Outdoor shower and garden"}
  ]',
  true
);
