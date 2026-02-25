import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { FilmPass } from 'three/examples/jsm/postprocessing/FilmPass.js';
import { OutputPass } from 'three/examples/jsm/postprocessing/OutputPass.js';
import { config, colorPalettes, formationNames } from './config';
import { nodeShader, connectionShader } from './shaders';
import { generateNeuralNetwork, type NeuralNetwork, type Node } from './network';
import { gptLogInfo, gptLogError, gptLogSuccess, gptLogPulse } from './logger/gptLogger';
import { simulatePulseJourney } from './pulseTracker';
import { showNodeIntel, hidePanel, findClosestNode } from './nodeIntel';
import { BiometricSimulator, createBiometricSimulator, toggleBiometricSimulation } from './biometricSimulator';
import {
    CAMERA, RENDERER, SCENE, CONTROLS, BLOOM, FILM, STARFIELD, PULSE,
    NODE, CONNECTION, ANIMATION, UI
} from './constants';

let scene: THREE.Scene;
let camera: THREE.PerspectiveCamera;
let renderer: THREE.WebGLRenderer;
let composer: EffectComposer;
let bloomPass: UnrealBloomPass;
let controls: OrbitControls;
let starField: THREE.Points;
let clock: THREE.Clock;
let neuralNetwork: NeuralNetwork | null = null;
let nodesMesh: THREE.Points | null = null;
let connectionsMesh: THREE.LineSegments | null = null;
let raycaster: THREE.Raycaster;
let pointer: THREE.Vector2;
let interactionPlane: THREE.Plane;
let interactionPoint: THREE.Vector3;
let lastPulseIndex = 0;
let densityTimeout: ReturnType<typeof setTimeout>;
let demoInterval: ReturnType<typeof setInterval> | null = null;
let formationTitleTimeout: ReturnType<typeof setTimeout> | null = null;
let biometricSimulator: BiometricSimulator | null = null;

const pulseUniforms = {
    uTime: { value: 0.0 },
    uPulsePositions: { value: [
        new THREE.Vector3(1e3, 1e3, 1e3),
        new THREE.Vector3(1e3, 1e3, 1e3),
        new THREE.Vector3(1e3, 1e3, 1e3)
    ] },
    uPulseTimes: { value: [-1e3, -1e3, -1e3] },
    uPulseColors: { value: [
        new THREE.Color(1, 1, 1),
        new THREE.Color(1, 1, 1),
        new THREE.Color(1, 1, 1)
    ] },
    uPulseSpeed: { value: PULSE.speed },
    uBaseNodeSize: { value: PULSE.baseNodeSize }
};

