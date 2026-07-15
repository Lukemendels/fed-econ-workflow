---
name: disclosure-check
description: Pre-share audit of any artifact — a draft RIA section, a comment-response letter, a briefing memo, or a chat transcript — for agency-specific identifiers, unreleased figures, personnel names, and internal system references before it leaves the building. Reports findings as a severity table. Use before sending anything to a program office, OMB, the public docket, or an external partner, or when the user says "disclosure check", "can I send this out", "pre-share audit", or "is this clean".
allowed-tools: Read, Grep, Glob
effort: medium
---

# Disclosure Check

A pre-share audit for the everyday sensitivity of federal regulatory and program-analysis work: not classified material, but the SBU/CUI-tier content covered by [`controlled-information.md`](../../rules/controlled-information.md) — agency identifiers, unreleased numbers, and names that shouldn't leave the building yet. This is a **pre-screen, not a substitute** for your agency's official pre-decisional, records, or FOIA review — a PASS here means "ready for that review," not "cleared for release."

## When to use

- Before sending a draft RIA section, memo, or letter to a program office, OMB, or an external partner.
- Before posting anything to a public docket.
- Before pasting a document into an external chat tool, or handing a chat transcript to someone outside the agreed audience.
- As a standing habit before any "send" — cheap insurance against catching something after it's gone.

## What it scans for

1. **Agency-specific identifiers** — names beyond "your agency," program names, internal system or database names, office/division names, docket or case numbers not yet public.
2. **Unreleased figures** — dollar amounts, dates, headcounts, or statistics that are not yet cleared for public release, especially anything under an embargo or release lockup.
3. **Personnel names** — anyone identified by name, title-plus-context that identifies an individual, or personnel-action references.
4. **Internal system references** — file paths, network shares, internal tool names, credentials, or anything that describes agency IT infrastructure.

## Workflow

### Phase 1: Read the artifact

If working in Claude Code with an artifact on disk, read the file(s) directly. If working in chat with no filesystem, the user pastes the artifact's full text as the next message — the audit runs identically either way, just against pasted text instead of a file.

### Phase 2: Scan each of the four categories

Go through the artifact once per category above. For each hit, note its location (a file/line reference in Claude Code; a quoted excerpt or paragraph number in chat) and a short description of what was found — never repeat the sensitive value itself in the finding, describe it (e.g., "a dollar figure appears in paragraph 3" rather than quoting the figure).

### Phase 3: Classify each finding

| Severity | Meaning | Examples |
|---|---|---|
| **CRITICAL** | Blocks sharing until fixed. | A specific person's name; an internal system name; an unreleased number stated as fact; a program name that isn't yet public. |
| **WARNING** | Judgment call — flag for the author to confirm. | A generic role reference that might be identifying in a small office; a figure that may already be public but isn't cited as such; an acronym that could be agency-specific. |
| **OK** | Nothing found in this category. | — |

When two findings interact — e.g., a rough figure plus a specific quarter plus a small program name — flag the combination too; the aggregation risk in `controlled-information.md` applies here directly.

### Phase 4: Suggest remediation

For each CRITICAL or WARNING, propose the fix, in order of preference:

- **Replace** with a `<<FILL: description>>` placeholder (per the placeholder-discipline rules in `controlled-information.md` — describe the kind of value, don't smuggle the real one into the placeholder text).
- **Generalize** — "the agency" instead of a name, "a recent quarter" instead of a date, "program staff" instead of a named individual.
- **Cut** — if no remediation preserves both safety and meaning, remove the sentence.

Never auto-apply a fix — the author owns the disclosure decision; this skill only proposes.

### Phase 5: Gate

Any CRITICAL means: do not send, post, or paste this artifact until it's resolved and re-checked.

## Output format

```markdown
# Disclosure Check: [artifact name or description]

**Date:** [YYYY-MM-DD]

## Summary
| Severity | Count |
|---|---|
| CRITICAL | M |
| WARNING | W |
| OK | P |
| **Verdict** | **PASS / FAIL** (FAIL iff M > 0) |

## Findings
| Location | Category | Severity | What was found | Suggested fix |
|---|---|---|---|---|
| paragraph 2 | personnel name | CRITICAL | an individual is named by role and first name | replace with `<<FILL: staff role>>` |

## Next steps
1. Resolve every CRITICAL, then re-run.
2. Confirm every WARNING with the author's own judgment.
3. Only then route to your agency's official pre-decisional / records / FOIA review — this audit does not replace it.
```

## Cross-references

- [`controlled-information.md`](../../rules/controlled-information.md) — the standing protocol this skill pre-screens against: what never enters a prompt or repo, placeholder discipline, aggregation risk.

## What this skill does NOT do

- **It does not replace your agency's official review.** Records, FOIA, and pre-decisional-clearance officials make the authoritative call; this is a pre-screen so that review is more likely to go smoothly.
- **It does not catch everything.** A clean result is necessary, not sufficient — subtle aggregation risk across an entire conversation, not just one artifact, can still evade a single-document scan.
- **It does not decide what counts as sensitive** in a gray area. WARNINGs exist because that judgment belongs to the author and, ultimately, to agency policy.
