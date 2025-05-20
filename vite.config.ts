import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';
import { componentTagger } from 'lovable-tagger';
import tsconfigPaths from 'vite-tsconfig-paths';   // ← NEW

export default defineConfig(({ mode }) => ({
  /* ────────────────── plugins ────────────────── */
  plugins: [
    react(),
    tsconfigPaths(),                               // ← NEW (keeps Vite + TS path aliases in sync)
    mode === 'development' && componentTagger()
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
            'tailwind-merge'
          ]
        }
      }
    }
  },

  /* ────────────────── globals ────────────────── */
  define: {
    'process.env.NODE_ENV': JSON.stringify(mode),
    global: 'window'
  },

  /* ────────────────── dev server ────────────────── */
  server: {
    host: '::',
    port: 8080
  },

  /* ────────────────── path aliases ────────────────── */
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      components: path.resolve(__dirname, './src/components'),
      lib: path.resolve(__dirname, './src/lib'),
      hooks: path.resolve(__dirname, './src/hooks')
    }
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
      'tailwind-merge'
    ],
    force: true
  }
}));
