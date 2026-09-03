/**
 * Bayesian Diagnostic Test calculator: positive/negative predictive value
 * (PPV/NPV) and likelihood ratios via Bayes' theorem.
 *
 * Formula source: definition used across clinical epidemiology teaching
 *                  materials; confirmed independently by VarsityTutors,
 *                  "Sensitivity, Specificity, PPV & NPV" and "Use Bayes'
 *                  theorem in diagnostic contexts".
 *
 * PPV = (Se x Prev) / (Se x Prev + (1-Sp) x (1-Prev))
 * NPV = (Sp x (1-Prev)) / (Sp x (1-Prev) + (1-Se) x Prev)
 * LR+ = Se / (1-Sp)
 * LR- = (1-Se) / Sp
 *
 * Two equivalent input modes are supported:
 *  - "direct": sensitivity, specificity and prevalence are supplied directly.
 *  - "table2x2": a 2x2 test-result/disease-status contingency table is
 *    supplied, from which sensitivity and specificity are always derived.
 *
 *    IMPORTANT: by default, prevalence is ALSO derived from the same table
 *    (diseased / total). When Se, Sp and Prev all come from the same sample,
 *    applying Bayes' theorem is mathematically an identity that reproduces
 *    the classical PPV = TP/(TP+FP) and NPV = TN/(TN+FN) results exactly --
 *    it is not a genuine Bayesian use of an external prior. To perform a
 *    genuine Bayesian calculation (e.g. Se/Sp estimated from a case-control
 *    study, combined with a real target-population prevalence), supply
 *    `priorPrevalence` to override the sample-derived prevalence with an
 *    externally sourced prior. See VALIDATION.md for the distinction and a
 *    worked example of each case.
 */

export type BayesianDiagnosticInput = BayesDirectInput | BayesTable2x2Input;

export interface BayesDirectInput {
  mode: "direct";
  /** Sensitivity (true positive rate), 0 to 1 */
  sensitivity: number;
  /** Specificity (true negative rate), 0 to 1 */
  specificity: number;
  /** Prevalence (pre-test probability of disease), 0 to 1 */
  prevalence: number;
}

export interface BayesTable2x2Input {
  mode: "table2x2";
  /** True positives */
  tp: number;
  /** False negatives */
  fn: number;
  /** True negatives */
  tn: number;
  /** False positives */
  fp: number;
  /**
   * Optional external prior prevalence (0 to 1), e.g. the known prevalence
   * in the target population. When provided, this OVERRIDES the
   * sample-derived prevalence (diseased / total) for the PPV/NPV
   * calculation, making this a genuine Bayesian combination of
   * sample-derived Se/Sp with an independent prior. When omitted, the
   * prevalence is derived from the same 2x2 table as Se/Sp (see the
   * important note in the module docstring above).
   */
  priorPrevalence?: number;
}

export interface BayesianDiagnosticResult {
  mode: BayesianDiagnosticInput["mode"];
  sensitivity: number;
  specificity: number;
  /** The prevalence actually used in the PPV/NPV calculation (prior or sample-derived). */
  prevalence: number;
  /**
   * Whether `prevalence` above came from an externally supplied prior
   * (true) or was derived from the same sample as Se/Sp (false).
   */
  usedExternalPrior: boolean;
  /**
   * The prevalence derived from the 2x2 table itself (diseased / total).
   * Only populated in "table2x2" mode; useful for showing the user what
   * the "naive" sample prevalence was, alongside the prior actually used.
   */
  samplePrevalence?: number;
  ppv: number;
  npv: number;
  positiveLikelihoodRatio: number;
  negativeLikelihoodRatio: number;
}

export function calculateBayesianDiagnostic(
  input: BayesianDiagnosticInput
): BayesianDiagnosticResult {
  let sensitivity: number;
  let specificity: number;
  let prevalence: number;
  let usedExternalPrior = false;
  let samplePrevalence: number | undefined;

  if (input.mode === "direct") {
    sensitivity = input.sensitivity;
    specificity = input.specificity;
    prevalence = input.prevalence;

    if (sensitivity < 0 || sensitivity > 1) {
      throw new Error("Sensitivity must be between 0 and 1");
    }
    if (specificity < 0 || specificity > 1) {
      throw new Error("Specificity must be between 0 and 1");
    }
    if (prevalence < 0 || prevalence > 1) {
      throw new Error("Prevalence must be between 0 and 1");
    }
  } else {
    const { tp, fn, tn, fp, priorPrevalence } = input;
    if (tp < 0 || fn < 0 || tn < 0 || fp < 0) {
      throw new Error("Cell counts must be zero or greater");
    }
    const diseased = tp + fn;
    const healthy = tn + fp;
    const total = diseased + healthy;
    if (diseased <= 0) {
      throw new Error("At least one diseased person (TP + FN > 0) is required to compute sensitivity");
    }
    if (healthy <= 0) {
      throw new Error("At least one healthy person (TN + FP > 0) is required to compute specificity");
    }

    sensitivity = tp / diseased;
    specificity = tn / healthy;
    samplePrevalence = diseased / total;

    if (priorPrevalence !== undefined && priorPrevalence !== null && !Number.isNaN(priorPrevalence)) {
      if (priorPrevalence < 0 || priorPrevalence > 1) {
        throw new Error("Prior prevalence must be between 0 and 1");
      }
      prevalence = priorPrevalence;
      usedExternalPrior = true;
    } else {
      prevalence = samplePrevalence;
    }
  }

  if (specificity >= 1) {
    throw new Error("Specificity must be less than 1 to compute the positive likelihood ratio");
  }
  if (specificity <= 0) {
    throw new Error("Specificity must be greater than 0 to compute the negative likelihood ratio");
  }

  const ppvNumerator = sensitivity * prevalence;
  const ppvDenominator = ppvNumerator + (1 - specificity) * (1 - prevalence);
  const npvNumerator = specificity * (1 - prevalence);
  const npvDenominator = npvNumerator + (1 - sensitivity) * prevalence;

  if (ppvDenominator <= 0) {
    throw new Error("Cannot compute PPV: denominator is zero (check prevalence and test characteristics)");
  }
  if (npvDenominator <= 0) {
    throw new Error("Cannot compute NPV: denominator is zero (check prevalence and test characteristics)");
  }

  const ppv = ppvNumerator / ppvDenominator;
  const npv = npvNumerator / npvDenominator;
  const positiveLikelihoodRatio = sensitivity / (1 - specificity);
  const negativeLikelihoodRatio = (1 - sensitivity) / specificity;

  return {
    mode: input.mode,
    sensitivity,
    specificity,
    prevalence,
    usedExternalPrior,
    samplePrevalence,
    ppv,
    npv,
    positiveLikelihoodRatio,
    negativeLikelihoodRatio,
  };
}