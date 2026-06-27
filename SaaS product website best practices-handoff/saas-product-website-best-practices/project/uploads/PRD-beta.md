# PRD — Beta (save as CLAUDE.md later)

> **One-liner:** Helps solo ecom founders write and design on-brand marketing emails in minutes — without hiring an agency.

The point of this beta is restraint. We are proving **one** thing: *a solo founder will generate a campaign email, look at it, and say "I'd actually send this."* Everything that doesn't serve that test is cut.

---

## The single problem

A solo Shopify founder needs to send a campaign email (promo, launch, holiday) but isn't a writer or designer. Doing it themselves takes hours and looks amateur; an agency costs $2.5k–$8k/mo. So they under-send and leave money on the table.

**We solve exactly this:** paste your store, describe the email, get a finished on-brand email you can send. Nothing else.

## Target user (beta)

Solo founder-led DTC store, ~$10k–$80k/mo on Shopify, no marketing hire. Sole decision-maker. Cost-sensitive, time-starved, skeptical of "janky" AI output.

---

## The one core flow

This is the whole product. If a step isn't here, it's out of scope.

1. **Connect brand** — founder pastes their store URL. We auto-pull logo, colors, fonts, and a few products. (One time; saved.)
2. **Describe the email** — one short prompt + pick a campaign type (promo / launch / holiday / newsletter). Optionally pick a product to feature.
3. **Generate** — we produce a complete email: subject line + preview text + on-brand designed body (copy + layout together).
4. **Review & quick-edit** — inline edit text, swap a product, regenerate a section. Light touch only.
5. **Export** — copy HTML / "copy to clipboard" / download, to paste into their own ESP (Klaviyo, Shopify Email, Mailchimp).

**Success criterion:** founder reaches step 5 and exports an email they rate "would send" — measured by a one-tap thumbs-up at export and actual export events.

---

## Explicitly OUT of scope for beta

We cut all of this on purpose:

- No sending, list management, or deliverability (we are not an ESP).
- No direct ESP integrations / OAuth (export only — revisit post-beta).
- No automated flows (welcome, cart, post-purchase). **Campaigns only.**
- No SMS, no landing pages, no popups.
- No team seats, roles, or collaboration.
- No analytics/open-rate tracking (it's exported; we can't see it).
- No A/B testing, no scheduling, no calendar.
- No multi-brand / agency mode.
- No template marketplace or community.
- No mobile app (responsive web is enough).

If a feature request arrives during beta, the default answer is **no** unless it directly raises "would-send" rate.

---

## Rough data model

Minimal. Five entities.

- **User** — id, email, auth, plan, created_at.
- **Brand** — id, user_id, store_url, logo_url, color_palette[], fonts[], voice_notes, created_at. (One per user in beta.)
- **Product** — id, brand_id, title, image_url, price, url. (Pulled from store; cached.)
- **Email** — id, brand_id, campaign_type, prompt, subject, preview_text, body_html, status (draft/exported), would_send (bool, nullable), created_at.
- **GenerationEvent** — id, email_id, type (generate/regenerate/edit/export), created_at. (For measuring the funnel.)

That's enough to run the core flow and measure the success criterion.

---

## Screens (3)

1. **Connect / Brand setup** — paste store URL → preview of pulled logo, colors, products → confirm. (First run only; then skipped.)
2. **Create** — the generator. Prompt box + campaign-type selector + optional product picker + Generate button. This is the home screen on return.
3. **Email view** — generated email rendered full-width, with inline edit and a "regenerate section" control, and a primary **Export** button (with thumbs-up prompt on export).

No settings screen, no dashboard, no nav beyond these three for beta.

---

## Riskiest assumptions this beta must prove

Ordered by how badly they kill the product if false:

1. **Output clears the "pro" bar.** If generated emails look AI-made, nothing else matters. This is the #1 thing to watch — track the would-send rate, not vanity signups.
2. **It beats the free DIY combo.** Founders must find this faster/better than ChatGPT + Canva, or they won't pay. Watch time-to-export and whether they come back.
3. **The pain is worth a recurring subscription.** Low send-frequency is a real threat to a monthly plan. Watch repeat usage across weeks — if they generate once and vanish, rethink pricing (per-email / credits) before scaling.

If 1 and 2 hold in beta, build the ESP push and a welcome flow next. If they don't, fix output quality before adding anything.

---

## Pricing hypothesis (not built in beta, but the frame)

$29–$99/mo flat. Above a $10 Fiverr gig (signals it's real), far below $350+ ESPs and $2.5k+ agencies. Test willingness-to-pay during beta with a waitlist/pre-order, not by guessing.
