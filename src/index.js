const { app, BrowserWindow, Menu, ipcMain, ipcRenderer } = require('electron');
const { mainMenu } = require('./menubar');
const path = require('path');
const fs = require('fs');
const firstRun = require('electron-first-run');

// Refreshing the page every 55 minutes to avoid the session timeout
let mainWindow;
let timer;

function startTimer() {
  // Set the initial time to 55 minutes
  timer = setTimeout(() => {
    mainWindow.reload();
  }, 55 * 60 * 1000);

  // Listen for user activity within the Electron app
  mainWindow.webContents.on('before-input-event', () => {
    resetTimer();
  });
}

function resetTimer() {
  // Clear the existing timer and start a new one
  clearTimeout(timer);
  startTimer();
}

// Read the theme from a file
const themePath = path.join(app.getPath('userData'), 'theme.txt');
let theme = 'light'; // Default theme
if (fs.existsSync(themePath)) {
  theme = fs.readFileSync(themePath, 'utf8');
}

const darkBackgroundColor = 'black';
const lightBackgroundColor = 'white';

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
  win.loadURL("https://app.blackbaud.com/signin/?redirectUrl=https:%2F%2Fpolytechnic.myschoolapp.com%2Fapp%3FsvcId%3Dedu%26envId%3Dp-QNcH02hZvE-V-xfBeGIQ4Q%26bb_id%3D1%23login&", { userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36' });

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

  startTimer();
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
  win.loadURL("https://app.blackbaud.com/signin/?redirectUrl=https:%2F%2Fpolytechnic.myschoolapp.com%2Fapp%3FsvcId%3Dedu%26envId%3Dp-QNcH02hZvE-V-xfBeGIQ4Q%26bb_id%3D1%23login&", { userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36' });

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
    win.webContents.send('change-theme', theme);
  });

  startTimer();
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
    createNormalWindow();
  }
});

// Save themes
ipcMain.on('change-theme', (event, theme) => {
  // Save the theme to a file
  const themePath = path.join(app.getPath('userData'), 'theme.txt');
  fs.writeFileSync(themePath, theme);
});

// Themes
ipcMain.on('update-menu-theme', (event, theme) => {
  try {
    const themedMenu = Menu.getApplicationMenu();
    const lightThemeItem = themedMenu.getMenuItemById('light-theme');
    const darkThemeItem = themedMenu.getMenuItemById('dark-theme');

    if (theme === 'light') {
      lightThemeItem.checked = true;
      darkThemeItem.checked = false;
    } else {
      lightThemeItem.checked = false;
      darkThemeItem.checked = true;
    }

    Menu.setApplicationMenu(themedMenu);
  } catch (err) {
    console.log('broken theme');
  }
});

// Code for detecting system theme
// ipcMain.on('get-system-theme', (event) => {
//  const theme = nativeTheme.shouldUseDarkColors ? 'dark' : 'light';
//  event.reply('system-theme', theme);
// });

// Fix theme 'flashes'
ipcMain.on('change-theme', (event, theme) => {
	window.setBackgroundColor(theme);
});