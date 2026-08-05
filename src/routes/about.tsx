import { createFileRoute } from "@tanstack/react-router";
import { Clock3 } from "lucide-react";
import { useEffect, useRef, useState, useCallback } from "react";
import { Reveal } from "@/components/Reveal";
import { SectionLabel } from "@/components/SectionLabel";
import profImg from "@/assets/akpsi2.jpg";
import abstractRedImg from "@/assets/akpsi4.jpg";
import brotherhoodImg from "@/assets/akspi1.jpg";
import heroCampusImg from "@/assets/akpsi3.jpg";
import mainImg from "@/assets/akpsi5.jpg";

const chapterPillars = [
  {
    title: "Brotherhood",
    body: "We build real relationships across majors and graduation years through socials, retreats, and alumni mentorship. Brotherhood is how we keep each other accountable and connected.",
    image: brotherhoodImg,
  },
  {
    title: "Professionalism",
    body: "Our chapter focuses on useful career preparation through speaker events, resume review, interview practice, and alumni guidance. We care about practical support, not empty buzzwords.",
    image: profImg,
  },
  {
    title: "Leadership",
    body: "Every brother is expected to contribute. We rotate officers, run committees, and develop members to lead teams, events, and community initiatives.",
    image: abstractRedImg,
  },
  {
    title: "Service",
    body: "We give back through local philanthropy and campus partnerships, making an impact in Columbus while learning how to lead responsibly.",
    image: heroCampusImg,
  },
];

const networkCompanies = [
  "Amazon", "Apple", "Bain & Company", "Barclays",
  "Boston Consulting Group", "BlackRock", "Citadel", "Citi",
  "Deloitte", "Evercore", "Ernst & Young", "Goldman Sachs",
  "Google", "Guggenheim Partners", "JPMorgan Chase", "Jane Street",
  "KKR", "Lazard", "McKinsey & Company", "Meta",
  "Microsoft", "Morgan Stanley", "Notion", "NVIDIA",
  "Optiver", "PwC", "Rothschild & Co",
];

const benefits = [
  {
    title: "Community",
    body: "The people you meet will go on to be your closest friends, roommates, study partners, and mentors. The friendships you make are the most valuable asset AKPsi offers.",
  },
  {
    title: "Leadership",
    body: "From pledging to active brotherhood, there are opportunities to run events, chair committees, and shape the chapter. Leadership is earned through action.",
  },
  {
    title: "Network",
    body: "Our alumni network is one of the strongest resources we have. It spans top firms and career paths across the globe, and it stays active after graduation.",
  },
  {
    title: "Development",
    body: "From professional growth to personal development, the Mu Chapter supports your progress as a student, a leader, and a member of the community.",
  },
];

const cyclingWords = [
  "BROTHERHOOD.",
  "COMMUNITY.",
  "EXCELLENCE.",
  "FAMILY.",
  "LEGACY.",
];

