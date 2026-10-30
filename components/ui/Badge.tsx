import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type Tone = "pink" | "plum" | "blush" | "outline" | "dark" | "gold" | "sage";

const tones: Record<Tone, string> = {
  pink: "bg-pink text-on-pink",
  plum: "bg-plum text-offwhite",
  blush: "bg-blush text-plum",
  outline: "border border-line-strong text-ink bg-card",
  dark: "bg-ink text-offwhite",
  gold: "bg-gold text-on-gold",
  sage: "bg-sage text-on-sage",
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
  /** Bundle-code style: bold, tracked, tabular figures. */
  display?: boolean;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-1 text-xs leading-none font-semibold",
        display && "font-bold tracking-[0.06em] tabular-nums",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
