# Sunset flow

## Education

List hygiene play, not reactivation. Single stay-or-leave checkpoint before the brand stops emailing disengaged contacts. Reactivation belongs in winback; this flow protects sender reputation and inbox placement.

- **Audience.** Disengaged contacts: no opens in about 180 days AND no site activity in about 180 days. They already received regular campaigns and ignored them.
- **Trigger.** Sunset-eligible segment: can receive marketing AND no opens in 180 days AND no site activity in 180 days. 180 is default (some brands use 120 or 365).
- **Strategic purpose.** List hygiene and deliverability protection. Suppressing unengaged contacts improves opens, inbox placement, and conversion for the rest of the list.
- **Core mechanic.** Clear stay-or-leave ask. Tell contacts they are about to be removed unless they confirm. Direct beats clever.
- **Playbook shape.** Exactly 1 email. Single primary CTA (stay subscribed/click to confirm). Optional secondary preference-management link.
- **Suppression rule.** Suppression and unengaged-marking happen via segment config outside this flow. This flow is only the courtesy notice.
- **Voice.** Direct and plain. No clever marketing language.
- **What does not belong.** Discounts/sales offers (winback's job). "We miss you" framing. Multiple emails. Vague next-step language.

## Template

| # | Title | Type | Timing |
|---|---|---|---|
| Trigger | Sunset Eligible Segment | SEGMENT | n/a |
| 1 | Stay Subscribed? | DESIGNED | Send immediately |

Per-node recommendations:

| # | Recommended sections / framework | Notes |
|---|---|---|
| 1 | Hero Section + Support Block | Clear stay-or-leave ask in Hero. Primary "stay subscribed" CTA. Support Block carries the optional preference-management link if the brand uses one. No discount. No product recommendations. Direct copy. |

Required brand-specific facts (mark `missing info: <what is missing>` if unverifiable):

- The exact engagement threshold the brand uses (180-day default; 120 or 365 acceptable).
- What happens after the email if no response: hard suppression, marked unengaged, frequency reduction, or preference-center redirect.
- Whether the brand has a preference center (reduce frequency vs full unsubscribe vs stay subscribed) and the URL.

## Example (Email 1 brief sketch)

```
## Stay Subscribed?

**Campaign Direction**: Single stay-or-leave ask to disengaged contacts. Direct, clear, no offer.

**Product Focus**: No product focus.

**Offer**: No offer.

**Links**: <VERIFIED STAY-SUBSCRIBED CTA URL>, optional <PREFERENCE-CENTER URL>

**Email Sections**:
1. Hero Section
2. Support Block

**Design Notes**: Hero tells the contact clearly they are about to be removed unless they take action. Primary "stay subscribed" CTA prominent. Support Block may carry a secondary "manage preferences" or "reduce frequency" link if the brand uses one. No discount, no product recommendations, no clever copy.

**Flow Context**: Sunset Flow, single email. Fires immediately on segment entry. Suppression after no response happens via segment configuration outside the flow.
```

The brief defines directness and no-offer state. The writer composes headline and support-block copy from brand state.
