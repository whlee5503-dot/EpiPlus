import { useState, useMemo } from "react";
import MetaAnalysisInput from "./MetaAnalysisInput";
import ForestPlot from "./ForestPlot";
import { calculateMetaAnalysis } from "../lib/metaAnalysis";
import type { MetaAnalysisInput as MetaInputType } from "../lib/metaAnalysis";
import { translations } from "../i18n/translations";
import type { Lang } from "../i18n/translations";

interface Props {
  lang: Lang;
}

const DEFAULT_INPUT: MetaInputType = {
  effectType: "difference",
  studies: [
    { id: "s1", label: "Study 1", effect: 0.5, se: 0.2 },
    { id: "s2", label: "Study 2", effect: 0.3, se: 0.15 },
    { id: "s3", label: "Study 3", effect: 0.8, se: 0.25 },
    { id: "s4", label: "Study 4", effect: 0.2, se: 0.1 },
    { id: "s5", label: "Study 5", effect: 0.6, se: 0.3 },
  ],
};

function interp(template: string, vars: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (_, key) =>
    key in vars ? String(vars[key]) : `{${key}}`
  );
}

function heterogeneityKey(
  i2: number
): "heterogeneityLow" | "heterogeneityModerate" | "heterogeneitySubstantial" | "heterogeneityConsiderable" {
  if (i2 < 25) return "heterogeneityLow";
  if (i2 < 50) return "heterogeneityModerate";
  if (i2 < 75) return "heterogeneitySubstantial";
  return "heterogeneityConsiderable";
}

function fmtP(p: number): string {
  return p < 0.001 ? "<0.001" : p.toFixed(3);
}

function fmtEffect(v: number, effectType: "difference" | "ratio"): string {
  return effectType === "ratio" ? v.toFixed(3) : v.toFixed(4);
}

