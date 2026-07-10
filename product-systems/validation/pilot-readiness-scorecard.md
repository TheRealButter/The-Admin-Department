# Pilot Readiness Scorecard

Use this before any paid pilot.

Score each item:

- 0 = not present
- 1 = present but weak/confusing
- 2 = usable
- 3 = strong and ready

## Section A — Workflow clarity

| Check | Score | Notes |
|---|---:|---|
| System has a clear intake source | | |
| Required fields are defined | | |
| Statuses are clear and non-overlapping | | |
| Every active status has owner/next-action rule | | |
| Stop/go gates are clear | | |

Minimum pass: 12/15

## Section B — Data quality

| Check | Score | Notes |
|---|---:|---|
| Tracker captures minimum required fields | | |
| Missing fields are visible | | |
| Duplicate/conflict checks exist where needed | | |
| Links/folders/documents are traceable | | |
| Report numbers can be traced back to records | | |

Minimum pass: 12/15

## Section C — Exception handling

| Check | Score | Notes |
|---|---:|---|
| Missing info produces clear next action | | |
| Overdue action appears in queue/report | | |
| Approval-needed items are blocked from risky progress | | |
| Stuck records have reason and owner | | |
| Escalation rules are clear | | |

Minimum pass: 12/15

## Section D — Human approval and risk

| Check | Score | Notes |
|---|---:|---|
| Risky actions require human approval | | |
| System does not execute payments | | |
| System does not send autonomous sensitive messages | | |
| Legal/accounting/business judgment is not replaced | | |
| Automation is not required for first manual success | | |

Minimum pass: 13/15

## Section E — Handover usability

| Check | Score | Notes |
|---|---:|---|
| SOP exists | | |
| Templates exist | | |
| Weekly report template exists | | |
| Demo can be explained in under 5 minutes | | |
| Client/admin can run daily routine after handover | | |

Minimum pass: 12/15

## Stop/go decision

### Ready for paid pilot

All sections meet minimum score and no critical failure exists.

### Needs internal test

One section is below minimum, but no critical failure exists.

### Not ready

Any critical failure exists, or two or more sections are below minimum.

## Critical failures

Any one of these blocks paid pilot:

- item can move to final/complete without required fields
- risky action can bypass approval
- weekly report requires guessing
- client cannot understand statuses
- no owner/next action on active records
- automation is required before manual workflow works
