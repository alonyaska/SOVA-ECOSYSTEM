import { createFileRoute, Link } from "@tanstack/react-router";
import { ExternalLink } from "lucide-react";
import { SkillsGrid } from "@/components/sections/skills-grid";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — SOVA Ecosystem" },
      {
        name: "description",
        content: "О разработчике SOVA Ecosystem: стек технологий, опыт, философия разработки.",
      },
      { property: "og:title", content: "About — SOVA Ecosystem" },
      {
        property: "og:description",
        content: "О разработчике SOVA Ecosystem: стек, опыт, философия.",
      },
      { property: "og:url", content: "/about" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: AboutPage,
});

const experience = [
  {
    period: "2024 — present",
    title: "Independent Developer",
    org: "SOVA Collective",
    description:
      "Разработка экосистемы privacy-first инструментов: AI-саммари, E2E-мессенджер, SEO-аудит.",
  },
  {
    period: "2022 — 2024",
    title: "Full-Stack Developer",
    org: "Product Company",
    description:
      "Разработка высоконагруженных веб-приложений, архитектура микросервисов, внедрение TypeScript в legacy-проекты.",
  },
];

function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-20">
      {/* Breadcrumb */}
      <div className="mb-8 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
        <Link to="/" className="transition-colors hover:text-foreground">
          ~/hub
        </Link>
        <span className="mx-2">/</span>
        <span className="text-foreground">about</span>
      </div>

      {/* Bio */}
      <section>
        <div className="font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">
          ~/sova/whoami
        </div>
        <h1 className="mt-3 font-mono text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
          // about
        </h1>

        <div className="mt-8 grid gap-10 lg:grid-cols-[1.3fr_1fr]">
          <div className="space-y-4 text-base leading-relaxed text-muted-foreground">
            <p>
              Привет. Я — независимый разработчик, создающий инструменты, которые не собирают
              данные, не требуют регистрации и работают там, где другие молчат.
            </p>
            <p>
              SOVA Ecosystem — это не компания и не стартап. Это коллекция проектов, объединённых
              одной философией: приватность по умолчанию, открытый исходный код, AI без облачной
              зависимости.
            </p>
            <p>
              Пишу на Python и Golang. Строю бэкенд на FastAPI. Фронтенд генерирую через AI-агентов.
              Считаю, что хороший инструмент не должен ничего просить взамен.
            </p>
          </div>

          <div className="rounded-lg border border-border bg-card p-5 font-mono text-sm">
            <div className="flex items-center gap-2 text-terminal">
              <span>$</span>
              <span>cat about.md</span>
            </div>
            <div className="mt-4 space-y-2 text-muted-foreground">
              <p>name: &lt;not important&gt;</p>
              <p>role: backend / mlops dev</p>
              <p>since: 2022</p>
              <p>stack: python, golang, fastapi</p>
              <p>philosophy: privacy-first</p>
              <p>status: shipping</p>
            </div>
          </div>
        </div>
      </section>

      {/* Experience */}
      <section className="mt-16">
        <h2 className="font-mono text-lg font-semibold text-foreground">// опыт</h2>
        <div className="mt-6 space-y-0">
          {experience.map((exp, i) => (
            <div key={i} className="relative border-l border-border pl-6 pb-8 last:pb-0">
              <div className="absolute left-0 top-1 size-2.5 -translate-x-1/2 rounded-full border-2 border-primary bg-background" />
              <div className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                {exp.period}
              </div>
              <div className="mt-1 font-mono text-base font-semibold text-foreground">
                {exp.title}
              </div>
              <div className="mt-0.5 font-mono text-sm text-primary">{exp.org}</div>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {exp.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Skills */}
      <div className="mt-16">
        <SkillsGrid />
      </div>

      {/* Resume section */}
      <section className="mt-16">
        <h2 className="font-mono text-lg font-semibold text-foreground">// resume</h2>
        <div className="mt-4 rounded-lg border border-border bg-card p-5 font-mono text-sm">
          <div className="flex items-center gap-2 text-terminal">
            <span>$</span>
            <span>cat resume.md</span>
          </div>
          <div className="mt-4 space-y-3 text-muted-foreground">
            <p>
              <span className="text-foreground">role:</span> Backend / MLOps Developer
            </p>
            <p>
              <span className="text-foreground">location:</span> Remote
            </p>
            <p>
              <span className="text-foreground">languages:</span> Python, Golang, SQL
            </p>
            <p>
              <span className="text-foreground">frameworks:</span> FastAPI, PostgreSQL, Redis, Docker
            </p>
            <p>
              <span className="text-foreground">tools:</span> Docker, Git, CI/CD
            </p>
            <p>
              <span className="text-foreground">ai:</span> Gemini, Claude
            </p>
            <p>
              <span className="text-foreground">domains:</span> Backend architecture, MLOps,
              Privacy-first apps, AI/ML integration
            </p>
          </div>
          <div className="mt-4 flex gap-3">
            <span className="rounded bg-surface px-2 py-1 text-xs text-muted-foreground">
              exp: 4+ years
            </span>
            <span className="rounded bg-surface px-2 py-1 text-xs text-muted-foreground">
              stack: backend-first
            </span>
            <span className="rounded bg-surface px-2 py-1 text-xs text-muted-foreground">
              frontend: via AI agents
            </span>
          </div>
        </div>
        <div className="mt-4">
          <button
            type="button"
            onClick={() => window.print()}
            className="inline-flex items-center gap-2 rounded-md border border-border px-4 py-2 font-mono text-sm text-foreground transition-colors hover:bg-surface"
          >
            <span>&gt;</span>
            download cv (pdf)
          </button>
        </div>
      </section>

      {/* CTA */}
      <div className="mt-16 flex flex-wrap gap-3 rounded-lg border border-border bg-card p-6">
        <div className="flex-1">
          <div className="font-mono text-sm font-semibold text-foreground">
            Хочешь обсудить проект?
          </div>
          <p className="mt-1 text-sm text-muted-foreground">
            Открыт к коллаборациям и консультациям.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 font-mono text-sm font-medium text-primary-foreground transition-all hover:brightness-110"
          >
            <span>&gt;</span>
            contact
          </Link>
          <a
            href="https://github.com/alonyaska"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-md border border-border px-4 py-2 font-mono text-sm text-foreground transition-colors hover:bg-surface"
          >
            <span>&gt;</span>
            github
            <ExternalLink className="size-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
}
