# Admin HQ App Test Results

Date: 2026-07-10

## Test command

```bash
NODE_ENV=production node tests/run-tests.mjs
```

## Current verification status

```text
Blocked handoff: final execution requires a fresh checkout / CI / deployment environment.
```

The regression runner is committed, but this tool session could not execute it against a freshly cloned latest repository because outbound GitHub DNS resolution failed in the container.

Expected clean result after running the command from latest `main`:

```text
All Admin HQ inventory, page-contract, scale, and production-scale regression tests passed.
```

## Repo test coverage

The committed modular test suite verifies:

- required public/app route files exist.
- public pages do not contain placeholder email.
- public pages do not use old demo-first CTA wording.
- homepage links to all six system sample routes.
- Admin Systems page links to all six system sample routes.
- Admin HQ launcher links to all six sample and empty system routes.
- every app page has the correct `data-system` value.
- every app page loads shared CSS, shared rules engine, and shared browser controller.
- every app page contains the required UI IDs for controls, metrics, table, report, blocked queue, modal, and form.
- every app page navigation links to all six systems.
- CSS does not reintroduce known oversized values from the pre-DueToday-scale pass.
- Invoice Admin sample set returns 7 Pass / 3 Fail.
- Sales Admin sample set returns 7 Pass / 3 Fail.
- Client Admin sample set returns 7 Pass / 3 Fail.
- Property Admin sample set returns 7 Pass / 3 Fail.
- Practice Admin sample set returns 7 Pass / 3 Fail.
- Member Admin sample set returns 7 Pass / 3 Fail.
- Expected failing records are exactly the intended blocked records for all six systems.
- Report totals, pass counts, and fail counts are calculated from engine output.
- CSV round-trip preserves records and IDs.
- sanitized production-scale fixture creates 240 records per system.
- production-scale fixture contains no email-like data.
- production-scale fixture contains no 13-digit SA-ID-like values.
- production-scale fixture produces deterministic failures.
- production-scale reports return 168 Pass / 72 Fail per system.

## Current app status

The app is now a modular static Admin HQ v1 for controlled private pilots:

- `app/index.html` launches all six systems.
- `app/assets/engine.js` contains shared validation/report/CSV logic.
- `app/assets/app.js` contains shared browser UI logic.
- `app/assets/app.css` contains shared UI styling.
- `app/invoice-admin/index.html` runs Invoice Admin.
- `app/sales-admin/index.html` runs Sales Admin.
- `app/client-admin/index.html` runs Client Admin.
- `app/property-admin/index.html` runs Property Admin.
- `app/practice-admin/index.html` runs Practice Admin.
- `app/member-admin/index.html` runs Member Admin.
- `tests/run-tests.mjs` validates all six systems, page contracts, scale guardrails and production-scale fixtures.
- `tests/fixtures/sanitized-production-scale-data.mjs` generates production-scale sanitized local data.

## Production note

This is still a browser-local static app. Real client data should only be used in a private approved workspace. A Supabase multi-user backend remains the next production expansion.
