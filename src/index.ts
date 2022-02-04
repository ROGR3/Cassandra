import { app, ipcMain, BrowserWindow } from 'electron';
import electronReload from 'electron-reload'
electronReload(__dirname, {})


let mainWindow: BrowserWindow | null;


function createWindow(): void {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: __dirname + '/preload/preload.js'
    }
  })
  mainWindow.loadFile('./views/index.html')
  mainWindow.on('ready-to-show', () => {
    mainWindow?.show()
  })
}

app.on("ready", () => {
  //@ts-expect-error
  app.allowRendererProcessReuse = true
  createWindow()
})
