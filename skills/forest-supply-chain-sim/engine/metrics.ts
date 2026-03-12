/**
 * Metrics: node-level, network-level, profit decomposition, bottleneck detection.
 */

import type {
  SimulationState,
  NodeMetrics,
  NetworkMetrics,
  ProfitDecomposition,
  BottleneckReport,
  Sawmill,
} from './types';

export function computeNodeMetrics(state: SimulationState): NodeMetrics[] {
  const out: NodeMetrics[] = [];

  for (const f of state.forests) {
    const cap = f.harvestCap;
    const util = cap > 0 ? f.harvestUsed / cap : 0;
    out.push({
      nodeId: f.id,
      throughput: f.harvestUsed,
      capacityUtilization: util,
      unitCost: Object.values(f.harvestCostPerM3).reduce((a, b) => a + b, 0) / 3,
      margin: 0,
    });
  }

  for (const s of state.sawmills) {
    const cap = Math.min(
      s.stageCapacity.sawing,
      s.stageCapacity.drying,
      s.stageCapacity.processing
    );
    const util = cap > 0 ? s.throughput / cap : 0;
    out.push({
      nodeId: s.id,
      throughput: s.throughput,
      capacityUtilization: util,
      unitCost: s.operatingCostPerDay / Math.max(1, s.throughput),
      margin: 0.2,
    });
  }

  for (const x of state.furniture) {
    const util = x.capacityPerDay > 0 ? x.throughput / x.capacityPerDay : 0;
    out.push({
      nodeId: x.id,
      throughput: x.throughput,
      capacityUtilization: util,
      unitCost: x.operatingCostPerDay / Math.max(1, x.throughput),
      margin: x.margin,
    });
  }

  for (const st of state.stores) {
    const util = st.warehouseCap > 0 ? st.warehouseCurrent / st.warehouseCap : 0;
    out.push({
      nodeId: st.id,
      throughput: st.turnoverPerDay,
      capacityUtilization: util,
      unitCost: 0,
      margin: 0,
    });
  }

  return out;
}

export function computeNetworkMetrics(state: SimulationState, nodeMetrics: NodeMetrics[]): NetworkMetrics {
  let totalProfit = 0;
  let totalThroughput = 0;
  let totalCostLogistics = 0;
  let totalFlowUnits = 0;

  for (const h of state.logistics) {
    totalCostLogistics += h.flow * h.costPerUnit;
    totalFlowUnits += h.flow;
  }

  let revenue = 0;
  let costProduction = 0;
  for (const st of state.stores) {
    revenue += st.turnoverPerDay;
  }
  for (const s of state.sawmills) {
    costProduction += s.operatingCostPerDay;
    totalThroughput += s.throughput;
  }
  for (const f of state.furniture) {
    costProduction += f.operatingCostPerDay;
  }

  let costRaw = 0;
  for (const f of state.forests) {
    costRaw += f.harvestUsed * (Object.values(f.harvestCostPerM3).reduce((a, b) => a + b, 0) / 3);
  }

  let costStorage = 0;
  for (const inv of state.inventories) {
    costStorage += inv.current * inv.holdingCostPerUnitPerDay;
  }

  totalProfit = revenue - costRaw - totalCostLogistics - costProduction - costStorage;

  const utils = nodeMetrics.map((m) => m.capacityUtilization).filter((u) => Number.isFinite(u));
  const aggregateCapacityUtilization = utils.length ? utils.reduce((a, b) => a + b, 0) / utils.length : 0;
  const avgLogisticsCostPerUnit = totalFlowUnits > 0 ? totalCostLogistics / totalFlowUnits : 0;

  return {
    totalProfit,
    totalThroughput,
    avgLogisticsCostPerUnit,
    aggregateCapacityUtilization,
  };
}

export function computeProfitDecomposition(state: SimulationState): ProfitDecomposition {
  let revenue = 0;
  let costRaw = 0;
  let costLogistics = 0;
  let costProduction = 0;
  let costStorage = 0;

  for (const st of state.stores) revenue += st.turnoverPerDay;
  for (const f of state.forests) {
    costRaw += f.harvestUsed * (Object.values(f.harvestCostPerM3).reduce((a, b) => a + b, 0) / 3);
  }
  for (const h of state.logistics) costLogistics += h.flow * h.costPerUnit;
  for (const s of state.sawmills) costProduction += s.operatingCostPerDay;
  for (const f of state.furniture) costProduction += f.operatingCostPerDay;
  for (const inv of state.inventories) costStorage += inv.current * inv.holdingCostPerUnitPerDay;

  return {
    revenue,
    costRaw,
    costLogistics,
    costProduction,
    costStorage,
    profit: revenue - costRaw - costLogistics - costProduction - costStorage,
  };
}

const BOTTLENECK_UTIL_THRESHOLD = 0.9;

export function computeBottlenecks(state: SimulationState, nodeMetrics: NodeMetrics[]): BottleneckReport[] {
  const reports: BottleneckReport[] = [];

  for (const m of nodeMetrics) {
    if (m.capacityUtilization >= BOTTLENECK_UTIL_THRESHOLD) {
      reports.push({
        nodeOrEdgeId: m.nodeId,
        type: 'node',
        utilization: m.capacityUtilization,
        sensitivity: 1 - m.capacityUtilization,
        suggestion: 'Increase capacity or redistribute flow',
      });
    }
  }

  for (const h of state.logistics) {
    const util = h.capacityPerDay > 0 ? h.flow / h.capacityPerDay : 0;
    if (util >= BOTTLENECK_UTIL_THRESHOLD) {
      reports.push({
        nodeOrEdgeId: h.id,
        type: 'edge',
        utilization: util,
        suggestion: 'Add route or increase capacity',
      });
    }
  }

  for (const s of state.sawmills) {
    const q = s.stageQueue;
    if (q && (q.afterSawing > 10 || q.afterDrying > 10)) {
      reports.push({
        nodeOrEdgeId: s.id,
        type: 'node',
        utilization: 1,
        suggestion: 'Queue buildup: increase drying or processing capacity',
      });
    }
  }

  return reports;
}
