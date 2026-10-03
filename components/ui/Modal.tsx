"use client";
import { useEffect, useId, useRef, type ReactNode } from "react";
import { cn } from "@/lib/cn";
import { useFocusTrap } from "./useFocusTrap";

/**
 * Accessible modal built on <dialog>. `variant="sheet"` slides up from the bottom
 * (used for mobile filters); `variant="full"` covers the screen (mobile menu).
 */
export function Modal({
  open,
  onClose,
  title,
  children,
  variant = "center",
  hideTitle,
  className,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  variant?: "center" | "sheet" | "full";
  hideTitle?: boolean;
  className?: string;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  useFocusTrap(ref, open);

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (open && !d.open) d.showModal();
    if (!open && d.open) d.close();
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <dialog
      ref={ref}
      aria-labelledby={titleId}
      onCancel={(e) => {
        e.preventDefault();
        onClose();
      }}
      onClick={(e) => {
        if (e.target === ref.current) onClose();
      }}
      className={cn(
        "m-0 max-h-none max-w-none bg-card p-0 text-ink backdrop:bg-black/50",
        variant === "center" &&
          "fixed top-1/2 left-1/2 w-[min(92vw,640px)] -translate-x-1/2 -translate-y-1/2 rounded-2xl",
        variant === "sheet" &&
          "fixed inset-x-0 top-auto bottom-0 max-h-[85vh] w-full rounded-t-3xl",
        variant === "full" && "fixed inset-0 h-dvh w-full bg-offwhite",
        className,
      )}
    >
      {open && (
        <div className={cn("flex h-full flex-col", variant !== "full" && "max-h-[85vh]")}>
          <div className="flex items-center justify-between gap-4 border-b border-line px-5 py-3">
            <h2 id={titleId} className={cn("text-lg font-bold text-plum", hideTitle && "sr-only")}>
              {title}
            </h2>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="ml-auto inline-flex h-11 w-11 items-center justify-center rounded-full text-ink hover:bg-blush"
            >
              <svg aria-hidden="true" viewBox="0 0 24 24" className="h-6 w-6" fill="none">
                <path
                  d="M6 6l12 12M18 6L6 18"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-5">{children}</div>
        </div>
      )}
    </dialog>
  );
}
