import { createFileRoute, Link } from "@tanstack/react-router";
import { changelog } from "@/data/changelog";

export const Route = createFileRoute("/changelog")({
  head: () => ({
    meta: [
      { title: "Changelog — SOVA Ecosystem" },
      { name: "description", content: "История изменений SOVA Ecosystem Hub." },
      { property: "og:title", content: "Changelog — SOVA Ecosystem" },
      { property: "og:description", content: "История изменений SOVA Ecosystem Hub." },
      { property: "og:url", content: "/changelog" },
    ],
    links: [{ rel: "canonical", href: "/changelog" }],
  }),
  component: ChangelogPage,
});

const typeStyles: Record<string, string> = {
  added: "border-terminal text-terminal",
  changed: "border-primary text-primary",
  fixed: "border-warn text-warn",
  removed: "border-destructive text-destructive",
};

function ChangelogPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20">
      <div className="mb-8 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
        <Link to="/" className="transition-colors hover:text-foreground">
          ~/hub
        </Link>
        <span className="mx-2">/</span>
        <span className="text-foreground">changelog</span>
      </div>

      <h1 className="font-mono text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
        // changelog
      </h1>
      <p className="mt-3 text-base text-muted-foreground">
        История изменений и новых фич портфолио-хаба.
      </p>

      <div className="mt-12 space-y-10">
        {changelog.map((entry, i) => (
          <article key={entry.version} className="relative border-l border-border pl-6 last:pb-0">
            <div className="absolute left-0 top-1 size-2.5 -translate-x-1/2 rounded-full border-2 border-primary bg-background" />

            <div className="flex items-baseline gap-3">
              <h2 className="font-mono text-lg font-semibold text-foreground">{entry.version}</h2>
              <span className="font-mono text-xs text-muted-foreground">{entry.date}</span>
            </div>

            <h3 className="mt-1 font-mono text-sm font-medium text-foreground/90">{entry.title}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{entry.description}</p>

            <ul className="mt-3 space-y-1.5">
              {entry.changes.map((c, ci) => (
                <li key={ci} className="flex items-start gap-2 text-sm">
                  <span
                    className={`shrink-0 rounded border px-1.5 py-0.5 font-mono text-[10px] uppercase leading-none ${typeStyles[c.type] || "border-border text-muted-foreground"}`}
                  >
                    {c.type}
                  </span>
                  <span className="text-muted-foreground">{c.text}</span>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>

      <div className="mt-12 border-t border-border pt-8 text-center">
        <Link
          to="/"
          className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 font-mono text-sm font-medium text-primary-foreground transition-all hover:brightness-110"
        >
          <span>&gt;</span>
          back to hub
        </Link>
      </div>
    </div>
  );
}
