-- HLPFL Customer Portal — Migration 0002_rls_public.sql
-- Run AFTER 0001_init_public.sql

alter table public.customers            enable row level security;
alter table public.projects             enable row level security;
alter table public.project_updates      enable row level security;
alter table public.purchases            enable row level security;
alter table public.message_threads      enable row level security;
alter table public.messages             enable row level security;
alter table public.bookings             enable row level security;
alter table public.upgrade_suggestions  enable row level security;
alter table public.booking_resources    enable row level security;
alter table public.intake_responses     enable row level security;

-- ─── customers ────────────────────────────────────────────────────────────────
create policy customer_self_select on public.customers
  for select using (auth.uid() = id);

create policy customer_self_update on public.customers
  for update using (auth.uid() = id);

-- ─── projects ─────────────────────────────────────────────────────────────────
create policy projects_owner_select on public.projects
  for select using (customer_id = auth.uid());

-- ─── project_updates ──────────────────────────────────────────────────────────
create policy project_updates_owner_select on public.project_updates
  for select using (
    exists (
      select 1 from public.projects p
      where p.id = project_updates.project_id
        and p.customer_id = auth.uid()
    )
  );

create policy project_updates_owner_insert on public.project_updates
  for insert with check (
    author_role = 'customer'
    and exists (
      select 1 from public.projects p
      where p.id = project_updates.project_id
        and p.customer_id = auth.uid()
    )
  );

-- ─── purchases ────────────────────────────────────────────────────────────────
create policy purchases_owner_select on public.purchases
  for select using (customer_id = auth.uid());

-- ─── message_threads ──────────────────────────────────────────────────────────
create policy threads_owner_select on public.message_threads
  for select using (customer_id = auth.uid());

create policy threads_owner_insert on public.message_threads
  for insert with check (customer_id = auth.uid());

-- ─── messages ─────────────────────────────────────────────────────────────────
create policy messages_owner_select on public.messages
  for select using (
    exists (
      select 1 from public.message_threads t
      where t.id = messages.thread_id
        and t.customer_id = auth.uid()
    )
  );

create policy messages_owner_insert on public.messages
  for insert with check (
    sender_role = 'customer'
    and exists (
      select 1 from public.message_threads t
      where t.id = messages.thread_id
        and t.customer_id = auth.uid()
    )
  );

-- ─── bookings ─────────────────────────────────────────────────────────────────
create policy bookings_owner_select on public.bookings
  for select using (customer_id = auth.uid());

create policy bookings_owner_insert on public.bookings
  for insert with check (customer_id = auth.uid() and status = 'pending');

-- ─── booking_resources ────────────────────────────────────────────────────────
create policy resources_authenticated_select on public.booking_resources
  for select to authenticated using (active = true);

-- ─── upgrade_suggestions ──────────────────────────────────────────────────────
create policy suggestions_owner_select on public.upgrade_suggestions
  for select using (customer_id = auth.uid());

create policy suggestions_owner_dismiss on public.upgrade_suggestions
  for update using (customer_id = auth.uid())
  with check (customer_id = auth.uid());

-- ─── intake_responses ─────────────────────────────────────────────────────────
create policy intake_owner_all on public.intake_responses
  for all using (customer_id = auth.uid())
  with check (customer_id = auth.uid());
