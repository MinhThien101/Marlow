# report

This procedure inherits the root `SKILL.md` contract: resolve managed brand context first, clearly flag missing facts, load only needed references, deliver to the requested destination or chat, and capture durable brand learnings as proposed updates to profile, voice, products, or memories only.


Load this procedure when the user asks an open-scope DTC question: research a topic, compare brands, scan competitors, run a market read, build a performance report, or tear down a brand the user does not own. Produce open-scope research and analysis. Do not produce briefs, copy, or calendars. Do not silently modify brand context. Deliver a structured answer to requested destination, or chat if none is named.

## Capability surface

- Research questions on any DTC email/SMS topic.
- Competitor scans and side-by-side comparisons.
- Market reads on a category, channel, or tactic.
- Performance reports built from user-supplied numbers.
- Brand teardowns of brands the user does not own.
- Exploratory analyses that do not slot into a named purpose.

## When to use this vs. a named purpose

| Ask | Use |
|---|---|
| "Compare three competitors' pop-ups" | this procedure |
| "Research the cold-plunge category" | this procedure |
| "Analyze a brand we do not own" | this procedure |
| "Monthly performance report from ESP numbers" | this procedure |
| "Build a profile for a new client" | `procedures/brand-research.md` |
| "Update voice rules from recent sends" | `procedures/voice-analysis.md` |
| "Plan next month's calendar" | `procedures/calendar-builder.md` |
| "Brief the Black Friday email" | `procedures/campaign-brief.md` |

If the artifact fits an existing named purpose, route there. This procedure is for open-scope asks.

## Workflow

### 1. Read the ask

Pick the shape that serves the answer. A comparison uses a table. A market read uses themed sections. A factual lookup uses a short summary with sources. A performance report includes period, numbers, wins, and next steps.

If ask is ambiguous between reasonable readings, pick the best match to user intent and state it in one line at top of answer. Do not stall.

### 2. Decide whether brand context is needed

Most external-topic reports (competitor scans, market reads, category research) do not need brand context. Skip it. If research creates durable knowledge about a brand user may revisit, offer to manage that brand and route to `procedures/brand-research.md`.

Load brand context only when ask is about the user's brand: "audit our recent sends", "build our monthly report", "how does our positioning compare to X". Multi-brand layouts require user-provided brand identifier or clearly named context source before loading.

### 3. Research

Follow `references/investigative-research.md`. Discover wide, verify deep. Use a two-pass loop. Try three or four query shapes before deciding the well is dry. Retrieve highest-signal pages directly when harness access exists. Never rely on snippets when sources are accessible.

If runtime has no web tools, ask user to paste source material and proceed from that. Mark anything still unverifiable as missing info.

For performance reports, data is the source. Never invent revenue, attribution, deliverability, campaign names, growth comparisons, or subscriber figures. If required numbers are missing, list exact missing inputs and stop before writing report.

### 4. Synthesize

Pick the output shape that fits. The default when uncertain:

```
# <Title>

## Summary

<2 to 4 sentences directly answering the core ask.>

## Details

<Sections, lists, or tables organized by what the ask needs.>

## Sources

- <URL or source>: <what it contributed>

## Placeholders

<Only if any specific facts could not be verified. Mark each as missing info and name what is missing.>
```

Adjust freely. A comparison uses a table. A recommendation leads with rationale. A factual lookup skips Details. A multi-phase plan uses numbered phases. Format serves answer, not the reverse.

### 5. Output

Deliver to user-requested destination. If none is named and report is brand-specific, read `user.md`; if no preference exists, write to **the same location holding this brand's context**, sub-organized by type per root SKILL.md branch table (Branch A Project: same project, `YYYY-MM-DD-title-report.md`; Branch A connector: `<connector>/MX/brand/<slug>/reports/`; Branch B: `brand/<slug>/reports/YYYY-MM-DD-title.md`). Tell user where it went. For non-brand or unwritable contexts, print full deliverable to chat. Never overwrite durable state silently.

## Hard prohibitions

- Do not pad with generic marketing advice when the user wants a specific answer.
- Do not refuse a broad ask. Break it down, gather context, return the best honest answer you can.
- Do not silently modify brand context. This procedure reads brand state when relevant. When a report surfaces durable brand facts, propose updates to profile, voice, products, or memories instead of creating new docs.
- Do not produce briefs, copy, calendars, or voice rules. Route to the named purpose instead.
- Do not invent products, URLs, claims, prices, codes, metrics, policies, testimonials, offer terms, launch dates, founder bios, revenue, or attribution. Mark missing facts inline and surface them in the missing-info section.
- Do not use hedge language ("reportedly", "likely", "we believe"). It is fabrication with plausible deniability. Replace with a citation or a clear missing-info note.
- Do not write a performance report when required numbers are missing. List the exact missing inputs and stop.
- Do not auto-write files or documents. Deliver in chat unless the user named a destination or accepted one.
- Do not continue into a named purpose unless user asks or next step is clearly part of requested workflow.
- Do not return preamble, tool narration, or "here is what I found". The return message IS the deliverable.
- ASCII only. No em-dash, no en-dash, no curly quotes.

## Conflict rules

When sources disagree, resolve in this order:

1. User-confirmed facts in the current request.
2. User's own data (ESP exports, internal numbers) for reports about the user's brand.
3. Verified facts from primary sources (founder posts, brand-owned pages, official filings).
4. Verified facts from reputable third parties (trade press, established review sites).
5. Community framings and forum threads.
6. Strategic judgment.

A clearly flagged missing fact outranks a guess at any level.

## Handoff

Finish by naming the artifact (report, comparison, or analysis). If work surfaces a follow-up that fits a named purpose, suggest it or continue when user asked for that larger workflow.
