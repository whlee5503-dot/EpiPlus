/**
 * Age Standardization calculator (direct and indirect methods).
 *
 * Formula source: Lilienfeld, D.E. & Stolley, P.D. (1994). Foundations of
 *                  Epidemiology. Oxford University Press.
 *                  NC State Center for Health Statistics, Statistical
 *                  Primer No. 13-2, "Age-Adjusted Rates".
 *                  Health Knowledge, "Standardisation" (citing Hennekens &
 *                  Buring, Epidemiology in Medicine, 1987).
 *
 * DIRECT method:
 *   rate_i             = study deaths_i / study population_i
 *   expected deaths_i  = rate_i x standard population_i
 *   directly standardized rate = sum(expected deaths_i) / sum(standard population_i)
 *
 * INDIRECT method:
 *   expected deaths_i  = standard/reference rate_i x study population_i
 *   SMR                = observed deaths / sum(expected deaths_i)
 *   indirectly adjusted rate (optional) = SMR x reference crude rate
 */

export interface DirectAgeGroup {
  id: string;
  label: string;
  /** Observed deaths in the study population for this age group */
  studyDeaths: number;
  /** Study population size for this age group */
  studyPopulation: number;
  /** Standard population size for this age group */
  standardPopulation: number;
}

export interface DirectAgeGroupResult extends DirectAgeGroup {
  rate: number;
  weight: number;
  expectedDeaths: number;
}

export interface DirectInput {
  method: "direct";
  ageGroups: DirectAgeGroup[];
}

export interface DirectResult {
  method: "direct";
  ageGroups: DirectAgeGroupResult[];
  totalStandardPopulation: number;
  totalExpectedDeaths: number;
  standardizedRate: number;
}

export interface IndirectAgeGroup {
  id: string;
  label: string;
  /** Age-specific rate from the standard/reference population */
  standardRate: number;
  /** Study population size for this age group */
  studyPopulation: number;
}

export interface IndirectAgeGroupResult extends IndirectAgeGroup {
  expectedDeaths: number;
}

export interface IndirectInput {
  method: "indirect";
  ageGroups: IndirectAgeGroup[];
  /** Total observed deaths in the study population */
  observedDeaths: number;
  /** Optional crude rate of the reference population, used to derive an indirectly adjusted rate */
  referenceCrudeRate?: number;
}

export interface IndirectResult {
  method: "indirect";
  ageGroups: IndirectAgeGroupResult[];
  totalExpectedDeaths: number;
  observedDeaths: number;
  smr: number;
  referenceCrudeRate?: number;
  indirectlyAdjustedRate?: number;
}

export type AgeStandardizationInput = DirectInput | IndirectInput;
export type AgeStandardizationResult = DirectResult | IndirectResult;

function calculateDirect(input: DirectInput): DirectResult {
  const { ageGroups } = input;
  if (ageGroups.length === 0) {
    throw new Error("At least one age group is required");
  }

  const results: DirectAgeGroupResult[] = ageGroups.map((g) => {
    if (g.studyDeaths < 0) throw new Error("Study deaths must be zero or greater");
    if (g.studyPopulation <= 0) throw new Error("Study population must be greater than 0");
    if (g.standardPopulation < 0) {
      throw new Error("Standard population must be zero or greater");
    }
    const rate = g.studyDeaths / g.studyPopulation;
    return { ...g, rate, weight: 0, expectedDeaths: rate * g.standardPopulation };
  });

  const totalStandardPopulation = results.reduce((sum, g) => sum + g.standardPopulation, 0);
  if (totalStandardPopulation <= 0) {
    throw new Error("Total standard population must be greater than 0");
  }

  const withWeights = results.map((g) => ({
    ...g,
    weight: g.standardPopulation / totalStandardPopulation,
  }));

  const totalExpectedDeaths = withWeights.reduce((sum, g) => sum + g.expectedDeaths, 0);
  const standardizedRate = totalExpectedDeaths / totalStandardPopulation;

  return {
    method: "direct",
    ageGroups: withWeights,
    totalStandardPopulation,
    totalExpectedDeaths,
    standardizedRate,
  };
}

function calculateIndirect(input: IndirectInput): IndirectResult {
  const { ageGroups, observedDeaths, referenceCrudeRate } = input;
  if (ageGroups.length === 0) {
    throw new Error("At least one age group is required");
  }
  if (observedDeaths < 0) {
    throw new Error("Observed deaths must be zero or greater");
  }
  if (referenceCrudeRate !== undefined && referenceCrudeRate < 0) {
    throw new Error("Reference crude rate must be zero or greater");
  }

  const results: IndirectAgeGroupResult[] = ageGroups.map((g) => {
    if (g.standardRate < 0) throw new Error("Standard rate must be zero or greater");
    if (g.studyPopulation < 0) throw new Error("Study population must be zero or greater");
    return { ...g, expectedDeaths: g.standardRate * g.studyPopulation };
  });

  const totalExpectedDeaths = results.reduce((sum, g) => sum + g.expectedDeaths, 0);
  if (totalExpectedDeaths <= 0) {
    throw new Error("Total expected deaths must be greater than 0 to compute SMR");
  }

  const smr = observedDeaths / totalExpectedDeaths;
  const indirectlyAdjustedRate =
    referenceCrudeRate !== undefined ? smr * referenceCrudeRate : undefined;

  return {
    method: "indirect",
    ageGroups: results,
    totalExpectedDeaths,
    observedDeaths,
    smr,
    referenceCrudeRate,
    indirectlyAdjustedRate,
  };
}

export function calculateAgeStandardization(
  input: AgeStandardizationInput
): AgeStandardizationResult {
  return input.method === "direct" ? calculateDirect(input) : calculateIndirect(input);
}
