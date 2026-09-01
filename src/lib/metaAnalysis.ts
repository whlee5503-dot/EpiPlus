/**
 * Meta-analysis calculator: fixed-effect (inverse-variance) and
 * DerSimonian-Laird random-effects pooling, with Cochran's Q and I^2
 * heterogeneity statistics.
 *
 * Formula source: DerSimonian, R. & Laird, N. (1986). Meta-analysis in
 *                  clinical trials. Controlled Clinical Trials, 7(3): 177-188.
 *                  Higgins, J.P.T. & Thompson, S.G. (2002). Quantifying
 *                  heterogeneity in a meta-analysis. Statistics in
 *                  Medicine, 21(11): 1539-1558 (I^2).
 *                  Cochrane Handbook, section 9.4.3.1/9.5.4 (confirms the
 *                  formulas below; the fixed-effect pooling here reuses
 *                  the same inverse-variance (Woolf) approach already
 *                  validated in EpiStat's Module 1, directlyAdjustedOR/RR).
 *
 * Each study contributes an effect size y_i and its standard error se_i,
 * either on a raw ("difference") scale (e.g. a mean difference) or a
 * ratio scale (e.g. OR/RR/HR), which is log-transformed internally
 * (y_i = ln(effect_i), se_i = SE of ln(effect_i)) before pooling — the
 * standard approach for combining ratio measures.
 *
 * Fixed-effect (inverse-variance):
 *   w_i        = 1 / se_i^2
 *   y_fixed    = sum(w_i y_i) / sum(w_i)
 *   SE_fixed   = 1 / sqrt(sum(w_i))
 *
 * Heterogeneity:
 *   Q          = sum(w_i (y_i - y_fixed)^2),  df = k - 1
 *   I^2        = max(0, (Q - df) / Q) * 100%
 *   tau^2 (DL) = max(0, (Q - df) / C),  C = sum(w_i) - sum(w_i^2)/sum(w_i)
 *
 * Random-effects (DerSimonian-Laird):
 *   w_i*       = 1 / (se_i^2 + tau^2)
 *   y_random   = sum(w_i* y_i) / sum(w_i*)
 *   SE_random  = 1 / sqrt(sum(w_i*))
 */

import { chiSquarePValue, Z_95 } from "./statUtils";

export type EffectType = "difference" | "ratio";

export interface MetaStudy {
  id: string;
  label: string;
  /** Effect size: raw difference, or the ratio (OR/RR/HR) itself (not log-transformed) when effectType is "ratio" */
  effect: number;
  /** Standard error of the effect, on the same scale as "effect" (raw for "difference", log scale for "ratio") */
  se: number;
}

export interface MetaAnalysisInput {
  effectType: EffectType;
  studies: MetaStudy[];
}

export interface MetaStudyResult extends MetaStudy {
  /** effect on the ln scale for "ratio", or effect itself for "difference" */
  y: number;
  v: number;
  weightFixed: number;
  weightRandom: number;
  /** effect back-transformed to the display scale (= effect for "difference", exp(y) for "ratio") */
  displayEffect: number;
  ciLower: number;
  ciUpper: number;
}

export interface PooledEstimate {
  /** on the ln scale for "ratio", or the effect scale for "difference" */
  y: number;
  se: number;
  /** back-transformed to the display scale */
  effect: number;
  ciLower: number;
  ciUpper: number;
  zValue: number;
  pValue: number;
}

export interface MetaAnalysisResult {
  effectType: EffectType;
  studies: MetaStudyResult[];
  fixedEffect: PooledEstimate;
  randomEffect: PooledEstimate;
  q: number;
  qDf: number;
  qPValue: number;
  iSquared: number;
  tauSquared: number;
}

function twoTailedNormalPValue(z: number): number {
  // p = 2 * (1 - Phi(|z|)) = chi-square p-value with df=1 at z^2, which is
  // exact and avoids needing a separate normal-CDF-based p-value routine.
  return chiSquarePValue(z * z, 1);
}

export function calculateMetaAnalysis(input: MetaAnalysisInput): MetaAnalysisResult {
  const { effectType, studies } = input;

  if (studies.length < 2) {
    throw new Error("At least two studies are required for a meta-analysis");
  }
  for (const s of studies) {
    if (effectType === "ratio" && s.effect <= 0) {
      throw new Error("Effect size must be greater than 0 for a ratio measure (OR/RR/HR)");
    }
    if (s.se <= 0) {
      throw new Error("Standard error must be greater than 0 for every study");
    }
  }

  const y = studies.map((s) => (effectType === "ratio" ? Math.log(s.effect) : s.effect));
  const v = studies.map((s) => s.se * s.se);
  const wFixed = v.map((vi) => 1 / vi);

  const sumWFixed = wFixed.reduce((a, b) => a + b, 0);
  const sumWFixedY = wFixed.reduce((sum, w, i) => sum + w * y[i], 0);
  const yFixed = sumWFixedY / sumWFixed;
  const seFixed = 1 / Math.sqrt(sumWFixed);

  const q = wFixed.reduce((sum, w, i) => sum + w * (y[i] - yFixed) ** 2, 0);
  const k = studies.length;
  const qDf = k - 1;
  const qPValue = chiSquarePValue(q, qDf);
  const iSquared = Math.max(0, ((q - qDf) / q) * 100);

  const sumWFixed2 = wFixed.reduce((sum, w) => sum + w * w, 0);
  const C = sumWFixed - sumWFixed2 / sumWFixed;
  const tauSquared = C > 0 ? Math.max(0, (q - qDf) / C) : 0;

  const wRandom = v.map((vi) => 1 / (vi + tauSquared));
  const sumWRandom = wRandom.reduce((a, b) => a + b, 0);
  const sumWRandomY = wRandom.reduce((sum, w, i) => sum + w * y[i], 0);
  const yRandom = sumWRandomY / sumWRandom;
  const seRandom = 1 / Math.sqrt(sumWRandom);

  const backTransform = (yValue: number) => (effectType === "ratio" ? Math.exp(yValue) : yValue);

  const zFixed = yFixed / seFixed;
  const zRandom = yRandom / seRandom;

  const fixedEffect: PooledEstimate = {
    y: yFixed,
    se: seFixed,
    effect: backTransform(yFixed),
    ciLower: backTransform(yFixed - Z_95 * seFixed),
    ciUpper: backTransform(yFixed + Z_95 * seFixed),
    zValue: zFixed,
    pValue: twoTailedNormalPValue(zFixed),
  };

  const randomEffect: PooledEstimate = {
    y: yRandom,
    se: seRandom,
    effect: backTransform(yRandom),
    ciLower: backTransform(yRandom - Z_95 * seRandom),
    ciUpper: backTransform(yRandom + Z_95 * seRandom),
    zValue: zRandom,
    pValue: twoTailedNormalPValue(zRandom),
  };

  const studyResults: MetaStudyResult[] = studies.map((s, i) => ({
    ...s,
    y: y[i],
    v: v[i],
    weightFixed: wFixed[i],
    weightRandom: wRandom[i],
    displayEffect: backTransform(y[i]),
    ciLower: backTransform(y[i] - Z_95 * s.se),
    ciUpper: backTransform(y[i] + Z_95 * s.se),
  }));

  return {
    effectType,
    studies: studyResults,
    fixedEffect,
    randomEffect,
    q,
    qDf,
    qPValue,
    iSquared,
    tauSquared,
  };
}
