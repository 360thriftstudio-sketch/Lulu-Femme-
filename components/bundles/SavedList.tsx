"use client";
import Link from "next/link";
import { useQuote, useSaved } from "@/components/providers/Providers";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";
import { bundles } from "@/data/bundles";
import { track } from "@/lib/analytics";
import { BundleCard } from "./BundleCard";

export function SavedList() {
  const saved = useSaved();
  const quote = useQuote();
  const toast = useToast();
  const list = bundles.filter((b) => saved.items.includes(b.slug));
  const addable = list.filter((b) => b.status !== "sold");

  if (!saved.ready) return <p className="text-muted">Loading your saved bundles…</p>;

  if (list.length === 0) {
    return (
      <div className="flex flex-col items-start gap-4 rounded-2xl border border-dashed border-line-strong bg-card p-8">
        <h2 className="display text-3xl text-plum">Nothing saved yet</h2>
        <p className="text-ink">Tap the heart on any bundle to save it here for later.</p>
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
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <p className="text-ink">
          {list.length} saved {list.length === 1 ? "bundle" : "bundles"} ·{" "}
          {list.reduce((s, b) => s + b.pieces, 0)} pieces
        </p>
        <Button
          disabled={addable.length === 0}
          onClick={() => {
            quote.addMany(addable.map((b) => b.slug));
            addable.forEach((b) =>
              track("add_to_quote", { bundle_code: b.code, source: "saved_all" }),
            );
            toast(
              `${addable.length} ${addable.length === 1 ? "bundle" : "bundles"} added to your quote`,
            );
          }}
        >
          Add all to quote
        </Button>
      </div>
      <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((b) => (
          <li key={b.slug}>
            <BundleCard bundle={b} headingLevel={2} />
          </li>
        ))}
      </ul>
    </div>
  );
}
