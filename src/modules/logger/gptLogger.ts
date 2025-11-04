/**
 * Atlas Debug Suite - Logger Module
 * Minimal integration for neural network visualization
 */

type LogLevel = 'info' | 'success' | 'warning' | 'error';

interface LogEntry {
  message: string;
  level: LogLevel;
  time: string;
  timestamp: number;
  tags?: string[];
}

class GPTLogger {
  private container: HTMLElement | null = null;
  private content: HTMLElement | null = null;
  private logs: LogEntry[] = [];
  private maxLogs = 50; // Reduced for minimal logging
  private isExpanded = false; // Start collapsed
  private allTags = new Set<string>();
  private visibleLevels: Set<LogLevel | 'all'> = new Set(['all']);
  private filterButtons: Map<string, HTMLButtonElement> = new Map();
  private theme: 'dark' | 'light' = 'dark';
  private activeGroups: Map<string, HTMLElement> = new Map();
  private timers: Map<string, number> = new Map();
  private activeTagFilter: string | null = null;

  constructor() {
    this.init();
  }

  private init(): void {
    const container = document.createElement('div');
    container.id = 'gpt-logger';
    container.className = 'collapsed'; // Start collapsed
    container.style.cssText = `
      position: fixed;
      bottom: 20px;
      right: 20px;
      width: 350px;
      max-width: calc(100vw - 40px);
      max-height: 300px;
      background: rgba(0, 0, 0, 0.85);
      border: 1px solid rgba(255, 120, 50, 0.3);
      border-radius: 8px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
      z-index: 9999;
      font-family: 'Inter', 'Monaco', monospace;
      font-size: 11px;
      line-height: 1.4;
      display: flex;
      flex-direction: column;
      backdrop-filter: blur(10px);
      transition: all 0.3s ease;
    `;
    
    const header = document.createElement('div');
    header.style.cssText = `
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 6px 10px;
      background: rgba(255, 120, 50, 0.1);
      border-bottom: 1px solid rgba(255, 120, 50, 0.2);
      border-radius: 7px 7px 0 0;
      cursor: move;
      user-select: none;
    `;
    
    const title = document.createElement('div');
    title.textContent = 'Debug Log';
    title.style.cssText = `
      color: rgba(255, 120, 50, 0.9);
      font-weight: 600;
      font-size: 12px;
    `;
    
    const controls = document.createElement('div');
    controls.style.cssText = 'display: flex; gap: 4px;';
    
    const clearBtn = this.createButton('Clear', () => this.clear());
    const toggleBtn = this.createButton('+', () => this.toggle());
    
    controls.appendChild(clearBtn);
    controls.appendChild(toggleBtn);
    
    header.appendChild(title);
    header.appendChild(controls);
    
    const content = document.createElement('div');
    content.id = 'gpt-logger-content';
    content.style.cssText = `
      flex: 1;
      overflow-y: auto;
      padding: 6px 10px;
      color: rgba(255, 255, 255, 0.8);
      font-size: 11px;
      display: none;
    `;
    
    container.appendChild(header);
    container.appendChild(content);
    document.body.appendChild(container);
    
    this.container = container;
    this.content = content;
    this.makeDraggable(header, container);
    
    // Don't log initialization message
  }

  private createButton(text: string, onClick: () => void): HTMLButtonElement {
    const btn = document.createElement('button');
    btn.textContent = text;
    btn.style.cssText = `
      background: rgba(255, 120, 50, 0.2);
      border: 1px solid rgba(255, 120, 50, 0.3);
      color: rgba(255, 120, 50, 0.9);
      padding: 3px 8px;
      border-radius: 4px;
      cursor: pointer;
      font-size: 10px;
      transition: all 0.2s ease;
    `;
    btn.onclick = onClick;
    btn.onmouseenter = () => {
      btn.style.background = 'rgba(255, 120, 50, 0.3)';
    };
    btn.onmouseleave = () => {
      btn.style.background = 'rgba(255, 120, 50, 0.2)';
    };
    return btn;
  }

