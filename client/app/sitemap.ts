import type { MetadataRoute } from "next";

const baseUrl = "https://syedomer.me";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/projects",
    "/blogs",
    "/experiences",
    "/certifications",
    "/intro-call",
  ];

  return routes.map((path) => {
    const isHome = path === "";
    return {
      url: `${baseUrl}${path || "/"}`,
      lastModified: new Date(),
      changeFrequency: isHome ? "weekly" : "monthly",
      priority: isHome ? 1 : 0.7,
    };
  });
}
