import * as THREE from 'three';
import { Node, type NeuralNetwork } from './network';
import { NODE, RANDOM_DIST } from './constants';

// ============================================================================
// GRID FORMATION SETTINGS
// ============================================================================
export const GRID_FORMATION = {
    // Grid dimensions
    width: 100,           // Number of nodes horizontally
    height: 100,          // Number of nodes vertically
    spacing: 0.5,         // Distance between nodes
    
    // Grid orientation
    rotationX: 0,         // Rotation around X axis (radians)
    rotationY: 0,         // Rotation around Y axis (radians)
    rotationZ: 0,         // Rotation around Z axis (radians)
    
    // Connection settings
    connectHorizontal: true,     // Connect to horizontal neighbors
    connectVertical: true,       // Connect to vertical neighbors
    connectDiagonal: false,      // Connect to diagonal neighbors
    connectionStrength: 0.8,     // Base strength of connections
    
    // Node settings
    useRandomSizes: true,        // Use random node sizes within range
    leafProbability: 0.1,        // Probability of a node being a leaf (0.0-1.0)
    enableNoise: false,          // Add noise to positions
    noiseAmount: 0.1             // Amount of noise if enabled
} as const;

export function generateGridNetwork(densityFactor = 1.0): NeuralNetwork {
    const nodes: Node[] = [];
    
    // Calculate actual dimensions based on density
    const actualWidth = Math.floor(GRID_FORMATION.width * densityFactor);
    const actualHeight = Math.floor(GRID_FORMATION.height * densityFactor);
    
    // Create grid of nodes
    const grid: Node[][] = [];
    const rootNode = new Node(new THREE.Vector3(0, 0, 0), 0, 0);
    rootNode.size = NODE.rootNodeSizes.quantumCortex;
    nodes.push(rootNode);
    
    // Calculate grid offset to center it
    const offsetX = -(actualWidth - 1) * GRID_FORMATION.spacing / 2;
    const offsetY = -(actualHeight - 1) * GRID_FORMATION.spacing / 2;
    
    // Create nodes in grid pattern
    for (let y = 0; y < actualHeight; y++) {
        const row: Node[] = [];
        for (let x = 0; x < actualWidth; x++) {
            let pos = new THREE.Vector3(
                offsetX + x * GRID_FORMATION.spacing,
                0,
                offsetY + y * GRID_FORMATION.spacing
            );
            
            // Apply noise if enabled
            if (GRID_FORMATION.enableNoise) {
                pos.add(new THREE.Vector3(
                    THREE.MathUtils.randFloatSpread(GRID_FORMATION.noiseAmount),
                    THREE.MathUtils.randFloatSpread(GRID_FORMATION.noiseAmount),
                    THREE.MathUtils.randFloatSpread(GRID_FORMATION.noiseAmount)
                ));
            }
            
            // Apply rotation
            const euler = new THREE.Euler(
                GRID_FORMATION.rotationX,
                GRID_FORMATION.rotationY,
                GRID_FORMATION.rotationZ
            );
            pos.applyEuler(euler);
            
            // Calculate level based on distance from center
            const centerX = actualWidth / 2;
            const centerY = actualHeight / 2;
            const distFromCenter = Math.sqrt(
                Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2)
            );
            const maxDist = Math.sqrt(
                Math.pow(actualWidth / 2, 2) + Math.pow(actualHeight / 2, 2)
            );
            const level = Math.floor((distFromCenter / maxDist) * 5) + 1;
            
            // Determine node type (leaf or regular)
            const isLeaf = Math.random() < GRID_FORMATION.leafProbability;
            const nodeType = isLeaf ? 1 : 0;
            
            const node = new Node(pos, level, nodeType);
            node.distanceFromRoot = rootNode.position.distanceTo(pos);
            
            nodes.push(node);
            row.push(node);
        }
        grid.push(row);
    }
    
    // Connect nodes based on settings
    for (let y = 0; y < actualHeight; y++) {
        for (let x = 0; x < actualWidth; x++) {
            const node = grid[y][x];
            
            // Horizontal connections
            if (GRID_FORMATION.connectHorizontal && x < actualWidth - 1) {
                const rightNode = grid[y][x + 1];
                node.addConnection(rightNode, GRID_FORMATION.connectionStrength);
            }
            
            // Vertical connections
            if (GRID_FORMATION.connectVertical && y < actualHeight - 1) {
                const bottomNode = grid[y + 1][x];
                node.addConnection(bottomNode, GRID_FORMATION.connectionStrength);
            }
            
            // Diagonal connections
            if (GRID_FORMATION.connectDiagonal) {
                // Bottom-right diagonal
                if (x < actualWidth - 1 && y < actualHeight - 1) {
                    const diagNode = grid[y + 1][x + 1];
                    node.addConnection(diagNode, GRID_FORMATION.connectionStrength * 0.7);
                }
                
                // Bottom-left diagonal
                if (x > 0 && y < actualHeight - 1) {
                    const diagNode = grid[y + 1][x - 1];
                    node.addConnection(diagNode, GRID_FORMATION.connectionStrength * 0.7);
                }
            }
        }
    }
    
    // Connect root to center nodes (optional)
    const centerY = Math.floor(actualHeight / 2);
    const centerX = Math.floor(actualWidth / 2);
    if (grid[centerY] && grid[centerY][centerX]) {
        rootNode.addConnection(grid[centerY][centerX], 1.0);
    }
    
    return { nodes, rootNode };
}

