# Forest Supply Chain — Concept Map & Data Model

**Архитектура цифрового двойника бизнеса (Supply Chain Digital Twin).** Не только data model — платформа для принятия решений: онтология узлов и потоков, риски, энергия, география, два режима симуляции, декомпозиция прибыли и стратегические сценарии.

---

## 1. Типология узлов (Nodes)

### 1.1 ForestPlot — лесной участок (источник сырья)

```ts
type WoodGrade = 'structural' | 'furniture' | 'low'; // structural timber, furniture grade, low grade

interface ForestPlot {
  id: string;
  type: 'forest';
  /** запас по категориям, м³ */
  stock: Record<WoodGrade, number>;
  /** скорость восстановления по категориям, м³/год */
  regenRate: Record<WoodGrade, number>;
  /** стоимость заготовки за м³ по категории */
  harvestCostPerM3: Record<WoodGrade, number>;
  /** расстояния до лесопилок: sawmillId → km */
  distancesToSawmills: Record<string, number>;
  /** лимит вырубки, м³/год (экология, лицензии) */
  harvestCap: number;
  /** текущая вырубка за период */
  harvestUsed: number;
}
```

### 1.2 Sawmill — лесопилка (этапы производства и узкие места)

Производство разбито на стадии: распил → сушка → обработка. Узкое место может быть на любой стадии.

```ts
interface Sawmill {
  id: string;
  type: 'sawmill';
  /** мощность по стадиям, м³/день (bottleneck = min) */
  stageCapacity: {
    sawing: number;
    drying: number;
    processing: number;
  };
  workers: number;
  /** эффективность по стадиям, 0..1 */
  stageEfficiency: { sawing: number; drying: number; processing: number };
  /** доля отходов, 0..1 */
  wasteShare: number;
  /** структура выпуска: продукт → доля от объёма */
  outputMix: Record<OutputProduct, number>;
  /** операционные расходы, денег/день */
  operatingCostPerDay: number;
  /** текущая загрузка по стадиям (для расчёта bottleneck) */
  stageThroughput: { sawing: number; drying: number; processing: number };
  throughput: number;
}

type OutputProduct = 'lumber' | 'board' | 'chips' | 'sawdust';
```

### 1.3 SecondaryProcessor — вторичная переработка

```ts
interface SecondaryProcessor {
  id: string;
  type: 'secondary';
  /** тип продукции */
  productType: 'plywood' | 'particleboard' | 'pellets' | 'other';
  /** мощность, единиц/день (или тонн) */
  capacityPerDay: number;
  /** потребление отходов: тип отхода → объём/день */
  inputWaste: Record<'chips' | 'sawdust', number>;
  operatingCostPerDay: number;
  throughput: number;
}
```

### 1.4 FurnitureFactory — производитель мебели

Потребляет обработанную древесину; можно ограничить по категории (только furniture grade).

```ts
interface FurnitureFactory {
  id: string;
  type: 'furniture';
  capacityPerDay: number;
  productType: string; // e.g. 'cabinet', 'table'
  /** допустимые категории древесины (если не задано — любые) */
  acceptedWoodGrades?: WoodGrade[];
  demandBacklog: number;
  margin: number;
  operatingCostPerDay: number;
  throughput: number;
}
```

### 1.5 FurnitureStore — магазин мебели (финальная точка продаж)

```ts
interface FurnitureStore {
  id: string;
  type: 'store';
  /** спрос, единиц/день */
  demandPerDay: number;
  /** оборот, денег/день */
  turnoverPerDay: number;
  /** склад, макс единиц */
  warehouseCap: number;
  warehouseCurrent: number;
  /** регион (влияет на спрос и логистику) */
  region: string;
}
```

### 1.6 LogisticsHub — логистический маршрут (тип транспорта)

Разные режимы: грузовик, ж/д, море — своя стоимость, скорость, объём.

```ts
type TransportMode = 'truck' | 'rail' | 'sea';

interface LogisticsHub {
  id: string;
  type: 'logistics';
  fromNodeId: string;
  toNodeId: string;
  mode: TransportMode;
  /** расстояние, км */
  distanceKm: number;
  /** стоимость перевозки за единицу (зависит от mode) */
  costPerUnit: number;
  /** пропускная способность, единиц/день */
  capacityPerDay: number;
  /** время доставки, дни (зависит от mode) */
  leadTimeDays: number;
  flow: number;
}
```

