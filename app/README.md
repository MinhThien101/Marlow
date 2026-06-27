# Marlow

AI email tool for solo DTC founders — research a brand, then write and design on-brand campaign emails in minutes.

## Stack

- **Vite + React** (plain JSX) front end
- **Supabase** — auth (Google sign-in), Postgres (profiles, brands, products, emails), storage (`brand-assets`)
- **Netlify Functions** — serverless AI endpoints (`/api/generate-email`, `/api/studio-ai`, `/api/analyze-brand`, `/api/scrape-brand`)
- **Anthropic Claude** — the email copy/design writer (falls back to a built-in template writer if the API is unavailable)

## Local development

```bash
npm install
npm run dev      # Vite dev server
npm run build    # production build → dist/
npm run preview  # preview the production build
```

## Environment variables

Copy `.env.example` to `.env` and fill in:

| Var | Where | Notes |
|-----|-------|-------|
| `VITE_SUPABASE_URL` | client | Supabase project URL |
| `VITE_SUPABASE_ANON_KEY` | client | Supabase publishable key |
| `ANTHROPIC_API_KEY` | **server only** | Powers the AI writer. No `VITE_` prefix — never exposed to the browser. Set in Netlify env vars for production. |

## Deploy

Hosted on Netlify (`marlow-app.netlify.app`). Pushing to `main` on GitHub auto-deploys via continuous deployment. Build config lives in the repo-root `netlify.toml` (base `app`, command `npm run build`, publish `dist`, functions `netlify/functions`).
