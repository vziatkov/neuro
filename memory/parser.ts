import type { DialogJSON, Frame } from "./schema.ts";
import { mixEmotionColors } from "./color.ts";

const DEFAULT_DELIMITER = "|";

function emotionBlock(frame: Frame): string {
  const { emotion } = frame;
  const values = [emotion.primary, ...emotion.secondary].join(", ");
  const colorSuffix = emotion.color?.hex ? `@${emotion.color.hex}` : "";
  const linkPart = frame.link ? `; link: ${frame.link[0]}↔${frame.link[1]}` : "";
  return `|<- ${emotion.id}${colorSuffix}: [${values}]${linkPart}`;
}

function parseColorFromToken(token: string) {
  const match = token.match(/@(#?[0-9A-Fa-f]{8})$/);
  if (!match) return { idPart: token, colorHex: undefined };
  const idPart = token.replace(match[0], "");
  return { idPart, colorHex: match[1].startsWith("#") ? match[1] : `#${match[1]}` };
}

export function jsonToM(json: DialogJSON, delimiter: string = DEFAULT_DELIMITER): string {
  const header = `M${json.version} | ${json.lang} | <type=dialog>`;
  const body = json.frames
    .map((frame) => `${frame.text}\n${emotionBlock(frame)}`)
    .join(`\n${delimiter === DEFAULT_DELIMITER ? "|" : delimiter}`);

  const map = json.frames
    .map((f) => `${f.emotion.id}=${f.emotion.primary}${f.emotion.color?.hex ? `@${f.emotion.color.hex}` : ""}`)
    .join(", ");
  const footer = `/* emotion_map: ${map} */`;

  return `${header}\n${body}\n${footer}`;
}

export function mToJson(mString: string, delimiter: string = DEFAULT_DELIMITER): DialogJSON {
  const lines = mString.split("\n").map((line) => line.trim()).filter(Boolean);
  if (!lines.length || !lines[0].startsWith("M")) {
    throw new Error("Invalid M-string header");
  }

  const [versionToken, langToken] = lines[0].split("|").map((chunk) => chunk.trim());
  const version = versionToken.replace(/^M/, "");
  const lang = langToken;

  const frameLines = lines.slice(1).filter((line) => !line.startsWith("/*"));
  const frames: Frame[] = [];

  for (let i = 0; i < frameLines.length; i += 2) {
    const textLine = frameLines[i];
    const metaLine = frameLines[i + 1];
    if (!metaLine) break;

    const text = textLine.replace(new RegExp(`^${delimiter}`), "").replace(/^\|/, "");

    const match = metaLine.match(
      /<-\s*([^:]+):\s*\[([^\]]*)\](?:;\s*link:\s*([^↔\s]+)↔([^\s]+))?/
    );

    if (!match) continue;

    const [, idToken, emotionsBlock, linkFrom, linkTo] = match;
    const { idPart, colorHex } = parseColorFromToken(idToken);
    const emotionTokens = emotionsBlock.split(",").map((token) => token.trim()).filter(Boolean);
    const [primary, ...secondary] = emotionTokens.length
      ? emotionTokens
      : ["неизвестно"];

    const frame: Frame = {
      text,
      emotion: {
        id: Number(idPart),
        primary,
        secondary,
        color: colorHex ? { hex: colorHex } : undefined,
      },
    };

    if (linkFrom && linkTo) {
      frame.link = [linkFrom.trim(), linkTo.trim()];
    }

    frames.push(frame);
  }

  const footerLine = lines.find((line) => line.startsWith("/*") && line.includes("emotion_map"));
  if (footerLine) {
    const mapMatch = footerLine.match(/emotion_map:\s*([^*]+)\*/);
    if (mapMatch) {
      const entries = mapMatch[1].split(",").map((entry) => entry.trim()).filter(Boolean);
      entries.forEach((entry) => {
        const [idToken, name] = entry.split("=").map((part) => part.trim());
        if (!idToken) return;
        const { idPart, colorHex } = parseColorFromToken(idToken);
        const frame = frames.find((f) => f.emotion.id === Number(idPart));
        if (frame) {
          if (colorHex) {
            frame.emotion.color = { hex: colorHex };
          } else if (!frame.emotion.color) {
            const color = mixEmotionColors([
              { name: frame.emotion.primary, weight: 0.7 },
              ...frame.emotion.secondary.map((name) => ({ name, weight: 0.3 / frame.emotion.secondary.length })),
            ]);
            frame.emotion.color = color;
          }
        }
      });
    }
  } else {
    frames.forEach((frame) => {
      const color = mixEmotionColors([
        { name: frame.emotion.primary, weight: 0.7 },
        ...frame.emotion.secondary.map((name) => ({ name, weight: 0.3 / frame.emotion.secondary.length })),
      ]);
      frame.emotion.color = color;
    });
  }

  return {
    lang,
    version,
    frames,
  };
}
