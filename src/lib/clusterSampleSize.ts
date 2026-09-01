/**
 * Cluster Sampling Sample Size calculator.
 *
 * Builds on the design effect (DEFF) calculators in designEffect.ts:
 * an individually-randomized ("SRS") sample size is inflated by the
 * design effect, and the result is translated into a required number
 * of clusters (PSUs) given an average cluster size.
 *
 * Formula source: Kish, L. (1965). Survey Sampling. Wiley.
 *                  Lemeshow, S. et al. (1990). Adequacy of Sample Size
 *                  in Health Studies. WHO/Wiley (cluster survey design,
 *                  e.g. the EPI "N clusters x cluster size" convention).
 *
 * n_cluster   = n_srs * DEFF               (calculateClusterAdjustedSampleSize)
 * clusters    = ceil(n_cluster / m)
 * actual n    = clusters * m               (achieved once whole clusters are sampled)
 */

import {
  calculateDesignEffect,
  calculateClusterAdjustedSampleSize,
} from "./designEffect";

export interface ClusterSampleSizeInput {
  /** Sample size required under simple/individual random sampling (n0) */
  srsSampleSize: number;
  /** Average number of individuals per cluster (m) */
  avgClusterSize: number;
  /** Intracluster correlation coefficient (0 to 1) */
  icc: number;
}

export interface ClusterSampleSizeResult {
  designEffect: number;
  srsSampleSize: number;
  avgClusterSize: number;
  icc: number;
  /** n_srs * DEFF, rounded up to the nearest individual */
  clusterAdjustedSampleSize: number;
  /** Number of clusters (PSUs) needed to reach the adjusted sample size */
  numberOfClusters: number;
  /** Total sample size actually achieved once whole clusters are sampled (clusters * m) */
  actualSampleSize: number;
}

export function calculateClusterSampleSize(
  input: ClusterSampleSizeInput
): ClusterSampleSizeResult {
  const { srsSampleSize, avgClusterSize, icc } = input;

  if (srsSampleSize <= 0) {
    throw new Error("SRS sample size must be greater than 0");
  }
  if (avgClusterSize <= 0) {
    throw new Error("Average cluster size must be greater than 0");
  }
  if (icc < 0 || icc > 1) {
    throw new Error("ICC must be between 0 and 1");
  }

  const { designEffect } = calculateDesignEffect({ avgClusterSize, icc });

  const { adjustedSampleSize: clusterAdjustedSampleSize } =
    calculateClusterAdjustedSampleSize({
      individualSampleSize: srsSampleSize,
      designEffect,
    });

  const numberOfClusters = Math.ceil(clusterAdjustedSampleSize / avgClusterSize);
  const actualSampleSize = numberOfClusters * avgClusterSize;

  return {
    designEffect,
    srsSampleSize,
    avgClusterSize,
    icc,
    clusterAdjustedSampleSize,
    numberOfClusters,
    actualSampleSize,
  };
}
