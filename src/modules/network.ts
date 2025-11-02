import * as THREE from 'three';
import { NODE, QUANTUM_CORTEX, HYPERDIMENSIONAL_MESH, NEURAL_VORTEX, SYNAPTIC_CLOUD, RANDOM_DIST } from './constants';

export class Node {
    position: THREE.Vector3;
    connections: Array<{ node: Node; strength: number }>;
    level: number;
    type: number;
    size: number;
    distanceFromRoot: number;
    dimension?: number;
    spiralIndex?: number;
    spiralPosition?: number;
    clusterRef?: Node;

    constructor(position: THREE.Vector3, level = 0, type = 0) {
        this.position = position;
        this.connections = [];
        this.level = level;
        this.type = type;
        this.size = type === 0
            ? THREE.MathUtils.randFloat(NODE.sizeRange.type0.min, NODE.sizeRange.type0.max)
            : THREE.MathUtils.randFloat(NODE.sizeRange.type1.min, NODE.sizeRange.type1.max);
        this.distanceFromRoot = 0;
    }

    addConnection(node: Node, strength = 1.0) {
        if (!this.isConnectedTo(node)) {
            this.connections.push({ node, strength });
            node.connections.push({ node: this, strength });
        }
    }

    isConnectedTo(node: Node): boolean {
        return this.connections.some(conn => conn.node === node);
    }
}

export interface NeuralNetwork {
    nodes: Node[];
    rootNode: Node;
}

