# Admin Systems Validation

This folder exists to prove that the admin systems actually work before we sell or expand them.

A buyer-facing page is not enough. Each system must pass workflow tests using realistic records before it is used in a paid pilot.

## Systems under validation

1. Invoice Admin Setup
2. Sales Admin Setup
3. Client Admin Setup

## Validation gates

Each system must pass these gates:

### 1. Intake gate

Can a real item enter the system from the normal source?

Examples:

- invoice from email/PDF/upload
- lead from WhatsApp/form/call/email
- new client from accepted proposal/payment/agreement

### 2. Required-field gate

Does the system clearly show what minimum fields are required before the item can move forward?

### 3. Status gate

Can the item move through clear statuses without confusion?

Every active item must have:

- status
- owner
- next action
- next action due date where relevant

### 4. Exception gate

Does the system catch the things that usually break the workflow?

Examples:

- missing invoice details
- duplicate invoice
- urgent lead not contacted
- quote sent with no follow-up date
- client onboarding without agreement/payment/folder check

### 5. Approval gate

Does the system keep human approval where risk exists?

Examples:

- invoice approval
- payment readiness
- quote decision
- sensitive document sending
- client marked active

### 6. Report gate

Can the weekly report be produced from the tracker without guessing?

The report must show counts, stuck items, owner decisions, and next actions.

### 7. Handover gate

Can a normal admin person understand how to run the system daily?

If the system needs the founder to explain everything every time, it fails.

## Pass standard

A system is pilot-ready only if:

- all critical tests pass
- no active item has status without owner
- no active item has owner without next action
- no risky item bypasses approval
- weekly report can be produced from tracker fields
- demo can be explained in under 5 minutes

## Fail standard

A system fails if:

- statuses are vague
- fields are missing but not flagged
- follow-ups depend on memory
- reports require manual guessing
- automation is needed before the workflow makes sense
- client cannot understand the system after handover

## Rule

Manual first. Controlled workflow first. Automation only after the workflow passes validation.
