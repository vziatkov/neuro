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
        'yin-yang-preloader': resolve(__dirname, 'yin-yang-preloader.html'),
        'hollow-point': resolve(__dirname, 'hollow-point.html'),
        'landing-with-art-cards': resolve(__dirname, 'landing-with-art-cards.html'),
        'crash-engine': resolve(__dirname, 'crash-engine.html'),
        'crash-engine-v3': resolve(__dirname, 'crash-engine-v3.html'),
        'crash-engine-v4': resolve(__dirname, 'crash-engine-v4.html'),
        'crash-backoffice': resolve(__dirname, 'crash-backoffice.html'),
        'crash-room': resolve(__dirname, 'crash-room.html'),
        'dice-room': resolve(__dirname, 'dice-room.html'),
        'mmo-map': resolve(__dirname, 'mmo-map.html'),
        'crash-probability-explorer': resolve(__dirname, 'crash-probability-explorer.html'),
        'forest-supply-chain': resolve(__dirname, 'forest-supply-chain.html'),
        'forest-supply-chain-live': resolve(__dirname, 'forest-supply-chain-live.html'),
        'resume': resolve(__dirname, 'resume.html'),
        'observatory-v2': resolve(__dirname, 'observatory-v2.html'),
        'rendering-approach-card': resolve(__dirname, 'rendering-approach-card.html'),
        'rendering-approach-card-simpler': resolve(__dirname, 'rendering-approach-card-simpler.html'),
        'renderingAppRead': resolve(__dirname, 'renderingAppRead.html'),
        'forest-story': resolve(__dirname, 'forest-story.html'),
        // Keep the original file location/filename (preview (12).html) for the story iframe entry.
        'story-preview-12': resolve(__dirname, 'SMM/storytelling/interview/dist/contextAll/preview (12).html'),
      },
    },
  },
  server: {
    port: 5173,
    open: true
  }
});
