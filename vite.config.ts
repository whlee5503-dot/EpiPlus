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
        name: 'EpiPlus — Epidemiology & Biostatistics Calculator Suite',
        short_name: 'EpiPlus',
        description:
          'Free epidemiology and biostatistics calculator suite: survey sampling design, population burden indicators (DALY, PAF, age standardization), clinical effect measures, statistical modeling, and meta-analysis',
        theme_color: '#1a6b4a',
        background_color: '#ffffff',
        display: 'standalone',
        start_url: '/',
        icons: [
          { src: '/favicon.svg', sizes: 'any', type: 'image/svg+xml', purpose: 'any' },
          { src: '/icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
          { src: '/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
          { src: '/icon-512-maskable.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
        ],
      },
      workbox: {
        // App-shell precaching, matching EpiCalc's approach: only the
        // HTML/CSS/icons/fonts needed for the very first paint are
        // downloaded at install time. This keeps the initial PWA install
        // small and fast on slow/metered connections (2G/3G) — the
        // scenario this app explicitly targets for field health workers.
        // Fonts are self-hosted (see src/styles/fonts.css) and included
        // here since they're needed immediately for correct first-paint
        // rendering, not just for a specific calculator.
        globPatterns: ['**/*.{html,css,ico,png,svg,webmanifest,woff2}'],

        // JS chunks (the app shell's own bundle plus every lazy-loaded
        // calculator module) are NOT precached upfront. Instead they're
        // cached the first time each one is actually requested, via
        // CacheFirst runtime caching — so a calculator the user has
        // opened at least once while online stays available offline
        // afterwards, without forcing every user to download all 12
        // calculators' worth of JS just to install the app.
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
