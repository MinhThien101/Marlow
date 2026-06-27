# Calendar format

A calendar is a lineup of campaigns with dates, types, and one-sentence descriptions. It is not a brief document. Each campaign gets one level-two heading and one sentence of intent. Do not turn entries into briefs.

The fields below are the only calendar fields. Order is fixed.

## Template

```
# <Month> <Year> Calendar | <Brand Name>

## Scope Summary

- Planning period: <period>
- Confirmed volume: <email count> email, <sms count> SMS
- Mode: <new or update>
- Existing calendar: <title or "none">

## <Month, DayOrdinal Year> | <Campaign Title> | <Designed | Text Based | SMS> | <Brand Name>

<One sentence describing the campaign's intent. Not a brief. Not a plan.>

## <Month, DayOrdinal Year> | <Next Campaign Title> | <Designed | Text Based | SMS> | <Brand Name>

<One sentence.>

## Fixed Anchors

- <launch, sale, event, or holiday>: <date or missing info: confirm date>

## Placeholders Needing User Input

<include only if any campaign or anchor carries missing info; list each one with the campaign or anchor it belongs to>

## Top-Level Blockers

<include only when the planning period itself cannot be determined; otherwise omit>
```

### Field rules

- The document title and the first in-document heading match exactly.
- One level-two heading per campaign, in the form `## <Month, DayOrdinal Year> | <Campaign Title> | <Designed | Text Based | SMS> | <Brand Name>`.
- Use friendly date format for each campaign entry date, for example `April, 14th 2026`. If unknown, write `missing info: confirm date` in the date slot.
- One sentence under each campaign heading. No bullets, no section plans, no copy suggestions, no rationale.
- Offer handling: write `No offer` when none exists, state known terms concisely, mark unknowns as `missing info: confirm offer terms`. Never invent offer language.
- Per-field gaps are placeholders, not blockers. Use `## Top-Level Blockers` only when the planning period itself is unknown.
- ASCII punctuation only. No em-dash, no en-dash, no curly quotes.

### Hard prohibitions

Never include in a calendar unless the user explicitly asks:

- rationale for campaign choices
- strategic explanations
- voice or tone guidance
- copy suggestions or sample lines
- section plans
- full briefs

## Example

```
# <missing info: month> <missing info: year> Calendar | <missing info: brand name>

## Scope Summary

- Planning period: <missing info: full month dates>
- Confirmed volume: <missing info: number> email, <missing info: number> SMS
- Mode: new
- Existing calendar: none

## <missing info: confirm date> | <missing info: campaign title 1> | Designed | <missing info: brand name>

<missing info: one sentence describing this send's intent.>

## <missing info: confirm date> | <missing info: campaign title 2> | Text Based | <missing info: brand name>

<missing info: one sentence describing this send's intent.>

## <missing info: confirm date> | <missing info: campaign title 3> | SMS | <missing info: brand name>

<missing info: one sentence describing this send's intent.>

## <missing info: confirm date> | <missing info: campaign title 4> | Designed | <missing info: brand name>

<missing info: one sentence describing this send's intent.>

## Fixed Anchors

- <missing info: anchor event 1>: <missing info: date>
- <missing info: anchor event 2>: missing info: confirm date

## Placeholders Needing User Input

- <missing info: campaign title 2>: missing info: confirm offer terms
- Fixed anchor: <missing info: anchor event 2> date
```
