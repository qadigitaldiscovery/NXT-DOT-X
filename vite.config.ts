
// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path'; // Keep this if componentTagger or other parts need it
import { componentTagger } from 'lovable-tagger';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig(({ mode }) => ({
  /* ────────────────── plugins ────────────────── */
  plugins: [
    react(),
    tsconfigPaths(), // This will read from tsconfig.json
    mode === 'development' && componentTagger(),
  ].filter(Boolean),

  /* ────────────────── build ────────────────── */
  build: {
    outDir: 'dist',
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          ui: [
            '@radix-ui/react-toast',
            '@radix-ui/react-tooltip',
            '@radix-ui/react-label',
            '@radix-ui/react-tabs',
            '@radix-ui/react-slot',
            'class-variance-authority',
            'clsx',
            'tailwind-merge',
          ],
        },
      },
    },
  },

  /* ────────────────── globals ────────────────── */
  define: {
    'process.env.NODE_ENV': JSON.stringify(mode),
    global: 'window',
  },

  /* ────────────────── dev server ────────────────── */
  server: {
    host: '::',
    port: 8080,
  },

  /* ────────────────── dependency optimisation ────────────────── */
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      '@radix-ui/react-label',
      '@radix-ui/react-tabs',
      '@radix-ui/react-slot',
      'class-variance-authority',
      'clsx',
      'tailwind-merge',
    ],
  },
}));
