import type { Metadata } from "next";
import { CtaBand } from "@/components/CtaBand";
import { PageHeader, Section } from "@/components/PageHeader";

export const metadata: Metadata = {
  title: "Authenticity checks",
  description:
    "The 5 checks Lulu Femme uses to authenticate every pre-owned Lululemon piece, and what happens if a piece isn't genuine.",
  alternates: { canonical: "/authenticity" },
};

const checks = [
  {
    title: "Care label and style code",
    text: "We check the inner care label, its print quality and the style code where present. [EDIT] Add detail.",
  },
  {
    title: "Size tag and logo",
    text: "The size dot or tag and the reflective logo are checked for correct placement, shape and finish. [EDIT] Add detail.",
  },
  {
    title: "Stitching and seams",
    text: "Genuine Lululemon uses flat, even, clean seams. Uneven or bulky stitching is a red flag. [EDIT] Add detail.",
  },
  {
    title: "Fabric feel",
    text: "Fabrics like Nulu, Luon and Everlux have a distinctive hand-feel and weight that we know well. [EDIT] Add detail.",
  },
  {
    title: "Quarantine of doubtful pieces",
    text: "Anything we're unsure about is set aside and never goes into a bundle.",
  },
];

export default function AuthenticityPage() {
  return (
    <>
      <PageHeader
        crumbs={[{ label: "Authenticity" }]}
        title="Authenticity"
        intro="We do not intentionally sell or promote unauthentic items. Our experienced team carefully inspects every Lululemon piece using five checks."
      />
      <Section title="Our 5 checks" id="checks">
        <ol className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {checks.map((c, i) => (
            <li key={c.title} className="rounded-2xl border border-line bg-card p-6">
              <span aria-hidden="true" className="display text-4xl text-pink-ink">
                {i + 1}
              </span>
              <h3 className="mt-2 text-xl font-bold text-plum">{c.title}</h3>
              <p className="mt-2 text-ink">{c.text}</p>
            </li>
          ))}
        </ol>
      </Section>
      <Section
        title="If something slips through"
        id="replacements"
        className="container-site pb-12"
      >
        <div className="prose-lf max-w-3xl text-ink">
          <p>
            As human error is possible, an unauthentic piece may occasionally slip through. If you
            suspect any piece in the bundle video is unauthentic, please let us know so we can
            verify and replace it.
          </p>
          <p>
            If an unauthentic piece accidentally reaches you, we offer hassle-free replacements for
            that item once image or video evidence is provided.
          </p>
          <p>
            It is common for pre-owned Lululemon pieces to have their wash tags or labels removed.
            We do not consider missing tags or labels to be a defect and do not offer replacements
            for this reason.
          </p>
        </div>
      </Section>
      <CtaBand />
    </>
  );
}
