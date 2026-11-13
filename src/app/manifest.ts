import type { MetadataRoute } from "next";
import { business } from "@/content/business";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: business.name,
    short_name: business.shortName,
    description: business.claim,
    lang: "de",
    start_url: "/",
    display: "browser",
    background_color: "#f4efe4",
    theme_color: "#17479b",
    icons: [
      { src: "/icon.svg", type: "image/svg+xml", sizes: "any" },
      { src: "/apple-icon.png", type: "image/png", sizes: "180x180" },
    ],
  };
}
