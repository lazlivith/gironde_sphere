import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'assets/*.png', 'assets/*.svg'],
      manifest: {
        name: "GirondeSphere",
        short_name: "GirondeSphere",
        description: "L'application de commande de GirondeSphere via WhatsApp.",
        theme_color: "#F5EFEB",
        background_color: "#F5EFEB",
        display: "standalone",
        start_url: "/",
        icons: [
          {
            src: "/assets/Logo.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "any maskable"
          },
          {
            src: "/assets/Logo.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable"
          }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,json}']
      }
    })
  ],
  esbuild: {
    drop: ['console', 'debugger'],
  },
});
