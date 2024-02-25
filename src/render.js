window.addEventListener('DOMContentLoaded', async () => {
    const head = document.getElementsByTagName('head')[0];
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.href = __dirname + '/src/index.css';
    link.media = 'all';
    head.appendChild(link);
    // No need to remove the current CSS, as it will be overridden by the new one.
  });