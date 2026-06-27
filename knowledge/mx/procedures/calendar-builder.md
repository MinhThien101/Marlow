# calendar-builder

This procedure inherits the root `SKILL.md` contract: resolve managed brand context first, flag missing facts clearly, load only needed references, deliver to the requested destination or chat, and capture durable learnings only as proposed updates to profile, voice, products, or memories.


Load this procedure when the user asks to plan a month's campaigns, build a campaign calendar, or schedule a lineup. You propose calendars. Do not brief. Do not write copy. Your return message is the deliverable. If planning surfaces durable cadence or campaign facts, propose updates to profile, products, or memories only.

A calendar is a lineup: send dates, types, one-sentence descriptions. Nothing more. If an entry turns into a brief, the calendar is wrong.

## Capability surface

- One monthly calendar, delivered to the requested destination, or chat if none is named.
- New calendar or update to an existing one.
- Optional file write per the root output conventions.

## Workflow

### 1. Run the root context check

Confirm `user.md`, brand index/registry, canonical brand context source, web research availability, durable destination, and recent-send access.

If no managed brand context exists, do not block the calendar. Build from available user input, clearly mark unknowns, and optionally offer `procedures/brand-research.md` after delivery if the user wants durable brand state.

### 2. Lock the planning target

Establish the planning period and whether this is a new calendar or an update.

- Default period: one calendar month.
- If the user has not named a month, ask once.
- If an existing calendar for the period is in the working directory or named by the user, treat this run as an update. Capture the existing file path or title for handoff.
- If the planning period cannot be determined, return `## Top-Level Blockers` and stop. Top-level blockers are reserved for this condition only.

### 3. Lock volume

Read the brand's durable context for cadence rules (monthly email count, SMS count). If none exists, ask once for target monthly volume, then suggest saving that answer to brand context so next month does not re-ask.

Default if the user has no opinion: about three to four campaigns per week. State the default before locking.

### 4. Gather context (use what is available)

Load context in this order from files, docs, memory, attachments, or pasted material. The markdown paths below are adapter examples; use harness-native equivalents when present.

- `brand/<slug>/profile.md` for positioning, product lineup, audience.
- `brand/<slug>/voice.md` for tone, banned phrasings, capitalization rules.
- `brand/<slug>/products.md` for product priorities, launches, blockouts.
- `brand/<slug>/memories.md` for durable rules: volume, cadence, banned themes, fixed anchors, recurring monthly hooks.
- `recent-sends/` filenames for the last 90 days, to avoid repeating recent angles and products.
- Any existing calendar document for the prior period.

If brand context is missing, continue with user-provided facts plus placeholders. If context is thin or newly onboarded, suggest a voice refinement pass for better specificity. Working from an empty profile can produce generic calendars, so flag that risk briefly in handoff.

If web research is available, use it to find holidays, seasonal moments, industry events, cultural moments, and launches that affect the period. Verify dates against brand-owned or event-owned pages before locking. Never invent.

### 5. Batch user input for the fixed anchors

In one message, ask for anything brand state and research cannot supply:

- Fixed dates: launches, sales, promotions, blockouts.
- Priority products or collections for the period.
- Known offer details (codes, terms, expiration).
- Campaigns to retain from the prior calendar.
- Themes or angles to avoid.

Skip the message if you already have everything. Do not ask twice.

### 6. Build the lineup

Plan in this order:

1. Fixed anchors first (launches, sales, holidays the brand will honor).
2. Recurring brand moments next (monthly themes, product of the month, recurring SMS slot).
3. Proven winners from prior sends, if known.
4. Filler campaigns last, rotated for variety.

Variety rules:

- Balance the five content pillars across the month: educational, social proof, community/brand, product, and sales.
- Do not repeat the same angle in back-to-back campaigns unless it is an intentional sequence.
- Do not feature the same product in consecutive standalone campaigns unless the user wants it.
- Mix campaign types across DESIGNED, TEXT_BASED, and SMS. Too many discount pushes burn the list. (Pull from `references/briefs/brief-structure-selection.md` only to inform variety; do not bake structure into calendar entries.)
- Sprinkle text-based emails as pattern interrupts; do not cluster them.
- Standalone campaigns should not duplicate active flow coverage.

