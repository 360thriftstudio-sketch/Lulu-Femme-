"use client";
import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

/** Toggle chip used for filters. Announces its state with aria-pressed. */
export function Chip({
  selected,
  className,
  children,
  ...props
}: { selected: boolean } & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      className={cn(
        "inline-flex min-h-11 items-center gap-1.5 rounded-full border px-4 text-sm font-medium transition-colors",
        selected
          ? "border-pink bg-pink text-on-pink"
          : "border-line-strong bg-card text-ink hover:border-pink",
        className,
      )}
      {...props}
    >
      {selected && (
        <svg aria-hidden="true" viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none">
          <path d="M3 8.5l3 3 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      )}
      {children}
    </button>
  );
}
