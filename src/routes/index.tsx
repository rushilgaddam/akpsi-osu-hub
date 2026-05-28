import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ArrowUpRight, Briefcase, HeartHandshake, Sparkles, Users } from "lucide-react";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Reveal, Stagger, itemVariants } from "@/components/Reveal";
import { SectionLabel } from "@/components/SectionLabel";
import heroImg from "@/assets/hero-campus.jpg";
import brotherhoodImg from "@/assets/brotherhood.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Alpha Kappa Psi · Ohio State University" },
      { name: "description", content: "Beta Iota Chapter of Alpha Kappa Psi — premier co-ed professional business fraternity at The Ohio State University." },
      { property: "og:title", content: "Alpha Kappa Psi · Ohio State" },
      { property: "og:description", content: "Brotherhood. Professionalism. Service. Since 1922 at OSU." },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <>
      <Hero />
      <Marquee />
      <Pillars />
      <Stats />
      <Showcase />
      <CTA />
    </>
  );
}

function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <section ref={ref} className="relative min-h-screen overflow-hidden bg-background text-foreground">
      <motion.div style={{ y, opacity }} className="absolute inset-0">
        <img
          src={heroImg}
          alt="Ohio State University campus at dusk"
          className="h-full w-full object-cover opacity-30"
          width={1920}
          height={1280}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/70 to-background" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--scarlet-glow),_transparent_60%)]" />
      </motion.div>

      <div className="relative z-10 container-page pt-40 pb-32 min-h-screen flex flex-col justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-2 text-[11px] uppercase tracking-[0.3em] text-primary"
        >
          <span className="w-8 h-px bg-primary" />
          Beta Iota Chapter · Est. 1922
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 font-display text-[clamp(3rem,9vw,8rem)] leading-[0.95] text-balance"
        >
          Alpha Kappa Psi <br />
          <span className="italic text-primary">at Ohio State.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-8 max-w-xl text-lg text-foreground/70"
        >
          The nation's oldest and largest co-ed professional business fraternity —
          shaping principled business leaders through brotherhood, professionalism, and service.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45 }}
          className="mt-10 flex flex-wrap gap-3"
        >
          <Button asChild size="lg" className="rounded-full bg-primary hover:bg-primary/90 text-base px-7 h-12 group">
            <Link to="/recruitment">
              Rush AKPsi
              <ArrowRight className="ml-1 group-hover:translate-x-1 transition-transform" size={18} />
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="rounded-full border-foreground/20 bg-transparent text-foreground hover:bg-foreground hover:text-background text-base px-7 h-12">
            <Link to="/brothers">Meet the Brothers</Link>
          </Button>
          <Button asChild size="lg" variant="ghost" className="rounded-full text-foreground hover:bg-foreground/10 text-base px-7 h-12">
            <Link to="/about">Learn More</Link>
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-[0.3em] text-foreground/50 flex flex-col items-center gap-2"
        >
          Scroll
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.8, repeat: Infinity }}
            className="w-px h-8 bg-foreground/30"
          />
        </motion.div>
      </div>
    </section>
  );
}

function Marquee() {
  const items = ["Goldman Sachs", "McKinsey & Co.", "Google", "JP Morgan", "Deloitte", "Microsoft", "Bain & Co.", "Morgan Stanley", "Procter & Gamble", "Nike", "Amazon", "EY"];
  const doubled = [...items, ...items];
  return (
    <section className="border-y border-border bg-background py-8 overflow-hidden">
      <div className="container-page mb-6">
        <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground text-center">
          Where our brothers intern & work
        </p>
      </div>
      <div className="flex whitespace-nowrap marquee">
        {doubled.map((c, i) => (
          <span key={i} className="font-display text-3xl md:text-4xl px-10 text-muted-foreground/70">
            {c} <span className="text-primary mx-2">·</span>
          </span>
        ))}
      </div>
    </section>
  );
}

const pillars = [
  { Icon: Users, title: "Brotherhood", body: "120+ active brothers forming lifelong bonds through retreats, socials, formals, and shared ambition." },
  { Icon: Briefcase, title: "Professionalism", body: "Resume reviews, mock interviews, case prep, and direct alumni pipelines into top firms." },
  { Icon: Sparkles, title: "Leadership", body: "Every brother holds a role. Run a committee, lead a class, or sit on the executive board." },
  { Icon: HeartHandshake, title: "Service", body: "Annual philanthropy partnerships raising tens of thousands for Columbus-area causes." },
];

