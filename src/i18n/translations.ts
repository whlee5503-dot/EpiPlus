// EpiPlus i18n — English / Korean / French
export type Lang = "en" | "ko" | "fr";

export const translations = {
  en: {
    appName: "EpiPlus",
    appTagline: "Epidemiology & Biostatistics Calculator Suite",
    nav: {
      samplingdesign: "Survey Sampling Design",
    },
    common: {
      loadExample: "Load Example",
      reset: "Reset",
      showMore: "Show more",
      showLess: "Show less",
      formula: "Formula",
      interpretation: "Interpretation",
      note: "Note",
      undefined: "undefined",
      disclaimer:
        "This tool is for epidemiological and educational purposes. It does not replace professional statistical consultation for publication-grade analyses.",
    },
    errorBoundary: {
      title: "Something went wrong",
      message:
        "This module failed to load or crashed unexpectedly. This is usually temporary — for example, a dropped network connection while loading. Try again, or switch to another module and back.",
      retryButton: "Try again",
    },
    samplingdesign: {
      title: "Survey Sampling Design",
      subtitle:
        "Calculators for cluster and stratified sample designs, including the design effect (variance inflation) from clustering",
      subnav: {
        designEffect: "Design Effect",
      },
      designEffect: {
        heading: "Design Effect (Cluster Sampling)",
        formulaDeff: "DEFF",
        formulaDeffExpr: "= 1 + (m - 1) x ICC",
        formulaNeff: "n_eff",
        formulaNeffExpr: "= n / DEFF",
        formulaAdjustedN: "n_cluster",
        formulaAdjustedNExpr: "= n_individual x DEFF",
        formulaSource: "Source",
        formulaSourceExpr:
          "Kish, L. (1965). Survey Sampling. Wiley. Donner, A. & Klar, N. (2000). Design and Analysis of Cluster Randomization Trials in Health Research.",
        input: {
          avgClusterSizeLabel: "Average cluster size (m)",
          avgClusterSizeHint: "Mean number of individuals per cluster",
          iccLabel: "Intracluster correlation (ICC / rho)",
          iccHint: "Value between 0 and 1; higher means more similarity within clusters",
          sectionEffectiveTitle: "Effective Sample Size (optional)",
          nominalSampleSizeLabel: "Nominal (collected) sample size",
          nominalSampleSizeHint:
            "Total sample size actually collected under the cluster design",
          sectionAdjustedTitle: "Cluster-Adjusted Sample Size (optional)",
          individualSampleSizeLabel: "Individually-randomized sample size",
          individualSampleSizeHint:
            "Sample size that would be required under simple/individual random sampling",
        },
        emptyState:
          "Enter a valid average cluster size (> 0) and ICC (0-1) to see results",
        deffLabel: "Design Effect",
        deffSub: "m = {m}, ICC = {icc}",
        effectiveSampleSizeLabel: "Effective Sample Size",
        effectiveSampleSizeSub: "{nominal} collected / DEFF {deff}",
        adjustedSampleSizeLabel: "Cluster-Adjusted Sample Size",
        adjustedSampleSizeSub: "{individual} (individual) x DEFF {deff}",
        interpSummary:
          "With an average cluster size of {m} and an ICC of {icc}, the design effect is {deff}.",
        interpDetail1:
          "The design effect (DEFF) measures how much clustering inflates the variance of an estimator compared to simple random sampling. A DEFF of 2.0 means twice as many observations are needed to achieve the same precision as an unclustered (SRS) design.",
        interpDetail2:
          "Even a small ICC can produce a large design effect when the average cluster size is large, since DEFF depends on both quantities together, not on the ICC alone. Use the effective sample size to see how much independent information a clustered dataset actually provides, or the cluster-adjusted sample size to inflate an individually-randomized sample size estimate for a cluster design.",
      },
    },
  },
  ko: {
    appName: "EpiPlus",
    appTagline: "역학·생물통계 보완 계산기 모음",
    nav: {
      samplingdesign: "표본설계",
    },
    common: {
      loadExample: "예제 불러오기",
      reset: "초기화",
      showMore: "자세히 보기",
      showLess: "접기",
      formula: "공식",
      interpretation: "해석",
      note: "참고",
      undefined: "정의 불가",
      disclaimer:
        "이 도구는 역학 연구 및 교육 목적으로 제공됩니다. 논문 등 출판용 분석을 위한 전문 통계 상담을 대체하지 않습니다.",
    },
    errorBoundary: {
      title: "문제가 발생했습니다",
      message:
        "이 모듈을 불러오는 중 오류가 발생했습니다. 대부분 네트워크 연결이 일시적으로 끊기는 등 일시적인 문제입니다. 다시 시도하거나, 다른 메뉴로 이동했다가 돌아와 보세요.",
      retryButton: "다시 시도",
    },
    samplingdesign: {
      title: "표본설계",
      subtitle:
        "클러스터 및 층화 표본설계를 위한 계산기, 클러스터링으로 인한 설계효과(분산 팽창) 포함",
      subnav: {
        designEffect: "설계효과",
      },
      designEffect: {
        heading: "설계효과 (Design Effect, 클러스터 표본추출)",
        formulaDeff: "DEFF",
        formulaDeffExpr: "= 1 + (m - 1) x ICC",
        formulaNeff: "n_eff",
        formulaNeffExpr: "= n / DEFF",
        formulaAdjustedN: "n_cluster",
        formulaAdjustedNExpr: "= n_individual x DEFF",
        formulaSource: "출처",
        formulaSourceExpr:
          "Kish, L. (1965). Survey Sampling. Wiley. Donner, A. & Klar, N. (2000). Design and Analysis of Cluster Randomization Trials in Health Research.",
        input: {
          avgClusterSizeLabel: "평균 클러스터 크기 (m)",
          avgClusterSizeHint: "클러스터당 평균 대상자 수",
          iccLabel: "급내상관계수 (ICC / rho)",
          iccHint: "0에서 1 사이의 값; 클수록 클러스터 내 유사성이 높음을 의미",
          sectionEffectiveTitle: "유효 표본크기 (선택)",
          nominalSampleSizeLabel: "수집된 표본크기 (명목)",
          nominalSampleSizeHint: "클러스터 설계 하에서 실제로 수집한 총 표본크기",
          sectionAdjustedTitle: "클러스터 보정 표본크기 (선택)",
          individualSampleSizeLabel: "개별무작위 표본크기",
          individualSampleSizeHint: "단순/개별 무작위 표본추출 시 필요한 표본크기",
        },
        emptyState:
          "유효한 평균 클러스터 크기(> 0)와 ICC(0-1)를 입력하면 결과가 표시됩니다",
        deffLabel: "설계효과",
        deffSub: "m = {m}, ICC = {icc}",
        effectiveSampleSizeLabel: "유효 표본크기",
        effectiveSampleSizeSub: "수집 {nominal} / DEFF {deff}",
        adjustedSampleSizeLabel: "클러스터 보정 표본크기",
        adjustedSampleSizeSub: "개별 {individual} x DEFF {deff}",
        interpSummary:
          "평균 클러스터 크기 {m}, ICC {icc}일 때 설계효과는 {deff}입니다.",
        interpDetail1:
          "설계효과(DEFF)는 단순무작위 표본추출 대비 클러스터링이 추정량의 분산을 얼마나 팽창시키는지를 나타냅니다. DEFF가 2.0이라는 것은 클러스터가 없는(SRS) 설계와 동일한 정밀도를 얻기 위해 두 배의 관측치가 필요하다는 뜻입니다.",
        interpDetail2:
          "ICC가 작더라도 평균 클러스터 크기가 크면 설계효과가 커질 수 있습니다. DEFF는 ICC 하나만이 아니라 두 값의 조합에 의해 결정되기 때문입니다. 유효 표본크기를 통해 클러스터 자료가 실제로 제공하는 독립적인 정보량을 확인하거나, 클러스터 보정 표본크기를 통해 개별무작위 표본크기 추정치를 클러스터 설계에 맞게 보정할 수 있습니다.",
      },
    },
  },
  fr: {
    appName: "EpiPlus",
    appTagline: "Suite de calculateurs complémentaires d'épidémiologie et de biostatistique",
    nav: {
      samplingdesign: "Plan d'échantillonnage",
    },
    common: {
      loadExample: "Charger un exemple",
      reset: "Réinitialiser",
      showMore: "Afficher plus",
      showLess: "Afficher moins",
      formula: "Formule",
      interpretation: "Interprétation",
      note: "Remarque",
      undefined: "indéfini",
      disclaimer:
        "Cet outil est destiné à des fins épidémiologiques et éducatives. Il ne remplace pas une consultation statistique professionnelle pour des analyses destinées à publication.",
    },
    errorBoundary: {
      title: "Une erreur s'est produite",
      message:
        "Ce module n'a pas pu se charger ou a rencontré une erreur inattendue. C'est généralement temporaire — par exemple, une coupure de connexion réseau pendant le chargement. Réessayez, ou changez de module puis revenez.",
      retryButton: "Réessayer",
    },
    samplingdesign: {
      title: "Plan d'échantillonnage",
      subtitle:
        "Calculateurs pour les plans d'échantillonnage en grappes et stratifiés, y compris l'effet de plan (inflation de variance) dû au regroupement",
      subnav: {
        designEffect: "Effet de plan",
      },
      designEffect: {
        heading: "Effet de plan (échantillonnage en grappes)",
        formulaDeff: "DEFF",
        formulaDeffExpr: "= 1 + (m - 1) x ICC",
        formulaNeff: "n_eff",
        formulaNeffExpr: "= n / DEFF",
        formulaAdjustedN: "n_grappe",
        formulaAdjustedNExpr: "= n_individuel x DEFF",
        formulaSource: "Source",
        formulaSourceExpr:
          "Kish, L. (1965). Survey Sampling. Wiley. Donner, A. & Klar, N. (2000). Design and Analysis of Cluster Randomization Trials in Health Research.",
        input: {
          avgClusterSizeLabel: "Taille moyenne de grappe (m)",
          avgClusterSizeHint: "Nombre moyen de personnes par grappe",
          iccLabel: "Corrélation intra-grappe (ICC / rho)",
          iccHint:
            "Valeur entre 0 et 1 ; plus elle est élevée, plus les individus au sein d'une grappe se ressemblent",
          sectionEffectiveTitle: "Taille d'échantillon effective (facultatif)",
          nominalSampleSizeLabel: "Taille d'échantillon nominale (collectée)",
          nominalSampleSizeHint:
            "Taille d'échantillon totale réellement collectée dans le plan en grappes",
          sectionAdjustedTitle: "Taille d'échantillon ajustée pour les grappes (facultatif)",
          individualSampleSizeLabel: "Taille d'échantillon en randomisation individuelle",
          individualSampleSizeHint:
            "Taille d'échantillon requise sous un plan d'échantillonnage aléatoire simple/individuel",
        },
        emptyState:
          "Saisissez une taille moyenne de grappe valide (> 0) et un ICC (0-1) pour voir les résultats",
        deffLabel: "Effet de plan",
        deffSub: "m = {m}, ICC = {icc}",
        effectiveSampleSizeLabel: "Taille d'échantillon effective",
        effectiveSampleSizeSub: "{nominal} collectés / DEFF {deff}",
        adjustedSampleSizeLabel: "Taille d'échantillon ajustée pour les grappes",
        adjustedSampleSizeSub: "{individual} (individuel) x DEFF {deff}",
        interpSummary:
          "Avec une taille moyenne de grappe de {m} et un ICC de {icc}, l'effet de plan est de {deff}.",
        interpDetail1:
          "L'effet de plan (DEFF) mesure dans quelle mesure le regroupement en grappes gonfle la variance d'un estimateur par rapport à un échantillonnage aléatoire simple. Un DEFF de 2,0 signifie qu'il faut deux fois plus d'observations pour atteindre la même précision qu'un plan sans grappes (EAS).",
        interpDetail2:
          "Même un ICC faible peut produire un effet de plan élevé lorsque la taille moyenne des grappes est grande, car le DEFF dépend des deux quantités ensemble, et non de l'ICC seul. Utilisez la taille d'échantillon effective pour voir combien d'information indépendante un jeu de données en grappes fournit réellement, ou la taille d'échantillon ajustée pour les grappes pour gonfler une estimation de taille d'échantillon en randomisation individuelle en vue d'un plan en grappes.",
      },
    },
  },
} as const;

export type TranslationKey = keyof typeof translations.en;
