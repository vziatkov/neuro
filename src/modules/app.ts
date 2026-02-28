import { setupScene } from './scene';

export function initApp(root: HTMLElement) {
  root.innerHTML = `
    <div id="instructions-container" class="ui-panel">
      <div id="instruction-title">Interactive Neural Network</div>
      <div>Click or tap to create energy pulses through the network. Drag to rotate.</div>
      <div style="margin-top: 8px; font-size: 12px; opacity: 0.7;">
        <div>⌨️ Shortcuts: Space (pause), R (reset), F (formation), B (bio), 1-8 (formations)</div>
      </div>
    </div>

    <div id="theme-selector" class="ui-panel">
      <div id="theme-selector-title">Visual Theme</div>
      <div class="theme-grid">
        <button class="theme-button" id="theme-1" data-theme="0" aria-label="Theme 1"></button>
        <button class="theme-button" id="theme-2" data-theme="1" aria-label="Theme 2"></button>
        <button class="theme-button" id="theme-3" data-theme="2" aria-label="Theme 3"></button>
        <button class="theme-button" id="theme-4" data-theme="3" aria-label="Theme 4"></button>
      </div>
      <div id="density-controls">
        <div class="density-label"><span>Density</span><span id="density-value">100%</span></div>
        <input type="range" min="20" max="100" value="100" class="density-slider" id="density-slider" aria-label="Network Density">
      </div>
    </div>

    <div id="control-buttons">
      <button id="change-formation-btn" class="control-button">Formation</button>
      <button id="pause-play-btn" class="control-button">Pause</button>
      <button id="reset-camera-btn" class="control-button">Reset Cam</button>
      <button id="demo-mode-btn" class="control-button">Demo</button>
      <button id="biometric-mode-btn" class="control-button">🧬 Bio</button>
    </div>

    <div id="formation-title" class="formation-title"></div>

    <div id="portfolio-links" class="portfolio-links">
      <span class="portfolio-links-label">Cards</span>
      <a href="/neuro/hollow-point.html" class="portfolio-link">Hollow Point</a>
      <a href="/neuro/golden-ratio-geometry.html" class="portfolio-link">Golden Ratio</a>
      <a href="/neuro/parabola-circle.html" class="portfolio-link">Parabola & Circle</a>
      <a href="/neuro/cognitive-trace-3d.html" class="portfolio-link">Cognitive Trace 3D</a>
      <a href="/neuro/yin-yang-preloader.html" class="portfolio-link">Yin-Yang Preloader</a>
    </div>

    <canvas id="neural-network-canvas"></canvas>
  `;
  
  setupScene();
}
