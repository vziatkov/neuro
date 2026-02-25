# AGENTS.md

## Cursor Cloud specific instructions

### Project overview

Neuro is a client-side 3D neural network visualization built with Three.js, TypeScript, and Vite. No backend, no database, no Docker, no external API dependencies. Everything runs in the browser.

**Tech stack:** Three.js (v0.181+), TypeScript (v5.9+), Vite (v7+), custom GLSL shaders, WebGL.

An optional sub-app lives at `src/rawGame/` (React-based math game with its own `package.json` and `package-lock.json` — install and run independently on port 3004).

Hidden pages served by the same Vite dev server:
- `/cognitive-trace-artifact.html` — Baccarat grid + WiFi wave visualization
- `/cursor-2025.html` — Year in review data dashboard

### Development commands

See `package.json` scripts — standard Vite project:

- **Install:** `npm install`
- **Dev server:** `npm run dev` (serves at `http://localhost:5173`)
- **Build:** `npm run build`
- **Preview prod build:** `npm run preview`

### Lint / Test / CI

- No ESLint, Prettier, or other linters are configured.
- No automated test runner or test files.
- `npm run build` is the primary validation command — it runs Vite's TypeScript transpilation.
- `npx tsc --noEmit` will show pre-existing type errors in `src/rawGame/` (missing React types at root) and some utility modules (`clustering.ts`, `weatherClustering.ts`). These do **not** block the dev server or build.

### WebGL in cloud environments

Chrome in headless/cloud VMs requires SwiftShader for software rendering. Launch with:

```
--enable-unsafe-swiftshader --use-gl=angle --use-angle=swiftshader --ignore-gpu-blocklist
```

Without these flags the canvas will be black.
