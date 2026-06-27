# Checkout abandon flow

## Education

Highest-intent abandonment recovery. The customer started checkout (shipping, payment, or both) and dropped. They were seconds from buying and already evaluated brand, product, price, and shipping. They need to finish the same checkout session, not restart.

- **Audience.** Started checkout and dropped off. Already past cart. Blocked by trust hesitation, payment friction, shipping concern, or distraction.
- **Trigger.** Checkout Started. Email 1 fires 30 minutes after the trigger on both branches.
- **Strategic purpose.** Remove last-mile friction and return the customer to live checkout to complete purchase.
- **Core mechanic.** Dynamic CHECKOUT block (not cart block; uses checkout line-item variables) at the top of every email. CTA returns to live checkout, never cart or PDP.
- **Playbook shape.** Exactly 4 emails per branch with mandatory buyer-history split. Past-buyer branch has no discount in Emails 1-2; new-buyer branch carries the welcome offer in Emails 1-2. Both branches escalate at Email 3 and close with urgency at Email 4.
- **Voice.** "Your order is ready to ship" is the canonical hook. They were one click away. "Forgetting something?" is forbidden.
- **TEXT_BASED placement.** Email 2 (`framework-cart-recovery`) and Email 4 (`framework-discount-push`) on each branch.
- **Trust assets.** Put high in the email: secure checkout, payment options, return policy, shipping speed, money-back guarantee.
- **What does not belong.** Brand explanation (already evaluated). Cart variables instead of checkout variables. Sending them back to cart to restart.

## Template

Discount strategy:

| Email | Past-buyer branch | New-buyer branch |
|---|---|---|
| 1 | No discount | Welcome discount reminder |
| 2 | No discount | Welcome discount reminder |
| 3 | First discount introduced | Higher / escalated discount |
| 4 | Urgency on Email 3 discount | Urgency on the higher discount |

Node structure:

| Branch | # | Title | Type | Timing |
|---|---|---|---|---|
| Trigger | - | Checkout Started | METRIC | n/a |
| Past buyer | 1 | Your Order Is Ready to Ship | DESIGNED | Wait 30 minutes, if past buyer |
| Past buyer | 2 | Need Help Finishing? Quick Note | TEXT_BASED | Wait 1 day |
| Past buyer | 3 | Discount to Close It Out | DESIGNED | Wait 1 day |
| Past buyer | 4 | Last Chance Discount Expires | TEXT_BASED | Wait 1 day |
| New buyer | 1 | Order Ready + Welcome Offer | DESIGNED | Wait 30 minutes, if new buyer |
| New buyer | 2 | Need Help? + Welcome Offer | TEXT_BASED | Wait 1 day |
| New buyer | 3 | Higher Discount + Reviews | DESIGNED | Wait 1 day |
| New buyer | 4 | Last Chance Higher Discount Expires | TEXT_BASED | Wait 1 day |

Per-node recommendations:

| Branch / # | Recommended sections / framework | Notes |
|---|---|---|
| Past 1 | Hero Section + Product Spotlight + Support Block | Checkout block in Product Spotlight. "Order is ready to ship" framing. Trust assets high. |
| Past 2 | `framework-cart-recovery` | Personal note offering help to finish the order. Live checkout link. No discount. Address 1-2 last-mile objections. |
| Past 3 | Hero Section + Discount Offer + Support Block | First discount for past buyers. Checkout block visible. ALTERNATIVE: Hero + Discount Offer + Social Proof when reviews persuade more than trust assets. |
| Past 4 | `framework-discount-push` | Heavy urgency on the Email 3 discount. Code and live checkout link. |
| New 1 | Hero Section + Product Spotlight + Discount Offer | Checkout block above hero. Welcome discount reminder. ALTERNATIVE: Promo Banner for the offer as a top scan-first reminder. |
| New 2 | `framework-cart-recovery` | Welcome discount reminder. Live checkout link. |
| New 3 | Hero Section + Discount Offer + Social Proof | Escalate from welcome offer to a stronger offer. |
| New 4 | `framework-discount-push` | Heavy urgency on the higher discount. |

Required brand-specific facts (mark `missing info: <what is missing>` if unverifiable):

- Live checkout-session return URL behavior (must drop into the same session, not restart).
- Checkout line-item schema and dynamic merge variables (different from cart variables).
- Trust and reassurance assets: shipping speed, secure-checkout badges, returns policy, money-back guarantee, payment options accepted.
- Welcome offer code and rules (new-buyer branch only).
- First / higher discount codes and rules for Email 3 and 4 on each branch.
- Top objections that surface specifically at checkout: unexpected shipping cost, payment friction, sizing fear, delivery time concern.

## Example (Past-buyer Email 1 brief sketch)

```
## Your Order Is Ready to Ship

**Campaign Direction**: Return the past buyer to the live checkout session with "order is ready to ship" framing and surface trust assets at the moment they matter most.

**Product Focus**: Dynamic checkout block, exact line items the customer was checking out with.

**Offer**: No offer.

**Links**: <VERIFIED LIVE-CHECKOUT RETURN URL FROM BRAND>

**Email Sections**:
1. Hero Section
2. Product Spotlight
3. Support Block

**Design Notes**: Dynamic checkout block sits in Product Spotlight directly under the hero, above any hero image. Headline uses the "order is ready to ship" frame. Support Block carries shipping speed, secure-checkout badge, money-back, and accepted payment options. CTA must drop the customer into the same checkout session.

**Flow Context**: Checkout Abandon Flow, past-buyer branch, Email 1 of 4. Fires 30 minutes after Checkout Started. No discount on Emails 1 or 2 in this branch; first discount lands at Email 3.
```

The brief defines both exclusions (no discount, no brand explanation) and requirements. The writer composes headline and trust copy from brand state.
