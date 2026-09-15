-- Run this once in Supabase: Dashboard -> SQL Editor -> New query -> paste -> Run.

create extension if not exists pgcrypto;

create table if not exists people (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  pin text not null,
  created_at timestamptz not null default now()
);

create table if not exists prayer_logs (
  id uuid primary key default gen_random_uuid(),
  person_id uuid not null references people(id) on delete cascade,
  prayer_date date not null,
  prayer text not null check (prayer in ('Fajr','Zuhr','Asr','Maghrib','Isha')),
  status text not null check (status in ('completed','missed','unrecorded')),
  updated_at timestamptz not null default now(),
  unique (person_id, prayer_date, prayer)
);

-- Row Level Security: the anon key is public (it ships in your frontend JS),
-- so nothing sensitive should ever be readable through a plain table policy.
-- The `pin` column is only ever touched inside verify_or_create_pin below,
-- which runs as a security-definer function and is never selected directly.
alter table people enable row level security;
alter table prayer_logs enable row level security;

-- No select/insert/update policies are created on `people` — the anon key
-- cannot query it directly at all. All access goes through the function.

-- prayer_logs is readable/writable by anyone holding the anon key. That's
-- intentional for Group Progress (everyone can see everyone's tally), and
-- an acceptable trade-off for a closed group of friends using a PIN rather
-- than full account auth. Do not reuse this schema for sensitive data.
create policy "read prayer logs" on prayer_logs for select using (true);
create policy "insert prayer logs" on prayer_logs for insert with check (true);
create policy "update prayer logs" on prayer_logs for update using (true);

-- Checks a name+PIN pair. First time a name is used, it registers that PIN.
-- After that, the PIN must match. Returns a null id on a wrong PIN.
create or replace function verify_or_create_pin(p_name text, p_pin text)
returns table(id uuid)
language plpgsql
security definer
set search_path = public
as $$
declare
  existing_id uuid;
  existing_pin text;
begin
  select people.id, people.pin into existing_id, existing_pin
  from people where people.name = p_name;

  if existing_id is null then
    insert into people(name, pin) values (p_name, p_pin)
    returning people.id into existing_id;
    return query select existing_id;
  elsif existing_pin = p_pin then
    return query select existing_id;
  else
    return query select null::uuid;
  end if;
end;
$$;

grant execute on function verify_or_create_pin(text, text) to anon;
