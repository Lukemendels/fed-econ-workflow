ROLE: Regulatory-impact-analysis registry — standard analysis structure, benefit-cost conventions, discounting, and uncertainty treatment from public OMB guidance, with placeholders for your agency's acronyms and section conventions. Read before drafting or reviewing any RIA section.

# Regulatory Impact Analysis Knowledge Base

A reference registry for regulatory impact analysis (RIA) work, filled in with the public-domain methodology every federal economist already works from (OMB Circular A-4 concepts and standard practice). The `<<FILL>>` rows are where your agency's specific acronyms, section conventions, and current numeric guidance go — this file ships with the public parts filled in and the agency-specific parts marked.

## Analysis Structure Registry

| Section | Purpose | Standard content |
|---|---|---|
| Statement of need | Why regulatory action is warranted | Market failure, information gap, or statutory mandate the rule addresses |
| Baseline | The world absent this action | The "but-for" scenario — existing regulation, current trends, and expected changes with no new rule |
| Alternatives considered | The choice set | Including a no-action alternative and at least one meaningfully different design, not just stringency variants |
| Benefits | What the rule achieves | Monetized, quantified-but-not-monetized, and qualitative benefits, each tied to a causal mechanism from the rule to the outcome |
| Costs | What compliance requires | Direct compliance costs, and indirect/general-equilibrium effects where material |
| Net benefits summary | The bottom line | A summary table comparing alternatives on net benefits, not just total benefits or total costs alone |
| Uncertainty analysis | How confident the estimates are | See Uncertainty Treatment below |
| Distributional effects | Who bears costs, who gets benefits | By income group, geography, or affected sector, as required |
| Executive summary | The one-page version | Net benefits, key assumptions, and the recommended alternative, written for a non-economist reader |

**Your agency's section numbering / template:** `<<FILL: e.g., which section number each of the above maps to in your agency's standard RIA template>>`

## Benefit-Cost Conventions

| Concept | Standard convention |
|---|---|
| Value of a statistical life (VSL) | Sourced from the meta-analysis / study your agency's guidance specifies, income-adjusted and updated to current dollars — never inferred from a single study without checking current guidance |
| Cost of illness vs. willingness-to-pay | WTP is the preferred welfare measure for health benefits; cost-of-illness is a lower-bound proxy, used only when WTP estimates are unavailable, and labeled as such |
| Opportunity cost of time | Valued at a wage-based rate (with an adjustment for non-work time), not zero |
| Transfers vs. real resource costs | Transfers (e.g., a tax, fee, or fine) redistribute resources and are not, by themselves, a social cost or benefit — report them separately from real resource costs |
| Co-benefits | Benefits outside the primary regulatory objective (e.g., a health rule's co-benefits for ecosystems) are included only when they meet the same rigor bar as primary benefits, not added as a thumb on the scale |
| Break-even analysis | Used when benefits can't be fully monetized — shows what a benefit would need to be worth for net benefits to reach zero, letting the reader judge plausibility |

**Your agency's specific sourcing (VSL figure, wage series, inflation index in current use):** `<<FILL>>`

## Discounting

Public guidance on discount rates has changed twice in three years, and which vintage governs a given analysis depends on the analysis's submission date and which OMB circular it falls under — that instability is itself the argument for confirming rather than assuming. Timeline:

- **2003 Circular A-4 (original):** present benefits and costs at both 3% (reflecting the rate at which society is willing to trade off consumption across time) and 7% (reflecting the pre-tax return on private capital), reported side by side.
- **2023 Circular A-4 revision:** replaced the 3%/7% pair with a rate tied to long-term Treasury/TIPS real returns (materially lower), with sensitivity analysis at alternative rates.
- **January 2025 (OMB Memo M-25-15, under Executive Order 14192):** rescinded the 2023 Circular A-4 revision and reinstated the 2003 version — the 3%/7% approach is the guidance currently in force for RIAs.

This history is specific to Circular A-4 (regulatory impact analysis). Circular A-94 (benefit-cost analysis for federal programs, not regulations) was revised in 2023 and was **not** rescinded by M-25-15 — so the applicable discount-rate vintage can differ between an RIA and a program BCA done at the same agency at the same time.

Confirm the vintage your agency is currently instructed to use for the specific analysis type (RIA vs. program BCA) rather than assuming either convention by default.

**Your agency's currently-applied rate(s) and source:** `<<FILL>>`

## Uncertainty Treatment

| Approach | When to use |
|---|---|
| Qualitative discussion | Always, at minimum — describe what's uncertain and why, even alongside quantitative methods |
| Sensitivity analysis | Vary one assumption at a time (a key price, an elasticity, the discount rate) and report how net benefits change |
| Breakeven analysis | When a key benefit or cost can't be monetized — see above |
| Monte Carlo / probabilistic analysis | For rules where uncertainty is a first-order driver of the decision, and enough distributional information exists to support it — not a default for every rule |
| Expected-value characterization | State whether reported figures are point estimates, expected values over a distribution, or a specific scenario, and don't let the distinction blur across sections |

## Acronym Registry

| Acronym | Expansion | Notes |
|---|---|---|
| `<<FILL>>` | `<<FILL>>` | `<<FILL>>` |

## Anti-Patterns

| Anti-pattern | Why it's wrong | Correction |
|---|---|---|
| Double-counting | Counting the same effect as both a cost and a benefit (or twice as a benefit) under different labels | Trace every effect to one line in the summary table; if it appears twice, one is a restatement, not a separate effect |
| Wrong baseline | Comparing to current conditions instead of the projected but-for world | The baseline should reflect what would happen *without* this rule, including any already-scheduled regulatory changes |
| Misapplied discount rate | Using a private-capital rate for a rule with primarily consumption-side effects, or vice versa | Match the rate to what the guidance in force actually specifies for the effect being discounted |
| Transfers counted as social costs | Treating a compliance fee or tax as a net cost to society rather than a transfer | Report transfers separately from real resource costs; only the resources consumed in compliance are a social cost |
| Apples-to-oranges alternatives | Comparing a strong alternative's benefits to a weak alternative's costs | Present every alternative against the *same* baseline with the *same* metrics |
| Uncertainty as an afterthought | Adding a single sentence on uncertainty after the numbers are finalized | Build the uncertainty characterization into the analysis from the start — see Uncertainty Treatment above |

## Cross-references

- `disclosure-check` — run before any RIA draft using this registry leaves the building.
- `respond-to-program-office` — uses this registry's section names when locating where a comment was addressed.
