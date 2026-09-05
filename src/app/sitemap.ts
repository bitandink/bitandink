import type { MetadataRoute } from "next";

import { SITE_CONFIG } from "@/config";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    {
      path: SITE_CONFIG.links.main,
      changeFrequency: "weekly" as const,
      priority: 1,
    },
    {
      path: SITE_CONFIG.links.gateway,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      path: SITE_CONFIG.links.home,
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
    {
      path: SITE_CONFIG.links.beanlog,
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
    {
      path: SITE_CONFIG.links.playground,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
  ];

  return routes.map(({ path, changeFrequency, priority }) => ({
    url: new URL(path, SITE_CONFIG.url).toString(),
    changeFrequency,
    priority,
  }));
}