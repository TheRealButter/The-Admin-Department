# Next Build — Make the Systems Work

## Current truth

The systems are not yet paid-pilot ready.

They are:

- designed
- packaged
- demoable
- workflow-defined
- partially validation-ready

But they still need live working logic in Google Sheets/Supabase before they can be called working systems.

## Build order

### Step 1 — Finish Invoice Admin live sheet

Create real Google Sheet with:

- `invoice-tracker-v1.csv`
- formulas from `google-sheets-formulas.md`
- conditional formatting
- weekly report calculations
- 10-record test data

Output:

- pass/fail screenshot or notes
- corrected formulas if any break
- final pilot-ready verdict

### Step 2 — Build Sales Admin logic layer

Create:

- `sales-tracker-v1.csv`
- formula rules
- 10-record test data
- test-run results

### Step 3 — Build Client Admin logic layer

Create:

- `client-onboarding-v1.csv`
- formula rules
- 5-case test data
- test-run results

### Step 4 — Handover test

Give each system to a tester and confirm they can run it without builder explanation.

### Step 5 — Private pilot environment

Create a private Google Drive/Supabase working environment for real client data.

## Stop condition

Do not sell as a working system until Invoice Admin passes its live sheet validation.
