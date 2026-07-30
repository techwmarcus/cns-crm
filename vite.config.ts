import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';
import { fileURLToPath, URL } from 'node:url';

const rootDir = fileURLToPath(new URL('.', import.meta.url));

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': rootDir,
      // Hard-lock every dependency to share one single instance of React
      'react': path.resolve(rootDir, './node_modules/react'),
      'react-dom': path.resolve(rootDir, './node_modules/react-dom'),
      'react-router-dom': path.resolve(rootDir, './node_modules/react-router-dom'),
    },
  },
  optimizeDeps: {
    // Force pre-bundling engines to sync together
    include: ['react', 'react-dom', 'react-router-dom'],
  },
});