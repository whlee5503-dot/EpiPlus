import { describe, it, expect } from "vitest";
import { calculateDaly } from "../daly";

describe("calculateDaly", () => {
  it("matches the ScienceInsights worked example (50 deaths, LE=20 -> YLL=1000)", () => {
    // Source: scienceinsights.org "How to Calculate DALYs: YLL, YLD, and
    // Worked Examples" - 50 deaths at average age 60, reference life
    // expectancy at 60 is 20 years.
    const result = calculateDaly({
      yllItems: [{ id: "a", label: "Cause A", deaths: 50, lifeExpectancy: 20 }],
      yldMethod: "prevalence",
      yldItems: [],
    });
    expect(result.totalYll).toBe(1000);
  });

  it("matches the ScienceInsights grouped example (100 deaths, LE=33 -> YLL=3300)", () => {
    // Source: same article - "If 100 people die at age 50 and the
    // reference life expectancy at 50 is 33 years, that group
    // contributes 3,300 YLLs."
    const result = calculateDaly({
      yllItems: [{ id: "a", label: "Age 50 group", deaths: 100, lifeExpectancy: 33 }],
      yldMethod: "prevalence",
      yldItems: [],
    });
    expect(result.totalYll).toBe(3300);
  });

  it("matches the ScienceInsights prevalence-based YLD example (2000 cases, DW=0.15 -> YLD=300)", () => {
    const result = calculateDaly({
      yllItems: [],
      yldMethod: "prevalence",
      yldItems: [{ id: "a", label: "Disease X", cases: 2000, disabilityWeight: 0.15 }],
    });
    expect(result.totalYld).toBe(300);
  });

  it("matches the full ScienceInsights worked example (YLL 1000 + YLD 300 = DALY 1300)", () => {
    const result = calculateDaly({
      yllItems: [{ id: "a", label: "Cause A", deaths: 50, lifeExpectancy: 20 }],
      yldMethod: "prevalence",
      yldItems: [{ id: "b", label: "Disease X", cases: 2000, disabilityWeight: 0.15 }],
    });
    expect(result.totalYll).toBe(1000);
    expect(result.totalYld).toBe(300);
    expect(result.totalDaly).toBe(1300);
  });

  it("computes incidence-based YLD as cases x DW x duration", () => {
    // Hand-verified: 10 incident cases x DW 0.5 x 4 years duration = 20
    const result = calculateDaly({
      yllItems: [],
      yldMethod: "incidence",
      yldItems: [{ id: "a", label: "Condition Y", cases: 10, disabilityWeight: 0.5, duration: 4 }],
    });
    expect(result.totalYld).toBe(20);
  });

  it("sums multiple YLL and YLD line items", () => {
    const result = calculateDaly({
      yllItems: [
        { id: "a", label: "Cause A", deaths: 50, lifeExpectancy: 20 },
        { id: "b", label: "Cause B", deaths: 100, lifeExpectancy: 33 },
      ],
      yldMethod: "incidence",
      yldItems: [
        { id: "c", label: "Condition X", cases: 10, disabilityWeight: 0.5, duration: 4 },
        { id: "d", label: "Condition Y", cases: 5, disabilityWeight: 0.2, duration: 2 },
      ],
    });
    expect(result.totalYll).toBe(1000 + 3300);
    expect(result.totalYld).toBe(20 + 2);
    expect(result.totalDaly).toBe(4300 + 22);
  });

  it("throws when disability weight is out of range", () => {
    expect(() =>
      calculateDaly({
        yllItems: [],
        yldMethod: "prevalence",
        yldItems: [{ id: "a", label: "X", cases: 100, disabilityWeight: 1.5 }],
      })
    ).toThrow();
  });

  it("throws when incidence method is missing a duration", () => {
    expect(() =>
      calculateDaly({
        yllItems: [],
        yldMethod: "incidence",
        yldItems: [{ id: "a", label: "X", cases: 100, disabilityWeight: 0.3 }],
      })
    ).toThrow();
  });

  it("throws when life expectancy is not positive", () => {
    expect(() =>
      calculateDaly({
        yllItems: [{ id: "a", label: "X", deaths: 10, lifeExpectancy: 0 }],
        yldMethod: "prevalence",
        yldItems: [],
      })
    ).toThrow();
  });

  it("throws when both YLL and YLD item lists are empty", () => {
    expect(() =>
      calculateDaly({ yllItems: [], yldMethod: "prevalence", yldItems: [] })
    ).toThrow();
  });
});
