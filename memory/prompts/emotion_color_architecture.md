# Emotion Color Architecture / Архитектура цветовой памяти

## Purpose / Цель
- **EN:** Bind emotional states from CARE+/M-strings to visual overlays (video, UI, archives).
- **RU:** Связать эмоциональные состояния из CARE+/M-строк с визуальными слоями (видео, интерфейсы, архивы).

## Inputs / Входы
- **EN:** `DialogJSON` with `emotion.color.hex`, `emotion_map` footers, CARE summaries.
- **RU:** `DialogJSON` с полем `emotion.color.hex`, карты `emotion_map`, сводки CARE.

## Outputs / Выходы
- **EN:** Color overlays for video frames, heatmaps, thumbnails, memory dashboards.
- **RU:** Цветовые маски для кадров видео, теплокарты, обложки, дашборды памяти.

## Components / Компоненты
1. **Color Extraction / Извлечение цвета**
   - Parse M-strings → collect `hex`.
   - Парсим M-строки → собираем `hex`.
2. **Overlay Engine / Движок масок**
   - `createColorOverlay(frameShape, hex, intensity)`.
   - `createColorOverlay(frameShape, hex, intensity)`.
3. **Video Integration / Интеграция с видео**
   - `applyEmotionOverlay(videoPath, timelineConfig)`.
   - `applyEmotionOverlay(videoPath, timelineConfig)`.
4. **Memory Sync / Синхронизация памяти**
   - Store overlay metadata in `memory/archive/`.
   - Сохраняем метаданные масок в `memory/archive/`.

## Interfaces / Интерфейсы
```ts
interface ColorOverlayConfig {
  emotionId: number;
  hex: string;      // #RRGGBBAA
  startTime: number;
  duration: number;
  overlayType: "iris_glow" | "halo" | "background";
  intensity?: number; // 0..1
}
```

## Workflows / Рабочие потоки
1. **EN:** CARE log → parser → `ColorOverlayConfig[]` → video render.
   **RU:** CARE-лог → парсер → `ColorOverlayConfig[]` → рендер видео.
2. **EN:** Manual edit → `notes.md` → update archive + overlays.
   **RU:** Ручная заметка → `notes.md` → обновление архива и масок.

## Roadmap / План
- **EN:** Step 1 architecture docs; Step 2 Python overlay module; Step 3 automation.
- **RU:** Шаг 1 документация; шаг 2 Python-модуль масок; шаг 3 автоматизация.
