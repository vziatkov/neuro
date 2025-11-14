/**
 * clustering.ts
 *
 * Modern clustering module for Neuro Project using cosine distance and HDBSCAN-like approach.
 * Designed for high-dimensional embeddings (LLaMA/T5/BERT) and behavioral pattern analysis.
 */

import { logEmotion } from "./emotional-core";

export interface Embedding {
  id: string;
  vector: number[];
  metadata?: Record<string, unknown>;
}

export interface Cluster {
  id: number;
  label: string;
  members: Embedding[];
  centroid: number[];
  description?: string;
  metadata?: {
    difficulty?: "low" | "mid" | "high";
    typicalErrors?: string[];
    nextStepRecommendation?: string;
  };
}

export interface ClusteringResult {
  clusters: Cluster[];
  outliers: Embedding[];
  metrics: {
    silhouette?: number;
    daviesBouldin?: number;
    calinskiHarabasz?: number;
  };
}

/**
 * Compute cosine similarity between two vectors
 */
export function cosineSimilarity(a: number[], b: number[]): number {
  if (a.length !== b.length) {
    throw new Error("Vectors must have the same length");
  }

  let dotProduct = 0;
  let normA = 0;
  let normB = 0;

  for (let i = 0; i < a.length; i++) {
    dotProduct += a[i] * b[i];
    normA += a[i] * a[i];
    normB += b[i] * b[i];
  }

  const denominator = Math.sqrt(normA) * Math.sqrt(normB);
  if (denominator === 0) {
    return 0;
  }

  return dotProduct / denominator;
}

/**
 * Compute cosine distance (1 - cosine similarity)
 */
export function cosineDistance(a: number[], b: number[]): number {
  return 1 - cosineSimilarity(a, b);
}

/**
 * Compute distance matrix using cosine distance
 */
export function computeDistanceMatrix(embeddings: Embedding[]): number[][] {
  const n = embeddings.length;
  const matrix: number[][] = Array(n)
    .fill(0)
    .map(() => Array(n).fill(0));

  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      const distance = cosineDistance(embeddings[i].vector, embeddings[j].vector);
      matrix[i][j] = distance;
      matrix[j][i] = distance;
    }
  }

  return matrix;
}

/**
 * Compute centroid (mean) of embeddings
 */
function computeCentroid(embeddings: Embedding[]): number[] {
  if (embeddings.length === 0) {
    throw new Error("Cannot compute centroid of empty cluster");
  }

  const dim = embeddings[0].vector.length;
  const centroid = Array(dim).fill(0);

  for (const emb of embeddings) {
    for (let i = 0; i < dim; i++) {
      centroid[i] += emb.vector[i];
    }
  }

  for (let i = 0; i < dim; i++) {
    centroid[i] /= embeddings.length;
  }

  return centroid;
}

/**
 * Find medoid (most representative point) in cluster
 */
function findMedoid(embeddings: Embedding[]): Embedding {
  if (embeddings.length === 0) {
    throw new Error("Cannot find medoid of empty cluster");
  }

  if (embeddings.length === 1) {
    return embeddings[0];
  }

  const distances = computeDistanceMatrix(embeddings);
  let minSum = Infinity;
  let medoidIndex = 0;

  for (let i = 0; i < embeddings.length; i++) {
    const sum = distances[i].reduce((a, b) => a + b, 0);
    if (sum < minSum) {
      minSum = sum;
      medoidIndex = i;
    }
  }

  return embeddings[medoidIndex];
}

/**
 * Simplified HDBSCAN-like clustering using cosine distance
 * 
 * This is a simplified implementation. For production, consider using
 * a proper HDBSCAN library (e.g., via Python bridge or JS implementation).
 */
export function clusterEmbeddings(
  embeddings: Embedding[],
  options: {
    minClusterSize?: number;
    minSamples?: number;
    distanceThreshold?: number;
  } = {}
): ClusteringResult {
  const { minClusterSize = 5, minSamples = 3, distanceThreshold = 0.3 } = options;

  if (embeddings.length < minClusterSize) {
    return {
      clusters: [],
      outliers: [...embeddings],
      metrics: {},
    };
  }

  const distanceMatrix = computeDistanceMatrix(embeddings);
  const clusters: Cluster[] = [];
  const processed = new Set<number>();
  const outliers: Embedding[] = [];

  // Simple density-based clustering (simplified DBSCAN)
  for (let i = 0; i < embeddings.length; i++) {
    if (processed.has(i)) {
      continue;
    }

    // Find neighbors within threshold
    const neighbors: number[] = [];
    for (let j = 0; j < embeddings.length; j++) {
      if (i !== j && distanceMatrix[i][j] <= distanceThreshold) {
        neighbors.push(j);
      }
    }

    // If enough neighbors, form a cluster
    if (neighbors.length >= minSamples) {
      const clusterMembers: number[] = [i, ...neighbors];
      const expanded = expandCluster(clusterMembers, distanceMatrix, distanceThreshold, minSamples);

      if (expanded.length >= minClusterSize) {
        const clusterEmbeddings = expanded.map((idx) => embeddings[idx]);
        const centroid = computeCentroid(clusterEmbeddings);
        const medoid = findMedoid(clusterEmbeddings);

        clusters.push({
          id: clusters.length,
          label: `cluster_${clusters.length}`,
          members: clusterEmbeddings,
          centroid,
          metadata: {
            medoidId: medoid.id,
          },
        });

        expanded.forEach((idx) => processed.add(idx));
      }
    }
  }

  // Collect outliers
  for (let i = 0; i < embeddings.length; i++) {
    if (!processed.has(i)) {
      outliers.push(embeddings[i]);
    }
  }

  // Compute metrics
  const metrics = computeClusteringMetrics(clusters, distanceMatrix);

  logEmotion({
    timestamp: Date.now(),
    source: "clustering",
    emotion: "curiosity",
    strength: 0.7,
    meta: {
      clustersFound: clusters.length,
      outliersFound: outliers.length,
      totalEmbeddings: embeddings.length,
      metrics,
    },
  });

  return {
    clusters,
    outliers,
    metrics,
  };
}

