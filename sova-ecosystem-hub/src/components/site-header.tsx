import { Link } from "@tanstack/react-router";
import { ThemeToggle } from "./theme-toggle";
import { MobileNav } from "./mobile-nav";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur supports-[backdrop-filter]:bg-background/65">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between gap-3 px-4 sm:px-6">
        <Link to="/" className="group flex items-center gap-2 font-mono text-sm">
          <span className="text-muted-foreground">&lt;</span>
          <img
            src="https://sova-summaraizer.vercel.app/sova-logo.jpg"
            alt="SOVA"
            className="h-6 w-6 rounded-full object-cover transition-colors group-hover:brightness-110"
          />
          <span className="font-semibold tracking-wide">SOVA</span>
          <span className="text-muted-foreground">/ecosystem&gt;</span>
        </Link>

        <nav className="hidden items-center gap-1 font-mono text-xs uppercase tracking-wider md:flex">
          <NavLink to="/" label="hub" />
          <NavLink to="/manifest" label="manifest" />
          <NavLink to="/about" label="about" />
          <NavLink to="/changelog" label="changelog" />
          <NavLink to="/contact" label="contact" />
        </nav>

        <div className="flex items-center gap-3">
          <span className="hidden items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider text-muted-foreground sm:inline-flex">
            <span className="size-2 animate-pulse rounded-full bg-terminal" />
            sys.online
          </span>
          <ThemeToggle />
          <MobileNav />
        </div>
      </div>
    </header>
  );
}

function NavLink({ to, label }: { to: string; label: string }) {
  return (
    <Link
      to={to}
      className="rounded px-3 py-1.5 text-muted-foreground transition-colors hover:bg-surface hover:text-foreground"
      activeProps={{ className: "text-foreground bg-surface" }}
      activeOptions={{ exact: to === "/" }}
    >
      // {label}
    </Link>
  );
}
