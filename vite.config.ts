import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  base: '/my-curriculum-vitae/',
  plugins: [
    vue(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['vite.svg'],
      manifest: {
        name: '王洪洲 · 个人简历',
        short_name: 'WHZ简历',
        theme_color: '#0b0e14',
        background_color: '#0b0e14',
        icons: [
          { src: '/my-curriculum-vitae/vite.svg', sizes: '192x192', type: 'image/svg+xml' }
        ]
      }
    })
  ],
})
