import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path';
// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy:{
      '/api': {
        // target: 'http://jsonplaceholder.typicode.com',
        target: 'http://driver.marsview.cc',
        changeOrigin: true,
        // rewrite: (path) => path.replace(/^\/api/, ''),
      },
    }
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, 'src')
    },
    extensions: [".js", ".ts", ".jsx", ".tsx", ".json", ".vue"], //导入组件时省略后缀
  },
  plugins: [react()],
})
