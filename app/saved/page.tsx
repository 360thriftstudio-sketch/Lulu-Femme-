import type { Metadata } from "next";
import { SavedList } from "@/components/bundles/SavedList";
import { PageHeader } from "@/components/PageHeader";

export const metadata: Metadata = {
  title: "Saved bundles",
  description: "Bundles you've saved on Lulu Femme. Add them all to your quote in one click.",
  alternates: { canonical: "/saved" },
  robots: { index: false },
};

export default function SavedPage() {
  return (
    <>
      <PageHeader
        crumbs={[{ label: "Saved bundles" }]}
        title="Saved bundles"
        intro="Your shortlist, saved on this device. Add everything to your quote when you're ready."
      />
      <div className="container-site py-10">
        <SavedList />
      </div>
    </>
  );
}
