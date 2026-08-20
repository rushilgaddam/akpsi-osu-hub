import { createFileRoute } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { Linkedin } from "lucide-react";
import { useMemo, useState } from "react";
import { brothers, FILTERS, majorTags, roleTier, type Brother } from "@/lib/brothers";
import { Reveal } from "@/components/Reveal";
import { SectionLabel } from "@/components/SectionLabel";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

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
  const [pcClass, setPcClass] = useState<string>("all");
  const [major, setMajor] = useState<string>("all");

  const filtered = useMemo(() => {
    let list = tab === "leadership" ? brothers.filter((b) => b.role) : brothers;
    if (pcClass !== "all") list = list.filter((b) => b.pcClass === pcClass);
    if (major !== "all") list = list.filter((b) => majorTags(b.major).includes(major));

    if (tab === "leadership") {
      const tierOrder = { president: 0, vp: 1, director: 2 } as const;
      list = [...list].sort((a, b) => {
        const diff = (tierOrder[roleTier(a.role)!] ?? 3) - (tierOrder[roleTier(b.role)!] ?? 3);
        return diff !== 0 ? diff : a.name.localeCompare(b.name);
      });
    }

    return list;
  }, [tab, pcClass, major]);

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
        <div className="mb-6 flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2">
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

          <div className="flex items-center gap-2 sm:ml-auto">
            <Select value={pcClass} onValueChange={setPcClass}>
              <SelectTrigger className="h-9 w-[150px] rounded-full bg-card">
                <SelectValue placeholder="PC Class" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All PC Classes</SelectItem>
                {FILTERS.pcClasses.map((c) => (
                  <SelectItem key={c} value={c}>{c}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={major} onValueChange={setMajor}>
              <SelectTrigger className="h-9 w-[180px] rounded-full bg-card">
                <SelectValue placeholder="Major" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Majors</SelectItem>
                {FILTERS.majors.map((m) => (
                  <SelectItem key={m} value={m}>{m}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            {(pcClass !== "all" || major !== "all") && (
              <button
                onClick={() => { setPcClass("all"); setMajor("all"); }}
                className="text-xs font-medium text-muted-foreground hover:text-foreground underline underline-offset-4"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        <div className="mb-6 text-sm text-muted-foreground">
          {tab === "leadership"
            ? <><span className="text-foreground font-semibold">{filtered.length}</span> brothers in leadership</>
            : <>Showing <span className="text-foreground font-semibold">{filtered.length}</span> of {brothers.length} brothers</>}
        </div>

        <motion.div layout className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <AnimatePresence mode="popLayout">
            {filtered.map((b) => (
              <BrotherCard key={b.id} brother={b} onClick={() => setSelected(b)} />
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


// Deterministic gradient per brother, keyed off their id so it never changes across renders.
const PLACEHOLDER_HUES = [12, 18, 22, 350, 6, 28];
function hueForId(id: string): number {
  let hash = 0;
  for (let i = 0; i < id.length; i++) hash = (hash * 31 + id.charCodeAt(i)) % PLACEHOLDER_HUES.length;
  return PLACEHOLDER_HUES[hash];
}

function BrotherCard({ brother, onClick }: { brother: Brother; onClick: () => void }) {
  const hue = hueForId(brother.id);
  const initials = brother.name.split(" ").map((n) => n[0]).join("").slice(0, 2);

  return (
    <motion.button
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      whileHover={{ y: -6 }}
      onClick={onClick}
      className="group text-left bg-card rounded-2xl overflow-hidden border border-border hover:border-primary/40 hover:shadow-card transition-all"
    >
      <div className="aspect-[4/5] relative overflow-hidden">
        {brother.photo ? (
          <img
            src={brother.photo}
            alt={brother.name}
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <>
            <div
              className="absolute inset-0 transition-transform duration-700 group-hover:scale-105"
              style={{ background: `linear-gradient(135deg, oklch(0.3 0.15 ${hue}), oklch(0.15 0.05 ${hue + 10}))` }}
            />
            <div className="absolute inset-0 flex items-center justify-center font-display text-7xl text-white/80">
              {initials}
            </div>
          </>
        )}
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/70 to-transparent" />
        {brother.role && (
          <div
            className={`absolute top-3 right-3 px-2.5 py-1 rounded-full text-[10px] uppercase tracking-wider font-semibold ${
              roleTier(brother.role) === "director"
                ? "bg-white/90 text-foreground"
                : "bg-primary text-primary-foreground"
            }`}
          >
            {roleTier(brother.role) === "president" ? "President" : roleTier(brother.role) === "vp" ? "VP" : "Director"}
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
            <div className="relative aspect-[4/5] sm:aspect-auto overflow-hidden bg-gradient-to-br from-primary to-[color:var(--scarlet-deep)] flex items-center justify-center">
              {brother.photo ? (
                <img src={brother.photo} alt={brother.name} className="absolute inset-0 h-full w-full object-cover" />
              ) : (
                <div className="font-display text-7xl text-white/90">{initials}</div>
              )}
            </div>
            <div className="p-7">
              <div>
                <div className="font-display text-3xl leading-tight">{brother.name}</div>
                <div className="text-sm text-muted-foreground mt-1">{brother.major} · {brother.pcClass}</div>
              </div>

              {brother.role && (
                <Badge
                  className="mt-4 rounded-full"
                  variant={roleTier(brother.role) === "director" ? "outline" : "default"}
                >
                  {brother.role}
                </Badge>
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
