# Adaptation Guide

How this repo relates to [pedrohcgs/claude-code-my-workflow](https://github.com/pedrohcgs/claude-code-my-workflow), what was deliberately left behind, and how to extend what remains without breaking the dual build.

## The dividing line: files that say things vs. files that do things

Upstream's `.claude/` mixes two kinds of content, and the line between them is what survived the adaptation:

- **Files that say things** — a standing policy (`controlled-information.md`) or a reference registry (`ria-knowledge-base.md`). These are read, not run. They constrain or inform whatever task is in front of the model.
- **Files that do things** — an invocable procedure with a workflow, inputs, and an output format (`disclosure-check`, `respond-to-program-office`). These are triggered by a request and produce a specific deliverable.

Everything in this repo is one or the other, on purpose. The line matters because it's also the boundary of what can be dual-built: a policy or a registry translates directly into a paste-ready chat file — it's prose either way. A procedure translates too, as long as it's written as a sequence of steps a reader can follow by hand, not as a series of tool calls only Claude Code can make. That constraint shaped every file here: `disclosure-check` and `respond-to-program-office` both read as a checklist a person could execute with a highlighter, not just as Claude Code instructions.

What doesn't survive this line: anything that only makes sense as automation — a git hook, a CI gate, a subagent-orchestration protocol. Those aren't "content" in the sense this repo deals in; they're runtime behavior with no chat-mode equivalent, since chat mode has no process to hook into. That's a deliberate scope boundary, not an oversight — see the next section.

## What was deliberately not ported, and why

Upstream is a full academic-research workflow — lecture slides, papers, replication packages, journal-submission simulation. Most of that machinery doesn't survive the adaptation, for one recurring reason: **deliverable mismatch**. A federal economist's actual output — an RIA section, a comment-response letter, a briefing memo — doesn't require any of it.

- **LaTeX/Beamer/TikZ/Quarto layer** (`compile-latex`, `translate-to-quarto`, `extract-tikz`, the `tikz-*` rules, `slide-excellence`, `quarto-critic`) — built around a specific document-production toolchain (XeLaTeX, Quarto rendering, TikZ diagram compilation) that produces lecture slides and typeset papers. Federal deliverables are Word documents, PDFs, and memos; porting a LaTeX pipeline would mean maintaining infrastructure nobody in this audience uses.
- **R/Stata replication and simulation infrastructure** (`audit-reproducibility`, `capture-environment`, `stata-replication`, `r-package-*`, `simulation-study`, `power-analysis`, `did-event-study`) — built around academic replication-package norms (openICPSR, the AEA Data Editor's checklist) and a specific statistical-software stack. Federal RIA work has its own numeric-verification needs, but they don't map onto that norm set, and picking a stack here would contradict the "knowledge layer, not tooling layer" scope.
- **Journal-submission simulation** (the `editor`, `methods-referee`, `domain-referee` agents, `journal-profiles.md`) — models a peer-review process with no federal analogue. `respond-to-program-office` replaces it with the deliverable federal review actually produces: a comment-response matrix, not a referee report.
- **Orchestration runtime** (`orchestrator-protocol`, the `claim-verifier` subagent, the CoVe hallucination gate, `promote-memory-council`) — heavyweight multi-agent machinery sized for a large, sustained academic writing project. Out of scope for a lean, dual-built knowledge layer, and explicitly excluded by this build's own instructions: no additional agents beyond what a step specifies.
- **Teaching skills** (`create-lecture`, `syllabus`, `teach-from-paper`, `scaffold-exercises`, `pedagogy-review`) — not a federal economist's job function.
- **Hooks** (`git-guardrails`, `pre-compact`, `context-monitor`, `notify.sh`) — Claude-Code-runtime automation with no chat-mode equivalent at all; chat mode has no process for a hook to attach to. Automated enforcement is a reasonable future addition to the `.claude/` side only, but breadth comes after the current set survives first contact with real work, not before.

## How to add a new rule or skill

1. **Decide which side of the dividing line it's on.** A standing policy or reference table goes in `.claude/rules/`. An invocable, step-by-step procedure goes in `.claude/skills/<name>/SKILL.md`.
2. **Write the frontmatter as single-line `key: value` pairs only.** `scripts/build-chat.mjs`'s frontmatter parser is intentionally minimal — it splits on the first `---`/`---` block and reads simple one-line fields. YAML block scalars (`description: >` or `description: |`), multi-line values, and nested structures will not parse correctly. If a description needs to be long, write it as one long line, not a folded block.
3. **Write the `description` field as a complete, standalone sentence.** It becomes the chat build's `ROLE:` header — for a chat-mode user, it's the entire context they get before the body text starts. Assume they'll read nothing else first.
4. **Reference other files only as a markdown link or a backticked path**, e.g. `` [`disclosure-check`](../skills/disclosure-check/SKILL.md) ``. The build script only rewrites those two patterns into plain inline text; a bare path typed as plain prose won't be caught and will leak into the chat build as a dead reference.
5. **Never use slash-command syntax** (`/skill-name`) to refer to another skill in body prose — write the name in plain text instead. `build-chat.mjs --check` mechanically fails the build if it finds a known skill or rule slug preceded by `/`, so this isn't just a style preference; it's an enforced gate.
6. **Keep it zero agency-specific.** Anything agency-specific is a `<<FILL: description of the kind of value>>` placeholder — never a real name, figure, or program detail, including inside illustrative examples (see the story below).
7. **Stay under ~150 lines** unless there's a specific reason to run longer, and say what that reason is when you report the change.
8. **Build and check.** Run `node scripts/build-chat.mjs`, then `node scripts/build-chat.mjs --check`, then actually read the generated `chat/<name>.md` file with no other context in mind — confirm it makes sense on its own.
9. **Run `disclosure-check` against the new file** before committing it, using the same audit this repo runs against itself (next section).

## Why disclosure-check runs against the repo itself: the "30-minute test" story

During Step 0, the README's quick-start section named its walkthrough "the Jay test" — an informal nickname for a hypothetical first-time forker, meant purely as a memorable stand-in for "a PhD economist trying this for the first time." It was never a real agency employee. It still shouldn't have shipped: `controlled-information.md`'s own list of what never enters a repo includes personnel references, and a name-shaped reference in a README is exactly that category, regardless of whether the person behind it is real, fictional, or just a placeholder for "the user." The rule doesn't have an exception for "but it's not really personnel information" — the whole point of the discipline is not to have to litigate that in the moment.

It shipped in the first commit and sat there through Step 0's own review checklist, which checked the build mechanism, the license, and the directory layout — not the prose for a stray name. It was caught in the *next* step's review, by a human reading the file, not by any automated scan; `disclosure-check` existed by then but nobody had pointed it at the repo's own documentation, only at the idea of RIA drafts and comment letters. The fix was a one-line rename to "the 30-minute test."

That's the argument for the Step 3 verification below: `disclosure-check` is written to audit "any artifact," and a repo's own README, rules, and skills are artifacts too. The categories it screens for — agency identifiers, personnel names, unreleased figures, internal system references — apply to a file that talks *about* federal work exactly as much as they apply to a file that reports the results *of* federal work. Skipping the self-check because "this is just documentation" is precisely the gap the incident above fell through.