function generateQuantumCortex(nodes: Node[], rootNode: Node, densityFactor: number) {
    const primaryAxes = QUANTUM_CORTEX.primaryAxes;
    const nodesPerAxis = QUANTUM_CORTEX.nodesPerAxis;
    const axisLength = QUANTUM_CORTEX.axisLength;
    const axisEndpoints: Node[] = [];

    for (let a = 0; a < primaryAxes; a++) {
        const phi = Math.acos(-1 + (2 * a) / primaryAxes);
        const theta = Math.PI * (1 + Math.sqrt(5)) * a;
        const dirVec = new THREE.Vector3(
            Math.sin(phi) * Math.cos(theta),
            Math.sin(phi) * Math.sin(theta),
            Math.cos(phi)
        );

        let prevNode = rootNode;
        for (let i = 1; i <= nodesPerAxis; i++) {
            const t = i / nodesPerAxis;
            const distance = axisLength * Math.pow(t, QUANTUM_CORTEX.axisExponent);
            const pos = new THREE.Vector3().copy(dirVec).multiplyScalar(distance);
            const nodeType = (i === nodesPerAxis) ? 1 : 0;
            const newNode = new Node(pos, i, nodeType);
            newNode.distanceFromRoot = distance;
            nodes.push(newNode);
            prevNode.addConnection(newNode, 1.0 - (t * QUANTUM_CORTEX.connectionStrengthFalloff));
            prevNode = newNode;
            if (i === nodesPerAxis) axisEndpoints.push(newNode);
        }
    }

    const ringNodes: Node[][] = [];
    for (const ringDist of QUANTUM_CORTEX.ringDistances) {
        const nodesInRing = Math.floor(ringDist * QUANTUM_CORTEX.ringDensityMultiplier * densityFactor);
        const ringLayer: Node[] = [];
        for (let i = 0; i < nodesInRing; i++) {
            const t = i / nodesInRing;
            // Распределение по сфере: используем sphereDistribution для контроля формы
            // Если sphereDistribution < 1.0, ноды будут внутри сферы (шар), иначе на поверхности
            const radiusFactor = Math.pow(Math.random(), 1.0 - RANDOM_DIST.sphereDistribution);
            const ringPhi = Math.acos(2 * Math.random() - 1);
            const ringTheta = 2 * Math.PI * t;
            const actualRingDist = ringDist * radiusFactor;
            const pos = new THREE.Vector3(
                actualRingDist * Math.sin(ringPhi) * Math.cos(ringTheta),
                actualRingDist * Math.sin(ringPhi) * Math.sin(ringTheta),
                actualRingDist * Math.cos(ringPhi)
            );
            const level = Math.ceil(ringDist / 5);
            const nodeType = Math.random() < QUANTUM_CORTEX.ringConnectionProbability ? 1 : 0;
            const newNode = new Node(pos, level, nodeType);
            newNode.distanceFromRoot = ringDist;
            nodes.push(newNode);
            ringLayer.push(newNode);
        }
        ringNodes.push(ringLayer);

        for (let i = 0; i < ringLayer.length; i++) {
            const node = ringLayer[i];
            const nextNode = ringLayer[(i + 1) % ringLayer.length];
            node.addConnection(nextNode, 0.7);
            if (i % QUANTUM_CORTEX.ringJumpInterval === 0 && ringLayer.length > QUANTUM_CORTEX.ringJumpMinLength) {
                const jumpIdx = (i + Math.floor(ringLayer.length / 2)) % ringLayer.length;
                node.addConnection(ringLayer[jumpIdx], 0.4);
            }
        }
    }

    for (const ring of ringNodes) {
        for (const node of ring) {
            let closestAxisNode: Node | null = null;
            let minDist = Infinity;
            for (const n of nodes) {
                if (n === rootNode || n === node) continue;
                if (n.level === 0 || n.type !== 0) continue;
                const dist = node.position.distanceTo(n.position);
                if (dist < minDist) { minDist = dist; closestAxisNode = n; }
            }
                        if (closestAxisNode && minDist < QUANTUM_CORTEX.closestNodeMaxDistance) {
                            const strength = QUANTUM_CORTEX.closestNodeStrengthRange.min + 
                                (1 - minDist / QUANTUM_CORTEX.closestNodeMaxDistance) * 
                                (QUANTUM_CORTEX.closestNodeStrengthRange.max - QUANTUM_CORTEX.closestNodeStrengthRange.min);
                node.addConnection(closestAxisNode, strength);
            }
        }
    }

    for (let r = 0; r < ringNodes.length - 1; r++) {
        const innerRing = ringNodes[r];
        const outerRing = ringNodes[r + 1];
                    const connectionsCount = Math.floor(innerRing.length * QUANTUM_CORTEX.interRingConnectionRatio);
                    for (let i = 0; i < connectionsCount; i++) {
                        const innerNode = innerRing[Math.floor(Math.random() * innerRing.length)];
                        const outerNode = outerRing[Math.floor(Math.random() * outerRing.length)];
                        if (!innerNode.isConnectedTo(outerNode)) {
                            innerNode.addConnection(outerNode, QUANTUM_CORTEX.interRingStrength);
            }
        }
    }

    for (let i = 0; i < axisEndpoints.length; i++) {
        const startNode = axisEndpoints[i];
        const endNode = axisEndpoints[(i + 2) % axisEndpoints.length];
                let prevNode = startNode;
                for (let j = 1; j <= QUANTUM_CORTEX.numIntermediates; j++) {
                    const t = j / (QUANTUM_CORTEX.numIntermediates + 1);
                    const pos = new THREE.Vector3().lerpVectors(startNode.position, endNode.position, t);
                    pos.add(new THREE.Vector3(
                        THREE.MathUtils.randFloatSpread(RANDOM_DIST.intermediateJitter),
                        THREE.MathUtils.randFloatSpread(RANDOM_DIST.intermediateJitter),
                        THREE.MathUtils.randFloatSpread(RANDOM_DIST.intermediateJitter)
                    ));
                    const newNode = new Node(pos, startNode.level, 0);
                    newNode.distanceFromRoot = rootNode.position.distanceTo(pos);
                    nodes.push(newNode);
                    prevNode.addConnection(newNode, QUANTUM_CORTEX.intermediateStrength);
                    prevNode = newNode;
                }
                prevNode.addConnection(endNode, QUANTUM_CORTEX.intermediateStrength);
    }
}

