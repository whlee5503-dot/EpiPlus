import { describe, it, expect } from "vitest";
import { calculateVaccineEffectiveness } from "../vaccineEffectiveness";

describe("calculateVaccineEffectiveness", () => {
  it("matches the Kissler et al. test-negative-design worked example (counts mode)", () => {
    // Source: arxiv.org/pdf/2212.11679, "Some reflections on the test-negative design"
    // 10,000 vaccinated (100 cases, AR=1%), 10,000 unvaccinated (1,000 cases, AR=10%)
    const result = calculateVaccineEffectiveness({
      mode: "counts",
      casesVaccinated: 100,
      totalVaccinated: 10000,
      casesUnvaccinated: 1000,
      totalUnvaccinated: 10000,
    });
    expect(result.attackRateVaccinated).toBeCloseTo(0.01, 6);
    expect(result.attackRateUnvaccinated).toBeCloseTo(0.1, 6);
    expect(result.relativeRisk).toBeCloseTo(0.1, 6);
    expect(result.ve).toBeCloseTo(0.9, 6);
  });

  it("matches the same example entered directly as rates", () => {
    const result = calculateVaccineEffectiveness({
      mode: "rates",
      attackRateVaccinated: 0.01,
      attackRateUnvaccinated: 0.1,
    });
    expect(result.ve).toBeCloseTo(0.9, 6);
  });

  it("returns a negative VE when the vaccinated group has a higher attack rate", () => {
    const result = calculateVaccineEffectiveness({
      mode: "rates",
      attackRateVaccinated: 0.2,
      attackRateUnvaccinated: 0.1,
    });
    expect(result.ve).toBeLessThan(0);
    expect(result.relativeRisk).toBeCloseTo(2, 6);
  });

  it("throws when attack rate is out of range", () => {
    expect(() =>
      calculateVaccineEffectiveness({
        mode: "rates",
        attackRateVaccinated: 1.5,
        attackRateUnvaccinated: 0.1,
      })
    ).toThrow();
  });

  it("throws when unvaccinated attack rate is 0", () => {
    expect(() =>
      calculateVaccineEffectiveness({
        mode: "rates",
        attackRateVaccinated: 0,
        attackRateUnvaccinated: 0,
      })
    ).toThrow();
  });

  it("throws when case counts exceed group totals", () => {
    expect(() =>
      calculateVaccineEffectiveness({
        mode: "counts",
        casesVaccinated: 200,
        totalVaccinated: 100,
        casesUnvaccinated: 1000,
        totalUnvaccinated: 10000,
      })
    ).toThrow();
  });
});
