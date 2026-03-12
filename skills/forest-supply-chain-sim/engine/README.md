# Simulation Engine

Core simulation engine for the Forest Supply Chain Digital Twin. TypeScript, functional, immutable state.

## Contents

- **ARCHITECTURE.md** — overview, pipeline stages, modes
- **types.ts** — `SimulationState`, nodes, flows, `SimulationResult`, etc.
- **pipeline.ts** — `stepSimulation(state)` and 13 stage functions
- **metrics.ts** — `computeNodeMetrics`, `computeNetworkMetrics`, `computeProfitDecomposition`, `computeBottlenecks`
- **levers.ts** — `applyOptimizationLevers(state, levers)`
- **run.ts** — `runSimulation(initialState, config)` — interactive or Monte Carlo
- **example-run.ts** — `createDefaultState()`, example of `runSimulation` and levers
- **index.ts** — public API

## Build & run

```bash
cd skills/forest-supply-chain-sim/engine
npx tsc --noEmit          # type-check
npx tsx example-run.ts    # run example (requires tsx: npm i -D tsx)
```

## Usage

```ts
import { createDefaultState } from './example-run';
import { runSimulation } from './run';
import type { SimulationConfig } from './types';

const state = createDefaultState();

// Interactive: one step or short horizon
const out = runSimulation(state, { mode: 'interactive', horizonDays: 1 });
console.log(out.results[0].totalProfit, out.results[0].bottlenecks);

// Monte Carlo: many scenarios
const mc = runSimulation(state, { mode: 'monte_carlo', scenarios: 1000, horizonDays: 365 });
console.log(mc.profitPercentiles); // [p5, p50, p95]
```
