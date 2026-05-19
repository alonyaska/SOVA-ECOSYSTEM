import { createFileRoute, Link } from "@tanstack/react-router";
import { ContactForm } from "@/components/contact-form";

const channels = [
  {
    label: "github",
    handle: "@alonyaska",
    href: "https://github.com/alonyaska",
    note: "исходники, issue, contributions",
  },
  {
    label: "summarizer",
    handle: "sova-summaraizer.vercel.app",
    href: "https://sova-summaraizer.vercel.app/",
    note: "live demo · module_01",
  },
  {
    label: "messenger",
    handle: "alonyaska.github.io/SOVA-lending",
    href: "https://alonyaska.github.io/SOVA-lending/",
    note: "live demo · module_02",
  },
  {
    label: "email",
    handle: "sys_admin@sova.dev",
    href: "mailto:sys_admin@sova.dev",
    note: "общие вопросы, партнёрства",
  },
];

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — SOVA Ecosystem" },
      {
        name: "description",
        content:
          "Контакты SOVA Ecosystem: GitHub, email, прямые ссылки на модули. Связь без чужих платформ.",
      },
      { property: "og:title", content: "Contact — SOVA Ecosystem" },
      {
        property: "og:description",
        content: "Контакты SOVA Ecosystem: GitHub, email, прямые ссылки на модули.",
      },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-20 sm:px-6 sm:py-28">
      <div className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
        ~/sova/contact
      </div>
      <h1 className="mt-3 font-mono text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
        // contact
      </h1>
      <p className="mt-4 text-base text-muted-foreground">
        Прямые каналы связи. Никаких CRM посередине.
      </p>

      <div className="mt-10 overflow-hidden rounded-lg border border-border bg-card font-mono">
        <div className="flex items-center justify-between border-b border-border bg-surface/60 px-4 py-2 text-[11px] uppercase tracking-wider text-muted-foreground">
          <span>channels.json</span>
          <span>{channels.length} entries</span>
        </div>
        <ul className="divide-y divide-border">
          {channels.map((c) => (
            <li key={c.label}>
              <a
                href={c.href}
                target={c.href.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer"
                className="group flex items-center gap-4 px-4 py-4 transition-colors hover:bg-surface/40"
              >
                <span className="w-24 shrink-0 text-[11px] uppercase tracking-wider text-muted-foreground">
                  {c.label}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm text-foreground transition-colors group-hover:text-primary">
                    {c.handle}
                  </div>
                  <div className="mt-0.5 text-[11px] text-muted-foreground">// {c.note}</div>
                </div>
                <span className="text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary">
                  →
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* Contact form */}
      <div className="mt-10 rounded-lg border border-border bg-card p-6">
        <div className="mb-1 font-mono text-xs uppercase tracking-wider text-muted-foreground">
          // send message
        </div>
        <h3 className="font-mono text-lg font-semibold text-foreground">Написать напрямую</h3>
        <p className="mt-1 text-sm text-muted-foreground">
          Без регистрации, без очереди. Сообщение упадёт мне на почту.
        </p>
        <div className="mt-5">
          <ContactForm />
        </div>
      </div>

      <div className="mt-10 rounded-lg border border-border bg-surface/40 p-5 font-mono text-sm text-muted-foreground">
        <div>
          <span className="text-terminal">$</span> whoami
        </div>
        <div className="mt-1 text-foreground">sova_collective · independent dev group</div>
        <div className="mt-3">
          <span className="text-terminal">$</span> uptime
        </div>
        <div className="mt-1 text-foreground">since 2024 · still shipping</div>
      </div>
    </section>
  );
}
