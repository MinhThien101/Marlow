# brand-research

This procedure inherits the root `SKILL.md` contract: resolve managed brand context first, flag missing facts clearly, load only needed references, deliver to the requested destination or chat, and capture durable learnings only as proposed updates to profile, voice, products, or memories.


Load this procedure when the user asks to research a brand, onboard a new brand, or build a managed profile from scratch. Research first, then gate the next action with the user before writing or printing full findings: continue the requested task now, or save brand context for future sessions. Do not write copy. Do not propose enforceable voice rules; that belongs to `procedures/voice-analysis.md`. Do not build calendars; that belongs to `procedures/calendar-builder.md`.

The workflow is intentionally thin: research, checkpoint, revise (up to three passes), then seed brand context when approved. Do not add new deliverable phases unless the user asks; internal verification is allowed.

## Capability surface

- One internal brand research pass with a user checkpoint before any full chat dump.
- Up to three revision passes on user feedback.
- Brand index entry plus four seeded brand context artifacts after approval: profile, voice draft, products, and cited memories. Use markdown files when available; otherwise use the harness-native destination.

## Workflow

### 1. Run the root context check

Confirm `user.md`, brand index/registry availability, web research availability, and durable write access. Apply the storage branch from the root `SKILL.md` Brand Context Contract:

- **Branch A (Claude):** check persistent memory for `MX brand storage location for <slug>: <kind=project|connector>, <location>`. If absent, ask once and recommend one Claude Project per brand. Claude cannot create projects or provision connectors; guide the user (sidebar -> Projects -> New project -> name after the brand) and wait for confirmation. Never write brand context to the skill directory as if it persists.
- **Branch B (file-writable harness, no persistent memory):** write to `brand/<slug>/` in the skill directory. `user.md` is writable; update it when the user states a durable preference.
- **Branch C (no durable surface):** print artifacts in chat and tell the user where to save them.

If the brand already exists in the index or registry, ask whether to merge/update or create a separate brand entry; do not silently overwrite existing context.

If the workspace manages multiple brands, ask the user for the slug before writing anything unless the index already has an unambiguous slug.

### 2. Take the input

The user supplies a brand URL or name. In one batched message, ask for whatever is missing:

- Storefront URL (if different from the main site).
- Country and primary market.
- Founder name(s).
- Anything the user wants you to look at specifically (a podcast, a forum handle, a recent campaign).

Ask once. Do not chain follow-ups.

### 3. Discover wide

Use whatever web research tool the harness provides. Apply the investigator mindset from `references/investigative-research.md`. Try multiple query shapes before deciding the well is dry:

- Brand-owned pages: About, founder letter, product pages, FAQ.
- Third-party sources: reviews, forum threads, subreddits, podcast interviews, AMA transcripts.
- Founder online presence: forum post history, personal posts in external communities, trade-publication interviews.

The brand's website is the floor, not the ceiling. Founder forum posts and community threads often carry more real voice than the About page.

If no web research tool is available, ask the user to paste material directly (brand pages, recent sends, founder bio, product list) and run the same draft/present flow on that material.

### 4. Verify deep

Fetch the highest-signal pages directly. Pull two or three direct quotes per voice anchor with URLs and nearby context. Pull product specifics (name, line, price tier, key attribute) from product pages, not marketing pages.

Never paraphrase from a search snippet when the source page is accessible. Never cite a snippet as a source.

If you cannot verify a fact to that bar, state exactly what is missing. Do not soften it with hedge language.

### 5. Draft the research report

Use the literal shape in `references/methods/brand-research-method.md`. Structure:

- Positioning (2-3 sentences with inline citations).
- Founder (name, background, public posting history with URLs).
- Product line (name, category, price tier where verifiable).
- Audience (observed from third-party sources, not assumed).
- Voice signals (2-3 quoted lines with URLs; observation only, not rules).
- Recent campaigns (if discoverable).
- Sources (bulleted list of every URL cited).
- Missing info list (every unresolved fact from the report).

Mark unverifiable facts inline as missing info and repeat them in the closing missing-info block.

### 6. Run the user checkpoint before revealing or writing

After research is complete, do not print the full report to chat by default.

Return a compact checkpoint only:

- Confirm the brand research is complete.
- Give a short 3-5 bullet summary in plain language.
- List missing info in plain language.
- Ask the user to choose one path:
  1. Show full report.
  2. Save brand context now (project/connector/artifact), then continue.
  3. Continue without saving for now.

Do not seed files yet. Do not auto-approve. Show the full report only if the user explicitly asks.

### 7. Revision loop, up to three passes

