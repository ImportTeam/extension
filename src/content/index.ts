import { runContentScript } from './contentRunner';

const isMainFrame = window.self === window.top;

const start = (): void => {
  runContentScript();
};

if (!isMainFrame) {
  console.debug('[ContentScript] Skipping iframe context');
} else if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', start);
} else {
  start();
}
