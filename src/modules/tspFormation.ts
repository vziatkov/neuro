import * as THREE from 'three';
import { Node, type NeuralNetwork } from './network';

// ============================================================================
// TSP SOLVER FORMATION
// Visualizes the Travelling Salesman Problem as parallel impulse racing.
// Cities = large nodes. All possible edges shown dim. Top routes shown as
// bright trails of intermediate waypoints. When the user clicks, the pulse
// races through all paths simultaneously — the optimal route glows brightest
// because its connections are strongest (P vs NP analog computer).
// ============================================================================

export const TSP_CONFIG = {
    numCities: 10,
    cityRadius: 14,
    cityNodeSize: 2.2,
    startCitySize: 2.8,
    topRoutesToShow: 4,
    completeGraphStrength: 0.06,
    routeStrengths: [1.0, 0.35, 0.18, 0.10] as readonly number[],
    routeIntermediates: [6, 3, 2, 1] as readonly number[],
    intermediateSize: [0.9, 0.45, 0.3, 0.2] as readonly number[],
    routeOffsetScale: 0.6,
    satelliteCount: 5,
    satelliteRadius: 1.2,
    satelliteSize: 0.35,
    satelliteStrength: 0.7,
} as const;

interface TspRoute {
    path: number[];
    totalDistance: number;
}

function buildDistanceMatrix(positions: THREE.Vector3[]): number[][] {
    const n = positions.length;
    const dist: number[][] = Array.from({ length: n }, () => new Array(n).fill(0));
    for (let i = 0; i < n; i++) {
        for (let j = i + 1; j < n; j++) {
            const d = positions[i].distanceTo(positions[j]);
            dist[i][j] = d;
            dist[j][i] = d;
        }
    }
    return dist;
}

function solveTSPBruteForce(
    distMatrix: number[][],
    n: number,
    topK: number
): TspRoute[] {
    const best: TspRoute[] = [];
    let worstBest = Infinity;

    const perm = Array.from({ length: n - 1 }, (_, i) => i + 1);

    function heap(arr: number[], size: number) {
        if (size === 1) {
            let total = 0;
            const path = [0, ...arr];
            for (let i = 0; i < path.length; i++) {
                total += distMatrix[path[i]][path[(i + 1) % path.length]];
            }
            if (best.length < topK) {
                best.push({ path: [...path], totalDistance: total });
                best.sort((a, b) => a.totalDistance - b.totalDistance);
                if (best.length === topK)
                    worstBest = best[topK - 1].totalDistance;
            } else if (total < worstBest) {
                best[topK - 1] = { path: [...path], totalDistance: total };
                best.sort((a, b) => a.totalDistance - b.totalDistance);
                worstBest = best[topK - 1].totalDistance;
            }
            return;
        }
        for (let i = 0; i < size; i++) {
            heap(arr, size - 1);
            if (size % 2 === 1) {
                [arr[0], arr[size - 1]] = [arr[size - 1], arr[0]];
            } else {
                [arr[i], arr[size - 1]] = [arr[size - 1], arr[i]];
            }
        }
    }

    heap(perm, perm.length);
    return best;
}

function generateCityPositions(numCities: number, radius: number): THREE.Vector3[] {
    const positions: THREE.Vector3[] = [];
    const goldenAngle = Math.PI * (3 - Math.sqrt(5));

    for (let i = 0; i < numCities; i++) {
        const y = 1 - (i / (numCities - 1)) * 2;
        const r = Math.sqrt(1 - y * y);
        const theta = goldenAngle * i;

        const jitter = 0.15;
        const pos = new THREE.Vector3(
            radius * r * Math.cos(theta) + THREE.MathUtils.randFloatSpread(radius * jitter),
            radius * y * 0.55 + THREE.MathUtils.randFloatSpread(radius * jitter * 0.5),
            radius * r * Math.sin(theta) + THREE.MathUtils.randFloatSpread(radius * jitter)
        );
        positions.push(pos);
    }
    return positions;
}

