import Link from "next/link";

export function Breadcrumbs({ items }: { items: { href?: string; label: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="text-sm">
      <ol className="flex flex-wrap items-center gap-1 text-muted">
        {items.map((item, idx) => {
          const last = idx === items.length - 1;
          return (
            <li key={item.label} className="flex items-center gap-1">
              {item.href && !last ? (
                <Link
                  href={item.href}
                  className="inline-flex min-h-11 items-center underline-offset-4 hover:text-pink-ink hover:underline"
                >
                  {item.label}
                </Link>
              ) : (
                <span aria-current={last ? "page" : undefined} className="font-semibold text-ink">
                  {item.label}
                </span>
              )}
              {!last && (
                <span aria-hidden="true" className="px-1">
                  /
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
