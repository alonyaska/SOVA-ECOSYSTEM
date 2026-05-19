import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";

import appCss from "../styles.css?url";
import { ThemeBootScript, ThemeProvider } from "../components/theme-provider";
import { SiteHeader } from "../components/site-header";
import { SiteFooter } from "../components/site-footer";
import { Toaster } from "../components/ui/sonner";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center font-mono">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <p className="mt-3 text-sm uppercase tracking-[0.25em] text-muted-foreground">
          // segment not found
        </p>
        <p className="mt-4 text-sm text-muted-foreground">
          Этот маршрут не существует в дереве экосистемы.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:brightness-110"
          >
            <span>&gt;</span> return to hub
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center font-mono">
        <h1 className="text-xl font-semibold text-foreground">// runtime error</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Модуль упал во время выполнения. Попробуй перезапустить.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:brightness-110"
          >
            &gt; retry
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm text-foreground transition-colors hover:bg-surface"
          >
            &gt; home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "theme-color", content: "#1a1a2e" },
      { title: "SOVA Ecosystem — независимая экосистема инструментов" },
      {
        name: "description",
        content:
          "SOVA Ecosystem — terminal-first хаб независимых инструментов: AI-саммари, E2E мессенджер, SEO-аудит. Privacy-first, open-source, AI-native.",
      },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "SOVA Ecosystem" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:title", content: "SOVA Ecosystem — независимая экосистема инструментов" },
      { name: "twitter:title", content: "SOVA Ecosystem — независимая экосистема инструментов" },
      {
        name: "description",
        content: "Sova Ecosystem Hub showcases and links to Sova's suite of applications.",
      },
      {
        property: "og:description",
        content: "Sova Ecosystem Hub showcases and links to Sova's suite of applications.",
      },
      {
        name: "twitter:description",
        content: "Sova Ecosystem Hub showcases and links to Sova's suite of applications.",
      },
      {
        property: "og:image",
        content:
          "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/6b64974d-2d5a-409a-a873-9e11036141a8/id-preview-67f4ad75--034971b7-7502-4afb-ad92-fe4a47ff7f9b.lovable.app-1779013378585.png",
      },
      {
        name: "twitter:image",
        content:
          "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/6b64974d-2d5a-409a-a873-9e11036141a8/id-preview-67f4ad75--034971b7-7502-4afb-ad92-fe4a47ff7f9b.lovable.app-1779013378585.png",
      },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&display=swap",
      },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "SOVA Ecosystem",
          description:
            "Независимая экосистема privacy-first инструментов: AI-саммари, мессенджер, SEO-аудит.",
        }),
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body>
        <ThemeBootScript />
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <div className="relative flex min-h-screen flex-col">
          <SiteHeader />
          <main className="relative flex-1">
            <Outlet />
          </main>
          <SiteFooter />
          <Toaster />
        </div>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
