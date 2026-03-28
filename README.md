# Dr. Kuljeet Singh — 3D Academic Portfolio

A modern, responsive **3D-enhanced academic portfolio** built with **React + TypeScript + Vite**, styled with **Tailwind CSS** and **shadcn/ui**, powered by **Three.js / React Three Fiber**.

🌐 **Live site:** https://kportfolio-rouge.vercel.app

---

## ✨ 3D Features

| Section | 3D Effect |
|---|---|
| **Hero** | Animated particle starfield background + floating distorted brain orb with orbital rings |
| **Research** | Rotating DNA double-helix on both sides of the section |
| **Skills** | Interactive floating 3D skill orbs (hover to highlight) + neural network background |
| **Contact** | Rotating Earth with city lights and atmosphere glow |

All 3D scenes include:
- **WebGL detection** with graceful CSS fallbacks
- **Mobile-aware** DPR scaling and reduced particle counts
- **`prefers-reduced-motion`** respected
- **Suspense + lazy loading** — 3D never blocks the UI

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 18 + TypeScript |
| Build tool | Vite 5 |
| 3D Engine | Three.js r176 + React Three Fiber v8 + Drei v9 |
| Styling | Tailwind CSS v3 + shadcn/ui |
| Animation | Framer Motion |
| Routing | React Router v6 |
| Package manager | npm |

---

## Project Structure

```
kportfolio/
├── .github/workflows/deploy.yml   # Auto-deploy to GitHub Pages
├── public/
│   └── _redirects                 # SPA redirect rule
├── src/
│   ├── components/
│   │   ├── canvas/                # ← All 3D components
│   │   │   ├── FloatingBrain.tsx  # Hero orb
│   │   │   ├── ParticleField.tsx  # Starfield background
│   │   │   ├── DNAHelix.tsx       # Research section
│   │   │   ├── NeuralNetwork.tsx  # Skills background
│   │   │   ├── SkillOrb.tsx       # Interactive skill spheres
│   │   │   ├── RotatingEarth.tsx  # Contact section
│   │   │   ├── SectionCanvas.tsx  # Reusable canvas wrapper
│   │   │   ├── StarsBackground.tsx
│   │   │   ├── FloatingGrid.tsx
│   │   │   ├── CanvasLoader.tsx
│   │   │   └── index.ts
│   │   ├── sections/              # Page sections
│   │   └── ui/                    # shadcn/ui components
│   ├── hooks/
│   │   ├── use-webgl.ts           # WebGL support detection
│   │   └── use-mobile.tsx
│   ├── lib/cv.ts                  # All CV/portfolio data
│   ├── pages/Index.tsx
│   └── index.css
├── vite.config.ts
└── package.json
```

---

## Local Development

### Prerequisites
- Node.js 18+
- npm

### Setup

```bash
git clone https://github.com/YOUR_USERNAME/kportfolio.git
cd kportfolio
npm install
npm run dev
```

Open http://localhost:8080

### Build

```bash
npm run build        # Production build → /dist
npm run preview      # Preview production build
```

> **Note:** Three.js adds ~600 KB to the bundle (gzipped ~200 KB). This is normal and expected for 3D-enabled portfolios.

---

## Deployment

### GitHub Pages (automatic)
Push to `main` → GitHub Actions builds and deploys automatically.
Enable in **Settings → Pages → Source: GitHub Actions**.

### Vercel
Import repo → Framework: **Vite** → Build: `npm run build` → Output: `dist`

### Netlify
`netlify.toml` is pre-configured. Just connect the repo.

---

## Performance Notes

- 3D scenes use `powerPreference: "low-power"` on background canvases
- `dpr` capped at 1.5× (background) and 2× (interactive) 
- WebGL support is detected at runtime — non-WebGL browsers get clean CSS fallbacks
- Mobile devices get reduced particle counts and single DPR

---

## No Environment Variables Required

This project has zero secrets or API keys needed.

---

## License

All rights reserved. © Dr. Kuljeet Singh
