import { BrowserWindow, app, shell } from 'electron'
import path from 'path'
import { resolveHtmlPath } from '../utils/resolveHtmlPath'
import { AppUpdater } from '../controller/AppUpdater'
import { installExtensions } from '../utils/installExtensions'

const isDebug =
  process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true'

if (isDebug) {
  require('electron-debug')()
}

export enum AppWindowEvents {
  CLOSE = 'close',
  READY_TO_SHOW = 'ready-to-show',
}

export class AppWindow {
  static appWindow: BrowserWindow | null = null

  protected constructor(window: BrowserWindow) {
    AppWindow.appWindow = window
    AppWindow.appWindow.loadURL(resolveHtmlPath('index.html'))
    AppWindow.appWindow.on(AppWindowEvents.READY_TO_SHOW, () => {
      if (!AppWindow.appWindow) {
        throw new Error('Window is not defined')
      }

      if (process.env.START_MINIMIZED) {
        AppWindow.appWindow.minimize()
      } else {
        AppWindow.appWindow.show()
      }
    })
    AppWindow.appWindow.on(AppWindowEvents.CLOSE, () => {
      AppWindow.appWindow?.webContents.send('clear-temp-editor')
      AppWindow.appWindow = null
    })
    AppWindow.appWindow.webContents.setWindowOpenHandler((edata) => {
      shell.openExternal(edata.url)
      return { action: 'deny' }
    })

    new AppUpdater()
  }

  static async create() {
    if (isDebug) {
      await installExtensions()
    }

    const RESOURCES_PATH = app.isPackaged
      ? path.join(process.resourcesPath, 'assets')
      : path.join(__dirname, '../../assets')

    function getAssetPath(...paths: string[]): string {
      return path.join(RESOURCES_PATH, ...paths)
    }

    return new AppWindow(
      new BrowserWindow({
        minWidth: 1300,
        minHeight: 500,
        resizable: true,
        autoHideMenuBar: !!app.isPackaged,
        icon: getAssetPath('icon.png'),
        webPreferences: {
          preload: app.isPackaged
            ? path.join(__dirname, 'preload.js')
            : path.join(__dirname, '../../../.erb/dll/preload.js'),
          webSecurity: false,
          contextIsolation: true,
        },
      }),
    )
  }
}
