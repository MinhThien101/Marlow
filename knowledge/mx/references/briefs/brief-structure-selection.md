# Brief structure selection

## Education

Every email and SMS gets one of three structures: DESIGNED (canonical sections in order), TEXT_BASED (one long-form framework), SMS (one message type under 160 characters). The structure choice cascades into every downstream copy decision: how many bullets, what proof, what tone, what CTA, what cuts. Choose it from the job of the campaign, not from the number of facts in the source.

### Why structure matters

The brief carries one campaign direction. The structure has to support that one direction cleanly. Mixed structures and bloated stacks read like multiple emails stapled together and convert worse than tight ones. The goal is not to find a safe default. The goal is to find the cleanest structure that lets one direction land.

### Dataset grounding

This guidance is grounded in a labeled corpus of real campaigns. Treat the counts as priors, not universal truth, but treat them as strong priors.

- Designed campaigns: 824 emails analyzed, 2,959 labeled sections, ~3.6 sections per email on average.
- Most common designed sections: Hero Section (419), Product Grid (347), Benefit List (319), Lifestyle Content (226), Educational Content (219), Product Spotlight (216), Social Proof (199), Support Block (180), Discount Offer (173), Promo Banner (150).
- Text campaigns: 195 examples. Top frameworks: Discount Push (36), Educational Guide (24), Founder Letter (19), Problem-Solution (17), Event/Launch Announcement (15).
- SMS campaigns: 50 examples. Top message types: Flash Sale (12), New Product (9), Brand Update (6), Cart Reminder (5), Welcome Offer (4).

The numbers above are from a labeled corpus. The patterns are strong defaults, not rules. Judgment still chooses.

### Section weight matters

A DESIGNED email is a stack of sections, but the sections are not equal weight. Heavy sections carry explanation. Scan-first sections support without competing for attention. A four-section email built from two heavy sections plus two more reads like a landing page; the same four sections built from one heavy plus three scan-first reads tight.

Heavy sections (usually explanatory, copy-dense):

- Educational Content, Product Spotlight, Feature Highlight, Brand Story, Lifestyle Content, Support Block, How It Works, FAQ, Comparison Table, Social Proof, Discount Offer, Quiz / Interactive

Scan-first sections (short, visual, fast):

- Benefit List, Product Grid, Promo Banner, Urgency Banner, Image Block

Rule of thumb: one heavy plus one heavy is the cap. One heavy plus a stack of scan-first is the safe extension pattern.

### Campaign type defaults

- DESIGNED: when the reader benefits from visual scanning, modular merchandising, side-by-side comparison, or distinct blocks of proof, education, and product. Hero Section is always first. Most DESIGNED emails land at 2-3 total sections. Four sections only when the extras are scan-first. More than four needs a real reason.
- TEXT_BASED: when the message lands better as a long-form note than as a stack of blocks. Choose ONE framework. Do not mix.
- SMS: when the message can land in under 160 characters with one direct ask. Choose ONE message type.

## Template

### Decision order

Run this sequence on every campaign. Stop at the first answer that locks the structure.

1. What is the one campaign direction? State it in one sentence.
2. What does the reader need from this send: to browse, understand, trust, feel the world, act on an offer, or focus on one hero product?
3. What is the simplest structure that can do that job well?
4. Which canonical labels fit that job most cleanly?

If two structures are plausible, choose the one that:

- keeps the email tighter
- matches the primary job more directly
- requires fewer transitions in the copy

### Six campaign jobs

Most DESIGNED campaigns fit one of six job patterns. Each has a typical section stack. Vary the support section based on the intent.

1. Browse or shop a collection. Reader needs to see options and choose a fit.
   - Hero Section + Product Grid
   - Hero Section + Product Grid + Benefit List
   - Hero Section + Lifestyle Content + Product Grid

2. Understand why this product matters. Reader needs framing or reassurance before browsing.
   - Hero Section + Educational Content + Product Spotlight
   - Hero Section + How It Works + Product Grid

3. Trust the claim or overcome hesitation. Reader's blocker is skepticism.
   - Hero Section + Social Proof + Product Spotlight
   - Hero Section + Comparison Table + Product Spotlight

4. Feel the world, mood, or identity first. Campaign sells a scene before a product.
   - Hero Section + Lifestyle Content + Product Grid
   - Hero Section + Brand Story + Product Spotlight

5. Act on a live offer. Offer is the real reason for the send.
   - Hero Section + Discount Offer + Product Grid
   - Hero Section + Urgency Banner + Product Spotlight
   - Hero Section + Promo Banner + Discount Offer + Product Grid

6. Focus on one hero product or one clear answer. Concentration over assortment.
   - Hero Section + Product Spotlight
   - Hero Section + Product Spotlight + Benefit List
   - Hero Section + How It Works + Product Spotlight

### Five-question chooser (after the hero)

If the six jobs do not name the right pattern, run the chooser:

