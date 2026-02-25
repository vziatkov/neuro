import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { OutputPass } from 'three/examples/jsm/postprocessing/OutputPass.js';

type CognitiveMode = 'deep-synthesis' | 'synthesis-claude' | 'construction' | 'maintenance';

interface CognitiveStep {
  mode: CognitiveMode;
  day: number;
  week: number;
  tokens: number;
}

const MODE_COLORS: Record<CognitiveMode, number> = {
  'deep-synthesis': 0xDC143C,
  'synthesis-claude': 0xFF5F1F,
  'construction': 0xFF8C42,
  'maintenance': 0x2F2F2F,
};

const MODE_GLOW: Record<CognitiveMode, number> = {
  'deep-synthesis': 1.0,
  'synthesis-claude': 0.8,
  'construction': 0.6,
  'maintenance': 0.05,
};

const TOTAL_STEPS = 797;
const TOTAL_TOKENS = 134_624_951;
const ACTIVE_DAYS = 79;
const LONGEST_STREAK = 14;

const WEEKLY_TOKENS = [
  0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
  6059005, 2798907, 1936997, 253154, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  65451, 81759, 23201884, 9952304, 20101560, 46445918, 14315432, 274535,
  2378172, 3799563, 2960310
];

function generateSteps(): CognitiveStep[] {
  const steps: CognitiveStep[] = [];
  let day = 0;

  const pattern: Array<{ mode: CognitiveMode; count: number }> = [
    { mode: 'maintenance', count: 120 },
    { mode: 'deep-synthesis', count: 10 },
    { mode: 'maintenance', count: 30 },
    { mode: 'construction', count: 25 },
    { mode: 'maintenance', count: 80 },
    { mode: 'synthesis-claude', count: 1 },
    { mode: 'construction', count: 13 },
    { mode: 'maintenance', count: 50 },
    { mode: 'deep-synthesis', count: 5 },
    { mode: 'construction', count: 40 },
    { mode: 'maintenance', count: 100 },
    { mode: 'construction', count: 30 },
    { mode: 'deep-synthesis', count: 8 },
    { mode: 'maintenance', count: 60 },
    { mode: 'construction', count: 50 },
    { mode: 'maintenance', count: 80 },
    { mode: 'deep-synthesis', count: 3 },
    { mode: 'construction', count: 20 },
    { mode: 'maintenance', count: 72 },
  ];

  for (const block of pattern) {
    for (let i = 0; i < block.count && steps.length < TOTAL_STEPS; i++) {
      const week = Math.floor(day / 7);
      steps.push({
        mode: block.mode,
        day,
        week: Math.min(week, WEEKLY_TOKENS.length - 1),
        tokens: WEEKLY_TOKENS[Math.min(week, WEEKLY_TOKENS.length - 1)] || 0,
      });
      day++;
    }
  }

  while (steps.length < TOTAL_STEPS) {
    const week = Math.floor(day / 7);
    steps.push({ mode: 'maintenance', day: day++, week, tokens: 0 });
  }

  return steps;
}

function buildHelixGeometry(steps: CognitiveStep[]) {
  const positions: number[] = [];
  const colors: number[] = [];
  const sizes: number[] = [];
  const glows: number[] = [];

  const totalAngle = Math.PI * 12;
  const heightRange = 40;
  const baseRadius = 8;

  for (let i = 0; i < steps.length; i++) {
    const t = i / steps.length;
    const angle = t * totalAngle;
    const y = (t - 0.5) * heightRange;

    const tokenFactor = steps[i].tokens / 50_000_000;
    const r = baseRadius + tokenFactor * 4;

    const x = Math.cos(angle) * r;
    const z = Math.sin(angle) * r;

    positions.push(x, y, z);

    const color = new THREE.Color(MODE_COLORS[steps[i].mode]);
    colors.push(color.r, color.g, color.b);

    const isActive = steps[i].mode !== 'maintenance';
    sizes.push(isActive ? 3.0 + tokenFactor * 4 : 1.2);
    glows.push(MODE_GLOW[steps[i].mode]);
  }

  const linePositions: number[] = [];
  const lineColors: number[] = [];
  for (let i = 0; i < positions.length / 3 - 1; i++) {
    const i3 = i * 3;
    linePositions.push(
      positions[i3], positions[i3 + 1], positions[i3 + 2],
      positions[i3 + 3], positions[i3 + 4], positions[i3 + 5]
    );
    const c = new THREE.Color(MODE_COLORS[steps[i].mode]);
    const a = steps[i].mode === 'maintenance' ? 0.08 : 0.3;
    lineColors.push(c.r * a, c.g * a, c.b * a, c.r * a, c.g * a, c.b * a);
  }

  return { positions, colors, sizes, glows, linePositions, lineColors };
}

