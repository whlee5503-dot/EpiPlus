import { useState, useMemo } from "react";
import AgeStandardizationInput from "./AgeStandardizationInput";
import { calculateAgeStandardization } from "../lib/ageStandardization";
import type { AgeStandardizationInput as AgeStandardizationInputType } from "../lib/ageStandardization";
import { translations } from "../i18n/translations";
import type { Lang } from "../i18n/translations";

interface Props {
  lang: Lang;
}

const DEFAULT_INPUT: AgeStandardizationInputType = {
  method: "direct",
  ageGroups: [
    { id: "d1", label: "0-19", studyDeaths: 10, studyPopulation: 5000, standardPopulation: 2000 },
    { id: "d2", label: "20-59", studyDeaths: 40, studyPopulation: 8000, standardPopulation: 5000 },
    { id: "d3", label: "60+", studyDeaths: 30, studyPopulation: 2000, standardPopulation: 3000 },
  ],
};

function interp(template: string, vars: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (_, key) =>
    key in vars ? String(vars[key]) : `{${key}}`
  );
}

const AgeStandardizationAnalysis: React.FC<Props> = ({ lang }) => {
  const t = translations[lang];
  const ts = t.populationburden.ageStandardization;

  const [input, setInput] = useState<AgeStandardizationInputType>(DEFAULT_INPUT);
  const [showFormula, setShowFormula] = useState(false);

  const { results, error } = useMemo(() => {
    if (input.ageGroups.length === 0) return { results: null, error: null };
    try {
      return { results: calculateAgeStandardization(input), error: null };
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
        <AgeStandardizationInput value={input} onChange={setInput} lang={lang} />

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
                <span className="formula-name">{ts.formulaDirect}</span>
                <span className="formula-expr">{ts.formulaDirectExpr}</span>
              </div>
              <div className="formula-row">
                <span className="formula-name">{ts.formulaIndirectSmr}</span>
                <span className="formula-expr">{ts.formulaIndirectSmrExpr}</span>
              </div>
              <div className="formula-row">
                <span className="formula-name">{ts.formulaIndirectRate}</span>
                <span className="formula-expr">{ts.formulaIndirectRateExpr}</span>
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
        ) : results.method === "direct" ? (
          <>
            <div className="strat-stats-grid">
              <div className="strat-stat-card" style={{ gridColumn: "1 / -1" }}>
                <div className="strat-stat-label">{ts.standardizedRateLabel}</div>
                <div className="strat-stat-value">{results.standardizedRate.toFixed(5)}</div>
                <div className="strat-stat-sub">
                  {interp(ts.standardizedRateSub, {
                    expected: results.totalExpectedDeaths.toLocaleString(),
                    pop: results.totalStandardPopulation.toLocaleString(),
                  })}
                </div>
              </div>
            </div>

            <div className="strat-chart-card">
              <p>
                {interp(ts.interpSummaryDirect, {
                  rate: results.standardizedRate.toFixed(5),
                })}
              </p>
              <p className="strat-footnote" style={{ marginTop: "var(--space-3)" }}>
                {ts.interpDetailDirect}
              </p>
            </div>
          </>
        ) : (
          <>
            <div className="strat-stats-grid">
              <div className="strat-stat-card">
                <div className="strat-stat-label">{ts.smrPercentLabel}</div>
                <div className="strat-stat-value">{(results.smr * 100).toFixed(2)}%</div>
                <div className="strat-stat-sub">
                  {interp(ts.smrSub, {
                    observed: results.observedDeaths.toLocaleString(),
                    expected: results.totalExpectedDeaths.toFixed(2),
                  })}
                </div>
              </div>

              {results.indirectlyAdjustedRate !== undefined && (
                <div className="strat-stat-card">
                  <div className="strat-stat-label">{ts.indirectRateLabel}</div>
                  <div className="strat-stat-value">
                    {results.indirectlyAdjustedRate.toFixed(5)}
                  </div>
                  <div className="strat-stat-sub">
                    {interp(ts.indirectRateSub, {
                      smr: results.smr.toFixed(4),
                      ref: results.referenceCrudeRate?.toFixed(5) ?? "",
                    })}
                  </div>
                </div>
              )}
            </div>

            <div className="strat-chart-card">
              <p>
                {interp(ts.interpSummaryIndirect, {
                  observed: results.observedDeaths.toLocaleString(),
                  expected: results.totalExpectedDeaths.toFixed(2),
                  smrPercent: `${(results.smr * 100).toFixed(2)}%`,
                })}
              </p>
              <p className="strat-footnote" style={{ marginTop: "var(--space-3)" }}>
                {ts.interpDetailIndirect}
              </p>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default AgeStandardizationAnalysis;
