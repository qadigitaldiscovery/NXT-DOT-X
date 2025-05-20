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

  /* ────────────────── path aliases ────────────────── */
  // REMOVE or COMMENT OUT this entire resolve.alias section
  // tsconfigPaths() plugin will handle aliases from tsconfig.json
  /*
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      // These are now redundant if tsconfigPaths is working with the updated tsconfig.json
      // components: path.resolve(__dirname, './src/components'),
      // lib: path.resolve(__dirname, './src/lib'),
      // hooks: path.resolve(__dirname, './src/hooks')
    }
  },
  */

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
    // force: true // Consider removing 'force: true' unless you have a specific reason for it during development
                  // as it slows down dev server startup. It's useful if deps change and Vite doesn't pick it up.
  },
}));