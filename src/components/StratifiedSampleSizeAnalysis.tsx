import { useState, useMemo } from "react";
import StratifiedSampleSizeInput from "./StratifiedSampleSizeInput";
import { calculateStratifiedSampleSize } from "../lib/stratifiedSampleSize";
import type { StratifiedSampleSizeInput as StratifiedSampleSizeInputType } from "../lib/stratifiedSampleSize";
import { translations } from "../i18n/translations";
import type { Lang } from "../i18n/translations";

interface Props {
  lang: Lang;
}

const DEFAULT_INPUT: StratifiedSampleSizeInputType = {
  totalSampleSize: 100,
  method: "proportional",
  strata: [
    { id: "stratum-a", label: "Stratum A", populationSize: 1000, stdDev: 5 },
    { id: "stratum-b", label: "Stratum B", populationSize: 2000, stdDev: 10 },
    { id: "stratum-c", label: "Stratum C", populationSize: 3000, stdDev: 15 },
  ],
};

function interp(template: string, vars: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (_, key) =>
    key in vars ? String(vars[key]) : `{${key}}`
  );
}

const StratifiedSampleSizeAnalysis: React.FC<Props> = ({ lang }) => {
  const t = translations[lang];
  const ts = t.samplingdesign.stratifiedSampleSize;

  const [input, setInput] = useState<StratifiedSampleSizeInputType>(DEFAULT_INPUT);
  const [showFormula, setShowFormula] = useState(false);

  const { results, error } = useMemo(() => {
    if (input.totalSampleSize <= 0 || input.strata.length === 0) {
      return { results: null, error: null };
    }
    if (input.strata.some((s) => s.populationSize <= 0)) {
      return { results: null, error: null };
    }
    try {
      return { results: calculateStratifiedSampleSize(input), error: null };
    } catch (e) {
      return { results: null, error: e instanceof Error ? e.message : null };
    }
  }, [input]);

  const methodLabel =
    input.method === "equal"
      ? ts.methodEqual
      : input.method === "proportional"
      ? ts.methodProportional
      : ts.methodNeyman;

  return (
    <>
      <h2 className="strat-chart-title" style={{ marginBottom: "var(--space-3)" }}>
        {ts.heading}
      </h2>

      <div className="rxc-top">
        <StratifiedSampleSizeInput value={input} onChange={setInput} lang={lang} />

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
                <span className="formula-name">{ts.formulaEqual}</span>
                <span className="formula-expr">{ts.formulaEqualExpr}</span>
              </div>
              <div className="formula-row">
                <span className="formula-name">{ts.formulaProportional}</span>
                <span className="formula-expr">{ts.formulaProportionalExpr}</span>
              </div>
              <div className="formula-row">
                <span className="formula-name">{ts.formulaNeyman}</span>
                <span className="formula-expr">{ts.formulaNeymanExpr}</span>
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
            <span className="rxc-warning-text">{ts.neymanMissingStdDev}</span>
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
            <div className="strat-chart-card">
              <div className="strat-chart-header">
                <h2 className="strat-chart-title">{ts.tableLabel}</h2>
              </div>
              <table className="strat-table">
                <thead>
                  <tr>
                    <th>{ts.tableLabel}</th>
                    <th>{ts.tablePopulation}</th>
                    <th>{ts.tableWeight}</th>
                    <th>{ts.tableSampleSize}</th>
                  </tr>
                </thead>
                <tbody>
                  {results.allocations.map((a) => (
                    <tr key={a.id}>
                      <td>{a.label}</td>
                      <td>{a.populationSize.toLocaleString()}</td>
                      <td>{(a.weight * 100).toFixed(1)}%</td>
                      <td>{a.sampleSize}</td>
                    </tr>
                  ))}
                  <tr>
                    <td>
                      <strong>{ts.tableTotal}</strong>
                    </td>
                    <td>
                      <strong>{results.totalPopulationSize.toLocaleString()}</strong>
                    </td>
                    <td>100%</td>
                    <td>
                      <strong>{results.allocatedTotal}</strong>
                    </td>
                  </tr>
                </tbody>
              </table>
              <p className="strat-footnote" style={{ marginTop: "var(--space-3)" }}>
                {interp(ts.allocatedTotalNote, {
                  allocated: results.allocatedTotal,
                  target: results.totalSampleSize,
                })}
              </p>
            </div>

            <div className="strat-chart-card">
              <p>
                {interp(ts.interpSummary, {
                  method: methodLabel,
                  strata: results.allocations.length,
                  population: results.totalPopulationSize.toLocaleString(),
                  target: results.totalSampleSize,
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

export default StratifiedSampleSizeAnalysis;
