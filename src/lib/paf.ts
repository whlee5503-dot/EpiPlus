/**
 * Population Attributable Fraction (PAF) calculator, using Levin's formula.
 *
 * Formula source: Levin, M.L. (1953). The occurrence of lung cancer in man.
 *                  Acta Unio Int Contra Cancrum, 9(3): 531-541.
 *
 * PAF = Pe(RR - 1) / [1 + Pe(RR - 1)]
 *
 * where Pe = prevalence of the exposure/risk factor in the population,
 * and RR = relative risk of disease for exposed vs. unexposed individuals.
 *
 * Two equivalent input modes are supported:
 *  - "direct": Pe and RR are supplied directly (e.g. taken from a
 *    published study or a GBD-style aggregate estimate).
 *  - "table2x2": a 2x2 exposure/disease contingency table is supplied,
 *    from which Pe and RR are derived before applying Levin's formula.
 *
 * Levin's formula is unbiased only when the exposure-disease relationship
 * is unconfounded; a confounder-adjusted RR should be used whenever one
 * is available.
 *
 * A negative PAF (which occurs when RR < 1) indicates a protective
 * factor: removing it would be expected to increase, not decrease,
 * disease frequency in the population.
 */

export type PafInput = PafDirectInput | PafTable2x2Input;

export interface PafDirectInput {
  mode: "direct";
  /** Prevalence of the exposure/risk factor in the population (Pe), 0 to 1 */
  exposurePrevalence: number;
  /** Relative risk of disease, exposed vs. unexposed (RR), > 0 */
  relativeRisk: number;
}

export interface PafTable2x2Input {
  mode: "table2x2";
  /** Exposed, disease-positive (a) */
  exposedCases: number;
  /** Exposed, disease-negative (b) */
  exposedNonCases: number;
  /** Unexposed, disease-positive (c) */
  unexposedCases: number;
  /** Unexposed, disease-negative (d) */
  unexposedNonCases: number;
}

export interface PafResult {
  mode: PafInput["mode"];
  exposurePrevalence: number;
  relativeRisk: number;
  /** Levin's PAF; negative values indicate a protective factor */
  paf: number;
}

export function calculatePaf(input: PafInput): PafResult {
  let exposurePrevalence: number;
  let relativeRisk: number;

  if (input.mode === "direct") {
    exposurePrevalence = input.exposurePrevalence;
    relativeRisk = input.relativeRisk;

    if (exposurePrevalence < 0 || exposurePrevalence > 1) {
      throw new Error("Exposure prevalence must be between 0 and 1");
    }
    if (relativeRisk <= 0) {
      throw new Error("Relative risk must be greater than 0");
    }
  } else {
    const { exposedCases: a, exposedNonCases: b, unexposedCases: c, unexposedNonCases: d } =
      input;

    if (a < 0 || b < 0 || c < 0 || d < 0) {
      throw new Error("Cell counts must be zero or greater");
    }
    const totalExposed = a + b;
    const totalUnexposed = c + d;
    const total = totalExposed + totalUnexposed;

    if (totalExposed <= 0 || totalUnexposed <= 0) {
      throw new Error("Both the exposed and unexposed groups must have at least one person");
    }
    if (c <= 0) {
      throw new Error("Unexposed cases (c) must be greater than 0 to compute relative risk");
    }

    exposurePrevalence = totalExposed / total;
    relativeRisk = a / totalExposed / (c / totalUnexposed);
  }

  const paf =
    (exposurePrevalence * (relativeRisk - 1)) / (1 + exposurePrevalence * (relativeRisk - 1));

  return {
    mode: input.mode,
    exposurePrevalence,
    relativeRisk,
    paf,
  };
}
