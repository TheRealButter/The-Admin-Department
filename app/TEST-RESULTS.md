# Admin HQ App Test Results

Date: 2026-07-10

## Test command

```bash
cd app && node tests/run-tests.mjs
```

## Local result

```text
All validation tests passed for Invoice, Sales, and Client Admin.
```

## Repo test coverage

The committed test suite verifies:

- Invoice Admin sample set returns 7 Pass / 3 Fail.
- Sales Admin sample set returns 7 Pass / 3 Fail.
- Client Admin sample set returns 7 Pass / 3 Fail.
- Expected failing records are exactly the intended blocked records.
- Core workflow gates catch owner, follow-up, approval, document, folder, handover, and status errors.

## Current app status

The app is a production static Admin HQ v1 for controlled private pilots:

- no build step
- no external dependencies
- browser-local storage
- CSV import/export
- in-browser validation logic
- tested workflow rules
- responsive UI inspired by the supplied landing-page reference

## Production note

Because this app stores data in the browser by default, real client data should only be used in a private approved workspace. A Supabase multi-user backend can be added as the next production expansion.
