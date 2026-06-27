# Brand research method

## Education

Brand research builds initial brand context from public artifacts when the brand is new to this pack. Output is an index entry plus seeded context: profile, voice draft, products, and cited memories. In markdown, these are `brand/index.md`, `profile.md`, `voice.md`, `products.md`, and `memories.md`. Other skills read the same fields from the harness; without them, downstream work becomes guesswork.

### What brand research IS

- Constructing the initial brand context from web research, named URLs, and any material the user uploads.
- Producing a structured research report internally, then running a user checkpoint before revealing or writing full findings.
- Updating the brand index and seeding the four core brand context artifacts so the rest of the pack has something to read.

### What brand research IS NOT

- A voice analysis pass. That comes after, when the brand state is rich enough to pattern-match against.
- A first-month calendar. That comes after, when voice analysis has confirmed the rules.
- An ongoing research function. This is the one-time onboarding pass. Later research belongs to the report skill or runs inside other skills when brand state is thin.

### The investigator mindset

The brand site is the floor of what is knowable, not the ceiling. A founder's old forum post can show more real voice than an About page. Community threads, third-party reviews, podcast interviews, and AMA transcripts often reveal positioning that brand pages smooth over.

Lateral sourcing means triangulating independent sources. Two independent sources beat one loud source. Verify before writing. A flagged gap is recoverable. A confident guess compounds credibility loss.

### The revision loop discipline

Workflow: research, checkpoint, revise (up to 3), seed when chosen.

The 3-revision cap is deliberate. After three rounds, returns usually drop. The user either has enough or must upload material directly. A fourth pass on the same inputs usually gives a different draft, not a better one.

Do not add steps outside this workflow. Brand research does not write enforceable voice rules to `voice.md`; voice-analysis does. Brand research seeds `voice.md` as a draft with observations and citations. These are different artifacts.

## Template

### Workflow steps

1. **Input.** Take the brand URL or brand name. Ask for storefront URL, country, and founder names if missing. Ask once in one batched message. Do not chain follow-ups.

2. **Discover via web research.** Use a web research tool if available. Cast wide: brand pages (About, founder letter, product pages), third-party reviews, forum threads, founder posts in external communities, podcast or interview transcripts. If no web tool exists, ask the user to paste material.

3. **Verify deep.** Fetch highest-signal pages. Pull 2-3 direct quotes per voice anchor with URLs and nearby context. Pull product specifics (name, line, price tier, key attribute) from product pages, not marketing pages.

4. **Cover the research map.** Before drafting, ensure evidence for founder, market, product ecosystem, audience, competitors, community, seasonality, and messaging implications. Missing evidence becomes a placeholder or client-validation flag, never an invented conclusion.

5. **Draft the research report.** Use the shape below. Cite sources inline. Mark unverifiable facts as missing info and list them in a closing missing-info block.

6. **Run the user checkpoint.** Do not print the full report by default. Confirm research is complete, give a short summary and missing-info list, then ask whether to (a) show full report, (b) save brand context for future sessions, or (c) continue without saving. Reveal the full report only if asked.

7. **Revision loop, up to 3 passes.** If the user requests changes, restart research with that feedback as added guidance. Do not reuse the prior draft; feedback may invalidate it. After each pass, re-run checkpoint. After 3 revisions, next step is user-uploaded supporting files. State this; do not push a fourth pass.

8. **Seed the brand context.** Once the user chooses save, write the index entry and four core artifacts to the chosen destination. With markdown, update `brand/index.md` and write to `brand/<slug>/`:
   - `brand/index.md`: brand name, slug, storage location, artifact status, last updated, compact notes.
   - `profile.md`: positioning, founder, market primer, audience, community, competitors, campaign hooks, product-line summary, voice signals as observations, integrations.
   - `voice.md` DRAFT: observed patterns with citations. Note prominently at the top that this is a draft awaiting voice-analysis confirmation.
   - `products.md`: product line with name, line, price tier, key attribute. One row per product.
   - `memories.md`: cited breadcrumbs (founder online presence, voice anchors, community framings, third-party positioning quotes).

9. **Hand off.** Suggest voice-analysis as next step. Brand state is now rich enough to extract durable rules.

### Research report shape

