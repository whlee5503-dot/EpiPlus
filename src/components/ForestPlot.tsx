import type { MetaAnalysisResult } from "../lib/metaAnalysis";
import { translations, type Lang } from "../i18n/translations";

interface Props {
  results: MetaAnalysisResult;
  lang: Lang;
}

const Z_95 = 1.959964;
const LABEL_WIDTH = 170;
const PLOT_RIGHT_MARGIN = 90;
const ROW_HEIGHT = 30;
const TOP_MARGIN = 30;
const BOTTOM_MARGIN = 60;
const SVG_WIDTH = 680;

function formatDisplay(v: number, effectType: "difference" | "ratio"): string {
  return effectType === "ratio" ? v.toFixed(2) : v.toFixed(3);
}

export default function ForestPlot({ results, lang }: Props) {
  const ts = translations[lang].metaanalysis.metaAnalysis;
  const { studies, fixedEffect, randomEffect, effectType } = results;

  // Work in "y-space": already-log-transformed for ratio measures, raw for
  // difference measures. The null value is always y=0 in this space
  // (ln(1)=0 for ratios, 0 for differences).
  const rows = studies.map((s) => ({
    label: s.label,
    y: s.y,
    lo: s.y - Z_95 * s.se,
    hi: s.y + Z_95 * s.se,
    weight: s.weightFixed,
  }));

  const allBounds = [
    ...rows.flatMap((r) => [r.lo, r.hi]),
    fixedEffect.y - Z_95 * fixedEffect.se,
    fixedEffect.y + Z_95 * fixedEffect.se,
    randomEffect.y - Z_95 * randomEffect.se,
    randomEffect.y + Z_95 * randomEffect.se,
    0,
  ];
  const dataMin = Math.min(...allBounds);
  const dataMax = Math.max(...allBounds);
  const pad = (dataMax - dataMin) * 0.12 || 1;
  const scaleMin = dataMin - pad;
  const scaleMax = dataMax + pad;

  const plotLeft = LABEL_WIDTH;
  const plotRight = SVG_WIDTH - PLOT_RIGHT_MARGIN;

  const xOf = (y: number) =>
    plotLeft + ((y - scaleMin) / (scaleMax - scaleMin)) * (plotRight - plotLeft);

  const maxWeight = Math.max(...rows.map((r) => r.weight));
  const boxHalfSize = (w: number) => 3 + (w / maxWeight) * 6;

  const svgHeight = TOP_MARGIN + rows.length * ROW_HEIGHT + BOTTOM_MARGIN;
  const nullX = xOf(0);

  // Simple tick marks at scaleMin, 0, scaleMax (back-transformed for display)
  const ticks = [scaleMin, 0, scaleMax].map((y) => ({
    y,
    x: xOf(y),
    label: formatDisplay(effectType === "ratio" ? Math.exp(y) : y, effectType),
  }));

  return (
    <svg
      className="meta-forest-svg"
      viewBox={`0 0 ${SVG_WIDTH} ${svgHeight}`}
      width="100%"
      role="img"
      aria-label={ts.forestPlotTitle}
    >
      {/* null-effect reference line */}
      <line
        className="meta-forest-nullline"
        x1={nullX}
        y1={TOP_MARGIN - 10}
        x2={nullX}
        y2={TOP_MARGIN + rows.length * ROW_HEIGHT + 20}
      />

      {rows.map((r, i) => {
        const rowY = TOP_MARGIN + i * ROW_HEIGHT + ROW_HEIGHT / 2;
        const half = boxHalfSize(r.weight);
        return (
          <g key={i}>
            <text x={8} y={rowY + 4}>
              {r.label}
            </text>
            <line
              className="meta-forest-ci"
              x1={xOf(r.lo)}
              y1={rowY}
              x2={xOf(r.hi)}
              y2={rowY}
            />
            <rect
              className="meta-forest-box"
              x={xOf(r.y) - half}
              y={rowY - half}
              width={half * 2}
              height={half * 2}
            />
            <text x={plotRight + 8} y={rowY + 4} style={{ fontSize: "11px" }}>
              {formatDisplay(effectType === "ratio" ? Math.exp(r.y) : r.y, effectType)}
            </text>
          </g>
        );
      })}

      {/* Fixed-effect diamond */}
      {(() => {
        const rowY = TOP_MARGIN + rows.length * ROW_HEIGHT + 14;
        const lo = xOf(fixedEffect.y - Z_95 * fixedEffect.se);
        const mid = xOf(fixedEffect.y);
        const hi = xOf(fixedEffect.y + Z_95 * fixedEffect.se);
        const h = 6;
        return (
          <g>
            <polygon
              className="meta-forest-diamond"
              points={`${lo},${rowY} ${mid},${rowY - h} ${hi},${rowY} ${mid},${rowY + h}`}
            />
            <text x={8} y={rowY + 4}>
              {ts.forestPlotPooledFixed}
            </text>
          </g>
        );
      })()}

      {/* Random-effects diamond (outline, offset below) */}
      {(() => {
        const rowY = TOP_MARGIN + rows.length * ROW_HEIGHT + 14 + 22;
        const lo = xOf(randomEffect.y - Z_95 * randomEffect.se);
        const mid = xOf(randomEffect.y);
        const hi = xOf(randomEffect.y + Z_95 * randomEffect.se);
        const h = 6;
        return (
          <g>
            <polygon
              className="meta-forest-diamond-random"
              points={`${lo},${rowY} ${mid},${rowY - h} ${hi},${rowY} ${mid},${rowY + h}`}
            />
            <text x={8} y={rowY + 4}>
              {ts.forestPlotPooledRandom}
            </text>
          </g>
        );
      })()}

      {/* axis */}
      <line
        className="meta-forest-axis"
        x1={plotLeft}
        y1={svgHeight - 26}
        x2={plotRight}
        y2={svgHeight - 26}
      />
      {ticks.map((t, i) => (
        <g key={i}>
          <line
            className="meta-forest-axis"
            x1={t.x}
            y1={svgHeight - 26}
            x2={t.x}
            y2={svgHeight - 22}
          />
          <text x={t.x} y={svgHeight - 8} textAnchor="middle" style={{ fontSize: "11px" }}>
            {t.label}
          </text>
        </g>
      ))}
    </svg>
  );
}
