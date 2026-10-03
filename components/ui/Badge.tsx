import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type Tone = "pink" | "plum" | "blush" | "outline" | "dark";

const tones: Record<Tone, string> = {
  pink: "bg-pink text-on-pink",
  plum: "bg-plum text-offwhite",
  blush: "bg-blush text-plum",
  outline: "border border-line-strong text-ink bg-card",
  dark: "bg-ink text-offwhite",
};

export function Badge({
  children,
  tone = "blush",
  className,
  display,
}: {
  children: ReactNode;
  tone?: Tone;
  className?: string;
  /** Use the Anton display font (for bundle codes). */
  display?: boolean;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-1 text-xs leading-none font-semibold",
        display && "display text-[0.8rem] font-normal tracking-wide",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
