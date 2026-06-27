# Marlow — session handoff

Paste this into the next Cowork chat, or point Claude Code at it. It's the full
state so nothing has to be re-derived.

## Project
Marlow: a SaaS that helps solo DTC founders write and design on-brand campaign
emails in minutes. React + Vite app in `app/`, deployed on Netlify
(marlow-app.netlify.app), Supabase for auth/data, Claude API for generation.
Built on the /mx email skill. Repo also has `/knowledge` (mx skill files),
`ONBOARDING-UPGRADE.md` (detailed changelog), and this file.

## Core problem being solved
Generated emails came out generic. Root cause: onboarding only scraped visual
stuff (logo, colors, fonts, product images), never the brand's words. The writer
got name + URL + empty voice + brief + product titles, and the Brand screen showed
hardcoded demo/default voice rules. Generic in, generic out.

## What is ALREADY CHANGED in code (done in Cowork, NOT yet deployed)
Onboarding / brand research:
- `app/src/lib/scrapeCore.js` — also extracts readable brand text (homepage +
  about/story pages)
- `app/netlify/functions/analyze-brand.js` — NEW Claude pass: site text ->
  positioning, audience, founder, proof, 5-7 evidence-quoted voice rules (follows
  mx voice-analysis method). Prod-only, fail-safe.
- `app/src/studio/studioBrand.js` — serialize/parse the profile, stored in the
  existing `voice_notes` column (no DB migration)
- `app/src/screens/Connect.jsx` — runs research after scrape, shows "Voice Marlow
  learned" panel, saves the profile
- `app/netlify/functions/generate-email.js` — feeds the full profile to the writer
Performance (the app opened to a blank screen for several seconds):
- `app/src/ui/primitives.jsx` — icons were the whole lucide library via
  `import * as`; now imports only the 36 used (bundle was 1.3MB, should drop to
  ~300-450KB)
- `app/index.html` — instant branded loader in #root + async (non-blocking) fonts
- `app/src/App.jsx` — branded splash instead of bare spinner
- `app/vite.config.js` — React/Supabase split into their own cached chunks

## NEXT STEPS (in order)
1. SET UP GIT + GITHUB (do this first, in Claude Code):
   - The `.gitignore` is already written. Confirm `.env`, `.env.*`, and
     `API Key.txt` are excluded BEFORE the first commit. If a secret was ever
     committed, rotate the keys.
   - `git init`, commit everything, create a PRIVATE GitHub repo, push.
   - Optional but cleaner: move the repo out of OneDrive (e.g. `C:\dev\Marlow`)
     so OneDrive and git stop fighting over `.git` (this also kills the sync lag).
   - Connect the GitHub repo to Netlify for auto-deploy. After this, deploying =
     push.
2. DEPLOY + VERIFY:
   - `npm run build` (or push, if Netlify auto-deploy is live). Check the new
     bundle size dropped from ~1.3MB.
   - On the live Brand screen, hit Edit brand and re-pull ARMPLIFY so the new
     research runs (it currently shows the OLD generic defaults).
   - Generate the same campaign as before and compare. Copy should now sound
     like the brand.
3. SMALL FIX: kill the fake "Re-run research" timer. In `FlowShell.jsx` (~line 73)
   BrandStage renders with only `onNext`; thread Studio's `onEditBrand` through
   FlowShell into `BrandStage.jsx` so the button opens the real Connect editor.
4. BIG NEXT (own session): review the actual email OUTPUT render quality (the
   "would I send this" moment).
5. If a store has thin site text: add a "paste 1-2 past emails" step feeding the
   same analysis (strongest voice signal per mx).

## Environment gotchas
- Cowork CANNOT run the Windows build or deploy. Build/deploy happens in Claude
  Code or via Netlify-from-GitHub.
- OneDrive lags the Cowork sandbox mount, so bash reads of edited files can be
  stale. Trust the Read/Edit tool, not `bash cat`, for file contents.
- AI Netlify functions (analyze-brand, generate-email, studio-ai) run ONLY in
  production where ANTHROPIC_API_KEY lives, not under `vite dev`. App falls back
  safely without them.

## Workflow decided this session
- Research + thinking + connectors + marketing work -> Cowork (this chat)
- Visual design of new screens -> Claude design (hand off mockup + tokens)
- Build / git / deploy -> Claude Code
- Carry context between tools with a written spec; carry files with git.
- GitHub + Netlify auto-deploy is the agreed setup to remove deploy friction.

## Johnny's prefs
Concise, no fluff, no em-dashes or AI cliches (see ABOUT ME/anti-ai-writing-style).
Ship ready-to-use work. Ask when the brief is unclear.
