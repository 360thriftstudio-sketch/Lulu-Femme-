export const site = {
  name: "Lulu Femme",
  // Set NEXT_PUBLIC_SITE_URL to your real domain once connected. On Vercel it falls back to the project URL.
  url:
    process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : "http://localhost:3000"),
  description:
    "Grade A pre-owned Lululemon sold wholesale in exact bundles for resellers. Every bundle is hand-authenticated and filmed. Based in Birmingham, UK.",
  email: "lulufemmee@gmail.com",
  instagramHandle: "lulufemmee",
  instagramUrl: "https://www.instagram.com/lulufemmee/",
  location: "Birmingham, UK & Karachi, Pakistan",
  addresses: [
    {
      label: "United Kingdom",
      lines: ["27 Ferndown Close", "Birmingham B26 2BT", "United Kingdom"],
    },
    {
      label: "Pakistan",
      lines: [
        "Plot# A-134, Philibhit Cooperative Housing Society",
        "Scheme 33, Near Super Highway",
        "Karachi, Pakistan",
      ],
    },
  ],
  disclaimer:
    "Lulu Femme is an independent reseller of pre-owned lululemon products and is not affiliated with, endorsed by or sponsored by lululemon athletica inc.",
};

export const mainNav = [
  { href: "/bundles", label: "Shop Bundles" },
  { href: "/how-it-works", label: "How It Works" },
  { href: "/grading", label: "Grading" },
  { href: "/custom-orders", label: "Custom Orders" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export const footerNav = [
  ...mainNav,
  { href: "/authenticity", label: "Authenticity" },
  { href: "/shipping", label: "Shipping" },
  { href: "/faq", label: "FAQ" },
  { href: "/quote", label: "Quote basket" },
  { href: "/saved", label: "Saved bundles" },
  { href: "/privacy", label: "Privacy & cookies" },
];

export function mailtoFor(subject: string, body = ""): string {
  const params = new URLSearchParams({ subject, body });
  return `mailto:${site.email}?${params.toString().replace(/\+/g, "%20")}`;
}
