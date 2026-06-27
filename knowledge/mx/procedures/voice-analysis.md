# voice-analysis

This procedure inherits the root `SKILL.md` contract: resolve managed brand context first, clearly flag missing facts, load only needed references, deliver to the requested destination or chat, and capture durable brand learnings as proposed updates to profile, voice, products, or memories only.


Load this procedure when the user asks to analyze brand voice, refine voice rules, audit voice from sends, or calibrate voice from recent campaigns. Analyze voice from real artifacts. Do not invent voice. Do not write copy. You propose; user confirms. Detailed method, threshold rules, and return shape live in `references/methods/voice-analysis-method.md`. This file is the procedure.

## Capability surface

- One voice analysis proposal, delivered to the requested destination, or chat if none is named.
- Optional breadcrumb appends to `memories.md` (cited facts only).
- No writes to `voice.md` without user confirmation.
- No writes to campaign or flow documents, ever.

## Core discipline

Voice comes from real brand outputs and brand-owned artifacts. Do not infer broad rules from one example. Multiple real artifacts or no rule.

- Three to five artifacts is the minimum threshold for any durable rule.
- Pattern strength beats artifact count: a rule that appears identically in three sends is stronger than a rule that varies across seven.
- If artifacts are thin, say so and ask for more. Do not fabricate.
- Category stereotypes are not voice. "Skincare brands sound warm" is not a rule.
- The user's chat tone is not the brand's voice. Chat is between you and user; brand voice is between brand and audience.
- A competitor's copy is not the brand's voice either.

Proposals are advisory. The user owns `voice.md`.

## Workflow

### 1. Run the root context check

Confirm brand index or registry, canonical brand context source, recent-send access, and durable destination. If multiple brands are available, ask user for target brand or slug before reading anything.

If no usable brand context exists, route user to `procedures/brand-research.md` first. Voice analysis without brand context is guessing.

### 2. Take the input

Two input shapes:

- **Inline artifacts.** User pastes copy, subject lines, URLs, or names a campaign batch. Treat each pasted block as one artifact and count it toward threshold.
- **Brand context.** Read recent sends, profile, voice rules, and memories from files, docs, memory, attachments, or pasted material.

Ask once for missing inputs in one batched message. Do not chain follow-ups.

### 3. Gather evidence

Read in this order:

- `profile.md` for current positioning and any prior voice notes.
- `voice.md` for existing rules. If this was a DRAFT from brand-research, treat every entry as an observation, not a confirmed rule.
- memories for existing cited evidence and prior breadcrumbs.
- `recent-sends/` for the most recent real campaigns across every channel. Prefer the last 90 days. Voice drifts.
- Brand-owned pages (About, founder letter, product pages) via a fetch tool if available.
- Founder posts in external communities, if discoverable. Load `references/investigative-research.md` when brand state is thin.

Count artifacts as you go. Minimum is three to five real artifacts. If you cannot reach that bar, stop and ask user to upload more before drafting rules.

### 4. Extract patterns by category

For each category, look for repetition across multiple real artifacts. Single-example observations stay in Low-Confidence Observations; they do not become rules.

- Sentence rhythm. Short and punchy, flowing and conversational, formal, mixed.
- Approved vocabulary. Phrases the brand uses repeatedly.
- Anti-vocabulary. Phrases the brand consistently avoids.
- Persona. Founder "I" vs collective "we" vs neutral third person, and when each shows up.
- Signature phrases. Recurring openers, closers, transitions, taglines.
- Punctuation conventions. Dash usage (the brand may forbid them), exclamation behavior, ellipses, quote style.
- Opener and closer patterns. Greetings, sign-offs, CTA verb choices.
- Formatting habits. Bold, caps, emoji, line breaks, sentence-case vs title-case in subject lines and headers.

Cite specific artifacts (campaign titles, send dates, URLs) supporting each pattern. Two to three citations per proposed rule.

### 5. Distinguish rules from evidence

Two homes for proposals. Pick one per rule, never both.

- **`voice.md` updates** carry durable stylistic posture: persona, sentence rhythm, formatting habits, signature phrasing, do/don't pairs grounded in real examples.
- **Memory entries** carry cited facts and evidence anchors for future work: "Founder uses lowercase subject lines in April campaign examples", "Customers describe the product as X in this thread". Voice rules and banned phrases belong in `voice.md`.

`voice.md` is capped at 5 to 7 rules. If a proposed update exceeds cap, recommend retiring or merging an existing rule.

### 6. Save research breadcrumbs to memories.md

Append cited factual discoveries to brand memory store (`memories.md` in markdown adapter). Breadcrumbs are additive facts next passes should not re-derive, not opinions or rules.

What qualifies:

