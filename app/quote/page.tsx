import type { Metadata } from "next";
import { QuoteBasket } from "@/components/bundles/QuoteBasket";
import { QuoteForm } from "@/components/forms/QuoteForm";
import { PageHeader } from "@/components/PageHeader";

export const metadata: Metadata = {
  title: "Request a quote",
  description:
    "Send a quote request for one or more Lulu Femme wholesale bundles. Two or more bundles qualify for a combined deal.",
  alternates: { canonical: "/quote" },
};

export default function QuotePage() {
  return (
    <>
      <PageHeader
        crumbs={[{ label: "Quote" }]}
        title="Your quote"
        intro="Prices are on request. Check your bundles, tell us a little about your business and we'll send your quote by email."
      />
      <div className="container-site grid gap-10 py-10 lg:grid-cols-[2fr_3fr]">
        <QuoteBasket />
        <section
          aria-labelledby="enquiry-title"
          className="rounded-2xl border border-line bg-card p-5 md:p-8"
        >
          <h2 id="enquiry-title" className="display mb-5 text-3xl text-plum">
            Your details
          </h2>
          <QuoteForm />
        </section>
      </div>
    </>
  );
}
