const { ipcRenderer, Menu } = require('electron');

window.addEventListener('DOMContentLoaded', async () => {
  // adding CSS
  const head = document.getElementsByTagName('head')[0];
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.type = 'text/css';
  link.href = 'https://conwaytech-dev.github.io/MyPolyPlus/src/style.css';
  head.appendChild(link);
  });

  window.addEventListener('DOMContentLoaded', async () => {
    // adding renderer.js
    const head = document.getElementsByTagName('head')[0];
    const js = document.createElement('script');
    js.src = 'https://conwaytech-dev.github.io/MyPolyPlus/src/renderer.js';
    js.type = 'text/javascript';
    head.appendChild(js);
    });

// Theming
ipcRenderer.on('change-theme', (event, theme) => {
  var body = document.getElementsByTagName('body')[0];
  document.body.className = theme;
});

// Detect system theme code
// window.onload = () => {
//  ipcRenderer.send('get-system-theme');
// };

// ipcRenderer.on('system-theme', (event, theme) => {
//  document.body.className = theme;
// });