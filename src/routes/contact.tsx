import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Reveal } from "@/components/Reveal";
import { SectionLabel } from "@/components/SectionLabel";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Mail, MapPin, Instagram, Linkedin, ArrowRight } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact · Alpha Kappa Psi Ohio State" },
      { name: "description", content: "Get in touch with the Mu Chapter of Alpha Kappa Psi at The Ohio State University." },
      { property: "og:title", content: "Contact · AKPsi Ohio State" },
      { property: "og:description", content: "Questions about rush, alumni partnerships, or philanthropy? Reach out." },
    ],
  }),
  component: Contact,
});

function Contact() {
  const [submitting, setSubmitting] = useState(false);
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);

    const form = e.target as HTMLFormElement;
    const data = new FormData(form);
    const name = data.get("name") as string;
    const email = data.get("email") as string;
    const subject = (data.get("subject") as string) || "Website contact form";
    const message = data.get("message") as string;

    const body = `From: ${name} (${email})\n\n${message}`;
    window.location.href = `mailto:alphakappapsiosu@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    toast.success("Opening your email app to send this to AKPsi.");
    form.reset();
    setSubmitting(false);
  };

  return (
    <section className="pt-40 pb-32 container-page">
      <Reveal>
        <SectionLabel>Contact</SectionLabel>
        <h1 className="mt-4 font-display text-[clamp(3rem,7vw,6rem)] leading-[0.95]">
          Let's <span className="italic text-primary">talk.</span>
        </h1>
        <p className="mt-6 text-lg text-muted-foreground max-w-xl">
          Whether you're a prospective brother, an alum, a recruiter, or a Columbus nonprofit, we'd love to hear from you.
        </p>
      </Reveal>

      <div className="mt-16 grid lg:grid-cols-[1.2fr_1fr] gap-12">
        <Reveal>
          <form onSubmit={onSubmit} className="bg-card border border-border rounded-3xl p-8 md:p-10 space-y-4">
            <div className="grid sm:grid-cols-2 gap-3">
              <Input required name="name" placeholder="Your name" className="h-12 rounded-xl" />
              <Input required type="email" name="email" placeholder="Email" className="h-12 rounded-xl" />
            </div>
            <Input name="subject" placeholder="Subject" className="h-12 rounded-xl" />
            <Textarea required name="message" placeholder="Your message" rows={6} className="rounded-xl" />
            <Button type="submit" disabled={submitting} className="rounded-full h-12 px-7 bg-primary hover:bg-primary/90">
              {submitting ? "Sending…" : "Send Message"} <ArrowRight size={16} className="ml-1" />
            </Button>
          </form>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="space-y-8">
            <InfoBlock Icon={Mail} label="Email" value="alphakappapsiosu@gmail.com" href="mailto:alphakappapsiosu@gmail.com" />
            <InfoBlock Icon={MapPin} label="Address" value="Max M. Fisher College of Business · 2100 Neil Ave · Columbus, OH 43210" />
            <InfoBlock Icon={Instagram} label="Instagram" value="@akpsiohiostate" href="https://instagram.com/akpsiohiostate" />
            <InfoBlock Icon={Linkedin} label="LinkedIn" value="AKPsi Mu Chapter" href="https://www.linkedin.com/company/akpsimu/" />

            <div className="pt-8 border-t border-border">
              <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-3">Specific inquiries</div>
              <div className="space-y-2 text-sm">
                <Row label="Membership" value="vpmembership.osuakpsi@gmail.com" />
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function InfoBlock({ Icon, label, value, href }: { Icon: React.ComponentType<{ size?: number }>; label: string; value: string; href?: string }) {
  const Wrap = href ? "a" : "div";
  return (
    <Wrap {...(href ? { href, target: "_blank", rel: "noreferrer" } : {})} className="flex gap-4 group">
      <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
        <Icon size={16} />
      </div>
      <div>
        <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{label}</div>
        <div className="mt-1 text-foreground group-hover:text-primary transition-colors">{value}</div>
      </div>
    </Wrap>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4 py-1.5">
      <span className="text-muted-foreground">{label}</span>
      <a href={`mailto:${value}`} className="text-foreground hover:text-primary truncate">{value}</a>
    </div>
  );
}
