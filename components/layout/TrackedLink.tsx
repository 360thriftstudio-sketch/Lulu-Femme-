"use client";
import type { AnchorHTMLAttributes } from "react";
import { track, type AnalyticsEvent } from "@/lib/analytics";

/** Plain <a> that fires a GA event on click (used for Instagram / email links). */
export function TrackedLink({
  event,
  params,
  external,
  onClick,
  ...props
}: AnchorHTMLAttributes<HTMLAnchorElement> & {
  event: AnalyticsEvent;
  params?: Record<string, unknown>;
  external?: boolean;
}) {
  return (
    <a
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      onClick={(e) => {
        track(event, params);
        onClick?.(e);
      }}
      {...props}
    />
  );
}
