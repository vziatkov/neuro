// src/adapters/biometricMux.ts

import type { ResampledStreams, EmotionLabel } from "./biometricSources";

export interface HeartFrame { 
    bpmLike: number; 
    intensity: number; 
}

export interface BreathFrame { 
    depth: number; 
    phase: "inhale" | "exhale"; 
}

export interface EmotionFrame { 
    label: EmotionLabel; 
    value01: number; 
}

export interface MuxFrame {
    t: number;
    heart?: HeartFrame;
    breath?: BreathFrame;
    emotion?: EmotionFrame;
}

export function* muxResampled(res: ResampledStreams): Generator<MuxFrame> {
    const n = res.t.length;
    let lastResp = 0;
    
    for (let i = 0; i < n; i++) {
        const t = res.t[i];
        const heartVal = res.ecg?.[i];     // z-score ECG → «интенсивность»
        const respVal  = res.resp?.[i];    // z-score RESP → глубина
        const label    = res.label?.[i] ?? "neutral";
        
        // простая эвристика для фазы дыхания
        const phase: "inhale" | "exhale" = respVal !== undefined && respVal >= lastResp ? "inhale" : "exhale";
        lastResp = respVal ?? lastResp;
        
        // z-score уже нормализован, сведём к [0..1] «мягким» сигмоидом
        const squash01 = (x: number) => 1 / (1 + Math.exp(-x));
        
        const frame: MuxFrame = { t };
        
        if (heartVal !== undefined) {
            frame.heart = {
                bpmLike: 60 + 20 * squash01(heartVal),         // псевдо-BPM для визу модуляций
                intensity: squash01(heartVal)                  // 0..1
            };
        }
        
        if (respVal !== undefined) {
            frame.breath = {
                depth: Math.max(0, Math.min(1, (respVal + 3) / 6)), // от z∈[-3..+3] к [0..1]
                phase
            };
        }
        
        // маппинг эмоций в численный валор
        const labelToVal: Record<EmotionLabel, number> = {
            calm: 0.2, 
            neutral: 0.4, 
            focus: 0.6, 
            amusement: 0.7, 
            stress: 0.9
        };
        
        frame.emotion = { 
            label, 
            value01: labelToVal[label] ?? 0.4 
        };
        
        yield frame;
    }
}

