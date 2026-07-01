import { createFileRoute } from "@tanstack/react-router";
import { useState, useRef, useEffect } from "react";
import { Reveal } from "@/components/Reveal";
import { SectionLabel } from "@/components/SectionLabel";

const categories = [
  {
    id: "general",
    label: "General",
    questions: [
      {
        q: "What is Alpha Kappa Psi?",
        a: "Alpha Kappa Psi is the oldest and largest professional business fraternity in the world, founded in 1904 at NYU. The Mu Chapter at Ohio State has been active since 1922, developing business leaders across every industry.",
      },
      {
        q: "Is AKPsi a social fraternity?",
        a: "No. AKPsi is a co-ed professional fraternity — our focus is career development, leadership, and brotherhood. We have no affiliation with Greek housing or social sorority/fraternity systems.",
      },
      {
        q: "Who can join?",
        a: "Any OSU student regardless of major, year, or background. We have members from engineering, nursing, arts, and everything in between. We look for drive, character, and fit — not just a business degree.",
      },
      {
        q: "What makes Mu Chapter different?",
        a: "Our alumni network, the quality of our brotherhood, and our track record. Members have gone on to Goldman Sachs, McKinsey, Google, Citadel, and dozens of other top firms. More importantly, they stay connected long after graduation.",
      },
    ],
  },
  {
    id: "rush",
    label: "Rush",
    questions: [
      {
        q: "When is rush?",
        a: "We hold recruitment once per semester. Winter 2026 rush runs January 7–25. Keep an eye on our Instagram and this site for exact event dates.",
      },
      {
        q: "What happens during rush week?",
        a: "Rush week includes a mix of professional events, social mixers, and one-on-one coffee chats with current brothers. It's designed so you get a real feel for who we are — not just a sales pitch.",
      },
      {
        q: "How competitive is the application process?",
        a: "We are selective, but we evaluate candidates holistically. GPA matters less than curiosity, ambition, and how you carry yourself. Show up with genuine interest and you'll be noticed.",
      },
      {
        q: "Can I rush if I'm a freshman?",
        a: "Yes. Freshmen are welcome and make up a meaningful portion of every pledge class. It's never too early.",
      },
      {
        q: "What if I miss a rush event?",
        a: "Attending as many events as possible strengthens your application, but missing one isn't disqualifying. Reach out to us directly and we'll make sure you're not left out.",
      },
    ],
  },
  {
    id: "membership",
    label: "Membership",
    questions: [
      {
        q: "What does membership actually involve?",
        a: "After pledging, you become an active brother. That means attending chapter meetings, participating in events, contributing to a committee, and showing up for the people around you. Most brothers spend 5–8 hours per week on chapter activities.",
      },
      {
        q: "What are dues?",
        a: "Dues cover national membership fees, chapter operations, and events. The exact amount varies by semester. We're transparent about costs upfront and offer payment plans for those who need flexibility — no one is priced out.",
      },
      {
        q: "Can I be in other clubs or organizations?",
        a: "Absolutely. Many of our members are in research labs, varsity sports, student government, and other Greek organizations. We're designed to fit alongside your other commitments.",
      },
      {
        q: "What is the pledge process like?",
        a: "The pledge process is structured around professional development, brotherhood activities, and learning the history and values of AKPsi. It's challenging in the right ways — you'll grow, and you'll do it with a cohort going through it alongside you.",
      },
      {
        q: "Is hazing involved?",
        a: "No. AKPsi has a strict anti-hazing policy at both the national and chapter level. Our pledge process is rigorous but entirely respectful.",
      },
    ],
  },
  {
    id: "network",
    label: "Network & Career",
    questions: [
      {
        q: "How strong is the alumni network?",
        a: "Very. Mu Chapter has 500+ alumni across top firms in consulting, finance, tech, healthcare, and more. Alumni actively mentor current members, refer them for jobs, and return to speak at chapter events.",
      },
      {
        q: "What career resources does AKPsi provide?",
        a: "Resume reviews, mock interviews, alumni panels, recruiting prep workshops, and direct referrals. Many brothers have landed internships and full-time offers through the network alone.",
      },
      {
        q: "What companies do members recruit into?",
        a: "Members have gone on to Goldman Sachs, McKinsey, Google, Amazon, Citadel, JPMorgan, Deloitte, Bain, and many others. We have strong representation across finance, consulting, and tech.",
      },
      {
        q: "Does the network stay active after graduation?",
        a: "Yes — that's one of AKPsi's real differentiators. Our alumni stay engaged. The fraternity genuinely is lifelong, not just a college thing.",
      },
    ],
  },
  {
    id: "brotherhood",
    label: "Brotherhood",
    questions: [
      {
        q: "What does 'brotherhood' actually mean here?",
        a: "It means the people you meet will become close friends — not just professional contacts. Brothers become roommates, travel together, support each other through hard semesters, and stay close after graduation.",
      },
      {
        q: "What social events does the chapter run?",
        a: "Retreats, formals, socials, alumni mixers, intramurals, and more throughout the year. The social calendar is full without being overwhelming.",
      },
      {
        q: "How diverse is the chapter?",
        a: "Diversity — of major, background, identity, and perspective — is something we actively cultivate. Brothers come from 10+ majors and a wide range of personal experiences.",
      },
    ],
  },
];

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "FAQ · Alpha Kappa Psi Ohio State" },
      { name: "description", content: "Answers to common questions about AKPsi Mu Chapter at Ohio State." },
    ],
  }),
  component: FAQ,
});

