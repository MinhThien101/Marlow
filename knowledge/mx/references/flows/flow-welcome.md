# Welcome flow

## Education

The most important flow in any account. Intent peaks at signup and decays fast. The job is to deliver the welcome offer, build enough trust to convert, and close the window with urgency before intent cools.

- **Audience.** New subscribers from popup or ad landing page. Trust is low; product interest is unproven.
- **Trigger.** Joins email list. Email 1 fires immediately (not 1 minute or 5). Double opt-in must be off; popup is the consent.
- **Strategic purpose.** Convert first-touch interest into first purchase in the post-signup trust window.
- **Core mechanic.** Welcome offer is the biggest lever. Layout tweaks rarely create 2x lift; the right offer can. Treat the offer as flow hero.
- **Playbook shape.** Default is 5 main emails plus 1 bonus store-credit email at +14 days (6 total). 4 main is acceptable for low-AOV brands; 6 main for high-AOV brands. Emails 1-5 are spaced exactly 1 day apart.
- **Discount placement rule.** Discount code and primary CTA sit at the top of Email 1, above any hero image. Welcome discount reminder appears in the hero of Emails 1-5.
- **Email 5 is always TEXT_BASED.** Founder letter extending discount by 24 hours, with real signature line.
- **Email 6 is non-negotiable.** Bonus store credit at +14 days with slightly random dollar amount (`$7.14`, `$13.42`). Round numbers underperform; randomness is the point.
- **Voice.** Aggressive/direct beats soft "join our community" framing. Use "You've Got XX% OFF" over "Claim XX% OFF" for implied ownership.
- **What does not belong.** Urgency in Emails 1-3 (urgency moment is Email 4). Generic brand essays in Email 1. Round-number store credit in Email 6.

## Template

| # | Title | Type | Timing |
|---|---|---|---|
| Trigger | Joins Email List | LIST_JOIN | n/a |
| 1 | Welcome + Discount | DESIGNED | Send immediately |
| 2 | Brand Story | DESIGNED | Wait 1 day |
| 3 | How It Works + FAQ | DESIGNED | Wait 1 day |
| 4 | Last Chance Discount Expires | DESIGNED | Wait 1 day |
| 5 | Founder Letter + Extended Discount | TEXT_BASED | Wait 1 day |
| 6 | Bonus Store Credit | TEXT_BASED | Wait 14 days |

Per-node recommendations:

| # | Recommended sections / framework | Notes |
|---|---|---|
| 1 | Hero Section + Discount Offer + Social Proof | Code + CTA above any hero image. "You've Got XX% OFF" framing. |
| 2 | Hero Section + Brand Story + Promo Banner | Promo Banner carries the welcome discount reminder. One angle, deep. |
| 3 | Hero Section + How It Works + FAQ | Pick 2-4 specific first-purchase objections. Discount reminder in hero or top banner. |
| 4 | Hero Section + Urgency Banner + Discount Offer | Heavy urgency. Countdown or explicit deadline. No "no rush" language. |
| 5 | `framework-founder-letter` | Real signature. Extends the discount 24 hours. Acknowledges no purchase yet. |
| 6 | `framework-discount-push` | Slightly random store-credit amount. 5-7 day expiry window. References "applied to your account". |

Required brand-specific facts to gather (mark `missing info: <what is missing>` if unverifiable):

- Welcome offer details: code, amount, expiry rules, eligibility.
- Whether the brand has a welcome kit (mention it in every email if so).
- 1-3 best angles for Emails 2 and 3 (founder story, ingredient education, top FAQs, comparison vs competitors, social proof, how-it-works).
- Bestsellers or hero products for Email 1 and the bridge emails.
- Store-credit dollar amount for Email 6, non-round, recommended range `$5-$20`.

## Example (Email 1 brief sketch)

```
## Welcome + Discount

**Campaign Direction**: Deliver the welcome offer above the fold and convert the highest-intent moment in the relationship.

**Product Focus**: <BESTSELLER OR HERO COLLECTION FROM BRAND PROFILE>

**Offer**: <EXACT WELCOME OFFER MECHANIC>, code <EXACT CODE>, expires <EXPIRY RULE>, eligibility <ELIGIBILITY RULES>

**Links**: <VERIFIED CHECKOUT OR COLLECTION URL>

**Email Sections**:
1. Hero Section
2. Discount Offer
3. Social Proof

**Design Notes**: Discount code and primary CTA must sit at the very top of the email body, before any hero image. Use "You've Got XX% OFF" framing.

**Flow Context**: Welcome Flow, Email 1 of 6. Sends immediately on list join. Welcome discount reminder must reappear in the hero of every email through Email 5.
```

The brief defines structure. It does not pre-write headline, CTA copy, or social proof quotes. The writer pulls those from brand state.
