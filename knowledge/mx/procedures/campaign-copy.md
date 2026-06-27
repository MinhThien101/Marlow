# campaign-copy

This procedure inherits the root `SKILL.md` contract: resolve managed brand context first, clearly flag missing facts, load only needed references, deliver to the requested destination or chat, and capture durable brand learnings as proposed updates to profile, voice, products, or memories only.


Load this procedure when the user asks for brief-based copy, email copy, SMS copy, or flow-node copy. Write final copy from the brief, then review it. These are separate passes. Review is mandatory. Writer drafts. Reviewer is skeptical and independent.

Do not write briefs, manage brand strategy, or change flow structure. Take a brief in, return final copy out, and leave delivery to the user. If copy work surfaces durable facts, propose updates to profile, voice, products, or memories only.

## Capability surface

- Final copy for one campaign or flow node, delivered to the requested destination, or chat if none is named.
- A batch of copies from a consolidated briefs document, delivered one copy per target.
- Copy shape picked from the brief: DESIGNED (sections in order), TEXT_BASED (one framework), or SMS (one message type).
- Mandatory review pass after every write, using the six-lens checklist.
- Unverifiable facts flagged inline as missing-info notes. The user resolves them before ship.

## Inputs

A brief is required. Accept it from any of:

- Inline in the user message.
- A path to a brief or briefs document the user names.
- A brief saved on a target the user references.

If no brief is present, do not draft. Say you are switching and route to `procedures/campaign-brief.md` (or `procedures/flow-brief.md` for a flow node).

## Workflow

The work has two phases: write, then review. Run both for every target. Do not skip Phase 2 or collapse phases into one pass.

### Phase 1: Write

#### 1. Load the brief and resolve scope

Read every in-scope brief. For batches, loop one campaign at a time and keep each target reviewable. If no destination preference exists, default to **the same location holding this brand's context** (see step 7 for per-branch sub-organization). For each brief, extract campaign title, structure (DESIGNED, TEXT_BASED, or SMS), named labels (sections, framework, or message type), product focus, offer, links, required language, and client specifications.

If a brief is structurally incomplete or its labels do not match canonical names, record the target in `## Blockers` and continue with the rest.

#### 2. Run the root context check

Confirm brand index or registry, canonical brand context source, web research availability, durable destination, and recent-send access. If managed brand context is missing, do not block copy. Write from available brief inputs and mark missing facts as placeholders unless the user asks for full onboarding first. Do not infer voice from chat tone.

#### 3. Load brand context once per run

Read profile, voice rules, products, memories, and recent sends from the active brand context source. Scan two or three recent same-channel examples to calibrate rhythm and vocabulary. Load this set once per run, not per target.

#### 4. Load only the reference docs the briefs name

For each target, load only the helper docs the brief calls for. Do not preload everything.

- **DESIGNED**: for each label in `Email Sections`, load `references/sections/section-<slug>.md`.
- **TEXT_BASED**: load `references/frameworks/framework-<slug>.md` for the one named framework.
- **SMS**: load `references/sms/sms-<slug>.md` for the one named message type.

Do not re-load a doc already loaded earlier in the run. Multiple DESIGNED targets in the same batch share section docs.

#### 5. Verify the facts the brief depends on

For every product, URL, offer term, code, expiration, price, ship threshold, return policy, or dated claim in copy, verify against a brand-owned source when accessible. If web research is available, use search to discover and source retrieval to verify. Treat verified facts already provided inline by the user as trusted; do not re-verify.

When a required fact cannot be verified after a reasonable pass, mark it missing inline and continue. Do not stop a batch on one missing fact. Do not invent.

Minimum bar before locking the angle: name three specifics a generic take on this product, offer, or moment would miss. If you cannot, keep researching or clearly mark what is missing.

#### 6. Apply voice rules

Voice rules live in active brand context (`voice.md` in the markdown adapter). Load once per run. Apply `references/methods/voice-application.md`: read voice once, draft against the brief, then check each rule and revise targeted lines.

When a voice rule conflicts with a brief instruction, voice wins. The brief is tactical; voice is a brand commitment. If conflict cannot be reconciled (brief requires breaking a voice rule), stop and surface it in handoff. The user decides.

#### 7. Write the copy

Calibrate from profile, voice rules, and recent real sends you read. Not from generic copywriting instincts. The user's chat tone is not the brand's tone.

**DESIGNED**: start with `[LOGO]`, end with `[FOOTER]`, separate sections with `---`, never print section labels. Each section does one clear job. Stop when the point lands. Let selection beat explanation.

**TEXT_BASED**: follow the named framework's beats. Lean prose. No padding.

**SMS**: one message, under 160 characters, matching the named message type.

Fight these specific failure modes while writing:

