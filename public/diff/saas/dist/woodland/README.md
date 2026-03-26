# Woodland System — 2D World Viewer (PixiJS v8)

This folder is a high-performance exploration of rendering large-scale 2D worlds. It demonstrates the transition from naive object rendering toward a **data-driven projection** model: simulation state lives in typed arrays; only the visible subset becomes Pixi display objects.

---

## Entry point

**Open everything from one page:** [`index.html`](./index.html) — live demos (`try5a`, [`card-field-birth-v1`](./card-field-birth-v1.html), [`card-field-birth-v2`](./card-field-birth-v2.html), `try4`, `try5`, legacy preview), PDFs, links to this README and the portfolio.

**Bundled with Woodland SaaS:** `npm run build` in `diff/saas` emits **`dist/woodland/`** (copy of this folder). Deploy `dist/` and open `woodland/index.html` beside the storybook — no neuro dev server.

**Portfolio hub:** [landing-with-art-cards.html](https://vziatkov.github.io/neuro/landing-with-art-cards.html) — the **Сделано** tile links to `woodland/index.html`.

**Field Birth v1 (public short URL):** [../card-field-birth-v1.html](https://vziatkov.github.io/neuro/card-field-birth-v1.html) (stub → full demo). Note: [`NOTE_PUBLIC_FIELD_BIRTH.md`](./NOTE_PUBLIC_FIELD_BIRTH.md).

---

## Live demos (deep links)

| Build | File | Role |
|--------|------|------|
| **v4.3 — Neural field** | [`try5a.html`](./try5a.html) | 100k logical points in `Float32Array`, **12k** animated sprites (fireflies), cursor “gravity”, pan / zoom-to-mouse, matrix HUD |
| **Field birth v1 (card)** | [`card-field-birth-v1.html`](./card-field-birth-v1.html) | Disturb field → coalesce core → **READY** → dissolve; phased loop, additive batch; design: [`static/CARD_AND_DEMO_STRATEGY_EN_RU.md`](./static/CARD_AND_DEMO_STRATEGY_EN_RU.md) |
| **Field birth v2 (L2)** | [`card-field-birth-v2.html`](./card-field-birth-v2.html) | **Grid foundation:** tiles, `HiggsField`, Gaussian warp (CPU), uniforms (`uTime`, `uMacroPhase`, `uResonance`, `uSpread`); GLSL stub in file; impl order **B→A→C** in doc |
| **Full brief viewer** | [`try4.html`](./try4.html) | Take-home brief as a spatial document: spatial hash, viewport culling, glyph pooling, phased narrative |
| **Sketch** | [`try5.html`](./try5.html) | Worker / mesh / LOD notes (draft) |
| **Legacy** | [`preview (14).html`](./preview%20(14).html) | Early comparison build |

---

## What this demonstrates (technical core)

### 1) Large world simulation (100k+ logical entities)

The system can carry world state far beyond naive “one sprite per entity” limits.

- **Implementation:** Positions and velocities live in **`Float32Array`** (linear memory, cache-friendly updates).
- **Rendering tradeoff (v4.3):** All **100k** slots are simulated in data; **12k** sprites are updated per frame for a dense but GPU-reasonable field. The full brief build (`try4.html`) pushes toward **visibility-based** promotion of glyphs instead.

### 2) Camera and navigation (UX)

- **Zoom-to-mouse:** Scale around the cursor, not only the screen center — the interaction model people expect in maps and design tools.
- **Decoupling:** Camera defines the query region; it is not identical to the render object graph.

### 3) Visibility and manual culling (`try4.html`)

> **The render tree is not the world. It is a filtered projection of it.**

Only entities intersecting the viewport (plus margin) are attached to the active Pixi tree. Off-screen logical state stays in CPU arrays without GPU cost.

### 4) Spatial query strategy (interaction)

- **v4.3 (`try5a.html`):** Cursor-influenced motion is **O(n)** over the **rendered** sprite set (12k), with cheap distance tests — good for a portfolio “feel” demo.
- **v4.x brief (`try4.html`):** Grid / hash structures support **neighborhood** queries and culling at scale.

### 5) Pooling and batching (PixiJS v8)

- **Batching:** Many small quads (same texture) batch efficiently in Pixi v8 — in practice you see **few draw calls** for thousands of identical sprites.
- **Pooling / reuse:** Prefer recycling display objects over allocate-per-frame patterns (the brief viewer leans on pooled glyphs).

---

## Architecture overview

1. **Data layer:** Pure state (`Float32Array`, indices, phases). No mandatory dependency on Pixi.
2. **Query layer:** Derives visible sets and interaction neighborhoods from camera bounds.
3. **Render layer (Pixi v8):** Projects the visible subset into sprites, text, or meshes.

---

## Performance and bottlenecks

- **Scope:** Focused on rendering and interaction — no asset streaming or networking, to keep the experiment readable.
- **Typical bottleneck:** CPU → GPU bandwidth when uploading or touching many buffers every frame; fewer live sprites or instancing / workers mitigate this.
- **Expectation:** Smooth interaction on mid-range hardware for the shipped parameters; always profile if you change counts or shader cost.

---

## What we would build next

- **Web Workers:** Run integration / field updates off the main thread.
- **GPU simulation:** Instanced mesh or compute-style paths for millions of points (where the platform allows).
- **Chunk-based streaming:** Infinite worlds with lazy data pages.
- **LOD layers:** Merge distant detail into textures or coarse particles.

---

## Run locally

From the **repository root** (Vite serves `public/` at `/`):

```bash
npm install
npm run dev
```

Then open:

- [http://localhost:5173/woodland/index.html](http://localhost:5173/woodland/index.html) (hub)
- [http://localhost:5173/woodland/try5a.html](http://localhost:5173/woodland/try5a.html) · [try4.html](http://localhost:5173/woodland/try4.html) (direct)

---

## Credits

**Author:** Vitalii Ziatkov ([@vziatkov](https://github.com/vziatkov))

Architectural direction, visuals, and code; iterative refinement with AI assistants (OpenAI, Anthropic, Google). This README is written to read like a senior-facing manifest while staying honest about which numbers apply to which demo file.

---

## Short outreach template (e.g. to Sam)

```text
Hi Sam,

I've structured the Woodland work as a small ecosystem rather than a single file: a neural-field build (v4.3, Pixi v8 + typed arrays + pan/zoom) and a separate full brief viewer with culling and pooling.

Woodland hub (single entry):
https://vziatkov.github.io/neuro/woodland/index.html

Portfolio / art cards:
https://vziatkov.github.io/neuro/landing-with-art-cards.html

Technical write-up (Data / Query / Render):
https://github.com/vziatkov/neuro/blob/main/public/woodland/README.md

Happy to walk through tradeoffs (100k state vs 12k sprites, batching, next steps with workers).

Best,
Vitalii
```
