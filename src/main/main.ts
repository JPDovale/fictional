import '../infra/containers/index'
import '../infra/requester/index'
import { BrowserWindow, app, dialog, ipcMain, protocol, shell } from 'electron'
import { Logger } from '@utils/logger'
import { autoUpdater } from 'electron-updater'
import log from 'electron-log'
import path from 'path'
import express from 'express'
import { getDatabaseImagesPath } from '@utils/getDatabasePath'
import { UserPresented } from '@modules/users/presenters/User.presenter'
import { Accessors } from '@infra/requester/types'
import { accessors } from '@infra/requester/accessors'
import { PresenterProps } from '@shared/core/contracts/Presenter'
import { StatusCode } from '@shared/core/types/StatusCode'
import { StarterDatabase } from './controller/StarterDatabase'
import { AppWindow } from './view/AppWindow'
import { resolveUpdatingHtmlPath } from './utils/resolveUpdatingHtmlPath'

const { appWindow } = AppWindow

protocol.registerSchemesAsPrivileged([
  {
    scheme: 'fictional',
    privileges: {
      secure: true,
      standard: true,
      supportFetchAPI: true,
      bypassCSP: true,
    },
  },
])

if (process.env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support')
  sourceMapSupport.install()
}

const server = express()
server.use('/images', express.static(getDatabaseImagesPath()))
server.listen(4141, () => {
  Logger.info('Server listening on port 4141')
})

log.transports.file.level = 'info'
autoUpdater.logger = log
autoUpdater.autoRunAppAfterInstall = true
autoUpdater.autoInstallOnAppQuit = true

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

ipcMain.handle('open-url', (_, url) =>
  shell.openExternal(url, { activate: true }),
)

protocol.registerSchemesAsPrivileged([
  {
    scheme: 'fictional',
    privileges: {
      secure: true,
      standard: true,
      supportFetchAPI: true,
      bypassCSP: true,
    },
  },
])

if (process.defaultApp) {
  if (process.argv.length >= 2) {
    app.setAsDefaultProtocolClient('fictional', process.execPath, [
      path.resolve(process.argv[1]),
    ])
  }
} else {
  app.setAsDefaultProtocolClient('fictional')
}

const gotTheLock = app.requestSingleInstanceLock()

if (!gotTheLock) {
  app.quit()
} else {
  app.on('second-instance', async (_, commandLine) => {
    // Someone tried to run a second instance, we should focus our window.
    if (appWindow) {
      if (appWindow.isMinimized()) appWindow.restore()
      appWindow.focus()
    }

    const url = commandLine.find((line) =>
      line.startsWith('fictional://auth/success'),
    )
    if (url) {
      const params = new URLSearchParams(url.split('?')[1])
      const name = params.get('name')
      const email = params.get('email')
      const authId = params.get('authId')
      const photoUrl = params.get('photoUrl')
      const verified = params.get('verified')
      const token = params.get('token')

      const response = (await accessors[Accessors.GET_FIRST_USER]
        .handle()
        .then((res) => res)
        .catch((error) => error)) as PresenterProps<UserPresented>

      let hasError = false

      if (response.data?.user) {
        const res = await accessors[Accessors.UPDATE_USER]
          .handle({
            _data: {
              authId,
              email: email ?? '',
              name: name ?? '',
              photoUrl,
              verified: verified === 'true',
              userId: response.data.user.id,
              accessToken: token,
              skipLogin: true,
            },
            win: appWindow as BrowserWindow,
          })
          .then((r) => r)
          .catch((error) => error)

        console.log({ res })

        if (res.status !== StatusCode.OK) {
          hasError = true
        }
      } else {
        const res = await accessors[Accessors.CREATE_USER]
          .handle({
            _data: {
              email: email ?? 'ms@user.com',
              name:
                name ??
                `FC User ${(Math.random() * 100).toString().split('.')[1]}`,
              authId: authId ?? undefined,
              photoUrl: photoUrl ?? undefined,
              accessToken: token ?? undefined,
              skipLogin: true,
              verified: verified === 'true',
            },
            win: appWindow as BrowserWindow,
          })
          .then((r) => r)
          .catch((error) => error)

        if (res.status !== StatusCode.CREATED) {
          hasError = true
        }
      }

      if (!hasError) {
        AppWindow.messageSender('auth-success')
      }

      if (hasError) {
        AppWindow.messageSender('auth-success')
      }
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
          darkTheme: true,
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
            webSecurity: true,
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
    .catch(console.error)

  app.on('open-url', (event, url) => {
    dialog.showErrorBox('Welcome Back', `You arrived from: ${url}`)
    // Aqui você pode lidar com a URL que foi aberta
  })
}
