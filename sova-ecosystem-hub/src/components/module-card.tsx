import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Star, GitFork } from "lucide-react";
import type { ModuleStatus, SovaModule } from "@/data/modules";
import { useGitHubStats } from "@/hooks/use-github-stats";
import { ModulePreview } from "./module-preview";

const STATUS_STYLES: Record<ModuleStatus, { dot: string; label: string }> = {
  STABLE: { dot: "bg-terminal", label: "text-terminal" },
  BETA: { dot: "bg-warn", label: "text-warn" },
  WIP: { dot: "bg-primary", label: "text-primary" },
  SOON: { dot: "bg-muted-foreground", label: "text-muted-foreground" },
};

export function ModuleCard({ mod, i }: { mod: SovaModule; i: number }) {
  const isLive = mod.status === "STABLE" || mod.status === "BETA";
  const statusStyle = STATUS_STYLES[mod.status];

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: i * 0.08, ease: "easeOut" }}
      className="group relative flex flex-col overflow-hidden rounded-lg border border-border bg-card shadow-lg shadow-black/20 transition-all duration-300 hover:border-primary/60 hover:shadow-primary/10"
    >
      {/* hover scanline accent */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      {/* Card header — window chrome */}
      <header className="flex items-center justify-between gap-3 border-b border-border px-4 py-2.5">
        <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider">
          <span className="text-muted-foreground">module_{mod.index}</span>
          <span className="text-muted-foreground">·</span>
          <span className="text-foreground/80">{mod.filename}</span>
        </div>
        <div className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider">
          <span
            className={`size-1.5 rounded-full ${statusStyle.dot} ${isLive ? "animate-pulse" : ""}`}
          />
          <span className={statusStyle.label}>{mod.status}</span>
        </div>
      </header>

      {/* Body */}
      <div className="flex flex-1 flex-col gap-4 p-5">
        <div>
          <h3 className="font-mono text-xl font-semibold text-foreground sm:text-2xl">
            {mod.name}
          </h3>
          <p className="mt-1.5 text-sm font-medium text-foreground/90">{mod.tagline}</p>
        </div>

        <ModulePreview kind={mod.previewKind} />

        <p className="text-sm leading-relaxed text-muted-foreground">{mod.description}</p>

        <div className="flex flex-wrap items-center gap-2 pt-1">
          {mod.tags.map((t) => (
            <span
              key={t}
              className="rounded border border-border bg-surface/70 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-muted-foreground"
            >
              {t}
            </span>
          ))}
          <span className="ml-auto font-mono text-[11px] text-terminal">⌁ {mod.hookMetric}</span>
        </div>
      </div>

      <GitHubStatsRow repoUrl={mod.repo} />

      {/* Footer / CTAs */}
      <footer className="flex items-stretch gap-px border-t border-border bg-border">
        <Link
          to="/projects/$id"
          params={{ id: mod.id }}
          className="group/btn flex flex-1 items-center justify-center gap-2 bg-primary px-4 py-3 font-mono text-sm font-medium text-primary-foreground transition-all hover:brightness-110"
        >
          <span className="text-primary-foreground/70">&gt;</span>
          view details
          <span className="transition-transform group-hover/btn:translate-x-1">→</span>
        </Link>
        {isLive && mod.url ? (
          <a
            href={mod.url}
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center gap-1.5 bg-card px-4 py-3 font-mono text-xs text-muted-foreground transition-colors hover:text-foreground"
          >
            <span>&gt;</span> launch
          </a>
        ) : (
          <span className="flex items-center justify-center gap-1.5 bg-card px-4 py-3 font-mono text-xs text-muted-foreground">
            <span>&gt;</span> {mod.status === "SOON" ? "soon" : "wip"}
          </span>
        )}
        {mod.repo && (
          <a
            href={mod.repo}
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center gap-1.5 bg-card px-4 py-3 font-mono text-xs text-muted-foreground transition-colors hover:text-foreground"
          >
            <span>&gt;</span> repo
          </a>
        )}
      </footer>
    </motion.article>
  );
}

function GitHubStatsRow({ repoUrl }: { repoUrl?: string }) {
  const { data, isLoading, isError } = useGitHubStats(repoUrl);

  if (!repoUrl || (!isLoading && isError)) return null;

  return (
    <div className="flex items-center gap-3 border-t border-border px-5 py-2 font-mono text-[11px] text-muted-foreground">
      {isLoading ? (
        <span className="animate-pulse">loading stats...</span>
      ) : data ? (
        <>
          {data.language && (
            <span className="flex items-center gap-1">
              <span className="size-2 rounded-full bg-primary" />
              {data.language}
            </span>
          )}
          <span className="flex items-center gap-1">
            <Star className="size-3" />
            {data.stars}
          </span>
          <span className="flex items-center gap-1">
            <GitFork className="size-3" />
            {data.forks}
          </span>
        </>
      ) : null}
    </div>
  );
}
