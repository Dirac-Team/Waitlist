-- Waitlist columns for the six-question flow (run in Supabase SQL Editor).

-- 1) Add columns that are not already on your table.
--    You already have: id, email, created_at, role — reuse `role` for
--    “Which best describes your role?” (agency owner, creator, etc.).
alter table waitlist add column if not exists reply_pct text;
alter table waitlist add column if not exists frustration text;
alter table waitlist add column if not exists inbox_role text;
alter table waitlist add column if not exists cost_of_miss text;
alter table waitlist add column if not exists email_types text;

-- 2) Remove legacy fields from the old form (safe to run multiple times).
alter table waitlist drop column if exists heard_from;
alter table waitlist drop column if exists messaging_apps;

-- 3) If you added a jsonb `survey` column earlier, remove it now that we use real columns.
alter table waitlist drop column if exists survey;
