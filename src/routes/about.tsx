import { createFileRoute } from "@tanstack/react-router";
import { Reveal, Stagger, itemVariants } from "@/components/Reveal";
import { SectionLabel } from "@/components/SectionLabel";
import { motion } from "framer-motion";
import brotherhoodImg from "@/assets/brotherhood.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About · Alpha Kappa Psi at Ohio State" },
      { name: "description", content: "History, values, and mission of the Beta Iota Chapter of Alpha Kappa Psi at The Ohio State University." },
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
          <h1 className="mt-4 font-display text-[clamp(3rem,8vw,7rem)] leading-[0.95] text-balance max-w-5xl">
            One hundred years of <span className="italic text-primary">principled leadership.</span>
          </h1>
          <p className="mt-8 text-xl text-muted-foreground max-w-2xl">
            The Beta Iota Chapter of Alpha Kappa Psi was chartered at The Ohio
            State University in 1922 — making it one of the oldest professional
            business fraternities in the Midwest.
          </p>
        </Reveal>
      </section>

      <section className="container-page pb-32">
        <Reveal>
          <div className="aspect-[16/8] rounded-3xl overflow-hidden">
            <img src={brotherhoodImg} alt="Brotherhood" loading="lazy" className="h-full w-full object-cover" width={1600} height={1100} />
          </div>
        </Reveal>
      </section>

      <section className="container-page pb-32 grid lg:grid-cols-2 gap-20">
        <Reveal>
          <SectionLabel>Our mission</SectionLabel>
          <h2 className="mt-4 font-display text-4xl md:text-5xl leading-tight">
            To develop principled business leaders.
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Alpha Kappa Psi shapes its members through professional development,
            community service, and lasting brotherhood. At Beta Iota, that mission
            takes the form of a rigorous pledge process, weekly professional
            workshops, philanthropy partnerships across Columbus, and a 3,500+
            strong alumni network that opens doors well after graduation.
          </p>
          <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
            We don't pretend to be everything to everyone. We're a fraternity for
            students who want both — the lifelong friends and the career.
          </p>
        </Reveal>
      </section>

      <section className="bg-foreground text-background py-32">
        <div className="container-page">
          <Reveal>
            <SectionLabel>Timeline</SectionLabel>
            <h2 className="mt-4 font-display text-5xl md:text-6xl text-background">A century in scarlet.</h2>
          </Reveal>
          <Stagger className="mt-16 space-y-6 max-w-3xl">
            {[
              { year: "1904", text: "Alpha Kappa Psi founded at NYU — the first professional business fraternity in the United States." },
              { year: "1922", text: "Beta Iota Chapter chartered at The Ohio State University." },
              { year: "1976", text: "Chapter becomes co-educational, opening membership to all genders." },
              { year: "2010", text: "Beta Iota recognized with the national Chapter of Excellence award." },
              { year: "2022", text: "Centennial celebration — 100 years of brotherhood at OSU." },
              { year: "Today", text: "120+ active brothers and a 3,500+ alumni network spanning Fortune 500s, top consulting firms, and bulge-bracket banks." },
            ].map((t) => (
              <motion.div
                key={t.year}
                variants={itemVariants}
                className="flex gap-8 border-b border-background/10 pb-6"
              >
                <div className="font-display text-3xl text-primary w-28 shrink-0">{t.year}</div>
                <div className="text-background/80 text-lg leading-relaxed pt-1">{t.text}</div>
              </motion.div>
            ))}
          </Stagger>
        </div>
      </section>
    </>
  );
}
