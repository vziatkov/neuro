import * as THREE from 'three';
import type { Node } from './network';
import { formationNames } from './config';

const INTEL_LABELS = [
  'SIGINT Relay', 'Comm Hub', 'Sensor Node', 'Edge Router',
  'Data Nexus', 'Cipher Gate', 'Pulse Origin', 'Mesh Anchor',
  'Beacon', 'Cortex Link', 'Sync Point', 'Wave Source',
  'Trace Node', 'Signal Tap', 'Grid Vertex', 'Deep Probe',
];

const THREAT_LEVELS = [
  { label: 'NOMINAL', color: '#44ff88', bg: 'rgba(68,255,136,.12)' },
  { label: 'ELEVATED', color: '#ffaa00', bg: 'rgba(255,170,0,.12)' },
  { label: 'HIGH',     color: '#ff8800', bg: 'rgba(255,136,0,.12)' },
  { label: 'CRITICAL', color: '#ff4444', bg: 'rgba(255,68,68,.12)' },
];

const SIGNAL_TYPES = [
  'RF Intercept', 'Mesh Heartbeat', 'Encrypted Burst', 'Idle Carrier',
  'Cognitive Trace', 'Biometric Echo', 'WiFi DensePose', 'Quantum Ping',
];

let panelEl: HTMLDivElement | null = null;
let activeNodeIndex = -1;
let updateRAF: number | null = null;
let currentCamera: THREE.Camera | null = null;
let currentNodePos: THREE.Vector3 | null = null;

function getOrCreatePanel(): HTMLDivElement {
  if (panelEl) return panelEl;

  panelEl = document.createElement('div');
  panelEl.id = 'node-intel-panel';
  panelEl.innerHTML = `
    <div class="nip-header">
      <span class="nip-dot"></span>
      <span class="nip-title"></span>
      <button class="nip-close">&times;</button>
    </div>
    <div class="nip-body">
      <div class="nip-row">
        <span class="nip-label">STATUS</span>
        <span class="nip-threat"></span>
      </div>
      <div class="nip-row">
        <span class="nip-label">SIGNAL</span>
        <span class="nip-value nip-signal"></span>
      </div>
      <div class="nip-row">
        <span class="nip-label">CONNECTIONS</span>
        <span class="nip-value nip-conns"></span>
      </div>
      <div class="nip-row">
        <span class="nip-label">LAYER</span>
        <span class="nip-value nip-layer"></span>
      </div>
      <div class="nip-row">
        <span class="nip-label">STRENGTH</span>
        <div class="nip-bar-wrap"><div class="nip-bar-fill"></div></div>
      </div>
      <div class="nip-row">
        <span class="nip-label">POSITION</span>
        <span class="nip-value nip-pos"></span>
      </div>
      <div class="nip-footer">
        <span class="nip-formation"></span>
        <span class="nip-id"></span>
      </div>
    </div>
  `;

  panelEl.querySelector('.nip-close')!.addEventListener('click', (e) => {
    e.stopPropagation();
    hidePanel();
  });

  document.body.appendChild(panelEl);
  return panelEl;
}

function positionPanel(camera: THREE.Camera) {
  if (!panelEl || !currentNodePos) return;

  const projected = currentNodePos.clone().project(camera);
  const x = (projected.x * 0.5 + 0.5) * window.innerWidth;
  const y = (-projected.y * 0.5 + 0.5) * window.innerHeight;

  const pw = panelEl.offsetWidth || 260;
  const ph = panelEl.offsetHeight || 200;

  let left = x + 20;
  let top = y - ph / 2;

  if (left + pw > window.innerWidth - 10) left = x - pw - 20;
  if (top < 10) top = 10;
  if (top + ph > window.innerHeight - 10) top = window.innerHeight - ph - 10;

  panelEl.style.left = `${left}px`;
  panelEl.style.top = `${top}px`;
}

function trackLoop() {
  if (!panelEl || activeNodeIndex < 0 || !currentCamera) return;
  positionPanel(currentCamera);
  updateRAF = requestAnimationFrame(trackLoop);
}

export function showNodeIntel(
  node: Node,
  nodeIndex: number,
  camera: THREE.Camera,
  formationIndex: number
): void {
  if (activeNodeIndex === nodeIndex) {
    hidePanel();
    return;
  }

  activeNodeIndex = nodeIndex;
  currentCamera = camera;
  currentNodePos = node.position.clone();

  const panel = getOrCreatePanel();

  const label = INTEL_LABELS[nodeIndex % INTEL_LABELS.length];
  const threat = THREAT_LEVELS[Math.min(node.level, THREAT_LEVELS.length - 1)];
  const signal = SIGNAL_TYPES[Math.floor(Math.random() * SIGNAL_TYPES.length)];
  const avgStrength = node.connections.length > 0
    ? node.connections.reduce((s, c) => s + c.strength, 0) / node.connections.length
    : 0;

  panel.querySelector('.nip-dot')!.setAttribute('style', `background:${threat.color};box-shadow:0 0 6px ${threat.color}`);
  panel.querySelector('.nip-title')!.textContent = label;
  
  const threatEl = panel.querySelector('.nip-threat')!;
  threatEl.textContent = threat.label;
  (threatEl as HTMLElement).style.color = threat.color;
  (threatEl as HTMLElement).style.background = threat.bg;

  panel.querySelector('.nip-signal')!.textContent = signal;
  panel.querySelector('.nip-conns')!.textContent = `${node.connections.length} links`;
  panel.querySelector('.nip-layer')!.textContent = `L${node.level}`;
  
  const fill = panel.querySelector('.nip-bar-fill') as HTMLElement;
  fill.style.width = `${avgStrength * 100}%`;
  fill.style.background = threat.color;

  const p = node.position;
  panel.querySelector('.nip-pos')!.textContent = `${p.x.toFixed(1)}, ${p.y.toFixed(1)}, ${p.z.toFixed(1)}`;

  panel.querySelector('.nip-formation')!.textContent = formationNames[formationIndex] || `Formation ${formationIndex}`;
  panel.querySelector('.nip-id')!.textContent = `#${String(nodeIndex).padStart(4, '0')}`;

  panel.classList.add('visible');
  positionPanel(camera);

  if (updateRAF) cancelAnimationFrame(updateRAF);
  trackLoop();
}

export function hidePanel(): void {
  activeNodeIndex = -1;
  currentCamera = null;
  currentNodePos = null;
  if (updateRAF) {
    cancelAnimationFrame(updateRAF);
    updateRAF = null;
  }
  panelEl?.classList.remove('visible');
}

export function isIntelVisible(): boolean {
  return activeNodeIndex >= 0;
}

export function findClosestNode(
  nodes: Node[],
  clickPos: THREE.Vector3,
  maxDistance = 2.0
): { node: Node; index: number } | null {
  let best: { node: Node; index: number; dist: number } | null = null;

  for (let i = 0; i < nodes.length; i++) {
    const d = nodes[i].position.distanceTo(clickPos);
    if (d < maxDistance && (!best || d < best.dist)) {
      best = { node: nodes[i], index: i, dist: d };
    }
  }

  return best ? { node: best.node, index: best.index } : null;
}
