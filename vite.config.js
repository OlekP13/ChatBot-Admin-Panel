import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {  
    host: '0.0.0.0', // Change this to '0.0.0.0' to allow external access  
    port: 5173,  
  },  
})
