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
}

/**
 * Full-width hero. Art-directed <picture>: the browser downloads only the
 * image for the current screen (desktop ≥768px, mobile below).
 * Mobile shows a small headline and the buttons; desktop adds the subline.
 * Text is pink on a soft cream fade so it stays readable on the photo.
 * Built as a single slide so it can later be wrapped in a slider.
 */
export function HeroBanner({
  desktopImage,
  mobileImage,
  alt,
  headline,
  subline,
  buttons,
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

      {/* Soft cream fade behind the text: from the bottom on mobile, from the left on desktop */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-[5] bg-[linear-gradient(0deg,rgba(252,254,241,0.97)_0%,rgba(252,254,241,0.92)_32%,rgba(252,254,241,0)_58%)] md:bg-[linear-gradient(90deg,rgba(252,254,241,0.94)_0px,rgba(252,254,241,0.88)_620px,rgba(252,254,241,0)_950px)] lg:bg-[linear-gradient(90deg,rgba(252,254,241,0.94)_0px,rgba(252,254,241,0.88)_780px,rgba(252,254,241,0)_1150px)]"
      />

      <div className="absolute inset-x-0 bottom-0 pb-6 md:pb-16 lg:pb-20">
        <div className="container-site">
          <div className="md:max-w-[500px] lg:max-w-[620px]">
            <h1
              id="hero-title"
              className="hero-fade text-[1.75rem] leading-[1.05] font-bold tracking-[-0.03em] text-[#E3165B] md:text-[3.25rem] md:leading-[1.02] lg:text-[4.5rem]"
            >
              {headline}
            </h1>
            <p className="hero-fade hero-delay-1 mt-4 hidden text-2xl leading-snug font-medium text-[#C8104F] md:block">
              {subline}
            </p>
            <div className="hero-fade hero-delay-2 mt-4 flex flex-wrap gap-2.5 md:mt-8 md:gap-3">
              {buttons.map((b) => (
                <Link
                  key={b.href}
                  href={b.href}
                  className="btn-fill inline-flex h-11 items-center rounded-full border-2 border-[#E3165B] bg-[#FBF7F8] px-5 text-sm font-semibold text-[#2A1320] md:h-12 md:px-7 md:text-base"
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
