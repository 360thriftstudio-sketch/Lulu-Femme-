"use client";
import { useQuote, useSaved } from "@/components/providers/Providers";
import { buttonClasses } from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";
import { HeartIcon, BasketIcon, CheckIcon } from "@/components/layout/Icons";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/cn";
import type { Bundle } from "@/data/bundles";

/** Heart toggle. `compact` = round icon button for cards. */
export function SaveButton({
  bundle,
  compact,
}: {
  bundle: Pick<Bundle, "slug" | "code">;
  compact?: boolean;
}) {
  const saved = useSaved();
  const toast = useToast();
  const isSaved = saved.has(bundle.slug);
  const onClick = () => {
    const added = saved.toggle(bundle.slug);
    if (added) track("save_bundle", { bundle_code: bundle.code });
    toast(added ? `${bundle.code} saved` : `${bundle.code} removed from saved`);
  };
  if (compact) {
    return (
      <button
        type="button"
        onClick={onClick}
        aria-pressed={isSaved}
        aria-label={`Save bundle ${bundle.code}`}
        className={cn(
          "inline-flex h-11 w-11 items-center justify-center rounded-full bg-card/95 shadow-soft transition-colors hover:text-pink-ink",
          isSaved ? "text-pink-ink" : "text-ink",
        )}
      >
        <HeartIcon filled={isSaved} className="h-6 w-6" />
      </button>
    );
  }
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={isSaved}
      className={buttonClasses("secondary")}
    >
      <HeartIcon filled={isSaved} className="h-5 w-5" />
      {isSaved ? "Saved" : "Save bundle"}
    </button>
  );
}

export function AddToQuoteButton({
  bundle,
  size = "md",
  className,
}: {
  bundle: Pick<Bundle, "slug" | "code" | "status">;
  size?: "md" | "sm";
  className?: string;
}) {
  const quote = useQuote();
  const toast = useToast();
  const inQuote = quote.has(bundle.slug);
  const sold = bundle.status === "sold";
  return (
    <button
      type="button"
      disabled={sold}
      aria-label={
        sold
          ? `${bundle.code} is sold`
          : inQuote
            ? `${bundle.code} is in your quote — remove`
            : `Add ${bundle.code} to quote`
      }
      onClick={() => {
        if (inQuote) {
          quote.remove(bundle.slug);
          toast(`${bundle.code} removed from quote`);
        } else {
          quote.add(bundle.slug);
          track("add_to_quote", { bundle_code: bundle.code });
          toast(`${bundle.code} added to your quote`);
        }
      }}
      className={buttonClasses(inQuote ? "secondary" : "primary", size, className)}
    >
      {inQuote ? <CheckIcon className="h-5 w-5" /> : <BasketIcon className="h-5 w-5" />}
      {sold ? "Sold" : inQuote ? "In quote" : "Add to quote"}
    </button>
  );
}
