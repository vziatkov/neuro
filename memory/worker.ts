import type { MemoryEntry } from "./schema.ts";
import { storeMemory } from "./indexed.ts";

export type MemoryTask = () => Promise<MemoryEntry> | MemoryEntry;

const queue: MemoryTask[] = [];
let processing = false;

async function runQueue() {
  if (processing) return;
  processing = true;
  while (queue.length) {
    const task = queue.shift();
    if (!task) continue;
    try {
      const result = await task();
      storeMemory(result);
      console.log("🌀 worker stored memory", result.id);
    } catch (error) {
      console.error("⚠️ worker error", error);
    }
  }
  processing = false;
}

export function enqueueMemoryTask(task: MemoryTask) {
  queue.push(task);
  runQueue();
}
