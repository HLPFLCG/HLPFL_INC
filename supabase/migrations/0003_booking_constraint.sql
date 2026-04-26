-- HLPFL Customer Portal — Migration 0003_booking_constraint.sql
-- Adds EXCLUDE constraint to prevent double-booking the same resource.
-- Requires btree_gist extension (created in 0001).
-- Run AFTER 0001_init_public.sql.

alter table public.bookings
  add constraint no_double_booking
  exclude using gist (
    resource_id with =,
    time_range  with &&
  )
  where (status in ('pending','confirmed'));
