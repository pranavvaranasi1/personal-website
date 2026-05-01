import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  return {
    plugins: [react(), tailwindcss()],
    server: {
      proxy: {
        // Dev-only proxy for Ask Pranav. The key lives in .env.local (gitignored)
        // and is injected here on the server side, so the browser never sees it.
        // For production deploys, replace this with a real serverless function
        // at the same path.
        '/api/anthropic': {
          target: 'https://api.anthropic.com',
          changeOrigin: true,
          rewrite: () => '/v1/messages',
          configure: (proxy) => {
            proxy.on('proxyReq', (proxyReq) => {
              const key = env.ANTHROPIC_API_KEY
              if (key) {
                proxyReq.setHeader('x-api-key', key)
                proxyReq.setHeader('anthropic-version', '2023-06-01')
              }
            })
          },
        },
      },
    },
  }
})
