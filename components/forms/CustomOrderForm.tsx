"use client";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { currencySymbol, useCurrency } from "@/components/providers/Providers";
import { Button, Checkbox, Input, Textarea } from "@/components/ui";
import { track } from "@/lib/analytics";
import { emailPattern, submitToFormspree } from "@/lib/formspree";
import { useForm, type Errors } from "./useFormState";

const categories = [
  "Align leggings",
  "Mix leggings",
  "Flares",
  "Joggers",
  "Capris",
  "Shorts",
  "Tops & tanks",
  "Bras",
  "Define / other jackets",
  "Sweatshirts & hoodies",
];

type Values = {
  name: string;
  email: string;
  budget: string;
  categories: string[];
  sizes: string;
  quantity: string;
  country: string;
  message: string;
};

function validate(v: Values): Errors<Values> {
  const e: Errors<Values> = {};
  if (!v.name.trim()) e.name = "Please enter your name.";
  if (!v.email.trim()) e.email = "Please enter your email address.";
  else if (!emailPattern.test(v.email.trim()))
    e.email = "Enter an email address like name@example.com.";
  if (!v.budget.trim()) e.budget = "Please give a rough budget.";
  else if (!/^\d[\d,.]*$/.test(v.budget.trim())) e.budget = "Enter a number, e.g. 1500.";
  if (v.categories.length === 0) e.categories = "Choose at least one category.";
  if (!v.quantity.trim()) e.quantity = "How many pieces would you like?";
  else if (!/^\d+$/.test(v.quantity.trim()) || Number(v.quantity) < 10)
    e.quantity = "Enter a whole number of 10 pieces or more.";
  if (!v.country.trim()) e.country = "Please tell us which country to ship to.";
  return e;
}

export function CustomOrderForm() {
  const router = useRouter();
  const { currency } = useCurrency();
  const form = useForm<Values>(
    {
      name: "",
      email: "",
      budget: "",
      categories: [],
      sizes: "",
      quantity: "",
      country: "",
      message: "",
    },
    validate,
  );
  const { values, set, blur, shown } = form;
  const [sending, setSending] = useState(false);
  const [failure, setFailure] = useState<string | null>(null);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setFailure(null);
    if (!form.check()) return;
    setSending(true);
    const result = await submitToFormspree({
      _subject: `Custom order request – ${values.quantity} pcs`,
      form: "custom-order",
      ...values,
      budget: `${values.budget} ${currency}`,
      categories: values.categories.join(", "),
    });
    setSending(false);
    if (result.ok) {
      track("submit_custom_order", { quantity: Number(values.quantity), currency });
      router.push("/custom-orders/sent");
    } else setFailure(result.error);
  };

  const catError = shown("categories");

  return (
    <form noValidate onSubmit={onSubmit} className="grid gap-5 md:grid-cols-2">
      <p className="text-sm text-muted md:col-span-2">Fields marked * are required.</p>
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
        id="budget"
        label={`Budget (${currencySymbol[currency]} ${currency})`}
        required
        inputMode="decimal"
        value={values.budget}
        hint="Change currency at the top of the page."
        onChange={(e) => set("budget", e.target.value)}
        onBlur={() => blur("budget")}
        error={shown("budget")}
      />
      <Input
        id="quantity"
        label="Quantity (pieces)"
        required
        inputMode="numeric"
        value={values.quantity}
        hint="Minimum 10 pieces."
        onChange={(e) => set("quantity", e.target.value)}
        onBlur={() => blur("quantity")}
        error={shown("quantity")}
      />
      <fieldset
        id="categories"
        tabIndex={-1}
        aria-describedby={catError ? "categories-error" : undefined}
        aria-invalid={catError ? true : undefined}
        className="md:col-span-2"
      >
        <legend className="mb-1 text-sm font-semibold text-plum">
          Categories{" "}
          <span className="text-pink-ink" aria-hidden="true">
            *
          </span>
        </legend>
        <div className="grid gap-x-6 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((c, idx) => (
            <Checkbox
              key={c}
              id={`cat-${idx}`}
              label={c}
              checked={values.categories.includes(c)}
              onChange={(e) =>
                set(
                  "categories",
                  e.target.checked
                    ? [...values.categories, c]
                    : values.categories.filter((x) => x !== c),
                )
              }
            />
          ))}
        </div>
        {catError && (
          <p id="categories-error" className="mt-1 text-sm font-medium text-danger">
            {catError}
          </p>
        )}
      </fieldset>
      <Input
        id="sizes"
        label="Sizes"
        value={values.sizes}
        hint="e.g. mostly 4–8, a few 10s"
        onChange={(e) => set("sizes", e.target.value)}
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
      <div className="md:col-span-2">
        <Textarea
          id="message"
          label="Message"
          value={values.message}
          hint="Colours, styles, deadlines or anything else."
          onChange={(e) => set("message", e.target.value)}
        />
      </div>
      {failure && (
        <div
          role="alert"
          className="rounded-xl border border-danger bg-card p-4 text-sm text-danger md:col-span-2"
        >
          <strong>Your request wasn&apos;t sent.</strong> {failure} Your answers are still here, so
          you can try again.
        </div>
      )}
      <div className="md:col-span-2">
        <Button type="submit" disabled={sending} className="w-full md:w-auto">
          {sending ? "Sending…" : "Send custom order request"}
        </Button>
      </div>
    </form>
  );
}
