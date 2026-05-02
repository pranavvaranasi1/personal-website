export type ProjectKey = 'variant-labs' | 'adapt' | 'medicast'

export interface Project {
  key: ProjectKey
  name: string
  tagline: string
  role: string
  year: string
  description: string
  story: string
  stack: string[]
  links?: { label: string; href: string }[]
}

export const projects: Project[] = [
  {
    key: 'variant-labs',
    name: 'Variant Labs',
    tagline: 'A TechBio AI copilot for protein scientists.',
    role: 'Side project',
    year: '2024 — Now',
    description: `An AI copilot that lets protein scientists run AlphaFold2, Chai-2, and Boltz-2 without managing GPU infra. Chat with an agent. Get a prediction. Get a Marimo notebook back so the analysis is reproducible.`,
    story: `My brother and I were watching scientists waste days fighting Modal, CUDA, and Python environments before they could even start their actual work. The interesting part of biology was the last thing they got to. We started building Variant to flip that on weekends: open the chat, describe what you want, get a result, get a notebook. The hard parts are the agent orchestration (CrewAI, five specialized agents), the GPU side (Boltz-2 on A100s, ESM3 on A10Gs, AlphaFold2 on A100s via Modal), and not lying to scientists about what the model knows. It's still very much a side thing, but we like working on it together.`,
    stack: ['React', 'TypeScript', 'FastAPI', 'CrewAI', 'Modal', 'Supabase', 'Marimo'],
  },
  {
    key: 'adapt',
    name: 'Adapt',
    tagline: 'A fitness app where you train with friends, not against an algorithm.',
    role: 'Builder',
    year: '2023 — 2024',
    description: `iOS fitness app with social challenges, video clips, and HealthKit integration. Real friends, real workouts, no calorie math.`,
    story: `Most fitness apps optimize for retention. Notifications about your streak. Pop-ups about your goal. The goal here was simpler: get you off the app and into the gym with someone you actually know. The social loop is structured around weekly challenges with friends. You finish, you record a clip, you post it back. The app rewards completing, not opening.`,
    stack: ['Swift', 'SwiftUI', 'UIKit', 'HealthKit', 'Firebase', 'AWS Amplify', 'MessageKit'],
  },
  {
    key: 'medicast',
    name: 'Medicast',
    tagline: 'AI-generated podcasts for doctors who don\'t have time to read research papers.',
    role: 'Builder',
    year: '2024 — Now',
    description: `iOS app that generates a personalized podcast in your medical specialty. Tell it cardiology, you get cardiology. Push notification when it's ready. Listen on your commute.`,
    story: `My dad is an electrophysiologist. He works 14-hour days and reads journals on the dinner table at 11pm. He once told me he wishes papers came as podcasts. So I built it. The backend pulls recent literature, summarizes it for a chosen detail level, generates audio, and pushes it to your phone. The hard parts were notification routing per user (Pusher Beams + a backend auth endpoint) and making the audio not sound like a robot reading a Wikipedia article.`,
    stack: ['Swift', 'SwiftUI', 'AWS Lambda', 'Pusher Beams', 'OpenAI', 'ElevenLabs'],
  },
]
