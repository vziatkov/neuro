/**
 * weatherClustering.playground.ts
 * 
 * Версия для TypeScript Playground: https://www.typescriptlang.org/play/
 * 
 * Объектно-ориентированная кластеризация ансамблевых прогнозов погоды.
 * Выделяет объекты (области осадков) из каждого члена ансамбля и группирует
 * похожие объекты в сценарии с помощью K-Means кластеризации.
 */

// === Типы данных ===

type Grid = {
  width: number;
  height: number;
  // field[y][x]
  field: number[][];
};

type Cell = { x: number; y: number };

type WeatherObject = {
  id: number;
  memberIndex: number; // из какого члена ансамбля
  cells: Cell[];
  // простые признаки
  area: number;
  meanValue: number;
  maxValue: number;
  centroidX: number;
  centroidY: number;
};

type ClusterResult = {
  centroids: number[][];
  assignments: number[]; // индекс кластера для каждого объекта
  metrics?: {
    silhouette: number;
    inertia: number; // сумма квадратов расстояний до центроидов
  };
};

type NormalizationStats = {
  mean: number[];
  std: number[];
};

// === 1. Выделение объектов по порогу и связным компонентам ===

/**
 * Простая пороговая маска
 */
function thresholdField(grid: Grid, threshold: number): boolean[][] {
  const mask: boolean[][] = [];
  for (let y = 0; y < grid.height; y++) {
    mask[y] = [];
    for (let x = 0; x < grid.width; x++) {
      mask[y][x] = grid.field[y][x] >= threshold;
    }
  }
  return mask;
}

/**
 * Поиск связных компонент (4-соседство) с оптимизированным BFS
 */
function findConnectedComponents(mask: boolean[][]): Cell[][] {
  const height = mask.length;
  const width = mask[0]?.length ?? 0;
  if (width === 0) return [];

  const visited: boolean[][] = Array.from({ length: height }, () =>
    Array.from({ length: width }, () => false)
  );

  const components: Cell[][] = [];

  const dirs = [
    { x: 1, y: 0 },
    { x: -1, y: 0 },
    { x: 0, y: 1 },
    { x: 0, y: -1 },
  ];

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      if (!mask[y][x] || visited[y][x]) continue;

      // Оптимизированный BFS с использованием индексов вместо shift()
      const queue: Cell[] = [{ x, y }];
      let queueIndex = 0;
      visited[y][x] = true;
      const component: Cell[] = [];

      while (queueIndex < queue.length) {
        const cell = queue[queueIndex++];
        component.push(cell);

        for (const d of dirs) {
          const nx = cell.x + d.x;
          const ny = cell.y + d.y;
          if (
            nx >= 0 &&
            nx < width &&
            ny >= 0 &&
            ny < height &&
            !visited[ny][nx] &&
            mask[ny][nx]
          ) {
            visited[ny][nx] = true;
            queue.push({ x: nx, y: ny });
          }
        }
      }

      if (component.length > 0) components.push(component);
    }
  }

  return components;
}

// === 2. Фичи объекта ===

/**
 * Вычисление признаков объекта (площадь, среднее, максимум, центроид)
 */
function computeObjectFeatures(
  cells: Cell[],
  grid: Grid
): Omit<WeatherObject, "id" | "memberIndex" | "cells"> {
  if (cells.length === 0) {
    throw new Error("Cannot compute features for empty cell array");
  }

  let sumValue = 0;
  let maxValue = -Infinity;
  let sumX = 0;
  let sumY = 0;

  for (const c of cells) {
    const v = grid.field[c.y][c.x];
    sumValue += v;
    if (v > maxValue) maxValue = v;
    sumX += c.x;
    sumY += c.y;
  }

  const area = cells.length;
  const meanValue = sumValue / area;
  const centroidX = sumX / area;
  const centroidY = sumY / area;

  return {
    area,
    meanValue,
    maxValue,
    centroidX,
    centroidY,
  };
}

// === 3. Нормализация признаков ===

/**
 * Вычисление статистики для нормализации (mean и std)
 */