function createStarfield(): THREE.Points {
    const pos: number[] = [];
    for (let i = 0; i < STARFIELD.count; i++) {
        const r = THREE.MathUtils.randFloat(STARFIELD.radiusMin, STARFIELD.radiusMax);
        const phi = Math.acos(THREE.MathUtils.randFloatSpread(2));
        const theta = THREE.MathUtils.randFloat(0, Math.PI * 2);
        pos.push(
            r * Math.sin(phi) * Math.cos(theta),
            r * Math.sin(phi) * Math.sin(theta),
            r * Math.cos(phi)
        );
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
    const mat = new THREE.PointsMaterial({
        color: STARFIELD.color,
        size: STARFIELD.size,
        sizeAttenuation: true,
        depthWrite: false,
        opacity: STARFIELD.opacity,
        transparent: true
    });
    return new THREE.Points(geo, mat);
}

function showFormationTitle(formationIndex: number) {
    const titleElement = document.getElementById('formation-title');
    if (!titleElement) return;
    
    titleElement.textContent = formationNames[formationIndex] || `Formation ${formationIndex + 1}`;
    titleElement.classList.add('show');
    
    if (formationTitleTimeout) clearTimeout(formationTitleTimeout);
    formationTitleTimeout = setTimeout(() => {
        titleElement.classList.remove('show');
    }, 2500);
}

function createNetworkVisualization(formationIndex: number, densityFactor = 1.0) {
    console.log(`Creating formation ${formationIndex}, density ${densityFactor}`);
    
    showFormationTitle(formationIndex);
    gptLogInfo(`Formation: ${formationNames[formationIndex]}`, ['network', 'formation']);
    
    if (nodesMesh) {
        scene.remove(nodesMesh);
        nodesMesh.geometry.dispose();
        (nodesMesh.material as THREE.ShaderMaterial).dispose();
        nodesMesh = null;
    }
    if (connectionsMesh) {
        scene.remove(connectionsMesh);
        connectionsMesh.geometry.dispose();
        (connectionsMesh.material as THREE.ShaderMaterial).dispose();
        connectionsMesh = null;
    }

    neuralNetwork = generateNeuralNetwork(formationIndex, densityFactor);
    if (!neuralNetwork || neuralNetwork.nodes.length === 0) {
        console.error("Network generation failed or resulted in zero nodes.");
        gptLogError("Network generation failed", ['network', 'error']);
        return;
    }
    
    gptLogSuccess(`Network created: ${neuralNetwork.nodes.length} nodes`, ['network', 'success']);

    const nodesGeometry = new THREE.BufferGeometry();
    const nodePositions: number[] = [];
    const nodeTypes: number[] = [];
    const nodeSizes: number[] = [];
    const nodeColors: number[] = [];
    const distancesFromRoot: number[] = [];

    neuralNetwork.nodes.forEach((node) => {
        nodePositions.push(node.position.x, node.position.y, node.position.z);
        nodeTypes.push(node.type);
        nodeSizes.push(node.size);
        distancesFromRoot.push(node.distanceFromRoot);

        const palette = colorPalettes[config.activePaletteIndex];
        const colorIndex = Math.min(node.level, palette.length - 1);
        const baseColor = palette[colorIndex % palette.length].clone();
        baseColor.offsetHSL(
            THREE.MathUtils.randFloatSpread(NODE.colorVariation.hue),
            THREE.MathUtils.randFloatSpread(NODE.colorVariation.saturation),
            THREE.MathUtils.randFloatSpread(NODE.colorVariation.lightness)
        );
        nodeColors.push(baseColor.r, baseColor.g, baseColor.b);
    });

    nodesGeometry.setAttribute('position', new THREE.Float32BufferAttribute(nodePositions, 3));
    nodesGeometry.setAttribute('nodeType', new THREE.Float32BufferAttribute(nodeTypes, 1));
    nodesGeometry.setAttribute('nodeSize', new THREE.Float32BufferAttribute(nodeSizes, 1));
    nodesGeometry.setAttribute('nodeColor', new THREE.Float32BufferAttribute(nodeColors, 3));
    nodesGeometry.setAttribute('distanceFromRoot', new THREE.Float32BufferAttribute(distancesFromRoot, 1));

    const nodesMaterial = new THREE.ShaderMaterial({
        uniforms: THREE.UniformsUtils.clone(pulseUniforms),
        vertexShader: nodeShader.vertexShader,
        fragmentShader: nodeShader.fragmentShader,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending
    });

    nodesMesh = new THREE.Points(nodesGeometry, nodesMaterial);
    scene.add(nodesMesh);

    const connectionsGeometry = new THREE.BufferGeometry();
    const connectionColors: number[] = [];
    const connectionStrengths: number[] = [];
    const connectionPositions: number[] = [];
    const startPoints: number[] = [];
    const endPoints: number[] = [];
    const pathIndices: number[] = [];
    const processedConnections = new Set<string>();
    let pathIndex = 0;

    neuralNetwork.nodes.forEach((node, nodeIndex) => {
        node.connections.forEach(connection => {
            const connectedNode = connection.node;
            const connectedIndex = neuralNetwork!.nodes.indexOf(connectedNode);
            if (connectedIndex === -1) return;

            const key = [Math.min(nodeIndex, connectedIndex), Math.max(nodeIndex, connectedIndex)].join('-');
            if (!processedConnections.has(key)) {
                processedConnections.add(key);

                const startPoint = node.position;
                const endPoint = connectedNode.position;
                const numSegments = CONNECTION.segmentsPerConnection;

                for (let i = 0; i < numSegments; i++) {
                    const t = i / (numSegments - 1);
                    connectionPositions.push(t, 0, 0);
                    startPoints.push(startPoint.x, startPoint.y, startPoint.z);
                    endPoints.push(endPoint.x, endPoint.y, endPoint.z);
                    pathIndices.push(pathIndex);
                    connectionStrengths.push(connection.strength);

                    const palette = colorPalettes[config.activePaletteIndex];
                    const avgLevel = Math.min(Math.floor((node.level + connectedNode.level) / 2), palette.length - 1);
                    const baseColor = palette[avgLevel % palette.length].clone();
                    baseColor.offsetHSL(
                        THREE.MathUtils.randFloatSpread(0.05),
                        THREE.MathUtils.randFloatSpread(0.1),
                        THREE.MathUtils.randFloatSpread(0.1)
                    );
                    connectionColors.push(baseColor.r, baseColor.g, baseColor.b);
                }
                pathIndex++;
            }
        });
    });

    connectionsGeometry.setAttribute('position', new THREE.Float32BufferAttribute(connectionPositions, 3));
    connectionsGeometry.setAttribute('startPoint', new THREE.Float32BufferAttribute(startPoints, 3));
    connectionsGeometry.setAttribute('endPoint', new THREE.Float32BufferAttribute(endPoints, 3));
    connectionsGeometry.setAttribute('connectionStrength', new THREE.Float32BufferAttribute(connectionStrengths, 1));
    connectionsGeometry.setAttribute('connectionColor', new THREE.Float32BufferAttribute(connectionColors, 3));
    connectionsGeometry.setAttribute('pathIndex', new THREE.Float32BufferAttribute(pathIndices, 1));

    const connectionsMaterial = new THREE.ShaderMaterial({
        uniforms: THREE.UniformsUtils.clone(pulseUniforms),
        vertexShader: connectionShader.vertexShader,
        fragmentShader: connectionShader.fragmentShader,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending
    });

    connectionsMesh = new THREE.LineSegments(connectionsGeometry, connectionsMaterial);
    scene.add(connectionsMesh);

    const palette = colorPalettes[config.activePaletteIndex];
    (connectionsMaterial.uniforms.uPulseColors as { value: THREE.Color[] }).value[0].copy(palette[0]);
    (connectionsMaterial.uniforms.uPulseColors as { value: THREE.Color[] }).value[1].copy(palette[1]);
    (connectionsMaterial.uniforms.uPulseColors as { value: THREE.Color[] }).value[2].copy(palette[2]);
    (nodesMaterial.uniforms.uPulseColors as { value: THREE.Color[] }).value[0].copy(palette[0]);
    (nodesMaterial.uniforms.uPulseColors as { value: THREE.Color[] }).value[1].copy(palette[1]);
    (nodesMaterial.uniforms.uPulseColors as { value: THREE.Color[] }).value[2].copy(palette[2]);
}

function updateTheme(paletteIndex: number) {
    config.activePaletteIndex = paletteIndex;
    if (!nodesMesh || !connectionsMesh || !neuralNetwork) return;

    const palette = colorPalettes[paletteIndex];

    const nodeColorsAttr = nodesMesh.geometry.attributes.nodeColor;
    for (let i = 0; i < nodeColorsAttr.count; i++) {
        const node = neuralNetwork.nodes[i];
        if (!node) continue;

        const colorIndex = Math.min(node.level, palette.length - 1);
        const baseColor = palette[colorIndex % palette.length].clone();
        baseColor.offsetHSL(
            THREE.MathUtils.randFloatSpread(NODE.colorVariation.hue),
            THREE.MathUtils.randFloatSpread(NODE.colorVariation.saturation),
            THREE.MathUtils.randFloatSpread(NODE.colorVariation.lightness)
        );
        nodeColorsAttr.setXYZ(i, baseColor.r, baseColor.g, baseColor.b);
    }
    nodeColorsAttr.needsUpdate = true;

    const connectionColors: number[] = [];
    const processedConnections = new Set<string>();
    neuralNetwork.nodes.forEach((node, nodeIndex) => {
        node.connections.forEach(connection => {
            const connectedNode = connection.node;
            const connectedIndex = neuralNetwork!.nodes.indexOf(connectedNode);
            if (connectedIndex === -1) return;

            const key = [Math.min(nodeIndex, connectedIndex), Math.max(nodeIndex, connectedIndex)].join('-');
            if (!processedConnections.has(key)) {
                processedConnections.add(key);
                const numSegments = CONNECTION.segmentsPerConnection;
                for (let i = 0; i < numSegments; i++) {
                    const avgLevel = Math.min(Math.floor((node.level + connectedNode.level) / 2), palette.length - 1);
                    const baseColor = palette[avgLevel % palette.length].clone();
                    baseColor.offsetHSL(
                        THREE.MathUtils.randFloatSpread(0.05),
                        THREE.MathUtils.randFloatSpread(0.1),
                        THREE.MathUtils.randFloatSpread(0.1)
                    );
                    connectionColors.push(baseColor.r, baseColor.g, baseColor.b);
                }
            }
        });
    });
    connectionsMesh.geometry.setAttribute('connectionColor', new THREE.Float32BufferAttribute(connectionColors, 3));
    connectionsMesh.geometry.attributes.connectionColor.needsUpdate = true;

    const nodesMaterial = nodesMesh.material as THREE.ShaderMaterial;
    const connectionsMaterial = connectionsMesh.material as THREE.ShaderMaterial;
    (nodesMaterial.uniforms.uPulseColors as { value: THREE.Color[] }).value.forEach((c, i) => c.copy(palette[i % palette.length]));
    (connectionsMaterial.uniforms.uPulseColors as { value: THREE.Color[] }).value.forEach((c, i) => c.copy(palette[i % palette.length]));
}

function triggerPulseFromPosition(position: THREE.Vector3, color: string, intensity: number): void {
    if (!nodesMesh || !connectionsMesh) return;
    
    const time = clock.getElapsedTime();
    lastPulseIndex = (lastPulseIndex + 1) % PULSE.maxPulses;

    const nodesMaterial = nodesMesh.material as THREE.ShaderMaterial;
    const connectionsMaterial = connectionsMesh.material as THREE.ShaderMaterial;
    (nodesMaterial.uniforms.uPulsePositions as { value: THREE.Vector3[] }).value[lastPulseIndex].copy(position);
    (nodesMaterial.uniforms.uPulseTimes as { value: number[] }).value[lastPulseIndex] = time;
    (connectionsMaterial.uniforms.uPulsePositions as { value: THREE.Vector3[] }).value[lastPulseIndex].copy(position);
    (connectionsMaterial.uniforms.uPulseTimes as { value: number[] }).value[lastPulseIndex] = time;

    const pulseColor = new THREE.Color(color);
    (nodesMaterial.uniforms.uPulseColors as { value: THREE.Color[] }).value[lastPulseIndex].copy(pulseColor);
    (connectionsMaterial.uniforms.uPulseColors as { value: THREE.Color[] }).value[lastPulseIndex].copy(pulseColor);
    
    // Log and track
    gptLogPulse(position.x, position.y, position.z, color, intensity);
    
    if (neuralNetwork) {
        simulatePulseJourney(neuralNetwork, position, color, intensity, 50, 0.15, 0.1);
    }
}

function triggerPulse(clientX: number, clientY: number) {
    pointer.x = (clientX / window.innerWidth) * 2 - 1;
    pointer.y = -(clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(pointer, camera);

    interactionPlane.normal.copy(camera.position).normalize();
    interactionPlane.constant = -interactionPlane.normal.dot(camera.position) + camera.position.length() * PULSE.interactionPlaneOffset;

    if (raycaster.ray.intersectPlane(interactionPlane, interactionPoint)) {
        const palette = colorPalettes[config.activePaletteIndex];
        const randomColor = palette[Math.floor(Math.random() * palette.length)];
        const colorHex = '#' + randomColor.getHexString();
        
        triggerPulseFromPosition(interactionPoint, colorHex, 1.0);

        if (neuralNetwork) {
            const hit = findClosestNode(neuralNetwork.nodes, interactionPoint, 8.0);
            if (hit) {
                showNodeIntel(hit.node, hit.index, camera, config.currentFormation);
            } else {
                hidePanel();
            }
        }
    }
}

function setupUIListeners() {
    renderer.domElement.addEventListener('click', (e) => {
        const target = e.target as HTMLElement;
        if (target.closest('.ui-panel, #control-buttons')) return;
        if (!config.paused) triggerPulse(e.clientX, e.clientY);
    });
    
    renderer.domElement.addEventListener('touchstart', (e) => {
        const target = e.target as HTMLElement;
        if (target.closest('.ui-panel, #control-buttons')) return;
        e.preventDefault();
        if (e.touches.length > 0 && !config.paused) {
            triggerPulse(e.touches[0].clientX, e.touches[0].clientY);
        }
    }, { passive: false });

    const themeButtons = document.querySelectorAll('.theme-button');
    themeButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const idx = parseInt((btn as HTMLElement).dataset.theme!, 10);
            updateTheme(idx);
            themeButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        });
    });

    const densitySlider = document.getElementById('density-slider') as HTMLInputElement;
    const densityValue = document.getElementById('density-value')!;
    densitySlider.addEventListener('input', (e) => {
        e.stopPropagation();
        const val = parseInt(densitySlider.value, 10);
        config.densityFactor = val / 100;
        densityValue.textContent = `${val}%`;

        clearTimeout(densityTimeout);
        densityTimeout = setTimeout(() => {
            createNetworkVisualization(config.currentFormation, config.densityFactor);
        }, UI.densitySliderDebounce);
    });

    const changeFormationBtn = document.getElementById('change-formation-btn')!;
    const pausePlayBtn = document.getElementById('pause-play-btn')!;
    const resetCameraBtn = document.getElementById('reset-camera-btn')!;

    changeFormationBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        hidePanel();
        config.currentFormation = (config.currentFormation + 1) % config.numFormations;
        createNetworkVisualization(config.currentFormation, config.densityFactor);
        controls.autoRotate = false;
        setTimeout(() => { controls.autoRotate = true; }, UI.autoRotateDelay);
    });

    pausePlayBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        config.paused = !config.paused;
        pausePlayBtn.textContent = config.paused ? 'Play' : 'Pause';
        controls.autoRotate = !config.paused;
    });

    resetCameraBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        controls.reset();
        controls.autoRotate = false;
        setTimeout(() => { controls.autoRotate = true; }, UI.resetCameraDelay);
    });

    const demoModeBtn = document.getElementById('demo-mode-btn')!;
    demoModeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        config.demoMode = !config.demoMode;
        
        if (config.demoMode) {
            demoModeBtn.textContent = 'Stop Demo';
            demoModeBtn.style.background = 'rgba(255, 100, 50, .5)';
            
            // Start auto-rotating through formations
            if (demoInterval) clearInterval(demoInterval);
            demoInterval = setInterval(() => {
                config.currentFormation = (config.currentFormation + 1) % config.numFormations;
                createNetworkVisualization(config.currentFormation, config.densityFactor);
                controls.reset();
                controls.autoRotate = true;
            }, 4000); // Switch every 4 seconds
            
            // Start with first formation
            config.currentFormation = 0;
            createNetworkVisualization(0, config.densityFactor);
            controls.reset();
            controls.autoRotate = true;
        } else {
            demoModeBtn.textContent = 'Demo';
            demoModeBtn.style.background = '';
            
            if (demoInterval) {
                clearInterval(demoInterval);
                demoInterval = null;
            }
            controls.autoRotate = false;
        }
    });

    const biometricModeBtn = document.getElementById('biometric-mode-btn')!;
    biometricModeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleBiometricSimulation();
        
        const isActive = biometricSimulator?.getFlow().layers.some(l => l.active) || false;
        biometricModeBtn.textContent = isActive ? '🧬 Bio ON' : '🧬 Bio';
        biometricModeBtn.style.background = isActive ? 'rgba(100, 200, 255, .4)' : '';
    });

    // Keyboard shortcuts
    window.addEventListener('keydown', (e) => {
        // Don't trigger shortcuts when typing in inputs
        if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
        
        switch(e.key.toLowerCase()) {
            case ' ': // Spacebar - pause/play
                e.preventDefault();
                config.paused = !config.paused;
                pausePlayBtn.textContent = config.paused ? 'Play' : 'Pause';
                controls.autoRotate = !config.paused;
                break;
            case 'r': // R - reset camera
                e.preventDefault();
                controls.reset();
                controls.autoRotate = false;
                setTimeout(() => { controls.autoRotate = true; }, UI.resetCameraDelay);
                break;
            case 'f': // F - change formation
                e.preventDefault();
                config.currentFormation = (config.currentFormation + 1) % config.numFormations;
                createNetworkVisualization(config.currentFormation, config.densityFactor);
                controls.autoRotate = false;
                setTimeout(() => { controls.autoRotate = true; }, UI.autoRotateDelay);
                break;
            case 'b': // B - toggle biometric mode
                e.preventDefault();
                toggleBiometricSimulation();
                const isActive = biometricSimulator?.getFlow().layers.some(l => l.active) || false;
                biometricModeBtn.textContent = isActive ? '🧬 Bio ON' : '🧬 Bio';
                biometricModeBtn.style.background = isActive ? 'rgba(100, 200, 255, .4)' : '';
                break;
            case '1':
            case '2':
            case '3':
            case '4':
            case '5':
            case '6':
            case '7':
            case '8':
                e.preventDefault();
                const formationIndex = parseInt(e.key) - 1;
                if (formationIndex < config.numFormations) {
                    config.currentFormation = formationIndex;
                    createNetworkVisualization(config.currentFormation, config.densityFactor);
                    controls.autoRotate = false;
                    setTimeout(() => { controls.autoRotate = true; }, UI.autoRotateDelay);
                }
                break;
        }
    });
}

