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

## Module: Survey Sampling — Cluster Sample Size

**Formula**: n_cluster = n_srs × DEFF; clusters = ceil(n_cluster / m)
**Source**: Kish, L. (1965). *Survey Sampling*. Wiley.
Lemeshow, S. et al. (1990). *Adequacy of Sample Size in Health Studies*. WHO/Wiley.

### Test Case 1 — extends the CASRAI worked example
- Input: n_srs = 400, m = 50, ICC = 0.02 (same inputs as the already-validated
  Design Effect CASRAI case above)
- Expected DEFF = 1.98, cluster-adjusted n = 792 (already validated)
- New quantity: number of clusters = ceil(792 / 50) = 16; actual sample = 16 × 50 = 800
- Result: **PASS** (`src/lib/__tests__/clusterSampleSize.test.ts`) — the number-of-clusters
  step is plain ceiling division on an already-validated adjusted sample size, so it is
  verified by direct arithmetic rather than an external source.

### Test Case 2 — extends the Health Knowledge worked example
- Input: n_srs = 100, m = 25, ICC = 0.017
- Expected DEFF = 1.408, cluster-adjusted n = 141, clusters = ceil(141/25) = 6, actual n = 150
- Result: **PASS** (`src/lib/__tests__/clusterSampleSize.test.ts`)

| Function | Status |
|---|---|
| `calculateClusterSampleSize` | ✅ Validated |

## Module: Survey Sampling — Stratified Sample Size (Allocation)

**Formula**:
- Equal: n_h = n / L
- Proportional: n_h = n × (N_h / N)
- Neyman (optimum): n_h = n × (N_h·S_h) / Σ(N_h·S_h)

**Source**: Cochran, W. G. (1977). *Sampling Techniques*, 3rd ed. Wiley, Ch. 5.
Neyman, J. (1934). *J. Royal Statistical Society* 97(4): 558–625.
Formula independently corroborated against Wikipedia ("Neyman allocation"),
the Sage *Encyclopedia of Survey Research Methods* entry on Neyman allocation,
and ScienceDirect's "Proportional Allocation" topic overview — all three give
the identical n_h = n·N_h·S_h / Σ(N_h·S_h) expression.

### Test Case — hand-verifiable 3-stratum example
- Input: N_h = 1,000 / 2,000 / 3,000 (N = 6,000), S_h = 5 / 10 / 15, n = 100
- Proportional: 100×1000/6000=16.67→17; 100×2000/6000=33.33→33; 100×3000/6000=50→50 (sum 100)
- Equal: 100/3 = 33.33 → 33 for each (sum 99; rounding discrepancy is expected and
  is surfaced in the UI as `allocatedTotalNote`)
- Neyman: weights N_h·S_h = 5,000 / 20,000 / 45,000 (Σ=70,000);
  100×5000/70000=7.14→7; 100×20000/70000=28.57→29; 100×45000/70000=64.29→64 (sum 100)
- Additional check: when all S_h are equal, Neyman allocation reduces algebraically to
  proportional allocation — verified to give identical per-stratum results.
- Result: **PASS** (`src/lib/__tests__/stratifiedSampleSize.test.ts`) — all figures are
  hand-computable from the formula and independently confirmed by re-deriving them above.

| Function | Status |
|---|---|
| `calculateStratifiedSampleSize` | ✅ Validated |

## Module: Population Burden Indicators — DALY (YLL + YLD)

**Formula**: DALY = YLL + YLD; YLL = n × L1; YLD (incidence) = I × DW × L2;
YLD (prevalence) = P × DW
**Source**: Murray, C.J.L. & Lopez, A.D. (1996). *The Global Burden of Disease*.
WHO/World Bank/Harvard. WHO (2020). *GHE 2019 DALY methods* technical paper.
Undiscounted, no age-weighting — consistent with GBD 2010+ methodology
(age weights and discounting were dropped from the GBD study).

### Test Case 1 — ScienceInsights worked example (YLL)
- Source: scienceinsights.org, "How to Calculate DALYs: YLL, YLD, and Worked Examples"
- Input: 50 deaths, average age at death 60, reference life expectancy at 60 = 20 years
- Expected YLL = 50 × 20 = 1,000
- Result: **PASS** (`src/lib/__tests__/daly.test.ts`)

