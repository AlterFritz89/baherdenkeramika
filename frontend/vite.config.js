import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'), // Устанавливает алиас для пути к src
      
    }
  },
  build: {
    minify: false, // Отключает минификацию JS и CSS
    sourcemap: true, // Включает sourcemaps для отладки
  },
  server: {
    port: 5173 // Фиксируем порт
  }
})