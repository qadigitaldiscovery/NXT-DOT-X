
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
    port: 8080,
    strictPort: false,
    proxy: {},
    // Enable SPA routing
    open: true,
  },
  preview: {
    port: 8080,
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
  define: {
    // Expose env variables to the client
    'import.meta.env.VITE_SUPABASE_URL': JSON.stringify(process.env.VITE_SUPABASE_URL),
    'import.meta.env.VITE_SUPABASE_ANON_KEY': JSON.stringify(process.env.VITE_SUPABASE_ANON_KEY),
  },
}));
