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