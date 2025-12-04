# Улучшения модуля кластеризации погоды

## Реализованные улучшения

### 1. Оптимизация расстояний

**Проблема**: `euclideanDistance` вычисляет `sqrt`, а потом мы снова возводим в квадрат.

**Решение**: Добавлена функция `squaredDistance` для использования везде в алгоритме, где нужны только сравнения.

```typescript
// Вместо:
const dist = euclideanDistance(points[i], centroids[c]);
if (dist < bestDist) { ... }

// Теперь:
const distSq = squaredDistance(points[i], centroids[c]);
if (distSq < bestDistSq) { ... }
```

**Результат**: Значительное ускорение при большом количестве точек.

### 2. Детерминированный RNG

**Проблема**: `Math.random()` не воспроизводим, сложно отлаживать и сравнивать результаты.

**Решение**: Класс `SeededRandom` с алгоритмом mulberry32.

```typescript
// Воспроизводимые результаты
const rng = new SeededRandom(42);
const grid1 = createRandomGrid(20, 15, rng);
const grid2 = createRandomGrid(20, 15, rng);

// Один и тот же seed → одинаковые результаты
demonstrateWeatherClustering(42); // всегда одинаковый вывод
```

### 3. Параметризованная фильтрация объектов

**Проблема**: Жёстко закодирован `cells.length < 2`.

**Решение**: Параметр `minArea` в `extractObjectsFromEnsemble`.

```typescript
// Фильтруем только очень маленькие объекты
const objects = extractObjectsFromEnsemble(ensemble, threshold, minArea: 2);

// Или более агрессивная фильтрация
const objects = extractObjectsFromEnsemble(ensemble, threshold, minArea: 10);
```

### 4. Оптимизация silhouette score

**Проблема**: O(n²) сложность — медленно для больших датасетов.

**Решение**: Опциональное вычисление и выборка на подмножестве.

```typescript
// Отключить silhouette для скорости
const result = kMeans(points, k, 50, true, rng, computeSilhouette: false);

// Или вычислять только на 100 случайных точках
const silhouette = computeSilhouetteScore(points, assignments, k, sampleSize: 100, rng);
```

### 5. Универсальный API с feature extractor

**Проблема**: Кластеризатор завязан на конкретные признаки `WeatherObject`.

**Решение**: Универсальная функция `clusterObjects<T>` с feature extractor.

```typescript
// Для WeatherObject (удобный wrapper)
const { clusters, result } = clusterEnsembleObjects(objects, k);

// Для любых объектов с кастомными признаками
type CustomObject = { x: number; y: number; intensity: number };

const customExtractor = (obj: CustomObject) => [obj.x, obj.y, obj.intensity];
const { clusters, result } = clusterObjects(
  customObjects,
  customExtractor,
  k
);
```

## Примеры использования

### Воспроизводимый эксперимент

```typescript
const seed = 12345;
const rng = new SeededRandom(seed);

// Создаём ансамбль с одинаковым seed
const ensemble = [
  createRandomGrid(20, 15, rng),
  createRandomGrid(20, 15, rng),
  createRandomGrid(20, 15, rng),
];

// Извлекаем объекты
const objects = extractObjectsFromEnsemble(ensemble, threshold: 6, minArea: 3);

// Кластеризуем с воспроизводимым RNG
const { clusters, result } = clusterEnsembleObjects(
  objects,
  k: 3,
  true, // нормализация
  true, // k-means++
  rng,  // детерминированный RNG
  false // не вычислять silhouette для скорости
);
```

### Быстрая кластеризация больших датасетов

```typescript
// Для сотен объектов отключаем silhouette
const { clusters, result } = clusterEnsembleObjects(
  objects,
  k: 5,
  true,
  true,
  undefined, // обычный Math.random()
  false // не вычислять silhouette
);

// Или вычисляем только на выборке
if (objects.length > 100) {
  const silhouette = computeSilhouetteScore(
    featureVectors,
    result.assignments,
    k,
    sampleSize: 100 // только 100 случайных точек
  );
}
```

### Кастомные признаки

```typescript
// Кластеризация по другим признакам
const customExtractor = (obj: WeatherObject) => [
  obj.area,
  obj.maxValue,
  obj.meanValue,
  // можно добавить новые вычисляемые признаки
  obj.maxValue / obj.area, // плотность
];

const { clusters } = clusterObjects(
  objects,
  customExtractor,
  k: 4
);
```

## Производительность

### До оптимизаций
- Расстояния: O(n) с `sqrt` на каждое сравнение
- Silhouette: O(n²) всегда
- RNG: невоспроизводимый

### После оптимизаций
- Расстояния: O(n) без `sqrt` (только квадраты)
- Silhouette: O(n²) опционально или O(sampleSize × n)
- RNG: детерминированный с seed

**Ожидаемое ускорение**: 2-5x для типичных случаев (100-1000 объектов).

## Обратная совместимость

Все изменения обратно совместимы:
- Старые вызовы работают как раньше (параметры по умолчанию)
- Новые возможности доступны через опциональные параметры
- `clusterEnsembleObjects` остаётся удобным wrapper'ом

## Миграция

Если вы использовали старый код:

```typescript
// Старый код (всё ещё работает)
const objects = extractObjectsFromEnsemble(ensemble, threshold);
const { clusters } = clusterEnsembleObjects(objects, k);

// Новый код (с улучшениями)
const rng = new SeededRandom(42);
const objects = extractObjectsFromEnsemble(ensemble, threshold, minArea: 3);
const { clusters } = clusterEnsembleObjects(
  objects,
  k,
  true,
  true,
  rng,
  false // отключить silhouette для скорости
);
```

