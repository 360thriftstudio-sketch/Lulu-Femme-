"use client";
import Image from "next/image";
import Link from "next/link";
import { useQuote } from "@/components/providers/Providers";
import { Badge } from "@/components/ui/Badge";
import { bundles } from "@/data/bundles";

export function QuoteBasket() {
  const quote = useQuote();
  const list = bundles.filter((b) => quote.items.includes(b.slug));
  const pieces = list.reduce((s, b) => s + b.pieces, 0);

  if (!quote.ready) return <p className="text-muted">Loading your quote…</p>;

  if (list.length === 0) {
    return (
      <div className="flex flex-col items-start gap-3 rounded-2xl border border-dashed border-line-strong bg-card p-6">
        <h2 className="text-xl font-bold text-plum">Your quote basket is empty</h2>
        <p className="text-ink">
          Add bundles from the shop, or send the form below with a general enquiry.
        </p>
        <Link
          href="/bundles"
          className="inline-flex min-h-11 items-center font-semibold text-pink-ink underline"
        >
          Browse bundles
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-xl font-bold text-plum">Your bundles ({list.length})</h2>
      <ul className="divide-y divide-line rounded-2xl border border-line bg-card">
        {list.map((b) => (
          <li key={b.slug} className="flex items-center gap-4 p-4">
            <div className="relative h-20 w-[70px] shrink-0 overflow-hidden rounded-lg bg-blush">
              <Image src={b.image} alt="" fill sizes="70px" className="object-cover" />
            </div>
            <div className="min-w-0 flex-1">
              <Badge tone="pink" display>
                {b.code}
              </Badge>
              <p className="mt-1 font-semibold text-ink">
                <Link href={`/bundles/${b.slug}`} className="hover:text-pink-ink hover:underline">
                  {b.name}
                </Link>
              </p>
              <p className="text-sm text-muted">{b.pieces} pcs · Price on request</p>
            </div>
            <button
              type="button"
              onClick={() => quote.remove(b.slug)}
              className="inline-flex min-h-11 items-center rounded-full px-3 text-sm font-semibold text-pink-ink underline hover:bg-blush"
            >
              Remove<span className="sr-only"> {b.code}</span>
            </button>
          </li>
        ))}
        <li className="flex items-center justify-between p-4 font-bold text-plum">
          <span>Total pieces</span>
          <span className="tabular-nums">{pieces} pcs</span>
        </li>
      </ul>
      <p
        className={
          list.length >= 2
            ? "rounded-xl bg-pink p-4 text-sm font-semibold text-on-pink"
            : "rounded-xl bg-blush p-4 text-sm text-ink"
        }
      >
        {list.length >= 2
          ? "Nice – ordering 2 or more bundles qualifies you for a combined deal. We'll include it in your quote."
          : "Tip: order 2 or more bundles to qualify for a combined deal."}
      </p>
    </div>
  );
}
