import "./PoissonRegressionInput.css";
import type { PoissonRegressionInput as PoissonInputType, PoissonGroup } from "../lib/poissonRegression";
import { translations, type Lang } from "../i18n/translations";

interface Props {
  value: PoissonInputType;
  onChange: (value: PoissonInputType) => void;
  lang: Lang;
}

let nextRowId = 1;
function makeRowId(): string {
  return `pois-${nextRowId++}-${Date.now()}`;
}

export default function PoissonRegressionInput({ value, onChange, lang }: Props) {
  const ts = translations[lang].statisticalmodeling.poissonRegression;

  const updateGroup = (id: string, patch: Partial<PoissonGroup>) => {
    onChange({
      ...value,
      groups: value.groups.map((g) => (g.id === id ? { ...g, ...patch } : g)),
    });
  };

  const removeGroup = (id: string) => {
    const groups = value.groups.filter((g) => g.id !== id);
    const referenceGroupId =
      value.referenceGroupId === id && groups.length > 0 ? groups[0].id : value.referenceGroupId;
    onChange({ ...value, groups, referenceGroupId });
  };

  const addGroup = () => {
    const id = makeRowId();
    onChange({ ...value, groups: [...value.groups, { id, label: "", events: 0, personTime: 0 }] });
  };

  const setReference = (id: string) => {
    onChange({ ...value, referenceGroupId: id });
  };

  return (
    <div className="pois-input-wrapper">
      <div className="pois-note">{ts.note}</div>

      <div className="pois-section-title">{ts.groupsSectionTitle}</div>
      <div className="pois-row-list">
        {value.groups.map((g, i) => {
          const isReference = g.id === value.referenceGroupId;
          return (
            <div className={`pois-row${isReference ? " pois-row-reference" : ""}`} key={g.id}>
              <div className="pois-row-head">
                <span className="pois-field-label">
                  {ts.groupLabelLabel} {i + 1}
                  {isReference ? ` ${ts.referenceTag}` : ""}
                </span>
                <div style={{ display: "flex", gap: "8px" }}>
                  <button
                    type="button"
                    className={`pois-ref-btn${isReference ? " pois-ref-btn-active" : ""}`}
                    onClick={() => setReference(g.id)}
                    disabled={isReference}
                  >
                    {isReference ? ts.referenceLabel : ts.setReference}
                  </button>
                  {value.groups.length > 2 && (
                    <button
                      type="button"
                      className="pois-remove-btn"
                      onClick={() => removeGroup(g.id)}
                    >
                      {ts.removeRow}
                    </button>
                  )}
                </div>
              </div>
              <div className="pois-row-fields">
                <div className="pois-field">
                  <span className="pois-field-label">{ts.groupLabelLabel}</span>
                  <input
                    type="text"
                    className="pois-text-input"
                    value={g.label}
                    onChange={(e) => updateGroup(g.id, { label: e.target.value })}
                  />
                </div>
                <div className="pois-field">
                  <span className="pois-field-label">{ts.eventsLabel}</span>
                  <input
                    type="number"
                    inputMode="decimal"
                    min={0}
                    step={1}
                    className="pois-number-input"
                    value={g.events}
                    onChange={(e) => updateGroup(g.id, { events: parseFloat(e.target.value) || 0 })}
                  />
                </div>
                <div className="pois-field">
                  <span className="pois-field-label">{ts.personTimeLabel}</span>
                  <input
                    type="number"
                    inputMode="decimal"
                    min={0}
                    step={1}
                    className="pois-number-input"
                    value={g.personTime}
                    onChange={(e) =>
                      updateGroup(g.id, { personTime: parseFloat(e.target.value) || 0 })
                    }
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <button type="button" className="pois-add-btn" onClick={addGroup}>
        + {ts.addGroup}
      </button>
    </div>
  );
}
