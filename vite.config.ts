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
    allowedHosts: [
      'a277e5d71d1db4a1abdeb27929e42dd6-64771444.us-west-1.elb.amazonaws.com'
    ]
  }
  };
});
