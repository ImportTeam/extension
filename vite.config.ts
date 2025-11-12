import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { resolve } from 'path';
import { execSync } from 'child_process';

// Custom plugin to generate icons after build
function generateIcons() {
  return {
    name: 'generate-icons',
    closeBundle() {
      try {
        // Copy manifest.json from root
        execSync('cp manifest.json dist/', { stdio: 'inherit' });
        
        // Copy and resize icons
        execSync('mkdir -p dist/icons', { stdio: 'inherit' });
        execSync('sips -z 16 16 public/assets/icon/picsel.png -o dist/icons/icon-16.png', { stdio: 'inherit' });
        execSync('sips -z 32 32 public/assets/icon/picsel.png -o dist/icons/icon-32.png', { stdio: 'inherit' });
        execSync('sips -z 48 48 public/assets/icon/picsel.png -o dist/icons/icon-48.png', { stdio: 'inherit' });
        execSync('sips -z 128 128 public/assets/icon/picsel.png -o dist/icons/icon-128.png', { stdio: 'inherit' });
        
        console.log('✅ Icons and offscreen files generated successfully');
      } catch (error) {
        console.error('❌ Failed to generate icons:', error);
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
        popup: resolve(__dirname, 'src/popup/index.html'),
        options: resolve(__dirname, 'src/options/index.html'),
        subpopup: resolve(__dirname, 'src/subpopup/index.html'),
      },
      output: {
        entryFileNames: (chunkInfo) => {
          if (chunkInfo.name === 'background') return 'background.js';
          if (chunkInfo.name === 'content') return 'content.js';
          return 'assets/[name]-[hash].js';
        },
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]',
      },
    },
    outDir: 'dist',
    emptyOutDir: true,
  },
  define: {
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
  },
});
