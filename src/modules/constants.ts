// ============================================================================
// CAMERA SETTINGS
// ============================================================================
export const CAMERA = {
    fov: 60,
    near: 0.1,
    far: 1200,
    initialPosition: { x: 0, y: 5, z: 22 }
} as const;

// ============================================================================
// RENDERER SETTINGS
// ============================================================================
export const RENDERER = {
    maxPixelRatio: 2,
    clearColor: 0x000000,
    antialias: true,
    powerPreference: 'high-performance' as const
} as const;

// ============================================================================
// SCENE SETTINGS
// ============================================================================
export const SCENE = {
    fogColor: 0x000000,
    fogDensity: 0.0015
} as const;

// ============================================================================
// ORBIT CONTROLS SETTINGS
// ============================================================================
export const CONTROLS = {
    enableDamping: true,
    dampingFactor: 0.05,
    rotateSpeed: 0.5,
    minDistance: 5,
    maxDistance: 100,
    autoRotate: true,
    autoRotateSpeed: 0.15,
    enablePan: false
} as const;

// ============================================================================
// POST-PROCESSING SETTINGS
// ============================================================================
export const BLOOM = {
    strength: 1.5,
    radius: 0.4,
    threshold: 0.68
} as const;

export const FILM = {
    noiseIntensity: 0.35,
    scanlinesIntensity: 0.55,
    scanlinesCount: 2048,
    grayscale: false
} as const;

// ============================================================================
// STARFIELD SETTINGS
// ============================================================================
export const STARFIELD = {
    count: 5000,
    radiusMin: 40,
    radiusMax: 120,
    size: 0.15,
    opacity: 0.8,
    color: 0xffffff,
    rotationSpeed: 0.0003
} as const;

// ============================================================================
// PULSE & INTERACTION SETTINGS
// ============================================================================
export const PULSE = {
    speed: 15.0,
    baseNodeSize: 0.5,
    maxPulses: 3,
    duration: 3.0,
    thickness: 2.0,
    interactionPlaneOffset: 0.5
} as const;

// ============================================================================
// NODE SETTINGS
// ============================================================================
export const NODE = {
    sizeRange: {
        type0: { min: 0.7, max: 1.2 },
        type1: { min: 0.4, max: 0.9 }
    },
    rootNodeSizes: {
        quantumCortex: 1.5,
        hyperdimensionalMesh: 1.5,
        neuralVortex: 1.8,
        synapticCloud: 1.5
    },
    colorVariation: {
        hue: 0.05,
        saturation: 0.1,
        lightness: 0.1
    }
} as const;

// ============================================================================
// CONNECTION VISUALIZATION SETTINGS
// ============================================================================
export const CONNECTION = {
    segmentsPerConnection: 15,
    pathOffset: 0.1,
    noiseStrength: 0.1
} as const;

// ============================================================================
// NETWORK GENERATION - QUANTUM CORTEX
// ============================================================================
export const QUANTUM_CORTEX = {
    layers: 5,
    primaryAxes: 6,
    nodesPerAxis: 8,
    axisLength: 20,
    axisExponent: 0.8,
    connectionStrengthFalloff: 0.3,
    ringDistances: [5, 10, 15] as const,
    ringDensityMultiplier: 3,
    ringConnectionProbability: 0.4,
    ringJumpInterval: 4,
    ringJumpMinLength: 5,
    closestNodeMaxDistance: 8,
    closestNodeStrengthRange: { min: 0.5, max: 1.0 },
    interRingConnectionRatio: 0.5,
    interRingStrength: 0.6,
    numIntermediates: 3,
    intermediateSpread: 3,
    intermediateStrength: 0.5
} as const;

// ============================================================================
// NETWORK GENERATION - HYPERDIMENSIONAL MESH
// ============================================================================
export const HYPERDIMENSIONAL_MESH = {
    dimensions: 4,
    baseNodesPerDimension: 40,
    maxRadius: 20,
    radiusExponent: 0.7,
    biasStrengthRange: { min: 0.6, max: 1.0 },
    randomVecStrength: 0.3,
    leafProbability: 0.4,
    leafThreshold: 0.8,
    rootConnectionThreshold: 0.3,
    rootConnectionStrength: 0.7,
    layers: 4,
    connectionsPerNodeRange: { min: 1, max: 3 },
    connectionStrengthRange: { min: 0.4, max: 0.8 },
    prevLayerStrength: 0.8,
    interDimensionConnections: 5,
    interDimensionSpread: 2,
    interDimensionStrength: 0.5,
    jumpConnections: 10,
    jumpNumPointsRange: { min: 3, max: 6 },
    jumpSpread: 8
} as const;

