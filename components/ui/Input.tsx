import type { InputHTMLAttributes } from "react";
import { cn } from "@/lib/cn";
import { Field, controlClasses, describedBy } from "./Field";

export function Input({
  id,
  label,
  hint,
  error,
  required,
  className,
  ...props
}: InputHTMLAttributes<HTMLInputElement> & {
  id: string;
  label: string;
  hint?: string;
  error?: string;
}) {
  return (
    <Field id={id} label={label} hint={hint} error={error} required={required}>
      <input
        id={id}
        name={id}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(id, hint, error)}
        className={cn(controlClasses, error ? "border-danger" : "border-line-strong", className)}
        {...props}
      />
    </Field>
  );
}
