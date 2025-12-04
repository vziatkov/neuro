# Object-Oriented Clustering of Ensemble Weather Forecasts

## Description

This module implements a modern approach to analyzing ensemble weather forecasts through object-oriented clustering. Instead of working with individual grid pixels, the algorithm extracts coherent objects (precipitation areas) and groups similar objects into scenarios.

## Problem

In meteorology, ensemble forecasts consist of multiple ensemble members (different models or different initial conditions). Each member provides its forecast as a grid of values (e.g., precipitation intensity).

**Classical approach**: averaging all ensemble members → loses information about structure and scenarios.

**Object-oriented approach**: 
1. Extract objects (precipitation areas) from each ensemble member
2. Extract features from each object
3. Cluster objects → obtain typical scenarios

## Algorithm

### Stage 1: Object Extraction

```typescript
// 1. Threshold filtering
const mask = thresholdField(grid, threshold); // threshold = 6 mm/h

// 2. Connected component search (4-neighborhood)
const components = findConnectedComponents(mask);
```

**Result**: array of objects, where each object is a connected region with values above the threshold.

### Stage 2: Feature Extraction

For each object, we compute:
- **Area** (`area`) — number of cells
- **Mean value** (`meanValue`) — average intensity
- **Maximum value** (`maxValue`) — peak intensity
- **Centroid** (`centroidX`, `centroidY`) — center of mass of the object

```typescript
const features = {
  centroidX: 10.5,
  centroidY: 7.2,
  area: 45,
  meanValue: 8.3,
  maxValue: 12.1
};
```

### Stage 3: Feature Normalization

**Problem**: features are in different scales!
- Coordinates: 0-20
- Area: 1-100+
- Values: 6-15

Without normalization, coordinates dominate in distances.

**Solution**: z-score normalization (standardization)

```typescript
normalized_value = (value - mean) / std
```

### Stage 4: K-Means Clustering

**Improvements**:
1. **k-means++ initialization** — selects initial centroids far from each other
2. **Quality metrics**:
   - **Silhouette score** (-1 to 1) — how well points are separated into clusters
   - **Inertia** — sum of squared distances to centroids

**Result**: objects grouped into k clusters (scenarios).

## Usage

### In Project

```typescript
import { 
  clusterEnsembleObjects, 
  extractObjectsFromEnsemble,
  createRandomGrid 
} from './modules/weatherClustering';

// Create ensemble of 3 forecasts
const ensemble = [
  createRandomGrid(20, 15),
  createRandomGrid(20, 15),
  createRandomGrid(20, 15),
];

// Extract objects
const objects = extractObjectsFromEnsemble(ensemble, threshold: 6);

// Cluster into 3 scenarios
const { clusters, result } = clusterEnsembleObjects(objects, k: 3);

// Result
clusters.forEach((cluster, idx) => {
  console.log(`Scenario ${idx}: ${cluster.length} objects`);
});
```

### In TypeScript Playground

1. Open [TypeScript Playground](https://www.typescriptlang.org/play/)
2. Copy all code from file `src/modules/weatherClustering.playground.ts`
3. Paste into Playground editor
4. Press "Run" or open browser console (F12)
5. Code will automatically run and output results

**Note**: Playground doesn't have a built-in console, so results should be viewed in browser console (Developer Tools → Console).

## Example Output

```
Total objects in ensemble: 12

=== Clustering Results ===
Cluster centroids (in normalized space):
[[-0.23, 0.15, 0.8, -0.1, 0.3], ...]

Cluster centroids (in original space):
[[10.2, 7.5, 45.3, 8.1, 11.2], ...]

Quality Metrics:
  Silhouette score: 0.6234
  Inertia: 12.45

Cluster 0: objects = 4
  Ensemble members where this scenario occurs: [0, 1, 2]
  Average area: 42.50
  Average value: 8.20

Cluster 1: objects = 5
  Ensemble members where this scenario occurs: [0, 2]
  Average area: 38.20
  Average value: 7.80

Cluster 2: objects = 3
  Ensemble members where this scenario occurs: [1]
  Average area: 35.00
  Average value: 7.50
```

## Interpreting Results

1. **Clusters = scenarios**: each cluster represents a typical precipitation pattern
2. **Ensemble members**: shows in which forecasts this scenario occurs
3. **Silhouette score**: 
   - > 0.5 — good clustering
   - 0.2-0.5 — average
   - < 0.2 — poor, try different k

## Parameter Selection

### Threshold (`threshold`)
- **Too low**: lots of noise, small objects
- **Too high**: miss important areas
- **Recommendation**: start with median of grid values

### Number of Clusters (`k`)
- **Too few**: merge different scenarios
- **Too many**: overfitting, each object in its own cluster
- **Recommendation**: use elbow method or silhouette score for different k

```typescript
// Finding optimal k
for (let k = 2; k <= 10; k++) {
  const { result } = clusterEnsembleObjects(objects, k);
  console.log(`k=${k}, silhouette=${result.metrics?.silhouette}`);
}
```

## Technical Details

### Optimizations

1. **BFS with indices**: instead of `queue.shift()` use index for O(1) access
2. **k-means++**: better initial approximation → fewer iterations
3. **Normalization**: correct distances in multidimensional space

### Edge Case Handling

- Empty arrays
- Division by zero in normalization
- Empty clusters (reinitialization)
- Too small objects (noise filtering)

## Comparison with Classical Approach

| Approach | Advantages | Disadvantages |
|----------|-----------|---------------|
| **Averaging** | Simplicity, speed | Structure lost, boundaries blurred |
| **Object clustering** | Preserves structure, reveals scenarios | More complex, requires tuning |

## Applications

1. **Precipitation forecast**: extraction of rain/snow zones
2. **Cyclone analysis**: trajectory tracking
3. **Extreme events**: detection of rare scenarios
4. **Uncertainty visualization**: showing different scenarios instead of one average

## References

- [Object-based verification](https://www.ecmwf.int/en/research/projects/object-based-verification) — ECMWF
- [Ensemble forecasting](https://en.wikipedia.org/wiki/Ensemble_forecasting) — Wikipedia
- [K-means clustering](https://en.wikipedia.org/wiki/K-means_clustering) — Wikipedia
- [Silhouette analysis](https://scikit-learn.org/stable/modules/clustering.html#silhouette-analysis) — scikit-learn

## Files

- `src/modules/weatherClustering.ts` — main module for project
- `src/modules/weatherClustering.playground.ts` — version for TypeScript Playground
- `docs/weather-clustering.md` — this documentation (Russian)
- `docs/weather-clustering.en.md` — this documentation (English)

