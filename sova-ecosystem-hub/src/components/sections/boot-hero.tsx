import { InteractiveTerminal } from "../interactive-terminal";
import { BinaryText } from "@/components/text/binary-text";

export function BootHero() {
  return (
    <section className="relative overflow-hidden border-b border-border">
      <div className="bg-grid" />
      <div className="relative z-10 mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28">
        <div className="mb-8 flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
          <span className="size-1.5 rounded-full bg-terminal" />
          ~/sova/ecosystem/root
        </div>

        <div className="grid items-end gap-10 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <h1 className="font-mono text-4xl font-semibold leading-[1.05] tracking-tight sm:text-6xl">
              <span className="text-muted-foreground">//</span>{" "}
              <span className="text-foreground">
                <BinaryText text="SOVA" />
              </span>
              <span className="text-primary">_</span>
              <span className="text-foreground">
                <BinaryText text="ECOSYSTEM" />
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-base text-muted-foreground sm:text-lg">
              Независимая экосистема инструментов нового поколения. Каждый модуль — отдельный
              проект, объединённый одной философией:{" "}
              <span className="text-foreground">privacy-first, AI-native, open-source</span>.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-3">
              <a
                href="#modules"
                className="group inline-flex items-center gap-2 rounded-md bg-primary px-5 py-3 font-mono text-sm font-medium text-primary-foreground transition-all hover:brightness-110"
              >
                <span className="text-primary-foreground/70">&gt;</span>
                explore modules
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </a>
              <a
                href="https://github.com/alonyaska"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-md border border-border px-5 py-3 font-mono text-sm text-foreground transition-colors hover:bg-surface"
              >
                <span className="text-muted-foreground">&gt;</span>
                view source
              </a>
            </div>
          </div>

          {/* Interactive terminal panel */}
          <InteractiveTerminal />
        </div>
      </div>
    </section>
  );
}
