import Image from "next/image";
import Link from "next/link";
import { BundleCard } from "@/components/bundles/BundleCard";
import { CtaBand } from "@/components/CtaBand";
import { NewsletterForm } from "@/components/forms/NewsletterForm";
import { BoxIcon, CheckIcon, ShieldIcon, StarIcon, VideoIcon } from "@/components/layout/Icons";
import { Accordion } from "@/components/ui/Accordion";
import { ButtonLink } from "@/components/ui/Button";
import { bundles, getBundle, totalPieces, type Bundle } from "@/data/bundles";
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
    text: "Confirm your quote and pay, then we dispatch from Birmingham within 2 working days.",
  },
];

export default function HomePage() {
  const hero = getBundle("lf-02")!;
  const featured = ["lf-01", "lf-06", "lf-10"].map((s) => getBundle(s)).filter(Boolean) as Bundle[];
  const stats = [
    { value: String(bundles.length), label: "Exact bundles live" },
    { value: totalPieces().toLocaleString("en-GB"), label: "Pieces in stock" },
    { value: "100%", label: "Lululemon" },
    { value: "Grade A", label: "Premium condition" },
  ];

  return (
    <>
      {/* 1. Hero */}
      <section className="container-site grid items-center gap-10 pt-4 pb-12 md:grid-cols-2 md:pt-8 lg:gap-16">
        <div className="flex flex-col items-start gap-6">
          <p className="rounded-full bg-blush px-3 py-1 text-sm font-bold tracking-wider text-pink-ink uppercase">
            Wholesale for resellers
          </p>
          <h1 className="display text-5xl text-plum xs:text-[3.4rem] lg:text-7xl">
            Grade A pre-owned Lululemon, sold in exact bundles
          </h1>
          <p className="max-w-lg text-lg text-ink">
            Restock your Vinted, Depop, eBay or boutique with hand-authenticated Align, leggings and
            mixed bundles. Every bundle is filmed, so you know exactly what you&apos;re buying.
          </p>
          <div className="flex flex-wrap gap-3">
            <ButtonLink href="/bundles">Shop bundles</ButtonLink>
            <ButtonLink href="/custom-orders" variant="secondary">
              Request a custom bundle
            </ButtonLink>
          </div>
        </div>
        <div className="relative mx-auto w-full max-w-md md:max-w-none">
          <div className="relative aspect-[1173/1341] overflow-hidden rounded-3xl border border-line bg-blush shadow-soft">
            <Image
              src={hero.image}
              alt="Align Collection Mix bundle LF-02: 25 pre-owned Lululemon pieces including a red Define Jacket, leggings, shorts and a bra"
              fill
              priority
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
          <Link
            href={`/bundles/${hero.slug}`}
            className="absolute -bottom-4 left-4 inline-flex min-h-11 items-center gap-2 rounded-full bg-card px-4 py-2 text-sm font-semibold text-ink shadow-soft hover:text-pink-ink"
          >
            <span className="display text-pink-ink">{hero.code}</span> {hero.pieces} pcs · View
            bundle
          </Link>
        </div>
      </section>

      {/* 2. Trust bar */}
      <section aria-label="Why buy from Lulu Femme" className="border-y border-line bg-card">
        <ul className="container-site grid grid-cols-2 gap-6 py-8 lg:grid-cols-4">
          {trust.map(({ icon: Icon, title, text }) => (
            <li key={title} className="flex items-start gap-3">
              <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-blush text-pink-ink">
                <Icon className="h-6 w-6" />
              </span>
              <span>
                <span className="block font-bold text-plum">{title}</span>
                <span className="block text-sm text-ink">{text}</span>
              </span>
            </li>
          ))}
        </ul>
      </section>

      {/* 3. Featured bundles */}
      <section aria-labelledby="featured-title" className="container-site py-14 md:py-20">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <h2 id="featured-title" className="display text-4xl text-plum md:text-5xl">
            Featured bundles
          </h2>
          <Link
            href="/bundles"
            className="inline-flex min-h-11 items-center font-semibold text-pink-ink underline underline-offset-4"
          >
            See all {bundles.length} bundles
          </Link>
        </div>
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((b) => (
            <li key={b.slug}>
              <BundleCard bundle={b} />
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
