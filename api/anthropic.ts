// Vercel Edge Function — proxies Ask Pranav requests to the Anthropic API.
// Mirrors the local Vite dev proxy (vite.config.ts). The browser POSTs to
// /api/anthropic; this function injects the x-api-key header server-side and
// forwards to https://api.anthropic.com/v1/messages.
//
// Required env var on Vercel: ANTHROPIC_API_KEY

export const config = {
  runtime: 'edge',
}

export default async function handler(req: Request): Promise<Response> {
  if (req.method !== 'POST') {
    return new Response('Method Not Allowed', { status: 405 })
  }

  const key = process.env.ANTHROPIC_API_KEY
  if (!key) {
    return new Response(
      JSON.stringify({ error: 'Server is missing ANTHROPIC_API_KEY' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
  }

  const body = await req.text()

  const upstream = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': key,
      'anthropic-version': '2023-06-01',
    },
    body,
  })

  // Stream the response back unmodified
  return new Response(upstream.body, {
    status: upstream.status,
    headers: { 'Content-Type': upstream.headers.get('content-type') ?? 'application/json' },
  })
}
