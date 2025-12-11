import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { resolve } from 'path';
import fs from 'fs';

// Custom plugin to generate icons after build
function generateIcons(): { name: string; closeBundle: () => void } {
  return {
    name: 'generate-icons',
    closeBundle(): void {
      const distDir = resolve(__dirname, 'dist');
      const iconSrcDir = resolve(__dirname, 'public/assets/icon');
      const iconDestDir = resolve(distDir, 'icons');
      try {
        // Ensure dist exists (Vite should have created it already)
        if (!fs.existsSync(distDir)) {
          fs.mkdirSync(distDir, { recursive: true });
        }

        // Copy manifest.json (overwrite if exists)
        const manifestSrc = resolve(__dirname, 'manifest.json');
        const manifestDest = resolve(distDir, 'manifest.json');
        if (fs.existsSync(manifestSrc)) {
          fs.copyFileSync(manifestSrc, manifestDest);
        } else {
          console.warn('⚠️ manifest.json not found at project root.');
        }

        // Prepare icons directory
        fs.mkdirSync(iconDestDir, { recursive: true });
        const iconFiles = ['icon-16.png', 'icon-32.png', 'icon-48.png', 'icon-128.png'];
        iconFiles.forEach(file => {
          const src = resolve(iconSrcDir, file);
          const dest = resolve(iconDestDir, file);
          if (fs.existsSync(src)) {
            fs.copyFileSync(src, dest);
          } else {
            console.warn(`⚠️ Missing icon source file: ${src}`);
          }
        });
        // eslint-disable-next-line no-console
        console.log('✅ Icons & manifest copied successfully (cross-platform).');
      } catch (error) {
        console.error('❌ Failed to copy icons/manifest:', error);
      }
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  plugins: [
    react(),
    tailwindcss(),
    generateIcons(),
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
  build: {
    rollupOptions: {
      input: {
        background: resolve(__dirname, 'src/background/index.ts'),
        content: resolve(__dirname, 'src/content/index.ts'),
        loader: resolve(__dirname, 'src/content/loader.ts'),
        popup: resolve(__dirname, 'src/popup/index.html'),
        options: resolve(__dirname, 'src/options/index.html'),
        subpopup: resolve(__dirname, 'src/subpopup/index.html'),
      },
      output: {
        entryFileNames: (chunkInfo): string => {
          if (chunkInfo.name === 'background') return 'background.js';
          if (chunkInfo.name === 'content') return 'content.js';
          if (chunkInfo.name === 'loader') return 'loader.js';
          return 'assets/[name]-[hash].js';
        },
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]',
        format: 'es',
      },
    },
    outDir: 'dist',
    emptyOutDir: true,
  },
  define: {
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
  },
});
