import { Link } from "@tanstack/react-router";
import { SectionHeader } from "./module-grid";

const principles = [
  {
    key: "01",
    title: "privacy_first()",
    body: "End-to-end по умолчанию. Никаких логов, аналитики, телеметрии. Ключи живут только у тебя.",
  },
  {
    key: "02",
    title: "open_source()",
    body: "Исходники открыты. Можешь читать, форкать, проверять. Никаких чёрных ящиков.",
  },
  {
    key: "03",
    title: "ai_native()",
    body: "AI — встроенный примитив, а не отдельная фича. Локальные модели где возможно.",
  },
  {
    key: "04",
    title: "anti_censorship()",
    body: "Обход DPI и блокировок встроен в ядро. Связь остаётся, когда остальные падают.",
  },
];

export function ManifestPreview() {
  return (
    <section className="border-b border-border">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24">
        <SectionHeader
          eyebrow="// manifest"
          title="Четыре принципа. Без компромиссов."
          subtitle="Это не маркетинг — это техническое требование к каждому модулю экосистемы."
        />

        <div className="mt-12 grid gap-4 sm:grid-cols-2">
          {principles.map((p) => (
            <div
              key={p.key}
              className="rounded-lg border border-border bg-card p-5 transition-colors hover:border-primary/40"
            >
              <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                <span>/** {p.key} */</span>
              </div>
              <h3 className="mt-2 font-mono text-lg font-semibold text-foreground">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.body}</p>
            </div>
          ))}
        </div>

        <div className="mt-8">
          <Link
            to="/manifest"
            className="inline-flex items-center gap-2 font-mono text-sm text-primary hover:underline"
          >
            <span>&gt;</span> read full manifest
            <span>→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
