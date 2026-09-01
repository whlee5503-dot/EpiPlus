import "./ClinicalCalculatorInput.css";
import type { NntInput } from "../lib/nnt";
import { translations, type Lang } from "../i18n/translations";

interface Props {
  value: NntInput;
  onChange: (value: NntInput) => void;
  lang: Lang;
}

export default function NntInputComponent({ value, onChange, lang }: Props) {
  const ts = translations[lang].clinical.nnt;
  const t = ts.input;

  return (
    <div className="clin-input-wrapper">
      <div className="clin-field">
        <span className="clin-field-label">{t.controlEventRateLabel}</span>
        <input
          type="number"
          inputMode="decimal"
          min={0}
          max={1}
          step={0.001}
          className="clin-number-input"
          value={value.controlEventRate}
          onChange={(e) =>
            onChange({ ...value, controlEventRate: parseFloat(e.target.value) || 0 })
          }
        />
        <span className="clin-hint">{t.controlEventRateHint}</span>
      </div>
      <div className="clin-field">
        <span className="clin-field-label">{t.experimentalEventRateLabel}</span>
        <input
          type="number"
          inputMode="decimal"
          min={0}
          max={1}
          step={0.001}
          className="clin-number-input"
          value={value.experimentalEventRate}
          onChange={(e) =>
            onChange({ ...value, experimentalEventRate: parseFloat(e.target.value) || 0 })
          }
        />
        <span className="clin-hint">{t.experimentalEventRateHint}</span>
      </div>
    </div>
  );
}
