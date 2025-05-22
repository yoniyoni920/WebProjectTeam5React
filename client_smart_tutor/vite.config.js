import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),tailwindcss()],
  server:{
    open:true,
  proxy:{
    '/api': {//proxi api request to server
      target: 'http://localhost:3000',
    changeOrigin: true,
  },
  }
  }
})
