/**
 * Vaccine Effectiveness (VE) calculator.
 *
 * Formula source: definition used across CDC/WHO vaccine effectiveness
 *                  guidance and confirmed independently by MetricGate's
 *                  "Vaccine Efficacy (VE) Calculator" documentation and by
 *                  Kissler et al., arXiv:2212.11679 ("Some reflections on
 *                  the test-negative design").
 *
 * VE = 1 - RR = (ARu - ARv) / ARu
 *
 * where ARv = attack rate in the vaccinated group, ARu = attack rate in
 * the unvaccinated group, and RR = ARv / ARu.
 *
 * Two equivalent input modes are supported:
 *  - "rates": ARv and ARu are supplied directly.
 *  - "counts": case counts and group totals are supplied for each group,
 *    from which the attack rates are derived before applying the formula.
 */

export type VaccineEffectivenessInput = VeRatesInput | VeCountsInput;

export interface VeRatesInput {
  mode: "rates";
  /** Attack rate in the vaccinated group (0 to 1) */
  attackRateVaccinated: number;
  /** Attack rate in the unvaccinated group (0 to 1) */
  attackRateUnvaccinated: number;
}

export interface VeCountsInput {
  mode: "counts";
  casesVaccinated: number;
  totalVaccinated: number;
  casesUnvaccinated: number;
  totalUnvaccinated: number;
}

export interface VaccineEffectivenessResult {
  mode: VaccineEffectivenessInput["mode"];
  attackRateVaccinated: number;
  attackRateUnvaccinated: number;
  relativeRisk: number;
  /** VE; negative values indicate the vaccinated group had a higher attack rate */
  ve: number;
}

export function calculateVaccineEffectiveness(
  input: VaccineEffectivenessInput
): VaccineEffectivenessResult {
  let attackRateVaccinated: number;
  let attackRateUnvaccinated: number;

  if (input.mode === "rates") {
    attackRateVaccinated = input.attackRateVaccinated;
    attackRateUnvaccinated = input.attackRateUnvaccinated;

    if (attackRateVaccinated < 0 || attackRateVaccinated > 1) {
      throw new Error("Attack rate in the vaccinated group must be between 0 and 1");
    }
    if (attackRateUnvaccinated < 0 || attackRateUnvaccinated > 1) {
      throw new Error("Attack rate in the unvaccinated group must be between 0 and 1");
    }
  } else {
    const { casesVaccinated, totalVaccinated, casesUnvaccinated, totalUnvaccinated } = input;

    if (casesVaccinated < 0 || casesUnvaccinated < 0) {
      throw new Error("Case counts must be zero or greater");
    }
    if (totalVaccinated <= 0 || totalUnvaccinated <= 0) {
      throw new Error("Group totals must be greater than 0");
    }
    if (casesVaccinated > totalVaccinated || casesUnvaccinated > totalUnvaccinated) {
      throw new Error("Case counts cannot exceed the corresponding group total");
    }

    attackRateVaccinated = casesVaccinated / totalVaccinated;
    attackRateUnvaccinated = casesUnvaccinated / totalUnvaccinated;
  }

  if (attackRateUnvaccinated <= 0) {
    throw new Error("Attack rate in the unvaccinated group must be greater than 0");
  }

  const relativeRisk = attackRateVaccinated / attackRateUnvaccinated;
  const ve = 1 - relativeRisk;

  return {
    mode: input.mode,
    attackRateVaccinated,
    attackRateUnvaccinated,
    relativeRisk,
    ve,
  };
}
