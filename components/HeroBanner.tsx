import { getImageProps } from "next/image";
import Link from "next/link";

export interface HeroImage {
  src: string;
  width: number;
  height: number;
  /** CSS object-position, e.g. "75% 20%", to keep the model/clothes in frame. */
  focal?: string;
}

export interface HeroButton {
  label: string;
  href: string;
}

export interface HeroBannerProps {
  desktopImage: HeroImage;
  mobileImage: HeroImage;
  alt: string;
  headline: string;
  subline: string;
  buttons: HeroButton[];
  /** Where the whole banner links to on mobile (image only). */
  mobileHref?: string;
  mobileLabel?: string;
}

/**
 * Full-width hero. Art-directed <picture>: the browser downloads only the
 * image for the current screen (desktop ≥768px, mobile below).
 * Mobile shows the image only (one big link); the headline stays in the HTML
 * as a visually hidden <h1>. Desktop shows headline, subline and buttons.
 * Built as a single slide so it can later be wrapped in a slider.
 */
export function HeroBanner({
  desktopImage,
  mobileImage,
  alt,
  headline,
  subline,
  buttons,
  mobileHref = "/bundles",
  mobileLabel = "Shop Lulu Femme bundles",
}: HeroBannerProps) {
  const common = { alt, priority: true, quality: 82 } as const;
  const {
    props: { srcSet: desktopSrcSet },
  } = getImageProps({ ...common, ...desktopImage, sizes: "100vw" });
  const {
    props: { srcSet: mobileSrcSet, ...mobileRest },
  } = getImageProps({ ...common, ...mobileImage, sizes: "100vw" });

  return (
    <section
      aria-labelledby="hero-title"
      className="relative isolate aspect-[4/5] w-full overflow-hidden bg-[#ececec] md:aspect-auto md:h-[80vh] md:max-h-[820px] md:min-h-[560px]"
    >
      <picture>
        <source media="(min-width: 768px)" srcSet={desktopSrcSet} sizes="100vw" />
        <source media="(max-width: 767px)" srcSet={mobileSrcSet} sizes="100vw" />
        <img
          {...mobileRest}
          alt={alt}
          className="hero-img absolute inset-0 -z-10 h-full w-full object-cover"
          style={
            {
              "--focal-mobile": mobileImage.focal ?? "50% 20%",
              "--focal-desktop": desktopImage.focal ?? "75% 25%",
            } as React.CSSProperties
          }
        />
      </picture>

      {/* Desktop: left-side gradient for text contrast */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-[5] hidden bg-[linear-gradient(90deg,rgba(0,0,0,0.62)_0px,rgba(0,0,0,0.55)_620px,rgba(0,0,0,0)_900px)] md:block lg:bg-[linear-gradient(90deg,rgba(0,0,0,0.62)_0px,rgba(0,0,0,0.55)_780px,rgba(0,0,0,0)_1120px)]"
      />

      {/* Mobile: the whole banner is one link */}
      <Link
        href={mobileHref}
        aria-label={mobileLabel}
        className="absolute inset-0 focus-visible:outline-offset-[-6px] md:hidden"
      />

      <div className="absolute inset-x-0 bottom-0 md:pb-16 lg:pb-20">
        <div className="container-site">
          <div className="md:max-w-[500px] lg:max-w-[620px]">
            <h1
              id="hero-title"
              className="hero-fade sr-only text-white md:not-sr-only md:text-[3.25rem] md:leading-[1.02] md:font-bold md:tracking-[-0.03em] lg:text-[4.5rem]"
            >
              {headline}
            </h1>
            <p className="hero-fade hero-delay-1 mt-4 hidden text-2xl leading-snug text-white md:block">
              {subline}
            </p>
            <div className="hero-fade hero-delay-2 mt-8 hidden flex-wrap gap-3 md:flex">
              {buttons.map((b) => (
                <Link
                  key={b.href}
                  href={b.href}
                  className="inline-flex h-12 items-center rounded-full bg-[#FBF7F8] px-7 text-base font-semibold text-[#2A1320] transition-colors duration-200 hover:bg-[#E3165B] hover:text-white focus-visible:outline-white"
                >
                  {b.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
