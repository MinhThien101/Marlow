# Voice analysis method

## Education

Voice analysis extracts durable patterns from brand artifacts. Patterns become rules in `voice.md`; supporting evidence becomes cited entries in `memories.md`. Output is advisory: the user confirms each proposed rule before it lands.

### What voice analysis IS

- Reading real artifacts the brand actually produced. Recent campaigns. Founder letters. Website pages. Podcast or interview transcripts. Forum or community posts the founder authored under their own name.
- Identifying patterns that repeat across multiple artifacts. Repetition is the signal.
- Proposing durable rules: atomic, enforceable, citable against specific examples.

### What voice analysis IS NOT

- Inferring voice from a single send. One example is a data point, not a pattern.
- Inferring voice from the brand's category. "Skincare brands sound like X" is a stereotype, not a voice rule.
- Inferring voice from the user's chat tone. The user is not the brand.
- Inferring voice from competitor copy. The competitor is not the brand either.
- Writing aspirational positioning ("warm and human"). That belongs in `profile.md`.

### The artifact threshold

Three to five real artifacts is the minimum for a durable rule. Fewer means the rule is likely a guess. Pattern strength matters more than count: a rule repeated identically in three artifacts is stronger than a loose pattern across seven.

When evidence is thin, return a low-confidence observation, not a hard rule. Flag the gap. Recommend more artifacts. Do not promote thin evidence to rule status.

### Breadcrumb discipline

Voice analysis should surface durable facts future passes should not re-derive. Save them to `memories.md` with citations. Breadcrumb-worthy facts include:

- Founder's online presence (platform, screen name, posting frequency, stylistic tics).
- Voice-sample anchors: two or three exact quotes with URLs and a one-line pattern summary.
- Community framings: how customers describe the brand in their own words, with the URL of the source.
- Brand-owned pages worth re-fetching on the next pass.

Do not save:

- Voice rules themselves. Those go through the proposal path so the user confirms them.
- Banned phrasings. Those belong in `voice.md` after confirmation.
- Opinions, judgments, strategic recommendations.
- Anything that cannot be cited.

A breadcrumb without citation is a rumor. A rumor in `memories.md` becomes a fabricated claim later.

## Template

### Analysis procedure

1. **Set scope.** Name what you are analyzing (for example, "last 12 campaigns plus founder letters across April and May"). Include scope in the deliverable.

2. **Gather evidence.** Read at least 3-5 artifacts:
   - `profile.md` for existing positioning and prior voice notes.
   - `memories.md` for existing cited evidence and prior breadcrumbs.
   - `recent-sends/` for the most recent real campaigns across every channel.
   - Brand-owned pages (About, founder letter, product pages) via a fetch tool if available.
   - Founder posts in external communities, if discoverable.

   Prefer recent over old. Voice drifts. A 3-year-old founder letter is less reliable than last quarter's send.

3. **Extract patterns by category.** Look for:
   - Approved vocabulary and phrasing the brand uses repeatedly.
   - Anti-vocabulary the brand consistently avoids.
   - Punctuation habits (including dash and exclamation-mark behavior).
   - Sentence rhythm (short and punchy, flowing, formal).
   - Greeting and sign-off conventions.
   - CTA verb choices.
   - Formatting habits (bold, caps, emoji, line breaks).
   - Common framings and thematic hooks.

4. **Draft 5-7 atomic rules.** Each rule:
   - States one durable behavior in one sentence.
   - Cites 2-3 supporting artifacts with titles and URLs.
   - Includes a do/don't example pulled from real artifacts (no invented samples).

5. **Distinguish rules from evidence.** `voice.md` owns durable stylistic rules (for example, "brand uses founder 'we' when team is involved, founder 'I' for personal notes"). `memories.md` owns cited evidence that supports future work (for example, "April founder note uses collective 'we' in opening and close"). Do not save rules as memories.

