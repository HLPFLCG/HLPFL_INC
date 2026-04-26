-- HLPFL Customer Portal — Migration 0004_auth_trigger.sql
-- Auto-creates a public.customers row whenever a new user signs up.

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
as $$
begin
  insert into public.customers (id, email, preferred_language)
  values (
    new.id,
    new.email,
    coalesce((new.raw_user_meta_data->>'preferred_language'), 'en')
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

-- Drop trigger if it already exists (idempotent)
drop trigger if exists on_auth_user_created on auth.users;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();
