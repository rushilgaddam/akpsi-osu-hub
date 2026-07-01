import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect, useRef } from "react";
import { Reveal } from "@/components/Reveal";
import { SectionLabel } from "@/components/SectionLabel";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const schedule = [
  { date: "January 7",  title: "Applications open",  detail: "Applications for Winter 2026 are live." },
  { date: "January 13", title: "Winterfest",          detail: "Meet the brothers and learn more about rush." },
  { date: "January 14", title: "Mass meeting",        detail: "Hear from the EBoard and walk through membership." },
  { date: "January 23", title: "Coffee chats",        detail: "Informal conversations with brothers across majors." },
  { date: "January 24", title: "DEI event",           detail: "Learn how we cultivate an inclusive chapter." },
  { date: "January 25", title: "Applications due",    detail: "Submit by 11:59 PM to be considered." },
];

const faqs = [
  { q: "Do I need to be a business major?",    a: "No. We welcome students from every college at OSU. What matters is ambition, character, and fit." },
  { q: "How much time does rush take?",        a: "Rush events are spread over one week. Active membership averages 5–8 hours per week." },
  { q: "What does it cost?",                   a: "Dues cover national fees, chapter operations, and events. Payment support is available if needed." },
  { q: "Can I belong to other organizations?", a: "Yes. Many brothers are also in clubs, academic programs, and athletics. AKPsi works alongside other commitments." },
  { q: "How do I apply?",                      a: "Fill out the interest form on this page and we will send rush details to your email." },
];

const DEADLINE = new Date("2026-01-25T23:59:00");

function useCountdown(target: Date) {
  const calc = () => {
    const diff = target.getTime() - Date.now();
    if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, expired: true };
    return {
      days:    Math.floor(diff / 86400000),
      hours:   Math.floor((diff % 86400000) / 3600000),
      minutes: Math.floor((diff % 3600000)  / 60000),
      seconds: Math.floor((diff % 60000)    / 1000),
      expired: false,
    };
  };
  const [t, setT] = useState(calc);
  useEffect(() => {
    const id = setInterval(() => setT(calc()), 1000);
    return () => clearInterval(id);
  }, []);
  return t;
}

export const Route = createFileRoute("/recruitment")({
  head: () => ({
    meta: [
      { title: "Rush · Alpha Kappa Psi Ohio State" },
      { name: "description", content: "Winter 2026 recruitment for the Mu Chapter of Alpha Kappa Psi at OSU." },
    ],
  }),
  component: Recruitment,
});

