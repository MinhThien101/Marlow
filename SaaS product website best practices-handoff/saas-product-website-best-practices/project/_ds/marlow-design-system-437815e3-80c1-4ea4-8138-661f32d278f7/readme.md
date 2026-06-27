# Marlow — Design System

> **Marlow is your brand's email studio.** It helps solo ecommerce founders write and design on-brand marketing emails in minutes — without hiring an agency. Paste your store, describe the email, get a finished on-brand email you'd actually send.

This repository is the Marlow design system: brand voice, visual foundations, design tokens, reusable React components, and high-fidelity UI kits of the product. Use it to produce on-brand interfaces, marketing pages, decks, and prototypes.

---

## Product context

Marlow is a beta product with one job: a solo founder generates a campaign email, looks at it, and says *"I'd actually send this."* Everything else is cut.

- **Target user:** solo founder-led DTC store, ~$10k–$80k/mo on Shopify, no marketing hire. Cost-sensitive, time-starved, skeptical of "janky" AI output.
- **The one core flow:** Connect brand (paste store URL) → Describe the email (prompt + campaign type) → Generate → Review & quick-edit → Export HTML to their ESP.
- **Three screens:** *Connect / Brand setup*, *Create* (the generator, home screen), *Email view* (review & export).
- **Out of scope (beta):** sending, ESP integrations, automated flows, SMS, analytics, A/B, scheduling, team seats, multi-brand. Campaigns only.

> **Note on sources:** No external codebase, Figma, or prior brand was provided — only the product PRD. The Marlow brand (name, mark, voice, palette, type) was created from scratch for this system. If a real brand kit, Figma, or codebase exists, attach it and this system should be reconciled against it.

---

## Brand idea

Most tools in this space feel like janky SaaS dashboards. Marlow is the opposite: it feels like a **boutique studio that happens to be software** — a calm, crafted, slightly editorial presence that makes a solo founder feel like they have a designer and a copywriter in their corner. The name is a person's name on purpose. The product earns trust by *looking* like the quality of work it promises to produce.

Three words: **crafted, confident, calm.**

---

## Content fundamentals

How Marlow writes. Copy is part of the product — it must model the quality the product produces.

- **Voice:** a sharp, warm creative director. Plain-spoken, never hypey. Speaks *to* the founder as a peer, not down to them. Confident enough to make decisions for you.
- **Person:** address the user as **"you"**; Marlow refers to itself as **"Marlow"** or occasionally **"we"** — never "I", never a chatbot persona.
- **Casing:** Sentence case everywhere — buttons, headings, menus. The only uppercase is the small tracked **eyebrow** label (e.g. `CAMPAIGN TYPE`). Never Title Case UI.
- **Length:** short. Buttons are 1–2 words ("Generate", "Export email"). Helper text is one line. Headlines are a phrase, not a sentence with a period.
- **Tone of verbs:** active and concrete — *Generate, Export, Swap product, Regenerate section, Connect store.* Avoid "Submit", "Click here", "Get started" (generic).
- **No fluff / no slop:** no exclamation marks in UI, no "Oops!", no "magic"/"AI-powered"/"supercharge"/"effortless" marketing-speak. Don't over-explain. One thousand no's for every yes.
- **Encouraging, not cheerful:** at success moments be quietly affirming ("Looks ready to send.") not bubbly ("Yay! 🎉").
- **Emoji:** not used in product UI. Permitted only *inside generated email content* if the founder's own brand voice calls for it — never in Marlow's own chrome.
- **The north-star phrase:** *"I'd actually send this."* Everything in the funnel ladders up to that one feeling.

**Examples**

| Context | ✅ Marlow | ❌ Not Marlow |
|---|---|---|
| Primary CTA | `Generate email` | `✨ Generate with AI` |
| Empty state | `Describe the email you want to send.` | `Let's create something amazing together!` |
| Export success | `Copied. Looks ready to send.` | `Success! Your email has been copied! 🎉` |
| Eyebrow | `CAMPAIGN TYPE` | `Select Your Campaign Type` |
| Error | `Couldn't reach that store. Check the URL.` | `Oops! Something went wrong.` |

---

## Visual foundations

The look: **warm paper, ink, and a single ember accent.** Editorial restraint. It should feel like good print — a well-set page, not a neon dashboard.

