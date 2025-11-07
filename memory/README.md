# Memory Subsystem / Подсистема памяти

The `memory/` directory is the semantic inner space of the `neuro` project. It complements the code pipeline (`src/`, `SMM/`, `public/`) with a long-term memory layer that LLM assistants and human collaborators can query, extend, and archive.

`memory/` — это семантическое "внутреннее пространство" проекта `neuro`. Оно дополняет кодовую часть (`src/`, `SMM/`, `public/`) долговременной памятью, к которой могут обращаться и которую могут расширять LLM-ассистенты и участники команды.

## Structure / Структура

```
memory/
  prompts/      # System- and story-level prompts, directives, role scripts
  sessions/     # Dialog archives, LLM states, curated chat exports
  archive/      # Semantic maps, JSON timelines, visual memory artifacts
  notes.md      # Living commentary, design principles, philosophical notes
```
```
memory/
  prompts/      # Системные и сюжетные промты, директивы, ролевые сценарии
  sessions/     # Архивы диалогов, состояния LLM, подготовленные выгрузки
  archive/      # Семантические карты, временные шкалы, визуальные артефакты
  notes.md      # Живые заметки, принципы дизайна, философские размышления
```

## How to Use / Как использовать

- **prompts/** — Keep reusable system prompts, narrative seeds, and role descriptions. Organize by topic or agent (e.g., `architect.md`, `curator.md`).  
  Храните многократно используемые системные промты, сюжетные заготовки и роли. Группируйте по темам или агентам.
- **sessions/** — Store raw or processed conversation logs. Use dated filenames or tags. Private or sensitive dumps should be prefixed with `private_` (see privacy rules below).  
  Сохраняйте сырой или обработанный лог сессий. Используйте даты и теги. Конфиденциальные записи начинайте с `private_`.
- **archive/** — Drop semantic artifacts: JSON summaries, knowledge graphs, vector embeds, attention heatmaps, concept atlases. Each file should include metadata (creator, timestamp, context) inside the payload.  
  Складывайте сюда семантические артефакты: JSON-конспекты, графы, векторные представления, карты внимания. Не забывайте про метаданные (кто, когда, контекст).
- **notes.md** — A manifesto-in-progress. Capture insights about the evolving memory architecture, heuristics for curation, and future rituals for maintaining the system.  
  Живой манифест. Записывайте инсайты об архитектуре памяти, эвристики по кураторству, идеи будущих ритуалов.

## Formats / Форматы

- **JSON snapshots** — `{"timestamp": "...", "topics": [...], "links": {...}}`
- **Markdown prompts** — Rich text with role instructions and scenario staging.
- **Visual maps** — PNG/SVG layers showing token colors, attention beams, or conceptual clusters.
- **Plain text** — Quick thought dumps, TODOs, or philosophical reflections.

- **JSON-снапшоты** — `{"timestamp": "...", "topics": [...], "links": {...}}`
- **Markdown-промты** — Расширенный текст с инструкциями и сценариями.
- **Визуальные карты** — PNG/SVG с цветами токенов, лучами внимания, кластерными картами.
- **Текст** — Быстрые заметки, TODO, философские этюды.

Keep files human-readable when possible. If you generate binary data (e.g., embeddings), document how to decode them.  
Старайтесь, чтобы файлы были читаемы человеком. Если появляются бинарные данные, описывайте способ их распаковки.

## Integration Guidelines / Рекомендации по интеграции

1. Treat `memory/` as an evolving knowledge base. Whenever a major idea crystallizes, capture it here.  
   Думайте о `memory/` как о развивающейся базе знаний — фиксируйте сюда ключевые идеи.
2. Reference memory artifacts from code comments or notebooks when they inform implementation decisions.  
   Ссылайтесь на артефакты памяти из кода или ноутбуков, если они влияют на решения.
3. When building LLM pipelines, read from `memory/prompts/` for system prompts, and append to `memory/sessions/` after each session.  
   Встраивайте `memory/prompts/` в пайплайны и дополняйте `memory/sessions/` после сессий.
4. Schedule periodic reviews: prune stale entries, consolidate overlapping notes, and promote key insights to `archive/`.  
   Проводите ревизии: удаляйте устаревшее, объединяйте дубли, продвигайте важные идеи в `archive/`.

## Privacy & Git Hygiene / Приватность и гигиена Git

- Sensitive sessions should live in `memory/sessions/private_*.json` and are excluded from git (see repo `.gitignore`).  
  Конфиденциальные записи — `memory/sessions/private_*.json`, они исключены из Git.
- For public entries, scrub personal data and mark licensing if you remix external sources.  
  Для публичных файлов удаляйте персональные данные и отмечайте лицензии, если используете внешние источники.

## Roadmap Ideas / Возможные направления

- Auto-summarizers that turn session logs into archive-ready JSON.  
  Автосаммаризации логов.
- Visualizers that render attention trails or memory palaces from archives.  
  Визуализация треков внимания, "дворцов памяти".
- CI hooks that remind contributors to update memory artifacts when key modules change.  
  CI-напоминания об обновлении памяти при изменении ключевых модулей.

**Remember:** `memory/` is not just storage — it is the inner mind of `neuro`. Cultivate it with intention.  
**Помните:** `memory/` — не просто хранилище, а внутренний разум `neuro`. Развивайте его осознанно.
