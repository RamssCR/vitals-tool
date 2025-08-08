import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'
import paths from 'vite-tsconfig-paths'
import { visualizer } from 'rollup-plugin-visualizer'

// https://vite.dev/config/
/// <reference types="vitest/config" />
export default defineConfig(() => ({
  plugins: [
    react(),
    tailwindcss(),
    paths(),
    dts(),
    visualizer({ open: true }),
  ],
  build: {
    lib: {
      entry: 'src/index.ts',
      name: 'VitalsTool',
      fileName: (format) => `vitals-tool.${format}.js`,
    },
    rollupOptions: {
      external: [
        'react',
        'react-dom',
        'clsx',
        'class-variance-authority',
        'tailwind-merge'
      ],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          clsx: 'clsx',
          'class-variance-authority': 'classVarianceAuthority',
          'tailwind-merge': 'tailwindMerge'
        }
      }
    }
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './test/setupTest.ts',
    reporters: ['default', 'html'],
    css: true,
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/**',
        'src/App.tsx',
        'src/main.tsx',
        'src/views/**',
        'src/data/**',
        'src/@types/**',
        'src/utils/env.config.ts',
        'src/utils/constants.ts',
        'src/variants/**',
        'dist/**',
        'coverage/**',
        'test/**',
        'html/**',
        '*config.*',
        'src/vite-env.d.ts',
        'src/hooks/useFPS.ts',
      ],
      all: true,
      threshold: {
        statements: 90,
        branches: 90,
        functions: 90,
        lines: 90,
      }
    },
  },
}))