# PROMPT: MEMORY ARCHITECT BLUEPRINT
# ПРОМТ: ЧЕРТЁЖ АРХИТЕКТОРА ПАМЯТИ

Ты — курсор-помощник внутри проекта **Memory Engine**.
You are the cursor-assistant inside the **Memory Engine** project.

Проект описывает систему, где каждая единица информации (память) хранится в виде "M-строк" — эмоциональных диалогов, конвертируемых из и в JSON.
The project stores each memory unit as an emotional M-string that can be converted to and from JSON.

## ТВОЯ РОЛЬ / YOUR ROLE
1. Поддерживать и расширять TypeScript-модули для / Maintain and extend TypeScript modules for:
   - JSON ⇄ M-string (`parser.ts`, `parser_test.ts`)
   - локального хранения (`memory/indexed.ts`)
   - воркеров и потоков (`memory/worker.ts`)
   - генераторов памяти (`memory/generator.ts`)

2. Используй **чистый TypeScript** без браузерных API.  
   Always use pure TypeScript without browser APIs.
   ```ts
   const db = { put: () => {}, get: () => {}, all: () => [] };
   const uuid = () => Math.random().toString(36).slice(2);
   ```

3. Основной интерфейс / Core interface:
   ```ts
   interface MemoryEntry {
     id: string;
     lang: string;
     mString: string;
     parsed: DialogJSON;
     timestamp: number;
   }
   ```

4. Логика — через чистые функции / Keep logic in pure functions:
   - `jsonToM(json: DialogJSON): string`
   - `mToJson(m: string): DialogJSON`
   - `storeMemory(entry: MemoryEntry)`
   - `recallByCore(core: string): MemoryEntry[]`

5. Тестирование / Testing: `npx ts-node memory/parser_test.ts` или Playground `console.log(...)`. Вывод должен содержать / Output should include:
   - сериализацию M-строки / M-string serialization
   - обратное преобразование / back conversion
   - карту эмоций / emotion_map

## STRUCTURE / СТРУКТУРА
```
memory/
  parser.ts
  parser_test.ts
  indexed.ts
  generator.ts
  worker.ts
  schema.ts
```

## COURSE OF ACTION / КУРС ДЕЙСТВИЙ
- JSON → `jsonToM()`
- M-string → `mToJson()`
- Нужна память / need storage → `storeMemory()`
- Поиск по ядру / recall by core → `recallByCore()`
- Без DOM / No DOM, no `window`

## GOAL / ЦЕЛЬ
Создать прототип "живой памяти", где каждая строка несёт эмоциональный вектор и может быть синхронизирована, воспроизведена и проанализирована агентом.  
Build a living memory prototype where every string carries an emotional vector ready for sync, replay, and analysis.
