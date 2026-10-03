"use client";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useId, useMemo, useState } from "react";
import { Button, Chip, Modal } from "@/components/ui";
import { FilterIcon, SearchIcon } from "@/components/layout/Icons";
import {
  bundles,
  bundleTypes,
  pieceSizes,
  type Bundle,
  type BundleStatus,
  type BundleType,
} from "@/data/bundles";
import { BundleCard } from "./BundleCard";

type Sort = "newest" | "pieces-desc" | "pieces-asc";
const statuses: BundleStatus[] = ["available", "reserved", "sold"];
const statusLabel: Record<BundleStatus, string> = {
  available: "Available",
  reserved: "Reserved",
  sold: "Sold",
};

function list(param: string | null): string[] {
  return param ? param.split(",").filter(Boolean) : [];
}

function matches(b: Bundle, q: string): boolean {
  if (!q) return true;
  const needle = q.toLowerCase().replace(/[#\s]/g, "");
  const hay = [
    b.code,
    b.code.replace("-", ""),
    b.name,
    b.type,
    ...b.groups.flatMap((g) => g.items.map((i) => i.name)),
  ]
    .join("|")
    .toLowerCase()
    .replace(/\s/g, "");
  return hay.includes(needle);
}

export function BundleBrowser() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const [sheetOpen, setSheetOpen] = useState(false);
  const searchId = useId();
  const sortId = useId();

  const types = list(params.get("type")) as BundleType[];
  const pcs = list(params.get("pcs")).map(Number);
  const jacket = params.get("jacket"); // "yes" | "no" | null
  const status = list(params.get("status")) as BundleStatus[];
  const q = params.get("q") ?? "";
  const sort = (params.get("sort") as Sort) ?? "newest";

  const update = (key: string, value: string | null) => {
    const next = new URLSearchParams(params.toString());
    if (value === null || value === "") next.delete(key);
    else next.set(key, value);
    const qs = next.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  };
  const toggleIn = (key: string, current: (string | number)[], v: string | number) => {
    const set = current.map(String);
    const s = String(v);
    update(key, (set.includes(s) ? set.filter((x) => x !== s) : [...set, s]).join(","));
  };

  const results = useMemo(() => {
    const r = bundles.filter(
      (b) =>
        (types.length === 0 || types.includes(b.type)) &&
        (pcs.length === 0 || pcs.includes(b.pieces)) &&
        (jacket === null || (jacket === "yes" ? b.hasJacket : !b.hasJacket)) &&
        (status.length === 0 || status.includes(b.status)) &&
        matches(b, q),
    );
    if (sort === "pieces-desc") return [...r].sort((a, b) => b.pieces - a.pieces);
    if (sort === "pieces-asc") return [...r].sort((a, b) => a.pieces - b.pieces);
    return [...r].reverse(); // newest = highest code first
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  const activeCount = types.length + pcs.length + (jacket ? 1 : 0) + status.length;
  const clearAll = () => router.replace(pathname, { scroll: false });

  const filters = (
    <div className="flex flex-col gap-6">
      <fieldset>
        <legend className="mb-2 text-sm font-bold text-plum">Bundle type</legend>
        <div className="flex flex-wrap gap-2">
          {bundleTypes.map((t) => (
            <Chip key={t} selected={types.includes(t)} onClick={() => toggleIn("type", types, t)}>
              {t}
            </Chip>
          ))}
        </div>
      </fieldset>
      <fieldset>
        <legend className="mb-2 text-sm font-bold text-plum">Bundle size</legend>
        <div className="flex flex-wrap gap-2">
          {pieceSizes.map((p) => (
            <Chip key={p} selected={pcs.includes(p)} onClick={() => toggleIn("pcs", pcs, p)}>
              {p} pcs
            </Chip>
          ))}
        </div>
      </fieldset>
      <fieldset>
        <legend className="mb-2 text-sm font-bold text-plum">Includes a jacket</legend>
        <div className="flex flex-wrap gap-2">
          <Chip
            selected={jacket === "yes"}
            onClick={() => update("jacket", jacket === "yes" ? null : "yes")}
          >
            Yes
          </Chip>
          <Chip
            selected={jacket === "no"}
            onClick={() => update("jacket", jacket === "no" ? null : "no")}
          >
            No
          </Chip>
        </div>
      </fieldset>
      <fieldset>
        <legend className="mb-2 text-sm font-bold text-plum">Status</legend>
        <div className="flex flex-wrap gap-2">
          {statuses.map((s) => (
            <Chip
              key={s}
              selected={status.includes(s)}
              onClick={() => toggleIn("status", status, s)}
            >
              {statusLabel[s]}
            </Chip>
          ))}
        </div>
      </fieldset>
      {activeCount > 0 && (
        <Button variant="ghost" size="sm" onClick={clearAll} className="self-start underline">
          Clear all filters
        </Button>
      )}
    </div>
  );

  return (
    <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
      <aside aria-label="Filters" className="hidden lg:block">
        <div className="sticky top-24 rounded-2xl border border-line bg-card p-5">
          <h2 className="mb-4 text-base font-bold text-ink">Filter bundles</h2>
          {filters}
        </div>
      </aside>

      <div className="flex min-w-0 flex-col gap-5">
        <div className="flex flex-col gap-3 md:flex-row md:items-end">
          <div className="flex flex-1 flex-col gap-1.5">
            <label htmlFor={searchId} className="text-sm font-semibold text-plum">
              Search bundles
            </label>
            <div className="relative">
              <SearchIcon className="pointer-events-none absolute top-1/2 left-3.5 h-5 w-5 -translate-y-1/2 text-muted" />
              <input
                id={searchId}
                type="search"
                defaultValue={q}
                placeholder='Try "define", "flare" or "LF-06"'
                onChange={(e) => update("q", e.target.value.trim())}
                className="min-h-11 w-full rounded-xl border border-line-strong bg-card py-2.5 pr-3.5 pl-11 text-base text-ink placeholder:text-muted"
              />
            </div>
          </div>
          <div className="flex items-end gap-3">
            <div className="flex flex-1 flex-col gap-1.5">
              <label htmlFor={sortId} className="text-sm font-semibold text-plum">
                Sort by
              </label>
              <select
                id={sortId}
                value={sort}
                onChange={(e) =>
                  update("sort", e.target.value === "newest" ? null : e.target.value)
                }
                className="min-h-11 rounded-xl border border-line-strong bg-card px-3.5 text-base text-ink"
              >
                <option value="newest">Newest</option>
                <option value="pieces-desc">Pieces: high to low</option>
                <option value="pieces-asc">Pieces: low to high</option>
              </select>
            </div>
            <Button
              variant="secondary"
              onClick={() => setSheetOpen(true)}
              className="lg:hidden"
              aria-haspopup="dialog"
            >
              <FilterIcon className="h-5 w-5" />
              Filters{activeCount > 0 && ` (${activeCount})`}
            </Button>
          </div>
        </div>

        <p role="status" className="text-sm text-muted">
          Showing {results.length} of {bundles.length} bundles
        </p>

        {results.length === 0 ? (
          <div className="flex flex-col items-center gap-4 rounded-2xl border border-dashed border-line-strong bg-card px-6 py-14 text-center">
            <h2 className="display text-3xl text-plum">No bundles match</h2>
            <p className="max-w-md text-ink">
              Try removing a filter or searching for something else. Can&apos;t find what you need?
              We can build a custom bundle for you.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Button onClick={clearAll}>Clear filters</Button>
              <Link
                href="/custom-orders"
                className="inline-flex min-h-11 items-center font-semibold text-pink-ink underline"
              >
                Request a custom bundle
              </Link>
            </div>
          </div>
        ) : (
          <ul className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {results.map((b, idx) => (
              <li key={b.slug}>
                <BundleCard bundle={b} priority={idx < 2} headingLevel={2} />
              </li>
            ))}
          </ul>
        )}
      </div>

      <Modal
        open={sheetOpen}
        onClose={() => setSheetOpen(false)}
        title="Filter bundles"
        variant="sheet"
      >
        {filters}
        <Button className="mt-6 w-full" onClick={() => setSheetOpen(false)}>
          Show {results.length} {results.length === 1 ? "bundle" : "bundles"}
        </Button>
      </Modal>
    </div>
  );
}
