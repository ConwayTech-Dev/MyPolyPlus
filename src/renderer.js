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