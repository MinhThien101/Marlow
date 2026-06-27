# Brand context schema

## Education

Brand context is the single source of truth for the brand. Storage is branched (see the Brand Context Contract in root `SKILL.md`):

- **Branch A - Claude:** store location in persistent memory as `MX brand storage location for <slug>: <kind=project|connector>, <location>`. Recommend one Claude Project per brand. Claude cannot create projects/connectors, so tell the user to create them.
- **Branch B - file-writable harness with no persistent memory:** `brand/<slug>/` inside the skill directory. `user.md` at the skill root is writable.
- **Branch C - no durable write surface:** print artifacts in chat; do not fake persistence.

If no usable brand context exists for brand-specific work, start with `procedures/brand-research.md`. If context is thin, voice and claims will be generic; tell the user before proceeding.

Every managed brand has exactly four canonical artifacts:

- `profile`
- `voice`
- `products`
- `memories`

Do not create extra durable brand docs. If a durable fact matters, put it in one of these four. Recent sends, uploads, and work artifacts can exist as support material, but they are evidence/outputs, not profile artifacts.

The portable markdown adapter uses this shape:

- **Brand index**: `brand/index.md`. Use when the workspace may manage more than one brand.
- **Brand folder**: `brand/<slug>/profile.md`, `brand/<slug>/voice.md`, `brand/<slug>/products.md`, `brand/<slug>/memories.md`. Use this for single-brand and multi-brand work.
- **Work artifacts**: default to the same location as this brand's context (chosen branch). Under the markdown adapter: calendars in `brand/<slug>/calendar/`, briefs in `brand/<slug>/briefs/`, copy in `brand/<slug>/copy/`, flow plans/node briefs in `brand/<slug>/flows/`, reports/reviews in `brand/<slug>/reports/`. Use filenames like `YYYY-MM-DD-title.md`. Under a Claude Project, keep artifacts in the same project as brand context, named by type (`...-calendar.md`, `...-brief.md`, etc.).

The harness must see the storage surface. If it can list files, docs, memories, or project records, check the brand's chosen storage location, `user.md`, and the brand index first. Once this convention exists, use it quietly.

Why the markdown adapter exists: the pack is harness-agnostic and needs one durable shape any agent can inspect. If the harness uses Google Docs, Notion, memory, or project docs, map the same fields there. The schema matters more than the medium.

Why markdown works as fallback: every file is human-readable and editable. The operator updates voice when voice changes and adds memories when facts are verified. Procedures read what exists and do not silently mutate durable state.

## Template

### `brand/index.md`

Registry across brands, not a per-brand artifact. Shape:

```
# Brand Index

| Brand | Slug | Storage | Status | Last updated | Notes |
|---|---|---|---|---|---|
| <Brand Name> | <slug> | brand/<slug>/ | profile, voice draft, products, memories | <YYYY-MM-DD> | <voice thin, products missing prices, recent sends available, etc.> |
```

Keep the index compact. Update when a brand is created, moved, renamed, or materially updated. If the harness stores brand context in Google Docs, Notion, memory, or another system, `Storage` names that location instead of a file path.

### `profile.md`

Durable brand identity. Update when positioning shifts, founders change, or the product line expands. Shape:

```
# <Brand Name>

## Positioning
<one or two paragraphs: what the brand sells, who it sells to, what makes it
different from the obvious competitors. Concrete, not aspirational.>

## Founder
<name, public presence if any, voice posture if known>

## Product line
<top SKUs or collections. Hero attributes per item. Price anchors. Subscription
or one-time. Bundle structure if any.>

## Current offer
<the standing welcome discount, the standard promo mechanic, any always-on
incentive. missing info if unknown.>

## Customer archetype
<who buys this. One or two sentences. Concrete enough to picture.>

## Market and community
<plain-English category primer, adjacent alternatives, key terms, where the
audience gathers, and recurring community debates or questions.>

## Competitive position
<main competitors or alternatives, where the brand wins, where gaps remain,
and what customers compare when choosing.>

## Seasonality and planning hooks
<seasonal buying rhythms, important events, campaign windows, slow periods,
and recurring content hooks.>

## Brand-wide constraints
<anything that applies to every send: required disclaimers, banned vocabulary,
mandatory unsubscribe phrasing, capitalization conventions specific to this
brand (e.g. "the brand name is always lowercase").>
```

