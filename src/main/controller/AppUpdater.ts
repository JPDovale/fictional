import { dialog } from 'electron'
import log from 'electron-log'
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-available', ({ releaseNotes, version }) => {
  dialog.showMessageBox({
    type: 'info',
    buttons: ['OK'],
    title: `MagiScrita update available ${version}`,
    message: releaseNotes?.toString() ?? 'New version has created',
    detail: 'A new version is being downloaded',
  })
})

autoUpdater.on('update-downloaded', () => {
  dialog
    .showMessageBox({
      type: 'info',
      buttons: ['Restart'],
      title: `Updating`,
      message: 'Restart the app for use new version',
      detail: 'A new version is being installed',
    })
    .then(() => {
      autoUpdater.quitAndInstall()
    })
    .catch((err) => {
      throw err
    })
})

autoUpdater.on('checking-for-update', () => {
  console.log('Checking for update')
})

autoUpdater.on('update-not-available', () => {
  console.log('Noting to update')
})

export class AppUpdater {
  constructor() {
    log.transports.file.level = 'info'
    autoUpdater.logger = log
    autoUpdater.checkForUpdatesAndNotify()
  }
}