Angle options to rotate: One Benefit, One Feature, FAQ, What's Inside, How It's Made, How To Use, Back In Stock, Trending Products, Testimonials, Us vs Them, Myths vs Facts, Blog Promo, Research Study Highlight, Holiday Email, Progress Update, Customer Transformation, Before vs After, Note From The Founder, Gift Guide, Treat Yourself, Behind The Scenes, Tips and Tricks, UGC Content, Sneak Peek, Throwback, Staff Picks, Brand Values. Use these as options. Choose what fits. Do not force them.

### 7. Write the calendar

Use the literal template in `references/methods/calendar-format.md`. Field set, order, heading format, and output shapes are defined there. Do not paraphrase the format.

One level-two heading per campaign. Include the send date in each heading using friendly format (`Month, DayOrdinal Year`, example `April, 14th 2026`). One sentence under each heading. No bullets, section plans, copy suggestions, or rationale.

For any unverifiable fact (date, offer terms, link, launch detail), state exactly what is missing inline. List every missing item under `## Missing Info Needing User Input` at the bottom.

### 8. Self-check before returning

- Document title matches the first in-document heading exactly.
- Campaign count matches confirmed volume. If it must deviate, flag it in `## Scope Summary`.
- Each campaign heading carries `<Month, DayOrdinal Year> | <Title> | <Designed | Text Based | SMS> | <Brand Name>`.
- Every campaign entry has a concrete date, or an explicit "missing date - confirm send date" note in the date slot.
- One sentence per campaign. No prose creep.
- Fixed anchors are reflected in the lineup, not buried.
- No back-to-back angle or product repetition.
- No duplication of active flow coverage.
- Every unverifiable fact is explicitly marked as missing, not invented.
- ASCII punctuation only. No em-dash, no en-dash, no curly quotes.
- `## Top-Level Blockers` is present only if the planning period cannot be determined; otherwise omit.

### 9. Output

Deliver to the user's requested destination. If none is named, read `user.md`. If no preference exists, write the calendar to **the same location as this brand's context**, sub-organized by type per the root SKILL.md branch table (Branch A Project: same project, file `YYYY-MM-DD-title-calendar.md`; Branch A connector: `<connector>/MX/brand/<slug>/calendar/`; Branch B: `brand/<slug>/calendar/YYYY-MM-DD-title.md`; Branch C: chat). Tell the user where it is going. Record any durable destination preference in `user.md` when writable. If updating an existing calendar, offer to merge or replace; do not silently overwrite.

### 10. Handoff

End by naming the calendar (title or file path), listing unresolved placeholders in one short block, and suggesting one plain-language next action:

When ready, tell the user to say: "Brief each campaign in this calendar."

If storage is not configured and the user has not given a preference, optionally ask once whether to keep this calendar in chat or save it to a durable destination (project or connector) for future sessions.

## Hard prohibitions

- Do not write briefs. One sentence per campaign, full stop.
- Do not write copy, sample subject lines, sample body text, or sample SMS.
- Do not include rationale, strategy explanations, voice direction, tone guidance, section plans, or audience language in the calendar body.
- Do not invent dates, offers, codes, links, launch details, product names, or anchors. Clearly mark missing facts instead.
- Do not modify brand context unless the user asks. If a durable cadence rule emerges (for example, "always include one loyalty SMS per month"), suggest saving it to the brand context. Do not write it silently.
- Do not over-segment at the expense of campaign volume. Core engaged-list sends do the revenue work; targeted sends are supplemental unless the brand's stage and data justify them.
- Continue into briefing or copy only when the user asked for the monthly workflow; otherwise suggest the next skill.
- Do not return tool narration, preamble, or meta commentary. The deliverable IS the return.

## Conflict rules

When sources disagree, resolve in this order:

1. User-confirmed facts in the current request.
2. Verified facts from brand-owned sources.
3. Brand memories and profile.
4. The calendar format reference.
5. Strategic judgment.

A clearly flagged missing fact outranks a guess at any level.
