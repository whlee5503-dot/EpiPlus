import { describe, it, expect } from "vitest";
import { calculateNnt } from "../nnt";

describe("calculateNnt", () => {
  it("matches the CEBM Oxford worked example (CER=0.5, EER=0.3 -> NNT=5)", () => {
    // Source: cebm.ox.ac.uk "Number Needed to Treat (NNT)"
    const result = calculateNnt({ controlEventRate: 0.5, experimentalEventRate: 0.3 });
    expect(result.absoluteRiskReduction).toBeCloseTo(0.2, 6);
    expect(result.direction).toBe("benefit");
    expect(result.nnt).toBe(5);
  });

  it("matches the ClinCalc worked example (CER=0.26, EER=0.16 -> NNT=10)", () => {
    // Source: clincalc.com/Stats/NNT.aspx
    const result = calculateNnt({ controlEventRate: 0.26, experimentalEventRate: 0.16 });
    expect(result.absoluteRiskReduction).toBeCloseTo(0.1, 6);
    expect(result.direction).toBe("benefit");
    expect(result.nnt).toBe(10);
  });

  it("matches the Wikipedia NNH worked example (EER=0.5, CER=0.4 -> NNH=10)", () => {
    // Source: en.wikipedia.org/wiki/Number_needed_to_harm
    // Experimental group: 75/150 = 0.5; Control group: 100/250 = 0.4
    const result = calculateNnt({ controlEventRate: 0.4, experimentalEventRate: 0.5 });
    expect(result.absoluteRiskReduction).toBeCloseTo(-0.1, 6);
    expect(result.direction).toBe("harm");
    expect(result.nnh).toBe(10);
  });

  it("matches the Medicines Learning Portal NNH worked example (ARI=0.04 -> NNH=25)", () => {
    // Source: medicineslearningportal.org, anotheraban major-bleeding example
    // ARI = 82/2000 - 2/2000 = 0.04
    const result = calculateNnt({
      controlEventRate: 2 / 2000,
      experimentalEventRate: 82 / 2000,
    });
    expect(result.absoluteRiskReduction).toBeCloseTo(-0.04, 6);
    expect(result.direction).toBe("harm");
    expect(result.nnh).toBe(25);
  });

  it("returns direction 'none' with no NNT/NNH when rates are equal", () => {
    const result = calculateNnt({ controlEventRate: 0.3, experimentalEventRate: 0.3 });
    expect(result.direction).toBe("none");
    expect(result.nnt).toBeUndefined();
    expect(result.nnh).toBeUndefined();
  });

  it("throws when a rate is out of range", () => {
    expect(() =>
      calculateNnt({ controlEventRate: 1.2, experimentalEventRate: 0.3 })
    ).toThrow();
  });
});