### 1.7 Объединённый тип узла

```ts
type Node =
  | ForestPlot
  | Sawmill
  | SecondaryProcessor
  | FurnitureFactory
  | FurnitureStore
  | LogisticsHub;
```

---

## 2. Потоки (Flows)

Поток может нести категорию древесины (woodGrade), чтобы не направлять неподходящий материал в мебельную фабрику.

```ts
type FlowType =
  | 'raw'      // лес → лесопилка
  | 'material' // лесопилка → мебельные фабрики
  | 'waste'    // лесопилка → вторичная переработка
  | 'goods';   // фабрики → магазины

interface Flow {
  id: string;
  type: FlowType;
  fromNodeId: string;
  toNodeId: string;
  /** категория древесины (для raw/material); опционально для waste/goods */
  woodGrade?: WoodGrade;
  volume: number;
  cost: number;
  durationDays: number;
  lossShare: number;
}
```

---

## 2a. Рынок и цены (PricingModel)

Цены в цепочке динамические по регионам и времени. Нужны для расчёта реальной прибыли и реакции на колебания рынка.

```ts
type PriceProduct = 'roundwood' | 'lumber' | 'board' | 'plywood' | 'furniture' | string;

interface MarketPrice {
  product: PriceProduct;
  region: string;
  /** цена за единицу (м³ или штука) */
  pricePerUnit: number;
  /** день (или месяц/год при соответствующем planningHorizon) */
  t: number;
}

interface PricingModel {
  /** история или прогноз цен по продуктам и регионам */
  prices: MarketPrice[];
  /** альтернатива: кривые по продукту/региону */
  curves?: Record<string, TimeSeries>;
}
```

---

## 2b. Контракты между узлами

Долгосрочные поставки: поток нельзя свободно переключить. Ограничивает оптимизацию.

```ts
interface Contract {
  id: string;
  fromNodeId: string;
  toNodeId: string;
  /** минимальный объём за период контракта */
  minVolumePerPeriod: number;
  /** период в днях */
  periodDays: number;
  /** фиксированная или базовая цена за единицу */
  pricePerUnit: number;
  /** срок действия */
  validFrom: number;
  validTo: number;
  /** текущий объём поставок в периоде (для проверки min) */
  volumeDelivered: number;
}
```

---

## 2c. Инвентарь и склады

Склады на всех этапах: лес → склад сырья, лесопилка → склад доски, фабрика → склад мебели. Часто главный bottleneck.

```ts
interface Inventory {
  id: string;
  /** узел, к которому привязан склад */
  nodeId: string;
  /** тип хранимого: raw | lumber | board | furniture | chips | sawdust */
  stockType: string;
  /** вместимость, единиц (м³ или штук) */
  capacity: number;
  /** текущий объём */
  current: number;
  /** стоимость хранения за единицу за день */
  holdingCostPerUnitPerDay: number;
}
```

---

## 2d. Режим транспорта (справочник)

Параметры по типам для расчёта стоимости и времени.

```ts
interface TransportModeParams {
  mode: TransportMode;
  costPerUnitPerKm: number;
  /** типичная скорость, км/день */
  speedKmPerDay: number;
  /** макс. объём за рейс */
  capacityPerTrip: number;
  /** фиксированные издержки за рейс */
  fixedCostPerTrip: number;
}
```

---

## 3. Ресурсы системы

```ts
interface Labor {
  workersTotal: number;
  productivity: number; // единиц на человека/день
  costPerWorkerPerDay: number;
}

interface Equipment {
  efficiency: number;
  depreciationPerDay: number;
  downtimeShare: number; // доля простоя
}

interface Capital {
  investments: number;
  modernizationBudget: number;
}
```

Углеродный след считают по узлам/потокам (`carbonPerUnit`) и агрегируют в `NetworkMetrics.totalCarbonPerPeriod` для multi-objective оптимизации.

---

## 4. Экономические метрики (по нодам и по сети)

