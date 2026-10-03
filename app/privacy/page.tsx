import type { Metadata } from "next";
import { CookieSettingsButton } from "@/components/layout/CookieConsent";
import { PageHeader, Section } from "@/components/PageHeader";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy & cookies",
  description: "How Lulu Femme uses your data, forms and analytics cookies.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <>
      <PageHeader
        crumbs={[{ label: "Privacy & cookies" }]}
        title="Privacy & cookies"
        intro="[EDIT] Have this page checked before launch."
      />
      <Section>
        <div className="prose-lf max-w-3xl text-ink">
          <h2 className="text-xl font-bold text-plum">Forms</h2>
          <p>
            When you send a quote, custom order or drop-alert form, your details are sent to us
            through Formspree so we can reply. We only use them to answer your enquiry or send the
            alerts you asked for.
          </p>
          <h2 className="text-xl font-bold text-plum">Saved bundles and quote basket</h2>
          <p>
            Your saved bundles, quote basket, currency and cookie choice are stored in your
            browser&apos;s local storage on this device only. They are never sent to us until you
            submit a form.
          </p>
          <h2 className="text-xl font-bold text-plum">Analytics cookies</h2>
          <p>
            If you accept, we load Google Analytics 4 to see which pages and bundles are viewed. If
            you decline, Google Analytics is never loaded. You can change your choice at any time;
            reload the page after declining to fully stop analytics.
          </p>
          <CookieSettingsButton />
          <h2 className="text-xl font-bold text-plum">Contact</h2>
          <p>
            Questions about your data? Email {site.email}. [EDIT] Add your data controller details.
          </p>
        </div>
      </Section>
    </>
  );
}
