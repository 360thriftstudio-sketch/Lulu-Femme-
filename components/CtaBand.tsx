import { ButtonLink } from "@/components/ui/Button";

export function CtaBand({
  title = "Ready to restock?",
  text = "Browse our exact Grade A bundles or send us a quote request – we reply fast.",
  primary = { href: "/bundles", label: "Shop bundles" },
  secondary = { href: "/quote", label: "Get a quote" },
}: {
  title?: string;
  text?: string;
  primary?: { href: string; label: string };
  secondary?: { href: string; label: string };
}) {
  return (
    <section className="container-site py-12">
      <div className="flex flex-col items-start gap-5 rounded-3xl bg-plum px-6 py-10 text-offwhite md:flex-row md:items-center md:justify-between md:px-12">
        <div>
          <h2 className="display text-3xl md:text-4xl">{title}</h2>
          <p className="mt-2 max-w-xl">{text}</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <ButtonLink href={primary.href} variant="inverse">
            {primary.label}
          </ButtonLink>
          <ButtonLink href={secondary.href} variant="inverseOutline">
            {secondary.label}
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
