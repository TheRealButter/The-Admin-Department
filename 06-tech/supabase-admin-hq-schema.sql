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