6. **Save research breadcrumbs.** Append cited facts to `memories.md` (founder presence, voice anchors, community framings). Check duplicates first; update existing entries instead of creating overlaps.

7. **Produce the proposal document.** Use the return shape below. Include scope, confidence, source count, proposed voice profile updates, proposed memory evidence, existing rules to retire, and low-confidence observations.

### Return shape

```
## Voice Analysis

**Scope:** <what was analyzed>
**Confidence:** high | medium | low
**Sources Inspected:** <count of campaigns, notes, and fetched pages>

## Proposed Voice Profile Updates

<omit this heading if no profile updates are recommended>

### <Pattern name>
**Current Profile Says:** <what voice.md currently says, or "not captured">
**Proposed Update:** <new wording>
**Supporting Evidence:**
- <source title or URL>
- <source title or URL>

## Proposed Brand Memories

<omit this heading if no new memories are recommended>

### <Evidence anchor name>
**Claim:** <one sourced fact or quote anchor>
**Why Save:** <one sentence why future work should not re-derive this>
**Supporting Evidence:**
- <source>
- <source>

## Existing Rules To Retire

<include only if existing rules are contradicted by the evidence>

- **<Existing rule>:** <why it is no longer supported>

## Low-Confidence Observations

<include patterns that appear but lack enough evidence for a hard rule>

- <observation with what would need to be true to promote it to a rule>

## Top-Level Blockers

<include only when the brand has no real content to analyze at all; otherwise omit>
```

### Posture rules

- Default output is a recommendation. The user confirms each rule before it lands in `voice.md`.
- Confidence is a returned field, not a refusal trigger. Limited-confidence findings are valid output.
- Top-Level Blockers is reserved for "no analyzable content exists." Thin or partial content is a low-confidence finding, not a blocker.
- Do not write voice guidance into campaign briefs. The brief skill enforces this from the other side.
- Do not infer broad rules from a single example. Multiple examples or no rule.

## Example

One short worked analysis. Placeholder brand name only.

### Scope

Recent sends for `<missing info: brand name>`: 4 campaigns (3 email, 1 SMS) across the last 30 days. Plus the brand's About page and one founder letter on the homepage.

### Artifact excerpts and pattern extraction

Three excerpts pulled from the artifacts (placeholder content only):

Excerpt A (campaign 1, subject line):
> your tuesday discount is inside

Excerpt B (campaign 2, body opener):
> a quick note from the team. we made the new fall blend with one specific morning in mind.

Excerpt C (About page, founder voice):
> we started this because we couldn't find what we wanted. that's still the only reason we make it.

Pattern observed across all three: subject lines and body openers use lowercase sentence case. No title case. No exclamation marks. The voice is collective ("we", "the team"), not founder-singular ("I").

### Extracted rule

**Rule name:** Subject line and opener case

**Proposed Rule (for voice.md):** Subject lines and the first sentence of body copy use sentence case. Capitalize only the first word and proper nouns. No title case anywhere in headlines or openers.

**Rationale:** Repeats across every recent send and the brand's About page. The consistency reads as deliberate, not accidental.

**Supporting Evidence:**
- Campaign 1: subject line "your tuesday discount is inside"
- Campaign 2: body opener "a quick note from the team..."
- About page: "we started this because..."

### Final voice.md entry

The proposal lands in `voice.md` (after user confirmation) as a single atomic line under a "Case and capitalization" heading:

> Subject lines and body openers use sentence case. No title case. Capitalize only the first word and proper nouns.

The rule is enforceable in copy review with a single scan. That is the test. If a proposed rule cannot be enforced in a single scan, it is positioning prose, not a voice rule. Move it to `profile.md` or drop it.

## What this document does not do

- It does not apply voice rules to copy. That belongs to the copy purpose's voice-application reference.
- It does not write voice rules directly. Proposals go through the user. Memories store cited evidence, not rules.
- It does not replace the investigative-research skill. When brand state is thin, load that skill first.
