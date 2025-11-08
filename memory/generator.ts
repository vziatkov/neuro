import type { DialogJSON, MemoryEntry } from "./schema.ts";
import { jsonToM } from "./parser.ts";
import { uuid } from "./indexed.ts";

export function generateMemoryEntry(dialog: DialogJSON, tags: string[] = []): MemoryEntry {
  const mString = jsonToM(dialog);
  return {
    id: uuid(),
    lang: dialog.lang,
    mString,
    parsed: dialog,
    timestamp: Date.now(),
    tags,
  };
}

export function synthesizeEmotionMap(dialog: DialogJSON): string {
  return dialog.frames
    .map((frame) => `${frame.emotion.id}=${frame.emotion.primary}`)
    .join(", ");
}
