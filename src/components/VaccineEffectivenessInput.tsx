import "./ClinicalCalculatorInput.css";
import type { VaccineEffectivenessInput as VeInputType } from "../lib/vaccineEffectiveness";
import { translations, type Lang } from "../i18n/translations";

interface Props {
  value: VeInputType;
  onChange: (value: VeInputType) => void;
  lang: Lang;
}

export default function VaccineEffectivenessInput({ value, onChange, lang }: Props) {
  const ts = translations[lang].clinical.vaccineEffectiveness;
  const t = ts.input;

  const setMode = (mode: VeInputType["mode"]) => {
    if (mode === "rates") {
      onChange({ mode: "rates", attackRateVaccinated: 0.01, attackRateUnvaccinated: 0.1 });
    } else {
      onChange({
        mode: "counts",
        casesVaccinated: 100,
        totalVaccinated: 10000,
        casesUnvaccinated: 1000,
        totalUnvaccinated: 10000,
      });
    }
  };

  return (
    <div className="clin-input-wrapper">
      <div className="clin-field">
        <label className="clin-field-label" htmlFor="ve-mode">{ts.modeLabel}</label>
        <select
          id="ve-mode"
          className="clin-method-select"
          value={value.mode}
          onChange={(e) => setMode(e.target.value as VeInputType["mode"])}
        >
          <option value="rates">{ts.modeRates}</option>
          <option value="counts">{ts.modeCounts}</option>
        </select>
      </div>

      {value.mode === "rates" ? (
        <>
          <div className="clin-field">
            <label className="clin-field-label" htmlFor="ve-ar-vaccinated">{t.arVaccinatedLabel}</label>
            <input
              id="ve-ar-vaccinated"
              type="number"
              inputMode="decimal"
              min={0}
              max={1}
              step={0.001}
              className="clin-number-input"
              value={value.attackRateVaccinated}
              onChange={(e) =>
                onChange({ ...value, attackRateVaccinated: parseFloat(e.target.value) || 0 })
              }
            />
            <span className="clin-hint">{t.arVaccinatedHint}</span>
          </div>
          <div className="clin-field">
            <label className="clin-field-label" htmlFor="ve-ar-unvaccinated">{t.arUnvaccinatedLabel}</label>
            <input
              id="ve-ar-unvaccinated"
              type="number"
              inputMode="decimal"
              min={0}
              max={1}
              step={0.001}
              className="clin-number-input"
              value={value.attackRateUnvaccinated}
              onChange={(e) =>
                onChange({ ...value, attackRateUnvaccinated: parseFloat(e.target.value) || 0 })
              }
            />
            <span className="clin-hint">{t.arUnvaccinatedHint}</span>
          </div>
        </>
      ) : (
        <div className="clin-grid-2">
          <div className="clin-field">
            <label className="clin-field-label" htmlFor="ve-cases-vaccinated">{t.casesVaccinatedLabel}</label>
            <input
              id="ve-cases-vaccinated"
              type="number"
              inputMode="decimal"
              min={0}
              step={1}
              className="clin-number-input"
              value={value.casesVaccinated}
              onChange={(e) =>
                onChange({ ...value, casesVaccinated: parseFloat(e.target.value) || 0 })
              }
            />
          </div>
          <div className="clin-field">
            <label className="clin-field-label" htmlFor="ve-total-vaccinated">{t.totalVaccinatedLabel}</label>
            <input
              id="ve-total-vaccinated"
              type="number"
              inputMode="decimal"
              min={0}
              step={1}
              className="clin-number-input"
              value={value.totalVaccinated}
              onChange={(e) =>
                onChange({ ...value, totalVaccinated: parseFloat(e.target.value) || 0 })
              }
            />
          </div>
          <div className="clin-field">
            <label className="clin-field-label" htmlFor="ve-cases-unvaccinated">{t.casesUnvaccinatedLabel}</label>
            <input
              id="ve-cases-unvaccinated"
              type="number"
              inputMode="decimal"
              min={0}
              step={1}
              className="clin-number-input"
              value={value.casesUnvaccinated}
              onChange={(e) =>
                onChange({ ...value, casesUnvaccinated: parseFloat(e.target.value) || 0 })
              }
            />
          </div>
          <div className="clin-field">
            <label className="clin-field-label" htmlFor="ve-total-unvaccinated">{t.totalUnvaccinatedLabel}</label>
            <input
              id="ve-total-unvaccinated"
              type="number"
              inputMode="decimal"
              min={0}
              step={1}
              className="clin-number-input"
              value={value.totalUnvaccinated}
              onChange={(e) =>
                onChange({ ...value, totalUnvaccinated: parseFloat(e.target.value) || 0 })
              }
            />
          </div>
        </div>
      )}
    </div>
  );
}
