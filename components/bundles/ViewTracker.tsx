"use client";
import { useEffect } from "react";
import { track } from "@/lib/analytics";

export function ViewTracker({ code, name }: { code: string; name: string }) {
  useEffect(() => {
    track("view_bundle", { bundle_code: code, bundle_name: name });
  }, [code, name]);
  return null;
}
