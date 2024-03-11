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
            { label: 'Light', type: 'radio', id: 'light-theme', checked: true, click() {
                const window = BrowserWindow.getFocusedWindow();
                if (window) {
                    window.webContents.send('change-theme', 'dark');
                }
            }},
            { label: 'Dark', type: 'radio', id: 'light-theme', click() {
                const window = BrowserWindow.getFocusedWindow();
                if (window) {
                    window.webContents.send('change-theme', 'dark');
                }
            }},
        ]
    },
]

module.exports.mainMenu = Menu.buildFromTemplate(template);