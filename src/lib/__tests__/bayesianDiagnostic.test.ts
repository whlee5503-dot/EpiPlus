import { describe, it, expect } from "vitest";
import { calculateBayesianDiagnostic } from "../bayesianDiagnostic";

describe("calculateBayesianDiagnostic", () => {
  it("matches the VarsityTutors worked example (Se=0.90, Sp=0.95, Prev=0.08 -> PPV=0.610)", () => {
    // Source: varsitytutors.com "Sensitivity, Specificity, PPV & NPV"
    // PPV = (0.90*0.08) / (0.90*0.08 + 0.05*0.92) = 0.072/0.118 = 0.6102
    const result = calculateBayesianDiagnostic({
      mode: "direct",
      sensitivity: 0.9,
      specificity: 0.95,
      prevalence: 0.08,
    });
    expect(result.ppv).toBeCloseTo(0.6102, 3);
  });

  it("matches the best-calculators.com rapid-test worked example (2x2 table)", () => {
    // Source: best-calculators.com "Sensitivity and Specificity Calculator"
    // 1000 people: 95 TP, 5 FN, 880 TN, 20 FP
    // -> Se=95%, Sp=97.78%, Prev=10%, PPV=82.61%, NPV=99.44%
    const result = calculateBayesianDiagnostic({
      mode: "table2x2",
      tp: 95,
      fn: 5,
      tn: 880,
      fp: 20,
    });
    expect(result.sensitivity).toBeCloseTo(0.95, 4);
    expect(result.specificity).toBeCloseTo(0.9778, 3);
    expect(result.prevalence).toBeCloseTo(0.1, 4);
    expect(result.ppv).toBeCloseTo(0.8261, 3);
    expect(result.npv).toBeCloseTo(0.9944, 3);
  });

  it("computes likelihood ratios", () => {
    // LR+ = Se/(1-Sp) = 0.95/(1-0.9778) = 0.95/0.0222 = 42.79
    // LR- = (1-Se)/Sp = 0.05/0.9778 = 0.05114
    const result = calculateBayesianDiagnostic({
      mode: "table2x2",
      tp: 95,
      fn: 5,
      tn: 880,
      fp: 20,
    });
    expect(result.positiveLikelihoodRatio).toBeCloseTo(42.75, 1);
    expect(result.negativeLikelihoodRatio).toBeCloseTo(0.0511, 3);
  });

  it("cross-validates direct and table2x2 modes on the same underlying data", () => {
    const direct = calculateBayesianDiagnostic({
      mode: "direct",
      sensitivity: 95 / 100,
      specificity: 880 / 900,
      prevalence: 100 / 1000,
    });
    const table = calculateBayesianDiagnostic({
      mode: "table2x2",
      tp: 95,
      fn: 5,
      tn: 880,
      fp: 20,
    });
    expect(direct.ppv).toBeCloseTo(table.ppv, 6);
    expect(direct.npv).toBeCloseTo(table.npv, 6);
  });

  it("throws when prevalence is out of range", () => {
    expect(() =>
      calculateBayesianDiagnostic({
        mode: "direct",
        sensitivity: 0.9,
        specificity: 0.9,
        prevalence: 1.5,
      })
    ).toThrow();
  });

  it("throws when specificity is 1 (division by zero in LR+)", () => {
    expect(() =>
      calculateBayesianDiagnostic({
        mode: "direct",
        sensitivity: 0.9,
        specificity: 1,
        prevalence: 0.1,
      })
    ).toThrow();
  });

  it("throws when the 2x2 table has no diseased individuals", () => {
    expect(() =>
      calculateBayesianDiagnostic({ mode: "table2x2", tp: 0, fn: 0, tn: 880, fp: 20 })
    ).toThrow();
  });
});
