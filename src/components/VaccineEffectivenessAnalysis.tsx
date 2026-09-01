import { useState, useMemo } from "react";
import VaccineEffectivenessInput from "./VaccineEffectivenessInput";
import { calculateVaccineEffectiveness } from "../lib/vaccineEffectiveness";
import type { VaccineEffectivenessInput as VeInputType } from "../lib/vaccineEffectiveness";
import { translations } from "../i18n/translations";
import type { Lang } from "../i18n/translations";

interface Props {
  lang: Lang;
}

const DEFAULT_INPUT: VeInputType = {
  mode: "counts",
  casesVaccinated: 100,
  totalVaccinated: 10000,
  casesUnvaccinated: 1000,
  totalUnvaccinated: 10000,
};

function interp(template: string, vars: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (_, key) =>
    key in vars ? String(vars[key]) : `{${key}}`
  );
}

const VaccineEffectivenessAnalysis: React.FC<Props> = ({ lang }) => {
  const t = translations[lang];
  const ts = t.clinical.vaccineEffectiveness;

  const [input, setInput] = useState<VeInputType>(DEFAULT_INPUT);
  const [showFormula, setShowFormula] = useState(false);

  const { results, error } = useMemo(() => {
    try {
      return { results: calculateVaccineEffectiveness(input), error: null };
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
        <VaccineEffectivenessInput value={input} onChange={setInput} lang={lang} />

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
                <span className="formula-name">{ts.formulaVe}</span>
                <span className="formula-expr">{ts.formulaVeExpr}</span>
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
              {input.mode === "counts" && (
                <>
                  <div className="strat-stat-card">
                    <div className="strat-stat-label">{ts.derivedArVaccinatedLabel}</div>
                    <div className="strat-stat-value">
                      {results.attackRateVaccinated.toFixed(4)}
                    </div>
                  </div>
                  <div className="strat-stat-card">
                    <div className="strat-stat-label">{ts.derivedArUnvaccinatedLabel}</div>
                    <div className="strat-stat-value">
                      {results.attackRateUnvaccinated.toFixed(4)}
                    </div>
                  </div>
                </>
              )}
              <div className="strat-stat-card" style={{ gridColumn: "1 / -1" }}>
                <div className="strat-stat-label">{ts.veLabel}</div>
                <div className="strat-stat-value">{(results.ve * 100).toFixed(2)}%</div>
                <div className="strat-stat-sub">
                  {interp(ts.veSub, {
                    arv: results.attackRateVaccinated.toFixed(4),
                    aru: results.attackRateUnvaccinated.toFixed(4),
                    rr: results.relativeRisk.toFixed(4),
                  })}
                </div>
              </div>
            </div>

            {results.ve < 0 && (
              <div className="rxc-warning-card">
                <span className="rxc-warning-icon">!</span>
                <span className="rxc-warning-text">{ts.negativeWarning}</span>
              </div>
            )}

            <div className="strat-chart-card">
              <p>
                {interp(ts.interpSummary, {
                  arv: results.attackRateVaccinated.toFixed(4),
                  aru: results.attackRateUnvaccinated.toFixed(4),
                  vePercent: `${(results.ve * 100).toFixed(2)}%`,
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

export default VaccineEffectivenessAnalysis;
