ROLE: Generate a comment-response matrix from a program office's (or interagency reviewer's, or public commenter's) comment document and your revised draft. Maps every comment to its revision, classifies coverage (addressed / partially addressed / deferred / respectful disagreement), and flags anything unaddressed. Use when preparing a formal response to program-office, OMB/OIRA interagency, or public-comment review of a regulatory analysis or memo.

# Respond to Program Office

Produce a comment-response matrix — the standard federal deliverable for closing out review of a regulatory analysis — by cross-referencing a comment document against the revised draft it prompted. Classify every comment, draft a response for each, and flag anything unaddressed before the response goes back out.

## Inputs

- The **comment document** — a program office's markup, an interagency reviewer's comments, or public-comment feedback.
- The **revised draft** — your response to those comments.

Both should be readable as plain text. If either started as a Word document or PDF, convert it to plain text first; if no conversion tool is available, ask for a plain-text or markdown copy instead.

## Workflow

### Step 1: Parse the comment document

Decompose it into discrete, numbered comments — numbered lists, section-by-section markup, and comments embedded in prose paragraphs all count. For each, capture:

- **Comment ID** (e.g., `C1`, `C2`, or the reviewer's own numbering if they used one)
- **Priority**, if the reviewer assigned one (e.g., "must fix" vs. "suggestion")
- **Verbatim excerpt** (~25 words max)
- **One-line summary** in your own words

### Step 2: Locate each comment's resolution in the revised draft

For every comment: pull its key terms, search the revised draft for the corresponding change, and read the surrounding context to confirm the change actually addresses the concern (not just a nearby edit). Note the location — section, paragraph, or table/figure number.

### Step 3: Classify coverage

| Classification | Meaning |
|---|---|
| **Addressed** | The revision directly resolves the comment with a specific, pointable-to change. |
| **Partially addressed** | The revision moves in the requested direction but doesn't fully resolve it. |
| **Deferred** | No change was made on this point, but there's a defensible reason (out of scope, resource or statutory constraint, planned for a later phase) — the response states it. |
| **Respectful disagreement** | The analysis maintains its original approach and the response explains the reasoning, without dismissing the comment. |

If neither a revision nor a deliberate deferred/disagreement rationale can be found, mark it **UNADDRESSED — REQUIRES AUTHOR INPUT** and carry it into the flagged-items summary (Step 5).

### Step 4: Draft each response

3–6 sentences per comment: acknowledge the point, state the change (or the reason for not changing), point to its location in the revised draft, and justify briefly if the response diverges from what was asked. Tone: precise and courteous, institutional voice ("the analysis was revised to..."), never defensive, never editorializing about the reviewer.

### Step 5: Produce the comment-response matrix

```markdown
# Comment-Response Matrix: [document title]

**Reviewer:** [program office / interagency / public comment]
**Date:** [YYYY-MM-DD]

| ID | Priority | Summary | Classification | Response | Location |
|---|---|---|---|---|---|
| C1 | Must fix | [one-line summary] | Addressed | [2-4 sentence response] | Section 3, ¶2 |
| C2 | Suggestion | [one-line summary] | Deferred | [response with rationale] | (see response) |

## Unaddressed comments requiring author input
- C7: [summary] — no evidence of a revision or a deferred/disagreement rationale found

(If none: "All comments addressed or explicitly classified.")
```

The unaddressed-items summary is mandatory even when empty — it's the check that nothing slipped through.

## Chat mode (no filesystem)

The protocol is identical when there's no filesystem to read from — only Step 1's input changes:

1. Paste the comment document as one message, clearly labeled.
2. Paste the revised draft as the next message, clearly labeled.
3. Run Steps 1–5 exactly as above, using paragraph or section references (not page numbers) as the location, since pasted text has no pagination.

## Cross-references

- `ria-knowledge-base` — section names and conventions used when describing where a comment was addressed.
- `disclosure-check` — run before sending the finished matrix outside the agency; it screens for agency identifiers, personnel names, and unreleased figures the matrix might carry over from the draft.

## Verification

Before reporting the matrix complete:

1. Every comment has a classification — no orphans.
2. Every "Addressed" or "Partially addressed" entry cites a specific location.
3. The unaddressed-items summary was produced, even if empty.
4. The matrix table uses all six columns (ID, Priority, Summary, Classification, Response, Location).