1. Does the reader mainly need to browse? Lean toward Product Grid.
2. Does the reader mainly need to understand? Lean toward Educational Content, How It Works, or FAQ etc....
3. Does the reader mainly need proof? Lean toward Social Proof or Comparison Table.
4. Does the reader mainly need to feel the lifestyle or story? Lean toward Lifestyle Content or Brand Story.
5. Does the reader mainly need to act on an offer? Lean toward Discount Offer, Urgency Banner, or Promo Banner.

Pick the smallest combination that does the job with a maximum of 3 sections.

### TEXT_BASED framework chooser

Choose ONE framework based on the campaign direction. Do not mix.

- buy now because of the deal -> Discount Push
- learn this so the product makes sense -> Educational Guide
- hear this from the founder or brand voice directly -> Founder Letter
- solve this pain or objection -> Problem-Solution
- pay attention because something new is arriving -> Event/Launch Announcement
- recover an unfinished cart or checkout -> Cart Recovery
- win back a lapsed customer with an offer -> Win-Back
- thank a customer for a recent purchase -> Thank You Note
- answer specific objections holding the reader back -> Objection Handler
- ask for a product review -> Review Request

### SMS message-type chooser

SMS is even more job-driven than email. Pick the type from the single clearest reason the message exists. If the message tries to do two jobs, reduce it.

- urgency plus live offer -> Flash Sale
- product or collection announcement -> New Product
- relationship or brand-world driven -> Brand Update
- recover prior intent -> Cart Reminder
- onboarding plus first-purchase incentive -> Welcome Offer
- sold-out product is available again -> Restock Alert
- bundle or multi-item savings is the reason to act -> Bundle Deal
- one useful lesson makes the product more likely to convert -> Educational Tip
- proof from customers, press, or results is the hook -> Social Proof
- operational update needs a concise customer-facing note -> Order Update
- lapsed buyer needs a concrete reason to return -> Win-Back
- loyalty, points, VIP, or reward status is the hook -> Loyalty Reward
- event, holiday, launch window, or timed moment is the hook -> Event Promo

### Flow-node addition

Same selection logic applies inside flows. The difference is sequence context: the node's role in the flow shapes the structure choice. An early welcome node fits a simpler orientation-style structure. A later cart-recovery node fits a tighter, urgency-led or objection-led structure. A post-purchase node fits education or reassurance more than hard conversion. Flow context should sharpen the choice, not bloat it.

### Monthly anti-repetition rule

When briefing a month of campaigns, do not let every DESIGNED email collapse to Hero Section + Product Grid + Lifestyle Content. Vary the support section when the campaign job changes. Repeated stacks are acceptable only when the campaign logic is genuinely repeated.

### Red flags

You are probably overbuilding the structure if:

- you have 5+ body ideas and each one is fighting for attention
- the source includes benefits, reviews, ingredients, sale info, product details, and seasonal theme and you try to represent all of them
- the email starts to feel like a landing page instead of an email
- every campaign in the month keeps collapsing into the same safe 3-section stack
- the stack exceeds 4 total sections once Hero Section is counted

If that happens, reduce the stack. If the stack is tight but repetitive, vary the support section based on the campaign job.

### Final selection test

Before locking the brief, ask:

- Does this structure clearly support one campaign direction?
- Is there a simpler structure that would do the job just as well?
- Did I choose this because it fits the job, or because the source mentioned a lot of ideas?
- Handed to a copywriter, would the structure feel focused or overloaded?

If it feels overloaded, reduce it before locking.

## Examples

Three short worked decisions. Placeholder names only.

### Example 1: Black Friday push for a new brand

Campaign direction: drive first-purchase volume on the live Black Friday discount.

Reader job: act on a live offer. The brand is new to most subscribers, so a single proof signal helps.

Structure: DESIGNED. Hero Section + Discount Offer + Product Grid + Urgency Banner.

Why this and not something denser: the offer is the reason for the send. Discount Offer is the second section so the savings math is unmissable. Product Grid gives one click target per category. Urgency Banner lands the deadline. No Educational Content because nothing about the product needs explaining; the discount is the whole story. No Social Proof block because the Urgency Banner serves the closing job better at this offer-driven moment.

### Example 2: Founder check-in for an established brand

Campaign direction: re-engage the list with a one-to-one voice from the founder about why the brand exists.

Reader job: hear from the founder. The voice IS the campaign.

Structure: TEXT_BASED. Framework: Founder Letter.

Why this and not DESIGNED: a section stack would dilute the voice. The whole point is a personal note. One framework, one voice, no transitions.

### Example 3: Restock SMS for a sold-out hero SKU

Campaign direction: tell engaged subscribers the hero product is back in stock so they can buy before it goes again.

Reader job: act on a restock signal.

Structure: SMS. Message type: Restock Alert.

Why this and not New Product or Flash Sale: the product is not new, and there is no time-pressure offer. The scarcity is real product availability. One direct ask, one link, under 160 characters.
