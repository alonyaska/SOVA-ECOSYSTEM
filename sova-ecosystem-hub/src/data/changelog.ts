export interface ChangelogEntry {
  version: string;
  date: string;
  title: string;
  description: string;
  changes: { type: "added" | "changed" | "fixed" | "removed"; text: string }[];
}

export const changelog: ChangelogEntry[] = [
  {
    version: "v0.6.0",
    date: "2026-05-12",
    title: "portfolio hub release",
    description: "Первая версия портфолио-хаба с детальными страницами проектов и новым разделом about.",
    changes: [
      { type: "added", text: "Страницы проектов /projects/$id с case study" },
      { type: "added", text: "Страница /about с таймлайном и скиллами" },
      { type: "added", text: "GitHub stats на карточках модулей" },
      { type: "added", text: "Интерактивный терминал на главной" },
    ],
  },
  {
    version: "v0.5.0",
    date: "2026-05-01",
    title: "filtering & contact",
    description: "Фильтрация модулей по статусу, контактная форма, мобильная навигация.",
    changes: [
      { type: "added", text: "Фильтры All/STABLE/BETA/SOON в сетке модулей" },
      { type: "added", text: "Поиск по названию и тегам" },
      { type: "added", text: "Контактная форма с валидацией" },
      { type: "added", text: "Мобильное меню (hamburger drawer)" },
    ],
  },
  {
    version: "v0.4.0",
    date: "2026-04-15",
    title: "initial ecosystem hub",
    description: "Первый релиз SOVA Ecosystem Hub. Главная страница, модули, манифест, roadmap.",
    changes: [
      { type: "added", text: "Hero с boot-анимацией терминала" },
      { type: "added", text: "Сетка модулей с живыми превью" },
      { type: "added", text: "Страница манифеста /manifest" },
      { type: "added", text: "Страница контактов /contact" },
      { type: "added", text: "Двойная тема: hardcore / soft" },
      { type: "added", text: "Roadmap с git-log стилем" },
    ],
  },
];
