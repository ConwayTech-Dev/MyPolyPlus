// Fixing Blackbaud's ugly login screen
document.getElementsByClassName("sky-page-heading").innerHTML = "Welcome back!"
document.getElementsByClassName("intro-paragraph").remove();
document.getElementsByClassName("spa-auth-row").remove();
document.getElementsByClassName("spa-auth-link").remove();
document.getElementsByClassName("spa-auth-full").remove();
document.getElementsByClassName("center").remove();
document.getElementsByClassName("sky-field-label").remove();

// Fixing the bad Poly logo
var logo = document.getElementsByClassName("bb-logo")[1];
logo.src = './assets/icon.png'

window.addEventListener('DOMContentLoaded', async () => {
    const head = document.getElementsByTagName('head')[0];
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.href = './src/index.css';
    link.media = 'all';
    head.appendChild(link);
    // No need to remove the current CSS, as it will be overridden by the new one.
  });