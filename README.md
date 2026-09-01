# EpiPlus — Epidemiology & Biostatistics Calculator Suite

[![Live Demo](https://img.shields.io/badge/Live%20Demo-epiplus.phtlab.org-brightgreen)](https://epiplus.phtlab.org)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://github.com/whlee5503-dot/EpiPlus/blob/main/LICENSE)
[![Built with React](https://img.shields.io/badge/Built%20with-React%20%2B%20TypeScript-blue)](https://react.dev)
[![DOI](https://zenodo.org/badge/DOI/10.5281/zenodo.22239499.svg)](https://doi.org/10.5281/zenodo.22239499)

## 📢 Status

- **Digital Public Goods (DPG):** Preparing for submission to the [Digital Public Goods Alliance (DPGA)](https://digitalpublicgoods.net)
- **Archived on Zenodo:** [10.5281/zenodo.22239499](https://doi.org/10.5281/zenodo.22239499) (v1.0.0, September 2026)
- Part of the [PublicHealth Tech Lab](https://phtlab.org) family of offline-first public health tools, alongside [EpiCalc](https://epi.chem-health-calc.com), [EpiStat](https://epistat.phtlab.org), [EpiLog](https://epilog-d72.pages.dev), [EpiAid](https://epiaid.pages.dev), and [VaxGuard](https://vaxguard.pages.dev)

---

### 🌐 SDG Alignment

EpiPlus contributes to the UN Sustainable Development Goal 3 (Good Health
and Well-being), specifically Target 3.d: strengthening early warning
systems and risk reduction for national and global health risks. By
providing free, fully offline-capable epidemiologic statistics tools,
EpiPlus supports evidence-based decision-making for public health workers
and researchers in low-resource settings worldwide.

[![SDG 3](https://img.shields.io/badge/SDG-3%20Good%20Health-brightgreen)](https://sdgs.un.org/goals/goal3)

---

A free, mobile-friendly, open-source web application implementing
epidemiologic and biostatistics calculators that fill the gaps left by
existing tools such as OpenEpi, EpiCalc, and EpiStat — survey sampling
design, population burden indicators, clinical effect measures,
statistical modeling, and meta-analysis — designed for researchers,
epidemiologists, and biostatistics students worldwide.

> 🌍 **Mission**: To make essential epidemiologic and biostatistics tools
> freely accessible to researchers and health workers everywhere,
> including fully offline use in areas with limited or no internet
> connectivity.

---

## 🖥️ Live Demo

**<https://epiplus.phtlab.org>**

No login required. Works on mobile. English / 한국어 / Français.

---

## 📱 Install as Mobile App (PWA)

EpiPlus can be installed as a native-like app on your smartphone or
desktop — no App Store needed.

- **Android (Chrome)**: Menu (⋮) → "Add to Home Screen"
- **iPhone (Safari)**: Share (□↑) → "Add to Home Screen"
- **Desktop (Chrome/Edge)**: Address bar install icon → "Install"

EpiPlus is platform-independent — compatible with Android, iOS, and any
modern web browser. Once installed, every calculator — including ones
you haven't opened yet — is available offline immediately, not only
after you've visited it once while online.

---

## ✨ Features

### 📊 Calculator Modules

- **Survey Sampling Design** — Design Effect (DEFF), Cluster Sample
  Size, Stratified Sample Size (equal / proportional / Neyman allocation)
- **Population Burden Indicators** — DALY (YLL + YLD, incidence- or
  prevalence-based), PAF (direct input or 2×2-table input), Age
  Standardization (direct & indirect methods)
- **Clinical & Effect Measures** — Vaccine Effectiveness, NNT / NNH,
  SMD (Cohen's d & Hedges' g)
- **Statistical Modeling** — Poisson Regression (incidence rate ratio,
  multi-group with a chosen reference), Bayesian Diagnostic Test
  (PPV/NPV and likelihood ratios via Bayes' theorem)
- **Meta-Analysis** — Fixed-effect (inverse-variance) and random-effects
  (DerSimonian-Laird) pooling, Cochran's Q, I², forest plot

12 calculators across 5 module groups. Each calculator's in-app
"Formula" panel shows the exact expression and citation used.

### 🧪 Validation

Every calculator is implemented from a peer-reviewed or standard-reference
formula and cross-checked against **at least two independent worked
examples** — drawn from textbooks, established calculator documentation
(e.g. StatsDirect, MetricGate), or, where no public worked example with
matching precision existed, a hand-verifiable example built directly from
the same cross-confirmed formula. Full derivations, sources, and
pass/fail results for every calculator are published in
[`VALIDATION.md`](./VALIDATION.md).

---

## 🎯 Target Users

- Epidemiologists & biostatisticians
- MPH students & public health faculty
- Medical and public health researchers
- Field epidemiologists needing a metric not covered by existing tools

---

## 🔒 Privacy & Data Policy

EpiPlus does not collect, store, or transmit any personally identifiable
information (PII). All calculations are performed entirely on the client
side (browser/device). No data is sent to any external server, and no
login is required. Safe for use in sensitive public health research
contexts.

Because no user data is collected or stored anywhere — locally or
remotely — there is no user-generated data to export or extract; the
DPG Standard's data-extraction-mechanism indicator does not apply to
EpiPlus.

---

## ⚡ Offline Support

EpiPlus is built as a fully offline-capable Progressive Web App:

- **Full precache**: every built asset — including the JS for all 12
  calculators — is cached at install time via `vite-plugin-pwa` /
  Workbox, so every calculator works offline immediately after first
  install, not only after being visited once while online
- **Code splitting**: each calculator loads as its own lazy-loaded
  chunk, keeping the initial load small while still guaranteeing full
  offline availability once installed
- **Error isolation**: a per-module error boundary means a failure in
  one calculator never takes down the rest of the app

---

## 🛠️ Tech Stack

| Category | Technology |
| --- | --- |
| Frontend | React 19 + TypeScript |
| Build Tool | Vite |
| Testing | Vitest (87 tests across 12 modules) |
| Styling | CSS Variables |
| i18n | English / 한국어 / Français |
| PWA / SW | vite-plugin-pwa + Workbox |
| Deployment | Cloudflare Pages |

---

## 🚀 Getting Started

```
# Clone the repository
git clone https://github.com/whlee5503-dot/EpiPlus.git
cd EpiPlus

# Install dependencies
npm install

# Start development server
npm run dev

# Run tests
npm run test

# Build for production
npm run build
```

---

## 📐 Statistical Methods

EpiPlus implements formulas spanning survey sampling theory (Kish,
Cochran), the Global Burden of Disease methodology (Murray & Lopez;
current GBD/WHO conventions), Levin's population attributable fraction,
standard direct/indirect age standardization, vaccine effectiveness and
number-needed-to-treat definitions used across clinical epidemiology,
Poisson regression for incidence rate ratios, Bayes' theorem for
diagnostic test performance, and DerSimonian-Laird random-effects
meta-analysis. See [`VALIDATION.md`](./VALIDATION.md) for the full
formula-by-formula validation record against independent reference
sources.

---

## 📁 Project Structure

```
epiplus/
├── src/
│   ├── components/        # One Analysis + Input component pair per calculator
│   ├── lib/                # Core calculation functions per calculator
│   └── i18n/                # English / Korean / French translations
├── public/
├── VALIDATION.md
└── index.html
```

---

## 🤝 Contributing

EpiPlus is designed in accordance with the
[Principles for Digital Development](https://digitalprinciples.org/).

Contributions are welcome! This project is especially looking for:

- **Formula validation** — epidemiologists and biostatisticians welcome
- **Translations** — additional languages for global health reach
- **Field usability feedback** — from researchers and public health
  workers in low-resource settings
- **Bug reports & feature requests** — via GitHub Issues

Found a discrepancy with a published value, or want to request a new
calculator? Please open an issue with a citation to the source formula
and, if possible, a worked example.

---

## 📄 License

This project is licensed under the **MIT License** — see the
[LICENSE](https://github.com/whlee5503-dot/EpiPlus/blob/main/LICENSE)
file for details.

Free to use, modify, and distribute — including for use in developing
countries and resource-limited settings.

---

## 👨‍💻 About the Developer

**Won Ho Lee, Ph.D.**

- Chemical Engineering (PhD) | MPH | MDiv
- Taught Biostatistics & Foundations of Public Health — University of
  Utah Asia Campus (adjunct, 2 fall semesters)
- University of Utah MPH Alumni
- Founder, [PublicHealth Tech Lab](https://phtlab.org)

EpiPlus was built out of a deep, enduring connection to public health —
and a hope that essential statistical tools should be accessible to
every researcher and health worker, regardless of where they work.

---

## 📬 Feedback

Found a bug or have a suggestion?

- Open a [GitHub Issue](https://github.com/whlee5503-dot/EpiPlus/issues)

---

> *"Essential public health tools should be accessible to every health
> worker, regardless of where they work."*
