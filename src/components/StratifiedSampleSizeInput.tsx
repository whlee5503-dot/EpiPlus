import "./StratifiedSampleSizeInput.css";
import type {
  StratifiedSampleSizeInput as StratifiedSampleSizeInputType,
  AllocationMethod,
  Stratum,
} from "../lib/stratifiedSampleSize";
import { translations, type Lang } from "../i18n/translations";

interface Props {
  value: StratifiedSampleSizeInputType;
  onChange: (value: StratifiedSampleSizeInputType) => void;
  lang: Lang;
}

let nextStratumId = 1;
function makeStratumId(): string {
  return `stratum-${nextStratumId++}-${Date.now()}`;
}

export default function StratifiedSampleSizeInput({ value, onChange, lang }: Props) {
  const t = translations[lang].samplingdesign.stratifiedSampleSize.input;
  const tMethod = translations[lang].samplingdesign.stratifiedSampleSize;

  const updateStratum = (id: string, patch: Partial<Stratum>) => {
    onChange({
      ...value,
      strata: value.strata.map((s) => (s.id === id ? { ...s, ...patch } : s)),
    });
  };

  const removeStratum = (id: string) => {
    onChange({ ...value, strata: value.strata.filter((s) => s.id !== id) });
  };

  const addStratum = () => {
    const nextIndex = value.strata.length + 1;
    onChange({
      ...value,
      strata: [
        ...value.strata,
        {
          id: makeStratumId(),
          label: `${t.strataTitle} ${nextIndex}`,
          populationSize: 1000,
          stdDev: 10,
        },
      ],
    });
  };

  return (
    <div className="sss-input-wrapper">
      <div className="sss-field">
        <label className="sss-field-label" htmlFor="sss-total-sample-size">{t.totalSampleSizeLabel}</label>
        <input
          id="sss-total-sample-size"
          type="number"
          inputMode="decimal"
          min={1}
          step={1}
          className="sss-number-input"
          value={value.totalSampleSize}
          onChange={(e) =>
            onChange({ ...value, totalSampleSize: parseFloat(e.target.value) || 0 })
          }
        />
        <span className="sss-hint">{t.totalSampleSizeHint}</span>
      </div>

      <div className="sss-field">
        <label className="sss-field-label" htmlFor="sss-method">{tMethod.methodLabel}</label>
        <select
          id="sss-method"
          className="sss-method-select"
          value={value.method}
          onChange={(e) => onChange({ ...value, method: e.target.value as AllocationMethod })}
        >
          <option value="equal">{tMethod.methodEqual}</option>
          <option value="proportional">{tMethod.methodProportional}</option>
          <option value="neyman">{tMethod.methodNeyman}</option>
        </select>
      </div>

      <div className="sss-section-title">{t.strataTitle}</div>

      <div className="sss-strata-list">
        {value.strata.map((s, i) => (
          <div className="sss-stratum-row" key={s.id}>
            <div className="sss-stratum-row-head">
              <span className="sss-field-label">
                {t.strataTitle} {i + 1}
              </span>
              {value.strata.length > 1 && (
                <button
                  type="button"
                  className="sss-remove-btn"
                  onClick={() => removeStratum(s.id)}
                >
                  {t.removeStratum}
                </button>
              )}
            </div>
            <div className="sss-stratum-fields">
              <div className="sss-field">
                <label className="sss-field-label" htmlFor={`sss-label-${s.id}`}>{t.strataLabelLabel}</label>
                <input
                  id={`sss-label-${s.id}`}
                  type="text"
                  className="sss-text-input"
                  value={s.label}
                  onChange={(e) => updateStratum(s.id, { label: e.target.value })}
                />
              </div>
              <div className="sss-field">
                <label className="sss-field-label" htmlFor={`sss-pop-${s.id}`}>{t.populationSizeLabel}</label>
                <input
                  id={`sss-pop-${s.id}`}
                  type="number"
                  inputMode="decimal"
                  min={1}
                  step={1}
                  className="sss-number-input"
                  value={s.populationSize}
                  onChange={(e) =>
                    updateStratum(s.id, { populationSize: parseFloat(e.target.value) || 0 })
                  }
                />
              </div>
              <div className="sss-field">
                <label className="sss-field-label" htmlFor={`sss-sd-${s.id}`}>{t.stdDevLabel}</label>
                <input
                  id={`sss-sd-${s.id}`}
                  type="number"
                  inputMode="decimal"
                  min={0}
                  step={0.1}
                  className="sss-number-input"
                  value={s.stdDev ?? ""}
                  onChange={(e) =>
                    updateStratum(s.id, {
                      stdDev: e.target.value === "" ? undefined : parseFloat(e.target.value),
                    })
                  }
                />
                <span className="sss-hint">{t.stdDevHint}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button type="button" className="sss-add-btn" onClick={addStratum}>
        + {t.addStratum}
      </button>
    </div>
  );
}
