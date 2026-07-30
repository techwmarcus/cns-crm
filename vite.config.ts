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
    host: true, // Allows the application to listen on all container/network interfaces
    allowedHosts: [
      // 1. Authorize your exact AWS Load Balancer domain string
      'a277e5d71d1db4a1abdeb27929e42dd6-64771444.us-west-1.elb.amazonaws.com'
    ],
    hmr: {
      // 2. Directs the hot-reloading WebSocket connection to use the same host
      host: 'a277e5d71d1db4a1abdeb27929e42dd6-64771444.us-west-1.elb.amazonaws.com',
      clientPort: 80, 
    }
  }
});
