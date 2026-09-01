import { describe, it, expect } from "vitest";
import { calculatePaf } from "../paf";

describe("calculatePaf", () => {
  it("matches the MetricGate worked example (Pe=0.40, RR=4.0 -> PAF=0.5455)", () => {
    // Source: metricgate.com "Population Attributable Risk (PAR/PAF) Calculator"
    // a=40, b=160, c=15, d=285 -> Pe=0.40, RR=4.0 -> PAF=0.5455
    const result = calculatePaf({
      mode: "direct",
      exposurePrevalence: 0.4,
      relativeRisk: 4.0,
    });
    expect(result.paf).toBeCloseTo(0.5455, 3);
  });

  it("matches the Biology Insights worked example (Pe=0.40, RR=3 -> PAF=0.44)", () => {
    // Source: biologyinsights.com "How to Calculate Attributable Risk"
    const result = calculatePaf({
      mode: "direct",
      exposurePrevalence: 0.4,
      relativeRisk: 3,
    });
    expect(result.paf).toBeCloseTo(0.44, 2);
  });

  it("derives Pe and RR from a 2x2 table and matches the direct-input result", () => {
    // Same MetricGate example, entered as raw counts instead of Pe/RR directly.
    // a=40, b=160, c=15, d=285
    const result = calculatePaf({
      mode: "table2x2",
      exposedCases: 40,
      exposedNonCases: 160,
      unexposedCases: 15,
      unexposedNonCases: 285,
    });
    expect(result.exposurePrevalence).toBeCloseTo(0.4, 5);
    expect(result.relativeRisk).toBeCloseTo(4.0, 5);
    expect(result.paf).toBeCloseTo(0.5455, 3);
  });

  it("returns a negative PAF for a protective factor (RR < 1)", () => {
    const result = calculatePaf({
      mode: "direct",
      exposurePrevalence: 0.3,
      relativeRisk: 0.5,
    });
    expect(result.paf).toBeLessThan(0);
  });

  it("throws when exposure prevalence is out of range", () => {
    expect(() =>
      calculatePaf({ mode: "direct", exposurePrevalence: 1.2, relativeRisk: 2 })
    ).toThrow();
  });

  it("throws when relative risk is not positive", () => {
    expect(() =>
      calculatePaf({ mode: "direct", exposurePrevalence: 0.3, relativeRisk: 0 })
    ).toThrow();
  });

  it("throws when the 2x2 table has an empty exposed or unexposed group", () => {
    expect(() =>
      calculatePaf({
        mode: "table2x2",
        exposedCases: 0,
        exposedNonCases: 0,
        unexposedCases: 15,
        unexposedNonCases: 285,
      })
    ).toThrow();
  });

  it("throws when unexposed cases (c) is 0, making relative risk undefined", () => {
    expect(() =>
      calculatePaf({
        mode: "table2x2",
        exposedCases: 40,
        exposedNonCases: 160,
        unexposedCases: 0,
        unexposedNonCases: 300,
      })
    ).toThrow();
  });
});
