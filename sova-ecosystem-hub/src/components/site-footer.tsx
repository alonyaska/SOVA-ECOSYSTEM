import { Link } from "@tanstack/react-router";

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-surface/40">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="font-mono text-sm">
            <div className="flex items-center gap-2 text-muted-foreground">
              <span className="text-terminal">sys_admin@sova</span>
              <span>:</span>
              <span className="text-primary">~</span>
              <span>$</span>
              <span className="caret h-4" />
            </div>
            <p className="mt-3 max-w-md text-xs leading-relaxed text-muted-foreground">
              // независимая экосистема инструментов. open-source first. без облаков, без логов, без
              чужих API.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-x-10 gap-y-2 font-mono text-xs">
            <FooterCol title="// navigate">
              <Link to="/" className="hover:text-foreground">
                hub
              </Link>
              <Link to="/manifest" className="hover:text-foreground">
                manifest
              </Link>
              <Link to="/about" className="hover:text-foreground">
                about
              </Link>
              <Link to="/changelog" className="hover:text-foreground">
                changelog
              </Link>
              <Link to="/contact" className="hover:text-foreground">
                contact
              </Link>
            </FooterCol>
            <FooterCol title="// external">
              <a
                href="https://github.com/alonyaska"
                target="_blank"
                rel="noreferrer"
                className="hover:text-foreground"
              >
                github
              </a>
              <a
                href="https://sova-summaraizer.vercel.app/"
                target="_blank"
                rel="noreferrer"
                className="hover:text-foreground"
              >
                summarizer
              </a>
              <a
                href="https://alonyaska.github.io/SOVA-lending/"
                target="_blank"
                rel="noreferrer"
                className="hover:text-foreground"
              >
                messenger
              </a>
            </FooterCol>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-2 border-t border-border pt-4 font-mono text-[11px] uppercase tracking-wider text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <span>sova-ecosystem · v0.6.0 · build {BUILD_ID}</span>
          <span>© {new Date().getFullYear()} sova collective</span>
        </div>
      </div>
    </footer>
  );
}

const BUILD_ID = "a1c7e0";

function FooterCol({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5 text-muted-foreground">
      <span className="text-foreground">{title}</span>
      {children}
    </div>
  );
}
