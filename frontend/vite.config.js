import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: './',  // This fixes the asset paths
  build: {
    outDir: 'dist',
  },
})