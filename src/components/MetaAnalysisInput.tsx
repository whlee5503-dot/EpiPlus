import "./MetaAnalysisInput.css";
import type { MetaAnalysisInput as MetaInputType, MetaStudy, EffectType } from "../lib/metaAnalysis";
import { translations, type Lang } from "../i18n/translations";

interface Props {
  value: MetaInputType;
  onChange: (value: MetaInputType) => void;
  lang: Lang;
}

let nextRowId = 1;
function makeRowId(): string {
  return `study-${nextRowId++}-${Date.now()}`;
}

export default function MetaAnalysisInput({ value, onChange, lang }: Props) {
  const ts = translations[lang].metaanalysis.metaAnalysis;

  const updateStudy = (id: string, patch: Partial<MetaStudy>) => {
    onChange({
      ...value,
      studies: value.studies.map((s) => (s.id === id ? { ...s, ...patch } : s)),
    });
  };

  const removeStudy = (id: string) => {
    onChange({ ...value, studies: value.studies.filter((s) => s.id !== id) });
  };

  const addStudy = () => {
    const nextIndex = value.studies.length + 1;
    onChange({
      ...value,
      studies: [
        ...value.studies,
        {
          id: makeRowId(),
          label: `${ts.studyLabelLabel} ${nextIndex}`,
          effect: value.effectType === "ratio" ? 1 : 0,
          se: 0.2,
        },
      ],
    });
  };

  const setEffectType = (effectType: EffectType) => {
    onChange({ ...value, effectType });
  };

  return (
    <div className="meta-input-wrapper">
      <div className="meta-field">
        <span className="meta-field-label">{ts.effectTypeLabel}</span>
        <select
          className="meta-method-select"
          value={value.effectType}
          onChange={(e) => setEffectType(e.target.value as EffectType)}
        >
          <option value="difference">{ts.effectTypeDifference}</option>
          <option value="ratio">{ts.effectTypeRatio}</option>
        </select>
        <span className="meta-hint">{ts.effectTypeHint}</span>
      </div>

      <div className="meta-section-title">{ts.studiesSectionTitle}</div>
      <div className="meta-row-list">
        {value.studies.map((s, i) => (
          <div className="meta-row" key={s.id}>
            <div className="meta-row-head">
              <span className="meta-field-label">
                {ts.studyLabelLabel} {i + 1}
              </span>
              {value.studies.length > 2 && (
                <button
                  type="button"
                  className="meta-remove-btn"
                  onClick={() => removeStudy(s.id)}
                >
                  {ts.removeRow}
                </button>
              )}
            </div>
            <div className="meta-row-fields">
              <div className="meta-field">
                <span className="meta-field-label">{ts.studyLabelLabel}</span>
                <input
                  type="text"
                  className="meta-text-input"
                  value={s.label}
                  onChange={(e) => updateStudy(s.id, { label: e.target.value })}
                />
              </div>
              <div className="meta-field">
                <span className="meta-field-label">{ts.effectLabel}</span>
                <input
                  type="number"
                  inputMode="decimal"
                  step={0.01}
                  className="meta-number-input"
                  value={s.effect}
                  onChange={(e) => updateStudy(s.id, { effect: parseFloat(e.target.value) || 0 })}
                />
              </div>
              <div className="meta-field">
                <span className="meta-field-label">{ts.seLabel}</span>
                <input
                  type="number"
                  inputMode="decimal"
                  min={0}
                  step={0.01}
                  className="meta-number-input"
                  value={s.se}
                  onChange={(e) => updateStudy(s.id, { se: parseFloat(e.target.value) || 0 })}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
      <button type="button" className="meta-add-btn" onClick={addStudy}>
        + {ts.addStudy}
      </button>
    </div>
  );
}
