// Cognitive Trace Artifact
// The Signal & The Trace
// Baccarat Big Road grid with WiFi wave modulation and DensePose transformation

type CognitiveMode = 'deep-synthesis' | 'synthesis-claude' | 'construction' | 'maintenance';

interface CognitiveStep {
    mode: CognitiveMode;
    timestamp: number;
}

// Cognitive Trace data (797 steps)
// Based on actual Cursor 2025 data from screenshot
const generateCognitiveTrace = (): CognitiveStep[] => {
    const steps: CognitiveStep[] = [];
    const totalSteps = 797;
    
    // Pattern from screenshot analysis:
    // - Mostly maintenance/pause (gray dots)
    // - First prominent column: ~10 deep synthesis (red) dots
    // - Second prominent column: 14-day streak (construction + one synthesis-claude)
    // - Scattered construction and synthesis throughout
    
    let stepIndex = 0;
    
    // Initial period: sparse activity, mostly maintenance
    for (let i = 0; i < 150; i++) {
        const rand = Math.random();
        steps.push({
            mode: rand > 0.98 ? 'construction' : 'maintenance',
            timestamp: stepIndex++
        });
    }
    
    // First peak: Deep Synthesis column (10 steps, tall red column)
    for (let i = 0; i < 10; i++) {
        steps.push({
            mode: 'deep-synthesis',
            timestamp: stepIndex++
        });
    }
    
    // Gap: maintenance period
    for (let i = 0; i < 250; i++) {
        const rand = Math.random();
        steps.push({
            mode: rand > 0.99 ? 'construction' : 'maintenance',
            timestamp: stepIndex++
        });
    }
    
    // Second peak: 14-day streak (longest column)
    // First dot is "synthesis + Claude" (hollow point)
    steps.push({
        mode: 'synthesis-claude',
        timestamp: stepIndex++
    });
    
    // Rest of the streak: construction
    for (let i = 0; i < 13; i++) {
        steps.push({
            mode: 'construction',
            timestamp: stepIndex++
        });
    }
    
    // More maintenance with occasional activity
    for (let i = 0; i < 200; i++) {
        const rand = Math.random();
        let mode: CognitiveMode = 'maintenance';
        
        if (rand > 0.99) {
            mode = 'construction';
        } else if (rand > 0.998) {
            mode = 'deep-synthesis';
        }
        
        steps.push({
            mode,
            timestamp: stepIndex++
        });
    }
    
    // Final period: scattered activity
    while (steps.length < totalSteps) {
        const rand = Math.random();
        let mode: CognitiveMode = 'maintenance';
        
        if (rand > 0.97) {
            mode = 'construction';
        } else if (rand > 0.995) {
            mode = 'deep-synthesis';
        }
        
        steps.push({
            mode,
            timestamp: stepIndex++
        });
    }
    
    return steps;
};

// Baccarat Big Road logic
// Same mode -> stack Y (down)
// New mode -> move X (right)
class BaccaratGrid {
    private grid: HTMLDivElement;
    private columns: HTMLDivElement[] = [];
    private steps: CognitiveStep[];
    private currentColumnIndex = 0;
    private wifiWavePhase = 0;
    private tokenDensity = 134.6; // 134.6M tokens
    private hollowPointElement: HTMLElement | null = null;
    private hollowPointColumn = 0;
    private hollowPointRow = 0;
    private isDensePoseMode = false;
    private animationFrame: number | null = null;

    constructor(gridElement: HTMLDivElement, steps: CognitiveStep[]) {
        this.grid = gridElement;
        this.steps = steps;
        this.init();
    }

