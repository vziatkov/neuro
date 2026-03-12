/**
 * runSimulation: interactive (1 step) or Monte Carlo (many scenarios).
 */

import type { SimulationState, SimulationConfig, SimulationResult, RunResult } from './types.js';
import { stepSimulation, setSeed } from './pipeline.js';

function percentile(sorted: number[], p: number): number {
  if (sorted.length === 0) return 0;
  const i = (p / 100) * (sorted.length - 1);
  const lo = Math.floor(i);
  const hi = Math.ceil(i);
  if (lo === hi) return sorted[lo];
  return sorted[lo] + (i - lo) * (sorted[hi] - sorted[lo]);
}

export function runSimulation(
  initialState: SimulationState,
  config: SimulationConfig
): RunResult {
  const seed = config.seed ?? 42;
  setSeed(seed);

  if (config.mode === 'interactive') {
    const results: SimulationResult[] = [];
    let state = initialState;
    for (let d = 0; d < config.horizonDays; d++) {
      const { state: nextState, result } = stepSimulation(state);
      results.push(result);
      state = nextState;
    }
    return { results };
  }

  // Monte Carlo
  const scenarios = config.scenarios ?? 100;
  const allProfits: number[] = [];
  const allThroughputs: number[] = [];
  const lastResults: SimulationResult[] = [];

  for (let run = 0; run < scenarios; run++) {
    setSeed(seed + run * 1000);
    let state = { ...initialState };
    for (let d = 0; d < config.horizonDays; d++) {
      const { state: nextState, result } = stepSimulation(state);
      state = nextState;
      if (d === config.horizonDays - 1) {
        allProfits.push(result.totalProfit);
        allThroughputs.push(result.totalThroughput);
        lastResults.push(result);
      }
    }
  }

  allProfits.sort((a, b) => a - b);
  allThroughputs.sort((a, b) => a - b);

  return {
    results: lastResults,
    profitPercentiles: [percentile(allProfits, 5), percentile(allProfits, 50), percentile(allProfits, 95)],
    throughputPercentiles: [
      percentile(allThroughputs, 5),
      percentile(allThroughputs, 50),
      percentile(allThroughputs, 95),
    ],
  };
}
