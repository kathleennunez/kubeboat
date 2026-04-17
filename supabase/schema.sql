create table if not exists public.registrations (
  id bigint generated always as identity primary key,
  name text not null,
  email text not null unique,
  company text not null default '',
  dietary_constraints text not null default '',
  refundable_deposit text not null default '',
  privacy_consent boolean not null,
  submitted_at timestamptz not null default now()
);

