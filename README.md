# Homes with Akanksha

Production website for Akanksha Tomar, REALTOR®, serving buyers and sellers
across Greater Phoenix. The application uses Next.js App Router, TypeScript,
Tailwind-era utility/design tokens, server-side lead delivery, and static SEO
content backed by structured data.

## Local development

Requirements: Node.js 20+ and npm.

```bash
npm install
cp .env.example .env.local
npm run dev -- --port 4000
```

Open `http://localhost:4000`. Secrets belong in `.env.local`; never commit that
file. Before handing off a change, run:

```bash
npm run lint
npm run build
```

## Useful scripts

- `npm run dev` — local Next.js development server.
- `npm run lint` — ESLint and static checks.
- `npm run build` — production compilation and route generation.
- `npm run market:update` — validates and refreshes the public Redfin city-level
  market snapshot while retaining the last verified data if the refresh fails.

## Production deployment

Netlify deploys the `main` branch from GitHub. Add production values in Netlify
under **Project configuration → Environment variables**, then trigger a fresh
production deploy. Required email-delivery variables are documented in
`.env.example`.

The canonical domain is `https://homeswithakanksha.com`; `www` redirects to the
apex domain. Keep both domain records and Netlify TLS status healthy before
launching campaigns.

## External integrations

- **Lead email:** Resend is active through the server-only lead API.
- **Analytics:** GA4, Google Tag Manager, Google Ads, and Meta Pixel load only
  when their environment IDs exist and the visitor grants the relevant consent.
- **Search verification:** Google and Bing verification tokens are deploy-time
  environment variables.
- **Market data:** public, source-attributed city-level context is separate from
  IDX and is not represented as ARMLS data.
- **IDX:** the provider-neutral UI remains in non-live mode until ARMLS issues
  approved feed credentials and display/compliance requirements.
- **CRM:** lead delivery is adapter-based so an approved CRM can be connected
  later without exposing credentials in the browser.

See `docs/PROJECT_STATUS.md` for the current handoff checklist.

## Release ownership

Repository pushes are performed by the project owner. Automated assistants and
local contributors must leave changes uncommitted/unpushed for owner review
unless the owner explicitly authorizes a different action.
