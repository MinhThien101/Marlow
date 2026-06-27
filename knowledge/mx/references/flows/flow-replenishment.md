# Replenishment flow

## Education

Sits between post-purchase and winback. The job is timing and convenience, not persuasion. These customers already liked the product enough to use it up. They do not need education or a hard sell, just a well-timed reminder.

- **Audience.** Existing customers approaching the end of their supply. Already a customer; has used the product; does not need top-of-funnel education.
- **Trigger.** Segment-based or Expected Next Order Date metric. Never a Placed Order trigger with a long time delay; that leaves the flow empty for weeks before generating revenue.
- **Strategic purpose.** Nudge reorder before they run out and drift into winback.
- **Core mechanic.** Convenience: dynamic block of the customer's last-purchased product for one-click reorder. No discount on Email 1; discounting trains the list to wait and reduces full-price reorders.
- **Playbook shape.** Exactly 2 emails. Timing must match the SKU consumption cycle. 30-day supply fires around day 35, 60-day around day 65, 90-day around day 95. One blanket cadence fails.
- **Scope rule.** ONLY for consumable/replenishable products: supplements, skincare, food, coffee, pet food, cleaning supplies. Never for durable goods or one-time purchases.
- **Voice.** Precise reminder, not a sales pitch: "Your supply usually runs out around now."
- **What does not belong.** Discount on Email 1. Cold-acquisition copy ("here's why you should try X"). Vague timing ("hey, time to think about restocking?"). Heavy urgency on Email 2; the customer is not lapsed yet.

## Template

| # | Title | Type | Timing |
|---|---|---|---|
| Trigger | Expected Next Order Date | DATE | n/a |
| 1 | Time to Restock? | DESIGNED | Send on expected reorder date |
| 2 | Restock Reminder + Optional Offer | DESIGNED | Wait 7 days, if no purchase |

Per-node recommendations:

| # | Recommended sections / framework | Notes |
|---|---|---|
| 1 | Hero Section + Product Spotlight | Dynamic last-purchased product in Product Spotlight. No discount. Reference the consumption cycle ("you ordered around 30 days ago, that supply is probably running low"). May mention subscription option. Keep tight. ALTERNATIVE: Hero + Product Spotlight + Promo Banner when surfacing a subscription option as a scan-first banner. |
| 2 | Hero Section + Discount Offer + Product Spotlight (if offer) OR Hero Section + Product Spotlight + Promo Banner (if no offer) | Same dynamic product. Acknowledge first reminder did not convert. Optional light incentive (small percent, free shipping, bundle upgrade). Escalate convenience angle (subscription, auto-reorder, larger size). No fire-sale framing. |

Required brand-specific facts (mark `missing info: <what is missing>` if unverifiable):

- Expected reorder timing per SKU or category (or a default consumption cycle).
- Whether to use a custom segment ("X days since last purchase per category") or the platform's predictive expected-next-order metric.
- Exclusions: products that should not replenish this way (limited editions, accessories, gifts).
- Whether the brand offers a subscription program or bundle option (mention it as the convenient path).
- Optional Email 2 incentive: code, amount, expiry rules.

## Example (Email 1 brief sketch)

```
## Time to Restock?

**Campaign Direction**: Time-precise reorder reminder for the customer's last-purchased product. One-click convenience, no discount.

**Product Focus**: Dynamic last-purchased product block.

**Offer**: No offer.

**Links**: <VERIFIED ONE-CLICK REORDER URL>

**Email Sections**:
1. Hero Section
2. Product Spotlight

**Design Notes**: Product Spotlight surfaces the exact last-purchased item with a one-click reorder CTA. Headline references the consumption cycle directly ("your supply usually runs out around now"). May mention <SUBSCRIPTION PROGRAM IF BRAND HAS ONE>. Keep tight; this is a precise reminder, not a sales pitch.

**Flow Context**: Replenishment Flow, Email 1 of 2. Fires on expected reorder date (consumption-cycle based, not a blanket cadence). No discount on this email by playbook; Email 2 may carry an optional light incentive.
```

The brief defines consumption-cycle timing and the no-discount rule. The writer composes headline and subscription line from brand state.
