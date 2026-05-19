export interface ProjectDetail {
  longDescription: string;
  techStack: { name: string; category: "language" | "framework" | "tool" | "infra" | "ai" }[];
  features: { title: string; description: string }[];
  links: {
    live?: string;
    repo?: string;
    docs?: string;
    demo?: string;
  };
  architecture?: string;
  highlights?: string[];
}

export type ProjectDetailMap = Record<string, ProjectDetail>;

export const projectDetails: ProjectDetailMap = {
  summarizer: {
    longDescription:
      "SOVA Summarizer — это CLI-инструмент, который превращает YouTube-видео в структурированные саммари за секунды. Парсинг субтитров напрямую через YouTube API, без скачивания видео. Кластеризация смыслов через Gemini 2.5 Pro, выделение ключевых тезисов, таймкодов и сути.",
    techStack: [
      { name: "TypeScript", category: "language" },
      { name: "Node.js", category: "framework" },
      { name: "Gemini 2.5", category: "ai" },
      { name: "YouTube API", category: "tool" },
      { name: "CLI", category: "tool" },
    ],
    features: [
      {
        title: "Парсинг субтитров",
        description:
          "Извлечение субтитров напрямую, без скачивания видео. Поддержка всех языков, которые есть в видео.",
      },
      {
        title: "Кластеризация смыслов",
        description:
          "Gemini 2.5 Pro анализирует текст, группирует близкие по смыслу блоки и формирует связную структуру.",
      },
      {
        title: "Таймкоды",
        description:
          "Каждый тезис привязан к таймкоду исходного видео — можно сразу перейти к нужному моменту.",
      },
      {
        title: "Zero-воды",
        description: "Без лишних слов, без вступлений, без рекламы. Только суть.",
      },
    ],
    links: {
      live: "https://sova-summaraizer.vercel.app/",
      repo: "https://github.com/alonyaska",
    },
    architecture:
      "Простая трёхслойная архитектура: CLI-обёртка → сервис парсинга субтитров (YouTube API) → AI-провайдер (Gemini 2.5). Результат отдаётся в stdout в формате Markdown.",
    highlights: [
      "Среднее время обработки — 2.4 секунды",
      "Работает с видео любой длины",
      "Не требует авторизации для базового использования",
    ],
  },
  messenger: {
    longDescription:
      "SOVA Messenger — E2E-защищённый мессенджер со встроенным обходом DPI. Работает там, где остальные блокируются. Signal-протокол по умолчанию, P2P-маршрутизация для обхода цензуры, нативные клиенты под все платформы.",
    techStack: [
      { name: "TypeScript", category: "language" },
      { name: "React", category: "framework" },
      { name: "Signal Protocol", category: "tool" },
      { name: "P2P", category: "infra" },
      { name: "Anti-DPI", category: "tool" },
    ],
    features: [
      {
        title: "E2E шифрование",
        description:
          "Signal-протокол по умолчанию. Никто, кроме участников диалога, не может прочитать сообщения.",
      },
      {
        title: "Обход DPI",
        description:
          "Встроенные механизмы маскировки трафика для работы в странах с интернет-цензурой.",
      },
      {
        title: "P2P маршрутизация",
        description: "Сообщения идут напрямую между клиентами, минуя центральные серверы.",
      },
      {
        title: "Кроссплатформенность",
        description: "Нативные клиенты для Windows, macOS, Linux, iOS и Android.",
      },
    ],
    links: {
      live: "https://alonyaska.github.io/SOVA-lending/",
      repo: "https://github.com/alonyaska",
    },
    architecture:
      "Peer-to-peer архитектура с опциональным relay-узлом. Signal Protocol для шифрования, кастомный транспортный слой для обхода DPI. Клиенты обмениваются ключами через P2P-канал.",
    highlights: [
      "0 логирования на стороне клиента",
      "Работает при блокировке популярных мессенджеров",
      "Полностью открытый исходный код",
    ],
  },
  seotech: {
    longDescription:
      "SEOTECH Analyze — инструмент для глубокого технического SEO-аудита сайтов. Проверяет Core Web Vitals, структурированные данные, индексируемость, ссылочный граф. Всё из терминала, без сторонних дашбордов и подписок.",
    techStack: [
      { name: "TypeScript", category: "language" },
      { name: "Node.js", category: "framework" },
      { name: "Puppeteer", category: "tool" },
      { name: "Lighthouse", category: "tool" },
    ],
    features: [
      {
        title: "Core Web Vitals",
        description: "Замер LCP, FID, CLS и других метрик прямо из терминала.",
      },
      {
        title: "Структурированные данные",
        description: "Валидация Schema.org, Open Graph, Twitter Cards, микроразметки.",
      },
      {
        title: "Индексируемость",
        description: "Проверка robots.txt, sitemap, мета-тегов, канонических URL.",
      },
      {
        title: "Ссылочный граф",
        description: "Внутренняя и внешняя перелинковка, битые ссылки, цепочки редиректов.",
      },
    ],
    links: {},
    architecture:
      "Модульный сканер: каждый этап аудита — отдельный плагин. Puppeteer для рендеринга страниц, встроенные метрики Lighthouse. Результат — JSON-отчёт с рекомендациями.",
    highlights: [
      "Полный аудит за 30-60 секунд",
      "Не требует регистрации или API-ключа",
      "Экспорт в JSON и Markdown",
    ],
  },
  "messenger-core": {
    longDescription:
      "SOVA Messenger Core — следующая итерация ядра мессенджера. Полностью переписанный сетевой стек, унифицированный sova-id для всех модулей экосистемы, встроенный AI-ассистент в переписке. Подробности пока под NDA.",
    techStack: [
      { name: "Rust", category: "language" },
      { name: "TypeScript", category: "language" },
      { name: "Signal Protocol", category: "tool" },
      { name: "P2P", category: "infra" },
      { name: "AI", category: "ai" },
    ],
    features: [
      {
        title: "Новый сетевой стек",
        description:
          "Полностью переписан с нуля на Rust для максимальной производительности и безопасности.",
      },
      {
        title: "Sova-ID",
        description:
          "Единый идентификатор для всех модулей экосистемы. Один аккаунт — все сервисы.",
      },
      {
        title: "AI-ассистент",
        description:
          "Встроенный AI-помощник в переписке: саммари диалогов, перевод, автодополнение.",
      },
    ],
    links: {},
    architecture: "NDA",
    highlights: [
      "Rust-ядро для критичного к пути",
      "Модульная архитектура для легкой расширяемости",
      "Полная совместимость с существующим Messenger",
    ],
  },
};
