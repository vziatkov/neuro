/**
 * Apply optimization levers to state (returns new state).
 */

import type { SimulationState, OptimizationLevers } from './types.js';

export function applyOptimizationLevers(state: SimulationState, levers: OptimizationLevers): SimulationState {
  let next = { ...state, levers };

  if (levers.rawAllocation) {
    // Redistribute harvest targets per forest → sawmill (would affect transportRawMaterial inputs)
    // Here we only store levers; pipeline could read state.levers in harvestForest/transportRawMaterial
    next = { ...next, levers: { ...next.levers, rawAllocation: levers.rawAllocation } };
  }

  if (levers.factoryUtilization) {
    const sawmills = state.sawmills.map((s) => {
      const target = levers.factoryUtilization![s.id];
      if (target == null) return s;
      const scale = Math.max(0, Math.min(1, target));
      return {
        ...s,
        stageCapacity: {
          sawing: s.stageCapacity.sawing * scale,
          drying: s.stageCapacity.drying * scale,
          processing: s.stageCapacity.processing * scale,
        },
      };
    });
    next = { ...next, sawmills };
  }

  if (levers.inventoryTargets) {
    const inventories = state.inventories.map((inv) => {
      const target = levers.inventoryTargets![inv.id];
      if (target == null) return inv;
      return { ...inv, current: Math.min(inv.capacity, Math.max(0, target)) };
    });
    next = { ...next, inventories };
  }

  return next;
}
