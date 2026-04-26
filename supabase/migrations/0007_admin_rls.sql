-- HLPFL Customer Portal — Migration 0007_admin_rls.sql
-- Adds RLS bypass policies so admin users (in the auth.users table) can
-- read all portal data.
--
-- Admins are identified by having a record in public.admin_users.
-- Add your admin email(s) to this table after running the migration.
-- Run AFTER 0006_dinner_reservations.sql

-- ─── ADMIN USERS ─────────────────────────────────────────────────────────────
create table if not exists public.admin_users (
  user_id  uuid primary key references auth.users(id) on delete cascade,
  email    text not null,
  created_at timestamptz default now()
);

-- Only service role can manage admin users
alter table public.admin_users enable row level security;

-- Admins can see their own record (for is_admin() check)
create policy admin_users_self on public.admin_users
  for select using (user_id = auth.uid());

-- ─── HELPER FUNCTION ─────────────────────────────────────────────────────────
create or replace function public.is_admin()
returns boolean
language sql
security definer
stable
as $$
  select exists(
    select 1 from public.admin_users where user_id = auth.uid()
  );
$$;

-- ─── ADMIN BYPASS POLICIES ───────────────────────────────────────────────────
-- These allow admin users to read all data across all portal tables.

-- customers
create policy customers_admin_all on public.customers
  for all using (public.is_admin())
  with check (public.is_admin());

-- projects
create policy projects_admin_all on public.projects
  for all using (public.is_admin())
  with check (public.is_admin());

-- project_updates
create policy project_updates_admin_all on public.project_updates
  for all using (public.is_admin())
  with check (public.is_admin());

-- purchases
create policy purchases_admin_all on public.purchases
  for all using (public.is_admin())
  with check (public.is_admin());

-- message_threads
create policy threads_admin_all on public.message_threads
  for all using (public.is_admin())
  with check (public.is_admin());

-- messages
create policy messages_admin_all on public.messages
  for all using (public.is_admin())
  with check (public.is_admin());

-- bookings (portal bookings table)
create policy portal_bookings_admin_all on public.bookings
  for all using (public.is_admin())
  with check (public.is_admin());

-- booking_resources
create policy resources_admin_all on public.booking_resources
  for all using (public.is_admin())
  with check (public.is_admin());

-- upgrade_suggestions
create policy suggestions_admin_all on public.upgrade_suggestions
  for all using (public.is_admin())
  with check (public.is_admin());

-- intake_responses
create policy intake_admin_all on public.intake_responses
  for all using (public.is_admin())
  with check (public.is_admin());

-- documents
create policy documents_admin_all on public.documents
  for all using (public.is_admin())
  with check (public.is_admin());

-- dinner_venues
create policy dinner_venues_admin_all on public.dinner_venues
  for all using (public.is_admin())
  with check (public.is_admin());

-- dinner_reservations
create policy dinner_res_admin_all on public.dinner_reservations
  for all using (public.is_admin())
  with check (public.is_admin());

-- ─── SEED INSTRUCTIONS ───────────────────────────────────────────────────────
-- After running this migration, add your admin user:
--
--   insert into public.admin_users (user_id, email)
--   select id, email from auth.users where email = 'admin@hlpfl.com';
--
-- The admin user must already exist in Supabase Auth (created via the admin panel login).
