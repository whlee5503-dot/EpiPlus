import "./DalyInput.css";
import type { DalyInput as DalyInputType, YldMethod, YllItem, YldItem } from "../lib/daly";
import { translations, type Lang } from "../i18n/translations";

interface Props {
  value: DalyInputType;
  onChange: (value: DalyInputType) => void;
  lang: Lang;
}

let nextRowId = 1;
function makeRowId(prefix: string): string {
  return `${prefix}-${nextRowId++}-${Date.now()}`;
}

export default function DalyInput({ value, onChange, lang }: Props) {
  const ts = translations[lang].populationburden.daly;

  const updateYllItem = (id: string, patch: Partial<YllItem>) => {
    onChange({
      ...value,
      yllItems: value.yllItems.map((r) => (r.id === id ? { ...r, ...patch } : r)),
    });
  };
  const removeYllItem = (id: string) => {
    onChange({ ...value, yllItems: value.yllItems.filter((r) => r.id !== id) });
  };
  const addYllItem = () => {
    onChange({
      ...value,
      yllItems: [
        ...value.yllItems,
        { id: makeRowId("yll"), label: "", deaths: 0, lifeExpectancy: 0 },
      ],
    });
  };

  const updateYldItem = (id: string, patch: Partial<YldItem>) => {
    onChange({
      ...value,
      yldItems: value.yldItems.map((r) => (r.id === id ? { ...r, ...patch } : r)),
    });
  };
  const removeYldItem = (id: string) => {
    onChange({ ...value, yldItems: value.yldItems.filter((r) => r.id !== id) });
  };
  const addYldItem = () => {
    onChange({
      ...value,
      yldItems: [
        ...value.yldItems,
        {
          id: makeRowId("yld"),
          label: "",
          cases: 0,
          disabilityWeight: 0,
          duration: value.yldMethod === "incidence" ? 1 : undefined,
        },
      ],
    });
  };

  return (
    <div className="daly-input-wrapper">
      <div className="daly-section-title" style={{ borderTop: "none", marginTop: 0, paddingTop: 0 }}>
        {ts.yllSectionTitle}
      </div>
      <div className="daly-row-list">
        {value.yllItems.map((row, i) => (
          <div className="daly-row" key={row.id}>
            <div className="daly-row-head">
              <span className="daly-field-label">
                {ts.yllLabelLabel} {i + 1}
              </span>
              <button
                type="button"
                className="daly-remove-btn"
                onClick={() => removeYllItem(row.id)}
              >
                {ts.removeRow}
              </button>
            </div>
            <div className="daly-row-fields">
              <div className="daly-field">
                <label className="daly-field-label" htmlFor={`daly-yll-label-${row.id}`}>{ts.yllLabelLabel}</label>
                <input
                  id={`daly-yll-label-${row.id}`}
                  type="text"
                  className="daly-text-input"
                  value={row.label}
                  onChange={(e) => updateYllItem(row.id, { label: e.target.value })}
                />
              </div>
              <div className="daly-field">
                <label className="daly-field-label" htmlFor={`daly-yll-deaths-${row.id}`}>{ts.yllDeathsLabel}</label>
                <input
                  id={`daly-yll-deaths-${row.id}`}
                  type="number"
                  inputMode="decimal"
                  min={0}
                  step={1}
                  className="daly-number-input"
                  value={row.deaths}
                  onChange={(e) =>
                    updateYllItem(row.id, { deaths: parseFloat(e.target.value) || 0 })
                  }
                />
              </div>
              <div className="daly-field">
                <label className="daly-field-label" htmlFor={`daly-yll-le-${row.id}`}>{ts.yllLifeExpectancyLabel}</label>
                <input
                  id={`daly-yll-le-${row.id}`}
                  type="number"
                  inputMode="decimal"
                  min={0}
                  step={0.1}
                  className="daly-number-input"
                  value={row.lifeExpectancy}
                  onChange={(e) =>
                    updateYllItem(row.id, { lifeExpectancy: parseFloat(e.target.value) || 0 })
                  }
                />
              </div>
            </div>
          </div>
        ))}
      </div>
      <button type="button" className="daly-add-btn" onClick={addYllItem}>
        + {ts.addYllRow}
      </button>

      <div className="daly-section-title">{ts.yldSectionTitle}</div>

      <div className="daly-field">
        <label className="daly-field-label" htmlFor="daly-yld-method">{ts.yldMethodLabel}</label>
        <select
          id="daly-yld-method"
          className="daly-method-select"
          value={value.yldMethod}
          onChange={(e) => {
            const method = e.target.value as YldMethod;
            onChange({
              ...value,
              yldMethod: method,
              yldItems: value.yldItems.map((r) => ({
                ...r,
                duration: method === "incidence" ? r.duration ?? 1 : undefined,
              })),
            });
          }}
        >
          <option value="incidence">{ts.yldMethodIncidence}</option>
          <option value="prevalence">{ts.yldMethodPrevalence}</option>
        </select>
      </div>

      <div className="daly-row-list">
        {value.yldItems.map((row, i) => (
          <div className="daly-row" key={row.id}>
            <div className="daly-row-head">
              <span className="daly-field-label">
                {ts.yldLabelLabel} {i + 1}
              </span>
              <button
                type="button"
                className="daly-remove-btn"
                onClick={() => removeYldItem(row.id)}
              >
                {ts.removeRow}
              </button>
            </div>
            <div className="daly-row-fields">
              <div className="daly-field">
                <label className="daly-field-label" htmlFor={`daly-yld-label-${row.id}`}>{ts.yldLabelLabel}</label>
                <input
                  id={`daly-yld-label-${row.id}`}
                  type="text"
                  className="daly-text-input"
                  value={row.label}
                  onChange={(e) => updateYldItem(row.id, { label: e.target.value })}
                />
              </div>
              <div className="daly-field">
                <label className="daly-field-label" htmlFor={`daly-yld-cases-${row.id}`}>{ts.yldCasesLabel}</label>
                <input
                  id={`daly-yld-cases-${row.id}`}
                  type="number"
                  inputMode="decimal"
                  min={0}
                  step={1}
                  className="daly-number-input"
                  value={row.cases}
                  onChange={(e) =>
                    updateYldItem(row.id, { cases: parseFloat(e.target.value) || 0 })
                  }
                />
                <span className="daly-hint">{ts.yldCasesHint}</span>
              </div>
              <div className="daly-field">
                <label className="daly-field-label" htmlFor={`daly-yld-dw-${row.id}`}>{ts.yldDwLabel}</label>
                <input
                  id={`daly-yld-dw-${row.id}`}
                  type="number"
                  inputMode="decimal"
                  min={0}
                  max={1}
                  step={0.01}
                  className="daly-number-input"
                  value={row.disabilityWeight}
                  onChange={(e) =>
                    updateYldItem(row.id, {
                      disabilityWeight: parseFloat(e.target.value) || 0,
                    })
                  }
                />
              </div>
              {value.yldMethod === "incidence" && (
                <div className="daly-field">
                  <label className="daly-field-label" htmlFor={`daly-yld-duration-${row.id}`}>{ts.yldDurationLabel}</label>
                  <input
                    id={`daly-yld-duration-${row.id}`}
                    type="number"
                    inputMode="decimal"
                    min={0}
                    step={0.1}
                    className="daly-number-input"
                    value={row.duration ?? ""}
                    onChange={(e) =>
                      updateYldItem(row.id, {
                        duration: e.target.value === "" ? undefined : parseFloat(e.target.value),
                      })
                    }
                  />
                  <span className="daly-hint">{ts.yldDurationHint}</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      <button type="button" className="daly-add-btn" onClick={addYldItem}>
        + {ts.addYldRow}
      </button>
    </div>
  );
}
