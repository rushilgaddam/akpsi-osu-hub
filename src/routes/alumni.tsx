import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Reveal, Stagger, itemVariants } from "@/components/Reveal";
import { SectionLabel } from "@/components/SectionLabel";
import { Quote } from "lucide-react";

export const Route = createFileRoute("/alumni")({
  head: () => ({
    meta: [
      { title: "Alumni & Careers · Alpha Kappa Psi Ohio State" },
      { name: "description", content: "3,500+ Beta Iota alumni across top firms — investment banking, consulting, tech, brand management, and more." },
      { property: "og:title", content: "Alumni & Careers · AKPsi Ohio State" },
      { property: "og:description", content: "Where Beta Iota brothers go after Ohio State." },
    ],
  }),
  component: Alumni,
});

const companies = [
  "Goldman Sachs","McKinsey","JP Morgan","Microsoft","Google","Amazon","Bain","Deloitte",
  "EY","PwC","Citi","Morgan Stanley","Nike","P&G","Honda","CBRE","Fifth Third","KPMG",
  "Capital One","Accenture","Meta","Salesforce",
];

const testimonials = [
  { name: "Jenna Holcomb '19", role: "Associate · Goldman Sachs", body: "Beta Iota isn't a resume line — it's the reason I had a network at GS before I ever interviewed there. Five alumni picked up my call." },
  { name: "Devin Marsh '17", role: "Engagement Manager · McKinsey", body: "The case prep, the speaker series, the late-night chapter debates — it all directly translated. I joined McKinsey two years out of OSU." },
  { name: "Priya Anand '21", role: "PM · Microsoft", body: "I'm an engineer by training. AKPsi taught me how to actually run a room. Now I lead a PM team building Azure tooling." },
];

const outcomes = [
  { stat: "98%", label: "Job placement within 6 months" },
  { stat: "$92K", label: "Median starting salary" },
  { stat: "85%", label: "Receive return offers" },
  { stat: "40+", label: "Cities with active alumni" },
];

function Alumni() {
  return (
    <>
      <section className="pt-40 pb-12 container-page">
        <Reveal>
          <SectionLabel>Alumni & Careers</SectionLabel>
          <h1 className="mt-4 font-display text-[clamp(3rem,7vw,6rem)] leading-[0.95] text-balance max-w-5xl">
            Once Beta Iota, <span className="italic text-primary">always Beta Iota.</span>
          </h1>
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl">
            Our 3,500-strong alumni network is the single most powerful career
            asset of being a brother. They pick up the phone. They send the intro.
            They get you the interview.
          </p>
        </Reveal>
      </section>

      <section className="container-page pb-24">
        <Stagger className="grid grid-cols-2 md:grid-cols-4 gap-px bg-border rounded-2xl overflow-hidden border border-border">
          {outcomes.map((o) => (
            <motion.div key={o.label} variants={itemVariants} className="bg-card p-8">
              <div className="font-display text-5xl md:text-6xl text-primary">{o.stat}</div>
              <div className="mt-2 text-xs uppercase tracking-wider text-muted-foreground">{o.label}</div>
            </motion.div>
          ))}
        </Stagger>
      </section>

      <section className="bg-muted/30 text-foreground py-24 overflow-hidden border-y border-border">
        <div className="container-page mb-10">
          <Reveal>
            <SectionLabel>Where they work</SectionLabel>
            <h2 className="mt-4 font-display text-4xl md:text-5xl">A few of the firms.</h2>
          </Reveal>
        </div>
        <Stagger className="container-page grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-px bg-border rounded-2xl overflow-hidden border border-border">
          {companies.map((c) => (
            <motion.div
              key={c}
              variants={itemVariants}
              whileHover={{ scale: 1.05, color: "var(--scarlet)" }}
              className="bg-card p-6 flex items-center justify-center text-center font-display text-lg text-foreground/60 hover:text-primary transition-colors"
            >
              {c}
            </motion.div>
          ))}
        </Stagger>
      </section>

      <section className="container-page py-32">
        <Reveal>
          <SectionLabel>Alumni voices</SectionLabel>
          <h2 className="mt-4 font-display text-5xl md:text-6xl leading-[1.05]">
            The network <span className="italic">that lasts.</span>
          </h2>
        </Reveal>
        <Stagger className="mt-16 grid md:grid-cols-3 gap-5">
          {testimonials.map((t) => (
            <motion.figure
              key={t.name}
              variants={itemVariants}
              whileHover={{ y: -6 }}
              className="p-8 bg-card rounded-2xl border border-border hover:border-primary/40 hover:shadow-card transition-all"
            >
              <Quote className="text-primary/30" size={28} />
              <blockquote className="mt-4 text-lg leading-relaxed text-foreground/90">"{t.body}"</blockquote>
              <figcaption className="mt-6 pt-6 border-t border-border">
                <div className="font-display text-lg">{t.name}</div>
                <div className="text-sm text-muted-foreground">{t.role}</div>
              </figcaption>
            </motion.figure>
          ))}
        </Stagger>
      </section>
    </>
  );
}
