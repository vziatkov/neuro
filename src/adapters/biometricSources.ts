// src/adapters/biometricSources.ts

// Без внешних зависимостей; легкий парсер CSV, z-score нормализация, линейный ресэмплинг

export type RawPhysioRow = { timestamp: number; ecg?: number; resp?: number };

export type EmotionLabel = "calm" | "stress" | "amusement" | "neutral" | "focus";

export interface EmotionSpan {
    start_ts: number;
    end_ts: number;
    label: EmotionLabel;
}

export interface ResampledStreams {
    t: number[];             // timestamps (ms) равномерные
    ecg?: number[];          // нормализованные значения
    resp?: number[];         // нормализованные значения
    label?: EmotionLabel[];  // дискретные метки для каждого t
}

export async function loadText(url: string): Promise<string> {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Failed to load ${url}`);
    return await res.text();
}

function tryParseJSON<T>(text: string): T | null {
    try { 
        return JSON.parse(text) as T; 
    } catch { 
        return null; 
    }
}

function parseCSV(text: string): Record<string, string>[] {
    const lines = text.trim().split(/\r?\n/);
    const header = lines.shift()?.split(",") ?? [];
    return lines.map(line => {
        const cols = line.split(",");
        const obj: Record<string, string> = {};
        header.forEach((h, i) => obj[h.trim()] = (cols[i] ?? "").trim());
        return obj;
    });
}

export async function loadPhysioCSVorJSON(url: string): Promise<RawPhysioRow[]> {
    const text = await loadText(url);
    const json = tryParseJSON<RawPhysioRow[]>(text);
    if (json) return json;
    
    const rows = parseCSV(text);
    return rows.map(r => ({
        timestamp: Number(r.timestamp),
        ecg: r.ecg !== undefined && r.ecg !== "" ? Number(r.ecg) : undefined,
        resp: r.resp !== undefined && r.resp !== "" ? Number(r.resp) : undefined,
    })).filter(r => Number.isFinite(r.timestamp));
}

export async function loadWESADLabels(url: string): Promise<EmotionSpan[]> {
    const text = await loadText(url);
    const json = tryParseJSON<EmotionSpan[]>(text);
    if (json) return json;
    
    const rows = parseCSV(text);
    return rows.map(r => ({
        start_ts: Number(r.start_ts),
        end_ts: Number(r.end_ts),
        label: (r.label as EmotionLabel) ?? "neutral",
    })).filter(s =>
        Number.isFinite(s.start_ts) && Number.isFinite(s.end_ts) && s.end_ts > s.start_ts
    );
}

// --- утилиты нормализации/ресэмплинга ---

function zscore(arr: number[]): number[] {
    const n = arr.length;
    if (n === 0) return arr;
    const mean = arr.reduce((a, b) => a + b, 0) / n;
    const variance = arr.reduce((a, b) => a + (b - mean) ** 2, 0) / n;
    const sd = Math.sqrt(variance) || 1e-6;
    return arr.map(v => (v - mean) / sd);
}

function linInterp(x0: number, y0: number, x1: number, y1: number, x: number): number {
    if (x1 === x0) return y0;
    const t = (x - x0) / (x1 - x0);
    return y0 + t * (y1 - y0);
}

function sampleAt(ts: number[], vs: number[], t: number): number {
    // бинарный поиск соседей
    let lo = 0, hi = ts.length - 1;
    if (t <= ts[0]) return vs[0];
    if (t >= ts[hi]) return vs[hi];
    
    while (hi - lo > 1) {
        const mid = (lo + hi) >> 1;
        if (ts[mid] <= t) lo = mid; 
        else hi = mid;
    }
    
    return linInterp(ts[lo], vs[lo], ts[hi], vs[hi], t);
}

function mapLabels(t: number[], spans: EmotionSpan[]): EmotionLabel[] {
    return t.map(tt => {
        const span = spans.find(s => tt >= s.start_ts && tt < s.end_ts);
        return span?.label ?? "neutral";
    });
}

export function resampleStreams(
    rows: RawPhysioRow[],
    labels: EmotionSpan[] | null,
    targetHz = 30
): ResampledStreams {
    if (!rows.length) return { t: [] };
    
    // соберём массивы с возможными пропусками
    const ts = rows.map(r => r.timestamp);
    const ecgRaw = rows.map(r => r.ecg).filter((v): v is number => typeof v === "number");
    const respRaw = rows.map(r => r.resp).filter((v): v is number => typeof v === "number");
    const hasECG = ecgRaw.length > 0;
    const hasRESP = respRaw.length > 0;
    
    // если значения есть не на каждом шаге, создадим отдельные столбцы, выровненные к ts
    const ecgSeries = hasECG ? rows.map(r => (typeof r.ecg === "number" ? r.ecg : NaN)) : [];
    const respSeries = hasRESP ? rows.map(r => (typeof r.resp === "number" ? r.resp : NaN)) : [];
    
    // интерполяция пропусков на исходной сетке
    function forwardFillInterp(arr: number[]): number[] {
        if (!arr.length) return arr;
        let last = arr.find(v => Number.isFinite(v));
        const out = arr.slice();
        
        for (let i = 0; i < out.length; i++) {
            if (!Number.isFinite(out[i])) {
                // ищем ближайшее будущее значение
                let j = i + 1; 
                let nxt: number | undefined;
                while (j < out.length && !Number.isFinite(out[j])) j++;
                if (j < out.length) nxt = out[j] as number;
                
                const cur = last ?? nxt ?? 0;
                const val = (last !== undefined && nxt !== undefined && j !== i)
                    ? linInterp(0, last, j - i, nxt, 1) // грубая линейка
                    : cur;
                out[i] = val;
            }
            last = out[i];
        }
        
        return out as number[];
    }
    
    const ecgFilled = hasECG ? forwardFillInterp(ecgSeries) : [];
    const respFilled = hasRESP ? forwardFillInterp(respSeries) : [];
    
    // нормализация (z-score) на исходной сетке
    const ecgNorm = hasECG ? zscore(ecgFilled) : [];
    const respNorm = hasRESP ? zscore(respFilled) : [];
    
    // создаём равномерную временную сетку
    const dt = 1000 / targetHz;
    const t0 = ts[0];
    const tN = ts[ts.length - 1];
    const tUniform: number[] = [];
    for (let t = t0; t <= tN; t += dt) tUniform.push(Math.round(t));
    
    // ресэмплинг на равномерную сетку
    const ecgRes = hasECG ? tUniform.map(tt => sampleAt(ts, ecgNorm, tt)) : undefined;
    const respRes = hasRESP ? tUniform.map(tt => sampleAt(ts, respNorm, tt)) : undefined;
    const labRes = labels ? mapLabels(tUniform, labels) : undefined;
    
    return { t: tUniform, ecg: ecgRes, resp: respRes, label: labRes };
}

