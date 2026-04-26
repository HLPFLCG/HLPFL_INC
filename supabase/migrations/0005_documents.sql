-- HLPFL Customer Portal — Migration 0005_documents.sql
-- Document vault: per-project file storage with admin/client visibility.
-- Run AFTER 0004_auth_trigger.sql

-- ─── DOCUMENTS ────────────────────────────────────────────────────────────────
create table if not exists public.documents (
  id            uuid primary key default uuid_generate_v4(),
  project_id    uuid references public.projects(id) on delete cascade,
  customer_id   uuid not null references public.customers(id) on delete cascade,
  name          text not null,
  storage_path  text not null,          -- path in Supabase Storage bucket "documents"
  file_type     text,                   -- MIME type
  file_size     integer,                -- bytes
  visibility    text not null default 'client'
                  check (visibility in ('client', 'internal')),
  uploaded_by   text not null default 'admin'
                  check (uploaded_by in ('admin', 'customer')),
  created_at    timestamptz default now()
);

alter table public.documents enable row level security;

-- Customers can see documents where visibility = 'client' and they own the customer record
create policy documents_client_select on public.documents
  for select
  using (
    customer_id = auth.uid()
    and visibility = 'client'
  );

-- Customers can upload their own documents
create policy documents_client_insert on public.documents
  for insert
  with check (
    customer_id = auth.uid()
    and uploaded_by = 'customer'
  );

-- ─── INDEXES ──────────────────────────────────────────────────────────────────
create index if not exists idx_documents_customer_id on public.documents(customer_id);
create index if not exists idx_documents_project_id  on public.documents(project_id);
create index if not exists idx_documents_visibility  on public.documents(visibility);
