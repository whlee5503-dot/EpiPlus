import "./PafInput.css";
import type { PafInput as PafInputType } from "../lib/paf";
import { translations, type Lang } from "../i18n/translations";

interface Props {
  value: PafInputType;
  onChange: (value: PafInputType) => void;
  lang: Lang;
}

export default function PafInput({ value, onChange, lang }: Props) {
  const ts = translations[lang].populationburden.paf;
  const t = ts.input;

  const setMode = (mode: PafInputType["mode"]) => {
    if (mode === "direct") {
      onChange({ mode: "direct", exposurePrevalence: 0.4, relativeRisk: 4.0 });
    } else {
      onChange({
        mode: "table2x2",
        exposedCases: 40,
        exposedNonCases: 160,
        unexposedCases: 15,
        unexposedNonCases: 285,
      });
    }
  };

  return (
    <div className="paf-input-wrapper">
      <div className="paf-field">
        <label className="paf-field-label" htmlFor="paf-mode">{ts.modeLabel}</label>
        <select
          id="paf-mode"
          className="paf-method-select"
          value={value.mode}
          onChange={(e) => setMode(e.target.value as PafInputType["mode"])}
        >
          <option value="direct">{ts.modeDirect}</option>
          <option value="table2x2">{ts.modeTable2x2}</option>
        </select>
      </div>

      {value.mode === "direct" ? (
        <>
          <div className="paf-field">
            <label className="paf-field-label" htmlFor="paf-exposure-prevalence">{t.exposurePrevalenceLabel}</label>
            <input
              id="paf-exposure-prevalence"
              type="number"
              inputMode="decimal"
              min={0}
              max={1}
              step={0.01}
              className="paf-number-input"
              value={value.exposurePrevalence}
              onChange={(e) =>
                onChange({
                  ...value,
                  exposurePrevalence: parseFloat(e.target.value) || 0,
                })
              }
            />
            <span className="paf-hint">{t.exposurePrevalenceHint}</span>
          </div>
          <div className="paf-field">
            <label className="paf-field-label" htmlFor="paf-relative-risk">{t.relativeRiskLabel}</label>
            <input
              id="paf-relative-risk"
              type="number"
              inputMode="decimal"
              min={0}
              step={0.01}
              className="paf-number-input"
              value={value.relativeRisk}
              onChange={(e) =>
                onChange({ ...value, relativeRisk: parseFloat(e.target.value) || 0 })
              }
            />
            <span className="paf-hint">{t.relativeRiskHint}</span>
          </div>
        </>
      ) : (
        <div className="paf-table-grid">
          <div className="paf-field">
            <label className="paf-field-label" htmlFor="paf-exposed-cases">{t.exposedCasesLabel}</label>
            <input
              id="paf-exposed-cases"
              type="number"
              inputMode="decimal"
              min={0}
              step={1}
              className="paf-number-input"
              value={value.exposedCases}
              onChange={(e) =>
                onChange({ ...value, exposedCases: parseFloat(e.target.value) || 0 })
              }
            />
          </div>
          <div className="paf-field">
            <label className="paf-field-label" htmlFor="paf-exposed-noncases">{t.exposedNonCasesLabel}</label>
            <input
              id="paf-exposed-noncases"
              type="number"
              inputMode="decimal"
              min={0}
              step={1}
              className="paf-number-input"
              value={value.exposedNonCases}
              onChange={(e) =>
                onChange({ ...value, exposedNonCases: parseFloat(e.target.value) || 0 })
              }
            />
          </div>
          <div className="paf-field">
            <label className="paf-field-label" htmlFor="paf-unexposed-cases">{t.unexposedCasesLabel}</label>
            <input
              id="paf-unexposed-cases"
              type="number"
              inputMode="decimal"
              min={0}
              step={1}
              className="paf-number-input"
              value={value.unexposedCases}
              onChange={(e) =>
                onChange({ ...value, unexposedCases: parseFloat(e.target.value) || 0 })
              }
            />
          </div>
          <div className="paf-field">
            <label className="paf-field-label" htmlFor="paf-unexposed-noncases">{t.unexposedNonCasesLabel}</label>
            <input
              id="paf-unexposed-noncases"
              type="number"
              inputMode="decimal"
              min={0}
              step={1}
              className="paf-number-input"
              value={value.unexposedNonCases}
              onChange={(e) =>
                onChange({ ...value, unexposedNonCases: parseFloat(e.target.value) || 0 })
              }
            />
          </div>
        </div>
      )}
    </div>
  );
}