If the user requests changes, restart research with that feedback as added guidance. Do not edit the prior draft in place; feedback may invalidate it. Re-run the checkpoint after each revision pass.

The cap is three revisions. After three rounds, returns diminish. State this to the user:

> Three revision rounds is the cap. Upload the material you want incorporated and I will fold it into the seeded files directly.

A fourth pass with the same inputs usually gives a different draft, not a better one.

### 8. Seed the brand index and four context artifacts (only when chosen)

Once the user chooses to save for future sessions, create or update the brand index plus the four core artifacts per `references/brand-context-schema.md`. Write to the location the user chose for this brand (Branch A Project, Branch A connector folder, or `brand/<slug>/` in the skill directory for Branch B). This same location becomes the default home for future work artifacts for this brand. Use `brand/<slug>/` for both single-brand and multi-brand work under the markdown adapter.

Files to write:

- **`brand/index.md`** or registry equivalent: brand name, slug, storage location, artifact status, last updated, and compact notes.
- **`brand/<slug>/profile.md`**: positioning, founder, audience, product line, voice signals as observations (not enforceable rules), current offer if known, customer archetype, brand-wide constraints.
- **`brand/<slug>/voice.md` DRAFT**: observed patterns with citations. Mark clearly at the top that this is a draft awaiting voice-analysis confirmation. Do not write enforceable do/don't rules; that comes next.
- **`brand/<slug>/products.md`**: product line with name, category, price tier, hero attribute, common framings. One section per product or collection.
- **`brand/<slug>/memories.md`**: cited breadcrumbs only. Founder online presence (screen name, platform, URL), voice-sample anchors (exact quotes with URLs), community framing quotes, niche-specific facts. Every memory carries a source URL and the date verified.

Do not create other durable brand context docs. If write tools are unavailable and the user chose save, print the index entry and four artifact bodies in fenced blocks and ask the user to add them to the project or another durable destination.

### 9. Self-check before handoff

- Every external claim in the four files carries a source URL or is explicitly marked missing.
- `voice.md` is clearly labeled DRAFT at the top.
- `voice.md` contains observed patterns with citations, not enforceable do/don't rules.
- `memories.md` contains only sourced facts, not opinions, voice rules, or strategic notes.
- `products.md` lists real products with names pulled from product pages, not marketing pages.
- No invented founder bios, prices, ingredients, return policies, or shipping thresholds.
- ASCII punctuation only. No em-dash, no en-dash, no curly quotes.
- Brand-specific capitalization (lowercase brand name, etc.) is reflected exactly in `profile.md`.

### 10. Handoff

If the user chose save: end by naming the seeded files (with paths), listing unresolved placeholders in one short block, and suggesting one plain-language next action.

If the user chose continue without saving: continue directly to the requested task using the researched context in-session, and note that durable save can happen after deliverable approval.

## Hard prohibitions

- Do not write voice rules into `voice.md` as enforceable do/don't lines. Brand research seeds observations and citations; the voice-analysis procedure converts them to rules.
- Do not build a calendar, write a brief, or write copy. Those are downstream purposes.
- Do not add user-visible deliverable phases without reason. Research, checkpoint, revise, seed. Internal citation checks and verification are allowed.
- Do not dump the full research report in chat before the user picks what to do next.
- Do not run a fourth revision pass. After three, the user uploads material directly.
- Do not invent founders, products, prices, return policies, shipping thresholds, ingredients, launch dates, or community presence. Mark missing facts explicitly instead.
- Do not save unverified claims to `memories.md`. A breadcrumb without a citation is a rumor.
- Do not silently overwrite an existing brand context. Ask first.
- Do not continue into voice analysis unless the user asked for end-to-end onboarding or explicitly approves the next step.
- Do not return tool narration, preamble, or meta commentary. The deliverable IS the return.

## Conflict rules

When sources disagree, resolve in this order:

1. User-confirmed facts in the current request.
2. Verified facts from founder-authored sources (forum posts, interviews, AMAs).
3. Verified facts from brand-owned pages.
4. Third-party reviews and community framings.
5. Strategic judgment.

A clearly flagged missing fact outranks a guess at any level.

## What this skill does not do

- It does not extract durable voice rules. `procedures/voice-analysis.md` does that next, after the brand state is rich enough to pattern-match against.
- It does not build the first month's calendar. `procedures/calendar-builder.md` does that after voice analysis.
- It is not an ongoing research function. This is the one-time onboarding pass. Later research belongs to `procedures/report.md` or runs inside other procedures when brand state is thin.
- It does not push files to any ESP, CRM, or external service. The user owns delivery.
