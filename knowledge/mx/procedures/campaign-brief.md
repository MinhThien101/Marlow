# campaign-brief

This procedure inherits the root `SKILL.md` contract: resolve managed brand context first, flag missing facts clearly, load only needed references, deliver to the requested destination or chat, and capture durable learnings only as proposed updates to profile, voice, products, or memories.


Load this procedure when the user asks to brief one campaign or a calendar batch. You produce briefs. Do not write copy. A brief is the spec a copywriter follows. It states what the campaign must accomplish, what it sells, what offer applies, and what hard constraints exist. It carries no voice direction, audience language, sample lines, or rationale. A brief that drifts into prose is no longer a brief.

## Capability surface

- One brief for one campaign, delivered to the requested destination, or chat if none is named.
- A batch of briefs from a calendar document, delivered as one consolidated briefs document.
- Brief structure picked from the campaign job: DESIGNED (sections in order), TEXT_BASED (one framework), or SMS (one message type).
- Unverifiable facts flagged inline as plain missing-info notes. The user resolves them before copy runs.

## Mode detection

Two modes. Detect from input. Do not ask if the answer is clear from context.

- **Single-campaign mode.** One campaign target (title plus type, or one named calendar entry). Return the brief to the requested destination, or chat if none is named. Resolve missing-info items with the user inline if any surface.
- **Calendar-batch mode.** A calendar document or campaign list. Loop over every campaign. Return ONE consolidated briefs document (one `##` heading per campaign). Never block the batch on questions a default can satisfy. Surface unresolved gaps in `## Campaigns Needing Follow-Up` at the end.

If the user names a calendar but wants only one campaign briefed, use single-campaign mode. If the user names one campaign but the source is clearly a multi-campaign calendar, use calendar-batch mode. Pick the mode that matches the deliverable, not the input shape.

Flow-node briefs belong to `procedures/flow-brief.md`. If the request is to brief an automation, sequence, or flow, route there instead.

## Workflow

### 1. Run the root context check

Confirm brand index/registry, canonical brand context source, web research availability, durable destination, and recent-send access. If no managed brand context exists, do not block the brief. Build from available user input and mark missing facts as placeholders. Offer brand research only if the user wants durable context.

### 2. Resolve scope

**Single-campaign.** Confirm campaign title and campaign type (DESIGNED, TEXT_BASED, or SMS). If type is unstated, infer it from the job in the next step.

**Calendar-batch.** Read the calendar document. Enumerate every campaign as a target. If an existing briefs document already covers this period, load it so the new pass merges instead of overwriting already-locked briefs. Note locked entries; do not overwrite them.

### 3. Load context once per run

Read active brand context: profile, voice rules, products, memories, and recent sends from whatever source the harness exposes. Skim recent sends from the last 90 days so briefs do not repeat recent angles. In batch mode, read shared context once, not per campaign.

### 4. Select structure

Structure choice is the load-bearing call. Pick from campaign job, not source volume. Load `references/briefs/brief-structure-selection.md` and run its decision sequence: six campaign jobs first, five-question chooser as fallback, anti-repetition check across the batch.

Defaults are grounded in: 824 DESIGNED campaigns analyzed (avg 3.6 sections, Hero always first), 195 TEXT_BASED campaigns (Discount Push 36, Educational Guide 24, Founder Letter 19 lead), and 50 SMS campaigns (Flash Sale 12, New Product 9, Brand Update 6 lead). These are priors from a labeled corpus, not universal truth. Judgment still decides. When defending structure, cite job match first, dataset second.

### 5. Load only what the brief uses

After picking structure, load only the specific reference docs the brief needs:

- DESIGNED: for each section in the stack, load `references/sections/section-<slug>.md`. Use the canonical section label exactly.
- TEXT_BASED: load `references/frameworks/framework-<slug>.md` for the chosen framework. One framework only. Do not mix.
- SMS: load `references/sms/sms-<slug>.md` for the chosen message type. One type only.

Do not preload every section, framework, and SMS doc. Load on demand, once per pass. Do not reload a doc already loaded in this run.

### 6. Research and verify

For every claim a brief depends on (product name, ingredient, offer terms, code, expiration, URL, ship threshold, return policy, founder bio, partnership), verify against a brand-owned source when accessible. If web research is available, use search to discover and source retrieval to verify. Never rely on a snippet when the source page is accessible. If verification fails, mark the fact missing inline and continue. Do not stop the batch for one failed verification.

Minimum bar before locking direction on any subject: name three specifics a generic take would miss. If you cannot, leave the field explicitly missing.

### 7. Fill the brief

Use the literal brief skeleton in `references/briefs/brief-format.md`. Field set, order, label format, and output shapes (single, flow-node, monthly document) are defined there. Do not paraphrase the format. Do not invent fields. Omit optional fields when they do not apply.

Missing-info notes are a contract. Never substitute `N/A`, `TBD`, `unknown`, or an invented value. A flagged gap is a short follow-up with the user. A fabricated value ships and burns trust.

### 8. Self-check before returning

For each brief:

- Heading matches the campaign title exactly.
- Every required field for the chosen structure is present.
- Section labels, framework labels, and message-type labels match the canonical names from the loaded reference docs.
- No prose has leaked into the brief body (no voice direction, no sample lines, no rationale, no audience language).
- Every claim is either verified or explicitly marked missing.
- ASCII punctuation only. No em-dash, no en-dash, no curly quotes.

### 9. Output

Deliver to the user's requested destination. If none is named, read `user.md`. If no preference exists, write brand-specific briefs to **the same location as this brand's context**, sub-organized by type per the root SKILL.md branch table (Branch A Project: same project, `YYYY-MM-DD-title-brief.md`; Branch A connector: `<connector>/MX/brand/<slug>/briefs/`; Branch B: `brand/<slug>/briefs/YYYY-MM-DD-title.md`; Branch C: chat). Tell the user where they are going. Record any durable destination preference in `user.md` when writable.

Single-campaign output: the brief body and nothing else. No preamble, no summary, no follow-up paragraph.

Calendar-batch output: the consolidated briefs document per the monthly shape in `references/briefs/brief-format.md`, then `## Campaigns Needing Follow-Up` if any campaign has unresolved placeholders, then `## Blockers` if any campaign could not be briefed.

## Hard prohibitions

- Do not produce finished copy, sample subject lines, or example body text. Briefs are guardrails, not prose.
- Do not include audience language, voice notes, tone guidance, persona descriptions, or rationale inside the brief body.
- Do not invent products, URLs, claims, codes, offer terms, prices, testimonials, dates, founder bios, ingredients, policies, or metrics.
- Do not modify flow structure (that belongs to `procedures/flow-brief.md`).
- Do not propose voice rules (that belongs to `procedures/voice-analysis.md`).
- Do not return tool narration, preamble, or meta commentary.
- Do not stall a calendar batch on a question a default can satisfy. Surface the gap in follow-up.

## Conflict rules

When sources disagree, resolve in this order:

1. User-confirmed facts in the current request.
2. Verified facts and exact required language from brand-owned sources.
3. Brand memories and profile.
4. The brief format and structure-selection guides.
5. Strategic judgment.

A clearly flagged missing fact outranks a guess at any level.

## Handoff

End the run by naming the artifact (campaign title or briefs document path) and listing unresolved placeholders in one short block. A partial, well-marked run is recoverable. A truncated invention is not.

Suggest one plain-language next action: "When ready, say 'write the copy from this brief.'"
