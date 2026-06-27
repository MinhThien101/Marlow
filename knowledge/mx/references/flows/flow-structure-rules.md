# Flow structure rules

## Education

The root `SKILL.md` carries the doctrine. Read it first: three pillars, brand-stage matrix, universal flow rules. This document is the application layer. It tells you how to enforce those rules when a brand asks for a flow, how to recognize a justified deviation from an unjustified one, and what to do when the user's request would break the playbook.

The doctrine summarized so this document stands on its own:

1. **Three pillars carry an email program.** Opt-in form, campaign volume, core base flows. If a brand is underperforming, the diagnostic order is always pillars 1 then 2 then 3. Recommend foundations before fancier flow segmentation.
2. **Brand-stage matrix shapes scope, not the playbook.** 7 figures: all base flows live, no aggressive segmentation, 3-4 campaigns per week. 8 figures: base flows plus targeted segmentation, 5-7 campaigns per week. 9 figures: same playbook fully buttoned up, daily or 2x daily sends.
3. **Core base flows have canonical shapes.** Welcome, the four abandonment flows, post-purchase, winback. Each has a documented email count, cadence, branch logic, and offer strategy in its own per-flow reference doc.

### The hardest rule: you cannot modify flow structure

You can brief any CAMPAIGN node in a canonical flow template. You can recommend a canonical template that matches the brand's stage and the flow's job. You cannot add nodes, remove nodes, change a delay, change a branch condition, or change a node's type.

If the user wants a structure that does not match an available template (different email count, different timing, different branching, additional flows), the right move is to surface the canonical structure, explain why it is canonical (one consequence-sentence), and ask the user to confirm whether they want to deviate.

A flagged deviation is a five-minute conversation. A silent deviation is a flow that underperforms for months and nobody knows why.

### What counts as a justified deviation

Some flows have brand-driven exceptions baked into the playbook:

- High-AOV brands may extend pre-purchase flows beyond 5 emails when the consideration window is genuinely long.
- Replenishment timing matches the SKU's actual consumption cycle. A 30-day supply fires at day 35; a 60-day supply at day 65. One blanket cadence is the wrong answer.
- Winback Email 3 must switch offer mechanic. The doctrine intentionally differs from Email 1.

These are documented exceptions inside specific per-flow doctrine, not improvisations. They are not justifications for arbitrary changes elsewhere.

### What counts as an unjustified deviation

A request becomes a structural deviation, not a content choice, when it changes:

- The number of nodes in a canonical flow.
- The delay between nodes.
- The branch condition (e.g., removing the buyer-history split from an abandonment flow).
- The node type (e.g., converting a TEXT_BASED node to DESIGNED without a documented brand reason).

For each of these, the canonical shape exists for a reason. Surface the reason. Ask the user to confirm before deviating.

### What is not a structural deviation

Briefing a CAMPAIGN node is not a structural deviation. You can:

- Choose the brief's structure (DESIGNED, TEXT_BASED, SMS) within what the canonical flow allows for that node.
- Pick sections or framework based on the node's job and the brand's voice.
- Vary the angle of a node from one brand to another.
- Apply brand-specific offer mechanics within the doctrine's offer strategy.

Content is yours to shape. Structure is the user's to own.

## Template

### How to apply the rules to a flow request

When a user asks for a flow, run this sequence.

1. **Identify the canonical flow template.** Match the user's intent to a documented flow type (welcome, site-abandon, browse-abandon, cart-abandon, checkout-abandon, post-purchase, replenishment, review-request, winback, sunset, espresso-shot, vip). If no template matches, ask the user to describe the flow's job; do not invent a new flow shape.

2. **Confirm the brand stage.** Check `profile.md` or the harness-native profile for revenue tier. If the tier is missing, ask. The stage determines volume and segmentation depth, not the playbook itself.

3. **Stage-check the request against the pillars.** Is the brand asking for pillar 3 work (hyper-targeted product-interest abandon, VIP-only sends) before pillar 1 or 2 is dialed? If yes, redirect to the foundation first. One sentence. Do not lecture.

4. **Surface the canonical structure.** Name the email count, cadence, branch logic, and offer strategy from the per-flow reference doc. Do not paraphrase the template; quote it.

5. **Compare the user's request to the canonical structure.** If they match, proceed. If they differ, name the difference, name the consequence (one sentence), and ask the user to confirm before deviating.

