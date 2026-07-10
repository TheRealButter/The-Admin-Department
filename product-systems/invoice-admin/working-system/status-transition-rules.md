# Status Transition Rules — Invoice Admin

These are the manual status rules before automation.

## Allowed status movement

### New → Needs Capture

Use when invoice/document is visible but fields still need to be entered.

Required:

- record exists
- owner assigned
- next action assigned

### Needs Capture → Missing Info

Use when required data cannot be captured from the document.

Required:

- missing info described
- next action assigned
- follow-up due date set

### Needs Capture → Ready for Review

Allowed only when:

- supplier exists
- document type exists
- invoice/reference number exists where applicable
- amount exists where applicable
- document link exists
- assigned owner exists
- no critical missing information

### Ready for Review → Waiting for Approval

Use when human approval is needed.

Required:

- approval owner assigned
- next action describes approval needed

### Ready for Review → Possible Duplicate

Use when duplicate risk appears.

Required:

- duplicate check note
- approval blocked

### Possible Duplicate → Ready for Review

Allowed only when duplicate is cleared.

Required:

- duplicate decision recorded in notes

### Waiting for Approval → Approved

Allowed only when approval owner approves.

Required:

- approval owner present
- approval decision recorded in notes

### Approved → Filed

Allowed only when:

- document link exists
- folder link exists
- file naming convention applied

### Approved → Rejected

Allowed when approval owner rejects.

Required:

- rejection reason recorded

### Filed → Paid

Allowed only when payment status is manually or system-confirmed by trusted source.

Required:

- payment status confirmed

## Blocked movements

### Any status → Approved

Blocked if approval owner is blank.

### Any status → Filed

Blocked if document link or folder link is blank.

### Possible Duplicate → Approved

Blocked until duplicate decision is recorded.

### Missing Info → Approved

Blocked until missing info is resolved.

### New → Filed

Blocked. Must pass capture/review process first.

## Daily control rule

No item should remain in `New` for more than 1 business day.

## Weekly control rule

Every active item must have:

- assigned owner
- next action
- due date where action is time-sensitive