### `voice.md`

Durable style posture. This is the source of truth for voice. The voice-analysis procedure (`procedures/voice-analysis.md`) refines it from real artifacts; do not invent voice rules from chat tone or generic instincts.

```
# Voice | <Brand Name>

## Posture
<one or two sentences describing the overall stance: warm-and-direct, terse-
and-technical, playful-and-irreverent, etc. Real-world reference point if
useful.>

## Rules (5 to 7 durable patterns)

### <Rule name>
**Do:** <concrete example or phrasing pattern>
**Don't:** <concrete counter-example>
**Why:** <one-line reason this rule exists for this brand>

### <Next rule name>
**Do:** ...
**Don't:** ...
**Why:** ...
```

Five to seven rules is the cap. More and the model cannot hold them while writing. Each rule needs a concrete do/don't pair grounded in real brand artifacts.

### `products.md`

Top SKUs the brand actually sells, with hero attributes, objections, and price anchors. Shape:

```
# Products | <Brand Name>

## <Product or Collection Name>
- Hero attributes: <2 or 3 concrete attributes a buyer would actually care
  about>
- Price anchor: <$X, or missing info if unknown>
- Common objections: <real objections, not invented ones. Sourced from
  reviews, returns, support tickets, founder commentary.>
- Common framings the brand uses: <if the brand has a canonical hook for
  this product, name it>

## <Next product>
...
```

### `memories.md`

Verified facts the model would otherwise invent. Sourced and dated. Treat this file as a contract for what is and is not known. If a fact is here with a citation, it is verified. If a claim is not here and cannot be verified from `profile.md`, `voice.md`, or `products.md`, output `missing info: <what is missing>`.

```
# Memories | <Brand Name>

## <Memory title>
**Claim:** <one-line statement of fact>
**Source:** <URL, file reference, or "user confirmed YYYY-MM-DD">
**Date verified:** <YYYY-MM-DD>
**Notes:** <one line of context if needed>

## <Next memory>
...
```

What belongs here: founder online presence (with handles), community gathering spots, voice-sample anchors with URLs, third-party framings, niche facts not covered in profile, and user-confirmed facts that should not be re-asked.

What does NOT belong here: opinions, voice rules (in `voice.md`), banned phrasings (in `voice.md` or `profile.md`), strategic recommendations, speculative conclusions, or transient tactical notes. If a fact supports a voice rule, save the evidence here and the rule in `voice.md`.

### `recent-sends/YYYY-MM-<topic>.md`

Prior sends, one file per send. Include subject line, short summary, and send date. Used for voice evidence and repetition avoidance. Procedures scan filenames for the last 90 days when planning a new send. Shape per file:

```
# <Subject line as sent>

**Sent:** <YYYY-MM-DD>
**Channel:** email | sms
**Type:** DESIGNED | TEXT_BASED | SMS

## Summary
<2 or 3 sentences: what the send did, what angle it took, what offer was in
play if any. Enough that a future planner sees the angle without re-reading
the whole email.>

## Body excerpt (optional)
<a few lines of the actual copy if voice calibration matters>
```

## Examples

A worked example brand lives at `../brand-example/` in the repo. It uses the single-brand flat layout and demonstrates real `voice.md` rules, real `memories.md` entries with citations, and a small `recent-sends/` set. Do not duplicate it inline here; read the files directly when you need a reference shape.

A typical `voice.md` rule fragment looks like:

```
### Sentence length

**Do:** Write short. Most sentences under 15 words. One- to three-word
sentences are fine for emphasis.

**Don't:** Compound sentences with multiple clauses. Em-dashes used as
connectors.

**Why:** Customers scan on phones. Long sentences get skipped.
```

A typical `memories.md` entry fragment looks like:

```
## Founder voice anchor

**Claim:** Founder posts on r/<subreddit> under screen name <handle>. Voice
is terse, technical, admits uncertainty.

**Source:** https://reddit.com/r/<subreddit>/comments/<thread>

**Date verified:** 2026-04-12

**Notes:** Three quoted posts in the linked thread show the pattern.
```
