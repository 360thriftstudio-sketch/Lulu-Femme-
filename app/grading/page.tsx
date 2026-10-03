import type { Metadata } from "next";
import { CtaBand } from "@/components/CtaBand";
import { PageHeader, Section } from "@/components/PageHeader";

export const metadata: Metadata = {
  title: "Grading – what Grade A means",
  description:
    "What Grade A (Premium) means for Lulu Femme pre-owned Lululemon bundles, with examples of normal wear versus defects.",
  alternates: { canonical: "/grading" },
};

const comparisons = [
  {
    topic: "Fabric surface",
    wear: "Light softening of the fabric from washing.",
    defect: "Heavy pilling across the seat or inner thighs. [EDIT]",
  },
  {
    topic: "Colour",
    wear: "Very slight, even fading consistent with gentle use.",
    defect: "Patchy fading, bleach marks or discolouration. [EDIT]",
  },
  {
    topic: "Seams & stitching",
    wear: "Seams intact; tiny loose thread ends trimmed.",
    defect: "Open seams, holes or broken stitching. [EDIT]",
  },
  {
    topic: "Logo & details",
    wear: "Logo present, may be slightly worn.",
    defect: "Logo peeling or missing, broken zips. [EDIT]",
  },
  {
    topic: "Tags & labels",
    wear: "Wash tags or labels removed – common and not a defect.",
    defect: "Not applicable – missing tags are never counted as a defect.",
  },
];

export default function GradingPage() {
  return (
    <>
      <PageHeader
        crumbs={[{ label: "Grading" }]}
        title="Grading"
        intro="We only sell Grade A (Premium) pre-owned Lululemon. Here's what that means, and how we tell normal wear from a defect."
      />
      <Section title="What Grade A means" id="grade-a">
        <div className="prose-lf max-w-3xl text-ink">
          <p>
            Grade A pieces are in premium pre-owned condition: clean, wearable and ready to resell.
            Every piece is inspected by hand before it goes into a bundle.
          </p>
          <ul>
            <li>No notable defects – anything we find is disclosed in the listing.</li>
            <li>Normal signs of previous wear may be present, in line with the grade.</li>
            <li>Missing wash tags or labels are common and are not counted as a defect.</li>
            <li>
              [EDIT] Add any extra grading rules you use (e.g. smoke-free, washed before dispatch).
            </li>
          </ul>
        </div>
      </Section>
      <section aria-labelledby="compare-title" className="bg-blush">
        <div className="container-site py-12 md:py-16">
          <h2 id="compare-title" className="display mb-2 text-3xl text-plum md:text-4xl">
            Normal wear vs defect
          </h2>
          <p className="mb-6 max-w-2xl text-ink">
            Grade A allows light, normal wear. Defects like these are disclosed or the piece is
            regraded.
          </p>
          <ul className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {comparisons.map((c) => (
              <li key={c.topic} className="rounded-2xl border border-line bg-card p-5">
                <h3 className="text-lg font-bold text-plum">{c.topic}</h3>
                <div className="mt-4 grid grid-cols-2 gap-3">
                  {(["wear", "defect"] as const).map((k) => (
                    <div key={k} className="flex flex-col gap-2">
                      <div
                        className="flex aspect-square items-center justify-center rounded-xl border-2 border-dashed border-line-strong bg-offwhite p-2 text-center text-xs font-semibold text-muted"
                        role="img"
                        aria-label={`Placeholder for a photo showing ${k === "wear" ? "normal wear" : "a defect"}: ${c.topic.toLowerCase()}`}
                      >
                        Replace with real photo
                      </div>
                      <p
                        className={
                          k === "wear"
                            ? "text-sm font-bold text-success"
                            : "text-sm font-bold text-danger"
                        }
                      >
                        {k === "wear" ? "✓ Normal wear" : "✕ Defect"}
                      </p>
                      <p className="text-sm text-ink">{k === "wear" ? c.wear : c.defect}</p>
                    </div>
                  ))}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
