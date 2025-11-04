/**
 * Biometric Flow Simulator
 * Generates automatic pulses from simulated biometric data
 */

import * as THREE from 'three';
import { gptLogInfo, gptLogSuccess } from './logger/gptLogger';

export interface BiometricLayer {
    id: string;
    type: 'respiratory' | 'cardiovascular' | 'affective';
    active: boolean;
    data: {
        phase?: number;
        depth?: number;
        rate_bpm?: number;
        intensity: number;
        bpm?: number;
        hrv?: number;
        variability?: number;
        stress?: number;
        calm?: number;
        focus?: number;
        dominant?: string;
    };
    visual: {
        color: string;
        pulse_origin: THREE.Vector3;
        pattern: string;
        radius: number;
    };
    phase: number; // Internal phase for animation
    lastPulseTime: number;
}

export interface BiometricLink {
    source: string;
    target: string;
    strength: number;
    effect: 'amplify' | 'modulate' | 'influence';
    description: string;
}

export interface BiometricFlow {
    layers: BiometricLayer[];
    links: BiometricLink[];
}

export class BiometricSimulator {
    private flow: BiometricFlow;
    private clock: THREE.Clock;
    private isRunning: boolean = false;
    private pulseCallbacks: Array<(layer: BiometricLayer, intensity: number) => void> = [];
    
    // Frequency constants (Hz)
    private readonly BREATH_FREQ = 0.2; // ~12 breaths/min
    private readonly HEART_FREQ = 1.0; // ~60 bpm (adjustable)
    private readonly EMOTION_FREQ = 0.02; // Slow changes

    constructor() {
        this.clock = new THREE.Clock();
        this.flow = this.createDefaultFlow();
    }

    private createDefaultFlow(): BiometricFlow {
        return {
            layers: [
                {
                    id: 'breath',
                    type: 'respiratory',
                    active: true,
                    data: {
                        phase: 0,
                        depth: 0.85,
                        rate_bpm: 12,
                        intensity: 0.9
                    },
                    visual: {
                        color: '#4fd1c5',
                        pulse_origin: new THREE.Vector3(0.0, 5.0, 0.0),
                        pattern: 'wave_expansion',
                        radius: 8.5
                    },
                    phase: 0,
                    lastPulseTime: 0
                },
                {
                    id: 'heart',
                    type: 'cardiovascular',
                    active: true,
                    data: {
                        bpm: 72,
                        hrv: 45,
                        intensity: 0.7,
                        variability: 0.12
                    },
                    visual: {
                        color: '#f6ad55',
                        pulse_origin: new THREE.Vector3(2.0, 0.0, -3.0),
                        pattern: 'pulse_radiation',
                        radius: 6.2
                    },
                    phase: 0,
                    lastPulseTime: 0
                },
                {
                    id: 'emotion',
                    type: 'affective',
                    active: true,
                    data: {
                        stress: 0.3,
                        calm: 0.8,
                        focus: 0.6,
                        dominant: 'calm',
                        intensity: 0.5
                    },
                    visual: {
                        color: '#ed64a6',
                        pulse_origin: new THREE.Vector3(-2.0, -3.0, 2.0),
                        pattern: 'node_color_shift',
                        radius: 5.0
                    },
                    phase: 0,
                    lastPulseTime: 0
                }
            ],
            links: [
                {
                    source: 'breath',
                    target: 'heart',
                    strength: 0.8,
                    effect: 'amplify',
                    description: 'Deep breath amplifies heart pulse'
                },
                {
                    source: 'heart',
                    target: 'emotion',
                    strength: 0.6,
                    effect: 'modulate',
                    description: 'Heart rhythm modulates emotional state'
                },
                {
                    source: 'emotion',
                    target: 'breath',
                    strength: 0.5,
                    effect: 'influence',
                    description: 'Calm emotion regulates breathing'
                }
            ]
        };
    }

