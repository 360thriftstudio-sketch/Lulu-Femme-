import type { Metadata } from "next";
import Image from "next/image";
import { CtaBand } from "@/components/CtaBand";
import { PageHeader, Section } from "@/components/PageHeader";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About Lulu Femme",
  description:
    "Lulu Femme is a Birmingham, UK based wholesaler of Grade A pre-owned Lululemon, selling exact, filmed bundles to resellers.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <PageHeader
        crumbs={[{ label: "About" }]}
        title="About Lulu Femme"
        intro="Premium pre-owned Lululemon for resellers, sorted and bundled by hand in Birmingham, UK."
      />
      <Section>
        <div className="grid items-start gap-10 md:grid-cols-[2fr_1fr]">
          <div className="prose-lf max-w-2xl text-lg text-ink">
            <p>
              [EDIT] Lulu Femme started in Birmingham with a simple idea: resellers deserve to know
              exactly what they&apos;re buying. Too many wholesale bundles are a gamble – mixed
              brands, hidden damage, sizes nobody wants.
            </p>
            <p>
              [EDIT] So we do it differently. We only work with Lululemon, we only sell Grade A, and
              every bundle is exact and filmed piece by piece before it&apos;s listed.
            </p>
            <p>
              [EDIT] Today we supply resellers on Vinted, Depop, eBay and in independent boutiques
              across the UK and beyond. Tell your story here – who&apos;s behind Lulu Femme, and why
              you love what you do.
            </p>
          </div>
          <div className="flex flex-col items-center gap-4 rounded-3xl border border-line bg-card p-8 text-center">
            <Image
              src="/brand/logo-icon.png"
              alt="Lulu Femme LF monogram"
              width={160}
              height={125}
              className="h-auto w-40"
            />
            <p className="display text-2xl text-plum">Based in {site.location}</p>
            <p className="text-sm text-ink">100% Lululemon · Grade A only · Exact bundles</p>
          </div>
        </div>
      </Section>
      <p className="container-site text-sm text-muted">{site.disclaimer}</p>
      <CtaBand />
    </>
  );
}
