# Onboarding upgrade — why output was generic, and what changed

## The root cause

Onboarding only read the visual shell of a store (logo, colors, fonts, product
images). It never read the brand's words, so the email writer got almost nothing
to work with: name, URL, an empty `voice_notes`, your one-line brief, and a list
of product titles. The Brand screen looked rich, but that text was the Spruce
Coffee demo or hardcoded defaults. The "Re-run research" button was a fake timer.

Generic in, generic out. The system prompt and the model were never the problem.
The empty brief handed to them was.

## What changed (all additive and fail-safe — if research ever fails, the app
behaves exactly as before)

1. **Scraper now reads the brand's own words.** `src/lib/scrapeCore.js` fetches
   the homepage plus up to two story pages (About, our-story, mission, FAQ),
   strips scripts/nav/styling, and returns clean readable `text`.

2. **New brand-research pass.** `netlify/functions/analyze-brand.js` (served at
   `/api/analyze-brand`) sends that text to Claude and returns a structured
   profile: positioning, audience, founder, proof points, and 5-7 voice rules,
   each grounded in a real quote from the site. The prompt follows your MX
   voice-analysis method: evidence over inference, never invent.

3. **Wired through onboarding.** `Connect.jsx` runs research right after the
   scrape, shows a "Voice Marlow learned" panel so you can see it captured
   something real, and saves the profile into the existing `voice_notes` column
   (no database migration needed).

4. **Generator now uses it.** `generate-email.js` feeds the full profile to the
   writer as "BRAND PROFILE — this is who you write as," including the voice
   rules and proof points. `studioBrand.js` parses the same profile so the Brand
   screen shows the real voice, not the demo.

## Files touched

- `app/src/lib/scrapeCore.js` (text extraction)
- `app/netlify/functions/analyze-brand.js` (new)
- `app/src/studio/studioBrand.js` (serialize/parse profile, use it)
- `app/src/screens/Connect.jsx` (run research, store it, show it)
- `app/netlify/functions/generate-email.js` (use the profile)

## How to test

1. Locally: `cd app && npm run build` to confirm it compiles, then `npm run dev`.
   Note: `/api/analyze-brand` is production-only (like your other AI functions),
   so to see real research you test on the deployed site, not `vite dev`.
2. Make sure `ANTHROPIC_API_KEY` is set in Netlify env (you already added it).
3. Deploy (push to your connected repo, or `netlify deploy --prod`).
4. Connect your real client's store. Watch the "Voice Marlow learned" panel
   populate with positioning and voice rules pulled from their actual site.
5. Generate the same campaign you generated before. Compare. The copy should now
   sound like that brand, not generic.

## Known follow-up (cosmetic, not blocking)

The "Re-run research" timer in `BrandStage.jsx` (studio flow stage 0) is still
the old fake animation. The real research now lives in Connect, so the fix is to
route that button to the Connect edit screen. Small, do it next pass.

## Performance pass (load speed + polish)

The app opened to a blank cream screen with a small spinner for several seconds.
Cause and fixes:

1. **The bundle was 1.3 MB in one file.** Most of it was the entire `lucide-react`
   icon library, pulled in by `import * as Lucide`, even though the app uses 36
   icons. `src/ui/primitives.jsx` now imports only those 36 by name, so the
   bundler drops the rest. This is the biggest cut. (When you use a new icon, add
   its name to the import list and the ICONS map in that file.)

2. **Blank screen until the JS parsed.** `index.html` now paints an instant
   branded loader (logo + spinner on the cream background) inside `#root`, which
   React replaces on mount. First paint is immediate instead of blank.

3. **Fonts were render-blocking.** The Google Fonts stylesheet now loads async
   (`media="print"` onload swap), so it no longer holds up first paint.

4. **Vendor split.** `vite.config.js` now splits React and Supabase into their own
   chunks so they cache across deploys.

5. **Branded in-app splash.** The `Splash` in `App.jsx` (shown while session and
   brand load) now shows the logo, not a bare spinner.

### Verify the bundle drop
After `npm run build`, check `dist/assets/`. The main JS chunk should fall from
~1.3 MB to roughly 300-450 KB. If it is still large, run `npx vite build` and read
the chunk sizes it prints.

### Files touched (perf)
`app/index.html`, `app/src/ui/primitives.jsx`, `app/src/App.jsx`,
`app/vite.config.js`.

## If output is still generic after this

It means the store has thin text (storefront grid, little prose). The research
pass will return low confidence and fewer rules. Fix: add a step where the
founder pastes 1-2 of their best past emails, and feed those to the same analysis
(recent sends are the strongest voice signal in your MX method).
