import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/manifest")({
  head: () => ({
    meta: [
      { title: "Manifest — SOVA Ecosystem" },
      {
        name: "description",
        content:
          "Манифест SOVA Ecosystem: privacy-first, open-source, AI-native, anti-censorship. Технические принципы каждого модуля.",
      },
      { property: "og:title", content: "Manifest — SOVA Ecosystem" },
      {
        property: "og:description",
        content: "Манифест SOVA Ecosystem: privacy-first, open-source, AI-native, anti-censorship.",
      },
      { property: "og:url", content: "/manifest" },
    ],
    links: [{ rel: "canonical", href: "/manifest" }],
  }),
  component: ManifestPage,
});

function ManifestPage() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-20 sm:px-6 sm:py-28">
      <div className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
        ~/sova/MANIFEST.md
      </div>
      <h1 className="mt-3 font-mono text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
        // manifest
      </h1>
      <p className="mt-4 text-base text-muted-foreground">
        Это не маркетинг. Это технические требования, которым подчиняется каждый модуль экосистемы.
        Если модуль их нарушает — он не попадает в SOVA.
      </p>

      <Section index="01" title="privacy_first()">
        End-to-end шифрование — не опция, а дефолт. Никаких логов запросов, никакой телеметрии,
        никаких аналитических SDK. Ключи генерируются и хранятся на устройстве пользователя. Если ты
        не можешь объяснить, зачем нужен какой-то сетевой запрос — он не должен существовать.
      </Section>

      <Section index="02" title="open_source()">
        Каждая строчка кода открыта. Исходники, билды, инфраструктура — всё проверяемо. Закрытыми
        могут быть только секретные ключи самих пользователей. Лицензия — permissive (MIT/Apache),
        форки приветствуются.
      </Section>

      <Section index="03" title="ai_native()">
        AI — это примитив, как функция или класс, а не «отдельная фича». Где возможно — локальные
        модели, чтобы данные не уходили в чужие облака. Где невозможно — прозрачный выбор провайдера
        и режим без AI.
      </Section>

      <Section index="04" title="anti_censorship()">
        Обход DPI и блокировок встроен в транспортный слой каждого сетевого модуля. P2P там, где это
        технически оправдано. Связь должна работать там, где остальные молчат.
      </Section>

      <Section index="05" title="no_cloud_lock_in()">
        Никаких «облачных аккаунтов SOVA». Никакой обязательной регистрации. Никакого ваннер-локина.
        Данные — твои, инфраструктура — твоя. Мы делаем инструменты, а не платформу-зависимость.
      </Section>

      <div className="mt-16 border-t border-border pt-8 font-mono text-sm text-muted-foreground">
        <div>
          <span className="text-terminal">$</span> cat MANIFEST.md | sha256sum
        </div>
        <div className="mt-1">a1c7e0…sova-collective</div>
      </div>

      <div className="mt-10">
        <Link
          to="/"
          className="inline-flex items-center gap-2 font-mono text-sm text-primary hover:underline"
        >
          <span>&lt;</span> back to hub
        </Link>
      </div>
    </article>
  );
}

function Section({
  index,
  title,
  children,
}: {
  index: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-12">
      <div className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
        /** {index} */
      </div>
      <h2 className="mt-1 font-mono text-2xl font-semibold text-foreground">{title}</h2>
      <p className="mt-3 text-base leading-relaxed text-muted-foreground">{children}</p>
    </section>
  );
}