// ------- Animated Globe Component -------
function GlobeCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const rotationRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctxOrNull = canvas.getContext("2d");
    if (!ctxOrNull) return;
    const ctx: CanvasRenderingContext2D = ctxOrNull;

    const W = canvas.width;
    const H = canvas.height;
    const cx = W / 2;
    const cy = H / 2;
    const R = Math.min(W, H) * 0.42;

    // Approximate world landmass dots (lat/lon in degrees)
    // Each entry: [lat, lon]
    const landDots: [number, number][] = [];

    // Generate a reasonable dot coverage using a simplified land mask
    // We'll use a deterministic approach with known continent bands
    const continentBands: [number, number, number, number][] = [
      // [minLat, maxLat, minLon, maxLon] approximate continent boxes
      // North America
      [25, 72, -168, -52],
      // South America
      [-55, 12, -82, -34],
      // Europe
      [36, 71, -10, 60],
      // Africa
      [-35, 37, -18, 52],
      // Asia
      [0, 77, 26, 150],
      // Australia
      [-43, -10, 113, 154],
      // Greenland
      [60, 84, -56, -18],
    ];

    // More refined exclusion zones (major oceans center)
    const oceanZones: [number, number, number, number][] = [
      // Pacific
      [-60, 60, -170, -100],
      [-60, 60, 140, 170],
      // Atlantic center
      [-50, 50, -40, -15],
      // Indian Ocean
      [-50, 20, 60, 100],
    ];

    function inContinent(lat: number, lon: number): boolean {
      for (const [minLat, maxLat, minLon, maxLon] of continentBands) {
        if (lat >= minLat && lat <= maxLat && lon >= minLon && lon <= maxLon) {
          // Exclude major ocean zones
          let inOcean = false;
          for (const [oMinLat, oMaxLat, oMinLon, oMaxLon] of oceanZones) {
            if (lat >= oMinLat && lat <= oMaxLat && lon >= oMinLon && lon <= oMaxLon) {
              inOcean = true;
              break;
            }
          }
          if (!inOcean) return true;
        }
      }
      return false;
    }

    // Generate dots
    const step = 6; // degrees between dots
    for (let lat = -80; lat <= 80; lat += step) {
      for (let lon = -180; lon <= 180; lon += step) {
        if (inContinent(lat, lon)) {
          // Add slight randomness so it doesn't look like a rigid grid
          const jitterLat = lat + (Math.random() - 0.5) * 2;
          const jitterLon = lon + (Math.random() - 0.5) * 2;
          landDots.push([jitterLat, jitterLon]);
        }
      }
    }

    // Also add a latitude/longitude grid (faint)
    const gridLines: [number, number][][] = [];
    for (let lat = -60; lat <= 60; lat += 30) {
      const line: [number, number][] = [];
      for (let lon = -180; lon <= 180; lon += 5) {
        line.push([lat, lon]);
      }
      gridLines.push(line);
    }
    for (let lon = -150; lon <= 180; lon += 30) {
      const line: [number, number][] = [];
      for (let lat = -90; lat <= 90; lat += 5) {
        line.push([lat, lon]);
      }
      gridLines.push(line);
    }

    function latLonToXYZ(lat: number, lon: number, rotation: number): { x: number; y: number; z: number } {
      const phi = (90 - lat) * (Math.PI / 180);
      const theta = (lon + rotation) * (Math.PI / 180);
      return {
        x: Math.sin(phi) * Math.cos(theta),
        y: Math.cos(phi),
        z: Math.sin(phi) * Math.sin(theta),
      };
    }

    function draw(rotation: number) {
      ctx.clearRect(0, 0, W, H);

      // Globe background sphere
      const gradient = ctx.createRadialGradient(cx - R * 0.2, cy - R * 0.2, R * 0.1, cx, cy, R);
      gradient.addColorStop(0, "rgba(30, 10, 10, 0.85)");
      gradient.addColorStop(1, "rgba(8, 0, 0, 0.95)");
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.fill();

      // Subtle rim glow (scarlet)
      const rimGlow = ctx.createRadialGradient(cx, cy, R * 0.85, cx, cy, R * 1.05);
      rimGlow.addColorStop(0, "rgba(190, 20, 20, 0)");
      rimGlow.addColorStop(0.7, "rgba(190, 20, 20, 0.12)");
      rimGlow.addColorStop(1, "rgba(190, 20, 20, 0)");
      ctx.beginPath();
      ctx.arc(cx, cy, R * 1.05, 0, Math.PI * 2);
      ctx.fillStyle = rimGlow;
      ctx.fill();

      // Draw grid lines (very faint)
      for (const line of gridLines) {
        let started = false;
        ctx.beginPath();
        for (const [lat, lon] of line) {
          const { x, y, z } = latLonToXYZ(lat, lon, rotation);
          if (z < 0) { started = false; continue; }
          const sx = cx + x * R;
          const sy = cy - y * R;
          if (!started) { ctx.moveTo(sx, sy); started = true; }
          else ctx.lineTo(sx, sy);
        }
        ctx.strokeStyle = "rgba(180, 30, 30, 0.08)";
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }

      // Draw land dots
      for (const [lat, lon] of landDots) {
        const { x, y, z } = latLonToXYZ(lat, lon, rotation);
        if (z < 0) continue; // behind the globe

        const sx = cx + x * R;
        const sy = cy - y * R;
        const depth = (z + 1) / 2; // 0 to 1, 1 = closest

        // Dots near edge fade out
        const edgeFade = Math.min(1, z * 3);

        ctx.beginPath();
        ctx.arc(sx, sy, 1.5, 0, Math.PI * 2);

        // Color: scarlet for bright dots, dim gold for distant
        const alpha = 0.3 + depth * 0.6;
        ctx.fillStyle = `rgba(220, 40, 40, ${alpha * edgeFade})`;
        ctx.fill();
      }

      // Specular highlight
      const specular = ctx.createRadialGradient(cx - R * 0.35, cy - R * 0.35, 0, cx - R * 0.2, cy - R * 0.3, R * 0.5);
      specular.addColorStop(0, "rgba(255, 255, 255, 0.06)");
      specular.addColorStop(1, "rgba(255, 255, 255, 0)");
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.fillStyle = specular;
      ctx.fill();
    }

    function animate() {
      rotationRef.current += 0.12;
      draw(rotationRef.current);
      animRef.current = requestAnimationFrame(animate);
    }

    animate();

    return () => cancelAnimationFrame(animRef.current);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      width={420}
      height={420}
      style={{
        width: "100%",
        maxWidth: 420,
        height: "auto",
        display: "block",
      }}
    />
  );
}