function generateHyperdimensionalMesh(nodes: Node[], rootNode: Node, densityFactor: number) {
    const dimensions = HYPERDIMENSIONAL_MESH.dimensions;
    const nodesPerDimension = Math.floor(HYPERDIMENSIONAL_MESH.baseNodesPerDimension * densityFactor);
    const maxRadius = HYPERDIMENSIONAL_MESH.maxRadius;

    const dimensionVectors = [
        new THREE.Vector3(1, 1, 1).normalize(),
        new THREE.Vector3(-1, 1, -1).normalize(),
        new THREE.Vector3(1, -1, -1).normalize(),
        new THREE.Vector3(-1, -1, 1).normalize()
    ];

    const dimensionNodes: Node[][] = [];

    for (let d = 0; d < dimensions; d++) {
        const dimNodes: Node[] = [];
        const dimVec = dimensionVectors[d];
        for (let i = 0; i < nodesPerDimension; i++) {
            // Используем radiusDistributionExponent для контроля распределения по радиусу
            // Можно заменить на RANDOM_DIST.radiusDistributionExponent для единообразия
            const distance = maxRadius * Math.pow(Math.random(), HYPERDIMENSIONAL_MESH.radiusExponent);
            const randomVec = new THREE.Vector3(
                THREE.MathUtils.randFloatSpread(RANDOM_DIST.positionSpread),
                THREE.MathUtils.randFloatSpread(RANDOM_DIST.positionSpread),
                THREE.MathUtils.randFloatSpread(RANDOM_DIST.positionSpread)
            ).normalize();
            const biasedVec = new THREE.Vector3().addVectors(
                dimVec.clone().multiplyScalar(
                    HYPERDIMENSIONAL_MESH.biasStrengthRange.min + 
                    Math.random() * (HYPERDIMENSIONAL_MESH.biasStrengthRange.max - HYPERDIMENSIONAL_MESH.biasStrengthRange.min)
                ),
                randomVec.clone().multiplyScalar(HYPERDIMENSIONAL_MESH.randomVecStrength)
            ).normalize();

            const pos = biasedVec.clone().multiplyScalar(distance);
            const isLeaf = Math.random() < HYPERDIMENSIONAL_MESH.leafProbability || distance > maxRadius * HYPERDIMENSIONAL_MESH.leafThreshold;
            const level = Math.floor(distance / (maxRadius / 4)) + 1;
            const newNode = new Node(pos, level, isLeaf ? 1 : 0);
            newNode.distanceFromRoot = distance;
            newNode.dimension = d;
            nodes.push(newNode);
            dimNodes.push(newNode);
            if (distance < maxRadius * HYPERDIMENSIONAL_MESH.rootConnectionThreshold) {
                rootNode.addConnection(newNode, HYPERDIMENSIONAL_MESH.rootConnectionStrength);
            }
        }
        dimensionNodes.push(dimNodes);
    }

    for (let d = 0; d < dimensions; d++) {
        const dimNodes = dimensionNodes[d];
        dimNodes.sort((a, b) => a.distanceFromRoot - b.distanceFromRoot);

        const nodesPerLayer = Math.ceil(dimNodes.length / HYPERDIMENSIONAL_MESH.layers);
        for (let layer = 0; layer < HYPERDIMENSIONAL_MESH.layers; layer++) {
            const startIdx = layer * nodesPerLayer;
            const endIdx = Math.min(startIdx + nodesPerLayer, dimNodes.length);
            for (let i = startIdx; i < endIdx; i++) {
                const node = dimNodes[i];
                const connectionsCount = HYPERDIMENSIONAL_MESH.connectionsPerNodeRange.min + 
                    Math.floor(Math.random() * (HYPERDIMENSIONAL_MESH.connectionsPerNodeRange.max - HYPERDIMENSIONAL_MESH.connectionsPerNodeRange.min + 1));
                const nearbyNodes = dimNodes.slice(startIdx, endIdx).filter(n => n !== node)
                    .sort((a, b) => node.position.distanceTo(a.position) - node.position.distanceTo(b.position));
                for (let j = 0; j < Math.min(connectionsCount, nearbyNodes.length); j++) {
                    if (!node.isConnectedTo(nearbyNodes[j])) {
                        node.addConnection(nearbyNodes[j], 
                            HYPERDIMENSIONAL_MESH.connectionStrengthRange.min + 
                            Math.random() * (HYPERDIMENSIONAL_MESH.connectionStrengthRange.max - HYPERDIMENSIONAL_MESH.connectionStrengthRange.min)
                        );
                    }
                }
                if (layer > 0) {
                    const prevLayer = dimNodes.slice((layer - 1) * nodesPerLayer, layer * nodesPerLayer)
                        .sort((a, b) => node.position.distanceTo(a.position) - node.position.distanceTo(b.position));
                    if (prevLayer.length > 0 && !node.isConnectedTo(prevLayer[0])) {
                        node.addConnection(prevLayer[0], HYPERDIMENSIONAL_MESH.prevLayerStrength);
                    }
                }
            }
        }
    }

    for (let d1 = 0; d1 < dimensions; d1++) {
        for (let d2 = d1 + 1; d2 < dimensions; d2++) {
                        const connectionsCount = Math.floor(HYPERDIMENSIONAL_MESH.interDimensionConnections * densityFactor);
                        for (let i = 0; i < connectionsCount; i++) {
                            const n1 = dimensionNodes[d1][Math.floor(Math.random() * dimensionNodes[d1].length)];
                            const n2 = dimensionNodes[d2][Math.floor(Math.random() * dimensionNodes[d2].length)];
                            if (!n1.isConnectedTo(n2)) {
                                const midPos = new THREE.Vector3().lerpVectors(n1.position, n2.position, 0.5);
                                midPos.add(new THREE.Vector3(
                                    THREE.MathUtils.randFloatSpread(RANDOM_DIST.intermediateJitter),
                                    THREE.MathUtils.randFloatSpread(RANDOM_DIST.intermediateJitter),
                                    THREE.MathUtils.randFloatSpread(RANDOM_DIST.intermediateJitter)
                                ));
                                const interNode = new Node(midPos, Math.max(n1.level, n2.level), 0);
                                interNode.distanceFromRoot = rootNode.position.distanceTo(midPos);
                                nodes.push(interNode);
                                n1.addConnection(interNode, HYPERDIMENSIONAL_MESH.interDimensionStrength);
                                interNode.addConnection(n2, HYPERDIMENSIONAL_MESH.interDimensionStrength);
                }
            }
        }
    }

                const jumpConnections = Math.floor(HYPERDIMENSIONAL_MESH.jumpConnections * densityFactor);
                for (let i = 0; i < jumpConnections; i++) {
                    const startDim = Math.floor(Math.random() * dimensions);
                    const endDim = (startDim + 2) % dimensions;
                    const startNode = dimensionNodes[startDim][Math.floor(Math.random() * dimensionNodes[startDim].length)];
                    const endNode = dimensionNodes[endDim][Math.floor(Math.random() * dimensionNodes[endDim].length)];
                    if (!startNode.isConnectedTo(endNode)) {
                        const numPoints = HYPERDIMENSIONAL_MESH.jumpNumPointsRange.min + 
                            Math.floor(Math.random() * (HYPERDIMENSIONAL_MESH.jumpNumPointsRange.max - HYPERDIMENSIONAL_MESH.jumpNumPointsRange.min + 1));
                        let prevNode = startNode;
                        for (let j = 1; j < numPoints; j++) {
                            const t = j / numPoints;
                            const pos = new THREE.Vector3().lerpVectors(startNode.position, endNode.position, t);
                            pos.add(new THREE.Vector3(
                                THREE.MathUtils.randFloatSpread(RANDOM_DIST.jumpConnectionJitter) * Math.sin(t * Math.PI),
                                THREE.MathUtils.randFloatSpread(RANDOM_DIST.jumpConnectionJitter) * Math.sin(t * Math.PI),
                                THREE.MathUtils.randFloatSpread(RANDOM_DIST.jumpConnectionJitter) * Math.sin(t * Math.PI)
                            ));
                            const jumpNode = new Node(pos, Math.max(startNode.level, endNode.level), 0);
                            jumpNode.distanceFromRoot = rootNode.position.distanceTo(pos);
                            nodes.push(jumpNode);
                            prevNode.addConnection(jumpNode, 0.4);
                            prevNode = jumpNode;
                        }
                        prevNode.addConnection(endNode, 0.4);
        }
    }
}

