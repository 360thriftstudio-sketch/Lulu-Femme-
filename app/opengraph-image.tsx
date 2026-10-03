import { brandOgImage, ogSize } from "@/lib/og";

export const alt = "Lulu Femme – Grade A pre-owned Lululemon, sold in exact bundles";
export const size = ogSize;
export const contentType = "image/png";

export default function OgImage() {
  return brandOgImage(
    "Grade A pre-owned Lululemon, sold in exact bundles",
    "Prepared in Pakistan · Shipping worldwide",
  );
}
