import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [
    react(),
    mode === 'development' && componentTagger(),
  ].filter(Boolean),
  build: {
    outDir: 'dist',
    // Enable dynamic imports
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor': ['react', 'react-dom', 'react-router-dom'],
          'ui': ['@radix-ui/react-toast', '@radix-ui/react-tooltip'],
        },
      },
    },
  },
  server: {
    host: "::",
    port: 3000,
    strictPort: false,
    proxy: {},
    // Enable SPA routing
    open: true,
  },
  preview: {
    port: 3000,
    // Enable SPA routing in preview
    open: true,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  // Add base URL configuration
  base: '/',
  // Enable SPA mode
  appType: 'spa',
  // Configure optimizeDeps for better dev performance
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom'],
  },
}));
