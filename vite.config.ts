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
        // Precache every built asset — including all JS chunks — at
        // service-worker install time, so every lazy-loaded calculator
        // module is available offline immediately after first install,
        // not only after the user has visited that module once online.
        globPatterns: ['**/*.{js,html,css,ico,png,svg,webmanifest}'],
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
