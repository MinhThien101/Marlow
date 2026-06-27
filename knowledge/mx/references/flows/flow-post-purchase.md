# Post-purchase flow

## Education

Covers days 0-30 after an order. Not sales-first. It is a relationship and retention flow that also makes money when done well.

- **Audience.** Just placed an order. Mixed excitement and uncertainty. Vulnerable to buyer's remorse if the brand goes silent. Does not need acquisition-stage persuasion.
- **Trigger.** Places Order. Mandatory 4-way fan-out by purchase count: 1st, 2nd, 3rd, 4+ purchases. All thank-you variants converge into the same 4-email follow-up sequence.
- **Strategic purpose, in order.** Make the customer feel great about the purchase, express gratitude, teach product use, and cross-sell while excitement is high.
- **Core mechanic.** Founder thank-you ends with a P.S. cross-sell. The P.S. drives revenue. Example: "P.S. my favorite product to pair with this is X" or "P.S. if you want to place another order, you can do so here."
- **Playbook shape.** 5 customer-facing touchpoints: 1 founder thank-you (4 variants by purchase count) plus 4 sequential follow-ups. Thank-you fires immediately. Email 4 cross-sell lands around day 10 when the box usually arrives and excitement peaks. Email 5 founder check-in lands days 21-28 with a soft reorder nudge.
- **TEXT_BASED placement.** All four thank-you variants (`framework-thank-you-note`) plus Email 5 (`framework-founder-letter`).
- **Voice across the flow.** Relationship first. Email 5 is warm with a soft nudge, never a hard sell.
- **What does not belong.** Collapsing 4 thank-you variants into one. Delaying the thank-you. Pushing cross-sell earlier than day 10. Generic education unrelated to what they bought. Multiple offers in Email 4 (one cross-sell, one CTA).

## Template

| # | Title | Type | Timing |
|---|---|---|---|
| Trigger | Places Order | METRIC | n/a |
| 1a | 1st Purchase Thank You | TEXT_BASED | Send immediately, if 1st purchase |
| 1b | 2nd Purchase Thank You | TEXT_BASED | Send immediately, if 2nd purchase |
| 1c | 3rd Purchase Thank You | TEXT_BASED | Send immediately, if 3rd purchase |
| 1d | 4+ Purchases Thank You | TEXT_BASED | Send immediately, if 4+ purchases |
| 2 | How to Make the Most of Your Order | DESIGNED | Wait 2 days (converges from 1a/1b/1c/1d) |
| 3 | Pro Tips + Real Results | DESIGNED | Wait 3 days |
| 4 | You Might Love This Too (Cross Sell) | DESIGNED | Wait 5 days (lands around day 10) |
| 5 | Founder Check In: How Is It Going? | TEXT_BASED | Wait 14 days (lands around day 24) |

Per-node recommendations:

| # | Recommended sections / framework | Notes |
|---|---|---|
| 1a (1st) | `framework-thank-you-note` | Acknowledge the leap of trust. Brief brand or founder note (1-2 sentences). P.S. cross-sell. Invite reply for questions. |
| 1b (2nd) | `framework-thank-you-note` | Recognize they came back. P.S. cross-sell. Reference what they bought before if briefable. |
| 1c (3rd) | `framework-thank-you-note` | Returning-customer recognition. P.S. cross-sell. |
| 1d (4+) | `framework-thank-you-note` | Real-fan / loyal-customer treatment. P.S. cross-sell or soft VIP-style nod. |
| 2 | Hero Section + How It Works + Product Spotlight | Teach how to use the product they bought. Consumables: dosage and frequency. Fashion: how to style. Skincare: routine. Encourage consumption (faster usage = faster reorders). ALTERNATIVE: Educational Content in place of How It Works. |
| 3 | Hero Section + Social Proof + Lifestyle Content | Second educational angle, real customer results, or social-platform invitation. Pick the strongest angle for this product. ALTERNATIVE: Educational Content + Social Proof when education is the lever. |
| 4 | Hero Section + Product Spotlight + Benefit List | One complementary product or bundle. Frame as "you might love this", not "buy this now". ALTERNATIVE: Product Grid + Benefit List when multiple SKUs are on the table. Small cross-sell-only incentive allowed if the brand uses one. |
| 5 | `framework-founder-letter` | Personal check-in. Reference what the customer might be experiencing at this point. Soft reorder nudge at or near the bottom. Not a sales email. |

Required brand-specific facts (mark `missing info: <what is missing>` if unverifiable):

- Founder voice or signature for the four thank-you variants and the day 24 check-in.
- Cross-sell P.S. recommendation for the founder thank-you (a default pairing or a generic "place another order" link).
- Top product-education points for Email 2: how to use, dosage, application, styling, routine.
- Email 3 angle (more education, customer results, or social-platform invitation).
- Cross-sell product or bundle for the day 10 email.
- Approximate shipping window (so the day 10 cross-sell timing is realistic for this brand).

## Example (1st Purchase Thank You brief sketch)

```
## 1st Purchase Thank You

**Campaign Direction**: Acknowledge the customer's first order with a genuine founder thank-you and a one-line P.S. cross-sell.

**Product Focus**: No product focus in the body. P.S. references <DEFAULT PAIRING PRODUCT> or links to <BRAND HOMEPAGE FOR REORDER>.

**Offer**: No offer.

**Links**: <VERIFIED REORDER OR PAIRING URL>

**Framework**: framework-thank-you-note

**Design Notes**: Real signature line. One- or two-sentence brand or founder note. P.S. cross-sell at the bottom. Invite reply for questions.

**Flow Context**: Post-Purchase Flow, 1st-purchase thank-you variant. Fires immediately on order placement. Converges (with the other 3 variants) into the +2 day education email.
```

The brief defines structure and P.S. discipline. The writer composes founder voice and personal note from brand state.
