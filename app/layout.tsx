import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import { JsonLd } from "@/components/JsonLd";
import { CookieConsent } from "@/components/layout/CookieConsent";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { InstagramFab } from "@/components/layout/InstagramFab";
import { Providers } from "@/components/providers/Providers";
import { site } from "@/lib/site";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  weight: ["500", "600"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-cormorant",
  display: "swap",
});
const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Lulu Femme | Grade A pre-owned Lululemon wholesale bundles",
    template: "%s | Lulu Femme",
  },
  description: site.description,
  applicationName: site.name,
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: "en_GB",
    url: "/",
  },
  twitter: { card: "summary_large_image" },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f4eee6" },
    { media: "(prefers-color-scheme: dark)", color: "#1b1416" },
  ],
};

const organization = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: site.name,
  url: site.url,
  logo: `${site.url}/brand/logo-icon.png`,
  email: site.email,
  sameAs: [site.instagramUrl],
  address: [
    {
      "@type": "PostalAddress",
      streetAddress: "27 Ferndown Close",
      addressLocality: "Birmingham",
      postalCode: "B26 2BT",
      addressCountry: "GB",
    },
    {
      "@type": "PostalAddress",
      streetAddress:
        "Plot# A-134, Philibhit Cooperative Housing Society, Scheme 33, Near Super Highway",
      addressLocality: "Karachi",
      addressCountry: "PK",
    },
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-GB" className={`${cormorant.variable} ${manrope.variable}`}>
      <body className="relative min-h-dvh">
        {/* Marker 60px down the page; the header watches it with an IntersectionObserver. */}
        <div
          id="scroll-marker"
          aria-hidden="true"
          className="pointer-events-none absolute top-[60px] left-0 h-px w-px"
        />
        <a
          href="#main"
          className="sr-only z-[100] rounded-full bg-pink px-5 py-3 font-semibold text-on-pink focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
        >
          Skip to content
        </a>
        <Providers>
          <Header />
          <main id="main" tabIndex={-1} className="outline-none">
            {children}
          </main>
          <Footer />
          <InstagramFab />
          <CookieConsent />
        </Providers>
        <JsonLd data={organization} />
      </body>
    </html>
  );
}
