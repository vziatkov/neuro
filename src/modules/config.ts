import * as THREE from 'three';

export const config = {
    paused: false,
    activePaletteIndex: 1,
    currentFormation: 0,
    numFormations: 8,
    densityFactor: 1,
    demoMode: false
};

export const formationNames = [
    'Quantum Cortex',
    'Hyperdimensional Mesh',
    'Neural Vortex',
    'Synaptic Cloud',
    'Grid Network',
    'Sphere Formation',
    'ASCII Neural Network',
    'TSP Solver'
];

export const colorPalettes = [
    [new THREE.Color(0x4F46E5), new THREE.Color(0x7C3AED), new THREE.Color(0xC026D3), new THREE.Color(0xDB2777), new THREE.Color(0x8B5CF6)],
    [new THREE.Color(0xF59E0B), new THREE.Color(0xF97316), new THREE.Color(0xDC2626), new THREE.Color(0x7F1D1D), new THREE.Color(0xFBBF24)],
    [new THREE.Color(0xEC4899), new THREE.Color(0x8B5CF6), new THREE.Color(0x6366F1), new THREE.Color(0x3B82F6), new THREE.Color(0xA855F7)],
    [new THREE.Color(0x10B981), new THREE.Color(0xA3E635), new THREE.Color(0xFACC15), new THREE.Color(0xFB923C), new THREE.Color(0x4ADE80)]
];

