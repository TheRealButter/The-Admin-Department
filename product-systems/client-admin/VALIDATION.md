# Client Admin Validation

## Validation purpose

Prove that Client Admin is operationally useful before selling it as a paid pilot.

The system must show whether new clients are welcomed, documents are collected, folders are created, agreement/payment status is tracked, handovers are completed, and onboarding is reported properly.

## Required fields

Every onboarding record must have:

- start date
- client name
- service package
- status
- assigned owner
- welcome status
- document request status
- document checklist status
- agreement status where applicable
- payment status where applicable
- folder status
- internal handover status
- next action for active records

## Status logic

### New Client

Allowed when a client has just been accepted or added.

Must have owner and welcome next action.

### Welcome Sent

Allowed when welcome message is sent.

Must have document/request next action if onboarding needs client input.

### Documents Requested

Use when required documents have been requested.

Must have checklist items.

### Waiting for Client

Use when client input is blocking setup.

Must have missing items and follow-up due date.

### Internal Setup

Use when client has provided enough information and team is preparing folders/handover.

Must have folder and handover status visible.

### Payment/Agreement Pending

Use when payment or signed agreement is blocking delivery.

Must not move to Active until resolved or explicitly approved by client decision-maker.

### Ready to Start

Allowed only when required docs are received, agreement/payment rules are satisfied, folder exists, and internal handover is complete or scheduled.

### Active

Allowed only after readiness checks pass.

### Stuck

Use when onboarding is blocked beyond client-specific threshold.

Must have reason and owner.

## Critical failure conditions

The system fails validation if:

- client can become Active while required docs are missing
- agreement/payment/folder status is not visible
- missing document has no owner or follow-up date
- handover status is unclear
- weekly report counts cannot be traced to tracker and checklist records
- sensitive documents are sent without human approval

## Test scenarios

### CLI-T01 New client intake

Input: accepted client or package is added.

Expected: New Client.

Pass: owner and welcome next action are visible.

### CLI-T02 Welcome and document request

Input: welcome sent and required documents requested.

Expected: Documents Requested.

Pass: checklist exists.

### CLI-T03 Missing document follow-up

Input: required document missing after request.

Expected: Waiting for Client or Documents Requested.

Pass: missing item, owner, and follow-up date are visible.

### CLI-T04 Ready to start gate

Input: documents received, agreement signed, payment verified, folder created, handover complete.

Expected: Ready to Start.

Pass: all readiness conditions visible.

### CLI-T05 Block premature active status

Input: agreement/payment/folder/handover incomplete.

Expected: cannot move to Active.

Pass: blocked reason is visible.

### CLI-T06 Report accuracy

Input: tracker has active, stuck, waiting, payment pending clients.

Expected: weekly report counts match tracker and document checklist.

Pass: no report number is guessed.

## Pilot-ready threshold

Client Admin is pilot-ready when:

- CLI-T01 to CLI-T06 pass
- no critical failure exists
- missing-document checklist works
- owner can understand stuck onboarding cases in under 5 minutes