/**
 * Expand cluster by adding density-reachable points
 */
function expandCluster(
  seeds: number[],
  distanceMatrix: number[][],
  threshold: number,
  minSamples: number
): number[] {
  const cluster: number[] = [...seeds];
  const queue: number[] = [...seeds];
  const visited = new Set(seeds);

  while (queue.length > 0) {
    const current = queue.shift()!;

    for (let i = 0; i < distanceMatrix.length; i++) {
      if (visited.has(i)) {
        continue;
      }

      if (distanceMatrix[current][i] <= threshold) {
        visited.add(i);
        cluster.push(i);

        // Check if this point has enough neighbors to be a core point
        let neighborCount = 0;
        for (let j = 0; j < distanceMatrix.length; j++) {
          if (i !== j && distanceMatrix[i][j] <= threshold) {
            neighborCount++;
          }
        }

        if (neighborCount >= minSamples) {
          queue.push(i);
        }
      }
    }
  }

  return cluster;
}

/**
 * Compute clustering quality metrics
 */
function computeClusteringMetrics(
  clusters: Cluster[],
  distanceMatrix: number[][]
): ClusteringResult["metrics"] {
  if (clusters.length === 0) {
    return {};
  }

  // Simplified silhouette score (average)
  let silhouetteSum = 0;
  let count = 0;

  for (const cluster of clusters) {
    for (const member of cluster.members) {
      const memberIdx = cluster.members.indexOf(member);
      if (memberIdx === -1) continue;

      // Average distance to other points in cluster
      let intraClusterDist = 0;
      let intraCount = 0;
      for (const other of cluster.members) {
        const otherIdx = cluster.members.indexOf(other);
        if (memberIdx !== otherIdx) {
          intraClusterDist += distanceMatrix[memberIdx][otherIdx];
          intraCount++;
        }
      }
      const a = intraCount > 0 ? intraClusterDist / intraCount : 0;

      // Average distance to nearest other cluster
      let minInterClusterDist = Infinity;
      for (const otherCluster of clusters) {
        if (otherCluster.id === cluster.id) continue;

        let interDist = 0;
        let interCount = 0;
        for (const other of otherCluster.members) {
          interDist += distanceMatrix[memberIdx][otherCluster.members.indexOf(other)];
          interCount++;
        }
        const avgInter = interCount > 0 ? interDist / interCount : Infinity;
        minInterClusterDist = Math.min(minInterClusterDist, avgInter);
      }

      const b = minInterClusterDist;
      const silhouette = b > a ? (b - a) / Math.max(a, b) : 0;
      silhouetteSum += silhouette;
      count++;
    }
  }

  return {
    silhouette: count > 0 ? silhouetteSum / count : 0,
  };
}

/**
 * Find cluster for a new embedding
 */
export function findClusterForEmbedding(
  embedding: Embedding,
  clusters: Cluster[]
): { cluster: Cluster | null; distance: number } {
  if (clusters.length === 0) {
    return { cluster: null, distance: Infinity };
  }

  let minDistance = Infinity;
  let nearestCluster: Cluster | null = null;

  for (const cluster of clusters) {
    const distance = cosineDistance(embedding.vector, cluster.centroid);
    if (distance < minDistance) {
      minDistance = distance;
      nearestCluster = cluster;
    }
  }

  return {
    cluster: nearestCluster,
    distance: minDistance,
  };
}

/**
 * Generate description for cluster using AI summary (placeholder)
 */
export function generateClusterDescription(cluster: Cluster): string {
  // In production, this would call an LLM to summarize the cluster
  // For now, return a simple description based on metadata
  const size = cluster.members.length;
  const difficulty = cluster.metadata?.difficulty || "unknown";
  return `Cluster with ${size} members, difficulty: ${difficulty}`;
}