function generateNeuralVortex(nodes: Node[], rootNode: Node, densityFactor: number) {
    const numSpirals = 6;
    const totalHeight = 30;
    const maxRadius = 16;
    const nodesPerSpiral = Math.floor(30 * densityFactor);
    const spiralNodes: Node[][] = [];

    for (let s = 0; s < numSpirals; s++) {
        const spiralPhase = (s / numSpirals) * Math.PI * 2;
        const spiralArray: Node[] = [];
        for (let i = 0; i < nodesPerSpiral; i++) {
            const t = i / (nodesPerSpiral - 1);

            const heightCurve = 1 - Math.pow(2 * t - 1, 2);
            const height = (t - 0.5) * totalHeight;
            const radiusCurve = Math.sin(t * Math.PI);
            const radius = maxRadius * radiusCurve;

            const revolutions = 2.5;
            const angle = spiralPhase + t * Math.PI * 2 * revolutions;

            const pos = new THREE.Vector3(radius * Math.cos(angle), height, radius * Math.sin(angle));
            pos.add(new THREE.Vector3(
                THREE.MathUtils.randFloatSpread(RANDOM_DIST.spiralJitter),
                THREE.MathUtils.randFloatSpread(RANDOM_DIST.spiralJitter),
                THREE.MathUtils.randFloatSpread(RANDOM_DIST.spiralJitter)
            ));

            const level = Math.floor(t * 5) + 1;
            const isLeaf = Math.random() < 0.3 || i > nodesPerSpiral - 3;
            const newNode = new Node(pos, level, isLeaf ? 1 : 0);
            newNode.distanceFromRoot = Math.sqrt(radius * radius + height * height);
            newNode.spiralIndex = s;
            newNode.spiralPosition = t;
            nodes.push(newNode);
            spiralArray.push(newNode);
        }
        spiralNodes.push(spiralArray);
    }

    for (const spiral of spiralNodes) {
        rootNode.addConnection(spiral[0], 1.0);
        for (let i = 0; i < spiral.length - 1; i++) {
            spiral[i].addConnection(spiral[i + 1], 0.9);
        }
    }

    for (let s = 0; s < numSpirals; s++) {
        const currentSpiral = spiralNodes[s];
        const nextSpiral = spiralNodes[(s + 1) % numSpirals];
        const connectionPoints = 5;
        for (let c = 0; c < connectionPoints; c++) {
            const t = c / (connectionPoints - 1);
            const idx1 = Math.floor(t * (currentSpiral.length - 1));
            const idx2 = Math.floor(t * (nextSpiral.length - 1));
            currentSpiral[idx1].addConnection(nextSpiral[idx2], 0.7);
        }
    }

    for (let s = 0; s < numSpirals; s++) {
        const currentSpiral = spiralNodes[s];
        const jumpSpiral = spiralNodes[(s + 2) % numSpirals];
        const connections = 3;
        for (let c = 0; c < connections; c++) {
            const t1 = (c + 0.5) / connections;
            const t2 = (c + 1.0) / connections;
            const idx1 = Math.floor(t1 * (currentSpiral.length - 1));
            const idx2 = Math.floor(t2 * (jumpSpiral.length - 1));
            const start = currentSpiral[idx1];
            const end = jumpSpiral[idx2];

            const midPoint = new THREE.Vector3().lerpVectors(start.position, end.position, 0.5).multiplyScalar(0.7);
            const bridgeNode = new Node(midPoint, Math.max(start.level, end.level), 0);
            bridgeNode.distanceFromRoot = rootNode.position.distanceTo(midPoint);
            nodes.push(bridgeNode);
            start.addConnection(bridgeNode, 0.6);
            bridgeNode.addConnection(end, 0.6);
        }
    }

    const ringLevels = 5;
    for (let r = 0; r < ringLevels; r++) {
        const height = (r / (ringLevels - 1) - 0.5) * totalHeight * 0.7;
        const ringNodes = nodes.filter(n => n !== rootNode && Math.abs(n.position.y - height) < 2);
        ringNodes.sort((a, b) => Math.atan2(a.position.z, a.position.x) - Math.atan2(b.position.z, b.position.x));
        if (ringNodes.length > 3) {
            for (let i = 0; i < ringNodes.length; i++) {
                ringNodes[i].addConnection(ringNodes[(i + 1) % ringNodes.length], 0.5);
            }
        }
    }

    const radialConnections = Math.floor(10 * densityFactor);
    const candidates = nodes.filter(n => n !== rootNode && n.position.length() > 5)
                            .sort(() => Math.random() - 0.5)
                            .slice(0, radialConnections);
    for (const node of candidates) {
        const numSegments = 1 + Math.floor(Math.random() * 2);
        let prevNode = node;
        for (let i = 1; i <= numSegments; i++) {
            const t = i / (numSegments + 1);
            const segPos = node.position.clone().multiplyScalar(1 - t);
                        segPos.add(new THREE.Vector3(
                            THREE.MathUtils.randFloatSpread(RANDOM_DIST.radialJitter),
                            THREE.MathUtils.randFloatSpread(RANDOM_DIST.radialJitter),
                            THREE.MathUtils.randFloatSpread(RANDOM_DIST.radialJitter)
                        ));
            const newNode = new Node(segPos, Math.floor(node.level * (1 - t)), 0);
            newNode.distanceFromRoot = rootNode.position.distanceTo(segPos);
            nodes.push(newNode);
            prevNode.addConnection(newNode, 0.7);
            prevNode = newNode;
        }
        prevNode.addConnection(rootNode, 0.8);
    }
}

