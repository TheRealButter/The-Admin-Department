# Fixes Before Paid Pilot

These fixes must be completed before selling any system as a working paid pilot.

## Priority 1 — Invoice Admin working logic

Build first because Invoice Admin is the strongest pilot candidate.

### Required fixes

- [ ] Add required-field rules
- [ ] Add status transition rules
- [ ] Add exception flag rules
- [ ] Add weekly report calculations
- [ ] Add pilot test results using 10 realistic invoice records

### Required calculated flags

- missing supplier
- missing invoice number
- missing amount
- missing document link
- possible duplicate
- due within 48 hours
- approval owner missing
- approved but not filed
- filed without folder link

### Required report calculations

- invoices received
- ready for review
- waiting for approval
- missing info
- possible duplicates
- filed this week
- overdue next actions

## Priority 2 — Sales Admin working logic

### Required fixes

- [ ] Add required-field rules
- [ ] Add first-response rule
- [ ] Add quote follow-up due rule
- [ ] Add overdue follow-up flag
- [ ] Add weekly report calculations
- [ ] Add pilot test results using 10 realistic leads

### Required calculated flags

- urgent lead with no owner
- urgent lead with no response
- quote sent without follow-up date
- follow-up overdue
- lead has no next action
- lost/cold lead with no reason

### Required report calculations

- leads received
- leads contacted
- needs response
- quotes sent
- follow-ups due
- won leads
- lost/cold leads
- open quote value

## Priority 3 — Client Admin working logic

### Required fixes

- [ ] Add required-field rules
- [ ] Add document checklist rules
- [ ] Add Ready to Start gate
- [ ] Add Active gate
- [ ] Add weekly report calculations
- [ ] Add pilot test results using 5 realistic onboarding cases

### Required calculated flags

- missing required document
- missing agreement
- payment not confirmed
- folder not created
- handover incomplete
- stuck onboarding
- active status blocked

### Required report calculations

- new clients added
- clients waiting for documents
- agreement/payment pending
- ready to start
- active clients
- stuck onboarding cases
- missing-document count

## Priority 4 — Handover proof

For each system:

- [ ] Give SOP to someone who did not build it
- [ ] Ask them to explain daily routine
- [ ] Ask them to process 3 sample records
- [ ] Record confusion points
- [ ] Fix SOP/template wording

## Priority 5 — No-automation discipline

Before automation:

- [ ] Manual workflow works
- [ ] Human approval points are clear
- [ ] Report can be generated manually from data
- [ ] Client understands the system
- [ ] No sensitive action bypasses approval

## First validation sprint

Start with Invoice Admin.

Build the working logic layer, test 10 invoice records, and produce a pass/fail validation report.
