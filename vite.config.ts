import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA, VitePWAOptions } from "vite-plugin-pwa";

const pwaConfig: Partial<VitePWAOptions> = {
  includeAssets: [
    "favicon.svg",
    "favicon.ico",
    "robots.txt",
    "icon-192.png",
    "icon-512.png",
    "apple-touch-icon.png",
  ],
  manifest: {
    name: "Start Page",
    short_name: "Start Page",
    description: "Your start page",
    theme_color: "#18181B", // zinc 900 from tailwindCSS
    icons: [
      {
        src: "icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any maskable",
      },
    ],
  },
};

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), VitePWA(pwaConfig)],
});
