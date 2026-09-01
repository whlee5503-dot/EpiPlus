/**
 * DALY (Disability-Adjusted Life Year) calculator.
 *
 * DALY = YLL (Years of Life Lost) + YLD (Years Lived with Disability)
 *
 * Formula source: Murray, C.J.L. & Lopez, A.D. (1996). The Global Burden
 *                  of Disease. WHO/World Bank/Harvard.
 *                  WHO (2020). WHO methods and data sources for global
 *                  burden of disease estimates 2000-2019 (GHE technical
 *                  paper). Undiscounted, no age-weighting, consistent
 *                  with GBD 2010+ methodology (age weights and discounting
 *                  were dropped from the GBD study).
 *
 * YLL = n x L1        (n = deaths, L1 = standard/reference life expectancy
 *                       at age of death)
 * YLD (incidence)  = I x DW x L2  (I = incident cases, DW = disability
 *                       weight 0-1, L2 = average duration in years)
 * YLD (prevalence) = P x DW       (P = prevalent cases; the prevalence
 *                       "snapshot" already reflects duration over the
 *                       observation year, so no separate duration term)
 *
 * Each of YLL and YLD accepts multiple line items (e.g. one row per
 * age group or per condition/cause) so a population-level total can be
 * built up the same way Cochran-style stratified allocation is: sum of
 * per-row contributions.
 */

export type YldMethod = "incidence" | "prevalence";

export interface YllItem {
  id: string;
  label: string;
  /** Number of deaths (n) */
  deaths: number;
  /** Standard/reference life expectancy at age of death (L1), in years */
  lifeExpectancy: number;
}

export interface YldItem {
  id: string;
  label: string;
  /** Incident or prevalent case count, depending on yldMethod */
  cases: number;
  /** Disability weight (0 = full health, 1 = equivalent to death) */
  disabilityWeight: number;
  /** Average duration of the condition in years; required for the incidence method only */
  duration?: number;
}

export interface DalyInput {
  yllItems: YllItem[];
  yldMethod: YldMethod;
  yldItems: YldItem[];
}

export interface YllItemResult extends YllItem {
  yll: number;
}

export interface YldItemResult extends YldItem {
  yld: number;
}

export interface DalyResult {
  yllItems: YllItemResult[];
  totalYll: number;
  yldMethod: YldMethod;
  yldItems: YldItemResult[];
  totalYld: number;
  totalDaly: number;
}

export function calculateDaly(input: DalyInput): DalyResult {
  const { yllItems, yldMethod, yldItems } = input;

  if (yllItems.length === 0 && yldItems.length === 0) {
    throw new Error("At least one YLL or YLD line item is required");
  }

  const yllItemResults: YllItemResult[] = yllItems.map((item) => {
    if (item.deaths < 0) {
      throw new Error("Number of deaths must be zero or greater");
    }
    if (item.lifeExpectancy <= 0) {
      throw new Error("Life expectancy at age of death must be greater than 0");
    }
    return { ...item, yll: item.deaths * item.lifeExpectancy };
  });

  const yldItemResults: YldItemResult[] = yldItems.map((item) => {
    if (item.cases < 0) {
      throw new Error("Number of cases must be zero or greater");
    }
    if (item.disabilityWeight < 0 || item.disabilityWeight > 1) {
      throw new Error("Disability weight must be between 0 and 1");
    }
    if (yldMethod === "incidence") {
      if (item.duration === undefined || item.duration === null || item.duration <= 0) {
        throw new Error("Average duration must be greater than 0 for the incidence method");
      }
      return { ...item, yld: item.cases * item.disabilityWeight * item.duration };
    }
    return { ...item, yld: item.cases * item.disabilityWeight };
  });

  const totalYll = yllItemResults.reduce((sum, i) => sum + i.yll, 0);
  const totalYld = yldItemResults.reduce((sum, i) => sum + i.yld, 0);

  return {
    yllItems: yllItemResults,
    totalYll,
    yldMethod,
    yldItems: yldItemResults,
    totalYld,
    totalDaly: totalYll + totalYld,
  };
}
