import Image from "next/image";
import Link from "next/link";
import { footerNav, site } from "@/lib/site";
import { TrackedLink } from "./TrackedLink";
import { InstagramIcon, MailIcon } from "./Icons";

export function Footer() {
  return (
    <footer className="mt-8 border-t border-line bg-blush">
      <div className="container-site grid gap-10 py-12 md:grid-cols-[1.2fr_2fr]">
        <div className="flex flex-col gap-4">
          <Image
            src="/brand/logo-full.png"
            alt="Lulu Femme"
            width={240}
            height={17}
            className="h-auto w-[240px]"
          />
          <p className="max-w-sm text-sm text-ink">
            Grade A pre-owned Lululemon, sold wholesale in exact, filmed bundles for resellers.
          </p>
          <div className="grid gap-4 text-sm sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2">
            {site.addresses.map((a) => (
              <address key={a.label} className="text-ink not-italic">
                <span className="block font-semibold text-plum">{a.label}</span>
                {a.lines.map((l) => (
                  <span key={l} className="block">
                    {l}
                  </span>
                ))}
              </address>
            ))}
          </div>
          <div className="flex flex-col gap-1 text-sm">
            <TrackedLink
              event="click_email"
              href={`mailto:${site.email}`}
              className="inline-flex min-h-11 items-center gap-2 text-ink hover:text-pink-ink"
            >
              <MailIcon className="h-5 w-5" /> {site.email}
            </TrackedLink>
            <TrackedLink
              event="click_instagram"
              href={site.instagramUrl}
              external
              className="inline-flex min-h-11 items-center gap-2 text-ink hover:text-pink-ink"
            >
              <InstagramIcon className="h-5 w-5" /> @{site.instagramHandle}
              <span className="sr-only"> on Instagram (opens in a new tab)</span>
            </TrackedLink>
          </div>
        </div>
        <nav aria-label="Footer">
          <h2 className="mb-3 text-sm font-bold tracking-wider text-plum uppercase">Explore</h2>
          <ul className="grid grid-cols-2 gap-x-6 sm:grid-cols-3">
            {footerNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="inline-flex min-h-11 items-center text-sm text-ink hover:text-pink-ink hover:underline"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="border-t border-line">
        <div className="container-site flex flex-col gap-2 py-6 text-xs text-muted md:flex-row md:justify-between">
          <p className="max-w-3xl">{site.disclaimer}</p>
          <p className="shrink-0">© {new Date().getFullYear()} Lulu Femme</p>
        </div>
      </div>
    </footer>
  );
}
