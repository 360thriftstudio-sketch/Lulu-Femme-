import type { Metadata } from "next";
import { CtaBand } from "@/components/CtaBand";
import { PageHeader } from "@/components/PageHeader";

export const metadata: Metadata = {
  title: "How it works",
  description:
    "How buying wholesale Lululemon bundles from Lulu Femme works: exact bundles, Grade A grading, a video of every bundle, combined deals and custom orders.",
  alternates: { canonical: "/how-it-works" },
};

const sections = [
  {
    id: "exact",
    title: "Exact bundles",
    body: [
      "Every bundle is an exact bundle. The pieces shown in the bundle video are the exact pieces you receive – no surprises, no swaps.",
      "Each bundle has a code (for example LF-01) and a full item breakdown, so you know exactly how many leggings, flares, tops and jackets are inside.",
    ],
  },
  {
    id: "grading",
    title: "Grading",
    body: [
      "We only sell Grade A (Premium) pieces. Any notable defects we find during inspection are disclosed in the listing.",
      "As these are pre-owned garments, normal signs of previous wear may be present in line with the grade.",
    ],
  },
  {
    id: "video",
    title: "A video of every bundle",
    body: [
      "We film a clear, well-lit video of every bundle showing all pieces, so their quality, condition, grading, sizes and overall appearance are as transparent as possible.",
      "Ask for the video with your quote if it isn't on the bundle page yet.",
    ],
  },
  {
    id: "combined",
    title: "Combined deals",
    body: [
      "Buying more than one bundle? Add them all to your quote basket. Two or more bundles qualify for a combined deal, which we include in your quote.",
    ],
  },
  {
    id: "custom",
    title: "Custom orders",
    body: [
      "Like a bundle but need something slightly different? We may be able to adjust an existing bundle or build a similar one around your preferences.",
      "For larger bulk orders we offer quantity-based pricing. Tell us your budget, categories and sizes on the custom order form.",
    ],
  },
];

export default function HowItWorksPage() {
  return (
    <>
      <PageHeader
        crumbs={[{ label: "How it works" }]}
        title="How it works"
        intro="Buying wholesale should feel simple and safe. Here's exactly what to expect when you buy a Lulu Femme bundle."
      />
      <nav aria-label="On this page" className="container-site pt-8">
        <ul className="flex flex-wrap gap-2">
          {sections.map((s) => (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                className="inline-flex min-h-11 items-center rounded-full border border-line-strong bg-card px-4 text-sm font-semibold text-ink hover:border-pink hover:text-pink-ink"
              >
                {s.title}
              </a>
            </li>
          ))}
        </ul>
      </nav>
      <div className="container-site grid gap-6 py-10 md:grid-cols-2">
        {sections.map((s, idx) => (
          <section
            key={s.id}
            id={s.id}
            aria-labelledby={`${s.id}-title`}
            className="rounded-2xl border border-line bg-card p-6 md:p-8"
          >
            <p aria-hidden="true" className="display text-4xl text-pink-ink">
              0{idx + 1}
            </p>
            <h2 id={`${s.id}-title`} className="mt-2 text-2xl font-bold text-plum">
              {s.title}
            </h2>
            <div className="prose-lf text-ink">
              {s.body.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </section>
        ))}
      </div>
      <CtaBand />
    </>
  );
}