    private init() {
        let lastMode: CognitiveMode | null = null;
        let currentColumn: HTMLDivElement | null = null;

        this.steps.forEach((step, index) => {
            const isNewMode = lastMode !== step.mode;
            
            if (isNewMode || !currentColumn) {
                // Move to new column
                currentColumn = this.createColumn();
                this.grid.appendChild(currentColumn);
                this.columns.push(currentColumn);
                this.currentColumnIndex = this.columns.length - 1;
                lastMode = step.mode;
            }
            
            const dot = this.createDot(step.mode, index);
            currentColumn.appendChild(dot);
            
            // Mark the Hollow Point (first dot in the 14-day streak)
            // Find the synthesis-claude dot in the construction column
            if (step.mode === 'synthesis-claude' && !this.hollowPointElement) {
                this.hollowPointElement = dot;
                this.hollowPointColumn = this.currentColumnIndex;
                this.hollowPointRow = currentColumn.children.length - 1;
                dot.classList.add('hollow-point');
                this.setupHollowPointInteraction(dot);
            }
        });

        // Start WiFi wave animation
        this.startWiFiWave();
        
        // Setup click interaction
        this.grid.addEventListener('click', (e) => this.handleGridClick(e));
    }

    private createColumn(): HTMLDivElement {
        const column = document.createElement('div');
        column.className = 'column';
        return column;
    }

    private createDot(mode: CognitiveMode, index: number): HTMLDivElement {
        const dot = document.createElement('div');
        dot.className = `dot ${mode} wifi-modulated`;
        dot.setAttribute('data-index', index.toString());
        dot.setAttribute('data-mode', mode);
        return dot;
    }

    private setupHollowPointInteraction(dot: HTMLElement) {
        dot.addEventListener('mouseenter', () => {
            this.activateDensePoseMode();
        });

        dot.addEventListener('mouseleave', () => {
            this.deactivateDensePoseMode();
        });
    }

    private activateDensePoseMode() {
        if (this.isDensePoseMode) return;
        
        this.isDensePoseMode = true;
        this.grid.classList.add('densepose-mode');
        
        // Transform grid into DensePose skeleton silhouette
        this.transformToDensePose();
    }

    private deactivateDensePoseMode() {
        if (!this.isDensePoseMode) return;
        
        this.isDensePoseMode = false;
        this.grid.classList.remove('densepose-mode');
        
        // Reset positions
        this.columns.forEach((column, colIndex) => {
            Array.from(column.children).forEach((dot, rowIndex) => {
                const element = dot as HTMLElement;
                element.style.transform = '';
            });
        });
    }

    private transformToDensePose() {
        // DensePose skeleton: simplified human silhouette
        // Based on WiFi-DensePose body keypoints
        const skeletonPoints = [
            // Head
            { x: 0, y: -4, weight: 1.0 },
            // Neck
            { x: 0, y: -3, weight: 1.0 },
            // Shoulders
            { x: -1.2, y: -2.5, weight: 0.8 },
            { x: 1.2, y: -2.5, weight: 0.8 },
            // Torso (spine)
            { x: 0, y: -2, weight: 1.0 },
            { x: 0, y: -1, weight: 1.0 },
            { x: 0, y: 0, weight: 1.0 },
            { x: 0, y: 1, weight: 1.0 },
            // Hips
            { x: -0.6, y: 1.5, weight: 0.9 },
            { x: 0.6, y: 1.5, weight: 0.9 },
            // Arms
            { x: -1.8, y: -1, weight: 0.7 },
            { x: -2, y: 0.5, weight: 0.6 },
            { x: 1.8, y: -1, weight: 0.7 },
            { x: 2, y: 0.5, weight: 0.6 },
            // Legs
            { x: -0.6, y: 2.5, weight: 0.8 },
            { x: -0.6, y: 3.5, weight: 0.7 },
            { x: 0.6, y: 2.5, weight: 0.8 },
            { x: 0.6, y: 3.5, weight: 0.7 },
        ];

        const centerColumn = this.hollowPointColumn;
        const centerRow = this.hollowPointRow;
        const scale = 15; // Transformation scale

        this.columns.forEach((column, colIndex) => {
            const colOffset = colIndex - centerColumn;
            Array.from(column.children).forEach((dot, rowIndex) => {
                const element = dot as HTMLElement;
                const rowOffset = rowIndex - centerRow;
                
                // Find closest skeleton point with weighted influence
                let minDist = Infinity;
                let targetPoint = { x: 0, y: 0 };
                let influence = 0;
                
                skeletonPoints.forEach(point => {
                    const dist = Math.sqrt(
                        Math.pow(colOffset - point.x, 2) + 
                        Math.pow(rowOffset - point.y, 2)
                    );
                    const weightedDist = dist / point.weight;
                    if (weightedDist < minDist) {
                        minDist = weightedDist;
                        targetPoint = point;
                        influence = point.weight;
                    }
                });
                
                // Transform based on distance and influence
                if (minDist < 3) {
                    const translateX = (targetPoint.x - colOffset) * scale * influence;
                    const translateY = (targetPoint.y - rowOffset) * scale * influence;
                    const opacity = Math.max(0.3, 1 - minDist / 3);
                    
                    element.style.transform = `translate(${translateX}px, ${translateY}px)`;
                    element.style.opacity = opacity.toString();
                } else {
                    // Fade out distant dots
                    element.style.opacity = '0.05';
                }
            });
        });
    }

