import { useState, useMemo } from "react";
import NntInputComponent from "./NntInput";
import { calculateNnt } from "../lib/nnt";
import type { NntInput } from "../lib/nnt";
import { translations } from "../i18n/translations";
import type { Lang } from "../i18n/translations";

interface Props {
  lang: Lang;
}

const DEFAULT_INPUT: NntInput = { controlEventRate: 0.5, experimentalEventRate: 0.3 };

function interp(template: string, vars: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (_, key) =>
    key in vars ? String(vars[key]) : `{${key}}`
  );
}

const NntAnalysis: React.FC<Props> = ({ lang }) => {
  const t = translations[lang];
  const ts = t.clinical.nnt;

  const [input, setInput] = useState<NntInput>(DEFAULT_INPUT);
  const [showFormula, setShowFormula] = useState(false);

  const { results, error } = useMemo(() => {
    try {
      return { results: calculateNnt(input), error: null };
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
        <NntInputComponent value={input} onChange={setInput} lang={lang} />

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
                <span className="formula-name">{ts.formulaArr}</span>
                <span className="formula-expr">{ts.formulaArrExpr}</span>
              </div>
              <div className="formula-row">
                <span className="formula-name">{ts.formulaNnt}</span>
                <span className="formula-expr">{ts.formulaNntExpr}</span>
              </div>
              <div className="formula-row">
                <span className="formula-name">{ts.formulaNnh}</span>
                <span className="formula-expr">{ts.formulaNnhExpr}</span>
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
              <div className="strat-stat-card">
                <div className="strat-stat-label">{ts.arrLabel}</div>
                <div className="strat-stat-value">
                  {results.absoluteRiskReduction.toFixed(4)}
                </div>
                <div className="strat-stat-sub">
                  {interp(ts.arrSub, {
                    cer: results.controlEventRate.toFixed(4),
                    eer: results.experimentalEventRate.toFixed(4),
                  })}
                </div>
              </div>

              {results.direction === "benefit" && results.nnt !== undefined && (
                <div className="strat-stat-card">
                  <div className="strat-stat-label">{ts.nntLabel}</div>
                  <div className="strat-stat-value">{results.nnt}</div>
                  <div className="strat-stat-sub">
                    {interp(ts.nntSub, { arr: results.absoluteRiskReduction.toFixed(4) })}
                  </div>
                </div>
              )}

              {results.direction === "harm" && results.nnh !== undefined && (
                <div className="strat-stat-card">
                  <div className="strat-stat-label">{ts.nnhLabel}</div>
                  <div className="strat-stat-value">{results.nnh}</div>
                  <div className="strat-stat-sub">
                    {interp(ts.nnhSub, {
                      ari: Math.abs(results.absoluteRiskReduction).toFixed(4),
                    })}
                  </div>
                </div>
              )}

              {results.direction === "none" && (
                <div className="strat-stat-card">
                  <div className="strat-stat-label">{ts.noneLabel}</div>
                  <div className="strat-stat-sub">{ts.noneSub}</div>
                </div>
              )}
            </div>

            {results.direction !== "none" && (
              <div className="strat-chart-card">
                <p>
                  {results.direction === "benefit"
                    ? interp(ts.interpSummaryBenefit, {
                        cer: results.controlEventRate.toFixed(4),
                        eer: results.experimentalEventRate.toFixed(4),
                        nnt: results.nnt ?? "",
                      })
                    : interp(ts.interpSummaryHarm, {
                        cer: results.controlEventRate.toFixed(4),
                        eer: results.experimentalEventRate.toFixed(4),
                        nnh: results.nnh ?? "",
                      })}
                </p>
                <p className="strat-footnote" style={{ marginTop: "var(--space-3)" }}>
                  {ts.interpDetail1}
                </p>
                <p className="strat-footnote" style={{ marginTop: "var(--space-2)" }}>
                  {ts.interpDetail2}
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default NntAnalysis;
