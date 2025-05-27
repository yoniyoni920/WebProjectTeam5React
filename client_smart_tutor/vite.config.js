<<<<<<< HEAD
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  base: '/WebProjectTeam5React/', // 👈 Add this line
  plugins: [react(), tailwindcss()],
  server: {
    open: true,
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
    },
  },
})
=======
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
>>>>>>> e79d706fd20d6ae672e0e93686f75210ba2418ff
