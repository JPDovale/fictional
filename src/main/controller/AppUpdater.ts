import { Logger } from '@utils/logger';
import { app, dialog } from 'electron';
import log from 'electron-log';
import { autoUpdater } from 'electron-updater';

autoUpdater.on('update-available', ({ version }) => {
  dialog.showMessageBox({
    type: 'none',
    buttons: ['OK'],
    title: `Fictional update available ${version}`,
    message: `New version has created! Beta version: ${version} is coming soon!`,
    detail: 'A new version is being downloaded',
  });
});

autoUpdater.on('update-downloaded', () => {
  dialog
    .showMessageBox({
      type: 'none',
      buttons: ['Close'],
      title: `Updating`,
      message: 'Close the app for use new version',
      detail: 'A new version is being installed',
    })
    .then(() => {
      app.quit();
    })
    .catch((err) => {
      throw err;
    });
});

autoUpdater.on('checking-for-update', () => {
  Logger.info('INFO: Checking for update');
});

autoUpdater.on('update-not-available', () => {
  Logger.info('INFO: Noting to update');
});

export class AppUpdater {
  constructor() {
    log.transports.file.level = 'info';
    autoUpdater.logger = log;
    autoUpdater.checkForUpdatesAndNotify({
      title: 'Fictional',
      body: 'Update available',
    });
  }
}
