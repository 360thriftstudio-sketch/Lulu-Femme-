import type { AccordionItem } from "@/components/ui/Accordion";

/** Accordion content shown on every bundle page (wording from the owner's listings). */
export const bundlePolicies: AccordionItem[] = [
  {
    title: "How exact bundles work",
    content: (
      <>
        <p>
          This is an exact bundle. The items shown in the listing video are the exact pieces
          included in this bundle.
        </p>
        <p>
          We provide a clear, well-lit video showing all pieces so that their quality, condition,
          grading, sizes and overall appearance are displayed as transparently as possible. Our aim
          is for you to know exactly what you will receive.
        </p>
        <p>
          If you like the bundle but it isn&apos;t exactly what you need, message us. We may be able
          to create a similar bundle based on your preferences or adjust this one where possible.
        </p>
      </>
    ),
  },
  {
    title: "Grading",
    content: (
      <>
        <p>Every piece in this bundle is Grade A (Premium).</p>
        <p>
          Any notable defects identified during our inspection are disclosed in the listing. As
          these are pre-owned garments, normal signs of previous wear may be present in accordance
          with the stated grade.
        </p>
      </>
    ),
  },
  {
    title: "Authenticity",
    content: (
      <>
        <p>
          We do not intentionally sell or promote unauthentic items. Our experienced team carefully
          inspects the authenticity of all Lululemon pieces in our bundles. However, as human error
          is possible, an unauthentic piece may occasionally slip through. If you suspect any piece
          in the bundle video is unauthentic, please let us know so we can verify and replace it.
        </p>
        <p>
          It is common for pre-owned Lululemon pieces to have their wash tags or labels removed. We
          do not consider missing tags or labels to be a defect and do not offer replacements for
          this reason.
        </p>
      </>
    ),
  },
  {
    title: "Shipping",
    content: (
      <>
        <p>
          Bundles are dispatched from Birmingham, UK within 2 working days of payment. We ship
          across the UK and internationally.
        </p>
        <p>
          Buyers outside the UK may need to pay import duties and VAT on arrival. See our shipping
          page for details.
        </p>
      </>
    ),
  },
  {
    title: "Claims",
    content: (
      <>
        <p>
          If an unauthentic piece accidentally reaches you, we offer hassle-free replacements for
          that item once image or video evidence is provided.
        </p>
        <p>
          Please contact us with your order details and photos or video. [EDIT] Add your claims time
          limit (e.g. within 7 days of delivery).
        </p>
      </>
    ),
  },
];
