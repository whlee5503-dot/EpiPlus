import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        id: '/',
        name: 'EpiPlus — Epidemiology & Biostatistics Calculator Suite',
        short_name: 'EpiPlus',
        description:
          'Free epidemiology and biostatistics calculator suite: survey sampling design, population burden indicators (DALY, PAF, age standardization), clinical effect measures, statistical modeling, and meta-analysis',
        theme_color: '#1a6b4a',
        background_color: '#ffffff',
        display: 'standalone',
        start_url: '/',
        icons: [
          { src: '/icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
          { src: '/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
          { src: '/icon-512-maskable.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
        ],
      },
      workbox: {
        // Precache the app shell and every calculator module at install time,
        // so all 12 calculators work offline even if never opened online.
        // The download (about 1 MB) runs in the background after the first
        // visit and does not delay first paint.
        globPatterns: ['**/*.{html,js,css,ico,png,svg,webmanifest,woff2}'],
        maximumFileSizeToCacheInBytes: 3 * 1024 * 1024,

        // Runtime caching stays as a fallback for any JS outside the precache list.
        runtimeCaching: [
          {
            // Same-origin JS chunks (app shell + lazy calculator modules)
            urlPattern: /\.js$/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'js-chunks',
              expiration: {
                maxEntries: 60,
                maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days
              },
            },
          },
          {
            // Cross-origin JS, if any is ever introduced
            urlPattern: /^https:\/\/.*\.js$/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'vendor-chunks',
              expiration: {
                maxEntries: 40,
                maxAgeSeconds: 30 * 24 * 60 * 60,
              },
            },
          },
        ],
      },
    }),
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          // Normalize Windows backslashes to forward slashes first — Rollup
          // module ids can contain OS-native path separators, and a
          // hardcoded forward-slash match silently never fires on Windows,
          // silently merging react/react-dom into the main bundle instead
          // of a separate vendor-react chunk.
          const normalized = id.replace(/\\/g, '/');
          if (
            normalized.includes('node_modules/react/') ||
            normalized.includes('node_modules/react-dom/') ||
            normalized.includes('node_modules/scheduler/')
          ) {
            return 'vendor-react';
          }
          if (normalized.includes('node_modules')) {
            return 'vendor';
          }
        },
      },
    },
  },
})
