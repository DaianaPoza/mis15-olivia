import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/olivia-xv/', // = nombre de la subcarpeta donde se publica
})