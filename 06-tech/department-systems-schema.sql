-- The Admin Department — Department systems schema
-- This schema supports the first sellable systems: Invoice Admin, Sales Admin, and Client Admin.

create table if not exists invoice_admin_items (
  id uuid primary key default gen_random_uuid(),
  client_id uuid references clients(id) on delete cascade,
  received_date date default current_date,
  source text,
  supplier_name text not null,
  supplier_contact text,
  document_type text,
  invoice_number text,
  invoice_date date,
  due_date date,
  amount_ex_vat numeric,
  vat_amount numeric,
  total_amount numeric,
  currency text default 'ZAR',
  project_or_client text,
  category text,
  status text default 'New',
  priority text default 'Normal',
  assigned_to text,
  approval_owner text,
  payment_status text,
  document_link text,
  folder_link text,
  missing_info text,
  duplicate_check text,
  notes text,
  next_action text,
  next_action_due date,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists sales_admin_leads (
  id uuid primary key default gen_random_uuid(),
  client_id uuid references clients(id) on delete cascade,
  received_date date default current_date,
  source text,
  contact_name text not null,
  company_name text,
  phone text,
  email text,
  service_needed text,
  location text,
  urgency text default 'Normal',
  status text default 'New',
  assigned_to text,
  first_response_sent boolean default false,
  first_response_time text,
  quote_needed boolean default false,
  quote_sent_date date,
  quote_amount numeric,
  follow_up_due date,
  next_action text,
  outcome text,
  notes text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists client_admin_onboarding (
  id uuid primary key default gen_random_uuid(),
  client_id uuid references clients(id) on delete cascade,
  start_date date default current_date,
  client_name text not null,
  company_name text,
  primary_contact text,
  email text,
  phone text,
  service_package text,
  status text default 'New Client',
  assigned_to text,
  welcome_sent boolean default false,
  documents_requested boolean default false,
  documents_received text default 'No',
  agreement_status text,
  payment_status text,
  folder_created boolean default false,
  folder_link text,
  internal_handover boolean default false,
  next_action text,
  next_action_due date,
  notes text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create index if not exists invoice_admin_items_client_status_idx on invoice_admin_items(client_id, status);
create index if not exists invoice_admin_items_due_idx on invoice_admin_items(next_action_due, due_date);
create index if not exists sales_admin_leads_client_status_idx on sales_admin_leads(client_id, status);
create index if not exists sales_admin_leads_followup_idx on sales_admin_leads(follow_up_due);
create index if not exists client_admin_onboarding_client_status_idx on client_admin_onboarding(client_id, status);
create index if not exists client_admin_onboarding_next_action_idx on client_admin_onboarding(next_action_due);

-- ---------------------------------------------------------------------------
-- Row Level Security — REQUIRED before this schema touches a Supabase project.
-- Enabling RLS with no policies denies all anon/authenticated access
-- (deny-by-default); the service role bypasses RLS for internal tooling.
-- Add explicit policies before granting any client app direct table access.
alter table invoice_admin_items enable row level security;
alter table sales_admin_leads enable row level security;
alter table client_admin_onboarding enable row level security;