### Test Case 2 — ScienceInsights grouped YLL example
- Same source: "If 100 people die at age 50 and the reference life expectancy at 50
  is 33 years, that group contributes 3,300 YLLs."
- Expected YLL = 100 × 33 = 3,300
- Result: **PASS**

### Test Case 3 — ScienceInsights prevalence-based YLD example
- Same source: 2,000 prevalent cases, disability weight 0.15
- Expected YLD = 2,000 × 0.15 = 300
- Result: **PASS**

### Test Case 4 — full combined worked example
- Combining Test Cases 1 and 3 (both from the same source, describing one scenario):
  YLL 1,000 + YLD 300 = **DALY 1,300**, matching the source's own combined total.
- Result: **PASS**

### Test Case 5 — hand-verified incidence-based YLD
- Input: 10 incident cases, disability weight 0.5, average duration 4 years
- Expected YLD = 10 × 0.5 × 4 = 20
- Result: **PASS** — the incidence-based formula is a direct three-term product,
  verified by hand arithmetic (no external worked example needed for this
  variant, since Test Cases 1-4 already validate the underlying formula
  structure against an independent source).

| Function | Status |
|---|---|
| `calculateDaly` | ✅ Validated |

## Module: Population Burden Indicators — PAF (Population Attributable Fraction)

**Formula**: Levin's formula, PAF = Pe(RR - 1) / [1 + Pe(RR - 1)]
**Source**: Levin, M.L. (1953). *The occurrence of lung cancer in man*.
Acta Unio Int Contra Cancrum, 9(3): 531-541.

### Test Case 1 — MetricGate worked example
- Source: metricgate.com "Population Attributable Risk (PAR/PAF) Calculator"
- Input (2x2 table): a=40, b=160, c=15, d=285 → derived Pe = 200/500 = 0.40,
  RR = (40/200)/(15/300) = 4.0
- Expected PAF = 0.40×3 / (1+0.40×3) = 1.2/2.2 = 0.5455
- Result: **PASS** (`src/lib/__tests__/paf.test.ts`)

### Test Case 2 — Biology Insights worked example
- Source: biologyinsights.com "How to Calculate Attributable Risk"
- Input (direct): Pe = 0.40, RR = 3
- Expected PAF = 0.40×2 / (1+0.40×2) = 0.8/1.8 = 0.4444 (44%)
- Result: **PASS**

### Test Case 3 — cross-validation between input modes
- The MetricGate 2x2-table example (Test Case 1) is re-entered as raw counts
  and checked to derive the same Pe=0.40 and RR=4.0 as the direct-input
  version, then produce the identical PAF=0.5455 — confirming the 2x2-table
  derivation path is arithmetically consistent with the direct-input path.
- Result: **PASS**

| Function | Status |
|---|---|
| `calculatePaf` | ✅ Validated |

## Module: Population Burden Indicators — Age Standardization (Direct & Indirect)

**Formula source**: Lilienfeld, D.E. & Stolley, P.D. (1994). *Foundations of
Epidemiology*. Oxford University Press. NC SCHS *Statistical Primer 13-2*,
"Age-Adjusted Rates". NM-IBIS, "Age-adjusted Rates". Health Knowledge,
"Standardisation" (citing Hennekens & Buring, *Epidemiology in Medicine*,
1987). All sources independently confirm the same direct/indirect formulas
(see `src/lib/ageStandardization.ts` header for exact expressions). The
original textbook example tables (Hennekens & Buring, reproduced by Health
Knowledge) are only available as images, not machine-readable numbers, so a
hand-computable worked example was constructed directly from the confirmed
formula instead — the same approach already used for the Stratified Sample
Size and DALY incidence-YLD modules in this project.

### Direct method — Test Case
- 3 age groups: 0-19 (10 deaths / 5,000 study pop / 2,000 standard pop),
  20-59 (40 / 8,000 / 5,000), 60+ (30 / 2,000 / 3,000)
- Rates: 0.002, 0.005, 0.015; weights: 0.2, 0.5, 0.3 (standard pop total 10,000)
- Expected deaths: 4, 25, 45 (sum 74)
- Directly standardized rate = 74 / 10,000 = **0.0074**
- Cross-check: weighted-average form 0.2×0.002 + 0.5×0.005 + 0.3×0.015 = 0.0074 (matches)
- Result: **PASS** (`src/lib/__tests__/ageStandardization.test.ts`)

