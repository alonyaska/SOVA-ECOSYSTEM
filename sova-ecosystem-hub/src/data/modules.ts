export type ModuleStatus = "STABLE" | "BETA" | "WIP" | "SOON";
export type PreviewKind = "summarizer" | "messenger" | "scanner" | "classified";

export interface SovaModule {
  id: string;
  index: string; // module_NN
  name: string;
  filename: string; // module_NN.exe
  status: ModuleStatus;
  tagline: string;
  description: string;
  hookMetric: string;
  tags: string[];
  url?: string;
  repo?: string;
  previewKind: PreviewKind;
}

export const modules: SovaModule[] = [
  {
    id: "summarizer",
    index: "01",
    name: "SOVA Summarizer",
    filename: "yt_summarizer.exe",
    status: "STABLE",
    tagline: "YouTube → смысл за 2.4 секунды.",
    description:
      "Парсинг субтитров напрямую, кластеризация смыслов через Gemini 2.5. Без скачивания видео, без воды.",
    hookMetric: "~2.4s avg",
    tags: ["AI", "CLI", "Gemini"],
    url: "https://sova-summaraizer.vercel.app/",
    repo: "https://github.com/alonyaska",
    previewKind: "summarizer",
  },
  {
    id: "messenger",
    index: "02",
    name: "SOVA Messenger",
    filename: "sova_chat.exe",
    status: "BETA",
    tagline: "E2E мессенджер с встроенным обходом DPI.",
    description:
      "Signal-протокол по умолчанию, P2P-маршрутизация, нативные клиенты под все платформы. Работает там, где остальные молчат.",
    hookMetric: "E2E · 0 logs",
    tags: ["P2P", "Privacy", "Anti-DPI"],
    url: "https://alonyaska.github.io/SOVA-lending/",
    repo: "https://github.com/alonyaska",
    previewKind: "messenger",
  },
  {
    id: "seotech",
    index: "03",
    name: "SEOTECH Analyze",
    filename: "seotech_scan.exe",
    status: "SOON",
    tagline: "Глубокий технический аудит сайта на автопилоте.",
    description:
      "Core Web Vitals, structured data, индексируемость, ссылочный граф. Отчёт в твоём терминале, не в чужом дашборде.",
    hookMetric: "Q2 · 2026",
    tags: ["SEO", "Audit", "Crawler"],
    previewKind: "scanner",
  },
  {
    id: "messenger-core",
    index: "04",
    name: "SOVA Messenger Core",
    filename: "sova_core.exe",
    status: "SOON",
    tagline: "[CLASSIFIED] · следующая итерация ядра.",
    description:
      "Полностью переписанный сетевой стек, унифицированный sova-id, AI-ассистент внутри переписки. Подробности позже.",
    hookMetric: "ETA · classified",
    tags: ["Core", "AI", "P2P"],
    previewKind: "classified",
  },
];
