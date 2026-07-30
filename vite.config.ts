import { defineConfig } from 'vite';
import react from '@vitejs/react-plugin';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // Hard-lock every dependency to share one single instance of React
      'react': path.resolve(__dirname, './node_modules/react'),
      'react-dom': path.resolve(__dirname, './node_modules/react-dom'),
      'react-router-dom': path.resolve(__dirname, './node_modules/react-router-dom'),
    },
  },
  optimizeDeps: {
    // Force pre-bundling engines to sync together
    include: ['react', 'react-dom', 'react-router-dom'],
  },
});