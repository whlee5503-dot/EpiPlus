import {
  calculateDesignEffect,
  calculateEffectiveSampleSize,
  calculateClusterAdjustedSampleSize,
} from "./designEffect";

export interface DesignEffectFormInput {
  avgClusterSize: number;
  icc: number;
  nominalSampleSize?: number;
  individualSampleSize?: number;
}

export interface DesignEffectFormResult {
  designEffect: number;
  effectiveSampleSize?: number;
  adjustedSampleSize?: number;
}

export function calculateDesignEffectForm(
  input: DesignEffectFormInput
): DesignEffectFormResult {
  const { designEffect } = calculateDesignEffect({
    avgClusterSize: input.avgClusterSize,
    icc: input.icc,
  });

  const result: DesignEffectFormResult = { designEffect };

  if (input.nominalSampleSize && input.nominalSampleSize > 0) {
    const { effectiveSampleSize } = calculateEffectiveSampleSize({
      nominalSampleSize: input.nominalSampleSize,
      designEffect,
    });
    result.effectiveSampleSize = effectiveSampleSize;
  }

  if (input.individualSampleSize && input.individualSampleSize > 0) {
    const { adjustedSampleSize } = calculateClusterAdjustedSampleSize({
      individualSampleSize: input.individualSampleSize,
      designEffect,
    });
    result.adjustedSampleSize = adjustedSampleSize;
  }

  return result;
}