let tooltipEl: HTMLDivElement | null = null;

function showTooltip(step: CognitiveStep, index: number, screenX: number, screenY: number) {
  if (!tooltipEl) {
    tooltipEl = document.createElement('div');
    tooltipEl.id = 'ct3d-tooltip';
    document.body.appendChild(tooltipEl);
  }

  const modeLabel: Record<CognitiveMode, string> = {
    'deep-synthesis': 'Deep Synthesis',
    'synthesis-claude': 'Synthesis + Claude',
    'construction': 'Construction',
    'maintenance': 'Maintenance',
  };

  const tokenStr = step.tokens > 0
    ? `${(step.tokens / 1_000_000).toFixed(1)}M tokens`
    : 'idle';

  tooltipEl.innerHTML = `
    <div class="ct3d-mode" style="color:${new THREE.Color(MODE_COLORS[step.mode]).getStyle()}">
      ${modeLabel[step.mode]}
    </div>
    <div class="ct3d-row">Step ${index + 1} / ${TOTAL_STEPS}</div>
    <div class="ct3d-row">Day ${step.day + 1} · Week ${step.week + 1}</div>
    <div class="ct3d-row">${tokenStr}</div>
  `;

  const pw = tooltipEl.offsetWidth || 180;
  let left = screenX + 16;
  if (left + pw > window.innerWidth - 10) left = screenX - pw - 16;
  tooltipEl.style.left = `${left}px`;
  tooltipEl.style.top = `${screenY - 30}px`;
  tooltipEl.classList.add('visible');
}

function hideTooltip() {
  tooltipEl?.classList.remove('visible');
}

