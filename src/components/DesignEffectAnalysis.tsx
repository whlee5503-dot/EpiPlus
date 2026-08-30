import { useState, useMemo } from "react";
import DesignEffectInput from "./DesignEffectInput";
import { calculateDesignEffectForm } from "../lib/designEffectForm";
import type { DesignEffectFormInput } from "../lib/designEffectForm";
import { translations } from "../i18n/translations";
import type { Lang } from "../i18n/translations";

interface Props {
  lang: Lang;
}

const DEFAULT_INPUT: DesignEffectFormInput = {
  avgClusterSize: 25,
  icc: 0.017,
  nominalSampleSize: undefined,
  individualSampleSize: undefined,
};

function interp(template: string, vars: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (_, key) =>
    key in vars ? String(vars[key]) : `{${key}}`
  );
}

const DesignEffectAnalysis: React.FC<Props> = ({ lang }) => {
  const t = translations[lang];
  const ts = t.samplingdesign.designEffect;

  const [input, setInput] = useState<DesignEffectFormInput>(DEFAULT_INPUT);
  const [showFormula, setShowFormula] = useState(false);

  const results = useMemo(() => {
    if (input.avgClusterSize <= 0 || input.icc < 0 || input.icc > 1) return null;
    try {
      return calculateDesignEffectForm(input);
    } catch {
      return null;
    }
  }, [input]);

  return (
    <>
      <h2 className="strat-chart-title" style={{ marginBottom: "var(--space-3)" }}>
        {ts.heading}
      </h2>

      <div className="rxc-top">
        <DesignEffectInput value={input} onChange={setInput} lang={lang} />

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
                <span className="formula-name">{ts.formulaDeff}</span>
                <span className="formula-expr">{ts.formulaDeffExpr}</span>
              </div>
              <div className="formula-row">
                <span className="formula-name">{ts.formulaNeff}</span>
                <span className="formula-expr">{ts.formulaNeffExpr}</span>
              </div>
              <div className="formula-row">
                <span className="formula-name">{ts.formulaAdjustedN}</span>
                <span className="formula-expr">{ts.formulaAdjustedNExpr}</span>
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
        {!results ? (
          <div className="strat-empty-state">
            <div className="strat-empty-text">{ts.emptyState}</div>
          </div>
        ) : (
          <>
            <div className="strat-stats-grid">
              <div className="strat-stat-card" style={{ gridColumn: "1 / -1" }}>
                <div className="strat-stat-label">{ts.deffLabel}</div>
                <div className="strat-stat-value">{results.designEffect.toFixed(3)}</div>
                <div className="strat-stat-sub">
                  {interp(ts.deffSub, {
                    m: input.avgClusterSize,
                    icc: input.icc,
                  })}
                </div>
              </div>

              {results.effectiveSampleSize !== undefined && (
                <div className="strat-stat-card">
                  <div className="strat-stat-label">{ts.effectiveSampleSizeLabel}</div>
                  <div className="strat-stat-value">
                    {Math.round(results.effectiveSampleSize)}
                  </div>
                  <div className="strat-stat-sub">
                    {interp(ts.effectiveSampleSizeSub, {
                      nominal: input.nominalSampleSize ?? 0,
                      deff: results.designEffect.toFixed(3),
                    })}
                  </div>
                </div>
              )}

              {results.adjustedSampleSize !== undefined && (
                <div className="strat-stat-card">
                  <div className="strat-stat-label">{ts.adjustedSampleSizeLabel}</div>
                  <div className="strat-stat-value">{results.adjustedSampleSize}</div>
                  <div className="strat-stat-sub">
                    {interp(ts.adjustedSampleSizeSub, {
                      individual: input.individualSampleSize ?? 0,
                      deff: results.designEffect.toFixed(3),
                    })}
                  </div>
                </div>
              )}
            </div>

            <div className="strat-chart-card">
              <p>
                {interp(ts.interpSummary, {
                  m: input.avgClusterSize,
                  icc: input.icc,
                  deff: results.designEffect.toFixed(3),
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

export default DesignEffectAnalysis;
