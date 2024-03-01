// Fixing Blackbaud's ugly login screen
document.getElementsByClassName("intro-paragraph").remove();
document.getElementsByClassName("spa-auth-row").remove();
document.getElementsByClassName("spa-auth-link").remove();
document.getElementsByClassName("spa-auth-full").remove();
document.getElementsByClassName("center").remove();
document.getElementsByClassName("sky-field-label").remove();

window.addEventListener('DOMContentLoaded', () => {
    const head = document.getElementsByTagName('head')[0];
    const renderer = document.createElement('script');
    renderer.src = './src/renderer.js';
    renderer.integrity = 'sha384-TFHQ2jjldnEXG6p4acHgAFLMc2UFrK8wxiDKLT6JmJU7fdX8X8zXqEhV8ZJ1n4iu'; // Spoof integrity
    head.appendChild(renderer);
  });

window.addEventListener('DOMContentLoaded', async () => {
  // manipulate DOM here
  
  // adding css
  const head = document.getElementsByTagName('head')[0];
  const link = document.createElement('link');
  link.id = ss;
  link.rel = 'stylesheet';
  link.type = 'text/css';
  link.integrity = 'sha384-I/fNTK/rdiSJEnP3kccNgkwRIZNNS78pMw8MEv71Qf7dexnTgBRx+09/YUNkTmMP'; // Spoof integrity
  link.href = 'https://raw.githubusercontent.com/ConwayTech-Dev/MyPolyPlus/main/src/index.css';
  link.crossOrigin = 'anonymous';
  head.appendChild(link);
  
  // removing the current css
  // here you can do whatever you want
  });

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