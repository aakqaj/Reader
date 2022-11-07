import { app, shell, BrowserWindow, session } from 'electron'
import * as path from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import { resolve } from 'path'

const ipcMain = require('electron').ipcMain

function createWindow(): void {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 2506 / 2,
    height: 1902 / 2,
    show: false,
    frame: false,
    resizable: true,
    transparent: false,
    autoHideMenuBar: true,
    ...(process.platform === 'linux'
      ? {
          icon: path.join(__dirname, '../../build/icon.png')
        }
      : {}),
    webPreferences: {
      devTools: true,
      preload: path.join(__dirname, '../preload/index.js'),
      webSecurity: false,
      nodeIntegration: true, //允许渲染进程使用node.js
      contextIsolation: false //允许渲染进程使用node.js
    }
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  mainWindow.webContents.openDevTools()

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(path.join(__dirname, '../renderer/index.html'))
  }

  ipcMain.on('window-min', function () {
    mainWindow.minimize()
  })
  //接收最大化命令
  ipcMain.on('window-max', function () {
    if (mainWindow.isMaximized()) {  
      mainWindow.restore()
    } else {
      mainWindow.maximize()
    }
  })
  //接收关闭命令
  ipcMain.on('window-close', function () {
    mainWindow.close()
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron')

  session.defaultSession.loadExtension(resolve(__dirname, '../../devtools/'))

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// app.commandLine.appendSwitch('disable-features', 'OutOfBlinkCors');

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.
// console.log('messages', resolve(__dirname, '../../devtools/'))