export function setupCognitiveTrace3D() {
  const canvas = document.getElementById('ct3d-canvas') as HTMLCanvasElement;
  if (!canvas) return;

  const steps = generateSteps();
  const { positions, colors, sizes, glows, linePositions, lineColors } = buildHelixGeometry(steps);

  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x050508, 0.008);

  const camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.1, 500);
  camera.position.set(0, 5, 30);

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, powerPreference: 'high-performance' });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setClearColor(0x050508);

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.04;
  controls.autoRotate = true;
  controls.autoRotateSpeed = 0.3;
  controls.minDistance = 8;
  controls.maxDistance = 80;

  // Points
  const pointsGeo = new THREE.BufferGeometry();
  pointsGeo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  pointsGeo.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
  pointsGeo.setAttribute('size', new THREE.Float32BufferAttribute(sizes, 1));

  const pointsMat = new THREE.ShaderMaterial({
    uniforms: {
      uTime: { value: 0 },
      uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) },
    },
    vertexShader: `
      attribute float size;
      varying vec3 vColor;
      uniform float uTime;
      uniform float uPixelRatio;
      void main() {
        vColor = color;
        vec4 mvPos = modelViewMatrix * vec4(position, 1.0);
        float breathe = 1.0 + 0.15 * sin(uTime * 1.5 + position.y * 0.3);
        gl_PointSize = size * breathe * uPixelRatio * (180.0 / -mvPos.z);
        gl_Position = projectionMatrix * mvPos;
      }
    `,
    fragmentShader: `
      varying vec3 vColor;
      void main() {
        float d = length(gl_PointCoord - 0.5);
        if (d > 0.5) discard;
        float glow = exp(-d * 4.0);
        gl_FragColor = vec4(vColor * glow, glow);
      }
    `,
    vertexColors: true,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });

  const points = new THREE.Points(pointsGeo, pointsMat);
  scene.add(points);

  // Helix line
  const lineGeo = new THREE.BufferGeometry();
  lineGeo.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));
  lineGeo.setAttribute('color', new THREE.Float32BufferAttribute(lineColors, 3));
  const lineMat = new THREE.LineBasicMaterial({ vertexColors: true, transparent: true, blending: THREE.AdditiveBlending });
  scene.add(new THREE.LineSegments(lineGeo, lineMat));

  // Hollow Point marker
  const hollowIdx = steps.findIndex(s => s.mode === 'synthesis-claude');
  if (hollowIdx >= 0) {
    const hp = new THREE.Vector3(positions[hollowIdx * 3], positions[hollowIdx * 3 + 1], positions[hollowIdx * 3 + 2]);
    const ringGeo = new THREE.RingGeometry(1.2, 1.5, 32);
    const ringMat = new THREE.MeshBasicMaterial({ color: 0xFF5F1F, side: THREE.DoubleSide, transparent: true, opacity: 0.6 });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.position.copy(hp);
    ring.lookAt(camera.position);
    scene.add(ring);

    const animate3DRing = () => {
      ring.lookAt(camera.position);
      ring.material.opacity = 0.3 + 0.3 * Math.sin(clock.getElapsedTime() * 2);
    };
    (ring as any)._update = animate3DRing;
  }

  // Post-processing
  const composer = new EffectComposer(renderer);
  composer.addPass(new RenderPass(scene, camera));
  composer.addPass(new UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 1.8, 0.5, 0.6));
  composer.addPass(new OutputPass());

  const clock = new THREE.Clock();
  const raycaster = new THREE.Raycaster();
  raycaster.params.Points = { threshold: 0.8 };
  const pointer = new THREE.Vector2();

  canvas.addEventListener('mousemove', (e) => {
    pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
    pointer.y = -(e.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(pointer, camera);
    const hits = raycaster.intersectObject(points);
    if (hits.length > 0 && hits[0].index !== undefined) {
      showTooltip(steps[hits[0].index], hits[0].index, e.clientX, e.clientY);
      canvas.style.cursor = 'pointer';
    } else {
      hideTooltip();
      canvas.style.cursor = 'grab';
    }
  });

  canvas.addEventListener('click', (e) => {
    pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
    pointer.y = -(e.clientY / window.innerHeight) * 2 + 1;
    raycaster.setFromCamera(pointer, camera);
    const hits = raycaster.intersectObject(points);
    if (hits.length > 0 && hits[0].index !== undefined) {
      const idx = hits[0].index;
      const pos = new THREE.Vector3(positions[idx * 3], positions[idx * 3 + 1], positions[idx * 3 + 2]);

      const pulse = new THREE.Mesh(
        new THREE.RingGeometry(0.1, 0.3, 32),
        new THREE.MeshBasicMaterial({ color: MODE_COLORS[steps[idx].mode], side: THREE.DoubleSide, transparent: true })
      );
      pulse.position.copy(pos);
      pulse.lookAt(camera.position);
      scene.add(pulse);

      let scale = 1;
      const expandPulse = () => {
        scale += 0.15;
        pulse.scale.setScalar(scale);
        (pulse.material as THREE.MeshBasicMaterial).opacity = Math.max(0, 1 - scale / 8);
        if (scale < 8) requestAnimationFrame(expandPulse);
        else scene.remove(pulse);
      };
      expandPulse();
    }
  });

  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    composer.setSize(window.innerWidth, window.innerHeight);
  });

  // Stats overlay
  const statsEl = document.getElementById('ct3d-stats');
  if (statsEl) {
    statsEl.innerHTML = `
      <div class="ct3d-stat"><span class="ct3d-num">${TOTAL_STEPS}</span><span class="ct3d-lbl">cognitive steps</span></div>
      <div class="ct3d-stat"><span class="ct3d-num">134.6M</span><span class="ct3d-lbl">tokens of context</span></div>
      <div class="ct3d-stat"><span class="ct3d-num">${ACTIVE_DAYS}</span><span class="ct3d-lbl">days of deliberate work</span></div>
      <div class="ct3d-stat"><span class="ct3d-num">${LONGEST_STREAK}d</span><span class="ct3d-lbl">longest streak</span></div>
    `;
  }

  function animate() {
    requestAnimationFrame(animate);
    const t = clock.getElapsedTime();
    (pointsMat.uniforms.uTime as { value: number }).value = t;
    controls.update();

    scene.traverse((obj) => {
      if ((obj as any)._update) (obj as any)._update();
    });

    composer.render();
  }

  animate();
}
