# Framework: Cart Recovery

Cart Recovery is the standard text-based slot in cart-abandon and checkout-abandon flows. Use it for the TEXT_BASED nodes inside those flows (typically Email 2 in the sequence) where a designed reminder already fired and the customer is still warm. Use it when the reader is CLOSE to conversion: they added items, started checkout, or hit a small friction point and stopped. Do not use it for browse-abandon where intent is lower (use Objection Handler there). Do not use it for cold acquisition. Playbook rule: write to someone close to conversion, not someone cold. The cart contents matter; reference what they actually picked when the brief carries it. Support and urgency work together; pick one lever per email, never both at full volume. "Forgetting something?" framing is forbidden. "Your order is ready to ship", "You're one click away", "Your cart is waiting" outconvert.

## Structural rules

- Opening: short. Greeting plus one beat of recognition that the cart exists. No long setup.
- Cart reference: when the brief carries specific items, name them. Generic "your items" is acceptable when the brief does not.
- Reason to come back now: one short beat. The lever is either the offer (welcome discount still applies, code expiring) or trust (free shipping, money-back, support available). Not both at full volume.
- Objection reduction or support cue: one line when the brief includes a support angle (return policy, money-back, sizing help). Skip if not briefed.
- CTA: one. Destination is the CART, not the product page, not the homepage. Verb is direct ("Return to cart", "Complete your order", "Pick up where you left off").
- Sign-off: optional. Founder name only if the brand uses founder voice on flow text emails.
- Do not pile on urgency. One urgency beat is enough; two reads as desperate.

## When the brief should call it

```
**Campaign Direction**: <one sentence naming the cart recovery angle: offer-led, trust-led, or support-led>

**Offer**: <welcome discount terms, expiring code, or "No offer for past buyers">

**Links**: <cart return URL>

**Framework**: Cart Recovery
```

The brief names the lever (offer / trust / support) and the cart URL. The copywriter does not invent an item, a quantity, or a code.

## Example structural fragment

```
Hey [FIRST_NAME],

<OPENING: one beat referencing the cart, not "forgetting something">

<OPTIONAL CART SPECIFICS: name the items if the brief carries them>

<REASON TO COME BACK: one lever, either offer or trust, not both>

<OPTIONAL SUPPORT CUE: one line, e.g. money-back, free shipping, reply for help>

[<CTA VERB PHRASE>]([CART_URL])

[UNSUBSCRIBE_LINK]
```

If the email starts negotiating with the customer ("I know you might be busy, no pressure..."), the framework has drifted toward sentiment. Cut back to: you have items, here is the path, here is one reason to act.