```
# <Brand Name> Research Report

## Positioning
<2-3 sentences on what the brand sells, who it serves, and the central claim. Cite sources inline.>

## Founder
<Founder name, background, public posting history with URLs. Note if founder is the public voice or if a team writes for them. Mark any unverifiable specifics as missing info.>

## Product line
<Product list with name, category, price tier where verifiable. Mark any gaps as missing info.>

## Market primer
<Plain-English explanation of the category, adjacent alternatives, key terms, and why the niche behaves differently. Flag market-size or trend claims that are not well sourced.>

## Audience
<Observed audience based on third-party sources and community framings, not assumption. Cite. Mark any gaps as missing info.>

## Competitive landscape
<Named competitors or alternatives, how customers compare them, where the brand appears to win, and where gaps remain.>

## Community
<Where the audience gathers, recurring questions or debates, respected voices, content formats, and what evidence supports each claim. Do not turn one-off comments into broad slang.>

## Seasonality and campaign hooks
<Seasonal rhythms, events, launch windows, slow periods, and campaign angles that follow from the evidence.>

## Messaging implications
<Practical campaign themes, proof points, triggers, and avoidances. Separate confirmed evidence from strategic synthesis.>

## Voice signals
<Observed patterns in real artifacts. Quote 2-3 lines with URLs. Mark this as observation only, not as rules. The voice-analysis pass converts these to rules.>

## Recent campaigns
<If discoverable: any campaigns surfaced via search or user-shared material. URL or user-shared file name.>

## Sources
<Bulleted list of every URL cited above.>

## Placeholders

<List of every missing-info item from the report, with the field it belongs to.>
```

### Posture rules

- The workflow is research, checkpoint, revise (up to 3), seed when chosen. Do not invent additional steps.
- Do not dump the full research report in chat before the user picks next action.
- Verify before write. A flagged gap is recoverable. A confident guess is not.
- Founder facts require extra discipline: facts and direct quotes only, sourced individually. Do not assign motives, values, or personality traits unless the founder stated them.
- Community claims need evidence weight: distinguish one-off comments from recurring themes and name the surface where they appeared.
- The revision cap is 3. After 3, the user uploads material; the research pass does not retry indefinitely.
- The voice-analysis pass is the next purpose. Do not write enforceable voice rules into `voice.md`; that is the next pass's job.
- Brand research does not build calendars, write briefs, or write copy. It seeds the index and files the other purposes consume.

### What to do when the web research tool is unavailable

If the harness has no web research tool:

- Ask the user to paste material directly (brand pages, recent sends, founder bio, product list).
- Run the same draft and present flow on the pasted material.
- Mark anything the user did not provide as missing info in the report and the seeded files.
- Note in handoff that web research was unavailable and a second pass with web access would likely close placeholders.

## Example

One short worked example. Placeholder brand name only.

### Setup

User says: "Set up `<missing info: brand name>`. URL is `<missing info: brand url>`. Founder is `<missing info: founder name>`."

### Pass 1: research and checkpoint

The research pass fetches the brand site (About, founder letter, product pages). Search surfaces a founder podcast interview and one community thread on a niche forum. Three voice quotes pulled with URLs. Product line documented from the storefront. Audience observed from community framings.

The model does not dump the full draft report yet. It returns a checkpoint:

- "Research complete for `<missing info: brand name>`."
- "Choose one: show full report, save this brand for next time, or continue without saving."

If the user asks for the full report, it includes:

- Positioning: 2 sentences citing the brand site and the founder interview.
- Founder: bio paragraph citing the interview and the founder letter.
- Product line: 8 products from the storefront with names and price tiers.
- Market primer: plain-English category explanation and key terms.
- Audience: 1 paragraph citing the community thread.
- Competitive landscape, community, seasonality, and messaging implications: concise sections with evidence weight clearly marked.
- Voice signals: 3 quoted lines with URLs and a one-line pattern summary.
- Placeholders: 2 items (recent campaigns not discoverable from the open web; specific revenue tier not stated publicly).

### Pass 2: user feedback

User responds: "The voice signals miss how serious the founder is about their craft. Look at their forum posts under `<missing info: founder screen name>`."

Restart the research phase with the feedback. Discover the founder's forum profile. Pull two more voice anchors from posts that discuss the craft in detail. Update the voice signals section. Re-run the checkpoint.

### Pass 3: user approval

Operator approves the second draft. The pass seeds:

- `profile.md` with positioning, founder bio, audience, integrations.
- `voice.md` DRAFT with the five voice anchors, marked at the top as a draft awaiting voice-analysis confirmation.
- `products.md` with the 8 products.
- `memories.md` with founder online presence (forum screen name, URL, posting frequency observed), three community framing quotes with URLs.

### Hand-off

The pass returns the updated index entry, seeded file list, names the 2 remaining placeholders, and suggests voice refinement as the next step. The user now has brand context the other purposes can read.

If the user had requested a third revision and a fourth, the right move at the fourth would have been: "Three revision rounds is the cap. Upload the material you want incorporated and I will fold it into the seeded files directly."

## What this document does not do

- It does not extract durable voice rules. The voice-analysis pass does that next.
- It does not build the first calendar. The calendar purpose does that after voice analysis.
- It does not replace the investigative-research reference in the root `SKILL.md`. When the user's URL is thin or the brand is under-documented online, load that reference for the lateral-sourcing playbook.
