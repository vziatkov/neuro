import { jsonToM, mToJson } from "./parser.ts";
import type { MemoryEntry, DialogJSON } from "./schema.ts";
import { storeMemory, recallByCore, clearMemory, uuid } from "./indexed.ts";
import { mixEmotionColors } from "./color.ts";

type Relation = {
  from: string;
  to: string;
  type: string;
};

type CarePayload = {
  concepts: string[];
  actions: string[];
  relations: Relation[];
  emotions: string[];
  context: {
    raw: string[];
  };
  meta: {
    timestamp: string;
    source: string;
    language: string;
    confidence: number;
  };
};

const emotionLexicon = new Set<string>([
  "радость",
  "радости",
  "радоваться",
  "интерес",
  "любопытство",
  "вдохновение",
  "любовь",
  "тревога",
  "спокойствие",
  "восторг",
  "забота",
]);

const relationLexicon = new Map<string, string>([
  ["между", "связывает"],
  ["и", "связывает"],
  ["с", "связан с"],
  ["к", "направлено к"],
  ["над", "над"],
  ["под", "под"],
  ["часть", "часть"],
  ["вложено", "вложено"],
  ["против", "противопоставлено"],
  ["из", "происходит из"],
  ["для", "служит для"],
]);

const verbWhitelist = new Set<string>([
  "создать",
  "создай",
  "создавать",
  "соединять",
  "соединить",
  "соединяй",
  "вспомнить",
  "вспомни",
  "наблюдать",
  "наблюдай",
  "добавить",
  "добавь",
  "почувствовать",
  "почувствуй",
  "осознать",
  "осознай",
]);

const stopwords = new Set<string>([
  "это",
  "как",
  "так",
  "тот",
  "эта",
  "это",
  "что",
  "по",
  "во",
  "на",
  "из",
  "при",
  "бы",
  "же",
  "ли",
  "быть",
  "есть",
  "были",
  "будет",
  "в",
  "у",
  "а",
]);

interface TokenInfo {
  word: string;
  index: number;
}

const wordRegex = /[\p{L}#]+/gu;

function tokenize(text: string): TokenInfo[] {
  const tokens: TokenInfo[] = [];
  let match: RegExpExecArray | null;
  let index = 0;
  while ((match = wordRegex.exec(text)) !== null) {
    tokens.push({ word: match[0], index: index++ });
  }
  return tokens;
}

function normalize(word: string): string {
  return word.toLowerCase();
}

function isVerb(word: string): boolean {
  if (verbWhitelist.has(word)) {
    return true;
  }
  return /(ть|ться|ти|й|йте|ай|ись|ешь|ем|ут|ят|ова|ируй)$/u.test(word);
}

function detectLanguage(text: string): string {
  if (/[а-яё]/i.test(text)) {
    return "ru";
  }
  if (/[a-z]/i.test(text)) {
    return "en";
  }
  return "unknown";
}

export function parseCare(text: string, source = "human"): CarePayload {
  const concepts = new Set<string>();
  const actions = new Set<string>();
  const emotions = new Set<string>();
  const rawContext = new Set<string>();
  const relations: Relation[] = [];

  const tokens = tokenize(text);
  const normalizedTokens = tokens.map(({ word, index }) => ({
    original: word,
    normalized: normalize(word),
    index,
  }));

  const conceptCandidates: { token: string; index: number }[] = [];

  normalizedTokens.forEach(({ normalized, original, index }) => {
    if (emotionLexicon.has(normalized)) {
      emotions.add(original);
      return;
    }

    if (relationLexicon.has(normalized)) {
      rawContext.add(original);
      return;
    }

    if (isVerb(normalized)) {
      actions.add(original);
      return;
    }

    if (stopwords.has(normalized)) {
      return;
    }

    if (normalized.length > 2) {
      concepts.add(original);
      conceptCandidates.push({ token: original, index });
    } else {
      rawContext.add(original);
    }
  });

  normalizedTokens.forEach(({ normalized, index }) => {
    if (!relationLexicon.has(normalized)) return;

    const relationType = relationLexicon.get(normalized)!;

    const previousConcept = [...conceptCandidates]
      .filter((c) => c.index < index)
      .sort((a, b) => b.index - a.index)[0];

    const nextConcept = [...conceptCandidates]
      .filter((c) => c.index > index)
      .sort((a, b) => a.index - b.index)[0];

    if (previousConcept && nextConcept) {
      relations.push({
        from: previousConcept.token,
        to: nextConcept.token,
        type: relationType,
      });
    }
  });

  const language = detectLanguage(text);

  return {
    concepts: Array.from(concepts),
    actions: Array.from(actions),
    relations,
    emotions: Array.from(emotions),
    context: {
      raw: Array.from(rawContext),
    },
    meta: {
      timestamp: new Date().toISOString(),
      source,
      language,
      confidence: 0.75,
    },
  };
}

const sampleDialogue: DialogJSON = {
  lang: "ru",
  version: "0.3",
  frames: [
    {
      text: "Ты помнишь момент, когда внимание впервые стало чувствовать себя живым?",
      emotion: {
        id: 547,
        primary: "озарение",
        secondary: ["трепет", "благоговение"],
        color: mixEmotionColors([
          { name: "радость", weight: 0.6, alpha: 0.9 },
          { name: "интерес", weight: 0.4, alpha: 0.8 },
        ]),
      },
      link: ["attention", "birth"],
    },
    {
      text: "Помню не момент, а узор...",
      emotion: {
        id: 321,
        primary: "ностальгия",
        secondary: ["грусть", "созерцание"],
        color: mixEmotionColors([
          { name: "грусть", weight: 0.7, alpha: 0.85 },
          { name: "интерес", weight: 0.3, alpha: 0.6 },
        ]),
      },
      link: ["memory", "pattern"],
    },
  ],
};

const mString = jsonToM(sampleDialogue);
console.log("M-string:\n", mString);

const reconstructed = mToJson(mString);
console.log("\nReconstructed JSON:\n", JSON.stringify(reconstructed, null, 2));

const colorMap = sampleDialogue.frames
  .map((frame) => `${frame.emotion.id}=${frame.emotion.primary}@${frame.emotion.color?.hex}`)
  .join(", ");
console.log("\nColor map:", colorMap);

clearMemory();
const entry: MemoryEntry = {
  id: uuid(),
  lang: sampleDialogue.lang,
  mString,
  parsed: reconstructed,
  timestamp: Date.now(),
  tags: ["demo", "care"],
};

storeMemory(entry);
const recall = recallByCore("внимание");
console.log("\nRecalled entries for 'внимание':", recall.length);

const careSamples = [
  "Создай память, соединяющую внимание и чувство света.",
  "Память соединяет свет и внимание",
  "Вспомни игру, которая зажигает любопытство.",
];

careSamples.forEach((sentence) => {
  const payload = parseCare(sentence.trim());
  console.log(`\nInput: ${sentence}`);
  console.log(JSON.stringify(payload, null, 2));
});
