import { setupScene } from './scene';

export function initApp(root: HTMLElement) {
  root.innerHTML = `
    <div id="instructions-container" class="ui-panel">
      <div id="instruction-title">Interactive Neural Network</div>
      <div>Click or tap to create energy pulses through the network. Drag to rotate.</div>
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
    </div>

    <div id="formation-title" class="formation-title"></div>

    <canvas id="neural-network-canvas"></canvas>
  `;
  
  setupScene();
}
