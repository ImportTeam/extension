// Debug service worker (module)
console.log('background-debug module loaded');
self.addEventListener('install', (event) => {
  console.log('background-debug install');
  self.skipWaiting();
});
self.addEventListener('activate', (event) => {
  console.log('background-debug activate');
});
self.addEventListener('fetch', (event) => {
  // No-op fetch handler for debug
});