- **Color:** A warm near-monochrome built on cream paper (`--neutral-50` `#FBF8F2`) and warm ink (`--neutral-900` `#1C1815`), with **one** brand accent — **Ember** (`--ember-500` `#DD5530`), a terracotta-coral. Ember is used sparingly: primary actions, key emphasis, the mark. Status hues (green/amber/red/blue) are muted and warm, reserved strictly for feedback. Never introduce a new accent. No purple/blue tech gradients.
- **Type:** **Newsreader** (editorial serif) for display/headline moments and generated-email previews; **Hanken Grotesk** for all UI and body; **JetBrains Mono** for code, exported-HTML, and metadata (subject/preview-text, dimensions, counts). Headlines are set tight (`--tracking-tight`, `--leading-tight`) and often in serif; UI labels are sans, sentence case.
- **Spacing:** 4px base scale. Generous but not airy — content breathes inside cards with `--space-5`/`--space-6` padding. Layouts use a clear column with comfortable gutters, not edge-to-edge density.
- **Backgrounds:** flat warm paper. No photographic hero backgrounds, no mesh gradients, no noise textures by default. The richest background allowed is the inverse ink panel (`--surface-inverse`) for focus moments (e.g. a generation state). Occasional very subtle warm tint (`--neutral-100`) to separate sunken regions.
- **Corner radii:** moderate and consistent — controls `--radius-md` (10px), cards `--radius-lg`/`--radius-xl` (14–20px), pills/avatars full. Not sharp, not over-rounded.
- **Borders:** hairline warm borders (`--border-subtle`/`--border-default`) do most of the structural work — Marlow prefers a crisp 1px border to a heavy shadow. Focus uses an ember ring (`--ring`).
- **Shadows:** soft, low, warm-tinted (ink-based rgba, never pure black). Elevation is subtle (`--shadow-sm`→`--shadow-md`). One special token, `--shadow-ember`, gives the primary button a faint warm glow. Cards are border-first, shadow-second.
- **Cards:** white surface, hairline border, `--radius-lg`+, modest `--shadow-sm`. They look like clean paper cards, not glassy panels. No left-accent-border cards.
- **Transparency / blur:** minimal. A slight backdrop blur (`--blur-md`) is allowed only on overlays/dialog scrims. No frosted-glass everywhere.
- **Motion:** quick and confident. `--duration-base` 200ms, `--ease-out` for entrances, a touch of `--ease-spring` reserved for the "generate" reveal. Fades and short transl(4–8px) rises; minimal bounce. Reduced-motion respected.
- **Hover states:** surfaces shift to `--surface-hover` (a step-darker warm neutral); primary button darkens ember-500 → ember-600. Subtle, never a color flip.
- **Press states:** darken one more step (ember-700) and a 1px nudge / `scale(0.98)`. Quick.
- **Imagery vibe:** product imagery is the founder's *own* (logo, product photos) — Marlow's chrome stays neutral so brand colors can shine. Where Marlow shows imagery it's warm-toned, clean ecommerce product photography on paper backgrounds. No stock-photo gloss, no illustration mascots.

---

## Iconography

- **System:** [Lucide](https://lucide.dev) — clean, consistent 24×24 line icons at **1.75px stroke**, rounded caps/joins. This matches Marlow's crafted-but-modern feel. Loaded via CDN (`lucide@latest`) in cards and kits; in production use the `lucide-react` package.
- **Why Lucide:** humanist, friendly geometry; the rounded terminals echo the moderate radii of the UI without feeling childish. No filled icons in chrome — line only. Filled treatment is reserved for the single ember "spark" accent inside the logo mark.
- **Color:** icons inherit `currentColor` — `--text-muted` at rest, `--text-strong` or `--accent` when active/emphasized.
- **Size:** 16px (inline/dense), 18–20px (buttons), 24px (standalone). Stroke stays 1.75px; don't scale stroke with size.
- **Emoji:** never used as iconography in Marlow's chrome. (May appear inside *generated* email bodies if the founder's brand uses them.)
- **No hand-rolled SVG icons** beyond the brand mark — use Lucide so the set stays consistent.

> Substitution note: Lucide is a substitute icon library chosen to fit the brand (no icon set was supplied). Swap if a real Marlow icon set exists.

---

## Index / manifest

**Root**
- `styles.css` — global entry point (consumers link this). Imports-only.
- `readme.md` — this file.
- `SKILL.md` — Agent-Skill front matter for downloadable use.

**Tokens** (`tokens/`)
- `fonts.css` — `@import` of Newsreader / Hanken Grotesk / JetBrains Mono (Google Fonts).
- `colors.css` — ember + warm-neutral scales and semantic aliases.
- `typography.css` — families, weights, scale, leading, tracking.
- `spacing.css` — 4px space scale, radii, control heights, layout widths.
- `effects.css` — shadows, blur, motion easings/durations.

**Assets** (`assets/`)
- `logo-mark.svg` — ember tile mark (envelope + spark).
- `logo-wordmark.svg` — mark + "Marlow" lockup.

**Guidelines** (`guidelines/`) — foundation specimen cards for the Design System tab (Type, Colors, Spacing, Brand).

**Components** (`components/`) — reusable React primitives. Mount via `const { Name } = window.MarlowDesignSystem_437815`. Each has a `.prompt.md` with usage.
- `buttons/` — **Button** (primary/secondary/ghost/inverse/danger), **IconButton**.
- `forms/` — **Input**, **Textarea**, **Select**, **SegmentedControl** (campaign-type picker), **Switch**, **Checkbox**, **Radio**.
- `display/` — **Card**, **Badge**, **Tag**, **Avatar**.
- `feedback/` — **Spinner**, **Tooltip**, **Toast**, **Dialog**.
- `navigation/` — **Tabs**.

**UI kits** (`ui_kits/`)
- `marlow-app/` — the product, click-through: Connect, Create, Email view (compose the primitives above).

Run `check_design_system` after edits to see components, cards, tokens, and the exact `window.<Namespace>` for mounting components in card/kit HTML.
