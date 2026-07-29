# Project status and integration handoff

Last updated: July 2026

This file records external dependencies and the next safe implementation step.
Do not store passwords, API keys, access tokens, subscriber IDs, or other secrets
in this document. Secrets belong only in the git-ignored `.env.local` file.

## Point 1 — ARMLS / Flexmls IDX

Status: **Parked — waiting for Spark Platform developer access**

Completed:

- Akanksha has an active ARMLS/Flexmls subscriber account.
- The website domain is `https://homeswithakanksha.com`.
- ARMLS website approval is reported complete.
- Brokerage approval is reported complete.
- The Spark API developer registration form has been submitted.
- Flexmls/Spark is recorded as the intended provider in `.env.local`.
- The application already has a provider-neutral IDX adapter and demo search UI.
- Live mode remains disabled with `IDX_LIVE_ENABLED=false`.

Do not use Akanksha's normal Flexmls password in the application.

Resume when the Spark/FBS approval email arrives. Request or locate:

- IDX-role API key
- Bearer access token, or the authentication method assigned to the key
- ARMLS data-plan/feed identifiers
- API endpoint or replication endpoint assigned to the key
- Required ARMLS attribution, logo, disclaimer, refresh, and retention rules

Then:

1. Add the credentials only to `.env.local` and production host secrets.
2. Test authentication against a harmless profile/system-info endpoint.
3. Confirm the returned MLS, agent, office, role, and display permissions.
4. Implement and validate the Flexmls/Spark provider adapter.
5. Replace demo listings only after compliance fields and refresh behavior pass.
6. Keep a last-known-good cache and never expose server credentials to the browser.

## Current independent work

Status: **Point 2 implemented — validate deployment automation after hosting is connected**

- `npm run market:update` streams Redfin's official monthly city dataset.
- Only the 12 supported Greater Phoenix community rows are retained.
- Region IDs, required fields, reporting periods, and metric ranges are validated.
- A failed refresh leaves the last verified generated snapshot untouched.
- The homepage identifies the reporting period, check date, source, and stale state.
- `.github/workflows/refresh-market-data.yml` checks weekly and can run manually.
- A successful changed snapshot is committed, which can trigger the production
  deployment once the repository and hosting provider are connected.

The GitHub repository must allow Actions to write repository contents. After the
site is connected, manually run the workflow once and confirm the resulting
commit triggers a production deployment.
