import "./ClusterSampleSizeInput.css";
import type { ClusterSampleSizeInput as ClusterSampleSizeInputType } from "../lib/clusterSampleSize";
import { translations, type Lang } from "../i18n/translations";

interface Props {
  value: ClusterSampleSizeInputType;
  onChange: (value: ClusterSampleSizeInputType) => void;
  lang: Lang;
}

export default function ClusterSampleSizeInput({ value, onChange, lang }: Props) {
  const t = translations[lang].samplingdesign.clusterSampleSize.input;

  return (
    <div className="css-input-wrapper">
      <div className="css-field">
        <span className="css-field-label">{t.srsSampleSizeLabel}</span>
        <input
          type="number"
          inputMode="decimal"
          min={1}
          step={1}
          className="css-number-input"
          value={value.srsSampleSize}
          onChange={(e) =>
            onChange({ ...value, srsSampleSize: parseFloat(e.target.value) || 0 })
          }
        />
        <span className="css-hint">{t.srsSampleSizeHint}</span>
      </div>

      <div className="css-field">
        <span className="css-field-label">{t.avgClusterSizeLabel}</span>
        <input
          type="number"
          inputMode="decimal"
          min={1}
          step={1}
          className="css-number-input"
          value={value.avgClusterSize}
          onChange={(e) =>
            onChange({ ...value, avgClusterSize: parseFloat(e.target.value) || 0 })
          }
        />
        <span className="css-hint">{t.avgClusterSizeHint}</span>
      </div>

      <div className="css-field">
        <span className="css-field-label">{t.iccLabel}</span>
        <input
          type="number"
          inputMode="decimal"
          min={0}
          max={1}
          step={0.001}
          className="css-number-input"
          value={value.icc}
          onChange={(e) => onChange({ ...value, icc: parseFloat(e.target.value) || 0 })}
        />
        <span className="css-hint">{t.iccHint}</span>
      </div>
    </div>
  );
}
