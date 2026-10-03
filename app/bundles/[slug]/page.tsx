import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AddToQuoteButton, SaveButton } from "@/components/bundles/BundleActions";
import { BundleCard } from "@/components/bundles/BundleCard";
import { ItemTable, SizeTable } from "@/components/bundles/BundleTables";
import { Gallery } from "@/components/bundles/Gallery";
import { ViewTracker } from "@/components/bundles/ViewTracker";
import { CtaBand } from "@/components/CtaBand";
import { JsonLd } from "@/components/JsonLd";
import { InstagramIcon, MailIcon } from "@/components/layout/Icons";
import { TrackedLink } from "@/components/layout/TrackedLink";
import { Accordion } from "@/components/ui/Accordion";
import { Badge } from "@/components/ui/Badge";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { bundles, bundleTitle, getBundle, similarBundles, type Bundle } from "@/data/bundles";
import { bundlePolicies } from "@/lib/policies";
import { mailtoFor, site } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return bundles.map((b) => ({ slug: b.slug }));
}
export const dynamicParams = false;

function summary(b: Bundle) {
  return b.groups
    .flatMap((g) => g.items)
    .map((i) => `${i.qty} ${i.name}`)
    .join(", ");
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const b = getBundle(slug);
  if (!b) return {};
  const title = `${b.name} #${b.code} – ${b.pieces} pcs Grade A Lululemon bundle`;
  const description = `Exact wholesale bundle ${b.code}: ${b.pieces} Grade A pre-owned Lululemon pieces (${summary(b)}). Filmed and hand-authenticated. Price on request.`;
  return {
    title,
    description,
    alternates: { canonical: `/bundles/${b.slug}` },
    openGraph: {
      title,
      description,
      images: [{ url: b.image, alt: `${b.name} bundle ${b.code}` }],
    },
  };
}

const availability = {
  available: "https://schema.org/InStock",
  reserved: "https://schema.org/LimitedAvailability",
  sold: "https://schema.org/SoldOut",
} as const;

export default async function BundlePage({ params }: Props) {
  const { slug } = await params;
  const b = getBundle(slug);
  if (!b) notFound();

  const alt = `${b.name} bundle ${b.code}: flat lay of ${b.pieces} pre-owned Lululemon pieces`;
  const similar = similarBundles(b);
  const productLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: bundleTitle(b),
    sku: b.code,
    image: `${site.url}${b.image}`,
    description: `${b.pieces}-piece exact wholesale bundle of Grade A pre-owned Lululemon: ${summary(b)}.`,
    brand: { "@type": "Brand", name: "lululemon" },
    itemCondition: "https://schema.org/UsedCondition",
    offers: {
      "@type": "Offer",
      url: `${site.url}/bundles/${b.slug}`,
      availability: availability[b.status],
      itemCondition: "https://schema.org/UsedCondition",
      priceCurrency: "GBP",
      seller: { "@type": "Organization", name: site.name },
    },
  };

  return (
    <>
      <ViewTracker code={b.code} name={b.name} />
      <JsonLd data={productLd} />
      <div className="container-site py-6">
        <Breadcrumbs
          items={[
            { href: "/", label: "Home" },
            { href: "/bundles", label: "Shop bundles" },
            { label: b.code },
          ]}
        />
      </div>

      <div className="container-site grid gap-10 pb-12 lg:grid-cols-2 lg:gap-14">
        <Gallery image={b.image} alt={alt} video={b.video} code={b.code} />

        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-3">
            <h1 className="display text-4xl text-plum md:text-5xl">
              {b.name} · Lululemon <span className="text-pink-ink">(#{b.code})</span>
            </h1>
            <ul className="flex flex-wrap gap-2" aria-label="Bundle facts">
              <li>
                <Badge tone="dark">{b.pieces} pieces</Badge>
              </li>
              <li>
                <Badge tone="pink">Grade {b.grade} · Premium</Badge>
              </li>
              <li>
                <Badge tone="blush">Exact bundle</Badge>
              </li>
              <li>
                <Badge tone="outline">{b.type}</Badge>
              </li>
              {b.status !== "available" && (
                <li>
                  <Badge tone="plum">{b.status === "sold" ? "Sold" : "Reserved"}</Badge>
                </li>
              )}
            </ul>
            <p className="text-lg text-ink">{b.highlight}.</p>
            <p className="rounded-xl bg-blush p-4 text-sm text-ink">
              <strong className="text-plum">Exact bundle:</strong> the items shown in the bundle
              video are the exact pieces included. 100% Lululemon, Grade A.
            </p>
          </div>

          <div className="flex flex-col gap-4 rounded-2xl border border-line bg-card p-5">
            <p className="display text-3xl text-plum">Price on request</p>
            <div className="flex flex-wrap gap-3">
              <AddToQuoteButton bundle={b} />
              <SaveButton bundle={b} />
            </div>
            <div className="flex flex-wrap gap-x-5 gap-y-1 text-sm">
              <TrackedLink
                event="click_instagram"
                params={{ bundle_code: b.code }}
                href={site.instagramUrl}
                external
                className="inline-flex min-h-11 items-center gap-2 font-semibold text-pink-ink underline underline-offset-4"
              >
                <InstagramIcon className="h-5 w-5" /> DM us about {b.code} on Instagram
                <span className="sr-only">(opens in a new tab)</span>
              </TrackedLink>
              <TrackedLink
                event="click_email"
                params={{ bundle_code: b.code }}
                href={mailtoFor(
                  `Enquiry: bundle #${b.code}`,
                  `Hi Lulu Femme,\n\nI'm interested in bundle #${b.code} (${b.name}, ${b.pieces} pcs).\n\n`,
                )}
                className="inline-flex min-h-11 items-center gap-2 font-semibold text-pink-ink underline underline-offset-4"
              >
                <MailIcon className="h-5 w-5" /> Email about {b.code}
              </TrackedLink>
            </div>
          </div>

          <section aria-labelledby="items-title">
            <h2 id="items-title" className="mb-3 text-xl font-bold text-plum">
              Item breakdown
            </h2>
            <ItemTable bundle={b} />
          </section>
          <section aria-labelledby="sizes-title">
            <h2 id="sizes-title" className="mb-3 text-xl font-bold text-plum">
              Size breakdown
            </h2>
            <SizeTable bundle={b} />
          </section>
          <section aria-labelledby="details-title">
            <h2 id="details-title" className="mb-3 text-xl font-bold text-plum">
              Good to know
            </h2>
            <Accordion items={bundlePolicies} />
          </section>
          <p className="text-sm text-ink">
            Buying more than one bundle? Add them all to your quote for a combined deal. Need a
            larger bulk or custom order? Message us for quantity-based pricing.
          </p>
        </div>
      </div>

      {similar.length > 0 && (
        <section aria-labelledby="similar-title" className="container-site py-12">
          <h2 id="similar-title" className="display mb-6 text-3xl text-plum md:text-4xl">
            Similar bundles
          </h2>
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {similar.map((s) => (
              <li key={s.slug}>
                <BundleCard bundle={s} />
              </li>
            ))}
          </ul>
        </section>
      )}
      <CtaBand />
    </>
  );
}
