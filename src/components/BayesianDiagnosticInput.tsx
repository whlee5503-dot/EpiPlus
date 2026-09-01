import "./ClinicalCalculatorInput.css";
import type { BayesianDiagnosticInput as BayesInputType } from "../lib/bayesianDiagnostic";
import { translations, type Lang } from "../i18n/translations";

interface Props {
  value: BayesInputType;
  onChange: (value: BayesInputType) => void;
  lang: Lang;
}

export default function BayesianDiagnosticInput({ value, onChange, lang }: Props) {
  const ts = translations[lang].statisticalmodeling.bayesianDiagnostic;
  const t = ts.input;

  const setMode = (mode: BayesInputType["mode"]) => {
    if (mode === "direct") {
      onChange({ mode: "direct", sensitivity: 0.9, specificity: 0.95, prevalence: 0.08 });
    } else {
      onChange({ mode: "table2x2", tp: 95, fn: 5, tn: 880, fp: 20 });
    }
  };

  return (
    <div className="clin-input-wrapper">
      <div className="clin-field">
        <span className="clin-field-label">{ts.modeLabel}</span>
        <select
          className="clin-method-select"
          value={value.mode}
          onChange={(e) => setMode(e.target.value as BayesInputType["mode"])}
        >
          <option value="direct">{ts.modeDirect}</option>
          <option value="table2x2">{ts.modeTable2x2}</option>
        </select>
      </div>

      {value.mode === "direct" ? (
        <>
          <div className="clin-field">
            <span className="clin-field-label">{t.sensitivityLabel}</span>
            <input
              type="number"
              inputMode="decimal"
              min={0}
              max={1}
              step={0.001}
              className="clin-number-input"
              value={value.sensitivity}
              onChange={(e) => onChange({ ...value, sensitivity: parseFloat(e.target.value) || 0 })}
            />
            <span className="clin-hint">{t.sensitivityHint}</span>
          </div>
          <div className="clin-field">
            <span className="clin-field-label">{t.specificityLabel}</span>
            <input
              type="number"
              inputMode="decimal"
              min={0}
              max={1}
              step={0.001}
              className="clin-number-input"
              value={value.specificity}
              onChange={(e) => onChange({ ...value, specificity: parseFloat(e.target.value) || 0 })}
            />
            <span className="clin-hint">{t.specificityHint}</span>
          </div>
          <div className="clin-field">
            <span className="clin-field-label">{t.prevalenceLabel}</span>
            <input
              type="number"
              inputMode="decimal"
              min={0}
              max={1}
              step={0.001}
              className="clin-number-input"
              value={value.prevalence}
              onChange={(e) => onChange({ ...value, prevalence: parseFloat(e.target.value) || 0 })}
            />
            <span className="clin-hint">{t.prevalenceHint}</span>
          </div>
        </>
      ) : (
        <div className="clin-grid-2">
          <div className="clin-field">
            <span className="clin-field-label">{t.tpLabel}</span>
            <input
              type="number"
              inputMode="decimal"
              min={0}
              step={1}
              className="clin-number-input"
              value={value.tp}
              onChange={(e) => onChange({ ...value, tp: parseFloat(e.target.value) || 0 })}
            />
          </div>
          <div className="clin-field">
            <span className="clin-field-label">{t.fnLabel}</span>
            <input
              type="number"
              inputMode="decimal"
              min={0}
              step={1}
              className="clin-number-input"
              value={value.fn}
              onChange={(e) => onChange({ ...value, fn: parseFloat(e.target.value) || 0 })}
            />
          </div>
          <div className="clin-field">
            <span className="clin-field-label">{t.tnLabel}</span>
            <input
              type="number"
              inputMode="decimal"
              min={0}
              step={1}
              className="clin-number-input"
              value={value.tn}
              onChange={(e) => onChange({ ...value, tn: parseFloat(e.target.value) || 0 })}
            />
          </div>
          <div className="clin-field">
            <span className="clin-field-label">{t.fpLabel}</span>
            <input
              type="number"
              inputMode="decimal"
              min={0}
              step={1}
              className="clin-number-input"
              value={value.fp}
              onChange={(e) => onChange({ ...value, fp: parseFloat(e.target.value) || 0 })}
            />
          </div>
        </div>
      )}
    </div>
  );
}
