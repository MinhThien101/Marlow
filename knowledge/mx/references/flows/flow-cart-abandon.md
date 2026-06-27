# Cart abandon flow

## Education

High-intent recovery. The shopper added to cart and stopped before checkout. They showed real intent but hit hesitation, distraction, or last-minute friction. The dynamic cart block does most of the work by showing exactly what they were about to buy.

- **Audience.** Added to cart but did not begin checkout. Often blocked by shipping cost, comparison shopping, or distraction.
- **Trigger.** Added to Cart. Email 1 fires 30 minutes after the trigger. Same delay on both branches.
- **Strategic purpose.** Bring the shopper back to cart and close the purchase. Not PDP or homepage.
- **Core mechanic.** Dynamic cart block sits at the top of every email body, above any hero image. Show each line item with quantity, price, and return-to-cart CTA. This block is the hero.
- **Playbook shape.** Exactly 4 emails per branch with mandatory buyer-history split (past buyer vs new buyer). Past-buyer branch has no discount in Emails 1-2; new-buyer branch carries the welcome offer in Emails 1-2. Both branches escalate at Email 3 and close with urgency at Email 4.
- **Voice.** Aggressive close-the-deal copy: "Your order is ready to ship", "You're one click away". "Forgetting something?" is forbidden.
- **TEXT_BASED placement.** Email 2 (`framework-cart-recovery`) and Email 4 (`framework-discount-push`) on each branch.
- **Trust assets.** Shipping cost is the common blocker. Free-shipping thresholds, money-back, and secure-checkout signals belong early in a Support Block.
- **What does not belong.** Reusing the same reminder copy across all four emails. Sending customers to PDP instead of cart. Using the same generic 10% off at Email 3 every time; test offer mechanics.

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
| Trigger | - | Added to Cart | METRIC | n/a |
| Past buyer | 1 | Your Order Is Ready to Ship | DESIGNED | Wait 30 minutes, if past buyer |
| Past buyer | 2 | Cart Still Waiting (Quick Note) | TEXT_BASED | Wait 1 day |
| Past buyer | 3 | Unlock a Discount + Reviews | DESIGNED | Wait 1 day |
| Past buyer | 4 | Last Chance Discount Expires | TEXT_BASED | Wait 1 day |
| New buyer | 1 | Cart Ready + Welcome Offer | DESIGNED | Wait 30 minutes, if new buyer |
| New buyer | 2 | Text Reminder + Welcome Offer | TEXT_BASED | Wait 1 day |
| New buyer | 3 | Higher Discount + Reviews | DESIGNED | Wait 1 day |
| New buyer | 4 | Last Chance Higher Discount Expires | TEXT_BASED | Wait 1 day |

Per-node recommendations:

| Branch / # | Recommended sections / framework | Notes |
|---|---|---|
| Past 1 | Hero Section + Product Spotlight + Support Block | Cart block in Product Spotlight directly under hero. Support Block carries trust assets. |
| Past 2 | `framework-cart-recovery` | Personal note, founder or support voice. Cart link. No discount. Address 1-2 likely objections. |
| Past 3 | Hero Section + Discount Offer + Social Proof | First discount for past buyers. Cart block still visible. Start building urgency. |
| Past 4 | `framework-discount-push` | Heavy urgency on the Email 3 discount. Code and cart link. |
| New 1 | Hero Section + Product Spotlight + Discount Offer | Cart block above hero. Welcome discount reminder. ALTERNATIVE: Promo Banner for the offer as a top scan-first reminder. |
| New 2 | `framework-cart-recovery` | Welcome discount reminder. Cart link. |
| New 3 | Hero Section + Discount Offer + Social Proof | Escalate from welcome offer to a stronger offer. |
| New 4 | `framework-discount-push` | Heavy urgency on the higher discount. |

Required brand-specific facts (mark `missing info: <what is missing>` if unverifiable):

- Whether Added to Cart tracking is correctly installed and firing.
- Dynamic cart-block configuration: merge variables, return-to-cart URL behavior.
- Welcome offer code and rules (new-buyer branch only).
- First / higher discount codes and rules for Email 3 and 4 on each branch.
- Shipping threshold and shipping policy (often the real blocker).
- Top objections that stop checkout: shipping cost, return policy, sizing, payment options.
- Trust assets: money-back guarantee, secure checkout, free shipping over threshold.

## Example (Past-buyer Email 1 brief sketch)

```
## Your Order Is Ready to Ship

**Campaign Direction**: Bring the past buyer back to the cart with aggressive close-the-deal framing and surface trust assets without offering a discount.

**Product Focus**: Dynamic cart block, customer's exact line items.

**Offer**: No offer.

**Links**: <VERIFIED RETURN-TO-CART URL FROM BRAND>

**Email Sections**:
1. Hero Section
2. Product Spotlight
3. Support Block

**Design Notes**: Dynamic cart block sits in Product Spotlight directly under the hero, above any hero image. Use the "order is ready to ship" framing in the headline. Support Block carries free shipping threshold, money-back guarantee, and secure-checkout signals. CTA destination is the cart, not the product page.

**Flow Context**: Cart Abandon Flow, past-buyer branch, Email 1 of 4. Fires 30 minutes after Added to Cart. No discount on Emails 1 or 2 in this branch; first discount lands at Email 3.
```

The brief defines structure, offer state, and destination. The writer composes headline and trust-asset copy from brand state.
