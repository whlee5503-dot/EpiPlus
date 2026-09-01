import { describe, it, expect } from "vitest";
import { calculateClusterSampleSize } from "../clusterSampleSize";

describe("calculateClusterSampleSize", () => {
  it("extends the CASRAI worked example (n0=400, m=50, ICC=0.02) with cluster count", () => {
    // Reuses the already-validated designEffect.ts CASRAI example:
    // DEFF=1.98, cluster-adjusted n=792 (see VALIDATION.md).
    const result = calculateClusterSampleSize({
      srsSampleSize: 400,
      avgClusterSize: 50,
      icc: 0.02,
    });
    expect(result.designEffect).toBeCloseTo(1.98, 2);
    expect(result.clusterAdjustedSampleSize).toBe(792);
    // 792 / 50 = 15.84 -> 16 whole clusters
    expect(result.numberOfClusters).toBe(16);
    // 16 clusters * 50 = 800 actually sampled
    expect(result.actualSampleSize).toBe(800);
  });

  it("extends the Health Knowledge worked example (m=25, ICC=0.017)", () => {
    const result = calculateClusterSampleSize({
      srsSampleSize: 100,
      avgClusterSize: 25,
      icc: 0.017,
    });
    expect(result.designEffect).toBeCloseTo(1.408, 3);
    // 100 * 1.408 = 140.8 -> 141
    expect(result.clusterAdjustedSampleSize).toBe(141);
    // 141 / 25 = 5.64 -> 6 clusters
    expect(result.numberOfClusters).toBe(6);
    expect(result.actualSampleSize).toBe(150);
  });

  it("throws on invalid srsSampleSize", () => {
    expect(() =>
      calculateClusterSampleSize({ srsSampleSize: 0, avgClusterSize: 25, icc: 0.02 })
    ).toThrow();
  });

  it("throws on invalid avgClusterSize", () => {
    expect(() =>
      calculateClusterSampleSize({ srsSampleSize: 100, avgClusterSize: 0, icc: 0.02 })
    ).toThrow();
  });

  it("throws on ICC out of range", () => {
    expect(() =>
      calculateClusterSampleSize({ srsSampleSize: 100, avgClusterSize: 25, icc: 1.2 })
    ).toThrow();
  });
});
