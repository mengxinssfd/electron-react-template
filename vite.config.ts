import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';
import electron from 'vite-plugin-electron/simple';

export default defineConfig(() => {
  return {
    plugins: [
      react(),
      tailwindcss(),
      electron({
        main: { entry: 'electron/index.ts' },
        preload: { input: 'electron/preload.ts' },
        // Optional: Use Node.js API in the Renderer process
        // renderer: {},
      }),
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    build: {
      outDir: 'dist',
    },
  };
});
