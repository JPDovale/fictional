import '../infra/containers/index'
import '../infra/requester/index'
import { BrowserWindow, app } from 'electron'
import { Logger } from '@utils/logger'
import { autoUpdater } from 'electron-updater'
import log from 'electron-log'
import path from 'path'
import { StarterDatabase } from './controller/StarterDatabase'
import { AppWindow } from './view/AppWindow'
import { resolveUpdatingHtmlPath } from './utils/resolveUpdatingHtmlPath'

const { appWindow } = AppWindow

if (process.env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support')
  sourceMapSupport.install()
}

log.transports.file.level = 'info'
autoUpdater.logger = log
autoUpdater.autoRunAppAfterInstall = true
autoUpdater.autoInstallOnAppQuit = true

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app
  .whenReady()
  .then(async () => {
    autoUpdater.on('update-downloaded', () => {
      Logger.debug('update-downloaded')
      autoUpdater.quitAndInstall(true, true)
    })

    const result = await autoUpdater.checkForUpdates()

    const RESOURCES_PATH = app.isPackaged
      ? path.join(process.resourcesPath, 'assets')
      : path.join(__dirname, '../assets')

    function getAssetPath(...paths: string[]): string {
      return path.join(RESOURCES_PATH, ...paths)
    }

    let updatingWindow: BrowserWindow | null = null

    if (result && result.updateInfo.version !== app.getVersion()) {
      updatingWindow = new BrowserWindow({
        height: 400,
        width: 300,
        resizable: false,
        autoHideMenuBar: !!app.isPackaged,
        frame: false,
        minimizable: false,
        maximizable: false,
        closable: false,
        icon: getAssetPath('icon.png'),
        webPreferences: {
          webSecurity: false,
          contextIsolation: true,
        },
      })

      updatingWindow.loadURL(resolveUpdatingHtmlPath())
      updatingWindow.on('ready-to-show', async () => {
        updatingWindow?.show()
      })
    }

    if (!result || result?.updateInfo.version === app.getVersion()) {
      const database = new StarterDatabase()
      await database.migrate()

      updatingWindow?.hide()
      AppWindow.create()

      app.on('activate', () => {
        if (appWindow === null) AppWindow.create()
      })
    }

    return true
  })
  .catch(Logger.panic)
