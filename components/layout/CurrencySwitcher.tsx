"use client";
import { useId } from "react";
import { currencies, useCurrency, type Currency } from "@/components/providers/Providers";

export function CurrencySwitcher({ className }: { className?: string }) {
  const id = useId();
  const { currency, setCurrency } = useCurrency();
  return (
    <div className={className}>
      <label htmlFor={id} className="sr-only">
        Currency
      </label>
      <select
        id={id}
        value={currency}
        onChange={(e) => setCurrency(e.target.value as Currency)}
        className="min-h-11 cursor-pointer rounded-full border border-line-strong bg-card px-3 text-sm font-semibold text-ink"
      >
        {currencies.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>
    </div>
  );
}
