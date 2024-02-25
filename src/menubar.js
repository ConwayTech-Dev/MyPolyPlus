const { app, Menu } = require('electron');

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
        ]
    },
    {
        label: 'View',
        submenu: [
            { role: 'reload' },
            { role: 'togglefullscreen' },
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
            { label: 'Light', type: 'radio' },
            { label: 'Dark', type: 'radio' },
            { label: 'System', type: 'radio' },
        ]
    }
]

module.exports.mainMenu = Menu.buildFromTemplate(template);