// ------- Counting Number Component -------
function CountingNumber({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [current, setCurrent] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const duration = 1800;
          const start = performance.now();
          const tick = (now: number) => {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            // Ease out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            setCurrent(Math.floor(eased * target));
            if (progress < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return <span ref={ref}>{current}{suffix}</span>;
}

// ------- Cycling Word Headline -------
function CyclingHeadline() {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const cycle = () => {
      setVisible(false);
      setTimeout(() => {
        setIndex((i) => (i + 1) % cyclingWords.length);
        setVisible(true);
      }, 400);
    };
    const id = setInterval(cycle, 3000);
    return () => clearInterval(id);
  }, []);

  return (
    <span
      className="italic text-primary cycling-word"
      style={{
        display: "inline-block",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(12px)",
        transition: "opacity 0.4s ease, transform 0.4s ease",
      }}
    >
      {cyclingWords[index]}
    </span>
  );
}

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About · Alpha Kappa Psi at Ohio State" },
      { name: "description", content: "History, values, and mission of the Mu Chapter of Alpha Kappa Psi at The Ohio State University." },
      { property: "og:title", content: "About · AKPsi Ohio State" },
      { property: "og:description", content: "Founded 1922. The premier co-ed business fraternity at OSU." },
    ],
  }),
  component: About,
});