function Pillars() {
  return (
    <section className="container-page py-32">
      <Reveal>
        <SectionLabel>What we stand for</SectionLabel>
        <h2 className="mt-4 font-display text-5xl md:text-7xl text-balance max-w-3xl leading-[1.05]">
          Four pillars. <span className="italic text-primary">One brotherhood.</span>
        </h2>
      </Reveal>

      <Stagger className="mt-16 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {pillars.map(({ Icon, title, body }) => (
          <motion.div
            key={title}
            variants={itemVariants}
            whileHover={{ y: -6 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="group relative p-7 bg-card rounded-2xl border border-border hover:border-primary/40 hover:shadow-card transition-all"
          >
            <div className="w-11 h-11 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-5 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
              <Icon size={20} />
            </div>
            <h3 className="font-display text-2xl mb-2">{title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{body}</p>
          </motion.div>
        ))}
      </Stagger>
    </section>
  );
}

const stats = [
  { num: "100+", label: "Years strong" },
  { num: "120", label: "Active brothers" },
  { num: "3,500+", label: "Beta Iota alumni" },
  { num: "98%", label: "Job placement" },
];

function Stats() {
  return (
    <section className="relative bg-muted/30 text-foreground overflow-hidden border-y border-border">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,_var(--scarlet-glow),_transparent_50%)]" />
      <div className="container-page py-24 relative">
        <Stagger className="grid gap-10 md:grid-cols-4">
          {stats.map((s) => (
            <motion.div key={s.label} variants={itemVariants} className="border-l border-foreground/10 pl-5">
              <div className="font-display text-6xl md:text-7xl text-primary">{s.num}</div>
              <div className="mt-2 text-xs uppercase tracking-[0.2em] text-foreground/50">{s.label}</div>
            </motion.div>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

function Showcase() {
  return (
    <section className="container-page py-32">
      <div className="grid gap-12 lg:grid-cols-2 items-center">
        <Reveal>
          <SectionLabel>The chapter</SectionLabel>
          <h2 className="mt-4 font-display text-5xl md:text-6xl text-balance leading-[1.05]">
            Built different. <span className="italic">Built together.</span>
          </h2>
          <p className="mt-6 text-lg text-muted-foreground max-w-lg">
            Beta Iota isn't just a line on your resume. It's the 6 AM gym sessions,
            the late-night case prep, the formal dance floor, and the alumni who pick
            up your call ten years later. We're a chapter that takes both the work and
            the brotherhood seriously.
          </p>
          <div className="mt-10 flex gap-3">
            <Button asChild className="rounded-full">
              <Link to="/about">Our Story <ArrowUpRight size={16} className="ml-1" /></Link>
            </Button>
            <Button asChild variant="outline" className="rounded-full">
              <Link to="/brothers">Meet Us</Link>
            </Button>
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="relative aspect-[5/6] rounded-3xl overflow-hidden shadow-card">
            <img
              src={brotherhoodImg}
              alt="AKPsi brothers"
              className="h-full w-full object-cover"
              loading="lazy"
              width={1600}
              height={1100}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 text-background">
              <div className="text-xs uppercase tracking-[0.2em] text-background/70">Fall 2025</div>
              <div className="font-display text-2xl mt-1">Pledge class of 2025</div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section className="container-page pb-24">
      <Reveal>
        <div className="relative rounded-3xl bg-card border border-border text-foreground p-12 md:p-20 overflow-hidden grain">
          <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-primary/20 blur-3xl" />
          <div className="relative max-w-3xl">
            <SectionLabel>Recruitment is open</SectionLabel>
            <h2 className="mt-4 font-display text-5xl md:text-7xl text-balance leading-[1]">
              Your next four years <span className="italic text-primary">start here.</span>
            </h2>
            <p className="mt-6 text-foreground/60 text-lg max-w-xl">
              Rush week kicks off in January. Come meet the brothers, ask
              real questions, and see what Beta Iota is about.
            </p>
            <div className="mt-10">
              <Button asChild size="lg" className="rounded-full text-base h-12 px-7 bg-primary hover:bg-primary/90">
                <Link to="/recruitment">View Rush Schedule <ArrowRight size={18} className="ml-1" /></Link>
              </Button>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
