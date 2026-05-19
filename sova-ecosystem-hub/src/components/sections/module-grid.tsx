import { useState, useMemo } from "react";
import { modules as allModules } from "@/data/modules";
import type { ModuleStatus } from "@/data/modules";
import { ModuleCard } from "../module-card";

const STATUS_ORDER: (ModuleStatus | "ALL")[] = ["ALL", "STABLE", "BETA", "WIP", "SOON"];

export function ModuleGrid() {
  const [filter, setFilter] = useState<ModuleStatus | "ALL">("ALL");
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    return allModules.filter((m) => {
      const matchStatus = filter === "ALL" || m.status === filter;
      const matchSearch =
        !search ||
        m.name.toLowerCase().includes(search.toLowerCase()) ||
        m.tags.some((t) => t.toLowerCase().includes(search.toLowerCase())) ||
        m.tagline.toLowerCase().includes(search.toLowerCase());
      return matchStatus && matchSearch;
    });
  }, [filter, search]);

  return (
    <section id="modules" className="border-b border-border">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24">
        <SectionHeader
          eyebrow="// modules"
          title="Активные узлы экосистемы"
          subtitle="Каждый модуль — самостоятельный продукт. Запускай напрямую, без регистрации, без облака посередине."
        />

        {/* Filters */}
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <div className="flex flex-wrap gap-1 rounded-lg border border-border bg-card p-1">
            {STATUS_ORDER.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setFilter(s)}
                className={`rounded-md px-3 py-1.5 font-mono text-xs uppercase tracking-wider transition-colors ${
                  filter === s
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {s === "ALL" ? "all" : s.toLowerCase()}
              </button>
            ))}
          </div>

          <input
            type="text"
            placeholder="поиск по имени или тегам..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 rounded-lg border border-border bg-card px-3 py-1.5 font-mono text-xs text-foreground placeholder:text-muted-foreground/50 focus:border-primary focus:outline-none sm:max-w-xs"
          />
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          {filtered.map((m, i) => (
            <ModuleCard key={m.id} mod={m} i={i} />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="mt-12 text-center font-mono text-sm text-muted-foreground">
            <p>// no modules match your filter</p>
          </div>
        )}
      </div>
    </section>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="max-w-3xl">
      <div className="font-mono text-xs uppercase tracking-[0.2em] text-terminal">{eyebrow}</div>
      <h2 className="mt-3 font-mono text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
        {title}
      </h2>
      {subtitle && <p className="mt-3 text-base text-muted-foreground">{subtitle}</p>}
    </div>
  );
}
