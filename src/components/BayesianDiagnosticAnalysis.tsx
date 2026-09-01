import { useState, useMemo } from "react";
import BayesianDiagnosticInput from "./BayesianDiagnosticInput";
import { calculateBayesianDiagnostic } from "../lib/bayesianDiagnostic";
import type { BayesianDiagnosticInput as BayesInputType } from "../lib/bayesianDiagnostic";
import { translations } from "../i18n/translations";
import type { Lang } from "../i18n/translations";

interface Props {
  lang: Lang;
}

const DEFAULT_INPUT: BayesInputType = { mode: "table2x2", tp: 95, fn: 5, tn: 880, fp: 20 };

function interp(template: string, vars: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (_, key) =>
    key in vars ? String(vars[key]) : `{${key}}`
  );
}

const BayesianDiagnosticAnalysis: React.FC<Props> = ({ lang }) => {
  const t = translations[lang];
  const ts = t.statisticalmodeling.bayesianDiagnostic;

  const [input, setInput] = useState<BayesInputType>(DEFAULT_INPUT);
  const [showFormula, setShowFormula] = useState(false);

  const { results, error } = useMemo(() => {
    try {
      return { results: calculateBayesianDiagnostic(input), error: null };
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
        <BayesianDiagnosticInput value={input} onChange={setInput} lang={lang} />

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
                <span className="formula-name">{ts.formulaPpv}</span>
                <span className="formula-expr">{ts.formulaPpvExpr}</span>
              </div>
              <div className="formula-row">
                <span className="formula-name">{ts.formulaNpv}</span>
                <span className="formula-expr">{ts.formulaNpvExpr}</span>
              </div>
              <div className="formula-row">
                <span className="formula-name">{ts.formulaLrPos}</span>
                <span className="formula-expr">{ts.formulaLrPosExpr}</span>
              </div>
              <div className="formula-row">
                <span className="formula-name">{ts.formulaLrNeg}</span>
                <span className="formula-expr">{ts.formulaLrNegExpr}</span>
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
            <div className="strat-stats-grid">
              {input.mode === "table2x2" && (
                <>
                  <div className="strat-stat-card">
                    <div className="strat-stat-label">{ts.derivedSeLabel}</div>
                    <div className="strat-stat-value">{results.sensitivity.toFixed(4)}</div>
                  </div>
                  <div className="strat-stat-card">
                    <div className="strat-stat-label">{ts.derivedSpLabel}</div>
                    <div className="strat-stat-value">{results.specificity.toFixed(4)}</div>
                  </div>
                  <div className="strat-stat-card">
                    <div className="strat-stat-label">{ts.derivedPrevLabel}</div>
                    <div className="strat-stat-value">{results.prevalence.toFixed(4)}</div>
                  </div>
                </>
              )}

              <div className="strat-stat-card">
                <div className="strat-stat-label">{ts.ppvLabel}</div>
                <div className="strat-stat-value">{(results.ppv * 100).toFixed(2)}%</div>
                <div className="strat-stat-sub">
                  {interp(ts.ppvSub, {
                    se: results.sensitivity.toFixed(4),
                    sp: results.specificity.toFixed(4),
                    prev: results.prevalence.toFixed(4),
                  })}
                </div>
              </div>

              <div className="strat-stat-card">
                <div className="strat-stat-label">{ts.npvLabel}</div>
                <div className="strat-stat-value">{(results.npv * 100).toFixed(2)}%</div>
                <div className="strat-stat-sub">
                  {interp(ts.npvSub, {
                    se: results.sensitivity.toFixed(4),
                    sp: results.specificity.toFixed(4),
                    prev: results.prevalence.toFixed(4),
                  })}
                </div>
              </div>

              <div className="strat-stat-card">
                <div className="strat-stat-label">{ts.lrPosLabel}</div>
                <div className="strat-stat-value">
                  {results.positiveLikelihoodRatio.toFixed(2)}
                </div>
              </div>

              <div className="strat-stat-card">
                <div className="strat-stat-label">{ts.lrNegLabel}</div>
                <div className="strat-stat-value">
                  {results.negativeLikelihoodRatio.toFixed(4)}
                </div>
              </div>
            </div>

            <div className="strat-chart-card">
              <p>
                {interp(ts.interpSummary, {
                  se: results.sensitivity.toFixed(4),
                  sp: results.specificity.toFixed(4),
                  prev: results.prevalence.toFixed(4),
                  ppv: `${(results.ppv * 100).toFixed(2)}%`,
                  npv: `${(results.npv * 100).toFixed(2)}%`,
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

export default BayesianDiagnosticAnalysis;
