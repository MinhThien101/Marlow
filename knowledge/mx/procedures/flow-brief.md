# flow-brief

This procedure inherits the root `SKILL.md` contract: resolve managed brand context first, clearly flag missing facts, load only needed references, deliver to the requested destination or chat, and capture durable brand learnings as proposed updates to profile, voice, products, or memories only.


Load this procedure when the user asks to design a flow, build an automation, or scope welcome, cart-abandon, post-purchase, or other always-on sequences. Design from canonical templates. Do not change structure. Brief every CAMPAIGN node using `references/briefs/brief-format.md`. Produce one deliverable in one pass, in two phases: flow plan plus per-node briefs.

A flow is a sequence the user owns in their ESP. You produce the plan and briefs the copywriter needs. The graph belongs to the user.

## Capability surface

- One flow plan plus one brief per CAMPAIGN node, delivered to the requested destination, or chat if none is named.
- Flow type matched to one of twelve canonical templates: welcome, site-abandon, browse-abandon, cart-abandon, checkout-abandon, post-purchase, replenishment, review-request, winback, sunset, espresso-shot, vip.
- Per-node brief structure picked from the flow template's recommendation: DESIGNED (sections in order), TEXT_BASED (one framework), or SMS (one message type).
- Unverifiable facts flagged inline as missing-info notes. The user resolves them before copy runs.
- Approved deviations from the canonical structure documented in the handoff.

## What this procedure does not do

- Does not invent flow shape outside the twelve canonical templates.
- Does not add nodes, remove nodes, change a delay, or change a branch condition. That is the user's call in their automation builder.
- Does not brief TRIGGER, DELAY, or SPLIT nodes. They have no copy.
- Does not write copy. Route to `procedures/campaign-copy.md` after the briefs land.
- Does not propose voice rules. Route to `procedures/voice-analysis.md` for that.

## Phase 1: Design the flow

### 1. Run the root context check

Confirm brand index or registry, canonical brand context source, web research availability, durable destination, and recent-send access. If managed brand context is missing, do not block the flow brief. Build from available input and mark missing facts as placeholders. Offer brand research only if user wants durable context.

### 2. Identify the canonical flow type

Match the user's request to one of the twelve canonical flows:

- `welcome`: subscriber-to-buyer sequence
- `site-abandon`: light re-engagement for low-intent visitors
- `browse-abandon`: medium-intent recovery for product viewers
- `cart-abandon`: high-intent recovery for carts without checkout start
- `checkout-abandon`: highest-intent recovery for started checkouts
- `post-purchase`: thank, educate, and cross-sell after a purchase
- `replenishment`: reorder reminder for consumable products
- `review-request`: post-purchase review ask
- `winback`: lapsed-customer recovery
- `sunset`: single-email list-hygiene close
- `espresso-shot`: fast-strike 2-email flow for high-engagement segments
- `vip`: recognition flow when a customer hits VIP status

If the user names a flow not on this list ("loyalty drip," "anniversary flow," "education series"), ask whether it maps to one of the twelve or is genuinely new. Most are rebranded canonical types. Do not invent a new flow shape.

### 3. Load the matching canonical template

Read `references/flows/flow-<slug>.md` for email count, cadence, branch logic, per-node structure recommendation, and required brand-specific facts. Do not paraphrase template labels or timing.

Read `references/flows/flow-structure-rules.md` for application doctrine: justified deviations, how to surface canonical structure when users push back, and enforcing no structural edits during briefing. The three pillars, brand-stage matrix, and universal flow rules live in root `SKILL.md` and that doc. Apply them. Do not restate inline.

### 4. Stage-check the request against the pillars

Check brand profile revenue tier. If the brand asks for pillar-3 work (hyper-targeted segmentation, VIP-only flows) before pillar 1 (opt-in form) or pillar 2 (campaign volume) is dialed, redirect to foundations. One sentence. Do not lecture.

Brand stage also shapes which nodes get DESIGNED vs TEXT_BASED. A 7-figure brand can run a 5-email welcome with daily cadence and no segmentation. An 8-figure brand can branch welcome by traffic source. A 9-figure brand runs the same playbook with daily campaign volume on top.

### 5. Present the flow plan

Return the plan in chat under one `## Flow plan` heading. Include:

- Canonical node list with timing, quoted from the per-flow doc.
- Branch logic for any multi-branch flow (buyer-history split for abandonment flows, purchase-count split for post-purchase).
- Per-node structure recommendation (DESIGNED / TEXT_BASED / SMS) from the template.
- Brand-stage adaptations if any.
- Required brand-specific facts the briefs will need (offer terms, hero products, replenishment cycle, review platform link, etc.).

### 6. Enforce the no-structural-edits rule

Canonical structure is the playbook. If the user wants to deviate (3-email welcome instead of 6, no buyer-history split in cart abandon, replenishment fire time that does not match SKU consumption cycle), follow `references/flows/flow-structure-rules.md`:

1. Name the canonical structure.
2. Name the consequence in one sentence.
3. Ask the user to confirm before deviating.

If the user confirms, document deviation in handoff so they know why flow differs. Do not silently bend template.

