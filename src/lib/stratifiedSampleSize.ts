/**
 * Stratified Sampling Sample Size (allocation) calculator.
 *
 * Distributes a fixed total sample size n across L strata using one of
 * three standard allocation methods.
 *
 * Formula source: Cochran, W. G. (1977). Sampling Techniques, 3rd ed.
 *                  Wiley, Ch. 5. Neyman, J. (1934). JRSS 97(4): 558-625.
 *
 * Equal:        n_h = n / L
 * Proportional: n_h = n * (N_h / N)
 * Neyman:       n_h = n * (N_h * S_h) / sum(N_h * S_h)
 *
 * Neyman (optimum) allocation requires a within-stratum standard
 * deviation S_h for every stratum; when all S_h are equal, Neyman
 * allocation reduces to proportional allocation.
 */

export type AllocationMethod = "equal" | "proportional" | "neyman";

export interface Stratum {
  /** Stable identifier for UI list rendering */
  id: string;
  /** Display label, e.g. "Region A" */
  label: string;
  /** Population size of this stratum (N_h) */
  populationSize: number;
  /** Within-stratum standard deviation (S_h); required for Neyman allocation */
  stdDev?: number;
}

export interface StratifiedSampleSizeInput {
  /** Fixed total sample size to allocate across strata (n) */
  totalSampleSize: number;
  method: AllocationMethod;
  strata: Stratum[];
}

export interface StratumAllocationResult {
  id: string;
  label: string;
  populationSize: number;
  /** N_h / N */
  weight: number;
  /** Allocated sample size for this stratum, rounded to the nearest integer */
  sampleSize: number;
}

export interface StratifiedSampleSizeResult {
  method: AllocationMethod;
  totalPopulationSize: number;
  totalSampleSize: number;
  allocations: StratumAllocationResult[];
  /** Sum of rounded per-stratum sample sizes; may differ slightly from totalSampleSize due to rounding */
  allocatedTotal: number;
}

export function calculateStratifiedSampleSize(
  input: StratifiedSampleSizeInput
): StratifiedSampleSizeResult {
  const { totalSampleSize, method, strata } = input;

  if (totalSampleSize <= 0) {
    throw new Error("Total sample size must be greater than 0");
  }
  if (!strata || strata.length === 0) {
    throw new Error("At least one stratum is required");
  }
  for (const s of strata) {
    if (s.populationSize <= 0) {
      throw new Error("Each stratum's population size must be greater than 0");
    }
  }
  if (method === "neyman") {
    for (const s of strata) {
      if (s.stdDev === undefined || s.stdDev === null || s.stdDev <= 0) {
        throw new Error(
          "Neyman allocation requires a standard deviation greater than 0 for every stratum"
        );
      }
    }
  }

  const totalPopulationSize = strata.reduce((sum, s) => sum + s.populationSize, 0);
  const L = strata.length;

  let rawSizes: number[];

  if (method === "equal") {
    rawSizes = strata.map(() => totalSampleSize / L);
  } else if (method === "proportional") {
    rawSizes = strata.map(
      (s) => totalSampleSize * (s.populationSize / totalPopulationSize)
    );
  } else {
    const weightSum = strata.reduce(
      (sum, s) => sum + s.populationSize * (s.stdDev as number),
      0
    );
    rawSizes = strata.map(
      (s) => totalSampleSize * ((s.populationSize * (s.stdDev as number)) / weightSum)
    );
  }

  const allocations: StratumAllocationResult[] = strata.map((s, i) => ({
    id: s.id,
    label: s.label,
    populationSize: s.populationSize,
    weight: s.populationSize / totalPopulationSize,
    sampleSize: Math.round(rawSizes[i]),
  }));

  const allocatedTotal = allocations.reduce((sum, a) => sum + a.sampleSize, 0);

  return {
    method,
    totalPopulationSize,
    totalSampleSize,
    allocations,
    allocatedTotal,
  };
}
