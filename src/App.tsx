import { useState, useEffect, lazy, Suspense } from "react";
import "./App.css";
import ErrorBoundary from "./components/ErrorBoundary";
import { translations } from "./i18n/translations";
import type { Lang } from "./i18n/translations";

const DesignEffectAnalysis = lazy(() => import("./components/DesignEffectAnalysis"));
const ClusterSampleSizeAnalysis = lazy(() => import("./components/ClusterSampleSizeAnalysis"));
const StratifiedSampleSizeAnalysis = lazy(
  () => import("./components/StratifiedSampleSizeAnalysis")
);
const DalyAnalysis = lazy(() => import("./components/DalyAnalysis"));
const PafAnalysis = lazy(() => import("./components/PafAnalysis"));
const AgeStandardizationAnalysis = lazy(
  () => import("./components/AgeStandardizationAnalysis")
);
const VaccineEffectivenessAnalysis = lazy(
  () => import("./components/VaccineEffectivenessAnalysis")
);
const NntAnalysis = lazy(() => import("./components/NntAnalysis"));
const SmdAnalysis = lazy(() => import("./components/SmdAnalysis"));
const PoissonRegressionAnalysis = lazy(() => import("./components/PoissonRegressionAnalysis"));
const BayesianDiagnosticAnalysis = lazy(() => import("./components/BayesianDiagnosticAnalysis"));
const MetaAnalysisAnalysis = lazy(() => import("./components/MetaAnalysisAnalysis"));

interface ModuleConfig {
  id: string;
  navLabel: (lang: Lang) => string;
  Component: React.ComponentType<{ lang: Lang }>;
}

const MODULES: ModuleConfig[] = [
  {
    id: "designEffect",
    navLabel: (lang) => translations[lang].samplingdesign.subnav.designEffect,
    Component: DesignEffectAnalysis,
  },
  {
    id: "clusterSampleSize",
    navLabel: (lang) => translations[lang].samplingdesign.subnav.clusterSampleSize,
    Component: ClusterSampleSizeAnalysis,
  },
  {
    id: "stratifiedSampleSize",
    navLabel: (lang) => translations[lang].samplingdesign.subnav.stratifiedSampleSize,
    Component: StratifiedSampleSizeAnalysis,
  },
  {
    id: "daly",
    navLabel: (lang) => translations[lang].populationburden.subnav.daly,
    Component: DalyAnalysis,
  },
  {
    id: "paf",
    navLabel: (lang) => translations[lang].populationburden.subnav.paf,
    Component: PafAnalysis,
  },
  {
    id: "ageStandardization",
    navLabel: (lang) => translations[lang].populationburden.subnav.ageStandardization,
    Component: AgeStandardizationAnalysis,
  },
  {
    id: "vaccineEffectiveness",
    navLabel: (lang) => translations[lang].clinical.subnav.vaccineEffectiveness,
    Component: VaccineEffectivenessAnalysis,
  },
  {
    id: "nnt",
    navLabel: (lang) => translations[lang].clinical.subnav.nnt,
    Component: NntAnalysis,
  },
  {
    id: "smd",
    navLabel: (lang) => translations[lang].clinical.subnav.smd,
    Component: SmdAnalysis,
  },
  {
    id: "poissonRegression",
    navLabel: (lang) => translations[lang].statisticalmodeling.subnav.poissonRegression,
    Component: PoissonRegressionAnalysis,
  },
  {
    id: "bayesianDiagnostic",
    navLabel: (lang) => translations[lang].statisticalmodeling.subnav.bayesianDiagnostic,
    Component: BayesianDiagnosticAnalysis,
  },
  {
    id: "metaAnalysis",
    navLabel: (lang) => translations[lang].metaanalysis.subnav.metaAnalysis,
    Component: MetaAnalysisAnalysis,
  },
];

const LANGS: { code: Lang; label: string }[] = [
  { code: "en", label: "English" },
  { code: "ko", label: "\ud55c\uad6d\uc5b4" },
  { code: "fr", label: "Fran\u00e7ais" },
];

function App() {
  const [lang, setLang] = useState<Lang>("en");
  const [activeModuleId, setActiveModuleId] = useState<string>(MODULES[0].id);

  // Restore saved language preference (same pattern as EpiStat)
  useEffect(() => {
    const saved = localStorage.getItem("epiplus-lang");
    if (saved === "en" || saved === "ko" || saved === "fr") {
      setLang(saved);
    }
  }, []);

  const changeLang = (next: Lang) => {
    setLang(next);
    localStorage.setItem("epiplus-lang", next);
  };

  const t = translations[lang];
  const activeModule = MODULES.find((m) => m.id === activeModuleId) ?? MODULES[0];
  const ActiveComponent = activeModule.Component;

  return (
    <div className="app-root">
      <div className="app-header-row">
        <header>
          <h1>{t.appName}</h1>
          <p style={{ color: "var(--text-muted)" }}>{t.appTagline}</p>
        </header>

        <div className="app-lang-switcher">
          {LANGS.map((l) => (
            <button
              key={l.code}
              type="button"
              className={"app-lang-btn" + (lang === l.code ? " app-lang-btn-active" : "")}
              onClick={() => changeLang(l.code)}
            >
              {l.label}
            </button>
          ))}
        </div>
      </div>

      <nav className="app-nav">
        {MODULES.map((m) => (
          <button
            key={m.id}
            type="button"
            className={"app-nav-btn" + (m.id === activeModuleId ? " app-nav-btn-active" : "")}
            onClick={() => setActiveModuleId(m.id)}
          >
            {m.navLabel(lang)}
          </button>
        ))}
      </nav>

      <main className="strat-calc" style={{ flex: 1 }}>
        <ErrorBoundary lang={lang} resetKey={activeModuleId}>
          <Suspense fallback={<div className="app-module-loading">...</div>}>
            <ActiveComponent lang={lang} />
          </Suspense>
        </ErrorBoundary>
      </main>

      <footer
        style={{
          padding: "var(--space-4) var(--space-6)",
          borderTop: "1px solid var(--border-color)",
          color: "var(--text-muted)",
          fontSize: "0.78rem",
        }}
      >
        {t.common.disclaimer}
      </footer>
    </div>
  );
}

export default App;