Включая углеродный след для экологической оптимизации.

```ts
interface NodeMetrics {
  nodeId: string;
  throughput: number;
  capacityUtilization: number;
  unitCost: number;
  margin: number;
  cycleTimeDays: number;
  /** выбросы CO₂ за единицу продукции (опционально) */
  carbonPerUnit?: number;
}

interface NetworkMetrics {
  totalWoodThroughput: number;
  avgLogisticsCostPerUnit: number;
  totalProfit: number;
  aggregateCapacityUtilization: number;
  /** суммарный углеродный след сети (для multi-objective) */
  totalCarbonPerPeriod?: number;
}
```

---

## 5. Динамика (входы симуляции)

```ts
interface SimulationInputs {
  /** спрос на мебель по времени (серия или кривая) */
  furnitureDemand: TimeSeries;
  /** сезонность, множитель по месяцу */
  seasonality: number[];
  /** цены на древесину по времени */
  woodPrices: TimeSeries;
  /** изменения логистики (например, закрытие маршрута) */
  logisticsEvents: LogisticsEvent[];
  /** простои оборудования по узлам */
  downtimeEvents: DowntimeEvent[];
  /** опционально: сценарий цен по регионам (PricingModel) */
  pricingScenario?: PricingModel;
}

interface TimeSeries {
  t: number[];  // дни
  v: number[];  // значения
}

interface LogisticsEvent {
  hubId: string;
  fromDay: number;
  toDay: number;
  capacityMultiplier: number; // 0 = закрыто
}

interface DowntimeEvent {
  nodeId: string;
  fromDay: number;
  toDay: number;
}
```

---

## 6. Агенты принятия решений

Уровень решения связан с временным горизонтом планирования (см. цикл планирования ниже).

```ts
type DecisionLevel = 'operational' | 'tactical' | 'strategic';

interface Decision {
  level: DecisionLevel;
  /** примеры: перераспределить поставки, увеличить смены, закрыть фабрику */
  action: string;
  targetNodeIds?: string[];
  parameters?: Record<string, number>;
}
```

---

## 6a. Цикл планирования (временной шаг модели)

Определяет, на каком шаге считаем метрики и принимаем решения.

```ts
type PlanningHorizon = 'day' | 'month' | 'year';

/** Соответствие уровень решения ↔ горизонт */
const PLANNING_MAP: Record<DecisionLevel, PlanningHorizon> = {
  operational: 'day',   // операционный — день
  tactical: 'month',     // тактический — месяц
  strategic: 'year',    // стратегический — год
};

interface PlanningCycle {
  /** базовый шаг симуляции (например, 1 день) */
  stepDays: number;
  /** горизонт для отчётов (день / месяц / год) */
  reportHorizon: PlanningHorizon;
}
```

---

## 6b. Тип оптимизационной задачи (цель)

Модель должна явно задавать цель оптимизации. Возможна multi-objective.

```ts
type OptimizationObjectiveType =
  | 'max_profit'                    // максимизация прибыли
  | 'min_logistics_cost'             // минимизация логистических затрат
  | 'max_throughput_constrained';     // максимизация throughput при ограничениях

interface OptimizationObjective {
  primary: OptimizationObjectiveType;
  /** веса для multi-objective: profit, logisticsCost, throughput, carbon */
  weights?: { profit?: number; logistics?: number; throughput?: number; carbon?: number };
  /** ограничения (например, min profit, max carbon) */
  constraints?: {
    minProfit?: number;
    maxCarbonPerPeriod?: number;
    maxCapacityUtilization?: number;
  };
}
```

---

## 7. Оптимизационные рычаги (что меняем в модели)

С учётом контрактов: перераспределение возможно только в пределах, не нарушающих minVolumePerPeriod.

```ts
interface OptimizationLevers {
  logisticsRoutes: Record<string, number>;
  factoryUtilization: Record<string, number>;
  rawAllocation: Record<string, Record<string, number>>;
  outputMix: Record<string, Record<OutputProduct, number>>;
  modernizationSpend: Record<string, number>;
  /** целевые уровни инвентаря (влияют на складские bottleneck) */
  inventoryTargets?: Record<string, number>;
  /** переключение режимов транспорта по маршрутам (если несколько mode на одном коридоре) */
  transportModeChoice?: Record<string, TransportMode>;
}
```

