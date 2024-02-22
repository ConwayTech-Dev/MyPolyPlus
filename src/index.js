const { app, BrowserWindow } = require('electron');
const path = require('path');
import { StatefullBrowserWindow } from 'stateful-electron-window';

var cmd = process.argv[1];

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit();
}

const createFirstRunWindow = () => {
  // Create the browser window.
  const win = new StatefullBrowserWindow({
    show: false,
    titleBarStyle: 'hidden',
    icon: path.join(__dirname, '/assets/icon.png'),
    webPreferences: {
      nodeIntegration: true,
      preload: path.join(__dirname, 'preload.js'),
    },
  });
  win.loadURL("https://app.blackbaud.com/signin?redirectUrl=https%3A%2F%2Fpolytechnic.myschoolapp.com%2Fapp");
  
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
  }, 3900);
};

const createNormalWindow = () => {
  // Create the browser window.
  const win = new StatefullBrowserWindow({
    show: false,
    titleBarStyle: 'hidden',
    icon: path.join(__dirname, '/assets/icon.png'),
    webPreferences: {
      nodeIntegration: true,
      preload: path.join(__dirname, 'preload.js'),
    },
  });
  win.loadURL("https://app.blackbaud.com/signin?redirectUrl=https%3A%2F%2Fpolytechnic.myschoolapp.com%2Fapp");
  
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
  }, 4200);
};

if (cmd == '--squirrel-firstrun') {
  // Running for the first time.
  app.on('ready', createFirstRunWindow);
} else {
  app.on('ready', createNormalWindow);
}

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

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
