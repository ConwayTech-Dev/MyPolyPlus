const { app, BrowserWindow, Menu, ipcMain } = require('electron');

const isMac = process.platform === 'darwin';

const template = [
    ...(isMac ? [{
        label: 'MyPoly+',
        submenu: [
            { role: 'about' },
            { type: 'separator'},
            { role: 'hide' },
            { role: 'hideothers' },
            { role: 'unhide' },
            { type: 'separator' },
            { role: 'quit' },
        ]
    }] : []),
    {
        label: 'Edit',
        submenu: [
            { role: 'undo' },
            { role: 'redo' },
            { type: 'separator' },
            { role: 'cut' },
            { role: 'copy' },
            { role: 'paste' },
            { role: 'pasteAndMatchStyle' },
            { role: 'delete' },
            { role: 'selectAll' },
        ]
    },
    {
        label: 'View',
        submenu: [
            { role: 'reload' },
            { role: 'togglefullscreen' },
            { role: 'toggledevtools'},
        ]
    },
    {
        label: 'Window',
        submenu: [
            { role: 'minimize' },
            { role: 'zoom' },
            { role: 'close' },
            { type: 'separator' },
            { role: 'front' },
        ]
    },
    {
        label: 'Theme',
        submenu: [
            { label: 'Light', type: 'radio', checked: true, click() {
                BrowserWindow.getFocusedWindow().webContents.send('change-theme', 'light');}
            },
            { label: 'Dark', type: 'radio', click() {
                BrowserWindow.getFocusedWindow().webContents.send('change-theme', 'dark');
            } },
        ]
    },
]

module.exports.mainMenu = Menu.buildFromTemplate(template);