export function Recruitment() {
  const { days, hours, minutes, seconds, expired } = useCountdown(DEADLINE);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Slight delay so CSS transitions fire on mount
    const id = setTimeout(() => setMounted(true), 60);
    return () => clearTimeout(id);
  }, []);

  return (
    <main className="min-h-screen bg-background text-foreground rush-page">

      {/* ── HERO ── */}
      <section
        className="relative flex flex-col items-center justify-center text-center overflow-hidden"
        style={{ minHeight: "100svh", background: "#0c0304" }}
      >
        {/* Slow breathing orb — single, centred, calm */}
        <div className="rush-orb absolute rounded-full pointer-events-none" />

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center gap-8 px-6">

          {/* Eyebrow */}
          <span
            className="rush-fade-up rush-delay-0 text-[11px] font-semibold uppercase tracking-[0.35em]"
            style={{ color: "rgba(255,255,255,0.35)" }}
          >
            Winter 2026 · Mu Chapter
          </span>

          {/* Headline */}
          <h1
            className="rush-fade-up rush-delay-1 font-display leading-[0.9] tracking-tight text-white"
            style={{ fontSize: "clamp(4.5rem, 14vw, 11rem)" }}
          >
            Rush<br />
            <span style={{ color: "#c8a96e" }}>AKΨ.</span>
          </h1>

          {/* Subline */}
          <p
            className="rush-fade-up rush-delay-2 text-base leading-relaxed max-w-sm"
            style={{ color: "rgba(255,255,255,0.5)" }}
          >
            One week. A lifetime of connections.<br />
            Applications close January 25th.
          </p>

          {/* Countdown */}
          {!expired && (
            <div className="rush-fade-up rush-delay-3 flex items-end gap-6 md:gap-10">
              {[
                { val: days,    label: "Days" },
                { val: hours,   label: "Hours" },
                { val: minutes, label: "Min" },
                { val: seconds, label: "Sec" },
              ].map(({ val, label }, i) => (
                <div key={label} className="flex flex-col items-center gap-1">
                  <span
                    className="font-display tabular-nums leading-none text-white"
                    style={{ fontSize: "clamp(2.2rem, 6vw, 4rem)" }}
                  >
                    {String(val).padStart(2, "0")}
                  </span>
                  <span
                    className="text-[10px] uppercase tracking-[0.25em]"
                    style={{ color: "rgba(255,255,255,0.3)" }}
                  >
                    {label}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* CTAs */}
          <div className="rush-fade-up rush-delay-4 flex flex-wrap justify-center gap-3 mt-2">
            <a
              href="#interest-form"
              className="rounded-full bg-white text-black px-8 py-3 text-sm font-bold uppercase tracking-wide transition-opacity hover:opacity-80"
            >
              Apply now
            </a>
            <a
              href="#schedule"
              className="rounded-full border text-white px-8 py-3 text-sm font-semibold uppercase tracking-wide transition-opacity hover:opacity-70"
              style={{ borderColor: "rgba(255,255,255,0.25)" }}
            >
              View schedule
            </a>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 rush-scroll-hint">
          <div className="w-px h-10 mx-auto" style={{ background: "linear-gradient(to bottom, transparent, rgba(255,255,255,0.25))" }} />
        </div>
      </section>

      {/* ── INTEREST FORM ── */}
      <section id="interest-form" className="container-page py-24">
        <div className="grid gap-10 lg:grid-cols-[1fr_0.95fr] items-start">
          <Reveal>
            <div className="rounded-3xl border border-border bg-card p-10">
              <SectionLabel>Interest form</SectionLabel>
              <h2 className="mt-4 text-3xl font-semibold">Get on the list.</h2>
              <p className="mt-4 text-base text-foreground/80 leading-relaxed">
                This form is the main point of contact for rush updates. We strongly encourage all students
                interested in joining AKPsi to sign up.
              </p>
              <div className="mt-6 space-y-3 text-sm text-muted-foreground">
                <p><strong>What you get:</strong></p>
                <p>Rush schedules, event locations, application reminders, and recruitment updates.</p>
              </div>
            </div>
          </Reveal>

          <form
            onSubmit={(e: React.FormEvent) => e.preventDefault()}
            className="rounded-3xl border border-border bg-card p-10 space-y-4"
          >
            <Input required name="firstName" placeholder="First name"           className="h-12 rounded-xl" />
            <Input required name="lastName"  placeholder="Last name"            className="h-12 rounded-xl" />
            <Input required type="email" name="email" placeholder="OSU email"   className="h-12 rounded-xl" />
            <div className="grid sm:grid-cols-2 gap-4">
              <Input name="major" placeholder="Major"                           className="h-12 rounded-xl" />
              <Input name="year"  placeholder="Year (Fr / So / Jr / Sr)"        className="h-12 rounded-xl" />
            </div>
            <Textarea name="why" placeholder="Why AKPsi? (optional)" rows={4}   className="rounded-xl" />
            <Button type="submit" className="w-full sm:w-auto rounded-full bg-primary text-background h-12 px-7">
              Submit Interest
            </Button>
          </form>
        </div>
      </section>

      {/* ── SCHEDULE ── */}
      <section id="schedule" className="bg-muted/30 py-24 border-t border-border">
        <div className="container-page">
          <SectionLabel>Winter 2026 schedule</SectionLabel>
          <div className="mt-10 space-y-4">
            {schedule.map((item, i) => (
              <Reveal key={item.date}>
                <div className="rounded-3xl border border-border bg-card p-6 flex flex-col gap-2 sm:flex-row sm:justify-between sm:items-center">
                  <div className="flex items-center gap-5">
                    <span className="text-2xl font-bold tabular-nums text-primary" style={{ minWidth: 28 }}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <div className="text-xs uppercase tracking-[0.25em] text-muted-foreground">{item.date}</div>
                      <div className="mt-1 text-xl font-semibold">{item.title}</div>
                    </div>
                  </div>
                  <div className="text-sm text-foreground/70 max-w-sm sm:text-right">{item.detail}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="container-page py-24">
        <SectionLabel>FAQ</SectionLabel>
        <div className="mt-10 space-y-4">
          {faqs.map((item, index) => (
            <details key={index} className="rounded-3xl border border-border bg-card p-6">
              <summary className="cursor-pointer text-lg font-semibold">{item.q}</summary>
              <p className="mt-3 text-foreground/75 leading-relaxed">{item.a}</p>
            </details>
          ))}
        </div>
      </section>

      <style>{`
        /* Navbar white text over dark hero */
        .rush-page header a,
        .rush-page nav a {
          color: white !important;
        }

        /* Single slow-breathing background orb */
        .rush-orb {
          width: min(80vw, 600px);
          height: min(80vw, 600px);
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background: radial-gradient(circle, rgba(190, 20, 30, 0.35) 0%, rgba(140, 10, 20, 0.15) 45%, transparent 70%);
          animation: rush-breathe 7s ease-in-out infinite;
          filter: blur(1px);
        }

        @keyframes rush-breathe {
          0%, 100% { transform: translate(-50%, -50%) scale(1);    opacity: 0.8; }
          50%       { transform: translate(-50%, -50%) scale(1.12); opacity: 1;   }
        }

        /* Staggered fade-up entrance */
        .rush-fade-up {
          opacity: 0;
          transform: translateY(24px);
          animation: rush-up 0.9s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
        .rush-delay-0 { animation-delay: 0.1s; }
        .rush-delay-1 { animation-delay: 0.25s; }
        .rush-delay-2 { animation-delay: 0.4s; }
        .rush-delay-3 { animation-delay: 0.55s; }
        .rush-delay-4 { animation-delay: 0.7s; }

        @keyframes rush-up {
          to { opacity: 1; transform: translateY(0); }
        }

        /* Scroll hint pulse */
        .rush-scroll-hint {
          animation: rush-pulse 2.5s ease-in-out infinite;
        }
        @keyframes rush-pulse {
          0%, 100% { opacity: 0.2; transform: translateX(-50%) translateY(0); }
          50%       { opacity: 0.5; transform: translateX(-50%) translateY(5px); }
        }

        @media (prefers-reduced-motion: reduce) {
          .rush-fade-up  { animation: none; opacity: 1; transform: none; }
          .rush-orb      { animation: none; }
          .rush-scroll-hint { animation: none; }
        }
      `}</style>
    </main>
  );
}
