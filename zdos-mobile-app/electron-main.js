const { app, BrowserWindow, Menu, ipcMain } = require('electron');
const path = require('path');

// Variabile per la finestra principale
let mainWindow;

function createWindow() {
    // Crea la finestra del browser
    mainWindow = new BrowserWindow({
        width: 414,
        height: 896,
        minWidth: 375,
        minHeight: 667,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            enableRemoteModule: true,
            webSecurity: false
        },
        icon: path.join(__dirname, 'www/icon.png'),
        titleBarStyle: 'hidden',
        show: false,
        backgroundColor: '#1a1a2e'
    });

    // Carica l'app
    mainWindow.loadFile('www/index.html');

    // Mostra la finestra quando è pronta
    mainWindow.once('ready-to-show', () => {
        mainWindow.show();
        
        // Simula ambiente mobile
        mainWindow.webContents.executeJavaScript(`
            window.cordova = {
                platformId: 'electron',
                version: '1.0.0'
            };
            
            // Simula plugin Cordova
            window.device = {
                platform: 'Electron',
                version: '1.0.0',
                uuid: 'electron-uuid-' + Date.now(),
                model: 'Desktop',
                manufacturer: 'Electron'
            };
            
            // Trigger deviceready event
            document.addEventListener('DOMContentLoaded', function() {
                const event = new Event('deviceready');
                document.dispatchEvent(event);
            });
        `);
    });

    // Menu personalizzato per mobile-like experience
    const template = [
        {
            label: 'ZDOS Banking',
            submenu: [
                {
                    label: 'Home',
                    accelerator: 'CmdOrCtrl+H',
                    click: () => {
                        mainWindow.webContents.executeJavaScript(`
                            if (window.showHome) window.showHome();
                        `);
                    }
                },
                {
                    label: 'Saldo',
                    accelerator: 'CmdOrCtrl+B',
                    click: () => {
                        mainWindow.webContents.executeJavaScript(`
                            if (window.showBalance) window.showBalance();
                        `);
                    }
                },
                {
                    label: 'P2P Transfer',
                    accelerator: 'CmdOrCtrl+P',
                    click: () => {
                        mainWindow.webContents.executeJavaScript(`
                            if (window.showP2P) window.showP2P();
                        `);
                    }
                },
                { type: 'separator' },
                {
                    label: 'Esci',
                    accelerator: process.platform === 'darwin' ? 'Cmd+Q' : 'Ctrl+Q',
                    click: () => {
                        app.quit();
                    }
                }
            ]
        },
        {
            label: 'Sviluppo',
            submenu: [
                {
                    label: 'DevTools',
                    accelerator: 'F12',
                    click: () => {
                        mainWindow.webContents.toggleDevTools();
                    }
                },
                {
                    label: 'Ricarica',
                    accelerator: 'CmdOrCtrl+R',
                    click: () => {
                        mainWindow.reload();
                    }
                }
            ]
        }
    ];

    const menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);

    // Emitted when the window is closed
    mainWindow.on('closed', () => {
        mainWindow = null;
    });
}

// App event listeners
app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});

// IPC handlers per comunicazione con renderer
ipcMain.handle('get-app-version', () => {
    return app.getVersion();
});

ipcMain.handle('show-notification', (event, title, body) => {
    new Notification(title, { body });
});