function generateSynapticCloud(nodes: Node[], rootNode: Node, densityFactor: number) {
    const numClusters = 6;
    const maxDist = 18;
    const clusterNodes: Node[] = [];

    for (let c = 0; c < numClusters; c++) {
        const phi = Math.acos(2 * Math.random() - 1);
        const theta = 2 * Math.PI * Math.random();
        const distance = maxDist * (RANDOM_DIST.clusterDistanceMin + 
            (RANDOM_DIST.clusterDistanceMax - RANDOM_DIST.clusterDistanceMin) * Math.random());
        const pos = new THREE.Vector3(
            distance * Math.sin(phi) * Math.cos(theta),
            distance * Math.sin(phi) * Math.sin(theta),
            distance * Math.cos(phi)
        );
        const clusterNode = new Node(pos, 1, 0);
        clusterNode.size = 1.2;
        clusterNode.distanceFromRoot = distance;
        nodes.push(clusterNode);
        clusterNodes.push(clusterNode);
        rootNode.addConnection(clusterNode, 0.9);
    }

    for (let i = 0; i < clusterNodes.length; i++) {
        for (let j = i + 1; j < clusterNodes.length; j++) {
            const dist = clusterNodes[i].position.distanceTo(clusterNodes[j].position);
            const probability = 1.0 - (dist / (maxDist * 2));
            if (Math.random() < probability) {
                const strength = 0.5 + 0.5 * (1 - dist / (maxDist * 2));
                clusterNodes[i].addConnection(clusterNodes[j], strength);
            }
        }
    }

    for (const cluster of clusterNodes) {
        const clusterSize = Math.floor(20 * densityFactor);
        const cloudRadius = RANDOM_DIST.cloudRadiusBase + Math.random() * RANDOM_DIST.cloudRadiusVariation;
        for (let i = 0; i < clusterSize; i++) {
            // Используем cloudRadiusDistributionExponent для контроля формы облака
            // 0.5 = больше на краю, 1.0 = равномерно, <0.5 = больше в центре
            const radius = cloudRadius * Math.pow(Math.random(), RANDOM_DIST.cloudRadiusDistributionExponent);
            const dir = new THREE.Vector3(
                THREE.MathUtils.randFloatSpread(RANDOM_DIST.positionSpread * 2),
                THREE.MathUtils.randFloatSpread(RANDOM_DIST.positionSpread * 2),
                THREE.MathUtils.randFloatSpread(RANDOM_DIST.positionSpread * 2)
            ).normalize();
            const pos = new THREE.Vector3().copy(cluster.position).add(dir.multiplyScalar(radius));

            const distanceFromCluster = radius;
            const distanceFromRoot = rootNode.position.distanceTo(pos);
            const level = 2 + Math.floor(distanceFromCluster / 3);
            const isLeaf = Math.random() < 0.5;
            const newNode = new Node(pos, level, isLeaf ? 1 : 0);
            newNode.distanceFromRoot = distanceFromRoot;
            newNode.clusterRef = cluster;
            nodes.push(newNode);

            const strength = 0.7 * (1 - distanceFromCluster / cloudRadius);
            cluster.addConnection(newNode, strength);

            const nearbyNodes = nodes.filter(n =>
                n !== newNode && n !== cluster && n.clusterRef === cluster &&
                n.position.distanceTo(pos) < cloudRadius * 0.4
            );
            const connectionsCount = Math.floor(Math.random() * 3);
            nearbyNodes.sort((a, b) => pos.distanceTo(a.position) - pos.distanceTo(b.position));
            for (let j = 0; j < Math.min(connectionsCount, nearbyNodes.length); j++) {
                const dist = pos.distanceTo(nearbyNodes[j].position);
                const connStrength = 0.4 * (1 - dist / (cloudRadius * 0.4));
                newNode.addConnection(nearbyNodes[j], connStrength);
            }
        }
    }

    const interClusterCount = Math.floor(15 * densityFactor);
    for (let i = 0; i < interClusterCount; i++) {
        const cluster1 = clusterNodes[Math.floor(Math.random() * clusterNodes.length)];
        let cluster2: Node;
        do { cluster2 = clusterNodes[Math.floor(Math.random() * clusterNodes.length)]; } while (cluster2 === cluster1);

        const bridgePos = new THREE.Vector3().lerpVectors(cluster1.position, cluster2.position, 0.3 + Math.random() * 0.4);
        bridgePos.add(new THREE.Vector3(
            THREE.MathUtils.randFloatSpread(RANDOM_DIST.bridgeNodeJitter),
            THREE.MathUtils.randFloatSpread(RANDOM_DIST.bridgeNodeJitter),
            THREE.MathUtils.randFloatSpread(RANDOM_DIST.bridgeNodeJitter)
        ));
        const bridgeNode = new Node(bridgePos, 2, 0);
        bridgeNode.distanceFromRoot = rootNode.position.distanceTo(bridgePos);
        nodes.push(bridgeNode);

        cluster1.addConnection(bridgeNode, 0.5);
        cluster2.addConnection(bridgeNode, 0.5);

        const nearbyNodes = nodes.filter(n => n !== bridgeNode && n !== cluster1 && n !== cluster2 && n.position.distanceTo(bridgePos) < 8);
        if (nearbyNodes.length > 0) {
            const target = nearbyNodes[Math.floor(Math.random() * nearbyNodes.length)];
            bridgeNode.addConnection(target, 0.4);
        }
    }

    const longRangeCount = Math.floor(10 * densityFactor);
    const outerNodes = nodes.filter(n => n.distanceFromRoot > maxDist * 0.6)
                            .sort(() => Math.random() - 0.5)
                            .slice(0, longRangeCount);
    for (const outerNode of outerNodes) {
        const numSegments = 2 + Math.floor(Math.random() * 2);
        let prevNode = outerNode;
        for (let i = 1; i <= numSegments; i++) {
            const t = i / (numSegments + 1);
            const segPos = outerNode.position.clone().multiplyScalar(1 - t * 0.8);
                        segPos.add(new THREE.Vector3(
                            THREE.MathUtils.randFloatSpread(RANDOM_DIST.longRangeJitter),
                            THREE.MathUtils.randFloatSpread(RANDOM_DIST.longRangeJitter),
                            THREE.MathUtils.randFloatSpread(RANDOM_DIST.longRangeJitter)
                        ));
            const newNode = new Node(segPos, outerNode.level, 0);
            newNode.distanceFromRoot = rootNode.position.distanceTo(segPos);
            nodes.push(newNode);
            prevNode.addConnection(newNode, 0.6);
            prevNode = newNode;
        }
        const innerNodes = nodes.filter(n => n.distanceFromRoot < maxDist * 0.4 && n !== rootNode);
        if (innerNodes.length > 0) {
            const targetNode = innerNodes[Math.floor(Math.random() * innerNodes.length)];
            prevNode.addConnection(targetNode, 0.5);
        }
    }
}

