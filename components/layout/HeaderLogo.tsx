import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/cn";

/**
 * Both logos live in one home link. `scrolled` swaps icon -> full wordmark.
 * Only transform + opacity animate; reduced motion swaps instantly (global CSS rule).
 * Sizes: icon 36px (mobile) / 44px (md+). Full logo is a very wide wordmark (14:1),
 * so it's capped by width: 180px on mobile (~13px tall), 282px on md+ (20px tall).
 */
export function HeaderLogo({ scrolled }: { scrolled: boolean }) {
  const anim = "transition-[opacity,transform] duration-[350ms] ease-out will-change-transform";
  return (
    <Link
      href="/"
      aria-label="Lulu Femme home"
      className="relative flex h-11 w-[180px] shrink-0 items-center rounded-md md:w-[282px]"
    >
      <span
        aria-hidden={scrolled}
        className={cn(
          anim,
          "absolute top-1/2 left-0 origin-left -translate-y-1/2",
          scrolled ? "scale-75 opacity-0" : "scale-100 opacity-100",
        )}
      >
        <Image
          src="/brand/logo-icon.png"
          alt="Lulu Femme LF monogram"
          width={46}
          height={36}
          priority
          className="h-9 w-auto md:h-11"
          sizes="60px"
        />
      </span>
      <span
        aria-hidden={!scrolled}
        className={cn(
          anim,
          "absolute top-1/2 left-0 origin-left",
          scrolled
            ? "-translate-y-1/2 scale-100 opacity-100"
            : "translate-y-[calc(-50%+8px)] scale-90 opacity-0",
        )}
      >
        <Image
          src="/brand/logo-full.png"
          alt="Lulu Femme"
          width={282}
          height={20}
          priority
          className="h-auto w-[180px] md:w-[282px]"
          sizes="(min-width: 768px) 282px, 180px"
        />
      </span>
    </Link>
  );
}
