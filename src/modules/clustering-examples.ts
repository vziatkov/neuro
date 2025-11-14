/**
 * clustering-examples.ts
 *
 * Examples of using clustering module with Neuro Project modules:
 * - Biometric data clustering
 * - Swarm impulse pattern clustering
 * - Emotional log clustering
 * - Game behavior clustering
 */

import { clusterEmbeddings, findClusterForEmbedding, type Embedding, type Cluster } from "./clustering";
import { getEmotionalBuffer } from "./emotional-core";

/**
 * Example 1: Cluster biometric patterns
 * 
 * Convert biometric time series into embeddings and cluster them
 */
export function clusterBiometricPatterns(
  biometricData: Array<{
    id: string;
    heartRate: number[];
    breathDepth: number[];
    stressLevel: number[];
    timestamp: number;
  }>
): Cluster[] {
  // Convert time series to embeddings (simplified - in production use proper embeddings)
  const embeddings: Embedding[] = biometricData.map((data) => {
    // Simple feature extraction: mean, std, trend
    const hrMean = data.heartRate.reduce((a, b) => a + b, 0) / data.heartRate.length;
    const hrStd = Math.sqrt(
      data.heartRate.reduce((sum, val) => sum + Math.pow(val - hrMean, 2), 0) / data.heartRate.length
    );
    const hrTrend = data.heartRate[data.heartRate.length - 1] - data.heartRate[0];

    const breathMean = data.breathDepth.reduce((a, b) => a + b, 0) / data.breathDepth.length;
    const stressMean = data.stressLevel.reduce((a, b) => a + b, 0) / data.stressLevel.length;

    // Create embedding vector (in production, use proper embedding model)
    const vector = [hrMean, hrStd, hrTrend, breathMean, stressMean];

    return {
      id: data.id,
      vector,
      metadata: {
        timestamp: data.timestamp,
        type: "biometric",
      },
    };
  });

  const result = clusterEmbeddings(embeddings, {
    minClusterSize: 3,
    minSamples: 2,
    distanceThreshold: 0.4,
  });

  // Enrich clusters with biometric-specific metadata
  return result.clusters.map((cluster) => ({
    ...cluster,
    metadata: {
      ...cluster.metadata,
      difficulty: determineBiometricDifficulty(cluster),
      description: `Biometric pattern: ${cluster.members.length} similar sessions`,
    },
  }));
}

function determineBiometricDifficulty(cluster: Cluster): "low" | "mid" | "high" {
  // Analyze cluster centroid to determine difficulty/stress level
  const avgStress = cluster.centroid[4] || 0; // Assuming stress is 5th dimension
  if (avgStress < 0.3) return "low";
  if (avgStress < 0.7) return "mid";
  return "high";
}

/**
 * Example 2: Cluster emotional log patterns
 * 
 * Cluster emotional states from emotional-core logs
 */
export function clusterEmotionalPatterns(): Cluster[] {
  const logs = getEmotionalBuffer();

  if (logs.length === 0) {
    return [];
  }

  // Convert emotional logs to embeddings
  const embeddings: Embedding[] = logs.map((log, idx) => {
    // Simple embedding: emotion strength, time since start, emotion type encoding
    const emotionEncoding = {
      anticipation: 0.1,
      trust: 0.2,
      focus: 0.3,
      gratitude: 0.4,
      curiosity: 0.5,
      panic: 0.6,
      calm: 0.7,
    }[log.emotion] || 0.0;

    const timeNormalized = (log.timestamp - logs[0].timestamp) / (1000 * 60); // minutes

    const vector = [log.strength, emotionEncoding, timeNormalized];

    return {
      id: `emotion_${idx}`,
      vector,
      metadata: {
        ...log.meta,
        source: log.source,
        emotion: log.emotion,
      },
    };
  });

  const result = clusterEmbeddings(embeddings, {
    minClusterSize: 2,
    minSamples: 1,
    distanceThreshold: 0.5,
  });

  return result.clusters.map((cluster) => ({
    ...cluster,
    label: `emotional_${cluster.label}`,
    metadata: {
      ...cluster.metadata,
      description: `Emotional pattern: ${cluster.members.length} similar states`,
    },
  }));
}

