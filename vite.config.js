import { defineConfig } from "vite";

export default defineConfig({
  resolve: {
    alias: {
      "@arcgis/core": "/node_modules/@arcgis/core",
    },
  },
  server: {
    port: 5173, // Optional but good to have a dedicated port
  },
});