### Indirect method — Test Case
- 3 age groups: 0-19 (standard rate 0.001, study pop 3,000), 20-59 (0.004, 4,000),
  60+ (0.02, 1,000); observed deaths = 50; reference crude rate = 0.006
- Expected deaths: 3, 16, 20 (sum 39)
- SMR = 50 / 39 = **1.2821** (128.2%)
- Indirectly adjusted rate = SMR × 0.006 = **0.0076923**
- Result: **PASS**

| Function | Status |
|---|---|
| `calculateAgeStandardization` | ✅ Validated |

## Module: Clinical & Effect Measures — Vaccine Effectiveness (VE)

**Formula**: VE = 1 - RR = (ARu - ARv) / ARu
**Source**: Definition used across CDC/WHO vaccine effectiveness guidance;
confirmed by MetricGate's *Vaccine Efficacy Calculator* documentation and by
Kissler et al. (arXiv:2212.11679), "Some reflections on the test-negative design".

### Test Case — Kissler et al. worked example
- Input (counts): 10,000 vaccinated (100 cases), 10,000 unvaccinated (1,000 cases)
- ARv = 100/10,000 = 0.01; ARu = 1,000/10,000 = 0.10; RR = 0.10
- Expected VE = 1 - 0.10 = **0.90 (90%)**, matching the source's stated VE of 90%
- Cross-check: same result entered directly as ARv=0.01, ARu=0.10
- Result: **PASS** (`src/lib/__tests__/vaccineEffectiveness.test.ts`)

| Function | Status |
|---|---|
| `calculateVaccineEffectiveness` | ✅ Validated |

## Module: Clinical & Effect Measures — NNT / NNH

**Formula**: ARR = CER - EER; NNT = 1/ARR (rounded up); when ARR < 0, NNH = 1/|ARR|
**Source**: Centre for Evidence-Based Medicine, University of Oxford, "Number
Needed to Treat (NNT)". ClinCalc, "NNT Calculator".

### Test Case 1 — CEBM Oxford worked example
- CER = 0.50, EER = 0.30 → ARR = 0.20 → NNT = 1/0.20 = **5**
- Result: **PASS** (`src/lib/__tests__/nnt.test.ts`)

### Test Case 2 — ClinCalc worked example
- CER = 0.26, EER = 0.16 → ARR = 0.10 → NNT = **10**
- Result: **PASS**

### Test Case 3 — Wikipedia NNH worked example
- Source: en.wikipedia.org/wiki/Number_needed_to_harm
- Experimental group 75/150 = 0.50, control group 100/250 = 0.40 → ARI = 0.10 → NNH = **10**
- Result: **PASS**

### Test Case 4 — Medicines Learning Portal NNH worked example
- ARI = 82/2000 - 2/2000 = 0.04 → NNH = **25**
- Result: **PASS**

| Function | Status |
|---|---|
| `calculateNnt` | ✅ Validated |

## Module: Clinical & Effect Measures — SMD (Cohen's d, Hedges' g)

**Formula**: pooled SD = sqrt[((n1-1)s1²+(n2-1)s2²)/(n1+n2-2)]; Cohen's d =
(mean1-mean2)/pooled SD; Hedges' g = J(m)×d, J(m) = 1-3/(4m-1)
**Source**: Borenstein, M. et al. (2009). *Introduction to Meta-Analysis*.
Wiley. Hedges, L.V. (1983). *Biometrics*. Campbell Collaboration, "Effect
Size Calculator" (Cohen's d formula independently confirmed).

### Test Case 1 — equal-n, equal-SD hand-verified example
- n1=n2=20, sd1=sd2=10, mean1=75, mean2=70
- Pooled SD = 10 (equal variances); d = 5/10 = **0.5**
- Result: **PASS** (`src/lib/__tests__/smd.test.ts`)

### Test Case 2 — unequal-n, unequal-SD hand-verified example
- n1=15 (sd=8, mean=50), n2=25 (sd=12, mean=45)
- Pooled variance = (14×64+24×144)/38 = 4352/38 = 114.526; pooled SD = 10.702
- d = 5/10.702 = **0.467**
- Result: **PASS**

