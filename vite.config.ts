import { defineConfig, loadEnv, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Dev only: serve /api/anthropic by running the SAME handler that ships to
// Vercel (api/anthropic.ts), so the system prompt stays server-side in dev too.
function apiDev(envKey: string | undefined): Plugin {
  return {
    name: 'api-dev',
    configureServer(server) {
      if (envKey) process.env.ANTHROPIC_API_KEY ??= envKey
      server.middlewares.use('/api/anthropic', async (req, res) => {
        try {
          const chunks: Buffer[] = []
          for await (const c of req) chunks.push(c as Buffer)
          const mod = await server.ssrLoadModule('/api/anthropic.ts')
          const request = new Request('http://localhost/api/anthropic', {
            method: req.method,
            headers: { 'Content-Type': 'application/json' },
            body: req.method === 'POST' ? Buffer.concat(chunks) : undefined,
          })
          const response: Response = await mod.default(request)
          res.statusCode = response.status
          res.setHeader('Content-Type', response.headers.get('content-type') ?? 'application/json')
          res.end(Buffer.from(await response.arrayBuffer()))
        } catch (e) {
          res.statusCode = 500
          res.end(JSON.stringify({ error: String(e) }))
        }
      })
    },
  }
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  return {
    plugins: [react(), tailwindcss(), apiDev(env.ANTHROPIC_API_KEY)],
  }
})
