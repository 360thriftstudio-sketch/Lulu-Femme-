import type { Metadata } from "next";
import { Suspense } from "react";
import { BundleBrowser } from "@/components/bundles/BundleBrowser";
import { BundleCard } from "@/components/bundles/BundleCard";
import { PageHeader } from "@/components/PageHeader";
import { bundles } from "@/data/bundles";

export const metadata: Metadata = {
  title: "Shop wholesale Lululemon bundles",
  description:
    "Browse exact Grade A pre-owned Lululemon bundles: Align mixes, leggings and full Lulu mixes from 15 to 50 pieces. Filter by type, size and jackets.",
  alternates: { canonical: "/bundles" },
};

export default function BundlesPage() {
  return (
    <>
      <PageHeader
        crumbs={[{ label: "Shop bundles" }]}
        title="Shop bundles"
        intro="Exact, filmed Grade A Lululemon bundles for resellers. Prices are on request – add bundles to your quote and we'll reply fast."
      />
      <div className="container-site py-10">
        <Suspense
          fallback={
            <ul className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {[...bundles].reverse().map((b) => (
                <li key={b.slug}>
                  <BundleCard bundle={b} headingLevel={2} />
                </li>
              ))}
            </ul>
          }
        >
          <BundleBrowser />
        </Suspense>
      </div>
    </>
  );
}
