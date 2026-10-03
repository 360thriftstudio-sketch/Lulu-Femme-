import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { bundleTags, type Bundle } from "@/data/bundles";
import { cn } from "@/lib/cn";
import { AddToQuoteButton, SaveButton } from "./BundleActions";

export function BundleCard({
  bundle,
  priority,
  headingLevel = 3,
}: {
  bundle: Bundle;
  priority?: boolean;
  headingLevel?: 2 | 3;
}) {
  const H = headingLevel === 2 ? "h2" : "h3";
  const sold = bundle.status === "sold";
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-card shadow-soft">
      <div className="relative aspect-[1173/1341] overflow-hidden bg-white">
        <Image
          src={bundle.image}
          alt={`${bundle.name} bundle ${bundle.code}: flat lay of ${bundle.pieces} pre-owned Lululemon pieces`}
          fill
          priority={priority}
          sizes="(min-width: 1280px) 400px, (min-width: 768px) 50vw, 100vw"
          className={cn(
            "object-contain transition-transform duration-500 group-hover:scale-[1.03]",
            sold && "opacity-60 grayscale",
          )}
        />
        {bundle.status !== "available" && (
          <div className="absolute bottom-3 left-3">
            <Badge tone="plum" className="uppercase">
              {bundle.status === "sold" ? "Sold" : "Reserved"}
            </Badge>
          </div>
        )}
        <div className="absolute right-2 bottom-2">
          <SaveButton bundle={bundle} compact />
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex flex-wrap items-center gap-2">
          <Badge tone="pink" display>
            {bundle.code}
          </Badge>
          <Badge tone="dark">{bundle.pieces} pcs</Badge>
        </div>
        <H className="text-lg leading-tight font-bold text-plum">
          {bundle.name} <span className="font-semibold text-muted">· {bundle.type}</span>
        </H>
        <ul className="flex flex-wrap gap-1.5" aria-label="Tags">
          {bundleTags(bundle).map((t) => (
            <li key={t}>
              <Badge tone="blush">{t}</Badge>
            </li>
          ))}
          <li>
            <Badge tone="blush">Premium</Badge>
          </li>
        </ul>
        <p className="text-sm text-ink">{bundle.highlight}</p>
        <p className="text-sm font-semibold text-plum">Price on request</p>
        <div className="mt-auto flex flex-wrap items-center gap-2 pt-1">
          <AddToQuoteButton bundle={bundle} size="sm" />
          <Link
            href={`/bundles/${bundle.slug}`}
            className="inline-flex min-h-11 items-center px-2 text-sm font-semibold text-pink-ink underline underline-offset-4 hover:text-plum"
          >
            Details<span className="sr-only"> for {bundle.code}</span>
          </Link>
        </div>
      </div>
    </article>
  );
}
