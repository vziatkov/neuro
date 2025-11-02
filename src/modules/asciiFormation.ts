import * as THREE from 'three';
import { Node, type NeuralNetwork } from './network';
import { NODE } from './constants';

// ============================================================================
// ASCII ART FORMATION - Neural Network Symbol
// ============================================================================
// This is my "signature" formation - a stylized neural network pattern
//     O---O---O
//    /|   |   |\
//   O-O---O---O-O
//    \|   |   |/
//     O---O---O

const ASCII_PATTERN = `
    O---O---O
   /|   |   |\\
  O-O---O---O-O
   \\|   |   |/
    O---O---O
`;

// ============================================================================
// ASCII FORMATION SETTINGS
// ============================================================================
export const ASCII_FORMATION = {
    // Pattern settings
    nodeSpacing: 3.0,          // Distance between nodes in pattern
    scale: 1.0,                // Overall scale of the pattern
    depth: 5.0,                // 3D depth (how far layers are separated)
    
    // Layer settings
    numLayers: 3,              // Number of repeated layers (for 3D effect)
    layerRotation: Math.PI / 8, // Rotation between layers (radians)
    
    // Connection settings
    connectionStrength: 0.85,  // Base strength of connections
    connectLayers: true,       // Connect corresponding nodes between layers
    layerConnectionStrength: 0.6, // Strength of inter-layer connections
    
    // Node settings
    useRandomSizes: true,      // Use random node sizes
    enableNoise: false,        // Add noise to positions
    noiseAmount: 0.2           // Amount of noise if enabled
} as const;

// Define the pattern nodes and connections manually
// Coordinates: (x, y) where (0, 0) is center
const PATTERN_NODES = [
    // Bottom row
    { x: -2, y: -1, id: 0 },
    { x: 0, y: -1, id: 1 },
    { x: 2, y: -1, id: 2 },
    // Middle row
    { x: -3, y: 0, id: 3 },
    { x: -1, y: 0, id: 4 },
    { x: 1, y: 0, id: 5 },
    { x: 3, y: 0, id: 6 },
    // Top row
    { x: -2, y: 1, id: 7 },
    { x: 0, y: 1, id: 8 },
    { x: 2, y: 1, id: 9 }
];

// Define connections (from id to id)
const PATTERN_CONNECTIONS = [
    // Bottom row horizontal
    [0, 1], [1, 2],
    // Middle row horizontal
    [3, 4], [4, 5], [5, 6],
    // Top row horizontal
    [7, 8], [8, 9],
    // Vertical connections
    [3, 0], [4, 1], [5, 2], [6, 2],
    [3, 7], [4, 8], [5, 8], [6, 9],
    // Diagonal connections
    [3, 4], [4, 5], [5, 6],
    [7, 4], [8, 5], [9, 6]
];

export function generateAsciiNetwork(densityFactor = 1.0): NeuralNetwork {
    const nodes: Node[] = [];
    
    // Create root node at center
    const rootNode = new Node(new THREE.Vector3(0, 0, 0), 0, 0);
    rootNode.size = NODE.rootNodeSizes.quantumCortex;
    nodes.push(rootNode);
    
    const numLayers = ASCII_FORMATION.numLayers;
    const layerSpacing = ASCII_FORMATION.depth / (numLayers - 1 || 1);
    const baseOffset = -ASCII_FORMATION.depth / 2;
    
    // Generate layers
    const layers: Node[][] = [];
    
    for (let layer = 0; layer < numLayers; layer++) {
        const layerNodes: Node[] = [];
        const z = baseOffset + layer * layerSpacing;
        const layerRotation = layer * ASCII_FORMATION.layerRotation;
        
        // Create nodes for this layer based on pattern
        PATTERN_NODES.forEach((patternNode, idx) => {
            let x = patternNode.x * ASCII_FORMATION.nodeSpacing * ASCII_FORMATION.scale;
            let y = patternNode.y * ASCII_FORMATION.nodeSpacing * ASCII_FORMATION.scale;
            
            // Apply rotation around center
            const cos = Math.cos(layerRotation);
            const sin = Math.sin(layerRotation);
            const newX = x * cos - y * sin;
            const newY = x * sin + y * cos;
            
            let pos = new THREE.Vector3(newX, newY, z);
            
            // Apply noise if enabled
            if (ASCII_FORMATION.enableNoise) {
                pos.add(new THREE.Vector3(
                    THREE.MathUtils.randFloatSpread(ASCII_FORMATION.noiseAmount),
                    THREE.MathUtils.randFloatSpread(ASCII_FORMATION.noiseAmount),
                    THREE.MathUtils.randFloatSpread(ASCII_FORMATION.noiseAmount * 0.5)
                ));
            }
            
            // Calculate level based on distance from center
            const distanceFromRoot = rootNode.position.distanceTo(pos);
            const maxDistance = Math.sqrt(
                Math.pow(3 * ASCII_FORMATION.nodeSpacing * ASCII_FORMATION.scale, 2) +
                Math.pow(ASCII_FORMATION.depth / 2, 2)
            );
            const level = Math.floor((distanceFromRoot / maxDistance) * 5) + 1;
            
            const node = new Node(pos, level, 0);
            node.distanceFromRoot = distanceFromRoot;
            
            nodes.push(node);
            layerNodes.push(node);
        });
        
        layers.push(layerNodes);
        
        // Create connections within this layer
        PATTERN_CONNECTIONS.forEach(([fromId, toId]) => {
            const fromNode = layerNodes[fromId];
            const toNode = layerNodes[toId];
            
            if (fromNode && toNode) {
                fromNode.addConnection(toNode, ASCII_FORMATION.connectionStrength);
            }
        });
    }
    
    // Connect corresponding nodes between layers
    if (ASCII_FORMATION.connectLayers && numLayers > 1) {
        for (let nodeIdx = 0; nodeIdx < PATTERN_NODES.length; nodeIdx++) {
            for (let layer = 0; layer < numLayers - 1; layer++) {
                const node1 = layers[layer][nodeIdx];
                const node2 = layers[layer + 1][nodeIdx];
                
                if (node1 && node2) {
                    node1.addConnection(node2, ASCII_FORMATION.layerConnectionStrength);
                }
            }
        }
    }
    
    // Connect root to center node of first layer
    if (layers[0] && layers[0].length > 4) {
        const centerNode = layers[0][4]; // Middle node of middle row
        if (centerNode) {
            rootNode.addConnection(centerNode, 1.0);
        }
    }
    
    return { nodes, rootNode };
}

