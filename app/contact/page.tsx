import type { Metadata } from "next";
import { CtaBand } from "@/components/CtaBand";
import { CopyButton } from "@/components/forms/CopyButton";
import { InstagramIcon, MailIcon } from "@/components/layout/Icons";
import { TrackedLink } from "@/components/layout/TrackedLink";
import { PageHeader } from "@/components/PageHeader";
import { buttonClasses } from "@/components/ui/Button";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Lulu Femme by email or Instagram about wholesale Lululemon bundles. Based in Birmingham, UK.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  const channels = [
    {
      title: "Instagram",
      value: `@${site.instagramHandle}`,
      copy: site.instagramUrl,
      copyLabel: "Instagram link",
      href: site.instagramUrl,
      action: "Message us on Instagram",
      event: "click_instagram" as const,
      icon: InstagramIcon,
      external: true,
    },
    {
      title: "Email",
      value: site.email,
      copy: site.email,
      copyLabel: "email address",
      href: `mailto:${site.email}`,
      action: "Send an email",
      event: "click_email" as const,
      icon: MailIcon,
      external: false,
    },
  ];
  return (
    <>
      <PageHeader
        crumbs={[{ label: "Contact" }]}
        title="Contact us"
        intro="Have a question about a bundle, sizes or shipping? Message us on Instagram or by email, and we'll reply within one working day."
      />
      <div className="container-site grid gap-6 py-10 md:grid-cols-2">
        {channels.map(({ icon: Icon, ...c }) => (
          <section
            key={c.title}
            aria-labelledby={`${c.title}-title`}
            className="flex flex-col gap-4 rounded-2xl border border-line bg-card p-6"
          >
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-blush text-pink-ink">
              <Icon className="h-6 w-6" />
            </span>
            <h2 id={`${c.title}-title`} className="text-xl font-bold text-plum">
              {c.title}
            </h2>
            <p className="text-lg font-semibold break-all text-ink">{c.value}</p>
            <div className="flex flex-wrap gap-3">
              <TrackedLink
                event={c.event}
                params={{ location: "contact_page" }}
                href={c.href}
                external={c.external}
                className={buttonClasses("primary")}
              >
                {c.action}
                {c.external && <span className="sr-only"> (opens in a new tab)</span>}
              </TrackedLink>
              <CopyButton value={c.copy} label={c.copyLabel} />
            </div>
          </section>
        ))}
        <p className="text-lg text-ink md:col-span-2">
          We&apos;re here to help. Whether it&apos;s a question about a bundle, a combined deal or a
          custom order, get in touch and we&apos;ll get back to you within one working day.
        </p>
      </div>
      <section aria-labelledby="addresses-title" className="container-site pb-6">
        <h2 id="addresses-title" className="display mb-5 text-3xl text-plum">
          Where we&apos;re based
        </h2>
        <div className="grid gap-6 md:grid-cols-2">
          {site.addresses.map((a) => (
            <div key={a.label} className="rounded-2xl border border-line bg-card p-6">
              <h3 className="text-xl font-bold text-plum">{a.label}</h3>
              <address className="mt-2 text-ink not-italic">
                {a.lines.map((l) => (
                  <span key={l} className="block">
                    {l}
                  </span>
                ))}
              </address>
            </div>
          ))}
        </div>
      </section>
      <CtaBand />
    </>
  );
}
