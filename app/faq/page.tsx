import type { Metadata } from "next";
import { CtaBand } from "@/components/CtaBand";
import { JsonLd } from "@/components/JsonLd";
import { PageHeader } from "@/components/PageHeader";
import { Accordion } from "@/components/ui/Accordion";
import { faqs } from "@/lib/faq";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Answers about Lulu Femme wholesale Lululemon bundles: returns, damaged items, combining bundles, invoices, single pieces and sizes.",
  alternates: { canonical: "/faq" },
};

export default function FaqPage() {
  const ld = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a.replace(/\s*\[EDIT\][^.]*\.?/g, "") },
    })),
  };
  return (
    <>
      <JsonLd data={ld} />
      <PageHeader
        crumbs={[{ label: "FAQ" }]}
        title="FAQ"
        intro="Everything resellers usually ask before their first order. Can't find your answer? Message us."
      />
      <div className="container-site max-w-4xl py-10">
        <Accordion
          headingLevel={2}
          items={faqs.map((f) => ({ title: f.q, content: <p>{f.a}</p> }))}
        />
      </div>
      <CtaBand />
    </>
  );
}
