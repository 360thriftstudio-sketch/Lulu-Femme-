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
        intro="Questions about a bundle, a combined deal or a custom order? Message us – we usually reply within 1 working day. [EDIT]"
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
        <p className="text-ink md:col-span-2">
          <strong className="text-plum">Location:</strong> {site.location}. We&apos;re an online
          wholesaler – visits by appointment only. [EDIT]
        </p>
      </div>
      <CtaBand />
    </>
  );
}
