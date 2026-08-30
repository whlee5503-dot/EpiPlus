import { describe, it, expect } from "vitest";
import {
  calculateDesignEffect,
  calculateEffectiveSampleSize,
  calculateClusterAdjustedSampleSize,
} from "../designEffect";

describe("calculateDesignEffect", () => {
  it("matches Health Knowledge worked example (4 GP practices, m=25, ICC=0.017)", () => {
    const result = calculateDesignEffect({ avgClusterSize: 25, icc: 0.017 });
    expect(result.designEffect).toBeCloseTo(1.408, 3);
  });

  it("matches CASRAI worked example (m=50, ICC=0.02)", () => {
    const result = calculateDesignEffect({ avgClusterSize: 50, icc: 0.02 });
    expect(result.designEffect).toBeCloseTo(1.98, 2);
  });

  it("throws on invalid avgClusterSize", () => {
    expect(() =>
      calculateDesignEffect({ avgClusterSize: 0, icc: 0.02 })
    ).toThrow();
  });

  it("throws on ICC out of range", () => {
    expect(() =>
      calculateDesignEffect({ avgClusterSize: 25, icc: 1.5 })
    ).toThrow();
  });
});

describe("calculateEffectiveSampleSize", () => {
  it("matches Health Knowledge worked example (n=100 -> n_eff≈71)", () => {
    const { designEffect } = calculateDesignEffect({
      avgClusterSize: 25,
      icc: 0.017,
    });
    const result = calculateEffectiveSampleSize({
      nominalSampleSize: 100,
      designEffect,
    });
    expect(Math.round(result.effectiveSampleSize)).toBe(71);
  });
});

describe("calculateClusterAdjustedSampleSize", () => {
  it("matches CASRAI worked example (400/arm -> ~792/arm)", () => {
    const { designEffect } = calculateDesignEffect({
      avgClusterSize: 50,
      icc: 0.02,
    });
    const result = calculateClusterAdjustedSampleSize({
      individualSampleSize: 400,
      designEffect,
    });
    expect(result.adjustedSampleSize).toBe(792);
  });
});
