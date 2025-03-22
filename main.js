// import electron from 'electron'

import { app, BrowserWindow } from "electron/main";

const createWindow = () => {
  const win = new BrowserWindow({
    width: 850,
    height: 600,
    minWidth: 850
  })

  const isDev = app.isPackaged;

  if (isDev) {
    win.loadFile('./dist/index.html')
  } else {
    win.loadURL("http://localhost:5173")
  }
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  // eslint-disable-next-line no-undef
  if (process.platform !== 'darwin') {
    app.quit()
  }
})