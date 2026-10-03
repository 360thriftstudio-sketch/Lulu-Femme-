import type { Metadata } from "next";
import { CtaBand } from "@/components/CtaBand";
import { PageHeader, Section } from "@/components/PageHeader";

export const metadata: Metadata = {
  title: "Shipping & delivery",
  description:
    "Lulu Femme prepares wholesale Lululemon bundles in Pakistan and ships them worldwide within 2 working days. UK and international delivery options, duties and VAT.",
  alternates: { canonical: "/shipping" },
};

const uk = [
  {
    courier: "[EDIT] e.g. Royal Mail Tracked 48",
    price: "[EDIT]",
    time: "[EDIT] 2–3 working days",
  },
  { courier: "[EDIT] e.g. DPD Next Day", price: "[EDIT]", time: "[EDIT] 1 working day" },
];
const intl = [
  { courier: "[EDIT] e.g. DHL Express – Europe", price: "[EDIT]", time: "[EDIT] 2–4 working days" },
  {
    courier: "[EDIT] e.g. DHL Express – USA & Canada",
    price: "[EDIT]",
    time: "[EDIT] 3–5 working days",
  },
  { courier: "[EDIT] e.g. Rest of world", price: "[EDIT]", time: "[EDIT]" },
];

function ShipTable({ caption, rows }: { caption: string; rows: typeof uk }) {
  return (
    <div
      tabIndex={0}
      role="region"
      aria-label={`${caption} table (scrolls sideways)`}
      className="overflow-x-auto rounded-2xl border border-line bg-card"
    >
      <table className="w-full min-w-[520px] text-left text-sm">
        <caption className="px-4 pt-4 text-left text-lg font-bold text-plum">{caption}</caption>
        <thead className="text-plum">
          <tr className="border-b border-line">
            <th scope="col" className="px-4 py-3">
              Courier
            </th>
            <th scope="col" className="px-4 py-3">
              Price
            </th>
            <th scope="col" className="px-4 py-3">
              Dispatch
            </th>
            <th scope="col" className="px-4 py-3">
              Delivery time
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-line">
          {rows.map((r) => (
            <tr key={r.courier}>
              <th scope="row" className="px-4 py-3 font-medium text-ink">
                {r.courier}
              </th>
              <td className="px-4 py-3">{r.price}</td>
              <td className="px-4 py-3">Within 2 working days</td>
              <td className="px-4 py-3">{r.time}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function ShippingPage() {
  return (
    <>
      <PageHeader
        crumbs={[{ label: "Shipping" }]}
        title="Shipping"
        intro="Prepared in Pakistan · Shipping worldwide. Every bundle is packed and dispatched from our studio within 2 working days of payment."
      />
      <Section title="Delivery options" id="options">
        <div className="flex flex-col gap-8">
          <ShipTable caption="UK delivery" rows={uk} />
          <ShipTable caption="International delivery" rows={intl} />
        </div>
      </Section>
      <Section title="Import duties & taxes" id="duties" className="container-site pb-12">
        <div className="prose-lf max-w-3xl rounded-2xl bg-blush p-6 text-ink">
          <p>
            As we ship from Pakistan, your bundle may be charged import duties, VAT or customs fees
            when it arrives. These are set by your country and are paid by the buyer – they
            aren&apos;t included in our prices or shipping costs.
          </p>
          <p>
            Ask us before ordering if you&apos;d like help estimating costs. [EDIT] Add any DDP/IOSS
            options you offer.
          </p>
        </div>
      </Section>
      <CtaBand />
    </>
  );
}