- Founder online presence: platform, screen name, posting frequency, stylistic tic.
- Voice-sample anchors: exact quotes with URLs and a one-line pattern summary.
- Community gathering spots: subreddits, forums, Discords where the founder or customers post.
- Sourced quotes about the brand from third parties with URLs.
- Brand-owned pages worth re-fetching on the next pass.

What does not qualify:

- Voice rules themselves. Those go through the proposal path.
- Banned phrasings. Those belong in `voice.md` after user confirmation.
- Opinions, judgments, strategic recommendations.
- Anything without a citation. A breadcrumb without a citation is a rumor.

Check `memories.md` for duplicates before appending. Update existing entries instead of creating overlaps.

### 7. Produce the proposal document

Use the literal return shape in `references/methods/voice-analysis-method.md`. Required blocks:

- Voice Analysis (scope, confidence, sources inspected).
- Proposed Voice Profile Updates (omit if none).
- Proposed Brand Memories (omit if none).
- Existing Rules To Retire (only if existing rules are contradicted by the evidence).
- Low-Confidence Observations (patterns without enough evidence yet).
- Top-Level Blockers (only when the brand has no analyzable content at all).

Confidence is a return field, not a refusal trigger. Limited-confidence findings are valid output. BLOCKERS is reserved for "no analyzable content exists." Thin content is low-confidence, not a blocker.

### 8. Present for user confirmation

Return proposal to user. Pause. Do not edit `voice.md` or `memories.md` for proposed rules without confirmation. Breadcrumb appends from step 6 are the only direct writes; everything else waits.

If user approves specific rules, write only those rules to `voice.md` (within 5 to 7 cap), following schema in `references/brand-context-schema.md`. Save cited supporting facts to memories, not the rule itself. If user rejects, log rejection rationale as a dated note only if runtime has agreed memory destination.

### 9. Self-check before handoff

- Every proposed rule cites two or more real artifacts.
- No proposed rule rests on a single example.
- No proposed rule is a category stereotype.
- Profile rules and memory evidence do not duplicate each other.
- Existing rules contradicted by current evidence are listed for retirement.
- Breadcrumbs in `memories.md` all carry a source URL or file reference.
- ASCII punctuation only. No em-dash, no en-dash, no curly quotes.
- Brand-specific capitalization is respected exactly.

### 10. Handoff

End by naming artifact (voice analysis proposal), listing what was written (breadcrumbs only, unless user confirmed rule writes), and noting upstream state of `voice.md`:

- If upstream `voice.md` was a DRAFT from brand-research, mark it refined and name rules promoted from observation to confirmed rule.
- If upstream `voice.md` was an existing confirmed file, log revision diff: rules added, rules retired, rules unchanged.

Suggest one plain-language next action:

When ready, tell user to say one of: "brief next month's campaigns", "write copy from an approved brief", or "plan next month's calendar."

## Hard prohibitions

- Do not infer a voice rule from a single example. Multiple real artifacts or no rule.
- Do not infer voice from category stereotypes, competitor copy, or the user's chat tone.
- Do not write enforceable rules into `voice.md` without user confirmation.
- Do not write voice guidance into campaign briefs. That is the brief skill's domain.
- Do not write copy in any form. Voice analysis proposes; copy skills produce.
- Do not save opinions, voice rules, or banned phrasings to memories as breadcrumbs. Those go through the proposal path and land in `voice.md` only after confirmation.
- Do not save a breadcrumb without a citation.
- Do not exceed the 5 to 7 rule cap in `voice.md`. Propose retirement of an existing rule first.
- Do not return BLOCKERS for thin content. Thin is a low-confidence finding.
- Continue into copy or briefing only when user asked for that workflow; otherwise suggest the next step.

## Conflict rules

When sources disagree, resolve in this order:

1. User instruction in the current request.
2. Verified artifacts in `recent-sends/`, brand-owned pages, and founder-authored sources.
3. Existing entries in `voice.md` and `memories.md` (treat as prior user-confirmed state).
4. Your analytical judgment.

A flagged Low-Confidence Observation outranks a hard rule proposed on thin evidence.

## What this procedure does not do

- It does not write copy. `procedures/campaign-copy.md` and `procedures/flow-brief.md` consume the refined voice.
- It does not build the first profile. `procedures/brand-research.md` seeds the initial state.
- It does not run an investigative pass from scratch. When brand state is thin, load `references/investigative-research.md` for discover-and-verify loop, but deep onboarding belongs to `procedures/brand-research.md`.
- It does not modify campaign briefs, flow briefs, or calendars. Voice flows into those procedures through `voice.md` and `memories.md`, not cross-procedure writes.
- It does not push files to any ESP, CRM, or external service.
