import type { MetadataRoute } from "next";
import { siteUrl } from "@/content/business";

const routes: { path: string; priority: number; changeFrequency: "weekly" | "monthly" | "yearly" }[] = [
  { path: "", priority: 1, changeFrequency: "monthly" },
  { path: "/speisekarte", priority: 0.9, changeFrequency: "monthly" },
  { path: "/kontakt", priority: 0.8, changeFrequency: "monthly" },
  { path: "/biergarten", priority: 0.7, changeFrequency: "monthly" },
  { path: "/fussball-dart", priority: 0.7, changeFrequency: "monthly" },
  { path: "/ueber-uns", priority: 0.6, changeFrequency: "yearly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `${siteUrl}${route.path}`,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