// ============================================================================
// NETWORK GENERATION - NEURAL VORTEX
// ============================================================================
export const NEURAL_VORTEX = {
    numSpirals: 6,
    totalHeight: 30,
    maxRadius: 16,
    baseNodesPerSpiral: 30,
    revolutions: 2.5,
    spiralSpread: 1.5,
    leafProbability: 0.3,
    rootConnectionStrength: 1.0,
    spiralConnectionStrength: 0.9,
    interSpiralConnections: 5,
    interSpiralStrength: 0.7,
    jumpSpiralOffset: 2,
    jumpConnections: 3,
    bridgeStrength: 0.6,
    bridgeScale: 0.7,
    ringLevels: 5,
    ringHeightTolerance: 2,
    ringConnectionStrength: 0.5,
    radialConnections: 10,
    radialMinDistance: 5,
    radialSegmentsRange: { min: 1, max: 2 },
    radialSpread: 2,
    radialStrength: 0.7,
    radialRootStrength: 0.8
} as const;

// ============================================================================
// NETWORK GENERATION - SYNAPTIC CLOUD
// ============================================================================
export const SYNAPTIC_CLOUD = {
    numClusters: 6,
    maxDist: 18,
    distanceRange: { min: 0.3, max: 1.0 },
    clusterNodeSize: 1.2,
    clusterConnectionStrength: 0.9,
    baseClusterSize: 20,
    cloudRadiusRange: { min: 7, max: 10 },
    cloudRadiusExponent: 0.5,
    cloudSpread: 2,
    levelBase: 2,
    levelDivisor: 3,
    leafProbability: 0.5,
    cloudConnectionRatio: 0.4,
    cloudMaxConnectionDistance: 0.4,
    cloudConnectionStrengthBase: 0.4,
    interClusterCount: 15,
    bridgeLerpRange: { min: 0.3, max: 0.7 },
    bridgeSpread: 5,
    bridgeStrength: 0.5,
    bridgeNearbyRadius: 8,
    bridgeNearbyStrength: 0.4,
    longRangeCount: 10,
    longRangeThreshold: 0.6,
    longRangeSegmentsRange: { min: 2, max: 4 },
    longRangeLerpScale: 0.8,
    longRangeSpread: 4,
    longRangeStrength: 0.6,
    innerThreshold: 0.4,
    innerStrength: 0.5
} as const;

// ============================================================================
// ANIMATION SETTINGS
// ============================================================================
export const ANIMATION = {
    rotationAmplitude: 0.08,
    rotationFrequency: 0.05,
    timeScale: 0.8,
    distanceScale: 0.2,
    pulseScale: 0.5,
    pulseDistanceScale: 0.3,
    flowSpeed: 3.0,
    flowScale: 20.0
} as const;

// ============================================================================
// UI SETTINGS
// ============================================================================
export const UI = {
    densitySliderDebounce: 300, // milliseconds
    autoRotateDelay: 2000, // milliseconds after formation change
    resetCameraDelay: 1500 // milliseconds after reset
} as const;

// ============================================================================
// SHADER SETTINGS
// ============================================================================
export const SHADER = {
    glowPower: 1.4,
    distanceFadeStart: 80,
    distanceFadeEnd: 10,
    type1AlphaMultiplier: 0.85,
    type0BrightnessMultiplier: 1.2,
    pulseColorMix: 0.3,
    pulseBrightnessBoost: 0.7,
    baseColorTimeScale: 0.5,
    baseColorTimeFrequency: 0.8,
    flowPatternScale: 20.0,
    flowIntensity: 0.3,
    flowStrengthBoost: 0.5,
    connectionBaseAlpha: 0.8,
    connectionFlowAlpha: 0.2
} as const;

// ============================================================================
// COLOR SETTINGS
// ============================================================================
export const COLOR = {
    baseColorTimeScale: 0.5,
    baseColorDistanceScale: 0.3,
    connectionBaseColorTimeScale: 0.5,
    connectionBaseColorScale: 0.7,
    connectionBaseColorVariation: 0.3,
    connectionFlowScale: 10.0
} as const;

