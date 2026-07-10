# Privacy and Access Rules

This repo is public. Do not store real client data here.

## Never commit to GitHub

- real invoices
- real supplier banking details
- real client documents
- real proof of payment documents
- real customer/tenant/patient/member data
- real phone numbers or emails from prospects/clients
- unredacted WhatsApp/email exports
- private folder links
- Supabase keys or API keys

## Demo data rule

All repo examples must be:

- synthetic
- anonymised
- clearly marked as demo
- safe to publish publicly

## Pilot data rule

Real pilot data must live only in a client-approved environment such as:

- client Google Drive
- client Google Sheet
- private Supabase project with access control
- approved shared folder

## Redaction rule

Before using real examples in public material, remove or replace:

- names
- phone numbers
- email addresses
- supplier banking details
- invoice numbers where sensitive
- addresses
- document links
- account numbers
- VAT/tax numbers where not necessary

## Access rule

For each pilot, define:

- who owns the tracker
- who can view
- who can edit
- who can approve
- who receives weekly reports
- who can access folders

## Tool/API key rule

Never commit:

- `.env` files
- service role keys
- API keys
- OAuth tokens
- Supabase anon/service keys
- Google credentials

## First pilot rule

Before the first pilot starts, create a private working environment and keep this public repo as templates, validation logic, docs, and demo assets only.
