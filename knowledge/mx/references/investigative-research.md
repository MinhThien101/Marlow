# Investigative research

## Education

Think like a private investigator, not a search engine. Most searches fail because they ask "what does <brand> + <topic> say?" instead of "who would know, and where do they hang out?"

The brand site is rarely the richest voice source. A founder's old forum post often is. Community threads, third-party reviews, podcast interviews, and AMA transcripts carry real voice. Brand pages carry marketing veneer. Both matter; order matters.

Use a two-pass loop: discover wide, then verify deep.

- **Discover wide**: use multiple query shapes. One query is never enough. Run three or four before deciding the well is dry.
- **Verify deep**: fetch highest-signal pages directly when possible. Extract specifics with surrounding context. Never paraphrase from snippets when the source is accessible.

Lateral sourcing means triangulating independent sources. Two independent sources beat one loud source. One forum thread is a start, not an answer.

Fabrication is worse than admitting uncertainty. If you cannot verify a claim, output `missing info: <what is missing>`. A confident guess creates future corrections and credibility loss. A flagged gap costs a short conversation.

## Template

### Pre-search questions (answer privately before searching)

1. **Who is the primary human behind the brand?** Founder name. Co-founders if any. Does the founder write, or does a team write for them?
2. **What niche is the product in?** Use the real enthusiast category, not a generic bucket. "Diesel performance" beats "auto parts." "Raw-milk cheesemaking" beats "dairy."
3. **Where does that niche gather?** Enthusiast forums (by platform, by vehicle model, by hobby subdiscipline), subreddits, Facebook groups (often closed but posts leak), active YouTube comment sections, Discord servers, trade publications, regional communities.
4. **What third-party proof surfaces exist?** Trustpilot, ResellerRatings, Yelp, Google review snippets, BBB complaints, LinkedIn posts, podcast interviews.
5. **What has the founder posted publicly outside the brand site?** Forum post history, personal YouTube comments, AMA threads, trade-publication interviews, LinkedIn articles.

Also ask: what would I fabricate if I skipped research? Name those facts. Verify them first.

### Query shapes that work

Tune to the harness's search tool, but these shapes generalize:

- `"<founder first name>" "<brand>" forum` finds the founder's posting history.
- `site:<forum-domain> "<brand>"` narrows to one suspected forum.
- `"<brand>" review thread` finds organic community conversation.
- `"<product category>" forum best OR recommended` finds the active communities in the niche.
- `"<founder name>" interview OR podcast OR AMA` finds long-form voice samples.
- `site:reddit.com "<brand>"` checks subreddit presence.
- `"<brand>" facebook group` finds group names even when the group is closed.

Add freshness modifiers (last week/month/year) for in-season events. Add discussion-mode filters when you want sentiment, not landing pages.

Run three or four shapes before deciding nothing exists. Most "no results" are bad query shapes.

### Discover and verify are different jobs

Search discovers. Fetch verifies. They use different tools and outputs. Confusing them is the most common research quality loss.

- **Search (discover)** is broad and returns URLs plus snippets. Use it to find pages you do not already have. Cast wide. Run at least three or four query shapes before deciding nothing exists. Snippets are directional signals, not answers.
- **Fetch (verify)** is targeted and returns full page content. Use it on the two to four highest-signal URLs from search. Pull direct quotes with context. Pull specifics (price, ingredient, feature, return policy, shipping threshold, bundle contents, testimonial wording, discount code, offer expiration, launch date).

Never paraphrase from a search snippet when the page is accessible. Never cite a search snippet as a source.

If the harness has only one tool, use it and note the limitation in the deliverable's Placeholders section. If it has neither, ask the operator for material and proceed from that.

### Verification standards

For any factual claim in a brief, copy, or report:

- Pull two or three direct quotes with URL and surrounding context for each voice sample.
- Confirm with at least one independent third-party source for positioning claims, market claims, or "the brand says X" claims.
- Fetch (not snippet-paraphrase) the source page for any specific product detail: price, ingredient, feature, return policy, shipping threshold, bundle contents, discount code, offer expiration, launch date.

If you cannot confirm a claim to this bar, mark `missing info: <what is missing>` and surface it in the deliverable's Placeholders section. Do not hedge ("reportedly", "we believe", "likely"). Either it is verified or marked missing.

Minimum bar before locking direction: name three specifics about the subject (brand, founder, product, niche) that a generic take would miss. If you cannot, keep researching. If a reasonable second pass still fails, mark missing info and move on.

### Breadcrumb-saving discipline

Highest-leverage habit: save durable discoveries so the next pass (or operator) does not re-derive them.

When supported, append verified facts to active brand memory. With the markdown adapter, use `brand/<slug>/memories.md`. If files/memory are unavailable, put discoveries in the deliverable handoff so the operator can paste them.

Every breadcrumb includes source URL and verified date. A breadcrumb without citation is rumor.

