import type { TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/cn";
import { Field, controlClasses, describedBy } from "./Field";

export function Textarea({
  id,
  label,
  hint,
  error,
  required,
  className,
  ...props
}: TextareaHTMLAttributes<HTMLTextAreaElement> & {
  id: string;
  label: string;
  hint?: string;
  error?: string;
}) {
  return (
    <Field id={id} label={label} hint={hint} error={error} required={required}>
      <textarea
        id={id}
        name={id}
        rows={5}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(id, hint, error)}
        className={cn(controlClasses, error ? "border-danger" : "border-line-strong", className)}
        {...props}
      />
    </Field>
  );
}
