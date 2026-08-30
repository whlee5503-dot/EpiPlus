import "./DesignEffectInput.css";
import type { DesignEffectFormInput } from "../lib/designEffectForm";
import { translations, type Lang } from "../i18n/translations";

interface Props {
  value: DesignEffectFormInput;
  onChange: (value: DesignEffectFormInput) => void;
  lang: Lang;
}

export default function DesignEffectInput({ value, onChange, lang }: Props) {
  const t = translations[lang].samplingdesign.designEffect.input;

  return (
    <div className="de-input-wrapper">
      <div className="de-field">
        <span className="de-field-label">{t.avgClusterSizeLabel}</span>
        <input
          type="number"
          inputMode="decimal"
          min={1}
          step={1}
          className="de-number-input"
          value={value.avgClusterSize}
          onChange={(e) =>
            onChange({ ...value, avgClusterSize: parseFloat(e.target.value) || 0 })
          }
        />
        <span className="de-hint">{t.avgClusterSizeHint}</span>
      </div>

      <div className="de-field">
        <span className="de-field-label">{t.iccLabel}</span>
        <input
          type="number"
          inputMode="decimal"
          min={0}
          max={1}
          step={0.001}
          className="de-number-input"
          value={value.icc}
          onChange={(e) => onChange({ ...value, icc: parseFloat(e.target.value) || 0 })}
        />
        <span className="de-hint">{t.iccHint}</span>
      </div>

      <div className="de-section-title">{t.sectionEffectiveTitle}</div>

      <div className="de-field">
        <span className="de-field-label">{t.nominalSampleSizeLabel}</span>
        <input
          type="number"
          inputMode="decimal"
          min={0}
          step={1}
          className="de-number-input"
          value={value.nominalSampleSize ?? ""}
          onChange={(e) =>
            onChange({
              ...value,
              nominalSampleSize: e.target.value === "" ? undefined : parseFloat(e.target.value),
            })
          }
        />
        <span className="de-hint">{t.nominalSampleSizeHint}</span>
      </div>

      <div className="de-section-title">{t.sectionAdjustedTitle}</div>

      <div className="de-field">
        <span className="de-field-label">{t.individualSampleSizeLabel}</span>
        <input
          type="number"
          inputMode="decimal"
          min={0}
          step={1}
          className="de-number-input"
          value={value.individualSampleSize ?? ""}
          onChange={(e) =>
            onChange({
              ...value,
              individualSampleSize:
                e.target.value === "" ? undefined : parseFloat(e.target.value),
            })
          }
        />
        <span className="de-hint">{t.individualSampleSizeHint}</span>
      </div>
    </div>
  );
}
