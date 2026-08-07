# 🧠 Neuro — API

## Доступные функции

| Функция | Описание |
|---|---|
| `generateNeuralNetwork(formationIndex, densityFactor)` | Генерирует нейронную сеть заданного типа (0–7) с нужной плотностью |
| `simulatePulseJourney(network, position, color, intensity)` | Запускает импульс из указанной точки и отслеживает его распространение |
| `createBiometricSimulator()` | Создаёт симулятор биометрических потоков (дыхание 12 BPM, сердце 72 BPM, эмоции) |
| `logEmotion(entry)` | Записывает эмоциональное состояние: тег, интенсивность, контекст и метку времени |
| `clusterEmbeddings(embeddings, threshold)` | Кластеризует векторные эмбеддинги по косинусному сходству (HDBSCAN-подобный алгоритм) |
| `loadPhysioCSVorJSON(url)` | Загружает физиологические данные (ЭКГ, дыхание) из CSV или JSON |
| `muxResampled(streams)` | Мультиплексирует несколько биометрических потоков в единый покадровый генератор |
| `triggerFoodImpulse(strength)` | Запускает положительный импульс по роевой модели нейронной сети |
| `triggerDangerImpulse(hybrid)` | Запускает сигнал опасности; `hybrid` (boolean) — включает смешанную биометрическую нагрузку |
| `kMeans(objects, k, features)` | K-means кластеризация объектов по выбранным признакам |

## Форматы данных

```typescript
// Нейронная сеть
interface NeuralNetwork { nodes: Node[]; rootNode: Node }

// Биометрический кадр
interface MuxFrame { t: number; heart?: HeartFrame; breath?: BreathFrame; emotion?: EmotionFrame }

// Эмоциональная запись
interface EmotionalLogEntry { tag: EmotionTag; intensity: number; context?: string; timestamp: number }

// Кластеризация
interface ClusteringResult { clusters: Cluster[]; outliers: Embedding[]; metrics: { silhouette: number } }
```
