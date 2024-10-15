import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";

export default defineConfig({
  server: {
    host: "0.0.0.0",
    port: 3000,
    proxy: {
      "/api": {
        target: "http://api:8000",
        secure: false,
        changeOrigin: false,
      },
    },
  },
  build: {
    outDir: "dist",
  },
  plugins: [sveltekit()],
});
