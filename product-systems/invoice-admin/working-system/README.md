# Invoice Admin Working System v1

This folder turns Invoice Admin from a demo into a testable operating system.

It defines:

- required fields
- status rules
- calculated flags
- Google Sheets formulas
- 10-record test data
- pass/fail expectations

## Working-system rule

The tracker must be able to show:

- missing required fields
- possible duplicate risks
- due-soon items
- approval blocks
- filing blocks
- ownerless active records
- overdue next actions
- weekly report counts

If those cannot be calculated from the tracker, the system is not ready for a paid pilot.

## Files

- `invoice-tracker-v1.csv` — tracker structure with calculated/logic columns.
- `google-sheets-formulas.md` — formulas to make the tracker work in Google Sheets.
- `test-run-10-records.csv` — 10 realistic test records with expected flags.
- `test-run-results.md` — manual validation results for the 10-record test.
