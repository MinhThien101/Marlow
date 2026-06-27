# Winback flow

## Education

Reactivation, not sentiment. These customers have seen campaign content for months and still have not bought. Soft sentiment rarely moves them. Offer mechanics are the consistent lever.

- **Audience.** Lapsed customers. Familiar with the brand, have seen regular campaigns, and ignored them. Do not need education or storytelling.
- **Trigger.** Winback-eligible segment, never a Placed Order trigger with long delay (leaves flow empty for months). Segment: ordered in last (lapse + 1) days AND not ordered in last (lapse - 1) days. Refresh daily.
- **Lapse window formula.** Average repeat-purchase time x 3. A 30-day repurchase cycle starts winback at day 90.
- **Strategic purpose.** Reactivate lapsed customers with the right offer mechanic, then switch mechanics if the first one fails.
- **Core mechanic.** Offer testing. Store credit with slightly random dollar amounts (`$7.14`, `$13.42`) is usually best. Do not default to the biggest discount.
- **Playbook shape.** Exactly 4 emails. Email 1 fires at 11 AM recipient local time, never midnight segment refresh. Email 1 introduces first offer immediately (no warm-up). Email 3 must switch to a DIFFERENT offer mechanic, not a higher percentage of the same mechanic.
- **TEXT_BASED placement.** Email 1 (`framework-win-back`) and Email 4 (`framework-discount-push`).
- **Voice.** Personal note voice in Email 1 ("Hey, it's been a while, is everything okay?"). Aggressive urgency in Email 4.
- **What is forbidden.** "We miss you" framing in subject/body. Brand reintroduction. Treating lapsed customers like cold prospects. Same offer mechanic on Emails 3-4 as Emails 1-2. Defaulting to generic 15% off.

## Template

| # | Title | Type | Timing |
|---|---|---|---|
| Trigger | Winback Eligible Segment | SEGMENT | n/a |
| 1 | Personal Check In + First Offer | TEXT_BASED | Send at 11am local time |
| 2 | Reminder of Your Offer | DESIGNED | Wait 3 days |
| 3 | Different Offer to Try | DESIGNED | Wait 7 days |
| 4 | Last Chance on This Offer | TEXT_BASED | Wait 3 days |

Per-node recommendations:

| # | Recommended sections / framework | Notes |
|---|---|---|
| 1 | `framework-win-back` | Personal note (founder or team voice). Introduce the first offer in the same email; do not defer. Code and one-click link. |
| 2 | Hero Section + Discount Offer + Product Grid | Reinforce the SAME offer from Email 1 with branded visual treatment. Code prominent. Start adding urgency. ALTERNATIVE: Social Proof in place of Product Grid when reviews drive reactivation. |
| 3 | Hero Section + Discount Offer + Social Proof | Introduce a DIFFERENT offer mechanic, not a higher percentage of the same one. Code prominent. ALTERNATIVE: Product Spotlight in place of Social Proof when the second offer is tied to a specific product or bundle. |
| 4 | `framework-discount-push` | Heavy urgency on the Email 3 offer. Code and one-click link. Personal voice. |

Required brand-specific facts (mark `missing info: <what is missing>` if unverifiable):

- The brand's average repurchase window in days (so the lapse window can be set to 3x that value).
- The first offer (Emails 1-2): mechanic, code, amount, expiry.
- The second offer (Emails 3-4) using a different mechanic from the first.
- Founder or team voice cues for the text-based emails.
- Top products to feature or context that explains why now (new launch, season change).

Offer mechanics worth testing (start with one in Emails 1-2, switch on Email 3):

- Store credit with a slightly random dollar amount (consistently best-performing).
- BOGO percent off.
- Bundle offer.
- Free gift with purchase.
- Large percent off.
- Dollar amount off.

A higher percentage of the same mechanic does NOT count as different. Store credit replacing percent off does. Bundle replacing BOGO does. Free gift replacing dollar off does.

## Example (Email 1 brief sketch)

```
## Personal Check In + First Offer

**Campaign Direction**: Reactivate the lapsed customer with a personal note that introduces the first offer in the same email. Sentiment-led intro, offer-led close.

**Product Focus**: <TOP PRODUCT OR REASON-WHY-NOW CONTEXT>

**Offer**: <FIRST OFFER MECHANIC>, code <EXACT CODE>, expires <EXPIRY>, eligibility <RULES>

**Links**: <VERIFIED ONE-CLICK OFFER URL>

**Framework**: framework-win-back

**Design Notes**: Personal note from <FOUNDER OR TEAM SIGNATURE>. Tone: "Hey, it's been a while, is everything okay? Did something not work for you?" Offer introduced inside the same email, not deferred. Code and one-click link near the close.

**Flow Context**: Winback Flow, Email 1 of 4. Fires at 11am local time on segment entry. Email 3 must switch to a different offer mechanic from this one.
```

The brief defines offer terms verbatim and 11am local-time send. The writer composes the personal note from brand state.
