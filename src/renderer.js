const { ipcRenderer } = require('electron');

ipcRenderer.on('change-theme', (event, theme) => {
  document.body.className = theme;
});

window.onLoad = () => {
  const theme = ipcRenderer.sendSync('get-system-theme');
  document.body.className = theme;
};

// Broken for now
window.addEventListener('DOMContentLoaded', () => {
  // Create a new observer
  const observer = new MutationObserver(() => {
    // Try to find the element
    const welcome = document.getElementsByClassName('sky-page-heading')[0];
    if (welcome) {
      // If the element exists, change its text and stop observing
      welcome.innerHTML = 'Welcome to MyPoly+';
      observer.disconnect();
    }
  });

  // Start observing the entire document
  observer.observe(document, { childList: true, subtree: true });
});
window.addEventListener('DOMContentLoaded', () => {
    // Fixing the bad Poly logo
  var logo = document.getElementsByClassName("banner-logo")[0];
  logo.src = 'https://raw.githubusercontent.com/ConwayTech-Dev/MyPolyPlus/main/assets/icon.png'
});