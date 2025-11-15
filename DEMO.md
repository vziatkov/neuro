# 🚀 Демо и тестирование Neuro Project / Demo & Testing

## Быстрый старт / Quick Start

### 1. Основное приложение (Three.js визуализация) / Main Application (Three.js Visualization)

```bash
npm install
npm run dev
```

Откроется на `http://localhost:5173` / Opens at `http://localhost:5173`

**Что можно проверить / What to test:**
- 3D визуализация нейронной сети / 3D neural network visualization
- Биометрические импульсы (кнопка "🧬 Bio") / Biometric impulses (button "🧬 Bio")
- Различные формации сети (1-7) / Various network formations (1-7)
- Интерактивные импульсы (клик/тап) / Interactive impulses (click/tap)

### 2. Демо-страница кластеризации / Clustering Demo Page

Открой `demo-clustering.html` в браузере (просто двойной клик) / Open `demo-clustering.html` in browser (double-click)

**Что можно проверить / What to test:**
- Swarm Impulses: запуск FOOD_DETECTED и DANGER_NEAR импульсов / Trigger FOOD_DETECTED and DANGER_NEAR impulses
- Emotional Core: просмотр эмоционального буфера / View emotional buffer
- Clustering: кластеризация биометрии, эмоций, игрового поведения / Clustering of biometrics, emotions, game behavior
- Atlas Waves: визуализация волн в реальном времени / Real-time wave visualization

### 3. Тестирование модулей через консоль / Testing Modules via Console

В браузере (F12 → Console) можно импортировать модули / In browser (F12 → Console) you can import modules:

```javascript
// После npm run dev, в консоли браузера / After npm run dev, in browser console:
import { triggerFoodImpulse, onAtlasWave } from '/src/modules/swarmImpulse.ts';
import { getEmotionalBuffer } from '/src/modules/emotional-core.ts';
import { clusterEmbeddings } from '/src/modules/clustering.ts';

// Запустить импульс / Trigger impulse
triggerFoodImpulse(1.0);

// Подписаться на волны / Subscribe to waves
onAtlasWave((wave) => console.log('Atlas wave:', wave));

// Посмотреть эмоциональный буфер / View emotional buffer
console.log(getEmotionalBuffer());
```

## Что визуализируется / What is Visualized

### ✅ Уже работает / Already Working
- 3D нейронная сеть (Three.js) / 3D neural network (Three.js)
- Биометрические импульсы / Biometric impulses
- Интерактивные клики → импульсы по сети / Interactive clicks → network impulses

### 🚧 В разработке (можно тестировать через консоль) / In Development (can test via console)
- Swarm impulses (код готов, нужна визуализация в UI) / Swarm impulses (code ready, needs UI visualization)
- Emotional core (логи в консоли) / Emotional core (logs in console)
- Clustering (можно тестировать через demo-clustering.html) / Clustering (can test via demo-clustering.html)

## Следующие шаги для визуализации / Next Steps for Visualization

1. **Интеграция swarmImpulse в UI** — показать волны на 3D-сцене / **Integrate swarmImpulse into UI** — show waves on 3D scene
2. **Визуализация кластеров** — отобразить кластеры как группы узлов / **Cluster visualization** — display clusters as node groups
3. **Emotional dashboard** — панель с эмоциональными логами / **Emotional dashboard** — panel with emotional logs
4. **Atlas waves** — визуализация импульсов на сцене / **Atlas waves** — impulse visualization on scene

