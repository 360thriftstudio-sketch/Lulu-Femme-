import type { InputHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

export function Checkbox({
  id,
  label,
  className,
  ...props
}: Omit<InputHTMLAttributes<HTMLInputElement>, "type"> & { id: string; label: ReactNode }) {
  return (
    <label
      htmlFor={id}
      className={cn(
        "flex min-h-11 cursor-pointer items-center gap-3 rounded-xl py-1.5 text-base text-ink",
        className,
      )}
    >
      <input
        id={id}
        type="checkbox"
        className="h-5 w-5 shrink-0 cursor-pointer rounded accent-[var(--pink)]"
        {...props}
      />
      <span>{label}</span>
    </label>
  );
}
