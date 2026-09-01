import { useState, useMemo } from "react";
import SmdInputComponent from "./SmdInput";
import { calculateSmd } from "../lib/smd";
import type { SmdInput } from "../lib/smd";
import { translations } from "../i18n/translations";
import type { Lang } from "../i18n/translations";

interface Props {
  lang: Lang;
}

const DEFAULT_INPUT: SmdInput = { mean1: 75, sd1: 10, n1: 20, mean2: 70, sd2: 10, n2: 20 };

function interp(template: string, vars: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (_, key) =>
    key in vars ? String(vars[key]) : `{${key}}`
  );
}

function magnitudeKey(d: number): "magnitudeNegligible" | "magnitudeSmall" | "magnitudeMedium" | "magnitudeLarge" {
  const abs = Math.abs(d);
  if (abs < 0.2) return "magnitudeNegligible";
  if (abs < 0.5) return "magnitudeSmall";
  if (abs < 0.8) return "magnitudeMedium";
  return "magnitudeLarge";
}

const SmdAnalysis: React.FC<Props> = ({ lang }) => {
  const t = translations[lang];
  const ts = t.clinical.smd;

  const [input, setInput] = useState<SmdInput>(DEFAULT_INPUT);
  const [showFormula, setShowFormula] = useState(false);

  const { results, error } = useMemo(() => {
    try {
      return { results: calculateSmd(input), error: null };
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
        <SmdInputComponent value={input} onChange={setInput} lang={lang} />

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
                <span className="formula-name">{ts.formulaPooledSd}</span>
                <span className="formula-expr">{ts.formulaPooledSdExpr}</span>
              </div>
              <div className="formula-row">
                <span className="formula-name">{ts.formulaCohensD}</span>
                <span className="formula-expr">{ts.formulaCohensDExpr}</span>
              </div>
              <div className="formula-row">
                <span className="formula-name">{ts.formulaHedgesG}</span>
                <span className="formula-expr">{ts.formulaHedgesGExpr}</span>
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
                <div className="strat-stat-label">{ts.pooledSdLabel}</div>
                <div className="strat-stat-value">{results.pooledSd.toFixed(4)}</div>
              </div>

              <div className="strat-stat-card">
                <div className="strat-stat-label">{ts.cohensDLabel}</div>
                <div className="strat-stat-value">{results.cohensD.toFixed(4)}</div>
                <div className="strat-stat-sub">
                  {interp(ts.cohensDSub, {
                    m1: results.mean1,
                    m2: results.mean2,
                    psd: results.pooledSd.toFixed(4),
                  })}
                </div>
              </div>

              <div className="strat-stat-card" style={{ gridColumn: "1 / -1" }}>
                <div className="strat-stat-label">{ts.hedgesGLabel}</div>
                <div className="strat-stat-value">{results.hedgesG.toFixed(4)}</div>
                <div className="strat-stat-sub">
                  {interp(ts.hedgesGSub, {
                    m: results.n1 + results.n2 - 2,
                    j: results.correctionFactor.toFixed(5),
                  })}
                </div>
              </div>
            </div>

            <div className="strat-chart-card">
              <p>
                {interp(ts.interpSummary, {
                  d: results.cohensD.toFixed(4),
                  magnitude: ts[magnitudeKey(results.cohensD)],
                  g: results.hedgesG.toFixed(4),
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

export default SmdAnalysis;