export function generateTspNetwork(densityFactor = 1.0): NeuralNetwork {
    const cfg = TSP_CONFIG;
    const nodes: Node[] = [];
    const numCities = Math.max(6, Math.round(cfg.numCities * densityFactor));

    const rootNode = new Node(new THREE.Vector3(0, 0, 0), 0, 0);
    rootNode.size = 1.5;
    nodes.push(rootNode);

    const cityPositions = generateCityPositions(numCities, cfg.cityRadius);
    const cityNodes: Node[] = [];

    for (let i = 0; i < numCities; i++) {
        const level = Math.floor((i / numCities) * 4);
        const city = new Node(cityPositions[i], level, 1);
        city.size = i === 0 ? cfg.startCitySize : cfg.cityNodeSize;
        city.distanceFromRoot = cityPositions[i].length();
        nodes.push(city);
        cityNodes.push(city);
    }

    rootNode.addConnection(cityNodes[0], 1.0);

    // Satellite constellation around the starting city
    for (let s = 0; s < cfg.satelliteCount; s++) {
        const angle = (s / cfg.satelliteCount) * Math.PI * 2;
        const dir = new THREE.Vector3(Math.cos(angle), 0, Math.sin(angle));
        const up = new THREE.Vector3(0, Math.sin(angle * 2) * 0.4, 0);
        const satPos = cityPositions[0].clone().add(dir.multiplyScalar(cfg.satelliteRadius)).add(up);
        const sat = new Node(satPos, 0, 0);
        sat.size = cfg.satelliteSize;
        sat.distanceFromRoot = satPos.length();
        nodes.push(sat);
        cityNodes[0].addConnection(sat, cfg.satelliteStrength);
        const nextSatIdx = nodes.length - 1;
        if (s > 0) {
            nodes[nextSatIdx].addConnection(nodes[nextSatIdx - 1], 0.4);
        }
    }
    // Close the satellite ring
    if (cfg.satelliteCount > 2) {
        const firstSat = nodes[nodes.length - cfg.satelliteCount];
        const lastSat = nodes[nodes.length - 1];
        firstSat.addConnection(lastSat, 0.4);
    }

    // Complete graph (very dim — "all possibilities")
    for (let i = 0; i < numCities; i++) {
        for (let j = i + 1; j < numCities; j++) {
            cityNodes[i].addConnection(cityNodes[j], cfg.completeGraphStrength);
        }
    }

    // Solve TSP
    const distMatrix = buildDistanceMatrix(cityPositions);
    const topRoutes = solveTSPBruteForce(distMatrix, numCities, cfg.topRoutesToShow);

    console.log(
        `%c🧭 TSP Solver: ${numCities} cities`,
        'color: #FFD700; font-weight: bold; font-size: 14px'
    );
    topRoutes.forEach((route, idx) => {
        const label = idx === 0 ? '🏆 OPTIMAL' : `   #${idx + 1}`;
        console.log(
            `%c${label}: distance ${route.totalDistance.toFixed(2)}  path [${route.path.join(' → ')} → ${route.path[0]}]`,
            idx === 0
                ? 'color: #FFD700; font-weight: bold'
                : 'color: #888'
        );
    });

    // Build route trails with intermediate waypoint nodes
    for (let r = 0; r < topRoutes.length; r++) {
        const route = topRoutes[r];
        const strength = cfg.routeStrengths[Math.min(r, cfg.routeStrengths.length - 1)];
        const numInter = cfg.routeIntermediates[Math.min(r, cfg.routeIntermediates.length - 1)];
        const interSize = cfg.intermediateSize[Math.min(r, cfg.intermediateSize.length - 1)];
        const level = r;

        for (let e = 0; e < route.path.length; e++) {
            const fromCityIdx = route.path[e];
            const toCityIdx = route.path[(e + 1) % route.path.length];
            const from = cityPositions[fromCityIdx];
            const to = cityPositions[toCityIdx];

            const edgeDir = new THREE.Vector3().subVectors(to, from).normalize();
            let perp = new THREE.Vector3().crossVectors(edgeDir, new THREE.Vector3(0, 1, 0));
            if (perp.length() < 0.01) {
                perp = new THREE.Vector3().crossVectors(edgeDir, new THREE.Vector3(1, 0, 0));
            }
            perp.normalize();

            let prevNode = cityNodes[fromCityIdx];
            for (let j = 1; j <= numInter; j++) {
                const t = j / (numInter + 1);
                const pos = new THREE.Vector3().lerpVectors(from, to, t);

                if (r > 0) {
                    const offset = perp.clone().multiplyScalar(
                        cfg.routeOffsetScale * r * (j % 2 === 0 ? 1 : -1)
                    );
                    pos.add(offset);
                }

                // Slight curve
                const sag = Math.sin(t * Math.PI) * 0.4 * (r + 1);
                pos.y += sag;

                const wp = new Node(pos, level, 0);
                wp.size = interSize;
                wp.distanceFromRoot = pos.length();
                nodes.push(wp);

                prevNode.addConnection(wp, strength);
                prevNode = wp;
            }
            prevNode.addConnection(cityNodes[toCityIdx], strength);
        }
    }

    return { nodes, rootNode };
}
