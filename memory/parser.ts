import { DialogJSON, Frame } from "./schema";

const DEFAULT_DELIMITER = "|";

function emotionBlock(frame: Frame): string {
  const { emotion } = frame;
  const values = [emotion.primary, ...emotion.secondary].join(", ");
  const linkPart = frame.link ? `; link: ${frame.link[0]}↔${frame.link[1]}` : "";
  return `|<- ${emotion.id}: [${values}]${linkPart}`;
}

export function jsonToM(json: DialogJSON, delimiter: string = DEFAULT_DELIMITER): string {
  const header = `M${json.version} | ${json.lang} | <type=dialog>`;
  const body = json.frames
    .map((frame) => `${frame.text}\n${emotionBlock(frame)}`)
    .join(`\n${delimiter === DEFAULT_DELIMITER ? "|" : delimiter}`);

  const map = json.frames.map((f) => `${f.emotion.id}=${f.emotion.primary}`).join(", ");
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
      /<-\s*(\d+):\s*\[([^\]]*)\](?:;\s*link:\s*([^↔\s]+)↔([^\s]+))?/
    );

    if (!match) continue;

    const [, idStr, emotionsBlock, linkFrom, linkTo] = match;
    const emotionTokens = emotionsBlock.split(",").map((token) => token.trim()).filter(Boolean);
    const [primary, ...secondary] = emotionTokens.length
      ? emotionTokens
      : ["неизвестно"];

    const frame: Frame = {
      text,
      emotion: {
        id: Number(idStr),
        primary,
        secondary,
      },
    };

    if (linkFrom && linkTo) {
      frame.link = [linkFrom.trim(), linkTo.trim()];
    }

    frames.push(frame);
  }

  return {
    lang,
    version,
    frames,
  };
}