### Test Case 3 — Hedges' g correction
- m = 38, J(38) = 1 - 3/151 = 0.980132; g = 0.980132×0.5 = **0.490**
- Confirms |g| < |d| as expected for the small-sample correction
- Result: **PASS**

| Function | Status |
|---|---|
| `calculateSmd` | ✅ Validated |

## Module: Statistical Modeling — Poisson Regression (Incidence Rate Ratio)

**Scope note**: full multivariable Poisson regression requires iterative
maximum-likelihood fitting (IRLS/Newton-Raphson) and raw row-level data,
which falls outside this project's Phase 1 "aggregate value, closed-formula
calculator" architecture (the same reason multivariable logistic regression
and Cox regression were deferred to Phase 2). A Poisson regression with a
**single categorical exposure variable**, however, is a saturated model:
its MLE fit exactly equals each group's observed rate, with no iteration
needed. This calculator implements that closed-form case — one rate/IRR
per exposure group vs. a chosen reference — which is exactly what
"Poisson regression" means in the common two- or multi-group
incidence-rate-ratio comparison use case.

**Formula**: rate = events/person-time; IRR = rate_group/rate_reference;
95% CI = exp[ln(IRR) ± 1.96×sqrt(1/events_group + 1/events_reference)]
**Source**: StatsDirect, "Poisson Regression (Incidence Rate Ratio)"
(confirms exp(coefficient) = IRR). MetricGate, "Incidence Rate Ratio
Calculator" and "Incidence Density Ratio Calculator" (confirm the point
estimate and Wald CI formulas).

### Test Case 1 — Statology smoker/non-smoker example
- Smokers 7/100 person-years, non-smokers 10/100 person-years → IRR = 0.7
- Result: **PASS** (`src/lib/__tests__/poissonRegression.test.ts`)

### Test Case 2 — hand-verified example with confidence interval
- Exposed: 20 events / 500 person-years (rate 0.04); Unexposed (reference):
  10 events / 1,000 person-years (rate 0.01)
- IRR = 0.04/0.01 = 4.0; SE(ln IRR) = sqrt(1/20+1/10) = 0.3873
- 95% CI = exp(1.3863 ± 1.95996×0.3873) = **(1.8724, 8.5457)**
- Result: **PASS**

| Function | Status |
|---|---|
| `calculatePoissonRegression` | ✅ Validated |

## Module: Statistical Modeling — Bayesian Diagnostic Test (PPV/NPV)

**Formula**: PPV = (Se×Prev)/(Se×Prev+(1-Sp)×(1-Prev));
NPV = (Sp×(1-Prev))/(Sp×(1-Prev)+(1-Se)×Prev); LR+ = Se/(1-Sp); LR- = (1-Se)/Sp
**Source**: Definition used across clinical epidemiology teaching materials;
confirmed by VarsityTutors, "Sensitivity, Specificity, PPV & NPV" and "Use
Bayes' theorem in diagnostic contexts".

### Test Case 1 — VarsityTutors worked example
- Se = 0.90, Sp = 0.95, Prevalence = 0.08
- PPV = (0.90×0.08)/(0.90×0.08+0.05×0.92) = 0.072/0.118 = **0.6102**
- Result: **PASS** (`src/lib/__tests__/bayesianDiagnostic.test.ts`)

### Test Case 2 — best-calculators.com rapid-test worked example (2x2 table)
- 1,000 people: 95 TP, 5 FN, 880 TN, 20 FP → Se=95%, Sp=97.78%, Prev=10%
- Expected PPV = **82.61%**, NPV = **99.44%**
- Result: **PASS**

