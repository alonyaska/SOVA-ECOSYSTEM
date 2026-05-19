import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";

const navItems = [
  { to: "/", label: "hub" },
  { to: "/projects", label: "projects" },
  { to: "/manifest", label: "manifest" },
  { to: "/about", label: "about" },
  { to: "/changelog", label: "changelog" },
  { to: "/contact", label: "contact" },
];

export function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex size-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-surface hover:text-foreground"
        aria-label={open ? "Close menu" : "Open menu"}
      >
        {open ? <X className="size-4" /> : <Menu className="size-4" />}
      </button>

      {open && (
        <>
          <div
            className="fixed inset-0 z-40 bg-background/60 backdrop-blur"
            onClick={() => setOpen(false)}
          />
          <nav className="fixed inset-x-0 top-14 z-50 border-b border-border bg-background px-4 pb-6 pt-4 shadow-xl">
            <ul className="space-y-1">
              {navItems.map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    onClick={() => setOpen(false)}
                    className="flex rounded-md px-3 py-2.5 font-mono text-sm text-muted-foreground transition-colors hover:bg-surface hover:text-foreground"
                    activeProps={{ className: "text-foreground bg-surface" }}
                    activeOptions={{ exact: item.to === "/" }}
                  >
                    <span className="mr-2 text-terminal">&gt;</span>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </>
      )}
    </div>
  );
}
