/**
 * Simulation pipeline: one day = 13 stages.
 * Each stage returns a new state (immutable).
 */

import type {
  SimulationState,
  SimulationResult,
  ForestPlot,
  Sawmill,
  MarketPrice,
} from './types';
import { computeNodeMetrics, computeNetworkMetrics, computeProfitDecomposition, computeBottlenecks } from './metrics';

// ─── Helpers: immutable updates ───────────────────────────────────────────

function replace<T extends { id: string }>(arr: T[], id: string, updater: (x: T) => T): T[] {
  return arr.map((x) => (x.id === id ? updater(x) : x));
}

// ─── 1. applyRiskEvents ────────────────────────────────────────────────────

let rngSeed = 12345;
function random(): number {
  rngSeed = (rngSeed * 1103515245 + 12345) & 0x7fffffff;
  return rngSeed / 0x7fffffff;
}

export function setSeed(seed: number): void {
  rngSeed = seed;
}

export function applyRiskEvents(state: SimulationState): SimulationState {
  const risk = state.riskModel;
  if (!risk || !risk.events.length) return state;

  let forests = state.forests;
  let logistics = state.logistics;
  let pricing = state.pricing;

  for (const ev of risk.events) {
    if (random() > ev.probabilityPerPeriod) continue;
    const mult = ev.capacityMultiplier ?? 1;
    const priceMult = ev.priceMultiplier ?? 1;

    for (const id of ev.affectedIds) {
      const forest = state.forests.find((f) => f.id === id);
      if (forest) {
        forests = replace(forests, id, (f) => ({
          ...f,
          harvestCap: f.harvestCap * mult,
        }));
      }
      const hub = state.logistics.find((h) => h.id === id);
      if (hub) {
        logistics = replace(logistics, id, (h) => ({
          ...h,
          capacityPerDay: Math.max(0, h.capacityPerDay * mult),
        }));
      }
      if (priceMult !== 1 && pricing.length) {
        pricing = pricing.map((p) => ({ ...p, pricePerUnit: p.pricePerUnit * priceMult }));
      }
    }
  }

  return { ...state, forests, logistics, pricing };
}

// ─── 2. harvestForest ─────────────────────────────────────────────────────

export function harvestForest(state: SimulationState): SimulationState {
  const forests = state.forests.map((f) => {
    const totalStock = Object.values(f.stock).reduce((a, b) => a + b, 0);
    const harvest = Math.min(f.harvestCap - f.harvestUsed, totalStock * 0.1);
    const harvested = Math.max(0, harvest);
    const newStock = { ...f.stock } as Record<string, number>;
    for (const g of Object.keys(newStock)) {
      newStock[g] = Math.max(0, (newStock[g] ?? 0) - harvested / 3);
    }
    return {
      ...f,
      stock: newStock as ForestPlot['stock'],
      harvestUsed: f.harvestUsed + harvested,
    };
  });
  return { ...state, forests };
}

// ─── 3. transportRawMaterial ───────────────────────────────────────────────

export function transportRawMaterial(state: SimulationState): SimulationState {
  const logistics = state.logistics.map((h) => {
    const capacity = h.capacityPerDay;
    const currentFlow = Math.min(h.flow + (h.inTransit?.[0] ?? 0), capacity);
    const inTransit = [...(h.inTransit || [])];
    if (inTransit.length > 0) inTransit.shift();
    inTransit.push(currentFlow);
    return { ...h, flow: currentFlow, inTransit };
  });
  return { ...state, logistics };
}

// ─── 4. processSawmillStages ───────────────────────────────────────────────

export function processSawmillStages(state: SimulationState): SimulationState {
  const sawmills = state.sawmills.map((s) => {
    const capS = s.stageCapacity.sawing * s.stageEfficiency.sawing;
    const capD = s.stageCapacity.drying * s.stageEfficiency.drying;
    const capP = s.stageCapacity.processing * s.stageEfficiency.processing;
    const effective = Math.min(capS, capD, capP);
    const out = effective * (1 - s.wasteShare);
    return {
      ...s,
      stageThroughput: { sawing: effective, drying: effective, processing: effective },
      throughput: out,
    };
  });
  return { ...state, sawmills };
}

// ─── 5. updateStageQueues ──────────────────────────────────────────────────

