import { createFileRoute, Link } from "@tanstack/react-router";
import brotherhoodImg from "@/assets/addi.jpg";
import { Reveal } from "@/components/Reveal";
import { SectionLabel } from "@/components/SectionLabel";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Alpha Kappa Psi · Ohio State University" },
      { name: "description", content: "Mu Chapter of Alpha Kappa Psi — premier co-ed professional business fraternity at The Ohio State University." },
      { property: "og:title", content: "Alpha Kappa Psi · Ohio State" },
      { property: "og:description", content: "Brotherhood. Professionalism. Service. Since 1922 at OSU." },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <section className="min-h-screen bg-background text-foreground">
      <div className="container-page grid gap-12 py-24 lg:grid-cols-[0.95fr_1.05fr] items-center">
        <div className="overflow-hidden rounded-3xl bg-muted">
          <img
            src={brotherhoodImg}
            alt="Mu Chapter president portrait"
            className="h-full w-full object-cover min-h-[420px]"
            loading="lazy"
            width={1600}
            height={1100}
          />
        </div>

        <Reveal>
          <div>
            <SectionLabel>President&apos;s welcome</SectionLabel>
            <h1 className="mt-4 font-display text-[clamp(3rem,7vw,6rem)] leading-[0.95] text-balance max-w-4xl">
              A message from the <span className="italic text-primary">president.</span>
            </h1>
            <p className="mt-6 text-base leading-relaxed text-foreground/80 max-w-2xl">
              As the premier professional business fraternity at Ohio State, Alpha Kappa Psi is nationally recognized for developing principled, ethical business leaders. It is with great excitement and pride that we invite you to explore our organization and learn what makes Mu Chapter unique.
            </p>
            <p className="mt-4 text-base leading-relaxed text-foreground/80 max-w-2xl">
              Our brotherhood is made up of driven, inspiring, and talented students from every college on campus. Since 1922, Mu Chapter has cultivated leaders across student government, entrepreneurship, varsity athletics, academics, and the professional world. Our alumni network connects us not only across Ohio State, but nationwide and abroad.
            </p>
            <p className="mt-4 text-base leading-relaxed text-foreground/80 max-w-2xl">
              We pride ourselves on exploring our shared interests in business while building a diverse family on campus. We work together by leaning on our strengths, serving our community, and providing the resources for academic, professional, and personal success.
            </p>
            <p className="mt-4 text-base leading-relaxed text-foreground/80 max-w-2xl">
              I am incredibly excited to serve as president of Mu Chapter. Many of my most meaningful experiences at Ohio State have been shaped by this organization. Alpha Kappa Psi offers infinite opportunities, lifelong friendships, and a community that pushes you to grow.
            </p>
            <p className="mt-8 text-sm text-muted-foreground">
              Thank you for your interest, and I look forward to meeting you at our next rush event.
              <span className="block font-semibold text-foreground mt-2">Addi Chambers, President</span>
            </p>
            <div className="mt-10 flex flex-wrap gap-4 text-sm">
              <Link to="/about" className="font-medium text-primary hover:underline">
                About Us
              </Link>
              <Link to="/brothers" className="font-medium text-foreground hover:underline">
                Our Members
              </Link>
              <Link to="/recruitment" className="font-medium text-foreground hover:underline">
                Rush
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

    