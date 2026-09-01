/**
 * Number Needed to Treat (NNT) / Number Needed to Harm (NNH) calculator.
 *
 * Formula source: Centre for Evidence-Based Medicine, University of Oxford,
 *                  "Number Needed to Treat (NNT)".
 *                  ClinCalc, "Number Needed to Treat (NNT) Calculator".
 *
 * ARR (Absolute Risk Reduction) = CER - EER   (CER = control event rate,
 *                                              EER = experimental event rate)
 * NNT = 1 / ARR, rounded up to the next whole number
 *
 * When the experimental condition increases the event rate rather than
 * reducing it (EER > CER), the same computation is reported as the
 * Absolute Risk Increase (ARI = EER - CER) and Number Needed to Harm
 * (NNH = 1 / ARI, rounded up).
 */

export interface NntInput {
  /** Control/comparison group event rate (0 to 1) */
  controlEventRate: number;
  /** Experimental/treatment group event rate (0 to 1) */
  experimentalEventRate: number;
}

export type NntDirection = "benefit" | "harm" | "none";

export interface NntResult {
  controlEventRate: number;
  experimentalEventRate: number;
  /** CER - EER; positive means the treatment reduced the event rate */
  absoluteRiskReduction: number;
  direction: NntDirection;
  /** Number needed to treat, rounded up; present when direction is "benefit" */
  nnt?: number;
  /** Number needed to harm, rounded up; present when direction is "harm" */
  nnh?: number;
}

export function calculateNnt(input: NntInput): NntResult {
  const { controlEventRate, experimentalEventRate } = input;

  if (controlEventRate < 0 || controlEventRate > 1) {
    throw new Error("Control event rate must be between 0 and 1");
  }
  if (experimentalEventRate < 0 || experimentalEventRate > 1) {
    throw new Error("Experimental event rate must be between 0 and 1");
  }

  const absoluteRiskReduction = controlEventRate - experimentalEventRate;

  // Guard against floating-point noise (e.g. 0.5 - 0.4 = 0.09999999999999998
  // in IEEE 754), which would otherwise push Math.ceil(1/x) up by one.
  const roundedArr = Math.round(absoluteRiskReduction * 1e10) / 1e10;

  if (roundedArr > 0) {
    return {
      controlEventRate,
      experimentalEventRate,
      absoluteRiskReduction,
      direction: "benefit",
      nnt: Math.ceil(1 / roundedArr),
    };
  }

  if (roundedArr < 0) {
    const absoluteRiskIncrease = -roundedArr;
    return {
      controlEventRate,
      experimentalEventRate,
      absoluteRiskReduction,
      direction: "harm",
      nnh: Math.ceil(1 / absoluteRiskIncrease),
    };
  }

  return {
    controlEventRate,
    experimentalEventRate,
    absoluteRiskReduction,
    direction: "none",
  };
}
