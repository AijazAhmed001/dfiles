import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'node:path'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const port = Number(env.PORT || 5173)

  return {
    plugins: [react(), tailwindcss()],

    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },

    server: {
      host: '0.0.0.0',
      port,
      strictPort: false,
      open: true,
    },

    preview: {
      host: '0.0.0.0',
      port,
      strictPort: false,
    },

    build: {
      outDir: 'dist',
      sourcemap: mode === 'development',
      minify: mode === 'production' ? 'esbuild' : false,
      emptyOutDir: true,
    },

    esbuild: {
      drop: mode === 'production' ? ['console', 'debugger'] : [],
    },
  }
})