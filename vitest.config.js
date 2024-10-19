import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom', // para que vitest simule el DOM en las pruebas
    setupFiles: './setupTests.ts', // archivo opcional para configuración global
  },
})