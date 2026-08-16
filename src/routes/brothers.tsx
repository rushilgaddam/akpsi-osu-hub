import { createFileRoute } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { Linkedin } from "lucide-react";
import { useState } from "react";
import { brothers, type Brother } from "@/lib/brothers";
import { Reveal } from "@/components/Reveal";
import { SectionLabel } from "@/components/SectionLabel";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/brothers")({
  head: () => ({
    meta: [
      { title: "Brothers · Alpha Kappa Psi Ohio State" },
      { name: "description", content: "Meet the active brothers of Mu Chapter and learn about their majors, PC classes, industries, and leadership roles." },
      { property: "og:title", content: "Brothers · AKPsi Ohio State" },
      { property: "og:description", content: "75+ active brothers driving careers across banking, consulting, tech, and more." },
    ],
  }),
  component: BrothersPage,
});

function BrothersPage() {
  const [selected, setSelected] = useState<Brother | null>(null);
  const [tab, setTab] = useState<"all" | "leadership">("all");
  const filtered = tab === "leadership" ? brothers.filter((b) => b.role) : brothers;

  return (
    <>
      <section className="pt-40 pb-12 container-page">
        <Reveal>
          <SectionLabel>The chapter</SectionLabel>
          <h1 className="mt-4 font-display text-[clamp(3rem,7vw,6rem)] leading-[0.95] text-balance">
            Meet the <span className="italic text-primary">brothers.</span>
          </h1>
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl">
            75 active brothers across every major. Click any card to learn more.
          </p>
        </Reveal>
      </section>

      <section className="container-page pb-32">
        <div className="mb-6 flex items-center gap-2">
          <button
            onClick={() => setTab("all")}
            className={`px-4 h-9 rounded-full text-sm font-medium transition-colors ${
              tab === "all" ? "bg-primary text-primary-foreground" : "bg-card border border-border text-muted-foreground hover:text-foreground"
            }`}
          >
            All Members
          </button>
          <button
            onClick={() => setTab("leadership")}
            className={`px-4 h-9 rounded-full text-sm font-medium transition-colors ${
              tab === "leadership" ? "bg-primary text-primary-foreground" : "bg-card border border-border text-muted-foreground hover:text-foreground"
            }`}
          >
            Leadership
          </button>
        </div>

        <div className="mb-6 text-sm text-muted-foreground">
          {tab === "leadership"
            ? <><span className="text-foreground font-semibold">{filtered.length}</span> brothers in leadership</>
            : <>Showing <span className="text-foreground font-semibold">{filtered.length}</span> of {brothers.length} brothers</>}
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
            <p className="font-display text-3xl">No brothers found.</p>
          </div>
        )}
      </section>

      <BrotherModal brother={selected} onClose={() => setSelected(null)} />
    </>
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
          <div className="text-[11px] uppercase tracking-wider opacity-80 mt-0.5">{brother.pcClass} · {brother.major}</div>
        </div>
      </div>
      <div className="p-4 flex items-center justify-between">
        <div className="text-xs text-muted-foreground truncate">{brother.internship ?? brother.hometown}</div>
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
              <div>
                <div className="font-display text-3xl leading-tight">{brother.name}</div>
                <div className="text-sm text-muted-foreground mt-1">{brother.major} · {brother.pcClass}</div>
              </div>

              {brother.role && (
                <Badge className="mt-4 bg-primary text-primary-foreground rounded-full">{brother.role}</Badge>
              )}

              <div className="mt-5 grid grid-cols-2 gap-4 text-sm">
                <Info label="Hometown" value={brother.hometown} />
                {brother.internship && <Info label="Internship" value={brother.internship} />}
                <Info label="PC Class" value={brother.pcClass} />
              </div>

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
