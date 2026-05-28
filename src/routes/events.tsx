import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/events")({
  head: () => ({
    meta: [
      { title: "Events Removed · Alpha Kappa Psi Ohio State" },
      { name: "description", content: "This page is no longer active. See Rush for current recruitment information." },
    ],
  }),
  component: Events,
});

export function Events() {
  return (
    <section className="pt-40 pb-32 container-page">
      <h1 className="text-4xl font-semibold">Events page removed</h1>
      <p className="mt-4 text-base text-foreground/75 max-w-2xl leading-relaxed">
        We no longer maintain a separate events page. Current rush and chapter activity details are available on the Rush and About pages.
      </p>
    </section>
  );
}
