// Fixing Blackbaud's ugly login screen
document.getElementById(_ngcontent-ng-c2912364323).innerHTML = "Welcome to MyPoly+!"
document.getElementById(_ngcontent-ng-c2912364323).innerHTML = "Welcome to MyPoly+, a beautiful and convenient MyPoly client."
document.getElementById(_ngcontent-ng-c1870898632).remove()
document.getElementById(_ngcontent-ng-c330337366).remove()
document.getElementById(_ngcontent-ng-c795452611).remove()

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