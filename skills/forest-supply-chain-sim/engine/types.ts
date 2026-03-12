/**
 * Core types for Forest Supply Chain Simulation Engine.
 * Aligned with CONCEPT_MAP.md; simplified for runnable simulation.
 */

export type WoodGrade = 'structural' | 'furniture' | 'low';
export type OutputProduct = 'lumber' | 'board' | 'chips' | 'sawdust';
export type FlowType = 'raw' | 'material' | 'waste' | 'goods';

// ─── Nodes ─────────────────────────────────────────────────────────────────

export interface ForestPlot {
  id: string;
  type: 'forest';
  stock: Record<WoodGrade, number>;
  regenRate: Record<WoodGrade, number>;
  harvestCostPerM3: Record<WoodGrade, number>;
  harvestCap: number;
  harvestUsed: number;
}

export interface Sawmill {
  id: string;
  type: 'sawmill';
  stageCapacity: { sawing: number; drying: number; processing: number };
  stageEfficiency: { sawing: number; drying: number; processing: number };
  stageThroughput: { sawing: number; drying: number; processing: number };
  stageQueue: { afterSawing: number; afterDrying: number };
  wasteShare: number;
  outputMix: Record<OutputProduct, number>;
  operatingCostPerDay: number;
  throughput: number;
}

export interface SecondaryProcessor {
  id: string;
  type: 'secondary';
  productType: string;
  capacityPerDay: number;
  inputWaste: Record<'chips' | 'sawdust', number>;
  operatingCostPerDay: number;
  throughput: number;
}

export interface FurnitureFactory {
  id: string;
  type: 'furniture';
  capacityPerDay: number;
  productType: string;
  demandBacklog: number;
  margin: number;
  operatingCostPerDay: number;
  throughput: number;
}

export interface FurnitureStore {
  id: string;
  type: 'store';
  demandPerDay: number;
  turnoverPerDay: number;
  warehouseCap: number;
  warehouseCurrent: number;
  region: string;
}

export type Node = ForestPlot | Sawmill | SecondaryProcessor | FurnitureFactory | FurnitureStore;

export interface LogisticsHub {
  id: string;
  fromNodeId: string;
  toNodeId: string;
  capacityPerDay: number;
  costPerUnit: number;
  leadTimeDays: number;
  flow: number;
  /** in-transit buffer: day index 0 = arrives today */
  inTransit: number[];
}

export interface Contract {
  id: string;
  fromNodeId: string;
  toNodeId: string;
  minVolumePerPeriod: number;
  periodDays: number;
  pricePerUnit: number;
  validFrom: number;
  validTo: number;
  volumeDelivered: number;
}

export interface Inventory {
  id: string;
  nodeId: string;
  stockType: string;
  capacity: number;
  current: number;
  holdingCostPerUnitPerDay: number;
}

export interface MarketPrice {
  product: string;
  region: string;
  pricePerUnit: number;
  t: number;
}

export interface RiskEvent {
  type: string;
  affectedIds: string[];
  probabilityPerPeriod: number;
  durationDays: number;
  capacityMultiplier?: number;
  priceMultiplier?: number;
}

export interface RiskModel {
  events: RiskEvent[];
}

export interface EnergyParams {
  pricePerUnit: number;
  dryingConsumptionPerM3: Record<string, number>;
  type: 'electricity' | 'gas';
}

export interface OptimizationLevers {
  rawAllocation?: Record<string, Record<string, number>>;
  factoryUtilization?: Record<string, number>;
  inventoryTargets?: Record<string, number>;
}

// ─── State & Result ───────────────────────────────────────────────────────

export interface SimulationState {
  day: number;
  forests: ForestPlot[];
  sawmills: Sawmill[];
  secondary: SecondaryProcessor[];
  furniture: FurnitureFactory[];
  stores: FurnitureStore[];
  logistics: LogisticsHub[];
  contracts: Contract[];
  inventories: Inventory[];
  pricing: MarketPrice[];
  riskModel?: RiskModel;
  energyParams?: EnergyParams;
  levers?: OptimizationLevers;
}

export interface NodeMetrics {
  nodeId: string;
  throughput: number;
  capacityUtilization: number;
  unitCost: number;
  margin: number;
}

export interface NetworkMetrics {
  totalProfit: number;
  totalThroughput: number;
  avgLogisticsCostPerUnit: number;
  aggregateCapacityUtilization: number;
}

export interface ProfitDecomposition {
  revenue: number;
  costRaw: number;
  costLogistics: number;
  costProduction: number;
  costStorage: number;
  profit: number;
}

export interface BottleneckReport {
  nodeOrEdgeId: string;
  type: 'node' | 'edge';
  utilization: number;
  sensitivity?: number;
  suggestion?: string;
}

export interface SimulationResult {
  day: number;
  state: SimulationState;
  totalProfit: number;
  totalThroughput: number;
  bottlenecks: BottleneckReport[];
  utilizationMap: Record<string, number>;
  profitDecomposition: ProfitDecomposition;
  nodeMetrics: NodeMetrics[];
  networkMetrics: NetworkMetrics;
}

export type SimulationMode = 'interactive' | 'monte_carlo';

export interface SimulationConfig {
  mode: SimulationMode;
  horizonDays: number;
  scenarios?: number;
  seed?: number;
}

export interface RunResult {
  results: SimulationResult[];
  /** For monte_carlo: percentiles of profit [p5, p50, p95] */
  profitPercentiles?: [number, number, number];
  throughputPercentiles?: [number, number, number];
}
