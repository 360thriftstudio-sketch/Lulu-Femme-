import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import {
  BoxIcon,
  CameraIcon,
  ClockIcon,
  DocIcon,
  GlobeIcon,
  SearchIcon,
  ShieldIcon,
  SparkleIcon,
  StarIcon,
  TruckIcon,
} from "@/components/layout/Icons";
import { ButtonLink } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { WorldMap } from "@/components/WorldMap";
import { site } from "@/lib/site";

const description =
  "Lulu Femme is a curated pre-loved activewear brand. We source, check and prepare Grade A Lululemon in our studio in Pakistan and ship it worldwide.";

export const metadata: Metadata = {
  title: { absolute: "About Lulu Femme | Curated Pre-Loved Lululemon, Shipped Worldwide" },
  description,
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About Lulu Femme | Curated Pre-Loved Lululemon, Shipped Worldwide",
    description,
    url: "/about",
  },
};

const steps = [
  {
    icon: SearchIcon,
    title: "Sourced",
    text: "We carefully select pre-loved Lululemon from trusted suppliers.",
  },
  {
    icon: ShieldIcon,
    title: "Checked",
    text: "Every piece is checked by hand for authenticity: label, tags, stitching and fabric.",
  },
  {
    icon: StarIcon,
    title: "Graded",
    text: "Only Grade A pieces make it into our bundles. Any marks are disclosed.",
  },
  {
    icon: SparkleIcon,
    title: "Cleaned & prepared",
    text: "Pieces are cleaned, steamed and neatly folded.",
  },
  {
    icon: CameraIcon,
    title: "Photographed",
    text: "Every bundle is photographed so you see exactly what you get.",
  },
  {
    icon: TruckIcon,
    title: "Packed & shipped",
    text: "Packed with care and sent worldwide with tracking.",
  },
];

const shippingCards = [
  { icon: TruckIcon, label: "Tracked shipping" },
  { icon: BoxIcon, label: "Secure packaging" },
  { icon: GlobeIcon, label: "Worldwide delivery" },
  { icon: ClockIcon, label: "Dispatch in [EDIT] working days" },
];

const promises = [
  { icon: ShieldIcon, title: "100% Authentic", text: "Every piece checked by hand." },
  { icon: StarIcon, title: "Grade A only", text: "Clean, ready-to-wear pieces." },
  { icon: BoxIcon, title: "Exact bundles", text: "What you see is what you get." },
  { icon: DocIcon, title: "Honest descriptions", text: "Any marks are always disclosed." },
];

const aboutLd = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  name: "About Lulu Femme",
  url: `${site.url}/about`,
  description,
  mainEntity: {
    "@type": "Organization",
    name: site.name,
    url: site.url,
    logo: `${site.url}/brand/logo-icon.png`,
    email: site.email,
    sameAs: [site.instagramUrl],
    slogan: "Curated in Pakistan. Shipped worldwide.",
  },
};

function Logo({ className }: { className?: string }) {
  return (
    <Image
      src="/brand/logo-icon.png"
      alt="Lulu Femme LF logo"
      width={92}
      height={72}
      className={className ?? "mx-auto h-16 w-auto md:h-[72px]"}
    />
  );
}

