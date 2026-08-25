import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import brotherhoodImg from "@/assets/mananya.jpeg";
import { Reveal } from "@/components/Reveal";
import { SectionLabel } from "@/components/SectionLabel";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Alpha Kappa Psi · Ohio State University" },
      {
        name: "description",
        content:
          "Mu Chapter of Alpha Kappa Psi is a premier co-ed professional business fraternity at The Ohio State University.",
      },
      { property: "og:title", content: "Alpha Kappa Psi · Ohio State" },
      {
        property: "og:description",
        content: "Brotherhood. Service. Integrity. Rechartered 2025 at OSU.",
      },
    ],
  }),
  component: Home,
});

function Home() {
  const heroRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;

    const move = (event: MouseEvent | TouchEvent) => {
      const point = "touches" in event ? event.touches[0] : event;
      if (!point) return;

      const rect = hero.getBoundingClientRect();
      const rawX = point.clientX - rect.left;
      const rawY = point.clientY - rect.top;

      const percentX = rawX / rect.width;
      const percentY = rawY / rect.height;

      const x = (percentX - 0.5) * 260;
      const y = (percentY - 0.5) * 260;

      hero.style.setProperty("--move-x", `${x}px`);
      hero.style.setProperty("--move-y", `${y}px`);
      hero.style.setProperty("--move-x-reverse", `${-x}px`);
      hero.style.setProperty("--move-y-reverse", `${-y}px`);
      hero.style.setProperty("--glow-x", `${rawX}px`);
      hero.style.setProperty("--glow-y", `${rawY}px`);
    };

    hero.addEventListener("mousemove", move);
    hero.addEventListener("touchmove", move, { passive: true });

    return () => {
      hero.removeEventListener("mousemove", move);
      hero.removeEventListener("touchmove", move);
    };
  }, []);

  return (
    <main className="min-h-screen bg-background text-foreground home-page">
      <section
        ref={heroRef}
        className="relative min-h-[118vh] overflow-hidden text-white"
        style={
          {
            "--move-x": "0px",
            "--move-y": "0px",
            "--move-x-reverse": "0px",
            "--move-y-reverse": "0px",
            "--glow-x": "50%",
            "--glow-y": "50%",
          } as React.CSSProperties
        }
      >
        <div className="absolute inset-0 bg-[#111111]" />

        <div className="absolute -left-[20%] top-[-5%] h-[70rem] w-[70rem] rounded-full bg-[#b11f3d]/95 blur-[75px] animate-blob-one" />
        <div className="absolute right-[-25%] top-[8%] h-[65rem] w-[65rem] rounded-full bg-[#7a0f24]/95 blur-[80px] animate-blob-two" />
        <div className="absolute left-[18%] bottom-[-28%] h-[75rem] w-[75rem] rounded-full bg-[#8d8d8d]/70 blur-[85px] animate-blob-three" />
        <div className="absolute left-[48%] top-[26%] h-[52rem] w-[52rem] rounded-full bg-[#dcdcdc]/40 blur-[75px] animate-blob-four" />
        <div className="absolute left-[5%] bottom-[8%] h-[45rem] w-[45rem] rounded-full bg-[#2a2a2a]/90 blur-[75px] animate-blob-five" />

        <div className="pointer-events-none absolute inset-0 z-[2] bg-[radial-gradient(circle_28rem_at_var(--glow-x)_var(--glow-y),rgba(255,255,255,0.58),rgba(180,180,180,0.25)_18%,rgba(177,31,61,0.22)_36%,transparent_62%)] transition-[background] duration-75" />

        <div
          className="pointer-events-none absolute inset-0 z-[1] transition-transform duration-150 ease-out"
          style={{ transform: "translate3d(var(--move-x), var(--move-y), 0)" }}
        >
          <div className="absolute left-[10%] top-[12%] h-[34rem] w-[34rem] rounded-full bg-white/35 blur-[70px]" />
          <div className="absolute left-[50%] top-[38%] h-[38rem] w-[38rem] rounded-full bg-[#ff2f5f]/50 blur-[80px]" />
        </div>

        <div
          className="pointer-events-none absolute inset-0 z-[1] transition-transform duration-150 ease-out"
          style={{ transform: "translate3d(var(--move-x-reverse), var(--move-y-reverse), 0)" }}
        >
          <div className="absolute right-[8%] top-[18%] h-[36rem] w-[36rem] rounded-full bg-[#ffd98a]/45 blur-[75px]" />
          <div className="absolute left-[28%] bottom-[8%] h-[40rem] w-[40rem] rounded-full bg-[#9b1028]/55 blur-[85px]" />
        </div>

        <div className="absolute inset-0 z-[3] bg-[radial-gradient(circle_at_50%_42%,transparent_0%,rgba(0,0,0,0.08)_36%,rgba(0,0,0,0.48)_100%)]" />

        <div className="relative z-10 flex min-h-[118vh] flex-col items-center justify-center px-6 pb-28 text-center">
          <h1 className="font-display text-[clamp(5.5rem,16vw,13rem)] leading-none tracking-tight drop-shadow-2xl">
            AKΨ
          </h1>

          <Link
            to="/recruitment"
            className="mt-6 rounded-full border border-white/55 px-8 py-2 text-sm font-bold uppercase tracking-wide backdrop-blur-md transition hover:bg-white/15"
          >
            Recruitment Application
          </Link>

          <p className="mt-44 text-lg font-semibold text-white/95 md:text-xl">
            Creating lifelong friendships and connections
          </p>
        </div>
      </section>

      <section className="container-page grid gap-12 py-24 lg:grid-cols-[0.7fr_1.3fr] items-center">
        <div className="overflow-hidden rounded-3xl bg-muted max-w-xs mx-auto lg:mx-0">
          <img
            src={brotherhoodImg}
            alt="Mu Chapter president portrait"
            className="h-full w-full object-cover aspect-[4/5]"
            loading="lazy"
            width={1600}
            height={1100}
          />
        </div>

        <Reveal>
          <div>
            <SectionLabel>President&apos;s welcome</SectionLabel>

            <h1 className="mt-4 font-display text-[clamp(3rem,7vw,6rem)] leading-[0.95] text-balance max-w-4xl">
              A message from the{" "}
              <span className="italic text-primary">president.</span>
            </h1>

            <p className="mt-6 text-base leading-relaxed text-foreground/80 max-w-2xl">
              As the premier professional business fraternity at Ohio State,
              Alpha Kappa Psi is nationally recognized for developing
              principled, ethical business leaders. It is with great excitement
              and pride that we invite you to explore our organization and learn
              what makes Mu Chapter unique.
            </p>

            <p className="mt-4 text-base leading-relaxed text-foreground/80 max-w-2xl">
              Our brotherhood is made up of driven, inspiring, and talented
              students from every college on campus. Originally chartered in
              1922 and rechartered in 2025, Mu Chapter has cultivated leaders
              across student government, entrepreneurship,
              varsity athletics, academics, and the professional world. Our
              alumni network connects us not only across Ohio State, but
              nationwide and abroad.
            </p>

            <p className="mt-4 text-base leading-relaxed text-foreground/80 max-w-2xl">
              We pride ourselves on exploring our shared interests in business
              while building a diverse family on campus. We work together by
              leaning on our strengths, serving our community, and providing the
              resources for academic, professional, and personal success.
            </p>

            <p className="mt-4 text-base leading-relaxed text-foreground/80 max-w-2xl">
              I am incredibly excited to serve as president of Mu Chapter. Many
              of my most meaningful experiences at Ohio State have been shaped
              by this organization. Alpha Kappa Psi offers infinite
              opportunities, lifelong friendships, and a community that pushes
              you to grow.
            </p>

            <p className="mt-8 text-sm text-muted-foreground">
              Thank you for your interest, and I look forward to meeting you at
              our next rush event.
              <span className="block font-semibold text-foreground mt-2">
                Mananya Ellendula, President
              </span>
            </p>

            <div className="mt-10 flex flex-wrap gap-4 text-sm">
              <Link to="/about" className="font-medium text-primary hover:underline">
                About Us
              </Link>
              <Link to="/brothers" className="font-medium text-foreground hover:underline">
                Our Members
              </Link>
              <Link to="/recruitment" className="font-medium text-foreground hover:underline">
                Recruitment
              </Link>
            </div>
          </div>
        </Reveal>
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
            {[
              { q: "Do I need to be a business major?",  a: "No. We welcome students from every college at OSU. What matters is ambition, character, and fit." },
              { q: "Is AKPsi a social fraternity?",      a: "No. We are a co-ed professional fraternity focused on career development, leadership, and brotherhood." },
              { q: "How much time does it take?",        a: "Recruitment usually lasts about two weeks. Active membership usually takes around two to four hours each week." },
              { q: "Does the network stay active?",      a: "Yes. Our alumni stay engaged long after graduation, and that network really does last." },
            ].map((item, i) => (
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
              <Link
                to="/faq"
                className="inline-flex items-center gap-2 rounded-full border border-border px-7 py-3 text-sm font-semibold text-foreground transition hover:bg-muted"
              >
                Read all {23} questions →
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <style>{`
        .home-page header a,
        .home-page nav a {
          color: white !important;
        }

        .home-faq-card {
          transition: border-color 0.2s ease, transform 0.2s ease;
        }
        .home-faq-card:hover {
          border-color: hsl(var(--primary) / 0.4);
          transform: translateY(-2px);
        }

        @keyframes blob-one {
          0%, 100% { transform: translate3d(0, 0, 0) scale(1); }
          25% { transform: translate3d(28%, 18%, 0) scale(1.25); }
          50% { transform: translate3d(12%, 42%, 0) scale(0.9); }
          75% { transform: translate3d(34%, 10%, 0) scale(1.15); }
        }
        @keyframes blob-two {
          0%, 100% { transform: translate3d(0, 0, 0) scale(1); }
          30% { transform: translate3d(-35%, 18%, 0) scale(1.22); }
          60% { transform: translate3d(-18%, 48%, 0) scale(1.35); }
          80% { transform: translate3d(-42%, 8%, 0) scale(0.95); }
        }
        @keyframes blob-three {
          0%, 100% { transform: translate3d(0, 0, 0) scale(1); }
          35% { transform: translate3d(-28%, -30%, 0) scale(1.25); }
          65% { transform: translate3d(24%, -45%, 0) scale(0.88); }
          85% { transform: translate3d(12%, -20%, 0) scale(1.2); }
        }
        @keyframes blob-four {
          0%, 100% { transform: translate3d(0, 0, 0) scale(1); }
          25% { transform: translate3d(-42%, 30%, 0) scale(1.35); }
          55% { transform: translate3d(30%, -28%, 0) scale(0.9); }
          78% { transform: translate3d(-12%, -16%, 0) scale(1.18); }
        }
        @keyframes blob-five {
          0%, 100% { transform: translate3d(0, 0, 0) scale(1); }
          33% { transform: translate3d(46%, -20%, 0) scale(1.28); }
          66% { transform: translate3d(20%, -50%, 0) scale(0.92); }
        }

        .animate-blob-one   { animation: blob-one   9s  ease-in-out infinite; }
        .animate-blob-two   { animation: blob-two   11s ease-in-out infinite; }
        .animate-blob-three { animation: blob-three 13s ease-in-out infinite; }
        .animate-blob-four  { animation: blob-four  10s ease-in-out infinite; }
        .animate-blob-five  { animation: blob-five  12s ease-in-out infinite; }
      `}</style>
    </main>
  );
}
