/**
 * Example: create default state and run simulation (interactive + Monte Carlo).
 */

import type { SimulationState } from './types';
import { runSimulation } from './run';
import { applyOptimizationLevers } from './levers';

export function createDefaultState(): SimulationState {
  return {
    day: 0,
    forests: [
      {
        id: 'f1',
        type: 'forest',
        stock: { structural: 1000, furniture: 800, low: 500 },
        regenRate: { structural: 50, furniture: 40, low: 30 },
        harvestCostPerM3: { structural: 20, furniture: 25, low: 15 },
        harvestCap: 100,
        harvestUsed: 0,
      },
    ],
    sawmills: [
      {
        id: 's1',
        type: 'sawmill',
        stageCapacity: { sawing: 30, drying: 20, processing: 25 },
        stageEfficiency: { sawing: 0.9, drying: 0.85, processing: 0.9 },
        stageThroughput: { sawing: 0, drying: 0, processing: 0 },
        stageQueue: { afterSawing: 0, afterDrying: 0 },
        wasteShare: 0.1,
        outputMix: { lumber: 0.5, board: 0.3, chips: 0.15, sawdust: 0.05 },
        operatingCostPerDay: 500,
        throughput: 0,
      },
    ],
    secondary: [],
    furniture: [
      {
        id: 'ff1',
        type: 'furniture',
        capacityPerDay: 10,
        productType: 'cabinet',
        demandBacklog: 50,
        margin: 0.25,
        operatingCostPerDay: 200,
        throughput: 0,
      },
    ],
    stores: [
      {
        id: 'st1',
        type: 'store',
        demandPerDay: 8,
        turnoverPerDay: 0,
        warehouseCap: 100,
        warehouseCurrent: 20,
        region: 'EU',
      },
    ],
    logistics: [
      {
        id: 'l1',
        fromNodeId: 'f1',
        toNodeId: 's1',
        capacityPerDay: 50,
        costPerUnit: 2,
        leadTimeDays: 1,
        flow: 0,
        inTransit: [0],
      },
    ],
    contracts: [],
    inventories: [
      { id: 'inv1', nodeId: 's1', stockType: 'lumber', capacity: 200, current: 30, holdingCostPerUnitPerDay: 0.1 },
    ],
    pricing: [
      { product: 'roundwood', region: 'EU', pricePerUnit: 80, t: 0 },
      { product: 'furniture', region: 'EU', pricePerUnit: 150, t: 0 },
    ],
    riskModel: {
      events: [
        { type: 'transport_delay', affectedIds: ['l1'], probabilityPerPeriod: 0.05, durationDays: 2, capacityMultiplier: 0.5 },
      ],
    },
  };
}

function main(): void {
  const state = createDefaultState();

  console.log('--- Interactive (1 day) ---');
  const interactive = runSimulation(state, { mode: 'interactive', horizonDays: 1 });
  const r = interactive.results[0];
  if (r) {
    console.log('Profit:', r.totalProfit);
    console.log('Throughput:', r.totalThroughput);
    console.log('Bottlenecks:', r.bottlenecks.length);
    console.log('Profit decomp:', r.profitDecomposition);
  }

  console.log('\n--- Monte Carlo (100 scenarios, 30 days) ---');
  const mc = runSimulation(state, { mode: 'monte_carlo', scenarios: 100, horizonDays: 30, seed: 42 });
  if (mc.profitPercentiles) {
    console.log('Profit percentiles [p5, p50, p95]:', mc.profitPercentiles);
  }
  if (mc.throughputPercentiles) {
    console.log('Throughput percentiles [p5, p50, p95]:', mc.throughputPercentiles);
  }

  console.log('\n--- With levers ---');
  const state2 = applyOptimizationLevers(state, { factoryUtilization: { s1: 0.9 } });
  const run2 = runSimulation(state2, { mode: 'interactive', horizonDays: 1 });
  console.log('Profit after lever:', run2.results[0]?.totalProfit);
}

main();
