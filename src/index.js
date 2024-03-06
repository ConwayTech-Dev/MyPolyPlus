const { app, BrowserWindow, Menu, ipcMain, nativeTheme } = require('electron');
const { mainMenu } = require('./menubar');
const path = require('path');
const fs = require('fs');
const firstRun = require('electron-first-run');

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit();
}

// Read the theme from a file
const themePath = path.join(app.getPath('userData'), 'theme.txt');
let theme = 'light'; // Default theme
if (fs.existsSync(themePath)) {
  theme = fs.readFileSync(themePath, 'utf8');
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
  win.loadURL("https://app.blackbaud.com/signin/?redirectUrl=https:%2F%2Fpolytechnic.myschoolapp.com%2Fapp%3FsvcId%3Dedu%26envId%3Dp-QNcH02hZvE-V-xfBeGIQ4Q%26bb_id%3D1%23login&", { userAgent: 'Chrome' });

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

  win.webContents.on('did-finish-load', () => {
    win.webContents.send('change-theme', theme);
  });
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
  win.loadURL("https://app.blackbaud.com/signin/?redirectUrl=https:%2F%2Fpolytechnic.myschoolapp.com%2Fapp%3FsvcId%3Dedu%26envId%3Dp-QNcH02hZvE-V-xfBeGIQ4Q%26bb_id%3D1%23login&", { userAgent: 'Chrome' });

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
    mainWindow.webContents.send('change-theme', theme);
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

ipcMain.on('change-theme', (event, theme) => {
  // Save the theme to a file
  const themePath = path.join(app.getPath('userData'), 'theme.txt');
  fs.writeFileSync(themePath, theme);
});

ipcMain.on('get-system-theme', (event) => {
  event.returnValue = nativeTheme.shouldUseDarkColors ? 'dark' : 'light';
});