    /**
     * Load flow from JSON
     */
    loadFlow(json: any): void {
        if (json.flow && json.flow.layers) {
            this.flow.layers = json.flow.layers.map((layer: any) => ({
                ...layer,
                visual: {
                    ...layer.visual,
                    pulse_origin: new THREE.Vector3(
                        layer.visual.pulse_origin.x,
                        layer.visual.pulse_origin.y,
                        layer.visual.pulse_origin.z
                    )
                },
                phase: 0,
                lastPulseTime: 0
            }));
            
            if (json.flow.links) {
                this.flow.links = json.flow.links;
            }
        }
    }

    /**
     * Subscribe to pulse events
     */
    onPulse(callback: (layer: BiometricLayer, intensity: number) => void): void {
        this.pulseCallbacks.push(callback);
    }

    /**
     * Start simulation loop
     */
    start(): void {
        if (this.isRunning) return;
        
        this.isRunning = true;
        this.clock.start();
        this.update();
        gptLogSuccess('🧬 Biometric simulator started', ['biometric', 'simulator']);
    }

    /**
     * Stop simulation
     */
    stop(): void {
        this.isRunning = false;
        this.clock.stop();
        gptLogInfo('🧬 Biometric simulator stopped', ['biometric', 'simulator']);
    }

    /**
     * Main update loop
     */
    private update(): void {
        if (!this.isRunning) return;

        const deltaTime = this.clock.getDelta();
        const currentTime = this.clock.getElapsedTime();

        // Update each layer
        this.flow.layers.forEach(layer => {
            if (!layer.active) return;

            layer.phase += deltaTime;

            switch (layer.type) {
                case 'respiratory':
                    this.updateBreathLayer(layer, deltaTime, currentTime);
                    break;
                case 'cardiovascular':
                    this.updateHeartLayer(layer, deltaTime, currentTime);
                    break;
                case 'affective':
                    this.updateEmotionLayer(layer, deltaTime);
                    break;
            }

            // Apply link effects
            this.applyLinks(layer);
        });

        requestAnimationFrame(() => this.update());
    }

    /**
     * Update breath layer (sinusoidal cycle)
     */
    private updateBreathLayer(layer: BiometricLayer, dt: number, time: number): void {
        const frequency = (layer.data.rate_bpm || 12) / 60.0; // Convert BPM to Hz
        layer.phase = (layer.phase + dt * frequency * 2 * Math.PI) % (2 * Math.PI);
        
        // Sinusoidal intensity (inhale = 0 to π, exhale = π to 2π)
        const cyclePhase = Math.sin(layer.phase);
        const isInhaling = layer.phase < Math.PI;
        
        // Intensity peaks during inhale
        layer.data.intensity = 0.5 + (layer.data.depth || 0.5) * (isInhaling ? cyclePhase : -cyclePhase * 0.3);
        
        // Trigger pulse on inhale peak
        if (isInhaling && cyclePhase > 0.95 && (time - layer.lastPulseTime) > 0.5) {
            this.triggerPulse(layer, layer.data.intensity);
            layer.lastPulseTime = time;
        }
    }

    /**
     * Update heart layer (rhythmic pulses)
     */
    private updateHeartLayer(layer: BiometricLayer, dt: number, time: number): void {
        const bpm = layer.data.bpm || 72;
        const frequency = bpm / 60.0; // BPM to Hz
        const period = 1.0 / frequency;
        
        // Add variability (HRV)
        const hrv = layer.data.variability || 0.1;
        const variation = (Math.sin(time * 0.5) * hrv);
        const adjustedPeriod = period * (1.0 + variation);
        
        if ((time - layer.lastPulseTime) >= adjustedPeriod) {
            // Pulse with HRV-based intensity variation
            const baseIntensity = layer.data.intensity || 0.7;
            const pulseIntensity = baseIntensity * (1.0 + Math.sin(time * 2.0) * 0.2);
            
            this.triggerPulse(layer, pulseIntensity);
            layer.lastPulseTime = time;
        }
    }

