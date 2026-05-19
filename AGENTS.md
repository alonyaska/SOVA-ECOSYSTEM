# SOVA Ecosystem — Project Reference for AI Agents

## Overview

**SOVA Ecosystem Hub** — terminal-themed SPA on TanStack Start (React 19, SSR).  
Центральный хаб для коллекции privacy-first, open-source инструментов независимого разработчика.

| Свойство | Значение |
|----------|----------|
| Framework | TanStack Start v1 (SSR-first) |
| Routing | TanStack Router (file-based, `src/routes/`) |
| UI | React 19, shadcn/ui (Radix), Tailwind CSS v4 |
| Анимации | framer-motion 12, CSS animations |
| State | TanStack React Query 5 |
| Forms | react-hook-form + zod |
| Сборка | Vite 7 + @cloudflare/vite-plugin |
| Деплой | Cloudflare Workers |
| Пакетный менеджер | Bun |
| Тема | oklch CSS variables, hardcore / soft theme toggle |

## Структура проекта

```
sova-ecosystem-hub/
├── src/
│   ├── routes/           # File-based routing (TanStack Router)
│   │   ├── __root.tsx    # Root layout (header, footer, error boundaries, providers)
│   │   ├── index.tsx     # Главная: Hero + Stats + Modules + Manifest + Roadmap
│   │   ├── manifest.tsx  # Манифест принципов
│   │   ├── about.tsx     # О разработчике
│   │   ├── changelog.tsx # История изменений
│   │   ├── contact.tsx   # Контакты + форма обратной связи
│   │   ├── projects.$id.tsx  # Детальная страница модуля
│   │   └── sitemap[.]xml.ts  # Sitemap (GET handler)
│   ├── components/
│   │   ├── sections/     # Крупные секции страниц
│   │   ├── text/         # Текстовые анимации (binary-text.tsx)
│   │   └── ui/           # shadcn/ui компоненты
│   ├── data/
│   │   ├── modules.ts    # Список модулей экосистемы
│   │   ├── projects.ts   # Детальные описания проектов
│   │   └── changelog.ts  # История версий
│   ├── hooks/            # use-github-stats, use-mobile
│   ├── lib/              # Утилиты, error-boundary, error-page
│   ├── styles.css        # Глобальные стили, CSS variables, темы
│   ├── router.tsx        # Конфиг роутера
│   ├── server.ts         # SSR entry point (error wrapper)
│   └── start.ts          # TanStack Start entry
└── vite.config.ts        # @lovable.dev/vite-tanstack-config
```

## Available Scripts

| Команда | Описание |
|---------|----------|
| `npm run dev` | Запуск dev-сервера (Vite) |
| `npm run build` | Production сборка (client + SSR) |
| `npm run preview` | Preview production сборки |
| `npm run lint` | ESLint проверка |
| `npm run format` | Prettier форматирование |

## Routes

| Path | Component | Описание |
|------|-----------|----------|
| `/` | BootHero + SystemStats + ModuleGrid + ManifestPreview + Roadmap | Главная с терминалом |
| `/manifest` | ManifestPage | 5 принципов экосистемы |
| `/about` | AboutPage | Био, таймлайн, навыки |
| `/changelog` | ChangelogPage | Версии с badge-типами |
| `/contact` | ContactPage | Каналы связи + форма |
| `/projects/$id` | ProjectPage | Детали модуля (summarizer, messenger, seotech, messenger-core) |
| `/sitemap.xml` | GET handler | Авто-генерация sitemap |

## Key Features

- **Interactive Terminal** (`src/components/interactive-terminal.tsx`) — эмулятор терминала на главной: help, whoami, ls, open \<id\>, contact, about, clear, banner
- **Dual Theme** — hardcore (default, scanlines, dot grid) / soft (полированный, sans-serif body). Сохраняется в localStorage
- **Binary Text Effect** (`src/components/text/binary-text.tsx`) — текст стартует как мерцающие 0/1, раскрывается слева направо
- **Module Grid** — фильтрация по статусу (ALL/STABLE/BETA/WIP/SOON), поиск, живые превью
- **GitHub Stats** — звёзды/форки через React Query
- **Terminal Aesthetic** — `>` prompts, `//` comments, `$` prompt, monospace, ASCII art

