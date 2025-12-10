import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/baseball-tournament-v2/',  // ⚠️ CHANGE THIS to match your GitHub repo name!
})
