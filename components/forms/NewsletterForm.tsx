"use client";
import { useId, useState, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { track } from "@/lib/analytics";
import { emailPattern, submitToFormspree } from "@/lib/formspree";

export function NewsletterForm() {
  const id = useId();
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [state, setState] = useState<"idle" | "sending" | "done">("idle");

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!emailPattern.test(email.trim())) {
      setError("Enter an email address like name@example.com.");
      document.getElementById(id)?.focus();
      return;
    }
    setError(null);
    setState("sending");
    const res = await submitToFormspree({
      _subject: "Drop alert sign-up",
      form: "drop-alerts",
      email,
    });
    if (res.ok) {
      setState("done");
      track("newsletter_signup");
    } else {
      setState("idle");
      setError(res.error);
    }
  };

  if (state === "done") {
    return (
      <p role="status" className="text-lg font-semibold text-plum">
        You&apos;re on the list. We&apos;ll email you when new bundles drop.
      </p>
    );
  }

  return (
    <form noValidate onSubmit={onSubmit} className="flex w-full max-w-xl flex-col gap-2">
      <label htmlFor={id} className="text-sm font-semibold text-plum">
        Email address
      </label>
      <div className="flex flex-col gap-3 sm:flex-row">
        <input
          id={id}
          type="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          aria-invalid={error ? true : undefined}
          aria-describedby={`${id}-consent${error ? ` ${id}-error` : ""}`}
          className="min-h-11 flex-1 rounded-full border border-line-strong bg-card px-5 text-base text-ink"
        />
        <Button type="submit" disabled={state === "sending"}>
          {state === "sending" ? "Signing up…" : "Get drop alerts"}
        </Button>
      </div>
      {error && (
        <p id={`${id}-error`} role="alert" className="text-sm font-medium text-danger">
          {error}
        </p>
      )}
      <p id={`${id}-consent`} className="text-xs text-muted">
        By signing up you agree to receive emails about new bundle drops from Lulu Femme. You can
        unsubscribe at any time. See our privacy policy.
      </p>
    </form>
  );
}
