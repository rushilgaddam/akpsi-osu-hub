import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect, useRef } from "react";
import { toast } from "sonner";
import { Reveal } from "@/components/Reveal";
import { SectionLabel } from "@/components/SectionLabel";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const AKPSI_EMAIL = "alphakappapsiosu@gmail.com";

const schedule = [
  { title: "Applications open", detail: "Recruitment begins at the start of the semester and applications open shortly after." },
  { title: "Meet the brothers", detail: "Learn more about the chapter through a mix of professional and social events." },
  { title: "Applications due", detail: "Submit your application before recruitment wraps up for the semester." },
];

const faqs = [
  { q: "Do I need to be a business major?", a: "No. We welcome students from every college at OSU. What matters is ambition, character, and fit." },
  { q: "How much time does recruitment take?", a: "Recruitment usually lasts about two weeks. Active membership usually takes around two to four hours each week." },
  { q: "What does it cost?", a: "Dues cover national fees, chapter operations, and events. Payment support is available if needed." },
  { q: "Can I belong to other organizations?", a: "Yes. Many brothers are also in clubs, academic programs, and athletics. AKPsi works alongside other commitments." },
  { q: "How do I apply?", a: "Fill out the official application linked on this page. You can also submit the interest form below to get recruitment updates sent to your email in the meantime." },
];

export const Route = createFileRoute("/recruitment")({
  head: () => ({
    meta: [
      { title: "Recruitment · Alpha Kappa Psi Ohio State" },
      { name: "description", content: "Recruitment information for the Mu Chapter of Alpha Kappa Psi at Ohio State." },
    ],
  }),
  component: Recruitment,
});

export function Recruitment() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Slight delay so CSS transitions fire on mount
    const id = setTimeout(() => setMounted(true), 60);
    return () => clearTimeout(id);
  }, []);

  const [lastMessage, setLastMessage] = useState<{ subject: string; body: string } | null>(null);

  const onInterestSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const firstName = data.get("firstName") as string;
    const lastName = data.get("lastName") as string;
    const email = data.get("email") as string;
    const major = data.get("major") as string;
    const year = data.get("year") as string;
    const why = data.get("why") as string;

    const subject = `Recruitment interest: ${firstName} ${lastName}`;
    const body = [
      `Name: ${firstName} ${lastName}`,
      `Email: ${email}`,
      `Major: ${major || "—"}`,
      `Year: ${year || "—"}`,
      why ? `Why AKPsi: ${why}` : null,
    ]
      .filter(Boolean)
      .join("\n");

    window.location.href = `mailto:${AKPSI_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    // mailto only works if the visitor has a mail app configured, so keep the message
    // around and offer a copy-to-clipboard fallback in case nothing opened.
    setLastMessage({ subject, body });
    toast.success("Opening your email app to send this to AKPsi.");
    form.reset();
  };

  const copyInterestMessage = async () => {
    if (!lastMessage) return;
    await navigator.clipboard.writeText(`To: ${AKPSI_EMAIL}\nSubject: ${lastMessage.subject}\n\n${lastMessage.body}`);
    toast.success("Copied. Paste it into an email to " + AKPSI_EMAIL + ".");
  };

  return (
    <main className="min-h-screen bg-background text-foreground rush-page">

      {/* ── HERO ── */}
      <section
        className="relative flex flex-col items-center justify-center text-center overflow-hidden"
        style={{ minHeight: "100svh", background: "#0c0304" }}
      >
        {/* Slow breathing orb for the hero background */}
        <div className="rush-orb absolute rounded-full pointer-events-none" />

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center gap-8 px-6">


          {/* Headline */}
          <h1
            className="rush-fade-up rush-delay-1 font-display leading-[0.9] tracking-tight text-white"
            style={{ fontSize: "clamp(4.5rem, 14vw, 11rem)" }}
          >
            Recruitment<br />
            <span style={{ color: "#c8a96e" }}>AKΨ.</span>
          </h1>

          {/* Subline */}
          <p
            className="rush-fade-up rush-delay-2 text-base leading-relaxed max-w-sm"
            style={{ color: "rgba(255,255,255,0.5)" }}
          >
            Recruitment happens at the beginning of each semester.<br />
            Specific dates are posted on our social media.
          </p>

          {/* CTAs */}
          <div className="rush-fade-up rush-delay-4 flex flex-wrap justify-center gap-3 mt-2">
            <a
              href="https://forms.gle/GubbRonA7W2D899a9"
              target="_blank"
              rel="noreferrer"
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
                This form is the main point of contact for recruitment updates. We strongly encourage all students
                interested in joining AKPsi to sign up.
              </p>
              <div className="mt-6 space-y-3 text-sm text-muted-foreground">
                <p><strong>What you get:</strong></p>
                <p>Recruitment schedules, event locations, application reminders, and updates from the chapter.</p>
              </div>
              <a
                href="https://forms.gle/GubbRonA7W2D899a9"
                target="_blank"
                rel="noreferrer"
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary text-background px-6 py-3 text-sm font-bold uppercase tracking-wide transition hover:opacity-85"
              >
                Ready now? Go to the application →
              </a>
            </div>
          </Reveal>

          <form
            onSubmit={onInterestSubmit}
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

            {lastMessage && (
              <div className="rounded-2xl border border-border bg-muted/30 p-4 text-sm text-muted-foreground">
                Didn't see your email app open?{" "}
                <button type="button" onClick={copyInterestMessage} className="text-primary font-medium underline underline-offset-4">
                  Copy your info
                </button>{" "}
                and paste it into an email to {AKPSI_EMAIL} directly.
              </div>
            )}
          </form>
        </div>
      </section>

      {/* ── SCHEDULE ── */}
      <section id="schedule" className="bg-muted/30 py-24 border-t border-border">
        <div className="container-page">
          <SectionLabel>Recruitment timeline</SectionLabel>
          <div className="mt-10 space-y-4">
            {schedule.map((item, i) => (
              <Reveal key={item.title}>
                <div className="rounded-3xl border border-border bg-card p-6 flex flex-col gap-2 sm:flex-row sm:justify-between sm:items-center">
                  <div className="flex items-center gap-5">
                    <span className="text-2xl font-bold tabular-nums text-primary" style={{ minWidth: 28 }}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
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

      {/* ── FAQ TEASER ── */}
      <section className="border-t border-border bg-muted/20 py-24">
        <div className="container-page">
          <Reveal>
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-14">
              <div>
                <SectionLabel>FAQ</SectionLabel>
                <h2 className="mt-4 font-display text-[clamp(2.4rem,5vw,4rem)] leading-[0.95]">
                  Quick answers.
                </h2>
              </div>
              <Link
                to="/faq"
                className="self-start lg:self-auto text-sm font-semibold text-primary hover:underline underline-offset-4 flex items-center gap-1.5 flex-shrink-0"
              >
                See all questions
                <span aria-hidden>→</span>
              </Link>
            </div>
          </Reveal>

          <div className="grid gap-4 md:grid-cols-2">
            {faqs.slice(0, 4).map((item, i) => (
              <Reveal key={item.q}>
                <div className="home-faq-card rounded-2xl border border-border bg-card p-6 h-full" style={{ animationDelay: `${i * 0.07}s` }}>
                  <p className="font-semibold text-base mb-3">{item.q}</p>
                  <p className="text-sm text-foreground/65 leading-relaxed">{item.a}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <div className="mt-8 text-center">
              <Link to="/faq" className="inline-flex items-center gap-2 rounded-full border border-border px-7 py-3 text-sm font-semibold text-foreground transition hover:bg-muted">
                Read all questions →
              </Link>
            </div>
          </Reveal>
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