export function generateNeuralNetwork(formationIndex: number, densityFactor = 1.0): NeuralNetwork {
    let nodes: Node[] = [];
    let rootNode: Node;

    switch (formationIndex % 4) {
        case 0:
            rootNode = new Node(new THREE.Vector3(0, 0, 0), 0, 0);
            rootNode.size = NODE.rootNodeSizes.quantumCortex;
            nodes.push(rootNode);
            generateQuantumCortex(nodes, rootNode, densityFactor);
            break;
        case 1:
            rootNode = new Node(new THREE.Vector3(0, 0, 0), 0, 0);
            rootNode.size = NODE.rootNodeSizes.hyperdimensionalMesh;
            nodes.push(rootNode);
            generateHyperdimensionalMesh(nodes, rootNode, densityFactor);
            break;
        case 2:
            rootNode = new Node(new THREE.Vector3(0, 0, 0), 0, 0);
            rootNode.size = NODE.rootNodeSizes.neuralVortex;
            nodes.push(rootNode);
            generateNeuralVortex(nodes, rootNode, densityFactor);
            break;
        case 3:
            rootNode = new Node(new THREE.Vector3(0, 0, 0), 0, 0);
            rootNode.size = NODE.rootNodeSizes.synapticCloud;
            nodes.push(rootNode);
            generateSynapticCloud(nodes, rootNode, densityFactor);
            break;
    }

    if (densityFactor < 1.0) {
        const originalNodeCount = nodes.length;
        nodes = nodes.filter((node, index) => {
            if (node === rootNode) return true;
            const hash = (index * 31 + Math.floor(densityFactor * 100)) % 100;
            return hash < (densityFactor * 100);
        });

        nodes.forEach(node => {
            node.connections = node.connections.filter(conn => nodes.includes(conn.node));
        });
        console.log(`Density Filter: ${originalNodeCount} -> ${nodes.length} nodes`);
    }

    return { nodes, rootNode };
}

