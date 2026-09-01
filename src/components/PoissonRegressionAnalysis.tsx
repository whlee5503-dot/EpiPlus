import { useState, useMemo } from "react";
import PoissonRegressionInput from "./PoissonRegressionInput";
import { calculatePoissonRegression } from "../lib/poissonRegression";
import type { PoissonRegressionInput as PoissonInputType } from "../lib/poissonRegression";
import { translations } from "../i18n/translations";
import type { Lang } from "../i18n/translations";

interface Props {
  lang: Lang;
}

const DEFAULT_INPUT: PoissonInputType = {
  groups: [
    { id: "unexposed", label: "Unexposed", events: 10, personTime: 1000 },
    { id: "exposed", label: "Exposed", events: 20, personTime: 500 },
  ],
  referenceGroupId: "unexposed",
};

function interp(template: string, vars: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (_, key) =>
    key in vars ? String(vars[key]) : `{${key}}`
  );
}

const PoissonRegressionAnalysis: React.FC<Props> = ({ lang }) => {
  const t = translations[lang];
  const ts = t.statisticalmodeling.poissonRegression;

  const [input, setInput] = useState<PoissonInputType>(DEFAULT_INPUT);
  const [showFormula, setShowFormula] = useState(false);

  const { results, error } = useMemo(() => {
    if (input.groups.length < 2) return { results: null, error: null };
    try {
      return { results: calculatePoissonRegression(input), error: null };
    } catch (e) {
      return { results: null, error: e instanceof Error ? e.message : null };
    }
  }, [input]);

  const summaryVars = useMemo(() => {
    if (!results) return null;
    const reference = results.groups.find((g) => g.isReference)!;
    const nonReference = results.groups.filter((g) => !g.isReference);
    if (nonReference.length === 0) return null;
    const highest = nonReference.reduce((a, b) => (b.irr > a.irr ? b : a));
    const lowest = nonReference.reduce((a, b) => (b.irr < a.irr ? b : a));
    return { reference, highest, lowest };
  }, [results]);

  return (
    <>
      <h2 className="strat-chart-title" style={{ marginBottom: "var(--space-3)" }}>
        {ts.heading}
      </h2>

      <div className="rxc-top">
        <PoissonRegressionInput value={input} onChange={setInput} lang={lang} />

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
                <span className="formula-name">{ts.formulaRate}</span>
                <span className="formula-expr">{ts.formulaRateExpr}</span>
              </div>
              <div className="formula-row">
                <span className="formula-name">{ts.formulaIrr}</span>
                <span className="formula-expr">{ts.formulaIrrExpr}</span>
              </div>
              <div className="formula-row">
                <span className="formula-name">{ts.formulaCi}</span>
                <span className="formula-expr">{ts.formulaCiExpr}</span>
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
            <div className="strat-chart-card">
              <table className="strat-table">
                <thead>
                  <tr>
                    <th>{ts.tableGroup}</th>
                    <th>{ts.tableRate}</th>
                    <th>{ts.tableIrr}</th>
                    <th>{ts.tableCi}</th>
                  </tr>
                </thead>
                <tbody>
                  {results.groups.map((g) => (
                    <tr key={g.id}>
                      <td>
                        {g.label} {g.isReference ? ts.referenceTag : ""}
                      </td>
                      <td>{g.rate.toFixed(5)}</td>
                      <td>{g.irr.toFixed(3)}</td>
                      <td>
                        {g.isReference
                          ? "—"
                          : g.irrLower !== undefined && g.irrUpper !== undefined
                          ? `${g.irrLower.toFixed(3)} - ${g.irrUpper.toFixed(3)}`
                          : ts.undefinedCi}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {summaryVars && (
              <div className="strat-chart-card">
                <p>
                  {interp(ts.interpSummary, {
                    refLabel: summaryVars.reference.label,
                    refRate: summaryVars.reference.rate.toFixed(5),
                    highLabel: summaryVars.highest.label,
                    highIrr: summaryVars.highest.irr.toFixed(3),
                    lowLabel: summaryVars.lowest.label,
                    lowIrr: summaryVars.lowest.irr.toFixed(3),
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

export default PoissonRegressionAnalysis;
