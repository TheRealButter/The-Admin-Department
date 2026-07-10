-- The Admin Department — Admin HQ schema
-- Use this as the internal operating system schema.

create table if not exists clients (
  id uuid primary key default gen_random_uuid(),
  business_name text not null,
  industry text,
  website text,
  status text default 'prospect',
  notes text,
  created_at timestamptz default now()
);

create table if not exists contacts (
  id uuid primary key default gen_random_uuid(),
  client_id uuid references clients(id) on delete cascade,
  name text not null,
  role text,
  email text,
  phone text,
  is_primary boolean default false,
  created_at timestamptz default now()
);

create table if not exists departments (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  description text,
  created_at timestamptz default now()
);

insert into departments (name, description)
values
('Sales Admin', 'Enquiries, leads, quote follow-ups, booking requests, and response tracking'),
('Client Admin', 'Onboarding, welcome process, document collection, folders, and checklists'),
('Invoice Admin', 'Supplier invoices, receipts, documents, approvals, filing, and exceptions'),
('Property Admin', 'Tenants, maintenance, rent, viewings, documents, and owner reports'),
('Practice Admin', 'Bookings, reminders, no-shows, receptionist admin, and practice follow-ups'),
('Member Admin', 'Member onboarding, attendance, payments, churn risk, and reactivation')
on conflict (name) do nothing;

create table if not exists installations (
  id uuid primary key default gen_random_uuid(),
  client_id uuid references clients(id) on delete cascade,
  department_id uuid references departments(id),
  package text,
  setup_price numeric,
  monthly_price numeric,
  status text default 'scoping',
  start_date date,
  go_live_date date,
  owner_name text,
  notes text,
  created_at timestamptz default now()
);

create table if not exists audits (
  id uuid primary key default gen_random_uuid(),
  client_id uuid references clients(id) on delete cascade,
  audit_date date default current_date,
  pain_summary text,
  top_leaks jsonb default '[]'::jsonb,
  recommended_department text,
  quote_low numeric,
  quote_high numeric,
  outcome text default 'draft',
  created_at timestamptz default now()
);

create table if not exists workflows (
  id uuid primary key default gen_random_uuid(),
  installation_id uuid references installations(id) on delete cascade,
  name text not null,
  trigger_source text,
  current_process text,
  future_process text,
  statuses jsonb default '[]'::jsonb,
  approval_points jsonb default '[]'::jsonb,
  escalation_rules jsonb default '[]'::jsonb,
  created_at timestamptz default now()
);

create table if not exists tasks (
  id uuid primary key default gen_random_uuid(),
  client_id uuid references clients(id) on delete cascade,
  installation_id uuid references installations(id) on delete set null,
  title text not null,
  description text,
  status text default 'open',
  priority text default 'normal',
  assigned_to text,
  due_date date,
  created_at timestamptz default now(),
  completed_at timestamptz
);

create table if not exists templates (
  id uuid primary key default gen_random_uuid(),
  department_id uuid references departments(id),
  name text not null,
  channel text,
  body text not null,
  tags text[] default array[]::text[],
  created_at timestamptz default now()
);

create table if not exists support_tickets (
  id uuid primary key default gen_random_uuid(),
  client_id uuid references clients(id) on delete cascade,
  installation_id uuid references installations(id) on delete set null,
  issue text not null,
  status text default 'open',
  priority text default 'normal',
  resolution text,
  created_at timestamptz default now(),
  resolved_at timestamptz
);

create table if not exists reports (
  id uuid primary key default gen_random_uuid(),
  client_id uuid references clients(id) on delete cascade,
  installation_id uuid references installations(id) on delete set null,
  report_period text,
  metrics jsonb default '{}'::jsonb,
  summary text,
  next_actions jsonb default '[]'::jsonb,
  created_at timestamptz default now()
);

create table if not exists case_studies (
  id uuid primary key default gen_random_uuid(),
  client_id uuid references clients(id) on delete cascade,
  title text not null,
  problem text,
  solution text,
  results text,
  metrics jsonb default '{}'::jsonb,
  permission_to_publish boolean default false,
  created_at timestamptz default now()
);

-- ---------------------------------------------------------------------------
-- Row Level Security — REQUIRED before this schema touches a Supabase project.
-- Supabase exposes every table in the public schema through PostgREST; without
-- RLS, anyone holding the project's public anon key can read and write all
-- client PII, pricing, and tickets. Enabling RLS with no policies denies all
-- anon/authenticated access (deny-by-default); the service role bypasses RLS
-- for internal tooling. Add explicit policies before granting any client app
-- direct table access.
alter table clients enable row level security;
alter table contacts enable row level security;
alter table departments enable row level security;
alter table installations enable row level security;
alter table audits enable row level security;
alter table workflows enable row level security;
alter table tasks enable row level security;
alter table templates enable row level security;
alter table support_tickets enable row level security;
alter table reports enable row level security;
alter table case_studies enable row level security;

-- Covering indexes for foreign keys: without these, every cascade or join
-- from clients/installations sequential-scans the child tables.
create index if not exists contacts_client_idx on contacts(client_id);
create index if not exists installations_client_idx on installations(client_id);
create index if not exists installations_department_idx on installations(department_id);
create index if not exists audits_client_idx on audits(client_id);
create index if not exists workflows_installation_idx on workflows(installation_id);
create index if not exists tasks_client_idx on tasks(client_id);
create index if not exists tasks_installation_idx on tasks(installation_id);
create index if not exists support_tickets_client_idx on support_tickets(client_id);
create index if not exists reports_client_idx on reports(client_id);
create index if not exists case_studies_client_idx on case_studies(client_id);
create index if not exists templates_department_idx on templates(department_id);
create index if not exists support_tickets_installation_idx on support_tickets(installation_id);
create index if not exists reports_installation_idx on reports(installation_id);