---

## 8. Полный интерфейс системы (для симуляции и UI)

```ts
interface ForestSupplyChainModel {
  nodes: Node[];
  flows: Flow[];
  logistics: LogisticsHub[];
  contracts: Contract[];
  inventories: Inventory[];
  pricing: PricingModel;
  labor: Record<string, Labor>;
  equipment: Record<string, Equipment>;
  capital: Capital;
  nodeMetrics: NodeMetrics[];
  networkMetrics: NetworkMetrics;
  simulation: SimulationInputs;
  levers: OptimizationLevers;
  objective: OptimizationObjective;
  planningCycle: PlanningCycle;
  /** риски и неопределённость (для Monte Carlo) */
  riskModel?: RiskModel;
  /** энергия и топливо (сушка) */
  energyParams?: EnergyParams;
  /** география узлов (для карты) */
  geography?: ModelGeography;
  /** калибровка по реальным данным */
  calibration?: CalibrationData | CalibrationResult;
  /** режим симуляции: interactive vs monte_carlo */
  simulationConfig?: SimulationConfig;
  /** декомпозиция прибыли (сырьё, логистика, производство, хранение) */
  profitDecomposition?: ProfitDecomposition;
  /** стратегические сценарии (what-if) */
  strategicScenarios?: StrategicScenario[];
  /** поведение менеджеров (влияет на оптимизацию) */
  managerBehavior?: ManagerBehavior;
}

interface SimulationState {
  day: number;
  model: ForestSupplyChainModel;
  history: {
    day: number[];
    profit: number[];
    throughput: number[];
    utilization: number[];
    carbon?: number[];
  };
}
```

---

## 9. Визуализация (Bloomberg-style)

Три основных вида, чтобы менеджер сразу видел, где система теряет деньги.

| Вид | Назначение |
|-----|------------|
| **Network graph** | Вся цепочка поставок: лес → фабрики → мебель → магазины. Узлы по типу, рёбра = потоки; толщина/цвет по объёму или загрузке. |
| **Flow heatmap** | Где проходит больше всего материала: матрица узлов/маршрутов, цвет по объёму. |
| **Bottleneck radar** | Какие узлы перегружены: utilization, очередь на складах, задержки по контрактам. Подсветка utilization > 0.95 или flow/capacity > 1. |

Дополнительно:
- Панели метрик по выбранному узлу (throughput, загрузка, себестоимость, маржа, carbon).
- Временные ряды: спрос, прибыль, использование мощностей, CO₂.
- Сценарии: переключатель леверов + перезапуск Monte Carlo и сравнение распределений.

---

## 10. Живая интерактивная карта бизнеса

Идея: **Ян двигает ползунки — в реальном времени видит, как меняется прибыль всей сети.**

- **Ползунки (sliders):** привязаны к леверам: доля сырья на лесопилку A/B, загрузка фабрики, целевой уровень склада, выбор режима транспорта на маршруте. При изменении значения пересчитываются метрики (profit, throughput, carbon) без перезапуска полной симуляции — быстрый пересчёт по текущему состоянию или лёгкий симуляционный шаг (1 день).
- **Интерактивный граф:** клик по узлу — панель метрик и доступные рычаги по этому узлу. Перетаскивание доли потока между рёбрами (в пределах контрактов).
- **Сравнение сценариев:** «текущее» vs «что будет, если я сдвину это». A/B по одному рычагу или по набору.
- **Экспорт:** снимок леверов и метрик для отчёта или передачи в simulation engine для полного прогона.

Так модель превращается в **живую интерактивную карту**: один интерфейс для понимания системы и для поиска точек +10% эффективности.

---

## 10a. Риски и неопределённость (Risk & Uncertainty)

Случайные события: пожары, штормы, болезни леса, задержки транспорта, скачки цен. Monte Carlo моделирует не только спрос, но и риски цепочки поставок.

