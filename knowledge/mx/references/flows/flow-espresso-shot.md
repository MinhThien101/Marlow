# Espresso shot flow

## Education

Fast-strike conversion for warm leads showing buying signals now. Small, fast, strong. Catch engagement in the moment with a quick offer before intent fades.

- **Audience.** Currently engaged: clicked email recently, multiple site visits in 30 days, or multiple product views in 30 days. Familiar with the brand (not cold traffic). Showing buying signals but not converted.
- **Trigger.** High-engagement segment. Recommended definition: clicked an email in the last 30 days AND multiple site visits in 30 days, OR multiple product views in 30 days. Confirm exact thresholds with the brand.
- **Strategic purpose.** Convert warm leads who are clearly considering but stuck.
- **Core mechanic.** The offer is the hero. No brand story, founder story, or extended education.
- **Playbook shape.** Exactly 2 emails. Email 1 fires 10 minutes after segment entry. Faster than 10 minutes feels invasive; slower than 30 minutes goes stale. Email 2 lands 1 day later with urgency on the SAME offer.
- **TEXT_BASED placement.** Email 2 (`framework-discount-push`).
- **Scope.** Situational. Most useful for aggressive brands and brands struggling to convert window shoppers. Not for every account.
- **Voice.** Lean and offer-led. Email 2 uses personal voice with a natural engagement reference ("noticed you've been around the site").
- **What does not belong.** Brand/founder story in Email 1. Multiple competing CTAs. A different offer in Email 2. Extending to 4 emails. Soft "when you're ready" framing.

## Template

| # | Title | Type | Timing |
|---|---|---|---|
| Trigger | High Engagement Segment | SEGMENT | n/a |
| 1 | Quick Offer (Espresso Shot) | DESIGNED | Wait 10 minutes |
| 2 | Last Look at This Offer | TEXT_BASED | Wait 1 day |

Per-node recommendations:

| # | Recommended sections / framework | Notes |
|---|---|---|
| 1 | Hero Section + Discount Offer + Urgency Banner | Offer-led Hero. Code in Discount Offer. Urgency Banner closes. Single primary CTA. ALTERNATIVE: Hero + Discount Offer (2 sections, leanest possible). No brand story, no founder story. |
| 2 | `framework-discount-push` | Personal voice (founder or team). Heavy urgency on the SAME offer from Email 1. Code and one-click CTA. Natural reference to the engagement signal. Never a new offer. |

Required brand-specific facts (mark `missing info: <what is missing>` if unverifiable):

- The exact entry segment definition: which engagement signals count, over what window.
- The offer: exact code, amount, eligibility rules, and expiry.
- Products or categories to feature if the offer is product-specific.
- Founder or team voice cues for Email 2.

## Example (Email 1 brief sketch)

```
## Quick Offer (Espresso Shot)

**Campaign Direction**: Single offer-led email to a high-engagement segment. The offer is the hero; no brand story, no education.

**Product Focus**: <PRODUCTS TIED TO THE OFFER, OR BRAND-WIDE IF OFFER IS UNIVERSAL>

**Offer**: <EXACT OFFER MECHANIC>, code <EXACT CODE>, expires <EXPIRY>, eligibility <RULES>

**Links**: <VERIFIED ONE-CLICK OFFER URL>

**Email Sections**:
1. Hero Section
2. Discount Offer
3. Urgency Banner

**Design Notes**: Hero presents the offer as the dominant element. Discount Offer carries the code prominently. Urgency Banner reinforces the deadline. Single primary CTA across the whole email. Light supporting copy only: one line of trust or one short benefit, or none.

**Flow Context**: Espresso Shot Flow, Email 1 of 2. Fires 10 minutes after segment entry. Email 2 follows 1 day later with urgency on the same offer; never a different offer.
```

The brief defines exclusions as clearly as inclusions. The writer composes headline and CTA copy from brand state.
