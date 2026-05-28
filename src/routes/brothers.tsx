import { createFileRoute } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { Linkedin, Search, X } from "lucide-react";
import { useMemo, useState } from "react";
import { brothers, FILTERS, type Brother } from "@/lib/brothers";
import { Input } from "@/components/ui/input";
import { Reveal } from "@/components/Reveal";
import { SectionLabel } from "@/components/SectionLabel";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/brothers")({
  head: () => ({
    meta: [
      { title: "Brothers · Alpha Kappa Psi Ohio State" },
      { name: "description", content: "Meet the active brothers of Mu Chapter — search by major, year, industry, and leadership role." },
      { property: "og:title", content: "Brothers · AKPsi Ohio State" },
      { property: "og:description", content: "120+ active brothers driving careers across banking, consulting, tech, and more." },
    ],
  }),
  component: BrothersPage,
});

type Filter = { years: string[]; industries: string[]; roles: string[] };

function BrothersPage() {
  const [q, setQ] = useState("");
  const [filters, setFilters] = useState<Filter>({ years: [], industries: [], roles: [] });
  const [selected, setSelected] = useState<Brother | null>(null);

  const filtered = useMemo(() => {
    const query = q.toLowerCase().trim();
    return brothers.filter((b) => {
      if (query) {
        const hay = `${b.name} ${b.major} ${b.industry} ${b.internship ?? ""} ${b.role ?? ""}`.toLowerCase();
        if (!hay.includes(query)) return false;
      }
      if (filters.years.length && !filters.years.includes(b.year)) return false;
      if (filters.industries.length && !filters.industries.includes(b.industry)) return false;
      if (filters.roles.length && (!b.role || !filters.roles.includes(b.role))) return false;
      return true;
    });
  }, [q, filters]);

  const toggle = (key: keyof Filter, val: string) => {
    setFilters((f) => ({
      ...f,
      [key]: f[key].includes(val) ? f[key].filter((v) => v !== val) : [...f[key], val],
    }));
  };

  const activeCount = filters.years.length + filters.industries.length + filters.roles.length;

  return (
    <>
      <section className="pt-40 pb-12 container-page">
        <Reveal>
          <SectionLabel>The chapter</SectionLabel>
          <h1 className="mt-4 font-display text-[clamp(3rem,7vw,6rem)] leading-[0.95] text-balance">
            Meet the <span className="italic text-primary">brothers.</span>
          </h1>
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl">
            120 active brothers across every major and industry. Search, filter, and
            click any card to learn more.
          </p>
        </Reveal>
      </section>

      <section className="container-page pb-8">
        <div className="sticky top-24 z-20 glass-light rounded-2xl p-4 md:p-5 shadow-card">
          <div className="flex flex-col gap-4">
            <div className="relative">
              <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search by name, major, company, role…"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                className="pl-11 h-12 rounded-full border-border/60 bg-background/70"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              <FilterGroup label="Year" options={FILTERS.years as readonly string[]} active={filters.years} onToggle={(v) => toggle("years", v)} />
              <FilterGroup label="Industry" options={FILTERS.industries} active={filters.industries} onToggle={(v) => toggle("industries", v)} />
              <FilterGroup label="Role" options={FILTERS.roles} active={filters.roles} onToggle={(v) => toggle("roles", v)} />
              {activeCount > 0 && (
                <button
                  onClick={() => setFilters({ years: [], industries: [], roles: [] })}
                  className="ml-auto text-xs uppercase tracking-wider text-primary hover:underline"
                >
                  Clear {activeCount} filter{activeCount > 1 ? "s" : ""}
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="container-page pb-32">
        <div className="mb-6 text-sm text-muted-foreground">
          Showing <span className="text-foreground font-semibold">{filtered.length}</span> of {brothers.length} brothers
        </div>

        <motion.div layout className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <AnimatePresence mode="popLayout">
            {filtered.map((b, i) => (
              <BrotherCard key={b.id} brother={b} onClick={() => setSelected(b)} index={i} />
            ))}
          </AnimatePresence>
        </motion.div>

        {filtered.length === 0 && (
          <div className="text-center py-20 text-muted-foreground">
            <p className="font-display text-3xl">No brothers match.</p>
            <p className="mt-2 text-sm">Try clearing some filters.</p>
          </div>
        )}
      </section>

      <BrotherModal brother={selected} onClose={() => setSelected(null)} />
    </>
  );
}

function FilterGroup({
  label, options, active, onToggle,
}: { label: string; options: readonly string[]; active: string[]; onToggle: (v: string) => void }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className={`px-4 h-9 rounded-full text-sm font-medium border transition-colors ${
          active.length
            ? "bg-primary text-primary-foreground border-primary"
            : "bg-background border-border hover:border-foreground/30"
        }`}
      >
        {label} {active.length > 0 && <span className="ml-1 opacity-80">· {active.length}</span>}
      </button>
      <AnimatePresence>
        {open && (
          <>
            <div className="fixed inset-0 z-30" onClick={() => setOpen(false)} />
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.15 }}
              className="absolute left-0 top-11 z-40 min-w-[220px] max-h-[300px] overflow-y-auto bg-popover border border-border rounded-xl p-2 shadow-card"
            >
              {options.map((o) => {
                const on = active.includes(o);
                return (
                  <button
                    key={o}
                    onClick={() => onToggle(o)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm flex items-center justify-between transition-colors ${
                      on ? "bg-primary/10 text-primary" : "hover:bg-accent"
                    }`}
                  >
                    {o}
                    {on && <span className="text-xs">✓</span>}
                  </button>
                );
              })}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

function BrotherCard({ brother, onClick, index }: { brother: Brother; onClick: () => void; index: number }) {
  // Deterministic gradient per brother for placeholder headshot
  const hues = [12, 18, 22, 350, 6, 28];
  const hue = hues[index % hues.length];
  const initials = brother.name.split(" ").map((n) => n[0]).join("").slice(0, 2);

  return (
    <motion.button
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4, delay: Math.min(index * 0.03, 0.3) }}
      whileHover={{ y: -6 }}
      onClick={onClick}
      className="group text-left bg-card rounded-2xl overflow-hidden border border-border hover:border-primary/40 hover:shadow-card transition-all"
    >
      <div className="aspect-[4/5] relative overflow-hidden">
        <div
          className="absolute inset-0 transition-transform duration-700 group-hover:scale-105"
          style={{ background: `linear-gradient(135deg, oklch(0.3 0.15 ${hue}), oklch(0.15 0.05 ${hue + 10}))` }}
        />
        <div className="absolute inset-0 flex items-center justify-center font-display text-7xl text-white/80">
          {initials}
        </div>
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/70 to-transparent" />
        {brother.role && (
          <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-primary text-primary-foreground text-[10px] uppercase tracking-wider font-semibold">
            Exec
          </div>
        )}
        <div className="absolute bottom-3 left-4 right-4 text-white">
          <div className="font-display text-xl leading-tight">{brother.name}</div>
          <div className="text-[11px] uppercase tracking-wider opacity-80 mt-0.5">{brother.year} · {brother.major}</div>
        </div>
      </div>
      <div className="p-4 flex items-center justify-between">
        <div className="text-xs text-muted-foreground truncate">{brother.internship ?? brother.industry}</div>
        <span className="text-xs text-primary font-semibold opacity-0 group-hover:opacity-100 transition-opacity">View →</span>
      </div>
    </motion.button>
  );
}

function BrotherModal({ brother, onClose }: { brother: Brother | null; onClose: () => void }) {
  const initials = brother?.name.split(" ").map((n) => n[0]).join("").slice(0, 2) ?? "";
  return (
    <Dialog open={!!brother} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-2xl p-0 overflow-hidden border-border rounded-2xl">
        {brother && (
          <div className="grid sm:grid-cols-[200px_1fr]">
            <div className="relative aspect-[4/5] sm:aspect-auto bg-gradient-to-br from-primary to-[color:var(--scarlet-deep)] flex items-center justify-center">
              <div className="font-display text-7xl text-white/90">{initials}</div>
            </div>
            <div className="p-7">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="font-display text-3xl leading-tight">{brother.name}</div>
                  <div className="text-sm text-muted-foreground mt-1">{brother.major} · {brother.year}</div>
                </div>
                <button onClick={onClose} className="text-muted-foreground hover:text-foreground"><X size={18} /></button>
              </div>

              {brother.role && (
                <Badge className="mt-4 bg-primary text-primary-foreground rounded-full">{brother.role}</Badge>
              )}

              <div className="mt-5 grid grid-cols-2 gap-4 text-sm">
                <Info label="Hometown" value={brother.hometown} />
                <Info label="Industry" value={brother.industry} />
                {brother.internship && <Info label="Internship" value={brother.internship} />}
                <Info label="Year" value={brother.year} />
              </div>

              <p className="mt-5 text-sm text-foreground/80 leading-relaxed">{brother.bio}</p>
              <p className="mt-3 text-sm text-muted-foreground italic">Fun fact: {brother.funFact}</p>

              {brother.linkedin && (
                <a
                  href={brother.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-6 inline-flex items-center gap-2 px-4 h-10 rounded-full bg-foreground text-background text-sm font-medium hover:bg-foreground/90 transition-colors"
                >
                  <Linkedin size={14} /> Connect on LinkedIn
                </a>
              )}
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{label}</div>
      <div className="mt-0.5 font-medium">{value}</div>
    </div>
  );
}
