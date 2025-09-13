import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/vkid-api': {
        target: 'https://id.vk.ru',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/vkid-api/, ''),
        secure: false
      }
    }
  }
})