import { useTheme, type Theme } from "./theme-provider";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const opts: { value: Theme; label: string }[] = [
    { value: "hardcore", label: "hardcore" },
    { value: "soft", label: "soft" },
  ];
  return (
    <div className="inline-flex items-center gap-1 rounded-md border border-border bg-surface p-1 font-mono text-[11px] uppercase tracking-wider">
      <span className="px-2 text-muted-foreground">mode:</span>
      {opts.map((o) => {
        const active = theme === o.value;
        return (
          <button
            key={o.value}
            type="button"
            onClick={() => setTheme(o.value)}
            className={
              "rounded px-2 py-1 transition-colors " +
              (active
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground")
            }
            aria-pressed={active}
          >
            [ {o.label} ]
          </button>
        );
      })}
    </div>
  );
}