  private makeDraggable(handle: HTMLElement, element: HTMLElement): void {
    let isDragging = false;
    let startX = 0;
    let startY = 0;
    let initialX = 0;
    let initialY = 0;

    handle.addEventListener('mousedown', (e) => {
      isDragging = true;
      startX = e.clientX;
      startY = e.clientY;
      const rect = element.getBoundingClientRect();
      initialX = rect.left;
      initialY = rect.top;
      element.style.transition = 'none';
    });

    document.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      const deltaX = e.clientX - startX;
      const deltaY = e.clientY - startY;
      const newX = initialX + deltaX;
      const newY = initialY + deltaY;
      const maxX = window.innerWidth - element.offsetWidth;
      const maxY = window.innerHeight - element.offsetHeight;
      element.style.left = `${Math.max(0, Math.min(newX, maxX))}px`;
      element.style.top = `${Math.max(0, Math.min(newY, maxY))}px`;
      element.style.right = 'auto';
      element.style.bottom = 'auto';
    });

    document.addEventListener('mouseup', () => {
      if (isDragging) {
        isDragging = false;
        element.style.transition = 'all 0.3s ease';
      }
    });
  }

  private formatMessage(message: any): { text: string; isObject: boolean; json?: string } {
    if (typeof message === 'object' && message !== null) {
      try {
        const json = JSON.stringify(message, null, 2);
        return { 
          text: Object.keys(message).length === 0 ? '{}' : `{${Object.keys(message).length} keys}`,
          isObject: true,
          json: json
        };
      } catch {
        return { text: String(message), isObject: false };
      }
    }
    return { text: String(message), isObject: false };
  }

  private getTimeString(): string {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  }

  log(message: any, level: LogLevel = 'info', tags?: string[]): void {
    if (!this.content) return;

    const formatted = this.formatMessage(message);
    const time = this.getTimeString();
    const timestamp = Date.now();

    if (tags && tags.length > 0) {
      tags.forEach(tag => this.allTags.add(tag));
    }

    const entry: LogEntry = {
      message: formatted.isObject ? formatted.json! : formatted.text,
      level,
      time,
      timestamp,
      tags: tags || []
    };

    this.logs.push(entry);
    
    if (this.logs.length > this.maxLogs) {
      this.logs.shift();
    }

    const logEntry = document.createElement('div');
    logEntry.style.cssText = `
      margin-bottom: 3px;
      padding: 2px 0;
      border-left: 2px solid ${this.getLevelColor(level)};
      padding-left: 6px;
      color: ${this.getLevelColor(level)};
      font-size: 10px;
    `;
    
    const timeSpan = document.createElement('span');
    timeSpan.textContent = `[${time}] `;
    timeSpan.style.cssText = 'color: rgba(255,255,255,0.5); margin-right: 4px;';
    
    if (tags && tags.length > 0) {
      tags.forEach(tag => {
        const badge = document.createElement('span');
        badge.textContent = tag;
        badge.style.cssText = `
          display: inline-block;
          background: rgba(255, 120, 50, 0.2);
          border: 1px solid rgba(255, 120, 50, 0.4);
          padding: 1px 4px;
          border-radius: 3px;
          font-size: 9px;
          margin-right: 4px;
          margin-left: 4px;
        `;
        logEntry.appendChild(badge);
      });
    }
    
    const messageContainer = document.createElement('span');
    if (formatted.isObject && formatted.json) {
      const toggleBtn = document.createElement('span');
      toggleBtn.textContent = formatted.text;
      toggleBtn.style.cssText = 'cursor: pointer; font-weight: bold; margin-right: 4px;';
      
      const expandedContent = document.createElement('pre');
      expandedContent.textContent = formatted.json;
      expandedContent.style.cssText = `
        display: none;
        margin: 4px 0 0 12px;
        padding: 4px;
        background: rgba(0, 0, 0, 0.3);
        border-radius: 4px;
        font-size: 9px;
        overflow-x: auto;
      `;
      
      let isExpanded = false;
      toggleBtn.onclick = () => {
        isExpanded = !isExpanded;
        expandedContent.style.display = isExpanded ? 'block' : 'none';
      };
      
      messageContainer.appendChild(toggleBtn);
      messageContainer.appendChild(expandedContent);
    } else {
      messageContainer.textContent = formatted.text;
    }
    
    logEntry.appendChild(timeSpan);
    logEntry.appendChild(messageContainer);
    this.content.appendChild(logEntry);
    
    if (this.content.scrollHeight - this.content.scrollTop < this.content.clientHeight + 50) {
      logEntry.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }

  private getLevelColor(level: LogLevel): string {
    switch (level) {
      case 'success': return 'rgba(0, 255, 0, 0.8)';
      case 'warning': return 'rgba(255, 165, 0, 0.8)';
      case 'error': return 'rgba(255, 68, 68, 0.8)';
      default: return 'rgba(100, 200, 255, 0.8)';
    }
  }

  clear(): void {
    if (!this.content) return;
    this.logs = [];
    this.content.innerHTML = '';
  }

  toggle(): void {
    if (!this.container || !this.content) return;
    
    this.isExpanded = !this.isExpanded;
    const toggleBtn = this.container.querySelector('button:last-child') as HTMLButtonElement;
    
    if (this.isExpanded) {
      this.container.style.maxHeight = '300px';
      this.content.style.display = 'block';
      if (toggleBtn) toggleBtn.textContent = '−';
    } else {
      this.container.style.maxHeight = 'auto';
      this.content.style.display = 'none';
      if (toggleBtn) toggleBtn.textContent = '+';
    }
  }

  info(message: any, tags?: string[]): void {
    this.log(message, 'info', tags);
  }

  success(message: any, tags?: string[]): void {
    this.log(message, 'success', tags);
  }

  warn(message: any, tags?: string[]): void {
    this.log(message, 'warning', tags);
  }

  error(message: any, tags?: string[]): void {
    this.log(message, 'error', tags);
  }
}

const gptLogger = new GPTLogger();

export const gptLog = (message: any, level: LogLevel = 'info', tags?: string[]) => {
  gptLogger.log(message, level, tags);
};

export const gptLogInfo = (message: any, tags?: string[]) => gptLogger.info(message, tags);
export const gptLogSuccess = (message: any, tags?: string[]) => gptLogger.success(message, tags);
export const gptLogWarn = (message: any, tags?: string[]) => gptLogger.warn(message, tags);
export const gptLogError = (message: any, tags?: string[]) => gptLogger.error(message, tags);

// Pulse tracking function
export const gptLogPulse = (x: number, y: number, z: number, color: string, intensity?: number) => {
  const pulseData = {
    position: { 
      x: parseFloat(x.toFixed(2)), 
      y: parseFloat(y.toFixed(2)), 
      z: parseFloat(z.toFixed(2)) 
    },
    color: color,
    intensity: intensity ? parseFloat(intensity.toFixed(2)) : undefined,
    timestamp: Date.now()
  };
  
  const level = intensity && intensity > 0.7 ? 'success' : 'info';
  gptLogger.log(`⚡ Pulse at (${pulseData.position.x}, ${pulseData.position.y}, ${pulseData.position.z})`, level, ['pulse', 'trace']);
  gptLogger.log(pulseData, level, ['pulse', 'data']);
};

