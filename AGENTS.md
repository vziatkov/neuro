# AGENTS.md

## Cursor Cloud specific instructions

### Project overview

Neuro is a client-side 3D neural network visualization built with Three.js + TypeScript, bundled by Vite. No backend, no database, no Docker. There is also an optional sub-app at `src/rawGame/` (a React math game with its own `package.json`).

### Running the main app

```bash
npm run dev          # Vite dev server on http://localhost:5173
npm run build        # Production build into dist/
npm run preview      # Preview production build
```

See `package.json` scripts and README for full details.

### WebGL in cloud environments

The Three.js app requires WebGL. In headless/cloud VMs without a real GPU, Chrome must be launched with SwiftShader flags for software rendering:

```
--enable-unsafe-swiftshader --use-gl=angle --use-angle=swiftshader --ignore-gpu-blocklist
```

Without these flags the canvas will be black. The `computerUse` subagent should use these flags when opening Chrome.

### TypeScript type-checking

`npx tsc --noEmit` produces errors from `src/rawGame/` (missing React types since its deps are not installed at root) and some pre-existing type issues in utility modules (`clustering.ts`, `weatherClustering.ts`, etc.). These do **not** block the Vite dev server or build — Vite transpiles without type-checking.

### Sub-app: NeuroKids (src/rawGame/)

The React math game has its own `package.json` and `package-lock.json`. To run it:

```bash
cd src/rawGame && npm install && npm run dev   # port 3004
```

This is optional and independent from the main Neuro app.

### No lint or test frameworks configured

The project has no ESLint config, no test runner, and no pre-commit hooks. Build (`npm run build`) is the primary validation command.
