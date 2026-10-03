import type { SelectHTMLAttributes } from "react";
import { cn } from "@/lib/cn";
import { Field, controlClasses, describedBy } from "./Field";

export function Select({
  id,
  label,
  hint,
  error,
  required,
  options,
  placeholder,
  className,
  ...props
}: SelectHTMLAttributes<HTMLSelectElement> & {
  id: string;
  label: string;
  hint?: string;
  error?: string;
  placeholder?: string;
  options: { value: string; label: string }[];
}) {
  return (
    <Field id={id} label={label} hint={hint} error={error} required={required}>
      <div className="relative">
        <select
          id={id}
          name={id}
          required={required}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy(id, hint, error)}
          className={cn(
            controlClasses,
            "appearance-none pr-10",
            error ? "border-danger" : "border-line-strong",
            className,
          )}
          {...props}
        >
          {placeholder && <option value="">{placeholder}</option>}
          {options.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
        <svg
          aria-hidden="true"
          viewBox="0 0 16 16"
          className="pointer-events-none absolute top-1/2 right-3.5 h-4 w-4 -translate-y-1/2 text-plum"
          fill="none"
        >
          <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </div>
    </Field>
  );
}
