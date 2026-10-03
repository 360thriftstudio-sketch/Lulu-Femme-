"use client";
import { useId, useState, type ReactNode } from "react";
import { cn } from "@/lib/cn";

export interface AccordionItem {
  title: string;
  content: ReactNode;
}

/** Accessible accordion: real buttons with aria-expanded / aria-controls. */
export function Accordion({
  items,
  className,
  headingLevel = 3,
}: {
  items: AccordionItem[];
  className?: string;
  headingLevel?: 2 | 3 | 4;
}) {
  const baseId = useId();
  const [open, setOpen] = useState<number | null>(null);
  const H = `h${headingLevel}` as "h2" | "h3" | "h4";
  return (
    <div className={cn("divide-y divide-line rounded-2xl border border-line bg-card", className)}>
      {items.map((item, idx) => {
        const isOpen = open === idx;
        const btnId = `${baseId}-btn-${idx}`;
        const panelId = `${baseId}-panel-${idx}`;
        return (
          <div key={item.title}>
            <H className="m-0">
              <button
                id={btnId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : idx)}
                className="flex min-h-14 w-full items-center justify-between gap-4 px-5 py-3 text-left text-base font-semibold text-ink hover:text-pink-ink"
              >
                {item.title}
                <svg
                  aria-hidden="true"
                  viewBox="0 0 16 16"
                  className={cn(
                    "h-4 w-4 shrink-0 text-pink-ink transition-transform",
                    isOpen && "rotate-45",
                  )}
                  fill="none"
                >
                  <path
                    d="M8 2v12M2 8h12"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </H>
            <div
              id={panelId}
              role="region"
              aria-labelledby={btnId}
              hidden={!isOpen}
              className="prose-lf px-5 pb-5 text-ink"
            >
              {item.content}
            </div>
          </div>
        );
      })}
    </div>
  );
}
