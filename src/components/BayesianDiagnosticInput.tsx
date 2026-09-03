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
        <label className="clin-field-label" htmlFor="bayes-mode">{ts.modeLabel}</label>
        <select
          id="bayes-mode"
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
            <label className="clin-field-label" htmlFor="bayes-sensitivity">{t.sensitivityLabel}</label>
            <input
              id="bayes-sensitivity"
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
            <label className="clin-field-label" htmlFor="bayes-specificity">{t.specificityLabel}</label>
            <input
              id="bayes-specificity"
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
            <label className="clin-field-label" htmlFor="bayes-prevalence">{t.prevalenceLabel}</label>
            <input
              id="bayes-prevalence"
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
        <>
          <div className="clin-grid-2">
            <div className="clin-field">
              <label className="clin-field-label" htmlFor="bayes-tp">{t.tpLabel}</label>
              <input
                id="bayes-tp"
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
              <label className="clin-field-label" htmlFor="bayes-fn">{t.fnLabel}</label>
              <input
                id="bayes-fn"
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
              <label className="clin-field-label" htmlFor="bayes-tn">{t.tnLabel}</label>
              <input
                id="bayes-tn"
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
              <label className="clin-field-label" htmlFor="bayes-fp">{t.fpLabel}</label>
              <input
                id="bayes-fp"
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

          <div className="clin-field" style={{ marginTop: "var(--space-3)" }}>
            <label className="clin-field-label" htmlFor="bayes-prior-prevalence">
              {t.priorPrevalenceLabel}
            </label>
            <input
              id="bayes-prior-prevalence"
              type="number"
              inputMode="decimal"
              min={0}
              max={1}
              step={0.001}
              placeholder={t.priorPrevalencePlaceholder}
              className="clin-number-input"
              value={value.priorPrevalence ?? ""}
              onChange={(e) => {
                const raw = e.target.value;
                if (raw === "") {
                  const { priorPrevalence: _drop, ...rest } = value;
                  onChange({ ...rest, mode: "table2x2" });
                } else {
                  onChange({ ...value, priorPrevalence: parseFloat(raw) });
                }
              }}
            />
            <span className="clin-hint">{t.priorPrevalenceHint}</span>
          </div>
        </>
      )}
    </div>
  );
}