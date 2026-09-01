/**
 * Poisson Regression (Incidence Rate Ratio) calculator.
 *
 * A Poisson regression with a single categorical exposure variable (one
 * group per exposure level, log link, person-time offset) is a saturated
 * model: its maximum-likelihood fit exactly reproduces each group's
 * observed incidence rate, with no iterative fitting required. This is
 * why this calculator can stay a closed-form "aggregate value" tool
 * rather than needing raw-row data and an iterative solver (unlike
 * multivariable Poisson/logistic/Cox regression, which is out of scope
 * for this module).
 *
 * Formula source: StatsDirect, "Poisson Regression (Incidence Rate Ratio)"
 *                  (confirms exp(coefficient) = incidence rate ratio).
 *                  MetricGate, "Incidence Rate Ratio Calculator" and
 *                  "Incidence Density Ratio Calculator" (confirm the IRR
 *                  point estimate and Wald CI formulas below).
 *
 * rate_i        = events_i / personTime_i
 * IRR_i         = rate_i / rate_reference
 * SE(ln IRR_i)  = sqrt(1/events_i + 1/events_reference)
 * 95% CI        = exp[ln(IRR_i) +/- z * SE(ln IRR_i)]   (z = 1.959964 for 95%)
 */

const Z_95 = 1.959964;

export interface PoissonGroup {
  id: string;
  label: string;
  /** Observed event count in this group */
  events: number;
  /** Total person-time at risk in this group */
  personTime: number;
}

export interface PoissonRegressionInput {
  groups: PoissonGroup[];
  /** id of the group used as the reference (IRR = 1) */
  referenceGroupId: string;
}

export interface PoissonGroupResult extends PoissonGroup {
  rate: number;
  isReference: boolean;
  irr: number;
  irrLower?: number;
  irrUpper?: number;
}

export interface PoissonRegressionResult {
  groups: PoissonGroupResult[];
  referenceGroupId: string;
}

export function calculatePoissonRegression(
  input: PoissonRegressionInput
): PoissonRegressionResult {
  const { groups, referenceGroupId } = input;

  if (groups.length < 2) {
    throw new Error("At least two groups (including the reference) are required");
  }

  const reference = groups.find((g) => g.id === referenceGroupId);
  if (!reference) {
    throw new Error("Reference group not found among the provided groups");
  }

  for (const g of groups) {
    if (g.events < 0) throw new Error("Event counts must be zero or greater");
    if (g.personTime <= 0) throw new Error("Person-time must be greater than 0");
  }
  if (reference.events <= 0) {
    throw new Error("The reference group must have at least one event to compute IRR confidence intervals");
  }

  const referenceRate = reference.events / reference.personTime;

  const results: PoissonGroupResult[] = groups.map((g) => {
    const rate = g.events / g.personTime;
    const isReference = g.id === referenceGroupId;

    if (isReference) {
      return { ...g, rate, isReference, irr: 1 };
    }

    const irr = rate / referenceRate;

    if (g.events <= 0) {
      // IRR point estimate is still defined (could be 0), but the Wald CI
      // is undefined when either cell has zero events.
      return { ...g, rate, isReference, irr };
    }

    const logIrr = Math.log(irr);
    const se = Math.sqrt(1 / g.events + 1 / reference.events);
    const irrLower = Math.exp(logIrr - Z_95 * se);
    const irrUpper = Math.exp(logIrr + Z_95 * se);

    return { ...g, rate, isReference, irr, irrLower, irrUpper };
  });

  return { groups: results, referenceGroupId };
}
