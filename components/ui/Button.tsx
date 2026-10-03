import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "ghost" | "inverse" | "inverseOutline";
type Size = "md" | "sm";

const base =
  "inline-flex min-h-11 min-w-11 items-center justify-center gap-2 rounded-full font-semibold transition-colors duration-150 disabled:cursor-not-allowed disabled:opacity-60";
const variants: Record<Variant, string> = {
  primary: "bg-pink text-on-pink hover:bg-pink-hover",
  secondary: "btn-fill border-2 border-pink bg-transparent text-pink-ink",
  ghost: "bg-transparent text-ink hover:bg-blush",
  /* For dark (plum) backgrounds */
  inverse: "bg-offwhite text-plum hover:bg-blush",
  inverseOutline: "border-2 border-offwhite bg-transparent text-offwhite hover:bg-offwhite/10",
};
const sizes: Record<Size, string> = {
  md: "px-6 py-2.5 text-base",
  sm: "px-4 py-2 text-sm",
};

export function buttonClasses(variant: Variant = "primary", size: Size = "md", extra?: string) {
  return cn(base, variants[variant], sizes[size], extra);
}

type CommonProps = { variant?: Variant; size?: Size; children: ReactNode; className?: string };

export function Button({
  variant = "primary",
  size = "md",
  className,
  type = "button",
  ...props
}: CommonProps & ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button type={type} className={buttonClasses(variant, size, className)} {...props} />;
}

export function ButtonLink({
  variant = "primary",
  size = "md",
  className,
  href,
  external,
  ...props
}: CommonProps & AnchorHTMLAttributes<HTMLAnchorElement> & { href: string; external?: boolean }) {
  if (external || href.startsWith("http") || href.startsWith("mailto:")) {
    return (
      <a
        href={href}
        className={buttonClasses(variant, size, className)}
        {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        {...props}
      />
    );
  }
  return <Link href={href} className={buttonClasses(variant, size, className)} {...props} />;
}
