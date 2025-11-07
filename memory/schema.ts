export interface Emotion {
  id: number;
  primary: string;
  secondary: string[];
}

export interface Frame {
  text: string;
  emotion: Emotion;
  link?: [string, string];
}

export interface DialogJSON {
  lang: string;
  version: string;
  frames: Frame[];
}

export interface MemoryEntry {
  id: string;
  lang: string;
  mString: string;
  parsed: DialogJSON;
  timestamp: number;
  tags?: string[];
  meta?: Record<string, unknown>;
}
