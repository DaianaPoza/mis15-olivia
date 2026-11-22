import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/mis15-olivia/', // = nombre de la subcarpeta donde se publica
})