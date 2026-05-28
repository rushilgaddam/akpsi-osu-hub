import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Reveal } from "@/components/Reveal";
import { SectionLabel } from "@/components/SectionLabel";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

const schedule = [
  { date: "January 7", title: "Applications open", detail: "Applications for Winter 2026 are live." },
  { date: "January 13", title: "Winterfest", detail: "Meet the brothers and learn more about rush." },
  { date: "January 14", title: "Mass meeting", detail: "Hear from the EBoard and walk through membership." },
  { date: "January 23", title: "Coffee chats", detail: "Informal conversations with brothers across majors." },
  { date: "January 24", title: "DEI event", detail: "Learn how we cultivate an inclusive chapter." },
  { date: "January 25", title: "Applications due", detail: "Submit by 11:59PM to be considered." },
];

const faqs = [
  { q: "Do I need to be a business major?", a: "No. We welcome students from every college at OSU. What matters is ambition, character, and fit." },
  { q: "How much time does rush take?", a: "Rush events are spread over one week. Active membership averages 5–8 hours per week." },
  { q: "What does it cost?", a: "Dues cover national fees, chapter operations, and events. Payment support is available if needed." },
  { q: "Can I belong to other organizations?", a: "Yes. Many brothers are also in clubs, academic programs, and athletics. AKPsi works alongside other commitments." },
  { q: "How do I apply?", a: "Fill out the interest form on this page and we will send rush details to your email." },
];

export const Route = createFileRoute("/recruitment")({
  head: () => ({
    meta: [
      { title: "Rush · Alpha Kappa Psi Ohio State" },
      { name: "description", content: "Winter 2026 recruitment for the Mu Chapter of Alpha Kappa Psi at OSU." },
      { property: "og:title", content: "Rush AKPsi · Ohio State" },
      { property: "og:description", content: "Interest form, schedule, and FAQ for the Mu Chapter." },
    ],
  }),
  component: Recruitment,
});

export function Recruitment() {
  return (
    <>
      <section className="pt-40 pb-20 container-page">
        <Reveal>
          <SectionLabel>Rush</SectionLabel>
          <h1 className="mt-4 font-display text-[clamp(3rem,7vw,6rem)] leading-[0.95] text-balance max-w-4xl">
            Interest form, schedule, and FAQ for <span className="italic text-primary">Winter 2026.</span>
          </h1>
          <p className="mt-6 text-base text-foreground/75 leading-relaxed max-w-3xl">
            Join our interest list and stay updated with event announcements, application deadlines, and rush details.
          </p>
        </Reveal>
      </section>

      <section className="container-page pb-24">
        <div className="grid gap-10 lg:grid-cols-[1fr_0.95fr] items-start">
          <div className="rounded-3xl border border-border bg-card p-10">
            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Interest form</p>
            <h2 className="mt-4 text-3xl font-semibold">Get on the list.</h2>
            <p className="mt-4 text-base text-foreground/80 leading-relaxed">
              This form is the main point of contact for rush updates. We strongly encourage all students interested in joining AKPsi to sign up.
            </p>
            <div className="mt-6 space-y-3 text-sm text-muted-foreground">
              <p><strong>What you get:</strong></p>
              <p>Rush schedules, event locations, application reminders, and recruitment updates.</p>
            </div>
          </div>

          <form onSubmit={(e) => e.preventDefault()} className="rounded-3xl border border-border bg-card p-10 space-y-4">
            <Input required name="firstName" placeholder="First name" className="h-12 rounded-xl" />
            <Input required name="lastName" placeholder="Last name" className="h-12 rounded-xl" />
            <Input required type="email" name="email" placeholder="OSU email" className="h-12 rounded-xl" />
            <div className="grid sm:grid-cols-2 gap-4">
              <Input name="major" placeholder="Major" className="h-12 rounded-xl" />
              <Input name="year" placeholder="Year (Fr / So / Jr / Sr)" className="h-12 rounded-xl" />
            </div>
            <Textarea name="why" placeholder="Why AKPsi? (optional)" rows={4} className="rounded-xl" />
            <Button type="submit" className="w-full sm:w-auto rounded-full bg-primary text-background h-12 px-7">
              Submit Interest
            </Button>
          </form>
        </div>
      </section>

      <section className="bg-muted/30 text-foreground py-24 border-t border-border">
        <div className="container-page">
          <SectionLabel>Spring 2026 schedule</SectionLabel>
          <div className="mt-10 space-y-6">
            {schedule.map((item) => (
              <div key={item.date} className="rounded-3xl border border-border bg-card p-6">
                <div className="flex flex-col gap-2 sm:flex-row sm:justify-between sm:items-center">
                  <div>
                    <div className="text-sm uppercase tracking-[0.25em] text-muted-foreground">{item.date}</div>
                    <div className="mt-2 text-2xl font-semibold">{item.title}</div>
                  </div>
                  <div className="text-sm text-foreground/70 max-w-xl">{item.detail}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

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
    </>
  );
}
