import type { Metadata } from "next";
import { CustomOrderForm } from "@/components/forms/CustomOrderForm";
import { PageHeader } from "@/components/PageHeader";
import { ButtonLink } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Custom & bulk orders",
  description:
    "Request a custom Lululemon bundle or bulk order. Tell us your budget, categories, sizes and quantity and we'll build it for you.",
  alternates: { canonical: "/custom-orders" },
};

export default function CustomOrdersPage() {
  return (
    <>
      <PageHeader
        crumbs={[{ label: "Custom orders" }]}
        title="Custom orders"
        intro="Like a bundle but it's not exactly what you need? Planning a larger bulk order? Tell us what you're after and we'll build it, with quantity-based pricing."
      />
      <div className="container-site grid gap-10 py-10 lg:grid-cols-[1fr_2fr]">
        <aside className="flex flex-col gap-4">
          <h2 className="text-xl font-bold text-plum">How custom orders work</h2>
          <ol className="flex list-decimal flex-col gap-2 pl-5 text-ink">
            <li>Send us your budget, categories, sizes and quantity.</li>
            <li>We put together a bundle and send you photos or a video. [EDIT]</li>
            <li>You approve, pay and we dispatch within 2 working days.</li>
          </ol>
          <p className="text-sm text-muted">Prefer to browse first?</p>
          <ButtonLink href="/bundles" variant="secondary" className="self-start">
            Shop ready-made bundles
          </ButtonLink>
        </aside>
        <section
          aria-labelledby="custom-form-title"
          className="rounded-2xl border border-line bg-card p-5 md:p-8"
        >
          <h2 id="custom-form-title" className="display mb-5 text-3xl text-plum">
            Tell us what you need
          </h2>
          <CustomOrderForm />
        </section>
      </div>
    </>
  );
}
