import { Link } from "@tanstack/react-router";
import { Instagram, Linkedin, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="relative mt-32 border-t border-border bg-card text-foreground">
      <div className="container-page py-16">
        <div className="grid gap-12 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="font-display text-3xl md:text-4xl leading-tight max-w-md">
              Brotherhood. Professionalism. Service.
            </div>
            <p className="mt-4 text-sm text-muted-foreground max-w-sm">
              Alpha Kappa Psi · Beta Iota Chapter at The Ohio State University.
              Founded 1922.
            </p>
          </div>

          <div>
            <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-4">
              Explore
            </div>
            <ul className="space-y-2 text-sm">
              <li><Link to="/about" className="hover:text-primary transition-colors">About</Link></li>
              <li><Link to="/brothers" className="hover:text-primary transition-colors">Brothers</Link></li>
              <li><Link to="/recruitment" className="hover:text-primary transition-colors">Rush</Link></li>
              <li><Link to="/events" className="hover:text-primary transition-colors">Events</Link></li>
              <li><Link to="/alumni" className="hover:text-primary transition-colors">Alumni</Link></li>
            </ul>
          </div>

          <div>
            <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-4">
              Connect
            </div>
            <div className="flex gap-2">
              {[
                { Icon: Instagram, href: "https://instagram.com" },
                { Icon: Linkedin, href: "https://linkedin.com" },
                { Icon: Mail, href: "mailto:akpsi@osu.edu" },
              ].map(({ Icon, href }, i) => (
                <a
                  key={i}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-primary hover:border-primary hover:text-primary-foreground transition-all"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
            <p className="mt-6 text-sm text-muted-foreground">akpsi.osu@gmail.com</p>
          </div>
        </div>

        <div className="mt-16 pt-6 border-t border-border flex flex-col md:flex-row justify-between gap-2 text-xs text-muted-foreground">
          <span>© {new Date().getFullYear()} Alpha Kappa Psi, Beta Iota Chapter.</span>
          <span>Not officially affiliated with The Ohio State University.</span>
        </div>
      </div>
    </footer>
  );
}