function AccordionItem({ q, a, index }: { q: string; a: string; index: number }) {
  const [open, setOpen] = useState(false);
  const bodyRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (bodyRef.current) {
      setHeight(open ? bodyRef.current.scrollHeight : 0);
    }
  }, [open]);

  return (
    <div
      className="faq-item border-b border-border"
      style={{ animationDelay: `${index * 0.04}s` }}
    >
      <button
        className="w-full flex items-center justify-between gap-6 py-5 text-left group"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
      >
        <span className="text-base font-medium text-foreground group-hover:text-primary transition-colors duration-200">
          {q}
        </span>
        {/* Animated plus/minus */}
        <span
          className="relative flex-shrink-0 w-5 h-5"
          aria-hidden
          style={{ color: "hsl(var(--primary))" }}
        >
          <span
            className="absolute inset-y-[9px] inset-x-0 h-px bg-current transition-transform duration-300"
            style={{ transform: open ? "scaleX(0.6)" : "scaleX(1)" }}
          />
          <span
            className="absolute inset-x-[9px] inset-y-0 w-px bg-current transition-all duration-300"
            style={{
              transform: open ? "scaleY(0) rotate(90deg)" : "scaleY(1)",
              opacity: open ? 0 : 1,
            }}
          />
        </span>
      </button>

      <div
        style={{
          height,
          overflow: "hidden",
          transition: "height 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        <div ref={bodyRef} className="pb-5 pr-10">
          <p className="text-base text-foreground/70 leading-relaxed">{a}</p>
        </div>
      </div>
    </div>
  );
}

function FAQ() {
  const [activeCategory, setActiveCategory] = useState("general");
  const [animKey, setAnimKey] = useState(0);

  const handleCategory = (id: string) => {
    setActiveCategory(id);
    setAnimKey((k) => k + 1);
  };

  const active = categories.find((c) => c.id === activeCategory)!;

  return (
    <main className="min-h-screen bg-background text-foreground">

      {/* ── HERO ── */}
      <section className="relative pt-36 pb-20 overflow-hidden">
        {/* Faint background grid */}
        <div className="faq-grid-bg absolute inset-0 pointer-events-none" />

        <div className="container-page relative z-10">
          <Reveal>
            <SectionLabel>FAQ</SectionLabel>
            <h1
              className="mt-4 font-display leading-[0.92] text-balance"
              style={{ fontSize: "clamp(3rem, 8vw, 6.5rem)" }}
            >
              Every question,<br />
              <span className="italic text-primary">answered.</span>
            </h1>
            <p className="mt-6 text-base text-foreground/65 leading-relaxed max-w-lg">
              Everything you want to know about AKPsi — rush, membership, dues, the network, and what brotherhood actually looks like day to day.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── MAIN CONTENT ── */}
      <section className="container-page pb-32">
        <div className="grid gap-12 lg:grid-cols-[220px_1fr] items-start">

          {/* Sticky category nav */}
          <nav className="lg:sticky lg:top-28 flex lg:flex-col gap-1 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => handleCategory(cat.id)}
                className="faq-cat-btn flex-shrink-0 text-left px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200"
                style={{
                  background: activeCategory === cat.id ? "hsl(var(--primary)/0.1)" : "transparent",
                  color: activeCategory === cat.id ? "hsl(var(--primary))" : "hsl(var(--foreground)/0.55)",
                  borderLeft: activeCategory === cat.id ? "2px solid hsl(var(--primary))" : "2px solid transparent",
                }}
              >
                {cat.label}
              </button>
            ))}
          </nav>

          {/* Questions */}
          <div key={animKey}>
            <div className="mb-8">
              <h2 className="text-2xl font-semibold">{active.label}</h2>
              <p className="text-sm text-muted-foreground mt-1">
                {active.questions.length} questions
              </p>
            </div>

            <div>
              {active.questions.map((item, i) => (
                <AccordionItem key={item.q} q={item.q} a={item.a} index={i} />
              ))}
            </div>

            {/* Still have questions CTA */}
            <div className="mt-16 rounded-3xl border border-border bg-card p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              <div>
                <p className="font-semibold text-lg">Still have questions?</p>
                <p className="text-sm text-foreground/60 mt-1">Reach out and a brother will get back to you.</p>
              </div>
              <a
                href="/contact"
                className="flex-shrink-0 rounded-full bg-primary text-background px-7 py-3 text-sm font-bold uppercase tracking-wide transition hover:opacity-85"
              >
                Contact us
              </a>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        /* Subtle dot-grid hero background */
        .faq-grid-bg {
          background-image: radial-gradient(circle, hsl(var(--border)) 1px, transparent 1px);
          background-size: 32px 32px;
          mask-image: linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.4) 30%, rgba(0,0,0,0.4) 70%, transparent 100%);
          -webkit-mask-image: linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.4) 30%, rgba(0,0,0,0.4) 70%, transparent 100%);
        }

        /* Staggered entrance for each FAQ item */
        .faq-item {
          opacity: 0;
          transform: translateY(12px);
          animation: faq-in 0.45s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
        @keyframes faq-in {
          to { opacity: 1; transform: translateY(0); }
        }

        /* Category button hover */
        .faq-cat-btn:hover {
          color: hsl(var(--foreground)/0.85);
          background: hsl(var(--muted)/0.5);
        }
      `}</style>
    </main>
  );
}
