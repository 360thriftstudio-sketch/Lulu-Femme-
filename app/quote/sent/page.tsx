import type { Metadata } from "next";
import { ButtonLink } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Quote request sent",
  description: "Thanks – your quote request has been sent to Lulu Femme.",
  robots: { index: false },
};

export default function QuoteSentPage() {
  return (
    <section className="container-site flex flex-col items-start gap-5 py-20">
      <p className="text-sm font-bold tracking-widest text-pink-ink uppercase">Request sent</p>
      <h1 className="display text-5xl text-plum md:text-6xl">Thank you!</h1>
      <p className="max-w-xl text-lg text-ink">
        We&apos;ve received your quote request and will reply by email, usually within 1 working
        day. [EDIT] Keep an eye on your inbox (and spam folder).
      </p>
      <div className="flex flex-wrap gap-3">
        <ButtonLink href="/bundles">Keep browsing</ButtonLink>
        <ButtonLink href="/" variant="secondary">
          Back to home
        </ButtonLink>
      </div>
    </section>
  );
}