6. **Brief only CAMPAIGN nodes.** TRIGGER, DELAY, and SPLIT nodes have no brief. If the user asks to "brief everything," default to every unbriefed CAMPAIGN node in the flow.

7. **Apply the universal flow rules to each node.** Email count cap, daily cadence, buyer-history split, offer-as-lever, aggressive-copy-in-pre-purchase, 75/25 graphic-to-text mix, reach over precision. The root `SKILL.md` carries the full list.

8. **Hand off.** Name the briefed nodes, flag any deviation the user confirmed, list any placeholders. Suggest the next skill (the copy purpose) for the per-node copy pass.

### Recognizing a justified deviation

A deviation is justified when:

- It comes from documented brand evidence (high AOV, long consideration window, replenishment SKU type).
- It is one of the per-flow exceptions already documented in the canonical playbook.
- The user explicitly confirmed it after you surfaced the canonical structure and the consequence.

A deviation is unjustified when:

- It is a preference without evidence ("we want 3 emails instead of 5 because it feels less spammy").
- It comes from a junior account manager copying a competitor without context.
- It removes a load-bearing rule (e.g., dropping the buyer-history split from cart abandon) without naming what they are giving up.

In the unjustified case, hold the canonical structure. Phrase the redirect as one consequence-sentence, then ask the user to confirm if they still want the deviation.

### Handling structural-change requests inside a briefing pass

If mid-pass the user asks to add or remove nodes, change a delay, or change a branch: stop the briefing pass. Surface the canonical structure. Explain the consequence. Ask the user to modify the flow structure in their automation builder, and then resume briefing once the structure matches what they want.

You can brief what is there. You cannot brief what is not there.

## Examples

Three short worked applications. Placeholder brand names only.

### Example 1: Brand asks for a 3-email welcome flow

Request: "We want a 3-email welcome flow. Five feels too aggressive."

Canonical structure: 5 main emails plus a bonus store-credit nudge at day 14 (6 total). Daily cadence. Email 5 is TEXT_BASED founder letter that extends the discount.

Response shape: surface the canonical structure. Name the consequence: a 3-email welcome leaves the discount-expiration nudge and the founder-letter trust beat on the table; both pull meaningful revenue. Ask the user to confirm if they still want 3 emails.

If the user confirms, brief the 3 nodes that exist. Flag the deviation in the handoff so the operator knows why the flow looks short. Do not silently shorten the canonical template.

### Example 2: 8-figure brand asks for product-interest segmentation in cart abandon

Request: "We want to split cart abandon by individual product category. We have 12 categories."

Canonical structure for cart abandon: 4 emails per buyer-history branch (past buyer vs. new buyer). The split is buyer-history, not product category.

Response shape: name the pillar. The brand is at 8 figures; product-interest segmentation is plausible at this stage if 1-2 categories actually dominate sales. If 12 categories each get their own branch, the per-segment volume is too thin to optimize. Ask: are 1-2 categories driving most of the cart volume? If yes, split those out. If no, hold the canonical buyer-history split.

This is not a refusal. It is a redirect grounded in the brand-stage matrix.

### Example 3: Replenishment timing for a 90-day SKU

Request: "Brief the replenishment flow. Fire Email 1 at day 30."

Canonical doctrine: replenishment timing matches the SKU's consumption cycle, not a blanket cadence. A 30-day supply fires around day 35. A 60-day supply fires around day 65. A 90-day supply fires around day 95.

Response shape: confirm the SKU's consumption cycle from `products.md`. If the SKU is 90 days, the canonical fire time is around day 95, not day 30. Surface the rule, name the consequence (firing at day 30 reaches the customer mid-supply, when reorder is irrelevant and the email gets ignored), and ask the user to confirm the cycle before locking the trigger.

This is a documented per-flow exception, not an arbitrary deviation. The doctrine bends to the SKU; the SKU does not bend to the doctrine.

## What this document does not do

- It does not list the canonical structure of each flow. Each flow has its own reference doc that names email count, cadence, branch logic, and offer strategy.
- It does not write briefs. The briefing procedure lives in the flow-brief procedure.
- It does not replace the root program-level doctrine. The pillars, brand-stage matrix, and universal flow rules live in the root `SKILL.md` and inherit into the procedures.