function computeNormalizationStats(
  featureVectors: number[][]
): NormalizationStats {
  if (featureVectors.length === 0) {
    throw new Error("Cannot compute stats for empty feature vectors");
  }

  const dim = featureVectors[0].length;
  const mean = new Array(dim).fill(0);
  const std = new Array(dim).fill(0);

  // Вычисляем среднее
  for (const vec of featureVectors) {
    for (let d = 0; d < dim; d++) {
      mean[d] += vec[d];
    }
  }
  for (let d = 0; d < dim; d++) {
    mean[d] /= featureVectors.length;
  }

  // Вычисляем стандартное отклонение
  for (const vec of featureVectors) {
    for (let d = 0; d < dim; d++) {
      const diff = vec[d] - mean[d];
      std[d] += diff * diff;
    }
  }
  for (let d = 0; d < dim; d++) {
    std[d] = Math.sqrt(std[d] / featureVectors.length);
    // Защита от деления на ноль
    if (std[d] < 1e-10) std[d] = 1;
  }

  return { mean, std };
}

/**
 * Нормализация признаков (z-score normalization)
 */
function normalizeFeatures(
  featureVectors: number[][],
  stats?: NormalizationStats
): { normalized: number[][]; stats: NormalizationStats } {
  if (featureVectors.length === 0) {
    return { normalized: [], stats: { mean: [], std: [] } };
  }

  const computedStats = stats || computeNormalizationStats(featureVectors);
  const normalized: number[][] = [];

  for (const vec of featureVectors) {
    const normVec: number[] = [];
    for (let d = 0; d < vec.length; d++) {
      normVec[d] = (vec[d] - computedStats.mean[d]) / computedStats.std[d];
    }
    normalized.push(normVec);
  }

  return { normalized, stats: computedStats };
}

/**
 * Денормализация (для обратного преобразования центроидов)
 */
function denormalizeFeatures(
  normalizedVectors: number[][],
  stats: NormalizationStats
): number[][] {
  return normalizedVectors.map((vec) =>
    vec.map((val, d) => val * stats.std[d] + stats.mean[d])
  );
}

// === 4. K-Means с улучшениями ===

/**
 * Евклидово расстояние
 */
function euclideanDistance(a: number[], b: number[]): number {
  if (a.length !== b.length) {
    throw new Error("Vectors must have the same dimension");
  }
  let sum = 0;
  for (let i = 0; i < a.length; i++) {
    const d = a[i] - b[i];
    sum += d * d;
  }
  return Math.sqrt(sum);
}

/**
 * k-means++ инициализация центроидов
 * Выбирает начальные центроиды так, чтобы они были далеко друг от друга
 */
function kMeansPlusPlusInit(
  points: number[][],
  k: number
): number[][] {
  if (points.length === 0 || k === 0) return [];
  if (k >= points.length) {
    return points.map((p) => [...p]);
  }

  const centroids: number[][] = [];
  const n = points.length;

  // Первый центроид выбираем случайно
  const firstIdx = Math.floor(Math.random() * n);
  centroids.push([...points[firstIdx]]);

  // Остальные k-1 центроидов выбираем с вероятностью пропорциональной расстоянию
  for (let c = 1; c < k; c++) {
    const distances: number[] = [];
    let sumDistances = 0;

    for (let i = 0; i < n; i++) {
      // Минимальное расстояние до уже выбранных центроидов
      let minDist = Infinity;
      for (const centroid of centroids) {
        const dist = euclideanDistance(points[i], centroid);
        if (dist < minDist) minDist = dist;
      }
      const distSq = minDist * minDist; // квадрат расстояния для вероятности
      distances.push(distSq);
      sumDistances += distSq;
    }

    // Выбираем точку с вероятностью пропорциональной квадрату расстояния
    let r = Math.random() * sumDistances;
    let selectedIdx = 0;
    for (let i = 0; i < n; i++) {
      r -= distances[i];
      if (r <= 0) {
        selectedIdx = i;
        break;
      }
    }

    centroids.push([...points[selectedIdx]]);
  }

  return centroids;
}

/**
 * K-Means кластеризация с улучшенной инициализацией
 */
