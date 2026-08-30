import { useState, lazy, Suspense } from "react";
import "./App.css";
import ErrorBoundary from "./components/ErrorBoundary";
import { translations } from "./i18n/translations";
import type { Lang } from "./i18n/translations";

const DesignEffectAnalysis = lazy(() => import("./components/DesignEffectAnalysis"));

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
];

const LANGS: Lang[] = ["en", "ko", "fr"];

function App() {
  const [lang, setLang] = useState<Lang>("en");
  const [activeModuleId, setActiveModuleId] = useState<string>(MODULES[0].id);

  const t = translations[lang];
  const activeModule = MODULES.find((m) => m.id === activeModuleId) ?? MODULES[0];
  const ActiveComponent = activeModule.Component;

  return (
    <div className="app-root">
      <div className="app-lang-switcher">
        {LANGS.map((l) => (
          <button
            key={l}
            type="button"
            className={`app-lang-btn ${l === lang ? "app-lang-btn-active" : ""}`}
            onClick={() => setLang(l)}
          >
            {l.toUpperCase()}
          </button>
        ))}
      </div>

      <header style={{ padding: "var(--space-4) var(--space-6) 0" }}>
        <h1>{t.appName}</h1>
        <p style={{ color: "var(--text-muted)" }}>{t.appTagline}</p>
      </header>

      <nav className="app-nav">
        {MODULES.map((m) => (
          <button
            key={m.id}
            type="button"
            className={`app-nav-btn ${m.id === activeModuleId ? "app-nav-btn-active" : ""}`}
            onClick={() => setActiveModuleId(m.id)}
          >
            {m.navLabel(lang)}
          </button>
        ))}
      </nav>

      <main style={{ flex: 1, padding: "var(--space-6)" }}>
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
