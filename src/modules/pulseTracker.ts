/**
 * Pulse Journey Tracker
 * Simulates and logs pulse propagation through the neural network
 */

import * as THREE from 'three';
import { type Node, type NeuralNetwork } from './network';
import { gptLogInfo, gptLogSuccess, gptLogWarn, gptLog } from './logger/gptLogger';

interface PulseStep {
    stepIndex: number;
    sourceNodeId: number;
    targetNodeId: number;
    energy: number;
    energyDecay: number;
    connectionStrength: number;
    distance: number;
    timestamp: number;
}

interface ActivatedNode {
    nodeId: number;
    totalEnergy: number;
    activationTime: number;
    color?: string;
}

interface PulseJourney {
    pulseId: number;
    originNodeId: number;
    originPosition: THREE.Vector3;
    startColor: string;
    startIntensity: number;
    startTime: number;
    steps: PulseStep[];
    activatedNodes: Map<number, ActivatedNode>;
    maxDistance: number;
    totalDistance: number;
}

let pulseCounter = 0;
const activePulses = new Map<number, PulseJourney>();

/**
 * Find the closest node to a given position
 */
function findClosestNode(network: NeuralNetwork, position: THREE.Vector3): { node: Node; index: number } | null {
    if (!network || network.nodes.length === 0) return null;
    
    let closestNode: Node | null = null;
    let closestIndex = -1;
    let minDistance = Infinity;
    
    network.nodes.forEach((node, index) => {
        const distance = node.position.distanceTo(position);
        if (distance < minDistance) {
            minDistance = distance;
            closestNode = node;
            closestIndex = index;
        }
    });
    
    return closestNode ? { node: closestNode, index: closestIndex } : null;
}

/**
 * Simulate pulse propagation through the network
 */
