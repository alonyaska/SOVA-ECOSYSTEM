import { useEffect, useState } from "react";
import type { PreviewKind } from "@/data/modules";

/** Compact live-preview shown inside each module card. */
export function ModulePreview({ kind }: { kind: PreviewKind }) {
  if (kind === "summarizer") return <SummarizerPreview />;
  if (kind === "messenger") return <MessengerPreview />;
  if (kind === "scanner") return <ScannerPreview />;
  return <ClassifiedPreview />;
}

function Frame({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="overflow-hidden rounded-md border border-border bg-background/60 font-mono text-[11px]">
      <div className="flex items-center justify-between border-b border-border px-2 py-1">
        <div className="flex items-center gap-1">
          <span className="size-1.5 rounded-full bg-destructive/60" />
          <span className="size-1.5 rounded-full bg-warn/70" />
          <span className="size-1.5 rounded-full bg-terminal/70" />
        </div>
        <span className="text-[10px] uppercase tracking-wider text-muted-foreground">{title}</span>
      </div>
      <div className="p-3 leading-relaxed">{children}</div>
    </div>
  );
}

function SummarizerPreview() {
  const [phase, setPhase] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setPhase((p) => (p + 1) % 4), 1800);
    return () => clearInterval(id);
  }, []);
  return (
    <Frame title="yt_summary.sh">
      <div className="space-y-1.5">
        <div>
          <span className="text-terminal">$</span>{" "}
          <span className="text-muted-foreground">summarize</span>{" "}
          <span className="text-primary">youtu.be/dQw4w9</span>
        </div>
        {phase >= 1 && <div className="text-muted-foreground">› extracting subs...</div>}
        {phase >= 2 && <div className="text-muted-foreground">› clustering meanings · 2.4s</div>}
        {phase >= 3 && (
          <div className="mt-1.5 space-y-0.5 border-l border-terminal/40 pl-2 text-foreground/90">
            <div>• основная мысль автора</div>
            <div>• 3 ключевых аргумента</div>
            <div>• выводы без воды</div>
          </div>
        )}
      </div>
    </Frame>
  );
}

function MessengerPreview() {
  return (
    <Frame title="sova_chat.exe">
      <div className="mb-2 flex items-center justify-between text-[10px] uppercase text-muted-foreground">
        <span className="flex items-center gap-1">
          <span className="size-1.5 animate-pulse rounded-full bg-terminal" /> e2e · dpi bypass
        </span>
        <span>p2p</span>
      </div>
      <div className="space-y-1.5">
        <div className="rounded-sm bg-surface/80 px-2 py-1">
          <span className="text-primary">dev_01:</span> рабочий канал ещё жив?
        </div>
        <div className="ml-6 rounded-sm bg-primary/15 px-2 py-1 text-right">
          <span className="text-terminal">you:</span> да, обход активен
        </div>
        <div className="text-[10px] text-muted-foreground">// handshake verified</div>
      </div>
    </Frame>
  );
}

function ScannerPreview() {
  const [pct, setPct] = useState(12);
  useEffect(() => {
    const id = setInterval(() => setPct((p) => (p >= 92 ? 12 : p + 7)), 320);
    return () => clearInterval(id);
  }, []);
  return (
    <Frame title="seotech_scan.exe">
      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground">› crawling pages</span>
          <span className="text-terminal">{pct}%</span>
        </div>
        <div className="h-1.5 overflow-hidden rounded-full bg-surface">
          <div
            className="h-full bg-gradient-to-r from-primary to-terminal transition-[width] duration-300"
            style={{ width: `${pct}%` }}
          />
        </div>
        <div className="grid grid-cols-3 gap-1 pt-1 text-[10px] uppercase tracking-wider">
          <Metric label="LCP" value="1.8s" />
          <Metric label="CLS" value="0.02" />
          <Metric label="INP" value="124ms" />
        </div>
      </div>
    </Frame>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-sm border border-border bg-surface/40 px-1.5 py-1">
      <div className="text-muted-foreground">{label}</div>
      <div className="text-foreground">{value}</div>
    </div>
  );
}

function ClassifiedPreview() {
  return (
    <Frame title="locked.bin">
      <div className="flex h-[88px] items-center justify-center">
        <div className="text-center">
          <div className="glitch font-mono text-lg font-semibold text-foreground">
            [ CLASSIFIED ]
          </div>
          <div className="mt-1 text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
            access denied · level 4
          </div>
        </div>
      </div>
    </Frame>
  );
}
