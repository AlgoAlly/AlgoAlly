import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import svgr from 'vite-plugin-svgr';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, 'src');
const outDir = resolve(__dirname, 'dist');

// https://vite.dev/config/
export default defineConfig({
  root,
  plugins: [react(), tailwindcss(), svgr()],
  server: {
    host: '0.0.0.0',
    port: 5173,
  },
  build: {
    outDir,
    emptyOutDir: true,
  },
  resolve: {
    alias: {
      '@': root,
    },
  },
  envDir: '.', // Ensure Vite looks for the `.env` file in the root directory
});