export function simulatePulseJourney(
    network: NeuralNetwork,
    originPosition: THREE.Vector3,
    startColor: string,
    startIntensity: number = 1.0,
    maxSteps: number = 50,
    energyDecayRate: number = 0.15,
    activationThreshold: number = 0.1
): PulseJourney | null {
    const closest = findClosestNode(network, originPosition);
    if (!closest) return null;
    
    const pulseId = ++pulseCounter;
    const startTime = Date.now();
    
    const journey: PulseJourney = {
        pulseId,
        originNodeId: closest.index,
        originPosition: closest.node.position.clone(),
        startColor,
        startIntensity,
        startTime,
        steps: [],
        activatedNodes: new Map(),
        maxDistance: 0,
        totalDistance: 0
    };
    
    // Initialize activation
    journey.activatedNodes.set(closest.index, {
        nodeId: closest.index,
        totalEnergy: startIntensity,
        activationTime: 0
    });
    
    // Log pulse origin
    gptLogInfo(`⚡ Pulse #${pulseId} origin`, ['pulse', 'origin']);
    gptLog({
        nodeId: closest.index,
        position: {
            x: parseFloat(closest.node.position.x.toFixed(2)),
            y: parseFloat(closest.node.position.y.toFixed(2)),
            z: parseFloat(closest.node.position.z.toFixed(2))
        },
        initialIntensity: startIntensity,
        color: startColor,
        nodeType: closest.node.type === 0 ? 'regular' : 'leaf',
        connections: closest.node.connections.length
    }, 'success', ['pulse', 'origin', 'data']);
    
    // BFS propagation simulation
    const queue: Array<{ nodeIndex: number; energy: number; stepIndex: number; parentIndex: number }> = [
        { nodeIndex: closest.index, energy: startIntensity, stepIndex: 0, parentIndex: -1 }
    ];
    const visited = new Set<number>();
    visited.add(closest.index);
    
    let stepCount = 0;
    
    while (queue.length > 0 && stepCount < maxSteps) {
        const current = queue.shift()!;
        const currentNode = network.nodes[current.nodeIndex];
        
        if (!currentNode || current.energy < activationThreshold) continue;
        
        // Process each connection
        for (const connection of currentNode.connections) {
            const targetNode = connection.node;
            const targetIndex = network.nodes.indexOf(targetNode);
            
            if (targetIndex === -1) continue;
            
            // Calculate energy decay
            const distance = currentNode.position.distanceTo(targetNode.position);
            const connectionDecay = 1.0 - (connection.strength * 0.5); // Stronger connection = less decay
            const distanceDecay = Math.max(0.1, 1.0 - (distance / 20.0)); // Distance-based decay
            const energyDecay = energyDecayRate * connectionDecay * distanceDecay;
            const newEnergy = current.energy * (1.0 - energyDecay);
            
            if (newEnergy < activationThreshold) continue;
            
            // Log propagation step
            stepCount++;
            const step: PulseStep = {
                stepIndex: stepCount,
                sourceNodeId: current.nodeIndex,
                targetNodeId: targetIndex,
                energy: parseFloat(newEnergy.toFixed(3)),
                energyDecay: parseFloat(energyDecay.toFixed(3)),
                connectionStrength: parseFloat(connection.strength.toFixed(2)),
                distance: parseFloat(distance.toFixed(2)),
                timestamp: Date.now() - startTime
            };
            
            journey.steps.push(step);
            
            // Log step
            if (stepCount <= 10 || stepCount % 5 === 0) { // Log first 10 and every 5th
                gptLogInfo(
                    `  Step ${step.stepIndex}: Node ${step.sourceNodeId} → ${step.targetNodeId} | Energy: ${step.energy} (decay: ${step.energyDecay}) | Distance: ${step.distance}`,
                    ['pulse', 'step', `pulse-${pulseId}`]
                );
            }
            
            // Update or create activated node
            const existingActivation = journey.activatedNodes.get(targetIndex);
            if (existingActivation) {
                // Accumulate energy
                existingActivation.totalEnergy = Math.max(existingActivation.totalEnergy, newEnergy);
            } else {
                // New activation
                journey.activatedNodes.set(targetIndex, {
                    nodeId: targetIndex,
                    totalEnergy: newEnergy,
                    activationTime: step.timestamp
                });
                
                // Log node activation
                if (stepCount <= 10) {
                    gptLogInfo(
                        `    ✓ Node ${targetIndex} activated | Threshold: ${activationThreshold.toFixed(2)} | Energy: ${newEnergy.toFixed(3)} | Delta: ${step.timestamp}ms`,
                        ['pulse', 'activation', `pulse-${pulseId}`]
                    );
                }
                
                // Add to queue for further propagation
                if (!visited.has(targetIndex) && newEnergy > activationThreshold * 1.5) {
                    visited.add(targetIndex);
                    queue.push({
                        nodeIndex: targetIndex,
                        energy: newEnergy,
                        stepIndex: stepCount,
                        parentIndex: current.nodeIndex
                    });
                }
            }
            
            // Update distance stats
            const totalDist = journey.totalDistance + distance;
            journey.totalDistance = totalDist;
            journey.maxDistance = Math.max(journey.maxDistance, distance);
        }
    }
    
    // Calculate final stats
    const endTime = Date.now();
    const totalDuration = endTime - startTime;
    const avgLatencyPerHop = journey.steps.length > 0 ? totalDuration / journey.steps.length : 0;
    const finalEnergy = journey.steps.length > 0 
        ? journey.steps[journey.steps.length - 1].energy 
        : startIntensity;
    const energyRetention = (finalEnergy / startIntensity) * 100;
    
    // Calculate color transition (simple fade)
    const finalColorIntensity = Math.min(1.0, energyRetention / 100);
    const finalColor = adjustColorIntensity(startColor, finalColorIntensity);
    
    // Log completion summary
    gptLogSuccess(
        `⚡ Pulse #${pulseId} completed: traveled ${journey.steps.length} steps, activated ${journey.activatedNodes.size} nodes in ${(totalDuration / 1000).toFixed(2)}s. Final energy: ${(energyRetention).toFixed(1)}% (${finalColor})`,
        ['pulse', 'complete', `pulse-${pulseId}`]
    );
    
    gptLog({
        pulseId,
        totalSteps: journey.steps.length,
        activatedNodes: journey.activatedNodes.size,
        totalDistance: parseFloat(journey.totalDistance.toFixed(2)),
        maxDistance: parseFloat(journey.maxDistance.toFixed(2)),
        duration: totalDuration,
        avgLatencyPerHop: parseFloat(avgLatencyPerHop.toFixed(2)),
        finalEnergy: parseFloat(finalEnergy.toFixed(3)),
        energyRetention: parseFloat(energyRetention.toFixed(1)) + '%',
        finalColor: finalColor,
        startColor: startColor
    }, 'success', ['pulse', 'stats', `pulse-${pulseId}`]);
    
    activePulses.set(pulseId, journey);
    
    // Cleanup old pulses
    if (activePulses.size > 10) {
        const oldestId = Math.min(...activePulses.keys());
        activePulses.delete(oldestId);
    }
    
    return journey;
}

/**
 * Adjust color intensity (simple fade)
 */
function adjustColorIntensity(colorHex: string, intensity: number): string {
    // Remove # if present
    const hex = colorHex.replace('#', '');
    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);
    
    const newR = Math.round(r * intensity);
    const newG = Math.round(g * intensity);
    const newB = Math.round(b * intensity);
    
    return `#${newR.toString(16).padStart(2, '0')}${newG.toString(16).padStart(2, '0')}${newB.toString(16).padStart(2, '0')}`;
}

export function getPulseJourney(pulseId: number): PulseJourney | undefined {
    return activePulses.get(pulseId);
}