## Data Architecture

Все данные статические (бекенда нет):
- `src/data/modules.ts` — список модулей с id, статусом, тегами, ссылками
- `src/data/projects.ts` — детальные описания, techStack, features, architecture
- GitHub stats — живые через `use-github-stats.ts` + React Query
- Контактная форма — клиентская (логи в console, toast через sonner)

## Errors

### TypeScript (6 errors — все в `src/routes/projects.$id.tsx`)
`loaderData` is possibly 'undefined'.  
**Причина**: `head()` использует `loaderData` без проверки на undefined. Роут может выбросить `notFound()`, и TS корректно это флагует.  
**Fix**: добавить guard или типизировать `loaderData` в `head()`.

### ESLint (4 fixable errors)
- `binary-text.tsx`: formatting (trailing comma, multiline props, class name wrapping)
- `changelog.ts`: formatting (newline/indent)

### ESLint Warnings (8)
1. `binary-text.tsx`: `exhaustive-deps` — useEffect без `chars`, `speedMs`, `staggerMs` в deps
2. 7 shadcn/ui файлов: `react-refresh/only-export-components` — рядом с компонентом экспортируются не-компоненты (variants, constants)

## Что стоит изменить / улучшить

### Критические
1. **TypeScript errors** — `projects.$id.tsx`: починить типизацию `loaderData` (страдает production DX с strict mode)
2. **exhaustive-deps** в `binary-text.tsx` — `chars`, `speedMs`, `staggerMs` должны быть в deps, либо завернуть в ref. Сейчас эффект ререндерит только на mount, но передача новых пропсов не перезапустит анимацию

### Архитектурные
3. **Избавиться от дублирования данных** — `modules.ts` и `projects.ts` дублируют id. Проекты должны ссылаться на модули, а не дублировать ключи
4. **Вынести тему в ThemeProvider из `__root.tsx`** — сейчас `ThemeProvider` и сайт-хедер/footer рендерятся в одном компоненте с прямым импортом тем из `styles.css`. Тема реализована как смена CSS-класса на `html`, это ок, но стоит вынести логику в отдельный `ThemeScript` для устранения FOUC
5. **Переписать `boot-hero.tsx`** — сейчас в одном файле и Hero, и InteractiveTerminal. Terminal стоит выделить как layout-компонент, Hero — как data-слой с пропсами
6. **Добавить изоляцию для BinaryText** — компонент не принимает `key`, и при ремаунте на тех же пропсах анимация не воспроизведётся заново. Нужен `key` или триггер-проп (`play`)

### Производительность
7. **Lazy load секций** — `ModuleGrid`, `ManifestPreview`, `Roadmap` грузятся сразу. Для главной с кучей анимаций стоит добавить `React.lazy` + IntersectionObserver
8. **Избавиться от неиспользуемых UI-компонентов** — в `src/components/ui/` ~40 компонентов, многие не используются (calendar, chart, carousel, resizable, progress, toggle-group, и т.д.). Увеличивают bundle

### Код
9. **Prettier/ESLint** — прогнать `--fix` в CI для форматирования
10. **Заменить прямой Link на `<a>` для внешних ссылок** — в `contact.tsx` и `module-card.tsx` есть `<a target="_blank">` рядом с TanStack `<Link>`. Для внешних ссылок это норм, но в меню футера используется `<a>` вместо `<Link>` (можно и нужно оставить, т.к. внешние)

### Функциональность
11. **Добавить SSR-safe обработчик для `use-github-stats`** — сейчас хук пытается фетчить на сервере, что может падать. Нужен guard `typeof window !== 'undefined'`
12. **Добавить загрузку темы из cookie** — для SSR консистентности темы между сервером и клиентом (сейчас тема живёт только в localStorage)

## Scalability / Масштабируемость

### Current Architecture
- **Static data** — 4 модуля, ~6 страниц, контент в TS-файлах
- **No backend** — хаб-как-лендинг, а не платформа
- **SSR-first** — Cloudflare Workers edge deployment

### Как проект может расти

