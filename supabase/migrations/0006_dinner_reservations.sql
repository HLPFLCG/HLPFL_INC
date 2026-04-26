-- HLPFL Customer Portal — Migration 0006_dinner_reservations.sql
-- Dinner / experience reservation system with 30-second confirmation flow.
-- Run AFTER 0005_documents.sql

-- ─── DINNER VENUES ────────────────────────────────────────────────────────────
create table if not exists public.dinner_venues (
  id               uuid primary key default uuid_generate_v4(),
  name             text not null,
  location         text,
  cuisine          text,
  contact_email    text not null,
  backup_email     text,                     -- escalation address (25-second timeout)
  max_party_size   integer not null default 20,
  active           boolean not null default true,
  created_at       timestamptz default now()
);

alter table public.dinner_venues enable row level security;

-- Authenticated users can browse active venues when making a reservation
create policy dinner_venues_auth_select on public.dinner_venues
  for select to authenticated
  using (active = true);

-- ─── DINNER RESERVATIONS ──────────────────────────────────────────────────────
create table if not exists public.dinner_reservations (
  id                uuid primary key default uuid_generate_v4(),
  customer_id       uuid not null references public.customers(id) on delete cascade,
  venue_id          uuid not null references public.dinner_venues(id),
  guest_name        text not null,
  guest_email       text not null,
  party_size        integer not null check (party_size > 0 and party_size <= 50),
  reservation_date  date not null,
  reservation_time  time not null,
  special_requests  text,
  -- status machine: pending → confirmed | declined | expired
  status            text not null default 'pending'
                      check (status in ('pending', 'confirmed', 'declined', 'expired')),
  -- one-click token sent to the restaurant — no login required
  confirm_token     text unique not null
                      default encode(gen_random_bytes(32), 'hex'),
  token_expires_at  timestamptz not null default now() + interval '2 hours',
  confirmed_at      timestamptz,
  declined_at       timestamptz,
  escalated_at      timestamptz,           -- when the 25-second backup email was sent
  created_at        timestamptz default now()
);

alter table public.dinner_reservations enable row level security;

-- Customers can see and insert their own reservations
create policy dinner_res_owner_select on public.dinner_reservations
  for select using (customer_id = auth.uid());

create policy dinner_res_owner_insert on public.dinner_reservations
  for insert with check (customer_id = auth.uid() and status = 'pending');

-- Supabase Realtime — enable publication for live status updates to the guest's browser.
-- Run this separately once (not idempotent via standard migration tools):
--   alter publication supabase_realtime add table public.dinner_reservations;

-- ─── INDEXES ──────────────────────────────────────────────────────────────────
create index if not exists idx_dinner_res_customer  on public.dinner_reservations(customer_id);
create index if not exists idx_dinner_res_token     on public.dinner_reservations(confirm_token);
create index if not exists idx_dinner_res_status    on public.dinner_reservations(status);
create index if not exists idx_dinner_res_date      on public.dinner_reservations(reservation_date);
