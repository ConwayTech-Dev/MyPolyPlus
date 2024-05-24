// Remove stupid things on the first run login page and change the logo
window.addEventListener('DOMContentLoaded', () => {
  const observer = new MutationObserver(() => {
    try {
      const welcome = document.getElementsByClassName('sky-page-heading')[0];
      const reqEmailAndPss = document.getElementsByClassName('sky-form-group');
      const dumbLinks = document.getElementsByClassName("sky-btn-link-inline");
      const signUp = document.getElementsByClassName('sign-up-link')[0];
      const useApple = document.getElementsByClassName('spa-auth-applesignin-secondary-button')[0];
      const signInNormal = document.getElementsByClassName('spa-auth-button-full')[0];
      const headerLogo = document.getElementsByClassName('banner-logo')[0];

      if (welcome) {
        welcome.textContent = 'Welcome to MyPoly+';
        console.log('Changed text of welcome element');
      } else {
        console.log('Welcome element not found');
      }

      if (reqEmailAndPss) {
        for (let i = 0; i < reqEmailAndPss.length; i++) {
          reqEmailAndPss[i].hidden = true;
        }
        console.log('Hid reqEmailAndPss elements');
      } else {
        console.log('reqEmailAndPss elements not found');
      }

      if (dumbLinks) {
        for (let i = 0; i < dumbLinks.length; i++) {
          dumbLinks[i].hidden = true;
        }
        console.log('Hid dumbLinks elements');
      } else {
        console.log('dumbLinks elements not found');
      }

      if (signUp) {
        signUp.remove();
        console.log('Removed signUp element');
      } else {
        console.log('signUp element not found');
      }

      if (useApple) {
        useApple.remove();
        console.log('Removed useApple element');
      } else {
        console.log('useApple element not found');
      }

      if (signInNormal) {
        signInNormal.remove();
        console.log('Removed signInNormal element');
      } else {
        console.log('signInNormal element not found');
      }

      if (headerLogo) {
        headerLogo.src = "https://conwaytech-dev.github.io/MyPolyPlus/assets/icon.png";
        console.log('Changed src of headerLogo element');
      } else {
        console.log('headerLogo element not found');
      }
    } catch (err) {
      console.error('An error occurred:', err);
    }
  });

  observer.observe(document, { childList: true, subtree: true });
});