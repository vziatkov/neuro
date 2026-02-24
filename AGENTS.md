# AGENTS.md

## Cursor Cloud specific instructions

### Project overview

Neuro is a client-side 3D neural network visualization built with Three.js, TypeScript, and Vite. There is no backend, no database, and no external API dependencies. Everything runs in the browser via Vite's dev server.

An optional sub-project lives at `src/rawGame/` (React-based math game) with its own `package.json` — install and run independently if needed.

### Development commands

See `package.json` scripts — standard Vite project:

- **Dev server:** `npm run dev` (serves at `http://localhost:5173`)
- **Build:** `npm run build`
- **Preview prod build:** `npm run preview`

### Lint / Test / CI

- No ESLint, Prettier, or other linters are configured in this repository.
- No automated tests exist (no test files or test framework).
- TypeScript type-checking is done implicitly during `npm run build` (Vite + tsc).

### WebGL in cloud environments

Chrome in headless/cloud VMs typically has WebGL disabled. To render the Three.js app, launch Chrome with these flags:

```
--use-angle=swiftshader --disable-gpu-driver-bug-workarounds --enable-webgl --ignore-gpu-blocklist
```

Without these flags, the canvas will be black with a "WebGL is not available" error.
