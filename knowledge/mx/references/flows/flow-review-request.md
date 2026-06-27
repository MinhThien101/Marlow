# Review request flow

## Education

Asks a recent customer for a review after real product use. The job is timing and low friction. Reviews feed welcome/abandonment flows, ads, and site content.

- **Audience.** Customer who ordered about 2 weeks ago and has enough product use for a real opinion. Should feel appreciated, not pressured.
- **Trigger.** Placed Order with a 14-day delay before Email 1. Earlier than 14 days gives unfair reviews. Later than 21 days means the customer has moved on.
- **Strategic purpose.** Generate reviews at scale by asking at the right moment and removing friction.
- **Core mechanic.** Direct deep-link to the review platform for that customer's order/product. One click to leave a review. If deep-link is broken, fix it before handing off the brief.
- **Playbook shape.** Exactly 2 emails. Same structure across brands; only 14-day timing may flex for shipping speed. Email 2 sends 7 days after Email 1, gated on no review left.
- **ONE ask per email.** No cross-sells, UGC asks, social-follow CTAs, newsletter signups, or other product recommendations. The ask is the email.
- **Voice.** Direct and polite. Email 2 is a soft nudge, not a sales pitch.
- **Defaults.** No incentive unless the brand confirms it is allowed; platform policies vary.
- **What does not belong.** Multiple asks. Buried review CTA. Turning the flow into a sales campaign with discounts/product recs. Extending beyond 2 emails.

## Template

| # | Title | Type | Timing |
|---|---|---|---|
| Trigger | Placed Order | METRIC | n/a |
| 1 | Leave a Review | DESIGNED | Wait 14 days |
| 2 | Quick Reminder to Review | TEXT_BASED | Wait 7 days, if no review |

Per-node recommendations:

| # | Recommended sections / framework | Notes |
|---|---|---|
| 1 | Hero Section + Support Block | Deep-link review CTA prominent in Hero. Direct, polite ask with minimal copy. One short line on why reviews matter. ALTERNATIVE: Hero + Product Spotlight when showing the exact product helps the customer remember. Optional thank-you discount only if the brand allows it; state clearly. No unrelated CTAs. |
| 2 | `framework-review-request` | Personal voice (founder or support). Soft nudge, not a sales pitch. Same deep-link. Acknowledge the customer is busy; keep short. No product recommendations. |

Required brand-specific facts (mark `missing info: <what is missing>` if unverifiable):

- The review platform in use (Junip, Okendo, Yotpo, native Shopify reviews, etc.) and the deep-link URL pattern.
- Whether incentives are allowed (default: no).
- Whether to route unhappy customers to a support channel before the review ask (optional satisfaction branch).
- Brand-specific products or categories to exclude from review requests (gift cards, bundle add-ons, etc.).

## Example (Email 1 brief sketch)

```
## Leave a Review

**Campaign Direction**: Direct review ask 14 days after order, with a one-click deep-link to the specific order's review page.

**Product Focus**: <PRODUCT FROM THE CUSTOMER'S ORDER>

**Offer**: <NO INCENTIVE BY DEFAULT, OR EXACT THANK-YOU DISCOUNT IF BRAND APPROVED>

**Links**: <DEEP-LINK TO THE REVIEW PLATFORM FOR THE CUSTOMER'S SPECIFIC ORDER>

**Email Sections**:
1. Hero Section
2. Support Block

**Design Notes**: Review CTA must sit prominently in the Hero. One short line on why reviews matter to the brand. No cross-sells, no social-follow CTAs, no newsletter signups. The ask is the email.

**Flow Context**: Review Request Flow, Email 1 of 2. Fires 14 days after Placed Order. Email 2 follows 7 days later, gated on no review left.
```

The brief treats the deep-link as load-bearing. If missing, mark `missing info: confirm review platform deep-link URL` and resolve before writer handoff.
