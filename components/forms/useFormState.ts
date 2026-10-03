"use client";
import { useCallback, useState } from "react";

export type Errors<T> = Partial<Record<keyof T, string>>;

/** Small controlled-form helper with inline validation. */
export function useForm<T extends Record<string, unknown>>(
  initial: T,
  validate: (v: T) => Errors<T>,
) {
  const [values, setValues] = useState<T>(initial);
  const [errors, setErrors] = useState<Errors<T>>({});
  const [touched, setTouched] = useState<Partial<Record<keyof T, boolean>>>({});

  const set = useCallback(
    <K extends keyof T>(key: K, value: T[K]) => {
      setValues((prev) => {
        const next = { ...prev, [key]: value };
        if (touched[key]) setErrors(validate(next));
        return next;
      });
    },
    [touched, validate],
  );

  const blur = useCallback(
    (key: keyof T) => {
      setTouched((t) => ({ ...t, [key]: true }));
      setErrors(validate(values));
    },
    [validate, values],
  );

  /** Validates everything; focuses the first invalid field. Returns true if valid. */
  const check = useCallback(() => {
    const e = validate(values);
    setErrors(e);
    setTouched(
      Object.fromEntries(Object.keys(values).map((k) => [k, true])) as Partial<
        Record<keyof T, boolean>
      >,
    );
    const first = Object.keys(e)[0];
    if (first) document.getElementById(first)?.focus();
    return !first;
  }, [validate, values]);

  const shown = (key: keyof T) => (touched[key] ? errors[key] : undefined);

  return { values, setValues, set, blur, check, errors, shown };
}
