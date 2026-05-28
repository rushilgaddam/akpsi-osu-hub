import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/alumni")({
  head: () => ({
    meta: [
      { title: "Alumni Removed · Alpha Kappa Psi Ohio State" },
      { name: "description", content: "This page is no longer active. See About for chapter network and alumni information." },
    ],
  }),
  component: Alumni,
});

export function Alumni() {
  return (
    <section className="pt-40 pb-32 container-page">
      <h1 className="text-4xl font-semibold">Alumni page removed</h1>
      <p className="mt-4 max-w-2xl text-base text-foreground/75 leading-relaxed">
        Alumni and career network details have been integrated into the About page. Please visit About to learn more about the Mu Chapter network and member opportunities.
      </p>
    </section>
  );
}
