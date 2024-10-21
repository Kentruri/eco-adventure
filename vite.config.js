import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import * as path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src/') ,
    },
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: 'src/setupTests.jsx',
    include: [
      'src/**/*.{test,spec}.{js,jsx,ts,tsx}', 
      'src/components/**/*.{test,spec}.{js,jsx,ts,tsx}', 
    ],
    exclude: [
      'node_modules/**',
      'dist/**',
      '**/*.config.{js,ts}',
      'src/firebase/**',
      'src/hooks/**', 
      'src/redux/**',
    ],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'lcov'],
      reportsDirectory: './coverage',
      include: [
        'src/**/*.jsx',
        'src/components/**/*.jsx', 
      ],
      exclude: [
        'node_modules/**',
        'dist/**',
        '**/*.config.{js,ts}',
        'src/firebase/**', 
        'src/hooks/**', 
        'src/redux/**',
      ],
    },
  }
})