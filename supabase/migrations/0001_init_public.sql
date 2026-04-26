-- HLPFL Customer Portal — Migration 0001_init_public.sql
-- Run in Supabase SQL editor or via: supabase db push

create extension if not exists "uuid-ossp";
create extension if not exists "btree_gist";

-- ─── CUSTOMERS ────────────────────────────────────────────────────────────────
create table if not exists public.customers (
  id                  uuid primary key references auth.users(id) on delete cascade,
  email               text not null unique,
  display_name        text,
  business_name       text,
  business_type       text,
  preferred_language  text default 'en' check (preferred_language in ('en','es')),
  encrypted_phone     text,
  encrypted_address   text,
  encrypted_notes     text,
  stripe_customer_id  text unique,
  onboarded_at        timestamptz,
  intake_completed    boolean default false,
  created_at          timestamptz default now(),
  updated_at          timestamptz default now()
);

-- ─── PROJECTS ─────────────────────────────────────────────────────────────────
create table if not exists public.projects (
  id                       uuid primary key default uuid_generate_v4(),
  customer_id              uuid not null references public.customers(id) on delete cascade,
  title                    text not null,
  description              text,
  status                   text not null default 'planning'
                             check (status in ('intake','planning','in_progress','review','delivered','closed')),
  service_type             text,
  estimated_delivery_date  date,
  delivered_at             timestamptz,
  created_at               timestamptz default now(),
  updated_at               timestamptz default now()
);

-- ─── PROJECT UPDATES ──────────────────────────────────────────────────────────
create table if not exists public.project_updates (
  id          uuid primary key default uuid_generate_v4(),
  project_id  uuid not null references public.projects(id) on delete cascade,
  author_role text not null check (author_role in ('admin','customer')),
  body        text not null,
  created_at  timestamptz default now()
);

-- ─── PURCHASES ────────────────────────────────────────────────────────────────
create table if not exists public.purchases (
  id                          uuid primary key default uuid_generate_v4(),
  customer_id                 uuid not null references public.customers(id) on delete cascade,
  stripe_payment_intent_id    text unique,
  stripe_checkout_session_id  text unique,
  product_sku                 text not null,
  amount_cents                integer not null,
  currency                    text default 'usd',
  status                      text not null check (status in ('pending','paid','refunded','failed')),
  metadata                    jsonb,
  created_at                  timestamptz default now()
);

-- ─── MESSAGE THREADS ──────────────────────────────────────────────────────────
create table if not exists public.message_threads (
  id               uuid primary key default uuid_generate_v4(),
  customer_id      uuid not null references public.customers(id) on delete cascade,
  subject          text,
  last_message_at  timestamptz default now(),
  created_at       timestamptz default now()
);

-- ─── MESSAGES ─────────────────────────────────────────────────────────────────
create table if not exists public.messages (
  id                   uuid primary key default uuid_generate_v4(),
  thread_id            uuid not null references public.message_threads(id) on delete cascade,
  sender_role          text not null check (sender_role in ('admin','customer')),
  body                 text not null,
  read_by_recipient_at timestamptz,
  created_at           timestamptz default now()
);

-- ─── BOOKING RESOURCES ────────────────────────────────────────────────────────
create table if not exists public.booking_resources (
  id                   uuid primary key default uuid_generate_v4(),
  name                 text not null,
  resource_type        text not null,   -- 'lodging','tour','vehicle','consultation'
  description          text,
  active               boolean default true,
  external_provider    text,            -- 'hotelbeds','viator','direct','gyg'
  external_resource_id text             -- their ID for resale model
);

-- ─── BOOKINGS ─────────────────────────────────────────────────────────────────
create table if not exists public.bookings (
  id                 uuid primary key default uuid_generate_v4(),
  customer_id        uuid not null references public.customers(id) on delete cascade,
  resource_id        uuid not null references public.booking_resources(id),
  time_range         tstzrange not null,
  status             text not null default 'pending'
                       check (status in ('pending','confirmed','cancelled','completed')),
  guest_count        integer default 1,
  notes              text,
  external_reference text,             -- confirmation # from upstream
  amount_cents       integer,
  created_at         timestamptz default now()
);

-- ─── UPGRADE SUGGESTIONS ──────────────────────────────────────────────────────
create table if not exists public.upgrade_suggestions (
  id                    uuid primary key default uuid_generate_v4(),
  customer_id           uuid not null references public.customers(id) on delete cascade,
  rule_id               text not null,
  title                 text not null,
  reason                text not null,
  suggested_sku         text not null,
  estimated_value_cents integer,
  dismissed_at          timestamptz,
  acted_on_at           timestamptz,
  created_at            timestamptz default now()
);

-- ─── INTAKE RESPONSES ─────────────────────────────────────────────────────────
create table if not exists public.intake_responses (
  id           uuid primary key default uuid_generate_v4(),
  customer_id  uuid not null references public.customers(id) on delete cascade,
  question_key text not null,
  answer       jsonb not null,
  created_at   timestamptz default now(),
  unique (customer_id, question_key)
);

-- ─── INDEXES ──────────────────────────────────────────────────────────────────
create index if not exists idx_projects_customer_id         on public.projects(customer_id);
create index if not exists idx_purchases_customer_id        on public.purchases(customer_id);
create index if not exists idx_messages_thread_id           on public.messages(thread_id);
create index if not exists idx_bookings_customer_id         on public.bookings(customer_id);
create index if not exists idx_bookings_gist                on public.bookings using gist (resource_id, time_range);
create index if not exists idx_suggestions_customer_active  on public.upgrade_suggestions(customer_id) where dismissed_at is null;
