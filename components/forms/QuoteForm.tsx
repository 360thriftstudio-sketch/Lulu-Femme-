"use client";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { currencies, useCurrency, useQuote, type Currency } from "@/components/providers/Providers";
import { Button, Input, Select, Textarea } from "@/components/ui";
import { bundles } from "@/data/bundles";
import { track } from "@/lib/analytics";
import { emailPattern, submitToFormspree } from "@/lib/formspree";
import { readJSON, writeJSON } from "@/lib/storage";
import { useForm, type Errors } from "./useFormState";

const channels = ["Vinted", "Depop", "eBay", "Shop", "Other"];

type Values = {
  name: string;
  business: string;
  email: string;
  phone: string;
  country: string;
  currency: Currency;
  channel: string;
  message: string;
};

const blank: Values = {
  name: "",
  business: "",
  email: "",
  phone: "",
  country: "",
  currency: "GBP",
  channel: "",
  message: "",
};

function validate(v: Values): Errors<Values> {
  const e: Errors<Values> = {};
  if (!v.name.trim()) e.name = "Please enter your name.";
  if (!v.email.trim()) e.email = "Please enter your email address.";
  else if (!emailPattern.test(v.email.trim()))
    e.email = "Enter an email address like name@example.com.";
  if (v.phone && !/^\+?[\d\s()-]{7,20}$/.test(v.phone.trim()))
    e.phone = "Enter a phone number with country code, e.g. +44 7700 900123.";
  if (!v.country.trim()) e.country = "Please tell us which country to ship to.";
  if (!v.channel) e.channel = "Please choose where you sell.";
  return e;
}

const DRAFT_KEY = "lf-quote-draft";

export function QuoteForm() {
  const router = useRouter();
  const quote = useQuote();
  const { currency } = useCurrency();
  const form = useForm<Values>({ ...blank, currency }, validate);
  const { values, set, blur, shown, setValues } = form;
  const [sending, setSending] = useState(false);
  const [failure, setFailure] = useState<string | null>(null);
  const started = useRef(false);

  // Restore an unsent draft; keep currency in sync with the header switcher.
  useEffect(() => {
    const draft = readJSON<Partial<Values> | null>(DRAFT_KEY, null);
    if (draft) setValues((v) => ({ ...v, ...draft }));
  }, [setValues]);
  useEffect(() => set("currency", currency), [currency]); // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => writeJSON(DRAFT_KEY, values), [values]);

  const selected = bundles.filter((b) => quote.items.includes(b.slug));

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setFailure(null);
    if (!form.check()) return;
    setSending(true);
    const result = await submitToFormspree({
      _subject: `Quote request – ${selected.map((b) => b.code).join(", ") || "no bundles selected"}`,
      form: "quote",
      bundles: selected.map((b) => `${b.code} ${b.name} (${b.pieces} pcs)`).join("; "),
      total_pieces: selected.reduce((s, b) => s + b.pieces, 0),
      ...values,
    });
    setSending(false);
    if (result.ok) {
      track("submit_quote", {
        bundles: selected.map((b) => b.code).join(","),
        currency: values.currency,
      });
      quote.clear();
      writeJSON(DRAFT_KEY, null);
      router.push("/quote/sent");
    } else {
      setFailure(result.error);
    }
  };

  return (
    <form
      noValidate
      onSubmit={onSubmit}
      onFocusCapture={() => {
        if (!started.current) {
          started.current = true;
          track("start_quote", { bundles: quote.items.length });
        }
      }}
      className="grid gap-5 md:grid-cols-2"
      aria-describedby="quote-form-note"
    >
      <p id="quote-form-note" className="text-sm text-muted md:col-span-2">
        Fields marked * are required. We&apos;ll reply within one working day.
      </p>
      <Input
        id="name"
        label="Your name"
        required
        autoComplete="name"
        value={values.name}
        onChange={(e) => set("name", e.target.value)}
        onBlur={() => blur("name")}
        error={shown("name")}
      />
      <Input
        id="business"
        label="Business name"
        autoComplete="organization"
        value={values.business}
        onChange={(e) => set("business", e.target.value)}
        onBlur={() => blur("business")}
      />
      <Input
        id="email"
        label="Email"
        type="email"
        required
        autoComplete="email"
        value={values.email}
        onChange={(e) => set("email", e.target.value)}
        onBlur={() => blur("email")}
        error={shown("email")}
      />
      <Input
        id="phone"
        label="Phone / WhatsApp"
        type="tel"
        autoComplete="tel"
        value={values.phone}
        hint="Only if you'd like us to contact you this way."
        onChange={(e) => set("phone", e.target.value)}
        onBlur={() => blur("phone")}
        error={shown("phone")}
      />
      <Input
        id="country"
        label="Country"
        required
        autoComplete="country-name"
        value={values.country}
        onChange={(e) => set("country", e.target.value)}
        onBlur={() => blur("country")}
        error={shown("country")}
      />
      <Select
        id="currency"
        label="Currency"
        required
        value={values.currency}
        options={currencies.map((c) => ({ value: c, label: c }))}
        onChange={(e) => set("currency", e.target.value as Currency)}
      />
      <Select
        id="channel"
        label="Where do you sell?"
        required
        placeholder="Choose one"
        value={values.channel}
        options={channels.map((c) => ({ value: c, label: c }))}
        onChange={(e) => set("channel", e.target.value)}
        onBlur={() => blur("channel")}
        error={shown("channel")}
      />
      <div className="md:col-span-2">
        <Textarea
          id="message"
          label="Message"
          value={values.message}
          hint="Anything we should know: sizes you prefer, budget, delivery timing."
          onChange={(e) => set("message", e.target.value)}
        />
      </div>
      {failure && (
        <div
          role="alert"
          className="rounded-xl border border-danger bg-card p-4 text-sm text-danger md:col-span-2"
        >
          <strong>Your request wasn&apos;t sent.</strong> {failure} Your details are saved here, so
          you can try again.
        </div>
      )}
      <div className="md:col-span-2">
        <Button type="submit" disabled={sending} className="w-full md:w-auto">
          {sending ? "Sending…" : "Send quote request"}
        </Button>
      </div>
    </form>
  );
}
