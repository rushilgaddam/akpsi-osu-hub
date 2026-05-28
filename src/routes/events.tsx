import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Reveal, Stagger, itemVariants } from "@/components/Reveal";
import { SectionLabel } from "@/components/SectionLabel";
import { Calendar, MapPin } from "lucide-react";

export const Route = createFileRoute("/events")({
  head: () => ({
    meta: [
      { title: "Events · Alpha Kappa Psi Ohio State" },
      { name: "description", content: "Upcoming chapter events, professional workshops, philanthropy, and brotherhood at AKPsi Beta Iota." },
      { property: "og:title", content: "Events · AKPsi Ohio State" },
      { property: "og:description", content: "Speakers, case nights, philanthropy, and brotherhood — all semester long." },
    ],
  }),
  component: Events,
});

const upcoming = [
  { date: "Mar 12", title: "Goldman Sachs Speaker Series", category: "Professional", location: "Gerlach Hall · 7:00 PM", body: "GS associate panel on breaking into IB from a non-target." },
  { date: "Mar 18", title: "Chapter Retreat", category: "Brotherhood", location: "Hocking Hills · All Weekend", body: "Annual cabin retreat — team building, bonfire, and chapter strategy." },
  { date: "Mar 25", title: "Buckeye Blood Drive", category: "Service", location: "Ohio Union · 10 AM – 4 PM", body: "Co-hosted with the Red Cross. Target: 200 donations." },
  { date: "Apr 2", title: "Case Competition Finals", category: "Professional", location: "Mason Hall · 6:00 PM", body: "Cross-chapter case comp judged by Bain partners." },
  { date: "Apr 9", title: "Alumni Networking Night", category: "Alumni", location: "Fisher Atrium · 6:30 PM", body: "Open bar reception with Beta Iota alumni from across industries." },
  { date: "Apr 26", title: "Spring Formal", category: "Brotherhood", location: "Hyatt Regency · 7:00 PM", body: "Black tie. The night of the year." },
];

const tagColor: Record<string, string> = {
  Professional: "bg-primary/10 text-primary",
  Brotherhood: "bg-foreground/10 text-foreground",
  Service: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400",
  Alumni: "bg-amber-500/10 text-amber-700 dark:text-amber-400",
};

function Events() {
  return (
    <>
      <section className="pt-40 pb-12 container-page">
        <Reveal>
          <SectionLabel>Events</SectionLabel>
          <h1 className="mt-4 font-display text-[clamp(3rem,7vw,6rem)] leading-[0.95]">
            What's <span className="italic text-primary">happening.</span>
          </h1>
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl">
            30+ events per semester across four pillars. Open events welcome the
            OSU community — others are brothers-only.
          </p>
        </Reveal>
      </section>

      <section className="container-page pb-32">
        <Stagger className="grid gap-px bg-border rounded-3xl overflow-hidden border border-border">
          {upcoming.map((e) => (
            <motion.article
              key={e.title}
              variants={itemVariants}
              whileHover={{ x: 6 }}
              className="group bg-card p-6 md:p-8 grid md:grid-cols-[120px_1fr_auto] gap-4 md:gap-8 items-start hover:bg-accent/40 transition-colors cursor-pointer"
            >
              <div>
                <div className="font-display text-3xl text-primary">{e.date}</div>
                <div className="text-xs text-muted-foreground mt-1 flex items-center gap-1"><Calendar size={11} /> 2026</div>
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className={`text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded-full ${tagColor[e.category]}`}>{e.category}</span>
                </div>
                <h3 className="font-display text-2xl md:text-3xl group-hover:text-primary transition-colors">{e.title}</h3>
                <div className="mt-1 text-sm text-muted-foreground flex items-center gap-1.5"><MapPin size={12} /> {e.location}</div>
                <p className="mt-3 text-sm text-foreground/70 max-w-2xl leading-relaxed">{e.body}</p>
              </div>
              <div className="text-xs text-muted-foreground font-mono opacity-0 group-hover:opacity-100 transition-opacity">
                Details →
              </div>
            </motion.article>
          ))}
        </Stagger>
      </section>
    </>
  );
}
