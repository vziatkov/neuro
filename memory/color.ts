import type { EmotionColor } from "./schema.ts";

const BASE_HUES: Record<string, number> = {
  "гнев": 0,
  "anger": 0,
  "anticipation": 30,
  "ожидание": 30,
  "радость": 60,
  "joy": 60,
  "доверие": 120,
  "trust": 120,
  "спокойствие": 120,
  "fear": 165,
  "страх": 165,
  "интерес": 180,
  "interest": 180,
  "удивление": 200,
  "surprise": 200,
  "грусть": 240,
  "sadness": 240,
  "отвращение": 300,
  "disgust": 300,
};

const clamp01 = (x: number) => Math.max(0, Math.min(1, x));

function defaultArousal(name: string) {
  switch (name) {
    case "гнев":
    case "anger":
    case "страх":
    case "fear":
    case "удивление":
    case "surprise":
      return 0.8;
    case "радость":
    case "joy":
    case "интерес":
    case "interest":
      return 0.6;
    case "грусть":
    case "sadness":
      return 0.35;
    case "доверие":
    case "trust":
    case "спокойствие":
      return 0.3;
    default:
      return 0.5;
  }
}

function defaultValence(name: string) {
  switch (name) {
    case "радость":
    case "joy":
    case "доверие":
    case "trust":
    case "спокойствие":
      return 0.7;
    case "интерес":
    case "interest":
      return 0.6;
    case "удивление":
    case "surprise":
      return 0.5;
    case "страх":
    case "fear":
    case "гнев":
    case "anger":
    case "отвращение":
    case "disgust":
    case "грусть":
    case "sadness":
      return 0.3;
    default:
      return 0.5;
  }
}

function hslToHex(h: number, s: number, l: number, alpha: number) {
  h = ((h % 360) + 360) % 360;
  s = clamp01(s);
  l = clamp01(l);
  alpha = clamp01(alpha);

  const c = (1 - Math.abs(2 * l - 1)) * s;
  const hp = h / 60;
  const x = c * (1 - Math.abs((hp % 2) - 1));
  let [r1, g1, b1] = [0, 0, 0];

  if (0 <= hp && hp < 1) [r1, g1, b1] = [c, x, 0];
  else if (1 <= hp && hp < 2) [r1, g1, b1] = [x, c, 0];
  else if (2 <= hp && hp < 3) [r1, g1, b1] = [0, c, x];
  else if (3 <= hp && hp < 4) [r1, g1, b1] = [0, x, c];
  else if (4 <= hp && hp < 5) [r1, g1, b1] = [x, 0, c];
  else if (5 <= hp && hp < 6) [r1, g1, b1] = [c, 0, x];

  const m = l - c / 2;
  const r = Math.round((r1 + m) * 255);
  const g = Math.round((g1 + m) * 255);
  const b = Math.round((b1 + m) * 255);
  const a = Math.round(alpha * 255);

  const hex = (n: number) => n.toString(16).padStart(2, "0").toUpperCase();
  return `#${hex(r)}${hex(g)}${hex(b)}${hex(a)}`;
}

export type EmotionPoint = {
  name: string;
  weight?: number;
  arousal?: number;
  valence?: number;
  alpha?: number;
};

export function mixEmotionColors(points: EmotionPoint[]): EmotionColor {
  if (!points.length) return { hex: "#00000000" };

  let sumW = 0;
  let sumS = 0;
  let sumL = 0;
  let sumA = 0;
  let vx = 0;
  let vy = 0;

  for (const point of points) {
    const weight = point.weight ?? 1;
    sumW += weight;

    const hue = (BASE_HUES[point.name] ?? 0) * (Math.PI / 180);
    vx += Math.cos(hue) * weight;
    vy += Math.sin(hue) * weight;

    const s = point.arousal ?? defaultArousal(point.name);
    const l = point.valence ?? defaultValence(point.name);
    const alpha = point.alpha ?? 1;

    sumS += s * weight;
    sumL += l * weight;
    sumA += alpha * weight;
  }

  const hRad = Math.atan2(vy, vx);
  const hDeg = ((hRad * 180) / Math.PI + 360) % 360;
  const S = clamp01(sumS / sumW);
  const L = clamp01(sumL / sumW);
  const A = clamp01(sumA / sumW);

  return { hex: hslToHex(hDeg, S, L, A) };
}
