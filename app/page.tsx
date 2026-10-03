import Link from "next/link";
import { CtaBand } from "@/components/CtaBand";
import { HeroBanner } from "@/components/HeroBanner";
import { NewsletterForm } from "@/components/forms/NewsletterForm";
import { BoxIcon, CheckIcon, ShieldIcon, StarIcon, VideoIcon } from "@/components/layout/Icons";
import { Accordion } from "@/components/ui/Accordion";
import { bundles, totalPieces } from "@/data/bundles";
import { faqs } from "@/lib/faq";

const trust = [
  { icon: ShieldIcon, title: "Authenticated by hand", text: "Every piece checked by our team" },
  { icon: BoxIcon, title: "Exact bundles", text: "You get the pieces you see" },
  { icon: VideoIcon, title: "Video of every bundle", text: "Filmed piece by piece" },
  { icon: StarIcon, title: "Grade A only", text: "Premium pre-owned condition" },
];

const steps = [
  {
    n: "01",
    title: "Pick a bundle",
    text: "Browse exact bundles by type and size, watch the video and save your favourites.",
  },
  {
    n: "02",
    title: "Request a quote",
    text: "Add one or more bundles to your quote basket and send us your details. Two or more bundles qualify for a combined deal.",
  },
  {
    n: "03",
    title: "Pay and ship",
    text: "Confirm your quote and pay, then we pack and ship it worldwide with tracking.",
  },
];

export default function HomePage() {
  const stats = [
    { value: String(bundles.length), label: "Exact bundles live" },
    { value: totalPieces().toLocaleString("en-GB"), label: "Pieces in stock" },
    { value: "100%", label: "Lululemon" },
    { value: "Grade A", label: "Premium condition" },
  ];

  return (
    <>
      {/* 1. Hero */}
      <HeroBanner
        desktopImage={{
          src: "/hero/hero-desktop.webp",
          width: 1942,
          height: 809,
          focal: "66% 20%",
        }}
        mobileImage={{ src: "/hero/hero-mobile.webp", width: 1145, height: 1374, focal: "50% 15%" }}
        alt="Lulu Femme pre-loved activewear [EDIT]"
        headline="Pre-loved, perfectly curated."
        subline="Grade A Lululemon, hand-checked and ready for a second life."
        buttons={[
          { label: "Shop Bundles", href: "/bundles" },
          { label: "How It Works", href: "/how-it-works" },
        ]}
      />

      {/* 2. Trust bar: compact; swipes sideways on mobile */}
      <section
        aria-label="Why buy from Lulu Femme"
        className="border-b border-line bg-card py-4 md:py-5"
      >
        <ul
          tabIndex={0}
          aria-label="Why buy from Lulu Femme (swipe for more)"
          className="no-scrollbar container-site flex snap-x snap-mandatory scroll-px-4 gap-3 overflow-x-auto md:grid md:grid-cols-4 md:gap-4 md:overflow-visible"
        >
          {trust.map(({ icon: Icon, title, text }) => (
            <li
              key={title}
              className="flex w-[68%] shrink-0 snap-start items-center gap-2.5 rounded-xl border border-line bg-offwhite px-3 py-2.5 md:w-auto"
            >
              <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blush text-pink-ink">
                <Icon className="h-4 w-4" />
              </span>
              <span className="min-w-0">
                <span className="block text-sm leading-tight font-bold text-plum">{title}</span>
                <span className="block text-xs text-ink">{text}</span>
              </span>
            </li>
          ))}
        </ul>
      </section>

      {/* 4. How it works */}
      <section aria-labelledby="how-title" className="bg-blush py-14 md:py-20">
        <div className="container-site">
          <h2 id="how-title" className="display mb-10 text-4xl text-plum md:text-5xl">
            How it works
          </h2>
          <ol className="grid gap-6 md:grid-cols-3">
            {steps.map((s) => (
              <li key={s.n} className="rounded-2xl border border-line bg-card p-6">
                <span aria-hidden="true" className="display text-5xl text-pink-ink">
                  {s.n}
                </span>
                <h3 className="mt-3 text-xl font-bold text-plum">{s.title}</h3>
                <p className="mt-2 text-ink">{s.text}</p>
              </li>
            ))}
          </ol>
          <Link
            href="/how-it-works"
            className="mt-8 inline-flex min-h-11 items-center font-semibold text-pink-ink underline underline-offset-4"
          >
            More about how it works
          </Link>
        </div>
      </section>

      {/* 5. Stats */}
      <section aria-label="Lulu Femme in numbers" className="container-site py-14">
        <dl className="grid grid-cols-2 gap-6 md:grid-cols-4">
          {stats.map((s) => (
            <div
              key={s.label}
              className="flex flex-col-reverse gap-1 rounded-2xl border border-line bg-card p-6 text-center"
            >
              <dt className="text-sm font-semibold text-ink">{s.label}</dt>
              <dd className="display text-4xl text-pink-ink md:text-5xl">{s.value}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* 6. Drop alerts */}
      <section aria-labelledby="drops-title" className="container-site pb-14">
        <div className="flex flex-col gap-5 rounded-3xl border border-line bg-card p-6 md:flex-row md:items-center md:justify-between md:p-10">
          <div className="max-w-md">
            <h2 id="drops-title" className="display text-3xl text-plum md:text-4xl">
              Get drop alerts
            </h2>
            <p className="mt-2 text-ink">
              New bundles sell fast. Be first to hear when the next drop goes live.
            </p>
          </div>
          <NewsletterForm />
        </div>
      </section>

      {/* 7. FAQ preview */}
      <section aria-labelledby="faq-title" className="container-site pb-6">
        <h2 id="faq-title" className="display mb-6 text-4xl text-plum md:text-5xl">
          Questions
        </h2>
        <Accordion items={faqs.slice(0, 3).map((f) => ({ title: f.q, content: <p>{f.a}</p> }))} />
        <Link
          href="/faq"
          className="mt-4 inline-flex min-h-11 items-center gap-1 font-semibold text-pink-ink underline underline-offset-4"
        >
          <CheckIcon className="h-4 w-4" /> Read all FAQs
        </Link>
      </section>

      <CtaBand />
    </>
  );
}
