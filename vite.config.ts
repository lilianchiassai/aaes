import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  // Repo is served at https://lilianchiassai.github.io/aaes/
  base: '/aaes/',
  plugins: [react()],
})
