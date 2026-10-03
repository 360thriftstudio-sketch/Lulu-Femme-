import { brandOgImage, ogSize } from "@/lib/og";

export const alt = "About Lulu Femme – curated in Pakistan, shipped worldwide";
export const size = ogSize;
export const contentType = "image/png";

export default function OgImage() {
  return brandOgImage(
    "CURATED IN PAKISTAN. SHIPPED WORLDWIDE.",
    "Curated pre-loved Lululemon · Lulu Femme",
  );
}
