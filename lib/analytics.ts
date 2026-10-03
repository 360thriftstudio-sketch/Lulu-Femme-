export type AnalyticsEvent =
  | "view_bundle"
  | "save_bundle"
  | "add_to_quote"
  | "start_quote"
  | "submit_quote"
  | "submit_custom_order"
  | "click_instagram"
  | "click_email"
  | "newsletter_signup";

type Gtag = (...args: unknown[]) => void;

/** Sends a GA4 event. Does nothing until the visitor has accepted cookies and GA has loaded. */
export function track(event: AnalyticsEvent, params: Record<string, unknown> = {}): void {
  if (typeof window === "undefined") return;
  const gtag = (window as unknown as { gtag?: Gtag }).gtag;
  if (typeof gtag === "function") gtag("event", event, params);
}
