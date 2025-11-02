import * as THREE from 'three';
import { Node, type NeuralNetwork } from './network';
import { NODE, RANDOM_DIST } from './constants';

// ============================================================================
// SPHERE FORMATION SETTINGS
// ============================================================================
export const SPHERE_FORMATION = {
    // Sphere dimensions
    radius: 15.0,              // Base radius of the sphere
    radiusVariation: 0.0,      // Random variation in radius (0.0 = perfect sphere)
    numNodes: 5000,            // Total number of nodes on sphere
    
    // Distribution type
    // 0.0 = all inside (solid ball), 1.0 = all on surface (hollow sphere)
    surfaceDistribution: 0.0,  // Use sphereDistribution from RANDOM_DIST by default
    
    // Layer settings (if multiple layers)
    numLayers: 1,              // Number of concentric sphere layers
    layerSpacing: 5.0,         // Distance between layers
    
    // Connection settings
    connectionRadius: 2.0,     // Max distance to connect nodes
    connectionStrength: 0.7,   // Base strength of connections
    connectToCenter: true,     // Connect to center root node
    maxConnectionsPerNode: 6,  // Maximum connections per node
    
    // Node settings
    useRandomSizes: true,      // Use random node sizes within range
    leafProbability: 0.05,     // Probability of a node being a leaf (0.0-1.0)
    enableJitter: false,       // Add small random offset to positions
    jitterAmount: 0.3          // Amount of jitter if enabled
} as const;

export function generateSphereNetwork(densityFactor = 1.0): NeuralNetwork {
    const nodes: Node[] = [];
    
    // Calculate actual number of nodes based on density
    const actualNumNodes = Math.floor(SPHERE_FORMATION.numNodes * densityFactor);
    const actualNumLayers = SPHERE_FORMATION.numLayers;
    
    // Create root node at center
    const rootNode = new Node(new THREE.Vector3(0, 0, 0), 0, 0);
    rootNode.size = NODE.rootNodeSizes.quantumCortex;
    nodes.push(rootNode);
    
    const nodesPerLayer = Math.floor(actualNumNodes / actualNumLayers);
    
    // Generate nodes for each layer
    for (let layer = 0; layer < actualNumLayers; layer++) {
        const layerRadius = SPHERE_FORMATION.radius + (layer * SPHERE_FORMATION.layerSpacing);
        
        for (let i = 0; i < nodesPerLayer; i++) {
            // Generate uniform distribution on sphere surface or inside
            let radius;
            
            if (SPHERE_FORMATION.surfaceDistribution === 1.0) {
                // All on surface
                radius = layerRadius;
            } else if (SPHERE_FORMATION.surfaceDistribution === 0.0) {
                // Uniform inside sphere (volume distribution)
                radius = layerRadius * Math.cbrt(Math.random());
            } else {
                // Mixed: use sphereDistribution parameter
                const dist = RANDOM_DIST.sphereDistribution;
                if (Math.random() < dist) {
                    // On surface
                    radius = layerRadius;
                } else {
                    // Inside
                    radius = layerRadius * Math.cbrt(Math.random());
                }
            }
            
            // Add radius variation
            if (SPHERE_FORMATION.radiusVariation > 0) {
                radius += THREE.MathUtils.randFloatSpread(SPHERE_FORMATION.radiusVariation);
                radius = Math.max(0.1, radius); // Prevent negative radius
            }
            
            // Generate spherical coordinates
            const theta = Math.random() * Math.PI * 2; // Azimuth [0, 2π]
            const phi = Math.acos(2 * Math.random() - 1); // Inclination [0, π]
            
            // Convert to Cartesian coordinates
            let pos = new THREE.Vector3(
                radius * Math.sin(phi) * Math.cos(theta),
                radius * Math.sin(phi) * Math.sin(theta),
                radius * Math.cos(phi)
            );
            
            // Apply jitter if enabled
            if (SPHERE_FORMATION.enableJitter) {
                pos.add(new THREE.Vector3(
                    THREE.MathUtils.randFloatSpread(SPHERE_FORMATION.jitterAmount),
                    THREE.MathUtils.randFloatSpread(SPHERE_FORMATION.jitterAmount),
                    THREE.MathUtils.randFloatSpread(SPHERE_FORMATION.jitterAmount)
                ));
            }
            
            // Calculate level based on distance from center
            const distanceFromRoot = pos.length();
            const maxDistance = SPHERE_FORMATION.radius + (actualNumLayers - 1) * SPHERE_FORMATION.layerSpacing;
            const level = Math.floor((distanceFromRoot / maxDistance) * 5) + 1;
            
            // Determine node type
            const isLeaf = Math.random() < SPHERE_FORMATION.leafProbability;
            const nodeType = isLeaf ? 1 : 0;
            
            const node = new Node(pos, level, nodeType);
            node.distanceFromRoot = distanceFromRoot;
            
            nodes.push(node);
        }
    }
    
    // Connect nodes based on proximity
    const connectionRadiusSq = SPHERE_FORMATION.connectionRadius * SPHERE_FORMATION.connectionRadius;
    
    for (let i = 0; i < nodes.length; i++) {
        const node1 = nodes[i];
        if (node1 === rootNode && !SPHERE_FORMATION.connectToCenter) continue;
        
        let connectionCount = 0;
        
        for (let j = i + 1; j < nodes.length; j++) {
            const node2 = nodes[j];
            
            // Check if within connection radius
            const distSq = node1.position.distanceToSquared(node2.position);
            
            if (distSq <= connectionRadiusSq && connectionCount < SPHERE_FORMATION.maxConnectionsPerNode) {
                // Calculate connection strength based on distance
                const dist = Math.sqrt(distSq);
                const strength = SPHERE_FORMATION.connectionStrength * (1.0 - dist / SPHERE_FORMATION.connectionRadius);
                
                node1.addConnection(node2, strength);
                connectionCount++;
                
                // Also connect reverse if within limit
                if (node2.connections.length < SPHERE_FORMATION.maxConnectionsPerNode) {
                    node2.addConnection(node1, strength);
                }
            }
        }
    }
    
    // Connect some nodes to root if enabled
    if (SPHERE_FORMATION.connectToCenter) {
        // Connect root to nearest nodes
        const nodesToConnect = nodes
            .filter(n => n !== rootNode)
            .sort((a, b) => a.distanceFromRoot - b.distanceFromRoot)
            .slice(0, Math.min(10, Math.floor(actualNumNodes / 10)));
        
        nodesToConnect.forEach(node => {
            rootNode.addConnection(node, 1.0);
        });
    }
    
    return { nodes, rootNode };
}

