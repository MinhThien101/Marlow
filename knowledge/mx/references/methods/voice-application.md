# Voice application

## Education

Voice rules live in `brand/<slug>/voice.md`. They are durable: brand-committed, user-confirmed, and proposed from real artifacts by voice analysis. Copy is ephemeral: one send goes out, then next week's send replaces it.

When voice rules conflict with a brief instruction, voice wins. The brief is tactical. Voice is a brand commitment. If a brief says "use urgent, all-caps headlines" but voice bans all-caps, reconcile the brief with voice before writing.

### Why voice rules win

A brand voice is built over months or years. Customers recognize it. Other channels reinforce it. One send that breaks voice signals inconsistency. One send that breaks the brief is only an internal miss.

Recovery cost is asymmetric. Breaking a brief is usually a quick revision. Breaking voice causes credibility loss across channels.

### What voice rules look like

Voice rules are atomic and durable. Examples (placeholder rules only):

- "Subject lines use sentence case, not title case."
- "Never use 'game-changing'."
- "Founder voice is 'we', not 'I' when the team is involved."
- "No exclamation marks anywhere in body copy."
- "CTAs use action verbs: Shop, Read, Try. Not 'Click here', not 'Learn more'."

Most brands have 5-7 active rules. More than 12 usually means `voice.md` became a tone essay, not a rule set. If it is bloated, run voice-analysis next, not this procedure.

### What voice rules are not

Voice rules are not personality framing ("warm and helpful"), tone descriptions ("casual but professional"), or aspirational positioning ("trusted friend"). Those belong in `profile.md` for context. Atomic, enforceable rules belong in `voice.md`.

## Template

### Application procedure

1. **Load voice.** Read `brand/<slug>/voice.md` before writing. Read once per session, not per send.

2. **Identify active rules.** Most brands have 5-7. List them mentally before drafting. If `voice.md` reads like positioning prose, treat explicit rule-style lines as authoritative and ignore prose framing for this copy pass. Flag the gap as a voice-analysis follow-up in handoff.

3. **Draft copy.** Follow the brief. Use recent sends in `recent-sends/` for rhythm and vocabulary calibration. Do not force each rule during first draft; checklist drafting produces stiff prose.

4. **Check draft against each rule.** Read once per rule. Scan for violations.

5. **Revise targeted lines, not full draft.** When a rule flags a violation, fix that line only. Do not rewrite surrounding copy.

6. **Re-check after revision.** A targeted fix can create a new violation. Run one more pass.

7. **Note in handoff.** If `voice.md` was sparse, note it. If brief and voice conflicted, name the conflict and which won (voice wins).

### What to do when voice and brief conflict

Brief decides what the campaign is about (product, offer, structure, links). Voice decides how it sounds (vocabulary, punctuation, sentence rhythm, persona).

Conflict resolution by category:

- Brief says "include CTA 'Learn More'", voice rule says "CTAs use action verbs, never 'Learn More'": voice wins. Pick an action-verb CTA the brand's recent sends actually use ("Read it", "See how", "Try it").
- Brief says "lead with urgency", voice rule says "no exclamation marks": both can coexist. Urgency without exclamation marks is harder writing but possible.
- Brief requires copy that breaks a voice rule in a way that cannot be reconciled: stop. Surface the conflict in the handoff. The user decides; do not silently break voice.

### What to do when voice.md is missing or thin

If `voice.md` does not exist, the brand has not gone through voice analysis. The right next step is voice-analysis, not this procedure. If user still needs copy, calibrate from:

- `profile.md` positioning and any voice notes it contains.
- The two or three most recent sends in `recent-sends/`.
- The brand's website tone, if a research tool is available and a fetch is justified.

Note the gap in handoff. Recommend voice-analysis before the next batch of sends.

## Examples

Three short before/after pairs. One rule applied per pair. Placeholder brand names only.

### Example 1: Exclamation marks

Rule (from `voice.md`): "Never use exclamation marks in body copy. Sentence-ending punctuation is a period."

Draft line: "Just dropped! The fall capsule is finally here."

Revised line: "Just dropped. The fall capsule is finally here."

Why this revision and not a full rewrite: the rule is about a single character. The sentence structure is fine. Replacing the exclamation mark with a period preserves the writer's choice and applies the rule without overcorrecting.

### Example 2: CTA verbs

Rule (from `voice.md`): "CTAs use specific action verbs that name the action ('Shop the capsule', 'Read the founder letter'). Do not use 'Learn more' or 'Click here'."

Draft CTA: "Learn more"

Revised CTA: "Read why we made it"

Why this revision: the original CTA is generic and rule-violating. The revised CTA names the specific action and matches the campaign direction (founder voice on origin). The CTA does more work, not just rule-compliance work.

### Example 3: Subject line case

Rule (from `voice.md`): "Subject lines use sentence case, not title case. Capitalize only the first word and proper nouns."

Draft subject line: "Your Order Is Ready To Ship"

Revised subject line: "Your order is ready to ship"

Why this revision and not a rewrite: the brief called for urgency framing on a checkout-abandon node. The original draft delivers it. The rule is about case, not about the framing. Apply the case change; leave the framing.

## What this document does not do

- It does not analyze voice from artifacts. That is the voice-analysis purpose's job.
- It does not write voice rules into briefs. Briefs carry no voice guidance.
- It does not replace the brand's `voice.md`. It tells you how to apply it.
