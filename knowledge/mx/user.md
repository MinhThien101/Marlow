# User Preferences

Durable MX preferences. Writable in file-writable harnesses (Codex, Cursor, Hermes, etc.) - keep it up to date when the user states a preference. Read-only under Claude (claude.ai): treat anything here as skill-author defaults; durable user choices under Claude live in Claude persistent memory instead.

By default, work artifacts go to the same location holding each brand's context. Only set destinations below if you want to override that.

Examples (Branch B / markdown-adapter shape - Claude Project users do not need these):

- Default brand context location:
- Default calendar destination: `brand/<slug>/calendar/YYYY-MM-DD-title.md`
- Default brief destination: `brand/<slug>/briefs/YYYY-MM-DD-title.md`
- Default copy destination: `brand/<slug>/copy/YYYY-MM-DD-title.md`
- Default flow destination: `brand/<slug>/flows/YYYY-MM-DD-title.md`
- Default report destination: `brand/<slug>/reports/YYYY-MM-DD-title.md`
- Brand-specific destinations:
