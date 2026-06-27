# SMS: Order Update

Order Update is a transactional SMS that states what changed with an order: shipped, carrier pickup, delivered, delayed, or ready for pickup. Use it when there is a real status change tied to a specific order and the customer needs a practical next action (tracking link, pickup window, support path). Keep it operational, not marketing. Do not disguise promos as transactional or invent status; carrier/system is the source of truth. Playbook rule: clarity beats persuasion. Keep status easy to understand. Use real tracking/support links only.

## Structural rules

- Length: under 160 characters total, including link. Shorter is fine here; do not pad.
- Opening: state what happened. Brand name plus status in the first beat ("Your <BRAND> order has shipped", "Your order is on the way").
- Body: optional one-line context if the status needs it (carrier name, expected window). Skip when the status stands alone.
- CTA: one. Tracking link or support link, shortened. Verb is operational ("Track your delivery", "View order", "Get help").
- Sign-off: none.
- Compliance: links shortened; the tracking link must be a real per-order URL passed in from the order system, never a generic homepage.

## When the brief should call it

```
**Campaign Direction**: <one sentence naming the status event and the action>

**Product Focus**: <the order or product context, if relevant>

**Offer**: <typically "No offer">

**Links**: <the per-order tracking or support URL, or `missing info: tracking URL` if unresolved>

**Message Type**: Order Update
```

The brief carries status language and tracking destination. The copywriter does not invent statuses, ETAs, or carrier names.

## Example structural fragment

```
Your <BRAND> order <STATUS PHRASE>. <OPTIONAL ONE-LINE CONTEXT>. <CTA VERB>: [TRACKING_URL]
```

If the message starts cross-selling or asking for a review, it has drifted. This is operational; keep it operational.
