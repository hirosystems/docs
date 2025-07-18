import type { MetadataRoute } from "next";
import { source } from "@/lib/source"; // Your MDX source

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = source.getPages();

  return pages.map((page) => ({
    url: `https://docs.hiro.so${page.url}`,
    lastModified: new Date(),
    changeFreq: "weekly",
    priority: page.url === "/" ? 1 : 0.8,
  }));
}
