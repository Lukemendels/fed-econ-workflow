# fed-econ-workflow

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

A federal-economist adaptation of [pedrohcgs/claude-code-my-workflow](https://github.com/pedrohcgs/claude-code-my-workflow) (MIT). The upstream project is a full academic-research workflow for Claude Code — slides, papers, replication packages, and more. This repo takes **the knowledge layer of that workflow, adapted for federal regulatory and program/policy analysis, dual-built for Claude Code and enterprise chat.**

It does not port the academic-deliverable machinery (LaTeX/Beamer slides, Quarto, TikZ diagrams, journal-referee simulation). What it keeps is the part that generalizes: rules that state a standing policy, skills that describe a repeatable procedure, and templates that structure a deliverable. See [`docs/adaptation-guide.md`](docs/adaptation-guide.md) for the full account of what was and wasn't ported, and why.

## The two-surface concept

Every piece of guidance in this repo is written once and lives in two forms:

- **`.claude/`** — rules, skills, and agents for Claude Code. These use frontmatter, path-scoping, and cross-links between files, because Claude Code has a filesystem and a tool loop.
- **`chat/`** — auto-generated, paste-ready markdown built from the same source files. No frontmatter, no tool references, no file paths. Each file is self-contained so it can be carried by hand into an airgapped enterprise chatbot that has no internet access and no filesystem — you paste the whole file as the first message of a conversation and go.

`chat/` is a build output, not something you edit directly. Run:

```bash
node scripts/build-chat.mjs          # rebuild chat/ from .claude/ sources
node scripts/build-chat.mjs --check  # CI-style check: fails if chat/ is stale
```

## Hard constraints this repo follows

- **Zero agency-specific content.** No agency names beyond "your agency," no program names, no internal system names, no personnel references. Anywhere agency-specific material would go, you'll find a marked placeholder: `<<FILL: description>>`. If you need to jot down the real value locally, it goes in `local/` (gitignored, never committed) — never in a tracked file.
- **Public-domain regulatory content is in scope and encouraged** — OMB Circular A-4 concepts, standard VSL sourcing conventions, discount-rate guidance, RIA structure. None of that is agency-specific; it's the shared public methodology every federal economist already works from.
- **Less is more.** Files stay short and single-purpose, following upstream's own advice.

## Quick start (the 30-minute test: fork to first useful output)

1. **Fork and clone.**
   ```bash
   git clone https://github.com/YOUR_USERNAME/fed-econ-workflow.git
   cd fed-econ-workflow
   ```
2. **Fill in your agency's placeholders.** Open [`.claude/rules/ria-knowledge-base.md`](.claude/rules/ria-knowledge-base.md) and replace the `<<FILL: ...>>` placeholders with your agency's actual conventions (acronyms, section numbering, review routing). This is the only setup step — everything else works out of the box.
3. **Using Claude Code:** start `claude` in this directory and ask it to review a document against a rule, or invoke a skill (e.g. run the disclosure check or the program-office response mapping on a real draft).
4. **No Claude Code / airgapped chat only:** open the matching file under `chat/`, paste the whole thing as your first message, then paste your document. Each `chat/` file starts with a one-line `ROLE:` header telling the model what job it's doing.
5. **First real task:** point it at a draft RIA section or a program-office comment letter you're already working on. See [`docs/adaptation-guide.md`](docs/adaptation-guide.md) for how the pieces fit together.

## First hour

The five-step quick start gets you to a first output; this is the fuller version for the rest of the hour.

- **0–5 min: fork, clone.** As above.
- **5–15 min: fill in what today's task actually needs.** Open [`.claude/rules/ria-knowledge-base.md`](.claude/rules/ria-knowledge-base.md) and fill only the `<<FILL>>` rows your first task touches (e.g., the discount-rate vintage and VSL sourcing if you're drafting benefits/costs). You don't need every row filled on day one — leave the rest for whoever hits it next.
- **15–30 min: run a real skill on a real (low-stakes) document.** Pick something you're already working on — a comment letter you owe a response to, a draft RIA section — and run [`respond-to-program-office`](.claude/skills/respond-to-program-office/SKILL.md) or reference `ria-knowledge-base.md` while drafting. Confirm the output looks like the deliverable you'd normally produce by hand.
- **30–45 min: run `disclosure-check` before anything leaves your machine.** Before pasting a result into an email, an external chat tool, or a shared drive, run [`disclosure-check`](.claude/skills/disclosure-check/SKILL.md) on it. Treat any CRITICAL as a stop sign; confirm each WARNING yourself — see [`docs/adaptation-guide.md`](docs/adaptation-guide.md) for why this applies to the repo's own files too, not just your work product.
- **45–60 min: read the adaptation guide.** It covers the dividing line this repo uses to decide what's a rule vs. a skill, what was deliberately left out of the upstream port and why, and how to add your own rule or skill later without breaking the `chat/` build.

If you're chat-only (airgapped, no filesystem), the same hour works from `chat/` instead of `.claude/` — paste the whole matching file as your first message, then paste your own document.

## Repository layout

```
.claude/
  rules/    always-on or path-scoped policy (things Claude Code must respect)
  skills/   invocable procedures (things Claude Code can run on request)
  agents/   specialized subagents, if/when needed
chat/       auto-generated chat-portable builds of the same content — do not hand-edit
templates/  deliverable templates (specs, matrices, etc.)
docs/       adaptation notes and onboarding
scripts/
  build-chat.mjs   generates chat/ from .claude/ — see --check above
local/      gitignored — your agency-specific working notes; never committed
```

## License and attribution

MIT, same as upstream. This repo adapts patterns, structure, and in some cases near-verbatim templates from [pedrohcgs/claude-code-my-workflow](https://github.com/pedrohcgs/claude-code-my-workflow) by Pedro H. C. Sant'Anna. See [LICENSE](LICENSE).
