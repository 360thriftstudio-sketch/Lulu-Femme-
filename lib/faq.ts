export interface Faq {
  q: string;
  a: string;
}

/** Used by /faq, the home page preview and FAQPage JSON-LD. */
export const faqs: Faq[] = [
  {
    q: "Can I buy single pieces?",
    a: "No. We only sell complete wholesale bundles. If a bundle is close to what you need, message us and we may be able to adjust it or build a similar one.",
  },
  {
    q: "Are the bundles exact?",
    a: "Yes. Every bundle is an exact bundle: the pieces shown in the bundle video are the exact pieces you receive.",
  },
  {
    q: "Can I combine bundles for a better deal?",
    a: "Yes. If you order two or more bundles, add them to your quote basket and we'll come back with a combined deal. Larger bulk and custom orders get quantity-based pricing.",
  },
  {
    q: "What sizes are in each bundle?",
    a: "Sizes vary by bundle. We send the full size breakdown with your quote, and every size is visible in the bundle video.",
  },
  {
    q: "Do you accept returns?",
    a: "Because every bundle is exact and filmed before sale, we don't accept returns for change of mind. Please review the video and description carefully before you pay. [EDIT] Add your full returns policy here.",
  },
  {
    q: "What if an item arrives damaged or isn't authentic?",
    a: "Any notable defects found during inspection are disclosed before sale, and normal signs of wear may be present in line with the grade. If a piece that isn't authentic reaches you, we offer a hassle-free replacement for that item once photo or video evidence is provided. Please contact us within [EDIT] days of delivery.",
  },
  {
    q: "Missing wash tags or labels – is that a defect?",
    a: "No. It's common for pre-owned Lululemon pieces to have their wash tags or labels removed. We don't consider missing tags or labels a defect and don't offer replacements for this reason.",
  },
  {
    q: "Do you provide invoices?",
    a: "Yes. Every order comes with an invoice listing the bundle code and pieces, which you can use for your business records. [EDIT] Confirm VAT details.",
  },
];