function About() {
  return (
    <>
      {/* ── HERO ── */}
      <section className="relative pt-40 pb-0 overflow-hidden">
        {/* Full-bleed dark hero background */}
        <div
          className="absolute inset-0 -z-10"
          style={{ background: "linear-gradient(180deg, hsl(0 0% 4%) 0%, hsl(0 0% 6%) 100%)" }}
        />

        <div className="container-page">
          <Reveal>
            <SectionLabel>About</SectionLabel>

            {/* Two-column hero: text left, globe right */}
            <div className="mt-8 grid gap-8 lg:grid-cols-[1.1fr_0.9fr] items-center min-h-[480px]">
              <div>
                <h1
                  className="mt-4 font-display leading-[0.95] text-balance"
                  style={{ fontSize: "clamp(2.8rem, 7vw, 5.5rem)", color: "#fff" }}
                >
                  We are a lifelong
                  <br />
                  <CyclingHeadline />
                </h1>
                <p className="mt-6 text-base leading-relaxed max-w-xl" style={{ color: "rgba(255,255,255,0.65)" }}>
                  Alpha Kappa Psi is the oldest and most premier business fraternity on campus.
                  We are a co-ed organization with access to a large alumni network spanning top companies
                  and career paths across the globe. We are a chapter that prides itself on diversity and
                  uniqueness while balancing professional development with genuine social bonds.
                  The benefits of AKPsi don't stop after pledging or even graduation.
                </p>
              </div>

              {/* Globe */}
              <div className="flex items-center justify-center lg:justify-end">
                <div style={{ position: "relative", width: "100%", maxWidth: 420 }}>
                  <GlobeCanvas />
                  {/* Floating stat pills over globe */}
                  <div
                    style={{
                      position: "absolute",
                      top: "12%",
                      left: "-8%",
                      background: "rgba(20,5,5,0.85)",
                      border: "1px solid rgba(190,20,20,0.4)",
                      borderRadius: 12,
                      padding: "10px 18px",
                      backdropFilter: "blur(12px)",
                      color: "#fff",
                    }}
                  >
                    <div style={{ fontSize: 22, fontWeight: 700, color: "#e03030", lineHeight: 1 }}>500+</div>
                    <div style={{ fontSize: 11, color: "rgba(255,255,255,0.55)", marginTop: 3, letterSpacing: "0.1em", textTransform: "uppercase" }}>Alumni</div>
                  </div>
                  <div
                    style={{
                      position: "absolute",
                      bottom: "18%",
                      right: "-6%",
                      background: "rgba(20,5,5,0.85)",
                      border: "1px solid rgba(190,20,20,0.4)",
                      borderRadius: 12,
                      padding: "10px 18px",
                      backdropFilter: "blur(12px)",
                      color: "#fff",
                    }}
                  >
                    <div style={{ fontSize: 22, fontWeight: 700, color: "#e03030", lineHeight: 1 }}>27+</div>
                    <div style={{ fontSize: 11, color: "rgba(255,255,255,0.55)", marginTop: 3, letterSpacing: "0.1em", textTransform: "uppercase" }}>Top Firms</div>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Fade into page background */}
        <div
          className="h-24 w-full"
          style={{ background: "linear-gradient(180deg, hsl(0 0% 6%) 0%, transparent 100%)" }}
        />
      </section>

      {/* ── STATS ── */}
      <section className="container-page py-20">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { value: 500, suffix: "+", label: "Alumni" },
            { value: 100, suffix: "+", label: "Members" },
            { value: 20,  suffix: "+", label: "Industries" },
            { value: 10,  suffix: "+", label: "Majors" },
          ].map((item) => (
            <div key={item.label} className="border-b border-border pb-4">
              <div className="text-4xl font-semibold text-foreground">
                <CountingNumber target={item.value} suffix={item.suffix} />
              </div>
              <div className="mt-2 text-sm uppercase tracking-[0.25em] text-muted-foreground">{item.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── NETWORK MARQUEE ── */}
      <section className="py-24 overflow-hidden" style={{ background: "hsl(var(--muted)/0.3)" }}>
        <div className="container-page">
          <SectionLabel>Our network</SectionLabel>
          <p className="mt-4 max-w-3xl text-foreground/80 leading-relaxed">
            Our brothers have gone on to work at top firms across consulting, finance, technology, and more.
          </p>
        </div>

        {/* Row 1 from left to right */}
        <div className="mt-10 relative">
          <div
            className="marquee-track"
            style={{
              display: "flex",
              gap: 12,
              width: "max-content",
              animation: "marqueeLeft 40s linear infinite",
            }}
          >
            {[...networkCompanies, ...networkCompanies].map((company, i) => (
              <CompanyPill key={`r1-${i}`} name={company} />
            ))}
          </div>
        </div>

        {/* Row 2 from right to left for variety */}
        <div className="mt-3 relative">
          <div
            style={{
              display: "flex",
              gap: 12,
              width: "max-content",
              animation: "marqueeRight 45s linear infinite",
            }}
          >
            {[...networkCompanies.slice().reverse(), ...networkCompanies.slice().reverse()].map((company, i) => (
              <CompanyPill key={`r2-${i}`} name={company} dim />
            ))}
          </div>
        </div>

        <style>{`
          @keyframes marqueeLeft {
            from { transform: translateX(0); }
            to { transform: translateX(-50%); }
          }
          @keyframes marqueeRight {
            from { transform: translateX(-50%); }
            to { transform: translateX(0); }
          }
          @media (prefers-reduced-motion: reduce) {
            .marquee-track, [style*="marqueeLeft"], [style*="marqueeRight"] {
              animation: none !important;
            }
          }
        `}</style>
      </section>

      {/* ── BENEFITS ── */}
      <section className="container-page py-24">
        <SectionLabel>Benefits</SectionLabel>
        <div className="mt-10 grid gap-10 lg:grid-cols-2">
          {benefits.map((item) => (
            <div key={item.title} className="border-b border-border pb-6">
              <h3 className="text-2xl font-semibold">{item.title}</h3>
              <p className="mt-4 text-base text-foreground/80 leading-relaxed">{item.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CHAPTER PILLARS ── */}
      <section className="container-page py-32">
        <SectionLabel>Chapter pillars</SectionLabel>
        <h2 className="mt-4 text-4xl md:text-5xl font-semibold leading-tight">The four values that guide Mu Chapter.</h2>
        <div className="mt-12 space-y-16">
          {chapterPillars.map((pillar, index) => (
            <div key={pillar.title} className="grid gap-8 items-center lg:grid-cols-[1fr_1fr]">
              <div className={`${index % 2 === 1 ? "lg:order-2" : "lg:order-1"} overflow-hidden rounded-3xl bg-muted`}>
                <img
                  src={pillar.image}
                  alt={pillar.title}
                  className="h-full w-full object-cover min-h-[280px]"
                  loading="lazy"
                  width={1600}
                  height={1100}
                />
              </div>
              <div className={`${index % 2 === 1 ? "lg:order-1" : "lg:order-2"}`}>
                <h3 className="text-3xl font-semibold">{pillar.title}</h3>
                <p className="mt-4 text-lg text-foreground/80 leading-relaxed max-w-xl">{pillar.body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── TIMELINE ── */}
      <section className="bg-muted/30 text-foreground py-32 border-y border-border">
        <div className="container-page">
          <SectionLabel>Timeline</SectionLabel>
          <h2 className="mt-4 text-4xl md:text-5xl font-semibold leading-tight">A century in scarlet.</h2>
          <div className="mt-10 flex items-center gap-4">
            <div className="h-px flex-1 bg-border/50" />
            <Clock3 className="h-12 w-12 text-primary/90" />
            <div className="h-px flex-1 bg-border/50" />
          </div>
          <div className="mt-16 space-y-6 max-w-3xl">
            {[
              { year: "1904", text: "Alpha Kappa Psi was founded at NYU and became the first professional business fraternity in the United States." },
              { year: "1922", text: "Mu Chapter chartered at The Ohio State University." },
              { year: "1976", text: "Chapter becomes co-educational, opening membership to all genders." },
              { year: "2010", text: "Mu Chapter recognized with the national Chapter of Excellence award." },
              { year: "2022", text: "Centennial celebration marked 100 years of brotherhood at OSU." },
              { year: "Today", text: "120+ active brothers and a 3,500+ alumni network spanning Fortune 500s, top consulting firms, and bulge-bracket banks." },
            ].map((t) => (
              <div key={t.year} className="flex flex-col gap-3 border-b border-border pb-6">
                <div className="text-xl font-semibold text-foreground">{t.year}</div>
                <div className="text-base text-foreground/80 leading-relaxed">{t.text}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

// ── Company Pill ──
function CompanyPill({ name, dim = false }: { name: string; dim?: boolean }) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 10,
        padding: "10px 20px",
        borderRadius: 999,
        border: dim ? "1px solid hsl(var(--border)/0.5)" : "1px solid hsl(var(--border))",
        background: dim ? "hsl(var(--muted)/0.4)" : "hsl(var(--background))",
        fontSize: 13,
        fontWeight: 500,
        letterSpacing: "0.04em",
        color: dim ? "hsl(var(--foreground)/0.5)" : "hsl(var(--foreground)/0.8)",
        whiteSpace: "nowrap",
        userSelect: "none",
      }}
    >
      {/* Monogram dot */}
      <span
        style={{
          width: 6,
          height: 6,
          borderRadius: "50%",
          background: dim ? "hsl(var(--muted-foreground)/0.4)" : "hsl(var(--primary))",
          flexShrink: 0,
        }}
      />
      {name}
    </span>
  );
}
