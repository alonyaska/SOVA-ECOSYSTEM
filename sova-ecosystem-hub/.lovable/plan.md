## Концепция: `sova://ecosystem` — терминал-хаб экосистемы

Главный сайт = корневой терминал, из которого «загружаются» модули. Единый визуальный язык с существующими проектами (моно-шрифт, тёмный фон, сине-зелёные акценты, маскот-сова, `sys_admin@sova:~$`-эстетика), но с **переключателем темы**: hardcore-terminal ↔ soft-corporate. Один сетап токенов, два режима.

### Структура (TanStack Start, отдельные routes)

```
/             → Hub: hero + grid модулей + статус + манифест + roadmap + footer
/manifest     → Расширенный манифест (текстом, как README)
/contact      → sys_admin контакты + GitHub + соцсети
```

Без отдельных страниц на каждый модуль — карточка сама и есть «витрина», её задача замотивировать клик.

### Главная (`/`)

1. **Boot-sequence hero**
   - typing-эффект:
     ```
     > booting sova-ecosystem...
     > 2 modules online · 2 in development
     > welcome, guest_user
     ```
   - Большой логотип-сова, слоган: «// экосистема инструментов нового поколения».
   - CTA: `> explore modules` (скролл к гриду).

2. **Module grid — карточки-окна терминала (главный фокус страницы)**

   Каждая карточка как живое окно, а не статичный плейсхолдер. Цель — **замотивировать кликнуть**.
   Состав:
   - Header окна: `module_NN.exe` · статус (зелёная точка online / жёлтая beta / серая planned)
   - Название + одна сильная строка-обещание (что юзер получит за 5 секунд)
   - **Live-preview зона** — мини-демонстрация прямо в карточке:
     - *Summarizer*: фейковая консоль с YouTube-ссылкой → typing-эффект «extracting... 2.4s → summary ready», 3 буллета саммари
     - *Messenger*: мини-чат с E2E-индикатором, бегущая строка `DPI bypass active`
     - *SEOTECH Analyze* (coming): сканер с прогресс-баром, метрики
     - *SOVA Messenger v2 / новый модуль* (coming): `[CLASSIFIED]` с глитч-эффектом
   - 2-3 тега: `AI`, `P2P`, `Privacy`, `CLI` и т.п.
   - Метрика-крючок: `~2.4s avg` / `E2E encrypted` / `0 logs` — конкретная цифра вместо общих слов
   - **Двойной CTA**:
     - Primary: `> launch module` (открывает проект в новой вкладке)
     - Secondary: `> view repo` (GitHub)
   - Hover: подсветка border, бегущая строка `// opening secure connection...`, лёгкий scanline

   Карточки:
   - `module_01` **SOVA Summarizer** [STABLE] → `sova-summaraizer.vercel.app`
   - `module_02` **SOVA Messenger** [BETA] → `alonyaska.github.io/SOVA-lending`
   - `module_03` **SEOTECH Analyze** [SOON] → плейсхолдер с email-подпиской `notify me`
   - `module_04` **SOVA Messenger Core** [SOON] → плейсхолдер `notify me` *(уточни — это та же messenger-эволюция или отдельный продукт?)*

3. **System stats** — узкая полоса с живыми (псевдо)метриками: `uptime · modules online · last_deploy · build`.

4. **Manifest preview** — 3-4 строки философии (privacy-first, open-source, anti-censorship, AI-native) + ссылка `read full manifest →` на `/manifest`.

5. **Roadmap** — git-log стиль:
   ```
   * v0.4 [DONE]  summarizer launched
   * v0.5 [BETA]  messenger online
   * v0.6 [WIP]   ecosystem hub
   * v0.7 [PLAN]  seotech analyze
   * v0.8 [PLAN]  unified sova-id
   ```

6. **Footer** — `sys_admin@sova:~$ _` prompt, GitHub, версия, copyright.

### Переключатель темы (важный пункт)

В шапке — toggle `[ hardcore ] [ soft ]`. Выбор сохраняется в `localStorage`, применяется через класс на `<html>` (с `ScriptOnce` до гидрации, чтобы не было вспышки).

- **Hardcore** (default): почти чёрный фон `oklch(0.13 0.02 260)`, тонкая сетка точками, scanlines, ярче неон-зелёный, моно-шрифт везде (включая описания), угловатые границы.
- **Soft**: более глубокий, но мягкий фон `oklch(0.18 0.03 260)`, без сетки/scanlines, описания — Space Grotesk / Inter, моно только в коде/метриках, более скруглённые карточки, акцент-синий доминирует над зелёным.

Оба режима используют **один и тот же набор семантических токенов** (`--background`, `--primary`, `--accent` и т.д.) — переключаются только значения. Никаких хардкод-цветов в компонентах.

### Дизайн-система (общая база)

- Цвета (`src/styles.css`, oklch): фон, поверхность, primary-blue `#3b82f6`, terminal-green `#22c55e`, мутный текст, бордер
- Шрифты: JetBrains Mono (UI/код), Space Grotesk (описания в soft-режиме)
- Декор: ASCII (`//`, `>`, `~`, `<SOVA />`), badge-теги, точечная сетка (только hardcore)
- Анимации: Framer Motion — typing, мигающий курсор, hover scanline, плавный fade при скролле. Без перегруза.

### Технические детали

- TanStack Start v1 (уже в проекте), Tailwind v4, Framer Motion
- Route-файлы: `index.tsx`, `manifest.tsx`, `contact.tsx` — каждый со своим `head()` (title, description, og:title, og:description, og:url)
- Модули в `src/data/modules.ts` — массив с типом `{ id, name, status, tagline, hookMetric, tags, url, repo, previewKind }`
- Live-preview карточек — отдельные мини-компоненты по `previewKind` (`summarizer`/`messenger`/`scanner`/`classified`)
- Тема: `src/components/theme-provider.tsx` + `ScriptOnce` для пре-гидратационного применения класса
- SEO: уникальный head() на каждом route, `og:image` оставляем на потом (или скриншот терминала, если попросишь)
- Без бэкенда — статичный фронт, чисто как ты попросил
- RU-копирайт (как в существующих проектах), технические термины — EN

### План работ (когда подтвердишь)

1. Дизайн-токены + theme-provider с переключателем
2. Layout (header с toggle, footer)
3. Boot-hero с typing-анимацией
4. Module grid + 4 типа live-preview карточек
5. Manifest preview / Roadmap / System stats секции
6. Routes `/manifest`, `/contact`
7. SEO head() на всех маршрутах + sitemap.xml

### Один вопрос перед стартом

`module_04` — это эволюция текущего messenger'а (v2/core) или отдельный продукт? Если их по сути два (текущий мессенджер + будущий апгрейд) — оставлю как есть. Если хочешь только три карточки (Summarizer, Messenger, SEOTECH) — скажи, уберу четвёртую.
