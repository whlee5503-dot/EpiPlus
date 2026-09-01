import { describe, it, expect } from "vitest";
import { calculateAgeStandardization } from "../ageStandardization";

describe("calculateAgeStandardization - direct method", () => {
  // Hand-verifiable 3-group example. Formula source: NC Statistical Primer
  // 13-2 "Age-Adjusted Rates"; NM-IBIS "Age-adjusted Rates"; Health
  // Knowledge "Standardisation" (Hennekens & Buring, 1987) - all three
  // independently confirm: directly age-adjusted rate = sum(w_i * rate_i)
  // where rate_i = study deaths_i / study population_i and w_i is the
  // standard population's proportional weight.
  const ageGroups = [
    { id: "a", label: "0-19", studyDeaths: 10, studyPopulation: 5000, standardPopulation: 2000 },
    { id: "b", label: "20-59", studyDeaths: 40, studyPopulation: 8000, standardPopulation: 5000 },
    { id: "c", label: "60+", studyDeaths: 30, studyPopulation: 2000, standardPopulation: 3000 },
  ];

  it("computes per-group rates, weights and expected deaths", () => {
    const result = calculateAgeStandardization({ method: "direct", ageGroups });
    if (result.method !== "direct") throw new Error("expected direct result");

    expect(result.ageGroups[0].rate).toBeCloseTo(0.002, 6);
    expect(result.ageGroups[1].rate).toBeCloseTo(0.005, 6);
    expect(result.ageGroups[2].rate).toBeCloseTo(0.015, 6);

    expect(result.ageGroups[0].weight).toBeCloseTo(0.2, 6);
    expect(result.ageGroups[1].weight).toBeCloseTo(0.5, 6);
    expect(result.ageGroups[2].weight).toBeCloseTo(0.3, 6);

    // expected deaths = rate x standard population
    expect(result.ageGroups[0].expectedDeaths).toBeCloseTo(4, 6); // 0.002*2000
    expect(result.ageGroups[1].expectedDeaths).toBeCloseTo(25, 6); // 0.005*5000
    expect(result.ageGroups[2].expectedDeaths).toBeCloseTo(45, 6); // 0.015*3000
  });

  it("computes the directly standardized rate as sum(expected)/sum(standard pop)", () => {
    const result = calculateAgeStandardization({ method: "direct", ageGroups });
    if (result.method !== "direct") throw new Error("expected direct result");

    expect(result.totalStandardPopulation).toBe(10000);
    // 4 + 25 + 45 = 74
    expect(result.totalExpectedDeaths).toBeCloseTo(74, 6);
    // 74 / 10000 = 0.0074
    expect(result.standardizedRate).toBeCloseTo(0.0074, 8);
  });

  it("matches the weighted-average formulation (sum of w_i * rate_i)", () => {
    // Cross-check: 0.2*0.002 + 0.5*0.005 + 0.3*0.015 = 0.0074
    const weightedSum = 0.2 * 0.002 + 0.5 * 0.005 + 0.3 * 0.015;
    const result = calculateAgeStandardization({ method: "direct", ageGroups });
    if (result.method !== "direct") throw new Error("expected direct result");
    expect(result.standardizedRate).toBeCloseTo(weightedSum, 8);
  });

  it("throws when an age group is missing", () => {
    expect(() => calculateAgeStandardization({ method: "direct", ageGroups: [] })).toThrow();
  });

  it("throws when study population is not positive", () => {
    expect(() =>
      calculateAgeStandardization({
        method: "direct",
        ageGroups: [
          { id: "a", label: "0-19", studyDeaths: 10, studyPopulation: 0, standardPopulation: 2000 },
        ],
      })
    ).toThrow();
  });
});

describe("calculateAgeStandardization - indirect method", () => {
  // Hand-verifiable example following the same sources as above.
  const ageGroups = [
    { id: "a", label: "0-19", standardRate: 0.001, studyPopulation: 3000 },
    { id: "b", label: "20-59", standardRate: 0.004, studyPopulation: 4000 },
    { id: "c", label: "60+", standardRate: 0.02, studyPopulation: 1000 },
  ];

  it("computes expected deaths per group and total", () => {
    const result = calculateAgeStandardization({
      method: "indirect",
      ageGroups,
      observedDeaths: 50,
    });
    if (result.method !== "indirect") throw new Error("expected indirect result");

    expect(result.ageGroups[0].expectedDeaths).toBeCloseTo(3, 6); // 0.001*3000
    expect(result.ageGroups[1].expectedDeaths).toBeCloseTo(16, 6); // 0.004*4000
    expect(result.ageGroups[2].expectedDeaths).toBeCloseTo(20, 6); // 0.02*1000
    // 3 + 16 + 20 = 39
    expect(result.totalExpectedDeaths).toBeCloseTo(39, 6);
  });

  it("computes SMR = observed / expected", () => {
    const result = calculateAgeStandardization({
      method: "indirect",
      ageGroups,
      observedDeaths: 50,
    });
    if (result.method !== "indirect") throw new Error("expected indirect result");
    // 50 / 39 = 1.282051...
    expect(result.smr).toBeCloseTo(50 / 39, 6);
  });

  it("computes the indirectly adjusted rate as SMR x reference crude rate", () => {
    const result = calculateAgeStandardization({
      method: "indirect",
      ageGroups,
      observedDeaths: 50,
      referenceCrudeRate: 0.006,
    });
    if (result.method !== "indirect") throw new Error("expected indirect result");
    // SMR = 50/39 = 1.282051..., x 0.006 = 0.0076923...
    expect(result.indirectlyAdjustedRate).toBeCloseTo((50 / 39) * 0.006, 8);
  });

  it("omits the indirectly adjusted rate when no reference crude rate is given", () => {
    const result = calculateAgeStandardization({
      method: "indirect",
      ageGroups,
      observedDeaths: 50,
    });
    if (result.method !== "indirect") throw new Error("expected indirect result");
    expect(result.indirectlyAdjustedRate).toBeUndefined();
  });

  it("throws when total expected deaths is 0", () => {
    expect(() =>
      calculateAgeStandardization({
        method: "indirect",
        ageGroups: [{ id: "a", label: "0-19", standardRate: 0, studyPopulation: 1000 }],
        observedDeaths: 10,
      })
    ).toThrow();
  });

  it("throws when observed deaths is negative", () => {
    expect(() =>
      calculateAgeStandardization({ method: "indirect", ageGroups, observedDeaths: -1 })
    ).toThrow();
  });
});