    private startWiFiWave() {
        const animate = () => {
            this.wifiWavePhase += 0.02;
            this.modulateWithWiFiWave();
            this.animationFrame = requestAnimationFrame(animate);
        };
        animate();
    }

    private modulateWithWiFiWave() {
        // WiFi signal: sine wave modulation (2.4GHz frequency simulation)
        // Amplitude controlled by token density (134.6M tokens)
        const amplitude = Math.min(this.tokenDensity / 15, 2.5); // Max 2.5px movement
        const frequency = 0.3; // Wave frequency (slower, more subtle)
        const verticalPhase = 0.1; // Slight vertical modulation
        
        this.columns.forEach((column, colIndex) => {
            Array.from(column.children).forEach((dot, rowIndex) => {
                const element = dot as HTMLElement;
                
                if (!this.isDensePoseMode) {
                    // Horizontal WiFi wave (signal propagation)
                    const horizontalWave = Math.sin(this.wifiWavePhase + colIndex * frequency) * amplitude;
                    // Subtle vertical interference pattern
                    const verticalWave = Math.sin(this.wifiWavePhase * 0.7 + rowIndex * verticalPhase) * amplitude * 0.3;
                    
                    // Apply wave modulation
                    element.style.transform = `translate(${horizontalWave}px, ${verticalWave}px)`;
                }
            });
        });
    }

    private handleGridClick(event: MouseEvent) {
        const target = event.target as HTMLElement;
        if (!target.classList.contains('dot')) return;
        
        // Create WiFi pulse effect
        const rect = target.getBoundingClientRect();
        const pulse = document.createElement('div');
        pulse.className = 'wifi-pulse';
        pulse.style.left = `${rect.left + rect.width / 2}px`;
        pulse.style.top = `${rect.top + rect.height / 2}px`;
        pulse.style.transform = 'translate(-50%, -50%)';
        
        document.body.appendChild(pulse);
        
        setTimeout(() => {
            pulse.remove();
        }, 1500);
    }

    public destroy() {
        if (this.animationFrame !== null) {
            cancelAnimationFrame(this.animationFrame);
        }
    }
}

// Initialize when DOM is ready
function init() {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
        return;
    }

    const gridElement = document.getElementById('baccaratGrid') as HTMLDivElement;
    if (!gridElement) {
        console.error('Grid element not found');
        return;
    }

    const steps = generateCognitiveTrace();
    const grid = new BaccaratGrid(gridElement, steps);

    // Cleanup on page unload
    window.addEventListener('beforeunload', () => {
        grid.destroy();
    });
}

init();

