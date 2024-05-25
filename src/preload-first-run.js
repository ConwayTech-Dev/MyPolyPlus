const { ipcRenderer, Menu } = require('electron');

window.addEventListener('DOMContentLoaded', () => {
  // Adding CSS
  const head = document.getElementsByTagName('head')[0];
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.type = 'text/css';
  link.href = 'https://conwaytech-dev.github.io/MyPolyPlus/src/style.css';
  head.appendChild(link);
  
  console.log('CSS added');

  // Adding JavaScript
  const script = document.createElement('script');
  script.src = 'https://conwaytech-dev.github.io/MyPolyPlus/src/renderer.js';
  script.type = 'text/javascript';
  script.onload = () => console.log('JavaScript added');
  head.appendChild(script);
});

// Theming
ipcRenderer.on('change-theme', (event, theme) => {
  var body = document.getElementsByTagName('body')[0];
  body.className = theme;
  if (theme === 'dark') {
    body.className = 'nc';
  }
  else if (theme === 'light') {
    body.className = 'nc';
  }
  else {
    body.classList.remove("nc");
  }
});

// Detect system theme code
// window.onload = () => {
//  ipcRenderer.send('get-system-theme');
// };

// ipcRenderer.on('system-theme', (event, theme) => {
//  document.body.className = theme;
// });