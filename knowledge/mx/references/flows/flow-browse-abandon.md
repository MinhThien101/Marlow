# Browse abandon flow

## Education

Medium-intent recovery. The shopper viewed a product page but did not add to cart. Warmer than site abandon, cooler than cart/checkout abandon. They may be distracted, comparing, or unconvinced. Show the exact product again, reduce hesitation, then escalate to an offer if needed.

- **Audience.** Viewed at least one specific product, then did not cart.
- **Trigger.** Viewed Product. Email 1 fires 30-60 minutes after the trigger (1 hour default) on both branches.
- **Strategic purpose.** Re-show the exact viewed product and convert before intent cools.
- **Core mechanic.** Dynamic product block sits at the top of every email body. It is the hero. Show exact viewed product (image, name, price, return-to-PDP link).
- **Playbook shape.** Exactly 4 emails per branch with mandatory buyer-history split. Past-buyer branch has no discount in Emails 1-2; new-buyer branch carries the welcome offer in Emails 1-2. Both branches escalate at Email 3 and close with urgency at Email 4.
- **Voice.** Aggressive close-the-deal copy: "Your order is ready to ship", "You're one click away". "Forgetting something?" is forbidden.
- **TEXT_BASED placement.** Email 2 (`framework-objection-handler`, addresses 3-5 specific objections) and Email 4 (`framework-discount-push`) on each branch.
- **What does not belong.** Generic education unrelated to the viewed product. Broken merge variables. Skipping shipping/returns/guarantee reassurance somewhere in the flow (Email 2 is the natural home).

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
| Trigger | - | Viewed Product | METRIC | n/a |
| Past buyer | 1 | Still Thinking About It? | DESIGNED | Wait 1 hour, if past buyer |
| Past buyer | 2 | Quick Answers + FAQs | TEXT_BASED | Wait 1 day |
| Past buyer | 3 | Discount + Why You Will Love It | DESIGNED | Wait 1 day |
| Past buyer | 4 | Last Chance Discount Expires | TEXT_BASED | Wait 1 day |
| New buyer | 1 | Still Thinking? + Welcome Offer | DESIGNED | Wait 1 hour, if new buyer |
| New buyer | 2 | Quick Answers + Welcome Offer | TEXT_BASED | Wait 1 day |
| New buyer | 3 | Higher Discount + Reviews | DESIGNED | Wait 1 day |
| New buyer | 4 | Last Chance Higher Discount Expires | TEXT_BASED | Wait 1 day |

Per-node recommendations:

| Branch / # | Recommended sections / framework | Notes |
|---|---|---|
| Past 1 | Hero Section + Product Spotlight + Social Proof | Product block in Product Spotlight directly under hero. 2-4 review signals. |
| Past 2 | `framework-objection-handler` | Address 3-5 specific first-purchase objections inline. Soft return-to-product link allowed near the end. No discount. |
| Past 3 | Hero Section + Discount Offer + Social Proof | First discount for past buyers. Product block visible. Start building urgency. ALTERNATIVE: Benefit List in place of Social Proof when outcomes drive the decision. |
| Past 4 | `framework-discount-push` | Heavy urgency on the Email 3 discount. Personal voice. |
| New 1 | Hero Section + Product Spotlight + Social Proof + Promo Banner | Welcome offer carried in top Promo Banner (4 sections; banner is scan-first). ALTERNATIVE: 3 sections with Discount Offer in place of Social Proof. |
| New 2 | `framework-objection-handler` | Address objections. Welcome discount reminder. Soft return-to-product link allowed. |
| New 3 | Hero Section + Discount Offer + Social Proof | Escalate from welcome offer to a stronger offer. |
| New 4 | `framework-discount-push` | Heavy urgency on the higher discount. |

Required brand-specific facts (mark `missing info: <what is missing>` if unverifiable):

- Whether Viewed Product tracking is correctly installed and firing on every product page.
- Dynamic product-block configuration: merge variables, image source, return-to-PDP URL behavior.
- Welcome offer code and rules (new-buyer branch only).
- Higher / first discount codes and rules for Email 3 and 4 on each branch.
- Top FAQs and objections that block first-purchase decisions for this brand.
- Reassurance assets: shipping policy, returns, guarantees, money-back terms.
- Whether the brand wants alternative-product logic anywhere (the viewed product may not be the only fit).

## Example (Past-buyer Email 1 brief sketch)

```
## Still Thinking About It?

**Campaign Direction**: Re-surface the exact viewed product with aggressive close-the-deal framing and reinforce the choice with social proof. No discount yet.

**Product Focus**: Dynamic product block, customer's exact viewed product.

**Offer**: No offer.

**Links**: <VERIFIED RETURN-TO-PDP URL>

**Email Sections**:
1. Hero Section
2. Product Spotlight
3. Social Proof

**Design Notes**: Dynamic product block sits in Product Spotlight directly under the hero, above any hero image. Include 2-4 review or rating signals in Social Proof. Headline uses close-the-deal framing ("Your order is ready to ship" or equivalent).

**Flow Context**: Browse Abandon Flow, past-buyer branch, Email 1 of 4. Fires 1 hour after Viewed Product. No discount on Emails 1 or 2 in this branch; first discount lands at Email 3.
```

The brief defines what to show and what to hold. The writer pulls review quotes and headline copy from brand state.
