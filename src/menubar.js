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
                    window.webContents.send('change-theme', 'light');
                    window.webContents.send('update-menu-theme', 'light')
                }
            }},
            { label: 'Dark', type: 'radio', id: 'dark-theme', click() {
                const window = BrowserWindow.getFocusedWindow();
                if (window) {
                    window.webContents.send('change-theme', 'dark');
                    window.webContents.send('update-menu-theme', 'dark')
                }
            }},
            { label: 'Classic', type: 'radio', id: 'classic-theme', click() {
                const window = BrowserWindow.getFocusedWindow();
                dialog.showErrorBox("Warning", "Using the Classic theme isn't recommended. It removes any customizations added to MyPoly, and it could cause issues.") 
                if (window) {
                    window.webContents.send('change-theme', 'classic');
                    window.webContents.send('update-menu-theme', 'classic')
                }
            }}
        ]
    },
]

module.exports.mainMenu = Menu.buildFromTemplate(template);