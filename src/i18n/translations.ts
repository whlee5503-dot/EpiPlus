// EpiPlus i18n — English / Korean / French
export type Lang = "en" | "ko" | "fr";

export const translations = {
  en: {
    appName: "EpiPlus",
    appTagline: "Epidemiology & Biostatistics Calculator Suite",
    nav: {
      samplingdesign: "Survey Sampling Design",
    },
    common: {
      loadExample: "Load Example",
      reset: "Reset",
      showMore: "Show more",
      showLess: "Show less",
      formula: "Formula",
      interpretation: "Interpretation",
      note: "Note",
      undefined: "undefined",
      disclaimer:
        "This tool is for epidemiological and educational purposes. It does not replace professional statistical consultation for publication-grade analyses.",
    },
    errorBoundary: {
      title: "Something went wrong",
      message:
        "This module failed to load or crashed unexpectedly. This is usually temporary — for example, a dropped network connection while loading. Try again, or switch to another module and back.",
      retryButton: "Try again",
    },
    samplingdesign: {
      title: "Survey Sampling Design",
      subtitle:
        "Calculators for cluster and stratified sample designs, including the design effect (variance inflation) from clustering",
      subnav: {
        designEffect: "Design Effect",
        clusterSampleSize: "Cluster Sample Size",
        stratifiedSampleSize: "Stratified Sample Size",
      },
      designEffect: {
        heading: "Design Effect (Cluster Sampling)",
        formulaDeff: "DEFF",
        formulaDeffExpr: "= 1 + (m - 1) x ICC",
        formulaNeff: "n_eff",
        formulaNeffExpr: "= n / DEFF",
        formulaAdjustedN: "n_cluster",
        formulaAdjustedNExpr: "= n_individual x DEFF",
        formulaSource: "Source",
        formulaSourceExpr:
          "Kish, L. (1965). Survey Sampling. Wiley. Donner, A. & Klar, N. (2000). Design and Analysis of Cluster Randomization Trials in Health Research.",
        input: {
          avgClusterSizeLabel: "Average cluster size (m)",
          avgClusterSizeHint: "Mean number of individuals per cluster",
          iccLabel: "Intracluster correlation (ICC / rho)",
          iccHint: "Value between 0 and 1; higher means more similarity within clusters",
          sectionEffectiveTitle: "Effective Sample Size (optional)",
          nominalSampleSizeLabel: "Nominal (collected) sample size",
          nominalSampleSizeHint:
            "Total sample size actually collected under the cluster design",
          sectionAdjustedTitle: "Cluster-Adjusted Sample Size (optional)",
          individualSampleSizeLabel: "Individually-randomized sample size",
          individualSampleSizeHint:
            "Sample size that would be required under simple/individual random sampling",
        },
        emptyState:
          "Enter a valid average cluster size (> 0) and ICC (0-1) to see results",
        deffLabel: "Design Effect",
        deffSub: "m = {m}, ICC = {icc}",
        effectiveSampleSizeLabel: "Effective Sample Size",
        effectiveSampleSizeSub: "{nominal} collected / DEFF {deff}",
        adjustedSampleSizeLabel: "Cluster-Adjusted Sample Size",
        adjustedSampleSizeSub: "{individual} (individual) x DEFF {deff}",
        interpSummary:
          "With an average cluster size of {m} and an ICC of {icc}, the design effect is {deff}.",
        interpDetail1:
          "The design effect (DEFF) measures how much clustering inflates the variance of an estimator compared to simple random sampling. A DEFF of 2.0 means twice as many observations are needed to achieve the same precision as an unclustered (SRS) design.",
        interpDetail2:
          "Even a small ICC can produce a large design effect when the average cluster size is large, since DEFF depends on both quantities together, not on the ICC alone. Use the effective sample size to see how much independent information a clustered dataset actually provides, or the cluster-adjusted sample size to inflate an individually-randomized sample size estimate for a cluster design.",
      },
      clusterSampleSize: {
        heading: "Cluster Sample Size",
        formulaNCluster: "n_cluster",
        formulaNClusterExpr: "= n_srs x DEFF",
        formulaClusters: "clusters",
        formulaClustersExpr: "= ceil(n_cluster / m)",
        formulaSource: "Source",
        formulaSourceExpr:
          "Kish, L. (1965). Survey Sampling. Wiley. Lemeshow, S. et al. (1990). Adequacy of Sample Size in Health Studies. WHO / Wiley.",
        input: {
          srsSampleSizeLabel: "SRS sample size (n0)",
          srsSampleSizeHint: "Sample size required under simple/individual random sampling",
          avgClusterSizeLabel: "Average cluster size (m)",
          avgClusterSizeHint: "Mean number of individuals per cluster",
          iccLabel: "Intracluster correlation (ICC / rho)",
          iccHint: "Value between 0 and 1; higher means more similarity within clusters",
        },
        emptyState:
          "Enter a valid SRS sample size (> 0), average cluster size (> 0) and ICC (0-1) to see results",
        deffLabel: "Design Effect",
        deffSub: "m = {m}, ICC = {icc}",
        clusterAdjustedSampleSizeLabel: "Cluster-Adjusted Sample Size",
        clusterAdjustedSampleSizeSub: "{srs} (SRS) x DEFF {deff}",
        numberOfClustersLabel: "Number of Clusters Needed",
        numberOfClustersSub: "ceil({adjusted} / {m} per cluster)",
        actualSampleSizeLabel: "Actual Sample Size (whole clusters)",
        actualSampleSizeSub: "{clusters} clusters x {m} per cluster",
        interpSummary:
          "To reach a design-effect-adjusted sample size of {adjusted} with an average cluster size of {m}, you need at least {clusters} clusters, giving an actual sample of {actual}.",
        interpDetail1:
          "Because whole clusters must be sampled, the achieved sample size is usually a little larger than the design-effect-adjusted target — this is a normal and expected feature of cluster sampling, not a rounding error to correct for.",
        interpDetail2:
          "This calculator assumes clusters of roughly equal size m. If cluster sizes vary substantially in practice, treat m as an average and consider oversampling slightly to guard against smaller-than-expected clusters.",
      },
      stratifiedSampleSize: {
        heading: "Stratified Sample Size (Allocation)",
        methodLabel: "Allocation method",
        methodEqual: "Equal",
        methodProportional: "Proportional",
        methodNeyman: "Neyman (optimum)",
        formulaEqual: "Equal",
        formulaEqualExpr: "n_h = n / L",
        formulaProportional: "Proportional",
        formulaProportionalExpr: "n_h = n x (N_h / N)",
        formulaNeyman: "Neyman",
        formulaNeymanExpr: "n_h = n x (N_h S_h) / sum(N_h S_h)",
        formulaSource: "Source",
        formulaSourceExpr:
          "Cochran, W. G. (1977). Sampling Techniques, 3rd ed. Wiley, Ch. 5. Neyman, J. (1934). J. Royal Statistical Society 97(4): 558-625.",
        input: {
          totalSampleSizeLabel: "Total sample size (n)",
          totalSampleSizeHint: "Fixed total sample size to allocate across strata",
          strataTitle: "Strata",
          strataLabelLabel: "Label",
          populationSizeLabel: "Population size (N_h)",
          stdDevLabel: "Std. dev. (S_h)",
          stdDevHint: "Required for Neyman allocation only",
          addStratum: "Add stratum",
          removeStratum: "Remove",
        },
        emptyState:
          "Enter a valid total sample size (> 0) and at least one stratum with a population size (> 0) to see results",
        neymanMissingStdDev:
          "Neyman allocation requires a standard deviation greater than 0 for every stratum",
        tableLabel: "Stratum",
        tablePopulation: "Population (N_h)",
        tableWeight: "Weight",
        tableSampleSize: "Sample size (n_h)",
        tableTotal: "Total",
        allocatedTotalNote:
          "Allocated total: {allocated} (target: {target}). Small differences from the target come from rounding each stratum to a whole number.",
        interpSummary:
          "With {method} allocation across {strata} strata (total population {population}), the target sample size of {target} is distributed as shown below.",
        interpDetail1:
          "Proportional allocation samples each stratum in proportion to its population share. Neyman allocation additionally samples more heavily from strata that are larger and more variable, minimizing the overall variance of the estimate for the same total sample size.",
        interpDetail2:
          "When every stratum has the same standard deviation, Neyman allocation is mathematically identical to proportional allocation.",
      },
    },
    populationburden: {
      title: "Population Burden Indicators",
      subtitle: "Calculators for summary measures of population health, including DALYs",
      subnav: {
        daly: "DALY",
        paf: "PAF",
        ageStandardization: "Age Standardization",
      },
      daly: {
        heading: "DALY (Disability-Adjusted Life Years)",
        formulaDaly: "DALY",
        formulaDalyExpr: "= YLL + YLD",
        formulaYll: "YLL",
        formulaYllExpr: "= n x L1 (deaths x reference life expectancy)",
        formulaYldIncidence: "YLD (incidence)",
        formulaYldIncidenceExpr: "= I x DW x L2 (cases x disability weight x duration)",
        formulaYldPrevalence: "YLD (prevalence)",
        formulaYldPrevalenceExpr: "= P x DW (cases x disability weight)",
        formulaSource: "Source",
        formulaSourceExpr:
          "Murray, C.J.L. & Lopez, A.D. (1996). The Global Burden of Disease. WHO/World Bank/Harvard. WHO (2020), GHE 2019 DALY methods. Undiscounted, no age-weighting (GBD 2010+).",
        yllSectionTitle: "Years of Life Lost (YLL) — by cause / age group",
        yllLabelLabel: "Cause / age group",
        yllDeathsLabel: "Deaths (n)",
        yllLifeExpectancyLabel: "Reference life expectancy at age of death (L1, years)",
        addYllRow: "Add YLL row",
        yldSectionTitle: "Years Lived with Disability (YLD) — by condition",
        yldMethodLabel: "YLD method",
        yldMethodIncidence: "Incidence-based (cases x DW x duration)",
        yldMethodPrevalence: "Prevalence-based (cases x DW)",
        yldLabelLabel: "Condition",
        yldCasesLabel: "Cases",
        yldCasesHint: "Incident (new) or prevalent (existing) cases, depending on method above",
        yldDwLabel: "Disability weight (DW, 0-1)",
        yldDurationLabel: "Average duration (years)",
        yldDurationHint: "Required for the incidence method only",
        addYldRow: "Add YLD row",
        removeRow: "Remove",
        emptyState: "Add at least one valid YLL or YLD row to see results",
        neymanStyleError:
          "Check your inputs: deaths and cases must be zero or greater, life expectancy and duration must be greater than 0, and disability weight must be between 0 and 1",
        totalYllLabel: "Total YLL",
        totalYllSub: "Sum across {n} row(s)",
        totalYldLabel: "Total YLD",
        totalYldSub: "Sum across {n} row(s), {method} method",
        totalDalyLabel: "Total DALY",
        totalDalySub: "YLL {yll} + YLD {yld}",
        interpSummary:
          "This population experiences an estimated {daly} DALYs: {yll} years of life lost to premature death (YLL) and {yld} years lived with disability (YLD).",
        interpDetail1:
          "One DALY represents one lost year of healthy life. A condition with a large YLL share is largely driven by premature mortality (a YLL-dominant condition, e.g. road injuries or stroke), while a large YLD share reflects a largely non-fatal, disabling burden (a YLD-dominant condition, e.g. depression or low back pain).",
        interpDetail2:
          "This calculator follows current GBD/WHO methodology: no age-weighting and no discounting of future years, and reference life expectancies should come from a standard life table (e.g. the GBD reference life table) rather than the local population's actual life expectancy, so that a death at a given age counts the same everywhere.",
      },
      paf: {
        heading: "PAF (Population Attributable Fraction)",
        formulaPaf: "PAF (Levin)",
        formulaPafExpr: "= Pe(RR - 1) / [1 + Pe(RR - 1)]",
        formulaPe: "Pe",
        formulaPeExpr: "= exposure prevalence in the population",
        formulaRr: "RR",
        formulaRrExpr: "= relative risk, exposed vs. unexposed",
        formulaSource: "Source",
        formulaSourceExpr:
          "Levin, M.L. (1953). The occurrence of lung cancer in man. Acta Unio Int Contra Cancrum, 9(3): 531-541.",
        modeLabel: "Input mode",
        modeDirect: "Direct (Pe and RR)",
        modeTable2x2: "2x2 table (exposure x disease)",
        input: {
          exposurePrevalenceLabel: "Exposure prevalence (Pe)",
          exposurePrevalenceHint: "Proportion of the population exposed to the risk factor, 0 to 1",
          relativeRiskLabel: "Relative risk (RR)",
          relativeRiskHint: "Risk of disease in the exposed group relative to the unexposed group",
          exposedCasesLabel: "Exposed, disease-positive (a)",
          exposedNonCasesLabel: "Exposed, disease-negative (b)",
          unexposedCasesLabel: "Unexposed, disease-positive (c)",
          unexposedNonCasesLabel: "Unexposed, disease-negative (d)",
        },
        emptyState:
          "Enter a valid exposure prevalence (0-1) and relative risk (> 0), or a complete 2x2 table, to see results",
        validationError:
          "Check your inputs: exposure prevalence must be between 0 and 1, relative risk must be greater than 0, and (for the 2x2 table) every cell must be zero or greater with at least one person in each exposure group and at least one unexposed case",
        derivedPeLabel: "Derived Pe",
        derivedPeSub: "(a + b) / total",
        derivedRrLabel: "Derived RR",
        derivedRrSub: "[a / (a+b)] / [c / (c+d)]",
        pafLabel: "PAF",
        pafSub: "Pe = {pe}, RR = {rr}",
        pafPercentLabel: "Attributable percentage",
        protectiveWarning:
          "RR < 1: this factor appears protective. The negative PAF means removing it would be expected to increase, not decrease, disease frequency in this population.",
        interpSummary:
          "With an exposure prevalence of {pe} and a relative risk of {rr}, an estimated {pafPercent} of disease in this population is attributable to the exposure — the share of cases that would not have occurred had the exposure been absent.",
        interpDetail1:
          "Levin's formula assumes the exposure-disease relationship is unconfounded. If the relative risk you entered is a crude (unadjusted) estimate rather than one adjusted for confounders, the resulting PAF may be biased.",
        interpDetail2:
          "A modest relative risk combined with high exposure prevalence can produce a larger PAF than a strong relative risk that is rare in the population — PAF captures both the strength of the association and how common the exposure is.",
      },
      ageStandardization: {
        heading: "Age Standardization",
        methodLabel: "Method",
        methodDirect: "Direct",
        methodIndirect: "Indirect",
        formulaDirect: "Direct",
        formulaDirectExpr: "= sum(expected_i) / sum(standard population_i), expected_i = (study deaths_i / study population_i) x standard population_i",
        formulaIndirectSmr: "SMR",
        formulaIndirectSmrExpr: "= observed deaths / sum(expected_i), expected_i = standard rate_i x study population_i",
        formulaIndirectRate: "Indirectly adjusted rate",
        formulaIndirectRateExpr: "= SMR x reference crude rate",
        formulaSource: "Source",
        formulaSourceExpr:
          "Lilienfeld, D.E. & Stolley, P.D. (1994). Foundations of Epidemiology. Oxford University Press. NC SCHS Statistical Primer 13-2. Health Knowledge, \"Standardisation\" (Hennekens & Buring, 1987).",
        directSectionTitle: "Age groups — study deaths, study population, standard population",
        directLabelLabel: "Age group",
        directStudyDeathsLabel: "Study deaths",
        directStudyPopulationLabel: "Study population",
        directStandardPopulationLabel: "Standard population",
        addDirectRow: "Add age group",
        indirectSectionTitle: "Age groups — standard rate, study population",
        indirectLabelLabel: "Age group",
        indirectStandardRateLabel: "Standard/reference rate",
        indirectStudyPopulationLabel: "Study population",
        addIndirectRow: "Add age group",
        observedDeathsLabel: "Observed deaths (total, study population)",
        referenceCrudeRateLabel: "Reference crude rate (optional)",
        referenceCrudeRateHint: "Overall crude rate of the standard/reference population; leave blank to see the SMR only",
        removeRow: "Remove",
        emptyState: "Add at least one valid age group to see results",
        validationError:
          "Check your inputs: study/standard populations and rates must be zero or greater (study population must be greater than 0 per group for the direct method), and total expected deaths must be greater than 0",
        standardizedRateLabel: "Directly Standardized Rate",
        standardizedRateSub: "{expected} expected deaths / {pop} standard population",
        smrLabel: "SMR",
        smrSub: "{observed} observed / {expected} expected deaths",
        smrPercentLabel: "SMR (%)",
        indirectRateLabel: "Indirectly Adjusted Rate",
        indirectRateSub: "SMR {smr} x reference rate {ref}",
        interpSummaryDirect:
          "Applying this population's age-specific rates to the standard population gives a directly age-standardized rate of {rate} — the rate this population would have if it had the standard population's age structure.",
        interpDetailDirect:
          "Because all populations are standardized against the same reference population, directly standardized rates (unlike crude rates) can be validly compared across populations with different age structures.",
        interpSummaryIndirect:
          "This population experienced {observed} observed deaths versus {expected} expected deaths if it had the reference population's age-specific rates, giving an SMR of {smrPercent}.",
        interpDetailIndirect:
          "An SMR above 100% means more deaths occurred than expected from the reference rates; below 100% means fewer. Unlike directly standardized rates, SMRs from different study populations should not be compared directly with each other, since each is weighted by its own population's age structure.",
      },
    },
    clinical: {
      title: "Clinical & Effect Measures",
      subtitle: "Calculators for vaccine effectiveness, treatment benefit/harm, and effect size",
      subnav: {
        vaccineEffectiveness: "Vaccine Effectiveness",
        nnt: "NNT / NNH",
        smd: "SMD",
      },
      vaccineEffectiveness: {
        heading: "Vaccine Effectiveness (VE)",
        formulaVe: "VE",
        formulaVeExpr: "= 1 - RR = (ARu - ARv) / ARu",
        formulaRr: "RR",
        formulaRrExpr: "= ARv / ARu",
        formulaSource: "Source",
        formulaSourceExpr:
          "Definition used across CDC/WHO vaccine effectiveness guidance; confirmed by MetricGate's Vaccine Efficacy Calculator documentation and Kissler et al., arXiv:2212.11679.",
        modeLabel: "Input mode",
        modeRates: "Direct (attack rates)",
        modeCounts: "Case counts",
        input: {
          arVaccinatedLabel: "Attack rate, vaccinated (ARv)",
          arVaccinatedHint: "Proportion of the vaccinated group who developed the outcome, 0 to 1",
          arUnvaccinatedLabel: "Attack rate, unvaccinated (ARu)",
          arUnvaccinatedHint: "Proportion of the unvaccinated group who developed the outcome, 0 to 1",
          casesVaccinatedLabel: "Cases, vaccinated",
          totalVaccinatedLabel: "Total, vaccinated",
          casesUnvaccinatedLabel: "Cases, unvaccinated",
          totalUnvaccinatedLabel: "Total, unvaccinated",
        },
        emptyState:
          "Enter valid attack rates (0-1) or case counts (cases <= total, ARu > 0) to see results",
        validationError:
          "Check your inputs: attack rates must be between 0 and 1, group totals must be greater than 0, case counts cannot exceed their group total, and the unvaccinated attack rate must be greater than 0",
        derivedArVaccinatedLabel: "Derived ARv",
        derivedArUnvaccinatedLabel: "Derived ARu",
        veLabel: "Vaccine Effectiveness",
        veSub: "ARv = {arv}, ARu = {aru}, RR = {rr}",
        negativeWarning:
          "VE is negative: the vaccinated group had a higher attack rate than the unvaccinated group in this data.",
        interpSummary:
          "With an attack rate of {arv} in the vaccinated group versus {aru} in the unvaccinated group, the estimated vaccine effectiveness is {vePercent}.",
        interpDetail1:
          "VE is the proportional reduction in disease risk among vaccinated individuals compared to unvaccinated individuals. A VE of 90% means vaccinated individuals had a 90% lower risk of the outcome in this data.",
        interpDetail2:
          "This estimate assumes the vaccinated and unvaccinated groups are otherwise comparable (e.g. similar exposure and case ascertainment). Observational estimates can be biased by confounding, differential testing, or waning immunity over time.",
      },
      nnt: {
        heading: "NNT / NNH",
        formulaArr: "ARR",
        formulaArrExpr: "= CER - EER",
        formulaNnt: "NNT",
        formulaNntExpr: "= 1 / ARR (rounded up), when ARR > 0",
        formulaNnh: "NNH",
        formulaNnhExpr: "= 1 / |ARR| (rounded up), when ARR < 0",
        formulaSource: "Source",
        formulaSourceExpr:
          "Centre for Evidence-Based Medicine, University of Oxford, \"Number Needed to Treat (NNT)\". ClinCalc, \"NNT Calculator\".",
        input: {
          controlEventRateLabel: "Control event rate (CER)",
          controlEventRateHint: "Proportion of the control/comparison group with the event, 0 to 1",
          experimentalEventRateLabel: "Experimental event rate (EER)",
          experimentalEventRateHint: "Proportion of the treatment/experimental group with the event, 0 to 1",
        },
        emptyState: "Enter valid control and experimental event rates (0-1) to see results",
        validationError: "Check your inputs: both event rates must be between 0 and 1",
        arrLabel: "Absolute Risk Reduction (ARR)",
        arrSub: "CER {cer} - EER {eer}",
        nntLabel: "Number Needed to Treat (NNT)",
        nntSub: "1 / ARR {arr}, rounded up",
        nnhLabel: "Number Needed to Harm (NNH)",
        nnhSub: "1 / |ARR| {ari}, rounded up",
        noneLabel: "No difference",
        noneSub: "Control and experimental event rates are equal — NNT/NNH is undefined",
        interpSummaryBenefit:
          "With a control event rate of {cer} and an experimental event rate of {eer}, the treatment needs to be given to about {nnt} people for one additional person to benefit (avoid the event), compared to control.",
        interpSummaryHarm:
          "With a control event rate of {cer} and an experimental event rate of {eer}, about {nnh} people need to be exposed to the treatment for one additional person to be harmed (experience the event), compared to control.",
        interpDetail1:
          "NNT and NNH are always rounded up to the next whole person, since a fractional person cannot be treated or harmed.",
        interpDetail2:
          "NNT/NNH depends on the baseline (control) risk: the same relative effect will give a much larger NNT in a low-risk population than in a high-risk population, so NNT/NNH values should only be compared between studies with similar baseline risk and time horizon.",
      },
      smd: {
        heading: "SMD (Standardized Mean Difference)",
        formulaPooledSd: "Pooled SD",
        formulaPooledSdExpr: "= sqrt[((n1-1) s1^2 + (n2-1) s2^2) / (n1+n2-2)]",
        formulaCohensD: "Cohen's d",
        formulaCohensDExpr: "= (mean1 - mean2) / pooled SD",
        formulaHedgesG: "Hedges' g",
        formulaHedgesGExpr: "= J(m) x Cohen's d, J(m) = 1 - 3/(4m-1), m = n1+n2-2",
        formulaSource: "Source",
        formulaSourceExpr:
          "Borenstein, M. et al. (2009). Introduction to Meta-Analysis. Wiley. Hedges, L.V. (1983). Biometrics. Campbell Collaboration, Effect Size Calculator.",
        input: {
          group1Title: "Group 1",
          group2Title: "Group 2",
          meanLabel: "Mean",
          sdLabel: "Standard deviation",
          nLabel: "Sample size (n)",
        },
        emptyState: "Enter valid means, standard deviations (>= 0) and sample sizes (n >= 2) for both groups to see results",
        validationError:
          "Check your inputs: each group needs a sample size of at least 2, standard deviations must be zero or greater, and the pooled standard deviation must be greater than 0",
        pooledSdLabel: "Pooled SD",
        cohensDLabel: "Cohen's d",
        cohensDSub: "(mean1 {m1} - mean2 {m2}) / pooled SD {psd}",
        hedgesGLabel: "Hedges' g (small-sample corrected)",
        hedgesGSub: "J({m}) = {j}",
        magnitudeSmall: "small effect",
        magnitudeMedium: "medium effect",
        magnitudeLarge: "large effect",
        magnitudeNegligible: "negligible effect",
        interpSummary:
          "The standardized mean difference between the two groups is Cohen's d = {d} ({magnitude} by Cohen's conventional benchmarks), or {g} using the small-sample-corrected Hedges' g.",
        interpDetail1:
          "By Cohen's conventional benchmarks: |d| around 0.2 is a small effect, around 0.5 a medium effect, and around 0.8 or more a large effect. These are rules of thumb, not fixed thresholds, and their relevance varies by field.",
        interpDetail2:
          "Hedges' g applies a small-sample correction and is preferred over Cohen's d when either group has fewer than about 20 participants, since Cohen's d tends to overestimate the true effect size in small samples.",
      },
    },
    statisticalmodeling: {
      title: "Statistical Modeling",
      subtitle: "Calculators for incidence rate ratios and Bayesian diagnostic test performance",
      subnav: {
        poissonRegression: "Poisson Regression (IRR)",
        bayesianDiagnostic: "Bayesian Diagnostic Test",
      },
      poissonRegression: {
        heading: "Poisson Regression (Incidence Rate Ratio)",
        formulaRate: "Rate",
        formulaRateExpr: "= events / person-time",
        formulaIrr: "IRR",
        formulaIrrExpr: "= rate_group / rate_reference",
        formulaCi: "95% CI",
        formulaCiExpr: "= exp[ln(IRR) +/- 1.96 x sqrt(1/events_group + 1/events_reference)]",
        formulaSource: "Source",
        formulaSourceExpr:
          "StatsDirect, \"Poisson Regression (Incidence Rate Ratio)\". MetricGate, \"Incidence Rate Ratio Calculator\" and \"Incidence Density Ratio Calculator\".",
        note: "A single categorical exposure variable is a saturated Poisson model — its maximum-likelihood fit exactly equals each group's observed rate, so no iterative fitting is needed.",
        groupsSectionTitle: "Groups — events and person-time",
        groupLabelLabel: "Group",
        eventsLabel: "Events",
        personTimeLabel: "Person-time",
        referenceLabel: "Reference",
        setReference: "Set as reference",
        addGroup: "Add group",
        removeRow: "Remove",
        emptyState: "Add at least two groups (events >= 0, person-time > 0) and choose a reference to see results",
        validationError:
          "Check your inputs: each group needs person-time greater than 0 and events zero or greater, the reference group must have at least one event, and at least two groups are required",
        tableGroup: "Group",
        tableRate: "Rate",
        tableIrr: "IRR",
        tableCi: "95% CI",
        referenceTag: "(reference)",
        undefinedCi: "undefined (0 events)",
        interpSummary:
          "Relative to {refLabel} (rate {refRate}), the groups with the highest and lowest incidence rate ratios in this comparison are {highLabel} (IRR {highIrr}) and {lowLabel} (IRR {lowIrr}).",
        interpDetail1:
          "IRR = 1 means no difference from the reference group's rate; IRR > 1 means a higher rate; IRR < 1 means a lower rate. A 95% CI that excludes 1 suggests the difference from the reference is unlikely to be due to chance alone, at the 5% significance level.",
        interpDetail2:
          "This model assumes a constant event rate within each group over the observed person-time, and that events are independent (no overdispersion). If the event variance greatly exceeds the mean within a group, consider a negative binomial model instead.",
      },
      bayesianDiagnostic: {
        heading: "Bayesian Diagnostic Test (PPV / NPV)",
        formulaPpv: "PPV",
        formulaPpvExpr: "= (Se x Prev) / (Se x Prev + (1-Sp) x (1-Prev))",
        formulaNpv: "NPV",
        formulaNpvExpr: "= (Sp x (1-Prev)) / (Sp x (1-Prev) + (1-Se) x Prev)",
        formulaLrPos: "LR+",
        formulaLrPosExpr: "= Se / (1-Sp)",
        formulaLrNeg: "LR-",
        formulaLrNegExpr: "= (1-Se) / Sp",
        formulaSource: "Source",
        formulaSourceExpr:
          "Definition used across clinical epidemiology teaching materials; confirmed by VarsityTutors, \"Sensitivity, Specificity, PPV & NPV\" and \"Use Bayes' theorem in diagnostic contexts\".",
        modeLabel: "Input mode",
        modeDirect: "Direct (Se, Sp, prevalence)",
        modeTable2x2: "2x2 table (test result x disease status)",
        input: {
          sensitivityLabel: "Sensitivity (Se)",
          sensitivityHint: "Proportion of diseased people who test positive, 0 to 1",
          specificityLabel: "Specificity (Sp)",
          specificityHint: "Proportion of healthy people who test negative, 0 to 1",
          prevalenceLabel: "Prevalence",
          prevalenceHint: "Pre-test probability of disease in the population tested, 0 to 1",
          tpLabel: "True positives (TP)",
          fnLabel: "False negatives (FN)",
          tnLabel: "True negatives (TN)",
          fpLabel: "False positives (FP)",
        },
        emptyState: "Enter valid Se/Sp/prevalence (0-1), or a complete 2x2 table, to see results",
        validationError:
          "Check your inputs: sensitivity, specificity and prevalence must be between 0 and 1 (specificity strictly less than 1), and for the 2x2 table there must be at least one diseased and one healthy person",
        derivedSeLabel: "Derived Se",
        derivedSpLabel: "Derived Sp",
        derivedPrevLabel: "Derived prevalence",
        ppvLabel: "PPV",
        ppvSub: "Se = {se}, Sp = {sp}, Prevalence = {prev}",
        npvLabel: "NPV",
        npvSub: "Se = {se}, Sp = {sp}, Prevalence = {prev}",
        lrPosLabel: "LR+",
        lrNegLabel: "LR-",
        interpSummary:
          "With sensitivity {se}, specificity {sp}, and a prevalence of {prev}, a positive test result gives a {ppv} probability of disease (PPV), while a negative result gives a {npv} probability of no disease (NPV).",
        interpDetail1:
          "Sensitivity and specificity are properties of the test itself and stay roughly constant across populations. PPV and NPV, in contrast, depend heavily on prevalence: the same test gives a much lower PPV in a low-prevalence screening population than in a high-prevalence referral population.",
        interpDetail2:
          "Likelihood ratios (LR+ and LR-) don't depend on prevalence, which makes them more portable across settings. As a rule of thumb, LR+ above 10 or LR- below 0.1 produce large, often clinically decisive shifts from pre-test to post-test probability.",
      },
    },
    metaanalysis: {
      title: "Meta-Analysis",
      subtitle: "Calculators for pooling study effect sizes, heterogeneity, and forest plots",
      subnav: {
        metaAnalysis: "Meta-Analysis (Forest Plot)",
      },
      metaAnalysis: {
        heading: "Meta-Analysis: Fixed & Random Effects",
        formulaFixed: "Fixed effect",
        formulaFixedExpr: "= sum(wi yi) / sum(wi), wi = 1/SEi^2",
        formulaQ: "Cochran's Q",
        formulaQExpr: "= sum[wi (yi - y_fixed)^2], df = k-1",
        formulaI2: "I^2",
        formulaI2Expr: "= max(0, (Q-df)/Q) x 100%",
        formulaTau2: "Tau^2 (DerSimonian-Laird)",
        formulaTau2Expr: "= max(0, (Q-df)/C), C = sum(wi) - sum(wi^2)/sum(wi)",
        formulaRandom: "Random effect",
        formulaRandomExpr: "= sum(wi* yi) / sum(wi*), wi* = 1/(SEi^2 + Tau^2)",
        formulaSource: "Source",
        formulaSourceExpr:
          "DerSimonian, R. & Laird, N. (1986). Controlled Clinical Trials, 7(3): 177-188. Higgins, J.P.T. & Thompson, S.G. (2002). Statistics in Medicine, 21(11): 1539-1558. Cochrane Handbook, section 9.4.3.1/9.5.4.",
        effectTypeLabel: "Effect measure",
        effectTypeDifference: "Difference (raw scale, e.g. mean difference)",
        effectTypeRatio: "Ratio (e.g. OR / RR / HR)",
        effectTypeHint:
          "For a ratio measure, enter the effect (e.g. OR) itself and the standard error of its natural log — SE(ln effect) = (ln(upper 95% CI) - ln(lower 95% CI)) / 3.92",
        studiesSectionTitle: "Studies",
        studyLabelLabel: "Study",
        effectLabel: "Effect",
        seLabel: "Standard error (SE)",
        addStudy: "Add study",
        removeRow: "Remove",
        emptyState: "Add at least two studies (SE > 0, effect > 0 for ratio measures) to see results",
        validationError:
          "Check your inputs: at least two studies are required, every standard error must be greater than 0, and ratio-measure effects must be greater than 0",
        tableStudy: "Study",
        tableEffect: "Effect",
        tableCi: "95% CI",
        tableWeightFixed: "Weight (fixed)",
        tableWeightRandom: "Weight (random)",
        fixedEffectLabel: "Fixed-Effect Pooled Estimate",
        fixedEffectSub: "z = {z}, p = {p}",
        randomEffectLabel: "Random-Effects Pooled Estimate (DerSimonian-Laird)",
        randomEffectSub: "z = {z}, p = {p}",
        qLabel: "Cochran's Q",
        qSub: "df = {df}, p = {p}",
        i2Label: "I\u00b2 (heterogeneity)",
        tau2Label: "Tau\u00b2",
        heterogeneityLow: "low heterogeneity",
        heterogeneityModerate: "moderate heterogeneity",
        heterogeneitySubstantial: "substantial heterogeneity",
        heterogeneityConsiderable: "considerable heterogeneity",
        forestPlotTitle: "Forest Plot",
        forestPlotPooledFixed: "Pooled (fixed)",
        forestPlotPooledRandom: "Pooled (random)",
        interpSummary:
          "Pooling {k} studies gives a fixed-effect estimate of {fixedEffect} (95% CI {fixedLower} to {fixedUpper}) and a DerSimonian-Laird random-effects estimate of {randomEffect} (95% CI {randomLower} to {randomUpper}). Heterogeneity is {heterogeneityLevel} (I\u00b2 = {i2}%, Cochran's Q p = {qp}).",
        interpDetail1:
          "When I\u00b2 is low and Q's p-value is not significant, the fixed- and random-effects estimates are usually very close, since there's little evidence of genuine between-study variation beyond chance. As I\u00b2 rises, the random-effects model widens the confidence interval and shifts weight away from very precise (large) studies toward a more balanced average across studies.",
        interpDetail2:
          "By convention (Higgins & Thompson, 2002), I\u00b2 around 25% is often described as low, around 50% as moderate, and around 75% or more as substantial heterogeneity — but these are rough guides, not fixed thresholds, and should be interpreted alongside the forest plot and study characteristics, not read off in isolation.",
      },
    },
  },
  ko: {
    appName: "EpiPlus",
    appTagline: "역학·생물통계 보완 계산기 모음",
    nav: {
      samplingdesign: "표본설계",
    },
    common: {
      loadExample: "예제 불러오기",
      reset: "초기화",
      showMore: "자세히 보기",
      showLess: "접기",
      formula: "공식",
      interpretation: "해석",
      note: "참고",
      undefined: "정의 불가",
      disclaimer:
        "이 도구는 역학 연구 및 교육 목적으로 제공됩니다. 논문 등 출판용 분석을 위한 전문 통계 상담을 대체하지 않습니다.",
    },
    errorBoundary: {
      title: "문제가 발생했습니다",
      message:
        "이 모듈을 불러오는 중 오류가 발생했습니다. 대부분 네트워크 연결이 일시적으로 끊기는 등 일시적인 문제입니다. 다시 시도하거나, 다른 메뉴로 이동했다가 돌아와 보세요.",
      retryButton: "다시 시도",
    },
    samplingdesign: {
      title: "표본설계",
      subtitle:
        "클러스터 및 층화 표본설계를 위한 계산기, 클러스터링으로 인한 설계효과(분산 팽창) 포함",
      subnav: {
        designEffect: "설계효과",
        clusterSampleSize: "클러스터 표본크기",
        stratifiedSampleSize: "층화 표본크기",
      },
      designEffect: {
        heading: "설계효과 (Design Effect, 클러스터 표본추출)",
        formulaDeff: "DEFF",
        formulaDeffExpr: "= 1 + (m - 1) x ICC",
        formulaNeff: "n_eff",
        formulaNeffExpr: "= n / DEFF",
        formulaAdjustedN: "n_cluster",
        formulaAdjustedNExpr: "= n_individual x DEFF",
        formulaSource: "출처",
        formulaSourceExpr:
          "Kish, L. (1965). Survey Sampling. Wiley. Donner, A. & Klar, N. (2000). Design and Analysis of Cluster Randomization Trials in Health Research.",
        input: {
          avgClusterSizeLabel: "평균 클러스터 크기 (m)",
          avgClusterSizeHint: "클러스터당 평균 대상자 수",
          iccLabel: "급내상관계수 (ICC / rho)",
          iccHint: "0에서 1 사이의 값; 클수록 클러스터 내 유사성이 높음을 의미",
          sectionEffectiveTitle: "유효 표본크기 (선택)",
          nominalSampleSizeLabel: "수집된 표본크기 (명목)",
          nominalSampleSizeHint: "클러스터 설계 하에서 실제로 수집한 총 표본크기",
          sectionAdjustedTitle: "클러스터 보정 표본크기 (선택)",
          individualSampleSizeLabel: "개별무작위 표본크기",
          individualSampleSizeHint: "단순/개별 무작위 표본추출 시 필요한 표본크기",
        },
        emptyState:
          "유효한 평균 클러스터 크기(> 0)와 ICC(0-1)를 입력하면 결과가 표시됩니다",
        deffLabel: "설계효과",
        deffSub: "m = {m}, ICC = {icc}",
        effectiveSampleSizeLabel: "유효 표본크기",
        effectiveSampleSizeSub: "수집 {nominal} / DEFF {deff}",
        adjustedSampleSizeLabel: "클러스터 보정 표본크기",
        adjustedSampleSizeSub: "개별 {individual} x DEFF {deff}",
        interpSummary:
          "평균 클러스터 크기 {m}, ICC {icc}일 때 설계효과는 {deff}입니다.",
        interpDetail1:
          "설계효과(DEFF)는 단순무작위 표본추출 대비 클러스터링이 추정량의 분산을 얼마나 팽창시키는지를 나타냅니다. DEFF가 2.0이라는 것은 클러스터가 없는(SRS) 설계와 동일한 정밀도를 얻기 위해 두 배의 관측치가 필요하다는 뜻입니다.",
        interpDetail2:
          "ICC가 작더라도 평균 클러스터 크기가 크면 설계효과가 커질 수 있습니다. DEFF는 ICC 하나만이 아니라 두 값의 조합에 의해 결정되기 때문입니다. 유효 표본크기를 통해 클러스터 자료가 실제로 제공하는 독립적인 정보량을 확인하거나, 클러스터 보정 표본크기를 통해 개별무작위 표본크기 추정치를 클러스터 설계에 맞게 보정할 수 있습니다.",
      },
      clusterSampleSize: {
        heading: "클러스터 표본크기",
        formulaNCluster: "n_cluster",
        formulaNClusterExpr: "= n_srs x DEFF",
        formulaClusters: "클러스터 수",
        formulaClustersExpr: "= ceil(n_cluster / m)",
        formulaSource: "출처",
        formulaSourceExpr:
          "Kish, L. (1965). Survey Sampling. Wiley. Lemeshow, S. et al. (1990). Adequacy of Sample Size in Health Studies. WHO / Wiley.",
        input: {
          srsSampleSizeLabel: "SRS 표본크기 (n0)",
          srsSampleSizeHint: "단순/개별 무작위 표본추출 시 필요한 표본크기",
          avgClusterSizeLabel: "평균 클러스터 크기 (m)",
          avgClusterSizeHint: "클러스터당 평균 대상자 수",
          iccLabel: "급내상관계수 (ICC / rho)",
          iccHint: "0에서 1 사이의 값; 클수록 클러스터 내 유사성이 높음을 의미",
        },
        emptyState:
          "유효한 SRS 표본크기(> 0), 평균 클러스터 크기(> 0), ICC(0-1)를 입력하면 결과가 표시됩니다",
        deffLabel: "설계효과",
        deffSub: "m = {m}, ICC = {icc}",
        clusterAdjustedSampleSizeLabel: "클러스터 보정 표본크기",
        clusterAdjustedSampleSizeSub: "{srs} (SRS) x DEFF {deff}",
        numberOfClustersLabel: "필요한 클러스터 수",
        numberOfClustersSub: "ceil({adjusted} / 클러스터당 {m}명)",
        actualSampleSizeLabel: "실제 표본크기 (완전한 클러스터 기준)",
        actualSampleSizeSub: "{clusters}개 클러스터 x 클러스터당 {m}명",
        interpSummary:
          "평균 클러스터 크기 {m}에서 설계효과 보정 표본크기 {adjusted}에 도달하려면 최소 {clusters}개의 클러스터가 필요하며, 실제 표본크기는 {actual}이 됩니다.",
        interpDetail1:
          "클러스터 단위로 표본을 추출해야 하므로 실제 확보되는 표본크기는 설계효과 보정 목표치보다 약간 커지는 것이 일반적입니다. 이는 수정해야 할 반올림 오차가 아니라 클러스터 표본추출의 정상적인 특성입니다.",
        interpDetail2:
          "이 계산기는 클러스터 크기가 대체로 균일하다고 가정합니다(평균 m). 실제로 클러스터 크기 편차가 크다면 m을 평균값으로 간주하고, 예상보다 작은 클러스터에 대비해 약간 여유 있게 표본을 확보하는 것이 좋습니다.",
      },
      stratifiedSampleSize: {
        heading: "층화 표본크기 (표본 배분)",
        methodLabel: "배분 방법",
        methodEqual: "균등 배분",
        methodProportional: "비례 배분",
        methodNeyman: "네이만(최적) 배분",
        formulaEqual: "균등",
        formulaEqualExpr: "n_h = n / L",
        formulaProportional: "비례",
        formulaProportionalExpr: "n_h = n x (N_h / N)",
        formulaNeyman: "네이만",
        formulaNeymanExpr: "n_h = n x (N_h S_h) / sum(N_h S_h)",
        formulaSource: "출처",
        formulaSourceExpr:
          "Cochran, W. G. (1977). Sampling Techniques, 3rd ed. Wiley, Ch. 5. Neyman, J. (1934). J. Royal Statistical Society 97(4): 558-625.",
        input: {
          totalSampleSizeLabel: "총 표본크기 (n)",
          totalSampleSizeHint: "각 층에 배분할 고정된 총 표본크기",
          strataTitle: "층(Strata)",
          strataLabelLabel: "층 이름",
          populationSizeLabel: "층별 모집단 크기 (N_h)",
          stdDevLabel: "층별 표준편차 (S_h)",
          stdDevHint: "네이만 배분에서만 필요",
          addStratum: "층 추가",
          removeStratum: "삭제",
        },
        emptyState:
          "유효한 총 표본크기(> 0)와 모집단 크기(> 0)를 가진 층을 하나 이상 입력하면 결과가 표시됩니다",
        neymanMissingStdDev:
          "네이만 배분에는 모든 층에 대해 0보다 큰 표준편차가 필요합니다",
        tableLabel: "층",
        tablePopulation: "모집단 (N_h)",
        tableWeight: "가중치",
        tableSampleSize: "배분 표본크기 (n_h)",
        tableTotal: "합계",
        allocatedTotalNote:
          "배분된 합계: {allocated} (목표: {target}). 목표치와의 작은 차이는 각 층을 정수로 반올림한 데서 발생합니다.",
        interpSummary:
          "{strata}개 층(총 모집단 {population})에 {method} 방식으로 배분하면, 목표 표본크기 {target}이 아래와 같이 나뉩니다.",
        interpDetail1:
          "비례 배분은 각 층의 모집단 비중에 비례하여 표본을 배분합니다. 네이만 배분은 여기에 더해 규모가 크고 변동성이 큰 층에서 더 많이 표본을 추출하여, 동일한 총 표본크기에서 추정치의 전체 분산을 최소화합니다.",
        interpDetail2:
          "모든 층의 표준편차가 동일하다면 네이만 배분은 비례 배분과 수학적으로 동일해집니다.",
      },
    },
    populationburden: {
      title: "인구집단 부담 지표",
      subtitle: "DALY를 포함한 인구집단 건강 요약 지표 계산기",
      subnav: {
        daly: "DALY",
        paf: "PAF",
        ageStandardization: "연령표준화",
      },
      daly: {
        heading: "DALY (장애보정생존연수)",
        formulaDaly: "DALY",
        formulaDalyExpr: "= YLL + YLD",
        formulaYll: "YLL",
        formulaYllExpr: "= n x L1 (사망자 수 x 기준 기대여명)",
        formulaYldIncidence: "YLD (발생률 기반)",
        formulaYldIncidenceExpr: "= I x DW x L2 (환자 수 x 장애가중치 x 이환기간)",
        formulaYldPrevalence: "YLD (유병률 기반)",
        formulaYldPrevalenceExpr: "= P x DW (환자 수 x 장애가중치)",
        formulaSource: "출처",
        formulaSourceExpr:
          "Murray, C.J.L. & Lopez, A.D. (1996). The Global Burden of Disease. WHO/World Bank/Harvard. WHO (2020), GHE 2019 DALY methods. 연령가중치·할인 미적용 (GBD 2010년판 이후 방식).",
        yllSectionTitle: "생존손실연수 (YLL) — 원인/연령군별",
        yllLabelLabel: "원인 / 연령군",
        yllDeathsLabel: "사망자 수 (n)",
        yllLifeExpectancyLabel: "사망 당시 연령의 기준 기대여명 (L1, 년)",
        addYllRow: "YLL 항목 추가",
        yldSectionTitle: "장애생존연수 (YLD) — 질환별",
        yldMethodLabel: "YLD 산출 방식",
        yldMethodIncidence: "발생률 기반 (환자 수 x DW x 이환기간)",
        yldMethodPrevalence: "유병률 기반 (환자 수 x DW)",
        yldLabelLabel: "질환",
        yldCasesLabel: "환자 수",
        yldCasesHint: "위 방식에 따라 신규(발생) 또는 기존(유병) 환자 수",
        yldDwLabel: "장애가중치 (DW, 0-1)",
        yldDurationLabel: "평균 이환기간 (년)",
        yldDurationHint: "발생률 기반 방식에서만 필요",
        addYldRow: "YLD 항목 추가",
        removeRow: "삭제",
        emptyState: "유효한 YLL 또는 YLD 항목을 하나 이상 입력하면 결과가 표시됩니다",
        neymanStyleError:
          "입력값을 확인해주세요: 사망자·환자 수는 0 이상, 기대여명·이환기간은 0보다 커야 하며, 장애가중치는 0에서 1 사이여야 합니다",
        totalYllLabel: "총 YLL",
        totalYllSub: "{n}개 항목 합계",
        totalYldLabel: "총 YLD",
        totalYldSub: "{n}개 항목 합계, {method} 방식",
        totalDalyLabel: "총 DALY",
        totalDalySub: "YLL {yll} + YLD {yld}",
        interpSummary:
          "이 인구집단에서는 약 {daly} DALY의 건강손실이 추정됩니다: 조기사망으로 인한 생존손실 {yll}년(YLL)과 장애 상태로 살아간 {yld}년(YLD)입니다.",
        interpDetail1:
          "1 DALY는 건강한 삶 1년의 손실을 의미합니다. YLL 비중이 큰 경우는 대체로 조기사망이 주된 부담(교통사고, 뇌졸중 등 YLL 우세 질환)임을, YLD 비중이 큰 경우는 비치명적이지만 장애를 유발하는 부담(우울증, 요통 등 YLD 우세 질환)임을 뜻합니다.",
        interpDetail2:
          "이 계산기는 현재 GBD/WHO 방법론(연령가중치·미래연수 할인 미적용)을 따릅니다. 기준 기대여명은 실제 해당 지역의 기대여명이 아니라 GBD 기준 생명표와 같은 표준 생명표 값을 사용해야, 동일 연령의 사망이 어디서나 동일하게 계산됩니다.",
      },
      paf: {
        heading: "PAF (인구기여위험분율)",
        formulaPaf: "PAF (Levin)",
        formulaPafExpr: "= Pe(RR - 1) / [1 + Pe(RR - 1)]",
        formulaPe: "Pe",
        formulaPeExpr: "= 인구집단 내 노출 유병률",
        formulaRr: "RR",
        formulaRrExpr: "= 비노출군 대비 노출군의 상대위험도",
        formulaSource: "출처",
        formulaSourceExpr:
          "Levin, M.L. (1953). The occurrence of lung cancer in man. Acta Unio Int Contra Cancrum, 9(3): 531-541.",
        modeLabel: "입력 방식",
        modeDirect: "직접 입력 (Pe, RR)",
        modeTable2x2: "2x2 분할표 (노출 x 질병)",
        input: {
          exposurePrevalenceLabel: "노출 유병률 (Pe)",
          exposurePrevalenceHint: "위험요인에 노출된 인구 비율, 0에서 1 사이",
          relativeRiskLabel: "상대위험도 (RR)",
          relativeRiskHint: "비노출군 대비 노출군의 질병 위험 비율",
          exposedCasesLabel: "노출·질병 있음 (a)",
          exposedNonCasesLabel: "노출·질병 없음 (b)",
          unexposedCasesLabel: "비노출·질병 있음 (c)",
          unexposedNonCasesLabel: "비노출·질병 없음 (d)",
        },
        emptyState:
          "유효한 노출 유병률(0-1)과 상대위험도(0보다 큼), 또는 완전한 2x2 분할표를 입력하면 결과가 표시됩니다",
        validationError:
          "입력값을 확인해주세요: 노출 유병률은 0에서 1 사이, 상대위험도는 0보다 커야 하며, (2x2 표의 경우) 모든 칸은 0 이상이어야 하고 각 노출군에 최소 1명, 비노출 질병군에 최소 1명이 있어야 합니다",
        derivedPeLabel: "산출된 Pe",
        derivedPeSub: "(a + b) / 전체",
        derivedRrLabel: "산출된 RR",
        derivedRrSub: "[a / (a+b)] / [c / (c+d)]",
        pafLabel: "PAF",
        pafSub: "Pe = {pe}, RR = {rr}",
        pafPercentLabel: "기여 비율",
        protectiveWarning:
          "RR < 1: 이 요인은 보호요인으로 보입니다. 음수 PAF는 이 요인을 제거하면 오히려 질병 빈도가 감소가 아니라 증가할 것으로 예상됨을 의미합니다.",
        interpSummary:
          "노출 유병률 {pe}, 상대위험도 {rr}일 때, 이 인구집단에서 질병의 약 {pafPercent}가 해당 노출에 기인하는 것으로 추정됩니다 — 노출이 없었다면 발생하지 않았을 것으로 예상되는 환자 비율입니다.",
        interpDetail1:
          "Levin 공식은 노출-질병 관계에 교란이 없다고 가정합니다. 입력한 상대위험도가 교란변수 보정 없이 산출된 조위험도(crude RR)라면, 결과 PAF에 편향이 있을 수 있습니다.",
        interpDetail2:
          "상대위험도가 크지 않더라도 노출 유병률이 높으면, 상대위험도는 크지만 드문 노출보다 PAF가 더 클 수 있습니다 — PAF는 연관성의 강도와 노출의 흔함을 동시에 반영합니다.",
      },
      ageStandardization: {
        heading: "연령표준화",
        methodLabel: "방법",
        methodDirect: "직접법",
        methodIndirect: "간접법",
        formulaDirect: "직접법",
        formulaDirectExpr: "= Σ기대사망_i / Σ표준인구_i, 기대사망_i = (연구집단 사망_i / 연구집단 인구_i) x 표준인구_i",
        formulaIndirectSmr: "SMR",
        formulaIndirectSmrExpr: "= 관찰사망 / Σ기대사망_i, 기대사망_i = 표준율_i x 연구집단 인구_i",
        formulaIndirectRate: "간접표준화율",
        formulaIndirectRateExpr: "= SMR x 기준(표준) 조율",
        formulaSource: "출처",
        formulaSourceExpr:
          "Lilienfeld, D.E. & Stolley, P.D. (1994). Foundations of Epidemiology. Oxford University Press. NC SCHS Statistical Primer 13-2. Health Knowledge, \"Standardisation\" (Hennekens & Buring, 1987).",
        directSectionTitle: "연령군별 — 연구집단 사망자 수, 연구집단 인구, 표준인구",
        directLabelLabel: "연령군",
        directStudyDeathsLabel: "연구집단 사망자 수",
        directStudyPopulationLabel: "연구집단 인구",
        directStandardPopulationLabel: "표준인구",
        addDirectRow: "연령군 추가",
        indirectSectionTitle: "연령군별 — 표준율, 연구집단 인구",
        indirectLabelLabel: "연령군",
        indirectStandardRateLabel: "표준(기준) 율",
        indirectStudyPopulationLabel: "연구집단 인구",
        addIndirectRow: "연령군 추가",
        observedDeathsLabel: "관찰 사망자 수 (연구집단 전체)",
        referenceCrudeRateLabel: "기준 조율 (선택)",
        referenceCrudeRateHint: "표준(기준) 인구의 전체 조율; 비워두면 SMR만 표시됩니다",
        removeRow: "삭제",
        emptyState: "유효한 연령군을 하나 이상 입력하면 결과가 표시됩니다",
        validationError:
          "입력값을 확인해주세요: 연구집단·표준인구와 율은 0 이상이어야 하고(직접법에서는 각 연령군의 연구집단 인구가 0보다 커야 함), 총 기대사망자 수는 0보다 커야 합니다",
        standardizedRateLabel: "직접표준화율",
        standardizedRateSub: "기대사망 {expected} / 표준인구 {pop}",
        smrLabel: "SMR",
        smrSub: "관찰 {observed} / 기대 {expected}",
        smrPercentLabel: "SMR (%)",
        indirectRateLabel: "간접표준화율",
        indirectRateSub: "SMR {smr} x 기준율 {ref}",
        interpSummaryDirect:
          "이 인구집단의 연령별 율을 표준인구에 적용하면 직접표준화율 {rate}가 됩니다 — 이 인구집단이 표준인구와 같은 연령구조를 가졌다면 나타났을 율입니다.",
        interpDetailDirect:
          "모든 인구집단이 동일한 표준인구를 기준으로 표준화되므로, 직접표준화율은 (조율과 달리) 연령구조가 다른 인구집단 간에도 타당하게 비교할 수 있습니다.",
        interpSummaryIndirect:
          "이 인구집단에서는 관찰 사망자 수 {observed}명, 기준 인구의 연령별 율을 적용했을 때의 기대 사망자 수 {expected}명으로, SMR은 {smrPercent}입니다.",
        interpDetailIndirect:
          "SMR이 100%를 넘으면 기준율 대비 사망이 더 많이 발생했음을, 100% 미만이면 더 적게 발생했음을 뜻합니다. 직접표준화율과 달리, 서로 다른 연구집단의 SMR은 각자 자신의 연령구조로 가중된 값이므로 SMR끼리 직접 비교해서는 안 됩니다.",
      },
    },
    clinical: {
      title: "임상·효과 지표",
      subtitle: "백신 효과, 치료 이득/위해, 효과크기 계산기",
      subnav: {
        vaccineEffectiveness: "백신 효과",
        nnt: "NNT / NNH",
        smd: "SMD",
      },
      vaccineEffectiveness: {
        heading: "백신 효과 (VE)",
        formulaVe: "VE",
        formulaVeExpr: "= 1 - RR = (ARu - ARv) / ARu",
        formulaRr: "RR",
        formulaRrExpr: "= ARv / ARu",
        formulaSource: "출처",
        formulaSourceExpr:
          "CDC/WHO 백신 효과 관련 지침에서 공통으로 사용되는 정의; MetricGate Vaccine Efficacy Calculator 문서 및 Kissler et al., arXiv:2212.11679로 교차 확인.",
        modeLabel: "입력 방식",
        modeRates: "직접 입력 (발병률)",
        modeCounts: "환자 수",
        input: {
          arVaccinatedLabel: "발병률, 접종군 (ARv)",
          arVaccinatedHint: "접종군에서 결과(질병)가 발생한 비율, 0에서 1 사이",
          arUnvaccinatedLabel: "발병률, 비접종군 (ARu)",
          arUnvaccinatedHint: "비접종군에서 결과(질병)가 발생한 비율, 0에서 1 사이",
          casesVaccinatedLabel: "환자 수, 접종군",
          totalVaccinatedLabel: "전체 인원, 접종군",
          casesUnvaccinatedLabel: "환자 수, 비접종군",
          totalUnvaccinatedLabel: "전체 인원, 비접종군",
        },
        emptyState:
          "유효한 발병률(0-1) 또는 환자 수(환자 수 ≤ 전체 인원, ARu > 0)를 입력하면 결과가 표시됩니다",
        validationError:
          "입력값을 확인해주세요: 발병률은 0에서 1 사이, 전체 인원은 0보다 커야 하며, 환자 수는 해당 군의 전체 인원을 초과할 수 없고, 비접종군의 발병률은 0보다 커야 합니다",
        derivedArVaccinatedLabel: "산출된 ARv",
        derivedArUnvaccinatedLabel: "산출된 ARu",
        veLabel: "백신 효과",
        veSub: "ARv = {arv}, ARu = {aru}, RR = {rr}",
        negativeWarning:
          "VE가 음수입니다: 이 데이터에서는 접종군의 발병률이 비접종군보다 높았습니다.",
        interpSummary:
          "접종군 발병률 {arv}, 비접종군 발병률 {aru}일 때, 추정 백신 효과는 {vePercent}입니다.",
        interpDetail1:
          "VE는 비접종군 대비 접종군에서 질병 위험이 비례적으로 얼마나 감소했는지를 나타냅니다. VE 90%는 이 데이터에서 접종군의 위험이 90% 낮았음을 의미합니다.",
        interpDetail2:
          "이 추정치는 접종군과 비접종군이 노출·진단 등 다른 조건에서 비교 가능하다고 가정합니다. 관찰 연구 기반 추정치는 교란, 검사 편차, 시간에 따른 면역 감소 등으로 편향될 수 있습니다.",
      },
      nnt: {
        heading: "NNT / NNH",
        formulaArr: "ARR",
        formulaArrExpr: "= CER - EER",
        formulaNnt: "NNT",
        formulaNntExpr: "= 1 / ARR (올림), ARR > 0일 때",
        formulaNnh: "NNH",
        formulaNnhExpr: "= 1 / |ARR| (올림), ARR < 0일 때",
        formulaSource: "출처",
        formulaSourceExpr:
          "Centre for Evidence-Based Medicine, University of Oxford, \"Number Needed to Treat (NNT)\". ClinCalc, \"NNT Calculator\".",
        input: {
          controlEventRateLabel: "대조군 사건 발생률 (CER)",
          controlEventRateHint: "대조/비교군에서 사건이 발생한 비율, 0에서 1 사이",
          experimentalEventRateLabel: "실험군 사건 발생률 (EER)",
          experimentalEventRateHint: "치료/실험군에서 사건이 발생한 비율, 0에서 1 사이",
        },
        emptyState: "유효한 대조군·실험군 사건 발생률(0-1)을 입력하면 결과가 표시됩니다",
        validationError: "입력값을 확인해주세요: 두 사건 발생률 모두 0에서 1 사이여야 합니다",
        arrLabel: "절대위험감소 (ARR)",
        arrSub: "CER {cer} - EER {eer}",
        nntLabel: "치료필요수 (NNT)",
        nntSub: "1 / ARR {arr}, 올림",
        nnhLabel: "위해필요수 (NNH)",
        nnhSub: "1 / |ARR| {ari}, 올림",
        noneLabel: "차이 없음",
        noneSub: "대조군과 실험군의 사건 발생률이 같습니다 — NNT/NNH를 정의할 수 없습니다",
        interpSummaryBenefit:
          "대조군 사건 발생률 {cer}, 실험군 사건 발생률 {eer}일 때, 대조군 대비 추가로 1명이 이득(사건 회피)을 보려면 약 {nnt}명을 치료해야 합니다.",
        interpSummaryHarm:
          "대조군 사건 발생률 {cer}, 실험군 사건 발생률 {eer}일 때, 대조군 대비 추가로 1명이 해(사건 발생)를 입으려면 약 {nnh}명이 치료에 노출되어야 합니다.",
        interpDetail1:
          "NNT와 NNH는 항상 다음 정수로 올림 처리합니다. 소수점 단위의 사람을 치료하거나 해칠 수는 없기 때문입니다.",
        interpDetail2:
          "NNT/NNH는 기저(대조군) 위험도에 따라 달라집니다. 동일한 상대효과라도 저위험군에서는 고위험군보다 NNT가 훨씬 커지므로, NNT/NNH는 기저위험도와 관찰기간이 비슷한 연구끼리만 비교해야 합니다.",
      },
      smd: {
        heading: "SMD (표준화평균차)",
        formulaPooledSd: "합동표준편차",
        formulaPooledSdExpr: "= sqrt[((n1-1) s1^2 + (n2-1) s2^2) / (n1+n2-2)]",
        formulaCohensD: "Cohen's d",
        formulaCohensDExpr: "= (평균1 - 평균2) / 합동표준편차",
        formulaHedgesG: "Hedges' g",
        formulaHedgesGExpr: "= J(m) x Cohen's d, J(m) = 1 - 3/(4m-1), m = n1+n2-2",
        formulaSource: "출처",
        formulaSourceExpr:
          "Borenstein, M. et al. (2009). Introduction to Meta-Analysis. Wiley. Hedges, L.V. (1983). Biometrics. Campbell Collaboration, Effect Size Calculator.",
        input: {
          group1Title: "그룹 1",
          group2Title: "그룹 2",
          meanLabel: "평균",
          sdLabel: "표준편차",
          nLabel: "표본크기 (n)",
        },
        emptyState:
          "두 그룹 모두 유효한 평균, 표준편차(0 이상), 표본크기(n≥2)를 입력하면 결과가 표시됩니다",
        validationError:
          "입력값을 확인해주세요: 각 그룹의 표본크기는 최소 2 이상, 표준편차는 0 이상이어야 하며, 합동표준편차는 0보다 커야 합니다",
        pooledSdLabel: "합동표준편차",
        cohensDLabel: "Cohen's d",
        cohensDSub: "(평균1 {m1} - 평균2 {m2}) / 합동표준편차 {psd}",
        hedgesGLabel: "Hedges' g (소표본 보정)",
        hedgesGSub: "J({m}) = {j}",
        magnitudeSmall: "작은 효과",
        magnitudeMedium: "중간 효과",
        magnitudeLarge: "큰 효과",
        magnitudeNegligible: "미미한 효과",
        interpSummary:
          "두 그룹 간 표준화평균차는 Cohen's d = {d}(Cohen의 관례적 기준으로 {magnitude})이며, 소표본 보정된 Hedges' g로는 {g}입니다.",
        interpDetail1:
          "Cohen의 관례적 기준: |d| 약 0.2는 작은 효과, 약 0.5는 중간 효과, 약 0.8 이상은 큰 효과입니다. 이는 고정된 절대 기준이 아니라 대략적인 경험칙이며, 분야에 따라 적절성이 달라질 수 있습니다.",
        interpDetail2:
          "Hedges' g는 소표본 보정을 적용한 값으로, 어느 한쪽 그룹이라도 표본크기가 약 20명 미만이면 Cohen's d보다 Hedges' g를 사용하는 것이 권장됩니다. Cohen's d는 소표본에서 실제 효과크기를 과대추정하는 경향이 있기 때문입니다.",
      },
    },
    statisticalmodeling: {
      title: "통계적 모델링",
      subtitle: "발생률비(IRR)와 베이지안 진단검사 성능 계산기",
      subnav: {
        poissonRegression: "포아송 회귀 (IRR)",
        bayesianDiagnostic: "베이지안 진단검사",
      },
      poissonRegression: {
        heading: "포아송 회귀 (발생률비, IRR)",
        formulaRate: "발생률",
        formulaRateExpr: "= 사건 수 / 관찰인년(person-time)",
        formulaIrr: "IRR",
        formulaIrrExpr: "= 그룹 발생률 / 기준군 발생률",
        formulaCi: "95% 신뢰구간",
        formulaCiExpr: "= exp[ln(IRR) ± 1.96 × sqrt(1/그룹 사건수 + 1/기준군 사건수)]",
        formulaSource: "출처",
        formulaSourceExpr:
          "StatsDirect, \"Poisson Regression (Incidence Rate Ratio)\". MetricGate, \"Incidence Rate Ratio Calculator\" 및 \"Incidence Density Ratio Calculator\".",
        note: "단일 범주형 노출변수를 사용하는 포아송 모형은 포화모형(saturated model)이라, 최대우도추정치가 각 그룹의 관찰된 발생률과 정확히 일치합니다 — 따라서 반복 적합 과정 없이 계산됩니다.",
        groupsSectionTitle: "그룹 — 사건 수와 관찰인년",
        groupLabelLabel: "그룹",
        eventsLabel: "사건 수",
        personTimeLabel: "관찰인년 (person-time)",
        referenceLabel: "기준군",
        setReference: "기준군으로 설정",
        addGroup: "그룹 추가",
        removeRow: "삭제",
        emptyState: "최소 2개 그룹(사건 수 ≥ 0, 관찰인년 > 0)을 입력하고 기준군을 선택하면 결과가 표시됩니다",
        validationError:
          "입력값을 확인해주세요: 각 그룹의 관찰인년은 0보다 커야 하고 사건 수는 0 이상이어야 하며, 기준군은 사건이 최소 1건 있어야 하고, 그룹은 최소 2개 필요합니다",
        tableGroup: "그룹",
        tableRate: "발생률",
        tableIrr: "IRR",
        tableCi: "95% CI",
        referenceTag: "(기준)",
        undefinedCi: "정의되지 않음 (사건 0건)",
        interpSummary:
          "{refLabel}(발생률 {refRate})을 기준으로 할 때, 이번 비교에서 IRR이 가장 높은 그룹과 가장 낮은 그룹은 각각 {highLabel}(IRR {highIrr})와 {lowLabel}(IRR {lowIrr})입니다.",
        interpDetail1:
          "IRR=1은 기준군과 차이가 없음을, IRR>1은 더 높은 발생률을, IRR<1은 더 낮은 발생률을 의미합니다. 95% 신뢰구간이 1을 포함하지 않으면 유의수준 5%에서 기준군과의 차이가 우연만으로 설명되기 어렵다고 볼 수 있습니다.",
        interpDetail2:
          "이 모형은 각 그룹 내에서 관찰 기간 동안 사건 발생률이 일정하고, 사건들이 서로 독립적(과대산포 없음)이라고 가정합니다. 그룹 내 사건 수의 분산이 평균을 크게 초과한다면 음이항모형(negative binomial) 사용을 고려해야 합니다.",
      },
      bayesianDiagnostic: {
        heading: "베이지안 진단검사 (PPV / NPV)",
        formulaPpv: "PPV",
        formulaPpvExpr: "= (Se × 유병률) / (Se × 유병률 + (1-Sp) × (1-유병률))",
        formulaNpv: "NPV",
        formulaNpvExpr: "= (Sp × (1-유병률)) / (Sp × (1-유병률) + (1-Se) × 유병률)",
        formulaLrPos: "LR+",
        formulaLrPosExpr: "= Se / (1-Sp)",
        formulaLrNeg: "LR-",
        formulaLrNegExpr: "= (1-Se) / Sp",
        formulaSource: "출처",
        formulaSourceExpr:
          "임상역학 교육자료에서 공통으로 사용되는 정의; VarsityTutors \"Sensitivity, Specificity, PPV & NPV\" 및 \"Use Bayes' theorem in diagnostic contexts\"로 교차 확인.",
        modeLabel: "입력 방식",
        modeDirect: "직접 입력 (Se, Sp, 유병률)",
        modeTable2x2: "2×2 분할표 (검사결과 × 질병상태)",
        input: {
          sensitivityLabel: "민감도 (Se)",
          sensitivityHint: "질병이 있는 사람 중 양성으로 나온 비율, 0에서 1 사이",
          specificityLabel: "특이도 (Sp)",
          specificityHint: "건강한 사람 중 음성으로 나온 비율, 0에서 1 사이",
          prevalenceLabel: "유병률",
          prevalenceHint: "검사 대상 인구집단에서 질병의 검사 전 확률, 0에서 1 사이",
          tpLabel: "진양성 (TP)",
          fnLabel: "위음성 (FN)",
          tnLabel: "진음성 (TN)",
          fpLabel: "위양성 (FP)",
        },
        emptyState: "유효한 Se/Sp/유병률(0-1) 또는 완전한 2×2 분할표를 입력하면 결과가 표시됩니다",
        validationError:
          "입력값을 확인해주세요: 민감도·특이도·유병률은 0에서 1 사이여야 하고(특이도는 1 미만), 2×2 표의 경우 질병군과 건강군이 각각 최소 1명 이상 있어야 합니다",
        derivedSeLabel: "산출된 Se",
        derivedSpLabel: "산출된 Sp",
        derivedPrevLabel: "산출된 유병률",
        ppvLabel: "PPV",
        ppvSub: "Se = {se}, Sp = {sp}, 유병률 = {prev}",
        npvLabel: "NPV",
        npvSub: "Se = {se}, Sp = {sp}, 유병률 = {prev}",
        lrPosLabel: "LR+",
        lrNegLabel: "LR-",
        interpSummary:
          "민감도 {se}, 특이도 {sp}, 유병률 {prev}일 때, 양성 결과는 질병 확률 {ppv}(PPV)를, 음성 결과는 비질병 확률 {npv}(NPV)를 나타냅니다.",
        interpDetail1:
          "민감도와 특이도는 검사 자체의 특성으로 인구집단이 달라져도 대체로 일정합니다. 반면 PPV와 NPV는 유병률에 크게 좌우됩니다 — 같은 검사라도 저유병률 선별집단에서는 PPV가 훨씬 낮고, 고유병률 의뢰집단에서는 훨씬 높습니다.",
        interpDetail2:
          "가능도비(LR+, LR-)는 유병률에 의존하지 않아 여러 상황에 더 이식성 있게 적용할 수 있습니다. 경험칙으로 LR+가 10 이상이거나 LR-가 0.1 미만이면 검사 전 확률에서 검사 후 확률로 크고 임상적으로 결정적인 변화가 일어납니다.",
      },
    },
    metaanalysis: {
      title: "메타분석",
      subtitle: "연구별 효과크기 통합, 이질성, 포레스트 플롯 계산기",
      subnav: {
        metaAnalysis: "메타분석 (포레스트 플롯)",
      },
      metaAnalysis: {
        heading: "메타분석: 고정효과 & 랜덤효과",
        formulaFixed: "고정효과",
        formulaFixedExpr: "= Σ(wi yi) / Σwi, wi = 1/SEi²",
        formulaQ: "Cochran's Q",
        formulaQExpr: "= Σ[wi (yi - y_고정)²], df = k-1",
        formulaI2: "I²",
        formulaI2Expr: "= max(0, (Q-df)/Q) × 100%",
        formulaTau2: "Tau² (DerSimonian-Laird)",
        formulaTau2Expr: "= max(0, (Q-df)/C), C = Σwi - Σwi²/Σwi",
        formulaRandom: "랜덤효과",
        formulaRandomExpr: "= Σ(wi* yi) / Σwi*, wi* = 1/(SEi² + Tau²)",
        formulaSource: "출처",
        formulaSourceExpr:
          "DerSimonian, R. & Laird, N. (1986). Controlled Clinical Trials, 7(3): 177-188. Higgins, J.P.T. & Thompson, S.G. (2002). Statistics in Medicine, 21(11): 1539-1558. Cochrane Handbook, 9.4.3.1/9.5.4.",
        effectTypeLabel: "효과 측정치 종류",
        effectTypeDifference: "차이 (원척도, 예: 평균차)",
        effectTypeRatio: "비율 (예: OR / RR / HR)",
        effectTypeHint:
          "비율 측정치의 경우, 효과값(예: OR) 자체와 그 자연로그의 표준오차를 입력하세요 — SE(ln 효과) = (ln(95% 상한) - ln(95% 하한)) / 3.92",
        studiesSectionTitle: "연구",
        studyLabelLabel: "연구",
        effectLabel: "효과값",
        seLabel: "표준오차 (SE)",
        addStudy: "연구 추가",
        removeRow: "삭제",
        emptyState: "최소 2개 연구(SE > 0, 비율 측정치는 효과값 > 0)를 입력하면 결과가 표시됩니다",
        validationError:
          "입력값을 확인해주세요: 연구는 최소 2개 필요하고, 모든 표준오차는 0보다 커야 하며, 비율 측정치의 효과값은 0보다 커야 합니다",
        tableStudy: "연구",
        tableEffect: "효과값",
        tableCi: "95% CI",
        tableWeightFixed: "가중치 (고정)",
        tableWeightRandom: "가중치 (랜덤)",
        fixedEffectLabel: "고정효과 통합추정치",
        fixedEffectSub: "z = {z}, p = {p}",
        randomEffectLabel: "랜덤효과 통합추정치 (DerSimonian-Laird)",
        randomEffectSub: "z = {z}, p = {p}",
        qLabel: "Cochran's Q",
        qSub: "df = {df}, p = {p}",
        i2Label: "I² (이질성)",
        tau2Label: "Tau²",
        heterogeneityLow: "낮은 이질성",
        heterogeneityModerate: "중등도 이질성",
        heterogeneitySubstantial: "상당한 이질성",
        heterogeneityConsiderable: "심각한 이질성",
        forestPlotTitle: "포레스트 플롯",
        forestPlotPooledFixed: "통합 (고정)",
        forestPlotPooledRandom: "통합 (랜덤)",
        interpSummary:
          "{k}개 연구를 통합한 결과, 고정효과 추정치는 {fixedEffect}(95% CI {fixedLower}~{fixedUpper}), DerSimonian-Laird 랜덤효과 추정치는 {randomEffect}(95% CI {randomLower}~{randomUpper})입니다. 이질성은 {heterogeneityLevel}입니다(I² = {i2}%, Cochran's Q p = {qp}).",
        interpDetail1:
          "I²가 낮고 Q의 p값이 유의하지 않으면, 연구 간 실질적 차이에 대한 근거가 우연 이상으로 크지 않기 때문에 대체로 고정효과와 랜덤효과 추정치가 매우 비슷합니다. I²가 커질수록 랜덤효과 모형은 신뢰구간을 넓히고, 매우 정밀한(표본이 큰) 연구에 쏠린 가중치를 여러 연구에 걸쳐 좀 더 고르게 재배분합니다.",
        interpDetail2:
          "관례적으로(Higgins & Thompson, 2002) I²가 약 25%면 낮음, 약 50%면 중등도, 약 75% 이상이면 상당한 이질성으로 흔히 표현합니다 — 다만 이는 고정된 절대 기준이 아니라 대략적인 지침이므로, 단독으로 판단하기보다 포레스트 플롯과 연구별 특성을 함께 살펴 해석해야 합니다.",
      },
    },
  },
  fr: {
    appName: "EpiPlus",
    appTagline: "Suite de calculateurs complémentaires d'épidémiologie et de biostatistique",
    nav: {
      samplingdesign: "Plan d'échantillonnage",
    },
    common: {
      loadExample: "Charger un exemple",
      reset: "Réinitialiser",
      showMore: "Afficher plus",
      showLess: "Afficher moins",
      formula: "Formule",
      interpretation: "Interprétation",
      note: "Remarque",
      undefined: "indéfini",
      disclaimer:
        "Cet outil est destiné à des fins épidémiologiques et éducatives. Il ne remplace pas une consultation statistique professionnelle pour des analyses destinées à publication.",
    },
    errorBoundary: {
      title: "Une erreur s'est produite",
      message:
        "Ce module n'a pas pu se charger ou a rencontré une erreur inattendue. C'est généralement temporaire — par exemple, une coupure de connexion réseau pendant le chargement. Réessayez, ou changez de module puis revenez.",
      retryButton: "Réessayer",
    },
    samplingdesign: {
      title: "Plan d'échantillonnage",
      subtitle:
        "Calculateurs pour les plans d'échantillonnage en grappes et stratifiés, y compris l'effet de plan (inflation de variance) dû au regroupement",
      subnav: {
        designEffect: "Effet de plan",
        clusterSampleSize: "Taille d'échantillon en grappes",
        stratifiedSampleSize: "Taille d'échantillon stratifié",
      },
      designEffect: {
        heading: "Effet de plan (échantillonnage en grappes)",
        formulaDeff: "DEFF",
        formulaDeffExpr: "= 1 + (m - 1) x ICC",
        formulaNeff: "n_eff",
        formulaNeffExpr: "= n / DEFF",
        formulaAdjustedN: "n_grappe",
        formulaAdjustedNExpr: "= n_individuel x DEFF",
        formulaSource: "Source",
        formulaSourceExpr:
          "Kish, L. (1965). Survey Sampling. Wiley. Donner, A. & Klar, N. (2000). Design and Analysis of Cluster Randomization Trials in Health Research.",
        input: {
          avgClusterSizeLabel: "Taille moyenne de grappe (m)",
          avgClusterSizeHint: "Nombre moyen de personnes par grappe",
          iccLabel: "Corrélation intra-grappe (ICC / rho)",
          iccHint:
            "Valeur entre 0 et 1 ; plus elle est élevée, plus les individus au sein d'une grappe se ressemblent",
          sectionEffectiveTitle: "Taille d'échantillon effective (facultatif)",
          nominalSampleSizeLabel: "Taille d'échantillon nominale (collectée)",
          nominalSampleSizeHint:
            "Taille d'échantillon totale réellement collectée dans le plan en grappes",
          sectionAdjustedTitle: "Taille d'échantillon ajustée pour les grappes (facultatif)",
          individualSampleSizeLabel: "Taille d'échantillon en randomisation individuelle",
          individualSampleSizeHint:
            "Taille d'échantillon requise sous un plan d'échantillonnage aléatoire simple/individuel",
        },
        emptyState:
          "Saisissez une taille moyenne de grappe valide (> 0) et un ICC (0-1) pour voir les résultats",
        deffLabel: "Effet de plan",
        deffSub: "m = {m}, ICC = {icc}",
        effectiveSampleSizeLabel: "Taille d'échantillon effective",
        effectiveSampleSizeSub: "{nominal} collectés / DEFF {deff}",
        adjustedSampleSizeLabel: "Taille d'échantillon ajustée pour les grappes",
        adjustedSampleSizeSub: "{individual} (individuel) x DEFF {deff}",
        interpSummary:
          "Avec une taille moyenne de grappe de {m} et un ICC de {icc}, l'effet de plan est de {deff}.",
        interpDetail1:
          "L'effet de plan (DEFF) mesure dans quelle mesure le regroupement en grappes gonfle la variance d'un estimateur par rapport à un échantillonnage aléatoire simple. Un DEFF de 2,0 signifie qu'il faut deux fois plus d'observations pour atteindre la même précision qu'un plan sans grappes (EAS).",
        interpDetail2:
          "Même un ICC faible peut produire un effet de plan élevé lorsque la taille moyenne des grappes est grande, car le DEFF dépend des deux quantités ensemble, et non de l'ICC seul. Utilisez la taille d'échantillon effective pour voir combien d'information indépendante un jeu de données en grappes fournit réellement, ou la taille d'échantillon ajustée pour les grappes pour gonfler une estimation de taille d'échantillon en randomisation individuelle en vue d'un plan en grappes.",
      },
      clusterSampleSize: {
        heading: "Taille d'échantillon en grappes",
        formulaNCluster: "n_grappe",
        formulaNClusterExpr: "= n_srs x DEFF",
        formulaClusters: "grappes",
        formulaClustersExpr: "= arrondi.sup(n_grappe / m)",
        formulaSource: "Source",
        formulaSourceExpr:
          "Kish, L. (1965). Survey Sampling. Wiley. Lemeshow, S. et al. (1990). Adequacy of Sample Size in Health Studies. WHO / Wiley.",
        input: {
          srsSampleSizeLabel: "Taille d'échantillon EAS (n0)",
          srsSampleSizeHint:
            "Taille d'échantillon requise sous un plan d'échantillonnage aléatoire simple/individuel",
          avgClusterSizeLabel: "Taille moyenne de grappe (m)",
          avgClusterSizeHint: "Nombre moyen de personnes par grappe",
          iccLabel: "Corrélation intra-grappe (ICC / rho)",
          iccHint:
            "Valeur entre 0 et 1 ; plus elle est élevée, plus les individus au sein d'une grappe se ressemblent",
        },
        emptyState:
          "Saisissez une taille d'échantillon EAS valide (> 0), une taille moyenne de grappe (> 0) et un ICC (0-1) pour voir les résultats",
        deffLabel: "Effet de plan",
        deffSub: "m = {m}, ICC = {icc}",
        clusterAdjustedSampleSizeLabel: "Taille d'échantillon ajustée pour les grappes",
        clusterAdjustedSampleSizeSub: "{srs} (EAS) x DEFF {deff}",
        numberOfClustersLabel: "Nombre de grappes nécessaires",
        numberOfClustersSub: "arrondi.sup({adjusted} / {m} par grappe)",
        actualSampleSizeLabel: "Taille d'échantillon réelle (grappes entières)",
        actualSampleSizeSub: "{clusters} grappes x {m} par grappe",
        interpSummary:
          "Pour atteindre une taille d'échantillon ajustée pour l'effet de plan de {adjusted} avec une taille moyenne de grappe de {m}, il faut au moins {clusters} grappes, soit un échantillon réel de {actual}.",
        interpDetail1:
          "Comme il faut échantillonner des grappes entières, la taille d'échantillon obtenue est généralement un peu supérieure à la cible ajustée pour l'effet de plan — c'est une caractéristique normale et attendue de l'échantillonnage en grappes, pas une erreur d'arrondi à corriger.",
        interpDetail2:
          "Ce calculateur suppose des grappes de taille à peu près égale m. Si la taille des grappes varie beaucoup en pratique, considérez m comme une moyenne et prévoyez un léger surplus pour les grappes plus petites que prévu.",
      },
      stratifiedSampleSize: {
        heading: "Taille d'échantillon stratifié (allocation)",
        methodLabel: "Méthode d'allocation",
        methodEqual: "Égale",
        methodProportional: "Proportionnelle",
        methodNeyman: "Neyman (optimale)",
        formulaEqual: "Égale",
        formulaEqualExpr: "n_h = n / L",
        formulaProportional: "Proportionnelle",
        formulaProportionalExpr: "n_h = n x (N_h / N)",
        formulaNeyman: "Neyman",
        formulaNeymanExpr: "n_h = n x (N_h S_h) / somme(N_h S_h)",
        formulaSource: "Source",
        formulaSourceExpr:
          "Cochran, W. G. (1977). Sampling Techniques, 3e éd. Wiley, ch. 5. Neyman, J. (1934). J. Royal Statistical Society 97(4): 558-625.",
        input: {
          totalSampleSizeLabel: "Taille d'échantillon totale (n)",
          totalSampleSizeHint: "Taille d'échantillon totale fixe à répartir entre les strates",
          strataTitle: "Strates",
          strataLabelLabel: "Nom",
          populationSizeLabel: "Taille de la population (N_h)",
          stdDevLabel: "Écart-type (S_h)",
          stdDevHint: "Requis uniquement pour l'allocation de Neyman",
          addStratum: "Ajouter une strate",
          removeStratum: "Supprimer",
        },
        emptyState:
          "Saisissez une taille d'échantillon totale valide (> 0) et au moins une strate avec une taille de population (> 0) pour voir les résultats",
        neymanMissingStdDev:
          "L'allocation de Neyman requiert un écart-type supérieur à 0 pour chaque strate",
        tableLabel: "Strate",
        tablePopulation: "Population (N_h)",
        tableWeight: "Poids",
        tableSampleSize: "Taille allouée (n_h)",
        tableTotal: "Total",
        allocatedTotalNote:
          "Total alloué : {allocated} (cible : {target}). Les petits écarts par rapport à la cible viennent de l'arrondi de chaque strate à un nombre entier.",
        interpSummary:
          "Avec une allocation {method} sur {strata} strates (population totale {population}), la taille d'échantillon cible de {target} est répartie comme indiqué ci-dessous.",
        interpDetail1:
          "L'allocation proportionnelle échantillonne chaque strate en proportion de son poids dans la population. L'allocation de Neyman échantillonne en outre plus fortement les strates plus grandes et plus variables, minimisant la variance globale de l'estimation pour la même taille d'échantillon totale.",
        interpDetail2:
          "Lorsque toutes les strates ont le même écart-type, l'allocation de Neyman est mathématiquement identique à l'allocation proportionnelle.",
      },
    },
    populationburden: {
      title: "Indicateurs de charge de morbidité",
      subtitle:
        "Calculateurs de mesures sommaires de la santé des populations, y compris les DALY",
      subnav: {
        daly: "DALY",
        paf: "PAF",
        ageStandardization: "Standardisation par âge",
      },
      daly: {
        heading: "DALY (années de vie ajustées sur l'incapacité)",
        formulaDaly: "DALY",
        formulaDalyExpr: "= YLL + YLD",
        formulaYll: "YLL",
        formulaYllExpr: "= n x L1 (décès x espérance de vie de référence)",
        formulaYldIncidence: "YLD (incidence)",
        formulaYldIncidenceExpr:
          "= I x DW x L2 (cas x poids d'incapacité x durée)",
        formulaYldPrevalence: "YLD (prévalence)",
        formulaYldPrevalenceExpr: "= P x DW (cas x poids d'incapacité)",
        formulaSource: "Source",
        formulaSourceExpr:
          "Murray, C.J.L. & Lopez, A.D. (1996). The Global Burden of Disease. OMS/Banque mondiale/Harvard. OMS (2020), méthodes DALY GHE 2019. Sans pondération par âge ni actualisation (méthodologie GBD 2010+).",
        yllSectionTitle: "Années de vie perdues (YLL) — par cause / groupe d'âge",
        yllLabelLabel: "Cause / groupe d'âge",
        yllDeathsLabel: "Décès (n)",
        yllLifeExpectancyLabel: "Espérance de vie de référence à l'âge du décès (L1, années)",
        addYllRow: "Ajouter une ligne YLL",
        yldSectionTitle: "Années vécues avec incapacité (YLD) — par affection",
        yldMethodLabel: "Méthode YLD",
        yldMethodIncidence: "Basée sur l'incidence (cas x DW x durée)",
        yldMethodPrevalence: "Basée sur la prévalence (cas x DW)",
        yldLabelLabel: "Affection",
        yldCasesLabel: "Cas",
        yldCasesHint:
          "Cas incidents (nouveaux) ou prévalents (existants), selon la méthode ci-dessus",
        yldDwLabel: "Poids d'incapacité (DW, 0-1)",
        yldDurationLabel: "Durée moyenne (années)",
        yldDurationHint: "Requis uniquement pour la méthode basée sur l'incidence",
        addYldRow: "Ajouter une ligne YLD",
        removeRow: "Supprimer",
        emptyState:
          "Ajoutez au moins une ligne YLL ou YLD valide pour voir les résultats",
        neymanStyleError:
          "Vérifiez vos saisies : les décès et les cas doivent être supérieurs ou égaux à 0, l'espérance de vie et la durée doivent être supérieures à 0, et le poids d'incapacité doit être compris entre 0 et 1",
        totalYllLabel: "YLL total",
        totalYllSub: "Somme sur {n} ligne(s)",
        totalYldLabel: "YLD total",
        totalYldSub: "Somme sur {n} ligne(s), méthode {method}",
        totalDalyLabel: "DALY total",
        totalDalySub: "YLL {yll} + YLD {yld}",
        interpSummary:
          "Cette population subit une charge estimée à {daly} DALY : {yll} années de vie perdues par décès prématuré (YLL) et {yld} années vécues avec incapacité (YLD).",
        interpDetail1:
          "Un DALY représente une année de vie en bonne santé perdue. Une forte part de YLL traduit une charge principalement liée à la mortalité prématurée (affection à dominante YLL, p. ex. accidents de la route ou AVC), tandis qu'une forte part de YLD traduit une charge principalement non mortelle et invalidante (affection à dominante YLD, p. ex. dépression ou lombalgie).",
        interpDetail2:
          "Ce calculateur suit la méthodologie GBD/OMS actuelle : sans pondération par âge ni actualisation des années futures, et les espérances de vie de référence doivent provenir d'une table de mortalité type (p. ex. la table de référence du GBD) plutôt que de l'espérance de vie réelle de la population locale, afin qu'un décès à un âge donné compte de la même façon partout.",
      },
      paf: {
        heading: "PAF (fraction attribuable dans la population)",
        formulaPaf: "PAF (Levin)",
        formulaPafExpr: "= Pe(RR - 1) / [1 + Pe(RR - 1)]",
        formulaPe: "Pe",
        formulaPeExpr: "= prévalence de l'exposition dans la population",
        formulaRr: "RR",
        formulaRrExpr: "= risque relatif, exposés vs. non-exposés",
        formulaSource: "Source",
        formulaSourceExpr:
          "Levin, M.L. (1953). The occurrence of lung cancer in man. Acta Unio Int Contra Cancrum, 9(3): 531-541.",
        modeLabel: "Mode de saisie",
        modeDirect: "Direct (Pe et RR)",
        modeTable2x2: "Tableau 2x2 (exposition x maladie)",
        input: {
          exposurePrevalenceLabel: "Prévalence de l'exposition (Pe)",
          exposurePrevalenceHint:
            "Proportion de la population exposée au facteur de risque, de 0 à 1",
          relativeRiskLabel: "Risque relatif (RR)",
          relativeRiskHint:
            "Risque de maladie dans le groupe exposé par rapport au groupe non exposé",
          exposedCasesLabel: "Exposés, malades (a)",
          exposedNonCasesLabel: "Exposés, non malades (b)",
          unexposedCasesLabel: "Non exposés, malades (c)",
          unexposedNonCasesLabel: "Non exposés, non malades (d)",
        },
        emptyState:
          "Saisissez une prévalence d'exposition valide (0-1) et un risque relatif (> 0), ou un tableau 2x2 complet, pour voir les résultats",
        validationError:
          "Vérifiez vos saisies : la prévalence d'exposition doit être comprise entre 0 et 1, le risque relatif doit être supérieur à 0, et (pour le tableau 2x2) chaque cellule doit être supérieure ou égale à 0, avec au moins une personne dans chaque groupe d'exposition et au moins un cas non exposé",
        derivedPeLabel: "Pe dérivé",
        derivedPeSub: "(a + b) / total",
        derivedRrLabel: "RR dérivé",
        derivedRrSub: "[a / (a+b)] / [c / (c+d)]",
        pafLabel: "PAF",
        pafSub: "Pe = {pe}, RR = {rr}",
        pafPercentLabel: "Pourcentage attribuable",
        protectiveWarning:
          "RR < 1 : ce facteur semble protecteur. Un PAF négatif signifie que le supprimer devrait augmenter, et non diminuer, la fréquence de la maladie dans cette population.",
        interpSummary:
          "Avec une prévalence d'exposition de {pe} et un risque relatif de {rr}, environ {pafPercent} des cas de maladie dans cette population sont attribuables à l'exposition — la part de cas qui ne serait pas survenue en l'absence de l'exposition.",
        interpDetail1:
          "La formule de Levin suppose que la relation exposition-maladie n'est pas confondue. Si le risque relatif saisi est une estimation brute (non ajustée) plutôt qu'ajustée sur les facteurs de confusion, le PAF obtenu peut être biaisé.",
        interpDetail2:
          "Un risque relatif modéré combiné à une prévalence d'exposition élevée peut produire un PAF plus grand qu'un risque relatif fort mais rare dans la population — le PAF reflète à la fois la force de l'association et la fréquence de l'exposition.",
      },
      ageStandardization: {
        heading: "Standardisation par âge",
        methodLabel: "Méthode",
        methodDirect: "Directe",
        methodIndirect: "Indirecte",
        formulaDirect: "Directe",
        formulaDirectExpr:
          "= somme(attendu_i) / somme(population standard_i), attendu_i = (décès étude_i / population étude_i) x population standard_i",
        formulaIndirectSmr: "SMR",
        formulaIndirectSmrExpr:
          "= décès observés / somme(attendu_i), attendu_i = taux standard_i x population étude_i",
        formulaIndirectRate: "Taux ajusté indirectement",
        formulaIndirectRateExpr: "= SMR x taux brut de référence",
        formulaSource: "Source",
        formulaSourceExpr:
          "Lilienfeld, D.E. & Stolley, P.D. (1994). Foundations of Epidemiology. Oxford University Press. NC SCHS Statistical Primer 13-2. Health Knowledge, « Standardisation » (Hennekens & Buring, 1987).",
        directSectionTitle:
          "Groupes d'âge — décès de l'étude, population de l'étude, population standard",
        directLabelLabel: "Groupe d'âge",
        directStudyDeathsLabel: "Décès (étude)",
        directStudyPopulationLabel: "Population (étude)",
        directStandardPopulationLabel: "Population standard",
        addDirectRow: "Ajouter un groupe d'âge",
        indirectSectionTitle: "Groupes d'âge — taux standard, population de l'étude",
        indirectLabelLabel: "Groupe d'âge",
        indirectStandardRateLabel: "Taux standard / de référence",
        indirectStudyPopulationLabel: "Population (étude)",
        addIndirectRow: "Ajouter un groupe d'âge",
        observedDeathsLabel: "Décès observés (total, population de l'étude)",
        referenceCrudeRateLabel: "Taux brut de référence (optionnel)",
        referenceCrudeRateHint:
          "Taux brut global de la population standard/de référence ; laissez vide pour ne voir que le SMR",
        removeRow: "Supprimer",
        emptyState: "Ajoutez au moins un groupe d'âge valide pour voir les résultats",
        validationError:
          "Vérifiez vos saisies : les populations et taux doivent être supérieurs ou égaux à 0 (la population de l'étude doit être supérieure à 0 par groupe pour la méthode directe), et le total des décès attendus doit être supérieur à 0",
        standardizedRateLabel: "Taux directement standardisé",
        standardizedRateSub: "{expected} décès attendus / {pop} population standard",
        smrLabel: "SMR",
        smrSub: "{observed} observés / {expected} attendus",
        smrPercentLabel: "SMR (%)",
        indirectRateLabel: "Taux ajusté indirectement",
        indirectRateSub: "SMR {smr} x taux de référence {ref}",
        interpSummaryDirect:
          "En appliquant les taux spécifiques par âge de cette population à la population standard, on obtient un taux directement standardisé par âge de {rate} — le taux qu'aurait cette population si elle avait la structure d'âge de la population standard.",
        interpDetailDirect:
          "Comme toutes les populations sont standardisées par rapport à la même population de référence, les taux directement standardisés (contrairement aux taux bruts) peuvent être valablement comparés entre des populations de structures d'âge différentes.",
        interpSummaryIndirect:
          "Cette population a connu {observed} décès observés contre {expected} décès attendus si elle avait les taux spécifiques par âge de la population de référence, soit un SMR de {smrPercent}.",
        interpDetailIndirect:
          "Un SMR supérieur à 100 % signifie qu'il y a eu plus de décès que prévu par les taux de référence ; inférieur à 100 %, moins. Contrairement aux taux directement standardisés, les SMR de différentes populations d'étude ne doivent pas être comparés directement entre eux, car chacun est pondéré par la structure d'âge de sa propre population.",
      },
    },
    clinical: {
      title: "Mesures cliniques et d'effet",
      subtitle:
        "Calculateurs d'efficacité vaccinale, de bénéfice/risque du traitement et de taille d'effet",
      subnav: {
        vaccineEffectiveness: "Efficacité vaccinale",
        nnt: "NNT / NNH",
        smd: "SMD",
      },
      vaccineEffectiveness: {
        heading: "Efficacité vaccinale (VE)",
        formulaVe: "VE",
        formulaVeExpr: "= 1 - RR = (ARu - ARv) / ARu",
        formulaRr: "RR",
        formulaRrExpr: "= ARv / ARu",
        formulaSource: "Source",
        formulaSourceExpr:
          "Définition utilisée dans les directives CDC/OMS sur l'efficacité vaccinale ; confirmée par la documentation du Vaccine Efficacy Calculator de MetricGate et par Kissler et al., arXiv:2212.11679.",
        modeLabel: "Mode de saisie",
        modeRates: "Direct (taux d'attaque)",
        modeCounts: "Effectifs de cas",
        input: {
          arVaccinatedLabel: "Taux d'attaque, vaccinés (ARv)",
          arVaccinatedHint:
            "Proportion du groupe vacciné ayant développé l'issue, de 0 à 1",
          arUnvaccinatedLabel: "Taux d'attaque, non vaccinés (ARu)",
          arUnvaccinatedHint:
            "Proportion du groupe non vacciné ayant développé l'issue, de 0 à 1",
          casesVaccinatedLabel: "Cas, vaccinés",
          totalVaccinatedLabel: "Total, vaccinés",
          casesUnvaccinatedLabel: "Cas, non vaccinés",
          totalUnvaccinatedLabel: "Total, non vaccinés",
        },
        emptyState:
          "Saisissez des taux d'attaque valides (0-1) ou des effectifs de cas (cas <= total, ARu > 0) pour voir les résultats",
        validationError:
          "Vérifiez vos saisies : les taux d'attaque doivent être compris entre 0 et 1, les totaux de groupe doivent être supérieurs à 0, les effectifs de cas ne peuvent pas dépasser le total du groupe, et le taux d'attaque chez les non-vaccinés doit être supérieur à 0",
        derivedArVaccinatedLabel: "ARv dérivé",
        derivedArUnvaccinatedLabel: "ARu dérivé",
        veLabel: "Efficacité vaccinale",
        veSub: "ARv = {arv}, ARu = {aru}, RR = {rr}",
        negativeWarning:
          "La VE est négative : dans ces données, le groupe vacciné a eu un taux d'attaque plus élevé que le groupe non vacciné.",
        interpSummary:
          "Avec un taux d'attaque de {arv} dans le groupe vacciné contre {aru} dans le groupe non vacciné, l'efficacité vaccinale estimée est de {vePercent}.",
        interpDetail1:
          "La VE est la réduction proportionnelle du risque de maladie chez les personnes vaccinées par rapport aux non vaccinées. Une VE de 90 % signifie que les personnes vaccinées avaient un risque inférieur de 90 % dans ces données.",
        interpDetail2:
          "Cette estimation suppose que les groupes vaccinés et non vaccinés sont par ailleurs comparables (exposition et détection des cas similaires). Les estimations observationnelles peuvent être biaisées par la confusion, une détection différentielle ou une baisse de l'immunité dans le temps.",
      },
      nnt: {
        heading: "NNT / NNH",
        formulaArr: "ARR",
        formulaArrExpr: "= CER - EER",
        formulaNnt: "NNT",
        formulaNntExpr: "= 1 / ARR (arrondi au supérieur), si ARR > 0",
        formulaNnh: "NNH",
        formulaNnhExpr: "= 1 / |ARR| (arrondi au supérieur), si ARR < 0",
        formulaSource: "Source",
        formulaSourceExpr:
          "Centre for Evidence-Based Medicine, University of Oxford, « Number Needed to Treat (NNT) ». ClinCalc, « NNT Calculator ».",
        input: {
          controlEventRateLabel: "Taux d'événement, groupe témoin (CER)",
          controlEventRateHint:
            "Proportion du groupe témoin/comparateur ayant présenté l'événement, de 0 à 1",
          experimentalEventRateLabel: "Taux d'événement, groupe expérimental (EER)",
          experimentalEventRateHint:
            "Proportion du groupe traitement/expérimental ayant présenté l'événement, de 0 à 1",
        },
        emptyState:
          "Saisissez des taux d'événement valides pour le groupe témoin et expérimental (0-1) pour voir les résultats",
        validationError:
          "Vérifiez vos saisies : les deux taux d'événement doivent être compris entre 0 et 1",
        arrLabel: "Réduction absolue du risque (ARR)",
        arrSub: "CER {cer} - EER {eer}",
        nntLabel: "Nombre de sujets à traiter (NNT)",
        nntSub: "1 / ARR {arr}, arrondi au supérieur",
        nnhLabel: "Nombre de sujets pour nuire (NNH)",
        nnhSub: "1 / |ARR| {ari}, arrondi au supérieur",
        noneLabel: "Aucune différence",
        noneSub:
          "Les taux d'événement du groupe témoin et expérimental sont égaux — le NNT/NNH n'est pas défini",
        interpSummaryBenefit:
          "Avec un taux d'événement témoin de {cer} et expérimental de {eer}, il faut traiter environ {nnt} personnes pour qu'une personne supplémentaire en bénéficie (évite l'événement), par rapport au témoin.",
        interpSummaryHarm:
          "Avec un taux d'événement témoin de {cer} et expérimental de {eer}, environ {nnh} personnes doivent être exposées au traitement pour qu'une personne supplémentaire soit lésée (présente l'événement), par rapport au témoin.",
        interpDetail1:
          "Le NNT et le NNH sont toujours arrondis à la personne entière supérieure, car on ne peut pas traiter ou léser une fraction de personne.",
        interpDetail2:
          "Le NNT/NNH dépend du risque de base (témoin) : un même effet relatif donnera un NNT bien plus élevé dans une population à faible risque que dans une population à haut risque ; les valeurs de NNT/NNH ne doivent donc être comparées qu'entre études ayant un risque de base et un horizon temporel similaires.",
      },
      smd: {
        heading: "SMD (différence moyenne standardisée)",
        formulaPooledSd: "ET regroupé",
        formulaPooledSdExpr: "= sqrt[((n1-1) s1^2 + (n2-1) s2^2) / (n1+n2-2)]",
        formulaCohensD: "d de Cohen",
        formulaCohensDExpr: "= (moyenne1 - moyenne2) / ET regroupé",
        formulaHedgesG: "g de Hedges",
        formulaHedgesGExpr: "= J(m) x d de Cohen, J(m) = 1 - 3/(4m-1), m = n1+n2-2",
        formulaSource: "Source",
        formulaSourceExpr:
          "Borenstein, M. et al. (2009). Introduction to Meta-Analysis. Wiley. Hedges, L.V. (1983). Biometrics. Campbell Collaboration, Effect Size Calculator.",
        input: {
          group1Title: "Groupe 1",
          group2Title: "Groupe 2",
          meanLabel: "Moyenne",
          sdLabel: "Écart-type",
          nLabel: "Taille d'échantillon (n)",
        },
        emptyState:
          "Saisissez des moyennes, écarts-types (>= 0) et tailles d'échantillon (n >= 2) valides pour les deux groupes pour voir les résultats",
        validationError:
          "Vérifiez vos saisies : chaque groupe doit avoir un échantillon d'au moins 2, les écarts-types doivent être supérieurs ou égaux à 0, et l'écart-type regroupé doit être supérieur à 0",
        pooledSdLabel: "ET regroupé",
        cohensDLabel: "d de Cohen",
        cohensDSub: "(moyenne1 {m1} - moyenne2 {m2}) / ET regroupé {psd}",
        hedgesGLabel: "g de Hedges (corrigé petit échantillon)",
        hedgesGSub: "J({m}) = {j}",
        magnitudeSmall: "effet petit",
        magnitudeMedium: "effet moyen",
        magnitudeLarge: "effet grand",
        magnitudeNegligible: "effet négligeable",
        interpSummary:
          "La différence moyenne standardisée entre les deux groupes est d de Cohen = {d} ({magnitude} selon les repères conventionnels de Cohen), ou {g} avec le g de Hedges corrigé pour petit échantillon.",
        interpDetail1:
          "Selon les repères conventionnels de Cohen : |d| autour de 0,2 est un effet petit, autour de 0,5 un effet moyen, et autour de 0,8 ou plus un effet grand. Ce sont des repères indicatifs, non des seuils fixes, et leur pertinence varie selon le domaine.",
        interpDetail2:
          "Le g de Hedges applique une correction pour petit échantillon et est préféré au d de Cohen lorsque l'un des groupes compte moins d'environ 20 participants, car le d de Cohen tend à surestimer la taille d'effet réelle dans les petits échantillons.",
      },
    },
    statisticalmodeling: {
      title: "Modélisation statistique",
      subtitle:
        "Calculateurs de rapports de taux d'incidence et de performance de test diagnostique bayésien",
      subnav: {
        poissonRegression: "Régression de Poisson (IRR)",
        bayesianDiagnostic: "Test diagnostique bayésien",
      },
      poissonRegression: {
        heading: "Régression de Poisson (rapport de taux d'incidence)",
        formulaRate: "Taux",
        formulaRateExpr: "= événements / temps-personne",
        formulaIrr: "IRR",
        formulaIrrExpr: "= taux du groupe / taux de référence",
        formulaCi: "IC à 95 %",
        formulaCiExpr:
          "= exp[ln(IRR) +/- 1,96 x sqrt(1/événements_groupe + 1/événements_référence)]",
        formulaSource: "Source",
        formulaSourceExpr:
          "StatsDirect, « Poisson Regression (Incidence Rate Ratio) ». MetricGate, « Incidence Rate Ratio Calculator » et « Incidence Density Ratio Calculator ».",
        note: "Une seule variable d'exposition catégorielle donne un modèle de Poisson saturé — son ajustement par maximum de vraisemblance égale exactement le taux observé de chaque groupe, sans nécessiter d'ajustement itératif.",
        groupsSectionTitle: "Groupes — événements et temps-personne",
        groupLabelLabel: "Groupe",
        eventsLabel: "Événements",
        personTimeLabel: "Temps-personne",
        referenceLabel: "Référence",
        setReference: "Définir comme référence",
        addGroup: "Ajouter un groupe",
        removeRow: "Supprimer",
        emptyState:
          "Ajoutez au moins deux groupes (événements >= 0, temps-personne > 0) et choisissez une référence pour voir les résultats",
        validationError:
          "Vérifiez vos saisies : chaque groupe doit avoir un temps-personne supérieur à 0 et des événements supérieurs ou égaux à 0, le groupe de référence doit avoir au moins un événement, et au moins deux groupes sont requis",
        tableGroup: "Groupe",
        tableRate: "Taux",
        tableIrr: "IRR",
        tableCi: "IC à 95 %",
        referenceTag: "(référence)",
        undefinedCi: "non défini (0 événement)",
        interpSummary:
          "Par rapport à {refLabel} (taux {refRate}), les groupes ayant les rapports de taux d'incidence les plus élevé et le plus bas dans cette comparaison sont {highLabel} (IRR {highIrr}) et {lowLabel} (IRR {lowIrr}).",
        interpDetail1:
          "IRR = 1 signifie aucune différence par rapport au taux du groupe de référence ; IRR > 1 signifie un taux plus élevé ; IRR < 1 signifie un taux plus faible. Un IC à 95 % excluant 1 suggère que la différence avec la référence est peu probablement due au seul hasard, au seuil de signification de 5 %.",
        interpDetail2:
          "Ce modèle suppose un taux d'événement constant au sein de chaque groupe sur le temps-personne observé, et des événements indépendants (pas de surdispersion). Si la variance des événements dépasse largement la moyenne au sein d'un groupe, envisagez plutôt un modèle binomial négatif.",
      },
      bayesianDiagnostic: {
        heading: "Test diagnostique bayésien (VPP / VPN)",
        formulaPpv: "VPP",
        formulaPpvExpr: "= (Se x Prév) / (Se x Prév + (1-Sp) x (1-Prév))",
        formulaNpv: "VPN",
        formulaNpvExpr: "= (Sp x (1-Prév)) / (Sp x (1-Prév) + (1-Se) x Prév)",
        formulaLrPos: "RV+",
        formulaLrPosExpr: "= Se / (1-Sp)",
        formulaLrNeg: "RV-",
        formulaLrNegExpr: "= (1-Se) / Sp",
        formulaSource: "Source",
        formulaSourceExpr:
          "Définition utilisée dans les supports pédagogiques d'épidémiologie clinique ; confirmée par VarsityTutors, « Sensitivity, Specificity, PPV & NPV » et « Use Bayes' theorem in diagnostic contexts ».",
        modeLabel: "Mode de saisie",
        modeDirect: "Direct (Se, Sp, prévalence)",
        modeTable2x2: "Tableau 2x2 (résultat du test x statut de la maladie)",
        input: {
          sensitivityLabel: "Sensibilité (Se)",
          sensitivityHint: "Proportion des malades ayant un test positif, de 0 à 1",
          specificityLabel: "Spécificité (Sp)",
          specificityHint: "Proportion des personnes saines ayant un test négatif, de 0 à 1",
          prevalenceLabel: "Prévalence",
          prevalenceHint:
            "Probabilité pré-test de la maladie dans la population testée, de 0 à 1",
          tpLabel: "Vrais positifs (VP)",
          fnLabel: "Faux négatifs (FN)",
          tnLabel: "Vrais négatifs (VN)",
          fpLabel: "Faux positifs (FP)",
        },
        emptyState:
          "Saisissez des Se/Sp/prévalence valides (0-1), ou un tableau 2x2 complet, pour voir les résultats",
        validationError:
          "Vérifiez vos saisies : la sensibilité, la spécificité et la prévalence doivent être comprises entre 0 et 1 (spécificité strictement inférieure à 1), et pour le tableau 2x2 il doit y avoir au moins une personne malade et une personne saine",
        derivedSeLabel: "Se dérivée",
        derivedSpLabel: "Sp dérivée",
        derivedPrevLabel: "Prévalence dérivée",
        ppvLabel: "VPP",
        ppvSub: "Se = {se}, Sp = {sp}, Prévalence = {prev}",
        npvLabel: "VPN",
        npvSub: "Se = {se}, Sp = {sp}, Prévalence = {prev}",
        lrPosLabel: "RV+",
        lrNegLabel: "RV-",
        interpSummary:
          "Avec une sensibilité de {se}, une spécificité de {sp} et une prévalence de {prev}, un résultat positif donne une probabilité de maladie de {ppv} (VPP), tandis qu'un résultat négatif donne une probabilité d'absence de maladie de {npv} (VPN).",
        interpDetail1:
          "La sensibilité et la spécificité sont des propriétés du test lui-même et restent à peu près constantes selon les populations. La VPP et la VPN, en revanche, dépendent fortement de la prévalence : le même test donne une VPP bien plus faible dans une population de dépistage à faible prévalence que dans une population de référence à forte prévalence.",
        interpDetail2:
          "Les rapports de vraisemblance (RV+ et RV-) ne dépendent pas de la prévalence, ce qui les rend plus transposables d'un contexte à l'autre. En règle générale, un RV+ supérieur à 10 ou un RV- inférieur à 0,1 produit des changements importants, souvent cliniquement décisifs, entre la probabilité pré-test et post-test.",
      },
    },
    metaanalysis: {
      title: "Méta-analyse",
      subtitle:
        "Calculateurs pour combiner les tailles d'effet, l'hétérogénéité et les forest plots",
      subnav: {
        metaAnalysis: "Méta-analyse (forest plot)",
      },
      metaAnalysis: {
        heading: "Méta-analyse : effets fixes et aléatoires",
        formulaFixed: "Effet fixe",
        formulaFixedExpr: "= somme(wi yi) / somme(wi), wi = 1/SEi^2",
        formulaQ: "Q de Cochran",
        formulaQExpr: "= somme[wi (yi - y_fixe)^2], df = k-1",
        formulaI2: "I^2",
        formulaI2Expr: "= max(0, (Q-df)/Q) x 100 %",
        formulaTau2: "Tau^2 (DerSimonian-Laird)",
        formulaTau2Expr: "= max(0, (Q-df)/C), C = somme(wi) - somme(wi^2)/somme(wi)",
        formulaRandom: "Effet aléatoire",
        formulaRandomExpr: "= somme(wi* yi) / somme(wi*), wi* = 1/(SEi^2 + Tau^2)",
        formulaSource: "Source",
        formulaSourceExpr:
          "DerSimonian, R. & Laird, N. (1986). Controlled Clinical Trials, 7(3): 177-188. Higgins, J.P.T. & Thompson, S.G. (2002). Statistics in Medicine, 21(11): 1539-1558. Cochrane Handbook, section 9.4.3.1/9.5.4.",
        effectTypeLabel: "Mesure d'effet",
        effectTypeDifference: "Différence (échelle brute, p. ex. différence de moyennes)",
        effectTypeRatio: "Rapport (p. ex. OR / RR / HR)",
        effectTypeHint:
          "Pour une mesure de rapport, saisissez l'effet (p. ex. l'OR) lui-même et l'erreur type de son logarithme naturel — ET(ln effet) = (ln(IC 95 % sup) - ln(IC 95 % inf)) / 3,92",
        studiesSectionTitle: "Études",
        studyLabelLabel: "Étude",
        effectLabel: "Effet",
        seLabel: "Erreur type (ET)",
        addStudy: "Ajouter une étude",
        removeRow: "Supprimer",
        emptyState:
          "Ajoutez au moins deux études (ET > 0, effet > 0 pour les mesures de rapport) pour voir les résultats",
        validationError:
          "Vérifiez vos saisies : au moins deux études sont requises, chaque erreur type doit être supérieure à 0, et les effets de type rapport doivent être supérieurs à 0",
        tableStudy: "Étude",
        tableEffect: "Effet",
        tableCi: "IC à 95 %",
        tableWeightFixed: "Poids (fixe)",
        tableWeightRandom: "Poids (aléatoire)",
        fixedEffectLabel: "Estimation combinée à effet fixe",
        fixedEffectSub: "z = {z}, p = {p}",
        randomEffectLabel: "Estimation combinée à effets aléatoires (DerSimonian-Laird)",
        randomEffectSub: "z = {z}, p = {p}",
        qLabel: "Q de Cochran",
        qSub: "df = {df}, p = {p}",
        i2Label: "I\u00b2 (hétérogénéité)",
        tau2Label: "Tau\u00b2",
        heterogeneityLow: "hétérogénéité faible",
        heterogeneityModerate: "hétérogénéité modérée",
        heterogeneitySubstantial: "hétérogénéité substantielle",
        heterogeneityConsiderable: "hétérogénéité considérable",
        forestPlotTitle: "Forest plot",
        forestPlotPooledFixed: "Combiné (fixe)",
        forestPlotPooledRandom: "Combiné (aléatoire)",
        interpSummary:
          "La combinaison de {k} études donne une estimation à effet fixe de {fixedEffect} (IC à 95 % {fixedLower} à {fixedUpper}) et une estimation à effets aléatoires DerSimonian-Laird de {randomEffect} (IC à 95 % {randomLower} à {randomUpper}). L'hétérogénéité est {heterogeneityLevel} (I\u00b2 = {i2} %, p du Q de Cochran = {qp}).",
        interpDetail1:
          "Lorsque l'I\u00b2 est faible et que le p du Q n'est pas significatif, les estimations à effet fixe et à effets aléatoires sont généralement très proches, car il y a peu de preuves d'une variabilité réelle entre études au-delà du hasard. À mesure que l'I\u00b2 augmente, le modèle à effets aléatoires élargit l'intervalle de confiance et redistribue le poids des études très précises (grandes) vers une moyenne plus équilibrée entre les études.",
        interpDetail2:
          "Par convention (Higgins & Thompson, 2002), un I\u00b2 autour de 25 % est souvent qualifié de faible, autour de 50 % de modéré, et autour de 75 % ou plus d'hétérogénéité substantielle — mais ce sont des repères indicatifs, non des seuils fixes, à interpréter avec le forest plot et les caractéristiques des études, pas isolément.",
      },
    },
  },
} as const;

export type TranslationKey = keyof typeof translations.en;
