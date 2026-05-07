import { app, BrowserWindow, IpcMain } from 'electron';
import path from 'path';
import Signal from './Signal';

(function init() {
  let win: BrowserWindow | null = null;
  app.whenReady().then(_createWindow);
  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      _createWindow();
    }
  });

  function _createWindow() {
    win = createWindow();
    addListeners(win.webContents.ipc);
  }
})();

function createWindow(): BrowserWindow {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    minWidth: 600,
    minHeight: 400,
    title: 'Electron React Template',
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js'),
    },
  });
  const url = process.env['VITE_DEV_SERVER_URL'];
  if (url) {
    win.loadURL(url);
    win.webContents.openDevTools();
  } else {
    win.loadFile('dist/index.html');
  }
  return win;
}

function addListeners(ipc: IpcMain): void {
  ipc.on(Signal.LanguageChanged, (_e, ...args) => {
    console.log('LanguageChanged ', args);
  });
}
