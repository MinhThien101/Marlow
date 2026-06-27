# Output format

## Education

Output must fit the runtime.

Use the destination the user names: chat, markdown file, Google Doc, note, CMS draft, project doc, or any harness-native target. If none is named, read `user.md`. If no preference exists:

- If a brand context location exists, write there (organized by type per the root SKILL.md branch table).
- If no durable location exists, deliver in chat first, then optionally ask once about saving future artifacts to a durable destination (Claude Project or connector).

Connector-aware prompt (use when helpful and not configured):

> Keep this in chat only, or save future artifacts to a project/connector (Notion, Drive, ClickUp, etc.)?

Never overwrite durable state silently.

Markdown is the fallback, not the product. Canonical artifact shapes live in their owning references:

- Campaign briefs: `briefs/brief-format.md`
- Campaign calendars: `methods/calendar-format.md`
- Flow plans and node briefs: `flows/flow-*.md` plus `briefs/brief-format.md`
- Copy review: `methods/copy-review-checklist.md`
- Voice analysis: `methods/voice-analysis-method.md`
- Brand context: `brand-context-schema.md`

## Universal Rules

- ASCII punctuation only. No em-dash (U+2014), en-dash (U+2013), or curly quotes. Hyphens in compound words are fine.
- For unverifiable required facts, state exactly what is missing. Never use guesses, `N/A`, or `TBD`.
- Missing-info notes are for facts, not writing tasks. Do not write "missing: write a great hero"; write the hero.
- Keep required handoff metadata outside the artifact when the destination supports comments or notes. If not, add a short `## Placeholders` or `## Handoff` section at the end.
- In user-facing prose around the artifact, call placeholders "missing info" in plain English.

## Destination Decision

| Situation | Output behavior |
|---|---|
| User names a destination | Use that destination if the harness can access it. |
| `user.md` names a destination | Use it unless the current request overrides it. |
| Brand-specific artifact and no preference exists, but brand context location is known | Write to the same brand-context location, organized by type per the branch table. Tell the user where it is going. |
| Brand-specific artifact and no preference exists, and no brand context location is known | Deliver in chat first. Optionally ask once about a durable save destination for future sessions. |
| No durable destination is available | Return the full artifact in chat and include a compact handoff. |
| Destination supports comments or metadata | Put unresolved facts, review notes, and source notes there when appropriate. |
| Destination is plain markdown/chat | Include only the artifact plus a short handoff block when needed. |

## Handoff Shape

Use a handoff only when it adds operational value:

```
## Handoff

- Destination: <chat | file | doc | note | other>
- Placeholders: <none | list missing facts>
- Review status: <approved | needs user decision | blocked>
- Suggested next action: <plain-language user command, only if useful>
```

Do not add preamble before a clean artifact. Do not narrate tool use. Do not explain the skill system to the user.
