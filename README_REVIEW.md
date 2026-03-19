# Woodland System — 2D World Viewer (PixiJS)

This repository is a focused exploration of rendering large-scale 2D worlds with PixiJS.

The goal is not to build a full production engine, but to demonstrate clear thinking around:
- visibility control
- spatial querying
- rendering lifecycle
- performance tradeoffs

---

## Entry Point

Start here:  
👉 [https://vziatkov.github.io/neuro/landing-with-art-cards.html](https://vziatkov.github.io/neuro/landing-with-art-cards.html)

This page acts as a visual index into the system.

It contains three core modules:
- **SaaS** (system thinking and content layer)
- **Demo** (rendering and world simulation)
- **Preview** (data behavior and visual analytics)

Each card links to a deeper slice of the architecture.

---

## What This Demonstrates

### 1) Large World Simulation

The system simulates a world containing **100,000+ lightweight objects**.

Objects are not tied to rendering directly. They exist as data:
- `id`
- `position`
- `type`

Rendering is a projection of this dataset.

### 2) Camera and Navigation

A smooth 2D camera allows free panning across the world.

The camera:
- operates independently from render objects
- defines the visible query region
- drives rendering updates

### 3) Visibility and Culling

Only objects inside the viewport (+ margin) are rendered.

Key idea:
> The render tree is not the world. It is a filtered projection of it.

Off-screen objects:
- do not exist as active Pixi display objects
- are not updated
- do not consume GPU resources

### 4) Spatial Query Strategy

The world is partitioned into a chunked grid.

Why:
- predictable lookup cost
- simple mapping from world space to chunk space
- stable performance under large datasets

Runtime flow:
- camera bounds → chunk range
- chunk range → candidate objects
- candidate objects → visible set

### 5) Render Object Pooling

Display objects are reused instead of being created and destroyed continuously.

This avoids:
- GC spikes
- unstable frame times
- unnecessary allocations

Lifecycle:
- object enters view → pulled from pool
- object exits view → returned to pool

---

## Architecture Overview

The system is split into three layers:

### Data Layer
Global dataset representing the world.  
No dependency on PixiJS.

### Query Layer
Determines which objects should be visible.

### Render Layer
Projects visible objects into PixiJS display objects.

This separation keeps the system extensible toward:
- streaming
- LOD systems
- GPU memory constraints

---

## Additional Context and Experiments

Related materials:

- **System notes (PDF):**  
  [https://vziatkov.github.io/neuro/woodland/woodland-system-notes.pdf](https://vziatkov.github.io/neuro/woodland/woodland-system-notes.pdf)
- **Interactive storytelling direction** (fox / hedgehog / weaving system)
- **Particle-based visual experiments** (background systems used across demos)
- **SaaS concept — Woodland System** (interactive book + system thinking)

These are intentionally connected to show how rendering systems, simulation, and narrative can share one structure.

---

## Tradeoffs

Intentionally not included:
- asset streaming
- texture memory management
- LOD switching
- networking

Reason: this repo isolates the core rendering problem.

---

## Bottlenecks

Primary cost is usually not raw rendering itself, but:
- visibility set recalculation
- object lifecycle transitions
- memory churn when pooling is misused

---

## What I Would Build Next

If extended into production:
- chunk-based asset streaming
- texture residency management
- density-aware LOD layers
- async loading around camera radius
- GPU budget-aware eviction

---

## Setup

```bash
npm install
npm run dev
```

Or open the hosted entry point directly.

---

## Closing Note

This project is less about "drawing objects" and more about defining the relationship between:

**data → visibility → rendering**

The system is designed to be simple, predictable, and extensible.

---

## Short Outreach Template (to Sam)

```text
Hi Sam,

I structured the solution as a small system rather than a single demo.

Entry point:
https://vziatkov.github.io/neuro/landing-with-art-cards.html

The review README explains the architecture, tradeoffs, and extension path.
Happy to walk through decisions if useful.

Best,
Vitalii
```
