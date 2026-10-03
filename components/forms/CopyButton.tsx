"use client";
import { useState } from "react";
import { cn } from "@/lib/cn";

export function CopyButton({ value, label }: { value: string; label: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <>
      <button
        type="button"
        onClick={async () => {
          try {
            await navigator.clipboard.writeText(value);
            setCopied(true);
            window.setTimeout(() => setCopied(false), 2000);
          } catch {
            /* clipboard blocked */
          }
        }}
        aria-label={`Copy ${label}`}
        className={cn(
          "inline-flex min-h-11 items-center rounded-full border-2 px-4 text-sm font-semibold",
          copied ? "border-success text-success" : "border-pink text-pink-ink hover:bg-blush",
        )}
      >
        {copied ? "Copied" : "Copy"}
      </button>
      <span role="status" className="sr-only">
        {copied ? `${label} copied to clipboard` : ""}
      </span>
    </>
  );
}
