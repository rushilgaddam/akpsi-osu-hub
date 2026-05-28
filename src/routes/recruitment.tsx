import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Reveal, Stagger, itemVariants } from "@/components/Reveal";
import { SectionLabel } from "@/components/SectionLabel";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ArrowRight, Calendar, MapPin, Sparkles } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/recruitment")({
  head: () => ({
    meta: [
      { title: "Rush · Alpha Kappa Psi Ohio State" },
      { name: "description", content: "Spring recruitment information for the Beta Iota Chapter of Alpha Kappa Psi at OSU — timeline, FAQ, and interest form." },
      { property: "og:title", content: "Rush AKPsi · Ohio State" },
      { property: "og:description", content: "Join the premier co-ed business fraternity at Ohio State. Rush opens January." },
    ],
  }),
  component: Recruitment,
});

function Recruitment() {
  return (
    <>
      <Hero />
      <Why />
      <Timeline />
      <Events />
      <FAQ />
      <Interest />
    </>
  );
}

function Countdown() {
  // Target a future spring rush kickoff
  const target = new Date(new Date().getFullYear() + (new Date().getMonth() > 0 ? 1 : 0), 0, 15).getTime();
  const [now, setNow] = useState(Date.now());
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  const diff = Math.max(0, target - now);
  const d = Math.floor(diff / 86400000);
  const h = Math.floor((diff % 86400000) / 3600000);
  const m = Math.floor((diff % 3600000) / 60000);
  const s = Math.floor((diff % 60000) / 1000);

  const cells = [
    { v: d, l: "Days" },
    { v: h, l: "Hours" },
    { v: m, l: "Min" },
    { v: s, l: "Sec" },
  ];
  return (
    <div className="flex gap-3 md:gap-4">
      {cells.map((c) => (
        <div key={c.l} className="flex flex-col items-center bg-muted/60 backdrop-blur rounded-xl px-4 py-3 min-w-[68px]">
          <div className="font-display text-3xl md:text-4xl text-primary tabular-nums">{String(c.v).padStart(2, "0")}</div>
          <div className="text-[10px] uppercase tracking-wider text-foreground/50 mt-1">{c.l}</div>
        </div>
      ))}
    </div>
  );
}