### Test Case 3 — likelihood ratios and cross-mode validation
- LR+ = 0.95/0.0222 ≈ **42.75**, LR- = 0.05/0.9778 ≈ **0.0511** (both from Test Case 2's data)
- The same underlying data entered directly (Se, Sp, Prev computed by hand)
  and via the 2x2 table produce identical PPV/NPV
- Result: **PASS**

### Test Case 4 — genuine Bayesian use: external prior prevalence
- Reuses Test Case 2's 2x2 table (95 TP, 5 FN, 880 TN, 20 FP) to derive
  Se = 0.95 and Sp = 0.977778, but replaces the sample-derived prevalence
  (100/1000 = 0.10) with an externally supplied prior prevalence of 0.02
  (e.g. the known prevalence in the actual target screening population).
- Hand-computed: PPV = (0.95x0.02)/(0.95x0.02+0.022222x0.98) = 0.019/0.040778
  = **0.46594** (46.59%); NPV = (0.977778x0.98)/(0.977778x0.98+0.05x0.02)
  = 0.958222/0.959222 = **0.99896** (99.90%)
- Result: **PASS** (`src/lib/__tests__/bayesianDiagnostic.test.ts`)
- Contrast with Test Case 2 (same Se/Sp, no external prior — prevalence taken
  from the same table): PPV drops from 82.61% to 46.59%, and NPV rises from
  99.44% to 99.90%, purely from changing the prior. LR+ (42.75) and LR-
  (0.0511) are unchanged in both cases, since likelihood ratios do not
  depend on prevalence. This demonstrates the distinction the module
  docstring describes: Test Case 2 (no `priorPrevalence`) reproduces the
  classical PPV = TP/(TP+FP) identity exactly and is not a genuine Bayesian
  calculation, while this test case is — the same Se/Sp combined with a
  different, externally sourced prior yields materially different results.
  
| Function | Status |
|---|---|
| `calculateBayesianDiagnostic` | ✅ Validated |

## Module: Meta-Analysis — Forest Plot, Cochran's Q, I², Random Effects (DerSimonian-Laird)

**Reused infrastructure**: `src/lib/statUtils.ts` (chi-square p-value via
regularized incomplete gamma function, Z_95 constant) was ported directly
from EpiStat's `src/lib/statUtils.ts`, which is already validated there
(see EpiStat's own VALIDATION.md, Module 1). The fixed-effect pooling here
uses the same inverse-variance (Woolf) approach as EpiStat's
`directlyAdjustedOR`/`directlyAdjustedRR`, generalized to arbitrary
difference- or ratio-scale effect sizes rather than only 2x2-table odds/risk
ratios.

**Formula**: fixed-effect = Σ(wᵢyᵢ)/Σwᵢ (wᵢ=1/SEᵢ²); Cochran's Q =
Σ[wᵢ(yᵢ-y_fixed)²], df=k-1; I² = max(0,(Q-df)/Q)×100%; τ² (DerSimonian-Laird)
= max(0,(Q-df)/C), C=Σwᵢ-Σwᵢ²/Σwᵢ; random-effects wᵢ*=1/(SEᵢ²+τ²)
**Source**: DerSimonian, R. & Laird, N. (1986). *Controlled Clinical Trials*,
7(3): 177-188. Higgins, J.P.T. & Thompson, S.G. (2002). *Statistics in
Medicine*, 21(11): 1539-1558 (I²). Cochrane Handbook, section 9.4.3.1/9.5.4.
Formula independently corroborated by MetricGate's "τ² (Tau-Squared)
Calculator" documentation and multiple arXiv methodology papers, all giving
the identical DerSimonian-Laird moment estimator.

### Test Case — hand-computed 5-study example (difference scale)
- Studies: (y=0.5, SE=0.2), (0.3, 0.15), (0.8, 0.25), (0.2, 0.1), (0.6, 0.3)
- Computed independently in Python (not just re-deriving the TypeScript
  logic) to cross-check the implementation:
- Weights (1/SE²): 25, 44.444, 16, 100, 11.111
- Fixed-effect estimate = **0.33222** (95% CI 0.19242 to 0.47202)
- Cochran's Q = **6.79593**, df=4; I² = **41.14%**
- τ² (DerSimonian-Laird) = **0.021422**
- Random-effects estimate = **0.39507** (95% CI 0.19047 to 0.59967)
- Result: **PASS** (`src/lib/__tests__/metaAnalysis.test.ts`)

### Test Case — ratio-scale log-transform and back-transform
- Two studies with identical OR=2.0 and SE(ln OR)=0.3 pool to the same
  OR=2.0 for both fixed- and random-effects estimates, with Q=0, I²=0%,
  τ²=0 (no heterogeneity possible between two identical studies) —
  confirms the log-transform/back-transform round-trip is exact
- Result: **PASS**

| Function | Status |
|---|---|
| `calculateMetaAnalysis` | ✅ Validated |
| `statUtils.chiSquarePValue` | ✅ Validated (ported from EpiStat, already validated there) |
