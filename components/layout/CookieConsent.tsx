"use client";
import Link from "next/link";
import Script from "next/script";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";

const KEY = "lf-cookie-consent";
type Consent = "accepted" | "declined" | null;

/** Cookie banner. Google Analytics 4 is only loaded after the visitor clicks Accept. */
export function CookieConsent() {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;
  const [consent, setConsent] = useState<Consent>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const v = window.localStorage.getItem(KEY);
      if (v === "accepted" || v === "declined") setConsent(v);
    } catch {
      /* ignore */
    }
    setReady(true);
    const reopen = () => setConsent(null);
    window.addEventListener("lf:cookie-settings", reopen);
    return () => window.removeEventListener("lf:cookie-settings", reopen);
  }, []);

  const choose = (v: Exclude<Consent, null>) => {
    setConsent(v);
    try {
      window.localStorage.setItem(KEY, v);
    } catch {
      /* ignore */
    }
  };

  return (
    <>
      {consent === "accepted" && gaId && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
            strategy="afterInteractive"
          />
          <Script id="ga4" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=gtag;gtag('js',new Date());gtag('config','${gaId}',{anonymize_ip:true});`}
          </Script>
        </>
      )}
      {ready && consent === null && (
        <section
          aria-label="Cookie consent"
          className="fixed inset-x-3 bottom-3 z-50 mx-auto max-w-2xl rounded-2xl border border-line bg-card p-5 shadow-soft md:bottom-6"
        >
          <h2 className="text-base font-bold text-plum">Cookies</h2>
          <p className="mt-1 text-sm text-ink">
            We&apos;d like to use Google Analytics cookies to understand which bundles people view.
            Nothing is loaded unless you accept.{" "}
            <Link href="/privacy" className="font-semibold text-pink-ink underline">
              Read our privacy policy
            </Link>
            .
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Button size="sm" onClick={() => choose("accepted")}>
              Accept analytics
            </Button>
            <Button size="sm" variant="secondary" onClick={() => choose("declined")}>
              Decline
            </Button>
          </div>
        </section>
      )}
    </>
  );
}

export function CookieSettingsButton() {
  return (
    <button
      type="button"
      onClick={() => {
        try {
          window.localStorage.removeItem(KEY);
        } catch {
          /* ignore */
        }
        window.dispatchEvent(new Event("lf:cookie-settings"));
      }}
      className="inline-flex min-h-11 items-center font-semibold text-pink-ink underline"
    >
      Change cookie settings
    </button>
  );
}
