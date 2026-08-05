# Project status and integration handoff

Last updated: August 4, 2026

This document records external dependencies and safe next steps. Never place
passwords, API keys, tokens, subscriber IDs, or private account details here.
Use `.env.local` locally and protected Netlify environment variables in
production.

## Live platform

- Production hosting: Netlify
- Canonical domain: `https://homeswithakanksha.com`
- Repository deployment branch: `main`
- Contact delivery: Resend to Akanksha's published business email
- Owner policy: only the project owner pushes repository changes

## ARMLS / Flexmls IDX

Status: **Waiting for ARMLS to issue feed credentials and requirements**

Confirmed:

- Akanksha is an active ARMLS/Flexmls subscriber.
- ARMLS website approval and brokerage approval were reported complete.
- The approved website domain is `homeswithakanksha.com`.
- FBS support confirmed that ARMLS—not the Spark Datamart—will issue the API
  feed credentials.
- A provider-neutral search adapter and non-live search experience already exist.

Do not use Akanksha's standard Flexmls username or password in this application.

When ARMLS replies, obtain and retain the full approval email or agreement,
including:

- authentication credentials and API/replication endpoint;
- feed/data-set identifiers and permitted property classes/statuses;
- attribution, logo, disclaimer, refresh, retention, and sold-data rules;
- photo/display permissions and any consumer-registration requirements;
- test versus production access details and support contact.

Then complete these steps:

1. Add credentials only to `.env.local` and protected Netlify variables.
2. Validate authentication with the least-privileged harmless endpoint.
3. Confirm returned MLS, member, office, role, fields, and display permissions.
4. Implement the approved provider adapter and server-side caching.
5. Verify attribution, freshness, status mapping, photo rules, and required legal
   copy before enabling live results.
6. Test search, detail pages, error states, rate limits, and credential rotation.

## Market data automation

Status: **Implemented; production workflow should be monitored**

- `npm run market:update` downloads and validates Redfin's public monthly
  city-level dataset.
- Supported Greater Phoenix rows are retained; invalid or incomplete refreshes
  leave the last verified snapshot untouched.
- Pages disclose the source, reporting period, methodology, check date, and that
  the figures are not an ARMLS report.
- `.github/workflows/refresh-market-data.yml` can run on schedule or manually.

The owner should confirm GitHub Actions has the minimum repository permission
needed for the workflow and review every automated data change. A successful
data commit should trigger Netlify's production deployment.

## Search and measurement setup

Code support exists for Google verification, Bing verification, GA4, GTM,
Google Ads lead conversion, and Meta Pixel. Remaining account-side work:

1. Add verification/measurement IDs as protected Netlify variables.
2. Redeploy and verify the rendered tags on the canonical domain.
3. Submit `https://homeswithakanksha.com/sitemap.xml` to Google Search Console
   and Bing Webmaster Tools.
4. Test consent behavior and conversion events in provider debug tools.
5. Do not publish ad campaigns until landing-page events and lead delivery have
   been tested end to end.

## Business profiles and social accounts

Google Business Profile, review-profile links, booking links, and official social
profile URLs require account-owner access and final URLs. Add them only after
ownership is confirmed; do not invent review counts, ratings, testimonials, or
social handles.
