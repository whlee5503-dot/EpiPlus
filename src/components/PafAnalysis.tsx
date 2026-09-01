import { useState, useMemo } from "react";
import PafInput from "./PafInput";
import { calculatePaf } from "../lib/paf";
import type { PafInput as PafInputType } from "../lib/paf";
import { translations } from "../i18n/translations";
import type { Lang } from "../i18n/translations";

interface Props {
  lang: Lang;
}

const DEFAULT_INPUT: PafInputType = {
  mode: "direct",
  exposurePrevalence: 0.4,
  relativeRisk: 4.0,
};

function interp(template: string, vars: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (_, key) =>
    key in vars ? String(vars[key]) : `{${key}}`
  );
}

const PafAnalysis: React.FC<Props> = ({ lang }) => {
  const t = translations[lang];
  const ts = t.populationburden.paf;

  const [input, setInput] = useState<PafInputType>(DEFAULT_INPUT);
  const [showFormula, setShowFormula] = useState(false);

  const { results, error } = useMemo(() => {
    try {
      return { results: calculatePaf(input), error: null };
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
        <PafInput value={input} onChange={setInput} lang={lang} />

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
                <span className="formula-name">{ts.formulaPaf}</span>
                <span className="formula-expr">{ts.formulaPafExpr}</span>
              </div>
              <div className="formula-row">
                <span className="formula-name">{ts.formulaPe}</span>
                <span className="formula-expr">{ts.formulaPeExpr}</span>
              </div>
              <div className="formula-row">
                <span className="formula-name">{ts.formulaRr}</span>
                <span className="formula-expr">{ts.formulaRrExpr}</span>
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
                    <div className="strat-stat-label">{ts.derivedPeLabel}</div>
                    <div className="strat-stat-value">
                      {results.exposurePrevalence.toFixed(4)}
                    </div>
                    <div className="strat-stat-sub">{ts.derivedPeSub}</div>
                  </div>
                  <div className="strat-stat-card">
                    <div className="strat-stat-label">{ts.derivedRrLabel}</div>
                    <div className="strat-stat-value">{results.relativeRisk.toFixed(4)}</div>
                    <div className="strat-stat-sub">{ts.derivedRrSub}</div>
                  </div>
                </>
              )}

              <div className="strat-stat-card" style={{ gridColumn: "1 / -1" }}>
                <div className="strat-stat-label">{ts.pafPercentLabel}</div>
                <div className="strat-stat-value">{(results.paf * 100).toFixed(2)}%</div>
                <div className="strat-stat-sub">
                  {interp(ts.pafSub, {
                    pe: results.exposurePrevalence.toFixed(3),
                    rr: results.relativeRisk.toFixed(3),
                  })}
                </div>
              </div>
            </div>

            {results.relativeRisk < 1 && (
              <div className="rxc-warning-card">
                <span className="rxc-warning-icon">!</span>
                <span className="rxc-warning-text">{ts.protectiveWarning}</span>
              </div>
            )}

            <div className="strat-chart-card">
              <p>
                {interp(ts.interpSummary, {
                  pe: results.exposurePrevalence.toFixed(3),
                  rr: results.relativeRisk.toFixed(3),
                  pafPercent: `${(results.paf * 100).toFixed(2)}%`,
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

export default PafAnalysis;
