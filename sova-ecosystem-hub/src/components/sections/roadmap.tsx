import { SectionHeader } from "./module-grid";

type Status = "DONE" | "BETA" | "WIP" | "PLAN";

const entries: { version: string; status: Status; title: string; date: string }[] = [
  { version: "v0.4", status: "DONE", title: "summarizer · public launch", date: "2025-11" },
  { version: "v0.5", status: "BETA", title: "messenger · beta + DPI bypass", date: "2026-01" },
  { version: "v0.6", status: "WIP", title: "ecosystem hub · this page", date: "2026-05" },
  { version: "v0.7", status: "PLAN", title: "seotech analyze · early access", date: "Q2 2026" },
  { version: "v0.8", status: "PLAN", title: "sova-id · unified auth", date: "Q3 2026" },
];

const STATUS_COLOR: Record<Status, string> = {
  DONE: "text-terminal",
  BETA: "text-warn",
  WIP: "text-primary",
  PLAN: "text-muted-foreground",
};

export function Roadmap() {
  return (
    <section className="border-b border-border">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24">
        <SectionHeader
          eyebrow="// roadmap"
          title="git log --oneline"
          subtitle="Куда движется экосистема. Дорожная карта обновляется по мере выхода релизов."
        />

        <div className="mt-10 overflow-hidden rounded-lg border border-border bg-card font-mono text-sm">
          <div className="flex items-center justify-between border-b border-border bg-surface/60 px-4 py-2 text-[11px] uppercase tracking-wider text-muted-foreground">
            <span>~/sova/roadmap.log</span>
            <span>5 commits</span>
          </div>
          <div className="divide-y divide-border">
            {entries.map((e) => (
              <div
                key={e.version}
                className="grid grid-cols-[auto_auto_1fr_auto] items-center gap-3 px-4 py-3 transition-colors hover:bg-surface/40 sm:gap-6"
              >
                <span className="text-muted-foreground">*</span>
                <span className="font-semibold text-foreground">{e.version}</span>
                <span className="flex items-center gap-3 truncate text-foreground/90">
                  <span className={`text-[11px] uppercase ${STATUS_COLOR[e.status]}`}>
                    [{e.status}]
                  </span>
                  <span className="truncate">{e.title}</span>
                </span>
                <span className="text-[11px] uppercase tracking-wider text-muted-foreground">
                  {e.date}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
