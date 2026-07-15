---
description: Always-on rule for handling sensitive-but-unclassified and Controlled Unclassified Information (CUI) in prompts, repos, and chat pastes, in effect for every task regardless of what file is open.
---

# Controlled-Information Protocol

**This rule is always on.** It is not scoped to a data folder or file type, because the risk it manages — sensitive-but-unclassified (SBU) and Controlled Unclassified Information (CUI) material leaking into a prompt, a commit, or a chat paste — can happen from any task, at any point in a session. Read it once per session if nothing else.

**Scope note:** this rule covers SBU/CUI-tier material — the everyday sensitivity of federal regulatory and program-analysis work. It does **not** cover classified national-security information. If a task touches classified material, stop immediately and route it through your agency's official classification-handling channels; no AI tool, this one included, is a substitute for that process.

---

## What never enters a prompt, a repo, or a chat paste

Treat all of the following as things that do not get typed, pasted, or committed, in any surface — Claude Code session, chat paste, commit message, or code comment:

- **Personally identifiable information (PII)** — names, SSNs, dates of birth, addresses, or any Privacy-Act-covered record tied to an individual.
- **Pre-decisional deliberative material** not yet cleared for release — draft policy positions, internal disagreements, or reasoning that would be withheld under a deliberative-process exemption if requested today.
- **Procurement-sensitive / source-selection information** — bid details, evaluator scores, competitor-identifying content during an open procurement.
- **Law-enforcement-sensitive or investigative material** — case details, targets, methods.
- **Confidential business information (CBI)** submitted by a regulated entity under a promise of confidentiality.
- **Embargoed statistics or unreleased figures** — anything under a release lockup, before the public release date and time.
- **Personnel information** — performance ratings, disciplinary actions, hiring deliberations, or anything that identifies a specific individual's role in a decision.
- **Internal system names, network details, or credentials** of any kind.

When a task needs to reference one of these, use a placeholder (below) instead of the real value.

## Placeholder discipline

Use `<<FILL: description>>` for anything agency-specific or sensitive that a real session would need filled in locally. Two rules make placeholders safe rather than merely decorative:

1. **Describe the *kind* of value, not its shape.** `<<FILL: agency name>>` is safe. `<<FILL: the $4.2M penalty amount for the pending enforcement action>>` is not — it leaks the sensitive number *into the placeholder itself*, which defeats the point. If you don't know a value, that's fine; if you know it, generalize the description before writing it down.
2. **Never fill a placeholder with real controlled data "just for this session."** A placeholder that gets temporarily filled with a real sensitive figure and then "restored" still passed that figure through the prompt and the model's context — the exposure already happened. Fill placeholders with realistic *dummy* values for testing, never with the real thing.

## Aggregation risk

Individually harmless facts can become sensitive in combination — the same mosaic effect that underlies statistical disclosure-avoidance thresholds (small-cell suppression, dominance rules) applies to prose, not just tables. A comment thread that names a small program, a rough headcount, and a specific quarter may re-identify something none of the three facts would reveal alone. When assembling a document or a chat session, look at what the *combination* of details across the whole artifact reveals, not just each sentence in isolation.

## When unsure, treat as controlled

Default to withholding, not disclosing. If it's unclear whether something is SBU, CUI, embargoed, or otherwise restricted, treat it as controlled and route the question to your agency's information-security, records, or FOIA office — not to this tool's judgment. A false positive costs a placeholder and a follow-up question. A false negative is a disclosure.

## This rule must stay generic

This file describes *how* to handle controlled information — it must never *contain* any. No real agency names, no real figures, no real program details, no illustrative "for example, at [agency] we..." anecdotes — only the categories and the discipline above, written so they hold for any federal economist at any agency. If a future edit to this file would only make sense with a specific agency's real example plugged in, that example belongs in a local, gitignored note — never in this rule.

## Cross-references

- [`disclosure-check`](../skills/disclosure-check/SKILL.md) — run this before any artifact leaves the building: a structured scan for agency identifiers, unreleased figures, and personnel references.
