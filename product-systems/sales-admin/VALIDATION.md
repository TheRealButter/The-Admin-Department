# Sales Admin Validation

## Validation purpose

Prove that Sales Admin is operationally useful before selling it as a paid pilot.

The system must show whether enquiries are captured, replied to, quoted, followed up, and reported properly.

## Required fields

Every lead record must have:

- received date
- source
- contact name
- contact method where available
- service needed
- urgency
- status
- assigned owner
- first-response status
- next action for active records
- follow-up due date for Quote Sent records

## Status logic

### New

Allowed only when the lead has just entered the tracker.

Fail if still New after same business day.

### Needs Response

Use when a lead has not received first response.

Urgent leads must have immediate owner escalation.

### Contacted

Use when first response has been sent or call made.

Must capture response time where possible.

### Waiting for Client

Use when the prospect must send more information.

Must have next follow-up date.

### Quote Needed

Use when quote/pricing input is required.

Must have quote owner.

### Quote Sent

Allowed only when quote date is captured.

Must have follow-up due date.

### Follow-up Due

Use when the follow-up date is today or overdue.

Must appear in weekly report.

### Won

Use when client accepts or books.

Must have next delivery/scheduling action.

### Lost / Cold

Must capture reason where possible.

## Critical failure conditions

The system fails validation if:

- urgent leads have no owner
- Quote Sent records have no follow-up date
- follow-ups depend on memory outside the tracker
- won/lost/cold outcomes are not recorded
- weekly report open quote value cannot be traced to tracker records
- messages are sent autonomously before human approval rules are agreed

## Test scenarios

### SAL-T01 New urgent lead intake

Input: urgent lead from WhatsApp or website.

Expected: Needs Response.

Pass: owner and urgent next action are visible.

### SAL-T02 First response logged

Input: lead is contacted.

Expected: Contacted or Waiting for Client.

Pass: response status and response time are captured where possible.

### SAL-T03 Quote sent follow-up

Input: quote sent with amount and date.

Expected: Quote Sent with follow-up due date.

Pass: follow-up due date is within 24 to 48 hours unless client-specific rule differs.

### SAL-T04 Overdue follow-up

Input: follow-up date passes without action.

Expected: Follow-up Due.

Pass: record appears in follow-up queue and weekly report.

### SAL-T05 Lost/cold reason

Input: lead is no longer active.

Expected: Lost or Cold.

Pass: reason is captured where possible.

### SAL-T06 Report accuracy

Input: tracker has leads across statuses.

Expected: weekly report counts match tracker counts and open quote value.

Pass: no report number is guessed.

## Pilot-ready threshold

Sales Admin is pilot-ready when:

- SAL-T01 to SAL-T06 pass
- no critical failure exists
- quote follow-up queue works
- owner can understand open leads and overdue follow-ups in under 5 minutes
