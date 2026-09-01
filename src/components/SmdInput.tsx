import "./ClinicalCalculatorInput.css";
import type { SmdInput } from "../lib/smd";
import { translations, type Lang } from "../i18n/translations";

interface Props {
  value: SmdInput;
  onChange: (value: SmdInput) => void;
  lang: Lang;
}

export default function SmdInputComponent({ value, onChange, lang }: Props) {
  const ts = translations[lang].clinical.smd;
  const t = ts.input;

  return (
    <div className="clin-input-wrapper">
      <div className="clin-group-title" style={{ borderTop: "none", marginTop: 0, paddingTop: 0 }}>
        {t.group1Title}
      </div>
      <div className="clin-grid-2">
        <div className="clin-field">
          <label className="clin-field-label" htmlFor="smd-mean1">{t.meanLabel}</label>
          <input
            id="smd-mean1"
            type="number"
            inputMode="decimal"
            step={0.01}
            className="clin-number-input"
            value={value.mean1}
            onChange={(e) => onChange({ ...value, mean1: parseFloat(e.target.value) || 0 })}
          />
        </div>
        <div className="clin-field">
          <label className="clin-field-label" htmlFor="smd-sd1">{t.sdLabel}</label>
          <input
            id="smd-sd1"
            type="number"
            inputMode="decimal"
            min={0}
            step={0.01}
            className="clin-number-input"
            value={value.sd1}
            onChange={(e) => onChange({ ...value, sd1: parseFloat(e.target.value) || 0 })}
          />
        </div>
        <div className="clin-field">
          <label className="clin-field-label" htmlFor="smd-n1">{t.nLabel}</label>
          <input
            id="smd-n1"
            type="number"
            inputMode="decimal"
            min={2}
            step={1}
            className="clin-number-input"
            value={value.n1}
            onChange={(e) => onChange({ ...value, n1: parseFloat(e.target.value) || 0 })}
          />
        </div>
      </div>

      <div className="clin-group-title">{t.group2Title}</div>
      <div className="clin-grid-2">
        <div className="clin-field">
          <label className="clin-field-label" htmlFor="smd-mean2">{t.meanLabel}</label>
          <input
            id="smd-mean2"
            type="number"
            inputMode="decimal"
            step={0.01}
            className="clin-number-input"
            value={value.mean2}
            onChange={(e) => onChange({ ...value, mean2: parseFloat(e.target.value) || 0 })}
          />
        </div>
        <div className="clin-field">
          <label className="clin-field-label" htmlFor="smd-sd2">{t.sdLabel}</label>
          <input
            id="smd-sd2"
            type="number"
            inputMode="decimal"
            min={0}
            step={0.01}
            className="clin-number-input"
            value={value.sd2}
            onChange={(e) => onChange({ ...value, sd2: parseFloat(e.target.value) || 0 })}
          />
        </div>
        <div className="clin-field">
          <label className="clin-field-label" htmlFor="smd-n2">{t.nLabel}</label>
          <input
            id="smd-n2"
            type="number"
            inputMode="decimal"
            min={2}
            step={1}
            className="clin-number-input"
            value={value.n2}
            onChange={(e) => onChange({ ...value, n2: parseFloat(e.target.value) || 0 })}
          />
        </div>
      </div>
    </div>
  );
}
