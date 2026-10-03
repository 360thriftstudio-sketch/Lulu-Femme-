import { itemTotal, type Bundle } from "@/data/bundles";

export function ItemTable({ bundle }: { bundle: Bundle }) {
  const grouped = bundle.groups.length > 1;
  return (
    <div className="overflow-x-auto rounded-2xl border border-line bg-card">
      <table className="w-full text-left text-sm">
        <caption className="sr-only">Item breakdown for bundle {bundle.code}</caption>
        <thead className="bg-blush text-plum">
          <tr>
            <th scope="col" className="px-4 py-3 font-bold">
              Item
            </th>
            <th scope="col" className="px-4 py-3 text-right font-bold">
              Qty
            </th>
          </tr>
        </thead>
        {bundle.groups.map((g) => {
          const sub = g.items.reduce((s, i) => s + i.qty, 0);
          return (
            <tbody key={g.heading} className="divide-y divide-line">
              {grouped && (
                <tr className="bg-offwhite">
                  <th
                    scope="rowgroup"
                    colSpan={2}
                    className="px-4 py-2.5 text-xs font-bold tracking-wider text-plum uppercase"
                  >
                    {g.heading} ({sub} pcs)
                  </th>
                </tr>
              )}
              {g.items.map((it) => (
                <tr key={it.name}>
                  <th scope="row" className="px-4 py-2.5 font-medium text-ink">
                    {it.name}
                  </th>
                  <td className="px-4 py-2.5 text-right text-ink tabular-nums">{it.qty}</td>
                </tr>
              ))}
            </tbody>
          );
        })}
        <tfoot>
          <tr className="border-t-2 border-plum">
            <th scope="row" className="px-4 py-3 font-bold text-plum">
              Total
            </th>
            <td className="px-4 py-3 text-right font-bold text-plum tabular-nums">
              {itemTotal(bundle)} pcs
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}

export function SizeTable({ bundle }: { bundle: Bundle }) {
  if (bundle.sizes.length === 0) {
    return (
      <p className="rounded-2xl border border-dashed border-line-strong bg-card px-4 py-5 text-sm text-ink">
        Size breakdown sent with your quote.
      </p>
    );
  }
  return (
    <div className="overflow-x-auto rounded-2xl border border-line bg-card">
      <table className="w-full text-left text-sm">
        <caption className="sr-only">Size breakdown for bundle {bundle.code}</caption>
        <thead className="bg-blush text-plum">
          <tr>
            <th scope="col" className="px-4 py-3 font-bold">
              Size
            </th>
            <th scope="col" className="px-4 py-3 text-right font-bold">
              Pieces
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-line">
          {bundle.sizes.map((s) => (
            <tr key={s.size}>
              <th scope="row" className="px-4 py-2.5 font-medium">
                {s.size}
              </th>
              <td className="px-4 py-2.5 text-right tabular-nums">{s.qty}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
