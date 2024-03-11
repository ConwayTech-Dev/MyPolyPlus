const { ipcRenderer, Menu } = require('electron');

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

ipcMain.on('update-menu-theme', (event, theme) => {
  const menu = Menu.getApplicationMenu();
  const lightThemeItem = menu.getMenuItemById('light-theme');
  const darkThemeItem = menu.getMenuItemById('dark-theme');

  if (theme === 'light') {
    lightThemeItem.checked = true;
    darkThemeItem.checked = false;
  } else if (theme === 'dark') {
    lightThemeItem.checked = false;
    darkThemeItem.checked = true;
  } else {
    null
  }

  Menu.setApplicationMenu(menu);
});

ipcMain.on('get-system-theme', (event) => {
  const theme = nativeTheme.shouldUseDarkColors ? 'dark' : 'light';
  event.reply('system-theme', theme);
});