    /**
     * Update emotion layer (slow drift)
     */
    private updateEmotionLayer(layer: BiometricLayer, dt: number): void {
        // Slow sinusoidal drift
        const drift = Math.sin(this.clock.getElapsedTime() * this.EMOTION_FREQ * 2 * Math.PI) * 0.1;
        
        // Update emotion values with smooth transitions
        if (layer.data.stress !== undefined) {
            layer.data.stress = Math.max(0, Math.min(1, (layer.data.stress || 0.3) + drift * 0.05));
        }
        if (layer.data.calm !== undefined) {
            layer.data.calm = Math.max(0, Math.min(1, (layer.data.calm || 0.8) - drift * 0.05));
        }
        
        // Determine dominant emotion
        if (layer.data.stress && layer.data.calm) {
            layer.data.dominant = layer.data.stress > layer.data.calm ? 'stress' : 'calm';
            layer.data.intensity = Math.abs(layer.data.stress - layer.data.calm);
        }
        
        // Color shift based on emotion (infrequent pulses)
        if (Math.random() < 0.001) { // Very rare pulses for emotion
            this.triggerPulse(layer, layer.data.intensity || 0.5);
        }
    }

    /**
     * Apply link effects between layers
     */
    private applyLinks(layer: BiometricLayer): void {
        this.flow.links.forEach(link => {
            if (link.target !== layer.id) return;
            
            const sourceLayer = this.flow.layers.find(l => l.id === link.source);
            if (!sourceLayer || !sourceLayer.active) return;

            switch (link.effect) {
                case 'amplify':
                    // Amplify intensity when source is high
                    if (sourceLayer.data.intensity > 0.7) {
                        layer.data.intensity = Math.min(1.0, 
                            layer.data.intensity * (1.0 + link.strength * 0.1)
                        );
                    }
                    break;
                    
                case 'modulate':
                    // Modulate based on source variability
                    if (sourceLayer.type === 'cardiovascular' && sourceLayer.data.hrv) {
                        const hrvFactor = sourceLayer.data.hrv / 100.0;
                        layer.data.intensity = layer.data.intensity * (0.9 + hrvFactor * link.strength);
                    }
                    break;
                    
                case 'influence':
                    // Gradual influence (for emotion → breath)
                    const influence = link.strength * 0.01;
                    if (sourceLayer.data.calm && layer.data.rate_bpm) {
                        // Calm emotion → slower breathing
                        const targetRate = 10 + (sourceLayer.data.calm * 4);
                        layer.data.rate_bpm = layer.data.rate_bpm! * (1 - influence) + targetRate * influence;
                    }
                    break;
            }
        });
    }

    /**
     * Trigger pulse event
     */
    private triggerPulse(layer: BiometricLayer, intensity: number): void {
        this.pulseCallbacks.forEach(callback => {
            callback(layer, intensity);
        });
    }

    /**
     * Get current flow state
     */
    getFlow(): BiometricFlow {
        return { ...this.flow };
    }

    /**
     * Get layer by ID
     */
    getLayer(id: string): BiometricLayer | undefined {
        return this.flow.layers.find(l => l.id === id);
    }
}

// Global instance for export
let globalSimulator: BiometricSimulator | null = null;

export function getBiometricSimulator(): BiometricSimulator | null {
    return globalSimulator;
}

export function toggleBiometricSimulation(): void {
    if (!globalSimulator) return;
    
    const hasActiveLayers = globalSimulator.getFlow().layers.some(l => l.active);
    
    if (hasActiveLayers) {
        globalSimulator.stop();
        globalSimulator.getFlow().layers.forEach(l => l.active = false);
        gptLogInfo('🧬 Biometric simulation paused', ['biometric']);
    } else {
        globalSimulator.getFlow().layers.forEach(l => l.active = true);
        globalSimulator.start();
        gptLogSuccess('🧬 Biometric simulation active', ['biometric']);
    }
}

export function createBiometricSimulator(): BiometricSimulator {
    globalSimulator = new BiometricSimulator();
    return globalSimulator;
}

