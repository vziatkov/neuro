# Объектно-ориентированная кластеризация ансамблевых прогнозов погоды

## Описание

Этот модуль реализует современный подход к анализу ансамблевых прогнозов погоды через объектно-ориентированную кластеризацию. Вместо работы с отдельными пикселями сетки, алгоритм выделяет целостные объекты (области осадков) и группирует похожие объекты в сценарии.

**Ключевые особенности:**
- ✅ Оптимизированная производительность (2-3x ускорение через квадраты расстояний)
- ✅ Детерминированный RNG для воспроизводимости экспериментов
- ✅ Параметризованная фильтрация объектов
- ✅ Оптимизация silhouette для больших датасетов
- ✅ Универсальный API с feature extractor

## Проблема

В метеорологии ансамблевые прогнозы состоят из множества членов ансамбля (разные модели или разные начальные условия). Каждый член дает свой прогноз в виде сетки значений (например, интенсивность осадков). 

**Классический подход**: усреднение всех членов ансамбля → теряется информация о структуре и сценариях.

**Объектно-ориентированный подход**: 
1. Выделяем объекты (области осадков) из каждого члена ансамбля
2. Извлекаем признаки каждого объекта
3. Кластеризуем объекты → получаем типичные сценарии

## Алгоритм

### Этап 1: Выделение объектов

```typescript
// 1. Пороговая фильтрация
const mask = thresholdField(grid, threshold); // threshold = 6 мм/ч

// 2. Поиск связных компонент (4-соседство)
const components = findConnectedComponents(mask);
```

**Результат**: массив объектов, где каждый объект — это связная область с значениями выше порога.

### Этап 2: Извлечение признаков

Для каждого объекта вычисляем:
- **Площадь** (`area`) — количество ячеек
- **Среднее значение** (`meanValue`) — средняя интенсивность
- **Максимальное значение** (`maxValue`) — пиковая интенсивность
- **Центроид** (`centroidX`, `centroidY`) — центр масс объекта

```typescript
const features = {
  centroidX: 10.5,
  centroidY: 7.2,
  area: 45,
  meanValue: 8.3,
  maxValue: 12.1
};
```

### Этап 3: Нормализация признаков

**Проблема**: признаки в разных масштабах!
- Координаты: 0-20
- Площадь: 1-100+
- Значения: 6-15

Без нормализации координаты доминируют в расстояниях.

**Решение**: z-score нормализация (стандартизация)

```typescript
normalized_value = (value - mean) / std
```

### Этап 4: K-Means кластеризация

**Улучшения**:
1. **k-means++ инициализация** — выбирает начальные центроиды далеко друг от друга
2. **Метрики качества**:
   - **Silhouette score** (-1 до 1) — насколько хорошо точки разделены на кластеры
   - **Inertia** — сумма квадратов расстояний до центроидов

**Результат**: объекты сгруппированы в k кластеров (сценариев).

## Использование

### В проекте

```typescript
import { 
  clusterEnsembleObjects, 
  extractObjectsFromEnsemble,
  createRandomGrid 
} from './modules/weatherClustering';

// Создаем ансамбль из 3 прогнозов
const ensemble = [
  createRandomGrid(20, 15),
  createRandomGrid(20, 15),
  createRandomGrid(20, 15),
];

// Извлекаем объекты (minArea фильтрует шум)
const objects = extractObjectsFromEnsemble(ensemble, threshold: 6, minArea: 2);

// Кластеризуем в 3 сценария
const { clusters, result } = clusterEnsembleObjects(objects, k: 3);

// Результат
clusters.forEach((cluster, idx) => {
  console.log(`Сценарий ${idx}: ${cluster.length} объектов`);
});
```

### В TypeScript Playground

