import "./AgeStandardizationInput.css";
import type {
  AgeStandardizationInput as AgeStandardizationInputType,
  DirectAgeGroup,
  IndirectAgeGroup,
} from "../lib/ageStandardization";
import { translations, type Lang } from "../i18n/translations";

interface Props {
  value: AgeStandardizationInputType;
  onChange: (value: AgeStandardizationInputType) => void;
  lang: Lang;
}

let nextRowId = 1;
function makeRowId(prefix: string): string {
  return `${prefix}-${nextRowId++}-${Date.now()}`;
}

export default function AgeStandardizationInput({ value, onChange, lang }: Props) {
  const ts = translations[lang].populationburden.ageStandardization;

  const setMethod = (method: "direct" | "indirect") => {
    if (method === "direct") {
      onChange({
        method: "direct",
        ageGroups: [
          { id: makeRowId("d"), label: "0-19", studyDeaths: 10, studyPopulation: 5000, standardPopulation: 2000 },
          { id: makeRowId("d"), label: "20-59", studyDeaths: 40, studyPopulation: 8000, standardPopulation: 5000 },
          { id: makeRowId("d"), label: "60+", studyDeaths: 30, studyPopulation: 2000, standardPopulation: 3000 },
        ],
      });
    } else {
      onChange({
        method: "indirect",
        ageGroups: [
          { id: makeRowId("i"), label: "0-19", standardRate: 0.001, studyPopulation: 3000 },
          { id: makeRowId("i"), label: "20-59", standardRate: 0.004, studyPopulation: 4000 },
          { id: makeRowId("i"), label: "60+", standardRate: 0.02, studyPopulation: 1000 },
        ],
        observedDeaths: 50,
        referenceCrudeRate: 0.006,
      });
    }
  };

  if (value.method === "direct") {
    const updateRow = (id: string, patch: Partial<DirectAgeGroup>) => {
      onChange({
        ...value,
        ageGroups: value.ageGroups.map((r) => (r.id === id ? { ...r, ...patch } : r)),
      });
    };
    const removeRow = (id: string) => {
      onChange({ ...value, ageGroups: value.ageGroups.filter((r) => r.id !== id) });
    };
    const addRow = () => {
      onChange({
        ...value,
        ageGroups: [
          ...value.ageGroups,
          { id: makeRowId("d"), label: "", studyDeaths: 0, studyPopulation: 0, standardPopulation: 0 },
        ],
      });
    };

    return (
      <div className="as-input-wrapper">
        <div className="as-field">
          <span className="as-field-label">{ts.methodLabel}</span>
          <select
            className="as-method-select"
            value={value.method}
            onChange={(e) => setMethod(e.target.value as "direct" | "indirect")}
          >
            <option value="direct">{ts.methodDirect}</option>
            <option value="indirect">{ts.methodIndirect}</option>
          </select>
        </div>

        <div className="as-section-title" style={{ borderTop: "none", marginTop: 0, paddingTop: 0 }}>
          {ts.directSectionTitle}
        </div>
        <div className="as-row-list">
          {value.ageGroups.map((row, i) => (
            <div className="as-row" key={row.id}>
              <div className="as-row-head">
                <span className="as-field-label">
                  {ts.directLabelLabel} {i + 1}
                </span>
                <button type="button" className="as-remove-btn" onClick={() => removeRow(row.id)}>
                  {ts.removeRow}
                </button>
              </div>
              <div className="as-row-fields">
                <div className="as-field">
                  <span className="as-field-label">{ts.directLabelLabel}</span>
                  <input
                    type="text"
                    className="as-text-input"
                    value={row.label}
                    onChange={(e) => updateRow(row.id, { label: e.target.value })}
                  />
                </div>
                <div className="as-field">
                  <span className="as-field-label">{ts.directStudyDeathsLabel}</span>
                  <input
                    type="number"
                    inputMode="decimal"
                    min={0}
                    step={1}
                    className="as-number-input"
                    value={row.studyDeaths}
                    onChange={(e) =>
                      updateRow(row.id, { studyDeaths: parseFloat(e.target.value) || 0 })
                    }
                  />
                </div>
                <div className="as-field">
                  <span className="as-field-label">{ts.directStudyPopulationLabel}</span>
                  <input
                    type="number"
                    inputMode="decimal"
                    min={0}
                    step={1}
                    className="as-number-input"
                    value={row.studyPopulation}
                    onChange={(e) =>
                      updateRow(row.id, { studyPopulation: parseFloat(e.target.value) || 0 })
                    }
                  />
                </div>
                <div className="as-field">
                  <span className="as-field-label">{ts.directStandardPopulationLabel}</span>
                  <input
                    type="number"
                    inputMode="decimal"
                    min={0}
                    step={1}
                    className="as-number-input"
                    value={row.standardPopulation}
                    onChange={(e) =>
                      updateRow(row.id, { standardPopulation: parseFloat(e.target.value) || 0 })
                    }
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
        <button type="button" className="as-add-btn" onClick={addRow}>
          + {ts.addDirectRow}
        </button>
      </div>
    );
  }

  // indirect method
  const updateRow = (id: string, patch: Partial<IndirectAgeGroup>) => {
    onChange({
      ...value,
      ageGroups: value.ageGroups.map((r) => (r.id === id ? { ...r, ...patch } : r)),
    });
  };
  const removeRow = (id: string) => {
    onChange({ ...value, ageGroups: value.ageGroups.filter((r) => r.id !== id) });
  };
  const addRow = () => {
    onChange({
      ...value,
      ageGroups: [
        ...value.ageGroups,
        { id: makeRowId("i"), label: "", standardRate: 0, studyPopulation: 0 },
      ],
    });
  };

  return (
    <div className="as-input-wrapper">
      <div className="as-field">
        <span className="as-field-label">{ts.methodLabel}</span>
        <select
          className="as-method-select"
          value={value.method}
          onChange={(e) => setMethod(e.target.value as "direct" | "indirect")}
        >
          <option value="direct">{ts.methodDirect}</option>
          <option value="indirect">{ts.methodIndirect}</option>
        </select>
      </div>

      <div className="as-section-title" style={{ borderTop: "none", marginTop: 0, paddingTop: 0 }}>
        {ts.indirectSectionTitle}
      </div>
      <div className="as-row-list">
        {value.ageGroups.map((row, i) => (
          <div className="as-row" key={row.id}>
            <div className="as-row-head">
              <span className="as-field-label">
                {ts.indirectLabelLabel} {i + 1}
              </span>
              <button type="button" className="as-remove-btn" onClick={() => removeRow(row.id)}>
                {ts.removeRow}
              </button>
            </div>
            <div className="as-row-fields">
              <div className="as-field">
                <span className="as-field-label">{ts.indirectLabelLabel}</span>
                <input
                  type="text"
                  className="as-text-input"
                  value={row.label}
                  onChange={(e) => updateRow(row.id, { label: e.target.value })}
                />
              </div>
              <div className="as-field">
                <span className="as-field-label">{ts.indirectStandardRateLabel}</span>
                <input
                  type="number"
                  inputMode="decimal"
                  min={0}
                  step={0.0001}
                  className="as-number-input"
                  value={row.standardRate}
                  onChange={(e) =>
                    updateRow(row.id, { standardRate: parseFloat(e.target.value) || 0 })
                  }
                />
              </div>
              <div className="as-field">
                <span className="as-field-label">{ts.indirectStudyPopulationLabel}</span>
                <input
                  type="number"
                  inputMode="decimal"
                  min={0}
                  step={1}
                  className="as-number-input"
                  value={row.studyPopulation}
                  onChange={(e) =>
                    updateRow(row.id, { studyPopulation: parseFloat(e.target.value) || 0 })
                  }
                />
              </div>
            </div>
          </div>
        ))}
      </div>
      <button type="button" className="as-add-btn" onClick={addRow}>
        + {ts.addIndirectRow}
      </button>

      <div className="as-field">
        <span className="as-field-label">{ts.observedDeathsLabel}</span>
        <input
          type="number"
          inputMode="decimal"
          min={0}
          step={1}
          className="as-number-input"
          value={value.observedDeaths}
          onChange={(e) => onChange({ ...value, observedDeaths: parseFloat(e.target.value) || 0 })}
        />
      </div>

      <div className="as-field">
        <span className="as-field-label">{ts.referenceCrudeRateLabel}</span>
        <input
          type="number"
          inputMode="decimal"
          min={0}
          step={0.0001}
          className="as-number-input"
          value={value.referenceCrudeRate ?? ""}
          onChange={(e) =>
            onChange({
              ...value,
              referenceCrudeRate: e.target.value === "" ? undefined : parseFloat(e.target.value),
            })
          }
        />
        <span className="as-hint">{ts.referenceCrudeRateHint}</span>
      </div>
    </div>
  );
}
