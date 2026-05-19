import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { modules } from "@/data/modules";
import { projectDetails } from "@/data/projects";
import { ModulePreview } from "@/components/module-preview";

export const Route = createFileRoute("/projects/$id")({
  loader: ({ params }) => {
    const mod = modules.find((m) => m.id === params.id);
    if (!mod) throw notFound();
    const detail = projectDetails[params.id];
    return { mod, detail };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData.mod.name} — SOVA Ecosystem` },
      {
        name: "description",
        content: loaderData.mod.description,
      },
      { property: "og:title", content: `${loaderData.mod.name} — SOVA Ecosystem` },
      { property: "og:description", content: loaderData.mod.description },
      { property: "og:url", content: `/projects/${loaderData.mod.id}` },
    ],
    links: [{ rel: "canonical", href: `/projects/${loaderData.mod.id}` }],
  }),
  component: ProjectPage,
  notFoundComponent: () => (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="text-center font-mono">
        <p className="text-4xl font-bold text-foreground">404</p>
        <p className="mt-2 text-sm text-muted-foreground">// project not found</p>
        <Link
          to="/"
          className="mt-6 inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
        >
          <span>&gt;</span> return to hub
        </Link>
      </div>
    </div>
  ),
});

function ProjectPage() {
  const { mod, detail } = Route.useLoaderData();

  const isLive = mod.status === "STABLE" || mod.status === "BETA";

  const categoryColors: Record<string, string> = {
    language: "bg-blue-500/20 text-blue-400 border-blue-500/30",
    framework: "bg-purple-500/20 text-purple-400 border-purple-500/30",
    tool: "bg-amber-500/20 text-amber-400 border-amber-500/30",
    infra: "bg-cyan-500/20 text-cyan-400 border-cyan-500/30",
    ai: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
  };

  return (
    <article className="mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-20">
      {/* Breadcrumb */}
      <div className="mb-8 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
        <Link to="/" className="transition-colors hover:text-foreground">
          ~/hub
        </Link>
        <span className="mx-2">/</span>
        <span className="text-foreground">projects/{mod.id}</span>
      </div>

      {/* Back link */}
      <Link
        to="/"
        className="mb-8 inline-flex items-center gap-1.5 font-mono text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="size-3.5" />
        <span>back to hub</span>
      </Link>

      {/* Header */}
      <header className="border-b border-border pb-8">
        <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-wider text-muted-foreground">
          <span>module_{mod.index}</span>
          <span>·</span>
          <span>{mod.filename}</span>
        </div>

        <h1 className="mt-3 font-mono text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
          {mod.name}
        </h1>

        <p className="mt-3 text-lg text-foreground/90">{mod.tagline}</p>

        <div className="mt-6 flex flex-wrap gap-2">
          {mod.tags.map((t) => (
            <span
              key={t}
              className="rounded border border-border bg-surface/70 px-2.5 py-1 font-mono text-xs uppercase tracking-wider text-muted-foreground"
            >
              {t}
            </span>
          ))}
        </div>
      </header>

      {/* Preview */}
      <div className="mt-8 overflow-hidden rounded-lg border border-border bg-card">
        <div className="border-b border-border bg-surface/60 px-4 py-2 font-mono text-xs uppercase tracking-wider text-muted-foreground">
          live preview
        </div>
        <div className="p-4">
          <ModulePreview kind={mod.previewKind} />
        </div>
      </div>

      {/* Description */}
      <section className="mt-10">
        <h2 className="font-mono text-lg font-semibold text-foreground">// description</h2>
        <p className="mt-3 text-base leading-relaxed text-muted-foreground">
          {detail.longDescription}
        </p>
      </section>

      {/* Highlights */}
      {detail.highlights && detail.highlights.length > 0 && (
        <section className="mt-10">
          <h2 className="font-mono text-lg font-semibold text-foreground">// ключевые моменты</h2>
          <ul className="mt-3 space-y-2">
            {detail.highlights.map((h, i) => (
              <li key={i} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                <span className="mt-0.5 shrink-0 text-terminal">⌁</span>
                <span>{h}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Tech Stack */}
      <section className="mt-10">
        <h2 className="font-mono text-lg font-semibold text-foreground">// tech stack</h2>
        <div className="mt-4 flex flex-wrap gap-2">
          {detail.techStack.map((t) => (
            <span
              key={t.name}
              className={`rounded border px-2.5 py-1 font-mono text-xs uppercase tracking-wider ${categoryColors[t.category] || "border-border bg-surface/70 text-muted-foreground"}`}
            >
              {t.name}
              <span className="ml-1.5 opacity-50">/{t.category}</span>
            </span>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="mt-10">
        <h2 className="font-mono text-lg font-semibold text-foreground">// возможности</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {detail.features.map((f) => (
            <div key={f.title} className="rounded-lg border border-border bg-card p-4">
              <h3 className="font-mono text-sm font-semibold text-foreground">{f.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                {f.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Architecture */}
      {detail.architecture && (
        <section className="mt-10">
          <h2 className="font-mono text-lg font-semibold text-foreground">// архитектура</h2>
          <div className="mt-3 rounded-lg border border-border bg-surface/40 p-4 font-mono text-sm leading-relaxed text-muted-foreground">
            <span className="text-terminal">$</span> cat architecture.md
            <p className="mt-2">{detail.architecture}</p>
          </div>
        </section>
      )}

      {/* CTAs */}
      <footer className="mt-12 flex flex-wrap gap-3 border-t border-border pt-8">
        {isLive && detail.links.live && (
          <a
            href={detail.links.live}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-3 font-mono text-sm font-medium text-primary-foreground transition-all hover:brightness-110"
          >
            <span>&gt;</span>
            launch module
            <ExternalLink className="size-3.5" />
          </a>
        )}
        {detail.links.repo && (
          <a
            href={detail.links.repo}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-md border border-border px-5 py-3 font-mono text-sm text-foreground transition-colors hover:bg-surface"
          >
            <span>&gt;</span>
            view source
          </a>
        )}
        {!isLive && (
          <span className="inline-flex items-center gap-2 rounded-md bg-surface px-5 py-3 font-mono text-sm text-muted-foreground">
            <span>&gt;</span>
            coming soon
          </span>
        )}
        <Link
          to="/"
          className="inline-flex items-center gap-2 rounded-md border border-border px-5 py-3 font-mono text-sm text-muted-foreground transition-colors hover:bg-surface hover:text-foreground"
        >
          ← back to hub
        </Link>
      </footer>
    </article>
  );
}
