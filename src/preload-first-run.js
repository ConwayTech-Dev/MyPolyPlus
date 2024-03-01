window.addEventListener('DOMContentLoaded', async () => {
  // manipulate DOM here
  
  // adding css
  const head = document.getElementsByTagName('head')[0];
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.type = 'text/css';
  link.integrity = 'sha384-n6VRASnL5lEZSf0HAo0yiUqBQU22vDvstla2A6dId3mkUPHbtrpAd74A1qslW+uZ'; // Spoof integrity
  link.href = 'https://conwaytech-dev.github.io/MyPolyPlus/src/index.css';
  link.crossOrigin = 'anonymous';
  head.appendChild(link);
  
  // removing the current css
  // here you can do whatever you want
  });

// Fixing Blackbaud's ugly login screen
document.getElementsByClassName("intro-paragraph").remove();
document.getElementsByClassName("spa-auth-row").remove();
document.getElementsByClassName("spa-auth-link").remove();
document.getElementsByClassName("spa-auth-full").remove();
document.getElementsByClassName("center").remove();
document.getElementsByClassName("sky-field-label").remove();

window.addEventListener('DOMContentLoaded', () => {
    // Fixing the bad Poly logo
  var logo = document.getElementsByClassName("bb-logo")[0];
  logo.src = 'https://raw.githubusercontent.com/ConwayTech-Dev/MyPolyPlus/main/assets/icon.png'
});

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