What to save:

- Founder online presence with screen name, platform, posting frequency, stylistic tics.
- Community gathering spots with platform names and (where useful) subscriber or member counts.
- Voice-sample anchors: two or three exact quotes with URLs and a one-line pattern summary.
- Third-party framings: how customers and peers describe the brand in their own words.
- Niche-specific facts the profile would not cover: seasonal moments, rivalries, insider terminology, cultural references.

What NOT to save as a breadcrumb:

- Opinions and judgments (those are advisory output, not facts).
- Voice rules (those belong in `voice.md` after the voice-analysis procedure confirms them).
- Banned phrasings (those belong in `voice.md` or `profile.md`).
- Strategic recommendations.
- Speculative conclusions or anything you could not verify.
- Transient tactical notes ("for the May calendar we should...").

Before saving, check what already exists. If a similar memory is already on file, update it. One authoritative breadcrumb beats three overlapping ones.

### Anti-patterns

Most common failure modes. Each trades a real answer for a fake one.

- **Asking the operator for sources you can find.** "Do you have a forum link?" taxes the operator and signals you did not investigate. Look first. If the well is truly dry, say so after trying.
- **Stopping at the first plausible source.** One forum thread is a start. One review aggregator is a start. Cross-check.
- **Paraphrasing from search snippets.** Snippets can mislead, omit context, and truncate mid-clause. Fetch the page.
- **Treating the profile as canonical voice.** Profiles are often aspirational guidelines. Real voice is what the founder actually posts. Prefer real sources when available.
- **Saving breadcrumbs without citations.** A breadcrumb without URL is rumor. Rumor in `memories.md` becomes fabricated claim later.
- **Re-discovering what is already saved.** Read `memories.md` before searching. Use what exists. Update, do not duplicate.
- **Inventing when research is empty.** If the well is dry after a reasonable second pass, output `missing info`. A confident guess creates future corrections.
- **Treating brand-owned pages as the ceiling of what is knowable.** They are the floor. The richest signal is usually off-domain.

### When to stop

Two honest stop conditions:

1. **You have enough.** You can name three specifics about each subject that a generic take would miss, with citations. Lock direction and produce the deliverable.
2. **The well is dry after a real second pass.** You tried three or four query shapes, fetched highest-signal results, and specifics still are not there. Mark `missing info` for missing facts and surface them in Placeholders.

Do not stop because first pass was disappointing. First pass is discovery. Most signal comes from verification on pages you only found during discovery.

Do not hand the question back without trying. The operator asked for investigation; do the investigation.

## Example

A worked investigative loop, shape only, not real names:

**Pre-search.** I need founder voice and community framing for [BRAND]. The profile is thin. If I skip research, I would have to invent how the founder talks and how customers describe the brand.

**Discover.** Search `"[FOUNDER_NAME]" "[BRAND]" forum`, then `site:reddit.com "[BRAND]"`, then `"[PRODUCT_CATEGORY]" forum recommended`, then `"[FOUNDER_NAME]" interview OR podcast`. Find two enthusiast forum threads, one subreddit discussion, and one podcast appearance.

**Verify.** Fetch the two forum threads. Pull three founder quotes with URLs and surrounding context. Note the founder's screen name and posting pattern (terse, technical, admits uncertainty). Pull one community-framing quote that describes how customers actually talk about the brand. Fetch the podcast transcript or notes; pull one quote that confirms the same posture.

**Breadcrumb.** Append to `memories.md`:

- A "Founder voice anchor for [BRAND]" entry with the three quotes and source URLs, dated today, with a one-line pattern summary.
- A "[BRAND] community presence" entry naming the forum and subreddit with URLs and membership counts where visible.
- A "[BRAND] community framing" entry with the customer-language quote and its URL.

**Return.** The deliverable that prompted the research (a brief, a voice analysis, a calendar) is now grounded in real voice samples and real community language instead of profile template tone. The next pass starts from the breadcrumbs instead of re-discovering them.

## Return behavior

This procedure does not change the deliverable's shape. It changes the quality of what fills it and what gets left behind in `memories.md` for the next pass.

Two markers tell you the research was real:

1. **The deliverable cites sources.** A claim about positioning, founder voice, community framing, or any other externally verifiable fact carries a URL. The next reader can confirm.
2. **`memories.md` has new entries with citations.** The next pass starts from real evidence, not from re-derivation. Operators notice when the second time they ask about a brand, the agent already knows things it learned the first time.

Two markers tell you the research was shallow:

1. **Hedging language ("reportedly", "likely", "we believe") in place of either a citation or missing info.** Hedge language is fabrication with plausible deniability. Replace with a citation or mark the claim as missing info.
2. **No new breadcrumbs in `memories.md`.** Either the brand state was already rich (rare in practice) or you did not save what you found. The second case loses the value of the research for every future pass.