function animate() {
    requestAnimationFrame(animate);

    const t = clock.getElapsedTime();

    if (!config.paused) {
        if (nodesMesh) {
            const nodesMaterial = nodesMesh.material as THREE.ShaderMaterial;
            (nodesMaterial.uniforms.uTime as { value: number }).value = t;
            nodesMesh.rotation.y = Math.sin(t * ANIMATION.rotationFrequency) * ANIMATION.rotationAmplitude;
        }
        if (connectionsMesh) {
            const connectionsMaterial = connectionsMesh.material as THREE.ShaderMaterial;
            (connectionsMaterial.uniforms.uTime as { value: number }).value = t;
            connectionsMesh.rotation.y = Math.sin(t * ANIMATION.rotationFrequency) * ANIMATION.rotationAmplitude;
        }
    }

    if (STARFIELD.enabled && starField) {
        starField.rotation.y += STARFIELD.rotationSpeed;
    }

    controls.update();
    composer.render();
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, RENDERER.maxPixelRatio));
    composer.setSize(window.innerWidth, window.innerHeight);

    bloomPass.resolution.set(window.innerWidth, window.innerHeight);
}

export function setupScene() {
    const canvasElement = document.getElementById('neural-network-canvas') as HTMLCanvasElement;
    
    scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(SCENE.fogColor, SCENE.fogDensity);

    camera = new THREE.PerspectiveCamera(
        CAMERA.fov,
        window.innerWidth / window.innerHeight,
        CAMERA.near,
        CAMERA.far
    );
    camera.position.set(CAMERA.initialPosition.x, CAMERA.initialPosition.y, CAMERA.initialPosition.z);

    renderer = new THREE.WebGLRenderer({
        canvas: canvasElement,
        antialias: RENDERER.antialias,
        powerPreference: RENDERER.powerPreference
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, RENDERER.maxPixelRatio));
    renderer.setClearColor(RENDERER.clearColor);
    renderer.outputColorSpace = THREE.SRGBColorSpace;

    if (STARFIELD.enabled) {
        starField = createStarfield();
        scene.add(starField);
    }

    controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = CONTROLS.enableDamping;
    controls.dampingFactor = CONTROLS.dampingFactor;
    controls.rotateSpeed = CONTROLS.rotateSpeed;
    controls.minDistance = CONTROLS.minDistance;
    controls.maxDistance = CONTROLS.maxDistance;
    controls.autoRotate = CONTROLS.autoRotate;
    controls.autoRotateSpeed = CONTROLS.autoRotateSpeed;
    controls.enablePan = CONTROLS.enablePan;

    composer = new EffectComposer(renderer);
    composer.addPass(new RenderPass(scene, camera));

    bloomPass = new UnrealBloomPass(
        new THREE.Vector2(window.innerWidth, window.innerHeight),
        BLOOM.strength,
        BLOOM.radius,
        BLOOM.threshold
    );
    composer.addPass(bloomPass);

    const filmPass = new FilmPass(FILM.noiseIntensity, FILM.grayscale);
    composer.addPass(filmPass);

    composer.addPass(new OutputPass());

    raycaster = new THREE.Raycaster();
    pointer = new THREE.Vector2();
    interactionPlane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
    interactionPoint = new THREE.Vector3();

    clock = new THREE.Clock();

    setupUIListeners();
    createNetworkVisualization(config.currentFormation, config.densityFactor);
    
    document.querySelectorAll('.theme-button').forEach(b => b.classList.remove('active'));
    const activeButton = document.querySelector(`.theme-button[data-theme="${config.activePaletteIndex}"]`);
    if (activeButton) activeButton.classList.add('active');
    updateTheme(config.activePaletteIndex);

    window.addEventListener('resize', onWindowResize);
    
    // Initialize biometric simulator
    biometricSimulator = createBiometricSimulator();
    biometricSimulator.onPulse((layer, intensity) => {
        // Trigger pulse from biometric layer
        triggerPulseFromPosition(
            layer.visual.pulse_origin,
            layer.visual.color,
            intensity
        );
    });
    
    animate();
}
