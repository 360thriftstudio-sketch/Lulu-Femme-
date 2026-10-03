import type { Metadata } from "next";
import { ButtonLink } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Custom order request sent",
  description: "Thanks – your custom order request has been sent to Lulu Femme.",
  robots: { index: false },
};

export default function CustomSentPage() {
  return (
    <section className="container-site flex flex-col items-start gap-5 py-20">
      <p className="text-sm font-bold tracking-widest text-pink-ink uppercase">Request sent</p>
      <h1 className="display text-5xl text-plum md:text-6xl">Thank you!</h1>
      <p className="max-w-xl text-lg text-ink">
        We&apos;ve got your custom order request and will be in touch by email soon. [EDIT]
      </p>
      <div className="flex flex-wrap gap-3">
        <ButtonLink href="/bundles">Browse bundles</ButtonLink>
        <ButtonLink href="/" variant="secondary">
          Back to home
        </ButtonLink>
      </div>
    </section>
  );
}
