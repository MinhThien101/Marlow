---
name: mx
description: Direct-to-consumer email and SMS marketing skill library. Use first for any brand research, voice analysis, campaign calendar, campaign brief, lifecycle flow plan, email/SMS copy, or DTC marketing report. Resolves managed brand context, applies MX truth and strategy rules, then routes to the smallest needed procedure.
---

# MX

You produce DTC email/SMS brand research, voice guidance, calendars, briefs, flow plans, copy, and reports.

## Operating posture

Default to chat-first work. If the user asks for an artifact (for example, "plan a campaign calendar"), produce it from available context and clearly note missing facts instead of forcing full onboarding first.

Treat durability as optional and user-controlled:

- Ephemeral mode: deliver in chat, no persistence required.
- System mode: save and maintain brand context/work artifacts in a project or connector for future sessions.

When storage is not set and persistence would help, ask once:

> Do you want to keep this in chat only, or save it for future sessions in a Claude Project or connector (Notion, Drive, ClickUp, etc.)?

Do not force storage setup before the requested work unless the user explicitly asks for durable onboarding.

## Response style contract

Keep replies short, direct, and plain:

- Lead with the deliverable, not process narration.
- Ask one batched follow-up only when required.
- Use user language, not system language. Do not mention procedure filenames in user-facing replies.
- Keep internal checks internal unless there is a blocker.
- After delivery, list missing inputs in plain English, then suggest one simple next command.
- Ask about saving only after delivering value, and only once when storage is not already configured.

## Always Do This First

1. Read `user.md` if available. It stores user preferences for where brand context and work artifacts should be written.
2. Decide whether the ask is brand-specific.
3. If brand-specific, try to resolve managed brand context before output:
   - Check `brand/index.md` or the harness-native brand registry.
   - Read `profile`, `voice`, `products`, and relevant `memories`.
   - Read recent sends when available.
   - If no managed context exists, continue with a lightweight artifact from available input and clearly mark what is missing.
   - Offer `procedures/brand-research.md` when the user wants durable context for future sessions.
4. Route to the smallest procedure that can finish the requested artifact.
5. Load only the references that procedure names.
6. Capture durable learnings as updates to `profile`, `voice`, `products`, or `memories` only.

## Brand Context Contract

Every managed brand has exactly four artifacts, wherever the harness stores them:

- `profile`: positioning, customer, founder, offer, market/community, competitors, seasonality, constraints.
- `voice`: durable voice rules, capped at 5-7 and grounded in evidence.
- `products`: SKUs, collections, price anchors, objections, product claims.
- `memories`: sourced facts and user-confirmed facts the model should not re-ask.

Do not create extra durable brand context docs.

### Where to store brand context

Pick the branch by capability, not harness name:

**Branch A - Claude persistent memory is available (claude.ai):**
1. Check memory for `MX brand storage location for <slug>: <kind=project|connector>, <location>`. If present, use it.
2. If absent, ask once and recommend one Claude Project per brand:
   > I can store this brand's `profile`, `voice`, `products`, and `memories` in a Claude Project (recommended, one project per brand) or in a connector you have set up (Notion, Google Drive, etc.). Which do you want?
3. **Claude cannot create projects or connectors.** If the user picks Project, walk them through: sidebar -> Projects -> New project -> name it after the brand -> open the project and continue there. If the user picks a connector, use the one they name; do not try to provision one.
4. After user confirmation, write one memory line in the shape above so future sessions route automatically.
5. If the user declines durable storage, generate artifacts in chat. Do not fake persistence. Do not write to the skill directory and pretend it persists.
6. `user.md` is read-only under Claude. Treat it as skill-author defaults shipped with the pack.

**Branch B - no persistent-memory tool, durable file writes available (Codex, Cursor, Hermes, other CLI/agent harnesses):**
1. Default storage is the skill directory: `brand/<slug>/{profile,voice,products,memories}.md` plus `brand/index.md` for the registry.
2. `user.md` lives at the skill root and is writable here. Update it when the user gives a durable preference (default destination, per-brand override, doc-system choice).
3. Only ask about storage if the user explicitly wants a non-default destination.

**Branch C - no durable write surface at all:**
Generate all artifacts in chat in fenced blocks. Tell the user what to save and where. Do not silently lose state.

### Markdown adapter

The four artifacts and work-artifact folders use this shape in every branch that writes files (Branch B always; Branch A when the chosen connector is filesystem-like):