```ts
type RiskEventType = 'fire' | 'storm' | 'disease' | 'transport_delay' | 'price_spike' | 'equipment_failure';

interface RiskEvent {
  type: RiskEventType;
  /** затронутые узлы или рёбра (nodeIds / hubIds) */
  affectedIds: string[];
  /** вероятность в единицу времени (день/месяц) */
  probabilityPerPeriod: number;
  /** длительность воздействия, дни */
  durationDays: number;
  /** множитель capacity (0 = полная остановка) или фиксированное снижение */
  capacityMultiplier?: number;
  /** для price_spike: множитель цены */
  priceMultiplier?: number;
}

interface RiskModel {
  events: RiskEvent[];
  /** корреляции между событиями (опционально) */
  correlation?: Record<string, Record<string, number>>;
}
```

---

## 10b. Энергия и топливо

Сушка — один из самых дорогих процессов. Цена энергии и потребление на сушке дают точки оптимизации.

```ts
interface EnergyParams {
  /** цена за единицу (кВт·ч или м³ газа) */
  pricePerUnit: number;
  /** потребление на стадии сушки по узлам, единиц/м³ продукции */
  dryingConsumptionPerM3: Record<string, number>;
  /** тип: electricity | gas */
  type: 'electricity' | 'gas';
}

/** В Sawmill или в отдельной привязке: costDrying = volume * dryingConsumptionPerM3[nodeId] * pricePerUnit */
```

---

## 10c. Время цикла и очереди между стадиями

После распила доска сушится неделями → очереди между sawing → drying → processing. Модель с очередями реалистичнее.

```ts
interface StageQueue {
  fromStage: 'sawing' | 'drying' | 'processing';
  toStage: 'sawing' | 'drying' | 'processing';
  /** среднее время ожидания в очереди, дни */
  avgWaitDays: number;
  /** макс. объём в очереди (буфер), м³ */
  bufferCapacity: number;
  /** текущий объём в очереди */
  currentQueue: number;
}

/** У лесопилки: stageCapacity, stageThroughput + массив StageQueue между стадиями. Задержка выхода = f(currentQueue, bufferCapacity, avgWaitDays). */
interface SawmillWithQueues extends Sawmill {
  queues: StageQueue[];
  /** типичное время сушки, дни (влияет на avgWaitDays) */
  dryingDaysTypical: number;
}
```

---

## 10d. География и карта

Реальные координаты узлов → построение карты. Визуализация превращается в supply-chain карту с потоками между регионами.

```ts
interface GeoNode {
  nodeId: string;
  lat: number;
  lon: number;
  /** регион/кластер для агрегации */
  region: string;
}

/** Логистика: fromNodeId, toNodeId уже есть; расстояние можно считать по GeoNode или задавать вручную. Для карты: рёбра рисуются как линии между (lat,lon). */
interface ModelGeography {
  nodes: GeoNode[];
  /** опционально: границы регионов (полигоны) для заливки на карте */
  regionBounds?: Record<string, [number, number][]>;
}
```

---

## 10e. Поведенческий слой менеджеров

Менеджеры не всегда рациональны: привычные маршруты, приверженность контрактам. Простая модель агентов управления влияет на оптимизацию.

```ts
interface ManagerBehavior {
  /** склонность не менять текущие маршруты, 0..1 */
  inertiaRoutes: number;
  /** склонность сохранять текущие контракты даже при более выгодных вариантах, 0..1 */
  contractLoyalty: number;
  /** допустимое отклонение от «идеального» решения (доля), 0..1 */
  toleranceDeviation: number;
}

/** При оптимизации: целевая функция может включать штраф за отход от текущего поведения или ограничение на шаг изменения леверов. */
```

---

## 10f. Обучение модели на данных (калибровка)

Реальные данные компании калибруют параметры: производственные коэффициенты, задержки логистики, маржи. Симуляция становится предсказательной.

```ts
interface CalibrationData {
  /** фактические throughput по узлам за период */
  actualThroughput?: Record<string, number[]>;
  /** фактические задержки по маршрутам, дни */
  actualLeadTimes?: Record<string, number[]>;
  /** фактические маржи по продуктам/узлам */
  actualMargins?: Record<string, number>;
  /** даты наблюдений */
  observationDates: number[];
}

interface CalibrationResult {
  /** подобранные параметры модели (например, stageEfficiency, lossShare) */
  fittedParams: Record<string, number>;
  /** ошибка (MAPE, RMSE) по метрикам */
  error: Record<string, number>;
}
```

