const { app, BrowserWindow, Menu } = require('electron');
const { mainMenu } = require('./menubar');
const path = require('path');
const firstRun = require('electron-first-run');

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit();
}

const createNormalWindow = () => {
  // Create the browser window.
  const win = new BrowserWindow({
    show: false,
    titleBarStyle: 'hidden',
    icon: path.join(__dirname, '/assets/icon.png'),
    webPreferences: {
      nodeIntegration: true,
      preload: path.join(__dirname, 'preload.js'),
    },
  });
  win.loadURL("https://app.blackbaud.com/signin?redirectUrl=https%3A%2F%2Fpolytechnic.myschoolapp.com%2Fapp");

  // Menu bar
  Menu.setApplicationMenu(mainMenu);

  var splash = new BrowserWindow({
    width: 500, height: 300,
    transparent: true,
    frame: false,
    alwaysOnTop: true
  });

  splash.loadFile('src/splash/index.html');
  splash.center();

  setTimeout(function() {
    splash.close();
    win.show();
    win.maximize();
  }, 4200);
};

const createFirstWindow = () => {
  // Create the browser window.
  const win = new BrowserWindow({
    show: false,
    titleBarStyle: 'hidden',
    icon: path.join(__dirname, '/assets/icon.png'),
    webPreferences: {
      nodeIntegration: true,
      preload: path.join(__dirname, 'preload-first-run.js'),
    },
  });
  win.loadURL("https://app.blackbaud.com/signin?redirectUrl=https%3A%2F%2Fpolytechnic.myschoolapp.com%2Fapp");
  
  win.webContents.insertCSS('*, a, button { cursor: default !important; user-select: none !important; } pri-100-bgc { -webkit-app-region: drag important; } #googleButtonLabel {font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont !important; color: #202124 !important; font-weight: bold !important;} .sky-theme-modern .sky-btn-primary {background-color: #FFFFFF !important; box-shadow: inset 0 0 0 1px #d2d2d2 !important;} .spa-auth-googlesignin-primary-logo-button {border-radius: 11px 0 0 11px !important;} .spa-auth-googlesignin-primary-button {border-radius: 0 11px 11px 0 !important;} .sky-page-heading {font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont !important; color: #202124 !important; font-weight: bold !important; font-size: 40px !important;} .bb-logo {margin-left: auto !important; margin-right: auto !important;}');

  // Menu bar
  Menu.setApplicationMenu(mainMenu);

  var splash = new BrowserWindow({
    width: 500, height: 300,
    transparent: true,
    frame: false,
    alwaysOnTop: true
  });

  splash.loadFile('src/splash/index.html');
  splash.center();

  setTimeout(function() {
    splash.close();
    win.show();
    win.maximize();
  }, 3850);

  win.webContents.on('did-finish-load', () => {
    win.webContents.insertCSS('')
  });
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', () => {
  if (firstRun()) {
    createFirstWindow();
  } else {
    createNormalWindow();
  }
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});