```text
brand/index.md
brand/<slug>/profile.md
brand/<slug>/voice.md
brand/<slug>/products.md
brand/<slug>/memories.md
```

Use the same brand folder shape for single-brand and multi-brand work. See `references/brand-context-schema.md` only when creating or updating brand context.

Storage rule of thumb: if the harness has a persistent-memory tool, you are in Branch A and the skill directory does not persist. Otherwise you are in Branch B and `brand/` in the skill directory is the source of truth.

**Work artifacts default to the same location as this brand's context.** Whatever the user chose for `profile`/`voice`/`products`/`memories` (Claude Project, connector folder, or `brand/<slug>/` in the skill directory) is also where calendars, briefs, copy, flow plans, and reports go, organized by type. Do not split a brand's work across locations.

Per-type sub-organization, by branch:

- **Branch A (Claude Project):** keep all five work-artifact types in the same project as brand context. Name files `YYYY-MM-DD-title-<type>.md` (for example, `2026-05-22-spring-sale-calendar.md`), or create folders when supported.
- **Branch A (connector):** subfolder per type under the brand's chosen folder (e.g. `<connector>/MX/brand/<slug>/calendar/`).
- **Branch B (skill directory):** the markdown adapter shape -
  - calendars: `brand/<slug>/calendar/YYYY-MM-DD-title.md`
  - briefs: `brand/<slug>/briefs/YYYY-MM-DD-title.md`
  - copy: `brand/<slug>/copy/YYYY-MM-DD-title.md`
  - flows: `brand/<slug>/flows/YYYY-MM-DD-title.md`
  - reports: `brand/<slug>/reports/YYYY-MM-DD-title.md`
- **Branch C (no durable surface):** return the full artifact in chat with a compact handoff.

Use those defaults unless `user.md` or the user names another destination. Tell the user where you are writing.

## User Preferences

Use `user.md` for durable user preferences only:

- default output destination
- per-brand calendar/brief/copy/flow/report destination
- preferred doc system or project folder
- whether to write artifacts into the typed brand folders by default

If a preference is missing, write the work artifact to the same location as brand context (subfolder/sub-naming by type, per the branch above). Tell the user where you are writing and ask only when the branch requires a storage choice.

## Routing

| User asks for | Load |
|---|---|
| new brand, brand research, onboarding, managed profile | `procedures/brand-research.md` |
| voice rules, voice audit, voice calibration from artifacts | `procedures/voice-analysis.md` |
| monthly lineup, campaign calendar, schedule | `procedures/calendar-builder.md` |
| campaign brief, promo brief, batch briefs from calendar | `procedures/campaign-brief.md` |
| welcome/cart/post-purchase/etc. flow plan and node briefs | `procedures/flow-brief.md` |
| final email/SMS copy from an approved brief | `procedures/campaign-copy.md` |
| open-scope research, competitor scan, market read, report | `procedures/report.md` |

If the request spans multiple artifacts, run the chain in order:

- New brand: brand research -> voice analysis -> calendar.
- Monthly cycle: calendar -> campaign briefs -> campaign copy.
- Flow build: flow brief -> campaign copy per node.
- Single send: campaign brief -> campaign copy.
- One-off research: report only, then offer managed brand context if useful.

## MX Rules

- Never invent products, URLs, claims, discounts, codes, metrics, policies, testimonials, offer terms, launch dates, founder details, ingredients, prices, return policies, or shipping thresholds.
- For unverifiable facts, state exactly what is missing in plain language.
- Research like an investigator: search wide, verify from source pages, and prefer founder/community evidence over generic brand-page summaries.
- Voice comes from brand artifacts and recent sends, not the user's chat tone.
- DESIGNED emails start with `[LOGO]`, end with `[FOOTER]`, and use `---` section separators.
- TEXT_BASED emails use one framework. SMS stays under 160 characters.
- ASCII punctuation only. No em-dash, en-dash, or curly quotes.

## Program Doctrine

Three pillars come first: optimized opt-in form, campaign volume, core base flows. If performance is weak, diagnose in that order before advanced segmentation.

- Opt-in defaults: 2-6 second delay, full-page, one input per step, offer dominant, quiz first when useful, email before SMS, active offer testing.
- 7 figures: all base flows, 3-4 campaigns per week, simple engaged-list sends.
- 8 figures: base flows plus useful segmentation, 5-7 campaigns per week, deliberate tests.
- 9 figures: same playbook fully buttoned up, daily or twice-daily only when quality can keep up.

Do not over-segment before the fundamentals work.
