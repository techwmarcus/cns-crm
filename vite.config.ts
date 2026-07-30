import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
server: {
    hmr: {
      // Use the exact host assigned by your AWS Load Balancer
      host: 'a277e5d71d1db4a1abdeb27929e42dd6-64771444.us-west-1.elb.amazonaws.com',
      // If your load balancer maps public traffic (443/80) to your container port, 
      // set the clientPort explicitly to avoid falling back to local dev ports
      clientPort: 80, 
    },
  },
  };
});
