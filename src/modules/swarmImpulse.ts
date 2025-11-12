/**
 * swarmImpulse.ts
 *
 * Builds a trust-weighted impulse system for the swarm.
 * FOOD_DETECTED → explorer → wise with attenuation across weighted edges.
 */

import { logEmotion, type EmotionTag } from "./emotional-core";

export interface HybridImpulse {
  type: "HEART_RATE_SPIKE" | "FOOD_DETECTED" | "DANGER_NEAR";
  biometric: {
    bpm: number;
    stress: number;
  };
  strength: number;
  emotion: EmotionTag;
}

type TrustWeight = number; // 0.0 - 1.0

interface TrustEdge {
  target: SwarmNodeId;
  weight: TrustWeight;
}

type SwarmNodeId =
  | "scout"
  | "explorer"
  | "wise"
  | "guardian"
  | "dreamer"
  | "coward";

interface SwarmNode {
  id: SwarmNodeId;
  role: string;
  edges: TrustEdge[];
}

type ImpulseType = "FOOD_DETECTED" | "DANGER_NEAR";

interface Impulse {
  type: ImpulseType;
  strength: number; // 0..1
  origin: SwarmNodeId;
  trace: SwarmNodeId[];
  emotionTag: EmotionTag;
}

interface AtlasWavePayload {
  node: SwarmNodeId;
  color: string;
  amplitude: number;
  comment: string;
  tremor?: number;
}

const RED_WAVE_COLOR = "#FF3B30"; // Atlas visual cue — warm anticipation

const TRUST_GRAPH: Record<SwarmNodeId, SwarmNode> = {
  scout: {
    id: "scout",
    role: "sensor",
    edges: [
      { target: "explorer", weight: 0.92 },
      { target: "guardian", weight: 0.35 },
    ],
  },
  explorer: {
    id: "explorer",
    role: "pathfinder",
    edges: [
      { target: "wise", weight: 0.87 },
      { target: "dreamer", weight: 0.4 },
    ],
  },
  wise: {
    id: "wise",
    role: "strategist",
    edges: [{ target: "guardian", weight: 0.65 }],
  },
  guardian: {
    id: "guardian",
    role: "shield",
    edges: [{ target: "explorer", weight: 0.2 }],
  },
  dreamer: {
    id: "dreamer",
    role: "storyteller",
    edges: [{ target: "wise", weight: 0.3 }],
  },
  coward: {
    id: "coward",
    role: "sentinel",
    edges: [{ target: "wise", weight: 0.78 }],
  },
};

const atlasListeners: Array<(payload: AtlasWavePayload) => void> = [];

export function onAtlasWave(listener: (payload: AtlasWavePayload) => void): void {
  atlasListeners.push(listener);
}

function emitAtlasWave(payload: AtlasWavePayload): void {
  atlasListeners.forEach((listener) => listener(payload));
}

/**
 * Core propagation: FOOD_DETECTED flows scout → explorer → wise.
 */
export function triggerFoodImpulse(initialStrength = 1): void {
  const impulse: Impulse = {
    type: "FOOD_DETECTED",
    strength: clamp01(initialStrength),
    origin: "scout",
    trace: [],
    emotionTag: "anticipation",
  };

  propagateImpulse("scout", impulse);
}

export function triggerDangerImpulse(hybrid: Pick<HybridImpulse, "strength" | "biometric">): void {
  const impulse: Impulse = {
    type: "DANGER_NEAR",
    strength: clamp01(hybrid.strength),
    origin: "coward",
    trace: [],
    emotionTag: "panic",
  };

  logEmotion({
    timestamp: Date.now(),
    source: "biometric",
    emotion: "panic",
    strength: impulse.strength,
    meta: {
      impulse: impulse.type,
      bpm: hybrid.biometric.bpm,
      stress: hybrid.biometric.stress,
    },
  });

  propagateImpulse("coward", impulse, new Set());
}

function propagateImpulse(nodeId: SwarmNodeId, impulse: Impulse, visited = new Set<SwarmNodeId>()): void {
  if (visited.has(nodeId)) {
    return;
  }
  visited.add(nodeId);

  const node = TRUST_GRAPH[nodeId];
  if (!node || impulse.strength <= 0.01) {
    return;
  }

  impulse.trace.push(nodeId);

  logEmotion({
    timestamp: Date.now(),
    source: nodeId,
    emotion: impulse.emotionTag,
    strength: impulse.strength,
    meta: {
      impulse: impulse.type,
      role: node.role,
      trace: [...impulse.trace],
      color: RED_WAVE_COLOR,
    },
  });

  emitAtlasWave({
    node: nodeId,
    color: RED_WAVE_COLOR,
    amplitude: impulse.strength,
    comment: `${impulse.type} ripple`,
    tremor: impulse.type === "DANGER_NEAR" ? 0.3 : undefined,
  });

  node.edges.forEach((edge) => {
    const weightedStrength = impulse.strength * clamp01(edge.weight);
    if (weightedStrength <= 0.01) {
      return;
    }

    const nextImpulse: Impulse = {
      ...impulse,
      strength: weightedStrength,
      trace: [...impulse.trace],
    };

    propagateImpulse(edge.target, nextImpulse, visited);
  });
}

function clamp01(value: number): number {
  if (Number.isNaN(value)) {
    return 0;
  }
  return Math.max(0, Math.min(1, value));
}

/**
 * Helper to inspect the current trust graph in other modules or debug panels.
 */
export function getTrustGraph(): SwarmNode[] {
  return Object.values(TRUST_GRAPH).map((node) => ({
    ...node,
    edges: node.edges.map((edge) => ({ ...edge })),
  }));
}

