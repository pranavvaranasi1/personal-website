// Vercel Edge Function: proxies Ask Pranav requests to the Anthropic API.
// The system prompt, model and token limit are set HERE, never by the browser,
// so the prompt is not visible in the site bundle or the network tab, and
// visitors cannot use this endpoint as a free general-purpose Claude.
//
// Required env var on Vercel: ANTHROPIC_API_KEY
import { askPranavSystemPrompt } from './_prompt'

export const config = {
  runtime: 'edge',
}

const MODEL = 'claude-haiku-4-5-20251001'
const MAX_TOKENS = 600
const MAX_MESSAGES = 30
const MAX_CHARS = 2000

const json = (body: unknown, status: number) =>
  new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json' } })

export default async function handler(req: Request): Promise<Response> {
  if (req.method !== 'POST') {
    return new Response('Method Not Allowed', { status: 405 })
  }

  const key = process.env.ANTHROPIC_API_KEY
  if (!key) return json({ error: 'Server is missing ANTHROPIC_API_KEY' }, 500)

  let incoming: unknown
  try {
    incoming = (await req.json())?.messages
  } catch {
    return json({ error: 'Invalid JSON' }, 400)
  }
  if (!Array.isArray(incoming) || incoming.length === 0) {
    return json({ error: 'messages required' }, 400)
  }

  // Only role + text survive. Anything else the browser sends is ignored.
  const messages = incoming
    .slice(-MAX_MESSAGES)
    .filter((m) => m && (m.role === 'user' || m.role === 'assistant') && typeof m.content === 'string')
    .map((m) => ({ role: m.role as 'user' | 'assistant', content: m.content.slice(0, MAX_CHARS) }))
  if (messages.length === 0 || messages[0].role !== 'user') {
    return json({ error: 'messages must start with a user message' }, 400)
  }

  const upstream = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': key,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: MODEL,
      max_tokens: MAX_TOKENS,
      system: askPranavSystemPrompt,
      messages,
    }),
  })

  return new Response(upstream.body, {
    status: upstream.status,
    headers: { 'Content-Type': upstream.headers.get('content-type') ?? 'application/json' },
  })
}
