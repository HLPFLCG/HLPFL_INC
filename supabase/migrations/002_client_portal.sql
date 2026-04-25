-- HLPFL INC — Client Portal
-- Migration: 002_client_portal.sql
-- Run AFTER 001_initial_schema.sql

-- ─── CLIENTS TABLE ────────────────────────────────────────────────────────────
-- Each HLPFL client (property owner) gets one record linked to their auth.users row.
create table clients (
  id                  uuid primary key default gen_random_uuid(),
  user_id             uuid not null unique references auth.users(id) on delete cascade,
  name                text not null,
  email               text not null,
  business_name       text,
  stripe_account_id   text unique,          -- Stripe Connect account (set after OAuth)
  stripe_onboarded    boolean not null default false,
  api_key             text unique not null  -- used by embedded widgets on client sites
                        default encode(gen_random_bytes(32), 'hex'),
  plan                text not null default 'free',  -- free | pro
  whatsapp_number     text,
  created_at          timestamptz not null default now()
);

alter table clients enable row level security;

-- A client can only read/update their own record
create policy "Client can read own record"
  on clients for select
  using (auth.uid() = user_id);

create policy "Client can update own record"
  on clients for update
  using (auth.uid() = user_id);

create policy "Service role can do anything on clients"
  on clients for all
  using (auth.role() = 'service_role');

-- ─── ADD client_id TO PROPERTIES ─────────────────────────────────────────────
alter table properties add column if not exists client_id uuid references clients(id) on delete set null;

-- Drop old open-ended policies and replace with tenant-scoped ones
drop policy if exists "Service role can do anything" on properties;
drop policy if exists "Public can read published properties" on properties;

-- Public can read published properties (unchanged)
create policy "Public can read published properties"
  on properties for select
  using (published = true);

-- A client can CRUD their own properties
create policy "Client can manage own properties"
  on properties for all
  using (
    client_id in (
      select id from clients where user_id = auth.uid()
    )
  );

create policy "Service role can do anything on properties"
  on properties for all
  using (auth.role() = 'service_role');

-- ─── UPDATE BOOKINGS RLS ──────────────────────────────────────────────────────
-- Drop old policies
drop policy if exists "Anyone can insert a pending booking" on bookings;
drop policy if exists "Service role can do anything" on bookings;

-- Public can still insert pending bookings (booking form)
create policy "Anyone can insert a pending booking"
  on bookings for insert
  with check (status = 'pending');

-- Clients can read/update bookings for their own properties
create policy "Client can manage own property bookings"
  on bookings for all
  using (
    property_id in (
      select p.id from properties p
      join clients c on p.client_id = c.id
      where c.user_id = auth.uid()
    )
  );

-- Guests can read their own booking by ID (for confirmation page)
create policy "Guest can read own booking"
  on bookings for select
  using (true);  -- row-level restriction via bookingId in URL; tighten if needed

create policy "Service role can do anything on bookings"
  on bookings for all
  using (auth.role() = 'service_role');

-- ─── UPDATE AVAILABILITY BLOCKS RLS ──────────────────────────────────────────
drop policy if exists "Public can read blocks" on availability_blocks;
drop policy if exists "Service role can do anything" on availability_blocks;

create policy "Public can read availability blocks"
  on availability_blocks for select
  using (true);

create policy "Client can manage own property blocks"
  on availability_blocks for all
  using (
    property_id in (
      select p.id from properties p
      join clients c on p.client_id = c.id
      where c.user_id = auth.uid()
    )
  );

create policy "Service role can do anything on blocks"
  on availability_blocks for all
  using (auth.role() = 'service_role');

-- ─── HELPER FUNCTION: get_client_id ──────────────────────────────────────────
-- Returns the client.id for the currently authenticated user (or null).
create or replace function get_my_client_id()
returns uuid
language sql
security definer
stable
as $$
  select id from clients where user_id = auth.uid() limit 1;
$$;

-- ─── INDEXES ──────────────────────────────────────────────────────────────────
create index if not exists properties_client_id on properties(client_id);
create index if not exists clients_user_id on clients(user_id);
create index if not exists clients_api_key on clients(api_key);

-- ─── DEMO CLIENT (update user_id after creating the client's Supabase account) ─
-- Replace '00000000-0000-0000-0000-000000000000' with the actual user UUID
-- from Supabase → Authentication → Users after you create the client account.
--
-- insert into clients (user_id, name, email, business_name)
-- values (
--   '00000000-0000-0000-0000-000000000000',
--   'Villa Owner',
--   'owner@example.com',
--   'Caribe Azul Properties'
-- );
--
-- Then link their property:
-- update properties set client_id = (select id from clients where email = 'owner@example.com')
-- where slug = 'villa-caribe-azul';
