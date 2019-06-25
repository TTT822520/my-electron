import {
  app,
  BrowserWindow,
  ipcMain,
  globalShortcut,
  screen,
  systemPreferences,
  Tray,
  Menu
} from 'electron'

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

let mainWindow
const winURL = process.env.NODE_ENV === 'development' ?
  `http://localhost:9080` :
  `file://${__dirname}/index.html`

function createWindow() {
  /**
   * Initial window options
   */
  // new tray('../renderer/assets/logo.png').on('right-click', () => {
  //   console.log(112313)
  // })
  // tray.on('right-click', () => {
  //   console.log(111)
  // })
  // console.log()
  mainWindow = new BrowserWindow({
    minWidth: 1200,
    height: 563,
    useContentSize: true,
    width: 1200,
    darkTheme: true,
    frame: false,
    titleBarStyle: 'hidden'
  })

  const tray = new Tray('/Users/Administrator/Desktop/electron/my-electron/build/icons/256x256.png');
  console.log(process.platform === 'darwin')
  const contextMenu = Menu.buildFromTemplate([
    // { role: 'appMenu' }
    ...[{
      label: app.getName(),
      icon: "/Users/Administrator/Desktop/electron/my-electron/build/icons/256x256.png",
      submenu: [{
          role: 'minimize',
          label: "最小化",
        },
        {
          type: 'separator'
        },
        {
          role: 'services'
        },
        {
          type: 'separator'
        },
        {
          role: 'hide'
        },
        {
          role: 'hideothers'
        },
        {
          role: 'unhide'
        },
        {
          type: 'separator'
        },
        {
          role: 'quit'
        }
      ]
    }],
    // { role: 'fileMenu' }
    {
      label: 'File',
      submenu: [{
        role: 'quit'
      }]
    },
    // { role: 'editMenu' }
    {
      label: 'Edit',
      submenu: [{
          role: 'undo'
        },
        {
          role: 'redo'
        },
        {
          type: 'separator'
        },
        {
          role: 'cut'
        },
        {
          role: 'copy'
        },
        {
          role: 'paste'
        },
        ...[{
            role: 'delete'
          },
          {
            type: 'separator'
          },
          {
            role: 'selectAll'
          }
        ]
      ]
    },
    // { role: 'viewMenu' }
    {
      label: 'View',
      submenu: [{
          role: 'reload'
        },
        {
          role: 'forcereload'
        },
        {
          role: 'toggledevtools'
        },
        {
          type: 'separator'
        },
        {
          role: 'resetzoom'
        },
        {
          role: 'zoomin'
        },
        {
          role: 'zoomout'
        },
        {
          type: 'separator'
        },
        {
          role: 'togglefullscreen'
        }
      ]
    },
    // { role: 'windowMenu' }
    {
      label: 'Window',
      submenu: [{
          role: 'minimize'
        },
        {
          role: 'zoom'
        },
        ...[{
          role: 'close'
        }]
      ]
    },
    {
      role: 'help',
      submenu: [{
        label: 'Learn More',
        click() {
          console.log(111);
        }
      }]
    }
  ])
  tray.setToolTip('This is my application.')
  tray.setTitle('标题');
  tray.setContextMenu(contextMenu)
  tray.on('right-click', () => {
    console.log(1111)
  })

  tray.on('drop-file', () => {
    console.log(2222)
  })
  mainWindow.loadURL(winURL)

  mainWindow.on('closed', () => {
    mainWindow = null
  })

  mainWindow.on('miniSize', () => {
    mainWindow.minimize();
  })

  // const ret = globalShortcut.register('CommandOrControl+X', () => { //注册快捷键
  //   mainWindow.minimize()
  // })



}
// console.log(process.versions.electron)

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})

app.on('blur', () => {
  console.log(12313)
})
ipcMain.on('miniSize', () => mainWindow.minimize());
ipcMain.on('maxSize', () => {
  mainWindow[mainWindow.isMaximized() ? 'unmaximize' : 'maximize']()
});
ipcMain.on('close', () => mainWindow.minimize());
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