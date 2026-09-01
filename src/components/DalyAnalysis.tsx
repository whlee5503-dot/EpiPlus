import { useState, useMemo } from "react";
import DalyInput from "./DalyInput";
import { calculateDaly } from "../lib/daly";
import type { DalyInput as DalyInputType } from "../lib/daly";
import { translations } from "../i18n/translations";
import type { Lang } from "../i18n/translations";

interface Props {
  lang: Lang;
}

const DEFAULT_INPUT: DalyInputType = {
  yllItems: [{ id: "yll-default", label: "Cause A", deaths: 50, lifeExpectancy: 20 }],
  yldMethod: "prevalence",
  yldItems: [{ id: "yld-default", label: "Disease X", cases: 2000, disabilityWeight: 0.15 }],
};

function interp(template: string, vars: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (_, key) =>
    key in vars ? String(vars[key]) : `{${key}}`
  );
}

const DalyAnalysis: React.FC<Props> = ({ lang }) => {
  const t = translations[lang];
  const ts = t.populationburden.daly;

  const [input, setInput] = useState<DalyInputType>(DEFAULT_INPUT);
  const [showFormula, setShowFormula] = useState(false);

  const { results, error } = useMemo(() => {
    const hasAnyItem = input.yllItems.length > 0 || input.yldItems.length > 0;
    if (!hasAnyItem) return { results: null, error: null };
    try {
      return { results: calculateDaly(input), error: null };
    } catch (e) {
      return { results: null, error: e instanceof Error ? e.message : null };
    }
  }, [input]);

  const methodLabel =
    input.yldMethod === "incidence" ? ts.yldMethodIncidence : ts.yldMethodPrevalence;

  return (
    <>
      <h2 className="strat-chart-title" style={{ marginBottom: "var(--space-3)" }}>
        {ts.heading}
      </h2>

      <div className="rxc-top">
        <DalyInput value={input} onChange={setInput} lang={lang} />

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
                <span className="formula-name">{ts.formulaDaly}</span>
                <span className="formula-expr">{ts.formulaDalyExpr}</span>
              </div>
              <div className="formula-row">
                <span className="formula-name">{ts.formulaYll}</span>
                <span className="formula-expr">{ts.formulaYllExpr}</span>
              </div>
              <div className="formula-row">
                <span className="formula-name">{ts.formulaYldIncidence}</span>
                <span className="formula-expr">{ts.formulaYldIncidenceExpr}</span>
              </div>
              <div className="formula-row">
                <span className="formula-name">{ts.formulaYldPrevalence}</span>
                <span className="formula-expr">{ts.formulaYldPrevalenceExpr}</span>
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
            <span className="rxc-warning-text">{ts.neymanStyleError}</span>
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
            <div className="strat-stats-grid">
              <div className="strat-stat-card">
                <div className="strat-stat-label">{ts.totalYllLabel}</div>
                <div className="strat-stat-value">{results.totalYll.toLocaleString()}</div>
                <div className="strat-stat-sub">
                  {interp(ts.totalYllSub, { n: results.yllItems.length })}
                </div>
              </div>

              <div className="strat-stat-card">
                <div className="strat-stat-label">{ts.totalYldLabel}</div>
                <div className="strat-stat-value">{results.totalYld.toLocaleString()}</div>
                <div className="strat-stat-sub">
                  {interp(ts.totalYldSub, { n: results.yldItems.length, method: methodLabel })}
                </div>
              </div>

              <div className="strat-stat-card" style={{ gridColumn: "1 / -1" }}>
                <div className="strat-stat-label">{ts.totalDalyLabel}</div>
                <div className="strat-stat-value">{results.totalDaly.toLocaleString()}</div>
                <div className="strat-stat-sub">
                  {interp(ts.totalDalySub, {
                    yll: results.totalYll.toLocaleString(),
                    yld: results.totalYld.toLocaleString(),
                  })}
                </div>
              </div>
            </div>

            <div className="strat-chart-card">
              <p>
                {interp(ts.interpSummary, {
                  daly: results.totalDaly.toLocaleString(),
                  yll: results.totalYll.toLocaleString(),
                  yld: results.totalYld.toLocaleString(),
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

export default DalyAnalysis;
