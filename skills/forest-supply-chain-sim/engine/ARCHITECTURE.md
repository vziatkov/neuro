# Simulation Engine — Architecture Overview

## Role

Core simulation engine for the **Forest Supply Chain Digital Twin**. Computes profit, throughput, utilization, and bottlenecks over a network of nodes and flows. Supports **interactive** (single-step) and **Monte Carlo** (many scenarios) modes.

## Layers

```
┌─────────────────────────────────────────────────────────────────┐
│  runSimulation(config)  →  interactive | monte_carlo            │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│  stepSimulation(state, day)  →  new State + SimulationResult    │
│  One day = pipeline of 13 stages (immutable state transitions)   │
└─────────────────────────────────────────────────────────────────┘
                              │
        ┌─────────────────────┼─────────────────────┐
        ▼                     ▼                     ▼
┌───────────────┐   ┌───────────────────┐   ┌─────────────────┐
│ pipeline      │   │ metrics            │   │ levers          │
│ (stages 1–13) │   │ profit decomp.     │   │ applyOptimization│
│               │   │ bottlenecks        │   │ Levers(state)   │
└───────────────┘   └───────────────────┘   └─────────────────┘
```

## State

- **SimulationState**: immutable snapshot at a given day. Contains:
  - `nodes`: ForestPlot[], Sawmill[], SecondaryProcessor[], FurnitureFactory[], FurnitureStore[]
  - `logistics`: LogisticsHub[] (edges with flow, capacity, cost)
  - `contracts`, `inventories`, `pricing`, `riskModel`, `energyParams`
  - `day`, `history` (optional time series for charts)
- Each pipeline stage returns a **new** state (no in-place mutation of state).

## Pipeline (one day)

1. **applyRiskEvents** — sample risk events (fire, delay, price spike); apply capacity/price multipliers.
2. **harvestForest** — harvest from ForestPlot up to cap; update stock; output = raw flow to sawmills.
3. **transportRawMaterial** — move raw flow along logistics edges (respect capacity, lead time, contracts).
4. **processSawmillStages** — sawing → drying → processing; respect stage capacity and efficiency; output lumber/board + waste.
5. **updateStageQueues** — move volume between stage queues (sawing out → drying in, etc.); apply drying delay.
6. **moveMaterialFlows** — lumber/board to furniture factories; waste to secondary processors (logistics).
7. **updateInventories** — add/remove at each inventory; apply holding cost.
8. **produceFurniture** — furniture factories consume material, produce goods; update backlog.
9. **deliverToStores** — goods flow to stores; respect demand and warehouse cap.
10. **updateMarketPrices** — advance pricing model (e.g. by day or seasonality).
11. **computeNodeMetrics** — per-node throughput, utilization, unit cost, margin.
12. **computeNetworkMetrics** — total profit, total throughput, avg utilization.
13. **detectBottlenecks** — utilization > threshold, queue buildup, sensitivity of throughput to capacity.

## Output

**SimulationResult** (per step or aggregated over horizon):

- `totalProfit`, `totalThroughput`
- `bottlenecks`: BottleneckReport[]
- `utilizationMap`: nodeId → utilization
- `profitDecomposition`: costRaw, costLogistics, costProduction, costStorage, revenue, profit

## Modes

- **Interactive**: `runSimulation({ mode: 'interactive', horizonDays: 1 })` → one step, fast.
- **Monte Carlo**: `runSimulation({ mode: 'monte_carlo', scenarios: 1000, horizonDays: 365 })` → many runs with sampled risks/demand; return distribution (e.g. percentiles) of profit and throughput.

## Modules

| File       | Purpose                                              |
|------------|------------------------------------------------------|
| `types.ts` | SimulationState, Node types, Flow, Contract, etc.    |
| `pipeline.ts` | stepSimulation, and all 13 stage functions         |
| `metrics.ts`  | computeNodeMetrics, computeNetworkMetrics, computeProfitDecomposition, computeBottlenecks |
| `levers.ts`   | applyOptimizationLevers(state, levers) → new state  |
| `run.ts`      | runSimulation(config), interactive + monte_carlo   |
| `index.ts`    | Public API                                          |

## Design

- **Pure TypeScript**, no framework.
- **Functional**: stages are (state, params) => newState; no shared mutable globals.
- **Immutable state**: each step returns a new state object (shallow copy + replace updated slices).
- **Modular**: pipeline stages can be tested or reordered; metrics and levers are separate.
