# Copy review checklist

## Education

Writing and reviewing are different jobs. The writer drafts. The reviewer stays independent and does not defend the writer's choices. This split keeps copy honest: two passes on the same brief and brand state.

Reviewer posture is skeptical, not approving. If no issues appear across all lenses, the review likely was not strict enough.

### The default verdict is NEEDS REVISION

Default verdict is NEEDS REVISION per target. APPROVED is earned one target at a time. If copy passes lenses 1-3 but has an em-dash, verdict stays NEEDS REVISION. Punctuation violations are not minor; reviewer must catch them.

The four verdict levels:

- **APPROVED:** every lens clear, zero findings. Copy is ready as-is.
- **NEEDS REVISION:** at least one finding the writer can fix without restructuring. Default verdict on most reviews.
- **NEEDS REWRITE:** the copy is structurally wrong (wrong sections, wrong framework, wrong message type, brief misread). A targeted revision will not save it.
- **BLOCKED:** the reviewer cannot review (copy unavailable, brief unreadable, structurally incomplete brief).

### The six lenses

Run every lens for every target, in order. Categorize findings by lens. Lenses are independent; one finding does not justify skipping others.

1. **Instruction and brief alignment.** Does the copy match the brief? Same product, same offer, same campaign direction?
2. **Factual integrity and exact required language.** Are claims verifiable? Are exact required phrases present word-for-word?
3. **Helper-skill / type alignment.** DESIGNED matches the ordered Email Sections from the brief. TEXT_BASED matches the named Framework. SMS matches the named Message Type.
4. **Brand-rule and voice compliance.** Voice rules from `voice.md` enforced. Punctuation rules (no em-dash, no en-dash, no hyphen-as-punctuation) enforced.
5. **Format and length compliance.** DESIGNED structure (`[LOGO]` at top, `[FOOTER]` at bottom, `---` between sections, no printed section labels). SMS under 160 characters. Line counts and section counts within doctrine.
6. **Language quality, clarity, and section purpose.** Each sentence earns its place. Each section does one clear job. No padding, no rhetorical filler, no AI patterning (inflated phrasing, empty intensifiers, vague transformation language).

Lenses are separate passes over the same copy, not one blended read. A target can clear lenses 1-3 and still fail lens 4 on punctuation.

### Finding categories (parseable)

Each finding maps to one labeled category. Labels define the return shape.

- `brief mismatch`
- `invented or unverifiable fact`
- `helper-skill mismatch`
- `brand-rule violation` (includes every dash and punctuation finding)
- `formatting or length violation`
- `section bloat or structural overload`
- `language quality problem`

For each finding, the reviewer writes:

- what is wrong (the specific span or line)
- why it is wrong (one consequence-sentence)
- the direction of the expected fix (not the rewritten line)

The reviewer does not draft replacement copy. The writer applies the fix.

## Template

### Review procedure (per target)

1. **Load the copy.** Read every section from the available draft, chat output, file, document, or saved target. A review that cites the brief without reading the copy is a fatal failure.

2. **Mandatory punctuation scan.** Scan character-by-character for em-dash (U+2014), en-dash (U+2013), and hyphen-as-punctuation (pause, aside, sentence break rather than compound-word hyphen). Every occurrence is a `brand-rule violation`. Hyphens in compound words (`high-quality`, `post-purchase`, `ready-to-wear`) are fine. If no findings, say: "Punctuation scan: clean."

3. **Read the brief and copy.** Resolve from chat, document, file, saved target, or current draft. Confirm campaign direction, product focus, offer, links, required language, and structure (sections, framework, or message type).

4. **Apply each lens.** Run lenses 1-6 in order. Report findings in every violated lens, not only earliest failures. Omit lenses with zero findings.

5. **Compute the verdict.** Default to NEEDS REVISION. APPROVED only when all lenses are clear. NEEDS REWRITE when structure is wrong. BLOCKED only when review is impossible.

6. **Return findings.** Use the return shape below. One block per target, in writer order.

### Return shape

```
## Review: <Target Title>

**Verdict:** APPROVED | NEEDS REVISION | NEEDS REWRITE | BLOCKED

### Punctuation Scan

<"clean" if no findings, otherwise list every em-dash, en-dash, or hyphen-as-punctuation span with fix direction>

### Findings by Category

#### brief mismatch
- <finding with what / why / fix direction>

#### invented or unverifiable fact
- <finding with what / why / fix direction>

#### helper-skill mismatch
- <finding with what / why / fix direction>

#### brand-rule violation
- <finding with what / why / fix direction>

#### formatting or length violation
- <finding with what / why / fix direction>

#### section bloat or structural overload
- <finding with what / why / fix direction>

#### language quality problem
- <finding with what / why / fix direction>

<omit any category that has zero findings>

### What's Working

<1-2 lines only, and only when it materially helps the operator judge the draft>

## Review: <Next Target Title>

...

## Blockers

- <target title>: <why this target could not be reviewed at all>
- (omit this heading entirely if no blockers)
```

### Posture rules

- Default to NEEDS REVISION. Earn APPROVED one target at a time.
- Punctuation violations are not minor. Every dash is a finding.
- The reviewer never edits. Direction only, not the rewritten line.
- BLOCKED is for a single target the reviewer cannot review. `## Blockers` at the end is for batch-level issues (no copy at all, packet malformed).
- One revision pass is the budget. After one revision, escalate to operator: subjective quality issues without concrete violations, brief/intent conflicts, or lingering placeholders.

### What the reviewer does not do

- Does not edit copy or apply fixes.
- Does not draft replacement sentences.
- Does not fetch copy from anywhere except the targets in scope.
- Does not skip lenses because earlier lenses found enough.
- Does not soften the punctuation scan. Every dash is a finding even when the surrounding copy is otherwise strong.

## Example

One short worked review showing one lens clear, one lens flagging. Placeholder brand name only.

### Setup

Target: `<missing info: campaign title>`. The writer just produced DESIGNED copy for a 3-section email: Hero Section, Product Spotlight, Discount Offer. The brief required those three sections in that order, named the product, and named a 15% off code with a confirmed expiration.

### The reviewer runs the lenses

**Lens 1 (instruction and brief alignment):** Hero, Product Spotlight, and Discount Offer are present in the right order. Product matches the brief. Offer code and expiration match the brief. Clear.

**Lens 4 (brand-rule and voice compliance):** The Hero Section opens with "Just dropped: the fall capsule is here." The dash after "dropped" is being used as punctuation (an aside), not as part of a compound word. This is a `brand-rule violation`. Fix direction: split into two sentences or replace the dash with a period.

(Lenses 2, 3, 5, 6 ran and returned clean in this example.)

### The reviewer's return

```
## Review: <missing info: campaign title>

**Verdict:** NEEDS REVISION

### Punctuation Scan

- Hero Section, line 1: "Just dropped: the fall capsule is here." The dash after "dropped" is hyphen-as-punctuation. Fix direction: split into two sentences ("Just dropped. The fall capsule is here.") or replace the dash with a period.

### Findings by Category

#### brand-rule violation
- Hero Section, line 1: hyphen-as-punctuation in opener. Fix direction as above.
```

The verdict is NEEDS REVISION, not APPROVED. The other five lenses cleared. The punctuation finding alone holds the verdict at NEEDS REVISION. The reviewer did not draft the replacement; it gave the writer a direction. The writer fixes the line and the next review cycle clears.

## What this document does not do

- It does not write copy. The writer's procedure lives in the campaign-copy procedure.
- It does not replace the brief format reference. The reviewer reads the brief to know what to compare against.
- It does not replace voice.md. The reviewer enforces the voice rules; it does not define them.