export function updateStageQueues(state: SimulationState): SimulationState {
  const sawmills = state.sawmills.map((s) => {
    const qS = s.stageQueue?.afterSawing ?? 0;
    const qD = s.stageQueue?.afterDrying ?? 0;
    const moveToDrying = Math.min(qS, s.stageCapacity.drying);
    const moveToProc = Math.min(qD, s.stageCapacity.processing);
    return {
      ...s,
      stageQueue: {
        afterSawing: qS - moveToDrying + s.stageThroughput.sawing,
        afterDrying: qD - moveToProc + moveToDrying,
      },
    };
  });
  return { ...state, sawmills };
}

// ─── 6. moveMaterialFlows ──────────────────────────────────────────────────

export function moveMaterialFlows(state: SimulationState): SimulationState {
  // Simplified: flows are already reflected in logistics.flow; inventories updated in updateInventories
  return state;
}

// ─── 7. updateInventories ───────────────────────────────────────────────────

export function updateInventories(state: SimulationState): SimulationState {
  const inventories = state.inventories.map((inv) => {
    const stateNode = [...state.sawmills, ...state.furniture, ...state.stores].find((n) => n.id === inv.nodeId);
    const incoming = stateNode && 'throughput' in stateNode ? (stateNode as Sawmill).throughput * 0.1 : 0;
    const outgoing = Math.min(inv.current * 0.2, inv.current);
    const current = Math.min(inv.capacity, Math.max(0, inv.current + incoming - outgoing));
    return { ...inv, current };
  });
  return { ...state, inventories };
}

// ─── 8. produceFurniture ───────────────────────────────────────────────────

export function produceFurniture(state: SimulationState): SimulationState {
  const furniture = state.furniture.map((f) => {
    const produced = Math.min(f.capacityPerDay, f.demandBacklog);
    return {
      ...f,
      throughput: produced,
      demandBacklog: Math.max(0, f.demandBacklog - produced),
    };
  });
  return { ...state, furniture };
}

// ─── 9. deliverToStores ───────────────────────────────────────────────────

export function deliverToStores(state: SimulationState): SimulationState {
  const stores = state.stores.map((s) => {
    const delivered = Math.min(s.demandPerDay, s.warehouseCap - s.warehouseCurrent);
    return {
      ...s,
      warehouseCurrent: Math.min(s.warehouseCap, s.warehouseCurrent + delivered),
      turnoverPerDay: delivered * (state.pricing.find((p) => p.product === 'furniture')?.pricePerUnit ?? 100),
    };
  });
  return { ...state, stores };
}

// ─── 10. updateMarketPrices ─────────────────────────────────────────────────

export function updateMarketPrices(state: SimulationState): SimulationState {
  const season = Math.sin((state.day / 365) * Math.PI * 2) * 0.1 + 1;
  const pricing = state.pricing.map((p) => ({ ...p, pricePerUnit: p.pricePerUnit * season }));
  return { ...state, pricing };
}

// ─── 11–13: metrics and bottlenecks (in metrics.ts) ────────────────────────

export function stepSimulation(state: SimulationState): { state: SimulationState; result: SimulationResult } {
  setSeed(state.day * 1000);

  let s = applyRiskEvents(state);
  s = harvestForest(s);
  s = transportRawMaterial(s);
  s = processSawmillStages(s);
  s = updateStageQueues(s);
  s = moveMaterialFlows(s);
  s = updateInventories(s);
  s = produceFurniture(s);
  s = deliverToStores(s);
  s = updateMarketPrices(s);

  const nodeMetrics = computeNodeMetrics(s);
  const networkMetrics = computeNetworkMetrics(s, nodeMetrics);
  const profitDecomposition = computeProfitDecomposition(s);
  const bottlenecks = computeBottlenecks(s, nodeMetrics);
  const utilizationMap: Record<string, number> = {};
  nodeMetrics.forEach((m) => (utilizationMap[m.nodeId] = m.capacityUtilization));

  const result: SimulationResult = {
    day: s.day,
    state: s,
    totalProfit: networkMetrics.totalProfit,
    totalThroughput: networkMetrics.totalThroughput,
    bottlenecks,
    utilizationMap,
    profitDecomposition,
    nodeMetrics,
    networkMetrics,
  };

  return { state: { ...s, day: s.day + 1 }, result };
}
