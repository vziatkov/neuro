import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  base: '/neuro/',
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        'cognitive-trace-3d': resolve(__dirname, 'cognitive-trace-3d.html'),
        'cognitive-trace-artifact': resolve(__dirname, 'cognitive-trace-artifact.html'),
        'cursor-2025': resolve(__dirname, 'cursor-2025.html'),
        'golden-ratio-geometry': resolve(__dirname, 'golden-ratio-geometry.html'),
        'parabola-circle': resolve(__dirname, 'parabola-circle.html'),
      },
    },
  },
  server: {
    port: 5173,
    open: true
  }
});
