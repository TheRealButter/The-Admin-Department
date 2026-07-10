# Invoice Admin System

## Product promise

Stop losing invoices in email. Capture, check, file, and approve supplier documents in one clean workflow.

## Best-fit clients

- bookkeepers
- accountants
- property managers
- construction companies
- admin-heavy SMEs
- tender/admin-heavy businesses
- small retailers and wholesalers

## Pain this system fixes

Invoices and supplier documents are scattered across email, WhatsApp, PDFs, staff downloads, and folders. Nobody has a clean answer for what has been received, what is missing, what needs approval, and what has already been filed.

## Workflow

1. Invoice or document arrives by email, upload, WhatsApp export, or manual entry.
2. Item is added to the invoice tracker.
3. Supplier is matched or created.
4. Key fields are captured: invoice number, date, due date, amount, VAT, supplier, category, project/client, payment status.
5. System checks for missing fields, duplicates, high-value approvals, and document availability.
6. Item moves into the correct status.
7. Approved items are filed into the correct folder.
8. Weekly report shows received, approved, pending, missing, duplicate, and overdue items.

## Statuses

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

## Human approval rule

The system may prepare extraction, filing suggestions, and summaries, but a person must approve:

- invoice acceptance
- payment readiness
- duplicate override
- supplier changes
- any payment-related action

## MVP install components

- invoice tracker
- supplier tracker
- exception queue
- folder structure
- message templates
- weekly report template
- SOP
- demo data

## Automation candidates after manual validation

- Gmail label intake
- attachment saving
- OCR/extraction
- duplicate detection
- missing-field detection
- weekly summary email
- Drive folder creation

## What not to promise

- This is not an accounting system replacement.
- This does not execute payments.
- This does not replace the accountant/bookkeeper.
- This does not guarantee VAT/tax correctness.

## Success metrics

- number of invoices captured
- number of missing-info items resolved
- number of duplicates caught
- average time from received to approved
- number of documents correctly filed
- weekly admin time saved estimate
