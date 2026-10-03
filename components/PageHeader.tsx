import type { ReactNode } from "react";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";

export function PageHeader({
  eyebrow,
  title,
  intro,
  crumbs,
  children,
}: {
  eyebrow?: string;
  title: string;
  intro?: ReactNode;
  crumbs?: { href?: string; label: string }[];
  children?: ReactNode;
}) {
  return (
    <section className="border-b border-line bg-blush">
      <div className="container-site flex flex-col gap-4 py-10 md:py-14">
        {crumbs && <Breadcrumbs items={[{ href: "/", label: "Home" }, ...crumbs]} />}
        {eyebrow && (
          <p className="text-sm font-bold tracking-widest text-pink-ink uppercase">{eyebrow}</p>
        )}
        <h1 className="display text-4xl text-plum md:text-6xl">{title}</h1>
        {intro && <div className="max-w-2xl text-lg text-ink">{intro}</div>}
        {children}
      </div>
    </section>
  );
}

export function Section({
  title,
  children,
  id,
  className,
}: {
  title?: string;
  children: ReactNode;
  id?: string;
  className?: string;
}) {
  return (
    <section
      id={id}
      aria-labelledby={title && id ? `${id}-title` : undefined}
      className={className ?? "container-site py-12 md:py-16"}
    >
      {title && (
        <h2
          id={id ? `${id}-title` : undefined}
          className="display mb-6 text-3xl text-plum md:text-4xl"
        >
          {title}
        </h2>
      )}
      {children}
    </section>
  );
}
