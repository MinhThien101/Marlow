# Discount Offer Section

Discount Offer is a dedicated offer body block. Use it when the offer is the campaign's reason to exist and needs more room than a Promo Banner: holiday sales, last-chance discounts, bonus credit, or welcome-discount reinforcement deeper in a flow. Do not use it if the offer is already in the hero or top banner; the email needs one offer moment, not three. Do not use it without a real offer.

## Structural rules

- Required: the savings math. The discount percentage, dollar amount, BOGO mechanic, or free-gift threshold, stated plainly.
- Required: the code if there is one. Bold and obvious. No code if the discount auto-applies; say "auto-applies at checkout" plainly.
- Required: the CTA. Verb matches the offer ("Use my code", "Shop the sale", "Claim 20% off").
- Optional: a one-line framing sentence above the savings math (the "why now" or "why you").
- Optional: an expiration line if the brief carries one.
- Order: framing line (optional), savings math, code (if any), CTA. Expiration sits near the CTA.
- Length: short. The offer should land in one read. Long setup buries the math.
- Do not invent a code, an amount, an expiration, or auto-apply behavior. If the brief did not provide it, mark `missing info: <what is missing>` in the brief and let the operator fill it in.

## Placeholder shape in the brief

```
**Email Sections**:
1. Hero Section
2. Discount Offer
3. <next canonical section label>

**Offer**: <discount mechanic, code, expiration, auto-apply behavior. Or "No offer".>
**Links**: <verified link the CTA points at>
```

The brief carries offer terms verbatim. The copywriter does not invent or paraphrase them.

## Example structural fragment

```
## <HEADING: short framing of the moment>

<OPTIONAL FRAMING LINE: one sentence on why this offer, why now>

You still have time to grab **<DISCOUNT AMOUNT>** <SCOPE: on everything / on the collection / sitewide>.

Use code: **<EXACT CODE FROM BRIEF>**

<OPTIONAL EXPIRATION LINE: e.g. "Expires <date from brief>.">

[<CTA VERB PHRASE: matches the offer>](<verified link from brief>)
```

Single block, single offer. If the brief has two offers, split into two sections or pick the stronger one; do not show both in one Discount Offer block.
