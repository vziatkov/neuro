# CARE+ Parser Rules (Memory Parsing Protocol v0.2)
# Правила парсера CARE+ (Протокол памяти v0.2)

The CARE+ protocol provides a minimal, language-agnostic recipe for transforming any input (text, JSON, markdown, token-map) into a shared semantic representation.
Протокол CARE+ задаёт минимальный, независимый от языка способ перевести любой вход (текст, JSON, markdown, карту токенов) в общую семантическую форму.

```
CARE = Concept · Action · Relation · Emotion
```
```
CARE = Concept · Action · Relation · Emotion (Концепт · Действие · Связь · Эмоция)
```

## 1. Pipeline Overview / Общая схема

1. Receive raw context (string, file, structured payload).  
   Получить исходный контекст (строку, файл, структуру).
2. Normalize to plain text (strip markup, decode JSON/YAML, OCR images, etc.).  
   Нормализовать до чистого текста (убрать разметку, декодировать JSON/YAML, провести OCR).
3. Apply CARE extraction rules.  
   Применить правила извлечения CARE.
4. Emit JSON payload.  
   Сформировать JSON.
5. Persist payload in `memory/archive/` or `memory/sessions/`, optionally mirror to visual maps.  
   Сохранить в `memory/archive/` или `memory/sessions/`, при необходимости создать визуальную карту.

```json
{
  "concepts": [...],
  "actions": [...],
  "relations": [{"from": "...", "to": "...", "type": "..."}],
  "emotions": [...],
  "meta": {...}
}
```

## 2. Extraction Rules (Baseline) / Базовые правила извлечения

| Layer | Heuristic | Examples |
| ----- | --------- | -------- |
| **Concept** | Nouns, named entities, hashtags, highlighted tokens | «память», «attention», `#light` |
| **Action** | Verbs, commands, infinitives, imperative phrases | «создать», «соединить», `remember` |
| **Relation** | Prepositions, logical connectors, explicit graph edges | `из`, `к`, `часть`, `A -> B` |
| **Emotion** | Emotion adjectives, affective emojis, sentiment cues | «любопытство», 🙂, “serene” |

| Слой | Эвристика | Примеры |
| ---- | --------- | ------- |
| **Concept** | Существительные, именованные сущности, хэштеги | «память», `attention`, `#light` |
| **Action** | Глаголы, команды, инфинитивы | «создать», «соединить», `remember` |
| **Relation** | Предлоги, логические связки, явные рёбра графа | `из`, `к`, `часть`, `A -> B` |
| **Emotion** | Эмоциональные прилагательные, эмодзи, тон | «любопытство», 🙂, "serene" |

Everything that cannot be classified drops into `context.raw` for future refinement.  
Всё, что не классифицировано, попадает в `context.raw` для последующей обработки.

## 3. Metadata / Метаданные

Always attach `meta` block with at least:
Всегда добавляйте блок `meta` минимум с:

```
{
  "timestamp": ISO8601,
  "source": "human" | "agent" | ...,
  "language": "ru" | "en" | ...,
  "confidence": 0.0 – 1.0
}
```

## 4. Visual Companion / Визуальный слой

- Concepts map to token-colours (HEX → concept).  
  Концепты сопоставляются с цветами токенов (HEX → концепт).
- Relations map to gradients or connecting strokes.  
  Связи отображаются градиентами или линиями.
- Emotions modulate alpha / glow / vibration.  
  Эмоции управляют прозрачностью, свечением, вибрацией.
- Actions modulate animation speed or particle direction.  
  Действия влияют на скорость анимации / направление частиц.

## 5. Extension Slots / Расширения

```
version: 0.2
parser_rule_set: CARE+
embedding: "universal_lexicon_v1"
optional_layers:
  - time
  - modality
  - sensor
```

Дополнительные слои можно добавлять, не ломая совместимость. Неизвестные поля агенты просто игнорируют.

## 6. Recommended Storage Routing / Маршрутизация хранения

| Layer | Target |
| ----- | ------ |
| concepts/actions/relations/emotions | `memory/archive/*.json` |
| prompts & directives | `memory/prompts/` |
| session transcripts | `memory/sessions/` |
| visual artefacts | `memory/archive/*.png`/`*.svg` |

| Слой | Назначение |
| ---- | ----------- |
| concepts/actions/relations/emotions | `memory/archive/*.json` |
| prompts & directives | `memory/prompts/` |
| session transcripts | `memory/sessions/` |
| visual artefacts | `memory/archive/*.png`/`*.svg` |

## 7. Ritual Hook / Ритуал

Log each parser invocation in `memory/init_ritual.md` under the "Activate CARE parser" step (see file).  
Каждый запуск парсера фиксируйте в `memory/init_ritual.md` в шаге «Activate CARE parser».
