export type BundleType = "Align Mix" | "Leggings" | "Lulu Mix";
export type BundleStatus = "available" | "reserved" | "sold";

export interface BundleItem {
  name: string;
  qty: number;
}

export interface BundleGroup {
  heading: string;
  items: BundleItem[];
}

export interface SizeRow {
  size: string;
  qty: number;
}

export interface Bundle {
  code: string;
  slug: string;
  name: string;
  type: BundleType;
  pieces: number;
  grade: "A";
  image: string;
  /** Optional video URL (e.g. YouTube embed or .mp4). Leave undefined until ready. */
  video?: string;
  hasJacket: boolean;
  highlight: string;
  groups: BundleGroup[];
  sizes: SizeRow[];
  status: BundleStatus;
}

const i = (name: string, qty: number): BundleItem => ({ name, qty });

const luluMix25Tops = [
  i("Align Top", 1),
  i("Swiftly Top", 1),
  i("Bra", 1),
  i("Mix Tank Top", 3),
  i("T-Shirt", 1),
  i("Sweatshirt", 1),
  i("Define Jacket", 1),
];
const luluMix25Bottoms = [
  i("Align Short", 1),
  i("Hotty Hot Short", 1),
  i("Speed Up Short", 1),
  i("Align Capri", 1),
  i("Mix Capri", 1),
  i("Mix Flare", 2),
  i("Mix Trouser", 2),
  i("Align Leggings", 2),
  i("Mix Leggings", 5),
];

export const bundles: Bundle[] = [
  {
    code: "LF-01",
    slug: "lf-01",
    name: "Align Collection Mix",
    type: "Align Mix",
    pieces: 20,
    grade: "A",
    image: "/bundles/lf01.webp",
    hasJacket: true,
    highlight: "Align-led mix with a Define Jacket, flares and capris",
    groups: [
      {
        heading: "Items",
        items: [
          i("Leggings", 6),
          i("Flare", 3),
          i("Capri", 3),
          i("Shorts", 3),
          i("Tops", 3),
          i("Define Jacket", 1),
          i("Jogger", 1),
        ],
      },
    ],
    sizes: [],
    status: "available",
  },
  {
    code: "LF-02",
    slug: "lf-02",
    name: "Align Collection Mix",
    type: "Align Mix",
    pieces: 25,
    grade: "A",
    image: "/bundles/lf02.webp",
    hasJacket: true,
    highlight: "9 leggings plus a Define Jacket, capris and joggers",
    groups: [
      {
        heading: "Items",
        items: [
          i("Leggings", 9),
          i("Capri", 4),
          i("Flare", 3),
          i("Shorts", 3),
          i("Tops", 3),
          i("Jogger", 2),
          i("Define Jacket", 1),
        ],
      },
    ],
    sizes: [],
    status: "available",
  },
  {
    code: "LF-03",
    slug: "lf-03",
    name: "Leggings Mix",
    type: "Leggings",
    pieces: 15,
    grade: "A",
    image: "/bundles/lf03.webp",
    hasJacket: false,
    highlight: "6 Align leggings, flares and a jogger",
    groups: [
      {
        heading: "Items",
        items: [i("Align Leggings", 6), i("Mix Leggings", 6), i("Flare", 2), i("Jogger", 1)],
      },
    ],
    sizes: [],
    status: "available",
  },
  {
    code: "LF-04",
    slug: "lf-04",
    name: "Leggings Mix",
    type: "Leggings",
    pieces: 20,
    grade: "A",
    image: "/bundles/lf04.webp",
    hasJacket: false,
    highlight: "16 leggings including 6 Align, plus flares",
    groups: [
      {
        heading: "Items",
        items: [i("Align Leggings", 6), i("Mix Leggings", 10), i("Flare", 3), i("Jogger", 1)],
      },
    ],
    sizes: [],
    status: "available",
  },
  {
    code: "LF-05",
    slug: "lf-05",
    name: "Leggings Mix",
    type: "Leggings",
    pieces: 25,
    grade: "A",
    image: "/bundles/lf05.webp",
    hasJacket: false,
    highlight: "8 Align leggings, 4 flares and 3 joggers",
    groups: [
      {
        heading: "Items",
        items: [i("Align Leggings", 8), i("Mix Leggings", 10), i("Flare", 4), i("Jogger", 3)],
      },
    ],
    sizes: [],
    status: "available",
  },
  {
    code: "LF-06",
    slug: "lf-06",
    name: "Leggings Mix",
    type: "Leggings",
    pieces: 15,
    grade: "A",
    image: "/bundles/lf06.webp",
    hasJacket: false,
    highlight: "Align-heavy: 8 Align leggings in a 15-piece starter",
    groups: [
      {
        heading: "Items",
        items: [i("Align Leggings", 8), i("Mix Leggings", 6), i("Flare", 1)],
      },
    ],
    sizes: [],
    status: "available",
  },
  {
    code: "LF-07",
    slug: "lf-07",
    name: "Lulu Collection Mix",
    type: "Lulu Mix",
    pieces: 20,
    grade: "A",
    image: "/bundles/lf07.webp",
    hasJacket: true,
    highlight: "Tops and bottoms mix with a Define Jacket and Swiftly",
    groups: [
      {
        heading: "Tops",
        items: [
          i("Align Top", 1),
          i("Swiftly Top", 1),
          i("Bra", 1),
          i("Mix Tank Top", 2),
          i("T-Shirt", 1),
          i("Sweatshirt", 1),
          i("Define Jacket", 1),
        ],
      },
      {
        heading: "Bottoms",
        items: [
          i("Align Short", 1),
          i("Hotty Hot Short", 1),
          i("Speed Up Short", 1),
          i("Align Capri", 1),
          i("Mix Capri", 1),
          i("Mix Flare", 1),
          i("Mix Trouser", 1),
          i("Align Leggings", 2),
          i("Mix Leggings", 3),
        ],
      },
    ],
    sizes: [],
    status: "available",
  },
  {
    code: "LF-08",
    slug: "lf-08",
    name: "Lulu Collection Mix",
    type: "Lulu Mix",
    pieces: 25,
    grade: "A",
    image: "/bundles/lf08.webp",
    hasJacket: true,
    highlight: "Full-range mix: jacket, tops, shorts, flares and trousers",
    groups: [
      { heading: "Tops", items: luluMix25Tops.map((x) => ({ ...x })) },
      { heading: "Bottoms", items: luluMix25Bottoms.map((x) => ({ ...x })) },
    ],
    sizes: [],
    status: "available",
  },
  {
    code: "LF-09",
    slug: "lf-09",
    name: "Lulu Collection Mix",
    type: "Lulu Mix",
    pieces: 25,
    grade: "A",
    image: "/bundles/lf09.webp",
    hasJacket: true,
    highlight: "Full-range mix: jacket, tops, shorts, flares and trousers",
    groups: [
      { heading: "Tops", items: luluMix25Tops.map((x) => ({ ...x })) },
      { heading: "Bottoms", items: luluMix25Bottoms.map((x) => ({ ...x })) },
    ],
    sizes: [],
    status: "available",
  },
  {
    code: "LF-10",
    slug: "lf-10",
    name: "Lulu Collection Mix",
    type: "Lulu Mix",
    pieces: 50,
    grade: "A",
    image: "/bundles/lf10.webp",
    hasJacket: true,
    highlight: "Our biggest bundle: 3 jackets, 15 leggings and 20 tops",
    groups: [
      {
        heading: "Tops",
        items: [
          i("Align Top", 1),
          i("Swiftly Top", 3),
          i("Bra", 3),
          i("Mix Tank Top", 5),
          i("T-Shirt", 3),
          i("Sweatshirt", 2),
          i("Define Jacket", 1),
          i("Scuba Jacket", 1),
          i("Mix Jacket", 1),
        ],
      },
      {
        heading: "Bottoms",
        items: [
          i("Align Short", 1),
          i("Hotty Hot Short", 2),
          i("Speed Up Short", 2),
          i("Align Capri", 2),
          i("Mix Capri", 2),
          i("Mix Flare", 3),
          i("Mix Trouser", 3),
          i("Align Leggings", 5),
          i("Mix Leggings", 10),
        ],
      },
    ],
    sizes: [],
    status: "available",
  },
];

