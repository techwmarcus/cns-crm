import { defineConfig } from 'vite';
import react from '@vitejs/react-plugin';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      'react': path.resolve(__dirname, './node_modules/react'),
      'react-dom': path.resolve(__dirname, './node_modules/react-dom'),
      'react-router-dom': path.resolve(__dirname, './node_modules/react-router-dom'),
    },
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom'],
  },
  server: {
    host: true, // Listens on all container addresses inside Kubernetes
    allowedHosts: true, // ✅ Use boolean true to dynamically accept any incoming host header
    hmr: {
      clientPort: 80,
    }
  }
});
