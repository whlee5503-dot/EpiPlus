/**
 * Standardized Mean Difference (SMD) calculator: Cohen's d, with an
 * optional small-sample-corrected Hedges' g.
 *
 * Formula source: Borenstein, M. et al. (2009). Introduction to
 *                  Meta-Analysis. Wiley. Hedges, L.V. (1983). Biometrics.
 *                  Campbell Collaboration, "Effect Size Calculator" (Cohen's d).
 *
 * pooled SD = sqrt[((n1-1)*s1^2 + (n2-1)*s2^2) / (n1+n2-2)]
 * Cohen's d = (mean1 - mean2) / pooled SD
 * Hedges' g = J(m) x Cohen's d, where m = n1+n2-2 and
 *             J(m) ~= 1 - 3/(4m - 1)   (small-sample correction factor)
 */

export interface SmdInput {
  mean1: number;
  sd1: number;
  n1: number;
  mean2: number;
  sd2: number;
  n2: number;
}

export interface SmdResult extends SmdInput {
  pooledSd: number;
  cohensD: number;
  /** Small-sample correction factor J(m) */
  correctionFactor: number;
  hedgesG: number;
}

export function calculateSmd(input: SmdInput): SmdResult {
  const { mean1, sd1, n1, mean2, sd2, n2 } = input;

  if (n1 < 2 || n2 < 2) {
    throw new Error("Each group must have a sample size of at least 2");
  }
  if (sd1 < 0 || sd2 < 0) {
    throw new Error("Standard deviations must be zero or greater");
  }

  const degreesOfFreedom = n1 + n2 - 2;
  const pooledVariance = ((n1 - 1) * sd1 ** 2 + (n2 - 1) * sd2 ** 2) / degreesOfFreedom;
  const pooledSd = Math.sqrt(pooledVariance);

  if (pooledSd <= 0) {
    throw new Error("Pooled standard deviation must be greater than 0");
  }

  const cohensD = (mean1 - mean2) / pooledSd;
  const correctionFactor = 1 - 3 / (4 * degreesOfFreedom - 1);
  const hedgesG = correctionFactor * cohensD;

  return {
    mean1,
    sd1,
    n1,
    mean2,
    sd2,
    n2,
    pooledSd,
    cohensD,
    correctionFactor,
    hedgesG,
  };
}