---

## 10g. Два режима симуляции

| Режим | Назначение |
|-------|------------|
| **Быстрый (interactive)** | Почти мгновенный пересчёт для живой карты: один шаг или упрощённая формула метрик без полного прогона. Ползунки → обновление за &lt;100 ms. |
| **Полный Monte Carlo** | Тысячи сценариев (спрос, риски, цены); поиск устойчивых стратегий; распределения profit, throughput, carbon. Результат: перцентили и рекомендации. |

```ts
type SimulationMode = 'interactive' | 'monte_carlo';

interface SimulationConfig {
  mode: SimulationMode;
  /** для monte_carlo: число сценариев */
  scenarios?: number;
  /** длина горизонта в днях */
  horizonDays: number;
  /** сид для воспроизводимости */
  seed?: number;
}
```

---

## 10h. Автоматический поиск узкого места (bottleneck)

Алгоритм определяет узкое место всей сети — одна из самых ценных аналитик для бизнеса.

```ts
interface BottleneckReport {
  /** id узла или ребра, являющегося bottleneck */
  nodeOrEdgeId: string;
  type: 'node' | 'edge';
  /** текущая загрузка, 0..1 (или &gt;1 при перегрузке) */
  utilization: number;
  /** вклад в ограничение общего throughput (чувствительность) */
  sensitivity: number;
  /** рекомендация: увеличить capacity, перераспределить поток и т.д. */
  suggestion?: string;
}

/** Алгоритм: например, max-flow / min-cut по графу с пропускными способностями; или итеративный сброс по одному узлу и замер падения throughput. */
function computeBottlenecks(model: ForestSupplyChainModel): BottleneckReport[];
```

---

## 10i. Экономическая декомпозиция прибыли

Показывать, из чего складывается profit: сырьё, логистика, производство, хранение, продажи. Менеджер видит, где теряются деньги.

```ts
interface ProfitDecomposition {
  /** выручка (по узлам продаж или по сети) */
  revenue: number;
  /** затраты на сырьё (заготовка + закупка) */
  costRaw: number;
  /** логистика */
  costLogistics: number;
  /** производство (операционные расходы узлов) */
  costProduction: number;
  /** хранение (inventory holding) */
  costStorage: number;
  /** прочие */
  costOther: number;
  profit: number; // revenue - sum(costs)
  /** доли в выручке или в затратах для визуализации (stacked bar, pie) */
  shares?: Record<string, number>;
}
```

---

## 10j. Режим стратегических инвестиций (what-if)

Сценарии: что будет, если построить новую сушильную линию или открыть ещё одну лесопилку. Быстрая проверка гипотез.

```ts
interface StrategicScenario {
  id: string;
  name: string;
  /** изменения в модели: новые узлы, изменение capacity, новые рёбра */
  changes: {
    addNodes?: Node[];
    removeNodeIds?: string[];
    /** nodeId → новое значение capacity или stageCapacity */
    capacityChanges?: Record<string, number | Partial<Sawmill['stageCapacity']>>;
    addEdges?: LogisticsHub[];
  };
  /** опционально: разовые затраты на реализацию */
  investmentCost?: number;
}

/** Режим UI: выбор сценария → пересчёт метрик (или Monte Carlo) → сравнение с базовым вариантом (profit, payback, bottleneck). */
```

---

## 11. Файлы скилла

| Файл | Назначение |
|------|------------|
| `CONCEPT_MAP.md` | Карта понятий, онтология, data model, риски, энергия, география, два режима симуляции, декомпозиция прибыли, стратегические сценарии, живая карта |
| `README.md` | Краткое описание примера и ссылка на контекст |

Следующий шаг: **simulation engine** — состояние системы, решения, контракты, риски, очереди; два режима (interactive + Monte Carlo). Затем прототип живой карты с ползунками, графом, декомпозицией прибыли и стратегическими сценариями. В перспективе — калибровка на реальных данных и автоматический отчёт по bottleneck.
