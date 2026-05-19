export function SystemStats() {
  const stats = [
    { label: "uptime", value: "99.97%" },
    { label: "modules.online", value: "02 / 04" },
    { label: "last.deploy", value: "2d 14h" },
    { label: "build", value: "#a1c7e0" },
    { label: "region", value: "edge·global" },
  ];
  return (
    <section className="border-b border-border bg-surface/40">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-x-8 gap-y-3 px-4 py-5 font-mono text-[11px] uppercase tracking-wider sm:px-6">
        <div className="flex items-center gap-2 text-muted-foreground">
          <span className="size-1.5 animate-pulse rounded-full bg-terminal" />
          system.status
        </div>
        {stats.map((s) => (
          <div key={s.label} className="flex items-baseline gap-2">
            <span className="text-muted-foreground">{s.label}</span>
            <span className="text-foreground">= {s.value}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