/**
 * Example 3: Cluster game behavior patterns
 * 
 * Cluster player actions and game states
 */
export function clusterGameBehavior(
  gameSessions: Array<{
    id: string;
    actions: Array<{ type: string; timestamp: number; result: string }>;
    difficulty: number;
    completionTime: number;
  }>
): Cluster[] {
  const embeddings: Embedding[] = gameSessions.map((session) => {
    // Extract features from game session
    const actionTypes = session.actions.map((a) => a.type);
    const actionFrequency = countFrequency(actionTypes);
    const successRate = session.actions.filter((a) => a.result === "success").length / session.actions.length;
    const avgTimeBetweenActions =
      session.actions.length > 1
        ? (session.actions[session.actions.length - 1].timestamp - session.actions[0].timestamp) /
          (session.actions.length - 1)
        : 0;

    // Create embedding (in production, use proper game state embedding)
    const vector = [
      session.difficulty,
      successRate,
      avgTimeBetweenActions,
      actionFrequency.get("click") || 0,
      actionFrequency.get("drag") || 0,
      actionFrequency.get("pause") || 0,
      session.completionTime,
    ];

    return {
      id: session.id,
      vector,
      metadata: {
        type: "game_session",
        difficulty: session.difficulty,
      },
    };
  });

  const result = clusterEmbeddings(embeddings, {
    minClusterSize: 3,
    minSamples: 2,
    distanceThreshold: 0.35,
  });

  return result.clusters.map((cluster) => ({
    ...cluster,
    label: `game_behavior_${cluster.label}`,
    metadata: {
      ...cluster.metadata,
      difficulty: determineGameDifficulty(cluster),
      description: `Game behavior pattern: ${cluster.members.length} similar sessions`,
      nextStepRecommendation: recommendNextStep(cluster),
    },
  }));
}

function countFrequency<T>(items: T[]): Map<T, number> {
  const freq = new Map<T, number>();
  for (const item of items) {
    freq.set(item, (freq.get(item) || 0) + 1);
  }
  return freq;
}

function determineGameDifficulty(cluster: Cluster): "low" | "mid" | "high" {
  const avgDifficulty = cluster.centroid[0] || 0;
  if (avgDifficulty < 0.33) return "low";
  if (avgDifficulty < 0.67) return "mid";
  return "high";
}

function recommendNextStep(cluster: Cluster): string {
  const difficulty = determineGameDifficulty(cluster);
  const successRate = cluster.centroid[1] || 0;

  if (successRate > 0.8 && difficulty === "low") {
    return "Increase difficulty";
  }
  if (successRate < 0.5 && difficulty === "high") {
    return "Decrease difficulty or provide hints";
  }
  return "Maintain current difficulty";
}

/**
 * Example 4: Find similar pattern for new data point
 */
export function findSimilarPattern(
  newEmbedding: Embedding,
  existingClusters: Cluster[]
): { cluster: Cluster | null; similarity: number; recommendation: string } {
  const { cluster, distance } = findClusterForEmbedding(newEmbedding, existingClusters);

  if (!cluster) {
    return {
      cluster: null,
      similarity: 0,
      recommendation: "No similar pattern found - this is a new behavior",
    };
  }

  const similarity = 1 - distance; // Convert distance to similarity

  let recommendation = "Continue current approach";
  if (similarity < 0.5) {
    recommendation = "This pattern is somewhat different - monitor closely";
  }
  if (cluster.metadata?.nextStepRecommendation) {
    recommendation = cluster.metadata.nextStepRecommendation;
  }

  return {
    cluster,
    similarity,
    recommendation,
  };
}

