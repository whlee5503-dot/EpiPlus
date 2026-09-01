import { useState, useMemo } from "react";
import ClusterSampleSizeInput from "./ClusterSampleSizeInput";
import { calculateClusterSampleSize } from "../lib/clusterSampleSize";
import type { ClusterSampleSizeInput as ClusterSampleSizeInputType } from "../lib/clusterSampleSize";
import { translations } from "../i18n/translations";
import type { Lang } from "../i18n/translations";

interface Props {
  lang: Lang;
}

const DEFAULT_INPUT: ClusterSampleSizeInputType = {
  srsSampleSize: 100,
  avgClusterSize: 25,
  icc: 0.017,
};

function interp(template: string, vars: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (_, key) =>
    key in vars ? String(vars[key]) : `{${key}}`
  );
}

const ClusterSampleSizeAnalysis: React.FC<Props> = ({ lang }) => {
  const t = translations[lang];
  const ts = t.samplingdesign.clusterSampleSize;

  const [input, setInput] = useState<ClusterSampleSizeInputType>(DEFAULT_INPUT);
  const [showFormula, setShowFormula] = useState(false);

  const results = useMemo(() => {
    if (input.srsSampleSize <= 0 || input.avgClusterSize <= 0 || input.icc < 0 || input.icc > 1) {
      return null;
    }
    try {
      return calculateClusterSampleSize(input);
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
        <ClusterSampleSizeInput value={input} onChange={setInput} lang={lang} />

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
                <span className="formula-name">{ts.formulaNCluster}</span>
                <span className="formula-expr">{ts.formulaNClusterExpr}</span>
              </div>
              <div className="formula-row">
                <span className="formula-name">{ts.formulaClusters}</span>
                <span className="formula-expr">{ts.formulaClustersExpr}</span>
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
              <div className="strat-stat-card">
                <div className="strat-stat-label">{ts.deffLabel}</div>
                <div className="strat-stat-value">{results.designEffect.toFixed(3)}</div>
                <div className="strat-stat-sub">
                  {interp(ts.deffSub, { m: input.avgClusterSize, icc: input.icc })}
                </div>
              </div>

              <div className="strat-stat-card">
                <div className="strat-stat-label">{ts.clusterAdjustedSampleSizeLabel}</div>
                <div className="strat-stat-value">{results.clusterAdjustedSampleSize}</div>
                <div className="strat-stat-sub">
                  {interp(ts.clusterAdjustedSampleSizeSub, {
                    srs: input.srsSampleSize,
                    deff: results.designEffect.toFixed(3),
                  })}
                </div>
              </div>

              <div className="strat-stat-card">
                <div className="strat-stat-label">{ts.numberOfClustersLabel}</div>
                <div className="strat-stat-value">{results.numberOfClusters}</div>
                <div className="strat-stat-sub">
                  {interp(ts.numberOfClustersSub, {
                    adjusted: results.clusterAdjustedSampleSize,
                    m: input.avgClusterSize,
                  })}
                </div>
              </div>

              <div className="strat-stat-card">
                <div className="strat-stat-label">{ts.actualSampleSizeLabel}</div>
                <div className="strat-stat-value">{results.actualSampleSize}</div>
                <div className="strat-stat-sub">
                  {interp(ts.actualSampleSizeSub, {
                    clusters: results.numberOfClusters,
                    m: input.avgClusterSize,
                  })}
                </div>
              </div>
            </div>

            <div className="strat-chart-card">
              <p>
                {interp(ts.interpSummary, {
                  adjusted: results.clusterAdjustedSampleSize,
                  m: input.avgClusterSize,
                  clusters: results.numberOfClusters,
                  actual: results.actualSampleSize,
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

export default ClusterSampleSizeAnalysis;
