import { dirname, resolve } from "path";
import { fileURLToPath } from "url";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "src");
const outDir = resolve(__dirname, "dist");

// https://vite.dev/config/
export default defineConfig({
  root,
  plugins: [react(), tailwindcss()],
  server: {
    host: "0.0.0.0",
    port: 5173,
  },
  build: {
    outDir,
    emptyOutDir: true,
  },
  resolve: {
    alias: {
      "@": root,
    },
  },
});
