import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';
import { fileURLToPath, URL } from 'node:url';

const rootDir = fileURLToPath(new URL('.', import.meta.url));

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: '0.0.0.0',
    port: 3000,
    allowedHosts: [
      'localhost',
      '127.0.0.1',
      'a277e5d71d1db4a1abdeb27929e42dd6-64771444.us-west-1.elb.amazonaws.com',
    ],
  },
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