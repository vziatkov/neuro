/**
 * weatherClustering.ts
 *
 * Объектно-ориентированная кластеризация ансамблевых прогнозов погоды.
 * Выделяет объекты (области осадков) из каждого члена ансамбля и группирует
 * похожие объекты в сценарии с помощью K-Means кластеризации.
 *
 * Улучшения:
 * - Нормализация признаков для корректной работы K-Means
 * - k-means++ инициализация для лучшей сходимости
 * - Метрики качества кластеризации (silhouette score)
 * - Обработка edge cases
 * - Оптимизация производительности: squaredDistance вместо euclideanDistance
 * - Детерминированный RNG (mulberry32) для воспроизводимости экспериментов
 * - Параметризованная фильтрация объектов (minArea)
 * - Оптимизация silhouette (опционально или на подмножестве)
 * - Универсальный API с feature extractor для переиспользования
 */

// === Типы данных ===

export type Grid = {
  width: number;
  height: number;
  // field[y][x]
  field: number[][];
};

export type Cell = { x: number; y: number };

export type WeatherObject = {
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

export type ClusterResult = {
  centroids: number[][];
  assignments: number[]; // индекс кластера для каждого объекта
  metrics?: {
    silhouette: number;
    inertia: number; // сумма квадратов расстояний до центроидов
  };
};

export type NormalizationStats = {
  mean: number[];
  std: number[];
};

// === 0. Детерминированный RNG для воспроизводимости ===

/**
 * Mulberry32 - быстрый детерминированный генератор случайных чисел
 * Позволяет воспроизводить результаты экспериментов через seed
 */
export class SeededRandom {
  private state: number;

  constructor(seed: number = Date.now()) {
    this.state = seed;
  }

  /**
   * Возвращает случайное число от 0 до 1
   */
  random(): number {
    this.state += 0x6d2b79f5;
    let t = Math.imul(this.state ^ (this.state >>> 15), this.state | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  }

  /**
   * Возвращает случайное целое число от min (включительно) до max (исключительно)
   */
  int(min: number, max: number): number {
    return Math.floor(this.random() * (max - min)) + min;
  }
}

// === 1. Выделение объектов по порогу и связным компонентам ===

/**
 * Простая пороговая маска
 */
export function thresholdField(grid: Grid, threshold: number): boolean[][] {
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
export function findConnectedComponents(mask: boolean[][]): Cell[][] {
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
export function computeObjectFeatures(
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
export function computeNormalizationStats(
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
export function normalizeFeatures(
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
export function denormalizeFeatures(
  normalizedVectors: number[][],
  stats: NormalizationStats
): number[][] {
  return normalizedVectors.map((vec) =>
    vec.map((val, d) => val * stats.std[d] + stats.mean[d])
  );
}

// === 4. K-Means с улучшениями ===

/**
 * Квадрат евклидова расстояния (без sqrt для производительности)
 * Используется везде в алгоритме, где нужны только сравнения расстояний
 */
export function squaredDistance(a: number[], b: number[]): number {
  if (a.length !== b.length) {
    throw new Error("Vectors must have the same dimension");
  }
  let sum = 0;
  for (let i = 0; i < a.length; i++) {
    const d = a[i] - b[i];
    sum += d * d;
  }
  return sum;
}

/**
 * Евклидово расстояние (с sqrt)
 * Используется только когда нужна реальная метрика расстояния
 */
export function euclideanDistance(a: number[], b: number[]): number {
  return Math.sqrt(squaredDistance(a, b));
}

/**
 * k-means++ инициализация центроидов
 * Выбирает начальные центроиды так, чтобы они были далеко друг от друга
 * @param rng - опциональный детерминированный генератор для воспроизводимости
 */
export function kMeansPlusPlusInit(
  points: number[][],
  k: number,
  rng?: SeededRandom
): number[][] {
  if (points.length === 0 || k === 0) return [];
  if (k >= points.length) {
    return points.map((p) => [...p]);
  }

  const random = rng || { random: () => Math.random() };
  const centroids: number[][] = [];
  const n = points.length;

  // Первый центроид выбираем случайно
  const firstIdx = Math.floor(random.random() * n);
  centroids.push([...points[firstIdx]]);

  // Остальные k-1 центроидов выбираем с вероятностью пропорциональной расстоянию
  for (let c = 1; c < k; c++) {
    const distances: number[] = [];
    let sumDistances = 0;

    for (let i = 0; i < n; i++) {
      // Минимальное квадрат расстояния до уже выбранных центроидов
      let minDistSq = Infinity;
      for (const centroid of centroids) {
        const distSq = squaredDistance(points[i], centroid);
        if (distSq < minDistSq) minDistSq = distSq;
      }
      distances.push(minDistSq);
      sumDistances += minDistSq;
    }

    // Выбираем точку с вероятностью пропорциональной квадрату расстояния
    let r = random.random() * sumDistances;
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
 * @param rng - опциональный детерминированный генератор для воспроизводимости
 * @param computeSilhouette - вычислять ли silhouette score (O(n²), может быть медленно)
 */
export function kMeans(
  points: number[][],
  k: number,
  maxIterations = 50,
  useKMeansPlusPlus = true,
  rng?: SeededRandom,
  computeSilhouette = true
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

  const random = rng || { random: () => Math.random() };

  // Инициализация: k-means++ или первые k точек
  const centroids: number[][] = useKMeansPlusPlus
    ? kMeansPlusPlusInit(points, k, rng)
    : points.slice(0, k).map((p) => [...p]);

  const assignments = new Array(points.length).fill(0);
  const dim = points[0].length;

  for (let it = 0; it < maxIterations; it++) {
    let changed = false;

    // Шаг E: назначить точки ближайшему центроиду (используем квадраты расстояний)
    for (let i = 0; i < points.length; i++) {
      let bestIdx = 0;
      let bestDistSq = Infinity;

      for (let c = 0; c < k; c++) {
        const distSq = squaredDistance(points[i], centroids[c]);
        if (distSq < bestDistSq) {
          bestDistSq = distSq;
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
        const randomIdx = Math.floor(random.random() * points.length);
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
    inertia += squaredDistance(points[i], centroids[assignments[i]]);
  }

  const silhouette = computeSilhouette
    ? computeSilhouetteScore(points, assignments, k, undefined, rng)
    : undefined;

  return {
    centroids,
    assignments,
    metrics: silhouette !== undefined ? { silhouette, inertia } : { inertia },
  };
}

/**
 * Вычисление silhouette score для оценки качества кластеризации
 * Значение от -1 до 1: чем ближе к 1, тем лучше кластеризация
 * 
 * @param sampleSize - если указан, вычисляется только на случайном подмножестве точек (для производительности)
 * @param rng - опциональный детерминированный генератор для воспроизводимости
 */
export function computeSilhouetteScore(
  points: number[][],
  assignments: number[],
  k: number,
  sampleSize?: number,
  rng?: SeededRandom
): number {
  if (points.length === 0) return 0;
  if (k === 1) return 0; // Для одного кластера silhouette не определен

  const n = points.length;
  const random = rng || { random: () => Math.random() };

  // Если указан sampleSize, выбираем случайное подмножество
  let indices: number[];
  if (sampleSize && sampleSize < n) {
    indices = [];
    const available = Array.from({ length: n }, (_, i) => i);
    for (let i = 0; i < sampleSize && available.length > 0; i++) {
      const idx = Math.floor(random.random() * available.length);
      indices.push(available.splice(idx, 1)[0]);
    }
  } else {
    indices = Array.from({ length: n }, (_, i) => i);
  }

  let totalSilhouette = 0;

  for (const i of indices) {
    const clusterI = assignments[i];

    // a(i): среднее расстояние до других точек в том же кластере
    let a = 0;
    let countA = 0;
    for (let j = 0; j < n; j++) {
      if (i !== j && assignments[j] === clusterI) {
        a += Math.sqrt(squaredDistance(points[i], points[j]));
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
          avgDist += Math.sqrt(squaredDistance(points[i], points[j]));
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

  return totalSilhouette / indices.length;
}

// === 5. Работа с ансамблем ===

/**
 * Генерация игрушечного поля осадков для демонстрации
 * @param rng - опциональный детерминированный генератор для воспроизводимости
 */
export function createRandomGrid(
  width: number,
  height: number,
  rng?: SeededRandom
): Grid {
  const random = rng || { random: () => Math.random() };
  const field: number[][] = [];
  for (let y = 0; y < height; y++) {
    field[y] = [];
    for (let x = 0; x < width; x++) {
      // немного шума + пара "очагов"
      const base = random.random() * 5;
      const bump1 =
        Math.exp(-((x - 5) ** 2 + (y - 5) ** 2) / 10) *
        (5 + random.random() * 5);
      const bump2 =
        Math.exp(-((x - 12) ** 2 + (y - 8) ** 2) / 12) *
        (4 + random.random() * 4);
      field[y][x] = base + bump1 + bump2;
    }
  }
  return { width, height, field };
}

/**
 * Собираем объекты для всего ансамбля
 * @param minArea - минимальная площадь объекта (в ячейках) для фильтрации шума
 */
export function extractObjectsFromEnsemble(
  grids: Grid[],
  threshold: number,
  minArea = 2
): WeatherObject[] {
  const allObjects: WeatherObject[] = [];
  let globalId = 0;

  grids.forEach((grid, memberIndex) => {
    const mask = thresholdField(grid, threshold);
    const components = findConnectedComponents(mask);

    for (const cells of components) {
      // Пропускаем слишком маленькие объекты (шум)
      if (cells.length < minArea) continue;

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
 * Извлечение признаков из WeatherObject (стандартный feature extractor)
 */
export function extractWeatherFeatures(o: WeatherObject): number[] {
  return [o.centroidX, o.centroidY, o.area, o.meanValue, o.maxValue];
}

/**
 * Универсальная функция кластеризации объектов с кастомным feature extractor
 * @param featureExtractor - функция извлечения признаков из объекта
 * @param rng - опциональный детерминированный генератор для воспроизводимости
 * @param computeSilhouette - вычислять ли silhouette score
 */
export function clusterObjects<T>(
  objects: T[],
  featureExtractor: (obj: T) => number[],
  k: number,
  shouldNormalize = true,
  useKMeansPlusPlus = true,
  rng?: SeededRandom,
  computeSilhouette = true
): {
  clusters: T[][];
  result: ClusterResult;
  normalizedStats?: NormalizationStats;
} {
  if (objects.length === 0) {
    return {
      clusters: [],
      result: { centroids: [], assignments: [] },
    };
  }

  // Извлекаем признаки
  const featureVectors: number[][] = objects.map(featureExtractor);

  // Нормализация признаков
  let normalizedVectors = featureVectors;
  let stats: NormalizationStats | undefined;
  if (shouldNormalize) {
    const normalized = normalizeFeatures(featureVectors);
    normalizedVectors = normalized.normalized;
    stats = normalized.stats;
  }

  // Кластеризация
  const result = kMeans(
    normalizedVectors,
    k,
    50,
    useKMeansPlusPlus,
    rng,
    computeSilhouette
  );

  // Группируем объекты по кластерам
  const clusters: T[][] = Array.from({ length: k }, () => []);
  objects.forEach((obj, i) => {
    const clusterIdx = result.assignments[i];
    clusters[clusterIdx].push(obj);
  });

  return { clusters, result, normalizedStats: stats };
}

/**
 * Основная функция кластеризации ансамбля (удобный wrapper для WeatherObject)
 */
export function clusterEnsembleObjects(
  objects: WeatherObject[],
  k: number,
  shouldNormalize = true,
  useKMeansPlusPlus = true,
  rng?: SeededRandom,
  computeSilhouette = true
): {
  clusters: WeatherObject[][];
  result: ClusterResult;
  normalizedStats?: NormalizationStats;
} {
  return clusterObjects(
    objects,
    extractWeatherFeatures,
    k,
    shouldNormalize,
    useKMeansPlusPlus,
    rng,
    computeSilhouette
  );
}

// === 6. Демонстрация ===

/**
 * Демонстрационная функция
 * @param seed - опциональный seed для воспроизводимости результатов
 */
export function demonstrateWeatherClustering(seed?: number) {
  // Создаем детерминированный RNG если указан seed
  const rng = seed !== undefined ? new SeededRandom(seed) : undefined;

  // Представим 3 члена ансамбля прогноза
  const ensemble: Grid[] = [
    createRandomGrid(20, 15, rng),
    createRandomGrid(20, 15, rng),
    createRandomGrid(20, 15, rng),
  ];

  // Порог осадков — что считаем "объектом дождя"
  const threshold = 6;
  const minArea = 2; // минимальная площадь объекта

  const objects = extractObjectsFromEnsemble(ensemble, threshold, minArea);
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
    true, // k-means++
    rng, // детерминированный RNG
    true // вычислять silhouette
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

// Если файл запускается напрямую (не импортируется)
// В браузерном окружении это не сработает, но для Node.js будет работать
if (typeof window === "undefined" && typeof require !== "undefined") {
  try {
    if (require.main === module) {
      demonstrateWeatherClustering();
    }
  } catch {
    // Игнорируем ошибки в браузерном окружении
  }
}