function kMeans(
  points: number[][],
  k: number,
  maxIterations = 50,
  useKMeansPlusPlus = true
): ClusterResult {
  if (points.length === 0) {
    return { centroids: [], assignments: [] };
  }

  if (k <= 0) {
    throw new Error("k must be positive");
  }

  if (k > points.length) {
    console.warn(
      `k (${k}) is greater than number of points (${points.length}), using k=${points.length}`
    );
    k = points.length;
  }

  // Инициализация: k-means++ или первые k точек
  const centroids: number[][] = useKMeansPlusPlus
    ? kMeansPlusPlusInit(points, k)
    : points.slice(0, k).map((p) => [...p]);

  const assignments = new Array(points.length).fill(0);
  const dim = points[0].length;

  for (let it = 0; it < maxIterations; it++) {
    let changed = false;

    // Шаг E: назначить точки ближайшему центроиду
    for (let i = 0; i < points.length; i++) {
      let bestIdx = 0;
      let bestDist = Infinity;

      for (let c = 0; c < k; c++) {
        const dist = euclideanDistance(points[i], centroids[c]);
        if (dist < bestDist) {
          bestDist = dist;
          bestIdx = c;
        }
      }

      if (assignments[i] !== bestIdx) {
        assignments[i] = bestIdx;
        changed = true;
      }
    }

    // Если ничего не поменялось — сошлось
    if (!changed) break;

    // Шаг M: пересчитать центроиды
    const newCentroids: number[][] = Array.from({ length: k }, () =>
      Array.from({ length: dim }, () => 0)
    );
    const counts = new Array(k).fill(0);

    for (let i = 0; i < points.length; i++) {
      const cluster = assignments[i];
      counts[cluster]++;
      for (let d = 0; d < dim; d++) {
        newCentroids[cluster][d] += points[i][d];
      }
    }

    // Обработка пустых кластеров
    for (let c = 0; c < k; c++) {
      if (counts[c] === 0) {
        // Если кластер пустой — реинициализируем случайной точкой
        const randomIdx = Math.floor(Math.random() * points.length);
        newCentroids[c] = [...points[randomIdx]];
      } else {
        for (let d = 0; d < dim; d++) {
          newCentroids[c][d] /= counts[c];
        }
      }
    }

    for (let c = 0; c < k; c++) {
      centroids[c] = newCentroids[c];
    }
  }

  // Вычисляем метрики качества
  let inertia = 0;
  for (let i = 0; i < points.length; i++) {
    const dist = euclideanDistance(points[i], centroids[assignments[i]]);
    inertia += dist * dist;
  }

  const silhouette = computeSilhouetteScore(points, assignments, k);

  return { centroids, assignments, metrics: { silhouette, inertia } };
}

/**
 * Вычисление silhouette score для оценки качества кластеризации
 * Значение от -1 до 1: чем ближе к 1, тем лучше кластеризация
 */
function computeSilhouetteScore(
  points: number[][],
  assignments: number[],
  k: number
): number {
  if (points.length === 0) return 0;
  if (k === 1) return 0; // Для одного кластера silhouette не определен

  const n = points.length;
  let totalSilhouette = 0;

  for (let i = 0; i < n; i++) {
    const clusterI = assignments[i];

    // a(i): среднее расстояние до других точек в том же кластере
    let a = 0;
    let countA = 0;
    for (let j = 0; j < n; j++) {
      if (i !== j && assignments[j] === clusterI) {
        a += euclideanDistance(points[i], points[j]);
        countA++;
      }
    }
    a = countA > 0 ? a / countA : 0;

    // b(i): минимальное среднее расстояние до точек в других кластерах
    let b = Infinity;
    for (let c = 0; c < k; c++) {
      if (c === clusterI) continue;

      let avgDist = 0;
      let countB = 0;
      for (let j = 0; j < n; j++) {
        if (assignments[j] === c) {
          avgDist += euclideanDistance(points[i], points[j]);
          countB++;
        }
      }
      if (countB > 0) {
        avgDist /= countB;
        if (avgDist < b) b = avgDist;
      }
    }

    // silhouette для точки i
    const s = b === Infinity ? 0 : (b - a) / Math.max(a, b);
    totalSilhouette += s;
  }

  return totalSilhouette / n;
}

// === 5. Работа с ансамблем ===

/**
 * Генерация игрушечного поля осадков для демонстрации
 */
function createRandomGrid(width: number, height: number): Grid {
  const field: number[][] = [];
  for (let y = 0; y < height; y++) {
    field[y] = [];
    for (let x = 0; x < width; x++) {
      // немного шума + пара "очагов"
      const base = Math.random() * 5;
      const bump1 =
        Math.exp(-((x - 5) ** 2 + (y - 5) ** 2) / 10) * (5 + Math.random() * 5);
      const bump2 =
        Math.exp(-((x - 12) ** 2 + (y - 8) ** 2) / 12) *
        (4 + Math.random() * 4);
      field[y][x] = base + bump1 + bump2;
    }
  }
  return { width, height, field };
}

/**
 * Собираем объекты для всего ансамбля
 */
