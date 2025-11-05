import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  base: './', // ensures relative paths for assets
  build: {
    outDir: 'dist', // output folder
    assetsDir: 'assets', // folder for JS/CSS/images
    rollupOptions: {
      input: path.resolve(__dirname, 'index.html'), // main entry
    },
  },
  server: {
    port: 5173,
    strictPort: true,
  },
});
