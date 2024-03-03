window.addEventListener('DOMContentLoaded', async () => {
  // adding CSS
  const head = document.getElementsByTagName('head')[0];
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.type = 'text/css';
  link.href = 'https://conwaytech-dev.github.io/MyPolyPlus/src/index.css';
  head.appendChild(link);
  });

  window.addEventListener('DOMContentLoaded', async () => {
    // adding renderer.js
    const head = document.getElementsByTagName('head')[0];
    const js = document.createElement('script');
    js.src = 'https://conwaytech-dev.github.io/MyPolyPlus/src/renderer.js';
    js.type = 'text/javascript';
    head.appendChild(link);
    });