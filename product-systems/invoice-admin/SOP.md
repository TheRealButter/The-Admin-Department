# Invoice Admin SOP

## Daily routine

### 1. Check intake sources

Check all agreed invoice/document sources:

- Gmail invoice label or inbox
- uploaded documents
- WhatsApp/exported documents
- manual submissions

Every new document must be entered into the invoice tracker before it is filed or approved.

### 2. Capture required fields

Minimum fields:

- supplier name
- document type
- invoice/receipt/reference number
- invoice date
- due date where applicable
- total amount
- VAT amount where applicable
- project/client/category
- document link
- status
- next action

### 3. Run exception checks

Flag the item if:

- invoice number is missing
- supplier is unknown
- VAT number or VAT amount is missing where expected
- amount is unusually high
- due date is overdue or very close
- document is unreadable
- supplier bank details changed
- possible duplicate exists
- approval owner is unclear

### 4. Move to correct status

Use one of:

- New
- Needs Capture
- Missing Info
- Possible Duplicate
- Ready for Review
- Waiting for Approval
- Approved
- Filed
- Rejected
- Paid

### 5. Human approval

A human must approve before:

- marking invoice as approved
- confirming payment readiness
- accepting changed supplier banking details
- overriding duplicate warnings
- rejecting an invoice

### 6. File approved documents

Folder structure:

```text
Client Name /
  Invoice Admin /
    Suppliers /
      Supplier Name /
        2026 /
          07 - July /
    Exceptions /
    Reports /
```

File naming:

```text
YYYY-MM-DD_SupplierName_DocumentType_Reference_Amount.pdf
```

Example:

```text
2026-07-10_ABC-Supplies_Invoice_INV-4521_R1437-50.pdf
```

### 7. Weekly report

Every week, produce a report showing:

- invoices received
- invoices approved
- invoices filed
- missing-info items
- duplicate warnings
- overdue approvals
- unpaid/paid summary if tracked
- next actions

## Escalation rules

Escalate immediately if:

- supplier banking details changed
- invoice amount is above approval threshold
- due date is within 48 hours
- duplicate warning is not resolved
- supplier disputes rejection
- document appears suspicious

## Quality checklist

Before handover or weekly report:

- no invoice is left in New for more than 1 business day
- every Ready for Review item has a document link
- every Missing Info item has a next action
- every Approved item has an approval owner
- filed documents follow naming convention
