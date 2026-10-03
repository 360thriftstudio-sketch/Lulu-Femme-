"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useQuote, useSaved } from "@/components/providers/Providers";
import { ButtonLink } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { cn } from "@/lib/cn";
import { mainNav, site } from "@/lib/site";
import { CurrencySwitcher } from "./CurrencySwitcher";
import { HeaderLogo } from "./HeaderLogo";
import { BasketIcon, HeartIcon, InstagramIcon, MailIcon, MenuIcon } from "./Icons";

function CountIcon({
  href,
  label,
  count,
  children,
}: {
  href: string;
  label: string;
  count: number;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      aria-label={`${label}: ${count} ${count === 1 ? "bundle" : "bundles"}`}
      className="relative inline-flex h-11 w-11 items-center justify-center rounded-full text-ink hover:bg-blush hover:text-pink-ink"
    >
      {children}
      {count > 0 && (
        <span
          aria-hidden="true"
          className="absolute top-0.5 right-0.5 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-pink px-1 text-[0.7rem] font-bold text-on-pink"
        >
          {count}
        </span>
      )}
    </Link>
  );
}

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const saved = useSaved();
  const quote = useQuote();

  // Watch a marker placed 60px down the page instead of listening to every scroll event.
  useEffect(() => {
    const marker = document.getElementById("scroll-marker");
    if (!marker) return;
    const io = new IntersectionObserver(([entry]) => setScrolled(!entry.isIntersecting), {
      threshold: 0,
    });
    io.observe(marker);
    return () => io.disconnect();
  }, []);

  useEffect(() => setMenuOpen(false), [pathname]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <>
      <header data-scrolled={scrolled} className="pointer-events-none sticky top-0 z-40 h-20">
        {/* Background panel: 64px tall, fades in when scrolled */}
        <div
          aria-hidden="true"
          className={cn(
            "absolute inset-x-0 top-0 h-16 border-b border-line bg-[var(--header-bg)] shadow-soft backdrop-blur-md transition-opacity duration-[350ms] ease-out",
            scrolled ? "opacity-100" : "opacity-0",
          )}
        />
        <div
          className={cn(
            "container-site pointer-events-auto relative flex h-20 items-center gap-3 transition-transform duration-[350ms] ease-out",
            scrolled && "-translate-y-2",
          )}
        >
          <HeaderLogo scrolled={scrolled} />

          <nav aria-label="Main" className="ml-auto hidden xl:block">
            <ul className="flex items-center gap-1">
              {mainNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    className={cn(
                      "inline-flex min-h-11 items-center rounded-full px-3 text-[0.95rem] font-medium hover:text-pink-ink",
                      isActive(item.href)
                        ? "text-pink-ink underline underline-offset-8"
                        : "text-ink",
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="ml-auto flex items-center gap-1 xl:ml-2">
            <CurrencySwitcher className="hidden md:block" />
            <CountIcon href="/saved" label="Saved bundles" count={saved.items.length}>
              <HeartIcon className="h-6 w-6" />
            </CountIcon>
            <CountIcon href="/quote" label="Quote basket" count={quote.items.length}>
              <BasketIcon className="h-6 w-6" />
            </CountIcon>
            <div className="ml-1 hidden md:block">
              <ButtonLink href="/quote" size="sm">
                Get a Quote
              </ButtonLink>
            </div>
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full text-ink hover:bg-blush xl:hidden"
            >
              <MenuIcon className="h-6 w-6" />
            </button>
          </div>
        </div>
      </header>
      {/* Rendered outside the header: the header is pointer-events:none, which the menu would inherit. */}
      <Modal open={menuOpen} onClose={() => setMenuOpen(false)} title="Menu" variant="full">
        <nav id="mobile-menu" aria-label="Mobile" className="flex flex-col gap-6">
          <ul className="flex flex-col">
            {mainNav.map((item) => (
              <li key={item.href} className="border-b border-line">
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  onClick={() => setMenuOpen(false)}
                  className="display flex min-h-14 items-center text-3xl text-plum hover:text-pink-ink"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="flex flex-wrap items-center gap-3">
            <ButtonLink href="/quote" onClick={() => setMenuOpen(false)}>
              Get a Quote
            </ButtonLink>
            <ButtonLink href="/saved" variant="secondary" onClick={() => setMenuOpen(false)}>
              Saved ({saved.items.length})
            </ButtonLink>
            <CurrencySwitcher />
          </div>
          <div className="flex flex-col gap-2 text-sm">
            <a
              href={site.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center gap-2 text-ink hover:text-pink-ink"
            >
              <InstagramIcon className="h-5 w-5" /> @{site.instagramHandle}
            </a>
            <a
              href={`mailto:${site.email}`}
              className="inline-flex min-h-11 items-center gap-2 text-ink hover:text-pink-ink"
            >
              <MailIcon className="h-5 w-5" /> {site.email}
            </a>
          </div>
        </nav>
      </Modal>
    </>
  );
}
