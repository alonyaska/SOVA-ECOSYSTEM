import { useState, useRef, useEffect, type KeyboardEvent } from "react";
import { useNavigate } from "@tanstack/react-router";

interface Entry {
  type: "input" | "output";
  text: string;
}

const BANNER = `  ╔══════════════════════════════╗
  ║  SOVA ECOSYSTEM  v0.6.0    ║
  ║  terminal interface         ║
  ╚══════════════════════════════╝`;

const HELP_TEXT = `available commands:
  help      — show this message
  whoami    — about the developer
  ls        — list ecosystem modules
  open <id> — open module detail (e.g. open summarizer)
  contact   — show contact info
  about     — about this ecosystem
  clear     — clear terminal
  banner    — show banner`;

const WHOAMI = `role: backend / mlops developer
stack: Python, Golang, FastAPI, PostgreSQL, Docker
philosophy: privacy-first, open-source, AI-native
status: currently shipping`;

const CONTACT = `github:  github.com/alonyaska
email:   sys_admin@sova.dev
web:     sova-ecosystem-hub.vercel.app`;

const ABOUT_ECOSYSTEM = `SOVA Ecosystem — независимая коллекция privacy-first инструментов.
Каждый модуль — самостоятельный продукт с открытым исходным кодом.

Принципы:
  • privacy_first    — E2E шифрование по умолчанию, без логов
  • open_source      — весь код открыт (MIT/Apache)
  • ai_native        — AI как языковой примитив
  • anti_censorship  — обход DPI, P2P маршрутизация
  • no_cloud_lock_in — без обязательных аккаунтов`;

const MODULES = `available modules:
  summarizer     — YouTube → смысл за 2.4秒 (STABLE)
  messenger      — E2E мессенджер с обходом DPI (BETA)
  seotech        — технический SEO-аудит (SOON)
  messenger-core — следующее ядро мессенджера (CLASSIFIED)

  use: open <id> to view details`;

function processCommand(input: string): string {
  const trimmed = input.trim().toLowerCase();
  const parts = trimmed.split(/\s+/);
  const cmd = parts[0];
  const arg = parts.slice(1).join(" ");

  switch (cmd) {
    case "help":
      return HELP_TEXT;
    case "whoami":
      return WHOAMI;
    case "ls":
    case "list":
      return MODULES;
    case "open":
      if (!arg) return "error: specify module id (e.g. 'open summarizer')";
      return `navigating to /projects/${arg}...`;
    case "contact":
      return CONTACT;
    case "about":
      return ABOUT_ECOSYSTEM;
    case "clear":
      return "";
    case "banner":
      return BANNER;
    case "":
      return "";
    default:
      return `command not found: ${cmd}\ntype 'help' for available commands`;
  }
}

export function InteractiveTerminal() {
  const [entries, setEntries] = useState<Entry[]>([
    { type: "output", text: BANNER },
    { type: "output", text: "type 'help' for available commands" },
  ]);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [autoTypeIndex, setAutoTypeIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const handleCommandRef = useRef<(value: string) => void>(() => {});

  const AUTO_TYPE_TEXT = "whoami";

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [entries]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const shouldAutoType = typeof window !== "undefined" && !sessionStorage.getItem("sova_autoplayed");

  useEffect(() => {
    if (!shouldAutoType) return;
    if (autoTypeIndex >= AUTO_TYPE_TEXT.length) return;
    const timer = setTimeout(() => {
      setAutoTypeIndex((i) => i + 1);
      setInput(AUTO_TYPE_TEXT.slice(0, autoTypeIndex + 1));
    }, 100);
    return () => clearTimeout(timer);
  }, [autoTypeIndex, shouldAutoType]);

  useEffect(() => {
    if (!shouldAutoType) return;
    if (autoTypeIndex === AUTO_TYPE_TEXT.length) {
      sessionStorage.setItem("sova_autoplayed", "1");
      const timer = setTimeout(() => {
        handleCommandRef.current(AUTO_TYPE_TEXT);
      }, 600);
      return () => clearTimeout(timer);
    }
  }, [autoTypeIndex, shouldAutoType]);

  const handleCommand = (value: string) => {
    const trimmed = value.trim();
    if (!trimmed) return;

    const output = processCommand(trimmed);

    setEntries((prev) => [
      ...prev,
      { type: "input", text: `$ ${trimmed}` },
      ...(output ? [{ type: "output" as const, text: output }] : []),
    ]);

    setHistory((prev) => [...prev, trimmed]);
    setHistoryIndex(-1);
    setInput("");

    if (trimmed.startsWith("open ")) {
      const id = trimmed.split(/\s+/)[1];
      if (id) {
        setTimeout(() => navigate({ to: "/projects/$id", params: { id } }), 400);
      }
    }
  };

  handleCommandRef.current = handleCommand;

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleCommand(input);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (history.length > 0) {
        const newIndex = historyIndex === -1 ? history.length - 1 : Math.max(0, historyIndex - 1);
        setHistoryIndex(newIndex);
        setInput(history[newIndex]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex >= 0) {
        const newIndex = historyIndex + 1;
        if (newIndex >= history.length) {
          setHistoryIndex(-1);
          setInput("");
        } else {
          setHistoryIndex(newIndex);
          setInput(history[newIndex]);
        }
      }
    }
  };

  return (
    <div
      className="rounded-lg border border-border bg-card shadow-2xl shadow-primary/5"
      onClick={() => inputRef.current?.focus()}
    >
      {/* Terminal header */}
      <div className="flex items-center justify-between gap-2 border-b border-border px-3 py-2">
        <div className="flex items-center gap-1.5">
          <span className="size-2.5 rounded-full bg-destructive/70" />
          <span className="size-2.5 rounded-full bg-warn/80" />
          <span className="size-2.5 rounded-full bg-terminal/80" />
        </div>
        <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
          sova_terminal
        </span>
        <span className="size-4" />
      </div>

      {/* Terminal body */}
      <div
        ref={scrollRef}
        className="h-72 overflow-y-auto p-4 font-mono text-[13px] leading-relaxed"
      >
        {entries.map((entry, i) => (
          <div
            key={i}
            className={
              entry.type === "input"
                ? "text-foreground/90"
                : "whitespace-pre-wrap text-muted-foreground"
            }
          >
            {entry.text}
          </div>
        ))}

        {/* Input line */}
        <div className="mt-1 flex items-center text-foreground/90">
          <span className="mr-1 shrink-0 text-terminal">$</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="min-w-0 flex-1 bg-transparent outline-none"
            spellCheck={false}
            autoComplete="off"
            aria-label="Terminal input"
          />
          <span className="ml-px h-4 w-2 animate-pulse bg-terminal" />
        </div>
      </div>
    </div>
  );
}