function extractObjectsFromEnsemble(
  grids: Grid[],
  threshold: number
): WeatherObject[] {
  const allObjects: WeatherObject[] = [];
  let globalId = 0;

  grids.forEach((grid, memberIndex) => {
    const mask = thresholdField(grid, threshold);
    const components = findConnectedComponents(mask);

    for (const cells of components) {
      // Пропускаем слишком маленькие объекты (шум)
      if (cells.length < 2) continue;

      const feats = computeObjectFeatures(cells, grid);
      allObjects.push({
        id: globalId++,
        memberIndex,
        cells,
        ...feats,
      });
    }
  });

  return allObjects;
}

/**
 * Основная функция кластеризации ансамбля
 */
function clusterEnsembleObjects(
  objects: WeatherObject[],
  k: number,
  shouldNormalize = true,
  useKMeansPlusPlus = true
): {
  clusters: WeatherObject[][];
  result: ClusterResult;
  normalizedStats?: NormalizationStats;
} {
  if (objects.length === 0) {
    return {
      clusters: [],
      result: { centroids: [], assignments: [] },
    };
  }

  // Вектор признаков: [centroidX, centroidY, area, meanValue, maxValue]
  const featureVectors: number[][] = objects.map((o) => [
    o.centroidX,
    o.centroidY,
    o.area,
    o.meanValue,
    o.maxValue,
  ]);

  // Нормализация признаков
  let normalizedVectors = featureVectors;
  let stats: NormalizationStats | undefined;
  if (shouldNormalize) {
    const normalized = normalizeFeatures(featureVectors);
    normalizedVectors = normalized.normalized;
    stats = normalized.stats;
  }

  // Кластеризация
  const result = kMeans(normalizedVectors, k, 50, useKMeansPlusPlus);

  // Группируем объекты по кластерам
  const clusters: WeatherObject[][] = Array.from({ length: k }, () => []);
  objects.forEach((obj, i) => {
    const clusterIdx = result.assignments[i];
    clusters[clusterIdx].push(obj);
  });

  return { clusters, result, normalizedStats: stats };
}

// === 6. Демонстрация ===

/**
 * Демонстрационная функция
 */
function demonstrateWeatherClustering() {
  // Представим 3 члена ансамбля прогноза
  const ensemble: Grid[] = [
    createRandomGrid(20, 15),
    createRandomGrid(20, 15),
    createRandomGrid(20, 15),
  ];

  // Порог осадков — что считаем "объектом дождя"
  const threshold = 6;

  const objects = extractObjectsFromEnsemble(ensemble, threshold);
  console.log("Всего объектов в ансамбле:", objects.length);

  if (objects.length === 0) {
    console.log("Нет объектов выше порога, попробуй уменьшить threshold.");
    return;
  }

  // Допустим, хотим 3 сценария (3 кластера объектов)
  const k = 3;
  const { clusters, result, normalizedStats } = clusterEnsembleObjects(
    objects,
    k,
    true, // нормализация
    true // k-means++
  );

  console.log("\n=== Результаты кластеризации ===");
  console.log("Центроиды кластеров (в нормализованном пространстве):");
  console.log(result.centroids);

  if (normalizedStats) {
    const denormalizedCentroids = denormalizeFeatures(
      result.centroids,
      normalizedStats
    );
    console.log("\nЦентроиды кластеров (в исходном пространстве):");
    console.log(denormalizedCentroids);
  }

  if (result.metrics) {
    console.log("\nМетрики качества:");
    console.log(`  Silhouette score: ${result.metrics.silhouette.toFixed(4)}`);
    console.log(`  Inertia: ${result.metrics.inertia.toFixed(2)}`);
  }

  clusters.forEach((cluster, idx) => {
    console.log(`\nКластер ${idx}: объекты = ${cluster.length}`);
    const members = new Set(cluster.map((o) => o.memberIndex));
    console.log(
      "  Члены ансамбля, где встречается этот сценарий:",
      [...members]
    );
    if (cluster.length > 0) {
      const avgArea =
        cluster.reduce((sum, o) => sum + o.area, 0) / cluster.length;
      const avgMeanValue =
        cluster.reduce((sum, o) => sum + o.meanValue, 0) / cluster.length;
      console.log(`  Средняя площадь: ${avgArea.toFixed(2)}`);
      console.log(`  Среднее значение: ${avgMeanValue.toFixed(2)}`);
    }
  });
}

// Автоматический запуск для Playground
demonstrateWeatherClustering();

