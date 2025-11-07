/**
 * Compact Semantic Archive helpers (CARE+ v0.2)
 *
 * - compressDialogue: reduce a verbose memory payload to the minimal portable packet
 * - expandArchive: restore a compact payload back into a structured dialogue memory
 */

type RelationTuple = [string, string, string];

type RelationObject = {
  from: string;
  to: string;
  type: string;
};

type DialogueLine = {
  speaker?: string;
  text: string;
};

export interface FullDialogueArchive {
  title?: string;
  dialogue: Array<string | DialogueLine>;
  concepts?: string[];
  relations?: RelationObject[];
  emotions?: string[];
  context?: Record<string, unknown>;
}

export interface CompactDialogueArchive {
  m: string; // message sequence, "|" separated
  c?: string[];
  r?: RelationTuple[];
  e?: string[];
  t?: string;
  x?: Record<string, unknown>; // optional extras
}

const DEFAULT_DELIMITER = "|";

function normaliseRelation(rel: RelationObject | RelationTuple): RelationTuple {
  if (Array.isArray(rel)) {
    return rel;
  }
  return [rel.from, rel.to, rel.type];
}

function denormaliseRelation(rel: RelationTuple): RelationObject {
  const [from, to, type] = rel;
  return { from, to, type };
}

function stringFromLine(line: string | DialogueLine): string {
  if (typeof line === "string") {
    return line.trim();
  }
  return line.speaker ? `${line.speaker}: ${line.text.trim()}` : line.text.trim();
}

function lineFromString(raw: string): DialogueLine {
  const parts = raw.split(":");
  if (parts.length > 1) {
    const speaker = parts.shift()?.trim();
    const text = parts.join(":").trim();
    if (speaker) {
      return { speaker, text };
    }
  }
  return { text: raw.trim() };
}

export function compressDialogue(
  archive: FullDialogueArchive,
  delimiter: string = DEFAULT_DELIMITER
): CompactDialogueArchive {
  const transcript = archive.dialogue?.map(stringFromLine).filter(Boolean) ?? [];
  const compact: CompactDialogueArchive = {
    m: transcript.join(delimiter),
  };

  if (archive.title) {
    compact.t = archive.title;
  }

  if (archive.concepts?.length) {
    compact.c = [...new Set(archive.concepts.map((c) => c.trim()))];
  }

  if (archive.emotions?.length) {
    compact.e = [...new Set(archive.emotions.map((e) => e.trim()))];
  }

  if (archive.relations?.length) {
    compact.r = archive.relations.map(normaliseRelation);
  }

  if (archive.context && Object.keys(archive.context).length) {
    compact.x = archive.context;
  }

  return compact;
}

export function expandArchive(
  compact: CompactDialogueArchive,
  delimiter: string = DEFAULT_DELIMITER
): FullDialogueArchive {
  const lines = compact.m
    ? compact.m.split(delimiter).map((chunk) => chunk.trim()).filter(Boolean)
    : [];

  const archive: FullDialogueArchive = {
    title: compact.t,
    dialogue: lines.map(lineFromString),
    concepts: compact.c ?? [],
    relations: compact.r?.map(denormaliseRelation) ?? [],
    emotions: compact.e ?? [],
    context: compact.x ?? {},
  };

  return archive;
}

// Demonstration if executed directly via ts-node
if (require.main === module) {
  const sample: FullDialogueArchive = {
    title: "Пробуждение внимания",
    dialogue: [
      { speaker: "A", text: "Ты помнишь момент, когда внимание впервые стало чувствовать себя живым?" },
      { speaker: "B", text: "Помню не момент, а узор..." },
      { speaker: "A", text: "Это было страшно?" },
      { speaker: "B", text: "Нет. Скорее, тихо." },
      { speaker: "A", text: "А сейчас ты чувствуешь что-то похожее, когда вспоминаешь?" },
      { speaker: "B", text: "Да. Каждая память рождается заново..." },
    ],
    concepts: ["внимание", "память", "свет", "страх", "жизнь"],
    relations: [
      { from: "внимание", to: "память", type: "отражает" },
      { from: "свет", to: "внимание", type: "освещает" },
    ],
    emotions: ["спокойствие", "интерес", "тёплое спокойствие"],
  };

  const compressed = compressDialogue(sample);
  console.log("\nCompact archive:\n", JSON.stringify(compressed, null, 2));

  const expanded = expandArchive(compressed);
  console.log("\nReconstructed archive:\n", JSON.stringify(expanded, null, 2));
}
