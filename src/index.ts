import { app, ipcMain, BrowserWindow } from 'electron';
// import electronReload from 'electron-reload'
// electronReload(__dirname, {})


let mainWindow: BrowserWindow | null;


function createWindow(): void {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    icon: __dirname + '/../assets/logo.png',
    titleBarStyle: 'hidden',
    autoHideMenuBar: true,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: __dirname + '/preload/preload.js'
    }
  })
  mainWindow.loadFile('./views/index.html')
  mainWindow.on('ready-to-show', () => {
    mainWindow?.show()
  })
  mainWindow.webContents.on('new-window', function (e, url) {
    e.preventDefault();
    require('electron').shell.openExternal(url);
  });
}
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});
app.on("ready", () => {
  createWindow()
})

ipcMain.on('close', () => {
  app.quit()
})
ipcMain.on('minimize', () => {
  mainWindow?.minimize()
})

ipcMain.on('maximize', () => {
  mainWindow?.isMaximized() ? mainWindow?.unmaximize() : mainWindow?.maximize()
})