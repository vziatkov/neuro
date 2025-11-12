/**
 * emotional-core.ts
 *
 * Semantic log for swarm impulses, storing emotion-aware telemetry that can be replayed
 * by higher-level cognition or UI layers.
 */

export type EmotionTag =
  | "anticipation"
  | "panic"
  | "trust"
  | "focus"
  | "gratitude"
  | "curiosity"
  | "calm";

export interface EmotionalLogEntry {
  /** Unix epoch milliseconds */
  timestamp: number;
  /** Node or subsystem emitting the emotion */
  source: string;
  /** Primary emotion tag */
  emotion: EmotionTag;
  /** Normalized strength 0..1 */
  strength: number;
  /** Additional semantic metadata */
  meta: Record<string, unknown>;
}

const emotionalBuffer: EmotionalLogEntry[] = [];

/**
 * Append a new entry to the emotional buffer and mirror to console for quick inspection.
 */
export function logEmotion(entry: EmotionalLogEntry): void {
  emotionalBuffer.push(entry);
  // Console trace keeps the wave audible for developers watching the console.
  console.info(
    "[emotional-core]",
    entry.source,
    entry.emotion,
    `strength=${entry.strength.toFixed(2)}`,
    entry.meta,
  );
}

/**
 * Retrieve a snapshot copy of the emotional buffer.
 */
export function getEmotionalBuffer(): EmotionalLogEntry[] {
  return [...emotionalBuffer];
}

/**
 * Utility to clear the buffer — handy for tests or session resets.
 */
export function resetEmotionalBuffer(): void {
  emotionalBuffer.length = 0;
}

