import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/brothers", label: "Our Members" },
  { to: "/recruitment", label: "Rush" },
  { to: "/contact", label: "Contact" },
] as const;

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const { location } = useRouterState();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${scrolled ? "bg-background/95 shadow-sm py-2" : "bg-transparent py-4"}`}>
      <div className="container-page flex flex-wrap items-center justify-between gap-4 px-0">
        <Link to="/" className="text-sm font-semibold text-foreground">
          AKPsi Mu Chapter
        </Link>

        <nav className="flex flex-wrap items-center gap-4 text-sm text-foreground/80">
          {links.map((l) => {
            const active = location.pathname === l.to;
            return (
              <Link
                key={l.to}
                to={l.to}
                className={`px-2 py-2 ${active ? "font-semibold text-foreground" : "hover:text-foreground"}`}
              >
                {l.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
