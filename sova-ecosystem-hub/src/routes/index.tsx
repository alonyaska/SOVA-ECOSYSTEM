import { createFileRoute } from "@tanstack/react-router";
import { BootHero } from "@/components/sections/boot-hero";
import { SystemStats } from "@/components/sections/system-stats";
import { ModuleGrid } from "@/components/sections/module-grid";
import { ManifestPreview } from "@/components/sections/manifest-preview";
import { Roadmap } from "@/components/sections/roadmap";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SOVA Ecosystem — terminal hub" },
      {
        name: "description",
        content:
          "Хаб независимой экосистемы SOVA: AI-саммари YouTube, E2E мессенджер с обходом DPI, SEO-аудит. Все модули в одном терминале.",
      },
      { property: "og:title", content: "SOVA Ecosystem — terminal hub" },
      {
        property: "og:description",
        content:
          "Хаб независимой экосистемы SOVA: AI-саммари YouTube, E2E мессенджер с обходом DPI, SEO-аудит.",
      },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <BootHero />
      <SystemStats />
      <ModuleGrid />
      <ManifestPreview />
      <Roadmap />
    </>
  );
}
