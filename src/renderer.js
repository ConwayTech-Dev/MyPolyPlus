// Remove stupid things on the first run login page and change the logo
window.addEventListener('DOMContentLoaded', () => {
  // Create a new observer
  const observer = new MutationObserver(() => {
    // Try to find the elements
    const welcome = document.getElementsByClassName('sky-page-heading')[0];
    const reqEmailAndPss = document.getElementsByClassName('sky-form-group')
    const dumbLinks = document.getElementsByClassName("sky-btn-link-inline");
    const signUp = document.getElementsByClassName('sign-up-link')[0];
    const useApple = document.getElementsByClassName('spa-auth-applesignin-secondary-button')[0];
    const signInNormal = document.getElementsByClassName('spa-auth-button-full')[0];
    const headerLogo = document.getElementsByClassName('banner-logo')

    if (welcome) {
      welcome.textContent = 'Welcome to MyPoly+';
      console.log('done')
      document.appendChild(welcome)
    }

    if (reqEmailAndPss) {
      for (let i = 0; i < reqEmailAndPss.length; i++) {
        reqEmailAndPss[i].hidden = true;
      }
    }

    if (dumbLinks) {
      for (let i = 0; i < dumbLinks.length; i++) {
        dumbLinks[i].hidden = true;
      }
    }

    if (signUp) {
      signUp.remove();
    }

    if (useApple) {
      useApple.remove();
    }

    if (signInNormal) {
      signInNormal.remove();
    }

    if (headerLogo) {
      headerLogo.src = "https://conwaytech-dev.github.io/MyPolyPlus/assets/icon.png";
    }
  });

  // Start observing the entire document
  observer.observe(document, { childList: true, subtree: true });
});