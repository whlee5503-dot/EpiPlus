import { describe, it, expect } from "vitest";
import { calculateMetaAnalysis } from "../metaAnalysis";

// Hand-computed (Python) worked example on a "difference" (raw) effect
// scale — 5 studies with effect y_i and standard error se_i. Formulas
// confirmed independently by DerSimonian & Laird (1986), Higgins &
// Thompson (2002), and the Cochrane Handbook (section 9.4.3.1/9.5.4);
// see src/lib/metaAnalysis.ts header for exact expressions.
const STUDIES = [
  { id: "s1", label: "Study 1", effect: 0.5, se: 0.2 },
  { id: "s2", label: "Study 2", effect: 0.3, se: 0.15 },
  { id: "s3", label: "Study 3", effect: 0.8, se: 0.25 },
  { id: "s4", label: "Study 4", effect: 0.2, se: 0.1 },
  { id: "s5", label: "Study 5", effect: 0.6, se: 0.3 },
];

describe("calculateMetaAnalysis - difference scale", () => {
  it("computes per-study weights and the fixed-effect pooled estimate", () => {
    const result = calculateMetaAnalysis({ effectType: "difference", studies: STUDIES });

    // weights = 1/se^2: 25, 44.444.., 16, 100, 11.111..
    expect(result.studies[0].weightFixed).toBeCloseTo(25, 4);
    expect(result.studies[1].weightFixed).toBeCloseTo(44.444444, 3);
    expect(result.studies[2].weightFixed).toBeCloseTo(16, 4);
    expect(result.studies[3].weightFixed).toBeCloseTo(100, 4);
    expect(result.studies[4].weightFixed).toBeCloseTo(11.111111, 3);

    expect(result.fixedEffect.effect).toBeCloseTo(0.3322215941209723, 6);
    expect(result.fixedEffect.se).toBeCloseTo(0.07132755515482112, 6);
    expect(result.fixedEffect.ciLower).toBeCloseTo(0.19242215487942183, 4);
    expect(result.fixedEffect.ciUpper).toBeCloseTo(0.47202103336252277, 4);
  });

  it("computes Cochran's Q, I-squared and tau-squared (DerSimonian-Laird)", () => {
    const result = calculateMetaAnalysis({ effectType: "difference", studies: STUDIES });

    expect(result.q).toBeCloseTo(6.795929903900508, 6);
    expect(result.qDf).toBe(4);
    expect(result.iSquared).toBeCloseTo(41.14124105806022, 4);
    expect(result.tauSquared).toBeCloseTo(0.021421559191530312, 6);
  });

  it("computes the DerSimonian-Laird random-effects pooled estimate", () => {
    const result = calculateMetaAnalysis({ effectType: "difference", studies: STUDIES });

    expect(result.randomEffect.effect).toBeCloseTo(0.39506990658794167, 5);
    expect(result.randomEffect.se).toBeCloseTo(0.10439068218300368, 5);
    expect(result.randomEffect.ciLower).toBeCloseTo(0.19046792913967328, 4);
    expect(result.randomEffect.ciUpper).toBeCloseTo(0.5996718840362101, 4);
  });

  it("throws when fewer than 2 studies are provided", () => {
    expect(() =>
      calculateMetaAnalysis({ effectType: "difference", studies: [STUDIES[0]] })
    ).toThrow();
  });

  it("throws when standard error is not positive", () => {
    expect(() =>
      calculateMetaAnalysis({
        effectType: "difference",
        studies: [
          { id: "a", label: "A", effect: 0.5, se: 0 },
          { id: "b", label: "B", effect: 0.3, se: 0.2 },
        ],
      })
    ).toThrow();
  });
});

describe("calculateMetaAnalysis - ratio scale", () => {
  it("log-transforms ratio effects and back-transforms the pooled estimate", () => {
    // Two studies with identical OR and SE(ln OR) should pool to the same OR.
    const result = calculateMetaAnalysis({
      effectType: "ratio",
      studies: [
        { id: "a", label: "A", effect: 2.0, se: 0.3 },
        { id: "b", label: "B", effect: 2.0, se: 0.3 },
      ],
    });
    expect(result.fixedEffect.effect).toBeCloseTo(2.0, 6);
    expect(result.randomEffect.effect).toBeCloseTo(2.0, 6);
    // No heterogeneity between two identical studies
    expect(result.q).toBeCloseTo(0, 6);
    expect(result.iSquared).toBe(0);
    expect(result.tauSquared).toBe(0);
  });

  it("throws when a ratio effect is not positive", () => {
    expect(() =>
      calculateMetaAnalysis({
        effectType: "ratio",
        studies: [
          { id: "a", label: "A", effect: -1, se: 0.3 },
          { id: "b", label: "B", effect: 2.0, se: 0.3 },
        ],
      })
    ).toThrow();
  });
});
