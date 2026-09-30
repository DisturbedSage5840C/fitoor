import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Fitoor 2026: Young, Dumb & Desi",
    short_name: "Fitoor",
    description:
      "Plaksha University's inter-collegiate cultural fest, 14th and 15th November, 2026.",
    start_url: "/",
    display: "standalone",
    background_color: "#1c0407",
    theme_color: "#2c0a0d",
    icons: [
      { src: "/icon.png", sizes: "500x500", type: "image/png" },
      { src: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  };
}