function Hero() {
  return (
    <section className="relative pt-40 pb-24 bg-background text-foreground overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,_var(--scarlet-glow),_transparent_50%)]" />
      <div className="container-page relative">
        <Reveal>
          <SectionLabel>Spring 2026 Recruitment</SectionLabel>
          <h1 className="mt-4 font-display text-[clamp(3rem,8vw,7rem)] leading-[0.95] text-balance max-w-5xl">
            Rush AKPsi <span className="italic text-primary">Beta Iota.</span>
          </h1>
          <p className="mt-6 text-lg text-foreground/70 max-w-xl">
            One week. Five events. The most welcoming, professional, and high-energy rush
            on campus. No business experience required.
          </p>

          <div className="mt-10 flex flex-col md:flex-row md:items-end gap-6">
            <div>
              <div className="text-xs uppercase tracking-[0.2em] text-foreground/50 mb-3">Recruitment begins</div>
              <Countdown />
            </div>
            <Button asChild size="lg" className="rounded-full bg-primary hover:bg-primary/90 self-start h-12 px-7">
              <a href="#interest">Submit Interest Form <ArrowRight size={18} className="ml-1" /></a>
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Why() {
  const items = [
    { stat: "98%", body: "Job placement rate within 6 months of graduation." },
    { stat: "3,500+", body: "Alumni across Fortune 500s, top consulting and IB firms." },
    { stat: "30+", body: "Professional events per semester — workshops, speakers, and case nights." },
  ];
  return (
    <section className="container-page py-32">
      <Reveal>
        <SectionLabel>Why AKPsi</SectionLabel>
        <h2 className="mt-4 font-display text-5xl md:text-6xl text-balance leading-[1.05] max-w-3xl">
          The most committed people <span className="italic">you'll meet at OSU.</span>
        </h2>
      </Reveal>
      <Stagger className="mt-16 grid md:grid-cols-3 gap-4">
        {items.map((i) => (
          <motion.div key={i.stat} variants={itemVariants} className="p-8 bg-card rounded-2xl border border-border">
            <div className="font-display text-6xl text-primary">{i.stat}</div>
            <p className="mt-4 text-muted-foreground leading-relaxed">{i.body}</p>
          </motion.div>
        ))}
      </Stagger>
    </section>
  );
}

const timeline = [
  { phase: "Round 1", title: "Information Sessions", text: "Open to anyone curious. Hear from the EBoard, meet brothers, ask anything." },
  { phase: "Round 2", title: "Professional Night", text: "Business casual. Resume conversations and a panel with our active brothers." },
  { phase: "Round 3", title: "Social Night", text: "Casual mixer. See if the brotherhood vibe is right for you." },
  { phase: "Round 4", title: "Coffee Chats", text: "1-on-1s with brothers across industries and majors." },
  { phase: "Round 5", title: "Final Interviews", text: "Formal interviews with the EBoard. Bids extended that weekend." },
];

function Timeline() {
  return (
    <section className="bg-muted/30 text-foreground py-32 border-y border-border">
      <div className="container-page">
        <Reveal>
          <SectionLabel>Rush Timeline</SectionLabel>
          <h2 className="mt-4 font-display text-5xl md:text-6xl">Five rounds. <span className="italic text-primary">One week.</span></h2>
        </Reveal>
        <Stagger className="mt-16 grid gap-px bg-border rounded-2xl overflow-hidden border border-border">
          {timeline.map((t, i) => (
            <motion.div
              key={t.phase}
              variants={itemVariants}
              className="bg-card p-8 grid md:grid-cols-[140px_1fr] gap-4 hover:bg-muted/50 transition-colors"
            >
              <div className="font-mono text-xs uppercase tracking-wider text-primary pt-2">{t.phase}</div>
              <div>
                <div className="font-display text-3xl">{t.title}</div>
                <div className="mt-2 text-foreground/70 leading-relaxed max-w-xl">{t.text}</div>
              </div>
              <div className="md:col-start-2 text-xs text-foreground/40 font-mono">Day {i + 1}</div>
            </motion.div>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

const events = [
  { date: "Jan 15", time: "7:00 PM", title: "Info Night", location: "Fisher Hall · Room 200", tag: "Open" },
  { date: "Jan 17", time: "6:30 PM", title: "Professional Night", location: "Gerlach Hall", tag: "Business casual" },
  { date: "Jan 19", time: "8:00 PM", title: "Social Mixer", location: "TBD", tag: "Casual" },
  { date: "Jan 21", time: "All Day", title: "Coffee Chats", location: "Across campus", tag: "1-on-1" },
];

function Events() {
  return (
    <section className="container-page py-32">
      <Reveal>
        <SectionLabel>Upcoming Events</SectionLabel>
        <h2 className="mt-4 font-display text-5xl md:text-6xl">Mark your calendar.</h2>
      </Reveal>
      <Stagger className="mt-12 grid md:grid-cols-2 gap-4">
        {events.map((e) => (
          <motion.div
            key={e.title}
            variants={itemVariants}
            whileHover={{ y: -4 }}
            className="group p-6 bg-card rounded-2xl border border-border hover:border-primary/40 hover:shadow-card transition-all"
          >
            <div className="flex justify-between items-start">
              <div>
                <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-primary font-semibold">
                  <Calendar size={12} /> {e.date} · {e.time}
                </div>
                <div className="mt-2 font-display text-2xl">{e.title}</div>
                <div className="mt-1 text-sm text-muted-foreground flex items-center gap-1.5">
                  <MapPin size={12} /> {e.location}
                </div>
              </div>
              <div className="text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-full bg-foreground/5 text-muted-foreground">
                {e.tag}
              </div>
            </div>
          </motion.div>
        ))}
      </Stagger>
    </section>
  );
}

const faqs = [
  { q: "Do I need to be a business major?", a: "No. We welcome brothers from every college at OSU — Fisher, Engineering, Arts & Sciences, Pharmacy, you name it. What matters is ambition and fit." },
  { q: "What's the time commitment?", a: "Active brothers commit roughly 5–8 hours a week — chapter meetings, professional events, and brotherhood. Pledging is more intensive (8–12 hours per week)." },
  { q: "How much does it cost?", a: "Semester dues cover national fees, chapter operations, formals, and brotherhood events. We offer payment plans and scholarships — finances should never be the reason you don't rush." },
  { q: "Can I be in another organization?", a: "Absolutely. Many of our brothers are in IBA, the Honors program, sports clubs, and other student orgs. AKPsi is a community, not a cage." },
  { q: "What if I don't get a bid?", a: "Rush again next semester. Many of our strongest brothers rushed twice. We give honest feedback when asked." },
];

function FAQ() {
  return (
    <section className="container-page py-32">
      <div className="grid lg:grid-cols-[1fr_2fr] gap-12">
        <Reveal>
          <SectionLabel>FAQ</SectionLabel>
          <h2 className="mt-4 font-display text-5xl leading-tight">Questions we hear <span className="italic">a lot.</span></h2>
        </Reveal>
        <Reveal delay={0.1}>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((f, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="border-border">
                <AccordionTrigger className="text-left text-lg font-medium hover:no-underline hover:text-primary">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-base leading-relaxed">
                  {f.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </div>
    </section>
  );
}

function Interest() {
  const [submitting, setSubmitting] = useState(false);
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      toast.success("Thanks — we'll be in touch with rush details soon.");
      (e.target as HTMLFormElement).reset();
      setSubmitting(false);
    }, 800);
  };
  return (
    <section id="interest" className="container-page pb-32">
      <Reveal>
        <div className="relative rounded-3xl bg-card border border-border text-foreground p-10 md:p-16 grain overflow-hidden">
          <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-primary/20 blur-3xl" />
          <div className="relative grid lg:grid-cols-2 gap-12">
            <div>
              <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.25em] text-primary">
                <Sparkles size={12} /> Interest Form
              </div>
              <h2 className="mt-4 font-display text-5xl md:text-6xl leading-[1.05] text-balance">
                Get on the <span className="italic text-primary">list.</span>
              </h2>
              <p className="mt-4 text-foreground/60 max-w-md">
                Drop your info and we'll send you rush schedules, locations, and personal invites from the recruitment team.
              </p>
            </div>
            <form onSubmit={onSubmit} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-3">
                <Input required name="firstName" placeholder="First name" className="bg-muted/50 border-border/60 text-foreground placeholder:text-muted-foreground h-12 rounded-xl" />
                <Input required name="lastName" placeholder="Last name" className="bg-muted/50 border-border/60 text-foreground placeholder:text-muted-foreground h-12 rounded-xl" />
              </div>
              <Input required type="email" name="email" placeholder="OSU email" className="bg-muted/50 border-border/60 text-foreground placeholder:text-muted-foreground h-12 rounded-xl" />
              <div className="grid sm:grid-cols-2 gap-3">
                <Input name="major" placeholder="Major" className="bg-muted/50 border-border/60 text-foreground placeholder:text-muted-foreground h-12 rounded-xl" />
                <Input name="year" placeholder="Year (Fr / So / Jr / Sr)" className="bg-muted/50 border-border/60 text-foreground placeholder:text-muted-foreground h-12 rounded-xl" />
              </div>
              <Textarea name="why" placeholder="Why AKPsi? (optional)" rows={3} className="bg-muted/50 border-border/60 text-foreground placeholder:text-muted-foreground rounded-xl" />
              <Button disabled={submitting} type="submit" className="w-full sm:w-auto rounded-full bg-primary hover:bg-primary/90 h-12 px-7">
                {submitting ? "Submitting…" : "Submit Interest"} <ArrowRight size={16} className="ml-1" />
              </Button>
            </form>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
