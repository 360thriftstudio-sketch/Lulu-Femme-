import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/styleguide", "/saved", "/quote/sent", "/custom-orders/sent"],
      },
    ],
    sitemap: `${site.url}/sitemap.xml`,
  };
}
