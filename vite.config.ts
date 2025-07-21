import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  server: {
    host: '0.0.0.0',   // 🔧 Bind to all network interfaces
    port: 3000         // 🔧 Or any open port you prefer (3000 is default)
  }
});
