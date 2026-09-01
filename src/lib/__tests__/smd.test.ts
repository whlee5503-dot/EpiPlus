import { describe, it, expect } from "vitest";
import { calculateSmd } from "../smd";

describe("calculateSmd", () => {
  it("computes a clean equal-n, equal-sd example (d = 0.5)", () => {
    // Hand-verified: n1=n2=20, sd1=sd2=10 -> pooled sd = 10 (equal variances
    // average to the same value); mean diff = 5 -> d = 0.5.
    // Formula source: Borenstein et al. (2009); Campbell Collaboration
    // Effect Size Calculator.
    const result = calculateSmd({ mean1: 75, sd1: 10, n1: 20, mean2: 70, sd2: 10, n2: 20 });
    expect(result.pooledSd).toBeCloseTo(10, 6);
    expect(result.cohensD).toBeCloseTo(0.5, 6);
  });

  it("computes a clean unequal-n, unequal-sd example", () => {
    // Hand-verified: pooled variance = (14*64 + 24*144) / 38
    //              = (896 + 3456) / 38 = 4352 / 38 = 114.5263...
    // pooled sd = sqrt(114.5263) = 10.7018...
    // d = (50 - 45) / 10.7018 = 0.46722...
    const result = calculateSmd({ mean1: 50, sd1: 8, n1: 15, mean2: 45, sd2: 12, n2: 25 });
    const expectedPooledVar = (14 * 64 + 24 * 144) / 38;
    expect(result.pooledSd).toBeCloseTo(Math.sqrt(expectedPooledVar), 6);
    expect(result.cohensD).toBeCloseTo(5 / Math.sqrt(expectedPooledVar), 6);
  });

  it("computes Hedges' g as J(m) x Cohen's d", () => {
    // m = 38, J(38) = 1 - 3/(4*38-1) = 1 - 3/151 = 0.980132...
    const result = calculateSmd({ mean1: 75, sd1: 10, n1: 20, mean2: 70, sd2: 10, n2: 20 });
    const expectedJ = 1 - 3 / (4 * 38 - 1);
    expect(result.correctionFactor).toBeCloseTo(expectedJ, 6);
    expect(result.hedgesG).toBeCloseTo(expectedJ * 0.5, 6);
    // Hedges' g slightly shrinks Cohen's d toward 0
    expect(Math.abs(result.hedgesG)).toBeLessThan(Math.abs(result.cohensD));
  });

  it("returns a negative d when group 2 has the higher mean", () => {
    const result = calculateSmd({ mean1: 60, sd1: 5, n1: 10, mean2: 70, sd2: 5, n2: 10 });
    expect(result.cohensD).toBeLessThan(0);
  });

  it("throws when a group has fewer than 2 participants", () => {
    expect(() =>
      calculateSmd({ mean1: 60, sd1: 5, n1: 1, mean2: 70, sd2: 5, n2: 10 })
    ).toThrow();
  });

  it("throws when a standard deviation is negative", () => {
    expect(() =>
      calculateSmd({ mean1: 60, sd1: -1, n1: 10, mean2: 70, sd2: 5, n2: 10 })
    ).toThrow();
  });

  it("throws when pooled SD is 0", () => {
    expect(() =>
      calculateSmd({ mean1: 60, sd1: 0, n1: 10, mean2: 70, sd2: 0, n2: 10 })
    ).toThrow();
  });
});