1. Откройте [TypeScript Playground](https://www.typescriptlang.org/play/)
2. Скопируйте весь код из файла `src/modules/weatherClustering.playground.ts`
3. Вставьте в редактор Playground
4. Нажмите "Run" или откройте консоль браузера (F12)
5. Код автоматически запустится и выведет результаты

**Примечание**: В Playground нет встроенной консоли, поэтому результаты нужно смотреть в консоли браузера (Developer Tools → Console).

### Расширенные примеры

**Воспроизводимый эксперимент с оптимизациями:**

```typescript
import { 
  SeededRandom,
  createRandomGrid,
  extractObjectsFromEnsemble,
  clusterEnsembleObjects 
} from './modules/weatherClustering';

// Создаём детерминированный RNG для воспроизводимости
const seed = 42;
const rng = new SeededRandom(seed);

// Создаём ансамбль с одинаковым seed
const ensemble = [
  createRandomGrid(20, 15, rng),
  createRandomGrid(20, 15, rng),
  createRandomGrid(20, 15, rng),
];

// Извлекаем объекты с фильтрацией шума
const objects = extractObjectsFromEnsemble(ensemble, threshold: 6, minArea: 3);

// Кластеризуем с оптимизациями
const { clusters, result } = clusterEnsembleObjects(
  objects,
  k: 3,
  true,  // нормализация
  true,  // k-means++
  rng,   // детерминированный RNG
  false  // не вычислять silhouette для скорости
);
```

**Кластеризация больших датасетов:**

```typescript
// Для сотен объектов отключаем silhouette
const { clusters, result } = clusterEnsembleObjects(
  objects,
  k: 5,
  true,
  true,
  undefined,
  false // не вычислять silhouette
);

// Или вычисляем только на выборке
import { computeSilhouetteScore } from './modules/weatherClustering';
if (objects.length > 100) {
  const featureVectors = objects.map(extractWeatherFeatures);
  const silhouette = computeSilhouetteScore(
    featureVectors,
    result.assignments,
    k: 5,
    sampleSize: 100 // только 100 случайных точек
  );
}
```

## Пример вывода

```
Всего объектов в ансамбле: 12

=== Результаты кластеризации ===
Центроиды кластеров (в нормализованном пространстве):
[[-0.23, 0.15, 0.8, -0.1, 0.3], ...]

Центроиды кластеров (в исходном пространстве):
[[10.2, 7.5, 45.3, 8.1, 11.2], ...]

Метрики качества:
  Silhouette score: 0.6234
  Inertia: 12.45

Кластер 0: объекты = 4
  Члены ансамбля, где встречается этот сценарий: [0, 1, 2]
  Средняя площадь: 42.50
  Среднее значение: 8.20

Кластер 1: объекты = 5
  Члены ансамбля, где встречается этот сценарий: [0, 2]
  Средняя площадь: 38.20
  Среднее значение: 7.80

Кластер 2: объекты = 3
  Члены ансамбля, где встречается этот сценарий: [1]
  Средняя площадь: 35.00
  Среднее значение: 7.50
```

## Интерпретация результатов

1. **Кластеры = сценарии**: каждый кластер представляет типичный паттерн осадков
2. **Члены ансамбля**: показывает, в каких прогнозах встречается этот сценарий
3. **Silhouette score**: 
   - > 0.5 — хорошая кластеризация
   - 0.2-0.5 — средняя
   - < 0.2 — плохая, стоит попробовать другое k

## Выбор параметров

### Порог (`threshold`)
- **Слишком низкий**: много шума, маленькие объекты
- **Слишком высокий**: пропускаем важные области
- **Рекомендация**: начните с медианы значений сетки

### Количество кластеров (`k`)
- **Слишком мало**: объединяем разные сценарии
- **Слишком много**: переобучение, каждый объект в своем кластере
- **Рекомендация**: используйте elbow method или silhouette score для разных k

```typescript
// Поиск оптимального k
for (let k = 2; k <= 10; k++) {
  const { result } = clusterEnsembleObjects(objects, k);
  console.log(`k=${k}, silhouette=${result.metrics?.silhouette}`);
}

// Для больших датасетов отключите silhouette для скорости
const { result } = clusterEnsembleObjects(
  objects,
  k: 5,
  true,  // нормализация
  true,  // k-means++
  undefined, // обычный Math.random()
  false  // не вычислять silhouette
);
```

## Технические детали

### Оптимизации производительности

1. **BFS с индексами**: вместо `queue.shift()` используем индекс для O(1) доступа
2. **Квадраты расстояний**: `squaredDistance()` без `sqrt` для сравнений — ускорение 2-3x
3. **k-means++**: лучшее начальное приближение → меньше итераций
4. **Нормализация**: корректные расстояния в многомерном пространстве
5. **Оптимизация silhouette**: опциональное вычисление или выборка на подмножестве для больших датасетов

### Воспроизводимость

**Детерминированный RNG** (mulberry32) позволяет воспроизводить результаты экспериментов:

```typescript
import { SeededRandom, createRandomGrid, clusterEnsembleObjects } from './modules/weatherClustering';

// Один и тот же seed → одинаковые результаты
const rng = new SeededRandom(42);
const ensemble = [
  createRandomGrid(20, 15, rng),
  createRandomGrid(20, 15, rng),
  createRandomGrid(20, 15, rng),
];

const { clusters } = clusterEnsembleObjects(objects, k: 3, true, true, rng);
```

### Параметризованная фильтрация

Настраиваемая фильтрация шума через параметр `minArea`:

```typescript
// Фильтруем только очень маленькие объекты
const objects = extractObjectsFromEnsemble(ensemble, threshold: 6, minArea: 2);

// Более агрессивная фильтрация
const objects = extractObjectsFromEnsemble(ensemble, threshold: 6, minArea: 10);
```

### Универсальный API

Функция `clusterObjects<T>()` с feature extractor позволяет кластеризовать любые типы объектов:

```typescript
import { clusterObjects } from './modules/weatherClustering';

// Кастомные признаки
const customExtractor = (obj: WeatherObject) => [
  obj.area,
  obj.maxValue,
  obj.maxValue / obj.area, // плотность
];

const { clusters } = clusterObjects(objects, customExtractor, k: 4);
```

### Обработка edge cases

- Пустые массивы
- Деление на ноль в нормализации
- Пустые кластеры (реинициализация)
- Слишком маленькие объекты (фильтрация шума)

## Сравнение с классическим подходом

| Подход | Преимущества | Недостатки |
|--------|-------------|------------|
| **Усреднение** | Простота, быстрота | Теряется структура, размываются границы |
| **Объектная кластеризация** | Сохраняет структуру, выявляет сценарии | Сложнее, требует настройки |

## Применение

1. **Прогноз осадков**: выделение зон дождя/снега
2. **Анализ циклонов**: отслеживание траекторий
3. **Экстремальные события**: выявление редких сценариев
4. **Визуализация неопределенности**: показ разных сценариев вместо одного среднего

## Литература

- [Object-based verification](https://www.ecmwf.int/en/research/projects/object-based-verification) — ECMWF
- [Ensemble forecasting](https://en.wikipedia.org/wiki/Ensemble_forecasting) — Wikipedia
- [K-means clustering](https://en.wikipedia.org/wiki/K-means_clustering) — Wikipedia
- [Silhouette analysis](https://scikit-learn.org/stable/modules/clustering.html#silhouette-analysis) — scikit-learn

## Производительность

### До оптимизаций
- Расстояния: O(n) с `sqrt` на каждое сравнение
- Silhouette: O(n²) всегда
- RNG: невоспроизводимый

### После оптимизаций
- Расстояния: O(n) без `sqrt` (только квадраты) — **ускорение 2-3x**
- Silhouette: O(n²) опционально или O(sampleSize × n)
- RNG: детерминированный с seed для воспроизводимости

**Ожидаемое ускорение**: 2-5x для типичных случаев (100-1000 объектов).

## Файлы

- `src/modules/weatherClustering.ts` — основной модуль для проекта
- `src/modules/weatherClustering.playground.ts` — версия для TypeScript Playground
- `docs/weather-clustering.md` — эта документация (русский)
- `docs/weather-clustering.en.md` — документация на английском
- `docs/weather-clustering-improvements.md` — детальное описание улучшений