export const bundleTypes: BundleType[] = ["Align Mix", "Leggings", "Lulu Mix"];
export const pieceSizes = [15, 20, 25, 50] as const;

export function itemTotal(bundle: Bundle): number {
  return bundle.groups.reduce((sum, g) => sum + g.items.reduce((s, it) => s + it.qty, 0), 0);
}

export function validateBundles(list: Bundle[] = bundles): string[] {
  const errors: string[] = [];
  for (const b of list) {
    const total = itemTotal(b);
    if (total !== b.pieces) {
      errors.push(`${b.code}: items add up to ${total} but pieces is ${b.pieces}`);
    }
  }
  return errors;
}

// Runs once when this module is loaded (build, server and browser).
for (const err of validateBundles()) {
  console.error(`[bundles] Quantity mismatch – ${err}`);
}

export function getBundle(slug: string): Bundle | undefined {
  return bundles.find((b) => b.slug === slug);
}

export function bundleTitle(b: Bundle): string {
  return `${b.name} · Lululemon (#${b.code})`;
}

export function totalPieces(list: Bundle[] = bundles): number {
  return list.reduce((s, b) => s + b.pieces, 0);
}

/** Tags shown on cards, e.g. Grade A, Define Jacket. */
export function bundleTags(b: Bundle): string[] {
  const tags = [`Grade ${b.grade}`];
  const names = b.groups.flatMap((g) => g.items.map((it) => it.name));
  if (names.includes("Define Jacket")) tags.push("Define Jacket");
  if (names.includes("Scuba Jacket")) tags.push("Scuba Jacket");
  return tags;
}

export function similarBundles(b: Bundle, limit = 3): Bundle[] {
  return bundles.filter((x) => x.type === b.type && x.slug !== b.slug).slice(0, limit);
}
