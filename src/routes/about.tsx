import { createFileRoute } from "@tanstack/react-router";
import { Clock3 } from "lucide-react";
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
    body: "We build real relationships across majors and graduation years — from socials to retreats to alumni mentorship. Brotherhood is how we keep each other accountable and connected.",
    image: brotherhoodImg,
  },
  {
    title: "Professionalism",
    body: "Our chapter focuses on useful career preparation through speaker events, resume review, interview practice, and alumni guidance — not empty buzzwords.",
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
  "Amazon",
  "Apple",
  "Bain & Company",
  "Barclays",
  "Boston Consulting Group",
  "BlackRock",
  "Citadel",
  "Citi",
  "Deloitte",
  "Evercore",
  "Ernst & Young",
  "Goldman Sachs",
  "Google",
  "Guggenheim Partners",
  "JPMorgan Chase",
  "Jane Street",
  "KKR",
  "Lazard",
  "McKinsey & Company",
  "Meta",
  "Microsoft",
  "Morgan Stanley",
  "Notion",
  "NVIDIA",
  "Optiver",
  "PwC",
  "Rothschild & Co",
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
      <section className="relative pt-40 pb-20 container-page">
        <Reveal>
          <SectionLabel>About</SectionLabel>
          <div className="mt-10 grid gap-12 lg:grid-cols-[1.1fr_0.9fr] items-center">
            <div>
              <h1 className="mt-4 font-display text-[clamp(3rem,7vw,6rem)] leading-[0.95] text-balance max-w-4xl">
                We are a lifelong <span className="italic text-primary">brotherhood.</span>
              </h1>
              <p className="mt-6 text-base text-foreground/80 leading-relaxed max-w-3xl">
                Alpha Kappa Psi is the oldest and most premier business fraternity on campus.
                We are a co-ed organization with access to a large alumni network spanning top companies and career paths across the globe.
                We are a chapter that prides itself on diversity and uniqueness. As a brotherhood, we seek to balance professional development and social bonding.
                The benefits of AKPsi don't stop after pledging or even graduation. Alpha Kappa Psi is truly a lifelong organization.
              </p>
            </div>
            <div className="overflow-hidden rounded-3xl bg-muted">
              <img
                src={mainImg}
                alt="Ohio State campus and Mu Chapter"
                className="h-full w-full object-cover min-h-[320px]"
                loading="lazy"
                width={1600}
                height={1100}
              />
            </div>
          </div>
        </Reveal>
      </section>

      <section className="container-page py-24">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { value: "500+", label: "Alumni" },
            { value: "100+", label: "Members" },
            { value: "20+", label: "Industries" },
            { value: "10+", label: "Majors" },
          ].map((item) => (
            <div key={item.label} className="border-b border-border pb-4">
              <div className="text-4xl font-semibold text-foreground">{item.value}</div>
              <div className="mt-2 text-sm uppercase tracking-[0.25em] text-muted-foreground">{item.label}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-muted/30 text-foreground py-24">
        <div className="container-page">
          <SectionLabel>Our network</SectionLabel>
          <p className="mt-4 max-w-3xl text-foreground/80 leading-relaxed">
            Our brothers have gone on to work at top firms across consulting, finance, technology, and more. Here are some of the companies where Mu Chapter members have built careers.
          </p>
          <div className="mt-10 overflow-hidden rounded-3xl border border-border bg-background/80 ring-1 ring-white/10">
            <div className="marquee flex whitespace-nowrap gap-6 py-6 px-6">
              {networkCompanies.concat(networkCompanies).map((company, index) => (
                <span key={`${company}-${index}`} className="inline-flex items-center justify-center rounded-full border border-border/60 bg-muted/70 px-5 py-3 text-sm font-medium uppercase tracking-[0.12em] text-foreground/80 shadow-sm">
                  {company}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

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
              { year: "1904", text: "Alpha Kappa Psi founded at NYU — the first professional business fraternity in the United States." },
              { year: "1922", text: "Mu Chapter chartered at The Ohio State University." },
              { year: "1976", text: "Chapter becomes co-educational, opening membership to all genders." },
              { year: "2010", text: "Mu Chapter recognized with the national Chapter of Excellence award." },
              { year: "2022", text: "Centennial celebration — 100 years of brotherhood at OSU." },
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