export default function AboutPage() {
  return (
    <>
      <JsonLd data={aboutLd} />

      {/* 1. Hero */}
      <section aria-labelledby="about-title" className="bg-offwhite">
        <div className="container-site flex flex-col items-center gap-6 py-14 text-center md:py-20">
          <Logo />
          <h1 id="about-title" className="display max-w-4xl text-5xl text-pink md:text-7xl">
            Curated in Pakistan. Shipped worldwide.
          </h1>
          <p className="max-w-2xl text-lg text-plum md:text-xl">
            Lulu Femme is a curated pre-loved activewear brand. We source, check and prepare Grade A
            Lululemon pieces in our studio in Pakistan, then ship them to customers and resellers
            around the world, one find at a time.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <ButtonLink href="/bundles">Shop Bundles</ButtonLink>
            <ButtonLink href="/contact" variant="secondary">
              Contact Us
            </ButtonLink>
          </div>
        </div>
      </section>

      {/* 2. Our story */}
      <section aria-labelledby="story-title" className="container-site py-14 md:py-20">
        <div className="fade-up grid items-center gap-8 md:grid-cols-2 md:gap-12">
          <div>
            <h2 id="story-title" className="display text-4xl text-plum md:text-5xl">
              Our story
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-ink">
              Lulu Femme started with a simple idea: premium activewear deserves a second life. Too
              many good pieces end up forgotten when they still have years of wear left. We give
              them a careful second chance, so you get the quality you love at a smarter price, with
              less waste.
            </p>
          </div>
          <div
            role="img"
            aria-label="Placeholder for a photo of the Lulu Femme studio"
            className="flex aspect-[4/3] items-center justify-center rounded-3xl border-2 border-dashed border-line-strong bg-blush p-6 text-center font-semibold text-plum"
          >
            Studio photo [EDIT]
          </div>
        </div>
      </section>

      {/* 3. How we prepare every piece */}
      <section
        aria-labelledby="prepare-title"
        className="border-y border-line bg-card py-14 md:py-20"
      >
        <div className="container-site">
          <div className="fade-up mx-auto max-w-2xl text-center">
            <h2 id="prepare-title" className="display text-4xl text-plum md:text-5xl">
              How we prepare every piece
            </h2>
            <p className="mt-3 text-lg text-ink">
              Every piece passes through our studio in Pakistan before it reaches you.
            </p>
          </div>
          <ol className="relative mt-10 grid gap-8 lg:mt-14 lg:grid-cols-6 lg:gap-4">
            <span
              aria-hidden="true"
              className="absolute top-2 bottom-2 left-[21px] w-0.5 bg-pink lg:top-[21px] lg:right-[8%] lg:bottom-auto lg:left-[8%] lg:h-0.5 lg:w-auto"
            />
            {steps.map(({ icon: Icon, title, text }, idx) => (
              <li
                key={title}
                className="fade-up relative flex gap-4 lg:flex-col lg:items-center lg:text-center"
              >
                <span
                  aria-hidden="true"
                  className="relative z-10 inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-pink text-lg font-bold text-on-pink ring-4 ring-card"
                >
                  {idx + 1}
                </span>
                <div className="flex flex-col gap-1 lg:items-center">
                  <h3 className="flex items-center gap-2 text-lg font-bold text-plum">
                    <Icon className="h-5 w-5 text-pink-ink" />
                    <span>
                      <span className="sr-only">Step {idx + 1}: </span>
                      {title}
                    </span>
                  </h3>
                  <p className="text-sm text-ink">{text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 4. Shipping worldwide */}
      <section
        aria-labelledby="shipping-title"
        className="relative overflow-hidden bg-blush py-14 md:py-20"
      >
        <WorldMap className="pointer-events-none absolute inset-x-0 top-1/2 mx-auto w-[min(1100px,140%)] -translate-y-1/2 text-plum opacity-15" />
        <div className="container-site relative">
          <div className="fade-up mx-auto max-w-2xl text-center">
            <h2 id="shipping-title" className="display text-4xl text-plum md:text-5xl">
              Shipping worldwide
            </h2>
            <p className="mt-4 text-lg text-ink">
              From our studio in Pakistan, we ship to the UK, Europe, the USA, the Middle East and
              beyond. Every order is packed securely and sent with tracking, so you can follow it
              all the way to your door.
            </p>
            <p className="mt-3 text-sm text-muted">
              Import duties or taxes may apply in your country and are paid by the buyer.
            </p>
          </div>
          <ul className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-4">
            {shippingCards.map(({ icon: Icon, label }) => (
              <li
                key={label}
                className="fade-up flex flex-col items-center gap-2 rounded-2xl border border-line bg-card p-5 text-center"
              >
                <Icon className="h-7 w-7 text-pink-ink" />
                <span className="font-semibold text-ink">{label}</span>
              </li>
            ))}
          </ul>
          <p className="mt-8 text-center">
            <Link
              href="/shipping"
              className="inline-flex min-h-11 items-center font-semibold text-pink-ink underline underline-offset-4 hover:text-plum"
            >
              See shipping details
            </Link>
          </p>
        </div>
      </section>

      {/* 5. Our promise */}
      <section aria-labelledby="promise-title" className="container-site py-14 md:py-20">
        <h2
          id="promise-title"
          className="display fade-up text-center text-4xl text-plum md:text-5xl"
        >
          Our promise
        </h2>
        <ul className="mt-10 grid grid-cols-2 gap-4 md:gap-6 lg:grid-cols-4">
          {promises.map(({ icon: Icon, title, text }) => (
            <li key={title} className="fade-up">
              <Card className="flex h-full flex-col gap-3">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-blush text-pink-ink">
                  <Icon className="h-6 w-6" />
                </span>
                <h3 className="text-lg font-bold text-plum">{title}</h3>
                <p className="text-sm text-ink">{text}</p>
              </Card>
            </li>
          ))}
        </ul>
      </section>

      {/* 6. Why pre-loved */}
      <section aria-labelledby="why-title" className="py-16 md:py-24">
        <figure className="fade-up container-site mx-auto max-w-4xl text-center">
          <h2 id="why-title" className="sr-only">
            Why pre-loved
          </h2>
          <blockquote>
            <p className="display text-4xl text-plum md:text-6xl">
              “Premium quality for less, and good clothes kept in use for longer.”
            </p>
          </blockquote>
          <figcaption className="mt-5 text-lg text-ink">
            Better for your wardrobe, your budget and the planet.
          </figcaption>
        </figure>
      </section>

      {/* 7. Call to action */}
      <section aria-labelledby="cta-title" className="border-t border-line bg-offwhite">
        <div className="container-site flex flex-col items-center gap-6 py-16 text-center">
          <Logo className="fade-up mx-auto h-14 w-auto" />
          <h2 id="cta-title" className="display fade-up text-4xl text-plum md:text-5xl">
            Ready to find your next favourite?
          </h2>
          <div className="flex flex-wrap justify-center gap-3">
            <ButtonLink href="/bundles">Shop Bundles</ButtonLink>
            <ButtonLink href="/contact" variant="secondary">
              Contact Us
            </ButtonLink>
          </div>
        </div>
      </section>

      {/* 8. Disclaimer */}
      <p className="container-site pb-4 text-center text-xs text-muted">{site.disclaimer}</p>
    </>
  );
}