#### 1. Content → Backend
Сейчас данные в TS-файлах. При 10+ модулях:
- Переезд на headless CMS (Sanity / Strapi) или markdown (Contentlayer / MDX)
- GraphQL-фасад для модулей (один endpoint, типизированные запросы)
- Кеширование через React Query + Cloudflare KV

#### 2. Hub → Platform
Чтобы стать полноценной платформой:
- **Auth**: sova-id (упомянут в роадмапе) — унифицированная аутентификация через JWT/cookie
- **API Gateway**: Cloudflare Workers как BFF для модулей
- **Dashboard**: персональные дашборды для пользователей (не в роадмапе, но логично)
- **Module registry**: динамический список модулей, а не хардкод

#### 3. Масштаб страниц (100+ pages)
- **Code Splitting**: TanStack Start уже делает route-level splitting. Добавить lazy sections
- **ISR / Static Generation**: Cloudflare + `@cloudflare/vite-plugin` позволяют гибридный рендеринг. Для страниц модулей — SSG с ревалидацией
- **CDN Strategy**: Cloudflare Workers уже edge. Кеш варьировать по accept-language для i18n

#### 4. i18n
- Весь контент сейчас на русском + английские заголовки модулей
- При расширении — `i18next` или `react-intl` с переключением через Cookie (для SSR)
- URL-структура: `/en/projects/summarizer` или query param

#### 5. Monorepo
При появлении реальных модулей (summarizer, messenger, seotech):
- `packages/hub` — этот проект
- `packages/ui` — дизайн-система, общая для всех модулей
- `packages/config` — eslint, tsconfig, prettier
- `apps/summarizer`, `apps/messenger` — отдельные приложения

#### 6. Testing
Сейчас тестов нет:
- **Unit**: vitest для хуков, утилит, компонентов
- **E2E**: Playwright для критических флоу (главная → модуль, терминал, тема)
- **Perf**: Lighthouse CI, bundle-analyzer

#### 7. Monitoring
- **Error tracking**: Sentry или OpenReplay (сейчас только `error-capture.ts` — примитивный логгер)
- **Analytics**: минимальная анонимная аналитика (без компромисса privacy-first миссии)

### Ограничения текущей архитектуры

| Ограничение | Почему проблема | Миграция |
|-------------|----------------|----------|
| Данные в TS | При 20+ модулях — больно править | Headless CMS / MDX |
| Нет тестов | Любой рефакторинг — риск | vitest + Playwright |
| Нет i18n | Русскоязычный контент + англ. термины | i18next + cookie |
| Нет бекенда | Нельзя сохранять юзеров, фидбек, статистику | Cloudflare D1 + Durable Objects |
| Бандл shadcn/ui | ~40 UI-компонентов, много не используется | Tree-shake / удалить неиспользуемые |
| Нет изоляции тем для SSR | FOUC при загрузке (тема в localStorage) | Theme cookie + inline script |

### Roadmap роста

```
v0.6 (current) — хаб-лендинг, 4 модуля, terminal theme
    ↓
v0.7 — SEOtech Analyze, seotech модуль как сервис
    ↓
v0.8 — sova-id (единая аутентификация)
    ↓
v1.0 — платформа: дашборд, динамические модули, i18n
    ↓
v2.0 — registry: модули как плагины, API для сторонних разработчиков
```

## Конвенции для агентов

- Все пути относительно `sova-ecosystem-hub/`
- Импорты через `@/` алиас (например `@/components/sections/boot-hero`)
- Стили — Tailwind CSS v4 (без `@apply`, только utility classes)
- Новые компоненты — в `src/components/` с именем в `kebab-case.tsx`
- Данные модулей — только в `src/data/modules.ts`, не дублировать
- ESLint + Prettier обязательны перед коммитом (`npm run lint`, `npm run format`)
- TypeScript `strict: true` — все ошибки обязательны к исправлению
- Анимации — prefer framer-motion для сложных, CSS transitions для простых
- Перед созданием нового UI-компонента проверить, нет ли его в shadcn/ui

## Быстрые команды

```bash
cd sova-ecosystem-hub
npm run dev          # dev сервер (localhost)
npm run build        # production сборка
npm run lint         # ESLint
npx tsc --noEmit     # TypeScript check
npm run format       # Prettier
```
