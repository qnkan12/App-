import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: "https://adrianvoss.dev/sitemap.xml",
    host: "https://adrianvoss.dev",
  };
}
