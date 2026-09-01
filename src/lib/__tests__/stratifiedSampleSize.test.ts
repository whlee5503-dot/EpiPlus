import { describe, it, expect } from "vitest";
import { calculateStratifiedSampleSize } from "../stratifiedSampleSize";
import type { Stratum } from "../stratifiedSampleSize";

// Hand-verifiable worked example: 3 strata, N = 1000 / 2000 / 3000 (N=6000),
// total n = 100. Formulas: Cochran (1977), Sampling Techniques, Ch. 5.
const STRATA: Stratum[] = [
  { id: "a", label: "Stratum A", populationSize: 1000, stdDev: 5 },
  { id: "b", label: "Stratum B", populationSize: 2000, stdDev: 10 },
  { id: "c", label: "Stratum C", populationSize: 3000, stdDev: 15 },
];

describe("calculateStratifiedSampleSize", () => {
  it("proportional allocation matches n_h = n * (N_h / N)", () => {
    // 100 * 1000/6000 = 16.667 -> 17
    // 100 * 2000/6000 = 33.333 -> 33
    // 100 * 3000/6000 = 50.000 -> 50
    const result = calculateStratifiedSampleSize({
      totalSampleSize: 100,
      method: "proportional",
      strata: STRATA,
    });
    expect(result.totalPopulationSize).toBe(6000);
    expect(result.allocations.map((a) => a.sampleSize)).toEqual([17, 33, 50]);
    expect(result.allocatedTotal).toBe(100);
  });

  it("equal allocation matches n_h = n / L", () => {
    // 100 / 3 = 33.333 -> 33 for each stratum (rounding leaves total at 99)
    const result = calculateStratifiedSampleSize({
      totalSampleSize: 100,
      method: "equal",
      strata: STRATA,
    });
    expect(result.allocations.map((a) => a.sampleSize)).toEqual([33, 33, 33]);
    expect(result.allocatedTotal).toBe(99);
  });

  it("Neyman allocation matches n_h = n * (N_h*S_h) / sum(N_h*S_h)", () => {
    // weights: 1000*5=5000, 2000*10=20000, 3000*15=45000, sum=70000
    // 100 * 5000/70000  = 7.143  -> 7
    // 100 * 20000/70000 = 28.571 -> 29
    // 100 * 45000/70000 = 64.286 -> 64
    const result = calculateStratifiedSampleSize({
      totalSampleSize: 100,
      method: "neyman",
      strata: STRATA,
    });
    expect(result.allocations.map((a) => a.sampleSize)).toEqual([7, 29, 64]);
    expect(result.allocatedTotal).toBe(100);
  });

  it("Neyman allocation reduces to proportional when all S_h are equal", () => {
    const equalVarianceStrata: Stratum[] = STRATA.map((s) => ({ ...s, stdDev: 10 }));
    const neyman = calculateStratifiedSampleSize({
      totalSampleSize: 100,
      method: "neyman",
      strata: equalVarianceStrata,
    });
    const proportional = calculateStratifiedSampleSize({
      totalSampleSize: 100,
      method: "proportional",
      strata: equalVarianceStrata,
    });
    expect(neyman.allocations.map((a) => a.sampleSize)).toEqual(
      proportional.allocations.map((a) => a.sampleSize)
    );
  });

  it("throws when Neyman allocation is missing a stdDev", () => {
    const missingStdDev: Stratum[] = [
      { id: "a", label: "A", populationSize: 1000 },
      { id: "b", label: "B", populationSize: 2000, stdDev: 10 },
    ];
    expect(() =>
      calculateStratifiedSampleSize({
        totalSampleSize: 100,
        method: "neyman",
        strata: missingStdDev,
      })
    ).toThrow();
  });

  it("throws on invalid totalSampleSize", () => {
    expect(() =>
      calculateStratifiedSampleSize({
        totalSampleSize: 0,
        method: "proportional",
        strata: STRATA,
      })
    ).toThrow();
  });

  it("throws on empty strata list", () => {
    expect(() =>
      calculateStratifiedSampleSize({
        totalSampleSize: 100,
        method: "proportional",
        strata: [],
      })
    ).toThrow();
  });
});