- **No em-dashes, en-dashes, or curly quotes anywhere in the copy.** ASCII punctuation only. Hyphens inside compound words (`high-quality`, `post-purchase`) are fine.
- **No padding.** Cut "we're excited to share", "as you may know", "in this email", and every other meta-opener. Start where the campaign starts.
- **No fabrication.** If a required fact is unverifiable, clearly state what is missing inline. Never `N/A`, never `TBD`, never an invented value. A missing-info note is recoverable; an invention is not.
- **No generic instincts.** No "game-changing", no "revolutionary", no exclamation-stuffing, no vague transformation language, no empty intensifiers.

Title Case for headings unless brand memories specify a different convention. Respect brand-specific capitalization from profile exactly.

#### 8. Writer self-check

Before handing draft to reviewer, scan for the four failure modes above: dashes, padding, fabricated facts, generic instincts. Fix issues you catch. This self-check does not replace Phase 2; it is a pre-filter.

### Phase 2: Review

Phase 2 runs for every target. It is mandatory. The writer-then-reviewer split is load-bearing: one drafting pass is not equivalent to two passes with different postures on the same brief.

#### 1. Run the six-lens checklist in full

Apply every lens in `references/methods/copy-review-checklist.md` to every target. The six lenses are independent passes over the same copy. Do not skip a lens because earlier lenses found enough. Run them in checklist order and report findings for each lens with violations.

The mandatory punctuation scan is part of the checklist. Every em-dash, en-dash, or hyphen-as-punctuation occurrence is a `brand-rule violation`, even when surrounding copy is strong.

#### 2. Default verdict is NEEDS REVISION

APPROVED is earned, not granted. A target is APPROVED only when every lens clears with zero findings. Copy that clears lenses 1 through 3 but includes an em-dash is NEEDS REVISION, not APPROVED. The four verdict levels are in the checklist; do not invent new ones.

#### 3. One revision pass maximum

When verdict is NEEDS REVISION, revise only lines named in findings. Do not rewrite surrounding copy. Then run the checklist once more on revised copy.

The budget is one revision pass. If revised copy still returns NEEDS REVISION, surface lens findings in handoff instead of cycling. The user decides what to accept and escalate.

When verdict is NEEDS REWRITE (wrong sections, framework, message type, or brief misread), do not revise. Return to Phase 1, Step 1 for that target and rewrite from the brief. Count this as the one revision pass for that target.

When verdict is BLOCKED (brief unreadable, structurally incomplete, or no copy possible), record target in `## Blockers` and continue batch.

### Phase 3: Output

#### 1. Print the final copy

Print final copy for every target to chat. Use campaign or node title as heading. No preamble, meta commentary, or rationale paragraph. The copy is the deliverable.

For a batch, separate targets with `---` and a heading per target.

#### 2. Optional file write

If the user named a destination, write there. If none is named, read `user.md`. If no preference exists, write brand-specific copy drafts to **the same location holding this brand's context**, sub-organized by type per root SKILL.md branch table (Branch A Project: same project, `YYYY-MM-DD-title-copy.md`; Branch A connector: `<connector>/MX/brand/<slug>/copy/`; Branch B: `brand/<slug>/copy/YYYY-MM-DD-title.md`). Tell the user where they are going. Record durable destination preference in `user.md` when writable. If no durable write is available, chat is the artifact.

#### 3. Handoff

End run with a short handoff block:

- Targets written.
- Any unresolved missing-info items, named with the target and the missing fact.
- Any review findings that survived the one revision pass.
- Any voice-versus-brief conflict that the user needs to resolve.
- Any blockers.

## Hard prohibitions

- Do not skip Phase 2. The review is mandatory. The writer-then-reviewer split is load-bearing.
- Do not invent products, URLs, claims, discounts, codes, metrics, policies, testimonials, offer terms, prices, ship thresholds, return windows, launch dates, founder bios, or ingredients.
- Do not use em-dashes, en-dashes, curly quotes, or hyphen-as-punctuation anywhere in the copy.
- Do not pad. No "we're excited to share", no "as you may know", no "in this email".
- Do not reach for generic instincts: no "game-changing", no "revolutionary", no exclamation-stuffing, no empty intensifiers.
- Do not draft replacement copy inside review findings. The reviewer gives direction; the writer revises.
- Do not modify briefs or flow structure. Those belong to other procedures. Do not create extra brand docs; propose canonical brand-context updates only.
- Do not return tool narration, preamble, or meta commentary. The copy is the output.

## Conflict rules

When sources disagree, resolve in this order:

1. User-confirmed facts in the current request.
2. Verified facts and exact required language from brand-owned sources.
3. Brand voice rules from `voice.md` (voice wins over tactical brief instructions on conflict).
4. Brief strategy and structure.
5. Brand memories and recent real sends for rhythm and vocabulary.
6. Strategic judgment.

A clearly flagged missing fact outranks a guess at any level.

## Handoff

End by naming targets written, listing unresolved missing-info items, and noting review findings needing user input. A partial, clearly marked run is recoverable. A truncated invention is not.

Suggest one plain-language next action: "Review these drafts, then tell me what to revise or approve."
