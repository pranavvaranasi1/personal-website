# DESIGN.md — pranavtech.me

## Color Strategy
**Committed** — one saturated color carries identity, used boldly but selectively. Not Restrained (would feel timid for a personal brand). Not Drenched (would overwhelm content).

## Palette (OKLCH)

### Human mode (default)
- `--ink` `oklch(0.16 0.012 280)` — base background. Deep ink, slight cool warmth.
- `--ink-2` `oklch(0.21 0.014 280)` — elevated surface.
- `--ink-3` `oklch(0.28 0.014 280)` — borders, separators.
- `--bone` `oklch(0.96 0.008 80)` — primary text. Warm bone-white, not pure white.
- `--bone-mute` `oklch(0.78 0.012 80)` — secondary text.
- `--bone-faint` `oklch(0.55 0.014 80)` — captions, metadata.
- `--ember` `oklch(0.62 0.18 25)` — the one committed accent. Deep coral / oxblood. Echoes the warmth of Pranav's photo and the Om's saffron without being literal.
- `--ember-low` `oklch(0.45 0.14 25)` — accent at low intensity.
- `--ember-glow` `oklch(0.72 0.16 25 / 0.15)` — accent for ambient glows / hover states.

### Agent mode
- `--paper` `oklch(0.95 0.013 80)` — bone-cream paper background.
- `--paper-ink` `oklch(0.22 0.012 280)` — body text.
- `--paper-rule` `oklch(0.78 0.012 80)` — rule lines.
- `--paper-mark` `oklch(0.55 0.16 25)` — link / accent.

### Studio mode
- Same as human, but with raw monospace-heavy treatment. Code-like.

## Typography

- **Display** — `Fraunces` from Google Fonts. Variable, expressive serif. Used at large sizes (60px–144px) for headlines and section openers. Optical size 144 for hero, 72 for sections. Weight 500–600.
- **Body** — `Inter` from Google Fonts. Variable. Weight 400 for body, 500 for ui chrome, 600 for emphasis.
- **Mono** — `JetBrains Mono` from Google Fonts. Used in studio mode, code blocks, agent-mode metadata.

### Scale (1.333 ratio — perfect fourth)
- 12 / 16 / 21 / 28 / 37 / 49 / 65 / 87 / 116 / 144

### Rules
- Body line length cap: 68ch.
- Headlines: -2% letter-spacing minimum, optical-sizing on.
- Body: 1.55 line-height.
- Display: 0.95 line-height.

## Spacing

Vary deliberately. Use the scale: 4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 96 / 128 / 192 / 256.

Sections do NOT use uniform vertical padding. Hero is 192. Editorial sections are 128. Tight technical sections are 64. The variance is the rhythm.

## Layout

- Reading width 68ch (about 680px) for prose.
- Wide layout 1280px max for editorial sections.
- Some sections break out to full width on purpose (hero, globe, large quotes).
- Asymmetric grids, not rigid 12-col. Some content sits offset, some hugs an edge.

## Motion

### Curves
- Default ease: `cubic-bezier(0.16, 1, 0.3, 1)` — strong ease-out (close to ease-out-expo).
- Slow ease: `cubic-bezier(0.19, 1, 0.22, 1)` — meditative, used for hero text and the temple essay reveal.

### Durations
- Micro (hover, tap): 150ms.
- Macro (section reveal): 800ms.
- Cinema (hero, full-section transitions): 1400ms.

### Patterns
- Headlines reveal letter-by-letter via clip-path or mask, not opacity fade.
- Body text lifts from a subtle Y offset (12–24px) with opacity.
- Images cross-fade with a slight scale (1.04 → 1.0) for "settling" feel.
- The avatar has its own breath animation — never frozen, even when idle.

### Banned
- CSS layout property animations (top, left, width, height, margin, padding).
- Bounce / elastic curves.
- Confetti, dramatic camera shakes, glow-pulse loops.
- Anything that makes a sound (no autoplay).

## Components

### Avatar (digital twin)
- Stylized SVG illustration of Pranav: dark curly hair, warm complexion, white shirt + dark blazer suggestion, Om pendant. Smile. Friendly stance.
- States: idle (breath + occasional blink), listening (slight head tilt), speaking (subtle lip movement, hand gesture if expanded), wave (page load).
- Sizes: tiny (40px badge in corner), medium (180px floating companion), large (480px chat hero).
- Layered SVG so head/eyes/mouth animate independently with CSS keyframes.

### Mode Toggle
- Top-right corner. Three states pill: HUMAN / AGENT / STUDIO.
- Active state: ember background, bone text. Inactive: outlined.
- Auto-detects bot user-agents and pre-selects AGENT.

### Globe (travel)
- Three.js sphere, low-poly look. Land masses extruded slightly. No textures. Single ember tone for visited cities.
- Auto-rotates slowly. Drag to spin. Pin tooltips show city + memory.
- In agent mode: rendered as `<ul>` of locations with semantic markup.

### Reader (writing)
- Click an essay title → expands inline, doesn't open new page.
- Article body uses Fraunces serif at 21px / 1.7 line-height. Drop cap on first letter.
- Pull quotes break to wide layout, ember accent rule.
- Reading time + date in faint mono.

### Project Section
- NOT a card grid. Each project has a unique full-width treatment:
  - Variant Labs: large editorial spread with technical diagram unfold
  - Adapt: phone mockup with tilt-on-scroll
  - Medicast: audio waveform that animates as you scroll
- Variation IS the design.

## Accessibility

- All animations respect `prefers-reduced-motion` — fall back to opacity-only.
- Color contrast ≥ 4.5 for body, ≥ 3 for large text (WCAG AA).
- Focus rings visible — ember outline, 2px offset.
- Mode toggle reachable via keyboard.

## Performance

- Lazy-load three.js / globe page.
- Articles render from local data, no API calls.
- Image: single hero photo, optimized.
- Lighthouse target: 95+ across all categories.
