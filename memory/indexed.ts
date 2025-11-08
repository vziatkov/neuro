import type { MemoryEntry } from "./schema.ts";

const memoryStore: MemoryEntry[] = [];

export const db = {
  put(entry: MemoryEntry) {
    memoryStore.push(entry);
    return entry.id;
  },
  all() {
    return [...memoryStore];
  },
  clear() {
    memoryStore.length = 0;
  },
};

export const uuid = () => Math.random().toString(36).slice(2);

export function storeMemory(entry: MemoryEntry): string {
  console.log("🧠 MemoryAgent store", entry.id);
  return db.put(entry);
}

export function recallByCore(core: string): MemoryEntry[] {
  const normalized = core.toLowerCase();
  return db
    .all()
    .filter((entry) =>
      entry.mString.toLowerCase().includes(normalized) ||
      entry.parsed.frames.some((frame) => frame.text.toLowerCase().includes(normalized))
    );
}

export function clearMemory() {
  console.log("🧠 MemoryAgent clear");
  db.clear();
}

console.log("🧠 MemoryAgent initialized (in-memory stub)");
