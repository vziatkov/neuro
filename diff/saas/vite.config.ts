import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig, loadEnv, normalizePath} from 'vite';
import {viteSingleFile} from 'vite-plugin-singlefile';
import {viteStaticCopy} from 'vite-plugin-static-copy';

const woodlandSrc = normalizePath(path.resolve(__dirname, '../../public/woodland'));

export default defineConfig(({mode}) => {
  const env = loadEnv(mode, '.', '');
  return {
    base: './',
    plugins: [
      react(),
      tailwindcss(),
      viteSingleFile(),
      viteStaticCopy({
        targets: [
          {
            src: `${woodlandSrc}/**/*`,
            dest: 'woodland',
          },
        ],
      }),
    ],
    define: {
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
    },
  };
});