const MetaAnalysisAnalysis: React.FC<Props> = ({ lang }) => {
  const t = translations[lang];
  const ts = t.metaanalysis.metaAnalysis;

  const [input, setInput] = useState<MetaInputType>(DEFAULT_INPUT);
  const [showFormula, setShowFormula] = useState(false);

  const { results, error } = useMemo(() => {
    if (input.studies.length < 2) return { results: null, error: null };
    try {
      return { results: calculateMetaAnalysis(input), error: null };
    } catch (e) {
      return { results: null, error: e instanceof Error ? e.message : null };
    }
  }, [input]);

  return (
    <>
      <h2 className="strat-chart-title" style={{ marginBottom: "var(--space-3)" }}>
        {ts.heading}
      </h2>

      <div className="rxc-top">
        <MetaAnalysisInput value={input} onChange={setInput} lang={lang} />

        <div className="formula-box">
          <button
            className="ds-formula-toggle"
            onClick={() => setShowFormula((s) => !s)}
            type="button"
          >
            <span className="formula-box-title">{t.common.formula}</span>
            <span style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>
              {showFormula ? t.common.showLess : t.common.showMore}
            </span>
          </button>
          {showFormula && (
            <div className="formula-list" style={{ marginTop: "var(--space-3)" }}>
              <div className="formula-row">
                <span className="formula-name">{ts.formulaFixed}</span>
                <span className="formula-expr">{ts.formulaFixedExpr}</span>
              </div>
              <div className="formula-row">
                <span className="formula-name">{ts.formulaQ}</span>
                <span className="formula-expr">{ts.formulaQExpr}</span>
              </div>
              <div className="formula-row">
                <span className="formula-name">{ts.formulaI2}</span>
                <span className="formula-expr">{ts.formulaI2Expr}</span>
              </div>
              <div className="formula-row">
                <span className="formula-name">{ts.formulaTau2}</span>
                <span className="formula-expr">{ts.formulaTau2Expr}</span>
              </div>
              <div className="formula-row">
                <span className="formula-name">{ts.formulaRandom}</span>
                <span className="formula-expr">{ts.formulaRandomExpr}</span>
              </div>
              <div className="formula-row">
                <span className="formula-name">{ts.formulaSource}</span>
                <span className="formula-expr">{ts.formulaSourceExpr}</span>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="rxc-results">
        {error && (
          <div className="rxc-warning-card">
            <span className="rxc-warning-icon">!</span>
            <span className="rxc-warning-text">{ts.validationError}</span>
          </div>
        )}

        {!results ? (
          !error && (
            <div className="strat-empty-state">
              <div className="strat-empty-text">{ts.emptyState}</div>
            </div>
          )
        ) : (
          <>
            <div className="meta-forest-card">
              <h2 className="strat-chart-title" style={{ marginBottom: "var(--space-3)" }}>
                {ts.forestPlotTitle}
              </h2>
              <ForestPlot results={results} lang={lang} />
            </div>

            <div className="strat-chart-card">
              <table className="strat-table">
                <thead>
                  <tr>
                    <th>{ts.tableStudy}</th>
                    <th>{ts.tableEffect}</th>
                    <th>{ts.tableCi}</th>
                    <th>{ts.tableWeightFixed}</th>
                    <th>{ts.tableWeightRandom}</th>
                  </tr>
                </thead>
                <tbody>
                  {results.studies.map((s) => (
                    <tr key={s.id}>
                      <td>{s.label}</td>
                      <td>{fmtEffect(s.displayEffect, results.effectType)}</td>
                      <td>
                        {fmtEffect(s.ciLower, results.effectType)} -{" "}
                        {fmtEffect(s.ciUpper, results.effectType)}
                      </td>
                      <td>{s.weightFixed.toFixed(2)}</td>
                      <td>{s.weightRandom.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="strat-stats-grid">
              <div className="strat-stat-card">
                <div className="strat-stat-label">{ts.fixedEffectLabel}</div>
                <div className="strat-stat-value">
                  {fmtEffect(results.fixedEffect.effect, results.effectType)}
                </div>
                <div className="strat-stat-sub">
                  {fmtEffect(results.fixedEffect.ciLower, results.effectType)} -{" "}
                  {fmtEffect(results.fixedEffect.ciUpper, results.effectType)}
                  <br />
                  {interp(ts.fixedEffectSub, {
                    z: results.fixedEffect.zValue.toFixed(3),
                    p: fmtP(results.fixedEffect.pValue),
                  })}
                </div>
              </div>

              <div className="strat-stat-card">
                <div className="strat-stat-label">{ts.randomEffectLabel}</div>
                <div className="strat-stat-value">
                  {fmtEffect(results.randomEffect.effect, results.effectType)}
                </div>
                <div className="strat-stat-sub">
                  {fmtEffect(results.randomEffect.ciLower, results.effectType)} -{" "}
                  {fmtEffect(results.randomEffect.ciUpper, results.effectType)}
                  <br />
                  {interp(ts.randomEffectSub, {
                    z: results.randomEffect.zValue.toFixed(3),
                    p: fmtP(results.randomEffect.pValue),
                  })}
                </div>
              </div>

              <div className="strat-stat-card">
                <div className="strat-stat-label">{ts.qLabel}</div>
                <div className="strat-stat-value">{results.q.toFixed(3)}</div>
                <div className="strat-stat-sub">
                  {interp(ts.qSub, { df: results.qDf, p: fmtP(results.qPValue) })}
                </div>
              </div>

              <div className="strat-stat-card">
                <div className="strat-stat-label">{ts.i2Label}</div>
                <div className="strat-stat-value">{results.iSquared.toFixed(1)}%</div>
                <div className="strat-stat-sub">{ts[heterogeneityKey(results.iSquared)]}</div>
              </div>

              <div className="strat-stat-card">
                <div className="strat-stat-label">{ts.tau2Label}</div>
                <div className="strat-stat-value">{results.tauSquared.toFixed(5)}</div>
              </div>
            </div>

            <div className="strat-chart-card">
              <p>
                {interp(ts.interpSummary, {
                  k: results.studies.length,
                  fixedEffect: fmtEffect(results.fixedEffect.effect, results.effectType),
                  fixedLower: fmtEffect(results.fixedEffect.ciLower, results.effectType),
                  fixedUpper: fmtEffect(results.fixedEffect.ciUpper, results.effectType),
                  randomEffect: fmtEffect(results.randomEffect.effect, results.effectType),
                  randomLower: fmtEffect(results.randomEffect.ciLower, results.effectType),
                  randomUpper: fmtEffect(results.randomEffect.ciUpper, results.effectType),
                  heterogeneityLevel: ts[heterogeneityKey(results.iSquared)],
                  i2: results.iSquared.toFixed(1),
                  qp: fmtP(results.qPValue),
                })}
              </p>
              <p className="strat-footnote" style={{ marginTop: "var(--space-3)" }}>
                {ts.interpDetail1}
              </p>
              <p className="strat-footnote" style={{ marginTop: "var(--space-2)" }}>
                {ts.interpDetail2}
              </p>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default MetaAnalysisAnalysis;
