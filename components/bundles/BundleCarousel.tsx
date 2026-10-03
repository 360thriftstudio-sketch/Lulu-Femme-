"use client";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { Badge } from "@/components/ui/Badge";
import type { Bundle } from "@/data/bundles";
import { cn } from "@/lib/cn";

const INTERVAL = 3500;

function Arrow({ dir }: { dir: "prev" | "next" }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5" fill="none">
      <path
        d={dir === "prev" ? "M15 5l-7 7 7 7" : "M9 5l7 7-7 7"}
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * Auto-playing, swipeable bundle catalogue. Pauses on hover, focus, touch,
 * when off-screen, and for visitors who prefer reduced motion; a Pause/Play
 * button is always available (WCAG 2.2.2).
 */
export function BundleCarousel({ bundles, title }: { bundles: Bundle[]; title: string }) {
  const track = useRef<HTMLUListElement>(null);
  const [playing, setPlaying] = useState(true);
  const [hovered, setHovered] = useState(false);
  const [visible, setVisible] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const step = useCallback(() => {
    const el = track.current;
    const card = el?.querySelector("li");
    return card ? card.getBoundingClientRect().width + 16 : 300;
  }, []);

  const go = useCallback(
    (dir: 1 | -1) => {
      const el = track.current;
      if (!el) return;
      const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 4;
      const atStart = el.scrollLeft <= 4;
      const behavior = reduced ? "auto" : "smooth";
      if (dir === 1 && atEnd) el.scrollTo({ left: 0, behavior });
      else if (dir === -1 && atStart) el.scrollTo({ left: el.scrollWidth, behavior });
      else el.scrollBy({ left: dir * step(), behavior });
    },
    [reduced, step],
  );

  useEffect(() => {
    if (!playing || hovered || !visible || reduced) return;
    const id = window.setInterval(() => go(1), INTERVAL);
    return () => window.clearInterval(id);
  }, [playing, hovered, visible, reduced, go]);

  const onScroll = () => {
    const el = track.current;
    if (el) setActive(Math.round(el.scrollLeft / step()));
  };

  const autoplayOn = playing && !reduced;

  return (
    <section
      aria-roledescription="carousel"
      aria-labelledby="catalogue-title"
      className="py-10 md:py-14"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocusCapture={() => setHovered(true)}
      onBlurCapture={() => setHovered(false)}
      onTouchStart={() => setHovered(true)}
      onTouchEnd={() => window.setTimeout(() => setHovered(false), 4000)}
    >
      <div className="container-site mb-5 flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-xs font-bold tracking-widest text-pink-ink uppercase">The catalogue</p>
          <h2 id="catalogue-title" className="display text-3xl text-plum md:text-5xl">
            {title}
          </h2>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setPlaying((p) => !p)}
            aria-pressed={!autoplayOn}
            disabled={reduced}
            className="inline-flex h-11 items-center rounded-full px-3 text-sm font-semibold text-ink hover:text-pink-ink disabled:hidden"
          >
            {autoplayOn ? "Pause" : "Play"}
            <span className="sr-only"> slideshow</span>
          </button>
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label="Previous bundles"
            className="btn-fill inline-flex h-11 w-11 items-center justify-center rounded-full border-2 border-pink text-pink-ink"
          >
            <Arrow dir="prev" />
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            aria-label="Next bundles"
            className="btn-fill inline-flex h-11 w-11 items-center justify-center rounded-full border-2 border-pink text-pink-ink"
          >
            <Arrow dir="next" />
          </button>
        </div>
      </div>

      <ul
        ref={track}
        onScroll={onScroll}
        aria-live={autoplayOn ? "off" : "polite"}
        className="no-scrollbar container-site flex snap-x snap-mandatory scroll-px-4 gap-4 overflow-x-auto pb-2 md:scroll-px-6"
      >
        {bundles.map((b, i) => (
          <li
            key={b.slug}
            aria-roledescription="slide"
            aria-label={`${i + 1} of ${bundles.length}`}
            className="w-[44%] shrink-0 snap-start xs:w-[42%] sm:w-[30%] lg:w-[22%] xl:w-[18.5%]"
          >
            <Link
              href={`/bundles/${b.slug}`}
              className={cn(
                "group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-card shadow-soft transition-[transform,box-shadow] duration-300 ease-out hover:-translate-y-1 hover:shadow-lg",
                i === active && "ring-2 ring-pink/40",
              )}
            >
              <span className="relative block aspect-[1173/1341] overflow-hidden bg-white">
                <Image
                  src={b.image}
                  alt={`${b.name} bundle ${b.code}`}
                  fill
                  sizes="(min-width: 1280px) 240px, (min-width: 1024px) 22vw, (min-width: 640px) 30vw, 44vw"
                  className="object-contain transition-transform duration-500 ease-out group-hover:scale-105"
                />
                {b.status !== "available" && (
                  <span className="absolute bottom-2 left-2">
                    <Badge tone="plum" className="uppercase">
                      {b.status}
                    </Badge>
                  </span>
                )}
              </span>
              <span className="flex flex-1 flex-col gap-1 p-3">
                <span className="flex flex-wrap items-center gap-1.5">
                  <Badge tone="pink" display>
                    {b.code}
                  </Badge>
                  <span className="text-xs font-semibold text-muted">{b.pieces} pcs</span>
                </span>
                <span className="text-sm leading-tight font-bold text-plum">{b.name}</span>
                <span className="mt-auto pt-1 text-xs font-semibold text-pink-ink group-hover:underline">
                  View bundle →
                </span>
              </span>
            </Link>
          </li>
        ))}
      </ul>

      <div className="container-site mt-4 flex items-center justify-between gap-4">
        <div aria-hidden="true" className="flex gap-1.5">
          {bundles.map((b, i) => (
            <span
              key={b.slug}
              className={cn(
                "h-1.5 rounded-full transition-all duration-300",
                i === active ? "w-6 bg-pink" : "w-1.5 bg-line-strong/50",
              )}
            />
          ))}
        </div>
        <Link
          href="/bundles"
          className="inline-flex min-h-11 items-center text-sm font-semibold text-pink-ink underline underline-offset-4"
        >
          See all {bundles.length} bundles
        </Link>
      </div>
    </section>
  );
}
