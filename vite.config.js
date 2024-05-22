import { resolve } from 'path'
import { defineConfig, loadEnv } from 'vite'
import 'dotenv/config'

export default ({mode}) => {
  process.env = Object.assign(process.env, loadEnv(mode, process.cwd(), ''));

  return defineConfig({
    root: resolve(__dirname, 'src'),
    build: {
      outDir: '../dist',
    },
    server: {
      port: 5173,
      proxy: {
        '/api': {
          target: `${process.env.BACKEND_URL}:${process.env.BACKEND_PORT}/car`,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
    },
  });
}