import { describe, it, expect } from "vitest";
import { calculatePoissonRegression } from "../poissonRegression";

describe("calculatePoissonRegression", () => {
  it("matches the Statology smoker/non-smoker rate example (IRR=0.7)", () => {
    // Source: statology.org "What is Incidence Rate Ratio?"
    // Smokers: 7 per 100 person-years; non-smokers: 10 per 100 person-years -> IRR=0.7
    const result = calculatePoissonRegression({
      groups: [
        { id: "nonsmoker", label: "Non-smokers", events: 10, personTime: 100 },
        { id: "smoker", label: "Smokers", events: 7, personTime: 100 },
      ],
      referenceGroupId: "nonsmoker",
    });
    const smokers = result.groups.find((g) => g.id === "smoker")!;
    expect(smokers.rate).toBeCloseTo(0.07, 6);
    expect(smokers.irr).toBeCloseTo(0.7, 6);
  });

  it("computes rate, IRR and Wald CI on a hand-verified example", () => {
    // Exposed: 20 events / 500 person-years -> rate 0.04
    // Unexposed (reference): 10 events / 1000 person-years -> rate 0.01
    // IRR = 0.04/0.01 = 4.0
    // SE(ln IRR) = sqrt(1/20 + 1/10) = sqrt(0.15) = 0.387298...
    // 95% CI = exp(ln(4) +/- 1.959964*0.387298) = exp(1.386294 +/- 0.759104)
    //        = (exp(0.627190), exp(2.145398)) = (1.8724, 8.5457)
    const result = calculatePoissonRegression({
      groups: [
        { id: "unexposed", label: "Unexposed", events: 10, personTime: 1000 },
        { id: "exposed", label: "Exposed", events: 20, personTime: 500 },
      ],
      referenceGroupId: "unexposed",
    });

    const unexposed = result.groups.find((g) => g.id === "unexposed")!;
    expect(unexposed.rate).toBeCloseTo(0.01, 6);
    expect(unexposed.irr).toBe(1);
    expect(unexposed.irrLower).toBeUndefined();
    expect(unexposed.irrUpper).toBeUndefined();

    const exposed = result.groups.find((g) => g.id === "exposed")!;
    expect(exposed.rate).toBeCloseTo(0.04, 6);
    expect(exposed.irr).toBeCloseTo(4.0, 6);
    expect(exposed.irrLower).toBeCloseTo(1.8724, 3);
    expect(exposed.irrUpper).toBeCloseTo(8.5457, 3);
  });

  it("supports more than two groups, each compared to the same reference", () => {
    const result = calculatePoissonRegression({
      groups: [
        { id: "ref", label: "Reference", events: 10, personTime: 1000 },
        { id: "a", label: "Group A", events: 20, personTime: 1000 },
        { id: "b", label: "Group B", events: 5, personTime: 1000 },
      ],
      referenceGroupId: "ref",
    });
    const a = result.groups.find((g) => g.id === "a")!;
    const b = result.groups.find((g) => g.id === "b")!;
    expect(a.irr).toBeCloseTo(2.0, 6);
    expect(b.irr).toBeCloseTo(0.5, 6);
  });

  it("throws when fewer than 2 groups are provided", () => {
    expect(() =>
      calculatePoissonRegression({
        groups: [{ id: "a", label: "A", events: 10, personTime: 100 }],
        referenceGroupId: "a",
      })
    ).toThrow();
  });

  it("throws when the reference group id doesn't match any group", () => {
    expect(() =>
      calculatePoissonRegression({
        groups: [
          { id: "a", label: "A", events: 10, personTime: 100 },
          { id: "b", label: "B", events: 5, personTime: 100 },
        ],
        referenceGroupId: "missing",
      })
    ).toThrow();
  });

  it("throws when person-time is not positive", () => {
    expect(() =>
      calculatePoissonRegression({
        groups: [
          { id: "a", label: "A", events: 10, personTime: 0 },
          { id: "b", label: "B", events: 5, personTime: 100 },
        ],
        referenceGroupId: "a",
      })
    ).toThrow();
  });

  it("throws when the reference group has zero events", () => {
    expect(() =>
      calculatePoissonRegression({
        groups: [
          { id: "a", label: "A", events: 0, personTime: 100 },
          { id: "b", label: "B", events: 5, personTime: 100 },
        ],
        referenceGroupId: "a",
      })
    ).toThrow();
  });
});
