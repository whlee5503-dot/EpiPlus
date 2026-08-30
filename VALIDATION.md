# VALIDATION.md

## Module: Survey Sampling — Design Effect (Deff)

**Formula**: DEFF = 1 + (m − 1) × ICC
**Source**: Kish, L. (1965). *Survey Sampling*. Wiley.
Donner, A. & Klar, N. (2000). *Design and Analysis of Cluster
Randomization Trials in Health Research*.

### Test Case 1 — Health Knowledge (effective sample size)
- Source: https://www.healthknowledge.org.uk/public-health-textbook/research-methods/1a-epidemiology/clustered-data
- Input: 4 GP practices, avg cluster size m = 25, ICC (ρ) = 0.017, nominal n = 100
- Expected DEFF = 1.408
- Expected effective sample size ≈ 71
- Result: **PASS** (`src/lib/__tests__/designEffect.test.ts`)

### Test Case 2 — CASRAI (cluster-adjusted sample size)
- Source: https://casrai.org/guides/cluster-randomized-trials-icc-design-effect
- Input: individual-trial n = 400/arm, avg cluster size m = 50, ICC = 0.02
- Expected DEFF = 1.98
- Expected cluster-adjusted sample size ≈ 792/arm
- Result: **PASS** (`src/lib/__tests__/designEffect.test.ts`)

### Independent cross-check
Both test cases come from independent, non-affiliated sources (a UK public
health teaching resource and a clinical trials methodology guide), and both
reproduce the textbook formula (Kish 1965; Donner & Klar 2000) with matching
worked results. No OpenEpi equivalent exists for this calculator, so no
OpenEpi comparison is applicable.

| Function | Status |
|---|---|
| `calculateDesignEffect` | ✅ Validated |
| `calculateEffectiveSampleSize` | ✅ Validated |
| `calculateClusterAdjustedSampleSize` | ✅ Validated |