If mid-pass the user asks for a structural change, stop briefing, surface canonical structure, and ask them to modify automation structure before resuming. You can brief what exists, not what does not.

## Phase 2: Brief each node

### 7. Loop over every CAMPAIGN node

For each CAMPAIGN node in the designed flow:

1. **Pick the brief structure.** Default to per-node recommendation in flow doc. If recommendation leaves room (DESIGNED section choice, TEXT_BASED framework choice), load `references/briefs/brief-structure-selection.md` and run its decision sequence: six campaign jobs first, five-question chooser fallback, anti-repetition check across flow.
2. **Load only what the brief uses.** For DESIGNED, load `references/sections/section-<slug>.md` per section. For TEXT_BASED, load `references/frameworks/framework-<slug>.md` for chosen framework. For SMS, load `references/sms/sms-<slug>.md` for chosen message type. One framework, one message type. Do not mix. Do not re-load docs already loaded this run.
3. **Verify per-node facts.** Product names, ingredients, offer terms, codes, expirations, links, review-platform URLs. Use web research if available; ask user if not. If verification fails, mark fact missing inline and continue. Do not stop loop on one failed verification.
4. **Fill the brief.** Use literal skeleton in `references/briefs/brief-format.md`. Flow-node briefs always include `**Flow Context**:` near bottom naming flow type, this node's position, previous node, and next node. Use canonical section, framework, and message-type labels exactly.
5. **Carry timing.** Pull the timing from the canonical flow template (`Send immediately`, `Wait 1 day`, `Wait 14 days`, etc.). Do not invent.

Skip TRIGGER, DELAY, and SPLIT nodes. They have no brief. If user asks to brief everything, brief every unbriefed CAMPAIGN node.

### 8. Self-check before returning

For each brief:

- Heading matches the flow-node title exactly.
- Every required field for the chosen structure is present.
- Section labels, framework labels, and message-type labels match canonical names.
- `**Flow Context**:` is present and names the flow type, this node's position, adjacent nodes.
- No prose has leaked into the brief body (no voice direction, no sample lines, no rationale, no audience language).
- Every claim is either verified or explicitly marked missing.
- ASCII punctuation only. No em-dash, no en-dash, no curly quotes.

For the flow plan:

- Node list, timing, and branch logic match the canonical template.
- Any deviation from the canonical structure is flagged with the consequence the user accepted.

## Phase 3: Output

Deliver to requested destination, or chat if none is named. Deliver one document with this outer shape:

```
## Flow plan

<canonical node list with timing>
<branch logic if multi-branch>
<per-node structure recommendations>
<brand-stage adaptations if any>
<approved deviations if any>

## Brief: <Email 1 title> (<timing>)

<brief body per references/briefs/brief-format.md>

## Brief: <Email 2 title> (<timing>)

<brief body>

(... one ## Brief heading per CAMPAIGN node)

## Placeholders

- **<node title>**: <what is unresolved>

## Deviations

- **<node or flow attribute>**: <what changed from canonical, why the user accepted it>
```

Omit `## Placeholders` if every fact is verified. Omit `## Deviations` if the flow matches the canonical template exactly.

If user named a destination, write there. If none is named, read `user.md`. If no preference exists, write flow plans and node briefs to **the same location holding this brand's context**, sub-organized by type per root SKILL.md branch table (Branch A Project: same project, one file per node plus one plan file named `YYYY-MM-DD-title-flow.md` / `...-node-N.md`; Branch A connector: `<connector>/MX/brand/<slug>/flows/`; Branch B: `brand/<slug>/flows/YYYY-MM-DD-title.md`, one file per node plus one flow-plan file). Tell the user where they are going. Record durable destination preference in `user.md` when writable. If no durable write is available, chat is the artifact.

## Handoff

End by naming the deliverable (flow plan plus count of briefed nodes) and listing unresolved placeholders in one short block. Flag any accepted deviation from canonical structure.

Suggest one plain-language next action: "When ready, say 'write copy for each briefed node.'"

## Hard prohibitions

- Do not invent flow shape outside the twelve canonical templates.
- Do not add nodes, remove nodes, change a delay, or change a branch condition without surfacing the canonical structure and getting user confirmation.
- Do not brief TRIGGER, DELAY, or SPLIT nodes.
- Do not produce finished copy, sample subject lines, or example body text. Briefs are guardrails, not prose.
- Do not include audience language, voice notes, tone guidance, persona descriptions, or rationale inside the brief body.
- Do not invent products, URLs, claims, codes, offer terms, prices, testimonials, dates, founder bios, ingredients, policies, or metrics.
- Do not propose voice rules.
- Do not stall the loop on a question a default can satisfy. Surface the gap as missing info and continue.

## Conflict rules

When sources disagree, resolve in this order:

1. User-confirmed facts in the current request.
2. The canonical per-flow doc in `references/flows/`.
3. The application doctrine in `references/flows/flow-structure-rules.md`.
4. Verified facts and exact required language from brand-owned sources.
5. Brand memories and profile.
6. The brief format and structure-selection guides.
7. Strategic judgment.

A clearly flagged missing fact outranks a guess at any level.
