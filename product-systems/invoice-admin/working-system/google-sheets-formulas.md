# Invoice Admin Google Sheets Formulas

These formulas turn the Invoice Admin tracker into a working manual system in Google Sheets.

Assume row 2 is the first data row.

## Required field check

Column `missing_required_fields` should identify fields that block progress.

Formula pattern:

```gs
=TEXTJOIN(";", TRUE,
 IF(D2="", "supplier_name", ""),
 IF(E2="", "document_type", ""),
 IF(AND(E2="Invoice", F2=""), "invoice_number", ""),
 IF(AND(E2="Invoice", I2=""), "total_amount", ""),
 IF(M2="", "status", ""),
 IF(AND(M2<>"Filed", M2<>"Paid", O2=""), "assigned_to", ""),
 IF(AND(OR(M2="Waiting for Approval", M2="Approved", M2="Ready for Review"), P2=""), "approval_owner", ""),
 IF(OR(M2="Filed", M2="Paid"), IF(R2="", "document_link", ""), ""),
 IF(OR(M2="Filed", M2="Paid"), IF(S2="", "folder_link", ""), "")
)
```

## Due-soon flag

Column `due_soon_flag` should show `Yes` when the invoice due date is within 48 hours.

```gs
=IF(AND(H2<>"", H2-TODAY()<=2, H2-TODAY()>=0, M2<>"Paid"), "Yes", "No")
```

## Approval blocked

Column `approval_blocked` should show `Yes` when an invoice should not move forward without human approval or review.

```gs
=IF(OR(M2="Waiting for Approval", M2="Possible Duplicate", U2="Possible duplicate", P2=""), "Yes", "No")
```

## File blocked

Column `file_blocked` should show `Yes` when a record is marked Filed or Paid but does not have document/folder links.

```gs
=IF(AND(OR(M2="Filed", M2="Paid"), OR(R2="", S2="")), "Yes", "No")
```

## Ownerless active record

Column `ownerless_active` should show `Yes` when an active item has no owner.

```gs
=IF(AND(NOT(OR(M2="Filed", M2="Paid", M2="Rejected")), O2=""), "Yes", "No")
```

## Overdue next action

Column `overdue_next_action` should show `Yes` when next action due date is in the past and the item is still active.

```gs
=IF(AND(X2<>"", X2<TODAY(), NOT(OR(M2="Filed", M2="Paid", M2="Rejected"))), "Yes", "No")
```

## Validation status

Column `validation_status` should fail when a critical block exists.

```gs
=IF(OR(Y2<>"", AA2="Yes", AB2="Yes", AC2="Yes", AD2="Yes"), "Fail", "Pass")
```

## Weekly report calculations

### Invoices received

```gs
=COUNTA(A2:A)
```

### Ready for review

```gs
=COUNTIF(M2:M, "Ready for Review")
```

### Waiting for approval

```gs
=COUNTIF(M2:M, "Waiting for Approval")
```

### Missing info

```gs
=COUNTIF(M2:M, "Missing Info")
```

### Possible duplicates

```gs
=COUNTIF(M2:M, "Possible Duplicate")
```

### Filed

```gs
=COUNTIF(M2:M, "Filed")
```

### Failed validation records

```gs
=COUNTIF(AE2:AE, "Fail")
```

### Overdue next actions

```gs
=COUNTIF(AD2:AD, "Yes")
```

## Conditional formatting rules

Apply these rules:

- `validation_status = Fail` → highlight row red.
- `due_soon_flag = Yes` → highlight due date amber.
- `approval_blocked = Yes` → highlight status amber.
- `file_blocked = Yes` → highlight document/folder fields red.
- `ownerless_active = Yes` → highlight assigned owner red.
- `overdue_next_action = Yes` → highlight next action due red.

## Important note

These formulas are first-pass Google Sheets logic. They must be tested inside a live sheet because column positions can shift if fields are added or removed.
