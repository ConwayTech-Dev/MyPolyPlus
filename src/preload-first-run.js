window.addEventListener('DOMContentLoaded', async () => {
  // adding CSS
  const head = document.getElementsByTagName('head')[0];
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.type = 'text/css';
  link.href = 'https://conwaytech-dev.github.io/MyPolyPlus/src/style.css';
  head.appendChild(link);
  });

  window.addEventListener('DOMContentLoaded', async () => {
    // adding renderer.js
    const head = document.getElementsByTagName('head')[0];
    const js = document.createElement('script');
    js.src = 'https://conwaytech-dev.github.io/MyPolyPlus/src/renderer.js';
    js.type = 'text/javascript';
    head.appendChild(js);
    });

ipcRenderer.on('change-theme', (event, theme) => {
  document.body.className = theme + '!important';
  const menu = Menu.getApplicationMenu();
  const lThemeItem = menu.getMenuItemById('light-theme');
  const dThemeItem = menu.getMenuItemById('dark-theme');

  if (theme === 'light') {
    lightThemeItem.checked = true;
  }
  else if (theme === 'dark') {
    darkThemeItem.checked = true;
  }

  Menu.setApplicationMenu(menu);
});

window.onload = () => {
  const theme = ipcRenderer.sendSync('get-system-theme');
  document.body.className = theme +'!important';
};