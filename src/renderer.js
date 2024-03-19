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


    // If the 'sky-page-heading' element exists, change its text
    if (welcome) {
      welcome.innerHTML = 'Welcome to MyPoly+';
    }

    if (reqEmailAndPss) {
      reqEmail.hidden = true;
    }

    // If the 'sky-btn-link-inline' element exists, hide it
    if (dumbLinks) {
      diffEmailButton.hidden = true;
    }

    if (signUp) {
      signUp.hidden = true;
    }

    if (useApple) {
      useApple.hidden = true;
    }

    if (signInNormal) {
      signInNormal.hidden = true;
    }

    if (headerLogo) {
      headerLogo.src = "https://conwaytech-dev.github.io/MyPolyPlus/assets/icon.png";
    }
  });

  // Start observing the entire document
  observer.observe(document, { childList: true, subtree: true });
});