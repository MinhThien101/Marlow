# Brief format

A brief is guardrails for the copywriter. It states the campaign goal, product focus, offer, and hard constraints. It is not creative direction. It contains no audience language, voice notes, copy suggestions, or rationale.

The fields below are the only allowed fields. Include what applies. Omit optional fields entirely. Keep this order.

## Template

```
## <exact campaign title>

**Campaign Direction**: <one sentence stating the single goal, objective, or angle of this campaign>

**Product Focus**: <the product, collection, or content the campaign is about>

**Offer**: <discount, code, expiration, auto-apply behavior. Or "No offer".>

**Links**: <verified URLs the copy must include. Or "No required links".>

**Required Language**: <exact phrases the copy must use word-for-word. Include this field only if the user asked for it.>

**Client Specifications / Additional Notes**: <hard constraints the user named. Include this field only if the user asked for it.>

**Design Notes**: <factual design requirements only, never creative direction. DESIGNED only. Include this field only if the user asked for it.>

**Email Sections**: <DESIGNED only. Ordered list of canonical section labels.>
1. <Section Label>
2. <Section Label>
3. <Section Label>

**Framework**: <TEXT_BASED only. One canonical framework label.>

**Message Type**: <SMS only. One canonical message type label.>

**Flow Context**: <flow-node briefs only. Flow theme, this node's role, adjacent nodes.>

**Missing Info**: <only when the user explicitly approved writing with unresolved gaps. List each gap as a missing info line.>
```

### Field rules

- Use bold markdown labels followed by a colon, exactly as shown above.
- Email Sections is the only field that may be a numbered list inside the brief.
- Use `missing info: <what is missing>` inline for any unverifiable fact. Never `N/A`, never `TBD`, never `unknown`, never an invented value.
- ASCII punctuation only. No em-dash, no en-dash, no curly quotes. Hyphens in compound words are fine.

### Output shapes

A single brief in chat starts with `## <exact campaign title>` and contains only the brief body. No preamble, summary, or follow-up text.

A flow-node brief starts with `## <exact flow node title>` and always includes `**Flow Context**:` near the bottom.

A monthly briefs document uses this outer shape:

```
# <Month> <Year> Briefs | <Brand Name>

## Scope Summary

- Calendar source: <calendar document title or "ad-hoc batch">
- Total campaigns: <count>
- Fully locked: <count>
- Partially locked (placeholders): <count>

## <campaign 1 title>

<single-brief body as above>

## <campaign 2 title>

<single-brief body as above>

## Campaigns Needing Follow-Up

<include only if any campaign has placeholders; list each campaign and its open placeholders>
```

### Hard prohibitions

Never include in a brief:

- audience language, segment guidance, persona descriptions
- voice, tone, or style guidance
- copy suggestions, sample lines, starter phrases, headline drafts
- rationale for structure choices or strategic explanations
- section-by-section writing instructions
- timing or sentiment guidance
- invented products, URLs, claims, metrics, discounts, codes, or policies

## Examples

### DESIGNED brief

```
## <missing info: campaign title>

**Campaign Direction**: <missing info: one sentence naming the single goal of this send>

**Product Focus**: <missing info: product, collection, or merchandising focus>

**Offer**: <missing info: discount mechanic, code, expiration, auto-apply. Or "No offer".>

**Links**: <missing info: verified URLs the copy must include, one per line>

**Email Sections**:
1. Hero Section
2. <missing info: canonical section label>
3. <missing info: canonical section label>
```

### TEXT_BASED brief

```
## <missing info: campaign title>

**Campaign Direction**: <missing info: one sentence naming the single goal of this send>

**Product Focus**: <missing info: product, collection, or content focus>

**Offer**: <missing info: discount mechanic, code, expiration. Or "No offer".>

**Links**: <missing info: verified URLs the copy must include, or "No required links">

**Framework**: <missing info: one canonical framework label>
```

### SMS brief

```
## <missing info: campaign title>

**Campaign Direction**: <missing info: one sentence naming the single goal of this send>

**Product Focus**: <missing info: product, collection, or content focus>

**Offer**: <missing info: discount mechanic, code, expiration. Or "No offer".>

**Links**: <missing info: one verified short link, or "No required links">

**Message Type**: <missing info: one canonical SMS message type label>
```

### Flow-node brief

```
## <missing info: flow node title>

**Campaign Direction**: <missing info: one sentence naming this node's job in the flow>

**Product Focus**: <missing info: product, collection, or content focus for this node>

**Offer**: <missing info: offer carried into this node, or "No offer".>

**Email Sections**:
1. Hero Section
2. <missing info: canonical section label>

**Flow Context**: <missing info: flow type, this node's position, the node before, the node after>
```
