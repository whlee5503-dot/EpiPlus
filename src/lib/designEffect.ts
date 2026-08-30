/**
 * Design Effect (DEFF) calculators for cluster sampling.
 *
 * Formula source: Kish, L. (1965). Survey Sampling. Wiley.
 *                  Donner, A. & Klar, N. (2000). Design and Analysis of
 *                  Cluster Randomization Trials in Health Research.
 *
 * DEFF = 1 + (m - 1) * ICC
 *   m   = average cluster size
 *   ICC = intracluster correlation coefficient (rho)
 */

export interface DesignEffectInput {
  /** Average number of individuals per cluster */
  avgClusterSize: number;
  /** Intracluster correlation coefficient (0 to 1) */
  icc: number;
}

export interface DesignEffectResult {
  designEffect: number;
  avgClusterSize: number;
  icc: number;
}

/**
 * Calculates the design effect (DEFF) for a cluster sampling design.
 */
export function calculateDesignEffect(
  input: DesignEffectInput
): DesignEffectResult {
  const { avgClusterSize, icc } = input;

  if (avgClusterSize <= 0) {
    throw new Error("Average cluster size must be greater than 0");
  }
  if (icc < 0 || icc > 1) {
    throw new Error("ICC must be between 0 and 1");
  }

  const designEffect = 1 + (avgClusterSize - 1) * icc;

  return { designEffect, avgClusterSize, icc };
}

export interface EffectiveSampleSizeInput {
  /** Total (nominal) sample size actually collected */
  nominalSampleSize: number;
  designEffect: number;
}

export interface EffectiveSampleSizeResult {
  effectiveSampleSize: number;
  nominalSampleSize: number;
  designEffect: number;
}

/**
 * Calculates the effective sample size after accounting for clustering.
 * n_eff = n / DEFF
 */
export function calculateEffectiveSampleSize(
  input: EffectiveSampleSizeInput
): EffectiveSampleSizeResult {
  const { nominalSampleSize, designEffect } = input;

  if (nominalSampleSize <= 0) {
    throw new Error("Nominal sample size must be greater than 0");
  }
  if (designEffect <= 0) {
    throw new Error("Design effect must be greater than 0");
  }

  const effectiveSampleSize = nominalSampleSize / designEffect;

  return { effectiveSampleSize, nominalSampleSize, designEffect };
}

export interface ClusterAdjustedSampleSizeInput {
  /** Sample size required under simple/individual random sampling */
  individualSampleSize: number;
  designEffect: number;
}

export interface ClusterAdjustedSampleSizeResult {
  adjustedSampleSize: number;
  individualSampleSize: number;
  designEffect: number;
}

/**
 * Inflates an individually-randomized sample size estimate to account
 * for clustering. n_cluster = n_individual * DEFF
 */
export function calculateClusterAdjustedSampleSize(
  input: ClusterAdjustedSampleSizeInput
): ClusterAdjustedSampleSizeResult {
  const { individualSampleSize, designEffect } = input;

  if (individualSampleSize <= 0) {
    throw new Error("Individual sample size must be greater than 0");
  }
  if (designEffect <= 0) {
    throw new Error("Design effect must be greater than 0");
  }

  const adjustedSampleSize = Math.ceil(individualSampleSize * designEffect);

  return { adjustedSampleSize, individualSampleSize, designEffect };
}
