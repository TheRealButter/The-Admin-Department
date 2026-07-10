# Status Lock Helper Formulas — Invoice Admin

These helper formulas make risky status changes visible in Google Sheets.

They do not replace human approval, but they make bad status movement obvious.

## Add helper column: `status_block_reason`

Formula pattern for row 2:

```gs
=TEXTJOIN("; ", TRUE,
 IF(AND(M2="Approved", P2=""), "Approved status blocked: approval owner missing", ""),
 IF(AND(M2="Filed", OR(R2="", S2="")), "Filed status blocked: document or folder link missing", ""),
 IF(AND(M2="Paid", OR(R2="", S2="")), "Paid status blocked: document or folder link missing", ""),
 IF(AND(M2="Ready for Review", Y2<>""), "Ready for Review blocked: required fields missing", ""),
 IF(AND(M2="Approved", T2<>""), "Approved status blocked: missing info unresolved", ""),
 IF(AND(M2="Approved", U2="Possible duplicate"), "Approved status blocked: duplicate unresolved", ""),
 IF(AND(NOT(OR(M2="Filed", M2="Paid", M2="Rejected")), O2=""), "Active record blocked: assigned owner missing", ""),
 IF(AND(NOT(OR(M2="Filed", M2="Paid", M2="Rejected")), W2=""), "Active record blocked: next action missing", "")
)
```

## Add helper column: `can_progress`

```gs
=IF(AF2="", "Yes", "No")
```

Where `AF` is the `status_block_reason` column.

## Conditional formatting

Apply:

- `status_block_reason is not blank` → highlight row red
- `can_progress = No` → highlight status red

## Practical use

During daily review, filter `can_progress = No`.

Those are records that need correction before they can move forward.
