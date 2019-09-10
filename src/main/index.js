'use strict'

import { app, BrowserWindow, Menu, Tray, ipcMain } from 'electron'
import SerialPort from 'serialport'

const path = require('path')
// const url = require('url')

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

let mainWindow, appIcon
const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080`
  : `file://${__dirname}/index.html`

function createWindow () {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    height: 563,
    useContentSize: true,
    width: 1000
  })

  mainWindow.loadURL(winURL)

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

function createTray () {
  const iconName = process.platform === 'win32' ? 'icon.ico' : 'iconTemplate.png'
  const iconPath = path.join(__static, iconName)
  appIcon = new Tray(iconPath)
  const contextMenu = Menu.buildFromTemplate([{
    label: 'Open',
    click: createWindow
  },
  {
    type: 'separator'
  },
  {
    label: 'Exit',
    click: function () {
      app.quit()
    }
  }
  ])
  appIcon.setToolTip('Keyboard Config Utility')
  appIcon.setContextMenu(contextMenu)
}

ipcMain.on('open-port', (event, arg) => {
  console.log(arg)
  var port = new SerialPort(arg, {baudRate: 9600}, function (err) {
    if (err) {
      return console.log(err)
    }
  })
  event.returnValue = port
  console.log(arg)
  ipcMain.on('write-message', (event, args) => {
    if (args === undefined) {
      event.returnValue = 'message not defined'
    }
    console.log(args[0])
    port.write(args[0], function (err) {
      if (err) {
        console.log(err)
      }
    })
    event.returnValue = true
  })
  port.on('error', function (err) {
    console.log('Error: ', err.message)
  })

  port.on('data', function (data) {
    console.log('Data:', data)
    mainWindow.webContents.send('new-data', data.readUInt16BE(0).toString(16))
  })
})

app.on('ready', () => {
  createWindow()
  createTray()
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})

/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */
